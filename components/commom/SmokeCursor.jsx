"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const velocityShader = `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform float uDt;
  uniform float uDecay;

  void main() {
    vec2 v = texture2D(uVelocity, vUv).xy;
    vec2 back = vUv - v * uDt;

    vec2 advected = texture2D(
      uVelocity, clamp(back, 0.001, 0.999)
    ).xy;

    float t = uDt;
    vec2 p = vUv;

    // Procedural rotational force
    vec2 curl = vec2(
      sin(p.y * 35.0 + p.x * 12.0),
      -cos(p.x * 35.0 - p.y * 12.0)
    );

    advected += curl * t * 0.012;
    advected *= uDecay;

    gl_FragColor = vec4(advected, 0.0, 1.0);
  }
`;

const splatShader = `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform vec2 uPoint;
  uniform vec2 uAspect;
  uniform vec3 uValue;
  uniform float uRadius;
  uniform float uForce;
  uniform int uMode;

  void main() {
    vec4 old = texture2D(uTarget, vUv);

    vec2 d = (vUv - uPoint) * uAspect;
    float influence = exp(
      -dot(d, d) / (uRadius * uRadius)
    );

    if (uMode == 0) {
      vec2 velocity = old.xy
        + uValue.xy * influence * uForce;

      gl_FragColor = vec4(velocity, 0.0, 1.0);
    } else {
      vec3 dye = old.rgb
        + uValue * influence * 0.8;

      float alpha = max(
        old.a, influence * 0.85
      );

      gl_FragColor = vec4(dye, alpha);
    }
  }
`;

const dyeShader = `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uDye;
  uniform sampler2D uVelocity;
  uniform float uDt;
  uniform float uDecay;

  void main() {
    vec2 velocity = texture2D(
      uVelocity, vUv
    ).xy;

    vec2 back = vUv - velocity * uDt;

    vec4 dye = texture2D(
      uDye, clamp(back, 0.001, 0.999)
    );

    gl_FragColor = dye * uDecay;
  }
`;

const displayShader = `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uDye;
  uniform float uOpacity;

  void main() {
    vec4 dye = texture2D(uDye, vUv);

    // Soft smoke edges
    float alpha = smoothstep(
      0.015, 0.45, dye.a
    ) * uOpacity;

    gl_FragColor = vec4(
      dye.rgb,
      alpha
    );
  }
`;

export default function SmokeCursor({
  color = "#c3a6ff",
  opacity = 0.8,
  enabled = true,
  mobile = false,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!enabled || !container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame;
    let disposed = false;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // Half-float textures are needed for velocity data.
    const gl = renderer.getContext();

    if (!gl.getExtension("EXT_color_buffer_float")) {
      // Some devices support half-float render targets
      // even when full-float targets are unavailable.
      console.warn("Float render target support may be limited.");
    }

    container.appendChild(renderer.domElement);

    const aspect = width / height;
    const simHeight = mobile ? 192 : 256;
    const simWidth = Math.max(
      128,
      Math.min(512, Math.round(simHeight * aspect)),
    );

    const makeTarget = () =>
      new THREE.WebGLRenderTarget(simWidth, simHeight, {
        type: THREE.HalfFloatType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        depthBuffer: false,
        stencilBuffer: false,
      });

    let velocity = [makeTarget(), makeTarget()];
    let dye = [makeTarget(), makeTarget()];

    let velocityIndex = 0;
    let dyeIndex = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const uniforms = {
      uVelocity: { value: null },
      uDye: { value: null },
      uTarget: { value: null },
      uPoint: { value: new THREE.Vector2(-2, -2) },
      uAspect: {
        value: new THREE.Vector2(aspect, 1),
      },
      uValue: { value: new THREE.Vector3() },
      uDt: { value: 0.016 },
      uDecay: { value: 0.99 },
      uRadius: { value: 0.04 },
      uForce: { value: 1 },
      uMode: { value: 0 },
      uOpacity: { value: opacity },
    };

    const material = (fragmentShader) =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        depthTest: false,
        depthWrite: false,
      });

    const velocityMaterial = material(velocityShader);
    const splatMaterial = material(splatShader);
    const dyeMaterial = material(dyeShader);
    const displayMaterial = material(displayShader);

    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      velocityMaterial,
    );

    scene.add(quad);

    const renderPass = (target, shaderMaterial) => {
      quad.material = shaderMaterial;
      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
    };

    const swapVelocity = () => {
      velocityIndex = 1 - velocityIndex;
    };

    const swapDye = () => {
      dyeIndex = 1 - dyeIndex;
    };

    const pointer = {
      x: -2,
      y: -2,
      px: -2,
      py: -2,
      moved: false,
    };

    const onMove = (event) => {
      pointer.x = event.clientX / width;
      pointer.y = 1 - event.clientY / height;
      pointer.moved = true;
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      renderer.setSize(width, height);

      // Preserve simulation state and update aspect.
      uniforms.uAspect.value.set(width / height, 1);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);

    const smokeColor = new THREE.Color(color);

    uniforms.uValue.value.set(smokeColor.r, smokeColor.g, smokeColor.b);

    const clock = new THREE.Clock();

    const animate = () => {
      if (disposed) return;

      frame = requestAnimationFrame(animate);

      const dt = Math.min(clock.getDelta(), 0.033);

      uniforms.uDt.value = dt;

      // 1. Advect velocity and add rotational turbulence.
      uniforms.uVelocity.value = velocity[velocityIndex].texture;
      uniforms.uDecay.value = Math.exp(-dt * 0.04); // change it to make the smoke disappers fast or slow

      renderPass(velocity[1 - velocityIndex], velocityMaterial);
      swapVelocity();

      // 2. Inject velocity where the pointer moves.
      if (pointer.moved) {
        const dx = pointer.x - pointer.px;
        const dy = pointer.y - pointer.py;

        uniforms.uTarget.value = velocity[velocityIndex].texture;
        uniforms.uPoint.value.set(pointer.x, pointer.y);
        uniforms.uValue.value.set(dx, dy, 0);
        uniforms.uAspect.value.set(width / height, 1);
        uniforms.uRadius.value = 0.055;
        uniforms.uForce.value = 30;
        uniforms.uMode.value = 0;

        renderPass(velocity[1 - velocityIndex], splatMaterial);
        swapVelocity();

        // 3. Advect the existing smoke.
        uniforms.uDye.value = dye[dyeIndex].texture;
        uniforms.uVelocity.value = velocity[velocityIndex].texture;
        uniforms.uDecay.value = Math.exp(-dt * 0.7);

        renderPass(dye[1 - dyeIndex], dyeMaterial);
        swapDye();

        // 4. Inject new smoke dye.
        uniforms.uTarget.value = dye[dyeIndex].texture;
        uniforms.uPoint.value.set(pointer.x, pointer.y);
        uniforms.uValue.value.set(smokeColor.r, smokeColor.g, smokeColor.b);
        uniforms.uRadius.value = 0.045;
        uniforms.uForce.value = 1;
        uniforms.uMode.value = 1;

        renderPass(dye[1 - dyeIndex], splatMaterial);
        swapDye();

        pointer.px = pointer.x;
        pointer.py = pointer.y;
        pointer.moved = false;
      } else {
        // Continue drifting even when the mouse stops.
        uniforms.uDye.value = dye[dyeIndex].texture;
        uniforms.uVelocity.value = velocity[velocityIndex].texture;
        uniforms.uDecay.value = Math.exp(-dt * 0.03); // change it to adjust the smoke after mouse stops.

        renderPass(dye[1 - dyeIndex], dyeMaterial);
        swapDye();
      }

      // 5. Display smoke with a transparent background.
      uniforms.uDye.value = dye[dyeIndex].texture;
      uniforms.uOpacity.value = opacity;

      renderer.setRenderTarget(null);
      renderer.clear();
      renderPass(null, displayMaterial);
    };

    // Prevent a fullscreen quad from clearing the page.
    renderer.autoClear = true;

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);

      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);

      [...velocity, ...dye].forEach((target) => target.dispose());

      quad.geometry.dispose();
      velocityMaterial.dispose();
      splatMaterial.dispose();
      dyeMaterial.dispose();
      displayMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, opacity, enabled, mobile]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}

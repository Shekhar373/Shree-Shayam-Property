"use client";

import dynamic from "next/dynamic";
// import SmokeCursor from "./SmokeCursor";

const SmokeCursor = dynamic(
  () => import("./SmokeCursor"),
  { ssr: false }
);

export default function ClientSmoke() {
  return <SmokeCursor color="#BFC9C2" opacity={0.05} mobile={false} />;
}
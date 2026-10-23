import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import Approach from '@/components/home/Approach'
import AboutUs from '@/components/home/AboutUs'
import { HomeProperties } from '@/components/home/HomeProperties'
import InquiryPage from '@/components/home/InquiryPage'
import Footer from '@/components/commom/Footer'
import About from '@/components/home/About'

const page = () => {
  
  return (
    <div className='bg-[#EEF1EE] text-[#000001]'>
      <Hero />
      <About />
      <HomeProperties />
      {/* <AboutUs /> */}
      {/* <Approach /> */}
      <Services />
      <InquiryPage />
      <Footer />

    </div>
  )
}

export default page 
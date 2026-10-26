import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import { HomeProperties } from '@/components/home/HomeProperties'
import InquiryPage from '@/components/home/InquiryPage'
import Footer from '@/components/commom/Footer'
import About from '@/components/home/About'
import UpperForm from '@/components/home/UpperForm'

const page = () => {
  
  return (
    <div className='bg-[#EEF1EE] text-[#000001] overflow-hidden'>
      
      <Hero />
      <About />
      <HomeProperties />
      <Services />
      <UpperForm />
      <InquiryPage />
      <Footer />
    </div>
  )
}

export default page 
import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import InquiryPage from '@/components/home/InquiryPage'
import Footer from '@/components/commom/Footer'
import About from '@/components/home/About'
import UpperForm from '@/components/home/UpperForm'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import { FeaturedProperty } from '@/components/home/FeaturedProperties'
import SmokeCursor from '@/components/commom/SmokeCursor'

const page = () => {
  
  return (
    <div className='bg-[#EEF1EE] text-[#000001] overflow-hidden'>
     {/* <SmokeCursor
        color="#595757"
        opacity={0.1}
        mobile={true}
      
      /> */}
      <Hero />
      <About />
      <FeaturedProperty />
      <Services />
      <UpperForm />
      <WhyChooseUs />
      <InquiryPage />
      <Footer />
    </div>
  )
}

export default page 
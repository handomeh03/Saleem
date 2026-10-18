import AboutUs from "@/features/landing/components/AboutUs";
import Footer from "@/features/landing/components/Footer";
import Hero from "@/features/landing/components/Hero";
import Navbar from "@/features/landing/components/Navbar";
import OurServices from "@/features/landing/components/OurServices";

export default function page(){
    return(
        <div>
            <Navbar/>
            <Hero/>
            <AboutUs/>
            <OurServices/>
            <Footer/>
        </div>
    );
}
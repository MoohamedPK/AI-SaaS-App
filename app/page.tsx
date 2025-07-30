import Footer from "@/components/Footer";
import CompanionsCrousel from "@/components/home/CompanionsCrousel";
import Guide from "@/components/home/Guide";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";

export default function Home() {
  return (
    <div className="">
      <Hero/>

      <Guide/>

      <CompanionsCrousel/>

      <Pricing/>

      <Footer/>
    </div>
  );
}

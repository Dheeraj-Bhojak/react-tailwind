import FAQ from "../component/faq/faq.component";
import FeaturesInfluencer from "../component/features/features.component";
import HeroInfluencer from "../component/hero/influencerHero.component";
import Newsletter from "../component/newsLetter.component";
import RoadMap from "../component/roadmapCarousel/roadmapCarousel.component";
import Testimonial from "../component/testimonial/testimonial.component";
import WhySignUp from "../component/whySignUp.component.tsx/whySignUp.component";

const HomeInfluencer = () => {
  return (
    <>
      <HeroInfluencer />
      <WhySignUp />
      <Testimonial />
      <RoadMap />
      <FAQ />
    </>
  );
};
export default HomeInfluencer;

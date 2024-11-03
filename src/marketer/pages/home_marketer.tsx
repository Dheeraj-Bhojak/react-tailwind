import Hero from "../components/hero/hero.component";
import Stats from "../components/stats.component";
import Teams from "../components/teams.component";
import Features from "../components/features.component";
import FAQ from "../components/FAQ_company.component";
// import Pricing from "../components/pricing.component";
import BrandMarquee from "../components/brandMarquee/brand.marquee.component";
import HowThisHappen from "../../marketer/components/howThisHappenSection/HowThisHappen.component";
import InfluencerMarqueeCard from "../components/influencerMarquee/InfluencerMarqueeCard.component";
import OurPlatforms from "../components/treesTest/ourPlatform.component";

/**
 * marketerHome
 * @returns
 */
const MarketerHome: React.FC = () => {
  return (
    <>
      <Hero />
      <Stats />
      <BrandMarquee />
      <OurPlatforms />
      <HowThisHappen />
      <InfluencerMarqueeCard />
    </>
  );
};
export default MarketerHome;

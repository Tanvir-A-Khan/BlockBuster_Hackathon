import AllArts from "./components/AllArts";
import Hero from "./components/Hero";
import { useStateContext } from "./contexts/web3";

export default function LandingLayout() {
  const { arts } = useStateContext();

  return (
    <div>
      <Hero />
      {arts.length > 0 && <AllArts arts={arts} />}
    </div>
  );
}

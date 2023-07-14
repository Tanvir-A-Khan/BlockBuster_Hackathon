/* eslint-disable react/prop-types */
import AllArtsFilter from "./components/AllArtsFilter";
import { useStateContext } from "./contexts/web3";

export default function CommonLayout() {
  const { arts } = useStateContext();

  return <div>{arts.length > 0 && <AllArtsFilter arts={arts} />}</div>;
}

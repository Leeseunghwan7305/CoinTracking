import { useQuery } from "react-query";
import { getCoins } from "../../api/api";
import { CoinInterface } from "../Coins/Coins";

function Price() {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", getCoins);
  return <h1>{data?.map((item) => item.id)}</h1>;
}

export default Price;

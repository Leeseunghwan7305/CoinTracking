import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../../api/api";
import { ChartData } from "../../type/type";

interface OutLetProps {
  coinID: string;
}

function Chart() {
  const { coinID } = useOutletContext<OutLetProps>();
  const { isLoading, data } = useQuery<ChartData[]>(["ohlcv", coinID], () =>
    fetchCoinHistory(coinID)
  );
  return <h1>Chart</h1>;
}

export default Chart;

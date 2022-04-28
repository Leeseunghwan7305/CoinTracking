import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../../api/api";
import { ChartData } from "../../type/type";
import ApexChart from "react-apexcharts";
interface OutLetProps {
  coinID: string;
}

function Chart() {
  const { coinID } = useOutletContext<OutLetProps>();
  const { isLoading, data } = useQuery<ChartData[]>(["ohlcv", coinID], () =>
    fetchCoinHistory(coinID)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close) as number[],
            },
            // {
            //   name: "high",
            //   data: data?.map((price) => price.high) as number[],
            // },
            // {
            //   name: "low",
            //   data: data?.map((price) => price.low) as number[],
            // },
            // {
            //   name: "open",
            //   data: data?.map((price) => price.open) as number[],
            // },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },

            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

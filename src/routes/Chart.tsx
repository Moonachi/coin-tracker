import { useContext } from "react";
import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { ThemeContext } from "styled-components";
import { fetchCoinHistory } from "../api";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId?: string;
  isDark: boolean;
}

function Chart(props: ChartProps) {
  const { isDark } = props;
  const themeContext = useContext(ThemeContext);
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data = [] } = useQuery<IHistorical[]>(
    ["coinChart", coinId],
    () => fetchCoinHistory(coinId!),
    {
      refetchInterval: 5000
    }
  );

  if (isLoading) return <span>Loading chart...</span>;

  return (
    <ApexCharts
      type="candlestick"
      series={
        [
          {
            data: data.map(price => {
              return {
                x: price.time_open,
                y: [
                  price.open.toFixed(2),
                  price.high.toFixed(2),
                  price.low.toFixed(2),
                  price.close.toFixed(2)
                ]
              };
            })
          }
        ] as ApexAxisChartSeries
      }
      options={{
        theme: {
          mode: isDark ? "dark" : "light"
        },
        chart: {
          toolbar: {
            show: false
          },
          background: "transparent"
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: themeContext.increaseColor,
              downward: themeContext.decreaseColor
            }
          }
        },
        xaxis: {
          type: "datetime"
        }
      }}
    />
  );
}

export default Chart;

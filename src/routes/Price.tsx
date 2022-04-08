import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface Info {
  info: number;
}

const PriceInfoList = styled.ul``;

const PriceSubject = styled.span`
  color: ${props => props.theme.mainPage.color};
`;

const PriceInfo = styled.li<Info>`
  background-color: ${props => props.theme.mainPage.bgColor};
  color: ${props => {
    if (props.info > 0) return props.theme.increaseColor;
    return props.theme.decreaseColor;
  }};
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 20px;
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId?: string;
}

function Price(props: PriceProps) {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<PriceData>(
    ["coinPrice", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000
    }
  );

  console.log("# data", data);
  if (isLoading) return <span>Loading price...</span>;
  if (!data?.quotes?.USD) return <span>No information price...</span>;

  const {
    percent_change_15m,
    percent_change_30m,
    percent_change_1h,
    percent_change_6h,
    volume_24h,
    volume_24h_change_24h
  } = data.quotes.USD;

  const prices = [
    { subject: "Before 15min", unit: "%", translation: percent_change_15m },
    { subject: "Before 30min", unit: "%", translation: percent_change_30m },
    { subject: "Before 1hour", unit: "%", translation: percent_change_1h },
    { subject: "Before 6hour", unit: "%", translation: percent_change_6h },
    {
      subject: "During 24hours volumn",
      unit: "",
      translation: Number(volume_24h.toFixed(3))
    },
    {
      subject: "During 24hours volumn transition",
      unit: "%",
      translation: volume_24h_change_24h
    }
  ];

  return (
    <PriceInfoList>
      {prices.map((info, key) => {
        const { subject, unit, translation } = info;
        return (
          <PriceInfo key={subject} info={translation}>
            <PriceSubject>{subject} : </PriceSubject>
            {unit === "$" ? unit : ""}
            {translation} {unit === "%" ? unit : ""}
          </PriceInfo>
        );
      })}
      ;
    </PriceInfoList>
  );
}

export default Price;

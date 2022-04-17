import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.span`
  text-align: center;
  display: block;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;
interface RouteParams {
  coinID: string;
}
interface RouterState {
  name: string;
}
const Coin = () => {
  let [loading, setLoading] = useState<boolean>(true);
  const { coinID } = useParams() as unknown as RouteParams;
  const location = useLocation();
  const coin = location.state as RouterState;
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  });
  return (
    <Container>
      <Header>
        <Title>{coin?.name || "loading"}</Title>
      </Header>
      {loading ? <Loading>Loading...</Loading> : null}
    </Container>
  );
};

export default Coin;

import React, { useEffect, useState } from "react";
import {
  useLocation,
  Route,
  Routes,
  useParams,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { InfoData, PriceData, RouteParams, RouterState } from "../../type/type";
import {
  Container,
  Header,
  Loader,
  Title,
  Overview,
  OverviewItem,
  Description,
  Tabs,
  Tab,
} from "./CoinCss";
import { getInfoData, getPriceData } from "../../api/api";
import { Link } from "react-router-dom";

const Coin = () => {
  let [loading, setLoading] = useState<boolean>(true);
  const { coinID } = useParams() as unknown as RouteParams;

  const location = useLocation();
  const state = location.state as RouterState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch("/:coinID/price");
  const chartMatch = useMatch("/:coinID/chart");
  console.log(priceMatch);
  console.log(chartMatch);
  useEffect(() => {
    (async () => {
      let infoData = await getInfoData(coinID);
      let priceData = await getPriceData(coinID);
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinID]);
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinID}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinID}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
    </Container>
  );
};

export default Coin;

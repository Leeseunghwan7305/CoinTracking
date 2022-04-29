import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
import { useQuery } from "react-query";

const Coin = () => {
  const { coinID } = useParams() as unknown as RouteParams;

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinID],
    () => getInfoData(coinID)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinID],
    () => getPriceData(coinID),
    { refetchInterval: 5000 }
  );
  const location = useLocation();
  const state = location.state as RouterState;
  const priceMatch = useMatch("/:coinID/price");
  const chartMatch = useMatch("/:coinID/chart");
  // let [loading, setLoading] = useState<boolean>(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // useEffect(() => {
  //   (async () => {
  //     let infoData = await getInfoData(coinID);
  //     let priceData = await getPriceData(coinID);
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinID]);
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
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
          <Outlet context={{ coinID }} />
        </>
      )}
    </Container>
  );
};

export default Coin;

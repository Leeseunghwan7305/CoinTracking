import React from "react";
import { useParams } from "react-router-dom";

interface RouteParams {
  coinID: string;
}
const Coin = () => {
  const { coinID } = useParams() as unknown as RouteParams;
  return <h1>Coin : {coinID}</h1>;
};

export default Coin;

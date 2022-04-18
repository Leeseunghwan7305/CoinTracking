import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./chart/Chart";
import Coin from "./Coin/Coin";
import Coins from "./Coins/Coins";
import Price from "./price/Price";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />}></Route>
        <Route path="/:coinID" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./Coin/Coin";
import Coins from "./Coins/Coins";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinID" element={<Coin />}></Route>
        <Route path="/" element={<Coins />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;

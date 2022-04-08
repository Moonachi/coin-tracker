import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

interface RouterProps {
  isDark: boolean;
}

function Router(props: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path={`price`} element={<Price />} />
          <Route path={`chart`} element={<Chart {...props} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;

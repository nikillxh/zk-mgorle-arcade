import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GameChess from "../pages/GameChess";
import GameTileville from "../pages/GameTileville";
import GameLottery from "../pages/GameLottery.tsx";
import GameCheckers from "../pages/GameCheckers";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gamecheckers" element={<GameCheckers />} />
        <Route path="/gametileville" element={<GameTileville />} />
        <Route path="/gamelottery" element={<GameLottery />} />
        <Route path="/gamechess" element={<GameChess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

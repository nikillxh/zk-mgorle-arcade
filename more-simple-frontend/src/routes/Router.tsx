import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GameChess from "../pages/GameChess";
import GameTileville from "../pages/GameTileville";
import GameLottery from "../pages/GameLottery.tsx";
import GameCheckers from "../pages/GameCheckers";
import NotFound from "../pages/NotFound";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import GameNGuess from "../pages/GameNGuess";


const AppRouter = () => {

  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <Router>
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gamecheckers" element={<GameCheckers />} />
        <Route path="/gametileville" element={<GameTileville />} />
        <Route path="/gamelottery" element={<GameLottery />} />
        <Route path="/gamechess" element={<GameChess />} />
        <Route path="/gameNGuess" element={<GameNGuess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

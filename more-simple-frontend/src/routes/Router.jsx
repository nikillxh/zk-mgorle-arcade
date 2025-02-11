import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import GameChess from "../pages/GameChess.jsx";
import GameTileville from "../pages/GameTileville.jsx";
import GameLottery from "../pages/GameLottery.jsx";
import GameCheckers from "../pages/GameCheckers.jsx";
import NotFound from "../pages/NotFound.jsx";
import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import GameNGuess from "../pages/GameNGuess.jsx";
import GameRPS from "../pages/GameRPS.jsx";

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
        <Route path="/gameRPS" element={<GameRPS />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

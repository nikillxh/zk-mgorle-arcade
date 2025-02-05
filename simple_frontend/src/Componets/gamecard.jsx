import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";

const GameDisplayCard = ({ game }) => {
  return (
    <Card className="w-80 bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden">
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">{game.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300 mb-3">{game.description}</p>
        <Button className="w-full flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
          <FaPlay /> Play Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameDisplayCard;

import React from "react";

export function Card({ children, className }) {
  return <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="border-b pb-2 text-xl font-bold">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}

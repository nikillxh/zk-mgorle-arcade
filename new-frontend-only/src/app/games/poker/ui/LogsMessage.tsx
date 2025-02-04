export default function LogsMessage({
  time,
  player,
  message,
}: {
  time: string;
  player?: string;
  message: string;
}) {
  return (
    <div className="flex flex-row items-center gap-3 p-2 rounded-lg bg-gray-900/50 text-white text-sm sm:text-base">
      <span className="text-gray-400">{time}</span>
      <span className="font-semibold text-yellow-400">[System]:</span>
      {player && (
        <>
          <span className="text-gray-300">Player</span>
          <span className="font-semibold text-blue-400">{player}</span>
        </>
      )}
      <span className="text-gray-300">{message}</span>
    </div>
  );
}

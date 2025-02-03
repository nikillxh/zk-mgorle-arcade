export default function ChatMessage({
  time,
  sender,
  message,
}: {
  time: string;
  sender: string;
  message: string;
}) {
  return (
    <div className="flex flex-row items-center gap-3 p-2 rounded-lg bg-gray-800/50 text-white text-sm sm:text-base">
      <span className="text-gray-400">{time}</span>
      <span className="font-semibold text-blue-400">{sender}:</span>
      <span className="text-gray-300">{message}</span>
    </div>
  );
}

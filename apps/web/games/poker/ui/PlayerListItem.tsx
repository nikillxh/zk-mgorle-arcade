export default function PlayerListItem({
  id,
  address,
  nickname,
}: {
  id: number;
  address: string;
  nickname: string;
}) {
  return (
    <div className="flex w-full flex-row justify-between items-center border-t border-gray-700 py-3 text-sm sm:text-base text-gray-300 last:border-b">
      <span className="w-[10%] text-gray-400">[{id}]</span>
      <span className="w-[60%] truncate">{address}</span>
      <span className="w-[30%] font-semibold text-blue-400">{nickname}</span>
    </div>
  );
}

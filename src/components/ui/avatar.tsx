import useMarvinAvatar from "@/features/chat/hooks/useMarvinAvatar";

export function Avatar({
  state,
  avatarSrc,
}: ReturnType<typeof useMarvinAvatar>) {
  return (
    <div className="relative">
      <img src={avatarSrc} alt="Marvin Avatar" width={48} height={48} />
      <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-blue-500">
        {state}
      </div>
    </div>
  );
}

import useMarvinAvatar from "@/features/chat/hooks/useMarvinAvatar";

export function Avatar({
  state,
  avatarSrc,
}: ReturnType<typeof useMarvinAvatar>) {
  return (
    <div className="relative">
      {/* <Image src={avatarSrc} alt="Marvin Avatar" width={48} height={48} /> */}
      <div className="w-10 h-10 bg-blue-500">{state}</div>
    </div>
  );
}

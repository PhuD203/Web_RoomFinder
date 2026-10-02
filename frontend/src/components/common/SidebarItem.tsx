export default function SidebarItem({
  children,
  icon,
  active,
  onClick,
}: {
  children: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        mb-2
        flex h-12 w-full items-center gap-3
        rounded-xl px-4
        text-left text-sm font-semibold
        transition-all duration-200
        ${
          active
            ? "bg-[#2D2F33] text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      <span className="flex w-5 shrink-0 items-center justify-center text-sm">
        {icon}
      </span>

      <span className="truncate">{children}</span>
    </button>
  );
}

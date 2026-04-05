import React from "react";

type LinkButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export default function LinkButton({
  children,
  onClick,
  variant = "primary",
}: LinkButtonProps) {
  const base = "w-full px-6 py-3 text-sm transition sm:w-auto";
  const style =
    variant === "primary"
      ? "bg-black text-white shadow-sm hover:scale-[1.01] hover:shadow-md"
      : "border border-black bg-transparent text-black hover:bg-slate-50";

  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}
import Link from "next/link";
import React from "react";
import { PiggyBank } from "lucide-react";

function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <PiggyBank className="stroke h-11 w-11 stroke-amber-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r from bg-amber-400 to-orange-400 text-3xl font-bold leading-tight tracking-tighter text-transparent bg-clip-text">
        PocketFlow
      </p>
    </Link>
  );
}

export default Logo;

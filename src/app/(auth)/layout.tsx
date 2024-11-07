import Logo from "@/components/logo";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center my-12">
      <Logo />
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default layout;

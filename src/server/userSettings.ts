import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const getUserSettings = async (userId: string) => {
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId,
    },
  });

  if (!userSettings) {
    redirect("/dashboard/wizard");
  }

  return userSettings;
};

import prisma from "@/lib/prisma";
import { getUser } from "@/server/user";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const user = await getUser();

  let userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    userSettings = await prisma.userSettings.create({
      data: {
        userId: user.id,
        currency: "SRD",
      },
    });
  }

  revalidatePath("/dasboard");
  return Response.json(userSettings);
}

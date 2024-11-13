"use server";

import prisma from "@/lib/prisma";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from "../schema/transaction";
import { getUser } from "../user";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }
  const user = await getUser();

  const { amount, category, date, description, type } = parsedBody.data;
  const categoryRow = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: category,
    },
  });

  if (!categoryRow) {
    throw new Error("category not found");
  }

  await prisma.$transaction([
    // Create user transaction
    prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        description: description || "",
        date,
        category: categoryRow.name,
        categoryIcon: categoryRow.icon,
        type,
      },
    }),

    // Update month aggregates table
    prisma.monthHistory.upsert({
      where: {
        day_month_year_userId: {
          userId: user.id,
          day: date.getUTCDate(),
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
        },
      },
      create: {
        userId: user.id,
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        income: type === "income" ? amount : 0,
        expenses: type === "expense" ? amount : 0,
      },

      update: {
        expenses: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
    }),

    // Update year aggregates table
    prisma.yearHistory.upsert({
      where: {
        month_year_userId: {
          userId: user.id,
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
        },
      },
      create: {
        userId: user.id,
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        income: type === "income" ? amount : 0,
        expenses: type === "expense" ? amount : 0,
      },

      update: {
        expenses: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
    }),
  ]);
}

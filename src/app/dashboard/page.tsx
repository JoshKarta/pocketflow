import { getUser } from "@/server/user";
import React from "react";
import { UserSettings } from "@prisma/client";
import { getUserSettings } from "@/server/userSettings";
import { Button } from "@/components/ui/button";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";

export default async function page() {
  const user = await getUser();
  const UserSettings = await getUserSettings(user.id);

  return (
    <div className="h-full bg-background">
      <div className="border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello, {user.firstName}</p>
          <div className="flex items-center gap-4">
            <CreateTransactionDialog
              type={"income"}
              trigger={
                <Button
                  variant={"outline"}
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700"
                >
                  New Income ✅
                </Button>
              }
            />
            <CreateTransactionDialog
              type="expense"
              trigger={
                <Button
                  variant={"outline"}
                  className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700"
                >
                  New Expense ❌
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

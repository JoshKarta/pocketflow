import CurrencyComboBox from "@/components/CurrencyComboBox";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/server/user";
import Link from "next/link";
import React from "react";

export default async function page() {
  const user = await getUser();
  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-4">
      <div className="max-w-4xl w-full space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl">
            Welcome,<span className="ml-2 font-bold">{user.firstName}! 👋</span>
          </h1>
          <h2 className="text-base text-muted-foreground">
            Let&apos;s get started by setting up your currency
          </h2>
          <p className="text-sm text-muted-foreground">
            You can change these settings at any time
          </p>
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Set your default currency for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <Separator />
        <Button className="w-full" asChild>
          <Link href={"/"}>I&apos;m done! Take me to the dashboard.</Link>
        </Button>
      </div>
      <div className="mt-4">
        <Logo />
      </div>
    </div>
  );
}

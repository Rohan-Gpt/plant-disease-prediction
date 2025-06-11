"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BackButton from "./back-button";
import Social from "./social";
import { Leaf } from "lucide-react";
import { Separator } from "./ui/separator";

interface cardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: cardWrapperProps) => {
  return (
    <Card className="max-w-[400px] md:max-w-[600px] shadow-2xl bg-white mx-2 md:mx-0">
      <CardHeader className="space-y-1 text-center pb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
          PlantCare AI
        </CardTitle>
        <CardDescription className="text-2xl text-green-600 font-medium">
          {headerLabel}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-green-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-green-600 font-medium">
            Or continue with
          </span>
        </div>
      </div>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

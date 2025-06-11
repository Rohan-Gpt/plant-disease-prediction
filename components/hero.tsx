import { ArrowRight, Camera, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 via-white to-emerald-100">
      <div className="flex flex-1 flex-col justify-center items-center px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center space-y-3 mb-8">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            🌱 AI-Powered Plant Health
          </Badge>
          <div className="text-center text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Detect Plant Diseases
            <br />
            <span className="text-gray-900">Instantly with AI</span>
          </div>
          <p className="max-w-xl text-center text-gray-600 md:text-xl">
            Upload a photo of your plant and get instant AI-powered disease
            detection with treatment recommendations. Protect your crops and
            garden with cutting-edge technology.
          </p>
        </div>
        <div className="flex flex-col min-[400px]:flex-row gap-3 mb-8">
          <Link href={"/auth/login"}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8"
            >
              Try It Free
              <Camera className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href={"/auth/login"}>
            <Button
              variant="outline"
              size="lg"
              className="border-green-200 hover:px-4"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Free to try</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Highly accurate</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Instant results</span>
          </div>
        </div>
      </div>
    </section>
  );
}

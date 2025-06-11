import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Camera,
  Zap,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Brain,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PlantDiseaseLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/80 border-b border-green-100 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            PlantCare AI
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-green-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-green-600 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-green-600 transition-colors"
          >
            Pricing
          </Link>
          <Button
            size="sm"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            Get Started
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    🌱 AI-Powered Plant Health
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Detect Plant Diseases
                    <br />
                    <span className="text-gray-900">Instantly with AI</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Upload a photo of your plant and get instant AI-powered
                    disease detection with treatment recommendations. Protect
                    your crops and garden with cutting-edge technology.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8"
                  >
                    Try It Free
                    <Camera className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-200 hover:bg-green-50"
                  >
                    Watch Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Free to try</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>99% accuracy</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Instant results</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-3xl opacity-20" />
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width="600"
                    height="400"
                    alt="Plant disease detection app interface"
                    className="relative rounded-2xl shadow-2xl border border-green-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 bg-white border-y border-green-100">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">99%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Plant Diseases</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">10K+</div>
                <div className="text-sm text-gray-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need for plant health
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform provides comprehensive plant disease
                  detection and management tools to keep your plants healthy and
                  thriving.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Detection</h3>
                  <p className="text-center text-gray-600">
                    Advanced machine learning algorithms trained on thousands of
                    plant images for accurate disease identification.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Instant Results</h3>
                  <p className="text-center text-gray-600">
                    Get disease diagnosis and treatment recommendations in
                    seconds, not days.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Mobile Friendly</h3>
                  <p className="text-center text-gray-600">
                    Take photos directly from your phone and get instant
                    analysis anywhere, anytime.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Treatment Plans</h3>
                  <p className="text-center text-gray-600">
                    Receive detailed treatment recommendations and prevention
                    strategies for each detected disease.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Progress Tracking</h3>
                  <p className="text-center text-gray-600">
                    Monitor your plant's recovery progress and maintain a health
                    history for better care.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Expert Support</h3>
                  <p className="text-center text-gray-600">
                    Access to plant pathology experts and community support for
                    complex cases.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-emerald-50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">
                  How It Works
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple as 1, 2, 3
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started with plant disease detection in three easy steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold">Upload Photo</h3>
                <p className="text-gray-600">
                  Take a clear photo of the affected plant leaves or upload an
                  existing image from your device.
                </p>
                <div className="w-full h-48 bg-white rounded-lg border-2 border-dashed border-green-200 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-green-400" />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced AI analyzes the image and compares it against our
                  extensive disease database.
                </p>
                <div className="w-full h-48 bg-white rounded-lg border border-green-200 flex items-center justify-center">
                  <Zap className="h-12 w-12 text-green-500 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Get Results</h3>
                <p className="text-gray-600">
                  Receive instant diagnosis with confidence scores and detailed
                  treatment recommendations.
                </p>
                <div className="w-full h-48 bg-white rounded-lg border border-green-200 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to protect your plants?
                </h2>
                <p className="mx-auto max-w-[600px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of gardeners and farmers who trust PlantCare AI
                  to keep their plants healthy.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-green-100"
                  />
                  <Button
                    type="submit"
                    className="bg-white text-green-600 hover:bg-green-50"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-green-100">
                  Start your free trial today. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">
                  Testimonials
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Loved by plant enthusiasts
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-gray-600">Home Gardener</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "This app saved my tomato plants! The AI detected early
                    blight before I even noticed the symptoms. The treatment
                    recommendations were spot on."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">SM</span>
                    </div>
                    <div>
                      <p className="font-semibold">Sarah Miller</p>
                      <p className="text-sm text-gray-600">Commercial Farmer</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "As a commercial farmer, early disease detection is crucial.
                    This tool has helped me prevent major crop losses and
                    optimize my treatment schedules."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">MJ</span>
                    </div>
                    <div>
                      <p className="font-semibold">Mike Johnson</p>
                      <p className="text-sm text-gray-600">Greenhouse Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "The accuracy is incredible! I've been using it for 6 months
                    and it's correctly identified every disease I've
                    encountered. Highly recommended!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-green-100 bg-white">
        <p className="text-xs text-gray-600">
          © 2024 PlantCare AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-green-600"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-green-600"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-green-600"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}

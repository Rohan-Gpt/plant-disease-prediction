"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Leaf,
  AlertCircle,
  CheckCircle,
  Camera,
  Loader2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import type { AnalysisSession, AnalysisResult } from "@/types/analysis";
import axios from "axios";

interface AnalysisPageProps {
  session: AnalysisSession;
  onUpdateSession: (
    sessionId: string,
    updates: Partial<AnalysisSession>
  ) => void;
  onDeleteSession: (sessionId: string) => void;
}

export function AnalysisPage({
  session,
  onUpdateSession,
  onDeleteSession,
}: AnalysisPageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onUpdateSession(session.id, {
            image: reader.result as string,
            result: null,
            error: null,
          });
        };
        reader.readAsDataURL(file);
      }
    },
    [session.id, onUpdateSession]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  });

  const analyzeImage = async () => {
    if (!session.image) return;

    onUpdateSession(session.id, { isAnalyzing: true, error: null });

    try {
      // Convert base64 to blob
      const response = await fetch(session.image);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob, "plant-image.jpg");

      const uploadRes = await axios.post("/api/upload", formData);
      const uploadedPath = uploadRes.data.path; // use it immediately

      const predictRes = await axios.post("/api/predict", {
        filePath: uploadedPath, // correct key name
      });

      if (predictRes.status != 200) {
        throw new Error("Failed to analyze image");
      }

      const analysisResult: AnalysisResult = predictRes.data;
      onUpdateSession(session.id, {
        result: analysisResult,
        isAnalyzing: false,
      });
    } catch (err) {
      onUpdateSession(session.id, {
        error: "Failed to analyze the image. Please try again.",
        isAnalyzing: false,
      });
      console.error("Analysis error:", err);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 8) return "bg-green-500";
    if (confidence >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getDiseaseIcon = (disease: string) => {
    return disease.toLowerCase() === "healthy" ? CheckCircle : AlertCircle;
  };

  const getDiseaseColor = (disease: string) => {
    return disease.toLowerCase() === "healthy"
      ? "text-green-600"
      : "text-red-600";
  };

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {session.result
                ? `${session.result.plantName} Analysis`
                : "Plant Disease Analysis"}
            </h1>
            <p className="text-gray-600">
              {new Date(session.timestamp).toLocaleString()}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteSession(session.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Plant Image
                </h2>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                  }`}
                >
                  <input {...getInputProps()} />
                  {session.image ? (
                    <div className="space-y-4">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image
                          src={session.image || "/placeholder.svg"}
                          alt="Selected plant"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          {isDragActive
                            ? "Drop your image here"
                            : "Drag & drop your plant image"}
                        </p>
                        <p className="text-sm text-gray-500">
                          or click to browse files
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {session.image && !session.result && (
                  <Button
                    onClick={analyzeImage}
                    disabled={session.isAnalyzing}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    {session.isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Leaf className="h-4 w-4 mr-2" />
                        Analyze Plant
                      </>
                    )}
                  </Button>
                )}

                {session.error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{session.error}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Analysis Results
              </h2>

              {session.result ? (
                <div className="space-y-6">
                  {/* Plant Name */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Plant Species</h3>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-semibold text-gray-900">
                        {session.result.plantName}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Disease Status */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Health Status</h3>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const Icon = getDiseaseIcon(session.result.disease);
                        return (
                          <Icon
                            className={`h-5 w-5 ${getDiseaseColor(
                              session.result.disease
                            )}`}
                          />
                        );
                      })()}
                      <span
                        className={`text-lg font-semibold ${getDiseaseColor(
                          session.result.disease
                        )}`}
                      >
                        {session.result.disease}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Confidence Score */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">
                      Confidence Level
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getConfidenceColor(
                            session.result.confidence
                          )}`}
                          style={{
                            width: `${(session.result.confidence / 10) * 100}%`,
                          }}
                        />
                      </div>
                      <Badge variant="secondary" className="font-semibold">
                        {session.result.confidence}/10
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Remedy */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">
                      Recommended Action
                    </h3>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800">{session.result.remedy}</p>
                    </div>
                  </div>
                </div>
              ) : session.isAnalyzing ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-green-600" />
                  <p className="text-gray-600">Analyzing your plant image...</p>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload a plant image to see analysis results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

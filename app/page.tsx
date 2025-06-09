"use client";
import PlantAnalyzer from "@/components/plant-analyser";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [uploadPath, setUploadPath] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const uploadRes = await axios.post("/api/upload", formData);
      const uploadedPath = uploadRes.data.path; // use it immediately

      const predictRes = await axios.post("/api/predict", {
        filePath: uploadedPath, // correct key name
      });

      setResult(predictRes.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return <PlantAnalyzer />;
}

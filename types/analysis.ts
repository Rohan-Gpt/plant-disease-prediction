export interface AnalysisResult {
  plantName: string;
  disease: string;
  confidence: number;
  remedy: string;
}

export interface AnalysisSession {
  id: string;
  timestamp: Date;
  image: string;
  result: AnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
}

"use client";

import { Plus, Leaf, AlertCircle, CheckCircle, Clock } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AnalysisSession } from "@/types/analysis";

interface AppSidebarProps {
  sessions: AnalysisSession[];
  currentSessionId: string;
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
}

export function AppSidebar({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewSession,
}: AppSidebarProps) {
  const getSessionDisplayName = (session: AnalysisSession) => {
    if (session.result) {
      const diseaseText =
        session.result.disease.toLowerCase() === "healthy"
          ? "Healthy"
          : session.result.disease;
      return `${session.result.plantName} - ${diseaseText}`;
    }
    return session.isAnalyzing ? "Analyzing..." : "New Analysis";
  };

  const getSessionIcon = (session: AnalysisSession) => {
    if (session.isAnalyzing) return Clock;
    if (session.result) {
      return session.result.disease.toLowerCase() === "healthy"
        ? CheckCircle
        : AlertCircle;
    }
    return Leaf;
  };

  const getSessionIconColor = (session: AnalysisSession) => {
    if (session.isAnalyzing) return "text-blue-500";
    if (session.result) {
      return session.result.disease.toLowerCase() === "healthy"
        ? "text-green-500"
        : "text-red-500";
    }
    return "text-gray-500";
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="h-6 w-6 text-green-600" />
          <h2 className="font-semibold text-lg">Plant Analyzer</h2>
        </div>
        <Button
          onClick={onNewSession}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Analysis
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analysis History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.map((session) => {
                const Icon = getSessionIcon(session);
                const isActive = session.id === currentSessionId;

                return (
                  <SidebarMenuItem key={session.id}>
                    <SidebarMenuButton
                      onClick={() => onSessionSelect(session.id)}
                      isActive={isActive}
                      className="flex items-center gap-3 p-3"
                    >
                      <Icon
                        className={`h-4 w-4 ${getSessionIconColor(session)}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {getSessionDisplayName(session)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(session.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      {session.result && (
                        <Badge variant="secondary" className="text-xs">
                          {session.result.confidence}/10
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {sessions.length === 0 && (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No analyses yet. Start by uploading a plant image!
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

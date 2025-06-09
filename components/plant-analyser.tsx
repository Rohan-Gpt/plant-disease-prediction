"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { AnalysisPage } from "@/components/analysis-page";
import type { AnalysisSession } from "@/types/analysis";

const STORAGE_KEY = "plant-analysis-sessions";

export default function PlantAnalyzer() {
  const [sessions, setSessions] = useState<AnalysisSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");

  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEY);
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        timestamp: new Date(session.timestamp),
      }));
      setSessions(parsedSessions);

      // Set current session to the most recent one, or create new if none exist
      if (parsedSessions.length > 0) {
        setCurrentSessionId(parsedSessions[0].id);
      } else {
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, []);

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  const createNewSession = () => {
    const newSession: AnalysisSession = {
      id: Date.now().toString(),
      timestamp: new Date(),
      image: "",
      result: null,
      isAnalyzing: false,
      error: null,
    };

    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const updateSession = (
    sessionId: string,
    updates: Partial<AnalysisSession>
  ) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, ...updates } : session
      )
    );
  };

  const deleteSession = (sessionId: string) => {
    setSessions((prev) => {
      const filtered = prev.filter((session) => session.id !== sessionId);

      // If we're deleting the current session, switch to another one or create new
      if (sessionId === currentSessionId) {
        if (filtered.length > 0) {
          setCurrentSessionId(filtered[0].id);
        } else {
          // Create a new session if no sessions left
          const newSession: AnalysisSession = {
            id: Date.now().toString(),
            timestamp: new Date(),
            image: "",
            result: null,
            isAnalyzing: false,
            error: null,
          };
          setCurrentSessionId(newSession.id);
          return [newSession];
        }
      }

      return filtered;
    });
  };

  const currentSession = sessions.find(
    (session) => session.id === currentSessionId
  );

  if (!currentSession) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSessionSelect={setCurrentSessionId}
          onNewSession={createNewSession}
        />
        <SidebarInset className="flex-1">
          <AnalysisPage
            session={currentSession}
            onUpdateSession={updateSession}
            onDeleteSession={deleteSession}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

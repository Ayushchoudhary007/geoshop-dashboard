// TemplateContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

export type TemplateType = "overview" | "report" | "analysis";

type TemplateSelection = {
  overview: string;
  report: string;
  analysis: string;
};

const defaultTemplates: TemplateSelection = {
  overview: "OverviewTemplateA",
  report: "ReportTemplateA",
  analysis: "AnalysisTemplateA",
};

const TemplateContext = createContext<{
  selectedTemplates: TemplateSelection;
  setTemplate: (type: TemplateType, name: string) => void;
}>({
  selectedTemplates: defaultTemplates,
  setTemplate: () => {},
});

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTemplates, setSelectedTemplates] = useState<TemplateSelection>(
    () => {
      const stored = localStorage.getItem("template-selections");
      return stored ? JSON.parse(stored) : defaultTemplates;
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "template-selections",
      JSON.stringify(selectedTemplates)
    );
  }, [selectedTemplates]);

  const setTemplate = (type: TemplateType, name: string) => {
    setSelectedTemplates((prev) => ({ ...prev, [type]: name }));
  };

  return (
    <TemplateContext.Provider value={{ selectedTemplates, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => useContext(TemplateContext);

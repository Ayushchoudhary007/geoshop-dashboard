// pages/Analysis.tsx (same for Home.tsx, Report.tsx, etc.)
import { useEffect } from "react";
import { useTemplateStore } from "@/store/templateStore";
import { templateMap } from "@/constants/templateMap";

export default function AnalysisPage() {
  const { assignments, fetchTemplatesForUser } = useTemplateStore();
  const templates = assignments["Analysis"] || [];

  useEffect(() => {
    fetchTemplatesForUser(); // call only once
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analysis Dashboard</h1>
      <div className="grid lg:grid-cols-2  md:grid-cols-1 gap-12">
        {templates.map((id) => {
          const Comp = templateMap[id];
          return Comp ? <Comp key={id} /> : null;
        })}
      </div>
    </div>
  );
}

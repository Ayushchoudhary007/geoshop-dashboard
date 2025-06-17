// pages/Analysis.tsx (same for Home.tsx, Report.tsx, etc.)
import { useEffect } from "react";
import { useTemplateStore } from "@/store/templateStore";
import { templateMap } from "@/data/templateMap";

export default function ReportPage() {
  const { assignments, fetchTemplatesForUser } = useTemplateStore();
  const templates = assignments["Report"] || [];

  useEffect(() => {
    fetchTemplatesForUser(); // call only once
  }, []);

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-[#0f1c3f] min-h-screen text-white">
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Report Dashboard</h1>
      <div className="grid lg:grid-cols-2  md:grid-cols-1 gap-12">
        {templates.map((id) => {
          const Comp = templateMap[id as keyof typeof templateMap];
          return Comp ? <Comp key={id} /> : null;
        })}
      </div>
    </div>
    </div>
  );
}

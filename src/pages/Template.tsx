// pages/Template.tsx
import { useTemplateStore } from "@/store/templateStore";
import { useState } from "react";
import { templateMap } from "@/constants/templateMap";

export default function TemplatePage() {
  const { setTemplatesForPage, assignments } = useTemplateStore();
  const [selectedPage, setSelectedPage] = useState("Home");

  // Load current selection for the selected page
  const selectedTemplates = assignments[selectedPage] || [];

  const toggleTemplate = (id: string) => {
    const newTemplates = selectedTemplates.includes(id)
      ? selectedTemplates.filter((t) => t !== id)
      : [...selectedTemplates, id];

    setTemplatesForPage(selectedPage, newTemplates);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Select Templates for a Page</h2>

      <select
        value={selectedPage}
        onChange={(e) => setSelectedPage(e.target.value)}
        className="border p-2 rounded bg-black"
      >
        <option value="Home">Home</option>
        <option value="Analysis">Analysis</option>
        <option value="Report">Report</option>
        {/* Add more pages if needed */}
      </select>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.entries(templateMap).map(([id, Comp]) => (
          <div
            key={id}
            onClick={() => toggleTemplate(id)}
            className={`border rounded p-4 cursor-pointer ${
              selectedTemplates.includes(id) ? "bg-blue-200" : "bg-white"
            }`}
          >
            <Comp />
          </div>
        ))}
      </div>
    </div>
  );
}

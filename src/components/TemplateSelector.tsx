import { useState } from "react";
import { templateLibrary } from "../data/templates";
import { useTemplateStore } from "../store/templateStore";

const TemplateSelector = ({ page }: { page: string }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const assignTemplate = useTemplateStore((s) => s.assignTemplate);

  const handleChange = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const applyTemplates = () => assignTemplate(page, selected);

  return (
    <div className="p-4 border rounded">
      <h2>Select Components for "{page}"</h2>
      {templateLibrary.map((tpl) => (
        <div key={tpl.id}>
          <input
            type="checkbox"
            checked={selected.includes(tpl.id)}
            onChange={() => handleChange(tpl.id)}
          />
          <label className="ml-2">{tpl.name}</label>
        </div>
      ))}
      <button onClick={applyTemplates} className="mt-4 btn btn-primary">
        Apply
      </button>
    </div>
  );
};

export default TemplateSelector;

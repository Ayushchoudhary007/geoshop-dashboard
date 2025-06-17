import { useState } from "react";
import { useTemplateStore } from "../store/templateStore";
import { templateLibrary } from "../data/templates";

interface Template {
  id: string;
  name: string;
}

const TemplateSelector = ({ page }: { page: string }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const setTemplatesForPage = useTemplateStore((s) => s.setTemplatesForPage);

  const handleChange = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const applyTemplates = () => setTemplatesForPage(page, selected);

  return (
    <div className="p-4 border rounded">
      <h2>Select Components for "{page}"</h2>
      {templateLibrary.map((tpl: Template) => (
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

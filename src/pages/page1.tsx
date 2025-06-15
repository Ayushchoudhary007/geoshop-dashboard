import TemplateSelector from "../components/TemplateSelector";
import PageRenderer from "../components/PageRenderer";

const Page1 = () => (
  <div className="p-6">
    <h1 className="text-xl mb-4">Page 1</h1>
    <TemplateSelector page="Page1" />
    <PageRenderer page="Page1" />
  </div>
);

export default Page1;

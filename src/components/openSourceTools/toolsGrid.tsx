import ToolsCard from "@/components/openSourceTools/toolsCard";
import { OpenSourceTools } from "@/components/openSourceTools/constant/openSourceToolsList";

export default function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 justify-evenly lg:px-10">
      {OpenSourceTools.map((tool, index) => (
        <ToolsCard
          key={index}
          description={tool.description || ""}
          projectName={tool.projectName || ""}
          imageURI={tool.imageUrl || ""}
          index={index || 0}
          projectUrl={tool.projectUrl}
        ></ToolsCard>
      ))}
    </div>
  );
}

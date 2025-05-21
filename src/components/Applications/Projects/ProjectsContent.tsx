import type { WindowKey } from "../../../services/types";
import TopCommonMenuBar from "../../util/TopCommonMenuBar";
import WindowTopNavigation from "../../util/WindowTopNavigation";
import WindowSideMenu from "../../util/WindowSideMenu";

interface ProjectsContentProps {
    windowKey: WindowKey;
}

const ProjectsContent: React.FC<ProjectsContentProps> = ({ windowKey }) => {
    return (
        <div className="flex flex-col h-full w-full overflow-auto">
            <TopCommonMenuBar items={['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help']} />
            <WindowTopNavigation windowKey={windowKey} />
            <div className="w-full h-full flex relative flex-1 min-h-0">
                <div className="h-full flex-shrink-0">
                    <WindowSideMenu items={['SystemTasks', 'Other', 'Details']} />
                </div>

                {/* PlaceHolder  */}
                <div className="flex-1 overflow-auto h-full bg-white">

                </div>
            </div>
        </div>
    );
};
export default ProjectsContent;
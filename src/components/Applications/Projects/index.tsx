import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";

import ProjectContent from "./ProjectsContent";

const Projects: React.FC = () => {
    const windowKey: WindowKey = "Projects";
    return (
        <WindowWrapper windowKey={windowKey}>
            <ProjectContent windowKey={windowKey} />
        </WindowWrapper>
    );
};
export default Projects;
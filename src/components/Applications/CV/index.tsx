import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";

import CVContent from "./CVContent";

const CV: React.FC = () => {
    const windowKey: WindowKey = "CV";
    return (
        <WindowWrapper windowKey={windowKey} minWidth={500} minHeight={500}>
            <CVContent windowKey={windowKey} />
        </WindowWrapper>
    );
};
export default CV;
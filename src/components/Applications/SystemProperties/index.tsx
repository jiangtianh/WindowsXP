import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import SystemPropertiesContent from "./SystemPropertiesContent";

const SystemProperties: React.FC = () => {
    const windowKey: WindowKey = "SystemProperties";
    return (
        <WindowWrapper windowKey={windowKey}>
            <SystemPropertiesContent />
        </WindowWrapper>
    )
};
export default SystemProperties;
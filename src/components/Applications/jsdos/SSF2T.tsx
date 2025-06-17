import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import JsdosContent from "./jsdosContent";

const SSF2T = () => {
    const windowKey: WindowKey = "SSF2T";
    return (
        <WindowWrapper windowKey={windowKey}>
            <JsdosContent bundleUrl="SSF2T.jsdos" />
        </WindowWrapper>
    );
};
export default SSF2T;
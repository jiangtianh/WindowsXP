import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import JsdosContent from "./jsdosContent";

const Pinball = () => {
    const windowKey: WindowKey = "jsdos";
    return (
        <WindowWrapper windowKey={windowKey}>
            <JsdosContent bundleUrl="DOOM.jsdos" />
        </WindowWrapper>
    );
};
export default Pinball;
import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import JsdosContent from "./jsdosContent";

const Doom = () => {
    const windowKey: WindowKey = "Doom";
    return (
        <WindowWrapper windowKey={windowKey}>
            <JsdosContent bundleUrl="DOOM.jsdos" />
        </WindowWrapper>
    );
};
export default Doom;
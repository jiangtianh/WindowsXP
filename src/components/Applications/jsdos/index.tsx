import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import PinballContent from "./jsdosContent";

const Pinball = () => {
    const windowKey: WindowKey = "jsdos";
    return (
        <WindowWrapper windowKey={windowKey}>
            <PinballContent bundleUrl="DOOM.jsdos" />
        </WindowWrapper>
    );
};
export default Pinball;
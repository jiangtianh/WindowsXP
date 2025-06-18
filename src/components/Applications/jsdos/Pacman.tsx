import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import JsdosContent from "./jsdosContent";

const Pacman = () => {
    const windowKey: WindowKey = "Pacman";
    return (
        <WindowWrapper windowKey={windowKey}>
            <JsdosContent bundleUrl="PACMAN.jsdos" />
        </WindowWrapper>
    );
};
export default Pacman;
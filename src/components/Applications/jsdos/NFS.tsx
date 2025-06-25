import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import JsdosContent from "./jsdosContent";

const NFS = () => {
    const windowKey: WindowKey = "NFS";
    return (
        <WindowWrapper windowKey={windowKey}>
            <JsdosContent bundleUrl="NFS.jsdos" />
        </WindowWrapper>
    );
};
export default NFS;
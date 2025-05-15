
import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";

import NotepadContent from "./NotepadContent";


const Notepad: React.FC = () => {
    const windowKey: WindowKey = "Notepad";
    return (
        <WindowWrapper windowKey={windowKey}>
            <NotepadContent windowKey={windowKey} />
        </WindowWrapper>
    );
};
export default Notepad;
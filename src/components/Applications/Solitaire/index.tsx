import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";

import SolitaireContent from "./SolitaireContent";

const Solitaire: React.FC = () => {
    const windowKey: WindowKey = "Solitaire";
    return (
        <WindowWrapper windowKey={windowKey} minWidth={600} minHeight={200}>
            <SolitaireContent />
        </WindowWrapper>
    );
};
export default Solitaire;
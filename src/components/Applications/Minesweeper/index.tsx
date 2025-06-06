import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import MinesweeperContent from "./MinesweeperContent";


const Minesweeper: React.FC = () => {
    const windowKey: WindowKey = "Minesweeper";

    return (
        <WindowWrapper windowKey={windowKey} minWidth={205} minHeight={305} enableResizing={false} hideMaximize={true}>
            <MinesweeperContent />
        </WindowWrapper>
    );
};
export default Minesweeper;
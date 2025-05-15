import useSound from "use-sound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../services/store";

import Taskbar from "../Taskbar";
import DesktopIcons from "./DesktopIcons";

import Notepad from "../Applications/Notepad";
import { unfocusAllWindows } from "../../services/Windows/windowsSlice";

const Desktop: React.FC = () => {
    const dispatch = useDispatch();

    const [playStartupSound] = useSound("/sound/start-windows.mp3");
    useEffect(() => {
        playStartupSound();
    }, [playStartupSound]);

    const windows = useSelector((state: RootState) => state.windows.windows);

    const handleBackgroundClick = () => {
        dispatch(unfocusAllWindows())
    }

    return (
        <>
            <div className="xp-background h-[calc(100vh-32px)] w-full overflow-hidden relative"
                onClick={handleBackgroundClick}
            >
                <DesktopIcons />

                <Notepad />

            </div>
            <Taskbar />
        </>
    )
};
export default Desktop;
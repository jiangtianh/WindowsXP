import useSound from "use-sound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVolume } from "../../services/volumeSlice";
import { unfocusAllWindows } from "../../services/Windows/windowsSlice";
import { TASKBAR_HEIGHT } from "../Taskbar";

import Taskbar from "../Taskbar";
import DesktopIcons from "./DesktopIcons";

import Notepad from "../Applications/Notepad";
import Projects from "../Applications/Projects";
import CV from "../Applications/CV";
import Minesweeper from "../Applications/Minesweeper";
import Jsdos from "../Applications/jsdos";
import Pinball from "../Applications/Pinball";
import VirtualRei from "../Applications/VirtualRei";
import Solitaire from "../Applications/Solitaire";
import SystemProperties from "../Applications/SystemProperties";
import MyDocuments from "../Applications/MyDocuments";
import ContactMe from "../Applications/ContactMe";

const Desktop: React.FC = () => {
    const dispatch = useDispatch();
    const volume = useSelector(selectVolume);

    const [playStartupSound] = useSound("/sound/start-windows.mp3", { volume: volume / 100 });
    useEffect(() => {
        playStartupSound();
    }, [playStartupSound]);

    // const windows = useSelector((state: RootState) => state.windows.windows);

    const handleBackgroundClick = () => {
        dispatch(unfocusAllWindows())
    }

    return (
        <>
            <div
                id="desktop"
                className="xp-background w-full relative overflow-hidden"
                onClick={handleBackgroundClick}
                style={{
                    height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
                }}
            >
                <DesktopIcons />


                <Notepad />
                <CV />
                <Projects />
                <Minesweeper />

                <Jsdos />

                <Pinball />
                <VirtualRei />
                <Solitaire />

                <SystemProperties />

                <MyDocuments />
                <ContactMe />

            </div>
            <Taskbar />
        </>
    )
};
export default Desktop;
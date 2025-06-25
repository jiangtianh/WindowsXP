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
import Pinball from "../Applications/Pinball";
import VirtualRei from "../Applications/VirtualRei";
import Solitaire from "../Applications/Solitaire";
import SystemProperties from "../Applications/SystemProperties";
import MyDocuments from "../Applications/MyDocuments";
import ContactMe from "../Applications/ContactMe";
import WinampPlayer from "../Applications/Winamp";
import MyPictures from "../Applications/MyPictures";

import Doom from "../Applications/jsdos/Doom";
import Pacman from "../Applications/jsdos/Pacman";
import NFS from "../Applications/jsdos/NFS";

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
    };

    return (
        <div id="desktop-container">
            <div
                id="desktop"
                className="xp-background relative"
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

                <Doom />
                <Pacman />
                <NFS />

                <Pinball />
                <VirtualRei />
                <Solitaire />

                <SystemProperties />

                <MyDocuments />
                <ContactMe />
                <WinampPlayer />
                <MyPictures />

            </div>
            <Taskbar />
        </div>
    )
};
export default Desktop;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../services/store";
import { BootPhase, setBootPhase } from "../../services/bootStatusSlice";
import useSound from "use-sound";
import { selectVolume } from "../../services/volumeSlice";

const Shutdown: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const volume = useSelector(selectVolume);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setBootPhase(BootPhase.BIOS));
        }, 4000);
        return () => clearTimeout(timer);
    }, [dispatch]);

    const [playShutdownSound] = useSound("/sound/shutdown-windows.mp3", { volume: volume / 100 });
    useEffect(() => {
        playShutdownSound();
    }, [playShutdownSound]);


    return (
        <div className="bg-black h-screen w-screen"></div>
    )
};
export default Shutdown;
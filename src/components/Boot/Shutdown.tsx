import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../services/store";
import { BootPhase, setBootPhase } from "../../services/bootStatusSlice";
import useSound from "use-sound";

const Shutdown: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setBootPhase(BootPhase.BIOS));
        }, 4000);
        return () => clearTimeout(timer);
    }, [dispatch]);

    const [playShutdownSound] = useSound("/sound/shutdown-windows.mp3");
    useEffect(() => {
        playShutdownSound();
    }, [playShutdownSound]);


    return (
        <div className="bg-black h-full w-full"></div>
    )
};
export default Shutdown;
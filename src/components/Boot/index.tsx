import { useSelector } from "react-redux";
import { selectBootPhase, BootPhase } from "../../services/bootStatusSlice";

import Desktop from "../Desktop";
import BootLoading from "./BootLoading";
import BootBios from "./BootBios";
import LoginPage from "./LoginPage";
import Shutdown from "./Shutdown";

const BootController: React.FC = () => {
    const currentPhase = useSelector(selectBootPhase);

    switch (currentPhase) {
        case BootPhase.SHUTDOWN:
            return <Shutdown />;
        case BootPhase.BIOS:
            return <BootBios />;
        case BootPhase.LOADING:
            return <BootLoading />;
        case BootPhase.LOGIN:
            return <LoginPage />;
        case BootPhase.DESKTOP:
            return <Desktop />;
        default:
            return <h1>UNKNOWN ERROR</h1>;
    }
};
export default BootController;
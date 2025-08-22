import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import WeatherContent from "./WeatherContent";

const Weather: React.FC = () => {
    const windowKey: WindowKey = "Weather";
    return (
        <WindowWrapper windowKey={windowKey}>
            <WeatherContent />
        </WindowWrapper>
    );
};
export default Weather;
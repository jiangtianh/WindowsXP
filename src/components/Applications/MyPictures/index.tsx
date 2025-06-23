import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import MyPicturesContent from "./MyPicturesContent";

const MyPictures: React.FC = () => {
    const windowKey: WindowKey = "MyPictures";

    return (
        <WindowWrapper windowKey={windowKey}>
            <MyPicturesContent windowKey={windowKey} />
        </WindowWrapper>
    );
};
export default MyPictures;
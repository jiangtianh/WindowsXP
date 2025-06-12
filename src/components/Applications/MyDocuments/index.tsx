import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import MyDocumentsContent from "./MyDocumentsContent";


const MyDocuments: React.FC = () => {
    const windowKey: WindowKey = "MyDocuments";

    return (
        <WindowWrapper windowKey={windowKey}>
            <MyDocumentsContent windowKey={windowKey} />
        </WindowWrapper>
    );
};
export default MyDocuments;
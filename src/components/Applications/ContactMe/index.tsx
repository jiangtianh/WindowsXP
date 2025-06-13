import WindowWrapper from "../../util/WindowWrapper";
import type { WindowKey } from "../../../services/types";
import ContactMeContent from "./ContactMeContent";

const ContactMe: React.FC = () => {
    const windowKey: WindowKey = "ContactMe";
    return (
        <WindowWrapper windowKey={windowKey}>
            <ContactMeContent />
        </WindowWrapper>
    );
};
export default ContactMe;
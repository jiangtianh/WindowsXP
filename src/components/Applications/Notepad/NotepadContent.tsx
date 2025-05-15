import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../services/store";
import type { WindowKey } from "../../../services/types";
import TopCommonMenuBar from "../../util/TopCommonMenuBar";

import "./NotepadContent.css";

interface NotepadContentProps {
    windowKey: WindowKey;
}

const NotepadContent: React.FC<NotepadContentProps> = ({ windowKey }) => {
    const [content, setContent] = useState<string>("");
    const isFocused = useSelector((state: RootState) => state.windows.windows[windowKey].isFocused);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isFocused && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isFocused]);


    return (
        <div className="flex flex-col h-full w-full overflow-hidden">

            <TopCommonMenuBar />

            <div className="h-full">
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    spellCheck="false"
                    className="h-full w-full px-1 resize-none outline-none notepad-textarea"
                />
            </div>
        </div>
    )
};
export default NotepadContent;
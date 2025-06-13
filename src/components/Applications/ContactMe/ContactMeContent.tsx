import TopCommonMenuBar from "../../util/TopCommonMenuBar";


const SendButtonIcon = "/icons/OESend64x64.webp";
const CutButtonIcon = "/icons/Cut64x64.webp";
const CopyButtonIcon = "/icons/Copy64x64.webp";
const PasteButtonIcon = "/icons/Paste64x64.webp";
const UndoButtonIcon = "/icons/Undo64x64.webp";
const AttachButtonIcon = "/icons/OEAttatch64x64.webp";
const SignButtonIcon = "/icons/OESign64x64.webp";
const EncryptButtonIcon = "/icons/OEEncrypt64x64.webp";
const EmailAddressIcon = "/icons/EmailAddressIcon.webp";



const ContactMeContent: React.FC = () => {

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <TopCommonMenuBar items={['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Message', 'Help']} />
            <form
                className="h-full flex flex-col"
            >
                {/* Top header buttons bar */}
                <div className="font-family-tahoma flex-shrink-0 select-none">
                    <div className="flex items-center relative top-0 w-full h-14 window-top-navigation-bar overflow-hidden px-1">

                        {/* Send Button */}
                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={SendButtonIcon}
                                    alt="Send"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Send</span>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center h-full min-w-max">
                            <div className="h-7/8 w-px bg-[#C0C0C0]"></div>
                        </div>



                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={CutButtonIcon}
                                    alt="Cut"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Cut</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={CopyButtonIcon}
                                    alt="Copy"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Copy</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={PasteButtonIcon}
                                    alt="Paste"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Paste</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={UndoButtonIcon}
                                    alt="Undo"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Undo</span>
                        </div>


                        {/* Divider */}
                        <div className="flex items-center h-full min-w-max">
                            <div className="h-7/8 w-px bg-[#C0C0C0]"></div>
                        </div>


                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={AttachButtonIcon}
                                    alt="Attach"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Attach</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={SignButtonIcon}
                                    alt="Sign"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Sign</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={EncryptButtonIcon}
                                    alt="Encrypt"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Encrypt</span>
                        </div>
                    </div>
                </div>

                <div
                    className="window-top-navigation-bar h-22 flex flex-col px-2 py-1 gap-1 items-center w-full font-family-pixelated-ms-sans-serif"
                    style={{ fontSize: '0.65rem' }}
                >
                    <div className="w-full flex gap-2">
                        <div className="flex gap-1 w-14 items-center">
                            <img src={EmailAddressIcon} alt="Email Address" className="w-4 h-4" />
                            <label htmlFor="ToEmail">To:</label>
                        </div>
                        <input type="email" id="ToEmail" name="ToEmail"
                            className="w-full"
                            value={"jiangtianh@gmail.com"} readOnly
                        />
                    </div>

                    <div className="w-full flex gap-2">
                        <div className="flex gap-1 w-14 items-center">
                            <img src={EmailAddressIcon} alt="Email Address" className="w-4 h-4" />
                            <label htmlFor="ToEmail">From:</label>
                        </div>
                        <input type="email" id="ToEmail" name="ToEmail"
                            className="w-full p-1.5"
                            value={"jiangtianh@gmail.com"} readOnly
                        />
                    </div>

                    <div className="w-full flex gap-2">
                        <div className="flex gap-1 w-14 items-center">
                            <label htmlFor="ToEmail">Subject:</label>
                        </div>
                        <input type="email" id="ToEmail" name="ToEmail"
                            className="w-full p-1.5"
                            value={"jiangtianh@gmail.com"} readOnly
                        />
                    </div>

                </div>

                <div className="flex flex-col h-full p-2 bg-white">
                    <textarea
                        className="w-full h-full"
                        style={{ fontSize: '0.9rem', border: '1px solid #7f9db9' }}
                        placeholder="Message here..."
                    />
                    <div className="font-family-pixelated-ms-sans-serif my-2 italic">If you have any questions, talk about a project, or just have a chat, feel free to leave me a message and I'll get back to you ASAP!</div>
                </div>

            </form>
        </div>
    );
};
export default ContactMeContent;
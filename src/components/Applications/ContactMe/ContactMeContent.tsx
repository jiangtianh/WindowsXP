import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
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

    const [fromEmail, setFromEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [bottomText, setBottomText] = useState("If you have any questions, talk about a project, or just have a chat, feel free to leave me a message and I'll get back to you ASAP!");

    const formRef = useRef<HTMLFormElement>(null);


    const isFormValid = fromEmail.trim() !== "" && subject.trim() !== "" && message.trim() !== "";

    const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!emailJsPublicKey || !emailJsServiceId || !emailJsTemplateId) {
        console.error("EmailJS configuration is missing. Please check your environment variables.");
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }

        setBottomText("Sending your message...");

        try {
            emailjs.init({
                publicKey: emailJsPublicKey,
                limitRate: { throttle: 10000 }
            });
            const templateParams = {
                from_email: fromEmail,
                subject: subject,
                message: message,
            };
            const response = await emailjs.send(
                emailJsServiceId,
                emailJsTemplateId,
                templateParams
            );
            console.log('Email sent successfully:', response);
            setBottomText("Your message has been sent successfully!");
        } catch (error) {
            console.error('Error sending email', error);
            setBottomText("Failed to send your message. Please try again later.");
        }
    };


    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <TopCommonMenuBar items={['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Message', 'Help']} />
            <form
                ref={formRef}
                className="h-full flex flex-col"
                onSubmit={handleSubmit}
            >
                {/* Top header buttons bar */}
                <div className="font-family-tahoma flex-shrink-0 select-none">
                    <div className="flex items-center relative top-0 w-full h-14 window-top-navigation-bar overflow-hidden px-1">

                        {/* Send Button */}
                        <div
                            className={`flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0 ${isFormValid ? 'cursor-pointer' : 'disabled cursor-not-allowed'}`}
                            role="button"
                            aria-label="Send email"
                            aria-disabled={!isFormValid}
                            onClick={() => isFormValid && formRef.current?.requestSubmit()}
                        >
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



                        <div
                            className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0 cursor-pointer"
                            role="button"
                            aria-label="Cut"
                        >
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={CutButtonIcon}
                                    alt="Cut"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Cut</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0 cursor-pointer">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={CopyButtonIcon}
                                    alt="Copy"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Copy</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0 cursor-pointer">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={PasteButtonIcon}
                                    alt="Paste"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Paste</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0 cursor-pointer">
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


                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0 cursor-pointer">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={AttachButtonIcon}
                                    alt="Attach"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Attach</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0 cursor-pointer">
                            <div className="h-7 flex items-center justify-center">
                                <img
                                    src={SignButtonIcon}
                                    alt="Sign"
                                    className="w-full h-full"
                                />
                            </div>
                            <span className="mt-auto">Sign</span>
                        </div>

                        <div className="flex flex-col items-center mx-px top-buttons rounded-xs px-1 py-0.5 h-12 w-13 flex-shrink-0 cursor-pointer">
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
                    className="window-top-navigation-bar flex flex-col px-2 py-1 gap-1 items-center w-full font-family-pixelated-ms-sans-serif"
                    style={{ fontSize: '0.65rem' }}
                >
                    <div className="w-full flex gap-2">
                        <div className="flex gap-1 w-14 items-center">
                            <img src={EmailAddressIcon} alt="Email Icon" className="w-4 h-4" />
                            <label htmlFor="toEmail">To:</label>
                        </div>
                        <input type="email" id="toEmail" name="toEmail"
                            className="w-full"
                            value={"jiangtianh@gmail.com"} readOnly
                        />
                    </div>

                    <div className="w-full flex gap-2">
                        <div className="flex gap-1 w-14 items-center">
                            <img src={EmailAddressIcon} alt="Email Icon" className="w-4 h-4" />
                            <label htmlFor="fromEmail">From:</label>
                        </div>
                        <input
                            type="email"
                            id="fromEmail"
                            name="fromEmail"
                            className="w-full p-1.5"
                            value={fromEmail}
                            onChange={(e) => setFromEmail(e.target.value)}
                            placeholder="Your email address"
                            required
                        />
                    </div>

                    <div className="w-full flex gap-2">
                        <div className="flex gap-1 w-14 items-center">
                            <label htmlFor="subject">Subject:</label>
                        </div>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="w-full p-1.5"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject of your message"
                            required
                        />
                    </div>

                </div>

                <div className="flex flex-col h-full p-2 bg-white">
                    <textarea
                        className="w-full h-full"
                        style={{ fontSize: '0.9rem', border: '1px solid #7f9db9' }}
                        placeholder="Message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <div className="font-family-pixelated-ms-sans-serif my-2 italic">{bottomText}</div>
                </div>

            </form>
        </div>
    );
};
export default ContactMeContent;
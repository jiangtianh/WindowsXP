import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSystemInfo, selectClientInfo } from "../../services/clientInfoSlice";
import type { AppDispatch } from "../../services/store";
import { BootPhase, setBootPhase } from "../../services/bootStatusSlice";


const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const BootBios: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const clientInfo = useSelector(selectClientInfo);

    const [bootMessages, setBootMessages] = useState<string[]>([]);
    const [bootComplete, setBootComplete] = useState(false);

    const addBootMessage = (message: string) => {
        setBootMessages((prevMessages) => [...prevMessages, message]);
    };

    useEffect(() => {
        if (!clientInfo.fetched) {
            console.log("Fetching system info...");
            addBootMessage("Fetching system information...");
            dispatch(getSystemInfo());
        }
    }, [clientInfo.fetched, dispatch]);


    useEffect(() => {
        if (!clientInfo.fetched) return;

        const runBootSequence = async () => {

            addBootMessage("Starting BIOS POST process...");
            await wait(80);
            addBootMessage("Checking memory...");
            await wait(100);
            addBootMessage("Memory OK");
            await wait(80);
            addBootMessage("Detecting CPU...");
            await wait(800);

            const startTime = Date.now();
            while (!clientInfo.fetched && Date.now() - startTime < 5000) {
                await wait(100);
            }

            if (clientInfo.cpuCores) {
                addBootMessage(`CPU: ${clientInfo.cpuCores} cores detected`);
            } else {
                addBootMessage("CPU: Unknown Processor");
            }
            await wait(200);

            addBootMessage("Detecting graphics adapter...");
            await wait(150);
            if (clientInfo.gpu) {
                addBootMessage(`Graphics: ${clientInfo.gpu}`);
            } else {
                addBootMessage("Graphics: Standard VGA Graphics Adapter");
            }
            await wait(50);

            addBootMessage("Detecting Display...");
            await wait(250);
            if (clientInfo.displayRes) {
                addBootMessage(`Display: ${clientInfo.displayRes}`);
            } else {
                addBootMessage("Display: Unknown");
            }
            await wait(60);

            addBootMessage("Detecting system information...");
            await wait(500);
            if (clientInfo.osName) {
                addBootMessage(`OS: ${clientInfo.osName || "xxx"} ${clientInfo.osVersion || "xxx"}`);
            } else {
                addBootMessage("OS: Jiangtian's Windows XP");
            }
            await wait(100);

            addBootMessage("Detecting network adapter...");
            await wait(60);
            addBootMessage("Network adapter OK");

            if (clientInfo.ip) {
                await (30);
                addBootMessage(`IP: ${clientInfo.ip}`);
                if (clientInfo.location) {
                    await wait(20);
                    addBootMessage(`Location: ${clientInfo.location}`);
                    addBootMessage(`Coordinates: ${clientInfo.coordinates}`);
                }
            }
            await wait(80);

            addBootMessage("BIOS POST Process Complete");
            await wait(60);
            addBootMessage("Booting to Jiangtian's Windows XP...");
            await wait(150);

            setBootComplete(true);
        };

        runBootSequence();

    }, [clientInfo]);

    useEffect(() => {
        console.log("BIOS Boot complete:", bootComplete);
        if (bootComplete) {
            const timer = setTimeout(() => {
                dispatch(setBootPhase(BootPhase.LOADING));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [bootComplete, dispatch]);

    return (
        <div className="h-svh w-screen bg-black text-white font-family-perfect-dos-vga-437-win text-sm p-8 flex flex-col">
            <div className="flex-1 mt-10">
                {bootMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-3 ${index === bootMessages.length - 1 ? "animate-blink" : ""}`}
                    >
                        {message}
                    </div>
                ))}
            </div>
        </div>
    )
};
export default BootBios;
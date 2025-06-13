import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectVolume } from "../../../services/volumeSlice";
import "./jsdosContent.css";

// Add global type declaration
declare global {
    interface Window {
        Dos: any;
    }
}

interface JsdosContentProps {
    bundleUrl: string;
}

const PinballContent: React.FC<JsdosContentProps> = ({ bundleUrl }) => {
    const dosRef = useRef<HTMLDivElement>(null);
    const dosInstanceRef = useRef<any>(null);

    const volumeLevel = useSelector(selectVolume);

    useEffect(() => {
        if (!dosRef.current) return;

        const initializeDos = async () => {
            try {
                if (!window.Dos) {
                    throw new Error("js-dos not loaded");
                }

                // Create Dos instance with autostart configuration
                dosInstanceRef.current = window.Dos(dosRef.current!, {
                    url: bundleUrl,
                    autoStart: true,
                    noFullscreen: false,
                    noSocialLinks: true,
                    kiosk: true,
                    onStart: () => {
                        console.log("Game started!");
                        // Apply initial volume when game starts
                        applyVolumeToJsDos();
                    },
                    onExit: () => {
                        console.log("Game exited!");
                    }
                });

                console.log("Game is initializing...");

            } catch (error) {
                console.error("Failed to run DOS game:", error);
            }
        };

        setTimeout(initializeDos, 100);

        return () => {
            if (dosInstanceRef.current) {
                try {
                    if (dosInstanceRef.current.stop) {
                        dosInstanceRef.current.stop();
                    }
                } catch (e) {
                    console.warn("Error stopping DOS instance:", e);
                }
            }
        };
    }, [bundleUrl]);

    const applyVolumeToJsDos = () => {
        if (!dosInstanceRef.current) return;

        try {
            const effectiveVolume = volumeLevel / 100;
            if (dosInstanceRef.current.setVolume) {
                dosInstanceRef.current.setVolume(effectiveVolume);
            } else if (dosInstanceRef.current.audio) {
                dosInstanceRef.current.audio.volume = effectiveVolume;
            }
        } catch (error) {
            console.error("Error applying volume to js-dos:", error);
        }
    };

    useEffect(() => {
        applyVolumeToJsDos();
    }, [volumeLevel]);

    return (
        <div
            ref={dosRef}
            className="w-full h-full"
        />
    );
};

export default PinballContent;
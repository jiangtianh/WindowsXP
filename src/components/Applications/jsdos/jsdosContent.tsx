import { useEffect, useRef, useState } from "react";
import "./jsDosContent.css";

// Add global type declaration
declare global {
    interface Window {
        Dos: any;
    }
}

interface PinballContentProps {
    bundleUrl: string;
}

const PinballContent: React.FC<PinballContentProps> = ({ bundleUrl }) => {
    const dosRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!dosRef.current) return;

        let dosInstance: any = null;

        const initializeDos = async () => {
            try {

                // Wait for js-dos to be available
                if (!window.Dos) {
                    throw new Error("js-dos not loaded");
                }

                // Create Dos instance with autostart configuration
                dosInstance = window.Dos(dosRef.current!, {
                    url: bundleUrl,
                    autoStart: true,
                    noFullscreen: false,
                    noSocialLinks: true,
                    kiosk: true,
                    onStart: () => {
                        console.log("Game started!");
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

        // Small delay to ensure js-dos is loaded
        setTimeout(initializeDos, 100);

        return () => {
            if (dosInstance) {
                try {
                    // Clean up if there's a stop method
                    if (dosInstance.stop) {
                        dosInstance.stop();
                    }
                } catch (e) {
                    console.warn("Error stopping DOS instance:", e);
                }
            }
        };
    }, [bundleUrl]);

    return (
        <div
            ref={dosRef}
            className="w-full h-full"
        />
    );
};

export default PinballContent;
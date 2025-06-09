import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectClientInfo, getSystemInfo } from "../../../services/clientInfoSlice";
import type { AppDispatch } from "../../../services/store";

const SystemPropertiesContent: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const clientInfoSlice = useSelector(selectClientInfo);

    const [currentTab, setCurrentTab] = useState('tab-general');

    useEffect(() => {
        if (!clientInfoSlice.fetched) {
            console.log("Fetching system info...");
            dispatch(getSystemInfo());
        }
    }, [clientInfoSlice.fetched, dispatch]);

    if (clientInfoSlice.loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading system information...</p>
            </div>
        );
    };

    const tabs = [
        {
            id: 'tab-general',
            name: 'General',
            content: (
                <div className="h-full">
                    <div className="flex items-start p-4">
                        <div className="mr-6 flex-shrink-0">
                            <img
                                src="/img/systemProperties.webp"
                                alt="System Properties Logo"
                                className="h-24 w-24"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs">
                                <div className="mb-1">System:</div>
                                <div className="mb-5 ml-3 flex flex-col gap-1">
                                    <p>Device Type: {clientInfoSlice.deviceType}</p>
                                    <p>{clientInfoSlice.osName}</p>
                                    <p>Version {clientInfoSlice.osVersion}</p>
                                </div>
                                <div className="mb-2">Registered to:</div>
                                <div className="mb-5 ml-3 flex flex-col gap-1">
                                    <p>Jiangtian Han</p>
                                    <p>jiangtianh@gmail.com</p>
                                </div>
                                <div className="mb-1">Browser:</div>
                                <div className="mb-5 ml-3 flex flex-col gap-1">
                                    <p>Browser: {clientInfoSlice.browserName}</p>
                                    <p>Version {clientInfoSlice.browserVersion}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'tab-hardware',
            name: 'Hardware',
            content: (
                <div className="h-full">
                    <div className="flex items-start p-4">
                        <div className="mr-6 flex-shrink-0">
                            <img
                                src="/img/systemProperties.webp"
                                alt="System Properties Logo"
                                className="h-24 w-24"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs">
                                <div className="mb-1">CPU:</div>
                                <div className="mb-5 ml-3 flex flex-col gap-1">
                                    <p>CPU core: {clientInfoSlice.cpuCores}</p>
                                </div>
                                <div className="mb-1">Display:</div>
                                <div className="mb-5 ml-3 flex flex-col gap-1">
                                    <p>Resolution: {clientInfoSlice.displayRes}</p>
                                    <p>GPU: {clientInfoSlice.gpu}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'tab-network',
            name: 'Network',
            content: (
                <div className="h-full">
                    <div className="flex items-start p-4">
                        <div className="mr-6 flex-shrink-0">
                            <img
                                src="/img/systemProperties.webp"
                                alt="System Properties Logo"
                                className="h-24 w-24"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs">
                                <div className="mb-2">Network:</div>
                                <div className="mb-5 ml-3 flex flex-col gap-2">
                                    <p>IP address: {clientInfoSlice.ip}</p>
                                    <p>Location: {clientInfoSlice.location}</p>
                                    <p>Coordinates: {clientInfoSlice.coordinates}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ]

    return (
        <section className="tabs p-3 h-full flex flex-col">
            <menu role="tablist" className="tabs-menu">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-controls={tab.id}
                        aria-selected={currentTab === tab.id}
                        onClick={() => setCurrentTab(tab.id)}
                    >
                        {tab.name}
                    </button>
                ))}
            </menu>

            {tabs.map((tab) => (
                <article
                    key={tab.id}
                    role="tabpanel"
                    id={tab.id}
                    hidden={currentTab !== tab.id}
                    className="flex-1 font-family-pixelated-ms-sans-serif"
                    style={{
                        background: 'white'
                    }}
                >
                    {tab.content}
                </article>
            ))}

        </section>
    );
};
export default SystemPropertiesContent;
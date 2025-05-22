import type { WindowKey } from "../../../services/types";
import TopCommonMenuBar from "../../util/TopCommonMenuBar";
import WindowTopNavigation from "../../util/WindowTopNavigation";

import CVPic from "@assets/CVpic.webp";

interface CVContentProps {
    windowKey: WindowKey;
}

const CVContent: React.FC<CVContentProps> = ({ windowKey }) => {
    return (
        <div className="flex flex-col h-full w-full overflow-auto">
            <TopCommonMenuBar />
            <WindowTopNavigation windowKey={windowKey} />

            <div className="relative overflow-y-scroll bg-white w-full h-full p-2 font-family-pixelated-ms-sans-serif">
                <div>
                    {/* First Row, Img, Name, etc */}
                    <div className="flex mb-5 items-center justify-between">
                        <div className="h-24 flex items-center gap-3">
                            <img src={CVPic} className="h-full" />
                            <div className="flex flex-col">
                                <span className="text-2xl">Jiangtian Han</span>
                                <span className="text-lg">Seattle, WA</span>
                            </div>
                        </div>
                        <div>
                            <button
                                className="cursor-pointer"
                                onClick={() => window.open('https://drive.google.com/file/d/1aiE4eCTDnKY7xAmEaaYVfC_xEyoOlrnt/view?usp=sharing', '_blank')}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>

                    {/* Second Row, Education */}
                    <div className="mb-5 text-sm">
                        <p className="text-xl underline mb-2">Education</p>

                        <div className="mb-3">
                            <div className="flex justify-between w-full">
                                <span className="truncate">
                                    <span className="font-bold">Northeastern University</span> - Khoury College of Computer Sciences
                                </span>
                                <span className="truncate">Seattle, WA</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <div>
                                    <span className="me-1">-</span>
                                    <span>M.S. in Computer Science (GPA: 4.00)</span>
                                </div>
                                <span>May 2025</span>
                            </div>
                            <div className="flex w-full">
                                <span className="me-1">-</span>
                                <span>
                                    Relevant Courses: Data Structure & Algorithms, Distributed System, Object-Oriented Design, Web Development, Database Management, Cloud Computing, Computer Networking...
                                </span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="flex justify-between w-full">
                                <span>
                                    <span className="font-bold">Northwestern University</span> - School of Communication
                                </span>
                                <span>Evanston, IL</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <div>
                                    <span className="me-1">-</span>
                                    <span>M.S. in Leadership for Creative Enterprises (GPA: 3.85)</span>
                                </div>
                                <span>August 2021</span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="flex justify-between w-full">
                                <span className="font-bold">School of the Art Institute of Chicago</span>
                                <span>Chicago, IL</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <div>
                                    <span className="me-1">-</span>
                                    <span>Bachelor of Fine Arts in Studio</span>
                                </div>
                                <span>June 2020</span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="flex justify-between w-full">
                                <span className="font-bold">The Miami Valley School</span>
                                <span>Dayton, OH</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <div>
                                    <span className="me-1">-</span>
                                    <span>High School Diploma</span>
                                </div>
                                <span>June 2016</span>
                            </div>
                        </div>

                    </div>

                    {/* Third Row, Experience */}
                    <div className="mb-5 text-sm">
                        <p className="text-xl underline mb-2">Professional Experience</p>

                        <div className="mb-3">
                            <div className="flex justify-between w-full mb-2">
                                <span>
                                    <span className="font-bold">Baidu</span> - Frontend Developer Intern
                                </span>
                                <span>Beijing, China - Summer 2024</span>
                            </div>

                            <div className="flex w-full">
                                <span className="me-1">-</span>
                                <span>
                                    Contributed to the management and enhancement of Baidu’s internal frontend components library,
                                    creating reusable, high-performance components for both the Baidu mobile app and website using
                                    TypeScript and San (Baidu's open-source MVVM framework).
                                </span>
                            </div>
                            <div className="flex w-full">
                                <span className="me-1">-</span>
                                <span>
                                    Designed and implemented end-to-end (e2e) tests to ensure component reliability across platforms.
                                </span>
                            </div>
                            <div className="flex w-full">
                                <span className="me-1">-</span>
                                <span>
                                    Solely designed and implemented key features for the components demo site, including:
                                </span>
                            </div>
                            <div className="flex w-full">
                                <span className="me-1 ml-3">-</span>
                                <span>
                                    <span className="font-bold">Search Functionality</span>: Engineered a robust search feature, enabling users to efficiently locate
                                    components by name, streamlining workflows for developers.
                                </span>
                            </div>
                            <div className="flex w-full">
                                <span className="me-1 ml-3">-</span>
                                <span>
                                    <span className="font-bold">Mobile Preview</span>: Designed a seamless mobile preview capability, allowing users to scan a QR code
                                    on the demosite and instantly access component demos on their mobile devices.
                                </span>
                            </div>
                            <div className="flex w-full">
                                <span className="me-1 ml-3">-</span>
                                <span>
                                    <span className="font-bold">Dynamic Interactive Demos</span>: Led the transformation of static component demos into dynamic,
                                    interactive displays, allowing users to adjust component attributes and visualize changes in real-time.
                                </span>
                            </div>
                            <div className="flex w-full">
                                <span className="me-1">-</span>
                                <span>
                                    Identified and resolved a critical bug in one of the core components while developing a dynamic demo,
                                    receiving managerial approval for implementing logic optimization that enhanced performance.
                                </span>
                            </div>
                            <div className="flex w-full">
                                <span className="me-1">-</span>
                                <span>
                                    Independently designed and developed an ESLint automation tool to accelerate the transition from an
                                    outdated component library to the updated version. The tool ensured compliance with the latest
                                    components, automatically flagged deprecated components during code commits.
                                </span>
                            </div>


                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};
export default CVContent;
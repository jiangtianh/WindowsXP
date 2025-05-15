
import "./BootLoadingBar.css";

const BootLoadingBar: React.FC = () => {
    return (
        <div className="boot-loading-bar my-11 overflow-hidden rounded-md p-px gap-0.5 h-7 w-80 flex items-center">
            <div className="boot-loading-box inline-block h-5/6 w-4"></div>
            <div className="boot-loading-box inline-block h-5/6 w-4"></div>
            <div className="boot-loading-box inline-block h-5/6 w-4"></div>
        </div>
    );
};
export default BootLoadingBar;
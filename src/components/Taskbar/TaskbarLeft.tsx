import startLogo from '@assets/icons/XPlogo_32x32.webp';

const TaskbarLeft: React.FC = () => {
    return (
        <div className="overflow-hidden h-8">
            <div
                className="start-button text-white h-full text-lg cursor-pointer flex items-center mr-3"
                onClick={() => console.log('Start button clicked!')}
            >
                <div className="flex items-center gap-1 pr-5 pl-2 italic font-bold select-none">
                    <img src={startLogo} alt="Start" width={'28px'} />
                    <span>start</span>
                </div>
            </div>
        </div>
    )
}
export default TaskbarLeft;
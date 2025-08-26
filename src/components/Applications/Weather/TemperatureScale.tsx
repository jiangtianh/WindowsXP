


const TemperatureScale: React.FC<{ temperature: number | null }> = ({ temperature }) => {

    const currentTemp = Math.round(temperature ?? 0);
    const tempScale = [60, 50, 40, 30, 20, 10, 0, -10, -20, -30, -40, -50];

    const getBlockFillPercentage = (blockIndex: number) => {
        const blockTop = tempScale[blockIndex];
        const blockBottom = tempScale[blockIndex + 1];

        if (currentTemp >= blockTop) {
            return 100;
        } else if (currentTemp <= blockBottom) {
            return 0;
        } else {
            const blockRange = blockTop - blockBottom;
            const tempInBlock = currentTemp - blockBottom;
            return (tempInBlock / blockRange) * 100;
        }
    }

    return (
        <div className="flex flex-col h-full border border-black w-14 font-family-tahoma flex-shrink-0">

            {tempScale.slice(0, -1).map((tempScaleValue, index) => {
                const isLastBlock = index === tempScale.length - 1;
                const fillPercentage = isLastBlock ? 0 : getBlockFillPercentage(index);

                return (
                    <div
                        key={index}
                        className={`
                            flex-1 w-full pr-1 text-right bg-white relative select-none
                            ${index !== tempScale.length - 1 ? 'border-b-1' : ''}
                        `}
                    >
                        {fillPercentage > 0 && (
                            <div
                                className="absolute bottom-0 left-0 w-1/2"
                                style={{
                                    height: `${fillPercentage}%`,
                                    background: 'red',
                                    boxShadow: '0 -1px 0 0 red'
                                }}
                            />
                        )}
                        {tempScaleValue}

                    </div>
                )
            })}

            <div className="flex-1 w-full flex justify-center items-center text-sm">
                {currentTemp} °C
            </div>
        </div>
    )
};
export default TemperatureScale;
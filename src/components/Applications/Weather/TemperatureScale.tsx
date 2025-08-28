interface TemperatureScaleProps {
    temperature: number | null;
    units: 'metric' | 'imperial';
}

const TemperatureScale: React.FC<TemperatureScaleProps> = ({ temperature, units }) => {

    let currentTemp = Math.round(temperature ?? 0);
    const UNIT = units === 'imperial' ? 'F' : 'C';

    // Different temperature scales based on units
    const tempScale = units === 'imperial'
        ? [140, 120, 100, 80, 60, 40, 20, 0, -20, -40, -60, -80] // Fahrenheit scale
        : [60, 50, 40, 30, 20, 10, 0, -10, -20, -30, -40, -50];  // Celsius scale

    // Convert Celsius to Fahrenheit if needed
    if (units === 'imperial' && temperature !== null) {
        currentTemp = Math.round((temperature * 9 / 5) + 32);
    }

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
                const fillPercentage = getBlockFillPercentage(index);

                return (
                    <div
                        key={index}
                        className={`
                        flex-1 w-full pr-1 text-right bg-white relative select-none text-xs
                        ${index !== tempScale.slice(0, -1).length - 1 ? 'border-b-1' : ''}
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

            {/* Temperature display as another flex-1 item */}
            <div className="flex-1 w-full flex justify-center items-center text-sm bg-white border-t-1">
                {currentTemp}°{UNIT}
            </div>
        </div>
    )
};
export default TemperatureScale;
import { useSelector, useDispatch } from "react-redux";
import { selectWeatherUnits, setUnits, selectWeatherUpdateInterval, setUpdateInterval } from "../../../services/weatherInfoSlice";

const OptionsTab: React.FC = () => {
    const dispatch = useDispatch();
    const units = useSelector(selectWeatherUnits);
    const updateInterval = useSelector(selectWeatherUpdateInterval);

    return (
        <>
            <div className="flex px-2 gap-8 w-full h-1/3">
                <fieldset style={{ background: 'none' }} className="flex flex-col justify-center w-1/4 items-center">
                    <legend className="tracking-wide">Units</legend>
                    <div className="flex flex-col gap-1">
                        <div className="field-row">
                            <input
                                id='metric'
                                type='radio'
                                name='units'
                                value='metric'
                                checked={units === 'metric'}
                                onChange={() => dispatch(setUnits('metric'))}
                            />
                            <label htmlFor="metric" className="cursor-pointer tracking-wide">Metric</label>
                        </div>
                        <div className="field-row">
                            <input
                                id='imperial'
                                type='radio'
                                name='units'
                                value='imperial'
                                checked={units === 'imperial'}
                                onChange={() => dispatch(setUnits('imperial'))}
                            />
                            <label htmlFor="imperial" className="cursor-pointer tracking-wide">Imperial</label>
                        </div>
                    </div>
                </fieldset>

                <fieldset style={{ background: 'none' }} className="flex flex-col justify-center flex-1 items-center">
                    <legend className="tracking-wide">Application</legend>

                    <div className="field-row flex items-center">
                        <label htmlFor="auto-update-hours"
                            className="tracking-wide"
                            style={{ lineHeight: '16px' }}
                        >Update every</label>
                        <select
                            id="auto-update-hours"
                            className="cursor-pointer"
                            value={updateInterval}
                            onChange={(e) => dispatch(setUpdateInterval(Number(e.target.value)))}
                        >
                            {Array.from({ length: 5 }, (_, i) => {
                                const value = (i + 1);
                                return <option key={value} value={value}>{value}</option>;
                            })}
                        </select>
                        <label htmlFor="auto-update-hours"
                            className="tracking-wide"
                            style={{ lineHeight: '16px' }}
                        >hours</label>
                    </div>
                </fieldset>

            </div>
        </>
    )
}
export default OptionsTab;
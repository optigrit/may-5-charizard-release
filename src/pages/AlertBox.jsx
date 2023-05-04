import { useDispatch } from 'react-redux';
import { manipulateuserdata } from '../Redux/UserData/User-Action';
import { SET_ALERT_DATA } from '../Redux/UserData/User-Constants';

export const AlertBox = ( message, type ) => {
    const dispatch = useDispatch()

    const ALERT_TIME = 5000;
    const handlealert = (text, type) => {
        console.log(text, type, "text,type")
        dispatch(
            manipulateuserdata(SET_ALERT_DATA, {
                text: text,
                type: type,
            })
        );
        setTimeout(() => {
            dispatch(manipulateuserdata(SET_ALERT_DATA, { text: "", type: "" }));
        }, ALERT_TIME);
    };
    return handlealert(message, type);
}

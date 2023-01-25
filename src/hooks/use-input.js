//import { useState } from 'react';
import {useReducer} from 'react';

const initialInputState = {value: '', isTouched: false};

const inputStateReducer = (state, action) => {
    if(action.type === 'INPUT') {
        // no need for isTouched, because user didnt finish typing yet. Set it to true only on blur
        return { value: action.value, isTouched: state.isTouched };
    }

    if(action.type === 'BLUR') {
        return { value: state.value, isTouched: true };
    }

    if(action.type === 'RESET') {
        return { value: '', isTouched: false };
    }

    // return new state snapshot
    return initialInputState;
}

const useInput = (validateValue) => {
    // const [enteredValue, setEnteredValue] = useState('');
    //  const [isTouched, setIsTouched] = useState(false);
    const [inputState, dispatchAction] = useReducer(inputStateReducer, initialInputState);

    // now working with the value stored in inputState. Dispatched actions will set its value
    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        //  setEnteredValue(event.target.value);
        dispatchAction({type: 'INPUT', value: event.target.value});
    }

    const inputBlurHandler = () => {
        //  setIsTouched(true);    // input was touched before blur
        dispatchAction({ type: 'BLUR' })
    }

    const reset = () => {
        //  setEnteredValue('');
        //   setIsTouched(false);
        dispatchAction({ type: 'RESET' });
    }

    return {
      //  value: enteredValue,
        value: inputState.value,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler: valueChangeHandler,
        inputBlurHandler: inputBlurHandler,
        reset: reset
    }

};

export default useInput;
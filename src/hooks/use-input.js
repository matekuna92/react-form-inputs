import { useState } from 'react';

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        // setEnteredName(event.target.value);
        setEnteredValue(event.target.value);
      }
    
      const inputBlurHandler = () => {
        setIsTouched(true);    // input was touched before blur
      }

    return {
        value: enteredValue,
        hasError: hasError,
        valueChangeHandler: valueChangeHandler,
        inputBlurHandler: inputBlurHandler
    }

};

export default useInput;
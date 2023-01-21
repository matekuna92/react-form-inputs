import { useState, useRef, useEffect } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const { 
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput } = useInput(value => value.trim() !== '');

  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  const [enteredPhoneTouched, setEnteredPhoneTouched] = useState(false);
  const nameInputRef = useRef();
  const phoneInputRef = useRef();

  // now validity doesnt repeat code, handlers can rely on this condition, because it always holds the latest value *
  const enteredPhoneIsValid = enteredPhoneNumber.length > 11;
  const phoneInputIsInvalid = !enteredPhoneIsValid && enteredPhoneTouched;

 /// useEffect variation with FormIsValid state
 /* useEffect(() => {
   if(enteredNameIsValid) {
     setFormIsValid(true); 
   }
   else {
    setFormIsValid(false);
   }
 }, [enteredNameIsValid]); */

 /// 2nd variant without FormIsValid state
 let formIsValid = false;

 if(enteredNameIsValid && enteredPhoneIsValid) {
  formIsValid = true;
 }

  const phoneChangeHandler = () => {
    setEnteredPhoneNumber(phoneInputRef.current.value);
  }

  const phoneBlurHandler = () => {
    setEnteredPhoneTouched(true);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredPhoneTouched(true);

    // * keep the check to prevent form submit with empty value
    if(!enteredNameIsValid && !enteredPhoneIsValid) {
      return;
    }

    console.log(enteredName);
    // reset input
    // bad practise using ref: it manipulates the real DOM, using state is better!
    nameInputRef.current.value = '';
    phoneInputRef.current.value = '';

    // calling the function from custom hook, so no need to setName and setNameTouched
    resetNameInput();
    setEnteredPhoneNumber('');
    // error message displays after sending the form, and input is reset...
    // set touched to false as well, resetting input causes the form to be untouched, new form, error now disappears correctly
    setEnteredPhoneTouched(false);
  }

  const nameInputClasses = `form-control ${nameInputHasError ? 'invalid' : ''}`;
  const phoneInputClasses = `form-control ${phoneInputIsInvalid ? 'invalid' : ''}`;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          ref={nameInputRef}/>
		  {nameInputHasError && <p className='error-text'> Name must not be empty. </p>}
      </div>
      <div className={phoneInputClasses}>
        <label htmlFor='phone'>Your Phone</label>
        <input type='tel' id='phone'
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          ref={phoneInputRef}/>
		  {phoneInputIsInvalid && <p className='error-text'> Phone must not be empty. </p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

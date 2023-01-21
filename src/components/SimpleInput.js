import { useRef } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput } = useInput(value => value.trim() !== '');

  const {
    value: enteredPhoneNumber,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangedHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput } = useInput(value => value.length > 11);

  const nameInputRef = useRef();
  const phoneInputRef = useRef();

 /// 2nd variant without FormIsValid state
 let formIsValid = false;

 if(enteredNameIsValid && enteredPhoneIsValid) {
  formIsValid = true;
 }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    // * keep the check to prevent form submit with empty value
    if(!enteredNameIsValid && !enteredPhoneIsValid) {
      return;
    }

    console.log('Name: ', enteredName);
    console.log('Phone: ', enteredPhoneNumber);

    resetNameInput();
    resetPhoneInput();
  }

  const nameInputClasses = `form-control ${nameInputHasError ? 'invalid' : ''}`;
  const phoneInputClasses = `form-control ${phoneInputHasError ? 'invalid' : ''}`;

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
          onChange={phoneChangedHandler}
          onBlur={phoneBlurHandler}
          ref={phoneInputRef}/>
		  {phoneInputHasError && <p className='error-text'> Phone must not be empty. </p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

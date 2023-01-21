import { useState, useRef, useEffect } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredPhoneTouched, setEnteredPhoneTouched] = useState(false);
///  const [formIsValid, setFormIsValid] = useState(false);
  const nameInputRef = useRef();
  const phoneInputRef = useRef();

  // settings enteredNameIsValid to true initially can cause problems, if we have e.g. a useEffect, because function
  // will run also on page load, when nothing entered yet
  /* useEffect(() => {
    if(enteredNameIsValid) {
      console.log('is valid');
    }
  }, [enteredNameIsValid]) */

  // now validity doesnt repeat code, handlers can rely on this condition, because it always holds the latest value *
  const enteredNameIsValid = enteredName.trim() !== '';
  const enteredPhoneIsValid = enteredPhoneNumber.length > 11;
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
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

  const nameChangeHandler = () => {
    // setEnteredName(event.target.value);
    setEnteredName(nameInputRef.current.value);
  }

  const nameBlurHandler = () => {
    setEnteredNameTouched(true);    // input was touched before blur
  }

  const phoneChangeHandler = () => {
    setEnteredPhoneNumber(phoneInputRef.current.value);
  }

  const phoneBlurHandler = () => {
    setEnteredPhoneTouched(true);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
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
    setEnteredName('');
    setEnteredPhoneNumber('');
    console.log(enteredName, enteredNameIsValid, enteredNameTouched);
    // nameInputIsInvalid is true, if !enteredNameIsValid && enteredNameTouched,
    // error message displays after sending the form, and input is reset...
    // set touched to false as well, resetting input causes the form to be untouched, new form, error now disappears correctly
    setEnteredNameTouched(false);
    setEnteredPhoneTouched(false);
  }

  const nameInputClasses = `form-control ${nameInputIsInvalid ? 'invalid' : ''}`;
  const phoneInputClasses = `form-control ${phoneInputIsInvalid ? 'invalid' : ''}`;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          ref={nameInputRef}/>
		  {nameInputIsInvalid && <p className='error-text'> Name must not be empty. </p>}
      </div>
      <div className={phoneInputClasses}>
        <label htmlFor='phone'>Your Phone</label>
        <input type='number' id='phone'
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

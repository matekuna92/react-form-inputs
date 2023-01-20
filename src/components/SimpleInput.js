import { useState, useRef, useEffect } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const nameInputRef = useRef();

  // settings enteredNameIsValid to true initially can cause problems, if we have e.g. a useEffect, because function
  // will run also on page load, when nothing entered yet
  /* useEffect(() => {
    if(enteredNameIsValid) {
      console.log('is valid');
    }
  }, [enteredNameIsValid]) */

  // now validity doesnt repeat code, handlers can rely on this condition, because it always holds the latest value *
  const enteredNameIsValid = enteredName.trim() !== '';

  const nameChangeHandler = () => {
    // setEnteredName(event.target.value);
    setEnteredName(nameInputRef.current.value);
  }

  const nameBlurHandler = (event) => {
    setEnteredNameTouched(true);    // input was touched before blur
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    // * keep the check to prevent form submit with empty value
    if(!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    // reset input
    // bad practise using ref: it manipulates the real DOM, using state is better!
    nameInputRef.current.value = '';
    setEnteredName('');
    console.log(enteredName, enteredNameIsValid, enteredNameTouched);
    // nameInputIsInvalid is true, if !enteredNameIsValid && enteredNameTouched,
    // error message displays after sending the form, and input is reset...
    // set touched to false as well, resetting input causes the form to be untouched, new form, error now disappears correctly
    setEnteredNameTouched(false);
  }

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const nameInputClasses = `form-control ${nameInputIsInvalid ? 'invalid' : ''}`;

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
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

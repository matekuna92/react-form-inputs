import { useState, useRef, useEffect } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const nameInputRef = useRef();

  // settings enteredNameIsValid to true initially can cause problems, if we have e.g. a useEffect, because function
  // will run also on page load, when nothing entered yet
  useEffect(() => {
    if(enteredNameIsValid) {
      console.log('is valid');
    }
  }, [enteredNameIsValid])

  const nameChangeHandler = () => {
    // setEnteredName(event.target.value);
    setEnteredName(nameInputRef.current.value);

    if(enteredName.trim() !== '') {
      setEnteredNameIsValid(true);
    }
  }

  const nameBlurHandler = (event) => {
    setEnteredNameTouched(true);    // input was touched before blur

    if(enteredName.trim() === '') {
      setEnteredNameIsValid(false);
    }
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if(enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }

	setEnteredName(true);
    console.log(enteredName);
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

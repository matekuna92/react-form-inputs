import React, { useState, useRef } from 'react';

const BasicForm = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false);
  const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  
  const isProperInput = value => value.trim() !== '';
  const isProperEmail = value => value.includes('@') && value.length > 7;

  const isEnteredFirstNameValid = isProperInput(enteredFirstName);
  const isEnteredLastNameValid = isProperInput(enteredLastName);
  const isEnteredEmailValid = isProperEmail(enteredEmail);

  const firstNameIsInvalid = !isEnteredFirstNameValid && enteredFirstNameTouched;
  const lastNameIsInvalid = !isEnteredLastNameValid && enteredLastNameTouched;
  const emailIsInvalid = !isEnteredEmailValid && enteredEmailTouched;

  let formIsValid = false;

  if(isEnteredFirstNameValid && isEnteredLastNameValid && isEnteredEmailValid) {
    formIsValid = true;
  }

  const firstNameChangeHandler = () => {
    setEnteredFirstName(firstNameInputRef.current.value);
  }

  const lastNameChangeHandler = () => {
    setEnteredLastName(lastNameInputRef.current.value);
  }

  const emailChangeHandler = () => {
    setEnteredEmail(emailInputRef.current.value);
  }

  const firstNameBlurHandler = () => {
    setEnteredFirstNameTouched(true);
  }
 
  const lastNameBlurHandler = () => {
    setEnteredLastNameTouched(true);
  }

  const emailBlurHandler = () => {
    setEnteredEmailTouched(true);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(enteredFirstName, enteredLastName, enteredEmail);

    setEnteredFirstName('');
    setEnteredLastName('');
    setEnteredEmail('');

    setEnteredFirstNameTouched(false);
    setEnteredLastNameTouched(false);
    setEnteredEmailTouched(false);

    
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' ref={firstNameInputRef} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler}/>
          {firstNameIsInvalid && <p> Please enter a valid first name. </p>}
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' ref={lastNameInputRef} onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler}/>
          {lastNameIsInvalid && <p> Please enter a valid last name. </p>}
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' ref={emailInputRef} onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
        {emailIsInvalid && <p> Please enter a valid email. </p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

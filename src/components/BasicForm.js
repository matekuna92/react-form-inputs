import React, { useState, useRef } from 'react';

const BasicForm = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false);
  const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  
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

  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  }

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  }

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
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

    setEnteredFirstNameTouched(false);
    setEnteredLastNameTouched(false);
    setEnteredEmailTouched(false);

    setEnteredFirstName('');
    setEnteredLastName('');
    setEnteredEmail('');
  }

  const firstNameInputHasError = (!isEnteredFirstNameValid && enteredFirstNameTouched);
  const lastNameInputHasError = (!isEnteredLastNameValid && enteredLastNameTouched);
  const emailInputHasError = !isEnteredEmailValid && enteredEmailTouched;

  const firstNameInputClasses = `form-control ${firstNameInputHasError ? 'invalid' : ''}`;
  const lasstNameInputClasses = `form-control ${lastNameInputHasError ? 'invalid' : ''}`;
  const emailInputClasses = `form-control ${emailInputHasError ? 'invalid' : ''}`;;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler}/>
          {firstNameIsInvalid && <p className='error-text'> Please enter a valid first name. </p>}
        </div>
        <div className={lasstNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler}/>
          {lastNameIsInvalid && <p className='error-text'> Please enter a valid last name. </p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
        {emailIsInvalid && <p className='error-text'> Please enter a valid email. </p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

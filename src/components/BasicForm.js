import React, { useState, useRef } from 'react';

const BasicForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    email: true
  });
  const isProperInput = value => value.trim() !== '';
  const isProperEmail = value => value.includes('@') && value.length > 7;

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
  
    const isEnteredFirstNameValid = isProperInput(enteredFirstName);
    const isEnteredLastNameValid = isProperInput(enteredLastName);
    const isEnteredEmailValid = isProperEmail(enteredEmail);

    let isFormValid = isEnteredFirstNameValid && isEnteredLastNameValid && isEnteredEmailValid;

    if(!isFormValid) {
      return;
    }

    console.log('form is valid!');
    setFormInputsValidity({
      firstName: isEnteredFirstNameValid,
      lastName: isEnteredLastNameValid,
      email: isEnteredEmailValid
    });
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' ref={firstNameInputRef}/>
          {!formInputsValidity.firstName && <p> Please enter a valid first name. </p>}
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' ref={lastNameInputRef}/>
          {!formInputsValidity.lastName && <p> Please enter a valid last name. </p>}
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' ref={emailInputRef}/>
        {!formInputsValidity.email && <p> Please enter a valid email. </p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

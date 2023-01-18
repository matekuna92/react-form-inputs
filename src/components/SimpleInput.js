import { useState, useRef } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const nameInputRef = useRef();

  const nameChangeHandler = (event) => {
   // setEnteredName(event.target.value);
   setEnteredName(nameInputRef.current.value);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if(enteredName.trim() === '') {
		setNameIsValid(false);
		return;
    }

	setEnteredName(true);
    console.log(enteredName);
  }

  const nameInputClasses = `form-control ${!nameIsValid ? 'invalid' : ''}`;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameChangeHandler} ref={nameInputRef}/>
		{!nameIsValid && <p className='error-text'> Name must not be empty. </p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

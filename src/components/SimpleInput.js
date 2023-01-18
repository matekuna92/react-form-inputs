import { useState, useRef } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const nameInputRef = useRef();

  const nameChangeHandler = (event) => {
   // setEnteredName(event.target.value);
   setEnteredName(nameInputRef.current.value);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(enteredName);
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameChangeHandler} ref={nameInputRef}/>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

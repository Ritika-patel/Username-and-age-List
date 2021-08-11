import React, {useState} from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title:'Invalid input',
                message:'Plese enter a valid name and age(non-empty values)'
            })

            return;
        }
        if(+enteredAge < 1){
            setError({
                title:'Invalid age',
                message:'Plese enter a valid age( > 0 ).'
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge)
        setEnteredAge("");
        setEnteredUsername("");
    }


    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value)
    }

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value)
    }

    const errorHandler = () => {
        setError(null)
    }
    return(
        <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input value={enteredUsername} id="username" type="text" onChange={usernameChangeHandler} />

            <label htmlFor="age">Age (Years)</label>
            <input id="age" value={enteredAge} type="number" onChange={ageChangeHandler} />

            <Button type="submit">Add User</Button>
        </form>
        </Card>
        </div>
    )
}

export default AddUser;
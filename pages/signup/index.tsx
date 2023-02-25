import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../../styles/Signup.module.css';

function SignUp() {
    const inputForm = useRef<HTMLFormElement>(null);
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await toast.promise(
                axios.post("http://localhost:5000/auth/signup",{
                    name:inputForm.current?.fullName.value,
                    username:inputForm.current?.username.value,
                    password:inputForm.current?.password.value}),
                {
                  pending: "Processing account sign up",
                  success: 'Account created successful',
                  error: 'Something went wrong'
                },{
                    position: toast.POSITION.TOP_RIGHT
                }
            );
        } catch (error) {
            
        }

      };

    return (
        <React.Fragment>
            <ToastContainer />
        <div className={styles.signup}>
        <form ref={inputForm} onSubmit={handleSubmit}>
        
                <TextField id="outlined-basic" label="Name" variant="outlined" name='fullName'/>
                <TextField id="outlined-basic" label="Username" variant="outlined" name='username'/>
                <TextField id="outlined-basic" label="Password" variant="outlined" name='password' type="password"/>
                <Button variant="contained" type='submit'>Sign up</Button>
            </form>
        </div>
        </React.Fragment>
    );
}

export default SignUp;
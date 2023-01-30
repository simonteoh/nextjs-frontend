import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../../styles/Signup.module.css';
import { useRouter } from 'next/router';

function Login() {
    const router = useRouter();
    const inputForm = useRef<HTMLFormElement>(null);
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await toast.promise(
                axios.post("http://localhost:5000/auth/login",{
                    username:inputForm.current?.username.value,
                    password:inputForm.current?.password.value}),
                {
                  pending: "Logging in",
                  success: 'Welcome!',
                  error: 'Something went wrong'
                },{
                    position: toast.POSITION.TOP_RIGHT
                }
            ).then(function(res){
                localStorage.setItem('key', res.data.token)
                router.push('/')
            });
        } catch (error) {
            
        }

      };

    return (
        <React.Fragment>
            <ToastContainer />
        <div className={styles.signup}>
        <form ref={inputForm} onSubmit={handleSubmit}>
                <h1>Login</h1>
                <TextField id="outlined-basic" label="Username" variant="outlined" name='username'/>
                <TextField id="outlined-basic" label="Password" variant="outlined" name='password' type="password"/>
                <Button variant="contained" type='submit'>Login</Button>
            </form>
        </div>
        </React.Fragment>
    );
}

export default Login;
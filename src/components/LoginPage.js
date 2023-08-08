import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = (props) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    
    const location = useLocation();
    const returnUrl = new URLSearchParams(location.search).get('return');
    const productId = decodeURIComponent(returnUrl).split('/product/')[1];

    const navigate = useNavigate();

    useEffect(() => {
        
        if (!username || !password) {
            return;
        }
    
        console.log('Username:', username);
        console.log('Password:', password);

        axios.get(`http://localhost:5000/user/${username}`)
            .then(response => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    
    }, [username, password]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('userId', user.userId);
            console.log(`localStorage of userId: ${localStorage.getItem('userId')}`)
                    
            localStorage.setItem('fname', user.fname);
            console.log(`localStorage of userName: ${localStorage.getItem('fname')}`)

            let isValid = username === user.username && password === user.password;
            console.log(`isValid: ${isValid}`);
            
            if (isValid) {
                props.updateUser(user.userId, user.fname);
                
                if (returnUrl) {
                    navigate(`/product/${productId}`, { state: { productId: productId} });
                  } else {
                    navigate('/');
                  }

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setUsername(e.target.elements.username.value);
        setPassword(e.target.elements.password.value);
           
    };
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" id="username" name="username"></input><br/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" id="password" name="password"></input><br/><br/>
                <button type="submit">Login</button>
            </form>
            {user && !(username === user.username && password === user.password) && 
                <p style={{ color: 'red' }}>Login invalid</p>
            }
        </div>
        
    );
}
 
export default LoginPage;
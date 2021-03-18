import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from './Auth';

import history from '../../history';
//styles
import logo from '../../static/logo-green.png';

class SingUp extends React.Component {
    state = { 
        username: null, 
        email: null, 
        password: null, 
        confirmPassword: null, 
        role: 'student',
        error: null 
    };
    componentDidMount() {
        localStorage.getItem("authtoken") && history.push('/courses');
    }

    signUpHandler = async e => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        if(this.state.password !== this.state.confirmPassword) 
        return this.setState({ password: null, confirmPassword: null, error: 'Passwords do not match'});
        
        try {
            const { data } = await axios.post(
                "/api/auth/signup",
                { 
                    username: this.state.username, 
                    email: this.state.email, 
                    password: this.state.password,
                    role: this.state.role
                },
                config
            );

            localStorage.setItem("authtoken", data.token);

            history.push('/');
        } catch(error){
            if(error.response.data.error === 'Duplicate Field Value Enter') return this.setState({ error: 'Username or email is already reserved'});
            this.setState({ error: error.response.data.error });
        }

    }
    ////////////////////// confirmPassword

    renderForm(){
        return(
            <>
                <label htmlFor="username">Username:</label>
                <input type="text" required placeholder="Enter username" name="username"
                    id="username" onChange={e => this.setState({ username: e.target.value })}
                    className="form__input-text" autocomplete="off"
                />
                <label htmlFor="email">Email:</label>
                <input type="email" required placeholder="Enter email" name="email"
                    id="email" onChange={e => this.setState({ email: e.target.value })}
                    className="form__input-text" autocomplete="off"
                />
                <label htmlFor="password">Password:</label>
                <input type="password" required placeholder="Enter password" name="password"
                    id="password" onChange={e => this.setState({ password: e.target.value })}
                    className="form__input-text" autocomplete="off"
                />
                <label htmlFor="confirmPassword">Confirm:</label>
                <input type="password" required placeholder="Confirm password" name="confirmPassword"
                    id="confirmPassword" onChange={e => this.setState({ confirmPassword: e.target.value })}
                    className="form__input-text" autocomplete="off" 
                />
                <div className="form__radio">
                    <label htmlFor="student">Student</label>
                    <input type="radio" required value="student" name="role" checked
                        id="student" onChange={e => this.setState({ role: e.target.value })}
                    />
                    <label htmlFor="teacher">Teacher</label>
                    <input type="radio" required value="teacher" name="role"
                        id="teacher" onChange={e => this.setState({ role: e.target.value })}
                    /> 
                </div> 
                <div className="form__input-btn btn">
                    <input  type="submit" value="SIGN UP" className="btn__submit wide"
                        onClick={e => this.signUpHandler(e)}
                    />
                </div>
                <div className="form__feedback">
                    <b className="error">{this.state.error && this.state.error}</b>    
                </div> 
            </>
        );
    }
    renderSubElements(){
        return(
            <>
                <p className="form__subtext">
                    Already have an account? 
                    <Link to="/auth/signin">Sign in</Link>
                </p> 
            </>
        );
    } 

    //////////////

    render() {
        return (
            <main className="absolute">
            <Link to="/courses" >
                <img src={logo} alt="logo" />
            </Link>
            <Auth 
                title="SIGN OUT" 
                renderForm={this.renderForm()} 
                renderSubElements={this.renderSubElements()} 
                onSubmit={this.signInHandler}
            />
        </main>
        );
    }
}

export default SingUp;
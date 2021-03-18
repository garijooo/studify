import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut, updateLastChange, fetchTeachersCourses } from '../../actions'; 

import Auth from './Auth';

import history from '../../history';
//styles
import logo from '../../static/logo-green.png';

class SignIn extends React.Component {
    state = { email: null, password: null, error: null };

    signInHandler = async e => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const { data } = await axios.post(
                "/api/auth/signin",
                { email: this.state.email, password: this.state.password },
                config
            );
            localStorage.setItem("authtoken", data.token);
            this.props.signIn(data._id, data.email, data.username, data.role, Date.now());
            if(data.role === 'teacher') this.props.fetchTeachersCourses(data._id);
            history.push('/courses');
        } catch(error){
            this.props.signOut();
            localStorage.removeItem("authtoken");
            this.setState({ error: error.response.data.error });
        }
    }

    renderForm(){
        return(
            <>
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
                <div className="form__input-btn btn">
                    <input  type="submit" value="SIGN IN" className="btn__submit wide"
                        onClick={e => this.signInHandler(e)}
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
                    Do not have an account? 
                    <Link to="/auth/signup"> Sign up</Link>
                </p>      
                <p className="form__subtext">
                    Forgot my password
                    <Link to="/auth/forgotpass"> Restore</Link>
                </p> 
            </>
        );
    } 


    render() {
        return (
            <main className="absolute">
                <Link to="/courses" >
                    <img src={logo} alt="logo" />
                </Link>
                <Auth 
                    title="SIGN IN" 
                    renderForm={this.renderForm()} 
                    renderSubElements={this.renderSubElements()} 
                    onSubmit={this.signInHandler}
                />
            </main>
        );
    }
}

export default connect(null, { signIn, signOut, updateLastChange, fetchTeachersCourses } )(SignIn);
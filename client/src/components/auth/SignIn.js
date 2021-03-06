import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut, updateLastChange, fetchCoursesByCreator, fetchCoursesByLearner } from '../../actions'; 

import Auth from './Auth';

import history from '../../history';
//styles
import logo from '../../static/logo-green.png';

class SignIn extends React.Component {
    state = { email: null, password: null, error: null };

    componentDidMount() {
      
        console.log(localStorage.getItem("auth-token"));
        localStorage.getItem("auth-token") && history.push('/courses');
    }

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

            const { token, user } = data;
            this.props.signIn(user, token);
            localStorage.setItem("auth-token", token);
            if(user.role === 'student') this.props.fetchCoursesByLearner(user._id);
            else this.props.fetchCoursesByCreator(user._id);
            history.push('/courses');
        } catch(error){
            this.props.signOut();
            localStorage.removeItem("auth-token");
            this.setState({ error: error.response.data.error });
        }
    }

    renderForm(){
        return(
            <>
                <label htmlFor="email">Email:</label>
                <input type="email" required placeholder="Enter email" name="email"
                    id="email" onChange={e => this.setState({ email: e.target.value })}
                    className="form__input-text" autoComplete="off"
                />
                <label htmlFor="password">Password:</label>
                <input type="password" required placeholder="Enter password" name="password"
                    id="password" onChange={e => this.setState({ password: e.target.value })}
                    className="form__input-text" autoComplete="off"
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

export default connect(null, { signIn, signOut, updateLastChange, fetchCoursesByLearner, fetchCoursesByCreator } )(SignIn);
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import Auth from './Auth';

import history from '../../history';
//styles
import logo from '../../static/logo-green.png';

class SingUp extends React.Component {
    state = { 
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: '', 
        role: 'student',
        error: '',
        name: '',
        surname: ''
    };
    componentDidMount() {
        this.props.token && history.push('/courses');
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
                    name: this.state.name,
                    surname: this.state.surname,
                    password: this.state.password,
                    role: this.state.role
                },
                config
            );
            const { token, user } = data;
            this.props.signIn(user, token);
            if(user.role === 'student') this.props.fetchCoursesByLearner(user._id);
            else this.props.fetchCoursesByCreator(user._id);
            history.push('/courses');
        } catch(error){
            console.log(error);
            if(error.response.data.error === 'Duplicate Field Value Enter') return this.setState({ error: 'Username or email is already reserved'});
            this.setState({ error: error.response.data.error });
        }

    }
    renderForm(){
        return(
            <>
                <label htmlFor="username">Username:</label>
                <input type="text" required placeholder="Enter username" name="username"
                    id="username" onChange={e => this.setState({ username: e.target.value })}
                    className="form__input-text" autoComplete="off"
                />
                <label htmlFor="email">Email:</label>
                <input type="email" required placeholder="Enter email" name="email"
                    id="email" onChange={e => this.setState({ email: e.target.value })}
                    className="form__input-text" autoComplete="off"
                />
                <label htmlFor="name">Name:</label>
                <input type="text" required placeholder="Enter your name" name="name"
                    id="name" onChange={e => this.setState({ name: e.target.value })}
                    className="form__input-text" autoComplete="off"
                />
                <label htmlFor="surname">Surname:</label>
                <input type="text" required placeholder="Enter your surname" name="surname"
                    id="surname" onChange={e => this.setState({ surname: e.target.value })}
                    className="form__input-text" autoComplete="off"
                />
                <label htmlFor="password">Password:</label>
                <input type="password" required placeholder="Enter password" name="password"
                    id="password" onChange={e => this.setState({ password: e.target.value })}
                    className="form__input-text" autoComplete="off"
                />
                <label htmlFor="confirmPassword">Confirm:</label>
                <input type="password" required placeholder="Confirm password" name="confirmPassword"
                    id="confirmPassword" onChange={e => this.setState({ confirmPassword: e.target.value })}
                    className="form__input-text" autoComplete="off" 
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

    render() {
        return (
            <main className="absolute">
            <Link to="/courses" >
                <img src={logo} alt="logo" />
            </Link>
            <Auth 
                title="SIGN UP" 
                renderForm={this.renderForm()} 
                renderSubElements={this.renderSubElements()} 
                onSubmit={this.signInHandler}
            />
        </main>
        );
    }
}
const mapStateToProps = state => {
    return({
        token: state.auth.token
    });
}

export default connect(mapStateToProps, { signIn })(SingUp);
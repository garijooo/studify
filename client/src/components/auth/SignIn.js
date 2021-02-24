import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions'; 

import history from '../../history';
//styles
import '../../styles/auth-screen.css';
import logo from '../../images/logo.png';

class SignIn extends React.Component {
    state = { email: null, password: null, error: null };

    componentDidMount() {
        if(localStorage.getItem("authtoken")) history.push('/courses');
    }



    signInHandler = async (e) => {
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
            this.props.signIn(data._id, data.email, data.username);
            history.push('/courses');
        } catch(error){
            this.props.signOut();
            localStorage.removeItem("authtoken");
            this.setState({ error: error.response.data.error });
        }

    }

    render() {
        return (
            <div className="auth-screen">
                <Link to="/courses" >
                    <img src={logo} alt="logo" className="auth-screen__logo" />
                </Link>
                
                <form className="auth-screen__form" 
                    onSubmit={this.signInHandler}
                >
                    <h3 className="auth-screen__title">Sign in</h3>
                    <div className="auth-screen__form__element">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            required placeholder="Enter email" 
                            name="email"
                            id="email"

                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </div>  
                    <div className="auth-screen__form__element">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            required placeholder="Enter password" 
                            name="password"
                            id="password"

                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>        
                    <div className="auth-screen__form__element">
                        <input 
                            type="submit" 
                            name="submit"
                            value="Sign in"
                            onClick={e => this.signInHandler(e)}
                        />
                        <div className="auth-screen__form__error">
                            {this.state.error && `${this.state.error}` }
                        </div>
                    </div>
                    <div>
                        <span className="auth-screen__subtext">
                            Do not have an account? 
                            <Link to="/auth/signup">Sign up</Link>
                        </span>      
                        <span className="auth-screen__subtext">
                            Forgot my password
                            <Link to="/auth/forgotpass">Restore</Link>
                        </span> 
                    </div>         
                </form>
            </div>
        )
    }
}

export default connect(null, { signIn, signOut } )(SignIn);
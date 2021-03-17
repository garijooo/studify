import React from 'react';
import axios from 'axios';
import history from '../../history';
import { Link } from 'react-router-dom';
import Auth from './Auth';

import logo from '../../static/logo-green.png'; 
class ResetPass extends React.Component {
    state = { password: "", confirmPassword: "", success: "", error: "" };

    resetPasswordHandler = async e => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        if(this.state.password !== this.state.confirmPassword) return this.setState({ error: 'Passwords do not match'});
        try {
            
            const { data } = await axios.put(
                `/api/auth/resetpass/${this.props.match.params.resetToken}`,
                {
                    password: this.state.password
                },
                config
            );
            console.log(`data: ${data.data}`);
            this.setState({ error: "", success: data.data});
        }
        catch (error) {
            console.log(error);
            this.setState({ 
                error: error.response.data.error, 
                success: "" 
            });
        }
    }

    renderForm() {
        return(
            <>
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
                <div className="form__input-btn btn">
                    <input  type="submit" value="UPDATE" className="btn__submit wide"
                        onClick={e => this.resetPasswordHandler(e)}
                    />
                </div>
                <div className="form__feedback">
                    <b className="error">{this.state.error && this.state.error}</b>   
                    <b className="success">{this.state.success && this.state.success}</b>   
                </div> 
            </>
        );
    }
    renderSubElements() {
        return;
    }
    render() {
        return (
            <main className="absolute">
                <Link to="/courses" >
                    <img src={logo} alt="logo" />
                </Link>
                <Auth 
                    title="ENTER NEW PASSWORD" 
                    renderForm={this.renderForm()} 
                    renderSubElements={this.renderSubElements()} 
                    onSubmit={this.resetPasswordHandler}
                />
            </main>
        );
    }
}

export default ResetPass;
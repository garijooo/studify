import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from './Auth';

import logo from '../../static/logo-green.png'; 

import history from '../../history';

class ForgotPass extends React.Component {
    state = { email: null, error: null, success: null };

    forgotPassHandler = async e => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"application/json"
            },
        };
        try {
            const { data } = await axios.post(
                "/api/auth/forgotpass",
                { email: this.state.email },
                config
            );
            this.setState({ success: data.data, error: null });
        } catch(error) {
            this.setState({ error: error.response.data.error, email: null, success: null });
        }

    }
    renderForm() {
        return(
            <>
                <label htmlFor="email">Email:</label>
                <input type="email" required placeholder="Enter email" name="email"
                    id="email" onChange={e => this.setState({ email: e.target.value })}
                    className="form__input-text" autocomplete="off"
                />
                <div className="form__input-btn btn">
                    <input  type="submit" value="SEND AN EMAIL" className="btn__submit wide"
                        onClick={e => this.forgotPassHandler(e)}
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
                    title="FORGOT PASSWORD" 
                    renderForm={this.renderForm()} 
                    renderSubElements={this.renderSubElements()} 
                    onSubmit={this.forgotPassHandler}
                />
            </main>
        );
    }
}

export default ForgotPass;
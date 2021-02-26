import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut, signIn } from '../../actions/index';

import logo from '../../images/logo.png';
import '../../styles/header.css';

class Header extends React.Component {

    componentDidMount() {
        localStorage.getItem("authtoken") && this.fetchPrivateData();
    }

    fetchPrivateData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("authtoken")}`
            }
        }

        try {
            const { data } = await axios.get('/api/private', config);
            localStorage.setItem("id", data.data._id);
            this.props.signIn(data.data._id, data.data.email, data.data.username, data.data.role);
        } catch(e) {
            localStorage.removeItem("id");
            localStorage.removeItem("authtoken");
            this.props.signOut();
        }
    }

    signOutHandler = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("authtoken");
        this.props.signOut();
        //history.push('/auth/signin');
    }

    rendAuth() {
        return(
            <React.Fragment>
                <li><Link to="/courses" >Courses</Link></li>
                <li><Link to="/profile/courses" >My Courses</Link></li>
                <li><Link to="/profile/results" >My Results</Link></li>
                <li><Link to={`/profile/${this.props.username}`} >Profile</Link></li>
            </React.Fragment>
        );
    }
    rendNonAuth() {
        return(
            <React.Fragment>
                <li><Link to="/courses" >Courses</Link></li>
                <li><Link to="/help" >Help</Link></li>
            </React.Fragment>
        );
    }

    render() {
        return (
            <header className="header">
                <Link to="/courses" >
                    <img src={logo} alt="logo" />
                </Link>
                
                <nav className="header__nav">
                    <ul>
                    {localStorage.getItem("authtoken") ? this.rendAuth() : this.rendNonAuth()}
                    </ul>
                </nav>
                {localStorage.getItem("authtoken") ? (
                  <a onClick={this.signOutHandler} className="header__auth-link">Sign Out</a> 
                )
                : 
                <Link to="/auth/signin" className="header__auth-link">Sign In</Link>
                }
            </header>
        )
    }
};

const mapStateToProps = state => {
    return {
        _id: state.auth._id,
        email: state.auth.email,
        username: state.auth.username,
        error: state.auth.error
    };
}

export default connect(mapStateToProps, { signOut, signIn })(Header);
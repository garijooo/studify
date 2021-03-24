import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut, signIn } from '../../actions/index';

import logo from '../../static/logo.png';

class Header extends React.Component {

    signOutHandler = () => {
        this.props.signOut();
    }

    renderAuthLinksList() {
        return(
            <>
                <li className="header__list_item"><Link to="/courses" >Courses</Link></li>
                <li className="header__list_item"><Link to="/profile/courses" >My Courses</Link></li>
                <li className="header__list_item"><Link to="/profile/results" >My Results</Link></li>
                <li className="header__list_item"><Link to={`/profile/${this.props.username}`} >Profile</Link></li>
            </>
        );
    }
    renderNonAuthLinksList() {
        return(
            <>
                <li className="header__list_item"><Link to="/courses" >Courses</Link></li>
                <li className="header__list_item"><Link to="/help" >Help</Link></li>
            </>
        );
    }
    renderLink() {
        if(this.props.token)
            return <a onClick={this.signOutHandler} className="header__link_auth"> Sign Out</a>;
        return <Link to="/auth/signin" className="header__link_auth">Sign In</Link>;  
    }

    render() {
        return (
            <>
                <header className="header">
                    <nav className="header__nav">
                        <Link to="/courses" className="header__link">
                            <img className="header__link_logo" alt="logo" src={logo} />
                        </Link>
                        <ul className="header__list">
                        {this.props.token ? this.renderAuthLinksList() : this.renderNonAuthLinksList()}
                        </ul>
                        {this.renderLink()}
                    </nav>
                </header>
            </>     
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        id: state.auth.id,
        email: state.auth.email,
        username: state.auth.username,
        error: state.auth.error
    };
}

export default connect(mapStateToProps, { signOut, signIn })(Header);
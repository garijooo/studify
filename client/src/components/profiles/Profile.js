import React from 'react';
import history from '../../history';
import { connect } from 'react-redux';

class Profile extends React.Component {
    componentDidMount() {
        if(!this.props.token) history.push('/auth/signin'); 
    }
    
    render() {
        return (
            <div>
                Welcome, {this.props.name}!
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        name: state.auth.name
    };
}

export default connect(mapStateToProps)(Profile);
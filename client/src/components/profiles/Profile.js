import React from 'react'
import history from '../../history';

class Profile extends React.Component {
    componentDidMount() {
        if(!localStorage.getItem("authtoken")) history.push('/auth/signin'); 
    }
    
    render() {
        return (
            <div>
                Profile
            </div>
        )
    }
}

export default Profile;
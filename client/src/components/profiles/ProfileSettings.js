import React from 'react';
import history from '../../history';
class ProfileSettings extends React.Component {
    componentDidMount() {
        if(!localStorage.getItem("authtoken")) history.push('/auth/signin'); 
    }
    render() {
        return (
            <div>
                Profile settings
            </div>
        )
    }
}

export default ProfileSettings;
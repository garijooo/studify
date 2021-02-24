import React from 'react';
import history from '../../history';

class Helper extends React.Component {
    componentDidMount() {
        //if(!localStorage.getItem("authtoken")) history.push('/auth/signin'); 
        history.push('/courses');
    }

    render() {
        return (
            <React.Fragment>

            </React.Fragment>               
        )
    }
}

export default Helper;
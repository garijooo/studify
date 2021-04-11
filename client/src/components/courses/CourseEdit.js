import React from 'react';
import Course from './Course';
import { connect } from 'react-redux';
import history from '../../history';

class CourseEdit extends React.Component {
    componentDidMount() {
        !localStorage.getItem("auth-token") && history.push('/auth/signin');
        !this.props.match.params.id && history.push('/profile/courses');
    }
    render() {
        return (
            <main>
                <Course 
                    id={this.props.match.params.id} 
                    editable='editable'
                />
            </main>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
}
 
export default connect(mapStateToProps)(CourseEdit);
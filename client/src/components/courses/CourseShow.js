import React from 'react';
import Course from './Course';
import history from '../../history';
class CourseShow extends React.Component {
    componentDidMount(){
        !this.props.match.params.id && history.push('/profile/courses');
    }
    render() {
        return (
            <main>
                <Course 
                    id={this.props.match.params.id} 
                    editable={null}
                />
            </main>
        )
    }
}

export default CourseShow;
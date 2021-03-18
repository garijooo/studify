import React from 'react';
import Course from './Course';

class CourseEdit extends React.Component {
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

export default CourseEdit;
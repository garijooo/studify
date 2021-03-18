import React from 'react';
import Course from './Course';

class CourseShow extends React.Component {
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
import React from 'react';
import CourseList from './CourseList';
//styles
import '../../styles/main-screen.css';

class Courses extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="container__page">
                    <CourseList fetch="courses" />
                </div>
            </div>
        )
    }
}

export default Courses;
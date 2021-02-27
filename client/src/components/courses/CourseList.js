import React from 'react';
import { connect } from 'react-redux';
//styles
import '../../styles/main-screen.css';

class CourseList extends React.Component {
    /*
    componentDidMount() {
        if(this.props.fetch === 'courses') this.props.fetchCourses();
        else this.props.fetchMyCourses(localStorage.getItem("id"));
    }
    */
    
    /*
    componentDidMount() {
        if(!this.props.courses) this.updateEmptyArray();
    }
    updateEmptyArray = () => {
        console.log()
        this.props.courses = [ ...this.props.myCourses ];
    }
    */
    renderCoursesList() {
        return this.props.courses.map(course => {
            return(
                <div key={course._id}>
                    Course heading: {course.heading}
                    Course author's ID: {course.teachersId}
                </div>
            );
        });
    }
    render() {
        return (
            <div >
                Courses list
                {this.renderCoursesList()}
            </div>
        )
    }
}
/*
const mapStateToProps = state => {
    return { 
        courses: state.courses.courses,
        usersLastChange: state.auth.lastChange,
        coursesUser: state.auth.myCourses,
        teachersId: state.auth._id
     };
}
*/
const mapStateToProps = state => {
    return { myCourses: state.auth.myCourses };
}
export default connect(mapStateToProps)(CourseList);
import React from 'react';
import { connect } from 'react-redux';
import { fetchCourses, fetchCoursesById } from '../../actions/index';
//styles
import '../../styles/main-screen.css';

class CourseList extends React.Component {
    componentDidMount() {
        if(this.props.fetch === 'courses') this.props.fetchCourses();
        else this.props.fetchCoursesById(localStorage.getItem("id"));
    }

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
    renderCoursesByIdList() {
        console.log(`courses: ${this.props.coursesUser} `)
        return this.props.coursesUser.map(course => {
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
                {this.props.fetch === 'courses' ? this.renderCoursesList() : this.renderCoursesByIdList() }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        courses: state.courses.courses,
        coursesUser: state.courses.coursesUser,
        teachersId: state.auth._id
     };
}

export default connect(mapStateToProps, { fetchCourses, fetchCoursesById })(CourseList);
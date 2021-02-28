import React from 'react';
//styles
import '../../styles/main-screen.css';
import '../../styles/main.css';

class CourseList extends React.Component {
    state = { uploaded: false };
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
                <div 
                    key={course._id}
                    className="course__list__item"
                >
                    <h1 className="course__list__item-heading">{course.heading}</h1>
                    <p className="course__list__item-description">{`Description:`}</p>
                    <p className="course__list__item-author">{`Made by ${course.teachersId}`}</p>
                </div>
            );
        });                
    }

    render() {
        return (
            <div className="course__list">
                <h1>Courses list</h1>
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
export default CourseList;
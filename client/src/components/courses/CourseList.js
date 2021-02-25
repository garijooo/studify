import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { coursesList } from '../../actions/index';
//styles
import '../../styles/main-screen.css';

class CourseList extends React.Component {
    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const { data } = await axios.get('/api/courses/fetch/all', config);
            this.props.coursesList(data.courses);

        } catch(e) {
            console.log(e);
        }

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

    render() {
        return (
            <div >
                Courses list
                {this.renderCoursesList()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { courses: state.courses.courses };
}

export default connect(mapStateToProps, { coursesList })(CourseList);
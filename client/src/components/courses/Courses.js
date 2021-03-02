import React from 'react';
import CourseList from './CourseList';
import { connect } from 'react-redux';
import { updateLastChange, fetchCourses } from '../../actions';
import axios from 'axios';
//styles
import '../../styles/main-screen.css';

class Courses extends React.Component {
    componentDidMount() {
        this.check();
    }
    check = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
           const { data } = await axios.get("/api/courses/changed", config);
           if(this.props.lastChange < data.collectionChangeDate || this.props.lastChange === null) {
                this.props.fetchCourses();
                this.props.updateLastChange(data.collectionChangeDate);
            }
        }
        catch (err){
            console.log(err);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="container__page">
                    <CourseList courses={this.props.courses} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lastChange: state.courses.lastChange,
        courses: state.courses.courses
    }
}

export default connect(mapStateToProps, { updateLastChange, fetchCourses })(Courses);
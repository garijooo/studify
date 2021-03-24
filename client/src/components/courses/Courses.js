import React from 'react';
import CourseList from './CourseList';
import { connect } from 'react-redux';
import { updateLastChange, fetchCourses } from '../../actions';
import axios from 'axios';

class Courses extends React.Component {
    componentDidMount() {
        this.props.fetchCourses();

    }
    check = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            this.props.fetchCourses();
            console.log(this.props.courses);
            // const { data } = await axios.get("/api/courses/changed", config);
            // if(this.props.lastChange < data.collectionChangeDate || this.props.lastChange === null) {
            //         this.props.fetchCourses();
            //         this.props.updateLastChange(data.collectionChangeDate);
            //     }
        }
        catch (err){
            console.log(err);
        }
    }

    render() {
        return (
            <>
            <main>
                <div className="main-heading">
                    <h1>Available courses</h1>
                </div>
                <CourseList courses={this.props.courses} editable={null}/>
            </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        id: state.auth.id,
        role: state.auth.role,
        fetchedCourses: state.auth.fetchedCourses,
        lastChange: state.courses.lastChange,
        courses: state.courses.courses
    }
}

export default connect(mapStateToProps, { updateLastChange, fetchCourses })(Courses);
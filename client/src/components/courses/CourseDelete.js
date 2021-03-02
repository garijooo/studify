import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchCourse, updateFetchStatus, initCourse } from '../../actions';
// history object
import history from '../../history';
// modal window
import Modal from '../extra/Modal';

class CourseDelete extends React.Component {
    componentDidMount() {
        if(!this.props.match.params.id) return history.push('/profile/courses');
        this.props.fetchCourse(this.props.match.params.id);
    }
    onDeleteHandler = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            await axios.delete(
                `/api/courses/delete/${this.props.match.params.id}`,
                config
            );
            // CHANGED FETCH STATUS FOR UPDATE A LIST OF TEACHER'S COURSES
            this.props.updateFetchStatus(true);
            this.props.initCourse({});
            alert('A course was deleted!');
            history.push('/courses');
        } catch(error){
            console.log(error.response.data.error);
        }
    }
    rednerActions() {
        return (
            <React.Fragment>
                <button 
                    onClick={this.onDeleteHandler} 
                    className="red-btn"
                >
                Delete
                </button>
                <Link 
                    to="/profile/courses" 
                    className="yellow-btn"
                >
                Cancel
                </Link>
            </React.Fragment>
        ); 
    }  

    renderContent() {
        return (
            <React.Fragment>
                <p>
                    {`Are you sure you want to delete a Course with heading: '${this.props.currentCourse.heading}'?`}
                </p>      
            </React.Fragment>
        
        );
    }
    render() {
        return (
            <Modal
                title="Delete Course"
                content={this.renderContent()}
                actions={this.rednerActions()}
                onDismiss={() => history.push('/profile/courses')}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        currentCourse: state.courses.currentCourse
    };
}
export default  connect(
    mapStateToProps, 
    { 
        fetchCourse,
        initCourse,
        updateFetchStatus 
    }
    )(CourseDelete);
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateLastChange, updateFetchStatus, initCourse } from '../../actions';

import history from '../../history';
import Modal from '../extra/Modal';

class CourseCreate extends React.Component {
    componentDidMount() {
        !this.props.token && history.push('/auth/signin');
        !this.props.match.params.heading && history.push('/profile/courses');
    }

    onCreateHandler = async e => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const creatorsFullName = `${this.props.name} ${this.props.surname}`;
            const { data } = await axios.post(
                "/api/courses/create",
                { 
                    heading: this.props.course.heading,
                    description: this.props.course.description,
                    creatorsId: this.props.creatorsId,
                    creatorsFullName
                },
                config
            );
            this.props.updateFetchStatus(true);
            history.push(`/courses/edit/${data.course._id}`);
        } catch(error){
            console.log(error);
        }
    }

    rednerActions() {
        return (
            <>
                <button 
                    onClick={this.onCreateHandler} 
                    className="green-btn"
                >
                Create
                </button>
                <Link 
                    to="/profile/courses" 
                    className="yellow-btn"
                >
                Cancel
                </Link>
            </>
        ); 
    }  

    renderContent() {
        return (
            <>
                <p>
                    {`Are you sure you want to create a Course with heading: '${this.props.course.heading}'?`}
                </p>
                <p>
                    {`Course description is: '${this.props.course.description}`}
                </p>       
            </>
        
        );
    }
    render() {
        return (
            <Modal
                title="Create Course"
                content={this.renderContent()}
                actions={this.rednerActions()}
                onDismiss={() => history.push('/profile/courses')}
            />
        );
    }
}

const mapStateToProps = state => {
    return { 
        token: state.auth.token,
        creatorsId: state.auth.id,
        name: state.auth.name,
        surname: state.auth.surname,
        course: state.courses.currentCourse,
        name: state.auth.name,
        surname: state.auth.surname
    };
}

export default connect(mapStateToProps, { updateLastChange, updateFetchStatus, initCourse })(CourseCreate);
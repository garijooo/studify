import React from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchTeachersCourses, updateFetchStatus, initCourse } from '../../actions';
import CourseList from '../courses/CourseList';
//styles
import '../../styles/main-screen.css';
import '../../styles/main.css';

class ProfileCourses extends React.Component {
    state = { heading: '', description: '', error: null };

    componentDidMount() {
        if(!localStorage.getItem("authtoken")) return history.push('/auth/signin');
        this.fetchCourses();
        //this.props.updateCourse({
        //    blocks: []
        //});
    }

    fetchCourses = () => {
        if(this.props.role === 'teacher'){
            if(this.props.fetchStatus) {
                this.props.fetchTeachersCourses(this.props.id);
                this.props.updateFetchStatus(false);
            }
        }
    }

    onCreateClick = e => {
        e.preventDefault();
        if(!this.state.heading) return this.setState({ error: 'Please provide a heading!'});
        if(!this.state.description) return this.setState({ error: 'Please provide a description!'});
        this.setState({ error: null});
        const initCourse = { heading: this.state.heading, description: this.state.description };
        this.props.initCourse(initCourse);
        history.push(`/courses/new/${initCourse.heading}`);
    }


    renderCreateSection = () => {
        return(
            <React.Fragment>
                <div className="profile__create">
                    <form className="profile__create-inner">
                      
                            <h3>Create a new Course</h3>
                            <label htmlFor="heading">Heading of the Course:</label>
                            <input 
                                id="heading"
                                type="text"    
                                placeholder="heading"    
                                onChange={e => this.setState({ heading: e.target.value })} 
                            />
                            <label htmlFor="description">Description of the Course:</label>
                            <textarea 
                                id="description"
                                placeholder="Write a descrption of the Course"
                                cols="30"
                                rows="5"
                                wrap="soft"
                                maxLength="225"
                                onChange={e => this.setState({ description: e.target.value })} 
                            ></textarea>
                            <div className="profile__create-inner-div">
                                <input 
                                    type="submit"
                                    onClick={e => this.onCreateClick(e)}
                                    value="Create"
                                    className="green-btn"
                                />
                            </div>
                            <div className="red-text">
                                {this.state.error && this.state.error} 
                            </div>  
                        
                    </form>   
                    <div className="profile__create-inner">
                        <h3>Statistics</h3>
                    </div>                           
                </div>
            </React.Fragment>
           
        );
    }

    render() {
        return (
            <div className="container">
                <div className="container__page">
                    Profile/My Courses
                {this.props.role === 'teacher' && this.renderCreateSection()}
                <CourseList courses={this.props.courses} type="teacher" />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { 
        role: state.auth.role,
        id: state.auth._id,
        teachersLastChange: state.auth.teachersLastChange,
        fetchStatus: state.auth.fetchStatus,
        courses: state.auth.myCourses,
        selectedCourse: state.courses.selectedCourse
    };
}
export default connect(mapStateToProps, { fetchTeachersCourses, updateFetchStatus, initCourse })(ProfileCourses);
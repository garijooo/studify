import React from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchTeachersCourses, updateFetchStatus } from '../../actions';
import CourseList from '../courses/CourseList';
//styles
import '../../styles/main-screen.css';

class ProfileCourses extends React.Component {
    state = { heading: '', error: null };

    componentDidMount() {
        if(!localStorage.getItem("authtoken")) return history.push('/auth/signin');
        this.fetchCourses();
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
        this.setState({ error: null});
        history.push(`/courses/new/${this.state.heading}`);
    }


    renderCreateSection = () => {
        return(
            <React.Fragment>
                <div className="container__page__block-create">
                    <form>
                        <input 
                            type="text"        
                            onChange={e => this.setState({ heading: e.target.value })} 
                        />
                        <button 
                            onClick={e => this.onCreateClick(e)}
                            className="container__page__btn green-btn"
                        >
                        New course
                        </button> 
                    </form>
                    <div className="red-text">
                        {this.state.error && this.state.error} 
                    </div>                                
                </div>
            </React.Fragment>
           
        );
    }

    render() {
        return (
            <div className="container">
                <div className="container__page">
                Profile Courses
                {this.props.role === 'teacher' && this.renderCreateSection()}
                <CourseList courses={this.props.courses} />
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
        courses: state.auth.myCourses
    };
}
export default connect(mapStateToProps, { fetchTeachersCourses, updateFetchStatus })(ProfileCourses);
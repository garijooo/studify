import React from 'react';
import history from '../../history';
import { connect } from 'react-redux';

import CourseList from '../courses/CourseList';
//styles
import '../../styles/main-screen.css';

class ProfileCourses extends React.Component {
    state = { heading: '', error: null };

    componentDidMount() {
        if(!localStorage.getItem("authtoken")) history.push('/auth/signin'); 
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
                <div
                    className="container__page__block-create"
                >
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
                { this.props.role && this.renderCreateSection()}
                <CourseList fetch="coursesById" />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { role: state.auth.role };
}
export default connect(mapStateToProps)(ProfileCourses);
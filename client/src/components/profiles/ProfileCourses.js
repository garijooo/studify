import React from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchCoursesByLearner, fetchCoursesByCreator, updateFetchStatus, initCourse } from '../../actions';
import CourseList from '../courses/CourseList';

class ProfileCourses extends React.Component {
    state = { heading: '', description: '', error: null };

    componentDidMount() {
        !this.props.token && history.push('/auth/signin');
        this.fetchCourses();
    }

    fetchCourses = () => {
        if(this.props.role === 'teacher'){
            if(this.props.fetchStatus) {
                this.props.fetchCoursesByCreator(this.props.id);
                this.props.updateFetchStatus(false);
            }
        }
        else {
            this.props.fetchCoursesByLearner(this.props.id);
            // if(this.props.fetchStatus) {
            //     this.props.fetchCoursesByLearner(this.props.id);
            //     this.props.updateFetchStatus(false);
            // }
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


    renderCreateForm() {
        return(
            <article className="create-course">
                <form className="create-course__form form">
                    <h2>CREATE A NEW COURSE</h2>
                    <label htmlFor="heading">Heading</label>
                    <input id="heading" type="text" placeholder="Heading"    
                        onChange={e => this.setState({ heading: e.target.value })}
                        className="form__input-text" autoComplete="off"
                    />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" placeholder="Write a descrption of the Course"
                        cols="30" rows="5" wrap="soft" maxLength="225"
                        onChange={e => this.setState({ description: e.target.value })} 
                        className="form__input-textarea"
                    ></textarea>
                    <div className="form__input-btn btn">
                        <input  type="submit" value="CREATE" className="btn__submit wide"
                            onClick={e => this.onCreateClick(e)}
                        />
                    </div>
                    <div className="form__error">
                        <b>{this.state.error && this.state.error}</b>    
                    </div>  
                </form>           
            </article>
        );
    }
    render() {
        return (
            <>
                <main>
                    <div className="main-heading">
                        <h1>My courses</h1>
                    </div>
                    {this.props.role === 'teacher' && this.renderCreateForm()}
                    <div className="main-heading">
                        <h2>List of courses</h2>
                    </div>
                    <CourseList courses={this.props.courses} editable="editable" />
                 </main>
            </> 
        );
    }
}
const mapStateToProps = state => {
    return { 
        token: state.auth.token,
        role: state.auth.role,
        id: state.auth.id,
        teachersLastChange: state.auth.teachersLastChange,
        fetchStatus: state.auth.fetchStatus,
        courses: state.auth.fetchedCourses
    };
}
export default connect(mapStateToProps, { fetchCoursesByLearner, fetchCoursesByCreator, updateFetchStatus, initCourse })(ProfileCourses);
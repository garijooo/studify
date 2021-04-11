import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCoursesByLearner } from '../../actions';
import history from '../../history';

//icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import logo from '../../static/logo.png';

class CourseList extends React.Component {
    state = { class: '', changeId: null };

    componentDidMount() {
        if(localStorage.getItem("auth-token") && this.props.role === 'student') this.props.fetchCoursesByLearner(this.props.id);
    }
    addCourse = async (courseId) => {
        console.log('added');
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const { data } = await axios.patch(
                `/api/learner/add/${this.props.id}`, 
                { 
                    courseId
                },
                config
            );
            this.props.fetchCoursesByLearner(data.user._id);
            history.push('/profile/courses');
        } catch(err) {
            console.log(err);
        }
        
    }


    renderItemLinkConrolls = id => {
        if(this.props.role === 'teacher') return(
            <div className="item__link-conrolls">
                <Link className="item__link-conrolls__edit" to={`/courses/edit/${id}`}>
                    <EditIcon className="edit-icon" fontSize="large">                        
                    </EditIcon>
                </Link>
                <Link className="item__link-conrolls__delete" to={`/courses/delete/${id}`}>
                    <DeleteIcon className="delete-icon" fontSize="large">                        
                    </DeleteIcon>
                </Link>
            </div>
        );
        else return;
    }
    renderItemAddConroll = id => {
        //console.log('renderItemAddConroll');
       // console.log(`id: ${id}`);
        if(!this.props.editable) {
            console.log(`fetchedCourses COURSE LIST`);
            console.log(this.props.fetchedCourses);
            let found = false;
            this.props.fetchedCourses.forEach(course => {
                console.log(course);
                if(course._id === id) {
                    found = true;
                }
            });
            console.log(`found`); 
            console.log(found); 
            if(!found) return(
                <div className="item__link-conrolls">
                    <button className="item__link-conrolls__add" onClick={() => this.addCourse(id)}>
                        <AddIcon className="add-icon" fontSize="large">                        
                        </AddIcon>
                    </button>
                </div>
            );
            else return;
        }
        else return;
    }

    renderListOfCourses() {
        return this.props.courses.map((course, index) => {
            return(
                <section className="courses-list__item item" key={index}>
                    {this.props.editable && this.renderItemLinkConrolls(course._id)}
                    {this.props.id && this.props.role === 'student' ? this.renderItemAddConroll(course._id) : ''}
                    <Link className={`item__link ${this.props.editable && this.props.editable}`} to={`/courses/${course._id}`}>
                        <div className="item__image">
                            <img src={logo} alt="Course preview" />
                        </div>
                        <div className="item__title">
                            <h2>{course.heading}</h2>
                        </div>
                        <p className="item__description">{course.description}</p>
                        <p className="item__author">
                            Author: <span>{course.creatorsFullName}</span>
                        </p>  
                    </Link>
                </section>       
            );
        }); 
    }

    render() {
        return (
            <>
                <article className="courses-list">
                    {!this.props.courses ? 'Loading' : this.renderListOfCourses()}
                </article>
            </>
            
        )
    }
}
const mapStateToProps = state => {
    return({
        token: state.auth.token,
        id: state.auth.id,
        role: state.auth.role,
        fetchedCourses: state.auth.fetchedCourses,
    });
}

export default connect(mapStateToProps, { fetchCoursesByLearner })(CourseList);
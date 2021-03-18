import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';

//icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import logo from '../../static/logo.png';

class CourseList extends React.Component {
    state = { class: '', changeId: null };




    renderItemLinkConrolls = id => {
        return(
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
    }

    renderListOfCourses() {
        return this.props.courses.map(course => {
            return(
                <section className="courses-list__item item">
                    {this.props.editable && this.renderItemLinkConrolls(course._id)}
                    <Link className={`item__link ${this.props.editable && this.props.editable}`} to={`/courses/${course._id}`}>
                        <div className="item__image">
                            <img src={logo} alt="Course preview" />
                        </div>
                        <div className="item__title">
                            <h2>{course.heading}</h2>
                        </div>
                        <p className="item__description">{course.description}</p>
                        <p className="item__author">
                            Author: <span>{course.teachersId}</span>
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

export default CourseList;
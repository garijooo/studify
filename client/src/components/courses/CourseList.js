import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
//styles
import '../../styles/main-screen.css';
import '../../styles/main.css';
//icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class CourseList extends React.Component {
    state = { class: '', changeId: null };

    renderTeachersButtons(id) {
        return(
            <React.Fragment>
                <Link className="" to={`/courses/change/${id}`}>
                    <EditIcon className="edit-icon" fontSize="large">                        
                    </EditIcon>
                </Link>
                <Link to={`/courses/delete/${id}`}>
                    <DeleteIcon className="delete-icon" fontSize="large">                        
                    </DeleteIcon>
                </Link>
            </React.Fragment>
        );
    }
    onEnter = e => {
        let id = null;
        if(e.target.parentNode.id === 'pre') id = e.target.parentElement.parentElement.id 
        else id = e.target.parentElement.id;
        this.setState({ changeId: id, class: 'show'}, function(){
          //console.log(this.state.class+" "+this.state.changeId);  
        });  
    }
    onLeave = () => {
        this.setState({ class: '', changeId: null});
    }
    onShowCourse = () => {
        history.push(`/courses/${this.state.changeId}`);
    }
    renderCoursesList() {
        return this.props.courses.map(course => {
            //const id  = course._id;
            return(
                <div 
                    key={course._id} 
                    id={course._id}
                    className="course__list__item" 
                    onMouseEnter={this.onEnter}
                    onMouseLeave={this.onLeave}
                >   
                    <div className="course__list__sub-item-first" id="pre" onClick={this.onShowCourse}>
                            <h1 className="course__list__item-heading">{course.heading}</h1>
                            <p className="course__list__item-description">{`Description: ${course.description}`}</p>
                            <p className="course__list__item-author">{`Made by ${course.teachersId}`}</p>
                    </div>
                    <div id="pre" className={`course__list__sub-item-second ${this.state.changeId === course._id ? this.state.class : '' }`} id={course._id}>
                        {this.props.type === 'teacher' ? this.renderTeachersButtons(course._id) : ''}
                    </div>
                    
                </div>
            );
        });                
    }

    render() {
        return (
            <div className="course__list">
                <h1>Courses list</h1>
                {this.renderCoursesList()}
            </div>
        )
    }
}

export default CourseList;
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateLastChange, updateFetchStatus, updateCourse } from '../../actions';
// history object
import history from '../../history';
// modal window
import Modal from '../extra/Modal';

class CourseCreate extends React.Component {
    //state = { url: null, error: null, blocks: [], data: null };

    /*
    fetchImage = async = (_id) => {

    }
    */
    /*
    uploadImage = async () => {
       // e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "type": "formData"
            }
        };
        const formData = new FormData();
        const imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append("data", imagedata);
        console.log(formData);

        try {
            const { data } = await axios.post(               
                "/api/upload/images",
                formData
            );
            console.log(data);
            console.log(data.data);
            this.setState({ data: data.data });
        } catch(error) {
            console.log(error.response.data.error);
            this.setState({ error: error.response.data.error });
        }
    } 
    */
    /*
    uploadImage = e => {
        e.preventDefault();
        console.log(e);
    }
    */
    /*
<div>
                Course create
                <form onSubmit={this.uploadImage} >
                    <input type="file" name="sampleFile" id="file-id" />
                    <button>Upload</button>
                    <h1>Data: {this.state.data}</h1>
                </form>
            </div>

    */
    componentDidMount() {
        if(!this.props.match.params.heading) history.push('/profile/courses');
    }

    onCreateHandler = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const { data } = await axios.post(
                "/api/courses/create",
                { 
                    heading: this.props.selectedCourse.heading,
                    description: this.props.selectedCourse.description,
                    teachersId: this.props.teachersId
                },
                config
            );

            this.props.updateLastChange(data.collectionChangeDate);
            // CHANGED FETCH STATUS FOR UPDATE A LIST OF TEACHER'S COURSES
            this.props.updateFetchStatus(true);
            this.props.updateCourse({});
            history.push(`/courses/edit/${data.course._id}`);
        } catch(error){
            console.log(error.response.data.error);
        }
    }

    rednerActions() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        ); 
    }  

    renderContent() {
        return (
            <React.Fragment>
                <p>
                    {`Are you sure you want to create a Course with heading: '${this.props.selectedCourse.heading}'?`}
                </p>
                <p>
                    {`Course description is: '${this.props.selectedCourse.description}`}
                </p>       
            </React.Fragment>
        
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
        teachersId: state.auth._id,
        selectedCourse: state.courses.selectedCourse
    };
}

export default connect(mapStateToProps, { updateLastChange, updateFetchStatus, updateCourse })(CourseCreate);
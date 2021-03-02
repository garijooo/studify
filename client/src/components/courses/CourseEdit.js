import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchCourse, updateCourse } from '../../actions';

import history from '../../history';

class CourseEdit extends React.Component {
    //state = { inputType: 'text', currentCourse: [] };
    state = { blocks: [], currentType: 'title', text: '' };
    componentDidMount() {
        this.updateState();
    }

    checkAuth = () => {
        if(this.props.currentCourse.teachersId !== this.props.teachersId) return history.push('/courses');
    }
    updateState = async () => {
        await this.props.fetchCourse(this.props.match.params.id);
        this.setState({ blocks: [ ...this.props.currentCourse.blocks]});
    }

    onSaveCourse = e => {
        e.preventDefault();
        this.checkAuth();
        const updatedCourse = {
            heading: this.props.currentCourse.heading,
            description: this.props.currentCourse.description,
            blocks: this.state.blocks
        }
        this.props.updateCourse(this.props.match.params.id, updatedCourse);
        alert('Course has been updated');
        history.push('/profile/courses');
    }

    onFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append("data", imagedata);
        const id = this.props.match.params.id;
        try {
            const { data } = await axios.post(               
                `/api/upload/${this.state.type}`,
                id,
                formData
            );
            //console.log(data);
            //console.log(data.data);
            //this.setState({ data: data.data });
        } catch(error) {
            console.log(error.response.data.error);
            this.setState({ error: error.response.data.error });
        }
    }

    onAddTextBlock = (e) => {
        e.preventDefault();
        this.checkAuth();
        const block = {
            order: this.state.blocks.length,
            type: this.state.currentType,
            text: this.state.text
        }
        this.setState({ blocks: [ ...this.state.blocks, block ], text: '' });
    }
    renderBlockAddingMenu() {
        switch(this.state.currentType) {
            case 'title':
                return(
                <div>
                    title
                    <form onSubmit={this.onAddTextBlock}>
                        <input value={this.state.text}  type="text" onChange={e => this.setState({ text: e.target.value })} />
                        <input type="submit" value="Добавить"/> 
                    </form>   
                </div>
                );
            case 'text':
                return(
                    <div>
                    title
                    <form onSubmit={this.onAddTextBlock}>
                        <textarea value={this.state.text} onChange={e => this.setState({ text: e.target.value })}></textarea>
                        <input type="submit" /> 
                    </form>   
                </div>
                );
            case 'image':
                return(<div>
                    image
                    <form onSubmit={this.onFileUpload}>
                        <input
                            name="asset"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                        />
                       <input type="submit" /> 
                    </form>
                </div>);
            case 'video':
                return(<div>
                    video
                    <form onSubmit={this.onFileUpload}>
                        <input
                            name="asset"
                            type="file"
                            accept=".mp4"
                        />
                       <input type="submit" /> 
                    </form>
                </div>);
            case 'animation':
                return(<div>
                    animation
                    <form onSubmit={this.onFileUpload}>
                        <input 
                            name="asset" 
                            type="file" 
                            accept=".gif" 
                        />
                       <input type="submit" /> 
                    </form>
                    
                </div>);
            default:
                return <p>No blocks yet</p>;
        }
    }
    renderBlocks = () => {
        if(this.state.blocks !== []){
            return this.state.blocks.map(block => {
                switch(block.type){
                    case 'title':
                        return(
                            <h2 key={block.order}>{block.text}</h2>
                        );
                    case 'text':
                        return(
                            <p key={block.order}>{block.text}</p>
                        );
                    default:
                        return <div key={block.order}>Isn't a block</div>;
                }
            });
        }
        else return <div>No blocks yet!</div>;
    }

    render() {
        return (
            <div className="container">
                <div className="container__page">
                    <div className="course__edit__overview">
                        <b>Course edit</b> 
                        <b>Heading:</b> {this.props.currentCourse.heading}
                        <b>Description:</b> {this.props.currentCourse.description}
                        {this.renderBlocks()}
                    </div>
                    <select value={this.state.currentType} onChange={e => this.setState({ currentType: e.target.value})}>
                        <option  value="title">Title</option>
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="animation">Animation</option>
                    </select>
                    <div className="course__edit__block">
                        {this.renderBlockAddingMenu()}
                        <button onClick={this.onSaveCourse} className="green-btn">Save course</button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        currentCourse: state.courses.currentCourse,
        teachersId: state.auth._id
    };
}
export default connect(mapStateToProps, { fetchCourse, updateCourse })(CourseEdit);
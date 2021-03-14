import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchCourse, updateCourse } from '../../actions';

import history from '../../history';

class CourseEdit extends React.Component {
    //state = { inputType: 'text', currentCourse: [] };
    state = { blocks: [], currentType: 'title', text: '', file: null, url: '', images: [], videos: [], animations: [] };
    componentDidMount() {
        this.updateState();
    }

    checkAuth = () => {
        if(this.props.currentCourse.teachersId !== this.props.teachersId) return history.push('/courses');
    }
    updateImages = async block => {
        try {
            const res = await axios({
                method: 'get',
                url: `/static/public/${this.props.match.params.id}/${block.url}`,
                responseType: 'blob'
            });
            let imageUrl = (window.URL ? window.URL : window.webkitURL).createObjectURL(res.data);
            this.setState({ images: [ ...this.state.images, 
                    { order: block.order, imgUrl: imageUrl } 
                ] });   
        } catch (err) {
            console.log(err);
        }
    }
    updateVideos = async block => {
        try {
            const res = await axios({
                method: 'get',
                url: `/static/public/${this.props.match.params.id}/${block.url}`,
                responseType: 'blob'
            });
            let videoUrl = (window.URL ? window.URL : window.webkitURL).createObjectURL(res.data);
            this.setState({ videos: [ ...this.state.videos, 
                    { order: block.order, vidUrl: videoUrl } 
                ] });   
        } catch (err) {
            console.log(err);
        }
    }
    updateAnimations = async block => {
        try {
            const res = await axios({
                method: 'get',
                url: `/static/public/${this.props.match.params.id}/${block.url}`,
                responseType: 'blob'
            });
            let animationUrl = (window.URL ? window.URL : window.webkitURL).createObjectURL(res.data);
            this.setState({ videos: [ ...this.state.videos, 
                    { order: block.order, animUrl: animationUrl } 
                ] });   
        } catch (err) {
            console.log(err);
        }
    }
    updateState = async () => {
        try {
            await this.props.fetchCourse(this.props.match.params.id);
            this.setState({ blocks: [ ...this.props.currentCourse.blocks]});
            this.state.blocks.filter(block => block.type === 'image').map(block => {
                this.updateImages(block);
            });     
            this.state.blocks.filter(block => block.type === 'video').map(block => {
                this.updateVideos(block);
            });    
            this.state.blocks.filter(block => block.type === 'animation').map(block => {
                this.updateAnimations(block);
            });                
        } catch (err) {
            console.log(err);
        }
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
        history.push(`/courses/edit/${this.props.match.params.id}`);
    }

    onFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('id', this.props.match.params.id);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };        

        try {
            const { data } = await axios.post(               
                `/api/upload/${this.state.currentType}`,
                formData,
                config
            );
            this.checkAuth();
            const block = {
                order: this.state.blocks.length,
                type: this.state.currentType,
                url: data.data
            }
            this.setState({ blocks: [ ...this.state.blocks, block ], file: null });
        } catch(error) {
            console.log('The file isn not uploaded :(');
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
                            onChange={e => this.setState({ file: e.target.files[0] })}
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

    displayImage = block => {
        let imgUrl = '';
        if(this.state.images.filter(img => { return img.order === block.order })[0]){
            const image = this.state.images.filter(img => { return img.order === block.order })[0];
            imgUrl = image.imgUrl;
        }
        return(
            <img alt="an image" key={block.order} src={imgUrl}></img>
        );
        
    }
    displayVideo = block => {
        let vidUrl = '';
        if(this.state.videos.filter(img => { return img.order === block.order })[0]){
            const video = this.state.videos.filter(vid => { return vid.order === block.order })[0];
            vidUrl = video.vidUrl;
        }
        return(
            <video width="600" height="300" src={vidUrl}></video>
        );
        
    }
    displayAnimation = block => {
        let animUrl = '';
        if(this.state.animations.filter(anim => { return anim.order === block.order })[0]){
            const animation = this.state.animations.filter(anim => { return anim.order === block.order })[0];
            animUrl = animation.animUrl;
        }
        return(
            <img alt="an animation" key={block.order} src={animUrl}></img>
        );
        
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
                    case 'image': {
                        let imgUrl = '';
                        if(this.state.images.filter(img => { return img.order === block.order })[0]){
                            const image = this.state.images.filter(img => { return img.order === block.order })[0];
                            imgUrl = image.imgUrl;
                        }
                        return(
                            <img alt="an image" key={block.order} src={imgUrl}></img>
                        );
                    } 
                    case 'animation': {
                        let animUrl = '';
                        if(this.state.animations.filter(anim => { return anim.order === block.order })[0]){
                            const animation = this.state.animations.filter(anim => { return anim.order === block.order })[0];
                            animUrl = animation.animUrl;
                        }
                        return(
                            <img alt="an animation" key={block.order} src={animUrl}></img>
                        );
                        
                    }    
                    case 'video': {
                        let vidUrl = '';
                        if(this.state.videos.filter(img => { return img.order === block.order })[0]){
                            const video = this.state.videos.filter(vid => { return vid.order === block.order })[0];
                            vidUrl = video.vidUrl;
                        }
                        return(
                            <video width="600" height="300" src={vidUrl}></video>
                        );
                        
                    }   
                    default:
                        return <div key={block.order}>Isn't a block</div>;
                }
            });
        }
        else return <div>No blocks yet!</div>;
    }

    filePreRender(){
        
    }
    renderFileUploadBlock(type, accept = []) {
        return(<div>
            {type}
            <form onSubmit={this.onFileUpload}>
                <input
                    name="asset"
                    type="file"
                    onChange={e => this.setState({ file: e.target.files[0] })}
                    accept={accept.join(',')}
                />
               <input type="submit" /> 
            </form>
        </div>);
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
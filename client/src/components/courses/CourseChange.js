import React from 'react';
import { connect } from 'react-redux';
import { fetchCourse, updateCourse } from '../../actions';

//icons:
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

// firebase instance & config
import firebase from '../../firebase/firebaseClient';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/database';
// import 'firebase/storage';
// import { firebaseConfig } from '../../firebase/config';


import history from '../../history';
class CourseChange extends React.Component {
    // initial state:
    state = { 
        blocks: [], 
        currentType: 'video', 
        text: '', files: [],
        file: null, 
        fileToUpload: null,
        fileName: '', 
        visibility: '' 
    };
    // initial methods to get info about current course:
    componentDidMount() {
        if(!this.props.usersId) return history.push('/');
        const { id } = this.props.match.params;
        this.updateInitialState(id);
        
    }
    updateInitialState = async id => {
        try{
            await this.props.fetchCourse(id);
            if(this.props.usersId !== this.props.course.teachersId) return history.push('/');
            this.setState({ blocks: [ ...this.props.course.blocks]});
        } catch(error) {
            console.log(error);
        } 
    }
    // additional methods
    uploadFile = e => {

    }

    // handling methods:
    courseSaveHandler = e => {
        e.preventDefault();
        const updatedCourse = {
            blocks: this.state.blocks
        }
        this.props.updateCourse(this.props.course._id, updatedCourse);
        alert('Course has been updated');
        history.push(`/courses/change/${this.props.course._id}`);
    }
    removeBlockHandler = index => {
        this.setState({ blocks: this.state.blocks.filter((block, id) => id !== index) });
    }

    changeOrderHandler = (index, flow) => {
        if(flow === 'down'){
            let updatedBlocks = [ ...this.state.blocks ];
            const elements = this.state.blocks.filter((block, id) => id === index || id === index + 1);
            updatedBlocks[index] = elements[1];
            updatedBlocks[index + 1] = elements[0];
            this.setState({ blocks: updatedBlocks });
        }
        else {
            let updatedBlocks = [ ...this.state.blocks ];
            const elements = this.state.blocks.filter((block, id) => id === index - 1 || id === index);
            updatedBlocks[index] = elements[0];
            updatedBlocks[index - 1] = elements[1];
            this.setState({ blocks: updatedBlocks });
        }
    } 
    
    addTextBlockHandler = e => {
        e.preventDefault();
        const block = {
            type: this.state.currentType,
            text: this.state.text
        }
        this.setState({ blocks: [ ...this.state.blocks, block ], text: '' });
    }
    
    // handling methods related to the files:
    firebaseFileUpload = async () => {
        //firebase.initializeApp(firebaseConfig);
        const storage = firebase.storage();

        const path = `${this.state.currentType}/${this.state.fileName}`;

        const ref = storage.ref(path);

        console.log(this.state.fileToUpload);

        const task = ref.put(this.state.fileToUpload);
        
        await task.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
            let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log(percent + "% done");
        }, error => {
            console.log(error);
        }, async () => {
            task.snapshot.
            task.snapshot.ref.getDownloadURL().then(url => {
                //console.log(url);
                //console.log(123);
                const block = {
                    type: this.state.currentType,
                    url
                }
                this.setState({ blocks: [ ...this.state.blocks, block ], file: null, visibility: '' });
                const updatedCourse = {
                    blocks: this.state.blocks
                }
                this.props.updateCourse(this.props.course._id, updatedCourse);
            });
        });
    }

    fileChangeHandler = async e => {
        e.preventDefault();
        const file = e.target.files[0];
        const fileName = `${Date.now()}-${file.name}`;
        const reader = new FileReader();
        reader.onload = (ev) => {
            this.setState({ file: ev.target.result, fileToUpload: file, fileName, visibility: 'none' });
        };
        await reader.readAsDataURL(file);
        
    }
    
    triggerHandler = e => { 
        e.preventDefault();
        document.querySelector('input[type="file"]').click();
    }

    // render methods:
    renderUpDownIcons(index){
        if(index === 0) 
            return (
                <button onClick={() => this.changeOrderHandler(index, 'down')}>
                    <ExpandMoreIcon fontSize="large"></ExpandMoreIcon>
                </button> 
            );
        if(index === this.state.blocks.length - 1) 
            return (
                <button onClick={() => this.changeOrderHandler(index, 'up')}>
                    <ExpandLessIcon fontSize="large"></ExpandLessIcon>  
                </button>
            );
        return(
            <React.Fragment>
                <button onClick={() => this.changeOrderHandler(index, 'up')}>
                    <ExpandLessIcon fontSize="large"></ExpandLessIcon>  
                </button>
                <button onClick={() => this.changeOrderHandler(index, 'down')}>
                    <ExpandMoreIcon fontSize="large"></ExpandMoreIcon>
                </button>
            </React.Fragment>
        );
    }
    
    renderBlocks(){
        if(this.state.blocks !== []){
            return this.state.blocks.map((block, index) => {
                switch(block.type){
                    case 'title':
                        return(
                            <div className="course__show__block" key={index}>
                                <div className="course__show__block-content">
                                    <h2>{block.text}</h2> 
                                </div>     
                                <div className="course__show__block-edit">
                                    {this.renderUpDownIcons(index)}
                                </div>
                                <div className="course__show__block-delete">
                                    <button onClick={() => this.removeBlockHandler(index)}>
                                        <HighlightOffIcon fontSize="large"></HighlightOffIcon>
                                    </button>
                                </div>
                            </div>        
                        );
                    case 'text':
                        return(
                            <div className="course__show__block" key={index}>
                                <div className="course__show__block-content">
                                    <p>{block.text}</p>
                                </div>     
                                <div className="course__show__block-edit">
                                    {this.renderUpDownIcons(index)}
                                </div>
                                <div className="course__show__block-delete">
                                    <button onClick={() => this.removeBlockHandler(index)}>
                                        <HighlightOffIcon fontSize="large"></HighlightOffIcon>
                                    </button>
                                </div>
                            </div>   
                        );
                    default:
                        return (
                            <div key={index}>
                                {this.renderFileBlock(block)}
                            </div>
                        );
                }
            });
        }
        else return <div>No blocks yet!</div>;
    }

    previewRender(){
        if(!this.state.file) return;
        const rend = type => {
            switch(type) {
            case 'image':
                return <img width="600" height="300" src={this.state.file} />;
            case 'video':
                return (
                    <video width="600" height="300" controls>
                        <source src={this.state.file} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'animation':
                return <img width="600" height="300" src={this.state.file} />;
            default:  
                return;  
            }
        }
        return(
           <React.Fragment>
               {rend(this.state.currentType)}
               <button className="primary" onClick={this.firebaseFileUpload}>Accept</button>
               <button className="primary" onClick={() => this.setState({ file: null, visibility: '' })}>Decline</button>
           </React.Fragment>
        );
    }


    renderFileBlock =  (block) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            const blob = xhr.response;
        };
        xhr.open('GET', block.url);
        xhr.send();

        //const img = document.getElementById('myimg');
        //img.setAttribute('src', url);
        switch(block.type) {
            case 'image':
                return <img width="600" height="300"  src={block.url} />;
            case 'video':
                return <video width="600" height="300" controls src={block.url}></video>
            case 'animation':
                return <img width="600" height="300"  src={block.url} />;
            default:
                return;
        }
    }

    renderAddFileBlock(accept = []) {
        const formats = accept.join(',');
        return(
            <div className="" >
                <button className="primary" onClick={this.triggerHandler}>Открыть</button>
                <form>
                    <input
                        accept={formats}
                        name="asset"
                        type="file"
                        onChange={this.fileChangeHandler}
                    />
                </form>
            </div>
        );
    }

    renderAddMenu() {
        switch(this.state.currentType) {
            case 'title':
                return(
                <div className="course__edit__block-text">
                    title
                    <form onSubmit={this.addTextBlockHandler}>
                        <input value={this.state.text}  type="text" onChange={e => this.setState({ text: e.target.value })} />
                        <input type="submit" value="Добавить"/> 
                    </form>   
                </div>
                );
            case 'text':
                return(
                    <div className="course__edit__block-text">
                    text
                    <form onSubmit={this.addTextBlockHandler}>
                        <textarea value={this.state.text} onChange={e => this.setState({ text: e.target.value })}></textarea>
                        <input type="submit" /> 
                    </form>   
                    </div>
                );
            case 'image':
                return this.renderAddFileBlock(['.jpg','.jpeg','.png']);
            case 'video':
                return this.renderAddFileBlock(['.mp4','.avi']);
            case 'animation':
                return this.renderAddFileBlock(['.gif']);    
            default:
                return;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="container__page">
                    <div className="course__edit__overview">
                        <b>Course edit</b> 
                        <b>Heading:</b> {this.props.course.heading}
                        <b>Description:</b> {this.props.course.description}
                        {this.renderBlocks()}
                    </div>
                    <select className={`${this.state.visibility}`} value={this.state.currentType} onChange={e => this.setState({ currentType: e.target.value})}>
                        <option value="title">Title</option>
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="animation">Animation</option>
                    </select>
                    <div className="course__edit__block">
                        {this.previewRender()}
                        <div className={`${this.state.visibility}`}>
                            {this.renderAddMenu()}
                        </div>
                        
                        <button onClick={this.courseSaveHandler} className="green-btn">Save course</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        course: state.courses.currentCourse,
        usersId: state.auth._id
    };
}

export default connect(mapStateToProps, { fetchCourse, updateCourse })(CourseChange);
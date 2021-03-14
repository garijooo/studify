import React from 'react';
import { connect } from 'react-redux';
import { fetchCourse, updateCourse } from '../../actions';
//icons:
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import history from '../../history';
class CourseChange extends React.Component {
    // initial state:
    state = { blocks: [], currentType: 'video', text: '', files: [], file: null, visibility: '' };
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

    // !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!
    /*  
    fileChangeHandler = async e => {
        e.preventDefault();
        await this.setState({ files: [ ...this.state.files,  e.target.files[0]] });
        const block = {
            type: this.state.currentType,
            order: this.state.files.length
        }
        this.setState({ blocks: [ ...this.state.blocks, block ] });
        console.log(this.state.blocks);
        console.log(this.state.files);
    }*/
    /*
    bindFileBlockWithArray = async () => {
        const block = {
            type: this.state.currentType,
            order: this.state.files.length - 1
        }
        await this.setState({ blocks: [ ...this.state.blocks, block ] });
    }
    */
    fileChangeHandler = async e => {
        e.preventDefault();
        const file = e.target.files[0];


        const reader = new FileReader();
        reader.onload = (ev) => {
            this.setState({ file: ev.target.result, visibility: 'none' });
            //this.setState({ visibility: 'none' });
            //await this.setState({ files: [ ...this.state.files, ev.target.result] });
            //console.log(this.state.files[this.state.files.length-1]);
            /*
            console.log(this.state.files.length - 1);
            const block = {
                type: this.state.currentType,
                order: this.state.files.length - 1
            }
            this.setState({ blocks: [ ...this.state.blocks, block ] });
            */
        }
        await reader.readAsDataURL(file);
        //this.bindFileBlockWithArray();
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
                    <ArrowDownwardIcon fontSize="large"></ArrowDownwardIcon>
                </button> 
            );
        if(index === this.state.blocks.length - 1) 
            return (
                <button onClick={() => this.changeOrderHandler(index, 'up')}>
                    <ArrowUpwardIcon fontSize="large"></ArrowUpwardIcon>  
                </button>
            );
        return(
            <React.Fragment>
                <button onClick={() => this.changeOrderHandler(index, 'up')}>
                    <ArrowUpwardIcon fontSize="large"></ArrowUpwardIcon>  
                </button>
                <button onClick={() => this.changeOrderHandler(index, 'down')}>
                    <ArrowDownwardIcon fontSize="large"></ArrowDownwardIcon>
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
                                {this.renderFileBlock(block.type, block.order)}
                            </div>
                        );
                }
            });
        }
        else return <div>No blocks yet!</div>;
    }

    previewRender(){
        if(!this.state.file) return;
        console.log(this.state.currentType);
        const rend = type => {
            switch(type) {
            case 'image':
                return <img width="600" height="300" src={this.state.file} />;
            case 'video':
                return (
                    <video width="600" height="300" autoplay="autoplay" controls>
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
        
        //const preview = rend(this.state.currentType);
        return(
           <React.Fragment>
               {rend(this.state.currentType)}
               <button onClick={e => console.log('accept')}>Accept</button>
               <button onClick={() => this.setState({ file: null, visibility: '' })}>Decline</button>
           </React.Fragment>
        );
    }


    renderFileBlock =  (type, index) => {
        /*
        console.log(index);
        switch(type) {
            case 'image':
                return <img src={this.state.files[index]} />;
            case 'video':
                return <video width="600" height="300" src={this.state.files[index]}></video>
            case 'animation':
                return <img src={this.state.files[index]} />;
               
        }
        */
        /*
        if(!this.state.files[index]) return;
        console.log(index);
        const reader = new FileReader();
        reader.onload = (e) => {
            switch(type) {
                case 'image':
                    return <img src={e.target.result} />;
                case 'video':
                    return <video width="600" height="300" src={e.target.result}></video>
                case 'animation':
                    return <img src={e.target.result} />;
            }
        }
        const file = await this.state.files[index];
        console.log(file);
        await reader.readAsDataURL(this.state.files[index]); 
        */
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
import React from 'react';
import { connect } from 'react-redux';
import { fetchCourse, updateCourse } from '../../actions';

import history from '../../history';
import firebase from '../../firebase/firebaseClient';

class Course extends React.Component {
    state = {  
        blocks: [], 
        currentType: 'title', 
        text: '',
        currentFile: null,
        fileName: '',
        uploadFile: null, 
        visibility: '',
        size: 'small'    
    };
    componentDidMount() {
        if(this.props.editable) {
            if(!this.props.usersId) return history.push('/courses'); 
        }
        this.updateInitialState(this.props.id);  
    }
    updateInitialState = async id => {
        try{
            await this.props.fetchCourse(id);
            if(this.props.editable) {
                if(this.props.usersId !== this.props.course.teachersId) return history.push('/courses');  
            }
            this.setState({ blocks: [ ...this.props.course.blocks]});
        }   catch(error) {
            console.log(error);
        } 
    }
    // handling methods
    firebaseFileUpload = async () => {
        const storage = firebase.storage();
        const path = `${this.state.currentType}/${this.state.fileName}`;
        const ref = storage.ref(path);
        const task = ref.put(this.state.fileToUpload);
        await task.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
            let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log(percent + "% done");
        }, error => {
            console.log(error);
        }, async () => {
            task.snapshot.
            task.snapshot.ref.getDownloadURL().then(url => {
                const block = {
                    type: this.state.currentType,
                    url,
                    size: this.state.size
                }
                this.setState({ blocks: [ ...this.state.blocks, block ], currentFile: null, uploadFile: null, visibility: '' });
                const updatedCourse = {
                    blocks: this.state.blocks
                }
                this.props.updateCourse(this.props.id, updatedCourse);
            });
        });
    }
    addTextBlockHandler = e => {
        e.preventDefault();
        const block = {
            type: this.state.currentType,
            text: this.state.text
        }
        this.setState({ blocks: [ ...this.state.blocks, block ], text: '' });
    }
    triggerHandler = e => { 
        e.preventDefault();
        document.querySelector('input[type="file"]').click();
    }
    fileChangeHandler = async e => {
        e.preventDefault();
        console.log(222);
        const file = e.target.files[0];
        const fileName = `${Date.now()}-${file.name}`;
        const reader = new FileReader();
        reader.onload = (ev) => {
            this.setState({ currentFile: ev.target.result, fileToUpload: file, fileName, visibility: 'none' });
        };
        await reader.readAsDataURL(file);  
    }

    courseSaveHandler = e => {
        e.preventDefault();
        const updatedCourse = {
            blocks: this.state.blocks
        }
        this.props.updateCourse(this.props.id, updatedCourse);
        alert('Course has been updated');
        history.push(`/courses/edit/${this.props.id}`);
    }
    // render methods
    renderBlocks() {
        if(this.state.blocks !== []){
            return this.state.blocks.map((block, index) => {
                switch(block.type){
                    case 'title':
                        return(
                            <div className="blocks__text" key={index}>
                                <h3>{block.text}</h3>
                            </div>
                        );
                    case 'text':
                        return(
                            <div className="blocks__text" key={index}>
                                <p>{block.text}</p>
                            </div>
                        );
                    case 'image':
                        return(
                            <div className={`blocks__image ${this.state.size}`} key={index}>
                                <img src={block.url} />
                            </div>
                        );
                    case 'video':
                        return(
                            <div className={`blocks__video ${this.state.size}`} key={index}>
                                <video controls>
                                    <source src={block.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        );
                    case 'animation':
                        return(
                            <div className={`blocks__animation ${this.state.size}`} key={index}>
                                <img src={block.url} />
                            </div>
                        );
                    default:
                        return;
                }
            })
        }
        else return <b>No blocks yet!</b>;
    }
    renderPreview() {
        if(!this.state.currentFile) return;
        const renderPreviewBlock = type => {
            switch(type) {
            case 'image':
                return <img src={this.state.currentFile} />;
            case 'video':
                return (
                    <video controls>
                        <source src={this.state.currentFile} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'animation':
                return <img src={this.state.currentFile} />;
            default:  
                return;  
            }
        }
        return(
           <>
                {renderPreviewBlock(this.state.currentType)}
                <div className="preview-block__btn btn">
                    <button className="btn__submit accept" 
                        onClick={this.firebaseFileUpload}
                    >ACCEPT</button>
                    <button className="btn__submit decline" 
                        onClick={() => this.setState({ uploadFile: null, currentFile: null, visibility: '' })}
                    >DECLINE</button>
                </div>
                <h4 className="title">Choose size</h4>
                <div className="preview-radio form__radio">
                    <label htmlFor="small">Small</label>
                    <input type="radio" value="small" name="size" checked={'small' === this.state.size && 'checked'}
                        id="small" onChange={e => this.setState({ size: e.target.value })}
                    />
                    <label htmlFor="medium">Medium</label>
                    <input type="radio" value="medium" name="size" checked={'medium' === this.state.size && 'checked'}
                        id="medium" onChange={e => this.setState({ size: e.target.value })}
                    /> 
                    <label htmlFor="big">Big</label>
                    <input type="radio" value="big" name="size" checked={'big' === this.state.size && 'checked'}
                        id="big" onChange={e => this.setState({ size: e.target.value })}
                    /> 
                </div> 
           </>
        );
    }
    renderAddFileBlock(accept = []) {
        const formats = accept.join(',');
        return(
                <>
                    <input accept={formats} name="asset" type="file"  className="form__input-file"
                        onChange={this.fileChangeHandler} />
                    <div className="btn">
                        <input type="submit" className="btn__submit wide-medium" 
                        onClick={this.triggerHandler} value="CHOOSE"/>
                    </div>
                </>
        );
    }
    renderFormInputs() {
        switch(this.state.currentType) {
            case 'title':
                return(
                    <>
                        <input value={this.state.text}  type="text" className="form__input-text" 
                            onChange={e => this.setState({ text: e.target.value })} placeholder="New title"
                        />
                        <div className="btn">
                            <input type="submit" value="ADD" className="btn__submit wide-medium"
                                onClick={this.addTextBlockHandler}
                            />
                        </div>
                    </>
                );
            case 'text':
                return(
                    <>
                        <textarea value={this.state.text}  className="form__input-textarea" 
                            onChange={e => this.setState({ text: e.target.value })} placeholder="Paragraph" 
                            cols="30" rows="20" maxLength="1800"  
                        >
                        </textarea>
                        <div className="btn">
                            <input type="submit" value="ADD" className="btn__submit wide-medium"
                                onClick={this.addTextBlockHandler}
                            /> 
                        </div>
                    </>
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
    renderEditForm() {
        return(
            <>
                <section className={`course-show__preview`}>
                    <div className={`course-show__preview-block ${this.state.size}`}>
                        {this.renderPreview()}
                    </div>
                </section> 
                <section className="course-show__edit ">
                    <form className={`course-show__edit_form form ${this.state.visibility}`}>
                        <select className={`${this.state.visibility}`} value={this.state.currentType} 
                            onChange={e => this.setState({ currentType: e.target.value})} className="form__list"
                        >
                            <option value="title">Title</option>
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="animation">Animation</option>
                        </select>
                        {this.renderFormInputs()}
                    </form>                    
                </section> 
            </> 
        );
    }
    renderSaveButton() {
        return(
            <div className={`course-save__btn btn ${this.state.visibility}`}>
                <button onClick={this.courseSaveHandler} className="btn__submit">Save course</button>
            </div>
        );
    }
    render() {
        return (
            <>
                <div className="main-heading">
                    <h1>
                        {!this.props.course.heading ? 'Loading...' : `${this.props.course.heading}`}
                    </h1>
                </div>
                <article className="course-show">
                    <section className="course-show__blocks blocks">
                        {this.renderBlocks()}
                    </section>
                    {this.props.editable && this.renderEditForm()}
                    {this.props.editable && this.renderSaveButton()}
                </article>
            </>
        )
    }

}
const mapStateToProps = state => {
    return {
        course: state.courses.currentCourse,
        usersId: state.auth._id
    };
}

export default connect(mapStateToProps, { fetchCourse, updateCourse })(Course);
import React from 'react';
import axios from 'axios';

class CourseCreate extends React.Component {
    state = { url: null, error: null, blocks: [], data: null };

    /*fetchImage = async = (_id) => {

    }*/

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
    /*
    uploadImage = e => {
        e.preventDefault();
        console.log(e);
    }*/

    render() {
        return (
            <div>
                Course create
                <form onSubmit={this.uploadImage} >
                    <input type="file" name="sampleFile" id="file-id" />
                    <button>Upload</button>
                    <h1>Data: {this.state.data}</h1>
                </form>
            </div>
        )
    }
}

export default CourseCreate;
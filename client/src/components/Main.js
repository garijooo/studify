import axios from 'axios';
import React from 'react';
import history from '../histrory';

class Main extends React.Component {
    state = { privateData: null, error: null};

    componentDidMount() {
        if(!localStorage.getItem("authtoken")) history.push('/auth/signin'); 
        this.fetchPrivateData();
    }
    fetchPrivateData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("authtoken")}`
            }
        }

        try {
            const { data } = await axios.get('/api/private', config);
            
            this.setState({ privateData: data.data });
        } catch(e) {
            localStorage.removeItem("authtoken");
            this.setState({ error: 'You are not authorized, please sign in'})
        }
    }

    signOutHandler() {
        localStorage.removeItem("authtoken");
        history.push('/auth/signin');
    }

    render() {
        return (
            <div>
                <p>Main page</p>


                {this.state.privateData && (
                    <div>
                        <p>
                            {`ID of user: ${this.state.privateData._id}`}
                        </p>  
                        <p>
                            {`username: ${this.state.privateData.username}`}
                        </p>  
                        <p>
                            {`email: ${this.state.privateData.email}`}
                        </p>  
                        <button onClick={this.signOutHandler}>Sign out</button>
                    </div>
                )}       
                {this.state.error && `error is: ${this.state.error}`}
            </div>
        )
    }
}

export default Main;
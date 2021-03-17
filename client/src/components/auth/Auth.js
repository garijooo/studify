import React from 'react';

class Auth extends React.Component {
    
    render() {
        return (
            <section className="auth">
                    <form className="auth__form form" onSubmit={this.props.onSubmit}>
                        <h2>{this.props.title}</h2>
                        {this.props.renderForm}        
                        {this.props.renderSubElements}        
                    </form>
            </section>
        );
    }
}

export default Auth;

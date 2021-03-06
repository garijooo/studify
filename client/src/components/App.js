import React from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';

// subcomponents
import Header from './extra/Header';
import Help from './extra/Help';

import Test from './tests/Test';

// auth system components
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp.js';
import ForgotPass from './auth/ForgotPass';
import ResetPass from './auth/ResetPass';

// course components
import CourseCreate from './courses/CourseCreate';
import CourseEdit from './courses/CourseEdit';
import CourseDelete from './courses/CourseDelete';
import CourseShow from './courses/CourseShow';
import Courses from './courses/Courses';

// profile components
import Profile from './profiles/Profile';
import ProfileSettings from './profiles/ProfileSettings';
import ProfileCourses from './profiles/ProfileCourses';

import history from '../history';
//styles
import '../styles/style.scss';

class App extends React.Component{
    render() {
        return (
            <Router history={history}>
                <>
                    <Route path="/profile" component={Header} />
                    <Route path="/courses" component={Header} />
                    <Route path="/tests" component={Header} />
                    <Switch>
                        <Route exact path="/help" component={Help} />

                        <Route exact path="/profile/settings" component={ProfileSettings} />
                        <Route exact path="/profile/courses" component={ProfileCourses} />
                        <Route exact path="/profile/:username" component={Profile} />
                         
                        <Route exact path="/tests/:id" component={Test} />

                        <Route exact path="/courses" component={Courses} />
                        <Route exact path="/courses/:id" component={CourseShow} />
                        <Route exact path="/courses/new/:heading" component={CourseCreate} />
                        <Route exact path="/courses/edit/:id" component={CourseEdit} />
                        <Route exact path="/courses/delete/:id" component={CourseDelete} />

                        <Route exact path="/auth/signin" component={SignIn} />
                        <Route exact path="/auth/signup" component={SignUp} />
                        <Route exact path="/auth/forgotpass" component={ForgotPass} />
                        <Route exact path="/auth/resetpass/:resetToken" component={ResetPass} />

                        <Redirect from='/' to="/courses" />  
                    </Switch>
                </>
            </Router>
        );
    }
}
export default App;
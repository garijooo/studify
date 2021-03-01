import React from 'react';
import { connect } from 'react-redux';
import { fetchCourse } from '../../actions';

class CourseEdit extends React.Component {
    //state = { inputType: 'text', currentCourse: [] };
    componentDidMount() {
        this.props.fetchCourse(this.props.match.params.id);
        console.log('fetched on edit');
    }
    //componentDidMount() {
    //
    //}

    render() {
        return (
            <div>
                <b>Course edit</b> 
                <b>Heading:</b> {this.props.currentCourse.heading}
                <b>Description:</b> {this.props.currentCourse.description}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        currentCourse: state.courses.selectedCourse
    };
}
export default connect(mapStateToProps, { fetchCourse })(CourseEdit);
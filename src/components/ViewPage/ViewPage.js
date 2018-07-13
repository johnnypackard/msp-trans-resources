import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { fetchUser } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

class ViewPage extends Component {
    // will get user from redux on load
    componentDidMount() {
        this.props.dispatch(fetchUser());
    }
    
    render() {
        // content will be empty if not logged in
        let content = null;

        // show if user is logged in
        if (this.props.user.userName) {
            content = (
                <div>
            
                </div>
            );
        }

        // will return content defined above
        return (
            <div>
                <Nav />
                { content }
            </div>
        );
    }
}

export default connect(mapStateToProps)(ViewPage);
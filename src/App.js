import React, { Component } from 'react';
import ChatMessage from './components/ChatMessage';
import Signup from './components/Signup';
import ChatApp from './components/ChatApp';

import { default as Chatkit } from '@pusher/chatkit-server';

const chatkit = new Chatkit({
    instanceLocator: "v1:us1:3703e0f6-a932-4f38-bafd-ea42fe5446a4",
    key: "5cd12835-7cfc-4350-893c-e6a80d5de41f:0k7pU8AbieEM9Zy6mVGzKQeN+DM+6/HjmVqPq4gM7RQ="
})


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUsername: '',
            currentId: '',
            currentView: 'signup'
        }
        this.changeView = this.changeView.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    createUser(username) {
        chatkit.createUser({
            id: username,
            name: username,
        })
            .then((currentUser) => {
                this.setState({
                    currentUsername: username,
                    currentId: username,
                    currentView: 'chatApp'
                })
            }).catch((err) => {
            if (err.status === 400) {
                this.setState({
                    currentUsername: username,
                    currentId: username,
                    currentView: 'chatApp'
                })
            } else {
                console.log(err.status);
            }
        });
    }

    changeView(view) {
        this.setState({
            currentView: view
        })
    }

    render() {
        let view = '';

        if (this.state.currentView === "ChatMessage") {
            view = <ChatMessage changeView={this.changeView} />
        } else if (this.state.currentView === "signup") {
            view = <Signup onSubmit={this.createUser} />
        } else if (this.state.currentView === "chatApp") {
            view = <ChatApp currentId={this.state.currentId} />
        }
        return (
            <div className="App">
                {view}
            </div>
        );
    }
}
export default App;
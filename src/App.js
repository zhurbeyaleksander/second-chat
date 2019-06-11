import React, { Component } from 'react';
import {concat, isEmpty} from 'lodash';
import './App.css';
import io from 'socket.io-client';
var socket;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incominMessage: null,
      chat: [],
      chatName: null,
      userName: null,
      isLogin: false,
      message: '',
      count: 0,
    };
     socket = io('http://localhost:3001');
  };

  componentWillMount() {
  }

  componentDidUpdate() {
    socket.removeAllListeners();
    if (this.state.isLogin) { 
    socket.on('Девочки', (msg) => {
      console.log(msg.userName + msg.message);
      const newChat = concat(this.state.chat, msg);
      this.setState({chat: newChat});
    });
  }
      console.log(this.state.chat);
  } 

  renderLogin = () => {
    return(
      <div className="container">
      <form onSubmit={this.handlerLogin}>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1"><b>Ваше имя</b></label>
    <input type="input" className="form-control" name="userName" onChange={this.handelLoginFrom}  placeholder="Укажите ваше имя" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1"><b>Выберите чат</b></label>
    <select className="form-control" name="chatName" onChange={this.handelLoginFrom}  id="exampleFormControlSelect1">
      <option>Мальчики</option>
      <option>Девочки</option>
    </select>
  </div>
  <button type="submit"  className="btn btn-primary mb-2">Войти</button>
</form>
      </div>
    );
  };

  handlerLogin = (event) => {
    event.preventDefault();
    this.setState({isLogin: true});
  }

  handelLoginFrom = (event) => {
     switch(event.target.name) {
       case 'userName': this.setState({userName: event.target.value})
       break
       case 'chatName': this.setState({chatName: event.target.value})
       break
       default: console.log('Ничего не поменялось')
     }
  }

  handelMessageForm = (event) => {
    this.setState({message: event.target.value})
  }

  sendMessage = (event) => {
    event.preventDefault();
    socket.removeListener();
    socket.emit('Девочки', this.state);
     const newChat = concat(this.state.chat, this.state);
    socket.on('Девочки', (msg) => {

     console.log(msg.userName + msg.message);
     this.setState({chat: newChat});
   });
   
   this.setState({
     message: '',
     chat: newChat
    })
  }

  renderMessages = () => {
    const {chat} = this.state;
    const chatMessagers = chat.map((i) => 
         <tr key={i.messageId}>
             <th scope="row">{i.userName}</th>
             <td>{i.message}</td>
        </tr>
    );
    return <React.Fragment>{chatMessagers}</React.Fragment>;
  }

  renderChat = () => {
    return(
      <div className="container">
            <form onSubmit={this.sendMessage}>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1"><b>Привет, {this.state.userName}</b> вы находитесь в чате <b>{this.state.chatName}</b>.</label>
    <input type="input" className="form-control" value={this.state.message}  onChange={this.handelMessageForm}  />
  </div>
  <button type="submit"  className="btn btn-primary mb-2">Отправить</button>
</form>
<table className="table table-striped">
  <tbody>
    {this.renderMessages()}
  </tbody>
</table>
      </div>
    );
  };

  render() {
    return(
      <div>
        {this.state.isLogin ? this.renderChat() : this.renderLogin()}
      </div>
    );
  }
}
export default App;

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
      chat: null,
      chatName: null,
      userName: null,
      isLogin: false,
      message: '',
      count: 0,
    };
     socket = io('http://localhost:3001');
  };

  componentDidUpdate() {
      console.log(this.state.chat)
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
    socket.emit(this.state.chatName, this.state);
    socket.on('Девочки', (msg) => {

     console.log(msg.userName + msg.message)
  
   });
   this.setState({message: ''})
  }

  renderChat = () => {
    const {chat} = this.state;
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
    <tr>
      <th scope="row">Андрэ</th>
      <td>Привет! </td>
    </tr>
    <tr>
      <th scope="row">Макарэн</th>
      <td>В componentDidUpdate() можно вызывать setState(), однако его необходимо обернуть в условие, как в примере выше, чтобы не возник бесконечный цикл. Вызов setState() влечет за собой дополнительный рендер, который незаметен для пользователя, но может повлиять на производительность компонента. Вместо «отражения» пропсов в состоянии рекомендуется использовать пропсы напрямую. Подробнее о том, почему копирование пропсов в состояние вызывает баги.</td>
    </tr>
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

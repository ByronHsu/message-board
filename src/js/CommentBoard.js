import React, { Component } from 'react';
import Post from './Post';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import '../css/CommentBoard.css';

class CommentBoard extends Component {
  constructor() {
    super();
    this.state = {
      Posts: [
      ],
      Pnum: 0,
      User: "",
      Inputvalue: "",
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleAddReply = this.handleAddReply.bind(this);
    this.handleUserKeyDown = this.handleUserKeyDown.bind(this);
  }
  catchStatus = (response) => {
    if (response.ok) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
  componentWillMount() {
    fetch(`/api/Posts`)
      .then(this.catchStatus)
      .then(response => response.json())
      .then((Posts) => {
        this.setState({ Posts : Posts });
      })
      .catch((error) => {
        console.log(error);
      });
      this.props.Materialize.toast('Type In Your Name First!!', 2000,"LoadIn"); // 4000 is the duration of the toast
  }
  getNowTime() {
    const time = new Date();
    let t=[];
    t[0] = time.getFullYear();
    t[1] = time.getMonth();
    t[2] = time.getDate();
    t[3] = time.getHours();
    t[4] = time.getMinutes();
    t[5] = time.getSeconds();
    for(let i=3;i<=5;i++){
      if(t[i]>=0&&t[i]<=9){
        t[i]='0'+t[i];
      }
    }
    return `${t[0]}/${t[1]}/${t[2]} ${t[3]}:${t[4]}:${t[5]}`;
  }
  handleChange(e) {
    this.setState({ Inputvalue: e.target.value });
  }
  handleUserChange(e) {
    this.setState({ User: e.target.value,Img:Math.floor(Math.random() * 20) + 1 });
  }
  handleUserKeyDown(e){
    if(e.keyCode===13){
      this.refs.UserInput.blur()
    }
  }
  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13:
        if(this.state.Inputvalue.length===0){
          return;
        }
        if(this.state.User.length===0){
          this.props.Materialize.toast('Type In Your Name First!!', 2000,"LoadIn");
          this.refs.UserInput.focus()
          return;
        }
        e.preventDefault();
        const Posts = this.state.Posts;
        const NewPost = {
          Message: this.state.Inputvalue,
          User: this.state.User,
          Time: this.getNowTime(),
          Postid: this.state.Pnum ++,
          Comments: [],
          Img: this.state.Img,
        };
        Posts.push(NewPost);
        fetch(`/api/Post`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(NewPost),
        });
        this.setState({
          Posts,
        });
        this.setState({ Inputvalue: ''});
        break;
    }
  }
  handleAddComment(Postid, Newcomment) {
    if(this.state.User.length===0){
      this.props.Materialize.toast('Type In Your Name First!!', 2000,"LoadIn");
      this.refs.UserInput.focus()
      return false;
    }
    const Posts = this.state.Posts;
    Newcomment.User = this.state.User;
    Newcomment.Img = this.state.Img;
    Newcomment.Time = this.getNowTime();
    Posts[Postid].Comments.push(Newcomment); 
    fetch(`/api/Post/Comment/?Postid=${Postid}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Newcomment),
    });
    this.setState({
      Posts,
    });
    return true;
  }
  handleAddReply(Postid, Commentid, Newreply) {
    if(this.state.User.length===0){
      this.props.Materialize.toast('Type In Your Name First!!', 2000,"LoadIn");
      this.refs.UserInput.focus()
      return false;
    }
    const Posts = this.state.Posts;
    Newreply.User = this.state.User;
    Newreply.Img = this.state.Img;
    Newreply.Time = this.getNowTime();
    Posts[Postid].Comments[Commentid].Replys.push(Newreply);
    fetch(`/api/Post/Comment/Reply/?Postid=${Postid}&Commentid=${Commentid}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Newreply),
    });
    this.setState({
      Posts,
    });
    return true;
  }
  render() {
    return (
      <div className="CommentBoard">
        <input
          type="text" placeholder="UserName" className="UserInput"
          value={this.state.User} onChange={this.handleUserChange}
          autoFocus ref="UserInput" onKeyDown={this.handleUserKeyDown}
        />
        <input
          type="text" placeholder="Say something"
          className="AddPostInput" value={this.state.Inputvalue}
          onKeyDown={this.handleKeyDown} onChange={this.handleChange}
        />
        {this.state.Posts.map(Posts =>
          <Post
            Content={Posts} addComment={this.handleAddComment}
            addReply={this.handleAddReply}
          />)}
      </div>
    );
  }
}


export default CommentBoard;

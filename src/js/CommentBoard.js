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
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleAddReply = this.handleAddReply.bind(this);
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
  }
  getNowTime() {
    const NowDate = new Date();
    const Time = NowDate.getHours() + ':' + NowDate.getMinutes() + ':' + NowDate.getSeconds();
    return Time;
  }
  handleChange(e) {
    this.setState({ Inputvalue: e.target.value });
  }
  handleUserChange(e) {
    this.setState({ User: e.target.value });
  }
  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        const Posts = this.state.Posts;
        const NewPost = {
          Message: this.state.Inputvalue,
          User: this.state.User,
          Time: this.getNowTime(),
          Postid: this.state.Pnum ++,
          Comments: [],
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
    const Posts = this.state.Posts;
    Newcomment.User = this.state.User;
    Posts[Postid].Comments.push(Newcomment); 
    console.log(Postid);
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

  }
  handleAddReply(Postid, Commentid, Newreply) {
    const Posts = this.state.Posts;
    Newreply.User = this.state.User;
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
  }
  render() {
    return (
      <div className="CommentBoard">
        <input
          type="text" placeholder="UserName" className="UserInput"
          value={this.state.User} onChange={this.handleUserChange}
          autoFocus
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

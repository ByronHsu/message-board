import React, { Component } from 'react';
import Comment from './Comment';
import '../css/Post.css';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cnum: 0,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddReply = this.handleAddReply.bind(this);
  }
  getNowTime() {
    const NowDate = new Date();
    const Time = NowDate.getHours() + ':' + NowDate.getMinutes() + ':' + NowDate.getSeconds();
    return Time;
  }
  handleChange(e) {
    this.setState({ Inputvalue: e.target.value });
  }
  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        const Newcomment = {
          Message: this.state.Inputvalue,
          Time: this.getNowTime(),
          Commentid: this.state.Cnum++,
          Replys: [],
        };
        this.setState({ Inputvalue: '' });
        this.props.addComment(this.props.Content.Postid,Newcomment);
        break;
    }
  }
  handleAddReply(Commentid, Newreply) {
    this.props.addReply(this.props.Content.Postid, Commentid, Newreply);
  }
  render() {
    let str;
    str="img/"+this.props.Content.Img+".png";
    return (
      <div className="Post">   
        <div className="PostContent">
          <img src={str} className="PostImg" />
          <div className="PostTitle">
            <h className="PostTitleUser">{this.props.Content.User}</h> 
            <h className="PostTitleTime">{this.props.Content.Time}</h>
          </div>
          <div className="PostText">
            {this.props.Content.Message}
          </div>
        </div>
        <div className="PostComment">
          {this.props.Content.Comments.map(Comments =>
            <Comment
              Content={Comments} addReply={this.handleAddReply}
            />)}
        </div>
        <div className="PostFooter">
          <input
            type="text" className="CommentInput"
            value={this.state.Inputvalue} onKeyDown={this.handleKeyDown} 
            onChange={this.handleChange} placeholder="Add Comment..."
          />
        </div>
      </div>
    );
  }
}

export default Post;

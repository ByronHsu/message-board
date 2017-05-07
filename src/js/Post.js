import React, { Component } from 'react';
import Comment from './Comment';
import '../css/Post.css';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: 0,
      Inputvalue: '',
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddReply = this.handleAddReply.bind(this);
    this.handleCommentOnClick = this.handleCommentOnClick.bind(this);
  }
  handleCommentOnClick() {
    this.setState({ comment: !this.state.comment });
  }
  handleChange(e) {
    this.setState({ Inputvalue: e.target.value });
  }
  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13:
        if (this.state.Inputvalue.length === 0) {
          return;
        }
        e.preventDefault();
        const Newcomment = {
          Message: this.state.Inputvalue,
          Commentid: this.props.Content.Comments.length,
          Replys: [],
          Inputvalue: '',
        };
        if (!this.props.addComment(this.props.Content.Postid,Newcomment)){
          return;
        }
        this.setState({ Inputvalue: '' });
        break;
    }
  }
  handleAddReply(Commentid, Newreply) {
    if (!this.props.addReply(this.props.Content.Postid, Commentid, Newreply)){
      return false;
    }else{
      return true;
    }
  }
  render() {
    let PostComment,PostFooter;
    if (this.state.comment === true){
      PostComment = (
        <div className="PostComment">
          {this.props.Content.Comments.map(Comments =>
            <Comment
              Content={Comments} addReply={this.handleAddReply}
            />)}
        </div>
      );
      PostFooter = (
        <div className="PostFooter">
          <input
            type="text" className="CommentInput"
            value={this.state.Inputvalue} onKeyDown={this.handleKeyDown} 
            onChange={this.handleChange} placeholder="Add Comment..."
            autoFocus
          />
        </div>
      );
    }
    return (
      <div className="Post">   
        <div className="PostContent">
          <img src={'img/'+this.props.Content.Img+'.png'} className="PostImg" />
          <div className="PostTitle">
            <h className="PostTitleUser">{this.props.Content.User}</h> 
            <h className="PostTitleTime">{this.props.Content.Time}</h>
          </div>
          <div className="PostText">
            {this.props.Content.Message}
          </div>
          <div className="CommentBtn" onClick={this.handleCommentOnClick}>
          <i className="material-icons Cicon">comment</i> 
          <a className="Ctext">Comment</a>
          </div>
        </div>
        {PostComment}
        {PostFooter}
      </div>
    );
  }
}

export default Post;

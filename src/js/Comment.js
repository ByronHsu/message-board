import React, { Component } from 'react';
import '../css/Comment.css';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Rnum: 0,
      reply: 0,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReplyOnClick = this.handleReplyOnClick.bind(this);
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
        const Newreply = {
          Message: this.state.Inputvalue,
          Time: this.getNowTime(),
          Replyid: this.state.Rnum++,
        };
        this.setState({ Inputvalue: '' });
        this.props.addReply(this.props.Content.Commentid, Newreply);
        break;
    }
  }
  handleReplyOnClick() {
    this.setState({ reply: !this.state.reply });
  }
  render() {
    let Replyinput;
    if (this.state.reply === true){ 
      Replyinput=
      (
        <input
          type="text" placeholder="Say something"
          value={this.state.Inputvalue} onKeyDown={this.handleKeyDown} 
          onChange={this.handleChange}
        />
      );
    }
    return (
      <div className="Comment">
        <div className="CommentContent">
          <div className="CommentUp">
            <strong>{this.props.Content.User} </strong>
            {this.props.Content.Message}
          </div>
          <div className="CommentDown">
            <h5 className="CommentTime"> {this.props.Content.Time} </h5> <br />
            <button className="ReplyButton" onClick={this.handleReplyOnClick}>Reply</button>
          </div>
        </div>
        {Replyinput}
        {this.props.Content.Replys.map(Replys =>
            <div>
              <h3>{Replys.User}</h3>
              <h3>{Replys.Time}</h3>
              <h3>{Replys.Message}</h3>
            </div>)}

       </div>
    );
  }
}
export default Comment;
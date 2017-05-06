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
    let Replyinput,Replymap;
    if (this.state.reply === true){ 
      Replyinput =
      (
        <input
          type="text" placeholder="Reply..."
          value={this.state.Inputvalue} onKeyDown={this.handleKeyDown} 
          onChange={this.handleChange} className="ReplyInput"
          autoFocus
        />
      );
      Replymap =
      (
        this.props.Content.Replys.map(Replys =>
            <div className="Reply">
              <h5 className="ReplyUser">{Replys.User}</h5>
              <p className="ReplyMessage">{Replys.Message}</p>
              <h5 className="ReplyTime">{Replys.Time}</h5>
            </div>)
      );
    }
    return (
      <div className="Comment">
        <div className="CommentContent">
          <div className="CommentUp">
            <h5 className="CommentUser">{this.props.Content.User}</h5>
          </div>
          <div className="CommentDown">
            {this.props.Content.Message}<br />
          </div>
          <h5 className="CommentTime"> {this.props.Content.Time} </h5>
          <button className="ReplyButton" onClick={this.handleReplyOnClick}>Reply</button>
        </div>
        {Replymap}
        {Replyinput}
       </div>
    );
  }
}
export default Comment;
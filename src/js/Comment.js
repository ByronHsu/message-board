import React, { Component } from 'react';
import '../css/Comment.css';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: 0,
      Inputvalue: '',
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReplyOnClick = this.handleReplyOnClick.bind(this);
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
        const Newreply = {
          Message: this.state.Inputvalue,
          Replyid: this.props.Content.Replys.length,
        };
        if (!this.props.addReply(this.props.Content.Commentid, Newreply)) {
          return;
        }
        this.setState({ Inputvalue: '' });
        break;
    }
  }
  handleReplyOnClick() {
    this.setState({ reply: !this.state.reply });
  }
  render() {
    let Replyinput,Replymap,str;
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
              <img src={'img/' + Replys.Img + '.png'} className="ReplyImg" />
              <div className="ReplyContent">
              <h5 className="ReplyUser">{Replys.User}</h5>
              <p className="ReplyMessage">{Replys.Message}</p>
              <h5 className="ReplyTime">{Replys.Time}</h5>
              </div>
            </div>)
      );
    }
    return (
      <div className="Comment">
        <img src={'img/'+this.props.Content.Img+'.png'} className="CommentImg" />
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
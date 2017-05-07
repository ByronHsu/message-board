import React from 'react';
import ReactDOM from 'react-dom';
import CommentBoard from './js/CommentBoard';
import './css/index.css';

ReactDOM.render(
  <CommentBoard Materialize={window.Materialize}/>,
  document.getElementById('Content'),
);

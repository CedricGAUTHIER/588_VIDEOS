import React from 'react';
import './Message.scss';


function Message({messageResult}) {
  console.log(messageResult)
  return (
    <div className={messageResult.class}>
      <p className="sign-up-result">
        {messageResult.text}
      </p>
    </div>
  );
}

export default Message;

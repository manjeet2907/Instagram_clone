import React from "react";

function Post({ title, body, img, postedBy, likes, like, unlike }) {
  return (
    <div className='postcard'>
      <div className='card'>
        <h5>{postedBy}</h5>
        <img src={img} alt='status' />
      </div>
      <div className='card-content'>
        <i className='material-icons' style={{ color: "#e53935" }}>
          favorite
        </i>
        <i className='material-icons' onClick={() => like}>
          thumb_up
        </i>
        <i className='material-icons' onClick={() => unlike}>
          thumb_down
        </i>
        <h5>{likes} likes</h5>
        <h5>{title}</h5>
        <h6>{body}</h6>
        <input type='text' placeholder='add a Comment' />
      </div>
    </div>
  );
}

export default Post;

import React, {useState} from 'react';
import './middle.scss';

const Middle = ({onSubmitTweet}) => {

  const [message, setMessage] = useState("");

  return (
    <React.Fragment>
    <h3>Home</h3>
      <form onSubmit={() => onSubmitTweet(message)}>
        <div className="input-group mb-1">
          <textarea className="form-control" maxLength="280" aria-label="With textarea" placeholder="What's Happening?"
          onChange = {event => {
            event.preventDefault();
            setMessage(event.target.value)}}>
          </textarea>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary btn-sm mb-3" >Tweet</button>
        </div>
      </form>
    </React.Fragment>
  )

}

export default Middle;
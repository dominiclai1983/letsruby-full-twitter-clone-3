import React from 'react';
import ReactDOM from 'react-dom';
import Nva from './page/nva';
import Middle from './page/middle';
import Right from './page/right';
import {json, checkStatus} from './utils';
import $ from 'jquery';
import Dropdown from 'react-bootstrap/Dropdown';

import './tweet.scss';

const ListUserTweet = (props) => {
  const {listAllTweet, onDelete} = props;

  return (
    <React.Fragment>
      <div className="border py-4 alltweet" tweet-id={listAllTweet.id}>
        <div className="d-flex">@{listAllTweet.username}
          <Dropdown id="dropdown-basic">
              <Dropdown.Toggle variant="outline-dark">
                <i className="fas fa-ellipsis-h"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#"><i className="fas fa-pencil-alt"></i> Edit Tweet</Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => onDelete(listAllTweet.id)}><i className="fas fa-trash"></i> Move To Trash</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </div>
        <p className="tweet">{listAllTweet.message}</p>
      </div>
    </React.Fragment>
  )
}



const ListAllTweet = (prop) => {
  const {listAllTweet} = prop;

  return (
    <React.Fragment>
      <div className="border py-4 alltweet" tweet-id={listAllTweet.id}>
        <div className="d-flex">@{listAllTweet.username}
        </div>
        <p className="tweet">{listAllTweet.message}</p>
      </div>
    </React.Fragment>
  )
}

class Tweet extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listAllTweet: [],
      authenticated: null,
      username: null,
      change: false,
      allmode: true
    };

    this.handleAllTweet = this.handleAllTweet.bind(this);
    this.handleUserTweet = this.handleUserTweet.bind(this);
    this.handleDeleteTweet = this.handleDeleteTweet.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){

    let {listAllTweet, authenticated, username} = this.state;

    fetch('api/authenticated')
    .then(checkStatus)
    .then(json)
    .then(data => {
      if(data.authenticated){
      this.setState({
        authenticated: data.authenticated,
        username: data.username
        });
      }else if(!data.authenticated){
        window.location.href = '/';
      }
    })
    .catch(error => {
      console.log(error);
    })

    this.handleAllTweet();
  }

  handleLogout(){

    var request = {
      type: 'DELETE',
      url: 'api/sessions',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },

      success: function (response) {
        console.log("logout")
        window.location.href = '/';
        this.setState({
          authenticated: null,
          listAllTweet: [],
          username: null
        })

      },
      error: function (request, errorMsg) {
        console.log(request, errorMsg);
        console.log("error");
      }
    }
    $.ajax(request);
  }

  //getting all tweet from API
  handleAllTweet(){

    this.setState({
      allmode: true
    })

    fetch('api/tweets')
    .then(checkStatus)
    .then(json)
    .then(data => {
      console.log(data);
      this.setState({
        listAllTweet: data.tweets
      })
    })
    .catch(error => {
      console.log(error);
    })
    
  }

  //getting tweet from current user only
  handleUserTweet(){
    let {username} = this.state;

    this.setState({
      allmode: false
    })

    fetch(`api/users/${username}/tweets`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      console.log(data);
      this.setState({
        listAllTweet: data.tweets
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  //hand delete tweet
  handleDeleteTweet(id){
    if(!id){
      return;
    }

    var request = {
      type: 'DELETE',
      url: `api/tweets/${id}`,
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data:{
        id: id
      },
      success: function (response) {
        console.log("success");
      },
      error: function (request, errorMsg) {
        console.log(request, errorMsg);
        console.log("error");
      }
    }
    $.ajax(request);

    this.handleAllTweet();

  }

  handleTweetSubmit(message){

    var request = {
      type: 'POST', 
      url: 'api/tweets',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data:{
        tweet: {
          message
        }
      },
      success: function (response) {
        console.log("success")
      },
      error: function (request, errorMsg) {
        console.log(request, errorMsg);
        console.log("error");
      }
    }
    $.ajax(request);
  
  }

  render(){

    const {listAllTweet, username, authenticated, allmode} = this.state;

    return (
        <React.Fragment>
        <Nva onLogout={this.handleLogout} />
          <div className='container'>
            <div className='row'>
              <div className='col-3 text-right'>
                <h3>@{username}</h3>
                <a href="#" onClick={this.handleAllTweet} className="d-block text-dark">All Tweet</a>
                <a href="#" onClick={this.handleUserTweet} className="d-block text-dark">Only Your Tweet</a>
              </div>
              
              <div className='col-9 col-md-6'>
                <Middle onSubmitTweet={this.handleTweetSubmit} />
                  {allmode? listAllTweet.map(listAllTweet => <ListAllTweet key={listAllTweet.id} listAllTweet={listAllTweet} />) : 
                  listAllTweet.map(listAllTweet => <ListUserTweet key={listAllTweet.id} listAllTweet={listAllTweet} onDelete={this.handleDeleteTweet} />)
                }
              </div>
    
              <Right />
            </div>
          </div>
      </React.Fragment>
    )
  }
}

export default Tweet;

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <Tweet />,
      document.body.appendChild(document.createElement('div')),
    )
  })
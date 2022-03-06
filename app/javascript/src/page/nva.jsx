import React from 'react'
import $ from 'jquery';
import './nva.scss';

const Nva = ({onLogout}) => {

  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#"><i className="fab fa-twitter fa-2x"></i></a>
          <button type="button" className="btn btn-dark text-right" onClick={() => {onLogout()}}>Log Out</button>
      </nav>
    </React.Fragment>
  )
}

export default Nva;
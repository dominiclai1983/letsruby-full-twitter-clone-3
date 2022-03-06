import React from 'react'
import './layout.scss'

const Layout = (props) => {
  return (
    <div>
        <div className='container min-vw-100'>
            <div className='row'>
                {/*left hand side*/}
                  <div className='col-12 col-md-6 left-page d-flex align-items-center justify-content-center'>
                    <div>
                      <img src="https://i.imgur.com/gCar7Gr.png" width="450" height="450" alt="icon" />
                    </div>
                  </div>
                
                  <div className='col-12 col-md-6 right-page'>
                    {props.children} 
                  </div>
            </div>
        </div>
    </div>
  )
}

export default Layout
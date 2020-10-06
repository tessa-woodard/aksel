import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Typed from 'react-typed'

class Home extends Component {
    render(props) {
        return (


            <div className="Home">

                <div className="title_container">
                    <Typed
                        strings={['Welcome to Aksel! <br> Your Employee Portal']}
                        typeSpeed={50}
                        backSpeed={50}
                        loop={true}
                        cursorChar={"|"}
                    />

                    <div className="button">
                        <Link to="/login">
                            <button className="dark_button">
                                Continue
                            </button>
                        </Link>
                    </div>

                </div>
            </div>

        )
    }
}



export default Home
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

                </div>

                <div className="container_holder">
                    <div className="get_started">Get Started</div>

                    <div className="button_container">
                        <Link to="/login">
                            <a class="button2">Login</a>
                        </Link>

                        <Link to="/register">
                            <a class="button2">Register</a>
                        </Link>
                    </div>
                </div>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" integrity="sha256-qM7QTJSlvtPSxVRjVWNM2OfTAz/3k5ovHOKmKXuYMO4=" crossorigin="anonymous"></script>
            </div >

        )
    }
}



export default Home
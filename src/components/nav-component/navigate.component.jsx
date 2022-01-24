import { Component } from "react";
import { Link } from "react-router-dom";
import './navigate.style.css'

class Navigate extends Component {
    state = {  } 
    render() { 
        return (
            <div className="navigate-container">
                <Link to='/'><button className="btn4">HOME</button></Link>
                <Link to='/moves-page'><button className="btn4">MOVES</button></Link>
            </div>
        );
    }
}
 
export default Navigate;
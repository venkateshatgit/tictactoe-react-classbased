import { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import { onChangeRow, onChangeColoum, onChangeWinnerRatio } from "../../redux/gameClassSlice"
import './home.style.css';
import Header from "../../header";



class HomePage extends Component {

    render() { 

        const handleClick = (event) => {

            this.props.setStateRow(event);
            this.props.setStateColoum(event);
            this.props.setStateWinnerRatio(0);

            if(event===0){
                let x = Math.floor(Math.random(0)*10)+3;
                this.props.setStateRow(x);
                this.props.setStateColoum(x);
            }
        }

        return (
            <div className="home-page">
                <Header winner={""}/>
                <div>
                    <Link onClick={() => handleClick(0)} to='/game'>
                        <button className="btn1">Play random </button>
                    </Link>
                </div>
                <div className="buttons">
                    <Link onClick={() => handleClick(3)} to='/game' >
                        <button className="btn2">3 <span>❌</span> 3</button> 
                    </Link>
                    <Link onClick={() => handleClick(5)} to='/game' >
                        <button className="btn2">5 <span>❌</span> 5</button> 
                    </Link>
                    <Link onClick={() => handleClick(7)} to='/game' >
                        <button className="btn2">7 <span>❌</span> 7</button> 
                    </Link>
                    <Link  to='/custom-page' > 
                        <button className="btn2">Custom..</button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rows: state.game_Class.rows,
        coloums: state.game_Class.coloums,
        winnerRatio: state.game_Class.winnerRatio,
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        setStateRow: (x) => dispatch(onChangeRow(x)),
        setStateColoum: (x) => dispatch(onChangeColoum(x)),
        setStateWinnerRatio: (x) => dispatch(onChangeWinnerRatio(x)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
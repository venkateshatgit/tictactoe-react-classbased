import { Component } from "react";
import InputComponents from "../../components/input-components/input-components";
import './custom.style.css';
import { connect } from "react-redux";
import {onChangeXColor, onChangeOColor, onChangeRow, onChangeColoum, onChangeWinnerRatio} from '../../redux/gameClassSlice'
import Header from "../../header";
import { Link } from "react-router-dom";


class CustomPage extends Component {
    state = { 
        play: true
    } 
    render() { 

        const {play} = this.state
        const {rows, coloums, xColor, oColor,
             setStateXColor, setStateOColor, 
             setStateRow, setStateColoum, setStateWinnerRatio} = this.props

        const handleColorChange = e =>{
      
            let result;
            if(e.target.name==="x"){
              setStateXColor(e.target.value)
            }
            else{
              setStateOColor(e.target.value)
            }
        }


        const handleChange = (e) =>{
            let change = e.target.value;
            if(change < 3)
                change=3;

            if(e.target.name === "row")
                setStateRow(Number(change));

            else
                setStateColoum(Number(change))
            
        }

        const checkWinnerRatio = (e) => {


            if((e<3 || e>rows || e>coloums) && play){
                alert("Invalid Winner Ratio !!. Winner Ratio must be less than rows and coloumns and also greater then equal to 3.")
                this.setState({
                    play: false,
                })
            }
            else if(e>=3 && e<=rows && e<=coloums){
                this.setState({
                    play: true
                })

                setStateWinnerRatio(e)
            }
      
        }


        return (
            <div className="custom-page">
                <Header winner={""}/>
                <div className="custom-inputs-div">
                    <h1>Custom Your Board</h1>
                    <div className="color" style={{color: "#fff", fontSize: "20px"}}>

                        
                        <InputComponents 
                            label={"X"} 
                            type={"color"}
                            value={xColor}
                            name={"x"}
                            onChange={handleColorChange}
                        /> 

                        <InputComponents 
                            label={"O"} 
                            type={"color"}
                            value={oColor}
                            name={"o"}
                            onChange={handleColorChange}
                        /> 

                    </div>

                    <div>

                        <InputComponents 
                            name={"row"}
                            label={"Rows : "}
                            type={"number"}
                            onChange={handleChange}
                            placeholder={"Enter row"}
                            className={"mat-inputs"}
                        />

                        <InputComponents 
                            name={"column"}
                            label={"Coloums : "}
                            type={"number"}
                            onChange={handleChange}
                            placeholder={"Enter columns "}
                            className={"mat-inputs"}
                        />


                        {/* Input for winner ratio */}
                        <InputComponents 
                            label={"Winner Ratio : "}
                            type={"number"}
                            onChange = {
                                e => checkWinnerRatio(Number(e.target.value))
                            }
                            className={"mat-inputs"}
                        />

                    </div>

                </div>

                <div className="play-btn">
                    <Link to={'/game'}>
                        <button className="reset-btn">Play</button>
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
      xColor: state.game_Class.xColor,
      oColor: state.game_Class.oColor,
      winnerRatio: state.game_Class.winnerRatio
    }
    
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    // dispatching plain actions
        setStateRow: (x) => dispatch(onChangeRow(x)),
        setStateColoum: (x) => dispatch(onChangeColoum(x)),
        setStateXColor: (x) => dispatch(onChangeXColor(x)),
        setStateOColor: (x) => dispatch(onChangeOColor(x)),
        setStateWinnerRatio: (x) => dispatch(onChangeWinnerRatio(x)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CustomPage);
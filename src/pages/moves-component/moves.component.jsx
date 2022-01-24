import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './moves.style.css'



class Moves extends Component {
    state = {  } 
    render() { 

        const {rows, coloums, xColor, oColor, history} = this.props

        const jumpTo = (step, move) =>{

            let bool;
        
            if(move%2 !==0){
                bool = false
            }
            else{
                bool = true
            }
        
            this.setState({
                matrix: step,
                matMove: move,
                isXNext: bool
            })
        }
      
          //build list of moves with history data
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
        
            return (
                <li key={move}>
                    <Link to='/game'>
                        <button
                            className="btn"
                            style={{
                            backgroundColor: `${move%2===0 ? oColor : xColor}`
                            }}
                            onClick={() => jumpTo(step, move)}
                        >
                            {desc}
                        </button>
                    </Link>
                
                </li>
            );
        });

        return (
            <div className="right-div panel">
                <h1>{`${rows} ❌ ${coloums}`}</h1>
                <div className="game-info">
                    <ul>{moves}</ul>
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
      winnerRatio: state.game_Class.winnerRatio,
      history: state.game_Class.history
    }
  }

export default connect(mapStateToProps, null)(Moves);
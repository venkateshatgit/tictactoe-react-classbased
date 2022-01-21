import { Component } from "react";
import { connect } from "react-redux";
import Square from "./components/square.component/square.component";

class Board extends Component {
  
  render() {
    const {squares, onClick, xColor, oColor, rows, coloums} = this.props

    function renderSquare(rowIndex, i){

      return (
       
         <Square
           key={rowIndex, i}
           value={squares[rowIndex][i]}
           onClick={() => onClick(rowIndex, i)}
         />
       );
    }
 
    return (
      <div 
        className="board" 
      >
        {
          squares.map((rows, rowIndex) => (
            <div 
              className="board-row-div" 
              key={rowIndex} 
              style={{
                gridTemplateColumns : `repeat(${coloums}, 1fr)`, 
                gridTemplateRows: `repeat(${rows}, 1fr)`
              }}
            >
              {
                  rows.map( (square, index) => renderSquare(rowIndex, index))
              }
            </div>
           
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    rows: state.game_Class.rows,
    coloums: state.game_Class.coloums,
    xColor: state.game_Class.xColor,
    oColor: state.game_Class.oColor,
  }
}
 
export default connect(mapStateToProps)(Board);



// function Board({squares, onClick, xColor, oColor, rows, columns}) {
  
    // function renderSquare(rowIndex, i){

    //      return (
          
    //         <Square
    //           key={rowIndex, i}
    //           value={squares[rowIndex][i]}
    //           onClick={() => onClick(rowIndex, i)}
    //           xColor={xColor}
    //           oColor={oColor}
    //           rows={rows}
    //           columns={columns}
    //         />
    //       );
    // }

    // return (
    //   <div 
    //     className="board" 
    //   >
    //     {
    //       squares.map((rows, rowIndex) => (
    //         <div 
    //           className="board-row-div" 
    //           key={rowIndex} 
    //           style={{
    //             gridTemplateColumns : `repeat(${columns}, 1fr)`, 
    //             gridTemplateRows: `repeat(${rows}, 1fr)`
    //           }}
    //         >
    //           {
    //               rows.map( (square, index) => renderSquare(rowIndex, index))
    //           }
    //         </div>
           
    //       ))
    //     }
    //   </div>
    // );
// }

// export default Board;

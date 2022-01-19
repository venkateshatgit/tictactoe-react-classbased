import { Component } from "react";
import Square from "./components/square.component/square.component";

class Board extends Component {
  
  render() {
    const {squares, onClick, xColor, oColor, rows, columns} = this.props

    function renderSquare(rowIndex, i){

      return (
       
         <Square
           key={rowIndex, i}
           value={squares[rowIndex][i]}
           onClick={() => onClick(rowIndex, i)}
           xColor={xColor}
           oColor={oColor}
           rows={rows}
           columns={columns}
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
                gridTemplateColumns : `repeat(${columns}, 1fr)`, 
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
 
export default Board;



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

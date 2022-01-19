import { Component } from "react";
import Board from "../../board.component";

class MiddleDivPanel extends Component {

  render() { 

    const {isXNext, xColor, oColor, rows, coloums, matrix, handleClick} = this.props
    return (  
      <div 
        className="middle-div panel matrix"
        style={{
          backgroundColor: `${isXNext ? xColor: oColor}`

        }}
      >
          <Board 
              squares={matrix}
              onClick={handleClick}
              xColor={xColor}
              oColor={oColor}
              rows={rows}
              columns={coloums}
          />
      </div>
  );
  }
}
 
export default MiddleDivPanel;


// function MiddleDivPanel({isXNext, xColor, oColor, rows, coloums, matrix, handleClick}) {
//     return (  
//         <div 
//           className="middle-div panel matrix"
//           style={{
//             backgroundColor: `${isXNext ? xColor: oColor}`

//           }}
//         >
//             <Board 
//                 squares={matrix}
//                 onClick={handleClick}
//                 xColor={xColor}
//                 oColor={oColor}
//                 rows={rows}
//                 columns={coloums}
//             />
//         </div>
//     );
// }

// export default MiddleDivPanel;
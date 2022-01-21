import { Component } from "react";
import { connect } from "react-redux";
import Board from "../../board.component";

class MiddleDivPanel extends Component {

  render() { 

    const {isXNext, xColor, oColor, matrix, handleClick} = this.props
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
          />
      </div>
  );
  }
}
 
const mapStateToProps = (state) => {
  return {
    xColor: state.game_Class.xColor,
    oColor: state.game_Class.oColor,
  }
  
}


export default connect(mapStateToProps) (MiddleDivPanel);


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
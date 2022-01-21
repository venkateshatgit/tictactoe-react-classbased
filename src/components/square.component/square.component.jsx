import { Component } from "react";
import { connect } from "react-redux";

class Square extends Component {
  render() { 
    const {value, onClick, xColor, oColor, rows, columns} = this.props
    return (
      <button 
        className="square" 
        style={{
          color : `${value ==="X" ? xColor: oColor}`,
        }}
        onClick={onClick}>
        {value}
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rows: state.game_Class.rows,
    coloums: state.game_Class.coloums,
    xColor: state.game_Class.xColor,
    oColor: state.game_Class.oColor,
  }
}
 
export default connect(mapStateToProps) (Square);

// function Square({value, onClick, xColor, oColor, rows, columns}) {
//     return (
//       <button 
//         className="square" 
//         style={{
//           color : `${value ==="X" ? xColor: oColor}`,
//         }}
//         onClick={onClick}>
//         {value}
//       </button>
//     );
//   }

// export default Square;
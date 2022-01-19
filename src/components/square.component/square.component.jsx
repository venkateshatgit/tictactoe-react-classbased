import { Component } from "react";

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
 
export default Square;

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
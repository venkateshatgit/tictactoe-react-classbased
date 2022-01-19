import { Component } from "react";

class RightDivPanel extends Component {
    render() { 

        const {moves} = this.props
        return (
            <div className="right-div panel">
                {/* Game Info displaying moves */}
                <div className="game-info">
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}
 
export default RightDivPanel;


// function RightDivPanel({moves}) {
//     return (  
//         <div className="right-div panel">
//           {/* Game Info displaying moves */}
//           <div className="game-info">
//               <ul>{moves}</ul>
//           </div>
//         </div>
//     );
// }

// export default RightDivPanel;
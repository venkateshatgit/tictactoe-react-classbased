import { Component } from "react";


class Header extends Component {

    
    render() { 

        const {winner, isXNext, xColor, oColor} = this.props
        
        return (
            <h1 
            className={winner.length ? 'zoom-in-out-box': ""}
            style={{
            color: 
            `${winner.length ? 
                ((isXNext) ? oColor: xColor) : "#fff"}`
            }}
            >

                {winner.length ? winner : "Tic Tac Toe" }

            </h1>
        );
    }
}
 
export default Header;

// function Header({winner, isXNext, xColor, oColor}) {
//     return ( 
//         <h1 
//             className={winner.length ? 'zoom-in-out-box': ""}
//             style={{
//             color: 
//             `${winner.length ? 
//                 ((isXNext) ? oColor: xColor) : "#fff"}`
//             }}
//         >

//             {winner.length ? winner : "Tic Tac Toe" }

//         </h1>
//     );
// }

// export default Header;
import { Component } from "react";


class Reset extends Component {
     
    render() { 
        return (
            <div>
              <button  className="reset-btn" onClick={() => {window.location.reload()}}>Reset</button>
            </div>
        );
    }
}
 
export default Reset;


// function Reset() {
//     return (  
//         <div>
//               <button  className="reset-btn" onClick={() => {window.location.reload()}}>Reset</button>
//         </div>
//     );
// }

// export default Reset;
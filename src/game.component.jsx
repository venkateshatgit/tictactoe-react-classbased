import InputComponents from "./components/input-components/input-components";
import Header from "./header";
import RightDivPanel from "./components/right.component/right-div-panel.component";
import MiddleDivPanel from "./components/middle.component/middle-div-panel";
import Reset from "./components/reset.component/reset.component";
import WhoIsNext from "./components/who-is-next.component/who-is-next.component";
import { Component } from "react";
import { connect } from "react-redux";
import {onChangeColoum, onChangeRow, onChangeXColor, onChangeOColor} from './redux/gameClassSlice'


class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matrix: Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null)),
      isXNext: true,
      winner: "",
      play: true,
      history: [Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null))],
      stepNumber: 0,
      matMove: 0,
      winnerRatio: 0,
    };
  }

  componentDidUpdate (prevProps, prevState){

    if(this.props.rows !== prevProps.rows){
      this.setState({
        matrix: Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null)),
        history: [Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null))],
        winner: "",
        play: true,
        matMove: 0,
        isXNext: true
      })
    }

    if(this.props.coloums !== prevProps.coloums){
      this.setState({
        matrix: Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null)),
        history: [Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null))],
        winner: "",
        play: true,
        matMove: 0,
        isXNext: true
      })

    }

    if(this.state.winnerRatio !== prevState.winnerRatio){
      this.setState({
        matrix: Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null)),
        history: [Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null))],
        winner: "",
        play: true,
        matMove: 0,
        isXNext: true
      })
    }

  }

  


  render() { 

    const {matrix, isXNext, winner,
    play, history, stepNumber, matMove, winnerRatio} = this.state

    const {rows, coloums, xColor, oColor, setStateColoum, setStateRow, setStateXColor, setStateOColor} = this.props


    
    const horizontalCheck = (rowIndex, colIndex) =>{
      
      for(let i=0; i<coloums; ++i){
        let check = 0;

        for(let j=i; j<coloums; ++j){
          if(matrix[rowIndex][j]===matrix[rowIndex][colIndex])
            check+=1;
          else
            break;
        }

        if(check>=winnerRatio)
          return true;
      }

      return false;
    } 

    const verticalCheck = (rowIndex, colIndex) =>{
      
      for(let i=0; i<rows; ++i){
        let check = 0;

        for(let j=i; j<rows; ++j){
          if(matrix[j][colIndex] == matrix[rowIndex][colIndex])
            check+=1;
          else
            break;
        }

        if(check>=winnerRatio)
            return true;
      }

      return false;
    }

    const diagonalTopToBottomCheck = (rowIndex, colIndex) =>{
      

      // console.log("In check diagonal")
      let r, c;
      if(colIndex >= rowIndex){
        r=0;
        c=colIndex - rowIndex;
      }
      else{
        c=0;
        r=rowIndex-colIndex;
      }


      for(let i=r, j=c; i<rows && j<coloums; ++i, ++j){
        let check = 0;

        
        for(let p=i, q=j; p<rows && q<coloums; ++p, ++q){

          // console.log(`Checking ${p} ${q}`)
          if(matrix[p][q] === matrix[rowIndex][colIndex])
            check+=1;
          else
            break;
        }

        if(check >= winnerRatio)
          return true;
      }

      return false;

    }

    const checkUp = (rowIndex, colIndex, check) => {

      
      if(rowIndex<0 || colIndex>=coloums || matrix[rowIndex][colIndex]!==check )
        return 0;
      
      //console.log(matrix[rowIndex][colIndex], rowIndex, colIndex)
      
      let x = checkUp(rowIndex-1, colIndex+1, check) + 1;

      return x;
    }

    const checkDown = (rowIndex, colIndex, check) => {

      if(rowIndex>=rows || colIndex<0 || matrix[rowIndex][colIndex]!==check )
        return 0;
      
      let x = checkDown(rowIndex+1, colIndex-1, check) + 1;

      return x;
    }

    const diagonalBottomToTopCheck = (rowIndex, colIndex) => {

      let up  = checkUp(rowIndex-1, colIndex+1, matrix[rowIndex][colIndex]);
      let down = checkDown(rowIndex+1, colIndex-1, matrix[rowIndex][colIndex]);

      // console.log("Up", up, "Down", down);
      if(up+down+1 >= winnerRatio)
        return true;
      
      return false;
    }

    const checkWinner = (row, col, diagonalTB, diagonalBT, check) =>{


      if( row===true || col===true || diagonalTB===true || diagonalBT===true){
        this.setState({
          winner: `Winner is ${check}`,
          play: false
        })
      }

    }

    const dynamicWinner = (rowIndex, colIndex, check) => {

      
      const row = horizontalCheck(rowIndex, colIndex);
      const col = verticalCheck(rowIndex, colIndex);
      const diagonalTB = diagonalTopToBottomCheck(rowIndex, colIndex);
      const diagonalBT = diagonalBottomToTopCheck(rowIndex, colIndex);


      checkWinner(row, col, diagonalTB, diagonalBT, check)
    }


    const calculateWinner = (rowIndex, colIndex) => {
      
      let row = false, col = false, diagonal = false;
      const check = matrix[rowIndex][colIndex];

      if(winnerRatio>1 && winnerRatio<=rows && winnerRatio<=coloums){
        dynamicWinner(rowIndex, colIndex, check);
        return;
      }


      
      
      
      //row check, changing columns
      for(let i = 0; i<coloums; ++i){
        if(matrix[rowIndex][i] !== check)
          break;
        if(i==coloums-1){
          row = true;
        }
      }
      

      //column check, chaning row
      for(let i = 0; i<rows; ++i){
        if(matrix[i][colIndex] !== check)
          break;
        if(i==rows-1){
          col = true;
        }
      }

      //diagonal check from 0,0 to n,n
      if(rows===coloums){
        if(rowIndex===colIndex){
          for(let i=0, j=0; i<rows && j<coloums; ++i, ++j){
            if(matrix[i][j]!==check)
              break;
            if(i==rows-1 && j==coloums-1)
              diagonal = true;
          }
        }
  
        //diagonal check from n,0 to 0,n
        for(let i=rows-1, j=0;  i>=0 && j<coloums; --i, ++j){
  
          if(matrix[i][j]!==check)
            break;
          if(i==0 && j==rows-1)
            diagonal = true;
        }
      }
      


      // console.log(row, col, diagonal, check)
      
      //deciding winner
      checkWinner(row, col, diagonal, false, check)

    }


    //changing matrix size
    const handleChange = (e) =>{

        //console.log(history)
        let change = e.target.value;
        if(change < 3)
          change=3;

        

        if(e.target.name === "row"){
          // this.setState({
          //   rows : Number(change)
          // })

          setStateRow(Number(change));

        }

        else{
          // this.setState({
          //   coloums: Number(change)
          // })

          setStateColoum(Number(change))
        }
        // this.setState({
        //   matrix: Array.from(Array(rows), () => new Array(coloums).fill(null)),
        //   history: [Array.from(Array(rows), () => new Array(coloums).fill(null))],
        //   winner: "",
        //   play: true,
        //   isXNext: true
        // })
        

        // setMatrix(Array.from(Array(rows), () => new Array(coloums).fill(null)))
        // setHistory([Array.from(Array(rows), () => new Array(coloums).fill(null))])
        // matrixSetup()
        // setWinner("")
        // setPlay(true)
        // setIsXNext(true)
    }


    //Adding History to history with shallow copy of matrix
    const matrixSetup = () =>{

      const newMatrix = []
      matrix.map( (x) => {
          newMatrix.push(x.slice())
      })


      history.push(newMatrix)
    } 



    const checkWinnerRatio = (e) => {


      if((e<3 || e>rows || e>coloums) && play){
        console.log(e)
        alert("Invalid Winner Ratio !!. Winner Ratio must be less than rows and coloumns and also greater then equal to 3.")
        this.setState({
          play: false,
        })
      }
      else if(e>=3 && e<=rows && e<=coloums){
        this.setState({
          winnerRatio: e,
          play: true
        })
      }

    }
    //assigning square required value and deleting history

    const predictWinner = () => {
      let nullRow, nullColoum;

      for(let i=0; i<rows; ++i){
        for(let j=0; j<coloums; ++j){
          if(matrix[i][j]===null){
            nullRow = i;
            nullColoum = j;
          }

        }
      }

      console.log("Checking", nullRow, nullColoum)

      if(matMove%2!==0){
        matrix[nullRow][nullColoum]="X"
      }
      else
        matrix[nullRow][nullColoum]="O"

      calculateWinner(nullRow, nullColoum)
      matrix[nullRow][nullColoum]=""
    }

    const handleClick = (rowIndex, i) =>{

        if(matMove < history.length){
          while(matMove < history.length){
            history.pop()
          }

          matrixSetup()
        }

        if(play && !matrix[rowIndex][i]){
          if(isXNext){
            matrix[rowIndex][i]="X"
            this.setState({
              isXNext: false
            })
          }
            
          else{
            matrix[rowIndex][i]="O"
            this.setState({
              isXNext: true
            })
          }
  
          calculateWinner(rowIndex, i);

          matrixSetup()

          console.log("prev MatMove", matMove);
          this.setState({
            matMove: matMove + 1,
            stepNumber: history.length
          })
          
        }

        if(matMove+2 === (rows*coloums)){
          console.log("Predicting at", matMove)
          predictWinner();
        }

    }


    //Jumping to specific matrix
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
          <button
            className="btn"
            style={{
              backgroundColor: `${move%2===0 ? oColor : xColor}`
            }}
            onClick={() => jumpTo(step, move)}
          >{desc}</button>
        </li>
      );
    });

    const handleColorChange = e =>{
      
      let result;
      if(e.target.name==="x"){
        setStateXColor(e.target.value)
      }
      else{
        setStateOColor(e.target.value)
      }
    }

    return (
      <div className="game-container">
        
        <Header 
          winner={winner} 
          isXNext={isXNext} 
          oColor={oColor}
          xColor={xColor}
        />


        <div className="game">

          <div className="left-div panel">
            {/* Color input of x and o */}
            <div className="color" style={{color: "#fff", fontSize: "20px"}}>

              <InputComponents 
                    label={"X"} 
                    type={"color"}
                    value={xColor}
                    name={"x"}
                    onChange={handleColorChange}
              /> 

              <InputComponents 
                    label={"O"} 
                    type={"color"}
                    value={oColor}
                    name={"o"}
                    onChange={handleColorChange}
              /> 
            
            </div>


            {/* Display Who is next */}

            <WhoIsNext 
                isXNext={isXNext}
                xColor={xColor}
                oColor={oColor}
            />

            {/* Input for dropdown  */}
            <div>

              <InputComponents 
                  name={"row"}
                  label={"Rows : "}
                  type={"number"}
                  onChange={handleChange}
                  placeholder={"Enter row"}
                  className={"mat-inputs"}
              />

              <InputComponents 
                  name={"column"}
                  label={"Coloums : "}
                  type={"number"}
                  onChange={handleChange}
                  placeholder={"Enter columns "}
                  className={"mat-inputs"}
              />

            
              {/* Input for winner ratio */}
              <InputComponents 
                  label={"Winner Ratio : "}
                  type={"number"}
                  onChange = {
                    e => checkWinnerRatio(Number(e.target.value))
                  }
                  className={"mat-inputs"}

              />
              
            </div>

            <Reset />

          </div>

          
          <MiddleDivPanel 
            matrix={matrix}
            handleClick={handleClick}
            isXNext={isXNext} 
          />

          <RightDivPanel  moves ={moves}/>
          
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
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
      setStateRow: (x) => dispatch(onChangeRow(x)),
      setStateColoum: (x) => dispatch(onChangeColoum(x)),
      setStateXColor: (x) => dispatch(onChangeXColor(x)),
      setStateOColor: (x) => dispatch(onChangeOColor(x)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);


// export default Game;

// // function Game() {
// //     const [rows, setRows] = useState(3)
// //     const [coloums, setColoums] = useState(3) 
// //     const [matrix, setMatrix] = useState(Array.from(Array(rows), () => new Array(coloums).fill(null)))
// //     const [isXNext, setIsXNext] = useState(true)
// //     const [winner, setWinner] = useState("")
// //     const [play , setPlay] = useState(true);
// //     const [history, setHistory] = useState([])
// //     const [stepNumber, setStepNumber] = useState(0);
// //     const [matMove, setMatMove] = useState(0);
// //     const [winnerRatio, setWinnerRatio] = useState(0);
// //     const [xColor, setXColor] = useState('#00CCFF');
// //     const [oColor, setOColor] = useState('#00FF61');
  


// //     // useEffect(() => {
// //     //     setMatrix(Array.from(Array(rows), () => new Array(coloums).fill(null)))
// //     //     setHistory([Array.from(Array(rows), () => new Array(coloums).fill(null))])
// //     //     matrixSetup()
// //     //     setWinner("")
// //     //     setPlay(true)
// //     //     setIsXNext(true)
// //     // }, [rows, coloums, winnerRatio])

//     const horizontalCheck = (rowIndex, colIndex) =>{
      
//       for(let i=0; i<coloums; ++i){
//         let check = 0;

//         for(let j=i; j<coloums; ++j){
//           if(matrix[rowIndex][j]===matrix[rowIndex][colIndex])
//             check+=1;
//           else
//             break;
//         }

//         if(check>=winnerRatio)
//           return true;
//       }

//       return false;
//     } 

//     const verticalCheck = (rowIndex, colIndex) =>{
      
//       for(let i=0; i<rows; ++i){
//         let check = 0;

//         for(let j=i; j<rows; ++j){
//           if(matrix[j][colIndex] == matrix[rowIndex][colIndex])
//             check+=1;
//           else
//             break;
//         }

//         if(check>=winnerRatio)
//             return true;
//       }

//       return false;
//     }

//     const diagonalTopToBottomCheck = (rowIndex, colIndex) =>{
      

//       // console.log("In check diagonal")
//       let r, c;
//       if(colIndex >= rowIndex){
//         r=0;
//         c=colIndex - rowIndex;
//       }
//       else{
//         c=0;
//         r=rowIndex-colIndex;
//       }

//       console.log("In check diagonal", r, c)

//       for(let i=r, j=c; i<rows && j<coloums; ++i, ++j){
//         let check = 0;

        
//         for(let p=i, q=j; p<rows && q<coloums; ++p, ++q){

//           // console.log(`Checking ${p} ${q}`)
//           if(matrix[p][q] === matrix[rowIndex][colIndex])
//             check+=1;
//           else
//             break;
//         }

//         if(check >= winnerRatio)
//           return true;
//       }

//       return false;

//     }

//     const checkUp = (rowIndex, colIndex, check) => {

      
//       if(rowIndex<0 || colIndex>=coloums || matrix[rowIndex][colIndex]!==check )
//         return 0;
      
//       //console.log(matrix[rowIndex][colIndex], rowIndex, colIndex)
      
//       let x = checkUp(rowIndex-1, colIndex+1, check) + 1;

//       return x;
//     }

//     const checkDown = (rowIndex, colIndex, check) => {

//       if(rowIndex>=rows || colIndex<0 || matrix[rowIndex][colIndex]!==check )
//         return 0;
      
//       let x = checkDown(rowIndex+1, colIndex-1, check) + 1;

//       return x;
//     }

//     const diagonalBottomToTopCheck = (rowIndex, colIndex) => {

//       let up  = checkUp(rowIndex-1, colIndex+1, matrix[rowIndex][colIndex]);
//       let down = checkDown(rowIndex+1, colIndex-1, matrix[rowIndex][colIndex]);

//       // console.log("Up", up, "Down", down);
//       if(up+down+1 >= winnerRatio)
//         return true;

//       console.log("Up", up)
      
//       return false;
//     }

//     const checkWinner = (row, col, diagonalTB, diagonalBT, check) =>{


//       if( row===true || col===true || diagonalTB===true || diagonalBT===true){
//         setWinner(`Winner is ${check}`)
//         setPlay(false);
//       }

//     }

//     const dynamicWinner = (rowIndex, colIndex, check) => {

      
//       const row = horizontalCheck(rowIndex, colIndex);
//       const col = verticalCheck(rowIndex, colIndex);
//       const diagonalTB = diagonalTopToBottomCheck(rowIndex, colIndex);
//       const diagonalBT = diagonalBottomToTopCheck(rowIndex, colIndex);

//       console.log( rowIndex, colIndex)

//       checkWinner(row, col, diagonalTB, diagonalBT, check)
//     }


//     const calculateWinner = (rowIndex, colIndex) => {
      
//       let row = false, col = false, diagonal = false;
//       const check = matrix[rowIndex][colIndex];

//       if(winnerRatio>1 && winnerRatio<=rows && winnerRatio<=coloums){
//         dynamicWinner(rowIndex, colIndex, check);
//         return;
//       }


      
      
      
//       //row check, changing columns
//       for(let i = 0; i<coloums; ++i){
//         if(matrix[rowIndex][i] !== check)
//           break;
//         if(i==coloums-1){
//           row = true;
//         }
//       }
      

//       //column check, chaning row
//       for(let i = 0; i<rows; ++i){
//         if(matrix[i][colIndex] !== check)
//           break;
//         if(i==rows-1){
//           col = true;
//         }
//       }

//       //diagonal check from 0,0 to n,n
//       if(rowIndex===colIndex){
//         for(let i=0, j=0; i<rows && j<coloums; ++i, ++j){
//           if(matrix[i][j]!==check)
//             break;
//           if(i==rows-1 && j==coloums-1)
//             diagonal = true;
//         }
//       }

//       //diagonal check from n,0 to 0,n
//       for(let i=rows-1, j=0;  i>=0 && j<coloums; --i, ++j){

//         if(matrix[i][j]!==check)
//           break;
//         if(i==0 && j==rows-1)
//           diagonal = true;
//       }


//       // console.log(row, col, diagonal, check)
      
//       //deciding winner
//       checkWinner(row, col, diagonal, false, check)

//     }







//     //changing matrix size
//     const handleChange = (e) =>{

//         //console.log(history)

//         setMatrix(Array.from(Array(rows), () => new Array(coloums).fill(null)))
//         setHistory([Array.from(Array(rows), () => new Array(coloums).fill(null))])
//         matrixSetup()
//         setWinner("")
//         setPlay(true)
//         setIsXNext(true)

//         let change = e.target.value;
//         if(change < 3)
//           change=3;


//         if(e.target.name === "row")
//           setRows(Number(change))
//         else 
//           setColoums(Number(change))
//         setIsXNext(true)
//         setPlay(true)
//         setWinner("")
//         // console.log(history)
//     }


//     //Adding History to history with shallow copy of matrix
//     const matrixSetup = () =>{

//       const newMatrix = []
//       matrix.map( (x) => {
//           newMatrix.push(x.slice())
//       })


//       history.push(newMatrix)
//     } 



//     //assigning square required value and deleting history
//     const handleClick = (rowIndex, i) =>{

//         if(matMove < history.length){
//           while(matMove < history.length){
//             history.pop()
//           }

//           matrixSetup()
//         }

        

//         if(play && !matrix[rowIndex][i]){
//           if(isXNext){
//             matrix[rowIndex][i]="X"
//             setIsXNext(false)
//           }
            
//           else{
//             matrix[rowIndex][i]="O"
//             setIsXNext(true);
//           }
  
//           calculateWinner(rowIndex, i);

//           matrixSetup()

//           setMatMove(matMove+1)
//           setStepNumber(history.length)
          
//         }

//     }


//     //Jumping to specific matrix
//     const jumpTo = (step, move) =>{

//       setMatrix(step)
//       setMatMove(move)

//       if(move%2 !==0){
//         setIsXNext(false)
//       }
//       else{
//         setIsXNext(true)
//       }
//     }

//     //build list of moves with history data
//     const moves = history.map((step, move) => {
//       const desc = move ?
//         'Go to move #' + move :
//         'Go to game start';

//       return (
//         <li key={move}>
//           <button
//             className="btn"
//             style={{
//               backgroundColor: `${move%2===0 ? oColor : xColor}`
//             }}
//             onClick={() => jumpTo(step, move)}
//           >{desc}</button>
//         </li>
//       );
//     });

//     const handleColorChange = e =>{
      
//       if(e.target.name==="x")
//         setXColor(e.target.value);
//       else
//         setOColor(e.target.value)
//     }

    
// //   return (
// //       <div className="game-container">
        
// //         <Header 
// //           winner={winner} 
// //           isXNext={isXNext} 
// //           oColor={oColor}
// //           xColor={xColor}
// //         />


// //         <div className="game">

// //           <div className="left-div panel">
// //             {/* Color input of x and o */}
// //             <div className="color" style={{color: "#fff", fontSize: "20px"}}>

// //               <InputComponents 
// //                     label={"X"} 
// //                     type={"color"}
// //                     value={xColor}
// //                     name={"x"}
// //                     onChange={handleColorChange}
// //               /> 

// //               <InputComponents 
// //                     label={"O"} 
// //                     type={"color"}
// //                     value={oColor}
// //                     name={"o"}
// //                     onChange={handleColorChange}
// //               /> 
            
// //             </div>


// //             {/* Display Who is next */}

// //             <WhoIsNext 
// //                 isXNext={isXNext}
// //                 xColor={xColor}
// //                 oColor={oColor}
// //             />

// //             {/* Input for dropdown  */}
// //             <div>

// //               <InputComponents 
// //                   name={"row"}
// //                   label={"Rows : "}
//                   type={"number"}
//                   onChange={handleChange}
//                   placeholder={"Enter row"}
//                   className={"mat-inputs"}

//               />

//               <InputComponents 
//                   name={"column"}
//                   label={"Coloums : "}
//                   type={"number"}
//                   onChange={handleChange}
//                   placeholder={"Enter columns "}
//                   className={"mat-inputs"}
//               />

            
//               {/* Input for winner ratio */}
//               <InputComponents 
//                   label={"Winner Ratio : "}
//                   type={"number"}
//                   onChange = {e => setWinnerRatio(Number(e.target.value))}
//                   className={"mat-inputs"}

//               />
              
//             </div>

//             <Reset />

//           </div>

          
//           <MiddleDivPanel 
//             matrix={matrix}
//             handleClick={handleClick}
//             isXNext={isXNext} 
//             xColor={xColor} 
//             oColor={oColor}
//             row={rows}
//             coloums={coloums}
//           />

//           <RightDivPanel  moves ={moves}/>
          
//         </div>
//       </div>
     
//       );
// }

// export default Game;
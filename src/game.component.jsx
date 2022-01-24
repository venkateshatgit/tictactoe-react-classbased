import MiddleDivPanel from "./components/middle.component/middle-div-panel";
import Reset from "./components/reset.component/reset.component";
import WhoIsNext from "./components/who-is-next.component/who-is-next.component";
import { Component } from "react";
import { connect } from "react-redux";
import {onChangeColoum, onChangeRow, onChangeXColor, onChangeOColor, onChangeWinnerRatio, onChangeHistory, onChangeHistoryPushBack } from './redux/gameClassSlice'
import Navigate from "./components/nav-component/navigate.component";


class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matrix: Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null)),
      isXNext: true,
      winner: "",
      play: true,
      stepNumber: 0,
      matMove: 0,
    };

    this.props.setStateHistory(Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null)))
  }


  componentDidUpdate (prevProps, prevState){

    if((this.props.rows !== prevProps.rows) || 
        (this.props.coloums !== prevProps.coloums) || 
          (this.props.winnerRatio !== prevProps.winnerRatio)){

          this.setState({
            matrix: Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null)),
            winner: "",
            play: true,
            matMove: 0,
            isXNext: true
          })

          this.props.setStateHistory(Array.from(Array(this.props.rows), () => new Array(this.props.coloums).fill(null)))
    }

  }

  


  render() { 
    
    

    const {matrix, isXNext, winner,
    play,  stepNumber, matMove} = this.state

    const {rows, coloums, winnerRatio, history, setStateHistory, setStateHistoryPushBack, xColor, oColor, setStateColoum, setStateRow, setStateWinnerRatio, setStateXColor, setStateOColor} = this.props

    console.log(history, matrix)

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





    //Adding History to history with shallow copy of matrix
    const matrixSetup = () =>{

      const newMatrix = []
      matrix.map( (x) => {
          newMatrix.push(x.slice())
      })

      setStateHistoryPushBack(newMatrix)
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

        // if(matMove < history.length){
        //   while(matMove < history.length){
        //     history.pop()
        //   }

        //   matrixSetup()
        // }

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



    return (
      <div className="game-container">

        <Navigate />
        <div className="game">
          <MiddleDivPanel 
            matrix={matrix}
            handleClick={handleClick}
            isXNext={isXNext} 
          />
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
    winnerRatio: state.game_Class.winnerRatio,
    history: state.game_Class.history,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
      setStateRow: (x) => dispatch(onChangeRow(x)),
      setStateColoum: (x) => dispatch(onChangeColoum(x)),
      setStateWinnerRatio: (x) => dispatch(onChangeWinnerRatio(x)),
      setStateXColor: (x) => dispatch(onChangeXColor(x)),
      setStateOColor: (x) => dispatch(onChangeOColor(x)),
      setStateHistory:(x) => dispatch(onChangeHistory(x)),
      setStateHistoryPushBack:(x) => dispatch(onChangeHistoryPushBack(x)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartOn: 0.25
  }
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.flipCellsAround = this.flipCellsAround.bind(this)
  }
  createBoard() {
    const nrows = this.props.nrows
    const chanceLightStartOn = this.props.chanceLightStartOn
    function createRow() {
      let row = [];
      for (let i = 0; i < nrows; i++) {
        row[i] = Math.random() < chanceLightStartOn
      }
      return row
    }
    let board = [];
    for (let i = 0; i < this.props.ncols; i++) {
      board[i] = createRow()
    }
    return board
  }

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x)
    flipCell(y + 1, x)
    flipCell(y - 1, x)
    flipCell(y, x + 1)
    flipCell(y, x - 1)
    let victory = false;
    if (board.flat().indexOf(true) === -1) {
      victory = true
    }
    this.setState({
      board: board,
      hasWon: victory
    })
  }

  render() {
    const table = <table className="Board" >
      <tbody>
        {this.state.board.map((r, idx) => {
          return <tr key={idx}>{r.map((el, index) => {
            return <Cell isLit={el} flipCellsAroundMe={this.flipCellsAround} key={`${idx}-${index}`} coord={`${idx}-${index}`} />
          })}</tr>
        })}
      </tbody>
    </table>
    const BoardTitle = <div className="Board-title">
      <div className="neon-orange">Lights</div>
      <div className="neon-blue">Out</div>
    </div>
    const winMsg = <div className="Board-title">
      <div className="Winner">
        <span className="neon-orange">YOU</span>
        <span className="neon-blue">WIN!!!</span>
      </div>
    </div>
    return (
      <div>
        {this.state.hasWon ? '' : BoardTitle}
        {this.state.hasWon ? winMsg : table}
      </div>
    )
  }
}


export default Board;

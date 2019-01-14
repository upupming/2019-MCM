import React from 'react';
import './Game.css';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Cell extends React.Component {
  render() {
    const {x, y} = this.props;
    return (
      <div className="Cell" style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`
      }}/>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeEmptyBoard();
  }

  state = {
    cells: [],
    interval: 100,
    isRunning: false
  }

    /**
     * Calculate the number of neighbors at point (x, y)
     * @param {Array} board 
     * @param {int} x 
     * @param {int} y 
     */
    calculateNeighbors(board, x, y) {
      let neighbors = 0;
      const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
      for (let i = 0; i < dirs.length; i++) {
          const dir = dirs[i];
          let y1 = y + dir[0];
          let x1 = x + dir[1];

          if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
              neighbors++;
          }
      }

      return neighbors;
  }

  runIteration() {
    console.log('running iterarion')
    let newBoard = this.makeEmptyBoard();
    
    // 1. Any live cell with fewer than two live neighbors dies, as if caused by under population.
    // 2. Any live cell with two or three live neighbors lives on to the next generation.
    // 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
    // 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            // lives on to next generation
            newBoard[y][x] = true;
          } else {
            // under-population, overpopulation
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            // reproduction
            newBoard[y][x] = true;
          }
        }
      }
    }


    this.board = newBoard;
    this.setState({cells: this.makeCells()});
    
    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }

  runGame = () => {
    this.setState({isRunning: true})
    this.runIteration()
  }
  stopGame = () => {
    this.setState({isRunning: false})
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }
  handleIntervalChange(event) {
    this.setState({
      interval: event.target.value
    })
  }

  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  // Create cells from this.board
  // cells is an array of {x, y}
  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({x, y});
        }
      }
    }
    return cells;
  }

  handleClick = (event) => {
    const elementOffset = this.getElementOffset();
    const offsetX = event.clientX - elementOffset.x;
    const offsetY = event.clientY - elementOffset.y;

    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);

    if (x >= 0 && x < this.cols && y >=0 && y < this.rows) {
      this.board[y][x] = !this.board[y][x];
    }
    console.log(this.board);
    this.setState({cells: this.makeCells()});
  }

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop
    };
  }

  render() {
    const {cells, isRunning} = this.state;
    return (
      <div>
        <div className="Board"
          style={{ 
            width: WIDTH, 
            height: HEIGHT,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
          
          onClick={this.handleClick}
          ref = { n => {this.boardRef = n; } }>
          {
            cells.map(cell => (
              <Cell
                x = {cell.x} y={cell.y}
                key={`${cell.x}, ${cell.y}`}
              />
            ))
          }
        </div>


          <div className="controls">
            Update every 
            <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec

            {
              isRunning ? 
              <button className="button"
              onClick={this.stopGame}>Stop</button> :
              <button className="button"
              onClick={this.runGame}>Run</button>
            }
          </div>

      </div>
    );
  }
}

export default Game;
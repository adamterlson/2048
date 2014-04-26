// AI Idea: preserve the merge chains
// Each new tile, check if any of the chains were broken
// If it won't preserve it, build a new one
// Add to chain with a move direction when it was given
// When you cannot add to a chain, collapse existing chain by one.
// If a chain was broken, pick up the fragments
//    What action is taken on a broken chain?
// Maintain inital coord of each new link in the chain
//    How do you know when it's broken?  
// How do you play back the chain?
function Board(size) {
  this.size = size;
  this.grid = this._makeGrid(size); // Make one for left/right alignments and one for top/bottom
}

Board.prototype.iterate = function (f) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      f(this.grid[x][y], x, y);
    }
  }
};

Board.prototype.addRandomTile = function () {
  var randomCell = this._randomAvailableCell();
  if (randomCell) {
    var value = Math.random() < 0.9 ? 2 : 4;
    
    this.grid[randomCell.x][randomCell.y] = value;
  }
};

Board.prototype.get = function (x, y) {
  return this.grid[x][y];
};

Board.prototype.set = function (x, y, v) {
  return this.grid[x][y] = v;
};

Board.prototype._makeGrid = function (size) {
  var grid = [];
  for (var x = 0; x < size; x++) {
    grid[x] = [];
  }
  return grid;
};

Board.prototype._availbleCells = function () {
  var openCoords = [];
  this.iterate(function (v, x, y) {
    if (!v) {
      openCoords.push({ x: x, y: y });
    }
  });
  return openCoords;
}

Board.prototype._randomAvailableCell = function () {
  var cells = this._availbleCells();
  if (cells) {
    return cells[Math.floor(Math.random()*cells.length)];
  }
  return;
};

Board.prototype.toString = function () {
  var board = '-------\n', line;
  for (var x = 0; x < this.size; x++) {
    line = '';
    for (var y = 0; y < this.size; y++) {
      line += (this.grid[x][y] || 0) + ' ';
    }
    board += line + '\n';
  }
  return board + '-------\n';
};



// Play game

var i = 0;
while(++i <= 2) {

  var b = new Board(4);
  b.addRandomTile();
  console.log('' + b);

}




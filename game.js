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

Board.prototype.get = function (x, y) {
  return this.grid[x][y];
};

Board.prototype.set = function (x, y, v) {
  return this.grid[x][y].val = v;
};

Board.prototype.shift = function (direction) {
  switch (direction) {
    case 'up':
        this._fillGapsInSlice()
      break;

    case 'down':

      break;

    case 'left':

      break;

    case 'right':

      break;
  }
};

// How to use iterators?

Board.prototype.merger = function (slice, reverse) {
  function merge(curValue, nextValue) {
    if (curValue === nextValue) {
      slice[next] = curValue*2;
    }
  }

  sliceIterator(merge, reverse);
};

Board.prototype._fillGapsInBoard = function (horizontal, reverse) {
  var slice;
  for (var i = 0; i < this.size - 1; i++) {
    this._iterateSlice(i, this._fillGapsInSlice, horizontal, reverse);
  }
};

Board.prototype._fillGapsInSlice = function (cur, next) {
  if (!next || next.val) {
    next.value = curValue;
    slice[cur] = undefined;
  }
};

Board.prototype._makeGrid = function (size) {
  var grid = [], col;
  for (var x = 0; x < size; x++) {
    grid[x] = col = [];
    for (var y = 0; y < size; y++) {
      col[y] = { x: x, y: y, val: 0 };
    }
  }
  return grid;
};

Board.prototype._addRandomTile = function () {
  var randomCell = this._randomAvailableCell();
  console.log('r', randomCell)
  if (randomCell) {
    var value = Math.random() < 0.9 ? 2 : 4;
    
    this.grid[randomCell.x][randomCell.y].val = value;
  }
};

Board.prototype._randomAvailableCell = function () {
  var cells = this._availbleCells();
  if (cells) {
    return cells[Math.floor(Math.random()*cells.length)];
  }
  return;
};

Board.prototype._availbleCells = function () {
  var openCoords = [];
  this._iterate(function (cell) {
    if (!cell.val) {
      openCoords.push(cell);
    }
  });
  return openCoords;
};

Board.prototype._iterate = function (f, reverse) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      f(this.grid[x][y]);
    }
  }
};

Board.prototype._iterateSlice = function (sliceIndex, f, horizontal, reverse) {
  var slice;
  if (!horizontal) {
    slice = this.grid[sliceIndex];
  }
  else {
    slice = this._getHorizontalSlice(sliceIndex);
  }

  if(!reverse) {
    for(i=0;i < this.size; i++) {
      f(slice[i], slice[i+1]);
    }
  }
  else {
    i = this.size;
    while (i--) {
      f(slice[i], slice[i-1]);
    }
  }
};

Board.prototype._getHorizontalSlice = function (x) {
  var slice = [];
  for (var y = 0; y < this.size; y++) {
    slice[y] = this.grid[x][y];
  }
  return slice;
}

Board.prototype.toString = function () {
  var board = '-------\n', line;
  for (var x = 0; x < this.size; x++) {
    line = '';
    for (var y = 0; y < this.size; y++) {
      line += (this.grid[x][y].val || 0) + ' ';
    }
    board += line + '\n';
  }
  return board + '-------\n';
};



// Play game

var i = 0;
while(++i <= 2) {

  var b = new Board(4);
  b._addRandomTile();
  console.log('' + b);

  b._iterateSlice(0, function (coord) {
    console.log(coord);
  });

}



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
        this._shiftIntoGaps(false, true);
      break;

    case 'down':
        this._shiftIntoGaps(false, false);
      break;

    case 'left':
        this._shiftIntoGaps(true, true);
      break;

    case 'right':
        this._shiftIntoGaps(true, false);
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

Board.prototype._shiftIntoGaps = function (horizontal, reverse) {
  var slice;
  for (var i = 0; i < this.size; i++) {
    this._iterateSlice(i, this._shiftIntoGapsInSlice, horizontal, reverse);
  }
};

Board.prototype._shiftIntoGapsInSlice = function (coord, i, slice) {
  for (var j = 0; j < slice.length - 1; j++) {
    if (slice[j].val === slice[j+1].val) {
      coord.merge = true;
    }
    if (!slice[j].val) {
      this.board[slice[j].x][slice[j].y]
    }
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
  var slice, i;
  if (!horizontal) {
    slice = this.grid[sliceIndex];
  }
  else {
    slice = this._getHorizontalSlice(sliceIndex);
  }

  if(reverse) {
    slice = slice.reverse();
  }

  for(i=0;i < this.size; i++) {
    f(slice[i], i, slice);
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

// var i = 0;
// while(++i <= 2) {

  var b = new Board(4);
  b._addRandomTile();
  b._addRandomTile();
  b._addRandomTile();
  b._addRandomTile();
  b._addRandomTile();
  console.log('' + b);
  b.shift('left');
  b._iterateSlice(0, function (coord) {
    console.log(coord);
  }, true);

  ['left', 'right', 'up', 'down'].forEach(function (direction) {
    console.log('direction', direction);
    b.shift(direction);
    console.log('' + b);
  });

// }



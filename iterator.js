function makeIterator(array, reverse) {
  var curIndex = reverse ? array.length : 0;
  
  return {
    next: function(){
      var res;
      if (curIndex < array.length && curIndex >= 0) {
        res = {value: array[curIndex], done: false} 
      }
      else {
        res = {done: true};
      }
      reverse ? curIndex-- : curIndex++;
    }
  };
}

var slice = [1, 2, 3, 4];
var it = makeIterator(slice);
for(var i of it)
  console.log(i);
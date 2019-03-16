/* globals Tree */
'use strict';

var tree = new Tree(document.getElementById('tree'));
tree.json([{
  name: 'file 1'
}, {
  name: 'file 2'
}, {
  name: 'folder 1',
  type: Tree.FOLDER,
  children: [{
    name: 'file 3'
  }]
}]);

/* global Tree */
'use strict';

const tree = new Tree(document.getElementById('tree'));
// keep track of the original node objects
tree.on('created', (e, node) => {
  e.node = node;
});

tree.on('select', e => {
  console.log(tree.hierarchy(e).map(e => e.node));
});

tree.json([{
  name: 'file 1'
}, {
  name: 'folder 1',
  type: Tree.FOLDER,
  children: [{
    name: 'folder 2',
    type: Tree.FOLDER,
    children: [{
      name: 'file 2'
    }]
  }]
}]);

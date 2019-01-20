/* globals Tree */
'use strict';

var tree = new Tree(document.getElementById('tree'));
tree.on('open', e => console.log('open', e));
tree.on('select', e => console.log('select', e));
tree.on('action', e => console.log('action', e));
tree.on('fetch', e => console.log('fetch', e));

tree.on('fetch', folder => window.setTimeout(() => {
  tree.file({
    name: 'file 1'
  }, folder);
  tree.file({
    name: 'file 2'
  }, folder);

  folder.resolve();
  window.setTimeout(() => {
    tree.unloadFolder(folder);
  }, 3000);
}, 1000));

tree.json([{
  name: 'file 1'
}, {
  name: 'file 2'
}, {
  name: 'folder 1',
  open: true,
  type: Tree.FOLDER,
  selected: true,
  children: [{
    name: 'file 1'
  }, {
    name: 'file 2'
  }, {
    name: 'folder 1',
    type: Tree.FOLDER
  }]
}, {
  name: 'folder 2 (asynced)',
  type: Tree.FOLDER,
  async: true
}]);

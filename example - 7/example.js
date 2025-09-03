/* global Tree */
'use strict';

const tree = new Tree(document.getElementById('tree'), {
  navigate: true
});

tree.json([{
  name: 'file 1'
}, {
  name: 'file 2'
}, {
  name: 'file 3'
}, {
  name: 'file 4'
}]);

tree.on('select', node => node.classList.add('tapped'));
tree.parent.addEventListener('mousedown', e => {
  if (e.target === tree.active()) {
    e.target.classList.toggle('tapped');
  }
});

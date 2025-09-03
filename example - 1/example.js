/* global Tree */
'use strict';

const tree = new Tree(document.getElementById('tree'), {
  navigate: true // allow navigate with ArrowUp and ArrowDown
});
tree.on('open', e => console.log('event "open"', e));
tree.on('action', e => console.log('event "action"', e));
tree.on('fetch', e => console.log('event "fetch"', e));
tree.on('browse', e => console.log('event "browse"', e));
tree.on('select', e => {
  console.log('event "select"', tree.getPath(e, ' -> '));
});

tree.on('fetch', folder => window.setTimeout(() => {
  tree.file({
    name: 'file 2/1'
  }, folder);
  tree.file({
    name: 'file 2/2'
  }, folder);

  folder.resolve();
}, 1000));

const structure = [{
  name: 'file 1'
}, {
  name: 'file 2'
}, {
  name: 'folder 1',
  open: false,
  type: Tree.FOLDER,
  selected: true,
  children: [{
    name: 'file 1/1'
  }, {
    name: 'file 1/2'
  }, {
    name: 'folder 1/1',
    type: Tree.FOLDER,
    children: [{
      name: 'folder 1/1/1',
      type: Tree.FOLDER,
      children: [{
        name: 'folder 1/1/1/1',
        type: Tree.FOLDER,
        children: [{
          name: 'file 1/1/1/1/1'
        }, {
          name: 'file 1/1/1/1/2'
        }]
      }]
    }]
  }]
}, {
  name: 'folder 2 (asynced)',
  type: Tree.FOLDER,
  asynced: true
}];
// keep track of the original node objects
tree.on('created', (e, node) => {
  e.node = node;
});
tree.json(structure);

document.getElementById('browse-1').addEventListener('click', () => {
  tree.browse(a => {
    if (a.node.name === 'folder 2 (asynced)' || a.node.name === 'file 2/2') {
      return true;
    }
    return false;
  });
});

document.getElementById('browse-2').addEventListener('click', () => {
  tree.browse(a => {
    if (a.node.name.startsWith('folder 1') || a.node.name === 'file 1/1/1/1/2') {
      return true;
    }
    return false;
  });
});

document.getElementById('unload').addEventListener('click', () => {
  const d = tree.hierarchy().pop();
  tree.unloadFolder(d);
});

document.getElementById('previous').addEventListener('click', () => {
  tree.navigate('backward');
});
document.getElementById('next').addEventListener('click', () => {
  tree.navigate('forward');
});
document.getElementById('none').addEventListener('click', () => {
  tree.select(null);
});

document.getElementById('rename').addEventListener('click', () => {
  const node = tree.active();
  const name = prompt('Enter a new rename', node.textContent);

  if (name) {
    node.textContent = name;
  }
});

document.getElementById('delete').addEventListener('click', () => {
  const node = tree.active();
  tree.navigate('backward');
  tree.remove(node);
});

document.getElementById('add-folder-1').addEventListener('click', () => {
  tree.json([{
    name: 'new folder',
    open: true,
    type: Tree.FOLDER,
    selected: true,
    children: [{
      name: 'file 1/1'
    }]
  }]);
});
document.getElementById('add-folder-2').addEventListener('click', () => {
  tree.browse(a => {
    console.log(a.node, a.node.name === 'folder-1');
    if (a.node.name === 'folder 1') {
      setTimeout(() => tree.json([{
        name: 'new file',
        selected: true
      }], a));
      return true;
    }
    return false;
  });
});

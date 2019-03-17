/* globals Tree */
'use strict';

var tree = new Tree(document.getElementById('tree'), {
  navigate: true,
  dark: true
});
tree.json([{
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'file',
  selected: true
}, {
  name: 'folder',
  type: Tree.FOLDER,
  children: [{
    name: 'file'
  }, {
    name: 'folder',
    type: Tree.FOLDER,
    children: [{
      name: 'file'
    }, {
      name: 'folder',
      type: Tree.FOLDER,
      children: [{
        name: 'file'
      }, {
        name: 'folder',
        type: Tree.FOLDER,
        children: [{
          name: 'file'
        }, {
          name: 'folder',
          type: Tree.FOLDER,
          children: [{
            name: 'file'
          }, {
            name: 'folder',
            type: Tree.FOLDER,
            children: [{
              name: 'file'
            }, {
              name: 'folder',
              type: Tree.FOLDER,
              children: [{
                name: 'file'
              }, {
                name: 'folder',
                type: Tree.FOLDER,
                children: [{
                  name: 'file'
                }, {
                  name: 'folder',
                  type: Tree.FOLDER,
                  children: [{
                    name: 'file'
                  }, {
                    name: 'folder',
                    type: Tree.FOLDER,
                    children: [{
                      name: 'file'
                    }, {
                      name: 'folder',
                      type: Tree.FOLDER,
                      children: [{
                        name: 'file'
                      }, {
                        name: 'folder',
                        type: Tree.FOLDER,
                        children: [{
                          name: 'file'
                        }, {
                          name: 'folder',
                          type: Tree.FOLDER,
                          children: []
                        }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }]
  }]
}]);

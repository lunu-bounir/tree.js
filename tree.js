'use strict';

{
  class Events {
    constructor() {
      this.events = {};
    }
    on(name, callback) {
      this.events[name] = this.events[name] || [];
      this.events[name].push(callback);
    }
    emit(name, ...data) {
      (this.events[name] || []).forEach(c => c(...data));
    }
  }

  class SimpleTree extends Events {
    constructor(parent) {
      super();
      // do not toggle with click
      parent.addEventListener('click', e => {
        // e.clientX to prevent stopping Enter key
        // e.detail to prevent dbl-click
        // e.offsetX to allow plus and minus clicking
        if (e && e.clientX && e.detail === 1 && e.offsetX >= 0) {
          return e.preventDefault();
        }
        if (e.target.dataset.type === SimpleTree.FILE) {
          this.emit('action', e.target);
        }
      });
      parent.classList.add('simple-tree');
      this.parent = parent.appendChild(document.createElement('details'));
      this.parent.appendChild(document.createElement('summary'));
      this.parent.open = true;
    }
    append(element, parent, before, callback = () => {}) {
      if (before) {
        parent.insertBefore(element, before);
      }
      else {
        parent.appendChild(element);
      }
      callback();
      return element;
    }
    file(node, parent = this.parent, before) {
      const a = this.append(Object.assign(document.createElement('a'), {
        textContent: node.name,
        href: '#'
      }), parent, before);
      this.emit('created', a, node);
      a.dataset.type = SimpleTree.FILE;
      return a;
    }
    folder(node, parent = this.parent, before) {
      const details = document.createElement('details');
      const summary = Object.assign(document.createElement('summary'), {
        textContent: node.name
      });
      details.appendChild(summary);
      this.append(details, parent, before, () => {
        details.open = node.open;
        details.dataset.type = SimpleTree.FOLDER;
      });
      this.emit('created', summary, node);
      return details;
    }
  }
  SimpleTree.FILE = 'file';
  SimpleTree.FOLDER = 'folder';

  class AsyncTree extends SimpleTree {
    constructor(parent) {
      super(parent);
      // do not allow toggling when folder is loading
      parent.addEventListener('click', e => {
        const details = e.target.parentElement;
        if (details.open && details.dataset.loaded === 'false') {
          e.preventDefault();
        }
      });
      parent.classList.add('async-tree');
    }
    // add open event for folder creation
    folder(...args) {
      const details = super.folder(...args);
      details.addEventListener('toggle', () => {
        this.emit(details.dataset.loaded === 'false' && details.open ? 'fetch' : 'open', details);
      });
      details.resolve = () => {
        details.dataset.loaded = true;
        this.emit('open', details);
      };
      return details;
    }
    asyncFolder(node, parent, before) {
      const details = this.folder(node, parent, before);
      details.dataset.loaded = false;

      if (node.open) {
        details.querySelector('summary').dispatchEvent(new Event('click', {
          bubbles: true
        }));
      }

      return details;
    }
    unloadFolder(details) {
      details.open = false;
      const focused = details.querySelector(':focus');
      if (focused) {
        details.querySelector('summary').focus();
      }
      [...details.children].slice(1).forEach(e => e.remove());
      details.dataset.loaded = false;
    }
  }

  class SelectTree extends AsyncTree {
    constructor(parent) {
      super(parent);
      parent.addEventListener('focusin', ({target}) => {
        [...this.parent.querySelectorAll('.selected')].forEach(e => e.classList.remove('selected'));
        target.classList.add('selected');
        this.emit('select', target);
      });
      this.on('created', (element, node) => {
        if (node.selected) {
          this.select(element);
        }
      });
      parent.classList.add('select-tree');
    }
    select(element) {
      element.focus();
    }
  }

  class JSONTree extends SelectTree {
    json(array, parent) {
      array.forEach(item => {
        if (item.type === SimpleTree.FOLDER) {
          const folder = this[item.async ? 'asyncFolder' : 'folder'](item, parent);
          if (item.children) {
            this.json(item.children, folder);
          }
        }
        else {
          this.file(item, parent);
        }
      });
    }
  }

  window.Tree = JSONTree;
}

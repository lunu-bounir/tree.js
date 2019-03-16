'use strict';

{
  const privateCache = Symbol();
  const privateEmit = Symbol();
  const privateList = Symbol();

  class SimpleEmitter {
    constructor() {
      this[privateCache] = {};
      this.Break = Symbol();
    }
    on(name, callback, once = false) {
      this[privateCache][name] = this[privateList](name);
      const index = this[privateCache][name].push({
        callback,
        once,
        if: () => true
      }) - 1;
      return Object.assign({}, this, {
        if: c => this[privateCache][name][index].if = c
      });
    }
    once(name, callback) {
      return this.on(name, callback, true);
    }
    [privateEmit](memory = false, name, ...vals) {
      const m = new WeakMap();
      for (const obj of this[privateList](name)) {
        const bol = obj.if(...vals);
        let r;
        if (bol) {
          try {
            r = obj.callback(...vals);
            if (memory) {
              m.set(obj.callback, r);
            }
          }
          catch (e) {
            console.error(e);
          }
        }
        if (bol && obj.once) {
          const index = this[privateCache][name].indexOf(obj);
          this[privateCache][name].splice(index, 1);
        }
        if (r === this.Break) {
          break;
        }
      }
      return m;
    }
    emit(name, ...vals) {
      this[privateEmit](false, name, ...vals);
      return this;
    }
    collect(name, ...vals) {
      return this[privateEmit](true, name, ...vals);
    }
    off(name, callback) {
      this[privateList](name).forEach((obj, index) => {
        if (obj.callback === callback) {
          this[privateCache][name].splice(index, 1);
        }
      });
    }
    [privateList](name) {
      return this[privateCache][name] || [];
    }
    list(name) {
      return this[privateList](name).map(c => c.callback);
    }
  }
  class WatchEmitter extends SimpleEmitter {
    watch(obj, property, name = property + '-changed') {
      let val = obj[property];
      Object.defineProperty(obj, property, {
        get: () => {
          return val;
        },
        set: v => {
          if (v !== val) {
            val = v;
            this.emit(name, v);
          }
        }
      });
    }
  }
  window.Emitter = WatchEmitter;
}

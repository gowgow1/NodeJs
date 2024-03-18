export class EventEmitter {
    listeners = {};  
   
    addListener(eventName, fn) {
      return this.on(eventName, fn);
    }
      
    on(eventName, fn) {
      if(!this.listeners[eventName]) this.listeners[eventName] = []
      this.listeners[eventName].push(fn)
      return this
    }
   
    removeListener(eventName, fn) {
      return this.off(eventName, fn)
    }
      
    off(eventName, fn) {
      if (!this.listeners[eventName]) return;
      const indx = this.listeners[eventName].indexOf(fn);
      if (indx !== -1) this.listeners[eventName].splice(indx, 1);
      return this;
    }
   
    once(eventName, fn) {
       const onceFn = (...args) => {
        fn(...args);
        this.off(eventName, onceFn);
      };
      this.on(eventName, onceFn);
      return this;
    }
   
    emit(eventName, ...args) {
      if(!this.listeners[eventName]) return;
      this.listeners[eventName].forEach(fn => fn(args));
      return this
    }
   
    listenerCount(eventName) {
      if(!this.listeners[eventName]) return 0;
      return this.listeners[eventName].length
    }
   
    rawListeners(eventName) {
      return this.listeners[eventName] || [];
    }
   }
  
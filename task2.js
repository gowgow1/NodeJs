import { EventEmitter } from "./task1.js";

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        this.emit('start')
        const startTime = Date.now()
  
        asyncFunc(...args, (err, data) => {
          console.log('data in asyncFunc', data)
          if(err) throw new Error('Error when execute', err)
          this.emit('data', data)
  
          const endTime = Date.now()
          this.emit('end', endTime - startTime)
        })
    }
  }
  
const fetchFromUrl = (url, cb) => {
    fetch(url).then(response => {
        if (!response.ok) throw new Error(`err Status: ${response.status}`);
        return response.json();
    })
    .then(data => cb(null, data))
    .catch( err => cb(err, null))
}

const withTime = new WithTime();

withTime.on('start', () => console.log('About to execute'));
withTime.on('end', (timestamp) => console.log('Done with execute', timestamp, 'ms'));
withTime.on('data', (data) => console.log('data received:', data))

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));

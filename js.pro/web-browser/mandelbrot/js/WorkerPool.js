/**
 * This class represents a pool of workers, all running the same code. The
 * worker code you specify must respond to each message it receives by
 * performing some kind of computation and then posting a single message with
 * the result of that computation.
 *
 * Given a WorkerPool and message that represents work to be performed, simply
 * call addWork(), with the message as an argument. If there is a Worker
 * object that is currently idle, the message will be posted to that worker
 * immediately. If there are no idle Worker objects, the message will be
 * queued and will be posted to a Worker when one becomes available.
 *
 * addWork() returns a Promise, which will resolve with the message recieved
 * from the work, or will reject if the worker throws an unhandled error.
 */
export default class WorkerPool
{
   constructor(numWorkers, workerSource)
   {
      this.idleWorkers = [];       // Workers that are not currently working
      this.workQueue = [];         // Work not currently being processed
      this.workerMap = new Map();  // Map workers to resolve and reject funcs

      // Create the specified number of workers, add message and error
      // handlers and save them in the idleWorkers array.
      for (let i = 0; i < numWorkers; i++)
      {
         let worker = new Worker(workerSource);
         worker.onmessage = message =>
         {
            this._workerDone(worker, null, message.data);
         };
         worker.onerror = error =>
         {
            this._workerDone(worker, error, null);
         };
         this.idleWorkers[i] = worker;
      }
   }

   // This internal method is called when a worker finishes working, either
   // by sending a message or by throwing an error.
   _workerDone(worker, error, response)
   {
      // Look up the resolve() and reject() functions for this worker
      // and then remove the worker's entry from the map.
      let [resolver, rejector] = this.workerMap.get(worker);
      this.workerMap.delete(worker);

      // If there is no queued work, put this worker back in
      // the list of idle workers. Otherwise, take work from the queue
      // and send it to this worker.
      if (this.workQueue.length === 0)
      {
         this.idleWorkers.push(worker);
      }
      else
      {
         let [work, resolver, rejector] = this.workQueue.shift();
         this.workerMap.set(worker, [resolver, rejector]);
         worker.postMessage(work);
      }

      // Finally, resolve or reject the promise associated with the worker.
      error === null ? resolver(response) : rejector(error);
   }

   // This method adds work to the worker pool and returns a Promise that
   // will resolve with a worker's response when the work is done. The work
   // is a value to be passed to a worker with postMessage(). If there is an
   // idle worker, the work message will be sent immediately. Otherwise, it
   // will be queued until a worker is available.
   addWork(work)
   {
      return new Promise((resolve, reject) =>
                         {
                            if (this.idleWorkers.length > 0)
                            {
                               let worker = this.idleWorkers.pop();
                               this.workerMap.set(worker, [resolve, reject]);
                               worker.postMessage(work);
                            }
                            else
                            {
                               this.workQueue.push([work, resolve, reject]);
                            }
                         });
   }
}

# Promises.

## What is a Promise?
A Promise is an object that's representing a potential future value, we just don't know what it will be _yet_.
When you have a Promise in hands, it promises you to get you a value back or an error.

## Promises vs callbacks.
Two things are important to note why Promises are a more suitable solutions for asynchronous programming than callbacks.

The first thing is the inversion of inversion of control. Or simply put: restoring control to the calling code.
When you use callbacks, you invert the control of your asynchronous behaviour to some other external logic (could be your code but it could also be a third party library).
The issue with inversion of control is that since you're not in control anymore, you let someone else decide _when_ the asynchronous task will be over.
You also trust that third party code to call your callback in the right time and in the exact amount of time you're expecting.
Promises give you the control back because _you_ decide when and how the "callback" is called.

```javascript
// callback based code
function request(callback) {
  fetch(..., (error, result) => (
    callback(...) // What if this callback was called too soon? Or never called, or called twice...
  ));
}

request((error, result) => {
  // ...
});

// Promise based code.
function request() {
  return new Promise(...);
}

const someRequest = request().then(...);
```

The second thing you probably have heard of is "callback hell", when you need to subsequently call more than one asynchronous task. Often, you need to wait until one is done to start another one, which leads to deep nesting. It also makes it hard to run concurrent async code and wait until everything is done to keep going on something else.

```javascript
asyncTaskOne((error, result) => {
  asyncTaskTwo((error, result) => {
    asyncTaskThree((error, result) => {
      // ....
    });
  });
});
```

This gets hard to read and to reason about extremely quickly. Nesting often means unnecessary complexity in the code.
Instead, a promise based code would look like

```javascript
asyncTaskOne()
  .then(asyncTaskTwo)
  .then(asyncTaskThree);

// Or even better, if you the tasks are independent
Promise.all([
  asyncTaskOne,
  asyncTaskTwo,
  asyncTaskThree
]).then([resultOne, resultTwo, resultThree] => ...);
```

## How do Promises work?
Promises are immutable objects that can have three states:
- `Pending`
- `Fulfilled`
- `Rejected`

It always starts with the `pending` state (that's what you get right away after creating the promise) and will move to `fulfilled` or `rejected`. Once the state changed, it cannot change anymore due to their immutable behaviour.

- `Fulfilled` means the Promise has resolved with a value that is not an error.
- `Rejected` means the Promise has resolved with an error (whatever you were doing didn't work).

Based on their next state, a Promise will call one of its methods.
A Promise is what is called a "thenable", which means it has a `then` method on it. That method is being called
whenever the Promise gets resolved (error or not).

`then` takes two arguments (two functions called `onFulfill` and `onReject`), the second one being optional.
The first function will be called if the Promise gets fulfilled (resolved but didn't error out).
The second argument will be called (if provided) if the Promise gets rejected (resolved with an error).

Let's take a look at a _potential_ `then` signature:
```javascript
function then(onFulfill, onReject) { }
```

```javascript
Promise.resolve('hello world')
  .then(console.log); // 'hello world'
```

```javascript
Promise.reject('bad')
  .then(
    (result) => {
        // Never gets here...
    },
    (error) => {
        console.error(error); // 'bad'
    }
  )
```

Because it's optional, the second argument can be omitted. Although, if you don't provide an error handler,
javascript will swallow the error and never tell you what happened. In the future, rejected Promise will exit the node process with a non 0 code. Which is bad.

Last but not least, there is another way to deal with errors in Promises.
Promises have a `catch` method, which can act as an error-handler as well.

```javascript
Promise.reject('bad')
  .catch(error => console.error('Catching the error...'));
```

There are some differences between using a second error handler in the `then` or using `catch`.
Consider the following code:

```javascript
Promise.resolve(true)
  .then(
    result => Promise.reject(false),
    error => console.error('Couldn\'t catch the rejected promise') // This is never be called because the Promise already fulfilled.
  )
  .catch(error => console.error('Caught the rejected Promise')) // This is called because `then` returned a rejected promised
  .then(() => Promise.reject(false))
  .then(
    result => console.log('This is never called'),
    error => console.error('Caught the rejected Promise')
  )
  .catch(error => console.error('This is never called')) // Never called because we already handled the error before.
```

## All about `then` and how to use it efficiently.
As we said earlier, Promises are "thenables", so they have a `then` method on them.
This is a very powerful function because anything you return from a `then` function is converted to a Promise (If not already one) that will resolve in whatever you're returning.

If you return something that is not a Promise, `then` will transform it to a Promise that will **resolve** with whatever your returned earlier.

```javascript
Promise.resolve()
  .then(() => 'hello')
  .then(console.log) // 'hello'

```

I've highlighted the word _resolve_ above. It is very important to understand that the Promise created by `then` will resolve (can be fulfilled or rejected) the value.
If you're trying to resolve a rejected Promise (so if you return a rejected promise), the returned Promise from `then` will also be rejected.

```javascript
Promise.resolve()
  .then(() => Promise.reject())
  .then(() => ...) // Never called!
  .catch(error => console.error(error)); // Called because we've returned a rejected Promise.
```

Another interesting fact about `then` is that if you return a Promise, the main Promise will wait and only resolve once the returned Promise (from the `then`) is resolved.

```javascript
Promise.resolve()
  .then(() => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
  })
  .then(() => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
  })
  .then(() => {
    // Will be called only after 4 seconds
  });

// Another example
function getPromise() {
  return new Promise(resolve => setTimeout(resolve, 2000))
    .then(() => new Promise(resolve => setTimeout(resolve, 2000)));
}

getPromise()
  .then(() => {
    // Will only be called after 4 seconds.
});
```
## Ressources

- [MDN Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

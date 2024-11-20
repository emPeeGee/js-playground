// // Please order the console.log outputs in the correct order (there are nested setTimeouts, promises etc.). Need good understanding of the event loop and call stack.
async function run() {
  console.log("Banana");

  setTimeout(() => {
    console.log("Pear");
  }, 3000);

  setTimeout(() => {
    console.log("Apple");
  });

  await new Promise((resolve) => {
    console.log("Grape");
  
    setTimeout(() => {
      console.log("Orange")
    }, 2000);
  
    resolve();
  });
  
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });


  console.log("Kiwi");
}

// run()
// Banana,Grape, Apple, Kiwi, Orange, Pear



async function run1() {
  console.log("Start");

  setTimeout(() => {
    console.log("Timeout 1");
  }, 1000);

  setTimeout(() => {
    console.log("Timeout 2");
  }, 0);

  await new Promise((resolve) => {
    console.log("Promise 1");
    resolve();
  });

  console.log("After Promise 1");

  await new Promise((resolve) => {
    console.log("Promise 2");
    resolve();
  });

  console.log("After Promise 2");
}

// run1();
// Start, Promise 1, After Promise 1, Promise 2, After Promise 2, Timeout 2, Timeout 1


async function run2() {
  console.log("Step 1");

  setTimeout(() => {
    console.log("Step 5");
  }, 2000);

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 3");
      resolve();
    }, 1000);
  });

  console.log("Step 4");

  await new Promise((resolve) => {
    console.log("Step 2");
    resolve();
  });

  setTimeout(() => {
    console.log("Step 6");
  }, 500);
}

// run2();
// Step 1, Step 3, Step 4, Step 2, Step 6, Step 5


async function run3() {
  console.log("Begin");

  setTimeout(() => {
    console.log("Step A");
  }, 3000);

  // new Promise((resolve) => {
  //   resolve();
  // }).then(() => {
  //   console.log('then')
  // })
  // console.log('after then')

  await new Promise((resolve) => {
    console.log("Promise 1 Start");
    setTimeout(() => {
      console.log("Promise 1 End");
      resolve();
    }, 2000);
  });

  console.log("Middle");

  await new Promise((resolve) => {
    console.log("Promise 2 Start");
    setTimeout(() => {
      console.log("Promise 2 End");
      resolve();
    }, 1000);
  });

  console.log("End");
}

// run3();
// Begin, Promise 1 start, promise 1 end, middle, Promise 2 start, Step A, Promise 2 end,end 


async function run3Modified() {
  console.log("Begin");

  setTimeout(() => {
    console.log("Step A");
  }, 3000);

  new Promise((resolve) => {
    console.log("Promise 1 Start");
    setTimeout(() => {
      console.log("Promise 1 End");
      resolve();
    }, 2000);
  });

  console.log("Middle");

  new Promise((resolve) => {
    console.log("Promise 2 Start");
    setTimeout(() => {
      console.log("Promise 2 End");
      resolve();
    }, 1000);
  });

  console.log("End");
}

// run3Modified();
// begin, promise1start, promise 1 end, middle, promise 2 start, stepA, end

async function run4() {
  console.log("Task 1");

  setTimeout(() => {
    console.log("Task 4");
  }, 500);

  await new Promise((resolve) => {
    console.log("Task 2");
    resolve();
  });

  console.log("Task 3");

  setTimeout(() => {
    console.log("Task 6");
  }, 100);

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 5");
      resolve();
    }, 300);
  });
}

// run4();
// Task 1, Task 2, Task 3, Task 6, Task 5, Task 4


async function run5() {
  console.log("Phase 1");

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Phase 3");
      resolve();
    }, 1000);
  });

  console.log("Phase 4");

  setTimeout(() => {
    console.log("Phase 6");
  }, 500);

  await new Promise((resolve) => {
    console.log("Phase 2");
    resolve();
  });

  console.log("Phase 5");
}

// run5();
// Thase 1, Phase 3, Phase 4, Phase 2, Phase 5, Phase 6


async function run6() {
  console.log("Init");

  setTimeout(() => {
    console.log("Async 1");
  }, 1500);

  await new Promise((resolve) => {
    console.log("Step 1");
    resolve();
  });

  console.log("Step 2");

  setTimeout(() => {
    console.log("Async 2");
  }, 500);

  await new Promise((resolve) => {
    console.log("Step 3");
    resolve();
  });

  console.log("Step 4");
}

run6();
// Init, step 1, step 2, step 3, step 4, async 2, async 1


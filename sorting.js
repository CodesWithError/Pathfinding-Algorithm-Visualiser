// script.js
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
  // Define a flag to control the sorting loop
let stopSorting = false;

// Event listener for the "Reset" button
document.getElementById("resetButton").addEventListener("click", () => {
  const container = document.getElementById("container");
  container.innerHTML = ""; // Clear the container

  // Initialize the bars with random heights (adjust as needed)
  for (let i = 0; i < 20; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${Math.floor(Math.random() * 250) + 20}px`;
    container.appendChild(bar);
  }
});

// Event listener for the "Stop" button
document.getElementById("stopButton").addEventListener("click", () => {
  // Set the flag to stop the sorting process
  stopSorting = true;
});



  async function bubbleSort(arr) {
    const container = document.getElementById("container");
  
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopSorting) {
          // If the stopSorting flag is true, stop the sorting process
          return;
        }
        // Highlight the two bars being compared in a different color
        container.children[j].classList.add("traversing");
        container.children[j + 1].classList.add("traversing");
  
        // Wait for a short duration to visualize the traversal
        await sleep(100);
  
        if (arr[j] > arr[j + 1]) {
          // Swap the elements in the array
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
  
          // Update the heights of the bars to reflect the changes
          container.children[j].style.height = `${arr[j]}px`;
          container.children[j + 1].style.height = `${arr[j + 1]}px`;
        }
  
        // Remove the traversal color
        container.children[j].classList.remove("traversing");
        container.children[j + 1].classList.remove("traversing");
      }
    }
  }
  
  document.getElementById("bubblestart").addEventListener("click", () => {
    const container = document.getElementById("container");
    const bars = container.children;
  
    // Convert the heights of bars to numbers
    const arr = Array.from(bars).map(bar => parseInt(bar.style.height));
    
    // Disable the button during sorting
    document.getElementById("bubblestart").disabled = true;
  
    // Call the bubble sort function
    bubbleSort(arr).then(() => {
      // Enable the button after sorting is done
      document.getElementById("bubblestart").disabled = false;
    });
  });
  
  // Initialize the bars with random heights
  const container = document.getElementById("container");
  for (let i = 0; i < 20; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${Math.floor(Math.random() * 250) + 20}px`;
    container.appendChild(bar);
  }
  


// quick sort
  // Swap two elements in the array and update their heights
async function swap(arr, i, j) {
  const container = document.getElementById("container");

  // Highlight the bars being swapped
  container.children[i].classList.add("traversing");
  container.children[j].classList.add("traversing");

  // Wait for a short duration to visualize the traversal
  await sleep(100);

  // Swap the elements in the array
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  // Update the heights of the bars to reflect the changes
  container.children[i].style.height = `${arr[i]}px`;
  container.children[j].style.height = `${arr[j]}px`;

  // Remove the traversal color
  container.children[i].classList.remove("traversing");
  container.children[j].classList.remove("traversing");
}

// Partition the array and choose the pivot element
async function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      await swap(arr, i, j);
    }
  }

  await swap(arr, i + 1, high);
  return i + 1;
}

// Quick Sort algorithm with visualization
async function quickSort(arr, low, high) {
  if (stopSorting) {
    // If the stopSorting flag is true, stop the sorting process
    return;
  }
  if (low < high) {
    const pivotIndex = await partition(arr, low, high);

    // Recursively sort the sub-arrays
    await quickSort(arr, low, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, high);
   
  }
}

// Start the Quick Sort visualization
document.getElementById("quickstart").addEventListener("click", async () => {
  const container = document.getElementById("container");
  const bars = container.children;

  // Convert the heights of bars to numbers
  const arr = Array.from(bars).map(bar => parseInt(bar.style.height));

  // Disable the "Start Sorting" button during sorting
  document.getElementById("quickstart").disabled = true;

  // Call the Quick Sort function with appropriate indices
  await quickSort(arr, 0, arr.length - 1);

  // Enable the "Start Sorting" button after sorting is done
  document.getElementById("quickstart").disabled = false;
});


// merge sort
// Define the merge function to merge two sorted subarrays
async function merge(arr, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Create temporary arrays
  const leftArr = new Array(n1);
  const rightArr = new Array(n2);

  for (let i = 0; i < n1; i++) {
    leftArr[i] = arr[left + i];
  }
  for (let i = 0; i < n2; i++) {
    rightArr[i] = arr[mid + 1 + i];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;

    // Visualize the sorting process
    const container = document.getElementById("container");
    container.children[k].classList.add("traversing");
    await sleep(100);
    container.children[k].classList.remove("traversing");
  }

  while (i < n1) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}

// Define the mergeSort function
async function mergeSort(arr, left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);

    if (stopSorting) {
      return; // Stop the sorting process if the flag is true
    }

    await merge(arr, left, mid, right);
  }
}

// Event listener for the "Merge Sort" button
document.getElementById("mergestart").addEventListener("click", async () => {
  const container = document.getElementById("container");
  const bars = container.children;

  // Convert the heights of bars to numbers
  const arr = Array.from(bars).map(bar => parseInt(bar.style.height));

  // Disable the "Merge Sort" button during sorting
  document.getElementById("mergestart").disabled = true;

  // Call the Merge Sort function with appropriate indices
  await mergeSort(arr, 0, arr.length - 1);

  // Enable the "Merge Sort" button after sorting is done
  document.getElementById("mergestart").disabled = false;
});


//insertion
// Define the insertionSort function
async function insertionSort(arr) {
  const container = document.getElementById("container");
  
  for (let i = 1; i < arr.length; i++) {
    if (stopSorting) {
      return; // Stop the sorting process if the flag is true
    }

    const currentHeight = arr[i];
    let j = i - 1;

    // Highlight the bar being moved in a different color
    container.children[i].classList.add("traversing");

    // Wait for a short duration to visualize the traversal
    await sleep(100);

    while (j >= 0 && arr[j] > currentHeight) {
      arr[j + 1] = arr[j];

      // Update the height of the bar to reflect the changes
      container.children[j + 1].style.height = `${arr[j + 1]}px`;

      j--;
    }

    arr[j + 1] = currentHeight;

    // Update the height of the bar to reflect the changes
    container.children[j + 1].style.height = `${currentHeight}px`;

    // Remove the traversal color
    container.children[i].classList.remove("traversing");
  }
}

// Event listener for the "Insertion Sort" button
document.getElementById("insertionstart").addEventListener("click", async () => {
  const container = document.getElementById("container");
  const bars = container.children;

  // Convert the heights of bars to numbers
  const arr = Array.from(bars).map(bar => parseInt(bar.style.height));

  // Disable the "Insertion Sort" button during sorting
  document.getElementById("insertionstart").disabled = true;

  // Call the Insertion Sort function
  await insertionSort(arr);

  // Enable the "Insertion Sort" button after sorting is done
  document.getElementById("insertionstart").disabled = false;
});



// Selection Sort algorithm with visualization
async function selectionSort(arr) {
  const container = document.getElementById("container");

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    // Highlight the current bar being compared in a different color
    container.children[i].classList.add("traversing");

    for (let j = i + 1; j < arr.length; j++) {
      // Highlight the bar being compared with the current minimum
      container.children[j].classList.add("traversing");

      // Wait for a short duration to visualize the traversal
      await sleep(100);

      if (arr[j] < arr[minIndex]) {
        // Remove the traversal color from the previous minimum
        container.children[minIndex].classList.remove("traversing");

        minIndex = j;

        // Highlight the new minimum
        container.children[minIndex].classList.add("traversing");
      } else {
        // Remove the traversal color from the current bar
        container.children[j].classList.remove("traversing");
      }
    }

    // Swap the minimum element with the current element in the array
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;

    // Update the heights of the bars to reflect the changes
    container.children[i].style.height = `${arr[i]}px`;
    container.children[minIndex].style.height = `${arr[minIndex]}px`;

    // Remove the traversal color from the swapped bars
    container.children[i].classList.remove("traversing");
    container.children[minIndex].classList.remove("traversing");
  }
}

// Event listener for the "Selection Sort" button
document.getElementById("selectionSortButton").addEventListener("click", async () => {
  const container = document.getElementById("container");
  const bars = container.children;

  // Convert the heights of bars to numbers
  const arr = Array.from(bars).map(bar => parseInt(bar.style.height));

  // Disable the "Selection Sort" button during sorting
  document.getElementById("selectionSortButton").disabled = true;

  // Call the Selection Sort function
  await selectionSort(arr);

  // Enable the "Selection Sort" button after sorting is done
  document.getElementById("selectionSortButton").disabled = false;
});



//heap sort
// Heap Sort algorithm with visualization
async function heapSort(arr) {
  const container = document.getElementById("container");
  const n = arr.length;

  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (stopSorting) {
      return;
    }
    await heapify(arr, n, i);
  }


  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move the current root to the end of the array
    await swap(arr, 0, i);

    // Reduce the heap size and heapify the root
    await heapify(arr, i, 0);
  }
}

// Heapify a subtree rooted with node i, where n is the size of the heap
async function heapify(arr, n, i) {
  const container = document.getElementById("container");
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Highlight the current root being considered in a different color
  container.children[i].classList.add("traversing");

  // Wait for a short duration to visualize the traversal
  await sleep(100);

  // Compare the root with its left child and right child (if they exist)
  if (left < n && arr[left] > arr[largest]) {
    // Remove the traversal color from the previous largest
    container.children[largest].classList.remove("traversing");

    largest = left;

    // Highlight the new largest
    container.children[largest].classList.add("traversing");
  }

  if (right < n && arr[right] > arr[largest]) {
    // Remove the traversal color from the previous largest
    container.children[largest].classList.remove("traversing");

    largest = right;

    // Highlight the new largest
    container.children[largest].classList.add("traversing");
  }

  // If the largest element is not the root, swap them
  if (largest !== i) {
    await swap(arr, i, largest);

    // Recursively heapify the affected sub-tree
    await heapify(arr, n, largest);
  }

  // Remove the traversal color from the root
  container.children[i].classList.remove("traversing");
}

// Event listener for the "Heap Sort" button
document.getElementById("Heapstart").addEventListener("click", async () => {
  const container = document.getElementById("container");
  const bars = container.children;

  

  // Disable the "Heap Sort" button during sorting
  document.getElementById("Heapstart").disabled = true;

  // Call the Heap Sort function
  await heapSort(arr);

  // Enable the "Heap Sort" button after sorting is done
  document.getElementById("Heapstart").disabled = false;
});

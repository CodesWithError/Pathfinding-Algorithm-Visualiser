const rows = 15; // Adjust the number of rows to adjust the height of the grid
const cols = 20;

const gridContainer = document.getElementById('grid-container');
const gridItems = [];

let startNode = null;
let endNode = null;

// Create the grid dynamically
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);
    gridItems.push(gridItem);

    gridItem.addEventListener('click', () => {
      if (!startNode) {
        startNode = gridItem;
        startNode.classList.add('start');
      } else if (!endNode && gridItem !== startNode) {
        endNode = gridItem;
        endNode.classList.add('end');
      } else if (gridItem !== startNode && gridItem !== endNode) {
        gridItem.classList.toggle('wall');
      }
    });
  }
}

// Function to clear the grid
function clearGrid() {
  gridItems.forEach(gridItem => {
    gridItem.classList.remove('start', 'end', 'wall', 'path', 'traversed');
  });
  startNode = null;
  endNode = null;
}


// Function to get neighbors of a node
function getNeighbors(node) {
  // ... Implement logic to get neighboring grid items ...
  const neighbors = [];
  const index = gridItems.indexOf(node);
  const row = Math.floor(index / cols);
  const col = index % cols;

  // Define all possible neighbor offsets
  const offsets = [
    { row: -1, col: 0 }, // Top
    { row: 1, col: 0 }, // Bottom
    { row: 0, col: -1 }, // Left
    { row: 0, col: 1 }, // Right
  ];
  // Check each offset to find valid neighbors
  for (const offset of offsets) {
    const newRow = row + offset.row;
    const newCol = col + offset.col;

    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      const neighborIndex = newRow * cols + newCol;
      const neighbor = gridItems[neighborIndex];
      if (!neighbor.classList.contains('wall')) {
        neighbors.push(neighbor);
      }
    }
  }
  return neighbors;
}

// Function to calculate the distance between two nodes
function getDistance(nodeA, nodeB) {
  // ... Implement logic to calculate distance ...

  const indexA = gridItems.indexOf(nodeA);
  const indexB = gridItems.indexOf(nodeB);
  const rowA = Math.floor(indexA / cols);
  const colA = indexA % cols;
  const rowB = Math.floor(indexB / cols);
  const colB = indexB % cols;
  // Euclidean distance heuristic (can be replaced with other distance metrics)
  return Math.sqrt((rowA - rowB) ** 2 + (colA - colB) ** 2);
}









// Function to visualize Dijkstra's Algorithm
async function visualizeDijkstra() {
  if (!startNode || !endNode) {
    alert('Please set the start and end points.');
    return;
  }

  startNode.classList.add('start');
  endNode.classList.add('end');

  // ... Implement Dijkstra's Algorithm ...

  const unvisitedNodes = [...gridItems];
  const distances = new Map();
  const previousNodes = new Map();

  unvisitedNodes.forEach(node => distances.set(node, Infinity));
  distances.set(startNode, 0);

  while (unvisitedNodes.length > 0) {
    // Sort unvisited nodes based on distances
    unvisitedNodes.sort((a, b) => distances.get(a) - distances.get(b));

    // Get node with the smallest distance (first in the sorted list)
    const closestNode = unvisitedNodes.shift();

    // If the closest node is a wall or has an infinite distance, we are trapped, so break out of the loop
    if (distances.get(closestNode) === Infinity || closestNode.classList.contains('wall')) {
      break;
    }

    // Get neighboring nodes
    const neighbors = getNeighbors(closestNode);

    for (const neighbor of neighbors) {
      // Calculate tentative distance from start node to the neighbor
      const tentativeDistance = distances.get(closestNode) + getDistance(closestNode, neighbor);

      if (tentativeDistance < distances.get(neighbor)) {
        distances.set(neighbor, tentativeDistance);
        previousNodes.set(neighbor, closestNode);
      }
    }

    // Visually mark the current node as visited (optional for visualization)
    closestNode.classList.add('traversed');
    await delay(70);



  }

  // Generate the shortest path from start to end node
  const shortestPath = [];
  let currentNode = endNode;

  while (currentNode !== startNode) {
    shortestPath.unshift(currentNode);
    currentNode = previousNodes.get(currentNode);
  }

  // Visually mark the shortest path (optional for visualization)
  for (node of shortestPath) {
    if (node !== startNode && node !== endNode) {
      node.classList.add('path');
      await delay(200); // Optional delay for visualization
    }
  }


}
// show djkstra text

function showDijkstraContent() {
  const rightContent = document.getElementById('right-content');
  rightContent.innerHTML = `
    <h2>Dijkstra's Algorithm</h2>
    <p>
      It is a graph search algorithm that finds the shortest path
      between two nodes in a weighted graph. It's widely used in finding the
      shortest path for various applications.
    </p>
    <p>
    The grid is treated as a graph where each cell is a node, and neighboring cells are connected by edges.
    Assign a tentative distance value to each cell in the grid. The distance to the starting cell is set to 0, 
    and the distances to all other cells are initially set to infinity
  </p>
    <h1>Time Complexity: OV <sup>2</sup></h1>
    <!-- Add more content as needed -->
  `;
  rightContent.classList.add('fade-in', 'box-shadow-effect'); // Apply the animation class

  // Add the content to the container
  rightContent.appendChild(content);

}

// clear the content
function clearRightContent() {
  const rightContent = document.getElementById('right-content');
  rightContent.classList.remove('box-shadow-effect');
  rightContent.innerHTML = ''; // Clear the content
}







// Function to visualize BFS Algorithm
async function visualizeBFS() {
  if (!startNode || !endNode) {
    alert('Please set the start and end points.');
    return;
  }

  const visited = new Set();
  const queue = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === endNode) {
      break; // Path found
    }

    const neighbors = getNeighbors(current);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !neighbor.classList.contains('wall')) {
        visited.add(neighbor);
        queue.push(neighbor);
        neighbor.classList.add('traversed');

        // Visually mark the neighbor as visited (optional)
        neighbor.previousNode = current; // Store the path information
      }
    }
    // current.classList.add('traversed'); // add kiya

    // Delay for visualization purposes (optional)
    await delay(280);
  }

  // Generate the shortest path from start to end node
  const shortestPath = reconstructShortestPath(endNode);


  // Visually mark the shortest path (optional)
  for (const node of shortestPath) {
    node.classList.add('path');
    await delay(280); // Optional delay for visualization
  }
}

// Function to reconstruct the shortest path
function reconstructShortestPath(node) {
  const shortestPath = [];
  while (node !== startNode) {
    shortestPath.unshift(node);
    node = node.previousNode;
  }
  return shortestPath;
}

// Helper function for adding a delay using Promises
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// shows content of BFS
function showBFScontent() {
  const rightContent = document.getElementById('right-content');
  rightContent.innerHTML = `
    <h2>Breath First Search</h2>
    <p>
    1.Starting Node: BFS begins at a designated starting node (or cell) in the grid. <br>
    2.Explore: It explores the current node by visiting all its unvisited neighbors. 
    BFS typically visits them in the order they appear from left to right and from top to bottom. <br>
    3.Queue: The neighbors of the current node are enqueued. <br>
    4.Mark as Visited: After enqueuing the neighbors, BFS marks the current node as visited to avoid revisiting it later. <br>

    5.Dequeue: Once all unvisited neighbors have been enqueued, BFS dequeues (removes) the current node 
    from the front of the queue.

    </p>
   
    <!-- Add more content as needed -->
  `;
  rightContent.classList.add('fade-in', 'box-shadow-effect'); // Apply the animation class

  // Add the content to the container
  rightContent.appendChild(content);

}





// Function to visualize DFS Algorithm
async function visualizeDFS() {
  if (!startNode || !endNode) {
    alert('Please set the start and end points.');
    return;
  }

  startNode.classList.add('start');
  endNode.classList.add('end');

  const visited = new Set();
  const shortestPath = [];

  async function dfsRecursive(node) {
    if (node === endNode) {
      // Path found; reconstruct and visualize the path
      shortestPath.push(node);
      // const shortestPath = reconstructShortestPath(endNode);
      visualizeShortestPath(shortestPath);
      return true;
    }

    if (!visited.has(node)) {
      visited.add(node);
      node.classList.add('traversed');
      shortestPath.push(node);
      await delay(170);

      const neighbors = getNeighbors(node);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && !neighbor.classList.contains('wall')) {
          neighbor.previousNode = node; // Store the path information
          if (await dfsRecursive(neighbor)) {
            return true;
          }
        }
      }
    }
    
    if (shortestPath.length > 0) {
      shortestPath.pop(); // Remove the node from the path if it's not part of the shortest path
    }

    return false;
  }

  if (!(await dfsRecursive(startNode))) {
    // If the function returns false, there is no path
    alert('No path found.');
  }
}

// Function to visualize the shortest path
async function visualizeShortestPath(path) {
  for (const node of path) {
    if (node !== startNode && node !== endNode) {
      node.classList.add('path');
      await delay(170); // Optional delay for visualization
    }
   
  }
  
}

 
// shows content of DFS
function showDFScontent() {
  const rightContent = document.getElementById('right-content');
  rightContent.innerHTML = `
    <h2>Depth First Search</h2>
    <p>
    Explore: It explores the current node by visiting one of its unvisited neighbors.<br> 
    DFS doesn't have a strict rule about the order of neighbor exploration.<br> It typically explores neighbors in a consistent order, which could be based on one of the following methods:<br>
      
      - Left-First: DFS may explore neighbors in a left-first manner, meaning it prefers to move to the left neighbor before others.<br>
      
      - Top-First: Similarly, it may choose the top neighbor first.<br>
      
      - Right-First or Bottom-First: Depending on the implementation, DFS may also choose the right or bottom neighbor first.<br>
    
    </p>
    
  <h1>Time Complexity: O(V)</h1>

    <!-- Add more content as needed -->
  `;
  rightContent.classList.add('fade-in', 'box-shadow-effect'); // Apply the animation class

  // Add the content to the container
  rightContent.appendChild(content);

}




 
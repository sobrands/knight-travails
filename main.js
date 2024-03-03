// Possible grids that the knight can traverse to
const rows = [2, 2, -2, -2, 1, 1, -1, -1];
const cols = [-1, 1, 1, -1, 2, -2, 2, -2];

const Node = ((x_cord, y_cord, distance, preDecessorNode) => {
  const x = x_cord;
  const y = y_cord;
  const dist = distance;
  const preDecessor = preDecessorNode;

  function equals(otherNode) {
    return x === otherNode.x && y === otherNode.y;
  }

  return {
    x,
    y,
    dist,
    preDecessor,
    equals
  }
});

function isValid(x, y, gridSize) {
  return (x >= 0 && x < gridSize) && (y >= 0 && y < gridSize);
}

function setContains(arr, insertNode) {
  for (let node of arr) {
    if (node.x === insertNode.x && node.y === insertNode.y) {
      return true;
    }
  }
  
  return false;
}

function findShortestDist(src, dest, gridSize) {
  // Set to track visited nodes
  let visited = [];

  // Queue to enqueue and dequeue nodes for BFS
  let queue = [];
  queue.push(src);

  // Go through queue until shortest path found
  // First path found will be returned
  while (queue.length !== 0) {
    // Dequeue front node for checking
    const node  = queue.shift();

    // Check if reached dest node
    if (node.x === dest.x && node.y === dest.y) {
      return node;
    }

    // Else continue searching
    if (!setContains(visited, node)) {
      visited.push(node);

      // Add possible grid movements to queue
      for (let i=0; i<gridSize; i++) {
        x = node.x + rows[i];
        y = node.y + cols[i];
        if (isValid(x, y, gridSize)) {
          queue.push(Node(x, y, node.dist + 1, node));
        }
      }
    }
  }

  return null;
}

function printShortestPath(node) {
  if (node.preDecessor === null) {
    console.log(`[${node.x},${node.y}]`)
    return;
  }

  printShortestPath(node.preDecessor);
  console.log(`[${node.x},${node.y}]`);
}

// N x N matrix
const N = 8;

// Source Node
const src = Node(0, 0, 0, null);

// Dest Node
const dest = Node(3, 3, 0, null);

// Find shortest path using BFS
const node = findShortestDist(src, dest, N);
if (node !== null) {
  console.log(`You made it in ${node.dist} moves! Here's your path:`)
  printShortestPath(node);
} else {
  console.log('No possible path!');
}
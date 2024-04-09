import React, { useState, useEffect } from 'react';

import "./GraphPage.css"
// Graph component/

/*

Add a function where if i click on node, it turns red
*/

/*
function AutoGraph ({nodeAmt}) {
    
  const [nodes, setNodes] = useState([]); // State for nodes
  const [edges, setEdges] = useState([]); // State for edges

  const [selectedNodeIdFrom, setSelectedNodeIdFrom] = useState(null); // State to track the selected node
  const [selectedNodeIdTo, setSelectedNodeIdTo] = useState(null);
  
  const nodeRadius = 5; // Radius of nodes
  const [nodecounter, setNodeCounter] = useState(0);
  const [edgeCounter, setEdgeCounter] = useState(0);
  const [done, setDone] = useState(0);

  // Function to add a node


  const addNode = () => {
    let newNodeX, newNodeY;
    let overlapping = true;

    // Keep generating random coordinates until we find a non-overlapping position
    while (overlapping) {
      newNodeX = Math.random() * (window.innerWidth - 2 * nodeRadius) + nodeRadius; // Random x-coordinate
      newNodeY = Math.random() * (window.innerHeight - 2 * nodeRadius) + nodeRadius; // Random y-coordinate

      // Check if the new node overlaps with any existing node
      overlapping = nodes.some(node => {
        const distance = Math.sqrt(Math.pow(node.x - newNodeX, 2) + Math.pow(node.y - newNodeY, 2));
        return distance < 2 * nodeRadius; // Check if the distance is less than the sum of radii
      });
    }

    const newNode = {
      id: nodes.length,
      x: newNodeX,
      y: newNodeY,
      selected: false // Initially not selected
    };
    setNodes([...nodes, newNode]);
  };

  // Function to toggle selection of a node
  const toggleNodeSelection = nodeId => {
    console.log(nodeId)
    setSelectedNodeIdFrom(nodeId === selectedNodeIdFrom ? null : nodeId); // Toggle selection
  };

  // Function to add an edge between two nodes
  const addEdge = (startNodeId, endNodeId) => {
    const startNode = nodes.find(node => node.id === startNodeId);
    const endNode = nodes.find(node => node.id === endNodeId);

    // Check if the edge intersects with any existing nodes
    const intersectsNode = nodes.some(node => {
      if (node.id !== startNodeId && node.id !== endNodeId) {
        const distance = Math.sqrt(Math.pow(node.x - startNode.x, 2) + Math.pow(node.y - startNode.y, 2));
        return distance < 2 * nodeRadius; // Check if the distance is less than the sum of radii
      }
      return false;
    });

    if (!intersectsNode) {
      setEdges([...edges, { start: startNodeId, end: endNodeId }]);
    }
    
  };

  
  
  

  useEffect(() =>{
      
        const generateNodes = () =>{
            for(let i = 0; i < nodeAmt; i++)
            {
                console.log(`i = ${i}`);
                addNode();
            }

            if(nodecounter < nodeAmt){
              console.log(nodecounter)
              setNodeCounter(nodecounter + 1);
            }
        }
        if(nodecounter < nodeAmt){
          generateNodes();
        }
        //generateNodes();
        const generateEdges =()=>{
          for(let i = 0; i < nodeAmt * 2; i++)
            {
                addEdge(Math.floor(Math.random() * nodes.length), Math.floor(Math.random() * nodes.length));
            }

            if(edgeCounter < nodeAmt * 2)
            {
              setEdgeCounter(edgeCounter + 1);
            }
        }
        generateEdges();
        
    }, [nodecounter, edgeCounter])

  return (
    <div>
      <button onClick={addNode}>Add Node</button>
      <button onClick={() => addEdge(Math.floor(Math.random() * nodes.length), Math.floor(Math.random() * nodes.length))}>Add Edge</button>
      <svg width="100%" height="100vh">
        {edges.map((edge, index) => (
          <line
            key={index}
            x1={nodes[edge.start].x}
            y1={nodes[edge.start].y}
            x2={nodes[edge.end].x}
            y2={nodes[edge.end].y}
            stroke="black"
            strokeWidth="2"
          />
        ))}

        {nodes.map(node => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={nodeRadius}
            fill={selectedNodeIdFrom === node.id ? "red" : "blue"} // Change fill color based on selection
            stroke="black"
            strokeWidth="2"
            onClick={() => toggleNodeSelection(node.id)} // Toggle selection on click
          />
        ))}
      </svg>
    </div>
  );
};

export default AutoGraph;

*/

const nodeRadius = 5;

const AutoGraph = ({ nodeAmt }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodeIdFrom, setSelectedNodeIdFrom] = useState(null);
  const [selectedNodeIdTo, setSelectedNodeIdTo] = useState(null);

  const [nodecounter, setNodeCounter] = useState(0);
  const [edgeCounter, setEdgeCounter] = useState(0);
  const [done, setDone] = useState(0);

  const [shortestPath, setShortestPath] = useState([]);

  const addNode = () => {
    let newNodeX, newNodeY;
    let overlapping = true;

    // Keep generating random coordinates until we find a non-overlapping position
    while (overlapping) {
      newNodeX = Math.random() * (window.innerWidth - 2 * nodeRadius) + nodeRadius; // Random x-coordinate
      newNodeY = Math.random() * (window.innerHeight - 2 * nodeRadius) + nodeRadius; // Random y-coordinate

      // Check if the new node overlaps with any existing node
      overlapping = nodes.some(node => {
        const distance = Math.sqrt(Math.pow(node.x - newNodeX, 2) + Math.pow(node.y - newNodeY, 2));
        return distance < 2 * nodeRadius; // Check if the distance is less than the sum of radii
      });
    }

    const newNode = {
      id: nodes.length,
      x: newNodeX,
      y: newNodeY,
      selected: false // Initially not selected
    };
    setNodes([...nodes, newNode]);
  };

  // Function to toggle selection of a node
  /*
  const toggleNodeSelection = nodeId => {
    console.log(nodeId)
    setSelectedNodeIdFrom(nodeId === selectedNodeIdFrom ? null : nodeId); // Toggle selection
  };
  */

  const toggleNodeSelection = nodeId => {
    if (selectedNodeIdFrom === nodeId) {
      setSelectedNodeIdFrom(null);
    } else if (selectedNodeIdTo === nodeId) {
      setSelectedNodeIdTo(null);
    } else if (selectedNodeIdFrom === null) {
      setSelectedNodeIdFrom(nodeId);
    } else if (selectedNodeIdTo === null) {
      setSelectedNodeIdTo(nodeId);
    }
  };

  // Function to add an edge between two nodes
  const addEdge = (startNodeId, endNodeId) => {
    const startNode = nodes.find(node => node.id === startNodeId);
    const endNode = nodes.find(node => node.id === endNodeId);

    // Check if the edge intersects with any existing nodes
    const intersectsNode = nodes.some(node => {
      if (node.id !== startNodeId && node.id !== endNodeId) {
        const distance = Math.sqrt(Math.pow(node.x - startNode.x, 2) + Math.pow(node.y - startNode.y, 2));
        return distance < 2 * nodeRadius; // Check if the distance is less than the sum of radii
      }
      return false;
    });

    if (!intersectsNode) {
      setEdges([...edges, { start: startNodeId, end: endNodeId }]);
    }
    
  };

  // Function to find the shortest path using Dijkstra's algorithm
  const findShortestPath = () => {
    if (!selectedNodeIdFrom || !selectedNodeIdTo) return;
  
    const distances = {};
    const previousNodes = {};
    const visited = new Set();
  
    nodes.forEach(node => {
      distances[node.id] = Infinity;
      previousNodes[node.id] = null;
    });
  
    distances[selectedNodeIdFrom] = 0;
  
    while (visited.size < nodes.length) {
      let currentNode = null;
      let shortestDistance = Infinity;
  
      // Find unvisited node with the shortest distance
      nodes.forEach(node => {
        if (!visited.has(node.id) && distances[node.id] < shortestDistance) {
          currentNode = node;
          shortestDistance = distances[node.id];
        }
      });
  
      if (!currentNode) break; // No reachable nodes left
  
      visited.add(currentNode.id);
  
      edges
        .filter(edge => edge.start === currentNode.id && !visited.has(edge.end))
        .forEach(edge => {
          const newDistance = distances[currentNode.id] + edge.weight;
          if (newDistance < distances[edge.end]) {
            distances[edge.end] = newDistance;
            previousNodes[edge.end] = currentNode.id;
          }
        });
    }
  
    // Reconstruct path and count the number of edges
    let numberOfEdges = 0;
    let currentNode = selectedNodeIdTo;
    while (currentNode !== null && previousNodes[currentNode] !== null) {
      const previousNode = previousNodes[currentNode];
      edges.forEach(edge => {
        if ((edge.start === currentNode && edge.end === previousNode) || (edge.start === previousNode && edge.end === currentNode)) {
          numberOfEdges++;
        }
      });
      currentNode = previousNode;
    }
  
    console.log("Number of edges in the shortest path:", numberOfEdges);
  };

  useEffect(() =>{
      
    const generateNodes = () =>{
        for(let i = 0; i < nodeAmt; i++)
        {
            console.log(`i = ${i}`);
            addNode();
        }

        if(nodecounter < nodeAmt){
          console.log(nodecounter)
          setNodeCounter(nodecounter + 1);
        }
    }
    if(nodecounter < nodeAmt){
      generateNodes();
    }
    //generateNodes();
    const generateEdges =()=>{
      for(let i = 0; i < nodeAmt * 2; i++)
        {
            addEdge(Math.floor(Math.random() * nodes.length), Math.floor(Math.random() * nodes.length));
        }

        if(edgeCounter < nodeAmt * 2)
        {
          setEdgeCounter(edgeCounter + 1);
        }
    }
    generateEdges();
    
}, [nodecounter, edgeCounter])

  return (
    <div>
      <button onClick={addNode}>Add Node</button>
      <button onClick={() => addEdge(Math.floor(Math.random() * nodes.length), Math.floor(Math.random() * nodes.length))}>Add Edge</button>
      <button onClick={findShortestPath}>Find Shortest Path</button>
      <svg width="100%" height="100vh">
        {/* Render edges */}
        {edges.map((edge, index) => (
          <line
            key={index}
            x1={nodes[edge.start].x}
            y1={nodes[edge.start].y}
            x2={nodes[edge.end].x}
            y2={nodes[edge.end].y}
            //stroke="black"
            stroke={edge.isShortestPath ? "red" : "black"}
            strokeWidth="2"
          />
        ))}
        {/* Render nodes */}
        {nodes.map(node => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={nodeRadius}
            //fill={(selectedNodeIdFrom === node.id) ? "red" : (selectedNodeIdTo === node.id) ? "green" : "blue"}
            fill={selectedNodeIdFrom === node.id ? "red" : (selectedNodeIdTo === node.id) ? "green" : "blue"}
            //shortestPath.includes(node.id) ? "green" : "blue"} // Change fill color based on selection or shortest path
            stroke="black"
            strokeWidth="2"
            onClick={() => toggleNodeSelection(node.id)} // Toggle selection on click
          />
        ))}
      </svg>
    </div>
  );
};

export default AutoGraph;
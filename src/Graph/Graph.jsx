import React, { useState } from 'react';

import "./GraphPage.css"
// Graph component/

/*

Add a function where if i click on node, it turns red
*/


const Graph = () => {
  const [nodes, setNodes] = useState([]); // State for nodes
  const [edges, setEdges] = useState([]); // State for edges
  const [selectedNodeIdFrom, setSelectedNodeIdFrom] = useState(null); // State to track the selected node
  const [selectedNodeIdTo, setSelectedNodeIdTo] = useState(null);
  const nodeRadius = 20; // Radius of nodes

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

  return (
    <div>
      <button onClick={addNode}>Add Node</button>
      <button onClick={() => addEdge(Math.floor(Math.random() * nodes.length), Math.floor(Math.random() * nodes.length))}>Add Edge</button>
      <svg width="100%" height="100vh">
        {/* Render edges */}
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
        {/* Render nodes */}
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

export default Graph;
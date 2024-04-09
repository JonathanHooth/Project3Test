import logo from './logo.svg';
import './App.css';

import GraphPage from './Graph/GraphPage';

import React, {useEffect, useRef} from 'react';


/*
function App() {
  return (
    <GraphPage />
  );
}

export default App;
*/

import GraphVisualization from './Graph/newGraph.jsx';

const App = () => {
  const graphRef = useRef(null);

  const handleFindShortestPath = () => {
    // Assuming you have the source and target node IDs defined
    if (graphRef.current) {
      // Assuming you have the source and target node IDs defined
      const sourceNodeId = 1;
      const targetNodeId = 3;
      graphRef.current.findShortestPath(sourceNodeId, targetNodeId);
    }
  };

  const nodesData = [
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' },
    { id: 6, label: 'Node 6' },
    { id: 7, label: 'Node 7' },
    // Add more nodes as needed
  ];

  const edgesData = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 6 },
    { from: 5, to: 6 },
    { from: 7, to: 3 },
    { from: 4, to: 5},
    { from: 7, to: 2 },
    // Add more edges as needed
  ];


  

  return (
    <div>
      <h1>Graph Visualization</h1>
      <GraphVisualization ref={graphRef} nodesData={nodesData} edgesData={edgesData} />
      <button onClick={handleFindShortestPath}>Find Shortest Path</button>
    </div>
  );
};

export default App;
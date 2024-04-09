import React, { useState, useEffect, useRef } from 'react';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

const GraphVisualization = ({ nodesData, edgesData }) => {
  const [network, setNetwork] = useState(null);
  const networkRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('network');

    const data = {
      nodes: new DataSet(nodesData),
      edges: new DataSet(edgesData)
    };

    const options = {
      nodes: {
        shape: 'circle',
        color: {
          border: '#2B7CE9',
          background: '#97C2FC'
        }
      },
      edges: {
        color: '#848484',
        smooth: {
          type: 'continuous'
        }
      },
      physics: {
        enabled: false
      }
    };

    const newNetwork = new Network(container, data, options);
    setNetwork(newNetwork);
    networkRef.current = newNetwork;

    return () => {
      if (network !== null) {
        network.destroy();
      }
    };
  }, [nodesData, edgesData]);

  const findShortestPath = (sourceNodeId, targetNodeId) => {
    if (!networkRef.current) return;

    const path = networkRef.current.findShortestPath(sourceNodeId, targetNodeId);
    if (path !== null) {
      highlightShortestPath(path);
    }
  };

  const highlightShortestPath = path => {
    const edges = networkRef.current.body.data.edges;
    const highlightedEdges = edges.get({
      filter: edge => path.findIndex(nodeId => edge.from === nodeId || edge.to === nodeId) !== -1
    });

    edges.forEach(edge => {
      if (highlightedEdges.find(hEdge => hEdge.id === edge.id)) {
        edge.color = { color: 'red' };
      } else {
        edge.color = { color: '#848484' };
      }
    });

    networkRef.current.setData({ edges });
  };

  return (
    <div id="network" style={{ width: '100%', height: '600px', border: '1px solid lightgray' }} />
  );
};

export default GraphVisualization;
import React, { Component } from 'react';
import { render } from 'react-dom';
import SVGGraph from './components/svgGraph';
import PoseNet from './components/posenet';
import './style.css';

import { VIDEO_SIZE, POSENET_NODES } from './constants';
const minScore = 0.5;

class App extends Component {
  constructor() {
    super();
    this.nodes = POSENET_NODES;
    this.links = [
      { source: 'leftShoulder', target: 'rightShoulder' },
      { source: 'rightWrist', target: 'rightElbow' },
      { source: 'rightElbow', target: 'rightShoulder' },
      { source: 'leftWrist', target: 'leftElbow' },
      { source: 'leftElbow', target: 'leftShoulder' },
      { source: 'rightAnkle', target: 'rightKnee' },
      { source: 'rightKnee', target: 'rightHip' },
      { source: 'rightHip', target: 'rightShoulder' },
      { source: 'leftAnkle', target: 'leftKnee' },
      { source: 'leftKnee', target: 'leftHip' },
      { source: 'leftHip', target: 'leftShoulder' },
      { source: 'leftHip', target: 'rightHip' },
    ]
  }

  getNodesWithPosition(poses){
    return this.nodes.reduce((arr, node) => {
      const pose = poses[node.id] || {};
      const position = (pose.position || {});

      if(pose.score < minScore) {
        return arr;
      }
      
      return [...arr, { ...node, ...position }];
    }, []);
  }

  getLinks(nodes){
    const nodesIDs = nodes.map(node => node.id);

    return this.links.filter(link => {
      const source = (link.source || {}).id || link.source;
      const target = (link.target || {}).id || link.target;
      
      return nodesIDs.includes(source) && nodesIDs.includes(target);
    });
  }

  getGraph(poses){
    const nodes = this.getNodesWithPosition(poses);

    return { nodes, links: this.getLinks(nodes) };
  }

  render() {
    const videoSize = VIDEO_SIZE;

    return (
      <PoseNet videoSize={videoSize}>
      {
        ({ poses, loading }) => (
          loading 
          ? 'Loading...'
          : (
            <SVGGraph 
              graph={this.getGraph(poses)} 
            />
          ))
      }
      </PoseNet>
      
    );
  }
}

render(<App />, document.getElementById('root'));

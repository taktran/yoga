import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { POSENET_IDS, COLORS } from '../constants';
import createPoseDetection from './create-pose-detection';

const {
  LEFT_WRIST,
  RIGHT_WRIST,
  LEFT_ANKLE,
  RIGHT_ANKLE
} = POSENET_IDS;

const initialColor = COLORS.sky;
const successColor = COLORS.oxford;

export default class SVGGraph extends Component {
  shouldComponentUpdate = () => false;

  componentDidMount() {
    this.draw();
    window.addEventListener('resize', this.redraw);
  }

  componentWillReceiveProps() {
    this.redraw();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.redraw);
  }

  containerSize() {
    return {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    }
  }

  redraw = () => {
    if (this.svg) {
      this.svg.selectAll('*').remove();
    }

    this.draw();
  }

  draw() {
    const {
      nodes,
      // links
    } = this.props.graph;
    const poseDetection = createPoseDetection(nodes);
    const hasMountainPose = poseDetection.hasMountainPose();
    const hasPreparationPose = poseDetection.hasPreparationPose();
    const { width, height } = this.containerSize();
    this.svg = d3.select(this.mySvg)
      .attr('width', width)
      .attr('height', height);

    const node = this.svg.append('g')
      .selectAll('g')
      .data(nodes, d => d.id)
      .enter()
      .append('g')

    node.append('circle')
      .attr('r', d => d.r)
      .attr('fill', ({ id }) => {
        if ((id === LEFT_WRIST) || (id === RIGHT_WRIST)) {
          return hasMountainPose ? successColor : initialColor;  
        }
        if ((id === LEFT_ANKLE) || (id === RIGHT_ANKLE)) {
          return hasPreparationPose ? successColor : initialColor;  
        }

        return initialColor;
      });

  /*  const link = this.svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', circleColor)
      .attr('stroke-width', 5)*/

   const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))  
      .force('center', d3.forceCenter(width / 2, height / 2));

    const ticked = () => {
      /*link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);*/
      node
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
      }

    simulation
      .nodes(nodes)
      .on('tick', ticked)

   /* simulation
      .force('link')
      .links(links);*/
  }

  render() {
    return (
      <div
        className="container"
        ref={ref => { this.container = ref; }}
      >
        <svg ref={ref => { this.mySvg = ref;  }} />
      </div>
    );
  }
}

SVGGraph.propTypes = {
  graph: PropTypes.object,
};

SVGGraph.defaultProps = {
  graph: { nodes: [], links: [] },
};

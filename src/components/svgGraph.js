import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import * as d3 from 'd3';
import { POSENET_IDS, COLORS, POSENET_THROTTLE } from '../constants';
import { ARTICLES } from '../content';
import createPoseDetection from './create-pose-detection';
import $ from "jquery";

const {
  LEFT_WRIST,
  RIGHT_WRIST,
  LEFT_ANKLE,
  RIGHT_ANKLE
} = POSENET_IDS;

const initialColor = COLORS.sky;
const successColor = COLORS.oxford;

export default class SVGGraph extends Component {
  constructor () {
    super();
    this.state = {
      iframe: document.getElementById('iframe'),
      currentChild: 0,
      childrenArticles: ARTICLES.children
    };
    const updatePage = () => {
      const { iframe, currentChild, childrenArticles } = this.state;
      const article = childrenArticles[currentChild];
      iframe.src = article;

      console.log('Show article', article);

      this.setState(({ currentChild }) => {
        let newIndex = currentChild + 1;
        if (newIndex >= childrenArticles.length) {
          newIndex = 0;
        }

        console.log('Update currentChild', newIndex);
        return {
          currentChild: newIndex
        };
      });
    };
    this.updatePage = throttle(updatePage, POSENET_THROTTLE);
  };

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

    if (hasMountainPose) {
      this.updatePage();
    }

   /* simulation
      .force('link')
      .links(links);*/
  }
  test(){
    let x = 0;
    setInterval(function(){
      x+=10;
    $("html, body").animate({scrollTop: x + 100}, 1000);
    },300);
    
  }
  render() {
    return (
      <div
        className="container"
        ref={ref => { this.container = ref; }}
      >
      <button id="test" onClick={this.test}>TEst</button>
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

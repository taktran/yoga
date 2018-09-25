import React, { Component } from 'react';
import Iframe from 'react-iframe';
import { ARTICLES } from '../content';

export default class PageIframe extends Component {
    render() {
    return (  
    <Iframe url={ARTICLES.parent}
    width="100%"
    height="100%"
    id="iframe"
    allowFullScreen ="true"
    frameborder="0"
    />) }
}
import React, { Component } from 'react';
import Iframe from 'react-iframe';
import { ARTICLES } from '../content';

export default class PageIframe extends Component {
    render() {
    return (  
    <Iframe url={ARTICLES.parent}
    width="100%"
    height="1000%"
    id="iframe"
    scrolling="yes"
    allowFullScreen
    />) }
}
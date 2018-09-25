import React, { Component } from 'react';
import Iframe from 'react-iframe';

export default class PageIframe extends Component {
    render() {
    return (  
    <Iframe url="https://ft.com"
    width="100%"
    height="1000%"
    id="iframe"
    scrolling="yes"
    allowFullScreen
    />) }
}
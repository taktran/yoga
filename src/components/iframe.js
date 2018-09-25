import React, { Component } from 'react';
import Iframe from 'react-iframe';

export default class PageIframe extends Component {
    render() {
    return (  
    <Iframe url="https://ft.com"
    width="100%"
    height="100%"
    id="myId"
    className="myClassname"
    display="initial"
    position="relative"
    allowFullScreen ="true"
    frameborder="0"
    />) }
}
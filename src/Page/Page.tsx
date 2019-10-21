import React, { Component } from 'react';
// @ts-ignore
import ScrollMagic from 'scrollmagic';
import { Scroller } from '../Scroller/Scroller';

export type PageProps = {
  scroller: string
  scrollerProps: any
}

export class Page extends Component<PageProps> {

  static defaultProps: PageProps = {
    scroller: 'default',
    scrollerProps: {},
  }

  pageRef: React.RefObject<any>;
  scroller: Scroller;

  constructor(props: any) {
    super(props);
    this.pageRef = React.createRef();
    this.scroller = new Scroller(
      this.pageRef,
      this.props.scroller,
      this.props.scrollerProps,
    );
  }

  componentDidMount() {
    this.scroller.start();
  }

  render() {
    return (
      <div ref={this.pageRef} className="arte-page">
        {React.Children.map(this.props.children, (child: React.ReactElement) => (
          <child.type {...child.props} scroller={this.scroller}></child.type>
        ))}
      </div>
    );
  }
}
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../assets/styles/_common.scss';

export default function Layout({ ...props }) {
  return (
    <React.Fragment>
      <Header />
      <div className="wrapper">{props.children}</div>
      <Footer />
    </React.Fragment>
  );
}

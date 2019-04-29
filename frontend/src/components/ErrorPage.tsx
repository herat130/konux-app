import React from 'react';
import '../assets/styles/error.scss';

/**
 * in case of any exception or error on ui or network
 * this component needs to be display
 * So that user get an intimation of issue in Application
 */

export default function ErrorPage() {
  return (
    <div className="row">
      <div className="text-center errorPage column-12">
        <h1>OOPS!!!</h1>
        <p>Our servers facing some issue</p>
        <p>Please contact technical administrator</p>
      </div>
    </div>
  );
}

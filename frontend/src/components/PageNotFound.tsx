import React from 'react';
import '../assets/styles/error.scss';

/**
 *
 * in case of url tempered or misspell by the user
 * below component will display so that the app will not break
 * and user should be aware of the issue occured.
 */

export default function PageNotFound({ ...props }) {
  return (
    <div className="nourl-page">
      <h1>OOPS!!!</h1>
      <h3>404 PAGE NOT FOUND...</h3>
      <p>The URL You are looking for it not exists</p>
    </div>
  );
}

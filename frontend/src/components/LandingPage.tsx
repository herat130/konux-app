import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/App.scss';

/**
 * below component it just application landing page
 */
export default function LandingPage() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome , Check all Analytics</p>
        <Link className="launch-app" to={'/analytics'}>
          Continue
        </Link>
      </header>
    </div>
  );
}

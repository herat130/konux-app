import * as React from 'react';
import '../assets/styles/App.scss';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <div className="header">
      <div className="column-6">
        <Link to={`/analytics`}>
          <span className="logo">Konux</span>
        </Link>
      </div>
    </div>
  );
}

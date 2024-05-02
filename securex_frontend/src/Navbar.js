import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-white font-bold text-xl">FCN</Link>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link to="/learn" className="text-white hover:text-gray-300">Learn</Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-gray-300">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

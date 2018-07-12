import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
    <div className="navbar">
        <div>
            <ul>
                <li>
                    <Link to="/home">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/favorites">
                        My Favorites
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="/chat">
                        Chat Room
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        Log Out
                    </Link>
                </li>
            </ul>
        </div>
    </div>
)
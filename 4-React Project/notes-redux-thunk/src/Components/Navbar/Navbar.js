import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">
                    Navbar
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link to="favorite-notes">Favorite Notes</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

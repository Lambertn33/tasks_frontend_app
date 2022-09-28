import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Tasks Application</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">Tasks List</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/create">Add New Task</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

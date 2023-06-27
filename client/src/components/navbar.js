import React from 'react';

// We import bootstrap to make our application look better.
import './navbar.css';

// We import NavLink to utilize the react router.
import { NavLink } from 'react-router-dom';

// Here, we display our Navbar
export default function Navbar() {
	return (
		<div>
			<nav className="navbar navbar-expand-sm">
				<div className="container-fluid">
					<NavLink className="navbar-brand logo" to="/">
						SwimSet
					</NavLink>
                    <div className="navbar-item">
                        <NavLink className="nav-link create-workout" to="/create">
                            Create Workout
                        </NavLink>
                    </div>
				</div>
			</nav>
		</div>
	);
}

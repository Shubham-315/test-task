import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <NavLink class="nav-link"  to="/">Registration</NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" to="/detail">Detail</NavLink>
      </li>
    </ul>
  </div>
</nav>
      <Outlet/>
    </div>
  )
}

export default Layout

import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
        Hello This Is Home Page
        <Link to={"/products"}>Go To Products</Link>
    </div>
  )
}

export default HomePage

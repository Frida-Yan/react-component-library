import React from "react"
import { Link } from "react-router-dom"

const HomePage = (list) => {
  return (
    <div>
      组件分类
      <ul>
        <li>
          <Link to="/tree">tree</Link>{" "}
        </li>
        <li>
          <Link to="/portals">portals</Link>
        </li>
        <li>
          <Link to="/tagsList">tagsList</Link>
        </li>
      </ul>
    </div>
  )
}
export default HomePage

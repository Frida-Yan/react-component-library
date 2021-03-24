import React from "react"
import App from "../App"
import Tree from "../page/tree"
import Portals from "../page/portals"
import TagsList from "../page/tagsList"
import Tooltip from "../page/tooltip"

const Router = [
  {
    path: "/home",
    component: App,
  },
  {
    path: "/tree",
    component: Tree,
  },
  {
    path: "/portals",
    component: Portals,
  },
  {
    path: "/tagsList",
    component: TagsList,
  },
  {
    path: "/tooltip",
    component: Tooltip,
  },
]
export default Router
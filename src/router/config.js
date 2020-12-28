import React from "react";
import App from "../App";
import Tree from "../page/tree";
import Portals from "../page/portals";

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
];
export default Router;

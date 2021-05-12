import React from "react";
import App from "../App";
import Tree from "../page/tree";
import Portals from "../page/portals";
import TagsList from "../page/tagsList";
import Tooltip from "../page/tooltip";
import SearchList from "../page/searchList";
import Calculator from "../page/calculator";
import Map from "../page/map";

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
  {
    path: "/searchList",
    component: SearchList,
  },
  {
    path: "/calculator",
    component: Calculator,
  },
  // {
  //   path: "/map",
  //   component: Map,
  // },
];
export default Router;

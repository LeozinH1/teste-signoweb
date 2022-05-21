import React from "react";

import { Routes as MyRoutes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Enquete from "../pages/Enquete";
import Create from "../pages/Create";
import Edit from "../pages/Edit";

const Routes: React.FC = () => (
  <MyRoutes>
    <Route path="/" element={<Home />} />
    <Route path="/enquete/:enquete_id" element={<Enquete />} />
    <Route path="/create" element={<Create />} />
    <Route path="/edit/:enquete_id" element={<Edit />} />
  </MyRoutes>
);

export default Routes;

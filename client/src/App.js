import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Workouts from "./components/workouts";
import Edit from "./components/edit";
import Create from "./components/create";
 
const App = () => {
 return (
   <div className="app">
     <Navbar />
     <Routes>
       <Route exact path="/" element={<Workouts />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;
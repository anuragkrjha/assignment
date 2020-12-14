import React, {useState, useEffect} from "react";

import axios from 'axios';
import './App.css';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import *  as ReactBootstrap from "react-bootstrap";

const App = () =>
{
  const [employe,setEmploye] = useState([]);
  const [loading, setLoading] = useState(false);
   const [currentpage, setCurrentpage] = useState(1);

  const [employePerPage, setEmployePerPage] = useState(20); 
  


  const getEmployeData = async()=> {
    try {
      const data = await axios.get ("https://classmarker-app.herokuapp.com/mockData");
      console.log(data);
      setEmploye(data.data);
    }
    catch (e) {
      console.log(e);
    }
  };

  const columns = [ 
    
    {dataField: "name", text:"Name"},
    {dataField: "email", text:"E-mail"},
    {dataField: "company", text:"Company"},
    {dataField: "job", text:"job"},
    {dataField: "city", text:"city"},
    {dataField: "Fav Movie", text:"Fav-Movie"}
    

  ];
  useEffect(() => {
    getEmployeData();


  }, []);

   const indexOfLastEmploye = currentpage*employePerPage;
  const indexOfFirstEmploye = indexOfLastEmploye - employePerPage;
  const currentemploye  = employe.slice(indexOfFirstEmploye- indexOfLastEmploye);

return <div className="App">
    <BootstrapTable
    keyField="name"
    data={currentemploye}
    columns = {columns}
    pagination = {paginationFactory()} 
    />
  </div>
  
  
};





export default App;

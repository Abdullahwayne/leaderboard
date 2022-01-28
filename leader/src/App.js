import React, { useEffect, useState } from "react";
import ControlledInputs from "./componenets/Person";
import Table from "./componenets/Table";
import axios from "axios";
import tabb from "./componenets/TableHeader/TableHeader";
import TableHeader from "./componenets/TableHeader/TableHeader";
import MyTable from "./componenets/Table";
import BasicTable from "./componenets/Table";
import Create from "../src/componenets/Create";



function App() {
  const [dataTable, setDataTable] = useState([]);

  //   useEffect(() => {
  //     axios.get('https://192.168.18.139:3005/api/user/abdullah')
  //     .then(res => setDataTable(res.data))
  //     .catch(err => console.log(err));

  // }, [])
  return (
    <div className="container">
      <h1></h1>
      {/* <TableHeader></TableHeader> */}
      <BasicTable></BasicTable>
      {/* <Create></Create> */}
    </div>
  );
}

export default App;

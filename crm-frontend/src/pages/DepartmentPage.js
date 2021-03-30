import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function DepartmentPage() {

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('/departments', {method: 'GET'})
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch((err) => console.log(err))
  }, []);

  const columns = [{
    dataField: 'departmentName',
    text: 'Department Name',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'director',
    text: 'Director Name',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'updatedAt',
    text: 'Last Updated',
    formatter: (date) => new Date(date).toString().substring(4, 15)
}]

  return (
    <React.Fragment>
      <Title title="Department Page" /> 
      <BootstrapTable
            keyField="_id"
            data={ departments }
            columns={ columns }
            filter={ filterFactory() }
            pagination={ paginationFactory() }
        />
    </React.Fragment>
  );
}

export default DepartmentPage;

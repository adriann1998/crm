import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getData } from '../utils/GetPostDataUtil';

function UserPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData('/users')
      .then(data => {
        if(mounted) {
          setUsers(data)
        }
      })
    return () => mounted = false;
  }, [])

  const columns = [{
    dataField: 'name',
    text: "Full Name",
    sort: true,
    filter: textFilter(), 
    formatter: (name) => `${name.firstName} ${name.middleName ? name.middleName : ''} ${name.lastName}`
  }, {
    dataField: 'userEmail',
    text: 'Email',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'userPosition',
    text: 'Role',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'department.departmentName',
    text: 'Department',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'userStatus',
    text: 'Status',
    sort: true,
    formatter: (stat) => stat ? "active" : "non-active"
  }, {
    dataField: 'createdAt',
    text: 'Created At',
    sort: true,
    formatter: (date) => new Date(date).toString().substring(4, 15)
  }, {
    dataField: 'updatedAt',
    text: 'Updated At',
    sort: true,
    formatter: (date) => new Date(date).toString().substring(4, 15)
  }]

  return (
    <React.Fragment>
        <Title title="User Page" />
        <BootstrapTable
            keyField="_id"
            data={ users }
            columns={ columns }
            filter={ filterFactory() }
            pagination={ paginationFactory() }
        />
    </React.Fragment>
  );
}

export default UserPage;

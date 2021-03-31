import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import Table from '../components/Table';
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

  const columns = [
    { 
      id: 'name', 
      label: 'Full Name', 
      minWidth: 150,
      format: (name) => `${name.firstName} ${name.middleName ? name.middleName : ''} ${name.lastName}`
    }, { 
      id: 'userEmail', 
      label: 'Email', 
      minWidth: 100
    }, { 
      id: 'userPosition', 
      label: 'Role', 
      minWidth: 150
    }, { 
      id: 'department', 
      label: 'Role', 
      minWidth: 150,
      format: (department) => department.departmentName
    }, { 
      id: 'userStatus', 
      label: 'Status', 
      minWidth: 150,
      format: (stat) => stat ? "active" : "non-active"
    }, { 
      id: 'createdAt', 
      label: 'Created At', 
      minWidth: 150,
      format: (date) => new Date(date).toString().substring(4, 15)
    }, { 
      id: 'updatedAt', 
      label: 'Updated At', 
      minWidth: 150,
      format: (date) => new Date(date).toString().substring(4, 15)
    }
  ];

  return (
    <React.Fragment>
        <Title title="User Page" />
        <Table columns={columns} rows={users} />
    </React.Fragment>
  );
}

export default UserPage;

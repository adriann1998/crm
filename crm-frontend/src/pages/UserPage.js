import React from 'react';
import Title from '../components/Title';
import Table from '../components/Table';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';

function UserPage(  ) {

  const columns = [
    { 
      id: 'NIK', 
      label: 'NIK'
    }, { 
      id: 'name', 
      label: 'Full Name',
      format: (name) => name ? `${name.firstName} ${name.middleName ? name.middleName : ''} ${name.lastName}` : ''
    }, { 
      id: 'userEmail', 
      label: 'Email'
    }, { 
      id: 'userPosition', 
      label: 'Role'
    }, { 
      id: 'department', 
      label: 'Department',
      format: (department) => department ? department.departmentName : ''
    }, { 
      id: 'userStatus', 
      label: 'Status',
      format: (stat) => stat ? "active" : "non-active"
    }, { 
      id: 'createdAt', 
      label: 'Created At',
      format: (date) => new Date(date).toString().substring(4, 15)
    }, { 
      id: 'updatedAt', 
      label: 'Updated At',
      format: (date) => new Date(date).toString().substring(4, 15)
    }
  ];

  return (
    <React.Fragment>
        <Title title="User Page" />
        <Link to="/form-user">
          <AddButton />
        </Link>
        <Table columns={columns} baseURL={'/users'} />
    </React.Fragment>
  );
}

export default UserPage;

import React from 'react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import UserFormPage from './forms/UserFormPage';
import { UserIcon } from '../components/Icons';

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
      <PageHeader 
        title="User Page" 
        subTitle="description goes here"
        Icon={UserIcon}
      />
      <Table 
        columns={columns} 
        baseURL={'/users'} 
        Form={UserFormPage}
        TableIcon={UserIcon}
      />
    </React.Fragment>
  );
}

export default UserPage;

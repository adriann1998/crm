import React from 'react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import DepartmentFormPage from './forms/DepartmentFormPage';
import { DepartmentIcon } from '../components/Icons';

function DepartmentPage() {

  const columns = [
    { 
      id: 'departmentName', 
      label: 'Name'
    }, { 
      id: 'director', 
      label: 'Director',
      format: (director) => director ? `${director.name.firstName} ${director.name.lastName}` : ''
    }, { 
      id: 'updatedAt', 
      label: 'Updated At',
      format: (date) => new Date(date).toString().substring(4, 15)
    }
  ];

  return (
    <React.Fragment>
      <PageHeader 
        title="Department Page" 
        subTitle="description goes here"
        Icon={DepartmentIcon}
      />
      <Table 
        columns={columns} 
        baseURL={'/departments'}
        Form={DepartmentFormPage}
        TableIcon={DepartmentIcon}
      />
    </React.Fragment>
  );
}

export default DepartmentPage;

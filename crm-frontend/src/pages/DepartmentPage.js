import React from 'react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';

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
      />
      <Link to="/form/department">
          <AddButton />
        </Link> 
      <Table columns={columns} baseURL={'/departments'}/>
    </React.Fragment>
  );
}

export default DepartmentPage;

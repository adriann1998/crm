import React from 'react';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/Table';
import DepartmentForm from '../../components/forms/DepartmentForm';
import { DepartmentIcon } from '../../components/Icons';
import pageDescriptions from '../../components/pageDescriptions';

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
        subTitle={pageDescriptions.departments}
        Icon={DepartmentIcon}
      />
      <Table 
        columns={columns} 
        baseURL={'/departments'}
        Form={DepartmentForm}
        TableIcon={DepartmentIcon}
        editable
      />
    </React.Fragment>
  );
}

export default DepartmentPage;

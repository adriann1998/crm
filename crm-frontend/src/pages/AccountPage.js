import React from 'react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import AccountFormPage from './forms/AccountFormPage';
import { AccountIcon } from '../components/Icons';

function AccountPage( ) {

  const columns = [
    { 
      id: 'accName', 
      label: 'Name'
    }, { 
      id: 'accAlias', 
      label: 'Alias',
      format: (accAlias) => accAlias ? accAlias : ''
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
          title="Account Page" 
          subTitle="description goes here"
          Icon={AccountIcon}
        />
        <Table 
          columns={columns} 
          baseURL={'/accounts'} 
          Form={AccountFormPage}
          TableIcon={AccountIcon}
        />
    </React.Fragment>
  );
}

export default AccountPage;
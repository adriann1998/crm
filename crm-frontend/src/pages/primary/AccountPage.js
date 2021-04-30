import React, { useContext } from 'react';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/Table';
import AccountForm from '../../components/forms/AccountForm';
import { AccountIcon } from '../../components/Icons';
import pageDescriptions from '../../components/pageDescriptions';
import { UserContext } from '../../utils/Context';

function AccountPage( ) {

  const { user } = useContext(UserContext);

  const columns = [
    { 
      id: 'accName', 
      label: 'Name'
    }, { 
      id: 'accAlias', 
      label: 'Alias',
      format: (accAlias) => accAlias ? accAlias : ''
    }, { 
      id: 'accHolder', 
      label: 'Account Holder',
      format: (user) => user.userEmail
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
          subTitle={pageDescriptions.accounts}
          Icon={AccountIcon}
        />
        <Table 
          columns={columns} 
          baseURL={'/accounts'} 
          Form={AccountForm}
          TableIcon={AccountIcon}
          editable
          deleteable={user && user.access === 'admin'}
          appendable={user && user.access === 'admin'}
        />
    </React.Fragment>
  );
}

export default AccountPage;
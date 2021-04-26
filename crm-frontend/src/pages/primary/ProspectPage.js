import React from 'react';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/Table';
import ProspectForm from '../../components/forms/ProspectForm';
import accounting from 'accounting';
import { ProspectIcon } from '../../components/Icons';
import pageDescriptions from '../../components/pageDescriptions';

function ProspectPage(  ) {

  const columns = [
    { 
      id: '_id', 
      label: 'Prospect Id'
    }, { 
      id: 'prospectName', 
      label: 'Prospect Name'
    }, { 
      id: 'account', 
      label: 'Account',
      format: (account) => account ? account.accName : '-'
    }, { 
      id: 'prospectHolder', 
      label: 'Prospect Holder',
      format: (user) => `${user.name.firstName} ${user.name.lastName ? user.name.lastName : ''}`
    }, { 
      id: 'prospectAmount', 
      label: 'Amount',
      format: (n) => n ? accounting.formatMoney(n, "Rp", 2, ",", ".") : '-'
    }, { 
      id: 'GPM', 
      label: 'GPM',
      format: (n) => n ? n.toString() + '%' : '-'
    }, { 
      id: 'endUser', 
      label: 'End User',
      format: (endUser) => endUser ? endUser : '-'
    }, { 
      id: 'expectedSODate', 
      label: 'Expected SO Date',
      format: (date) => new Date(date).toString().substring(4, 15)
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
        title="Prospect Page" 
        subTitle={pageDescriptions.prospects}
        Icon={ProspectIcon}
      />
      <Table 
        columns={columns}
        baseURL={'/prospects'}
        Form={ProspectForm}
        TableIcon={ProspectIcon}
      />
    </React.Fragment>
  );
}

export default ProspectPage;

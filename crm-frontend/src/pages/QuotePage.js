// components
import React from 'react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import QuoteFormPage from './forms/QuoteFormPage';
import accounting from 'accounting';
import { QuoteIcon } from '../components/Icons';


function QuotePage( ) {

  const columns = [
    { 
      id: '_id', 
      label: 'Quote Id'
    }, { 
      id: 'prospect', 
      label: 'Prospect Name',
      format: (prospect) => prospect ? prospect.prospectName : ''
    }, { 
      id: 'user', 
      label: 'User Name',
      format: (user) => user ? `${user.name.firstName ? user.name.firstName : ''} ${user.name.middleName ? user.name.middleName : ''} ${user.name.lastName}` : ''
    }, { 
      id: 'amountQuoted', 
      label: 'Amount',
      format: (n) => n ? accounting.formatMoney(n, "Rp", 2, ",", ".") : ''
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
        title="Quote Page" 
        subTitle="description goes here"
        Icon={QuoteIcon}
      />
      <Table 
        columns={columns} 
        baseURL={'/quotes'} 
        Form={QuoteFormPage}
        TableIcon={QuoteIcon}
      />
    </React.Fragment>
  );
}

export default QuotePage;

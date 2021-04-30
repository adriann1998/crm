// components
import React from 'react';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/Table';
import QuoteForm from '../../components/forms/QuoteForm';
import accounting from 'accounting';
import { QuoteIcon } from '../../components/Icons';
import pageDescriptions from '../../components/pageDescriptions';

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
      id: 'amountQuoted', 
      label: 'Amount',
      format: (n) => n ? accounting.formatMoney(n, "Rp", 2, ",", ".") : ''
    }, { 
      id: 'createdAt', 
      label: 'Created At',
      format: (date) => new Date(date).toString().substring(4, 25)
    }
  ];

  return (
    <React.Fragment>
      <PageHeader 
        title="Quote Page" 
        subTitle={pageDescriptions.quotes}
        Icon={QuoteIcon}
      />
      <Table 
        columns={columns} 
        baseURL={'/quotes'} 
        Form={QuoteForm}
        TableIcon={QuoteIcon}
        appendable
      />
    </React.Fragment>
  );
}

export default QuotePage;

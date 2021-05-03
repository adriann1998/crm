// components
import React, { useContext } from 'react';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/Table';
import QuoteForm from '../../components/forms/QuoteForm';
import accounting from 'accounting';
import { QuoteIcon } from '../../components/Icons';
import pageDescriptions from '../../components/pageDescriptions';
import { UserContext } from '../../utils/Context';

function QuotePage( ) {

  const { user } = useContext(UserContext);

  const columns = [
    { 
      id: '_id', 
      label: 'Quote Id'
    }, { 
      id: 'prospect', 
      label: 'Account Name',
      format: (prospect) => prospect ? prospect.account.accName : ''
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
        baseURL={'/api/quotes'} 
        Form={QuoteForm}
        TableIcon={QuoteIcon}
        editable
        appendable={user && user.access === 'regular'}
      />
    </React.Fragment>
  );
}

export default QuotePage;

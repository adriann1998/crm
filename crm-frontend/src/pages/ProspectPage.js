import React from 'react';
import Title from '../components/Title';
import Table from '../components/Table';
import accounting from 'accounting';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';

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
      format: (account) => account ? account.accName : ''
    }, { 
      id: 'prospectAmount', 
      label: 'Prospect Amount',
      format: (n) => n ? accounting.formatMoney(n, "Rp", 2, ",", ".") : undefined
    }, { 
      id: 'GPM', 
      label: 'GPM',
      format: (n) => n ? n.toString() + '%' : undefined
    }, { 
      id: 'endUser', 
      label: 'End User'
    }, { 
      id: 'expectedDuration', 
      label: 'Expected Duration',
      format: (n) => n ? `${n} months` : ''
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
      <Title title="Prospect Page" />
      <Link to="/form/prospect">
          <AddButton />
        </Link>
      <Table columns={columns} baseURL={'/prospects'}/>
    </React.Fragment>
  );
}

export default ProspectPage;

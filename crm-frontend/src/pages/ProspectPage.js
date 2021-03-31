import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import Table from '../components/Table';
import accounting from 'accounting';
import { getData } from '../utils/GetPostDataUtil';

function ProspectPage() {

  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData('/prospects')
      .then(data => {
        if(mounted) {
          setProspects(data)
        }
      })
    return () => mounted = false;
  }, [])

  const columns = [
    { 
      id: 'prospectName', 
      label: 'Prospect Name', 
      minWidth: 100
    }, { 
      id: 'account', 
      label: 'Account', 
      minWidth: 100,
      format: (account) => account.accName
    }, { 
      id: 'endUser', 
      label: 'End User', 
      minWidth: 100
    }, { 
      id: 'prospectAmount', 
      label: 'Prospect Amount', 
      minWidth: 100,
      format: (n) => n ? accounting.formatMoney(n, "Rp", 2, ",", ".") : undefined
    }, { 
      id: 'GPM', 
      label: 'GPM', 
      minWidth: 100,
      format: (n) => n ? n.toString() + '%' : undefined
    }, { 
      id: 'endUser', 
      label: 'End User', 
      minWidth: 100
    }, { 
      id: 'expectedDuration', 
      label: 'Expected Duration', 
      minWidth: 100,
      format: (n) => `${n} months`
    }, { 
      id: 'createdAt', 
      label: 'Created At', 
      minWidth: 150,
      format: (date) => new Date(date).toString().substring(4, 15)
    }, { 
      id: 'updatedAt', 
      label: 'Updated At', 
      minWidth: 150,
      format: (date) => new Date(date).toString().substring(4, 15)
    }
  ];

  return (
    <React.Fragment>
      <Title title="Prospect Page" />
      <Table columns={columns} rows={prospects} />
    </React.Fragment>
  );
}

export default ProspectPage;

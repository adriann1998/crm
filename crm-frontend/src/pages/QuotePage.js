// components
import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import Table from '../components/Table';
import AddButton from '../components/AddButton';
import { getData } from '../utils/GetPostDataUtil';
import accounting from 'accounting';


function QuotePage() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData('/quotes')
      .then(data => {
        if(mounted) {
          setQuotes(data)
        }
      })
    return () => mounted = false;
  }, [])

  const columns = [
    { 
      id: '_id', 
      label: 'Quote Id', 
      minWidth: 100
    }, { 
      id: 'prospect', 
      label: 'Prospect Name', 
      minWidth: 100,
      format: (prospect) => prospect.prospectName
    }, { 
      id: 'user', 
      label: 'User Name', 
      minWidth: 100,
      format: (user) => `${user.name.firstName} ${user.name.middleName ? user.name.middleName : ''} ${user.name.lastName}`
    }, { 
      id: 'amountQuoted', 
      label: 'Amount', 
      minWidth: 100,
      format: (n) => accounting.formatMoney(n, "Rp", 2, ",", ".")
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

  const handleAdd = () => {
    alert("fsdfs")
  }

  return (
    <React.Fragment>
      <Title title="Quote Page" />
      <AddButton onClick={handleAdd} />
      <Table columns={columns} rows={quotes} />
    </React.Fragment>
  );
}

export default QuotePage;

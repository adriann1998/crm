import React, {useState, useEffect} from 'react';
import Title from '../components/Title';
import Table from '../components/Table';
import { getData } from '../utils/GetPostDataUtil';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';

function AccountPage() {
  
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData('/accounts')
      .then(data => {
        if(mounted) {
          setAccounts(data);
        }
      })
    return () => mounted = false;
  }, []);

  const columns = [
    { 
      id: 'accName', 
      label: 'Name', 
      minWidth: 200 
    }, { 
      id: 'accAlias', 
      label: 'Alias', 
      minWidth: 100 
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
        <Title title="Home Page" />
        <Link to="/form-account">
          <AddButton />
        </Link>
        <Table columns={columns} rows={accounts} />
    </React.Fragment>
  );
}

export default AccountPage;
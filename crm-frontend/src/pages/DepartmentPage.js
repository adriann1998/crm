import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import Table from '../components/Table';
import { getData } from '../utils/GetPostDataUtil';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';

function DepartmentPage() {

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData('/departments')
      .then(data => {
        if(mounted) {
          setDepartments(data)
        }
      })
    return () => mounted = false;
  }, [])

  const columns = [
    { 
      id: 'departmentName', 
      label: 'Name', 
      minWidth: 150
    }, { 
      id: 'director', 
      label: 'Director', 
      minWidth: 100,
      format: (director) => director ? `${director.name.firstName} ${director.name.lastName}` : '-'
    }, { 
      id: 'updatedAt', 
      label: 'Updated At', 
      minWidth: 150,
      format: (date) => new Date(date).toString().substring(4, 15)
    }
  ];

  return (
    <React.Fragment>
      <Title title="Department Page" />
      <Link to="/form-department">
          <AddButton />
        </Link> 
      <Table columns={columns} rows={departments} />
    </React.Fragment>
  );
}

export default DepartmentPage;

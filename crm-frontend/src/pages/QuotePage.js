// components
import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter, dateFilter } from 'react-bootstrap-table2-filter';
import AddIcon from '@material-ui/icons/Add';
import { Fab, IconButton } from '@material-ui/core';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// utilities
import { getData } from '../utils/GetPostDataUtil';
// external utilities
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

  const columns = [{
    dataField: '_id',
    text: 'Quote Id',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'prospect.prospectName',
    text: 'Prospect Name',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'user.name',
    text: "User Name",
    sort: true,
    filter: textFilter(), 
    formatter: (name) => `${name.firstName} ${name.middleName ? name.middleName : ''} ${name.lastName}`
  }, {
    dataField: 'amountQuoted',
    text: 'Amount',
    filter: numberFilter(),
    formatter: (n) => accounting.formatMoney(n, "Rp", 2, ",", ".")
  }, {
    dataField: 'createdAt',
    text: 'Created At',
    filter: dateFilter(),
    formatter: (date) => new Date(date).toString().substring(4, 15)
  }, {
    dataField: 'updatedAt',
    text: 'Last Updated',
    filter: dateFilter(),
    formatter: (date) => new Date(date).toString().substring(4, 15)
  }];

  const handleAdd = () => {
    alert("CLicked")
  }

  return (
    <React.Fragment>
      <Title title="Quote Page" />
      <IconButton onClick={handleAdd} className="addButton">
        <Fab color="primary" aria-label="add">
          <AddIcon/>
        </Fab>
      </IconButton>
      <BootstrapTable
            keyField="_id"
            data={ quotes }
            columns={ columns }
            filter={ filterFactory() }
            pagination={ paginationFactory() }
        />
    </React.Fragment>
  );
}

export default QuotePage;

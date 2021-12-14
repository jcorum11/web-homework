import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'

/* global fetch:false */

export function Home () {
  let { loading, error, data = {} } = useQuery(GetTransactions)
  const parseCsvString = (csvString) => {
    const csvLines = csvString.split(/\n/)
    console.log(csvLines)
    let row
    let id
    let userId
    let description
    let merchantId
    let debit
    let credit
    let amount
    const parsedRows = []
    for (let i = 1; i < csvLines.length; i++) {
      // id,user_id,description,merchant_id,debit,credit,amount
      row = csvLines[i].split(',')
      id = row[0]
      userId = row[1]
      description = row[2]
      merchantId = row[3]
      debit = row[4]
      credit = row[5]
      amount = row[6]
      row = {
        id,
        userId,
        description,
        merchantId,
        debit,
        credit,
        amount
      }
      parsedRows.push(row)
    }
    return parsedRows
  }
  if (data && Object.keys(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) {
    fetch('http://localhost:3000/data.csv')
      .then(response => response.text())
      .then(response => {
        data = parseCsvString(response)
        console.log(data)
      })
  }

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <TxTable data={data.transactions} />
    </Fragment>
  )
}

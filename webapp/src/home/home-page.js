import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'

export function Home() {
  let { loading, error, data = {} } = useQuery(GetTransactions)
  let parsedRows = []
  const setParsedRows = (parsedData) => {
    console.log(parsedData)
    parsedRows = parsedData
  }
  const parseCsvString = (csvString) => {
    const csvLines = csvString.split(/\n/)
    let row
    let id
    let userId
    let description
    let merchantId
    let debit
    let credit
    let amount
    const result = []
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
      result.push(row)
    }
    return result
  }
  const [dataIsReturned, setDataIsReturned] = useState(false)
  if (data && Object.keys(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) {
    fetch('http://localhost:3000/data.csv')
      .then(response => response.text())
      .then(response => parseCsvString(response))
      .then(parsedData => {
        setParsedRows(parsedData)
      })
      .then(() => {
        setDataIsReturned(true)
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
  console.log(parsedRows)
  return (
    <Fragment>
      {
        dataIsReturned ? <TxTable data={parsedRows} /> : <h1>Loading...</h1>
      }
    </Fragment>
  )
}

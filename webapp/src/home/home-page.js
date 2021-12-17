import React, { Fragment, useEffect, useState } from 'react'
import { TxTable } from '../components/transactions/TxTable'
import { useDispatch } from 'react-redux'
import { overwriteData } from '../store/parserSlice'

/* global fetch:false */

export function Home () {
  const dispatch = useDispatch()

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
  // if (data && Object.keys(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) {
  useEffect(() => {
    fetch('http://localhost:3000/data.csv')
      .then(response => response.text())
      .then(response => parseCsvString(response))
      .then(parsedData => {
        dispatch(overwriteData(parsedData))
      })
      .then(() => {
        setDataIsReturned(true)
      })
      .catch(e => {
        console.error('error: ', e)
      })
  }, [])

  return (
    <Fragment>
      {
        dataIsReturned ? <TxTable /> : <h1>Loading...</h1>
      }
    </Fragment>
  )
}

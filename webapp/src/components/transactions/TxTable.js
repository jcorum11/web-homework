import React, { Fragment, useEffect, useState } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import DataInput from '../DataInput'

const styles = css`
 .header {
   font-weight: bold;
 }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`
export function TxTable({ data }) {
  console.log(data)
  const dataMapped = data.map(row => {
    return row
  })
  const [parsedData, setParsedData] = useState(dataMapped)
  const addToTable = (inputData) => {
    setParsedData([...dataMapped, inputData])
  }
  const editTable = (editedData) => {
    setParsedData(editedData)
  }
  return (
    <Fragment>
      <table css={styles}>
        <tbody>
          <tr className='header'>
            <td >ID</td>
            <td >User ID</td>
            <td >Description</td>
            <td >Merchant ID</td>
            <td >Debit</td>
            <td >Credit</td>
            <td >Amount</td>
          </tr>
          {
            parsedData.map(tx => {
              const { id, userId, description, merchantId, debit, credit, amount } = tx
              return (
                <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                  <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                  <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                  <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                  <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                  <td data-testid={makeDataTestId(id, 'debit')}>{debit}</td>
                  <td data-testid={makeDataTestId(id, 'credit')}>{credit}</td>
                  <td data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <DataInput editTable={(e) => { editTable(e) }} addToTable={(e) => { addToTable(e) }} data={parsedData} />
    </Fragment >

  )
}


TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}

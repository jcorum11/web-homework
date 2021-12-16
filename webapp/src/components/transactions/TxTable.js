import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import DataInput from '../DataInput'
import { useSelector } from 'react-redux'

const styles = css`
 .header {
   font-weight: bold;
 }
 .header__cell {
   
 }
 .row__cell {
   padding: 0 2rem 0 0
 }

`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`
export function TxTable () {
  const parsedDataStore = useSelector(state => state.parser.value)
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
            parsedDataStore.map(tx => {
              const { id, userId, description, merchantId, debit, credit, amount } = tx
              return (
                <tr className='row' data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                  <td className='row__cell' data-testid={makeDataTestId(id, 'id')}>{id}</td>
                  <td className='row__cell' data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                  <td className='row__cell' data-testid={makeDataTestId(id, 'description')}>{description}</td>
                  <td className='row__cell' data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                  <td className='row__cell' data-testid={makeDataTestId(id, 'debit')}>{debit}</td>
                  <td className='row__cell' data-testid={makeDataTestId(id, 'credit')}>{credit}</td>
                  <td className='row__cell' data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <DataInput />
    </Fragment >

  )
}

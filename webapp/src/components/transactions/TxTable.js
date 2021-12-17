import React, { Fragment, useState } from 'react'
import { css } from '@emotion/core'
import DataInput from '../DataInput'
import { useSelector, useDispatch } from 'react-redux'
import { romanizeData, arabizeData } from '../../store/parserSlice'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable () {
  const parsedDataStore = useSelector(state => state.parser.value)
  const dispatch = useDispatch()
  const romanize = () => {
    dispatch(romanizeData())
    setRoman(true)
  }
  const [roman, setRoman] = useState(false)
  const arabize = () => {
    dispatch(arabizeData())
    setRoman(false)
  }
  return (
    <Fragment>
      <div css={featureContainer}>
        <div css={tableContainer}>
          <div css={tableSpacer}>
            <table className='table'>
              <tbody>
                <tr css={tableHeader}>
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
                        <td css={tableRowCell} data-testid={makeDataTestId(id, 'id')}>{id}</td>
                        <td css={tableRowCell} data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                        <td css={tableRowCell} data-testid={makeDataTestId(id, 'description')}>{description}</td>
                        <td css={tableRowCell} data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                        <td css={tableRowCell} data-testid={makeDataTestId(id, 'debit')}>{debit}</td>
                        <td css={tableRowCell} data-testid={makeDataTestId(id, 'credit')}>{credit}</td>
                        <td css={tableRowCell} data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          {roman ? <button css={romanizeBtn} onClick={arabize}>Arabize!</button> : <button css={romanizeBtn} onClick={romanize}>Romanize!</button>}
        </div>
        <DataInput />
      </div>
    </Fragment >
  )
}

const featureContainer = css`
display: flex;
justify-content: space-around;
`
const tableHeader = css`
font-weight: bold;
`
const tableRowCell = css`
padding: 0 2rem 0 0;
`
const tableContainer = css`
border: 1px solid;

border-radius: 1rem;
`
const romanizeBtn = css`
width: 100%;
border-bottom-right-radius: 1rem;
border-bottom-left-radius: 1rem;
padding: 0.5rem 0 0.5rem;
background-color: teal;
color: white;
`
const tableSpacer = css`
padding: 1rem 1rem 0 1rem;
`

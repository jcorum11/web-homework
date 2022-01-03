import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/core'
import { setTransaction, selectTransactionType } from '../../store/tableSlice'

const TransactionInput = () => {
  const dispatch = useDispatch()
  const transactionType = useSelector(selectTransactionType)
  const handleChange = (event) => {
    dispatch(setTransaction(event))
  }
  return (
    <Fragment>
      {transactionType && <label css={formLabel} htmlFor={transactionType}>{transactionType === 'Debit' ? 'Debit: ' : 'Credit: '}<input css={formInput} name={transactionType} onChange={e => handleChange(e.target.value)} type='text' /></label>}
    </Fragment>
  )
}

const formInput = css`
margin: 0 0 0 0.5rem;
`
const formLabel = css`
margin-left: 0.5rem;
`

export default TransactionInput

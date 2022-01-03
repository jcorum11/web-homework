import React from 'react'
import { useDispatch } from 'react-redux'
import { setTransactionType } from '../../store/tableSlice'

const TransactionTypeRadio = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    switch (event.target.value) {
      case 'Credit':
        // add value under credit from total
        dispatch(setTransactionType('Credit'))
        break
      case 'Debit':
        // subtract value under debit from total
        dispatch(setTransactionType('Debit'))
        break
    }
  }
  return (
    <div onChange={handleChange}>
      <label htmlFor='credit'>Credit</label>
      <input id='credit' name='transactionType' type='radio' value='Credit' />
      <label htmlFor='debit'>Debit</label>
      <input id='debit' name='transactionType' type='radio' value='Debit' />
    </div>
  )
}

export default TransactionTypeRadio

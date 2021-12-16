import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { updateData } from '../../store/parserSlice'

const EditForm = () => {
  const dispatch = useDispatch()
  let id = ''
  let userId = ''
  let description = ''
  let merchantId = ''
  let debit = ''
  let credit = ''
  let amount = ''
  let handleChange = (type, value) => {
    switch (type) {
      case 'id':
        id = value
        break
      case 'userId':
        userId = value
        break
      case 'description':
        description = value
        break
      case 'merchantId':
        merchantId = value
        break
      case 'debit':
        debit = value
        break
      case 'credit':
        credit = value
        break
      case 'amount':
        amount = value
        break
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const editedData = {
      id: id,
      userId: userId,
      description: description,
      merchantId: merchantId,
      debit: debit,
      credit: credit,
      amount: amount
    }
    dispatch(updateData(editedData))
  }

  return (
    <Fragment>
      <form id='editForm' onSubmit={e => handleSubmit(e)}>
        <label htmlFor='id'>ID</label>
        <input name='id' onChange={e => handleChange('id', e.target.value)} type='text' />
        <label htmlFor='userId'>User Id</label>
        <input name='userId' onChange={e => handleChange('userId', e.target.value)} type='text' />
        <label htmlFor='description'>Description</label>
        <input name='description' onChange={e => handleChange('description', e.target.value)} type='text' />
        <label htmlFor='merchantId'>Merchant Id</label>
        <input name='merchantId' onChange={e => handleChange('merchantId', e.target.value)} type='text' />
        <label htmlFor='debit'>Debit</label>
        <input name='debit' onChange={e => handleChange('debit', e.target.value)} type='text' />
        <label htmlFor='credit'>Credit</label>
        <input name='credit' onChange={e => handleChange('credit', e.target.value)} type='text' />
        <label htmlFor='amount'>Amount</label>
        <input name='amount' onChange={e => handleChange('amount', e.target.value)} type='text' />
      </form>
      <button form='editForm' type='submit'>Edit</button>
    </Fragment>
  )
}

export default EditForm

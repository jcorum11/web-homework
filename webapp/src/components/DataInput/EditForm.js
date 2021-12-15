import React, { Fragment } from 'react';

const EditForm = ({data, onsubmit}) => {
  const dataWritable = data.map(row => {
    return row
  })
  const newData = {}
  const handleSubmit = (e) => {
    e.preventDefault()
    dataWritable.forEach(row => {
      if (row.id === newData.id) {
        row.userId = newData.userId
        row.description = newData.description
        row.merchantId = newData.merchantId
        row.debit = newData.debit
        row.credit = newData.credit
        row.amount = newData.amount
      }
    })
    onsubmit('edit', dataWritable)
  }
  const handleChange = (dataType, value) => {
    newData[dataType] = value
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
      <button type='submit' form='editForm'>Edit</button>
    </Fragment>
  )
}

export default EditForm
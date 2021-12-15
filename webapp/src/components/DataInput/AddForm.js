import React, { Fragment } from 'react'

const AddForm = ({ onsubmit }) => {
  let id = ''
  let userId = ''
  let description = ''
  let merchantId = ''
  let debit = ''
  let credit = ''
  let amount = ''

  const setData = (type, data) => {
    switch(type) {
      case 'id':
        id = data
      case 'userId':
        userId = data
      case 'description':
        description = data
      case 'merchantId':
        merchantId = data
      case 'debit':
        debit = data
      case 'credit':
        credit = data
      case 'amount':
        amount = data
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id,
      userId,
      description,
      merchantId,
      debit,
      credit,
      amount
    }
    onsubmit('add', data)
  }
  return (
    <Fragment>
      <form id='addForm' onSubmit={handleSubmit}>
        <label htmlFor='id'>ID</label>
        <input name='id' onChange={e => setData('id', e.target.value)} type='text' />
        <label htmlFor='userId'>User Id</label>
        <input name='userId' onChange={e => setData('userId', e.target.value)} type='text' />
        <label htmlFor='description'>Description</label>
        <input name='description' onChange={e => setData('description', e.target.value)} type='text' />
        <label htmlFor='merchantId'>Merchant Id</label>
        <input name='merchantId' onChange={e => setData('merchantId', e.target.value)} type='text' />
        <label htmlFor='debit'>Debit</label>
        <input name='debit' onChange={e => setData('debit', e.target.value)} type='text' />
        <label htmlFor='credit'>Credit</label>
        <input name='credit' onChange={e => setData('credit', e.target.value)} type='text' />
        <label htmlFor='amount'>Amount</label>
        <input name='amount' onChange={e => setData('amount', e.target.value)} type='text' />
      </form>
      <button form='addForm' type='submit'>Add</button>
    </Fragment>
  )
}

export default AddForm

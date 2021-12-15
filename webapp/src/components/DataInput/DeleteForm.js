import React, { Fragment } from 'react'

const DeleteForm = () => {
  return (
    <Fragment>
      <form id='editForm' onSubmit={handleSubmit}>
        <label htmlFor='id'>ID</label>
        <input name='id' onChange={e => setId(e.target.value)} type='text' />
      </form>
      <button type='submit' form='deleteForm'>Delete</button>
    </Fragment>
  )
}

export default DeleteForm
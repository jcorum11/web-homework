import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { deleteData } from '../../store/parserSlice'

const DeleteForm = () => {
  const dispatch = useDispatch()
  let id = ''
  const handleChange = (inputId) => {
    id = inputId
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteData(id))
  }
  return (
    <Fragment>
      <form id='deleteForm' onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='id'>ID</label>
        <input name='id' onChange={e => handleChange(e.target.value)} type='text' />
      </form>
      <button form='deleteForm' type='submit'>Delete</button>
    </Fragment>
  )
}

export default DeleteForm

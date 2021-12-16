import React, { Fragment } from 'react'
import AddForm from './AddForm'
import DeleteForm from './DeleteForm'
import EditForm from './EditForm'

const DataInput = () => {
  return (
    <Fragment>
      <AddForm />
      <EditForm />
      <DeleteForm />
    </Fragment>
  )
}

export default DataInput

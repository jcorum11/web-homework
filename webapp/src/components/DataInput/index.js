import React, { Fragment } from 'react'
import AddForm from './AddForm'
import DeleteForm from './DeleteForm'
import EditForm from './EditForm'

const DataInput = ({ addToTable, editTable, data }) => {
  const onsubmit = (type, data) => {
    switch(type) {
      case 'add':
        addToTable(data)
        break
      case 'edit':
        editTable(data)
        break
    }
  }
  return (
    <Fragment>
      <AddForm onsubmit={e => { onsubmit('add', e) }} />
      <EditForm onsubmit={e => { onsubmit('edit', e) }} data={data} />
    </Fragment>
  )
}

export default DataInput

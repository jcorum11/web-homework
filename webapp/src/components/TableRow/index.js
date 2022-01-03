import React, { Fragment, useState } from 'react'
import { css } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentInputType, deleteData, setIdBeingHoveredOver, selectIdBeingHoveredOver, setActiveRow } from '../../store/tableSlice'
import Form from '../Form'
import { object } from 'prop-types'

const TableRow = ({ row }) => {
  const idBeingHoveredOver = useSelector(selectIdBeingHoveredOver)
  const [isRow, setIsRow] = useState(true)
  const dispatch = useDispatch()
  const handleClick = (type, id = undefined) => {
    switch (type) {
      case 'add':
        dispatch(setCurrentInputType(type))
        break
      case 'edit':
        dispatch(setCurrentInputType(type))
        setIsRow(false)
        dispatch(setActiveRow(id))
        break
      case 'delete':
        dispatch(deleteData(id))
        break
      case 'cancel':
        setIsRow(true)
    }
  }
  const handleHover = (id) => {
    dispatch(setIdBeingHoveredOver(id))
  }
  const Row = () => {
    return (
      <tr css={row} data-testid={`transaction-${row.id}`} onMouseEnter={() => handleHover(row.id)}>
        <td css={tableRowCell}>{row.id}</td>
        <td css={tableRowCell}>{row.userId}</td>
        <td css={tableRowCell}>{row.description}</td>
        <td css={tableRowCell}>{row.merchantId}</td>
        <td css={tableRowCell}>{row.debit}</td>
        <td css={tableRowCell}>{row.credit}</td>
        <td css={tableRowCell}>{row.amount}</td>
        <td><button css={idBeingHoveredOver === row.id ? buttonVisible : buttonHidden} onClick={() => handleClick('add', row.id)}>Add</button></td>
        <td><button css={idBeingHoveredOver === row.id ? buttonVisible : buttonHidden} onClick={() => handleClick('edit', row.id)}>Edit</button></td>
        <td><button css={idBeingHoveredOver === row.id ? buttonVisible : buttonHidden} onClick={() => handleClick('delete', row.id)}>Delete</button></td>
      </tr>
    )
  }
  return (
    <Fragment>
      {isRow ? <Row /> : <Form handleClick={handleClick} row={row} />}
    </Fragment>
  )
}

TableRow.propTypes = {
  row: object
}

const buttonHidden = css`
visibility: hidden;
`
const buttonVisible = css`
visibility: visible;
`
const tableRowCell = css`
padding: 0 2rem 0 0;
`

export default TableRow

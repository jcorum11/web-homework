import React, { Fragment, useState } from 'react'
import { css } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { deleteData, setIdBeingHoveredOver, selectIdBeingHoveredOver, setActiveRow, selectIsRowBeingEdited, setIsRowBeingEdited } from '../../store/tableSlice'
import Form from '../Form'
import { object } from 'prop-types'

const TableRow = ({ row }) => {
  const dispatch = useDispatch()
  const idBeingHoveredOver = useSelector(selectIdBeingHoveredOver)
  const [isRow, setIsRow] = useState(true)
  const [currentInputType, setCurrentInputType] = useState('')
  const isRowBeingEdited = useSelector(selectIsRowBeingEdited)
  const handleClick = (type, id = undefined) => {
    switch (type) {
      case 'add':
        setCurrentInputType(type)
        dispatch(setActiveRow(id))
        dispatch(setIsRowBeingEdited(true))
        break
      case 'edit':
        setIsRow(false)
        dispatch(setActiveRow(id))
        dispatch(setIsRowBeingEdited(true))
        dispatch(setCurrentInputType(type))
        break
      case 'delete':
        dispatch(deleteData(id))
        break
      case 'cancel':
        setIsRow(true)
        setCurrentInputType('')
        dispatch(setIsRowBeingEdited(false))
    }
  }
  const handleHover = (id) => {
    dispatch(setIdBeingHoveredOver(id))
  }

  const Buttons = () => {
    return (
      <Fragment>
        <td><button css={idBeingHoveredOver === row.id ? buttonVisible : buttonHidden} onClick={() => handleClick('add', row.id)}>Add</button></td>
        <td><button css={idBeingHoveredOver === row.id ? buttonVisible : buttonHidden} onClick={() => handleClick('edit', row.id)}>Edit</button></td>
        <td><button css={idBeingHoveredOver === row.id ? buttonVisible : buttonHidden} onClick={() => handleClick('delete', row.id)}>Delete</button></td>
      </Fragment>
    )
  }

  const Row = () => {
    return (
      <tr css={row} data-testid={`transaction-${row.id}`} onMouseEnter={() => handleHover(row.id)} onMouseLeave={() => handleHover('')}>
        <td css={tableRowCell}>{row.id}</td>
        <td css={tableRowCell}>{row.userId}</td>
        <td css={tableRowCell}>{row.description}</td>
        <td css={tableRowCell}>{row.merchantId}</td>
        <td css={tableRowCell}>{row.debit}</td>
        <td css={tableRowCell}>{row.credit}</td>
        <td css={tableRowCell}>{row.amount}</td>
        {!isRowBeingEdited && <Buttons />}
      </tr>
    )
  }
  return (
    <Fragment>
      {isRow ? <Row /> : <Form currentInputType={currentInputType} handleClick={handleClick} row={row} />}
      {currentInputType === 'add' && <Form currentInputType={currentInputType} handleClick={handleClick} row={row} />}
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
border-radius: 100px;
background-color: teal;
color: white;
`
const tableRowCell = css`
padding: 0 2rem 0 0;
`

export default TableRow

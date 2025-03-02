import React, { Fragment, useState } from 'react'
import { func, object, string } from 'prop-types'
import { useDispatch } from 'react-redux'
import { addRowBeneathId, setIsRowBeingEdited, updateData } from '../../store/tableSlice'
import { css } from '@emotion/core'

const Form = ({ handleClick, row, currentInputType }) => {
  const emptyRow = {
    id: '',
    userId: '',
    description: '',
    merchantId: '',
    debit: '',
    credit: '',
    amount: ''
  }
  const [inputValues, setInputValues] = useState(currentInputType === 'add' ? emptyRow : row)
  const dispatch = useDispatch()
  const handleSubmit = (type) => {
    const data = {
      id: inputValues.id,
      userId: inputValues.userId,
      description: inputValues.description,
      merchantId: inputValues.merchantId,
      debit: inputValues.debit,
      credit: inputValues.credit,
      amount: inputValues.amount
    }
    switch (type) {
      case 'add':
        dispatch(addRowBeneathId({ id: row.id, data }))
        dispatch(setIsRowBeingEdited(false))
        handleClick('cancel')
        break
      case 'edit':
        dispatch(updateData(data))
        dispatch(setIsRowBeingEdited(false))
        handleClick('cancel')
        break
    }
  }
  const handleChange = (type, e) => {
    switch (type) {
      case 'id':
        setInputValues({ ...inputValues, id: e.target.value })
        break
      case 'userId':
        setInputValues({ ...inputValues, userId: e.target.value })
        break
      case 'description':
        setInputValues({ ...inputValues, description: e.target.value })
        break
      case 'merchantId':
        setInputValues({ ...inputValues, merchantId: e.target.value })
        break
      case 'debit':
        setInputValues({ ...inputValues, debit: e.target.value })
        break
      case 'credit':
        setInputValues({ ...inputValues, credit: e.target.value })
        break
      case 'amount':
        setInputValues({ ...inputValues, amount: e.target.value })
        break
      default:
        break
    }
  }
  return (
    <Fragment>
      <tr >
        <td><input css={currentInputType === 'add' ? idInputHidden : inputStyle} name='id' onChange={(e) => handleChange('id', e)} type='text' value={inputValues.id} /></td>
        <td><input css={inputStyle} name='userId' onChange={(e) => handleChange('userId', e)} type='text' value={inputValues.userId} /></td>
        <td><input css={inputStyle} name='description' onChange={(e) => handleChange('description', e)} type='text' value={inputValues.description} /></td>
        <td><input css={inputStyle} name='merchantId' onChange={(e) => handleChange('merchantId', e)} type='text' value={inputValues.merchantId} /></td>
        <td><input css={inputStyle} name='debit' onChange={(e) => handleChange('debit', e)} type='text' value={inputValues.debit} /></td>
        <td><input css={inputStyle} name='credit' onChange={(e) => handleChange('credit', e)} type='text' value={inputValues.credit} /></td>
        <td><input css={inputStyle} name='amount' onChange={(e) => handleChange('amount', e)} type='text' value={inputValues.amount} /></td>
        <td><button css={btn} onClick={() => handleSubmit(currentInputType)} type='button'>{currentInputType === 'add' ? 'Add' : 'Update'}</button></td>
        <td><button css={btn} onClick={() => handleClick('cancel')} type='button'>Cancel</button></td>
      </tr>
      {}
    </Fragment>

  )
}

Form.propTypes = {
  handleClick: func,
  row: object,
  currentInputType: string
}

const idInputHidden = css`
visibility: hidden
`

const inputStyle = css`
background-color: teal;
color: white;
border-radius: 5px;
`

const btn = css`
border-radius: 100px;
background-color: teal;
color: white;
`

export default Form

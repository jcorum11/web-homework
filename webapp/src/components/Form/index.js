import React, { useState } from 'react'
import { func, object } from 'prop-types'
import { useDispatch } from 'react-redux'
import { pushData, updateData } from '../../store/tableSlice'

const Form = ({ handleClick, row }) => {
  const [inputValues, setInputValues] = useState(row)
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
        dispatch(pushData(data))
        break
      case 'edit':
        dispatch(updateData(data))
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
    <tr >
      <td><input name='id' onChange={(e) => handleChange('id', e)} type='text' value={inputValues.id} /></td>
      <td><input name='userId' onChange={(e) => handleChange('userId', e)} type='text' value={inputValues.userId} /></td>
      <td><input name='description' onChange={(e) => handleChange('description', e)} type='text' value={inputValues.description} /></td>
      <td><input name='merchantId' onChange={(e) => handleChange('merchantId', e)} type='text' value={inputValues.merchantId} /></td>
      <td><input name='debit' onChange={(e) => handleChange('debit', e)} type='text' value={inputValues.debit} /></td>
      <td><input name='credit' onChange={(e) => handleChange('credit', e)} type='text' value={inputValues.credit} /></td>
      <td><input name='amount' onChange={(e) => handleChange('amount', e)} type='text' value={inputValues.amount} /></td>
      <td><button onClick={() => handleSubmit('edit')} type='button'>Update</button></td>
      <td><button onClick={() => handleClick('cancel')} type='button'>Cancel</button></td>
    </tr>
  )
}

Form.propTypes = {
  handleClick: func,
  row: object
}

// const form = css`
// width: 100%;
// `
// const formBtn = css`
// height: 100%;
// border-top-left-radius: 1rem;
// border-bottom-left-radius: 1rem;
// width: 4rem;
// background-color: teal;
// color: white;
// `
// const formSection = css`
// display: grid;
// grid-template-columns: repeat(3, 1fr);
// margin: 1rem 0 0 0;
// `
// const formSectionBottom = css`
// margin-bottom: 2rem;
// `
// const formBorder = css`
// border: 1px solid;
// border-radius: 1rem;
// padding: 0;
// height: 100%;
// display: flex;
// `
// const formContainer = css`
// height: 11vh;
// margin-bottom: 1rem;
// `
// const formInput = css`
// margin: 0 0 0 0.5rem;
// `
// const formLabel = css`
// margin-left: 0.5rem;
// `

export default Form

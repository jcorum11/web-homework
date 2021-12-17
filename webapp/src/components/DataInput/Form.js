import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { deleteData, pushData, updateData } from '../../store/parserSlice'
import { css } from '@emotion/core'
import { string } from 'prop-types'

const Form = ({ formType }) => {
  const dispatch = useDispatch()
  let id = ''
  let userId = ''
  let description = ''
  let merchantId = ''
  let debit = ''
  let credit = ''
  let amount = ''

  const handleChange = (type, value) => {
    switch (type) {
      case 'id':
        id = value
        break
      case 'userId':
        userId = value
        break
      case 'description':
        description = value
        break
      case 'merchantId':
        merchantId = value
        break
      case 'debit':
        debit = value
        break
      case 'credit':
        credit = value
        break
      case 'amount':
        amount = value
        break
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let data
    if (formType !== 'Delete') {
      data = {
        id,
        userId,
        description,
        merchantId,
        debit,
        credit,
        amount
      }
    }
    switch (formType) {
      case 'Add':
        dispatch(pushData(data))
        break
      case 'Edit':
        dispatch(updateData(data))
        break
      case 'Delete':
        dispatch(deleteData(id))
        break
    }
  }

  const AddOrEditSections = () => {
    return (
      <Fragment>
        <div css={formSection}>
          <label css={label} htmlFor='id'>ID:<input css={input} name='id' onChange={e => handleChange('id', e.target.value)} type='text' /></label>
          <label css={label} htmlFor='userId'>User Id:<input css={input} name='userId' onChange={e => handleChange('userId', e.target.value)} type='text' /></label>
          <label css={label} htmlFor='description'>Description:<input css={input} name='description' onChange={e => handleChange('description', e.target.value)} type='text' /></label>
        </div>
        <div css={formSection}>
          <label css={label} htmlFor='merchantId'>Merchant Id:<input css={input} name='merchantId' onChange={e => handleChange('merchantId', e.target.value)} type='text' /></label>
          <label css={label} htmlFor='debit'>Debit:<input css={input} name='debit' onChange={e => handleChange('debit', e.target.value)} type='text' /></label>
          <label css={label} htmlFor='credit'>Credit:<input css={input} name='credit' onChange={e => handleChange('credit', e.target.value)} type='text' /></label>
        </div>
        <div css={[formSection, formSectionBottom]}>
          <label css={label} htmlFor='amount'>Amount:<input css={input} name='amount' onChange={e => handleChange('amount', e.target.value)} type='text' /></label>
        </div>
      </Fragment>
    )
  }

  const DeleteSection = () => {
    return (
      <div css={formSection}><label css={label} htmlFor='id'>ID:<input css={input} name='id' onChange={e => handleChange('id', e.target.value)} type='text' /></label></div>
    )
  }

  return (
    <Fragment>
      <div css={container}>
        <div css={border}>
          <button css={formBtn} form={`${formType}Form`} type='submit'>{formType}</button>
          <form css={form} id={`${formType}Form`} onSubmit={handleSubmit}>
            {(formType === 'Add' || formType === 'Edit') && <AddOrEditSections />}
            {(formType === 'Delete') && <DeleteSection />}
          </form>
        </div>
      </div>
    </Fragment>
  )
}

Form.propTypes = {
  formType: string
}

const form = css`
width: 100%;
`
const formBtn = css`
height: 100%;
border-top-left-radius: 1rem;
border-bottom-left-radius: 1rem;
width: 4rem;
background-color: teal;
color: white;
`
const formSection = css`
display: grid;
grid-template-columns: repeat(3, 1fr);
margin: 1rem 0 0 0;
`
const formSectionBottom = css`
margin-bottom: 2rem;
`
const border = css`
border: 1px solid;
border-radius: 1rem;
padding: 0;
height: 100%;
display: flex;
`
const container = css`
height: 11vh;
margin-bottom: 1rem;
`
const input = css`
margin: 0 0 0 0.5rem;
`
const label = css`
margin-left: 0.5rem;
`

export default Form

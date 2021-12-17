import React, { Fragment } from 'react'
import Form from './Form'
import { css } from '@emotion/core'

const DataInput = () => {
  return (
    <Fragment>
      <div css={dataInputContainer}>
        <Form formType='Add' />
        <Form formType='Edit' />
        <Form formType='Delete' />
      </div>
    </Fragment>
  )
}

const dataInputContainer = css`
width: 50%;
`

export default DataInput

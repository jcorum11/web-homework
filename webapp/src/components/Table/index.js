import React, { Fragment, useState } from 'react'
import { css } from '@emotion/core'
import { useSelector, useDispatch } from 'react-redux'
import { romanizeData, arabizeData, selectAllRows } from '../../store/tableSlice'
import TableRow from '../TableRow'

export function Table () {
  const allRows = useSelector(selectAllRows)
  const dispatch = useDispatch()
  const romanize = () => {
    dispatch(romanizeData())
    setRoman(true)
  }
  const [roman, setRoman] = useState(false)
  const arabize = () => {
    dispatch(arabizeData())
    setRoman(false)
  }
  return (
    <Fragment>
      <div css={featureContainer}>
        <div css={tableContainer}>
          <h3 css={header}>Hover over row for options to Add, Edit, or Delete</h3>
          <div css={tableSpacer}>
            <table className='table' data-testid='table'>
              <tbody>
                <tr css={tableHeader}>
                  <td>ID</td>
                  <td>User ID</td>
                  <td>Description</td>
                  <td>Merchant ID</td>
                  <td>Debit</td>
                  <td>Credit</td>
                  <td>Amount</td>
                </tr>
                {
                  allRows.map(row => {
                    const { id } = row
                    return (
                      <TableRow key={`transaction-${id}`} row={row} />
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          {roman ? <button css={tableRomanizeBtn} onClick={arabize}>Arabize!</button> : <button css={tableRomanizeBtn} onClick={romanize}>Romanize!</button>}
        </div>
        {/* <DataInput /> */}
      </div>
    </Fragment >
  )
}

const featureContainer = css`
display: flex;
justify-content: space-around;
`
const tableHeader = css`
font-weight: bold;
`
const tableContainer = css`
border: 1px solid;
border-radius: 1rem;
`
const tableRomanizeBtn = css`
width: 100%;
border-bottom-right-radius: 1rem;
border-bottom-left-radius: 1rem;
padding: 0.5rem 0 0.5rem;
background-color: teal;
color: white;
`
const tableSpacer = css`
padding: 1rem 1rem 0 1rem;
`
const header = css`
width: 100%;
text-align: center;
`

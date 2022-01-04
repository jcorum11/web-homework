import { createSlice } from '@reduxjs/toolkit'

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    allRows: [],
    currentTransaction: NaN,
    currentTransactionType: '',
    currentAmount: NaN,
    idBeingHoveredOver: '',
    activeRow: {},
    isRowBeingEdited: false
  },
  reducers: {
    pushData: (state, action) => {
      let lastRow = {}
      if (state.allRows.length > 0) {
        lastRow = state.allRows[state.allRows.length - 1]
      } else {
        // if there are no prior entries then amount will be 0
        lastRow.amount = 0
      }
      let calculatedAmount
      switch (state.currentTransactionType) {
        case 'Credit':
          calculatedAmount = Number(lastRow.amount) + Number(state.currentTransaction)
          action.payload.credit = Number(state.currentTransaction)
          break
        case 'Debit':
          calculatedAmount = Number(lastRow.amount) - Number(state.currentTransaction)
          action.payload.debit = Number(state.currentTransaction)
          break
        default:
          break
      }
      action.payload.amount = Number(calculatedAmount)
      state.allRows.push(action.payload)
    },
    overwriteData: (state, action) => {
      state.allRows = action.payload
    },
    updateData: (state, action) => {
      state.allRows.forEach((row, index) => {
        if (action.payload.id === row.id) {
          state.allRows.splice(index, 1, action.payload)
        }
      })
    },
    deleteData: (state, action) => {
      state.allRows.forEach((row, index) => {
        if (action.payload === row.id) {
          state.allRows.splice(index, 1)
        }
      })
    },
    romanizeData: (state) => {
      function romanize (num) {
        let lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
        let roman = ''
        let i
        for (i in lookup) {
          while (num >= lookup[i]) {
            roman += i
            num -= lookup[i]
          }
        }
        return roman
      }
      state.allRows.forEach((row) => {
        row.id = romanize(row.id)
      })
    },
    arabizeData: (state) => {
      function arabize (s) {
        let lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
        const array = s.split('')

        let arab = 0
        let current
        let currentValue
        let next
        let nextValue

        for (let i = 0; i < array.length; i++) {
          current = array[i]
          currentValue = lookup[current]

          next = array[i + 1]
          nextValue = lookup[next]

          if (currentValue < nextValue) {
            arab -= (currentValue)
          } else {
            arab += (currentValue)
          }
        }
        return arab
      }
      state.allRows.forEach((row) => {
        row.id = arabize(row.id)
      })
    },
    setCurrentTransactionType: (state, action) => {
      state.currentTransactionType = action.payload
    },
    setCurrentAmount: (state, action) => {
      state.currentAmount = Number(action.payload)
    },
    setCurrentTransaction: (state, action) => {
      state.currentTransaction = Number(action.payload)
    },
    setIdBeingHoveredOver: (state, action) => {
      state.idBeingHoveredOver = action.payload
    },
    setActiveRow: (state, action) => {
      for (let row of state.allRows) {
        if (row.id === action.payload) {
          state.activeRow = row
        }
      }
    },
    addRowBeneathId: (state, action) => {
      const allRowIds = state.allRows.map(row => {
        return Number(row.id)
      })
      state.allRows.forEach((row, index) => {
        if (row.id === action.payload.id) {
          action.payload.data.id = (Math.max(...allRowIds) + 1).toString()
          if (index !== state.allRows[state.allRows.length - 1]) {
            state.allRows.splice(index + 1, 0, action.payload.data)
          } else {
            state.allRows.push(action.payload.data)
          }
        }
      })
    },
    setIsRowBeingEdited: (state, action) => {
      state.isRowBeingEdited = action.payload
    }
  }
})

export const selectAllRows = state => state.table.allRows
export const selectCurrentTransaction = state => state.table.currentTransaction
export const selectCurrentAmount = state => state.table.currentAmount
export const selectIdBeingHoveredOver = state => state.table.idBeingHoveredOver
export const selectActiveRow = state => state.table.activeRow
export const selectIsRowBeingEdited = state => state.table.isRowBeingEdited
export const { pushData, overwriteData, updateData, deleteData, romanizeData, arabizeData, setCurrentTransactionType, setCurrentAmount, setCurrentTransaction, setIdBeingHoveredOver, setActiveRow, addRowBeneathId, setIsRowBeingEdited } = tableSlice.actions

export default tableSlice.reducer

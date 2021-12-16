import { createSlice } from '@reduxjs/toolkit'

export const parserSlice = createSlice({
  name: 'parser',
  initialState: {
    value: []
  },
  reducers: {
    pushData: (state, action) => {
      state.value.push(action.payload)
    },
    overwriteData: (state, action) => {
      state.value = action.payload
    },
    updateData: (state, action) => {
      state.value.forEach((row, index) => {
        if (action.payload.id === row.id) {
          state.value.splice(index, 1, action.payload)
        }
      })
    },
    deleteData: (state, action) => {
      state.value.forEach((row, index) => {
        if (action.payload === row.id) {
          state.value.splice(index, 1)
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
      state.value.forEach((row) => {
        row.id = romanize(row.id)
      })
    }
  }
})

export const { pushData, overwriteData, updateData, deleteData, romanizeData } = parserSlice.actions

export default parserSlice.reducer

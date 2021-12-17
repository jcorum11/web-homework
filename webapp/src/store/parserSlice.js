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
      state.value.forEach((row) => {
        row.id = arabize(row.id)
      })
    }
  }
})

export const { pushData, overwriteData, updateData, deleteData, romanizeData, arabizeData } = parserSlice.actions

export default parserSlice.reducer

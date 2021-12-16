import { configureStore } from '@reduxjs/toolkit'
import parserReducer from './parserSlice'

export default configureStore({
  reducer: {
    parser: parserReducer
  }
})

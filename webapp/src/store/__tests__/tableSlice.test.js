import reducer, { pushData, overwriteData, updateData, deleteData, romanizeData, arabizeData, setCurrentTransactionType, setCurrentAmount, setCurrentTransaction, setIdBeingHoveredOver, setActiveRow, addRowBeneathId, setIsRowBeingEdited } from '../tableSlice'

let previousState = {
  allRows: [
    {
      id: '40',
      userId: 'user1',
      description: 'a great description',
      credit: 110,
      amount: Math.random() * 1000
    },
    {
      id: '41',
      userId: 'user2',
      description: 'a great description',
      credit: 150,
      amount: Math.random() * 1000
    },
    {
      id: '42',
      userId: 'user3',
      description: 'a great description',
      credit: 150,
      amount: Math.random() * 1000
    }
  ],
  currentTransaction: Math.random() * 100,
  currentTransactionType: 'Credit',
  currentAmount: 0,
  idBeingHoveredOver: '',
  activeRow: {},
  isRowBeingEdited: false
}
let data = {
  id: '43',
  userId: 'user4',
  description: 'a deep blue something',
  credit: Math.random() * 100,
  amount: 0
}
const cleanup = () => {
  previousState = {
    allRows: [
      {
        id: '40',
        userId: 'user1',
        description: 'a great description',
        credit: 110,
        amount: Math.random() * 1000
      },
      {
        id: '41',
        userId: 'user2',
        description: 'a great description',
        credit: 150,
        amount: Math.random() * 1000
      },
      {
        id: '42',
        userId: 'user3',
        description: 'a great description',
        credit: 150,
        amount: Math.random() * 1000
      }
    ],
    currentTransaction: Math.random() * 100,
    currentTransactionType: 'Credit',
    currentAmount: 0,
    idBeingHoveredOver: '',
    activeRow: {},
    isRowBeingEdited: false
  }
  data = {
    id: '43',
    userId: 'user4',
    description: 'a deep blue something',
    credit: Math.random() * 100,
    amount: 0
  }
}
describe('parserSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      allRows: [],
      currentTransaction: NaN,
      currentTransactionType: '',
      currentAmount: NaN,
      idBeingHoveredOver: '',
      activeRow: {},
      isRowBeingEdited: false
    })
  })

  it('adds data to initial state with pushData', () => {
    const expected = JSON.parse(JSON.stringify(previousState))
    expected.allRows.push(data)
    const received = reducer(previousState, pushData(data))
    expect(received).toEqual(expected)
    cleanup()
  })

  it('adds new amount to previous amount when currentTransactionType is set to credit with pushData', () => {
    const received = reducer(previousState, pushData(data))
    expect(received.allRows[received.allRows.length - 1].amount).toEqual(previousState.allRows[previousState.allRows.length - 1].amount + previousState.currentTransaction)
    cleanup()
  })

  it('subtracts new amount from previous amount when transactionType is set to debit with pushData', () => {
    previousState.currentTransactionType = 'Debit'
    const received = reducer(previousState, pushData(data))
    expect(received.allRows[received.allRows.length - 1].amount).toEqual(previousState.allRows[previousState.allRows.length - 1].amount - previousState.currentTransaction)
    cleanup()
  })

  it('overwrites data with overwriteData', () => {
    const received = reducer(previousState, overwriteData(data))
    expect(received.allRows).toEqual(data)
    cleanup()
  })

  it('updates only the value whose id matches the id specified with updateData', () => {
    data.id = '42'
    const received = reducer(previousState, updateData(data))
    expect(received.allRows[received.allRows.length - 1]).toEqual(data)
    cleanup()
  })

  it('deletes the row with id specified with deleteData', () => {
    const received = reducer(previousState, deleteData(data))
    expect(received.allRows[0]).toEqual(expect.not.arrayContaining([data]))
    cleanup()
  })

  it('replaces numbers with the roman numeral equivalent with romanizeData', () => {
    const received = reducer(previousState, romanizeData())
    expect(received.allRows[0].id).toEqual('XL')
  })

  it('replaces roman numerals with the numeric equivalent arabizeData', () => {
    let previousState = {
      allRows: [
        {
          id: 'XL',
          userId: 'user1',
          description: 'a great description',
          credit: 110,
          amount: Math.random() * 1000
        },
        {
          id: 'XLI',
          userId: 'user2',
          description: 'a great description',
          credit: 150,
          amount: Math.random() * 1000
        },
        {
          id: 'XLII',
          userId: 'user3',
          description: 'a great description',
          credit: 150,
          amount: Math.random() * 1000
        },
      ],
      currentTransaction: Math.random() * 100,
      currentTransactionType: 'Credit',
      currentAmount: 0
    }
    const received = reducer(previousState, arabizeData())
    expect(received.allRows[0].id).toEqual(40)
    cleanup()
  })

  it('overwrites transactionType with setCurrentTransactionType', () => {
    const received = reducer(previousState, setCurrentTransactionType('Credit'))
    expect(received.currentTransactionType).toEqual('Credit')
    cleanup()
  })

  it('overwrites currentAmount with setCurrentAmount', () => {
    const received = reducer(previousState, setCurrentAmount('40'))
    expect(received.currentAmount).toEqual(40)
    cleanup()
  })

  it('overwrites currentTransaction with setCurrrentTransaction', () => {
    const received = reducer(previousState, setCurrentTransaction('20'))
    expect(received.currentTransaction).toEqual(20)
    cleanup()
  })

  it('overwrites idBeingHoveredOver with setIdBeingHoveredOver', () => {
    const received = reducer(previousState, setIdBeingHoveredOver('42'))
    expect(received.idBeingHoveredOver).toEqual('42')
    cleanup()
  })
  it('gets the active row being edited and overwrites activeRow with setActiveRow', () => {
    const received = reducer(previousState, setActiveRow('42'))
    expect(received.activeRow).toEqual(previousState.allRows[2])
    cleanup()
  })
  it('adds a row beneath a defined id, assigns an auto-incrementing id, and calculates amount with addRowBeneathId', () => {
    delete data.id
    const received = reducer(previousState, addRowBeneathId({id: '42', data}))
    const oldData = JSON.parse(JSON.stringify(data))
    cleanup()
    data.id = '43'
    data.credit = oldData.credit
    expect(received.allRows[3]).toEqual(data)
  })
  it('overwrites isRowBeingEdited with setIsRowBeingEdited', () => {
    const received = reducer(previousState, setIsRowBeingEdited(true))
    expect(received.isRowBeingEdited).toEqual(true)
    cleanup()
  })
})

import reducer, { pushData, overwriteData, updateData, deleteData, romanizeData, arabizeData, setCurrentTransactionType, setCurrentAmount, setCurrentTransaction, setCurrentInputType, setIdBeingHoveredOver, setIsRow, setActiveRow } from '../tableSlice'

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
  currentInputType: '',
  idBeingHoveredOver: '',
  isRow: true,
  activeRow: {}
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
    currentInputType: '',
    idBeingHoveredOver: '',
    isRow: true,
    activeRow: {}
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
      currentInputType: '',
      idBeingHoveredOver: '',
      isRow: true,
      activeRow: {}
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
    const returned = reducer(previousState, updateData(data))
    expect(returned.allRows[returned.allRows.length - 1]).toEqual(data)
    cleanup()
  })

  it('deletes the row with id specified with deleteData', () => {
    const returned = reducer(previousState, deleteData(data))
    expect(returned.allRows[0]).toEqual(expect.not.arrayContaining([data]))
    cleanup()
  })

  it('replaces numbers with the roman numeral equivalent with romanizeData', () => {
    const returned = reducer(previousState, romanizeData())
    expect(returned.allRows[0].id).toEqual('XL')
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
    const returned = reducer(previousState, arabizeData())
    expect(returned.allRows[0].id).toEqual(40)
    cleanup()
  })

  it('overwrites transactionType with setCurrentTransactionType', () => {
    const returned = reducer(previousState, setCurrentTransactionType('Credit'))
    expect(returned.currentTransactionType).toEqual('Credit')
    cleanup()
  })

  it('overwrites currentAmount with setCurrentAmount', () => {
    const returned = reducer(previousState, setCurrentAmount('40'))
    expect(returned.currentAmount).toEqual(40)
    cleanup()
  })

  it('overwrites currentTransaction with setCurrrentTransaction', () => {
    const returned = reducer(previousState, setCurrentTransaction('20'))
    expect(returned.currentTransaction).toEqual(20)
    cleanup()
  })

  it('overwrites currentInputType with setCurrentInputType', () => {
    const returned = reducer(previousState, setCurrentInputType('add'))
    expect(returned.currentInputType).toEqual('add')
    cleanup()
  })

  it('overwrites idBeingHoveredOver with setIdBeingHoveredOver', () => {
    const returned = reducer(previousState, setIdBeingHoveredOver('42'))
    expect(returned.idBeingHoveredOver).toEqual('42')
    cleanup()
  })
  it('overwrites isRow with setIsRow', () => {
    const returned = reducer(previousState, setIsRow('42'))
    expect(returned.isRow).toEqual('42')
    cleanup()
  })
  it('gets the active row being edited and overwrites activeRow with setActiveRow', () => {
    const received = reducer(previousState, setActiveRow('42'))
    expect(received.activeRow).toEqual(previousState.allRows[2])
    cleanup()
  })
})
const AppReducer = (state, action) => {

  if (action.type === "ADD_TRANSACTION") {
    return {
      ...state,
      transactions: [action.payload, ...state.transactions],
      pagedTransactions: [action.payload, ...state.pagedTransactions],
      loading: false,
    }
  }

  if (action.type === "SET_TRANSACTIONS") {
    return {
      ...state,
      transactions: action.payload,
      loading: false,
    }
  }

  if (action.type === "SET_PAGEDTRANSACTIONS") {
    return {
      ...state,
      pagedTransactions: action.payload.data,
      totalPages: action.payload.totalPages,
      loading: false,
    }
  }

  if (action.type === "DELETE_TRANSACTION") {
    return {
      ...state,
      transactions: [...state.transactions.filter(t => t._id !== action.payload)],
      pagedTransactions: [...state.pagedTransactions.filter(t => t._id !== action.payload)],
      loading: false,
    }
  }

  if (action.type === "SET_BUDGETS") {
    return {
      ...state,
      budgets: action.payload,
      loading: false,
    }
  }

   if (action.type === "UPDATE_BUDGETS") {
    return {
      ...state,
      budgets: action.payload,
      loading: false,
    }
  }


  if(action.type === "SET_ERROR"){
    return {
      ...state,
      error: action.payload,
      loading: false,
    }
  }

  // default case
  return {...state}
}

export default AppReducer
const API_URL = import.meta.env.VITE_API_URL

// fetch all transactions
const fetchAllTransactions = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_URL}`, {
        headers: { authorization: "Bearer " + token }
    })

    if (!res.ok) throw new Error("Failed to fetch transactions")

    const data = await res.json()
    return data.data
}

// fetch paged transactions
const fetchPagedTransactions = async (currentPage, limit) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_URL}?page=${currentPage}&&limit=${limit}`, {
        headers: { authorization: "Bearer " + token }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    
    return data
}

// add transaction
const addTransaction = async (transaction) => {
    const token = localStorage.getItem("token")

    const res = await fetch(API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify(transaction)
        })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error)

    return data.data
}

// delete transaction
const deleteTransaction = async (id) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/${id}`,
        {
            method: "DELETE",
            headers: { "authorization": "Bearer " + token }
        }
    )

    let data = await res.json()
    if (!res.ok) throw new Error(data.error)

    return data.data.id

}

// fetch budgets
const fetchBudgets = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_URL}/budgets`, {
        headers: 
            { authorization: "Bearer " + token
            },
        
    })

    if (!res.ok) throw new Error("Failed to fetch budgets")

    const data = await res.json()
    return data.data
}

// update budgets
const updateBudgets = async (updatedData) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_URL}/budgets`, {
        headers: 
            { authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
        method: "PUT",
        body: JSON.stringify(updatedData)
    })

    if (!res.ok) throw new Error("Failed update budgets")

    const data = await res.json()
    return data.data
}

const appServices = {
    addTransaction,
    fetchAllTransactions,
    fetchPagedTransactions,
    deleteTransaction,
    fetchBudgets,
    updateBudgets
}

export default appServices
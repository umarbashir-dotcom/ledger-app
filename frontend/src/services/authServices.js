const authServices = {    
    login: async (loginData) => {
        const res = await fetch(`${import.meta.env.VITE_USER_API}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
        const data = await res.json()
        console.log(res.ok)
        if (!res.ok) throw new Error(data.error)
        return data
    },

    logout: () => {
        localStorage.removeItem("token")
        return {
            isAuthenticated: false,
            token: "",
            loading:true
        }
    },

    register: async (registerData) => {
        const res = await fetch(`${import.meta.env.VITE_USER_API}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerData)
            })
        const data = await res.json()

        if (!res.ok) throw new Error(data.error)
        return data
    }
}

export default authServices;
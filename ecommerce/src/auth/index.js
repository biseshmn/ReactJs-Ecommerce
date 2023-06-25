import { API } from "../config";

//for sign up
export const signup = user => {
    return fetch(`${API}/postuser`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    })

        .then(res => {
            return res.json()
        })

        .catch(err => console.log(err))
}

//for sign in
export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },

        body: JSON.stringify(user)
    })

        .then(res => {
            return res.json()
        })

        .catch(err => console.log(err))
}


//authenticate to store token in the local storage
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}

//redirect user by role if authenticated
export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false
    }
    else if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else {
        return false
    }
}


//signout
export const signOut = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt', JSON.stringify('jwt'))
        next()
        
        return fetch(`${API}/signout`, {
            method: "POST"
        })
        
            .then(res => {
                console.log('signOut', res)
            })

            .catch(err => console.log(err))
    }
}


//forgot password
export const forgetpassword = email => {
    return fetch(`${API}/forgetpassword`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(email)
    })

        .then(res => {
            return res.json()
        })

        .catch(err => console.log(err))
}


// export const userdetail = password => {
//     return fetch(`${API}/resetpassword`, {
//         method: "PUT",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify(password)
//     })

//         .then(res => {
//             return res.json()
//         })

//         .catch(err => console.log(err))
// }
import { useReducer, useEffect } from 'react'
import axios from 'axios'
axios.defaults.validateStatus = code => code < 500

const baseURL = 'http://notedev03:8080/'

const INITIAL_STATE = {
    loading: false,
    data: {},
    error: ''
}

const reducer = (state, action) => {
    if (action.type === 'REQUEST') {
        return {
            ...state,
            loading: true
        }
    }
    if (action.type === 'SUCCESS') {
        return {
            ...state,
            loading: false,
            data: action.data
        }
    }
    if (action.type === 'FAILURE') {
        return {
            ...state,
            loading: false,
            error: action.error,
            code: action.code
        }
    }
    return state
}

const getAuth = () => {
    const token = localStorage.getItem('token')
    if (token) {
        return 'Bearer ' + token
    }
    return ''
}

const header = { headers: { Authorization: getAuth() } }

const init = () => {
    const useGet = (resource, isAuth) => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

        const carregar = async () => {
            try {
                dispatch({ type: 'REQUEST' })
                let res
                if (isAuth) {
                    res = await axios.get(baseURL + resource, header)
                }
                else {
                    res = await axios.get(baseURL + resource)
                }
                if (res.data.error && Object.keys(res.data.error).length > 0) {
                    dispatch({ type: 'FAILURE', error: res.data.error })
                } else {
                    dispatch({ type: 'SUCCESS', data: res.data })
                }
            } catch (error) {
                dispatch({ type: 'FAILURE', error: 'unknow error' })
            }
        }

        useEffect(() => {
            carregar()
        }, [resource])

        return {
            ...data,
            refetch: carregar
        }
    }

    const usePost = (resource, isAuth) => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

        const post = async (data) => {
            dispatch({ type: 'REQUEST' })
            let res
            if (isAuth) {
                res = await axios.post(baseURL + resource, data, header)
            } else {
                res = await axios.post(baseURL + resource, data)
            }
            dispatch({
                type: 'SUCCESS',
                data: res.data
            })
        }
        return [data, post]
    }

    return {
        useGet,
        usePost
    }
}

export default init
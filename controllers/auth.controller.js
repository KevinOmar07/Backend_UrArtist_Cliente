import {response} from 'express'

const login = async (req, res = response) => {

    res.json({
        msg: 'Login OK'
    })
}

export const authController = {
    login
}
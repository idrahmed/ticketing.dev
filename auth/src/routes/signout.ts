import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
    // we'll set the session obj on the req obj to null, removing any user details.
    req.session = null

    res.send({})
})

export { router as signoutRouter }
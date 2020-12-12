import path from 'path'
import express from 'express'
import serverRenderer from './middlewares/serverRenderer'
import auth from './middlewares/auth'

const PORT = process.env.PORT || 3000

const app = express()
const router = express.Router()

router.use('^/$', auth, serverRenderer)

// Serve static files from build folder
router.use(express.static(path.resolve(__dirname, '..', 'build')))

// Add SSR in all routes
router.use('*', auth, serverRenderer)

app.use(router)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

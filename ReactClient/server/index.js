import path from 'path'
import express from 'express'
import serverRenderer from './middlewares/serverRenderer'

const PORT = process.env.PORT || 3000

const app = express();
const router = express.Router();

router.use('^/$', serverRenderer);

// Serve static files from build folder
router.use(express.static(path.resolve(__dirname, '..', 'build')));

// Add SSR in all routes
router.use('*', serverRenderer);

app.use(router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
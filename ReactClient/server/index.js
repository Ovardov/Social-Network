import express from 'express'
import serverRenderer from './middlewares/serverRenderer'

const PORT = process.env.PORT || 3000

const app = express();
const router = express.Router();

// Add SSR in all routes
router.use('*', serverRenderer);
// Serve static files in build folder
router.use(express.static('build'));

app.use(router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
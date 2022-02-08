import express from 'express'

const router = express.Router()
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded());
router.route('/github')
    .post((req, res) => {
        if (!req.headers['x-github-event']) {
            console.error('Not a GitHub event !');
            res.status(400).send('Webhook Error: Invalid event type')
            return;
        }
        res.status(200).send('Webhook received')
        console.log("Github Event: " + req.headers['x-github-event']);
    })


export default router
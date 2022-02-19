import express from 'express'
import {gh_pull_request, gh_push, gh_star} from "../event/action/Github/github";

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

        const body = JSON.parse(req.body.payload);
        console.log("GitHub event received: " + req.headers['x-github-event'] + " - " + body.action);

        const sender = body.sender.login;
        // TODO; Verify if the sender is in our database


        res.status(200).send('Webhook received')

        // Get the event type and call the associated function
        switch (req.headers['x-github-event']) {
            case 'push':
                gh_push(req.headers, body);
                break;
            case 'pull_request':
                gh_pull_request(req.headers, body);
                break;
            case 'star':
                gh_star(body);
                break;
            default:
                console.error('Unsupported event type: ' + req.headers['x-github-event']);
                break;
        }
    })


export default router
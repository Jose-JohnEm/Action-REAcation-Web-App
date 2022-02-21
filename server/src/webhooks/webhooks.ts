import express from 'express'
import {gh_commit, gh_fork, gh_pull_request, gh_push, gh_star} from "../event/action/Github/github";

const router = express.Router()
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded());
router.route('/github').post((req, res) => {
    if (!req.headers['x-github-event']) {
        console.error('Not a GitHub event !');
        res.status(400).send('Webhook Error: Invalid event type')
        return;
    }

    const body = JSON.parse(req.body.payload);
    const event = req.headers['x-github-event'].toString();

    console.log("GitHub event received: " + event + " - " + body.action);

    const sender = body.sender.login;
    // TODO; Verify if the sender is in our database

    res.status(200).send('Webhook received')


    // Create list of event and call the corresponding function
    let events = {
        'pull_request': gh_pull_request,
        'push': gh_push,
        'star': gh_star,
        'fork': gh_fork,
        'commit': gh_commit,
    }

    if (!events[event]) {
        console.error('Github, Unsupported event type!');
        return;
    }
    events[event](body);
});


export default router
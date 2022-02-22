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
    res.status(200).send('Webhook received')

    const body = JSON.parse(req.body.payload);
    const event = req.headers['x-github-event'].toString();
    const sender = body.sender.login;
    const repo = body.repository.full_name;
    console.log("GitHub event received: " + event + " - " + body.action);

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
    events[event](body, sender, repo);
});


export default router
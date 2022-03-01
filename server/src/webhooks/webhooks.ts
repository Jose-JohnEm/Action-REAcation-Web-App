import express from 'express'
import {gh_fork, gh_pull_request, gh_push, gh_star} from "../event/action/Github/github";
import pt_story_create from "../event/action/PivotalTracker/pivotal";

const router = express.Router()

router.use(express.json());
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

    let events = {
        'star': gh_star,
        'push': gh_push,
        'pull_request': gh_pull_request,
        'fork': gh_fork,
    }

    if (!events[event]) {
        console.error('Github, Unsupported event type!');
        return;
    }
    events[event](body, sender, repo);
});

router.route('/pivotal').post((req, res) => {
    if (!req.body) {
        console.error('Not a Pivotal Tracker event !');
        res.status(400).send('Webhook Error: Invalid event type')
        return;
    }
    res.status(200).send('Webhook received')
    const activity = req.body;
    console.log(activity);
    console.log(activity.kind + " / " + activity.highlight + " / " + activity.message);

    // story_update_activity as many highlighs
    // project_membership_create_activity
    let events = {
        'story_create_activity': pt_story_create
    }
    if (!events[activity.kind]) {
        console.error('Pivotal, Unsupported event type!');
        return;
    }
    events[activity.kind](activity);
});

router.route('/teams').post((req, res) => {
    console.log(req);

    res.status(200).json({
        "type": "message",
        "text": "Action Received !"
    })
});

export default router
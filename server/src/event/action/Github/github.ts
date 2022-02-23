// When receiving a push event from GitHub, we want to update the
// corresponding repository's status.

import {getUserFromGithubAction} from "../../../db/event";

const gh_push = async function (body, sender, repo) {
    console.log("Github push event received.");
    // Get the user getUserFromGithubAction("new_push", sender, repo); and save it to a const
    const user = await getUserFromGithubAction("new_push", sender, repo);
    if (!user) {
        console.log("No user found for this push event: " + sender + " | " + repo);
        return;
    }
    // Get the name of the person who pushed, the name of the repository, and the number of commits, the tille of the head commit, and the url of the head commit
    const {pusher, repository, commits} = body;
    const {name, url} = repository;
};

const gh_pull_request = function (body, sender, repo) {
    // console.log(headers);
    // console.log(body);
};

const gh_star = function (body, sender, repo) {
    if (body.action == "created") {
        getUserFromGithubAction("new_star", sender, repo)
        console.log("The user " + body.sender.login + " starred the repo " + repo);
    } else if (body.action == "deleted") {
        console.log("The user " + body.sender.login + " unstarred the repo " + body.repository.full_name + " :(");
    }

};

const gh_commit = function (body, sender, repo) {

}

const gh_fork = function (body, sender, repo) {
    console.log("Fork !!");
}

export {gh_push, gh_pull_request, gh_star, gh_commit, gh_fork};
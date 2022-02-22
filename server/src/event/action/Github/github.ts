// When receiving a push event from GitHub, we want to update the
// corresponding repository's status.

import {getUserFromGithubAction} from "../../../db/event";

const gh_push = function (headers, body) {
    console.log("Headers: " + JSON.stringify(headers) + "\nBody: " + JSON.stringify(body));
    console.log("Github push event received.");
};

const gh_pull_request = function (headers, body) {
    // console.log(headers);
    // console.log(body);
};

const gh_star = function (body, sender, repo) {
    if (body.action == "created") {
        getUserFromGithubAction("new_star", sender, repo)
        console.log("The user " + body.sender.login + " starred the repo " + repo);
    } else if (body.action == "deleted") {
        console.log(body);
        console.log("The user " + body.sender.login + " unstarred the repo " + body.repository.full_name + " :(");
    }

};

const gh_commit = function (body) {

}


const gh_fork = function (body) {
    console.log("Fork !!");
}

export {gh_push, gh_pull_request, gh_star, gh_commit, gh_fork};
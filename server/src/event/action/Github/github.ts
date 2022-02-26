// When receiving a push event from GitHub, we want to update the
// corresponding repository's status.

import {getUserFromGithubAction, getUserReaction} from "../../../db/event";
import handleReactions from "../../reaction/msg_sender";

const gh_push = async function (body, sender, repo) {
    // const user = await getUserFromGithubAction("new_push", sender, repo);
    // if (!user) {
    //     console.log("No user found for this push event: " + sender + " | " + repo);
    //     return;
    // }
    // const {pusher, repository, commits} = body;
    // console.log("Pusher: " + pusher);
    // console.log("Repository: " + repository);
    // console.log("Commits: " + commits);
    // const {name, url} = repository;


};

const gh_pull_request = async function (body, sender, repo) {
    // const user = await getUserFromGithubAction("new_push", sender, repo);
};

const gh_star = async function (body, sender, repo) {
    let action = null;
    if (body.action == "created") {
        action = "new_star"
    } else if (body.action == "deleted") {
        action = "rm_star"
    }
    const users = await getUserFromGithubAction(action, repo)

    if (!users)
        return

    let message = "The user " + sender + " starred " + repo;
    if (action == "rm_star")
        message = "The user " + sender + " unstarred " + repo;

    let actionParams = {"repository": repo};
    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "github", action, actionParams)
        handleReactions(reaction.service, reaction.name, {"message": message})
    });

};

const gh_fork = function (body, sender, repo) {
    console.log("Fork !!");
}

export {gh_push, gh_pull_request, gh_star, gh_fork};
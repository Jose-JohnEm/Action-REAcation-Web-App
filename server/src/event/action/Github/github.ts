// When receiving a push event from GitHub, we want to update the
// corresponding repository's status.

import {getUserFromGithubAction, getUserReaction} from "../../../db/event";
import handleReactions from "../../reaction/msg_sender";

const gh_push = async function (body, sender, repo) {
    const users = await getUserFromGithubAction("new_push", repo)
    if (!users) {
        console.log("No user found for this push event: " + repo);
        return;
    }

    const {pusher, repository, commits} = body;

    const message = pusher.name + " push " + commits.length + " commit(s) on " + repo + "\nHead commit is \"" + body.head_commit.message + "\""

    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "github", "new_push", {"repository": repo})
        handleReactions(reaction.service, reaction.name, {"message": message})
    });
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

    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "github", action, {"repository": repo})
        handleReactions(reaction.service, reaction.name, {"message": message})
    });

};

const gh_fork = function (body, sender, repo) {
    console.log("Fork !!");
}

export {gh_push, gh_pull_request, gh_star, gh_fork};
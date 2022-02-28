import {getUserFromGithubAction, getUserReaction} from "../../../db/event";
import handleReactions from "../../reaction/reaction";

const gh_push = async function (body, sender, repo) {
    if (body.commits.length == 0)
        return;

    const users = await getUserFromGithubAction("new_push", repo)
    if (!users) {
        console.log("No user found for this push event: " + repo);
        return;
    }

    const {pusher, commits} = body;
    const message = pusher.name + " push " + commits.length + " commit(s) on " + repo + "\nHead commit is \"" + body.head_commit.message + "\""

    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "github", "new_push", {"repository": repo})
        handleReactions(user, reaction.service, reaction.name, {"message": message})
    });
};

const gh_pull_request = async function (body, sender, repo) {
    const state = body.action;

    let action;
    if (state == "open")
        action = "new_pull_request";
    else if (state == "closed")
        action = "closed_pull_request";
    else
        return;

    const users = await getUserFromGithubAction(action, repo)
    if (!users) {
        console.log("No user found for this pull_request event: " + repo);
        return;
    }

    let message;
    if (state == "open") {
        const {pull_request} = body;
        message = pull_request.user.login + " opened a pull request on " + repo + "\nTitle: \"" + pull_request.title + "\""
    } else if (state == "closed") {
        const {pull_request} = body;
        message = pull_request.user.login + " closed a pull request on " + repo + "\nTitle: \"" + pull_request.title + "\""
    }

    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "github", action, {"repository": repo})
        handleReactions(user, reaction.service, reaction.name, {"message": message})
    });
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
        handleReactions(user, reaction.service, reaction.name, {"message": message})
    });

};

const gh_fork = async function (body, sender, repo) {
    console.log(JSON.parse(JSON.stringify(body)))
    const users = await getUserFromGithubAction("new_fork", repo);

    if (!users)
        return

    const {forkee} = body;
    let message = forkee.owner.login + " forked " + repo + " repository to " + forkee.full_name;

    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "github", "new_fork", {"repository": repo})
        handleReactions(user, reaction.service, reaction.name, {"message": message})
    });
}

export {gh_push, gh_pull_request, gh_star, gh_fork};
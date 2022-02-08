// When receiving a push event from GitHub, we want to update the
// corresponding repository's status.

var gh_push = function (headers, body) {
    // console.log(headers);
    // console.log(body);
}

var gh_pull_request = function (headers, body) {
    // console.log(headers);
    // console.log(body);
}

var gh_star = function (body) {
    if (body.action == "created") {
        console.log(body);
        console.log("The user " + body.sender.login + " starred the repo " + body.repository.full_name);
    } else if (body.action == "deleted") {
        console.log(body);
        console.log("The user " + body.sender.login + " unstarred the repo " + body.repository.full_name + " :(");
    }

}

export {gh_push, gh_pull_request, gh_star}
import {getUserFromPivotalTrackerAction, getUserReaction} from "../../../db/event";
import handleReactions from "../../reaction/reaction";

const pt_story_create = async function (activity) {
    const {project, performed_by} = activity;
    project.id = project.id.toString();
    const users = await getUserFromPivotalTrackerAction(activity.kind, project.id)

    if (users.length == 0) {
        console.error('No user found for this action');
        return;
    }

    const message = `PivotalTracker, ${performed_by.name} created a new story in ${project.name}`;

    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "pivotaltracker", activity.kind, {"projectId": project.id});
        handleReactions(user, reaction, {"message": message})
    });
}

export default pt_story_create;
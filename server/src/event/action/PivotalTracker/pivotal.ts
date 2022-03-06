import {getUserFromPivotalTrackerAction, getUserReaction} from "../../../db/event";
import handleReactions from "../../reaction/reaction";

/**
 * Handle the pivotal story create event
 * @param activity The information about the event
 */
export const pt_story_create = async function (activity) {
    const {project, performed_by} = activity;
    project.id = project.id.toString();
    const type = "story_create";
    const users = await getUserFromPivotalTrackerAction(type, project.id)

    if (users.length == 0) {
        console.error('No user found for this action');
        return;
    }

    const message = `PivotalTracker, ${performed_by.name} created a new story in ${project.name}`;

    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "pivotaltracker", type, {"projectId": project.id});
        handleReactions(user, reaction, {"message": message})
    });
}

/**
 * Handle the pivotal user(s) add event
 * @param activity The information about the event
 */
export const pt_user_add = async function (activity) {
    const {project, performed_by} = activity;
    project.id = project.id.toString();
    const type = "user_add";
    const users = await getUserFromPivotalTrackerAction(type, project.id)

    if (users.length == 0) {
        console.error('No user found for this action');
        return;
    }

    const message = `PivotalTracker, ${activity.message} to ${project.name}`;

    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "pivotaltracker", type, {"projectId": project.id});
        handleReactions(user, reaction, {"message": message})
    });
}

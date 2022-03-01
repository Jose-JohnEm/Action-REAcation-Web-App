import {getUserFromGithubAction, getUserFromTeamsAction, getUserReaction} from "../../../db/event";
import handleReactions from "../../reaction/reaction";

const tm_ping = async function (body, name, botName) {
    const action = "ping_bot"
    const users = await getUserFromTeamsAction(action, name, botName);
    if (users.length === 0) {
        console.error("No users found");
        return;
    }
    const message = `${name} has ping the bot ${botName} !`;
    let reaction;
    users.forEach(user => {
        reaction = getUserReaction(user, "teams", action, {"botname": botName});
        handleReactions(user, reaction, {"message": message})
    });
}

export {tm_ping};
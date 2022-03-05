// TODO: cron like timer
import cron from 'cron'
import handleReactions from '../../reaction/reaction'

// const cron_timer = function (user, action, reaction) {
const cron_timer = function () {
    const hello = "hello";
    new cron.CronJob("* * * * *", function (hello) {
        let message = "Cron job triggered at " + new Date();
        console.log(message);
        // this.stop();

        // handleReactions(user, reaction, {"message": message})
    }, null, true, 'Europe/Paris')
}

export {cron_timer}
const SERVICESACTIONS = [
    {label: 'Github', value: 'github', actions: ['new_star', 'rm_star', 'new_fork', 'new_pull_request', 'closed_pull_request', 'new_push'], reactions: ['create_a_repo']},
    {label: 'Discord', value: 'discord', actions: ['action_discord'], reactions: ['send_a_private_message']},
    {label: 'Intranet', value: 'intranet', actions: ['action_intranet'], reactions: ['reaction_intranet']},
    {label: 'Timer', value: 'timer', actions: ['display_time'], reactions: ['set_a_timer']},
    {label: 'Pivotal Tracker', value: 'pivotaltracker', actions: ['story_create_activity'], reactions: ['send_a_private_message']},
    {label: 'Teams', value: 'teams', actions: ['ping_our_bot'], reactions: ['send_a_private_message']}
];

export default SERVICESACTIONS;
const SERVICESSTATES = [
    {label: 'Discord', value: 'true', paramsReactions: ['Param1', 'Param2'], paramsActions: ['ReceiverUsername'], actions: ['action_discord'], reactions: ['send_a_private_message']},
    {label: 'Github', value: 'true', paramsReactions: ['ParamUnique'], paramsActions: ['Repository'], actions: ['new_star', 'rm_star', 'new_fork', 'new_pull_request', 'closed_pull_request', 'new_push'], reactions: []},
    {label: 'Pivotal Tracker', value: 'true', paramsReactions: ['ParamUnique'], paramsActions: ['ProjectID'], actions: ['story_create_activity'], reactions: ['send_a_private_message']},
    {label: 'Intranet', value: 'true', paramsReactions: ['ParamUnique'], paramsActions: ['AutoLogin'], actions: ['action_intranet'], reactions: ['reaction_intranet']},
    {label: 'Timer', value: 'true', paramsReactions: ['ParamUnique'], paramsActions: ['PrinceTimer'], actions: ['display_time'], reactions: ['set_a_timer']},
    {label: 'Teams', value: 'true', paramsReactions: ['ParamUnique'], paramsActions: ['NameOfBot'], actions: ['ping_our_bot'], reactions: []}
];

export default SERVICESSTATES;
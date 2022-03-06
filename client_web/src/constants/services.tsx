const SERVICESSTATES = [
    {label: 'github', value: 'true', paramsReactions: [], paramsActions: ['repository'], actions: ['new_star', 'rm_star', 'new_fork', 'new_pull_request', 'closed_pull_request', 'new_push'], reactions: []},
    {label: 'slack', value: 'true', paramsReactions: ['userid'], paramsActions: [], actions: [], reactions: ['send_a_private_message'] },
    {label: 'discord', value: 'true', paramsReactions: ['username'], paramsActions: [], actions: [], reactions: ['send_a_private_message']},
    {label: 'pivotaltracker', value: 'true', paramsReactions: [], paramsActions: ['projectId'], actions: ['story_create', 'user_add'], reactions: []},
    {label: 'intra', value: 'true', paramsReactions: [], paramsActions: ['token', 'target'], actions: ['new_grade', 'new_register', 'new_module', 'rm_module', 'reach_credit', 'reach_gpa'], reactions: []},
    {label: 'teams', value: 'true', paramsReactions: [], paramsActions: ['botname'], actions: ['ping_bot'], reactions: []},
    {label: 'email', value: 'true', paramsReactions: ['email'], paramsActions: [], actions: [], reactions: ['send_an_email']}
];

export default SERVICESSTATES;
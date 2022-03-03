export type IntraProfile = {
    login: string,
    title: string,
    internal_email: string,
    lastname: string,
    firstname: string,
    userinfo: {
        googleplus: {
            value: string,
            adm: boolean,
            public: boolean,
        },
        address: {
            value: string,
            adm: boolean,
            public: boolean
        },
        birthday: {
            value: string
        }
    },
    referent_used: boolean,
    picture: string,
    picture_fun: null,
    scolaryear: string,
    promo: number,
    semester: number,
    location: string,
    documents: string,
    userdocs: null,
    shell: null,
    close: boolean,
    ctime: string,
    mtime: string,
    id_promo: string,
    id_history: string,
    course_code: string,
    semester_code: string,
    school_id: string,
    school_code: string,
    school_title: string,
    old_id_promo: string,
    old_id_location: string,
    rights: object,
    invited: boolean,
    studentyear: number,
    admin: boolean,
    editable: boolean,
    restrictprofiles: boolean,
    groups: [
        {
            title: string,
            name: string,
            count: number
        }
    ],
    events: [],
    credits: number,
    gpa: [
        {
            gpa: string,
            cycle: string
        }
    ],
    nsstat: {
        active: number,
        idle: number,
        out_active: number,
        out_idle: number,
        nslog_norm: number
    }
}

export type IntraModule = {
    login: string,
    title: string,
    internal_email: string,
    lastname: string,
    firstname: string,
    userinfo: {
        googleplus: {
            value: string,
            adm: boolean,
            public: boolean
        },
        address: {
            value: string,
            adm: boolean,
            public: boolean
        },
        birthday: {
            value: string
        }
    },
    referent_used: boolean,
    picture: string,
    picture_fun: null,
    scolaryear: string,
    promo: number,
    semester: number,
    location: string,
    documents: string,
    userdocs: null,
    shell: null,
    close: boolean,
    ctime: string,
    mtime: string,
    id_promo: string,
    id_history: string,
    course_code: string,
    semester_code: string,
    school_id: string,
    school_code: string,
    school_title: string,
    old_id_promo: string,
    old_id_location: string,
    rights: object,
    invited: boolean,
    studentyear: number,
    admin: boolean,
    editable: boolean,
    restrictprofiles: boolean,
    groups: {
        title: string,
        name: string,
        count: number
    }[]
    ,
    events: object,
    credits: number,
    gpa: {
        gpa: string,
        cycle: string
    }[]
    ,
    nsstat: {
        active: number,
        idle: number,
        out_active: number,
        out_idle: number,
        nslog_norm: number
    },
    flags: {
        ghost: {
            value: number,
            label: string,
            modules: {
                scolaryear: number,
                id_user_history: string,
                codemodule: string,
                codeinstance: string,
                title: string,
                id_instance: string,
                date_ins: string,
                cycle: string,
                grade: string,
                credits: number,
                flags: string,
                barrage: number,
                instance_id: string,
                module_rating: string,
                semester: number
            }[]
        },
        difficulty: {
            value: number,
            label: string,
            modules: []
        },
        remarkable: {
            value: number,
            label: string,
            modules: {
                scolaryear: number,
                id_user_history: string,
                codemodule: string,
                codeinstance: string,
                title: string,
                id_instance: string,
                date_ins: string,
                cycle: string,
                grade: string,
                credits: number,
                flags: string,
                barrage: number,
                instance_id: string,
                module_rating: string,
                semester: number
            }[]
        },
        medal: {
            value: number,
            label: string,
            modules: {
                scolaryear: number,
                id_user_history: string,
                codemodule: string,
                codeinstance: string,
                title: string,
                id_instance: string,
                date_ins: string,
                cycle: string,
                grade: string,
                credits: number,
                flags: string,
                barrage: number,
                instance_id: string,
                module_rating: string,
                semester: number
            }[]
        }
    },
    list_history: {
        scolaryear: number,
        date: string,
        location: string,
        promo: number,
        course_code: string,
        semester: number,
        special: null,
        modifier: string,
        comment: string
    }[]
    ,
    missed: {
        module_title: string,
        acti_title: string,
        link_module: string,
        link_event: string,
        recent: string,
        begin: string,
        end: string,
        categ_title: string
    }[]
    ,
    modules: [
        {
            scolaryear: number,
            id_user_history: string,
            codemodule: string,
            codeinstance: string,
            title: string,
            id_instance: string,
            date_ins: string,
            cycle: string,
            grade: string,
            credits: number,
            flags: string,
            barrage: number,
            instance_id: string,
            module_rating: string,
            semester: number
        }
    ]
}


export type Imsg = {
    class: string,
    title: string,
    id: string,
}

export type Imod = {
    instance_id: string,
    title: string,
}
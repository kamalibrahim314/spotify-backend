// utils/rolePermissions.js
const rolePermissions = {
    admin: [
        'manage_users',
        'promote_teacher',
        'delete_user',
        'manage_courses',
        'add_lecture',
        'delete_lecture',
        'edit_course',
        'view_reports',
        'system_settings',
        'moderate_content',
        'access_all_data'
    ],
    teacher: [
        'manage_own_courses',
        'add_lecture',
        'edit_own_course'
    ],
    student: [
        'view_courses',
        'watch_lectures'
    ]
};

module.exports = rolePermissions;

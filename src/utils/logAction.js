const AdminLog = require("../models/AdminLog");

const logAdminAction = async ({ actionType, description, target, adminId }) => {

    try {
        await AdminLog.create({ actionType, description, target, admin: adminId });
    } catch (err) {
        console.error("Logging failed:", err);
    }
};

module.exports = logAdminAction;

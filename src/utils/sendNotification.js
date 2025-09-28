// utils/sendNotification.js
const Notification = require("../models/Notification");
const User = require("../models/User");

/**
 * Send notifications based on type:
 * - individual: to a specific user
 * - class: to users of a certain class
 * - role-based: student / teacher
 * - global: to all users
 */
const sendNotification = async ({ title, message, type = "global", targetUser = null, targetClass = null }) => {
    try {
        if (type === "individual") {
            if (!targetUser) throw new Error("Missing targetUser for individual notification");

            await Notification.create({
                title,
                message,
                type,
                targetUser
            });

        } else if (type === "class") {
            if (!targetClass) throw new Error("Missing targetClass for class-based notification");

            const users = await User.find({ class_name: targetClass }).select("_id");

            const notifications = users.map(user => ({
                title,
                message,
                type: "class",
                targetUser: user._id,
                targetClass
            }));

            await Notification.insertMany(notifications);

        } else if (["student", "teacher"].includes(type)) {
            const users = await User.find({ role: type }).select("_id");

            const notifications = users.map(user => ({
                title,
                message,
                type,
                targetUser: user._id
            }));

            await Notification.insertMany(notifications);

        } else if (type === "global") {
            const users = await User.find().select("_id");

            const notifications = users.map(user => ({
                title,
                message,
                type: "global",
                targetUser: user._id
            }));

            await Notification.insertMany(notifications);

        } else {
            throw new Error("نوع الإشعار غير مدعوم");
        }
    } catch (err) {
        console.error("Send Notification Error:", err);
    }
};

module.exports = sendNotification;

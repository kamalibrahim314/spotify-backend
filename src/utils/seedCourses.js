// api/utils/seedCourses.js
const mongoose = require("mongoose");
const Course = require("../models/Course");
require("dotenv").config();
const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const courses = [
            { title: "الإنجليزية - القواعد المتقدمة", description: "دورة متقدمة في قواعد اللغة الإنجليزية للصف الثالث الثانوي", teacher: "أستاذ/ محمد أحمد", teacherImg: "https://example.com/teachers/mohamed.jpg", category: "اللغة الإنجليزية", image: "https://example.com/courses/english-advanced.jpg", grade: ["الصف الثالث الثانوي"], lectures: [{ title: "أزمنة الأفعال", description: "شرح شامل لأزمنة الأفعال في اللغة الإنجليزية", duration: 45, isFree: false, price: 40, order: 1, videoUrl: "https://example.com/videos/english-tense" }, { title: "الجمل الشرطية", description: "تعلم كيفية تكوين الجمل الشرطية بأنواعها", duration: 50, isFree: true, price: 0, order: 2, videoUrl: "https://example.com/videos/english-conditionals" }], createdAt: new Date() },
            { title: "الإنجليزية - المحادثة", description: "تعلم المحادثة الإنجليزية اليومية بطلاقة", teacher: "أستاذة/ ياسمين خالد", teacherImg: "https://example.com/teachers/yasmin.jpg", category: "اللغة الإنجليزية", image: "https://example.com/courses/english-conversation.jpg", grade: ["الصف الثالث الثانوي"], lectures: [{ title: "المحادثة اليومية", description: "جمل وعبارات تستخدم في الحياة اليومية", duration: 40, isFree: false, price: 45, order: 1, videoUrl: "https://example.com/videos/daily-conversation" }, { title: "المقابلات الشخصية", description: "كيف تجتاز مقابلة عمل بالإنجليزية", duration: 55, isFree: false, price: 55, order: 2, videoUrl: "https://example.com/videos/job-interview" }], createdAt: new Date() },
            { title: "رياضيات - الجبر", description: "دورة شاملة في الجبر للصف الثالث الثانوي", teacher: "أستاذ/ علي محمود", teacherImg: "https://example.com/teachers/ali.jpg", category: "الرياضيات", image: "https://example.com/courses/math-algebra.jpg", grade: ["الصف الثالث الثانوي"], lectures: [{ title: "المعادلات الخطية", description: "حل المعادلات الخطية بمتغير واحد", duration: 50, isFree: true, price: 0, order: 1, videoUrl: "https://example.com/videos/linear-equations" }, { title: "المتباينات", description: "حل المتباينات الخطية والتربيعية", duration: 60, isFree: false, price: 50, order: 2, videoUrl: "https://example.com/videos/inequalities" }], createdAt: new Date() },
            { title: "الفيزياء - الميكانيكا", description: "أساسيات الميكانيكا للصف الثالث الثانوي", teacher: "أستاذ/ خالد سعد", teacherImg: "https://example.com/teachers/khaled.jpg", category: "الفيزياء", image: "https://example.com/courses/physics-mechanics.jpg", grade: ["الصف الثالث الثانوي"], lectures: [{ title: "قوانين نيوتن", description: "شرح قوانين نيوتن للحركة", duration: 45, isFree: true, price: 0, order: 1, videoUrl: "https://example.com/videos/newton-laws" }, { title: "الحركة الدائرية", description: "تحليل الحركة الدائرية المنتظمة", duration: 55, isFree: false, price: 50, order: 2, videoUrl: "https://example.com/videos/circular-motion" }], createdAt: new Date() }
        ];
        await Course.deleteMany({});
        await Course.insertMany(courses);
        console.log(`تم إضافة ${courses.length} كورس بنجاح إلى قاعدة البيانات`);
        process.exit(0);
    } catch (error) {
        console.error("حدث خطأ أثناء إضافة الكورسات:", error);
        process.exit(1);
    }
};
seedCourses();

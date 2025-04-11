import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js"


export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    return 200;
}

export function unenrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter(
        (enrollment) => !(enrollment.course === courseId && enrollment.user === userId)
    );
    return 200;
}

export function getEnrollments() {
    const { enrollments } = Database;
    return enrollments;
}

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}
/*
export function enrollUserInCourse(user, course) {
    return model.create({ user, course, _id: `${user}-${course}` });
}
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}
    */

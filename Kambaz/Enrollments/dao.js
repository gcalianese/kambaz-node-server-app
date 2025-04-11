import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js"

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

export function enrollUserInCourse(user, course) {
    return model.create({ user, course, _id: `${user}-${course}` });
}
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

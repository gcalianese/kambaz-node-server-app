import Database from "../Database/index.js";
import { v4 as uuidv4 } from 'uuid';
import model from "./model.js"

export function findAllCourses() {
    return model.find();
}

export function getCourse(cid) {
    const { courses } = Database.courses;
    const course = courses.find((c) => c._id === cid)
    return course
}

export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
}

export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
}

export async function deleteCourse(courseId) {
    const { enrollments } = Database;
    try {
        await model.deleteOne({ _id: courseId });
        Database.enrollments = enrollments.filter(
            (enrollment) => enrollment.course !== courseId
        );
    } catch (error) {
        console.error("Error deleting course: ", error);
    }
}

export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const course = courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
}





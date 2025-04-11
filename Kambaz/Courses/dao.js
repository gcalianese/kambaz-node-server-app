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
    return model.create({...course, _id: course._id});
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
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}





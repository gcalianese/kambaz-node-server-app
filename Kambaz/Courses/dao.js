import model from "./model.js"
import enrollmentModel from "../Enrollments/model.js"
import assignmentModel from "../Assignments/model.js"
import moduleModel from "../Modules/model.js"

export function findAllCourses() {
    return model.find();
}

export function getCourse(cid) {
    return model.findById(cid);
}

export const findCoursesForEnrolledUser = async (userId) => {
    const enrollments = await enrollmentModel.find({ user: userId });
    const courseIds = enrollments.map((enrollment) => enrollment.course);
    const courses = await model.find({ _id: { $in: courseIds } });
    return courses;
};

export function createCourse(course) {
    return model.create({ ...course, _id: course._id });
}

export async function deleteCourse(courseId) {
    try {
        await model.deleteOne({ _id: courseId });
        await enrollmentModel.deleteMany({course : courseId})
        await moduleModel.deleteMany({course : courseId})
        await assignmentModel.deleteMany({course : courseId})
    } catch (error) {
        console.error("Error deleting course: ", error);
    }
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}





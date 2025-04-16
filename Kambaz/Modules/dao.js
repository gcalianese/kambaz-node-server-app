import { v4 as uuidv4 } from "uuid";
import model from "./model.js"

export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
}

export function createModule(module) {
    return model.create(module);
}

export async function deleteModule(moduleId) {
    return await model.deleteOne({ _id: moduleId });
}

export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}




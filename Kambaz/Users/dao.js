
import model from "./model.js";
import EnrollmentsModel from "../Enrollments/model.js"
export const createUser = (user) => { }

/*
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    return newUser;
};
*/

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};


export async function getUsersForCourse(cid) {
    try {
        const enrollments = await EnrollmentsModel.find({course: cid});
        const userIds = enrollments.map(enrollment => enrollment.user);
        const users = await model.find({ _id: { $in: userIds } });
        return users;
    } catch (error) {
        console.error("Error fetching users for course:", error);
        throw error;
    }
}
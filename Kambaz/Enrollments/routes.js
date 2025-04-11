import * as dao from "./dao.js";

export default function EnrollmentsRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        const enrollments = dao.getEnrollments();
        res.send(enrollments);
    });

    const enrollUserInCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await dao.enrollUserInCourse(uid, cid);
        res.send(status);
    };
    const unenrollUserFromCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await dao.unenrollUserFromCourse(uid, cid);
        res.send(status);
    };
    app.post("/api/enrollments/:uid/:cid", enrollUserInCourse);
    app.delete("/api/enrollments/:uid/:cid", unenrollUserFromCourse);
}
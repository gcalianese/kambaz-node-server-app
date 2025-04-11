import * as dao from "./dao.js";

export default function AssignmentsRoutes(app) {
    app.get("/api/assignments", async (req, res) => {
        const assignments = await dao.findAllAssignments();
        res.json(assignments);
    });

    app.get("/api/assignments/:cid", async (req, res) => {
        const  { cid } = req.params;
        const assignments = await dao.findAssignmentsForCourse(cid);
        res.json(assignments);
    });

    app.get("/api/assignments/:cid/:aid", async (req, res) => {
        const  { cid, aid } = req.params;
        const assignment = await dao.findAssignment(cid, aid);
        res.send(assignment);
    });

    app.post("/api/assignments", async (req, res) => {
        const assignment = await dao.createAssignment(req.body);
        res.send(assignment);
    });
    
    app.delete("/api/assignments/:cid/:aid", async (req, res) => {
        const { cid, aid } = req.params;
        const status = await dao.deleteAssignment(cid, aid);
        res.send(status);
    });
    

    app.put("/api/assignments", async (req, res) => {
        const assignmentUpdates = req.body;
        const status = await dao.updateAssignment(assignmentUpdates);
        res.send(status);
    });
    
}

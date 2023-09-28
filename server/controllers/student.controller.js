const Student = require("../models/student.model");
let status = 200;
let message = {};

const getAverage = function(req, res) {
    const studentId = req.params.studentId;
    const semester = req.query.semester;
    res.status(200).json(new Student(studentId).getAverage(semester));
}

module.exports = {
    getAverage
}
// Imports
const express = require("express"); // Create router
const promisePool = require("../database/db"); // Import instance of mysql pool

// Init router
const router = express.Router();

// Endpoints
/**
 * Check Which mentor is assigned
 */

// @route   POST api/student/assigned
// @desc    Check which mentor is assigned
// @access  Public
router.get("/assigned", async (req, res) => {
    try {
        const [rows] = await promisePool.query(
            `SELECT * from mentors`
        );
        res.json({mentors:rows});
    } catch (err) {
        // Catch errors
        throw err;
    }
});
router.post("/getMarks", async (req, res) => {
    try {
        const s_id = req.body.student_id;
        const [rows] = await promisePool.query(
            `SELECT * from students where s_id=${s_id}`
        );
        // console.log(rows);
        res.json({ students: rows });
    } catch (err) {
        // Catch errors
        throw err;
    }
});

router.post("/editMarks", async (req, res) => {
    try {
        const s_id = req.body.student_id;
        const viva = req.body.viva;
        const ideation = req.body.ideation;
        const execution = req.body.execution;
        console.log(viva, ideation, execution, s_id);
        const [rows] = await promisePool.query(
            `UPDATE students set viva=${viva}, execution=${execution}, ideation=${ideation} where s_id=${s_id}`
        );
        console.log(rows);
        res.json({ students: rows });
    } catch (err) {
        // Catch errors
        throw err;
    }
});

router.get("/marks", async (req, res) => {
    try {
        const m_id = req.body.mentor_id;
        const [rows] = await promisePool.query(
            `SELECT * from students where m_id=${m_id}`
        );
        res.json({ students: rows });
    } catch (err) {
        // Catch errors
        throw err;
    }
});


module.exports = router;
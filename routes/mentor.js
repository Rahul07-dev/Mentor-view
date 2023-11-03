// Imports
const express = require('express'); // Create router
const promisePool = require('../database/db'); // Import instance of mysql pool

// Init router
const router = express.Router();

// Endpoints

// @route   POST api/mentor/assign
// @desc    Assign this mentor to a student
// @access  Public
router.get('/allMentors', async (req, res) => {
	try {
		const [rows] = await promisePool.query(`SELECT * from mentors`);
		res.json({ mentors: rows });
	} catch (err) {
		// Catch errors
		throw err;
	}
});

// @route   POST api/mentor/assign
// @desc    Assign this mentor to a student
// @access  Public
router.get('/currentmentor/:id', async (req, res) => {
	try {
		const [rows] = await promisePool.query(
			`SELECT * from mentors WHERE m_id=${req.params.id}`
		);
		res.json(rows[0]);
	} catch (err) {
		// Catch errors
		throw err;
	}
});

//Group of students for a mentor
router.post('/get_assigned_students', async (req, res) => {
	try {
		const m_id = req.body.mentor_id;
		const [rows] = await promisePool.query(
			`SELECT * from students where m_id=${m_id}`
		);
		// console.log(rows);
		res.json({ students: rows });
	} catch (err) {
		// Catch errors
		throw err;
	}
});

//delete a student
router.post('/del_student', async (req, res) => {
	try {
		const s_id = req.body.s_id;
		const [rows] = await promisePool.query(
			`UPDATE students SET m_id=NULL,viva=NULL , execution=NULL , ideation=NULL where s_id=${s_id}`
		);
		// console.log(rows);
		res.json({ students: rows });
	} catch (err) {
		// Catch errors
		throw err;
	}
});
router.post('/rep_student', async (req, res) => {
	try {
		const ns_id = req.body.ns_id;
		const ds_id = req.body.ds_id;
		const m_id = req.body.m_id;
		await promisePool.query(
			`UPDATE students SET m_id=NULL,viva=NULL , execution=NULL , ideation=NULL where s_id=${ds_id}`
		);
		await promisePool.query(
			`UPDATE students SET m_id=${m_id} where s_id=${ns_id}`
		);

		const [rows] = await promisePool.query(
			`SELECT * from students where m_id=${m_id}`
		);
		// console.log(rows);
		res.json({ students: rows });

		// console.log(rows);
	} catch (err) {
		// Catch errors
		throw err;
	}
});

router.post('/add_students', async (req, res) => {
	try {
		const student_list = req.body.student_list;
		console.log(student_list);
		const m_id = req.body.mentor_id;
		let query = `UPDATE students set m_id=${m_id} where s_id IN (`;
		for (let i = 0; i < student_list.length; i++) {
			if (i == student_list.length - 1) {
				query += `${student_list[i]})`;
			} else {
				query += `${student_list[i]},`;
			}
		}
		const [rows] = await promisePool.query(query);
		res.json({ students: rows });
	} catch (err) {
		// Catch errors
		throw err;
	}
});

router.get('/get_unassigned_students', async (req, res) => {
	try {
		const [rows] = await promisePool.query(
			`SELECT * from students where m_id is NULL`
		);
		// console.log(rows);
		res.json({ students: rows });
	} catch (err) {
		// Catch errors
		throw err;
	}
});

router.post('/locked', async (req, res) => {
	try {
		const m_id = req.body.m_id;
		const [rows] = await promisePool.query(
			`UPDATE mentors SET locked=1 where m_id=${m_id}`
		);
		res.send('locked');
		// console.log(rows);
		// res.json({ students: rows });
	} catch (err) {
		// Catch errors
		throw err;
	}
});
module.exports = router;

import { pool } from "../db.js";

// ================= CREATE =================
export const createInternship = async (req, res) => {
    try {
        const { name, email, phone, college, degree, city, motivation } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                status: false,
                message: "Name, Email and Phone are required",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email format",
            });
        }

        // ✅ Check if email already exists
        const [existing] = await pool.query(
            "SELECT id FROM internships WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Email already exists",
            });
        }

        // ✅ Insert if not exists
        const sql = `
        INSERT INTO internships 
        (name, email, phone, college, degree, city, motivation)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.query(sql, [
            name, email, phone, college, degree, city, motivation
        ]);

        return res.json({
            status: true,
            message: "Internship form submitted successfully",
            data: {
                id: result.insertId,
                name,
                email,
                phone,
                college,
                degree,
                city,
                motivation,
            },
        });

    } catch (err) {
        console.log("Insert Error:", err);

        // ✅ Handle duplicate error (if DB unique lagaya ho)
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                status: false,
                message: "Email already exists",
            });
        }

        return res.status(500).json({
            status: false,
            message: "Database error",
        });
    }
};
// ================= GET ALL =================
export const getAllInternships = async (req, res) => {
    try {
        const sql = `SELECT * FROM internships ORDER BY id DESC`;

        const [results] = await pool.query(sql);

        return res.json({
            status: true,
            count: results.length,
            data: results,
        });

    } catch (err) {
        console.log("Fetch Error:", err);
        return res.status(500).json({
            status: false,
            message: "Error fetching data",
        });
    }
};

export const getInternshipById = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `SELECT * FROM internships WHERE id = ?`;

        const [results] = await pool.query(sql, [id]);

        if (results.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Record not found",
            });
        }

        return res.json({
            status: true,
            data: results[0],
        });

    } catch (err) {
        console.log("Fetch Error:", err);
        return res.status(500).json({
            status: false,
            message: "Error fetching record",
        });
    }
};

// ================= DELETE =================
export const deleteInternship = (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM internships WHERE id = ?`;

    pool.query(sql, [id], (err, result) => {
        if (err) {
            console.log("Delete Error:", err);
            return res.status(500).json({
                status: false,
                message: "Delete failed",
            });
        }

        return res.json({
            status: true,
            message: "Record deleted successfully",
            deletedId: id,
        });
    });
};

export const submitTest = async (req, res) => {
    try {
        const { email, answers } = req.body;

        await pool.query(
            "UPDATE internships SET test_answers = ? WHERE email = ?",
            [JSON.stringify(answers), email]
        );

        res.json({
            status: true,
            message: "Answers saved",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Error",
        });
    }
};
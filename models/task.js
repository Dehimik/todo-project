const { Pool } = require('pg');

require('dotenv').config();

// Connect to postgres
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

class Task {
    static async initDB() {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    }

    // Get all tasks for list
    static async getAll() {
        const res = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return res.rows;
    }

    //Create a new task
    static async create(title, description) {
        const res = await pool.query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );
        return res.rows[0];
    }

    // Change status of task
    static async updateStatus(id, completed) {
        const res = await pool.query(
            'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
            [completed, id]
        );
        return res.rows[0];
    }

    // Update task
    static async updateTask(id, title, description) {
        const res = await pool.query(
            'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, id]
        );
        return res.rows[0];
    }

    // Delet task
    static async delete(id) {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    }
}

// Initialize database on startup
Task.initDB().then(r => {
    console.log("PostgreSQL connected");
}).catch((err) => {
    console.error("PostgreSQL connection error:", err);
});

module.exports = Task;
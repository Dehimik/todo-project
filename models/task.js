const { Pool } = require('pg');

// Connect to postgres
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todoshka',
    password: 'postgres',
    port: 5432,
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
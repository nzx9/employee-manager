const pg = require("pg");

const exec = async (text, params) => {
    const client = new pg.Client();
    client.connect();
    const result = await client.query(text, params);
    client.end();
    return result;
};


class Employee {
    static async create({ first_name, last_name, email, gender, phone, photo=null }) {
        const res = await exec(
            "INSERT INTO employees (first_name, last_name, email, gender, phone, photo) VALUES( $1, $2, $3, $4, $5, $6) RETURNING *", [first_name, last_name, email, gender, phone, photo]
        )
        if(res.rowCount > 0) {
            return res.rows[0];
        } else {
            return res;
        }
    }

    static async update({ first_name, last_name, email, gender, phone}, empId) {
        const res = await exec(
            "UPDATE employees SET first_name = $1, last_name = $2, email = $3, gender = $4, phone = $5 WHERE empId = $6 RETURNING *",
            [first_name, last_name, email, gender, phone, empId]
        );
        if(res.rowCount > 0) {
            return res.rows[0];
        } else {
            return null;
        }
    }

    static async findById(empId) {
        const res = await exec(
            "SELECT * FROM employees WHERE empId = $1",
            [empId]
        );
        if(res.rowCount > 0) return res.rows[0];
        else return null;
    }

    static async findAll() {
        const res = await exec(
            "SELECT * FROM employees ORDER BY empId"
        );
        return res.rows;
    }

    static async deleteById(empId) {
        return await exec(
            "DELETE FROM employees WHERE empId = $1", 
            [empId]
        );
    }
}

module.exports = { Employee }
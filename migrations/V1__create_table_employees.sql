CREATE TABLE IF NOT EXISTS Employees(
    empId SERIAL PRIMARY KEY,
    first_name VARCHAR(10) NOT NULL,
    last_name VARCHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    gender VARCHAR(1) NOT NULL,
    photo VARCHAR(255) DEFAULT NULL,
    updated_at timestamptz DEFAULT NULL,
    created_at timestamptz DEFAULT current_timestamp
);


CREATE OR REPLACE FUNCTION trigger_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_timestamp
BEFORE UPDATE ON Employees
FOR EACH ROW
EXECUTE PROCEDURE trigger_update_timestamp();

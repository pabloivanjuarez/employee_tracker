DROP DATABASE IF EXISTS empTracker;
CREATE DATABASE empTracker;

USE empTracker;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  names VARCHAR(30)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  SALARY DECIMAL NOT NULL,
  department_id INT unsigned,
  INDEX department_index(department_id),
  CONSTRAINT f_key_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE 
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT unsigned NOT NULL,
  INDEX role_index(role_id),
  CONSTRAINT f_key_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  manager_id int unsigned,
  INDEX manager_index(manager_id),
  CONSTRAINT f_key_manager_id FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

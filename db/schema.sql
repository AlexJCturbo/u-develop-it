CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

/*Because TEXT is more lenient, it might be tempting to always use TEXT over VARCHAR.
However, overuse of TEXT fields can bloat the database because MySQL will allocate
the maximum amount of space for a TEXT value, no matter how long the value is. In
SQL, it's important to keep the size of data in check as much as possible. If you
know a field's data will be on the short side, always go with VARCHAR!*/


CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL
  );
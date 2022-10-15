DROP TABLE IF EXISTS voters;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;
/*When you're developing an application locally it's okay to drop and re-create databases
and tables freely, and delete data as necessary. However, as soon as your application
"goes live" to other developers, customers, or the general public, these operations
become very risky.*/

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
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);
/*FOREIGN KEY tells SQL which table and field it references
ON DELETE SET NULL to tell SQL to set a candidate's party_id field to NULL if a party is deleted */

CREATE TABLE voters (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
/*DEFAULT: If you don't specify NOT NULL, then a field could potentially be NULL if that
value isn't provided in an INSERT statement. With DEFAULT, however, you can specify what
the value should be if no value is provided.
CURRENT_TIMESTAMP will return the current date and time in the same 2020-01-01 13:00:00
format. Note that the time will be based on what time it is according to the server, not
the client's machine.
So, in this code we're specifying CURRENT_TIMESTAMP as the value for DEFAULT.*/

CREATE TABLE users (
	_id VARCHAR(255) PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	role VARCHAR(255) NOT NULL
); 

CREATE TABLE personal_info (
	_id VARCHAR(255) PRIMARY KEY,
	"fullName" VARCHAR(255) NOT NULL,
	dob VARCHAR(255) NOT NULL,
	gender VARCHAR(255) NOT NULL,
	status VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
	_id VARCHAR(255) PRIMARY KEY,
	caption VARCHAR(255) NOT NULL,
	"mediaUrl" json NOT NULL,
	"ownerId" VARCHAR(255) NOT NULL
);

CREATE TABLE users_relation (
	_id VARCHAR(255) PRIMARY KEY,
	"userId" VARCHAR(255) NOT NULL,
	"followerId" VARCHAR(255) NOT NULL,
	type VARCHAR(255) NOT NULL
);

//Drop query
DROP TABLE <tableName>;

//Alter table query
ALTER TABLE <tableName> MODIFY <columnName> <datatype> NOT NULL;
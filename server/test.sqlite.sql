BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "hello" (
	"a"	int,
	"b"	char
);
CREATE TABLE IF NOT EXISTS "lorem" (
	"info"	TEXT
);
CREATE TABLE IF NOT EXISTS "Library_Emp" (
	"emp_id"	INT NOT NULL,
	"emp_name"	varchar(50) NOT NULL,
	"emp_email"	varchar(50) NOT NULL,
	"position"	varchar(50) NOT NULL,
	"password"	varchar(20),
	PRIMARY KEY("emp_id")
);
CREATE TABLE IF NOT EXISTS "Author" (
	"author_id"	INT NOT NULL,
	"author_name"	varchar(50) NOT NULL,
	PRIMARY KEY("author_id")
);
CREATE TABLE IF NOT EXISTS "Publisher" (
	"publisher_id"	INT NOT NULL,
	"publisher_name"	varchar(5) NOT NULL,
	"publisher_city"	varchar(50) NOT NULL,
	"publication_year"	INT NOT NULL,
	PRIMARY KEY("publisher_id")
);
CREATE TABLE IF NOT EXISTS "Library_User" (
	"user_name"	varchar(50) NOT NULL,
	"birthdate"	varchar(50) NOT NULL,
	"membership_type"	varchar(50) NOT NULL,
	"user_id"	INT NOT NULL,
	"user_email"	varchar(50) NOT NULL,
	"password"	varchar(50) NOT NULL,
	"emp_id"	INT NOT NULL,
	PRIMARY KEY("user_id"),
	FOREIGN KEY("emp_id") REFERENCES "Library_Emp"("emp_id")
);
CREATE TABLE IF NOT EXISTS "Book" (
	"book_title"	varchar(50) NOT NULL,
	"ISBN"	INT NOT NULL,
	"dewey_decimal"	varchar(50) NOT NULL,
	"availability"	varchar(50) NOT NULL,
	"Genre"	varchat(20) NOT NULL,
	"Copy_id"	INT NOT NULL,
	"author_id"	INT NOT NULL,
	"user_id"	INT NOT NULL,
	"publisher_id"	INT NOT NULL,
	PRIMARY KEY("Copy_id"),
	FOREIGN KEY("publisher_id") REFERENCES "Publisher"("publisher_id"),
	FOREIGN KEY("author_id") REFERENCES "Author"("author_id"),
	FOREIGN KEY("user_id") REFERENCES "Library_User"("user_id")
);
INSERT INTO "lorem" VALUES ('bruh');
INSERT INTO "lorem" VALUES ('bruh2');
INSERT INTO "lorem" VALUES ('bruh3');
INSERT INTO "lorem" VALUES ('bruh4');
INSERT INTO "lorem" VALUES ('bruh5');
INSERT INTO "lorem" VALUES ('bruh6');
INSERT INTO "lorem" VALUES ('bruh8');
INSERT INTO "Library_Emp" VALUES (1,'Andrew Stapay','astapay@mail.bradley.edu','Co-Owner','empPass1');
INSERT INTO "Library_Emp" VALUES (2,'Alec Pizziferro','apizziferro@mail.bradley.edu','Co-Owner','empPass2');
INSERT INTO "Library_Emp" VALUES (3,'Caydence Wilson','cawilson3@mail.bradley.edu','Bookshelfer','empPass3');
INSERT INTO "Library_Emp" VALUES (4,'Matthew Mercer','mmercer@gmail.com','Headmaster','empPass4');
INSERT INTO "Library_Emp" VALUES (5,'Shia LeBeouf','justdoit@nike.com','Bookshelfer','empPass5');
INSERT INTO "Library_Emp" VALUES (6,'Mariah Carey','alliwantforchristmas@isyou.com','Entertainer','empPass6');
INSERT INTO "Library_Emp" VALUES (7,'Patrick Warburton','bestcaptaininallofskylands@portalmaster.net','Pilot','empPass7');
INSERT INTO "Author" VALUES (1,'Emily Bronte');
INSERT INTO "Author" VALUES (2,'Harper Lee');
INSERT INTO "Author" VALUES (3,'George Orwell');
INSERT INTO "Publisher" VALUES (1,'Phoenix Publishing and Media Company','Phoenix, AZ',2024);
INSERT INTO "Publisher" VALUES (2,'Bloomsbury','New York, NY',2020);
INSERT INTO "Publisher" VALUES (3,'TCK Publishing','Chicago, IL',1962);
INSERT INTO "Publisher" VALUES (4,'Penguin Random House','New York, NY',1962);
INSERT INTO "Library_User" VALUES ('ser0glut','June 5, 2003','Expert',1,'astapay@mail.bradley.edu','pass1',1);
INSERT INTO "Library_User" VALUES ('alecpizz','November 11, 2002','Expert',2,'apizziferro@mail.bradley.edu','pass2',2);
INSERT INTO "Library_User" VALUES ('facheron','May 25, 1997','None',3,'somethingaboutaflower@gmail.com','pass3',6);
INSERT INTO "Library_User" VALUES ('syune765','October 30, 1998','Pro',4,'mudkiprox77@gmail.com','pass4',1);
INSERT INTO "Library_User" VALUES ('logout','N/A','None',0,'N/A','logout',1);
INSERT INTO "Book" VALUES ('Animal Farm',1226,'455.693','available','Thriller',1,1,0,1);
INSERT INTO "Book" VALUES ('Pride and Prejudice',8502,'380.799','available','Fantasy',2,2,0,2);
INSERT INTO "Book" VALUES ('Harry Potter and the Order of the Phoenix',7149,'337.957','available','Thriller',3,3,0,2);
INSERT INTO "Book" VALUES ('Pride and Prejudice',8502,'380.799','available','Fantasy',4,2,0,2);
INSERT INTO "Book" VALUES ('The Hunger Games',2521,'310.843','available','Fantasy',5,3,0,3);
INSERT INTO "Book" VALUES ('Animal Farm',1226,'455.693','available','Thriller',6,1,0,1);
INSERT INTO "Book" VALUES ('The Hunger Games',2521,'310.843','available','Fantasy',7,3,0,3);
INSERT INTO "Book" VALUES ('Harry Potter and the Order of the Phoenix',4597,'719.561','available','Fantasy',8,2,0,2);
INSERT INTO "Book" VALUES ('The Hunger Games',2521,'310.843','available','Fantasy',9,3,0,3);
INSERT INTO "Book" VALUES ('Les Miserables',4760,'862.431','available','Non-fiction',10,2,0,4);
COMMIT;

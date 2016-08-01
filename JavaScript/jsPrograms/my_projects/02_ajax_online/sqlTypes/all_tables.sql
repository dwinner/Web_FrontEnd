CREATE DATABASE onlines;
USE onlines;
CREATE TABLE session (
  id_session TINYTEXT NOT NULL,
  putdate DATETIME NOT NULL DEFAULT '000-00-00 00:00:00',
  user TINYTEXT NOT NULL
) TYPE=MyISAM;
CREATE TABLE users (
  id_user INT NOT NULL AUTO_INCREMENT,
  name TINYTEXT,
  pass TINYTEXT,
 PRIMARY KEY (id_user)
) TYPE=MyISAM;
INSERT INTO users VALUES
 (NULL, 'user1',  MD5('pass1')),
 (NULL, 'user2',  MD5('pass2')),
 (NULL, 'user3',  MD5('pass3')),
 (NULL, 'user4',  MD5('pass4')),
 (NULL, 'user5',  MD5('pass5')),
 (NULL, 'user6',  MD5('pass6')),
 (NULL, 'user7',  MD5('pass7')),
 (NULL, 'user8',  MD5('pass8')),
 (NULL, 'user9',  MD5('pass9')),
 (NULL, 'user10', MD5('pass10'));
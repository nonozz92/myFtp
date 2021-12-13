# Welcome on my github
------------------------------------------

Network myFtp: 

This project is the creation of a FTP Server and a client.

I personally use version 14.16.0 of node.js on Virtual Studio Code.

After downloading this project, make these commands in the terminal :

```
npm install
```
then :

```
npm run dev 
```
or
```
npm run start
```
in the client and server file.

You can now use these commands: 

* `USER <username>`: check if the user exist
* `PASS <password>`: authenticate the user with a password
* `LIST`: list the current directory of the server
* `CWD <directory>`: change the current directory of the server
* `RETR <filename>`: transfer a copy of the file _FILE_ from the server to the client
* `STOR <filename>`: transfer a copy of the file _FILE_ from the client to the server
* `PWD`: display the name of the current directory of the server
* `HELP`: send helpful information to the client
* `QUIT`: close the connection and stop the program


Arnaud Gibelli

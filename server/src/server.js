import { createServer } from "net";
import { user, pass } from "./user";
import { list } from "./list";
import { chdir, cwd } from "process";

export function launch(port) {
  const server = createServer((socket) => {
    console.log("new connection.");
    socket.on("data", (data) => {
      const message = data.toString();

      const [command, ...args] = message.trim().split(" ");
      console.log(command, args);

      switch (command) {
        case "USER":
          socket.write(user(args[0]));
          break;
        case "PASS":
          socket.write(pass(args[0]));
          break;
        case "LIST":
          list(socket);
          break;
        case "CWD":
          console.log(`Starting directory: ${cwd()}`);
          try {
            chdir("/tmp");
            console.log(`New directory: ${cwd()}`);
          } catch (err) {
            console.error(`chdir: ${err}`);
          }
          break;
        case "PWD":
          console.log("Current directory: " + process.cwd());
          break;
        case "RETR":
          break;
        case "STOR":
          break;
        case "HELP":
          socket.write(
            " Hello you can use these commands : \r\n \r\n USER <username>: check if the user exist \r\n \r\n PASS <password>: authenticate the user with a password \r\n \r\n LIST: list the current directory of the server \r\n \r\n CWD <directory>: change the current directory of the server \r\n \r\n RETR <filename>: transfer a copy of the file _FILE_ from the server to the client \r\n \r\n STOR <filename>: transfer a copy of the file _FILE_ from the client to the server \r\n \r\n PWD: display the name of the current directory of the server \r\n \r\n HELP: send helpful information to the client \r\n \r\n QUIT: close the connection and stop the program \r\n \r\n "
          );
          break;
        case "QUIT":
          socket.write("connection closed \r\n ");
          socket.destroy();
          break;

        case "SYST":
          socket.write("215 \r\n");
          break;
        case "FEAT":
          socket.write("211 \r\n");
          break;
        case "TYPE":
          socket.write("200 \r\n");
          break;
        default:
          console.log("command not supported:", command, args);
      }
    });

    socket.write("Welcome \r\n");
  });

  server.listen(port, () => {
    console.log(`server started at localhost:${port}`);
  });
}

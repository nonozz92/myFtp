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
          socket.write("257 - : " + __dirname);
          break;
        case "RETR":
          break;
        case "STOR":
          break;
        case "HELP":
          console.log("Current directory: " + process.argv());
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

    socket.write("220 Hello World \r\n");
  });

  server.listen(port, () => {
    console.log(`server started at localhost:${port}`);
  });
}

import fs from "fs";

export function list(socket) {
  socket.write("125 Data connection already open; transfer starting. \r\n");
  let files = fs.readdirSync(process.cwd());
  let answer = "";
  answer += "\r\n-- Files in the current directory --\r\n";
  files.forEach((file) => {
    answer += `${file}\r\n`;
  });
  socket.write(answer);
}

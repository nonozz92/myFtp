const users = [
  { id: 1, username: "Arnaud", password: "123456" },
  { id: 1, username: "Arnaud2", password: "654321" },
];

export function verifUserExist(username) {
  let result = false;
  for (const user of users) {
    if (user.username == username) result = true;
  }
  return result;
}

export function user(args) {
  let result = "";
  if (verifUserExist(args)) result = " user found \r\n";
  else result = "user not found \r\n";

  return result;
}

export function verifPassword(password) {
  let result = false;
  for (const user of users) {
    if (user.password == password) result = true;
  }
  return result;
}

export function pass(args) {
  let result = "";
  if (verifPassword(args))
    result = "230 Password Authentication is successfull. \r\n";
  else result = "530 Wrong Password.\r\n";

  return result;
}

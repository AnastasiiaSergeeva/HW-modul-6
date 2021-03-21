// Задание
// Дополни функцию getUserEmails(users) так,
// чтобы она возвращала массив почтовых адресов пользователей(свойство email) из массива объектов в параметре users.
const getUserEmails = users => {
    return users.map(user => user.email);

  };
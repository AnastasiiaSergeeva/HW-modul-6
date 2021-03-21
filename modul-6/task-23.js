// Задание
// Дополни функцию getInactiveUsers(users) так, чтобы она возвращала массив неактивных пользователей,
// значение свойства isActive которых false.
const getActiveUsers = (users) => {
    return users.filter(user => !user.isActive);
};
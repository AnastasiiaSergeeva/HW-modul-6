// Задание
// Дополни функцию getUsersWithEyeColor(users, color) так, чтобы она возвращала массив пользователей
// у которых цвет глаз(свойство eyeColor) совпадает со значением параметра color.

// Пиши код ниже этой строки
const getUsersWithEyeColor = (users, color) => {
    return users.filter(user => user.eyeColor === color);

};
// Пиши код выше этой строки
// Задание
// Дополни функцию getFriends(users) так, чтобы она возвращала массив друзей всех пользователей(свойство friends).У нескольких 
// пользователей могут быть одинаковые друзья,
// сделай так чтобы возвращаемый массив не содержал повторений.

const getFriends = (users) => {
    return users
        .flatMap(({ friends }) => friends)
        .filter((friends, index, array) => array.indexOf(friends) === index);


};
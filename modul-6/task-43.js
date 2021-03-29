// Задание
// Дополни функцию getSortedFriends(users) так, чтобы она возвращала массив уникальных имён друзей
// (свойство friends) отсортированный по алфавиту.

const getSortedFriends = users => {
    return users
        .flatMap(({ friends }) => friends)
        .filter((friends, index, array) => array.indexOf(friends) === index)
        .sort((a, b) => a.localeCompare(b));
   
};
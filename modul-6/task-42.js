// Задание
// Дополни функцию getNamesSortedByFriendCount(users) так, чтобы она возвращала массив имён пользователей отсортированный по возрастанию
// количества их друзей(свойство friends).

const getNamesSortedByFriendCount = users => [...users]
    .sort((a, b) =>  a.friends.length - b.friends.length)
    .map(({ name }) => name);
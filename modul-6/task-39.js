// Задание
// Дополни функцию sortByDescendingFriendCount(users) так, чтобы она возвращала массив пользователей отсортированный
// по убыванию количества их друзей(свойство friends).

const sortByDescendingFriendCount = users => [...users].sort((a, b) => {
    return b.friends.length - a.friends.length;
   
},0);
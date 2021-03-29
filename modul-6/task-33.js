// Задание
// Дополни функцию getTotalFriendCount(users) так, чтобы она считала и возвращала общее количество друзей(свойство friends) всех
// пользователей из массива users.

const getTotalFriendCount = users => users.reduce((total, user) => {
    return total + user.friends.length;
   
},0);
// Задание
// Дополни функцию sortByAscendingBalance(users) так, чтобы она возвращала массив пользователей
// отсортированный по возрастанию их баланса(свойство balance).

const sortByAscendingBalance = users => [...users].sort((a, b) => {
    return a.balance - b.balance;
 
},0);
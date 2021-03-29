// Задание
// Дополни функцию calculateTotalBalance(users) так, чтобы она считала и возвращала сумму всех средств
// (свойство balance) которые хранят пользователи из массива users.

const calculateTotalBalance = users => users.reduce((total,user) => {
    return total + user.balance;
   
}, 0);
console.log(calculateTotalBalance);
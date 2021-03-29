// Задание
// Дополни функцию sortByName(users) так, чтобы она возвращала массив пользователей отсортированный по
// их имени(свойство name) в алфавитном порядке.

const sortByName = users => [...users].sort((a, b) => {
    return a.name.localeCompare(b.name);
   
},0);
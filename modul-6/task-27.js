// Задание
// Дополни функцию isEveryUserActive(users) так, чтобы она проверяла все ли пользователи сейчас
// активны(свойство isActive) и возвращала true или false.
const isEveryUserActive = (users) => {
   return users.every(({ isActive}) => isActive

    );
};


// return users.every(users => users.isActive === true);
const getCommonElements =(firstArray, secondArray) =>{
    const commonElements = [];
  
    firstArray.forEach(element => {
      if (secondArray.includes(element)) {
        commonElements.push(element);
      }
    });
  
    // Пиши код выше этой строки
    return commonElements;
  }
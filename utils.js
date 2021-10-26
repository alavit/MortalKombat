const generateRandomNum = (num) => Math.ceil(Math.random() * num);

function getCurrentTime() {
    const date = new Date();
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`)
  
    return `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;
}

export { generateRandomNum, getCurrentTime};
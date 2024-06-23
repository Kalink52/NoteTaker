// pretty much ripped from class content
//learned i could use module exports in an arrow function.. neat

module.exports = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
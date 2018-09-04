const makeDate = () => {
    const d = new Date();
    const formattedDate = "";

    formattedDate += (d.getMonth() + 1) + "_";
    formattedDate += d.getDate() + 1 + "_";
    formattedDate += d.getFullYear();
    return formattedDate;
};
module.exports = makeDate;
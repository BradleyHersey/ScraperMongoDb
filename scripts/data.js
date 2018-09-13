const makeDate = () => {
    const d = new Date();
    let formattedDate = "";

    formattedDate += (d.getMonth() + 1) + "_";
    formattedDate += d.getDate() + 1 + "_";
    formattedDate += d.getFullYear();
    return formattedDate;
};console.log("8");
module.exports = makeDate;
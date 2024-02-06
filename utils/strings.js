const makeSearchRegex = async (string) => {
    let arr = string.split(" ");
    let arr2 = await arr.map((x) => {
        return `(?=^.*?${x}.*$)`;
    });
    arr2.push("^.*$");
    let st = arr2.join("");
    let r = new RegExp(st, "gi");
    return r;
};

module.exports = {
    makeSearchRegex,
};

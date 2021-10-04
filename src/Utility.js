export const findObj = (filterArray, matchString) => {
    let matchedObj = filterArray.find((item, index) => {
        return item.name === matchString;
    });

    return matchedObj;
};
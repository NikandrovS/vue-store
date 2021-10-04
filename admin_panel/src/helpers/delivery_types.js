const types = [
    { type: "selfDelivery", label: "Самовывоз" },
    { type: "dostavkaClub", label: "Dostavka" },
    { type: "cdek", label: "CDEK" },
    { type: "pochta", label: "Почта России" },
    { type: "ems", label: "Международная" }
];

function getLabel(type) {
    if (!type) return;
    const element = types.find(object => object.type === type);
    return element ? element.label : type;
}

module.exports = {
    types,
    getLabel
};

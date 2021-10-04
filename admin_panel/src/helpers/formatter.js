const orderStates = [
    { status: "new", label: "новые", tag_type: "info", icon: "el-icon-service", color: "#000" },
    { status: "confirmed", label: "подтвержден", tag_type: "success", icon: "el-icon-success", color: "#67c23a" },
    { status: "unpaid", label: "не оплачен", tag_type: "warning", icon: "el-icon-money", color: "#e6a23c" },
    { status: "sent", label: "отправлен", tag_type: "primary", icon: "el-icon-s-promotion", color: "#409eff" },
    { status: "deleted", label: "удален", tag_type: "danger", icon: "el-icon-delete", color: "#909399" }
];

function dateFormat(timestamp) {
    if (!timestamp) return;
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(timestamp).toLocaleString('ru', options);
}

function calculateOrderPrice(items) {
    return items.reduce((acc, product) => {
        return product.price_after_discount ? acc + product.price_after_discount : acc + product.price;
    }, 0);
}

function getStatusData(status) {
    return status ? orderStates.find(item => item.status === status) : "";
}

function getStatusTag(status) {
    return status ? orderStates.find(item => item.status === status).tag_type : "";
}

function getStatusTagByLabel(label) {
    return label ? orderStates.find(item => item.label === label).tag_type : "";
}

function getStatusColor(status) {
    return status ? orderStates.find(item => item.status === status).color : "";
}

function dropDownStringCreator(orders) {
    return orders.map(obj => obj.search =
        "#" + obj.order +
        " " + obj.name +
        " " + obj.phone +
        " " + (obj.instagram ? "@" + obj.instagram + " " : "") +
        "(" + this.getStatusData(obj.status).label + ")");
}

module.exports = {
    orderStates,
    dateFormat,
    calculateOrderPrice,
    getStatusData,
    dropDownStringCreator,
    getStatusTag,
    getStatusTagByLabel,
    getStatusColor
};

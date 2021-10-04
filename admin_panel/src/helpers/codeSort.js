export default function compare(a, b) {
    const reg = /(?<g1>^1|2)\.(?<g2>[0-9]{1,2})\.(?<g3>[0-9]{1,2})?\.?(?<g4>[0-9]{1,2})?\.?(?<g5>.*$)?/;
    const res1 = a.code.match(reg);
    const res2 = b.code.match(reg);

    if (parseInt(res1.groups.g1) < parseInt(res2.groups.g1)) {
        return 1;
    }
    if (parseInt(res1.groups.g1) > parseInt(res2.groups.g1)) {
        return -1;
    }
    if (parseInt(res1.groups.g2) < parseInt(res2.groups.g2)) {
        return 1;
    }
    if (parseInt(res1.groups.g2) > parseInt(res2.groups.g2)) {
        return -1;
    }
    if (parseInt(res1.groups.g3) < parseInt(res2.groups.g3)) {
        return 1;
    }
    if (parseInt(res1.groups.g3) > parseInt(res2.groups.g3)) {
        return -1;
    }
    if (parseInt(res1.groups.g4) < parseInt(res2.groups.g4)) {
        return 1;
    }
    if (parseInt(res1.groups.g4) > parseInt(res2.groups.g4)) {
        return -1;
    }
    if (parseInt(res1.groups.g5) < parseInt(res2.groups.g5)) {
        return 1;
    }
    if (parseInt(res1.groups.g5) > parseInt(res2.groups.g5)) {
        return -1;
    }
    if (res1[0].length < res2[0].length) {
        return 1;
    }
    if (res1[0].length > res2[0].length) {
        return -1;
    }
    return 0;
}

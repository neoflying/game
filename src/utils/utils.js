export default {
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    compareDes: function (obj1, obj2) {
        var val1 = obj1.gameid;
        var val2 = obj2.gameid;
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    },
    compareAsc: function (obj1, obj2) {
        var val1 = obj1.gameid;
        var val2 = obj2.gameid;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    },
}
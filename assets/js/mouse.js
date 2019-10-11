function sparkle() {
    var t;
    if (x != ox || y != oy) for (ox = x, oy = y, t = 0; sparkles > t; t++) if (!starv[t]) {
        star[t].style.left = (starx[t] = x) + "px", star[t].style.top = (stary[t] = y) + "px", star[t].style.clip = "rect(0px, 5px, 5px, 0px)", star[t].style.visibility = "visible", starv[t] = 5;
        break
    }
    for (t = 0; sparkles > t; t++) starv[t] && update_star(t), tinyv[t] && update_tiny(t);
    setTimeout("sparkle()", 40)
}
function update_star(t) {
    if (25 == --starv[t] && (star[t].style.clip = "rect(1px, 4px, 4px, 1px)"), starv[t]) {
        if (stary[t] += 1 + 3 * Math.random(), !(stary[t] < shigh + sdown)) return star[t].style.visibility = "hidden", starv[t] = 0, void 0;
        star[t].style.top = stary[t] + "px", starx[t] += (t % 5 - 2) / 5, star[t].style.left = starx[t] + "px"
    } else tinyv[t] = 25, tiny[t].style.top = (tinyy[t] = stary[t]) + "px", tiny[t].style.left = (tinyx[t] = starx[t]) + "px", tiny[t].style.width = "4px", tiny[t].style.height = "4px", star[t].style.visibility = "hidden", tiny[t].style.visibility = "visible"
}
function update_tiny(t) {
    if (1e3 == --tinyv[t] && (tiny[t].style.width = "1px", tiny[t].style.height = "1px"), tinyv[t]) {
        if (tinyy[t] += 1 + 3 * Math.random(), !(tinyy[t] < shigh + sdown)) return tiny[t].style.visibility = "hidden", tinyv[t] = 0, void 0;
        tiny[t].style.top = tinyy[t] + "px", tinyx[t] += (t % 5 - 2) / 5, tiny[t].style.left = tinyx[t] + "px"
    } else tiny[t].style.visibility = "hidden"
}
function mouse(t) {
    set_scroll(), y = t ? t.pageY : event.y + sdown, x = t ? t.pageX : event.x + sleft
}
function set_scroll() {
    "number" == typeof self.pageYOffset ? (sdown = self.pageYOffset, sleft = self.pageXOffset) : document.body.scrollTop || document.body.scrollLeft ? (sdown = document.body.scrollTop, sleft = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft) ? (sleft = document.documentElement.scrollLeft, sdown = document.documentElement.scrollTop) : (sdown = 0, sleft = 0)
}
function set_width() {
    "number" == typeof self.innerWidth ? (swide = self.innerWidth, shigh = self.innerHeight) : document.documentElement && document.documentElement.clientWidth ? (swide = document.documentElement.clientWidth, shigh = document.documentElement.clientHeight) : document.body.clientWidth && (swide = document.body.clientWidth, shigh = document.body.clientHeight)
}
function createDiv(t, e) {
    var i = document.createElement("div");
    return i.style.position = "absolute", i.style.height = t + "px", i.style.width = e + "px", i.style.overflow = "hidden", i.style.backgroundColor = colour, i
}
var colour = "#d6fa6e",
    sparkles = 4,
    x = ox = 400,
    y = oy = 300,
    swide = 800,
    shigh = 600,
    sleft = sdown = 0,
    tiny = new Array,
    star = new Array,
    starv = new Array,
    starx = new Array,
    stary = new Array,
    tinyx = new Array,
    tinyy = new Array,
    tinyv = new Array;
window.onload = function() {
    if (document.getElementById) {
        for (var t, e, i, n, t = 0; sparkles > t; t++) {
            var e = createDiv(6, 6);
            e.style.visibility = "hidden", document.body.appendChild(tiny[t] = e), starv[t] = 0, tinyv[t] = 0;
            var e = createDiv(10, 10);
            e.style.backgroundColor = "transparent", e.style.visibility = "hidden";
            var i = createDiv(2, 10),
                n = createDiv(10, 2);
            e.appendChild(i), e.appendChild(n), i.style.top = "2px", i.style.left = "0px", n.style.top = "0px", n.style.left = "2px", document.body.appendChild(star[t] = e)
        }
        set_width(), sparkle()
    }
}, document.onmousemove = mouse, window.onresize = set_width;
var bifs = "vendors = moz webkit o ms official\n\n// stringify the given arg\n\n-string(arg)\n  type(arg) + ' ' + arg\n\n// require a color\n\nrequire-color(color)\n  unless color is a 'color' \n    error('RGB or HSL value expected, got a ' + -string(color))\n\n// require a unit\n\nrequire-unit(n)\n  unless n is a 'unit'\n    error('unit expected, got a ' + -string(n))\n\n// require a string\n\nrequire-string(str)\n  unless str is a 'string' or str is a 'ident'\n    error('string expected, got a ' + -string(str))\n\n// apply js Math function\n\nmath(n, fn) \n  require-unit(n)\n  require-string(fn)\n  -math(n, fn)\n\n// adjust the given color's property by amount\n\nadjust(color, prop, amount)\n  require-color(color)\n  require-string(prop)\n  require-unit(amount)\n  -adjust(color, prop, amount)\n\n// Math functions\n\nabs(n) { math(n, 'abs') }\nceil(n) { math(n, 'ceil') }\nfloor(n) { math(n, 'floor') }\nround(n) { math(n, 'round') }\nsin(n) { math(n, 'sin') }\ncos(n) { math(n, 'cos') }\nmin(a, b) { a < b ? a : b }\nmax(a, b) { a > b ? a : b }\nPI = -math-prop('PI')\n\n// return the sum of the given numbers\n\nsum(nums)\n  sum = 0\n  sum += n for n in nums\n\n// return the average of the given numbers\n\navg(nums)\n  sum(nums) / length(nums)\n\n// color components\n\nalpha(color) { component(hsl(color), 'alpha') }\nhue(color) { component(hsl(color), 'hue') }\nsaturation(color) { component(hsl(color), 'saturation') }\nlightness(color) { component(hsl(color), 'lightness') }\n\n// check if n is an odd number\n\nodd(n)\n  1 == n % 2\n\n// check if n is an even number\n\neven(n)\n  0 == n % 2\n\n// check if color is light\n\nlight(color)\n  lightness(color) >= 50%\n\n// check if color is dark\n\ndark(color)\n  lightness(color) < 50%\n\n// desaturate color by amount\n\ndesaturate(color, amount)\n  adjust(color, 'saturation', - amount)\n\n// saturate color by amount\n\nsaturate(color, amount)\n  adjust(color, 'saturation', amount)\n\n// darken by the given amount\n\ndarken(color, amount)\n  adjust(color, 'lightness', - amount)\n\n// lighten by the given amount\n\nlighten(color, amount)\n  adjust(color, 'lightness', amount)\n\n// decerase opacity by amount\n\nfade-out(color, amount)\n  color - rgba(black, amount)\n\n// increase opacity by amount\n\nfade-in(color, amount)\n  color + rgba(black, amount)\n\n// return the last value in the given expr\n\nlast(expr)\n  expr[length(expr) - 1]\n\n// join values with the given delimiter\n\njoin(delim, vals...)\n  buf = ''\n  vals = vals[0] if length(vals) == 1\n  for val, i in vals\n    buf += i ? delim + val : val\n",
 stylus = function () {
        function a(b) {
            var c = a.resolve(b),
                d = a.modules[c];
            if (!d) throw new Error('failed to require "' + b + '"');
            return d.exports || (d.exports = {}, d.call(d.exports, d, d.exports, a.relative(c))), d.exports
        }
        return a.modules = {}, a.resolve = function (b) {
            var c = b,
                d = b + ".js",
                e = b + "/index.js";
            return a.modules[d] && d || a.modules[e] && e || c
        }, a.register = function (b, c) {
            a.modules[b] = c
        }, a.relative = function (b) {
            return function (c) {
                if ("." != c[0]) return a(c);
                var d = b.split("/"),
                    e = c.split("/");
                d.pop();
                for (var f = 0; f < e.length; f++) {
                    var g = e[f];
                    ".." == g ? d.pop() : "." != g && d.push(g)
                }
                return a(d.join("/"))
            }
        }, a.register("path.js", function (a, b, c) {
            function e(a, b) {
                var c = 0;
                for (var d = a.length - 1; d >= 0; d--) {
                    var e = a[d];
                    e == "." ? a.splice(d, 1) : e === ".." ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
                }
                if (b)
                    for (; c--; c) a.unshift("..");
                return a
            }
            var d = !1,
                f = /^([\s\S]+\/(?!$)|\/)?((?:[\s\S]+?)?(\.[^.]*)?)$/;
            b.normalize = function (a) {
                var b = a.charAt(0) === "/",
                    c = a.slice(-1) === "/";
                return a = e(a.split("/").filter(function (a) {
                    return !!a
                }), !b).join("/"), !a && !b && (a = "."), a && c && (a += "/"), (b ? "/" : "") + a
            }, b.join = function () {
                var a = Array.prototype.slice.call(arguments, 0);
                return b.normalize(a.filter(function (a, b) {
                    return a && typeof a == "string"
                }).join("/"))
            }, b.relative = function (a, c) {
                function d(a) {
                    var b = 0;
                    for (; b < a.length; b++)
                        if (a[b] !== "") break;
                    var c = a.length - 1;
                    for (; c >= 0; c--)
                        if (a[c] !== "") break;
                    return b > c ? [] : a.slice(b, c - b + 1)
                }
                a = b.resolve(a).substr(1), c = b.resolve(c).substr(1);
                var e = d(a.split("/")),
                    f = d(c.split("/")),
                    g = Math.min(e.length, f.length),
                    h = g;
                for (var i = 0; i < g; i++)
                    if (e[i] !== f[i]) {
                        h = i;
                        break
                    }
                var j = [];
                for (var i = h; i < e.length; i++) j.push("..");
                return j = j.concat(f.slice(h)), j.join("/")
            }, b.dirname = function (a) {
                var b = f.exec(a)[1] || "";
                return b ? b.length === 1 || d && b.length <= 3 && b.charAt(1) === ":" ? b : b.substring(0, b.length - 1) : "."
            }, b.basename = function (a, b) {
                var c = f.exec(a)[2] || "";
                return b && c.substr(-1 * b.length) === b && (c = c.substr(0, c.length - b.length)), c
            }, b.extname = function (a) {
                return f.exec(a)[3] || ""
            }
        }), a.register("colors.js", function (a, b, c) {
            a.exports = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 132, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 255, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 203],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [119, 128, 144],
                slategrey: [119, 128, 144],
                snow: [255, 255, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 5]
            }
        }), a.register("errors.js", function (a, b, c) {
            function d(a) {
                this.name = "ParseError", this.message = a, Error.captureStackTrace(this, d)
            }

            function e(a) {
                this.name = "SyntaxError", this.message = a, Error.captureStackTrace(this, d)
            }
            b.ParseError = d, b.SyntaxError = e, e.prototype.__proto__ = Error.prototype, d.prototype.__proto__ = Error.prototype, e.prototype.__proto__ = Error.prototype
        }), a.register("functions/index.js", function (a, b, c) {
            var d = c("../visitor/compiler"),
                e = c("../nodes"),
                f = c("../utils"),
                g = c("./image"),
                h = {
                    red: "r",
                    green: "g",
                    blue: "b",
                    alpha: "a",
                    hue: "h",
                    saturation: "s",
                    lightness: "l"
                },
                i = {
                    hue: "deg",
                    saturation: "%",
                    lightness: "%"
                },
                j = {
                    red: "rgba",
                    blue: "rgba",
                    green: "rgba",
                    alpha: "rgba",
                    hue: "hsla",
                    saturation: "hsla",
                    lightness: "hsla"
                };
            b.hsla = function (b, c, d, g) {
                switch (arguments.length) {
                    case 1:
                        return f.assertColor(b), b.hsla;
                    default:
                        return f.assertType(b, "unit", "hue"), f.assertType(c, "unit", "saturation"), f.assertType(d, "unit", "lightness"), f.assertType(g, "unit", "alpha"), new e.HSLA(b.val, c.val, d.val, g.val)
                }
            }, b.hsl = function (c, d, g) {
                return 1 == arguments.length ? (f.assertColor(c, "color"), c.hsla) : b.hsla(c, d, g, new e.Unit(1))
            }, b.type = b["typeof"] = b["type-of"] = function k(a) {
                f.assertPresent(a, "expression");
                var k = a.nodeName;
                return new e.String(k)
            }, b.component = function (b, c) {
                f.assertColor(b, "color"), f.assertString(c, "name");
                var c = c.string,
                    d = i[c],
                    g = j[c],
                    c = h[c];
                if (!c) throw new Error('invalid color component "' + c + '"');
                return new e.Unit(b[g][c], d)
            }, b.red = function (c) {
                return b.component(c, new e.String("red"))
            }, b.green = function (c) {
                return b.component(c, new e.String("green"))
            }, b.blue = function (c) {
                return b.component(c, new e.String("blue"))
            }, b.rgba = function (b, c, d, g) {
                switch (arguments.length) {
                    case 1:
                        f.assertColor(b);
                        var h = b.rgba;
                        return new e.RGBA(h.r, h.g, h.b, h.a);
                    case 2:
                        f.assertColor(b);
                        var h = b.rgba;
                        return f.assertType(c, "unit", "alpha"), new e.RGBA(h.r, h.g, h.b, c.val);
                    default:
                        return f.assertType(b, "unit", "red"), f.assertType(c, "unit", "green"), f.assertType(d, "unit", "blue"), f.assertType(g, "unit", "alpha"), new e.RGBA(b.val, c.val, d.val, g.val)
                }
            }, b.rgb = function (c, d, g) {
                switch (arguments.length) {
                    case 1:
                        f.assertColor(c);
                        var h = c.rgba;
                        return new e.RGBA(h.r, h.g, h.b, 1);
                    default:
                        return b.rgba(c, d, g, new e.Unit(1))
                }
            }, b.unquote = function (b) {
                return f.assertString(b, "string"), new e.Literal(b.string)
            }, b.unit = function l(l, a) {
                return f.assertType(l, "unit", "unit"), a ? (f.assertString(a, "type"), new e.Unit(l.val, a.string)) : new e.String(l.type || "")
            }, b.lookup = function (b) {
                f.assertType(b, "string", "name");
                var c = this.lookup(b.val);
                return c ? this.visit(c) : e.nil
            }, b.operate = function (b, c, d) {
                return f.assertType(b, "string", "op"), f.assertPresent(c, "left"), f.assertPresent(d, "right"), c.operate(b.val, d)
            }, b.match = function (b, c) {
                f.assertType(b, "string", "pattern"), f.assertString(c, "val");
                var d = new RegExp(b.val);
                return e.Boolean(d.test(c.string))
            }, (b.length = function (b) {
                return b ? b.nodes ? new e.Unit(f.unwrap(b).nodes.length) : new e.Unit(1) : new e.Unit(0)
            }).raw = !0, (b.p = function (b) {
                return b = f.unwrap(b), console.log("[90minspect:[0m undefined", b.toString().replace(/^\(|\)$/g, "")), e.nil
            }).raw = !0, b.error = function (b) {
                throw f.assertType(b, "string", "msg"), new Error(b.val)
            }, b.warn = function (b) {
                return f.assertType(b, "string", "msg"), console.warn("Warning: undefined", b.val), e.nil
            }, b.trace = function () {
                return console.log(this.stack), e.nil
            }, (b.push = b.append = function (a) {
                a = f.unwrap(a);
                for (var b = 1, c = arguments.length; b < c; ++b) a.nodes.push(f.unwrap(arguments[b]));
                return new e.Unit(a.nodes.length)
            }).raw = !0, (b.unshift = b.prepend = function (a) {
                a = f.unwrap(a);
                for (var b = 1, c = arguments.length; b < c; ++b) a.nodes.unshift(f.unwrap(arguments[b]));
                return new e.Unit(a.nodes.length)
            }).raw = !0, (b.s = function (b) {
                b = f.unwrap(b).nodes[0], f.assertString(b);
                var c = this,
                    g = b.string,
                    h = arguments,
                    i = 1;
                return g = g.replace(/%(s|d)/g, function (a, b) {
                    var g = h[i++] || e.nil;
                    switch (b) {
                        case "s":
                            return (new d(g, c.options)).compile();
                        case "d":
                            g = f.unwrap(g).first;
                            if ("unit" != g.nodeName) throw new Error("NaN requires a unit");
                            return g.val
                    }
                }), new e.Literal(g)
            }).raw = !0, (b["opposite-position"] = function (b) {
                var c = new e.Expression;
                return f.unwrap(b).nodes.forEach(function (a, b) {
                    f.assertString(a, "position " + b), a = function () {
                        switch (a.string) {
                            case "top":
                                return "bottom";
                            case "bottom":
                                return "top";
                            case "left":
                                return "right";
                            case "right":
                                return "left";
                            default:
                                throw new Error("invalid position " + a)
                        }
                    }(), c.push(new e.Literal(a))
                }), c
            }).raw = !0, b["image-size"] = function (b) {
                f.assertType(b, "string", "img");
                var b = new g(this, b.string);
                b.open();
                var c = b.size();
                b.close();
                var d = new e.Expression;
                return d.push(new e.Unit(c[0], "px")), d.push(new e.Unit(c[1], "px")), d
            }, b["-math"] = function (b, c) {
                return new e.Unit(Math[c.string](b.val), b.type)
            }, b["-math-prop"] = function (b) {
                return new e.Unit(Math[b.string])
            }, b.js = function (b) {
                return f.assertString(b, "str"), new e.JSLiteral(b.val)
            }, b["-adjust"] = function (b, c, d) {
                var e = b.hsla.clone();
                c = {
                    hue: "h",
                    saturation: "s",
                    lightness: "l"
                }[c.string];
                if (!c) throw new Error("invalid adjustment property");
                var f = d.val;
                return "%" == d.type && (f = "l" == c && f > 0 ? (100 - e[c]) * f / 100 : e[c] * (f / 100)), e[c] += f, e.rgba
            }, (b.clone = function (b) {
                return f.assertPresent(b, "expr"), b.clone()
            }).raw = !0, (b["add-property"] = function (b, c) {
                f.assertType(b, "expression", "name"), b = f.unwrap(b).first, f.assertString(b, "name"), f.assertType(c, "expression", "expr");
                var d = new e.Property([b], c),
                    g = this.closestBlock,
                    h = g.nodes.length,
                    i = g.nodes.slice(0, g.index),
                    j = g.nodes.slice(g.index++, h);
                return i.push(d), g.nodes = i.concat(j), d
            }).raw = !0
        }), a.register("functions/image.js", function (a, b, c) {
            var d = c("../utils"),
                e = c("../nodes"),
                f = a.exports = function (b, c) {
                    this.ctx = b, this.path = d.lookup(c, b.paths);
                    if (!this.path) throw new Error("failed to locate file " + c)
                };
            f.prototype.open = function () {
                this.fd = fs.openSync(this.path, "r")
            }, f.prototype.close = function () {
                this.fd && fs.closeSync(this.fd)
            }, f.prototype.type = function () {
                var a, b = new Buffer(4);
                return fs.readSync(this.fd, b, 0, 4, 0), 71 == b[0] && 73 == b[1] && 70 == b[2] ? a = "gif" : 80 == b[1] && 78 == b[2] && 71 == b[3] ? a = "png" : 255 == b[0] && 216 == b[1] && (a = "jpeg"), a
            }, f.prototype.size = function () {
                function d(a) {
                    return a[1] << 8 | a[0]
                }

                function e(a) {
                    return a[0] << 24 | a[1] << 16 | a[2] << 8 | a[3]
                }
                var a, b, c = this.type();
                switch (c) {
                    case "jpeg":
                        throw new Error("image-size() jpeg support not yet implemented");
                    case "png":
                        var f = new Buffer(8);
                        fs.readSync(this.fd, f, 0, 8, 16), a = e(f), b = e(f.slice(4, 8));
                        break;
                    case "gif":
                        var f = new Buffer(4);
                        fs.readSync(this.fd, f, 0, 4, 6), a = d(f), b = d(f.slice(2, 4))
                }
                if ("number" != typeof a) throw new Error('failed to find width of "' + this.path + '"');
                if ("number" != typeof b) throw new Error('failed to find height of "' + this.path + '"');
                return [a, b]
            }
        }), a.register("functions/url.js", function (a, b, c) {
            var d = c("../visitor/compiler"),
                e = c("../nodes"),
                f = c("../path").extname,
                g = c("../utils"),
                h = {
                    ".gif": "image/gif",
                    ".png": "image/png",
                    ".jpg": "image/jpeg",
                    ".jpeg": "image/jpeg",
                    ".svg": "image/svg+xml"
                };
            a.exports = function (a) {
                function i(a) {
                    var i = new d(a);
                    i.isURL = !0;
                    var a = a.nodes.map(function (a) {
                        return i.visit(a)
                    }).join(""),
                        a = parse(a),
                        j = f(a.pathname),
                        k = h[j],
                        l = new e.Literal('url("' + a.href + '")'),
                        m = c.concat(this.paths),
                        n, o;
                    return k ? a.protocol ? l : (found = g.lookup(a.pathname, m), found ? (o = fs.readFileSync(found), o.length > b ? l : new e.Literal('url("data:' + k + ";base64," + o.toString("base64") + '")')) : l) : l
                }
                a = a || {};
                var b = a.limit || 3e4,
                    c = a.paths || [];
                return i.raw = !0, i
            }
        }), a.register("lexer.js", function (a, b, c) {
            var d = c("./token"),
                e = c("./nodes"),
                f = c("./errors"),
                g = {
                    and: "&&",
                    or: "||",
                    is: "==",
                    isnt: "!=",
                    "is not": "!=",
                    ":=": "?="
                },
                h = ["em", "ex", "px", "mm", "cm", "in", "pt", "pc", "deg", "rad", "grad", "ms", "s", "Hz", "kHz", "rem", "%"].join("|"),
                i = new RegExp("^(-)?(\\d+\\.\\d+|\\d+|\\.\\d+)(" + h + ")? *"),
                j = a.exports = function (b, c) {
                    c = c || {}, this.str = b.replace(/\r\n?/g, "\n"), this.stash = [], this.indentStack = [], this.indentRe = null, this.lineno = 1
                };
            j.prototype = {
                inspect: function () {
                    var a, b = this.str,
                        c = [];
                    while ("eos" != (a = this.next()).type) c.push(a.inspect());
                    return this.str = b, this.prevIndents = 0, c.concat(a.inspect()).join("\n")
                }, lookahead: function (a) {
                    var b = a - this.stash.length;
                    while (b-- > 0) this.stash.push(this.advance());
                    return this.stash[--a]
                }, skip: function (a) {
                    this.str = this.str.substr(Array.isArray(a) ? a[0].length : a)
                }, next: function () {
                    var a = this.stashed() || this.advance();
                    switch (a.type) {
                        case "newline":
                        case "indent":
                            ++this.lineno;
                            break;
                        case "outdent":
                            "outdent" != this.prev.type && ++this.lineno
                    }
                    return this.prev = a, a.lineno = this.lineno, a
                }, advance: function () {
                    return this.eos() || this.nil() || this.sep() || this.keyword() || this.urlchars() || this.atrule() || this.scope() || this.media() || this.comment() || this.newline() || this.escaped() || this.important() || this.literal() || this.fun() || this.brace() || this.paren() || this.color() || this.string() || this.unit() || this.namedop() || this.boolean() || this.ident() || this.op() || this.space() || this.selector()
                }, peek: function () {
                    return this.lookahead(1)
                }, stashed: function () {
                    return this.stash.shift()
                }, eos: function () {
                    if (this.str.length) return;
                    return this.indentStack.length ? (this.indentStack.shift(), new d("outdent")) : new d("eos")
                }, urlchars: function () {
                    var a;
                    if (!this.isURL) return;
                    if (a = /^[\/:@.;?&=*!,<>#%0-9]+/.exec(this.str)) return this.skip(a), new d("literal", new e.Literal(a[0]))
                }, sep: function () {
                    var a;
                    if (a = /^; */.exec(this.str)) return this.skip(a), new d(";")
                }, space: function () {
                    var a;
                    if (a = /^( +)/.exec(this.str)) return this.skip(a), new d("space")
                }, escaped: function () {
                    var a;
                    if (a = /^\\(.) */.exec(this.str)) {
                        var b = a[1];
                        return this.skip(a), new d("ident", new e.Literal(b))
                    }
                }, literal: function () {
                    var a;
                    if (a = /^@css *\{/.exec(this.str)) {
                        this.skip(a);
                        var b, c = 1,
                            f = "";
                        while (b = this.str[0]) {
                            this.str = this.str.substr(1);
                            switch (b) {
                                case "{":
                                    ++c;
                                    break;
                                case "}":
                                    --c
                            }
                            f += b;
                            if (!c) break
                        }
                        return f = f.replace(/\s*}$/, ""), new d("literal", new e.Literal(f))
                    }
                }, important: function () {
                    var a;
                    if (a = /^!important */.exec(this.str)) return this.skip(a), new d("ident", new e.Literal("!important"))
                }, brace: function () {
                    var a;
                    if (a = /^([{}])/.exec(this.str)) {
                        this.skip(1);
                        var b = a[1];
                        return new d(b, b)
                    }
                }, paren: function () {
                    var a;
                    if (a = /^([()]) */.exec(this.str)) {
                        var b = a[1];
                        return this.skip(a), ")" == b && (this.isURL = !1), new d(b, b)
                    }
                }, nil: function () {
                    var a;
                    if (a = /^(null)\b */.exec(this.str)) return this.skip(a), new d("null", e.nil)
                }, keyword: function () {
                    var a;
                    if (a = /^(return|if|else|unless|for|in)\b */.exec(this.str)) {
                        var b = a[1];
                        return this.skip(a), new d(b, b)
                    }
                }, namedop: function () {
                    var a;
                    if (a = /^(not|and|or|is a|is defined|isnt|is not|is)\b( *)/.exec(this.str)) {
                        var b = a[1];
                        this.skip(a), b = g[b] || b;
                        var c = new d(b, b);
                        return c.space = a[2], c
                    }
                }, op: function () {
                    var a;
                    if (a = /^([.]{2,3}|&&|\|\||[!<>=?:]=|\*\*|[-+*\/%]=?|[,=?:!~<>&\[\]])( *)/.exec(this.str)) {
                        var b = a[1];
                        this.skip(a), b = g[b] || b;
                        var c = new d(b, b);
                        return c.space = a[2], c
                    }
                }, media: function () {
                    var a;
                    if (a = /^@media *([^\/{\n]+)/.exec(this.str)) return this.skip(a), new d("media", a[1].trim())
                }, scope: function () {
                    var a;
                    if (a = /^@scope *([^\/{\n]+)/.exec(this.str)) return this.skip(a), new d("scope", a[1].trim())
                }, atrule: function () {
                    var a;
                    if (a = /^@(import|(?:-(\w+)-)?keyframes|charset|font-face|page) */.exec(this.str)) {
                        this.skip(a);
                        var b = a[2],
                            c = a[1];
                        return b && (c = "keyframes"), new d(c, b)
                    }
                }, comment: function () {
                    if ("/" == this.str[0] && "/" == this.str[1]) {
                        var a = this.str.indexOf("\n");
                        return -1 == a && (a = this.str.length), this.skip(a), this.advance()
                    }
                    if ("/" == this.str[0] && "*" == this.str[1]) {
                        var a = this.str.indexOf("*/"); - 1 == a && (a = this.str.length);
                        var b = this.str.substr(0, a + 2),
                            c = b.split("\n").length - 1,
                            f = !0;
                        return this.lineno += c, this.skip(a + 2), "!" == b[2] && (b = b.replace("*!", "*"), f = !1), new d("comment", new e.Comment(b, f))
                    }
                }, "boolean": function () {
                    var a;
                    if (a = /^(true|false)\b( *)/.exec(this.str)) {
                        var b = e.Boolean("true" == a[1]);
                        this.skip(a);
                        var c = new d("boolean", b);
                        return c.space = a[2], c
                    }
                }, fun: function () {
                    var a;
                    if (a = /^(-?[a-zA-Z$][-\w\d$]*)\(( *)/.exec(this.str)) {
                        var b = a[1];
                        this.skip(a), this.isURL = "url" == b;
                        var c = new d("function", new e.Ident(b));
                        return c.space = a[2], c
                    }
                }, ident: function () {
                    var a;
                    if (a = /^(@)?(-?[_a-zA-Z$][-\w\d$]*)/.exec(this.str)) {
                        var b = a[1],
                            c = a[2],
                            f = new e.Ident(c);
                        return this.skip(a), f.property = !!b, new d("ident", f)
                    }
                }, newline: function () {
                    var a, b;
                    this.indentRe ? a = this.indentRe.exec(this.str) : (b = /^\n([\t]*) */, a = b.exec(this.str), a && !a[1].length && (b = /^\n( *)/, a = b.exec(this.str)), a && a[1].length && (this.indentRe = b));
                    if (a) {
                        var c, e = a[1].length;
                        this.skip(a);
                        if (this.str[0] === " " || this.str[0] === "\t") throw new f.SyntaxError("Invalid indentation. You can use tabs or spaces to indent, but not both.");
                        this.isVariable = !1;
                        if ("\n" == this.str[0]) return ++this.lineno, this.advance();
                        if (this.indentStack.length && e < this.indentStack[0]) {
                            while (this.indentStack.length && this.indentStack[0] > e) this.stash.push(new d("outdent")), this.indentStack.shift();
                            c = this.stash.pop()
                        } else e && e != this.indentStack[0] ? (this.indentStack.unshift(e), c = new d("indent")) : c = new d("newline");
                        return c
                    }
                }, unit: function () {
                    var a;
                    if (a = i.exec(this.str)) {
                        this.skip(a);
                        var b = parseFloat(a[2]);
                        "-" == a[1] && (b = -b);
                        var c = new e.Unit(b, a[3]);
                        return new d("unit", c)
                    }
                }, string: function () {
                    var a;
                    if (a = /^("[^"]*"|'[^']*') */.exec(this.str)) {
                        var b = a[1];
                        return this.skip(a), b = b.slice(1, -1).replace(/\\n/g, "\n"), new d("string", new e.String(b))
                    }
                }, color: function () {
                    return this.rrggbbaa() || this.rrggbb() || this.rgba() || this.rgb()
                }, rgb: function () {
                    var a;
                    if (a = /^#([a-fA-F0-9]{3}) */.exec(this.str)) {
                        this.skip(a);
                        var b = a[1],
                            c = parseInt(b[0] + b[0], 16),
                            f = parseInt(b[1] + b[1], 16),
                            g = parseInt(b[2] + b[2], 16),
                            h = new e.RGBA(c, f, g, 1);
                        return h.raw = a[0], new d("color", h)
                    }
                }, rgba: function () {
                    var a;
                    if (a = /^#([a-fA-F0-9]{4}) */.exec(this.str)) {
                        this.skip(a);
                        var b = a[1],
                            c = parseInt(b[0] + b[0], 16),
                            f = parseInt(b[1] + b[1], 16),
                            g = parseInt(b[2] + b[2], 16),
                            h = parseInt(b[3] + b[3], 16),
                            i = new e.RGBA(c, f, g, h / 255);
                        return i.raw = a[0], new d("color", i)
                    }
                }, rrggbb: function () {
                    var a;
                    if (a = /^#([a-fA-F0-9]{6}) */.exec(this.str)) {
                        this.skip(a);
                        var b = a[1],
                            c = parseInt(b.substr(0, 2), 16),
                            f = parseInt(b.substr(2, 2), 16),
                            g = parseInt(b.substr(4, 2), 16),
                            h = new e.RGBA(c, f, g, 1);
                        return h.raw = a[0], new d("color", h)
                    }
                }, rrggbbaa: function () {
                    var a;
                    if (a = /^#([a-fA-F0-9]{8}) */.exec(this.str)) {
                        this.skip(a);
                        var b = a[1],
                            c = parseInt(b.substr(0, 2), 16),
                            f = parseInt(b.substr(2, 2), 16),
                            g = parseInt(b.substr(4, 2), 16),
                            h = parseInt(b.substr(6, 2), 16),
                            i = new e.RGBA(c, f, g, h / 255);
                        return i.raw = a[0], new d("color", i)
                    }
                }, selector: function () {
                    var a;
                    if (a = /^[^{\n,]+/.exec(this.str)) {
                        var b = a[0];
                        return this.skip(a), new d("selector", b)
                    }
                }
            }
        }), a.register("nodes/arguments.js", function (a, b, c) {
            var d = c("./node"),
                e = c("../nodes"),
                f = c("../utils"),
                g = a.exports = function () {
                    e.Expression.call(this), this.map = {}
                };
            g.prototype.__proto__ = e.Expression.prototype, g.fromExpression = function (a) {
                var b = new g,
                    c = a.nodes.length;
                b.lineno = a.lineno, b.isList = a.isList;
                for (var d = 0; d < c; ++d) b.push(a.nodes[d]);
                return b
            }, g.prototype.clone = function () {
                var a = e.Expression.prototype.clone.call(this);
                return a.map = this.map, a
            }
        }), a.register("nodes/binop.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c, e) {
                    d.call(this), this.op = b, this.left = c, this.right = e
                };
            e.prototype.__proto__ = d.prototype, e.prototype.clone = function () {
                var a = new e(this.op, this.left.clone(), this.right ? this.right.clone() : null);
                return a.lineno = this.lineno, a.filename = this.filename, this.val && (a.val = this.val.clone()), a
            }
        }), a.register("nodes/block.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c) {
                    d.call(this), this.nodes = [], this.parent = b, this.node = c, this.scope = !0
                };
            e.prototype.__proto__ = d.prototype, e.prototype.__defineGetter__("hasProperties", function () {
                for (var a = 0, b = this.nodes.length; a < b; ++a)
                    if ("property" == this.nodes[a].nodeName) return !0
            }), e.prototype.__defineGetter__("isEmpty", function () {
                return !this.nodes.length
            }), e.prototype.clone = function () {
                var a = new e(this.parent, this.node);
                return a.lineno = this.lineno, a.filename = this.filename, a.scope = this.scope, this.nodes.forEach(function (b) {
                    b = b.clone();
                    switch (b.nodeName) {
                        case "each":
                        case "group":
                            b.block.parent = a;
                            break;
                        case "ident":
                            "function" == b.val.nodeName && (b.val.block.parent = a)
                    }
                    a.push(b)
                }), a
            }, e.prototype.push = function (a) {
                this.nodes.push(a)
            }
        }), a.register("nodes/boolean.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function g(a) {
                    d.call(this);
                    if (!this.nodeName) return new g(a);
                    this.val = !!a
                };
            f.prototype.__proto__ = d.prototype, f.prototype.toBoolean = function () {
                return this
            }, f.prototype.__defineGetter__("isTrue", function () {
                return this.val
            }), f.prototype.__defineGetter__("isFalse", function () {
                return !this.val
            }), f.prototype.negate = function () {
                return f(!this.val)
            }, f.prototype.inspect = function () {
                return "[Boolean " + this.val + "]"
            }, f.prototype.toString = function () {
                return this.val ? "true" : "false"
            }
        }), a.register("nodes/call.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c) {
                    d.call(this), this.name = b, this.args = c
                };
            e.prototype.__proto__ = d.prototype, e.prototype.clone = function () {
                var a = new e(this.name, this.args.clone());
                return a.lineno = this.lineno, a.filename = this.filename, a
            }, e.prototype.toString = function () {
                return this.name + "()"
            }
        }), a.register("nodes/charset.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function (b) {
                    d.call(this), this.val = b
                };
            f.prototype.__proto__ = d.prototype, f.prototype.toString = function () {
                return "@charset " + this.val
            }
        }), a.register("nodes/comment.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c) {
                    d.call(this), this.str = b, this.suppress = c
                };
            e.prototype.__proto__ = d.prototype
        }), a.register("nodes/each.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function (b, c, e, f) {
                    d.call(this), this.val = b, this.key = c, this.expr = e, this.block = f
                };
            f.prototype.__proto__ = d.prototype, f.prototype.clone = function () {
                var a = new f(this.val, this.key, this.expr.clone(), this.block.clone());
                return a.lineno = this.lineno, a.filename = this.filename, a
            }
        }), a.register("nodes/expression.js", function (a, b, c) {
            var d = c("./node"),
                e = c("../nodes"),
                f = c("../utils"),
                g = a.exports = function (b) {
                    d.call(this), this.nodes = [], this.isList = b
                };
            g.prototype.__defineGetter__("isEmpty", function () {
                return !this.nodes.length
            }), g.prototype.__defineGetter__("first", function () {
                return this.nodes[0] ? this.nodes[0].first : e.nil
            }), g.prototype.__defineGetter__("hash", function () {
                return this.nodes.map(function (a) {
                    return a.hash
                }).join("::")
            }), g.prototype.__proto__ = d.prototype, g.prototype.clone = function () {
                var a = new this.constructor(this.isList);
                a.preserve = this.preserve, a.lineno = this.lineno, a.filename = this.filename;
                for (var b = 0; b < this.nodes.length; ++b) a.push(this.nodes[b].clone());
                return a
            }, g.prototype.push = function (a) {
                this.nodes.push(a)
            }, g.prototype.operate = function (a, b, c) {
                switch (a) {
                    case "[]=":
                        var g = this,
                            h = f.unwrap(b).nodes,
                            c = f.unwrap(c),
                            i;
                        return h.forEach(function (a) {
                            i = g.nodes.length;
                            if ("unit" == a.nodeName) {
                                var b = a.val;
                                while (b-- > i) g.nodes[b] = e.nil;
                                g.nodes[a.val] = c
                            }
                        }), c;
                    case "[]":
                        var j = new e.Expression,
                            k = f.unwrap(this).nodes,
                            h = f.unwrap(b).nodes;
                        return h.forEach(function (a) {
                            if ("unit" == a.nodeName) {
                                var b = k[a.val];
                                b && j.push(b)
                            }
                        }), j.isEmpty ? e.nil : f.unwrap(j);
                    case "||":
                        if (this.nodes.length > 1) return this;
                        var l = this.first.operate(a, b, c);
                        return l == this.nodes[0] ? this : b;
                    case "in":
                        return d.prototype.operate.call(this, a, b);
                    case "!=":
                        return this.operate("==", b, c).negate();
                    case "==":
                        var i = this.nodes.length,
                            b = b.toExpression(),
                            m, n;
                        if (i != b.nodes.length) return e.no;
                        for (var o = 0; o < i; ++o) {
                            m = this.nodes[o], n = b.nodes[o];
                            if (m.operate(a, n).isTrue) continue;
                            return e.no
                        }
                        return e.yes;
                    default:
                        return this.first.operate(a, b, c)
                }
            }, g.prototype.toBoolean = function () {
                for (var a = 0, b = this.nodes.length; a < b; ++a)
                    if (this.nodes[a].toBoolean().isTrue) return e.yes;
                return e.no
            }, g.prototype.toString = function () {
                return "(" + this.nodes.map(function (a) {
                    return a.toString()
                }).join(this.isList ? ", " : " ") + ")"
            }
        }), a.register("nodes/fontface.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b) {
                    d.call(this), this.block = b
                };
            e.prototype.__proto__ = d.prototype, e.prototype.clone = function () {
                var a = new e(this.block.clone());
                return a.lineno = this.lineno, a.filename = this.filename, a
            }, e.prototype.toString = function () {
                return "@font-face"
            }
        }), a.register("nodes/function.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c, e) {
                    d.call(this), this.name = b, this.params = c, this.block = e, "function" == typeof c && (this.fn = c)
                };
            e.prototype.__defineGetter__("arity", function () {
                return this.params.length
            }), e.prototype.__proto__ = d.prototype, e.prototype.__defineGetter__("hash", function () {
                return "function " + this.name
            }), e.prototype.clone = function () {
                if (this.fn) var a = new e(this.name, this.fn);
                else var a = new e(this.name, this.params.clone(), this.block.clone());
                return a.lineno = this.lineno, a.filename = this.filename, a
            }, e.prototype.toString = function () {
                return this.fn ? this.name + "(" + this.fn.toString().match(/^function *\((.*?)\)/).slice(1).join(", ") + ")" : this.name + "(" + this.params.nodes.join(", ") + ")"
            }
        }), a.register("nodes/group.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function () {
                    d.call(this), this.nodes = []
                };
            e.prototype.__proto__ = d.prototype, e.prototype.push = function (a) {
                this.nodes.push(a)
            }, e.prototype.__defineGetter__("block", function () {
                return this.nodes[0].block
            }), e.prototype.__defineSetter__("block", function (a) {
                for (var b = 0, c = this.nodes.length; b < c; ++b) this.nodes[b].block = a
            }), e.prototype.clone = function () {
                var a = new e;
                return a.lineno = this.lineno, this.nodes.forEach(function (b) {
                    a.push(b.clone())
                }), a.filename = this.filename, a.block = this.block.clone(), a
            }
        }), a.register("nodes/hsla.js", function (a, b, c) {
            function g(a) {
                return a %= 360, a >= 0 ? a : 360 + a
            }

            function h(a) {
                return Math.max(0, Math.min(a, 100))
            }

            function i(a) {
                return Math.max(0, Math.min(a, 1))
            }
            var d = c("./node"),
                e = c("./index"),
                f = b = a.exports = function (b, c, e, f) {
                    d.call(this), this.h = g(b), this.s = h(c), this.l = h(e), this.a = i(f), this.hsla = this
                };
            f.prototype.__proto__ = d.prototype, f.prototype.toString = function () {
                return "hsla(" + this.h + "," + this.s.toFixed(0) + "," + this.l.toFixed(0) + "," + this.a + ")"
            }, f.prototype.clone = function () {
                var a = new f(this.h, this.s, this.l, this.a);
                return a.lineno = this.lineno, a.filename = this.filename, a
            }, f.prototype.__defineGetter__("rgba", function () {
                return e.RGBA.fromHSLA(this)
            }), f.prototype.__defineGetter__("hash", function () {
                return this.rgba.toString()
            }), f.prototype.add = function (a, b, c) {
                return new f(this.h + a, this.s + b, this.l + c, this.a)
            }, f.prototype.sub = function (a, b, c) {
                return this.add(-a, -b, -c)
            }, f.prototype.operate = function (a, b) {
                switch (a) {
                    case "==":
                    case "!=":
                    case "<=":
                    case ">=":
                    case "<":
                    case ">":
                    case "is a":
                    case "||":
                    case "&&":
                        return this.rgba.operate(a, b);
                    default:
                        return this.rgba.operate(a, b).hsla
                }
            }, b.fromRGBA = function (a) {
                var b = a.r / 255,
                    c = a.g / 255,
                    d = a.b / 255,
                    e = a.a,
                    g = Math.min(b, c, d),
                    h = Math.max(b, c, d),
                    i = (h + g) / 2,
                    j = h - g,
                    k, l;
                switch (h) {
                    case g:
                        k = 0;
                        break;
                    case b:
                        k = 60 * (c - d) / j;
                        break;
                    case c:
                        k = 60 * (d - b) / j + 120;
                        break;
                    case d:
                        k = 60 * (b - c) / j + 240
                }
                return h == g ? l = 0 : i < .5 ? l = j / (2 * i) : l = j / (2 - 2 * i), k %= 360, l *= 100, i *= 100, new f(k, l, i, e)
            }, f.prototype.adjustLightness = function (a) {
                return this.l = h(this.l + this.l * (a / 100)), this
            }, f.prototype.adjustHue = function (a) {
                return this.h = g(this.h + a), this
            }
        }), a.register("nodes/ident.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function (b, c) {
                    d.call(this), this.name = b, this.string = b, this.val = c || e.nil
                };
            f.prototype.__defineGetter__("isEmpty", function () {
                return undefined == this.val
            }), f.prototype.__defineGetter__("hash", function () {
                return this.name
            }), f.prototype.__proto__ = d.prototype, f.prototype.clone = function () {
                var a = new f(this.name, this.val.clone());
                return a.lineno = this.lineno, a.filename = this.filename, a.property = this.property, a
            }, f.prototype.toString = function () {
                return this.name
            }, f.prototype.coerce = function (a) {
                switch (a.nodeName) {
                    case "ident":
                    case "string":
                    case "literal":
                        return new f(a.string);
                    default:
                        return d.prototype.coerce.call(this, a)
                }
            }, f.prototype.operate = function (a, b) {
                var c = b.first;
                switch (a) {
                    case "-":
                        if ("unit" == c.nodeName) {
                            var f = new e.Expression;
                            return c.val = -c.val, f.push(this), f.push(c), f
                        };
                    case "+":
                        return new e.Ident(this.string + this.coerce(c).string)
                }
                return d.prototype.operate.call(this, a, b)
            }
        }), a.register("nodes/if.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c) {
                    d.call(this), this.cond = b, this.elses = [], c && c.nodeName ? this.block = c : this.negate = c
                };
            e.prototype.__proto__ = d.prototype, e.prototype.clone = function () {
                var a = this.cond.clone(),
                    b = this.block.clone(),
                    c = new e(a, b);
                return c.elses = this.elses.map(function (a) {
                    return a.clone()
                }), c.negate = this.negate, c.lineno = this.lineno, c.filename = this.filename, c
            }
        }), a.register("nodes/import.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b) {
                    d.call(this), this.path = b
                };
            e.prototype.__proto__ = d.prototype
        }), a.register("nodes/index.js", function (a, b, c) {
            b.Node = c("./node"), b.Root = c("./root"), b.Null = c("./null"), b.Each = c("./each"), b.If = c("./if"), b.Call = c("./call"), b.Page = c("./page"), b.FontFace = c("./fontface"), b.UnaryOp = c("./unaryop"), b.BinOp = c("./binop"), b.Ternary = c("./ternary"), b.Block = c("./block"), b.Unit = c("./unit"), b.String = c("./string"), b.HSLA = c("./hsla"), b.RGBA = c("./rgba"), b.Ident = c("./ident"), b.Group = c("./group"), b.Literal = c("./literal"), b.JSLiteral = c("./jsliteral"), b.Boolean = c("./boolean"), b.Return = c("./return"), b.Media = c("./media"), b.Params = c("./params"), b.Comment = c("./comment"), b.Keyframes = c("./keyframes"), b.Charset = c("./charset"), b.Import = c("./import"), b.Function = c("./function"), b.Property = c("./property"), b.Selector = c("./selector"), b.Expression = c("./expression"), b.Arguments = c("./arguments"), b.yes = new b.Boolean(!0), b.no = new b.Boolean(!1), b.nil = new b.Null
        }), a.register("nodes/jsliteral.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function (b) {
                    d.call(this), this.val = b, this.string = b
                };
            f.prototype
                .__proto__ = d.prototype
        }), a.register("nodes/keyframes.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c) {
                    d.call(this), this.name = b, this.frames = [], this.prefix = c || "official"
                };
            e.prototype.__proto__ = d.prototype, e.prototype.push = function (a, b) {
                this.frames.push({
                    pos: a,
                    block: b
                })
            }, e.prototype.clone = function () {
                var a = new e(this.name);
                return a.lineno = this.lineno, a.prefix = this.prefix, a.frames = this.frames.map(function (a) {
                    return a.block = a.block.clone(), a
                }), a
            }, e.prototype.toString = function () {
                return "@keyframes " + this.name
            }
        }), a.register("nodes/literal.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function (b) {
                    d.call(this), this.val = b, this.string = b
                };
            f.prototype.__proto__ = d.prototype, f.prototype.__defineGetter__("hash", function () {
                return this.val
            }), f.prototype.toString = function () {
                return this.val
            }, f.prototype.coerce = function (a) {
                switch (a.nodeName) {
                    case "ident":
                    case "string":
                    case "literal":
                        return new f(a.string);
                    default:
                        return d.prototype.coerce.call(this, a)
                }
            }, f.prototype.operate = function (a, b) {
                var c = b.first;
                switch (a) {
                    case "+":
                        return new e.Literal(this.string + this.coerce(c).string);
                    default:
                        return d.prototype.operate.call(this, a, b)
                }
            }
        }), a.register("nodes/media.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function (b) {
                    d.call(this), this.val = b
                };
            f.prototype.__proto__ = d.prototype, f.prototype.toString = function () {
                return "@media " + this.val
            }
        }), a.register("nodes/node.js", function (a, b, c) {
            function h(a) {
                this.name = "CoercionError", this.message = a, Error.captureStackTrace(this, h)
            }
            var d = c("../visitor/evaluator"),
                e = c("../utils"),
                f = c("./index"),
                g = a.exports = function () {
                    this.lineno = f.lineno, Object.defineProperty(this, "filename", {
                        writable: !0,
                        value: f.filename
                    })
                };
            g.prototype.__defineGetter__("first", function () {
                return this
            }), g.prototype.__defineGetter__("hash", function () {
                return this.val
            }), g.prototype.__defineGetter__("nodeName", function () {
                return this.constructor.name.toLowerCase()
            }), g.prototype.clone = function () {
                return this
            }, g.prototype.eval = function () {
                return (new d(this)).evaluate()
            }, g.prototype.toBoolean = function () {
                return f.yes
            }, g.prototype.toExpression = function () {
                if ("expression" == this.nodeName) return this;
                var a = new f.Expression;
                return a.push(this), a
            }, g.prototype.shouldCoerce = function (a) {
                switch (a) {
                    case "is a":
                    case "in":
                    case "||":
                    case "&&":
                        return !1;
                    default:
                        return !0
                }
            }, g.prototype.operate = function (a, b) {
                switch (a) {
                    case "is a":
                        if ("string" == b.nodeName) return f.Boolean(this.nodeName == b.val);
                        throw new Error('"is a" expects a string, got ' + b.toString());
                    case "==":
                        return f.Boolean(this.hash == b.hash);
                    case "!=":
                        return f.Boolean(this.hash != b.hash);
                    case ">=":
                        return f.Boolean(this.hash >= b.hash);
                    case "<=":
                        return f.Boolean(this.hash <= b.hash);
                    case ">":
                        return f.Boolean(this.hash > b.hash);
                    case "<":
                        return f.Boolean(this.hash < b.hash);
                    case "||":
                        return this.toBoolean().isTrue ? this : b;
                    case "in":
                        var c = e.unwrap(b).nodes,
                            d = this.hash;
                        if (!c) throw new Error('"in" given invalid right-hand operand, expecting an expression');
                        for (var g = 0, h = c.length; g < h; ++g)
                            if (d == c[g].hash) return f.yes;
                        return f.no;
                    case "&&":
                        var i = this.toBoolean(),
                            j = b.toBoolean();
                        return i.isTrue && j.isTrue ? b : i.isFalse ? this : b;
                    default:
                        if ("[]" == a) var k = "cannot perform " + this + "[" + b + "]";
                        else var k = "cannot perform " + this + " " + a + " " + b;
                        throw new Error(k)
                }
            }, h.prototype.__proto__ = Error.prototype, g.prototype.coerce = function (a) {
                if (a.nodeName == this.nodeName) return a;
                throw new h("cannot coerce " + a + " to " + this.nodeName)
            }
        }), a.register("nodes/null.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function () { };
            f.prototype.__proto__ = d.prototype, f.prototype.inspect = f.prototype.toString = function () {
                return "null"
            }, f.prototype.toBoolean = function () {
                return e.no
            }, f.prototype.__defineGetter__("isNull", function () {
                return !0
            }), f.prototype.__defineGetter__("hash", function () {
                return null
            })
        }), a.register("nodes/page.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c) {
                    d.call(this), this.selector = b, this.block = c
                };
            e.prototype.__proto__ = d.prototype, e.prototype.toString = function () {
                return "@page " + this.selector
            }
        }), a.register("nodes/params.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function () {
                    d.call(this), this.nodes = []
                };
            e.prototype.__defineGetter__("length", function () {
                return this.nodes.length
            }), e.prototype.__proto__ = d.prototype, e.prototype.push = function (a) {
                this.nodes.push(a)
            }, e.prototype.clone = function () {
                var a = new e;
                return a.lineno = this.lineno, a.filename = this.filename, this.nodes.forEach(function (b) {
                    a.push(b.clone())
                }), a
            }
        }), a.register("nodes/property.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c) {
                    d.call(this), this.segments = b, this.expr = c
                };
            e.prototype.__proto__ = d.prototype, e.prototype.clone = function () {
                var a = new e(this.segments);
                return a.lineno = this.lineno, a.filename = this.filename, a.segments = this.segments.map(function (a) {
                    return a.clone()
                }), this.expr && (a.expr = this.expr.clone()), a
            }, e.prototype.toString = function () {
                return "property(" + this.name + ", " + this.expr + ")"
            }, e.prototype.operate = function (a, b, c) {
                return this.expr.operate(a, b, c)
            }
        }), a.register("nodes/return.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function (b) {
                    this.expr = b || e.nil
                };
            f.prototype.__proto__ = d.prototype, f.prototype.clone = function () {
                var a = new f(this.expr.clone());
                return a.lineno = this.lineno, a.filename = this.filename, a
            }
        }), a.register("nodes/rgba.js", function (a, b, c) {
            function j(a) {
                return Math.max(0, Math.min(a.toFixed(0), 255))
            }

            function k(a) {
                return Math.max(0, Math.min(a, 1))
            }
            var d = c("./node"),
                e = c("./hsla"),
                f = c("../functions"),
                g = f["-adjust"],
                h = c("./index"),
                i = b = a.exports = function (b, c, e, f) {
                    d.call(this), this.r = j(b), this.g = j(c), this.b = j(e), this.a = k(f), this.rgba = this
                };
            i.prototype.__proto__ = d.prototype, i.withoutClamping = function (a, b, c, d) {
                var e = new i(0, 0, 0, 0);
                return e.r = a, e.g = b, e.b = c, e.a = d, e
            }, i.prototype.clone = function () {
                var a = new i(this.r, this.g, this.b, this.a);
                return a.lineno = this.lineno, a.filename = this.filename, a
            }, i.prototype.toBoolean = function () {
                return h.yes
            }, i.prototype.__defineGetter__("hsla", function () {
                return e.fromRGBA(this)
            }), i.prototype.__defineGetter__("hash", function () {
                return this.toString()
            }), i.prototype.add = function (a, b, c, d) {
                return new i(this.r + a, this.g + b, this.b + c, this.a + d)
            }, i.prototype.sub = function (a, b, c, d) {
                return new i(this.r - a, this.g - b, this.b - c, d == 1 ? this.a : this.a - d)
            }, i.prototype.multiply = function (a) {
                return new i(this.r * a, this.g * a, this.b * a, this.a)
            }, i.prototype.divide = function (a) {
                return new i(this.r / a, this.g / a, this.b / a, this.a)
            }, i.prototype.operate = function (a, b) {
                b = b.first;
                switch (a) {
                    case "is a":
                        if ("string" == b.nodeName && "color" == b.string) return h.yes;
                        break;
                    case "+":
                        switch (b.nodeName) {
                            case "unit":
                                var c = b.val;
                                switch (b.type) {
                                    case "%":
                                        return g(this, new h.String("lightness"), b);
                                    case "deg":
                                        return this.hsla.adjustHue(c).rgba;
                                    default:
                                        return this.add(c, c, c, 0)
                                };
                            case "rgba":
                                return this.add(b.r, b.g, b.b, b.a);
                            case "hsla":
                                return this.hsla.add(b.h, b.s, b.l)
                        }
                        break;
                    case "-":
                        switch (b.nodeName) {
                            case "unit":
                                var c = b.val;
                                switch (b.type) {
                                    case "%":
                                        return g(this, new h.String("lightness"), new h.Unit(-c, "%"));
                                    case "deg":
                                        return this.hsla.adjustHue(-c).rgba;
                                    default:
                                        return this.sub(c, c, c, 0)
                                };
                            case "rgba":
                                return this.sub(b.r, b.g, b.b, b.a);
                            case "hsla":
                                return this.hsla.sub(b.h, b.s, b.l)
                        }
                        break;
                    case "*":
                        switch (b.nodeName) {
                            case "unit":
                                return this.multiply(b.val)
                        }
                        break;
                    case "/":
                        switch (b.nodeName) {
                            case "unit":
                                return this.divide(b.val)
                        }
                }
                return d.prototype.operate.call(this, a, b)
            }, i.prototype.toString = function () {
                function a(a) {
                    return a < 16 ? "0" + a.toString(16) : a.toString(16)
                }
                if (1 == this.a) {
                    var b = a(this.r),
                        c = a(this.g),
                        d = a(this.b);
                    return b[0] == b[1] && c[0] == c[1] && d[0] == d[1] ? "#" + b[0] + c[0] + d[0] : "#" + b + c + d
                }
                return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a.toFixed(2) + ")"
            }, b.fromHSLA = function (a) {
                function l(a) {
                    return a < 0 && ++a, a > 1 && --a, a * 6 < 1 ? g + (f - g) * a * 6 : a * 2 < 1 ? f : a * 3 < 2 ? g + (f - g) * (2 / 3 - a) * 6 : g
                }
                var b = a.h / 360,
                    c = a.s / 100,
                    d = a.l / 100,
                    e = a.a,
                    f = d <= .5 ? d * (c + 1) : d + c - d * c,
                    g = d * 2 - f,
                    h = l(b + 1 / 3) * 255,
                    j = l(b) * 255,
                    k = l(b - 1 / 3) * 255;
                return new i(h, j, k, e)
            }
        }), a.register("nodes/root.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function () {
                    this.nodes = []
                };
            e.prototype.__proto__ = d.prototype, e.prototype.push = function (a) {
                this.nodes.push(a)
            }, e.prototype.toString = function () {
                return "[Root]"
            }
        }), a.register("nodes/selector.js", function (a, b, c) {
            var d = c("./block"),
                e = c("./node"),
                f = a.exports = function (b) {
                    e.call(this), this.segments = b
                };
            f.prototype.__proto__ = e.prototype, f.prototype.toString = function () {
                return this.segments.join("")
            }, f.prototype.clone = function () {
                var a = new f;
                return a.lineno = this.lineno, a.filename = this.filename, a.segments = this.segments.map(function (a) {
                    return a.clone()
                }), a
            }
        }), a.register("nodes/string.js", function (a, b, c) {
            var d = c("./node"),
                e = c("../functions").s,
                f = c("../utils"),
                g = c("./index"),
                h = a.exports = function (b) {
                    d.call(this), this.val = b, this.string = b
                };
            h.prototype.__proto__ = d.prototype, h.prototype.toString = function () {
                return '"' + this.val + '"'
            }, h.prototype.clone = function () {
                var a = new h(this.val);
                return a.lineno = this.lineno, a.filename = this.filename, a
            }, h.prototype.toBoolean = function () {
                return g.Boolean(this.val.length)
            }, h.prototype.coerce = function (a) {
                switch (a.nodeName) {
                    case "string":
                        return a;
                    case "expression":
                        return new h(a.nodes.map(function (a) {
                            return this.coerce(a).val
                        }, this).join(" "));
                    default:
                        return new h(a.toString())
                }
            }, h.prototype.operate = function (a, b) {
                switch (a) {
                    case "%":
                        var c = new g.Expression;
                        c.push(this);
                        var i = "expression" == b.nodeName ? f.unwrap(b).nodes : [b];
                        return e.apply(null, [c].concat(i));
                    case "+":
                        return new h(this.val + this.coerce(b).val);
                    default:
                        return d.prototype.operate.call(this, a, b)
                }
            }
        }), a.register("nodes/ternary.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c, e) {
                    d.call(this), this.cond = b, this.trueExpr = c, this.falseExpr = e
                };
            e.prototype.__proto__ = d.prototype, e.prototype.clone = function () {
                var a = new e(this.cond.clone(), this.trueExpr.clone(), this.falseExpr.clone());
                return a.lineno = this.lineno, a.filename = this.filename, a
            }
        }), a.register("nodes/unaryop.js", function (a, b, c) {
            var d = c("./node"),
                e = a.exports = function (b, c) {
                    d.call(this), this.op = b, this.expr = c
                };
            e.prototype.__proto__ = d.prototype, e.prototype.clone = function () {
                var a = new e(this.op, this.expr.clone());
                return a.lineno = this.lineno, a.filename = this.filename, a
            }
        }), a.register("nodes/unit.js", function (a, b, c) {
            var d = c("./node"),
                e = c("./index"),
                f = a.exports = function (b, c) {
                    d.call(this), this.val = b, this.type = c
                };
            f.prototype.__proto__ = d.prototype, f.prototype.toBoolean = function () {
                return e.Boolean(this.type ? !0 : this.val)
            }, f.prototype.toString = function () {
                var a = this.val;
                return "px" == this.type && (a = a.toFixed(0)), a + (this.type || "")
            }, f.prototype.clone = function () {
                var a = new f(this.val, this.type);
                return a.lineno = this.lineno, a.filename = this.filename, a
            }, f.prototype.operate = function (a, b) {
                var c = this.type || b.type;
                if ("rgba" == b.nodeName || "hsla" == b.nodeName) return b.operate(a, this);
                if (this.shouldCoerce(a)) {
                    "-" != a && "+" != a || "%" != b.type ? b = this.coerce(b.first) : b.val = this.val * (b.val / 100);
                    switch (a) {
                        case "-":
                            return new f(this.val - b.val, c);
                        case "+":
                            return new f(this.val + b.val, c);
                        case "/":
                            return new f(this.val / b.val, c);
                        case "*":
                            return new f(this.val * b.val, c);
                        case "%":
                            return new f(this.val % b.val, c);
                        case "**":
                            return new f(Math.pow(this.val, b.val), c);
                        case "..":
                        case "...":
                            var g = this.val,
                                h = b.val,
                                i = new e.Expression,
                                j = ".." == a;
                            do i.push(new e.Unit(g)); while (j ? ++g <= h : ++g < h);
                            return i
                    }
                }
                return d.prototype.operate.call(this, a, b)
            }, f.prototype.coerce = function (a) {
                if ("unit" != a.nodeName) {
                    if ("string" == a.nodeName) {
                        var f = parseInt(a.val, 10);
                        return isNaN(f) && d.prototype.coerce.call(this, a), new e.Unit(f)
                    }
                    return d.prototype.coerce.call(this, a)
                }
                var b = this,
                    c = a;
                switch (b.type) {
                    case "mm":
                        switch (c.type) {
                            case "cm":
                                return new e.Unit(c.val * 2.54, "mm");
                            case "in":
                                return new e.Unit(c.val * 25.4, "mm")
                        };
                    case "cm":
                        switch (c.type) {
                            case "mm":
                                return new e.Unit(c.val / 10, "cm");
                            case "in":
                                return new e.Unit(c.val * 2.54, "cm")
                        };
                    case "in":
                        switch (c.type) {
                            case "mm":
                                return new e.Unit(c.val / 25.4, "in");
                            case "cm":
                                return new e.Unit(c.val / 2.54, "in")
                        };
                    case "ms":
                        switch (c.type) {
                            case "s":
                                return new e.Unit(c.val * 1e3, "ms")
                        };
                    case "s":
                        switch (c.type) {
                            case "ms":
                                return new e.Unit(c.val / 1e3, "s")
                        };
                    case "Hz":
                        switch (c.type) {
                            case "kHz":
                                return new e.Unit(c.val * 1e3, "Hz")
                        };
                    case "kHz":
                        switch (c.type) {
                            case "Hz":
                                return new e.Unit(c.val / 1e3, "kHz")
                        };
                    default:
                        return new e.Unit(c.val, b.type)
                }
            }
        }), a.register("parser.js", function (a, b, c) {
            var d = c("./lexer"),
                e = c("./nodes"),
                f = c("./token"),
                g = c("./errors"),
                h = ["ident", "string", "selector", "function", "comment", "boolean", "space", "color", "unit", "for", "[", "]", "(", ")", "+", "-", "*", "*=", "<", ">", "=", ":", "&", "~", "{", "}"],
                i = ["root", "nth-child", "nth-last-child", "nth-of-type", "nth-last-of-type", "first-child", "last-child", "first-of-type", "last-of-type", "only-child", "only-of-type", "empty", "link", "visited", "active", "hover", "focus", "target", "lang", "enabled", "disabled", "checked", "not"],
                j = a.exports = function (b, c) {
                    var f = this;
                    c = c || {}, this.lexer = new d(b, c), this.root = c.root || new e.Root, this.state = ["root"], this.stash = [], this.parens = 0, this.state.pop = function () {
                        f.prevState = [].pop.call(this)
                    }
                };
            j.prototype = {
                constructor: j,
                currentState: function () {
                    return this.state[this.state.length - 1]
                }, parse: function () {
                    var a = this.parent = this.root;
                    while ("eos" != this.peek().type) {
                        if (this.accept("newline")) continue;
                        var b = this.statement();
                        this.accept(";"), b || this.error("unexpected token {peek}, not allowed at the root level"), a.push(b)
                    }
                    return a
                }, error: function (a) {
                    var b = this.peek().type,
                        c = undefined == this.peek().val ? "" : " " + this.peek().toString();
                    throw c.trim() == b.trim() && (c = ""), new g.ParseError(a.replace("{peek}", '"' + b + c + '"'))
                }, accept: function (a) {
                    if (a == this.peek().type) return this.next()
                }, expect: function (a) {
                    return a != this.peek().type && this.error('expected "' + a + '", got {peek}'), this.next()
                }, next: function () {
                    var a = this.stash.length ? this.stash.pop() : this.lexer.next();
                    return e.lineno = a.lineno, a
                }, peek: function () {
                    return this.lexer.peek()
                }, lookahead: function (a) {
                    return this.lexer.lookahead(a)
                }, isSelectorToken: function (a) {
                    var b = this.lookahead(a).type;
                    switch (b) {
                        case "for":
                            return this.bracketed;
                        case "[":
                            return this.bracketed = !0, !0;
                        case "]":
                            return this.bracketed = !1, !0;
                        default:
                            return ~h.indexOf(b)
                    }
                }, isPseudoSelector: function (a) {
                    return ~i.indexOf(this.lookahead(a).val.name)
                }, lineContains: function (a) {
                    var b = 1,
                        c;
                    while (c = this.lookahead(b++)) {
                        if (~["indent", "outdent", "newline"].indexOf(c.type)) return;
                        if (a == c.type) return !0
                    }
                }, selectorToken: function () {
                    if (this.isSelectorToken(1)) {
                        if ("{" == this.peek().type) {
                            if (!this.lineContains("}")) return;
                            var a = 0,
                                b;
                            while (b = this.lookahead(++a)) {
                                if ("}" == b.type) break;
                                if (":" == b.type) return
                            }
                        }
                        return this.next()
                    }
                }, skipWhitespace: function () {
                    while (~["space", "indent", "outdent", "newline"].indexOf(this.peek().type)) this.next()
                }, skipSpaces: function () {
                    while ("space" == this.peek().type) this.next()
                }, looksLikeFunctionDefinition: function (a) {
                    return "indent" == this.lookahead(a).type || "{" == this.lookahead(a).type
                }, looksLikeSelector: function () {
                    var a = 1,
                        b;
                    while ("ident" == this.lookahead(a).type && "newline" == this.lookahead(a + 1).type) a += 2;
                    while (this.isSelectorToken(a) || "," == this.lookahead(a).type) {
                        if ("selector" == this.lookahead(a).type) return !0;
                        "{" == this.lookahead(a).type ? b = !0 : "}" == this.lookahead(a).type && (b = !1);
                        if (b && ":" == this.lookahead(a).type) return !0;
                        if ("space" == this.lookahead(a).type && "{" == this.lookahead(a + 1).type) return !0;
                        if (":" == this.lookahead(a++).type && this.isPseudoSelector(a)) return !0;
                        if ("," == this.lookahead(a).type && "newline" == this.lookahead(a + 1).type) return !0
                    }
                    if ("," == this.lookahead(a).type && "newline" == this.lookahead(a + 1).type) return !0;
                    if ("{" == this.lookahead(a).type && "newline" == this.lookahead(a + 1).type) return !0;
                    if (this.css)
                        if (";" == this.lookahead(a) || "}" == this.lookahead(a)) return !1;
                    while (!~["indent", "outdent", "newline", "for", "if", ";", "}"].indexOf(this.lookahead(a).type)) ++a;
                    if ("indent" == this.lookahead(a).type) return !0
                }, stateAllowsSelector: function () {
                    switch (this.currentState()) {
                        case "root":
                        case "selector":
                        case "conditional":
                        case "keyframe":
                        case "function":
                        case "font-face":
                        case "media":
                        case "for":
                            return !0
                    }
                }, statement: function () {
                    var a = this.stmt(),
                        b = this.prevState,
                        c, d;
                    this.allowPostfix && (delete this.allowPostfix, b = "expression");
                    switch (b) {
                        case "assignment":
                        case "expression":
                        case "function arguments":
                            while (d = this.accept("if") || this.accept("unless") || this.accept("for")) switch (d.type) {
                                case "if":
                                case "unless":
                                    a = new e.If(this.expression(), a), a.postfix = !0, a.negate = "unless" == d.type, this.accept(";");
                                    break;
                                case "for":
                                    var f, g = this.id().name;
                                    this.accept(",") && (f = this.id().name), this.expect("in");
                                    var h = new e.Each(g, f, this.expression());
                                    c = new e.Block, c.push(a), h.block = c, a = h
                            }
                    }
                    return a
                }, stmt: function () {
                    var a = this.peek().type;
                    switch (a) {
                        case "-webkit-keyframes":
                        case "keyframes":
                            return this.keyframes();
                        case "font-face":
                            return this.fontface();
                        case "comment":
                        case "selector":
                        case "literal":
                        case "charset":
                        case "media":
                        case "page":
                        case "ident":
                        case "scope":
                        case "unless":
                            return this[a]();
                        case "function":
                            return this.fun();
                        case "import":
                            return this.atimport();
                        case "if":
                            return this.ifstmt();
                        case "for":
                            return this.forin();
                        case "return":
                            return this.ret();
                        case "{":
                            return this.property();
                        default:
                            if (this.stateAllowsSelector()) switch (a) {
                                case "color":
                                case "~":
                                case "+":
                                case ">":
                                case "<":
                                case ":":
                                case "&":
                                case "[":
                                    return this.selector();
                                case "*":
                                    return this.property();
                                case "-":
                                    if ("{" == this.lookahead(2).type) return this.property()
                            }
                            var b = this.expression();
                            return b.isEmpty && this.error("unexpected {peek}"), b
                    }
                }, block: function (a, b) {
                    var c, d, f = this.css,
                        g = this.parent = new e.Block(this.parent, a);
                    !1 === b && (g.scope = !1), (this.css = this.accept("{")) ? (c = "}", this.skipWhitespace()) : (c = "outdent", this.expect("indent"));
                    while (c != this.peek().type) {
                        if (this.css) {
                            if (this.accept("newline")) continue;
                            d = this.statement(), this.accept(";"), this.skipWhitespace()
                        } else {
                            if (this.accept("newline")) continue;
                            d = this.statement(), this.accept(";")
                        }
                        d || this.error("unexpected token {peek} in block"), g.push(d)
                    }
                    return this.css ? (this.skipWhitespace(), this.expect("}"), this.skipSpaces(), this.css = f) : this.expect("outdent"), this.parent = g.parent, g
                }, comment: function () {
                    var a = this.next().val;
                    return this.skipSpaces(), a
                }, forin: function () {
                    this.expect("for");
                    var a, b = this.id().name;
                    this.accept(",") && (a = this.id().name), this.expect("in");
                    var c = new e.Each(b, a, this.expression());
                    return this.state.push("for"), c.block = this.block(c, !1), this.state.pop(), c
                }, ret: function () {
                    this.expect("return");
                    var a = this.expression();
                    return a.isEmpty ? new e.Return : new e.Return(a)
                }, unless: function () {
                    this.expect("unless");
                    var a = new e.If(this.expression(), !0);
                    return this.state.push("conditional"), a.block = this.block(a, !1), this.state.pop(), a
                }, ifstmt: function () {
                    this.expect("if");
                    var a = new e.If(this.expression());
                    this.state.push("conditional"), a.block = this.block(a, !1);
                    while (this.accept("else")) {
                        if (!this.accept("if")) {
                            a.elses.push(this.block(a, !1));
                            break
                        }
                        var b = this.expression(),
                            c = this.block(a, !1);
                        a.elses.push(new e.If(b, c))
                    }
                    return this.state.pop(), a
                }, scope: function () {
                    var a = this.expect("scope").val;
                    return this.selectorScope = a, e.nil
                }, media: function () {
                    var a = this.expect("media").val,
                        b = new e.Media(a);
                    return this.state.push("media"), b.block = this.block(b), this.state.pop(), b
                }, fontface: function () {
                    this.expect("font-face");
                    var a = new e.FontFace;
                    return this.state.push("font-face"), a.block = this.block(a), this.state.pop(), a
                }, atimport: function () {
                    return this.expect("import"), this.allowPostfix = !0, new e.Import(this.expression())
                }, charset: function () {
                    this.expect("charset");
                    var a = this.expect("string").val;
                    return this.allowPostfix = !0, new e.Charset(a)
                }, page: function () {
                    var a;
                    this.expect("page");
                    if (this.accept(":")) {
                        var b = this.expect("ident").val.name;
                        a = new e.Literal(":" + b)
                    }
                    var c = new e.Page(a);
                    return this.state.push("page"), c.block = this.block(c), this.state.pop(), c
                }, keyframes: function () {
                    var a, b = this.css,
                        c = this.expect("keyframes"),
                        d = new e.Keyframes(this.id(), c.val);
                    (this.css = this.accept("{")) ? this.skipWhitespace() : this.expect("indent");
                    while (a = this.accept("unit") || this.accept("ident")) {
                        if ("ident" == a.type) {
                            this.accept("space");
                            switch (a.val.name) {
                                case "from":
                                    a = new e.Unit(0, "%");
                                    break;
                                case "to":
                                    a = new e.Unit(100, "%");
                                    break;
                                default:
                                    this.error('"' + a.val.name + '" is invalid, use "from" or "to"')
                            }
                        } else a = a.val;
                        this.state.push("keyframe");
                        var f = this.block(d);
                        d.push(a, f), this.state.pop(), this.css && this.skipWhitespace()
                    }
                    return this.css ? (this.skipWhitespace(), this.expect("}"), this.css = b) : this.expect("outdent"), d
                }, literal: function () {
                    return this.expect("literal").val
                }, id: function () {
                    var a = this.expect("ident");
                    return this.accept("space"), a.val
                }, ident: function () {
                    var a = 2,
                        b = this.lookahead(a).type;
                    while ("space" == b) b = this.lookahead(++a).type;
                    switch (b) {
                        case "=":
                        case "?=":
                        case "-=":
                        case "+=":
                        case "*=":
                        case "/=":
                        case "%=":
                            return this.assignment();
                        case "[":
                            if (this._ident == this.peek()) return this.id();
                            while ("]" != this.lookahead(a++).type && "selector" != this.lookahead(a).type);
                            if ("=" == this.lookahead(a).type) return this._ident = this.peek(), this.expression();
                            if (this.looksLikeSelector() && this.stateAllowsSelector()) return this.selector();
                        case "-":
                        case "+":
                        case "/":
                        case "*":
                        case "%":
                        case "**":
                        case "and":
                        case "or":
                        case "&&":
                        case "||":
                        case ">":
                        case "<":
                        case ">=":
                        case "<=":
                        case "!=":
                        case "==":
                        case "?":
                        case "in":
                        case "is a":
                        case "is defined":
                            if (this._ident == this.peek()) return this.id();
                            this._ident = this.peek();
                            switch (this.currentState()) {
                                case "for":
                                case "selector":
                                    return this.property();
                                case "root":
                                case "media":
                                case "font-face":
                                    return this.selector();
                                default:
                                    return this.operand ? this.id() : this.expression()
                            };
                        default:
                            switch (this.currentState()) {
                                case "root":
                                    return this.selector();
                                case "for":
                                case "page":
                                case "media":
                                case "font-face":
                                case "selector":
                                case "function":
                                case "keyframe":
                                case "conditional":
                                    return this.property();
                                default:
                                    return this.id()
                            }
                    }
                }, interpolate: function () {
                    var a, b = [],
                        c;
                    c = this.accept("*"), c && b.push(new e.Literal("*"));
                    for (; ;)
                        if (this.accept("{")) this.state.push("interpolation"), b.push(this.expression()), this.expect("}"), this.state.pop();
                        else if (a = this.accept("-")) b.push(new e.Literal("-"));
                        else {
                            if (!(a = this.accept("ident"))) break;
                            b.push(a.val)
                        }
                    return b.length || this.expect("ident"), b
                }, property: function () {
                    if (this.looksLikeSelector()) return this.selector();
                    var a = this.interpolate(),
                        b = prop = new e.Property(a);
                    return this.accept("space"), this.accept(":") && this.accept("space"), this.state.push("property"), this.inProperty = !0, prop.expr = this.list(), prop.expr.isEmpty && (b = a[0]), this.inProperty = !1, this.allowPostfix = !0, this.state.pop(), this.accept(";"), b
                }, selector: function () {
                    var a, b, c = new e.Group,
                        d = this.selectorScope,
                        f = "root" == this.currentState();
                    do {
                        b = [], this.accept("newline");
                        while (a = this.selectorToken()) switch (a.type) {
                            case "{":
                                this.skipSpaces();
                                var g = this.expression();
                                this.skipSpaces(), this.expect("}"), b.push(g);
                                break;
                            case "comment":
                                b.push(new e.Literal(a.val.str));
                                break;
                            case "color":
                                b.push(new e.Literal(a.val.raw));
                                break;
                            case "space":
                                b.push(new e.Literal(" "));
                                break;
                            case "function":
                                b.push(new e.Literal(a.val.name + "("));
                                break;
                            case "ident":
                                b.push(new e.Literal(a.val.name));
                                break;
                            default:
                                b.push(new e.Literal(a.val)), a.space && b.push(new e.Literal(" "))
                        }
                        f && d && b.unshift(new e.Literal(d + " ")), c.push(new e.Selector(b))
                    } while (this.accept(",") || this.accept("newline"));
                    return this.lexer.allowComments = !1, this.state.push("selector"), c.block = this.block(c), this.state.pop(), c
                }, assignment: function () {
                    var a, b, c = this.id().name;
                    if (a = this.accept("=") || this.accept("?=") || this.accept("+=") || this.accept("-=") || this.accept("*=") || this.accept("/=") || this.accept("%=")) {
                        this.state.push("assignment");
                        var d = this.list();
                        d.isEmpty && this.error("invalid right-hand side operand in assignment, got {peek}"), b = new e.Ident(c, d), this.state.pop();
                        switch (a.type) {
                            case "?=":
                                var f = new e.BinOp("is defined", b),
                                    g = new e.Ident(c);
                                b = new e.Ternary(f, g, b);
                                break;
                            case "+=":
                            case "-=":
                            case "*=":
                            case "/=":
                            case "%=":
                                b.val = new e.BinOp(a.type[0], new e.Ident(c), d)
                        }
                    }
                    return b
                }, fun: function () {
                    var a = 1,
                        b = 2,
                        c;
                    a: while (c = this.lookahead(b++)) switch (c.type) {
                        case "function":
                        case "(":
                            ++a;
                            break;
                        case ")":
                            if (!--a) break a;
                            break;
                        case "eos":
                            this.error('failed to find closing paren ")"')
                    }
                    switch (this.currentState()) {
                        case "expression":
                            return this.functionCall();
                        default:
                            return this.looksLikeFunctionDefinition(b) ? this.functionDefinition() : this.expression()
                    }
                }, url: function () {
                    this.expect("function"), this.state.push("function arguments");
                    var a = this.args();
                    return this.expect(")"), this.state.pop(), new e.Call("url", a)
                }, functionCall: function () {
                    if ("url" == this.peek().val.name) return this.url();
                    var a = this.expect("function").val.name;
                    this.state.push("function arguments");
                    var b = this.args();
                    return this.expect(")"), this.state.pop(), new e.Call(a, b)
                }, functionDefinition: function () {
                    var a = this.expect("function").val.name;
                    this.state.push("function params"), this.skipWhitespace();
                    var b = this.params();
                    this.skipWhitespace(), this.expect(")"), this.state.pop(), this.state.push("function");
                    var c = new e.Function(a, b);
                    return c.block = this.block(c), this.state.pop(), new e.Ident(a, c)
                }, params: function () {
                    var a, b, c = new e.Params;
                    while (a = this.accept("ident")) this.accept("space"), c.push(b = a.val), this.accept("...") ? b.rest = !0 : this.accept("=") && (b.val = this.expression()), this.skipWhitespace(), this.accept(","), this.skipWhitespace();
                    return c
                }, args: function () {
                    var a = new e.Arguments,
                        b;
                    do "ident" == this.peek().type && ":" == this.lookahead(2).type ? (b = this.next().val.string, this.expect(":"), a.map[b] = this.expression()) : a.push(this.expression()); while (this.accept(","));
                    return a
                }, list: function () {
                    var a = this.expression();
                    while (this.accept(","))
                        if (a.isList) b.push(this.expression());
                        else {
                            var b = new e.Expression(!0);
                            b.push(a), b.push(this.expression()), a = b
                        }
                    return a
                }, expression: function () {
                    var a, b = new e.Expression;
                    this.state.push("expression");
                    while (a = this.negation()) a || this.error("unexpected token {peek} in expression"), b.push(a);
                    return this.state.pop(), b
                }, negation: function () {
                    return this.accept("not") ? new e.UnaryOp("!", this.negation()) : this.ternary()
                }, ternary: function () {
                    var a = this.logical();
                    if (this.accept("?")) {
                        var b = this.expression();
                        this.expect(":");
                        var c = this.expression();
                        a = new e.Ternary(a, b, c)
                    }
                    return a
                }, logical: function () {
                    var a, b = this.typecheck();
                    while (a = this.accept("&&") || this.accept("||")) b = new e.BinOp(a.type, b, this.typecheck());
                    return b
                }, typecheck: function () {
                    var a, b = this.equality();
                    while (a = this.accept("is a")) this.operand = !0, b || this.error('illegal unary "' + a + '", missing left-hand operand'), b = new e.BinOp(a.type, b, this.equality()), this.operand = !1;
                    return b
                }, equality: function () {
                    var a, b = this.inop();
                    while (a = this.accept("==") || this.accept("!=")) this.operand = !0, b || this.error('illegal unary "' + a + '", missing left-hand operand'), b = new e.BinOp(a.type, b, this.inop()), this.operand = !1;
                    return b
                }, inop: function () {
                    var a = this.relational();
                    while (this.accept("in")) this.operand = !0, a || this.error('illegal unary "in", missing left-hand operand'), a = new e.BinOp("in", a, this.relational()), this.operand = !1;
                    return a
                }, relational: function () {
                    var a, b = this.range();
                    while (a = this.accept(">=") || this.accept("<=") || this.accept("<") || this.accept(">")) this.operand = !0, b || this.error('illegal unary "' + a + '", missing left-hand operand'), b = new e.BinOp(a.type, b, this.range()), this.operand = !1;
                    return b
                }, range: function () {
                    var a, b = this.additive();
                    if (a = this.accept("...") || this.accept("..")) this.operand = !0, b || this.error('illegal unary "' + a + '", missing left-hand operand'), b = new e.BinOp(a.val, b, this.additive()), this.operand = !1;
                    return b
                }, additive: function () {
                    var a, b = this.multiplicative();
                    while (a = this.accept("+") || this.accept("-")) this.operand = !0, b = new e.BinOp(a.type, b, this.multiplicative()), this.operand = !1;
                    return b
                }, multiplicative: function () {
                    var a, b = this.defined();
                    while (a = this.accept("**") || this.accept("*") || this.accept("/") || this.accept("%")) {
                        this.operand = !0;
                        if ("/" == a && this.inProperty && !this.parens) return this.stash.push(new f("literal", new e.Literal("/"))), this.operand = !1, b;
                        b || this.error('illegal unary "' + a + '", missing left-hand operand'), b = new e.BinOp(a.type, b, this.defined()), this.operand = !1
                    }
                    return b
                }, defined: function () {
                    var a = this.unary();
                    return this.accept("is defined") && (a || this.error('illegal unary "is defined", missing left-hand operand'), a = new e.BinOp("is defined", a)), a
                }, unary: function () {
                    var a, b;
                    return (a = this.accept("!") || this.accept("~") || this.accept("+") || this.accept("-")) ? (this.operand = !0, b = new e.UnaryOp(a.type, this.unary()), this.operand = !1, b) : this.subscript()
                }, subscript: function () {
                    var a = this.primary();
                    while (this.accept("[")) a = new e.BinOp("[]", a, this.expression()), this.expect("]"), this.accept("=") && (a.op += "=", a.val = this.expression());
                    return a
                }, primary: function () {
                    var a, b;
                    if (this.accept("(")) {
                        ++this.parens;
                        var c = this.expression();
                        return this.expect(")"), --this.parens, c
                    }
                    switch (this.peek().type) {
                        case "null":
                        case "unit":
                        case "color":
                        case "string":
                        case "literal":
                        case "boolean":
                            return this.next().val;
                        case "ident":
                            return this.ident();
                        case "function":
                            return this.functionCall()
                    }
                }
            }
        }), a.register("renderer.js", function (a, b, c) {
            var d = c("./parser"),
                e = c("./visitor/compiler"),
                f = c("./visitor/evaluator"),
                g = c("./utils"),
                h = c("./nodes"),
                i = c("./path"),
                j = i.join,
                k = a.exports = function (b, c) {
                    c = c || {}, c.globals = {}, c.functions = {}, c.imports = [], c.paths = c.paths || [], c.filename = c.filename || "stylus", this.options = c, this.str = b
                };
            k.prototype.render = function (a) {
                var b = this.parser = new d(this.str, this.options);
                try {
                    h.filename = this.options.filename;
                    var c = b.parse();
                    this.evaluator = new f(c, this.options), c = this.evaluator.evaluate();
                    var g = new e(c, this.options),
                        i = g.compile(),
                        j = g.js;
                    a(null, i, j)
                } catch (k) {
                    a(k)
                }
            }, k.prototype.set = function (a, b) {
                return this.options[a] = b, this
            }, k.prototype.get = function (a) {
                return this.options[a]
            }, k.prototype.include = function (a) {
                return this.options.paths.push(a), this
            }, k.prototype.use = function (a) {
                return a.call(this, this), this
            }, k.prototype.define = function (a, b, c) {
                return b.nodeName ? (this.options.globals[a] = b, this) : (this.options.functions[a] = b, undefined != c && (b.raw = c), this)
            }
        }), a.register("stack/index.js", function (a, b, c) {
            var d = c("./frame"),
                e = a.exports = function () {
                    Array.apply(this, arguments)
                };
            e.prototype.__proto__ = Array.prototype, e.prototype.push = function (a) {
                return a.stack = this, a.parent = this.currentFrame, [].push.apply(this, arguments)
            }, e.prototype.__defineGetter__("currentFrame", function () {
                return this[this.length - 1]
            }), e.prototype.getBlockFrame = function (a) {
                for (var b = 0; b < this.length; ++b)
                    if (a == this[b].block) return this[b]
            }, e.prototype.lookup = function (a) {
                var b = this.currentFrame.block,
                    c, d;
                do {
                    var e = this.getBlockFrame(b);
                    if (e && (c = e.lookup(a))) switch (c.first.nodeName) {
                        case "ident":
                            return this.lookup(c.first.name) || c;
                        default:
                            return c
                    }
                } while (b = b.parent)
            }, e.prototype.inspect = function () {
                return this.reverse().map(function (a) {
                    return a.inspect()
                }).join("\n")
            }, e.prototype.toString = function () {
                var a, b, c = [],
                    d, e = this.length;
                while (e--) {
                    a = this[e].block;
                    if (b = a.node) {
                        d = "(" + b.filename + ":" + (b.lineno + 1) + ")";
                        switch (b.nodeName) {
                            case "function":
                                c.push("    at " + b.name + "() " + d);
                                break;
                            case "group":
                                c.push('    at "' + b.nodes[0].val + '" ' + d)
                        }
                    }
                }
                return c.join("\n")
            }
        }), a.register("stack/frame.js", function (a, b, c) {
            var d = c("./scope"),
                e = c("../nodes"),
                f = a.exports = function (b) {
                    this._scope = !1 === b.scope ? null : new d, this.block = b
                };
            f.prototype.__defineGetter__("scope", function () {
                return this._scope || this.parent.scope
            }), f.prototype.lookup = function (a) {
                return this.scope.lookup(a)
            }, f.prototype.inspect = function () {
                return "[Frame " + (!1 === this.block.scope ? "scope-less" : this.scope.inspect()) + "]"
            }
        }), a.register("stack/scope.js", function (a, b, c) {
            var d = a.exports = function () {
                this.locals = {}
            };
            d.prototype.add = function (a) {
                this.locals[a.name] = a.val
            }, d.prototype.lookup = function (a) {
                return this.locals[a]
            }, d.prototype.inspect = function () {
                var a = Object.keys(this.locals).map(function (a) {
                    return "@" + a
                });
                return "[Scope" + (a.length ? " " + a.join(", ") : "") + "]"
            }
        }), a.register("stylus.js", function (a, b, c) {
            function h(a, b) {
                return a = bifs + a, new d(a, b)
            }
            var d = c("./renderer"),
                e = c("./parser"),
                f = c("./nodes"),
                g = c("./utils");
            b = a.exports = h, b.version = "0.16.0", b.nodes = f, b.functions = c("./functions"), b.utils = c("./utils"), b.Visitor = c("./visitor"), b.Parser = c("./parser"), b.Evaluator = c("./visitor/evaluator"), b.render = function (a, b, c) {
                "function" == typeof b && (c = b, b = {}), (new d(a, b)).render(c)
            }, b.url = c("./functions/url")
        }), a.register("token.js", function (a, b, c) {
            var d = b = a.exports = function (b, c) {
                this.type = b, this.val = c
            };
            d.prototype.inspect = function () {
                var a = " " + this.val;
                return "[Token:" + this.lineno + " " + "[32m" + this.type + "[0m" + "[33m" + (this.val ? a : "") + "[0m" + "]"
            }, d.prototype.toString = function () {
                return (undefined === this.val ? this.type : this.val).toString()
            }
        }), a.register("utils.js", function (a, b, c) {
            var d = c("./nodes"),
                e = c("./path").join;
            b.absolute = function (a) {
                return /^([a-z]:\\)|\//i.test(a)
            }, b.lookup = function (a, c, d) {
                var f, g = c.length;
                if (b.absolute(a)) try {
                    return a
                } catch (h) { }
                while (g--) try {
                    f = e(c[g], a);
                    if (d == f) continue;
                    return f
                } catch (h) { }
            }, b.formatException = function (a, b) {
                var c = b.lineno,
                    d = b.filename,
                    e = b.input,
                    f = b.context || 8,
                    f = f / 2,
                    g = ("\n" + e).split("\n"),
                    h = Math.max(c - f, 1),
                    i = Math.min(g.length, c + f),
                    j = i.toString().length,
                    f = g.slice(h, i).map(function (a, b) {
                        var d = b + h;
                        return (d == c ? " > " : "   ") + Array(j - d.toString().length + 1).join(" ") + d + "| " + a
                    }).join("\n");
                return a.message = d + ":" + c + "\n" + f + "\n\n" + a.message + "\n" + (a.stylusStack ? a.stylusStack + "\n" : ""), a
            }, b.assertType = function (a, c, d) {
                b.assertPresent(a, d);
                if (a.nodeName == c) return;
                var e = a.nodeName,
                    f = 'expected "' + d + '" to be a ' + c + ", but got " + e + ":" + a;
                throw new Error("TypeError: " + f)
            }, b.assertString = function (a, c) {
                b.assertPresent(a, c);
                switch (a.nodeName) {
                    case "string":
                    case "ident":
                    case "literal":
                        return;
                    default:
                        var d = a.nodeName,
                            e = "expected string, ident or literal, but got " + d + ":" + a;
                        throw new Error("TypeError: " + e)
                }
            }, b.assertColor = function (a, c) {
                b.assertPresent(a, c);
                switch (a.nodeName) {
                    case "rgba":
                    case "hsla":
                        return;
                    default:
                        var d = a.nodeName,
                            e = "expected rgba or hsla, but got " + d + ":" + a;
                        throw new Error("TypeError: " + e)
                }
            }, b.assertPresent = function (a, b) {
                if (a) return;
                throw b ? new Error('"' + b + '" argument required') : new Error("argument missing")
            }, b.unwrap = function (a) {
                return a.preserve ? a : "arguments" != a.nodeName && "expression" != a.nodeName ? a : 1 != a.nodes.length ? a : "arguments" != a.nodes[0].nodeName && "expression" != a.nodes[0].nodeName ? a : b.unwrap(a.nodes[0])
            }, b.params = function (a) {
                return a.toString().match(/\(([^)]*)\)/)[1].split(/ *, */)
            }, b.merge = function (a, b) {
                for (var c in b) a[c] = b[c];
                return a
            }
        }), a.register("visitor/index.js", function (a, b, c) {
            var d = a.exports = function (b) {
                this.root = b
            };
            d.prototype.visit = function (a, b) {
                var c = "visit" + a.constructor.name;
                return this[c] ? this[c](a) : a
            }
        }), a.register("visitor/compiler.js", function (a, b, c) {
            var d = c("./index"),
                e = c("../nodes"),
                f = a.exports = function (b, c) {
                    c = c || {}, this.compress = c.compress, this.firebug = c.firebug, this.linenos = c.linenos, this.indents = 1, d.call(this, b), this.tree = [], this.js = ""
                };
            f.prototype.__proto__ = d.prototype, f.prototype.compile = function () {
                return this.visit(this.root)
            }, f.prototype.__defineGetter__("indent", function () {
                return this.compress ? "" : (new Array(this.indents)).join("  ")
            }), f.prototype.visitRoot = function (a) {
                this.buf = "";
                for (var b = 0, c = a.nodes.length; b < c; ++b) {
                    var d = a.nodes[b];
                    switch (d.nodeName) {
                        case "null":
                        case "expression":
                        case "function":
                        case "jsliteral":
                        case "unit":
                            continue;
                        default:
                            var e = this.visit(d);
                            e && (this.buf += e + "\n")
                    }
                }
                return this.buf
            }, f.prototype.visitBlock = function (a) {
                var b;
                if (a.hasProperties) {
                    var c = [this.compress ? "{" : " {"];
                    ++this.indents;
                    for (var d = 0, e = a.nodes.length; d < e; ++d) {
                        this.last = e - 1 == d, b = a.nodes[d];
                        switch (b.nodeName) {
                            case "null":
                            case "expression":
                            case "function":
                            case "jsliteral":
                            case "group":
                            case "unit":
                                continue;
                            default:
                                c.push(this.visit(b))
                        }
                    } --this.indents, c.push(this.indent + "}"), this.buf += c.join(this.compress ? "" : "\n"), this.buf += "\n"
                }
                for (var d = 0, e = a.nodes.length; d < e; ++d) {
                    b = a.nodes[d];
                    switch (b.nodeName) {
                        case "group":
                        case "print":
                        case "page":
                        case "block":
                        case "keyframes":
                            (this.linenos || this.firebug) && this.debugInfo(b), this.visit(b);
                            break;
                        case "media":
                        case "import":
                        case "fontface":
                            this.visit(b)
                    }
                }
            }, f.prototype.visitKeyframes = function (a) {
                var b = "official" == a.prefix ? "" : "-" + a.prefix + "-";
                this.buf += "@" + b + "keyframes " + this.visit(a.name) + (this.compress ? "{" : " {"), ++this.indents, a.frames.forEach(function (a) {
                    this.compress || (this.buf += "\n  "), this.buf += this.visit(a.pos), this.visit(a.block)
                }, this), --this.indents, this.buf += "}" + (this.compress ? "" : "\n")
            }, f.prototype.visitMedia = function (a) {
                this.buf += "@media " + a.val, this.buf += this.compress ? "{" : " {\n", ++this.indents, this.visit(a.block), --this.indents, this.buf += "}" + (this.compress ? "" : "\n")
            }, f.prototype.visitPage = function (a) {
                this.buf += this.indent + "@page", this.buf += a.selector ? " " + a.selector : "", this.visit(a.block)
            }, f.prototype.visitImport = function (a) {
                this.buf += "@import " + this.visit(a.path) + ";\n"
            }, f.prototype.visitFontFace = function (a) {
                this.buf += this.indent + "@font-face", this.visit(a.block)
            }, f.prototype.visitJSLiteral = function (a) {
                return this.js += "\n" + a.val.replace(/@selector/g, '"' + this.selector + '"'), ""
            }, f.prototype.visitComment = function (a) {
                return this.compress ? a.suppress ? "" : a.str : a.str
            }, f.prototype.visitFunction = function (a) {
                return a.name
            }, f.prototype.visitVariable = function (a) {
                return ""
            }, f.prototype.visitCharset = function (a) {
                return "@charset " + this.visit(a.val) + ";"
            }, f.prototype.visitLiteral = function (a) {
                return a.val.trim().replace(/^  /gm, "")
            }, f.prototype.visitBoolean = function (a) {
                return a.toString()
            }, f.prototype.visitRGBA = function (a) {
                return a.toString()
            }, f.prototype.visitHSLA = function (a) {
                return a.rgba.toString()
            }, f.prototype.visitUnit = function (a) {
                var b = a.type || "",
                    c = a.val,
                    d = c != (c | 0);
                if (this.compress) {
                    if ("%" != b && 0 == c) return "0";
                    if (d && c < 1 && c > -1) return c.toString().replace("0.", ".") + b
                }
                return c.toString() + b
            }, f.prototype.visitGroup = function (a) {
                function h(a, c) {
                    c ? a[c].forEach(function (b) {
                        g.unshift(b), h(a, c - 1), g.shift()
                    }) : a[0].forEach(function (a) {
                        var c = a.trim();
                        if (g.length)
                            for (var d = 0, e = g.length; d < e; ++d)~g[d].indexOf("&") ? c = g[d].replace(/&/g, c).trim() : c += " " + g[d].trim();
                        f.push(b.indent + c.trimRight())
                    })
                }
                var b = this,
                    c = this.tree,
                    d = c[c.length - 1],
                    e = [];
                a.nodes.forEach(function (a) {
                    e.push(a.parent ? a : a.val)
                }), c.push(e);
                var f = [],
                    g = [];
                a.block.hasProperties && (h(c, c.length - 1), this.buf += this.selector = f.join(this.compress ? "," : ",\n")), this.visit(a.block), c.pop()
            }, f.prototype.visitIdent = function (a) {
                return a.name
            }, f.prototype.visitString = function (a) {
                return this.isURL ? a.val : a.toString()
            }, f.prototype.visitNull = function (a) {
                return ""
            }, f.prototype.visitCall = function (a) {
                this.isURL = "url" == a.name;
                var b = a.args.nodes.map(function (a) {
                    return this.visit(a)
                }, this).join(this.compress ? "," : ", ");
                return this.isURL && (b = '"' + b + '"'), delete this.isURL, a.name + "(" + b + ")"
            }, f.prototype.visitExpression = function (a) {
                var b = [],
                    c = this,
                    d = a.nodes.length,
                    e = a.nodes.map(function (a) {
                        return c.visit(a)
                    });
                return e.forEach(function (f, g) {
                    var h = g == d - 1;
                    b.push(f);
                    if ("/" == e[g + 1] || "/" == f) return;
                    if (h) return;
                    b.push(a.isList ? c.compress ? "," : ", " : c.isURL ? "" : " ")
                }), b.join("")
            }, f.prototype.visitArguments = f.prototype.visitExpression, f.prototype.visitProperty = function (a) {
                var b = this,
                    c = this.visit(a.expr);
                return this.indent + (a.name || a.segments.join("")) + (this.compress ? ":" + c : ": " + c) + (this.compress ? this.last ? "" : ";" : ";")
            }
        }), a.register("visitor/evaluator.js", function (a, b, c) {
            var d = c("./index"),
                e = c("../nodes"),
                f = c("../stack"),
                g = c("../stack/frame"),
                h = c("../stack/scope"),
                i = c("../utils"),
                j = c("../functions"),
                k = c("../path").dirname,
                l = c("../path").join,
                m = c("../colors"),
                n = a.exports = function (b, c) {
                    c = c || {}, d.call(this, b), this.stack = new f, this.imports = c.imports || [], this.functions = c.functions || {}, this.globals = c.globals || {}, this.paths = c.paths || [], this.filename = c.filename, this.paths.push(k(c.filename || ".")), this.stack.push(this.global = new g(b)), this.warnings = c.warn, this.options = c, this.calling = [], this.importStack = []
                };
            n.prototype.__proto__ = d.prototype;
            var o = d.prototype.visit;
            n.prototype.visit = function (a) {
                try {
                    return o.call(this, a)
                } catch (b) {
                    if (b.filename) throw b;
                    b.lineno = a.lineno, b.filename = a.filename, b.stylusStack = this.stack.toString();
                    try { } catch (b) { }
                    throw b
                }
            }, n.prototype.setup = function () {
                this.populateGlobalScope(), this.imports.forEach(function (a) {
                    var b = new e.Expression;
                    b.push(new e.String(a)), this.visit(new e.Import(b))
                }, this)
            }, n.prototype.populateGlobalScope = function () {
                var a = this.global.scope;
                Object.keys(m).forEach(function (b) {
                    var c = m[b],
                        d = new e.RGBA(c[0], c[1], c[2], 1),
                        f = new e.Ident(b, d);
                    a.add(f)
                });
                var b = this.globals;
                Object.keys(b).forEach(function (c) {
                    a.add(new e.Ident(c, b[c]))
                })
            }, n.prototype.evaluate = function () {
                return this.setup(), this.visit(this.root)
            }, n.prototype.visitGroup = function (a) {
                var b = this.vendors;
                return a.nodes = a.nodes.map(function (a) {
                    return a.val = this.interpolate(a), a
                }, this), a.block = this.visit(a.block), a
            }, n.prototype.visitCharset = function (a) {
                return a
            }, n.prototype.visitReturn = function (a) {
                throw a.expr = this.visit(a.expr), a
            }, n.prototype.visitMedia = function (a) {
                return a.block = this.visit(a.block), a
            }, n.prototype.visitKeyframes = function (a) {
                return a.fabricated ? a : (a.name = this.visit(a.name).first.name, a.frames = a.frames.map(function (a) {
                    return a.block = this.visit(a.block), a
                }, this), "official" != a.prefix ? a : (this.vendors.forEach(function (b) {
                    var c = a.clone();
                    c.prefix = b, c.fabricated = !0, this.currentBlock.push(c)
                }, this), e.nil))
            }, n.prototype.visitFunction = function (a) {
                var b = this.stack.currentFrame.scope.lookup(a.name);
                b && this.warn("local " + b.nodeName + ' "' + a.name + '" previously defined in this scope');
                var c = this.functions[a.name];
                c && this.warn('user-defined function "' + a.name + '" is already defined');
                var d = j[a.name];
                return d && this.warn('built-in function "' + a.name + '" is already defined'), a
            }, n.prototype.visitEach = function (a) {
                var b = i.unwrap(this.visit(i.unwrap(a.expr))),
                    c = b.nodes.length,
                    d = new e.Ident(a.val),
                    f = new e.Ident(a.key || "__index__"),
                    g = this.currentScope,
                    h = this.currentBlock,
                    j = [],
                    k;
                a.block.scope = !1;
                for (var l = 0; l < c; ++l) d.val = b.nodes[l], f.val = new e.Unit(l), g.add(d), g.add(f), k = this.visit(a.block.clone()), j = j.concat(k.nodes);
                return this.mixin(j, h), j[j.length - 1] || e.nil
            }, n.prototype.visitCall = function (a) {
                var b = this.lookup(a.name),
                    c;
                this.ignoreColors = "url" == a.name, b && "expression" == b.nodeName && (b = b.nodes[0]), b && "function" != b.nodeName && (b = this.lookupFunction(a.name));
                if (!b || b.nodeName != "function") {
                    var c = this.literalCall(a);
                    return this.ignoreColors = !1, c
                }
                this.calling.push(a.name);
                if (this.calling.length > 200) throw new RangeError("Maximum call stack size exceeded");
                "expression" == b.nodeName && (b = b.first);
                var d = this.ret;
                this.ret = !0;
                var e = this.visit(a.args);
                for (var f in a.args.map) a.args.map[f] = this.visit(a.args.map[f]);
                return this.ret = d, b.fn ? c = this.invokeBuiltin(b.fn, e) : "function" == b.nodeName && (c = this.invokeFunction(b, e)), this.calling.pop(), this.ignoreColors = !1, c
            }, n.prototype.visitIdent = function (a) {
                var b;
                if (a.property) return (b = this.lookupProperty(a.name)) ? this.visit(b.expr.clone()) : e.nil;
                if (a.val.isNull) {
                    var c = this.lookup(a.name);
                    return c ? this.visit(c) : a
                }
                var d = this.ret;
                return this.ret = !0, a.val = this.visit(a.val), this.ret = d, this.currentScope.add(a), a.val
            }, n.prototype.visitBinOp = function (a) {
                if ("is defined" == a.op) return this.isDefined(a.left);
                var b = this.ret;
                this.ret = !0;
                var c = a.op,
                    d = this.visit(a.left),
                    f = this.visit(a.right);
                this.ret = b;
                var g = a.val ? this.visit(a.val) : null;
                try {
                    return this.visit(d.operate(c, f, g))
                } catch (h) {
                    if ("CoercionError" == h.name) switch (c) {
                        case "==":
                            return e.no;
                        case "!=":
                            return e.yes
                    }
                    throw h
                }
            }, n.prototype.visitUnaryOp = function (a) {
                var b = a.op,
                    c = this.visit(a.expr);
                "!" != b && (c = c.first.clone(), i.assertType(c, "unit"));
                switch (b) {
                    case "-":
                        c.val = -c.val;
                        break;
                    case "+":
                        c.val = +c.val;
                        break;
                    case "~":
                        c.val = ~c.val;
                        break;
                    case "!":
                        return c.toBoolean().negate()
                }
                return c
            }, n.prototype.visitTernary = function (a) {
                var b = this.visit(a.cond).toBoolean();
                return b.isTrue ? this.visit(a.trueExpr) : this.visit(a.falseExpr)
            }, n.prototype.visitExpression = function (a) {
                for (var b = 0, c = a.nodes.length; b < c; ++b) a.nodes[b] = this.visit(a.nodes[b]);
                return a
            }, n.prototype.visitArguments = n.prototype.visitExpression, n.prototype.visitProperty = function (a) {
                var b = this.interpolate(a),
                    c = this.lookup(b),
                    d = c && "function" == c.nodeName,
                    f = ~this.calling.indexOf(b);
                if (d && !f && !a.literal) {
                    this.calling.push(b);
                    var g = e.Arguments.fromExpression(i.unwrap(a.expr)),
                        h = this.visit(new e.Call(b, g));
                    return this.calling.pop(), h
                }
                var j = this.ret;
                return this.ret = !0, a.name = b, a.literal = !0, this.property = a, a.expr = this.visit(a.expr), delete this.property, this.ret = j, a
            }, n.prototype.visitRoot = function (a) {
                for (var b = 0; b < a.nodes.length; ++b) a.index = this.rootIndex = b, a.nodes[b] = this.visit(a.nodes[b]);
                return a
            }, n.prototype.visitBlock = function (a) {
                this.stack.push(new g(a));
                for (a.index = 0; a.index < a.nodes.length; ++a.index) try {
                    a.nodes[a.index] = this.visit(a.nodes[a.index])
                } catch (b) {
                    if ("return" == b.nodeName) {
                        if (this.ret) throw this.stack.pop(), b;
                        a.nodes[a.index] = b;
                        break
                    }
                    throw b
                }
                return this.stack.pop(), a
            }, n.prototype.visitIf = function (a) {
                var b, c = this.ret,
                    d = this.currentBlock,
                    f = a.negate;
                this.ret = !0;
                var g = this.visit(a.cond).first.toBoolean();
                this.ret = c;
                if (f) g.isFalse && (b = this.visit(a.block));
                else if (g.isTrue) b = this.visit(a.block);
                else if (a.elses.length) {
                    var h = a.elses,
                        i = h.length;
                    for (var j = 0; j < i; ++j)
                        if (h[j].cond) {
                            if (this.visit(h[j].cond).first.toBoolean().isTrue) {
                                b = this.visit(h[j].block);
                                break
                            }
                        } else b = this.visit(h[j])
                }
                return b && !a.postfix && d.node && "group" == d.node.nodeName ? (this.mixin(b.nodes, d), e.nil) : b || e.nil
            }, n.prototype.visitImport = function (a) {
                var b, d = this.root,
                    f = c("../parser"),
                    g = this.visit(a.path).first;
                if ("url" == g.name) return a;
                if (!g.string) throw new Error("@import string expected");
                var h = g = g.string;
                if (~g.indexOf(".css")) return a; ~
                    g.indexOf(".styl") || (g += ".styl"), b = i.lookup(g, this.paths, this.filename), b = b || i.lookup(l(h, "index.styl"), this.paths, this.filename), a.path = b, a.dirname = k(b), this.paths.push(a.dirname), this.options._imports && this.options._imports.push(a);
                if (!b) throw new Error("failed to locate @import file " + g);
                this.importStack.push(b), e.filename = b;
                var j = fs.readFileSync(b, "utf8"),
                    m = new e.Block,
                    n = new f(j, i.merge({
                        root: m
                    }, this.options));
                try {
                    m = n.parse()
                } catch (o) {
                    throw o.filename = b, o.lineno = n.lexer.lineno, o.input = j, o
                }
                fs.stat(b, function (b, c) {
                    if (b) return;
                    a.mtime = c.mtime
                }), m.parent = d, m.scope = !1;
                var p = this.visit(m);
                return this.paths.pop(), this.importStack.pop(), p
            }, n.prototype.invokeFunction = function (a, b) {
                var c = new e.Block(a.block.parent);
                a.block.parent = c;
                var d = a.block.clone(),
                    f = this.stack.currentFrame.block;
                this.stack.push(new g(c));
                var h = this.currentScope;
                h.add(new e.Ident("arguments", b)), h.add(new e.Ident("mixin", this.ret ? e.no : new e.String(f.nodeName)));
                if (this.property) {
                    var i = this.propertyExpression(this.property, a.name);
                    h.add(new e.Ident("current-property", i))
                } else h.add(new e.Ident("current-property", e.nil));
                var j = 0,
                    k = b.nodes.length;
                return a.params.nodes.forEach(function (c) {
                    if (c.rest) {
                        c.val = new e.Expression;
                        for (; j < k; ++j) c.val.push(b.nodes[j]);
                        c.val.preserve = !0
                    } else {
                        var d = b.map[c.name] || b.nodes[j++];
                        c = c.clone(), d ? d.isEmpty || (c.val = d) : b.push(c.val);
                        if (c.val.isNull) throw new Error('argument "' + c + '" required for ' + a)
                    }
                    h.add(c)
                }), this.invoke(d, !0)
            }, n.prototype.invokeBuiltin = function (a, b) {
                a.raw ? b = b.nodes : b = i.params(a).reduce(function (a, c) {
                    var d = b.map[c] || b.nodes.shift();
                    return d && a.push(d.first), a
                }, []);
                var c = a.apply(this, b),
                    d = new e.Expression;
                return d.push(c), c = d, this.invoke(c)
            }, n.prototype.invoke = function (a, b) {
                var c = this,
                    d;
                if (this.ret) d = this.eval(a.nodes), b && this.stack.pop();
                else {
                    var f = this.stack[this.stack.length - 2];
                    f && (this.targetBlock = f.block), a = this.visit(a), b && this.stack.pop(), this.mixin(a.nodes, this.currentBlock), d = e.nil
                }
                return d
            }, n.prototype.mixin = function (a, b) {
                var c = b.nodes.length,
                    d = b.nodes.slice(0, b.index),
                    e = b.nodes.slice(b.index + 1, c);
                this._mixin(a, d), b.nodes = d.concat(e)
            }, n.prototype._mixin = function (a, b) {
                var c, d = a.length;
                for (var e = 0; e < d; ++e) switch ((c = a[e]).nodeName) {
                    case "return":
                        return;
                    case "block":
                        this._mixin(c.nodes, b);
                        break;
                    default:
                        b.push(c)
                }
            }, n.prototype.eval = function (a) {
                if (!a) return e.nil;
                var b = a.length,
                    c = e.nil;
                try {
                    for (var d = 0; d < b; ++d) {
                        c = a[d];
                        switch (c.nodeName) {
                            case "if":
                                if ("block" != c.block.nodeName) {
                                    c = this.visit(c);
                                    break
                                };
                            case "each":
                            case "block":
                                c = this.visit(c), c.nodes && (c = this.eval(c.nodes));
                                break;
                            default:
                                c = this.visit(c)
                        }
                    }
                } catch (f) {
                    if ("return" == f.nodeName) return f.expr;
                    throw f
                }
                return c
            }, n.prototype.literalCall = function (a) {
                return a.args = this.visit(a.args), a
            }, n.prototype.lookupProperty = function (a) {
                var b = this.closestBlock.nodes,
                    c = this.targetBlock && this.targetBlock.nodes || [],
                    b = c.concat(b);
                for (var d = 0, e = b.length; d < e; ++d) {
                    if ("property" != b[d].nodeName) continue;
                    if (a == this.interpolate(b[d])) return b[d].clone()
                }
            }, n.prototype.lookup = function (a) {
                var b;
                if (this.ignoreColors && a in m) return;
                return (b = this.stack.lookup(a)) ? i.unwrap(b) : this.lookupFunction(a)
            }, n.prototype.interpolate = function (a) {
                var b = this;
                return a.segments.map(function (a) {
                    function c(a) {
                        switch (a.nodeName) {
                            case "function":
                            case "ident":
                                return a.name;
                            case "literal":
                            case "string":
                            case "unit":
                                return a.val;
                            case "expression":
                                var d = b.ret;
                                b.ret = !0;
                                var e = c(b.visit(a).first);
                                return b.ret = d, e
                        }
                    }
                    return c(a)
                }).join("")
            }, n.prototype.lookupFunction = function (a) {
                var b = this.functions[a] || j[a];
                if (b) return new e.Function(a, b)
            }, n.prototype.isDefined = function (a) {
                if ("ident" == a.nodeName) return e.Boolean(this.lookup(a.name));
                throw new Error('invalid "is defined" check on non-variable ' + a)
            }, n.prototype.propertyExpression = function (a, b) {
                var c = new e.Expression,
                    d = a.expr.clone();
                return c.push(new e.String(a.name)), d.nodes = d.nodes.map(function (a) {
                    return "call" == a.nodeName && b == a.name ? new e.Literal("__CALL__") : a
                }), c.push(d), c
            }, n.prototype.warn = function (a) {
                if (!this.warnings) return;
                console.warn("[33mWarning:[0m " + a)
            }, n.prototype.__defineGetter__("currentBlock", function () {
                return this.stack.currentFrame.block
            }), n.prototype.__defineGetter__("closestBlock", function () {
                var a = this.stack.length,
                    b;
                while (a--) {
                    b = this.stack[a].block;
                    if (b.node) switch (b.node.nodeName) {
                        case "group":
                        case "function":
                            return b
                    }
                }
            }), n.prototype.__defineGetter__("vendors", function () {
                return []
            }), n.prototype.__defineGetter__("currentScope", function () {
                return this.stack.currentFrame.scope
            }), n.prototype.__defineGetter__("currentFrame", function () {
                return this.stack.currentFrame
            })
        }), a("stylus")
    }();
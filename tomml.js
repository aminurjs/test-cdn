window.tomml = (function () {
  function q({ type: a, names: b, props: c, handler: e, mathmlBuilder: f }) {
    c = {
      type: a,
      numArgs: c.numArgs,
      argTypes: c.argTypes,
      allowedInArgument: !!c.allowedInArgument,
      allowedInText: !!c.allowedInText,
      allowedInMath: void 0 === c.allowedInMath ? !0 : c.allowedInMath,
      numOptionalArgs: c.numOptionalArgs || 0,
      infix: !!c.infix,
      primitive: !!c.primitive,
      handler: e,
    };
    for (e = 0; e < b.length; ++e)
      (ta[b[e]] = c), a && "op" == a && (Ja[b[e]] = ta[b[e]]);
    a && f && (ca[a] = f);
  }
  function S({ type: a, mathmlBuilder: b }) {
    q({
      type: a,
      names: [],
      props: { numArgs: 0 },
      handler() {
        throw Error("Should never be called.");
      },
      mathmlBuilder: b,
    });
  }
  function d(a, b, c, e, f) {
    F[a][e] = { group: b, replace: c };
    f && c && (F[a][c] = F[a][e]);
    null !== c &&
      ((f = 1 == c.length ? c.charCodeAt(0) : 128),
      c == e ||
        (47 < f && 58 > f) ||
        (64 < f && 91 > f) ||
        (96 < f && 123 > f) ||
        (Ka[a][c] = { group: b, name: e }));
  }
  function La(a, b, c, e) {
    if (void 0 === e && "none" !== b)
      for (var f = a.length - 1; 0 <= f; f--) {
        var g = a[f];
        "mstyle" === g.type &&
          g.attributes.mathcolor &&
          ((g = La(g.children, b, c, g.attributes.mathcolor)),
          (g.type && "mtable" !== g.type) || a.splice(f, 1, ...g.children));
      }
    g = e ? "mstyle" : "mrow";
    f = [];
    var m = [],
      n = [];
    let t = 0;
    var x = !1;
    for (let B = 0; B < a.length; B++) {
      const v = a[B];
      if (v.type && "mstyle" === v.type && v.attributes.mathcolor)
        0 < n.length && m.push(new l.MathNode(g, n)), m.push(v), (n = []);
      else if (
        v.attributes &&
        v.attributes.linebreak &&
        "newline" === v.attributes.linebreak
      ) {
        if (0 < n.length) {
          var u = new l.MathNode(g, n);
          e && u.setAttribute("mathcolor", e);
          m.push(new l.MathNode(g, n));
        }
        m.push(v);
        n = [];
        m = new l.MathNode("mtd", m);
        f.push(new l.MathNode("mtr", [m]));
        m = [];
      } else if ((n.push(v), v.type && "mo" === v.type && "=" === b))
        1 === v.children.length &&
          "=" === v.children[0].text &&
          ((t += 1),
          1 < t &&
            (n.pop(),
            (n = new l.MathNode(g, n)),
            e && n.setAttribute("mathcolor", e),
            m.push(n),
            (n = [v])));
      else if (v.type && "mo" === v.type && "tex" === b) {
        if (x && !v.attributes.form) {
          u = B < a.length - 1 ? a[B + 1] : null;
          x = !0;
          if (
            !u ||
            "mtext" !== u.type ||
            !u.attributes.linebreak ||
            "nobreak" !== u.attributes.linebreak
          )
            for (u = B + 1; u < a.length; u++) {
              const z = a[u];
              if (
                !z.type ||
                "mspace" !== z.type ||
                (z.attributes.linebreak && "newline" === z.attributes.linebreak)
              )
                break;
              else
                n.push(z),
                  (B += 1),
                  z.attributes &&
                    z.attributes.linebreak &&
                    "nobreak" === z.attributes.linebreak &&
                    (x = !1);
            }
          x &&
            ((n = new l.MathNode(g, n)),
            e && n.setAttribute("mathcolor", e),
            m.push(n),
            (n = []));
        }
        x = v.attributes.form && "prefix" === v.attributes.form;
        x = !(v.attributes.separator || x);
      } else x = !0;
    }
    0 < n.length &&
      ((a = new l.MathNode(g, n)),
      e && a.setAttribute("mathcolor", e),
      m.push(a));
    return 0 < f.length
      ? ((e = new l.MathNode("mtd", m)),
        (e = new l.MathNode("mtr", [e])),
        f.push(e),
        (e = new l.MathNode("mtable", f)),
        c ||
          (e.setAttribute("columnalign", "left"),
          e.setAttribute("rowspacing", "0em")),
        e)
      : l.newDocumentFragment(m);
  }
  function w(a, b) {
    if (!a || a.type !== b)
      throw Error(
        `Expected node of type ${b}, but got ` +
          (a ? `node of type ${a.type}` : String(a))
      );
    return a;
  }
  function ua(a) {
    const b = da(a);
    if (!b)
      throw Error(
        "Expected node of symbol group type, but got " +
          (a ? `node of type ${a.type}` : String(a))
      );
    return b;
  }
  function da(a) {
    return a &&
      ("atom" === a.type || Object.prototype.hasOwnProperty.call(Ib, a.type))
      ? a
      : null;
  }
  function Jb(a, b, c) {
    var e = Kb[a];
    switch (e) {
      case "\\\\cdrightarrow":
      case "\\\\cdleftarrow":
        return c.callFunction(e, [b[0]], [b[1]]);
      case "\\uparrow":
      case "\\downarrow":
        return (
          (a = c.callFunction("\\\\cdleft", [b[0]], [])),
          (e = c.callFunction(
            "\\Big",
            [{ type: "atom", text: e, mode: "math", family: "rel" }],
            []
          )),
          (b = c.callFunction("\\\\cdright", [b[1]], [])),
          c.callFunction(
            "\\\\cdparent",
            [{ type: "ordgroup", mode: "math", body: [a, e, b] }],
            []
          )
        );
      case "\\\\cdlongequal":
        return c.callFunction("\\\\cdlongequal", [], []);
      case "\\Vert":
        return c.callFunction(
          "\\Big",
          [{ type: "textord", text: "\\Vert", mode: "math" }],
          []
        );
      default:
        return { type: "textord", text: " ", mode: "math" };
    }
  }
  function ea(a, b) {
    "ordgroup" === a.type &&
      1 === a.body.length &&
      "\u2044" === a.body[0].text &&
      (a = { type: "textord", text: "/", mode: "math" });
    const c = da(a);
    if (c && Ma.includes(c.text))
      return (
        ["<", "\\lt"].includes(c.text) && (c.text = "\u27e8"),
        [">", "\\gt"].includes(c.text) && (c.text = "\u27e9"),
        "/" === c.text && (c.text = "\u2215"),
        "\\backslash" === c.text && (c.text = "\u2216"),
        c
      );
    if (c)
      throw new p(`Invalid delimiter '${c.text}' after '${b.funcName}'`, a);
    throw new p(`Invalid delimiter type '${a.type}'`, a);
  }
  function I({ type: a, names: b, props: c, handler: e, mathmlBuilder: f }) {
    c = {
      type: a,
      numArgs: c.numArgs || 0,
      allowedInText: !1,
      numOptionalArgs: 0,
      handler: e,
    };
    for (e = 0; e < b.length; ++e) Na[b[e]] = c;
    f && (ca[a] = f);
  }
  function Oa(a) {
    const b = [];
    a.consumeSpaces();
    let c = a.fetch().text;
    "\\relax" === c && (a.consume(), a.consumeSpaces(), (c = a.fetch().text));
    for (; "\\hline" === c || "\\hdashline" === c; )
      a.consume(),
        b.push("\\hdashline" === c),
        a.consumeSpaces(),
        (c = a.fetch().text);
    return b;
  }
  function N(
    a,
    {
      cols: b,
      envClasses: c,
      addEqnNum: e,
      singleRow: f,
      emptySingleRow: g,
      maxNumCols: m,
      leqno: n,
    },
    t
  ) {
    a.gullet.beginGroup();
    f || a.gullet.macros.set("\\cr", "\\\\\\relax");
    e &&
      (a.gullet.macros.set("\\tag", "\\env@tag{\\text{#1}}"),
      a.gullet.macros.set("\\notag", "\\env@notag"),
      a.gullet.macros.set("\\nonumber", "\\env@notag"));
    a.gullet.beginGroup();
    let x = [];
    const u = [x],
      B = [],
      v = [];
    let z;
    const T = [];
    for (T.push(Oa(a)); ; ) {
      let O = a.parseExpression(!1, f ? "\\end" : "\\\\");
      if (e && !z)
        for (var G = 0; G < O.length; G++)
          if ("envTag" === O[G].type || "noTag" === O[G].type) {
            z =
              "envTag" === O[G].type
                ? O.splice(G, 1)[0].body.body[0]
                : { body: null };
            break;
          }
      a.gullet.endGroup();
      a.gullet.beginGroup();
      O = { type: "ordgroup", mode: a.mode, body: O };
      x.push(O);
      G = a.fetch().text;
      if ("&" === G) {
        if (m && x.length === m)
          if (c.includes("array")) {
            if (a.settings.strict)
              throw new p(
                "Too few columns specified in the {array} column argument.",
                a.nextToken
              );
          } else {
            if (2 === m)
              throw new p(
                "The split environment accepts no more than two columns",
                a.nextToken
              );
            throw new p(
              "The equation environment accepts only one column",
              a.nextToken
            );
          }
        a.consume();
      } else if ("\\end" === G) {
        1 === x.length &&
          0 === O.body.length &&
          (1 < u.length || !g) &&
          u.pop();
        T.length < u.length + 1 && T.push([]);
        break;
      } else if ("\\\\" === G) {
        a.consume();
        let va;
        " " !== a.gullet.future().text && (va = a.parseSizeGroup(!0));
        B.push(va ? va.value : null);
        v.push(z);
        T.push(Oa(a));
        x = [];
        z = null;
        u.push(x);
      } else throw new p("Expected & or \\\\ or \\cr or \\end", a.nextToken);
    }
    a.gullet.endGroup();
    a.gullet.endGroup();
    v.push(z);
    return {
      type: "array",
      mode: a.mode,
      body: u,
      cols: b,
      rowGaps: B,
      hLinesBeforeRow: T,
      envClasses: c,
      addEqnNum: e,
      scriptLevel: t,
      tags: v,
      leqno: n,
    };
  }
  function Pa(a, b) {
    var c = C(a.body, b);
    "minner" === a.mclass
      ? (c = new l.MathNode("mpadded", c))
      : "mord" === a.mclass
      ? a.isCharacterBox || "mathord" === c[0].type
        ? ((c = c[0]), (c.type = "mi"))
        : (c = new l.MathNode("mi", c))
      : (new l.MathNode("mrow", c),
        a.mustPromote
          ? ((c = c[0]),
            (c.type = "mo"),
            a.isCharacterBox &&
              a.body[0].text &&
              /[A-Za-z]/.test(a.body[0].text) &&
              c.setAttribute("mathvariant", "italic"))
          : (c = new l.MathNode("mrow", c)),
        (b = 2 > b.level),
        "mrow" === c.type
          ? b &&
            ("mbin" === a.mclass
              ? (c.children.unshift(U(0.2222)), c.children.push(U(0.2222)))
              : "mrel" === a.mclass
              ? (c.children.unshift(U(0.2778)), c.children.push(U(0.2778)))
              : "mpunct" === a.mclass
              ? c.children.push(U(0.1667))
              : "minner" === a.mclass &&
                (c.children.unshift(U(0.0556)), c.children.push(U(0.0556))))
          : "mbin" === a.mclass
          ? ((c.attributes.lspace = b ? "0.2222em" : "0"),
            (c.attributes.rspace = b ? "0.2222em" : "0"))
          : "mrel" === a.mclass
          ? ((c.attributes.lspace = b ? "0.2778em" : "0"),
            (c.attributes.rspace = b ? "0.2778em" : "0"))
          : "mpunct" === a.mclass
          ? ((c.attributes.lspace = "0em"),
            (c.attributes.rspace = b ? "0.1667em" : "0"))
          : "mopen" === a.mclass || "mclose" === a.mclass
          ? ((c.attributes.lspace = "0em"), (c.attributes.rspace = "0em"))
          : "minner" === a.mclass &&
            b &&
            ((c.attributes.lspace = "0.0556em"),
            (c.attributes.width = "+0.1111em")),
        "mopen" !== a.mclass &&
          "mclose" !== a.mclass &&
          (delete c.attributes.stretchy, delete c.attributes.form));
    return c;
  }
  function E(a, b) {
    h[a] = b;
  }
  class p {
    constructor(a, b) {
      a = " " + a;
      let c;
      var e = b && b.loc;
      if (e && e.start <= e.end) {
        b = e.lexer.input;
        c = e.start;
        const f = e.end;
        a =
          c === b.length
            ? a + " at end of input: "
            : a + (" at position " + (c + 1) + ": ");
        e = b.slice(c, f).replace(/[^]/g, "$&\u0332");
        let g;
        g = 15 < c ? "\u2026" + b.slice(c - 15, c) : b.slice(0, c);
        b = f + 15 < b.length ? b.slice(f, f + 15) + "\u2026" : b.slice(f);
        a += g + e + b;
      }
      a = Error(a);
      a.name = "ParseError";
      a.__proto__ = p.prototype;
      a.position = c;
      return a;
    }
  }
  p.prototype.__proto__ = Error.prototype;
  const Lb = /([A-Z])/g,
    X = function (a) {
      return "ordgroup" === a.type
        ? 1 === a.body.length
          ? X(a.body[0])
          : a
        : "color" === a.type
        ? 1 === a.body.length
          ? X(a.body[0])
          : a
        : "font" === a.type
        ? X(a.body)
        : a;
    };
  var y = {
    deflt: function (a, b) {
      return void 0 === a ? b : a;
    },
    escape: function (a, b) {
      let c,
        e = "",
        f;
      for (c = 0; c < a.length; c++) {
        f = a.codePointAt(c);
        const g = { value: 65536 < f ? a.substr(0, 2) : a[c], bold: b };
        e += com.efmase.js.utilities.toolset.getEncodedStr(g);
        65536 < f && c++;
      }
      return e;
    },
    hyphenate: function (a) {
      return a.replace(Lb, "-$1").toLowerCase();
    },
    getBaseElem: X,
    isCharacterBox: function (a) {
      a = X(a);
      return "mathord" === a.type || "textord" === a.type || "atom" === a.type;
    },
    protocolFromUrl: function (a) {
      a = /^\s*([^\\/#]*?)(?::|&#0*58|&#x0*3a)/i.exec(a);
      return null != a ? a[1] : "_relative";
    },
    round: function (a) {
      return +a.toFixed(4);
    },
  };
  class fa {
    constructor(a) {
      a = a || {};
      this.displayMode = y.deflt(a.displayMode, !0);
      this.annotate = y.deflt(a.annotate, !1);
      this.leqno = y.deflt(a.leqno, !1);
      this.errorColor = y.deflt(a.errorColor, "#b22222");
      this.macros = a.macros || {};
      this.wrap = y.deflt(a.wrap, "tex");
      this.xml = y.deflt(a.xml, !1);
      this.colorIsTextColor = y.deflt(a.colorIsTextColor, !1);
      this.strict = y.deflt(a.strict, !1);
      this.trust = y.deflt(a.trust, !1);
      this.maxSize =
        void 0 === a.maxSize
          ? [Infinity, Infinity]
          : Array.isArray(a.maxSize)
          ? a.maxSize
          : [Infinity, Infinity];
      this.maxExpand = Math.max(0, y.deflt(a.maxExpand, 1e3));
      this.bigOpDefLimits = y.deflt(a.bigOpDefLimits, !0);
      this.limOpDefLimits = y.deflt(a.limOpDefLimits, !0);
      this.trigoOpDefLimits = y.deflt(a.trigoOpDefLimits, !1);
      this.intOpDefLimits = y.deflt(a.intOpDefLimits, !1);
      this.mathOpDefLimits = y.deflt(a.mathOpDefLimits, !1);
    }
    isTrusted(a) {
      a.url && !a.protocol && (a.protocol = y.protocolFromUrl(a.url));
      return !("function" === typeof this.trust ? !this.trust(a) : !this.trust);
    }
  }
  const ta = {},
    ca = {},
    Y = function (a) {
      return "ordgroup" === a.type && 1 === a.body.length ? a.body[0] : a;
    },
    D = function (a) {
      return "ordgroup" === a.type ? a.body : [a];
    };
  class Mb {
    constructor(a) {
      this.children = a;
      this.classes = [];
      this.style = {};
    }
    hasClass(a) {
      return this.classes.includes(a);
    }
    toNode() {
      const a = document.createDocumentFragment();
      for (let b = 0; b < this.children.length; b++)
        a.appendChild(this.children[b].toNode());
      return a;
    }
    toMarkup() {
      let a = "";
      for (let b = 0; b < this.children.length; b++)
        a += this.children[b].toMarkup();
      return a;
    }
    toText() {
      return this.children.map((a) => a.toText()).join("");
    }
  }
  const ha = function (a) {
    return a.filter((b) => b).join(" ");
  };
  class Nb {
    constructor(a, b, c) {
      this.classes = a || [];
      this.attributes = {};
      this.style = c || {};
      this.children = b || [];
    }
    setAttribute(a, b) {
      this.attributes[a] = b;
    }
    toNode() {
      const a = document.createElement("span");
      a.className = ha(this.classes);
      for (var b in this.style)
        Object.prototype.hasOwnProperty.call(this.style, b) &&
          (a.style[b] = this.style[b]);
      for (const c in this.attributes)
        Object.prototype.hasOwnProperty.call(this.attributes, c) &&
          a.setAttribute(c, this.attributes[c]);
      for (b = 0; b < this.children.length; b++)
        a.appendChild(this.children[b].toNode());
      return a;
    }
    toMarkup() {
      let a = "<span";
      this.classes.length && (a += ` class="${y.escape(ha(this.classes))}"`);
      var b = "";
      for (const c in this.style)
        Object.prototype.hasOwnProperty.call(this.style, c) &&
          (b += `${y.hyphenate(c)}:${this.style[c]};`);
      b && (a += ` style="${b}"`);
      for (const c in this.attributes)
        Object.prototype.hasOwnProperty.call(this.attributes, c) &&
          (a += ` ${c}="${y.escape(this.attributes[c])}"`);
      a += ">";
      for (b = 0; b < this.children.length; b++)
        a += this.children[b].toMarkup();
      return a + "</span>";
    }
  }
  class Ob {
    constructor(a) {
      this.text = a;
    }
    toNode() {
      return document.createTextNode(this.text);
    }
    toMarkup() {
      return y.escape(this.text);
    }
  }
  class Pb {
    constructor(a, b, c) {
      this.alt = b;
      this.src = a;
      this.classes = ["mord"];
      this.style = c;
    }
    hasClass(a) {
      return this.classes.includes(a);
    }
    toNode() {
      const a = document.createElement("img");
      a.src = this.src;
      a.alt = this.alt;
      a.className = "mord";
      for (const b in this.style)
        Object.prototype.hasOwnProperty.call(this.style, b) &&
          (a.style[b] = this.style[b]);
      return a;
    }
    toMarkup() {
      let a = `<img src='${this.src}' alt='${this.alt}'`,
        b = "";
      for (const c in this.style)
        Object.prototype.hasOwnProperty.call(this.style, c) &&
          (b += `${y.hyphenate(c)}:${this.style[c]};`);
      b && (a += ` style="${y.escape(b)}"`);
      return a + "/>";
    }
  }
  class L {
    constructor(a, b, c, e) {
      this.type = a;
      this.attributes = {};
      this.children = b || [];
      this.classes = c || [];
      this.style = e || {};
    }
    setAttribute(a, b) {
      this.attributes[a] = b;
    }
    getAttribute(a) {
      return this.attributes[a];
    }
    toNode() {
      const a = document.createElementNS(
        "http://www.w3.org/1998/Math/MathML",
        this.type
      );
      for (var b in this.attributes)
        Object.prototype.hasOwnProperty.call(this.attributes, b) &&
          a.setAttribute(b, this.attributes[b]);
      0 < this.classes.length && (a.className = ha(this.classes));
      for (const c in this.style)
        Object.prototype.hasOwnProperty.call(this.style, c) &&
          (a.style[c] = this.style[c]);
      for (b = 0; b < this.children.length; b++)
        a.appendChild(this.children[b].toNode());
      return a;
    }
    toMarkup() {
      let a = "<" + this.type;
      "math" == this.type &&
        (a += ' xmlns="http://www.w3.org/1998/Math/MathML"');
      for (var b in this.attributes)
        Object.prototype.hasOwnProperty.call(this.attributes, b) &&
          ((a += " " + b + '="'),
          (a += y.escape(this.attributes[b])),
          (a += '"'));
      0 < this.classes.length &&
        (a += ` class="${y.escape(ha(this.classes))}"`);
      b = "";
      for (var c in this.style)
        Object.prototype.hasOwnProperty.call(this.style, c) &&
          (b += `${y.hyphenate(c)}:${this.style[c]};`);
      b && (a += ` style="${b}"`);
      a += ">";
      for (c = 0; c < this.children.length; c++)
        a += this.children[c].toMarkup();
      return (a += "</" + this.type + ">");
    }
    toText() {
      return this.children.map((a) => a.toText()).join("");
    }
  }
  class Qa {
    constructor(a) {
      this.text = a;
    }
    toNode() {
      return document.createTextNode(this.text);
    }
    toMarkup() {
      return y.escape(this.toText());
    }
    toText() {
      return this.text;
    }
  }
  const ia = (a) => {
    1 === a.length && "mrow" === a[0].type
      ? ((a = a.pop()), (a.type = "mstyle"))
      : (a = new L("mstyle", a));
    return a;
  };
  var l = {
    MathNode: L,
    TextNode: Qa,
    newDocumentFragment: function (a) {
      return new Mb(a);
    },
  };
  const Qb = {
    widehat: "^",
    widecheck: "\u02c7",
    widetilde: "~",
    wideparen: "\u23dc",
    utilde: "~",
    overleftarrow: "\u2190",
    underleftarrow: "\u2190",
    xleftarrow: "\u2190",
    overrightarrow: "\u2192",
    underrightarrow: "\u2192",
    xrightarrow: "\u2192",
    underbrace: "\u23df",
    overbrace: "\u23de",
    overgroup: "\u23e0",
    overparen: "\u23dc",
    undergroup: "\u23e1",
    underparen: "\u23dd",
    overleftrightarrow: "\u2194",
    underleftrightarrow: "\u2194",
    xleftrightarrow: "\u2194",
    Overrightarrow: "\u21d2",
    xRightarrow: "\u21d2",
    overleftharpoon: "\u21bc",
    xleftharpoonup: "\u21bc",
    overrightharpoon: "\u21c0",
    xrightharpoonup: "\u21c0",
    xLeftarrow: "\u21d0",
    xLeftrightarrow: "\u21d4",
    xhookleftarrow: "\u21a9",
    xhookrightarrow: "\u21aa",
    xmapsto: "\u21a6",
    xrightharpoondown: "\u21c1",
    xleftharpoondown: "\u21bd",
    xtwoheadleftarrow: "\u219e",
    xtwoheadrightarrow: "\u21a0",
    xlongequal: "=",
    xrightleftarrows: "\u21c4",
    yields: "\u2192",
    yieldsLeft: "\u2190",
    mesomerism: "\u2194",
    longrightharpoonup: "\u21c0",
    longleftharpoondown: "\u21bd",
    eqrightharpoonup: "\u21c0",
    eqleftharpoondown: "\u21bd",
    "\\cdrightarrow": "\u2192",
    "\\cdleftarrow": "\u2190",
    "\\cdlongequal": "=",
    bar: "\u2212",
    overline: "\u00af",
    breve: "\u02d8",
    underline: "_",
  };
  var ja = {
    mathMLnode: function (a) {
      a = new l.TextNode(Qb[a.slice(1)]);
      a = new l.MathNode("mo", [a]);
      a.setAttribute("stretchy", "true");
      return a;
    },
  };
  const Rb = { bin: 1, close: 1, inner: 1, open: 1, punct: 1, rel: 1 },
    Ib = {
      "accent-token": 1,
      mathord: 1,
      "op-token": 1,
      spacing: 1,
      textord: 1,
    },
    F = { math: {}, text: {} },
    Ka = { math: {}, text: {} },
    Ja = {};
  d("math", "rel", "\u2261", "\\equiv", !0);
  d("math", "rel", "\u227a", "\\prec", !0);
  d("math", "rel", "\u227b", "\\succ", !0);
  d("math", "rel", "\u223c", "\\sim", !0);
  d("math", "rel", "\u27c2", "\\perp", !0);
  d("math", "rel", "\u2aaf", "\\preceq", !0);
  d("math", "rel", "\u2ab0", "\\succeq", !0);
  d("math", "rel", "\u2243", "\\simeq", !0);
  d("math", "rel", "\u224c", "\\backcong", !0);
  d("math", "rel", "|", "\\mid", !0);
  d("math", "rel", "\u226a", "\\ll", !0);
  d("math", "rel", "\u226b", "\\gg", !0);
  d("math", "rel", "\u224d", "\\asymp", !0);
  d("math", "rel", "\u2225", "\\parallel");
  d("math", "rel", "\u22c8", "\\bowtie", !0);
  d("math", "rel", "\u2323", "\\smile", !0);
  d("math", "rel", "\u2291", "\\sqsubseteq", !0);
  d("math", "rel", "\u2292", "\\sqsupseteq", !0);
  d("math", "rel", "\u2250", "\\doteq", !0);
  d("math", "rel", "\u2322", "\\frown", !0);
  d("math", "rel", "\u220b", "\\ni", !0);
  d("math", "rel", "\u220c", "\\notni", !0);
  d("math", "rel", "\u221d", "\\propto", !0);
  d("math", "rel", "\u22a2", "\\vdash", !0);
  d("math", "rel", "\u22a3", "\\dashv", !0);
  d("math", "rel", "\u220b", "\\owns");
  d("math", "rel", "\u2258", "\\arceq", !0);
  d("math", "rel", "\u2259", "\\wedgeq", !0);
  d("math", "rel", "\u225a", "\\veeeq", !0);
  d("math", "rel", "\u225b", "\\stareq", !0);
  d("math", "rel", "\u225d", "\\eqdef", !0);
  d("math", "rel", "\u225e", "\\measeq", !0);
  d("math", "rel", "\u225f", "\\questeq", !0);
  d("math", "rel", "\u2260", "\\ne", !0);
  d("math", "rel", "\u2260", "\\neq");
  d("math", "rel", "\u2244", "\\notsimeq");
  d("math", "rel", "\u2237", "\\dblcolon", !0);
  d("math", "rel", "\u2254", "\\coloneqq", !0);
  d("math", "rel", "\u2255", "\\eqqcolon", !0);
  d("math", "rel", "\u2239", "\\eqcolon", !0);
  d("math", "rel", "\u2a74", "\\Coloneqq", !0);
  d("math", "rel", "\u2249", "\\notapprox", !0);
  d("math", "rel", "\u2262", "\\notequiv", !0);
  d("math", "rel", "\u226d", "\\notasymp", !0);
  d("math", "rel", "\u2274", "\\notlesssim", !0);
  d("math", "rel", "\u2275", "\\notgtrsim", !0);
  d("math", "rel", "\u2278", "\\notlessgtr", !0);
  d("math", "rel", "\u2279", "\\notgtrless", !0);
  d("math", "punct", ".", "\\ldotp");
  d("math", "punct", "\u00b7", "\\cdotp");
  d("math", "textord", "#", "\\#");
  d("text", "textord", "#", "\\#");
  d("math", "textord", "&", "\\&");
  d("text", "textord", "&", "\\&");
  d("math", "textord", "\u2135", "\\aleph", !0);
  d("math", "textord", "\u2200", "\\forall", !0);
  d("math", "textord", "\u210f", "\\hslash");
  d("math", "textord", "\u210f", "\\hbar", !0);
  d("math", "textord", "\u2203", "\\exists", !0);
  d("math", "textord", "\u2207", "\\nabla", !0);
  d("math", "textord", "\u266d", "\\flat", !0);
  d("math", "textord", "\u2113", "\\ell", !0);
  d("math", "textord", "\u266e", "\\natural", !0);
  d("math", "textord", "\u00c5", "\\AA", !0);
  d("math", "textord", "\u212b", "\\AA", !0);
  d("text", "textord", "\u212b", "\\AA", !0);
  d("math", "textord", "\u2663", "\\clubsuit", !0);
  d("math", "textord", "\u2667", "\\varclubsuit", !0);
  d("math", "textord", "\u2118", "\\wp", !0);
  d("math", "textord", "\u266f", "\\sharp", !0);
  d("math", "textord", "\u2662", "\\diamondsuit", !0);
  d("math", "textord", "\u2666", "\\vardiamondsuit", !0);
  d("math", "textord", "\u211c", "\\Re", !0);
  d("math", "textord", "\u2661", "\\heartsuit", !0);
  d("math", "textord", "\u2665", "\\varheartsuit", !0);
  d("math", "textord", "\u2111", "\\Im", !0);
  d("math", "textord", "\u2660", "\\spadesuit", !0);
  d("math", "textord", "\u2664", "\\varspadesuit", !0);
  d("math", "textord", "\u2640", "\\female", !0);
  d("math", "textord", "\u2642", "\\male", !0);
  d("math", "textord", "\u00a7", "\\S", !0);
  d("text", "textord", "\u00a7", "\\S");
  d("math", "textord", "\u00b6", "\\P", !0);
  d("text", "textord", "\u00b6", "\\P");
  d("text", "textord", "\u263a", "\\smiley", !0);
  d("math", "textord", "\u263a", "\\smiley", !0);
  d("math", "textord", "\u2020", "\\dag");
  d("text", "textord", "\u2020", "\\dag");
  d("text", "textord", "\u2020", "\\textdagger");
  d("math", "textord", "\u2021", "\\ddag");
  d("text", "textord", "\u2021", "\\ddag");
  d("text", "textord", "\u2021", "\\textdaggerdbl");
  d("math", "close", "\u23b1", "\\rmoustache", !0);
  d("math", "open", "\u23b0", "\\lmoustache", !0);
  d("math", "close", "\u27ef", "\\rgroup", !0);
  d("math", "open", "\u27ee", "\\lgroup", !0);
  d("math", "bin", "\u2213", "\\mp", !0);
  d("math", "bin", "\u2296", "\\ominus", !0);
  d("math", "bin", "\u228e", "\\uplus", !0);
  d("math", "bin", "\u2293", "\\sqcap", !0);
  d("math", "bin", "\u2217", "\\ast");
  d("math", "bin", "\u2294", "\\sqcup", !0);
  d("math", "bin", "\u25ef", "\\bigcirc", !0);
  d("math", "bin", "\u2219", "\\bullet", !0);
  d("math", "bin", "\u2021", "\\ddagger");
  d("math", "bin", "\u2240", "\\wr", !0);
  d("math", "bin", "\u2a3f", "\\amalg");
  d("math", "bin", "&", "\\And");
  d("math", "rel", "\u27f5", "\\longleftarrow", !0);
  d("math", "rel", "\u21d0", "\\Leftarrow", !0);
  d("math", "rel", "\u27f8", "\\Longleftarrow", !0);
  d("math", "rel", "\u27f6", "\\longrightarrow", !0);
  d("math", "rel", "\u21d2", "\\Rightarrow", !0);
  d("math", "rel", "\u27f9", "\\Longrightarrow", !0);
  d("math", "rel", "\u2194", "\\leftrightarrow", !0);
  d("math", "rel", "\u27f7", "\\longleftrightarrow", !0);
  d("math", "rel", "\u21d4", "\\Leftrightarrow", !0);
  d("math", "rel", "\u27fa", "\\Longleftrightarrow", !0);
  d("math", "rel", "\u21a4", "\\mapsfrom", !0);
  d("math", "rel", "\u21a6", "\\mapsto", !0);
  d("math", "rel", "\u27fc", "\\longmapsto", !0);
  d("math", "rel", "\u2197", "\\nearrow", !0);
  d("math", "rel", "\u21a9", "\\hookleftarrow", !0);
  d("math", "rel", "\u21aa", "\\hookrightarrow", !0);
  d("math", "rel", "\u2198", "\\searrow", !0);
  d("math", "rel", "\u21bc", "\\leftharpoonup", !0);
  d("math", "rel", "\u21c0", "\\rightharpoonup", !0);
  d("math", "rel", "\u2199", "\\swarrow", !0);
  d("math", "rel", "\u21bd", "\\leftharpoondown", !0);
  d("math", "rel", "\u21c1", "\\rightharpoondown", !0);
  d("math", "rel", "\u2196", "\\nwarrow", !0);
  d("math", "rel", "\u21cc", "\\rightleftharpoons", !0);
  d("math", "mathord", "\u21af", "\\lightning", !0);
  d("math", "mathord", "\u2030", "\\permil", !0);
  d("text", "textord", "\u2030", "\\permil");
  d("math", "rel", "\u226e", "\\nless", !0);
  d("math", "rel", "\u2a87", "\\lneq", !0);
  d("math", "rel", "\u2268", "\\lneqq", !0);
  d("math", "rel", "\u2268\ufe00", "\\lvertneqq");
  d("math", "rel", "\u22e6", "\\lnsim", !0);
  d("math", "rel", "\u2a89", "\\lnapprox", !0);
  d("math", "rel", "\u2280", "\\nprec", !0);
  d("math", "rel", "\u22e0", "\\npreceq", !0);
  d("math", "rel", "\u22e8", "\\precnsim", !0);
  d("math", "rel", "\u2ab9", "\\precnapprox", !0);
  d("math", "rel", "\u2241", "\\nsim", !0);
  d("math", "rel", "\u2224", "\\nmid", !0);
  d("math", "rel", "\u2224", "\\nshortmid");
  d("math", "rel", "\u22ac", "\\nvdash", !0);
  d("math", "rel", "\u22ad", "\\nvDash", !0);
  d("math", "rel", "\u22ea", "\\ntriangleleft");
  d("math", "rel", "\u22ec", "\\ntrianglelefteq", !0);
  d("math", "rel", "\u2284", "\\nsubset", !0);
  d("math", "rel", "\u2285", "\\nsupset", !0);
  d("math", "rel", "\u228a", "\\subsetneq", !0);
  d("math", "rel", "\u228a\ufe00", "\\varsubsetneq");
  d("math", "rel", "\u2acb", "\\subsetneqq", !0);
  d("math", "rel", "\u2acb\ufe00", "\\varsubsetneqq");
  d("math", "rel", "\u226f", "\\ngtr", !0);
  d("math", "rel", "\u2a88", "\\gneq", !0);
  d("math", "rel", "\u2269", "\\gneqq", !0);
  d("math", "rel", "\u2269\ufe00", "\\gvertneqq");
  d("math", "rel", "\u22e7", "\\gnsim", !0);
  d("math", "rel", "\u2a8a", "\\gnapprox", !0);
  d("math", "rel", "\u2281", "\\nsucc", !0);
  d("math", "rel", "\u22e1", "\\nsucceq", !0);
  d("math", "rel", "\u22e9", "\\succnsim", !0);
  d("math", "rel", "\u2aba", "\\succnapprox", !0);
  d("math", "rel", "\u2246", "\\ncong", !0);
  d("math", "rel", "\u2226", "\\nparallel", !0);
  d("math", "rel", "\u2226", "\\nshortparallel");
  d("math", "rel", "\u22af", "\\nVDash", !0);
  d("math", "rel", "\u22eb", "\\ntriangleright");
  d("math", "rel", "\u22ed", "\\ntrianglerighteq", !0);
  d("math", "rel", "\u228b", "\\supsetneq", !0);
  d("math", "rel", "\u228b", "\\varsupsetneq");
  d("math", "rel", "\u2acc", "\\supsetneqq", !0);
  d("math", "rel", "\u2acc\ufe00", "\\varsupsetneqq");
  d("math", "rel", "\u22ae", "\\nVdash", !0);
  d("math", "rel", "\u2ab5", "\\precneqq", !0);
  d("math", "rel", "\u2ab6", "\\succneqq", !0);
  d("math", "bin", "\u22b4", "\\unlhd", !0);
  d("math", "bin", "\u22b5", "\\unrhd");
  d("math", "rel", "\u219a", "\\nleftarrow", !0);
  d("math", "rel", "\u219b", "\\nrightarrow", !0);
  d("math", "rel", "\u21cd", "\\nLeftarrow", !0);
  d("math", "rel", "\u21cf", "\\nRightarrow", !0);
  d("math", "rel", "\u21ae", "\\nleftrightarrow", !0);
  d("math", "rel", "\u21ce", "\\nLeftrightarrow", !0);
  d("math", "rel", "\u25b3", "\\vartriangle");
  d("math", "textord", "\u210f", "\\hslash");
  d("math", "textord", "\u25bd", "\\triangledown");
  d("math", "textord", "\u25ca", "\\lozenge");
  d("math", "textord", "\u24c8", "\\circledS");
  d("math", "textord", "\u00ae", "\\circledR", !0);
  d("text", "textord", "\u00ae", "\\circledR");
  d("text", "textord", "\u00ae", "\\textregistered");
  d("math", "textord", "\u2221", "\\measuredangle", !0);
  d("math", "textord", "\u2204", "\\nexists");
  d("math", "textord", "\u2127", "\\mho");
  d("math", "textord", "\u2132", "\\Finv", !0);
  d("math", "textord", "\u2141", "\\Game", !0);
  d("math", "textord", "\u2035", "\\backprime");
  d("math", "textord", "\u25b2", "\\blacktriangle");
  d("math", "textord", "\u25bc", "\\blacktriangledown");
  d("math", "textord", "\u25aa", "\\blacksquare");
  d("math", "textord", "\u25a0", "\\blacksquare");
  d("math", "textord", "\u29eb", "\\blacklozenge");
  d("math", "textord", "\u2605", "\\bigstar");
  d("math", "textord", "\u2222", "\\sphericalangle", !0);
  d("math", "textord", "\u2201", "\\complement", !0);
  d("math", "textord", "\u00f0", "\\eth", !0);
  d("text", "textord", "\u00f0", "\u00f0");
  d("math", "textord", "\u2571", "\\diagup");
  d("math", "textord", "\u2572", "\\diagdown");
  d("math", "bin", "\u25fb", "\\square", !0);
  d("math", "bin", "\u25a1", "\\square", !0);
  d("math", "textord", "\u25a1", "\\Box");
  d("math", "bin", "\u25c1", "\\lhd", !0);
  d("math", "textord", "\u25ca", "\\Diamond");
  d("math", "textord", "\u00a5", "\\yen", !0);
  d("text", "textord", "\u00a5", "\\yen", !0);
  d("math", "textord", "\u2713", "\\checkmark", !0);
  d("text", "textord", "\u2713", "\\checkmark");
  d("math", "textord", "\u2717", "\\ballotx", !0);
  d("text", "textord", "\u2717", "\\ballotx");
  d("text", "textord", "\u2022", "\\textbullet");
  d("math", "textord", "\u2136", "\\beth", !0);
  d("math", "textord", "\u2138", "\\daleth", !0);
  d("math", "textord", "\u2137", "\\gimel", !0);
  d("math", "textord", "\u03dd", "\\digamma", !0);
  d("math", "textord", "\u03f0", "\\varkappa");
  d("math", "open", "\u231c", "\\ulcorner", !0);
  d("math", "close", "\u231d", "\\urcorner", !0);
  d("math", "open", "\u231e", "\\llcorner", !0);
  d("math", "close", "\u231f", "\\lrcorner", !0);
  d("math", "rel", "\u2266", "\\leqq", !0);
  d("math", "rel", "\u2a7d", "\\leqslant", !0);
  d("math", "rel", "\u2a95", "\\eqslantless", !0);
  d("math", "rel", "\u2272", "\\lesssim", !0);
  d("math", "rel", "\u2a85", "\\lessapprox", !0);
  d("math", "rel", "\u224a", "\\approxeq", !0);
  d("math", "bin", "\u22d6", "\\lessdot");
  d("math", "rel", "\u22d8", "\\lll", !0);
  d("math", "rel", "\u2276", "\\lessgtr", !0);
  d("math", "rel", "\u22da", "\\lesseqgtr", !0);
  d("math", "rel", "\u2a8b", "\\lesseqqgtr", !0);
  d("math", "rel", "\u2251", "\\doteqdot");
  d("math", "rel", "\u2253", "\\risingdotseq", !0);
  d("math", "rel", "\u2252", "\\fallingdotseq", !0);
  d("math", "rel", "\u223d", "\\backsim", !0);
  d("math", "rel", "\u22cd", "\\backsimeq", !0);
  d("math", "rel", "\u2ac5", "\\subseteqq", !0);
  d("math", "rel", "\u22d0", "\\Subset", !0);
  d("math", "rel", "\u228f", "\\sqsubset", !0);
  d("math", "rel", "\u227c", "\\preccurlyeq", !0);
  d("math", "rel", "\u22de", "\\curlyeqprec", !0);
  d("math", "rel", "\u227e", "\\precsim", !0);
  d("math", "rel", "\u2ab7", "\\precapprox", !0);
  d("math", "rel", "\u22b2", "\\vartriangleleft");
  d("math", "rel", "\u22b4", "\\trianglelefteq");
  d("math", "rel", "\u22a6", "\\vDash", !0);
  d("math", "rel", "\u22a7", "\\vDash", !0);
  d("math", "rel", "\u22a8", "\\vDash", !0);
  d("math", "rel", "\u22aa", "\\Vvdash", !0);
  d("math", "rel", "\u2323", "\\smallsmile");
  d("math", "rel", "\u2322", "\\smallfrown");
  d("math", "rel", "\u224f", "\\bumpeq", !0);
  d("math", "rel", "\u224e", "\\Bumpeq", !0);
  d("math", "rel", "\u2267", "\\geqq", !0);
  d("math", "rel", "\u2a7e", "\\geqslant", !0);
  d("math", "rel", "\u2a96", "\\eqslantgtr", !0);
  d("math", "rel", "\u2273", "\\gtrsim", !0);
  d("math", "rel", "\u2a86", "\\gtrapprox", !0);
  d("math", "bin", "\u22d7", "\\gtrdot");
  d("math", "rel", "\u22d9", "\\ggg", !0);
  d("math", "rel", "\u2277", "\\gtrless", !0);
  d("math", "rel", "\u22db", "\\gtreqless", !0);
  d("math", "rel", "\u2a8c", "\\gtreqqless", !0);
  d("math", "rel", "\u2256", "\\eqcirc", !0);
  d("math", "rel", "\u2257", "\\circeq", !0);
  d("math", "rel", "\u225c", "\\triangleq", !0);
  d("math", "rel", "\u223c", "\\thicksim");
  d("math", "rel", "\u2248", "\\thickapprox");
  d("math", "rel", "\u2ac6", "\\supseteqq", !0);
  d("math", "rel", "\u22d1", "\\Supset", !0);
  d("math", "rel", "\u2290", "\\sqsupset", !0);
  d("math", "rel", "\u227d", "\\succcurlyeq", !0);
  d("math", "rel", "\u22df", "\\curlyeqsucc", !0);
  d("math", "rel", "\u227f", "\\succsim", !0);
  d("math", "rel", "\u2ab8", "\\succapprox", !0);
  d("math", "rel", "\u22b3", "\\vartriangleright");
  d("math", "rel", "\u22b5", "\\trianglerighteq");
  d("math", "rel", "\u22a9", "\\Vdash", !0);
  d("math", "rel", "\u2223", "\\shortmid");
  d("math", "rel", "\u2225", "\\shortparallel");
  d("math", "rel", "\u226c", "\\between", !0);
  d("math", "rel", "\u22d4", "\\pitchfork", !0);
  d("math", "rel", "\u221d", "\\varpropto");
  d("math", "rel", "\u25c0", "\\blacktriangleleft");
  d("math", "rel", "\u2234", "\\therefore", !0);
  d("math", "rel", "\u220d", "\\backepsilon");
  d("math", "rel", "\u25b6", "\\blacktriangleright");
  d("math", "rel", "\u2235", "\\because", !0);
  d("math", "rel", "\u22d8", "\\llless");
  d("math", "rel", "\u22d9", "\\gggtr");
  d("math", "bin", "\u22b2", "\\lhd");
  d("math", "bin", "\u22b2", "\\lhd", !0);
  d("math", "rel", "\u2242", "\\eqsim", !0);
  d("math", "rel", "\u2251", "\\Doteq", !0);
  d("math", "rel", "\u2238", "\\dot{-}", !0);
  d("math", "rel", "\u297d", "\\strictif", !0);
  d("math", "rel", "\u297c", "\\strictfi", !0);
  d("math", "bin", "\u2214", "\\dotplus", !0);
  d("math", "bin", "\u2216", "\\smallsetminus");
  d("math", "bin", "\u22d2", "\\Cap", !0);
  d("math", "bin", "\u22d3", "\\Cup", !0);
  d("math", "bin", "\u2a5e", "\\doublebarwedge", !0);
  d("math", "bin", "\u229f", "\\boxminus", !0);
  d("math", "bin", "\u229e", "\\boxplus", !0);
  d("math", "bin", "\u22c7", "\\divideontimes", !0);
  d("math", "bin", "\u22c9", "\\ltimes", !0);
  d("math", "bin", "\u22ca", "\\rtimes", !0);
  d("math", "bin", "\u22cb", "\\leftthreetimes", !0);
  d("math", "bin", "\u22cc", "\\rightthreetimes", !0);
  d("math", "bin", "\u22cf", "\\curlywedge", !0);
  d("math", "bin", "\u22ce", "\\curlyvee", !0);
  d("math", "bin", "\u229d", "\\circleddash", !0);
  d("math", "bin", "\u229b", "\\circledast", !0);
  d("math", "bin", "\u22ba", "\\intercal", !0);
  d("math", "bin", "\u22d2", "\\doublecap");
  d("math", "bin", "\u22d3", "\\doublecup");
  d("math", "bin", "\u22a0", "\\boxtimes", !0);
  d("math", "bin", "\u22a5", "\\bot", !0);
  d("math", "bin", "\u22c8", "\\bowtie", !0);
  d("math", "bin", "\u22c8", "\\Join");
  d("math", "bin", "\u27d5", "\\leftouterjoin", !0);
  d("math", "bin", "\u27d6", "\\rightouterjoin", !0);
  d("math", "bin", "\u27d7", "\\fullouterjoin", !0);
  d("math", "rel", "\u21e2", "\\dashrightarrow", !0);
  d("math", "rel", "\u21e0", "\\dashleftarrow", !0);
  d("math", "rel", "\u21c7", "\\leftleftarrows", !0);
  d("math", "rel", "\u21c6", "\\leftrightarrows", !0);
  d("math", "rel", "\u21da", "\\Lleftarrow", !0);
  d("math", "rel", "\u219e", "\\twoheadleftarrow", !0);
  d("math", "rel", "\u21a2", "\\leftarrowtail", !0);
  d("math", "rel", "\u21ab", "\\looparrowleft", !0);
  d("math", "rel", "\u21cb", "\\leftrightharpoons", !0);
  d("math", "rel", "\u21b6", "\\curvearrowleft", !0);
  d("math", "rel", "\u21ba", "\\circlearrowleft", !0);
  d("math", "rel", "\u21b0", "\\Lsh", !0);
  d("math", "rel", "\u21c8", "\\upuparrows", !0);
  d("math", "rel", "\u21bf", "\\upharpoonleft", !0);
  d("math", "rel", "\u21c3", "\\downharpoonleft", !0);
  d("math", "rel", "\u22b6", "\\origof", !0);
  d("math", "rel", "\u22b7", "\\imageof", !0);
  d("math", "rel", "\u22b8", "\\multimap", !0);
  d("math", "rel", "\u21ad", "\\leftrightsquigarrow", !0);
  d("math", "rel", "\u21c9", "\\rightrightarrows", !0);
  d("math", "rel", "\u21c4", "\\rightleftarrows", !0);
  d("math", "rel", "\u21a0", "\\twoheadrightarrow", !0);
  d("math", "rel", "\u21a3", "\\rightarrowtail", !0);
  d("math", "rel", "\u21ac", "\\looparrowright", !0);
  d("math", "rel", "\u21b7", "\\curvearrowright", !0);
  d("math", "rel", "\u21bb", "\\circlearrowright", !0);
  d("math", "rel", "\u21b1", "\\Rsh", !0);
  d("math", "rel", "\u21ca", "\\downdownarrows", !0);
  d("math", "rel", "\u21be", "\\upharpoonright", !0);
  d("math", "rel", "\u21c2", "\\downharpoonright", !0);
  d("math", "rel", "\u21dd", "\\rightsquigarrow", !0);
  d("math", "rel", "\u21dd", "\\leadsto");
  d("math", "rel", "\u21db", "\\Rrightarrow", !0);
  d("math", "rel", "\u21be", "\\restriction");
  d("math", "textord", "\u2018", "`");
  d("math", "textord", "$", "\\$");
  d("text", "textord", "$", "\\$");
  d("text", "textord", "$", "\\textdollar");
  d("math", "textord", "\u00a2", "\\cent");
  d("text", "textord", "\u00a2", "\\cent");
  d("math", "textord", "%", "\\%");
  d("text", "textord", "%", "\\%");
  d("math", "textord", "_", "\\_");
  d("text", "textord", "_", "\\_");
  d("text", "textord", "_", "\\textunderscore");
  d("text", "textord", "\u2423", "\\textvisiblespace", !0);
  d("math", "textord", "\u2220", "\\angle", !0);
  d("math", "textord", "\u221e", "\\infty", !0);
  d("math", "bin", "\u2032", "\\prime", !0);
  d("math", "textord", "\u2206", "\\increment");
  d("math", "textord", "\u25b3", "\\triangle");
  d("text", "textord", "\u0391", "\\Alpha", !0);
  d("text", "textord", "\u0392", "\\Beta", !0);
  d("text", "textord", "\u0393", "\\Gamma", !0);
  d("text", "textord", "\u0394", "\\Delta", !0);
  d("text", "textord", "\u0395", "\\Epsilon", !0);
  d("text", "textord", "\u0396", "\\Zeta", !0);
  d("text", "textord", "\u0397", "\\Eta", !0);
  d("text", "textord", "\u0398", "\\Theta", !0);
  d("text", "textord", "\u0399", "\\Iota", !0);
  d("text", "textord", "\u039a", "\\Kappa", !0);
  d("text", "textord", "\u039b", "\\Lambda", !0);
  d("text", "textord", "\u039c", "\\Mu", !0);
  d("text", "textord", "\u039d", "\\Nu", !0);
  d("text", "textord", "\u039e", "\\Xi", !0);
  d("text", "textord", "\u039f", "\\Omicron", !0);
  d("text", "textord", "\u03a0", "\\Pi", !0);
  d("text", "textord", "\u03a1", "\\Rho", !0);
  d("text", "textord", "\u03a3", "\\Sigma", !0);
  d("text", "textord", "\u03a4", "\\Tau", !0);
  d("text", "textord", "\u03a5", "\\Upsilon", !0);
  d("text", "textord", "\u03a6", "\\Phi", !0);
  d("text", "textord", "\u03a7", "\\Chi", !0);
  d("text", "textord", "\u03a8", "\\Psi", !0);
  d("text", "textord", "\u03a9", "\\Omega", !0);
  d("math", "mathord", "\u0391", "\\Alpha", !0);
  d("math", "mathord", "\u0392", "\\Beta", !0);
  d("math", "mathord", "\u0393", "\\Gamma", !0);
  d("math", "mathord", "\u0394", "\\Delta", !0);
  d("math", "mathord", "\u0395", "\\Epsilon", !0);
  d("math", "mathord", "\u0396", "\\Zeta", !0);
  d("math", "mathord", "\u0397", "\\Eta", !0);
  d("math", "mathord", "\u0398", "\\Theta", !0);
  d("math", "mathord", "\u0399", "\\Iota", !0);
  d("math", "mathord", "\u039a", "\\Kappa", !0);
  d("math", "mathord", "\u039b", "\\Lambda", !0);
  d("math", "mathord", "\u039c", "\\Mu", !0);
  d("math", "mathord", "\u039d", "\\Nu", !0);
  d("math", "mathord", "\u039e", "\\Xi", !0);
  d("math", "mathord", "\u039f", "\\Omicron", !0);
  d("math", "mathord", "\u03a0", "\\Pi", !0);
  d("math", "mathord", "\u03a1", "\\Rho", !0);
  d("math", "mathord", "\u03a3", "\\Sigma", !0);
  d("math", "mathord", "\u03a4", "\\Tau", !0);
  d("math", "mathord", "\u03d2", "\\Upsilon", !0);
  d("math", "mathord", "\u03a5", "\\Upsilon", !0);
  d("math", "mathord", "\u03a6", "\\Phi", !0);
  d("math", "mathord", "\u03a7", "\\Chi", !0);
  d("math", "mathord", "\u03a8", "\\Psi", !0);
  d("math", "mathord", "\u2126", "\\Omega", !0);
  d("math", "mathord", "\u03a9", "\\Omega", !0);
  d("math", "open", "\u00ac", "\\neg", !0);
  d("math", "open", "\u00ac", "\\lnot");
  d("math", "textord", "\u22a4", "\\top");
  d("math", "textord", "\u22a5", "\\bot");
  d("math", "textord", "\u2205", "\\emptyset", !0);
  d("math", "textord", "\u00f8", "\\varnothing");
  d("math", "mathord", "\u03b1", "\\alpha", !0);
  d("math", "mathord", "\u03b2", "\\beta", !0);
  d("math", "mathord", "\u03b3", "\\gamma", !0);
  d("math", "mathord", "\u03b4", "\\delta", !0);
  d("math", "mathord", "\u03f5", "\\epsilon", !0);
  d("math", "mathord", "\u03b6", "\\zeta", !0);
  d("math", "mathord", "\u03b7", "\\eta", !0);
  d("math", "mathord", "\u03b8", "\\theta", !0);
  d("math", "mathord", "\u03b9", "\\iota", !0);
  d("math", "mathord", "\u03ba", "\\kappa", !0);
  d("math", "mathord", "\u03bb", "\\lambda", !0);
  d("math", "mathord", "\u00b5", "\\mu", !0);
  d("math", "mathord", "\u03bc", "\\mu", !0);
  d("math", "mathord", "\u03bd", "\\nu", !0);
  d("math", "mathord", "\u03be", "\\xi", !0);
  d("math", "mathord", "\u03bf", "\\omicron", !0);
  d("math", "mathord", "\u03c0", "\\pi", !0);
  d("math", "mathord", "\u03c1", "\\rho", !0);
  d("math", "mathord", "\u03c3", "\\sigma", !0);
  d("math", "mathord", "\u03c4", "\\tau", !0);
  d("math", "mathord", "\u03c5", "\\upsilon", !0);
  d("math", "mathord", "\u03d5", "\\phi", !0);
  d("math", "mathord", "\u03c7", "\\chi", !0);
  d("math", "mathord", "\u03c8", "\\psi", !0);
  d("math", "mathord", "\u03c9", "\\omega", !0);
  d("math", "mathord", "\u03b5", "\\varepsilon", !0);
  d("math", "mathord", "\u03d1", "\\vartheta", !0);
  d("math", "mathord", "\u03d6", "\\varpi", !0);
  d("math", "mathord", "\u03f1", "\\varrho", !0);
  d("math", "mathord", "\u03c2", "\\varsigma", !0);
  d("math", "mathord", "\u03c6", "\\varphi", !0);
  d("math", "mathord", "\u03d8", "\\Coppa", !0);
  d("math", "mathord", "\u03d9", "\\coppa", !0);
  d("math", "mathord", "\u03d9", "\\varcoppa", !0);
  d("math", "mathord", "\u03de", "\\Koppa", !0);
  d("math", "mathord", "\u03df", "\\koppa", !0);
  d("math", "mathord", "\u03e0", "\\Sampi", !0);
  d("math", "mathord", "\u03e1", "\\sampi", !0);
  d("math", "mathord", "\u03da", "\\Stigma", !0);
  d("math", "mathord", "\u03db", "\\stigma", !0);
  d("math", "mathord", "\u2aeb", "\\Bot");
  d("math", "bin", "\u2217", "\u2217", !0);
  d("math", "bin", "+", "+");
  d("math", "bin", "*", "*");
  d("math", "bin", "\u2044", "\u2044");
  d("math", "bin", "\u2212", "-", !0);
  d("math", "bin", "\u22c5", "\\cdot", !0);
  d("math", "bin", "\u00b7", "\\cdot", !0);
  d("math", "bin", "\u2218", "\\circ", !0);
  d("math", "bin", "\u00f7", "\\div", !0);
  d("math", "bin", "\u00b1", "\\pm", !0);
  d("math", "bin", "\u00d7", "\\times", !0);
  d("math", "bin", "\u2229", "\\cap", !0);
  d("math", "bin", "\u222a", "\\cup", !0);
  d("math", "bin", "\u2216", "\\setminus", !0);
  d("math", "bin", "\u2227", "\\land");
  d("math", "bin", "\u2228", "\\lor");
  d("math", "bin", "\u2227", "\\wedge", !0);
  d("math", "bin", "\u2228", "\\vee", !0);
  d("math", "bin", "\u2215", "\u2215", !0);
  d("math", "textord", "\u221a", "\\surd");
  d("math", "open", "\u27e6", "\\llbracket", !0);
  d("math", "close", "\u27e7", "\\rrbracket", !0);
  d("math", "open", "\u2329", "\\langle", !0);
  d("math", "open", "\u27e8", "\\langle", !0);
  d("math", "open", "|", "\\lvert");
  d("math", "open", "\u2016", "\\lVert");
  d("math", "textord", "!", "\\oc");
  d("math", "textord", "?", "\\wn");
  d("math", "textord", "\u2193", "\\shpos");
  d("math", "textord", "\u2195", "\\shift");
  d("math", "textord", "\u2191", "\\shneg");
  d("math", "close", "?", "?");
  d("math", "close", "!", "!");
  d("math", "close", "\u203c", "\u203c");
  d("math", "close", "\u232a", "\\rangle", !0);
  d("math", "close", "\u27e9", "\\rangle", !0);
  d("math", "close", "|", "\\rvert");
  d("math", "close", "\u2016", "\\rVert");
  d("math", "open", "\u2983", "\\lBrace", !0);
  d("math", "close", "\u2984", "\\rBrace", !0);
  d("math", "rel", "=", "\\equal", !0);
  d("math", "rel", ":", ":");
  d("math", "rel", "\u2248", "\\approx", !0);
  d("math", "rel", "\u2245", "\\cong", !0);
  d("math", "rel", "\u2265", "\\ge");
  d("math", "rel", "\u2265", "\\geq", !0);
  d("math", "rel", "\u2190", "\\gets");
  d("math", "rel", ">", "\\gt", !0);
  d("math", "rel", "\u2208", "\\in", !0);
  d("math", "rel", "\u2209", "\\notin", !0);
  d("math", "rel", "\ue020", "\\@not");
  d("math", "rel", "\u2282", "\\subset", !0);
  d("math", "rel", "\u2283", "\\supset", !0);
  d("math", "rel", "\u2286", "\\subseteq", !0);
  d("math", "rel", "\u2287", "\\supseteq", !0);
  d("math", "rel", "\u2288", "\\nsubseteq", !0);
  d("math", "rel", "\u2288", "\\nsubseteqq");
  d("math", "rel", "\u2289", "\\nsupseteq", !0);
  d("math", "rel", "\u2289", "\\nsupseteqq");
  d("math", "rel", "\u22a8", "\\models");
  d("math", "rel", "\u2190", "\\leftarrow", !0);
  d("math", "rel", "\u2264", "\\le");
  d("math", "rel", "\u2264", "\\leq", !0);
  d("math", "rel", "<", "\\lt", !0);
  d("math", "rel", "\u2192", "\\rightarrow", !0);
  d("math", "rel", "\u2192", "\\to");
  d("math", "rel", "\u2271", "\\ngeq", !0);
  d("math", "rel", "\u2271", "\\ngeqq");
  d("math", "rel", "\u2271", "\\ngeqslant");
  d("math", "rel", "\u2270", "\\nleq", !0);
  d("math", "rel", "\u2270", "\\nleqq");
  d("math", "rel", "\u2270", "\\nleqslant");
  d("math", "rel", "\u2aeb", "\\Perp", !0);
  d("math", "spacing", "\u00a0", "\\ ");
  d("math", "spacing", "\u00a0", "\\space");
  d("math", "spacing", "\u00a0", "\\nobreakspace");
  d("text", "spacing", "\u00a0", "\\ ");
  d("text", "spacing", "\u00a0", " ");
  d("text", "spacing", "\u00a0", "\\space");
  d("text", "spacing", "\u00a0", "\\nobreakspace");
  d("math", "spacing", null, "\\nobreak");
  d("math", "spacing", null, "\\allowbreak");
  d("math", "punct", ",", ",");
  d("text", "punct", ":", ":");
  d("math", "punct", ";", ";");
  d("math", "bin", "\u22bc", "\\barwedge", !0);
  d("math", "bin", "\u22bb", "\\veebar", !0);
  d("math", "bin", "\u2299", "\\odot", !0);
  d("math", "bin", "\u2295", "\\oplus", !0);
  d("math", "bin", "\u2297", "\\otimes", !0);
  d("math", "textord", "\u2202", "\\partial", !0);
  d("math", "bin", "\u2298", "\\oslash", !0);
  d("math", "bin", "\u229a", "\\circledcirc", !0);
  d("math", "bin", "\u22a1", "\\boxdot", !0);
  d("math", "bin", "\u25b3", "\\bigtriangleup");
  d("math", "bin", "\u25bd", "\\bigtriangledown");
  d("math", "bin", "\u2020", "\\dagger");
  d("math", "bin", "\u22c4", "\\diamond");
  d("math", "bin", "\u22c6", "\\star");
  d("math", "bin", "\u25c3", "\\triangleleft");
  d("math", "bin", "\u25b9", "\\triangleright");
  d("math", "open", "{", "\\{");
  d("text", "textord", "{", "\\{");
  d("text", "textord", "{", "\\textbraceleft");
  d("math", "close", "}", "\\}");
  d("text", "textord", "}", "\\}");
  d("text", "textord", "}", "\\textbraceright");
  d("math", "open", "{", "\\lbrace");
  d("math", "close", "}", "\\rbrace");
  d("math", "open", "[", "\\lbrack", !0);
  d("text", "textord", "[", "\\lbrack", !0);
  d("math", "close", "]", "\\rbrack", !0);
  d("text", "textord", "]", "\\rbrack", !0);
  d("math", "open", "(", "\\lparen", !0);
  d("math", "close", ")", "\\rparen", !0);
  d("text", "textord", "<", "\\textless", !0);
  d("text", "textord", ">", "\\textgreater", !0);
  d("math", "open", "\u230a", "\\lfloor", !0);
  d("math", "close", "\u230b", "\\rfloor", !0);
  d("math", "open", "\u2308", "\\lceil", !0);
  d("math", "close", "\u2309", "\\rceil", !0);
  d("math", "textord", "\\", "\\backslash");
  d("math", "textord", "|", "|");
  d("math", "textord", "|", "\\vert");
  d("text", "textord", "|", "\\textbar", !0);
  d("math", "textord", "\u2016", "\\|");
  d("math", "textord", "\u2016", "\\Vert");
  d("text", "textord", "\u2016", "\\textbardbl");
  d("text", "textord", "~", "\\textasciitilde");
  d("text", "textord", "\\", "\\textbackslash");
  d("text", "textord", "^", "\\textasciicircum");
  d("math", "rel", "\u2191", "\\uparrow", !0);
  d("math", "rel", "\u21d1", "\\Uparrow", !0);
  d("math", "rel", "\u2193", "\\downarrow", !0);
  d("math", "rel", "\u21d3", "\\Downarrow", !0);
  d("math", "rel", "\u2195", "\\updownarrow", !0);
  d("math", "rel", "\u21d5", "\\Updownarrow", !0);
  d("math", "rel", "\u219d", "\\rightsquigarrow", !0);
  d("math", "op-token", "\u2210", "\\coprod");
  d("math", "op-token", "\u22c1", "\\bigvee");
  d("math", "op-token", "\u22c0", "\\bigwedge");
  d("math", "op-token", "\u2a04", "\\biguplus");
  d("math", "op-token", "\u22c2", "\\bigcap");
  d("math", "op-token", "\u22c3", "\\bigcup");
  d("math", "op-token", "\u222b", "\\int");
  d("math", "op-token", "\u222b", "\\intop");
  d("math", "op-token", "\u222c", "\\iint");
  d("math", "op-token", "\u222d", "\\iiint");
  d("math", "op-token", "\u220f", "\\prod");
  d("math", "op-token", "\u2211", "\\sum");
  d("math", "op-token", "\u2a02", "\\bigotimes");
  d("math", "op-token", "\u2a01", "\\bigoplus");
  d("math", "op-token", "\u2a00", "\\bigodot");
  d("math", "op-token", "\u222e", "\\oint");
  d("math", "op-token", "\u222f", "\\oiint");
  d("math", "op-token", "\u2230", "\\oiiint");
  d("math", "op-token", "\u2231", "\\intclockwise");
  d("math", "op-token", "\u2232", "\\varointclockwise");
  d("math", "op-token", "\u2a0c", "\\iiiint");
  d("math", "op-token", "\u2a0d", "\\intbar");
  d("math", "op-token", "\u2a0e", "\\intBar");
  d("math", "op-token", "\u2a0f", "\\fint");
  d("math", "op-token", "\u2a12", "\\rppolint");
  d("math", "op-token", "\u2a13", "\\scpolint");
  d("math", "op-token", "\u2a15", "\\pointint");
  d("math", "op-token", "\u2a16", "\\sqint");
  d("math", "op-token", "\u2a17", "\\intlarhk");
  d("math", "op-token", "\u2a18", "\\intx");
  d("math", "op-token", "\u2a19", "\\intcap");
  d("math", "op-token", "\u2a1a", "\\intcup");
  d("math", "op-token", "\u2a05", "\\bigsqcap");
  d("math", "op-token", "\u2a06", "\\bigsqcup");
  d("math", "op-token", "\u222b", "\\smallint");
  d("text", "inner", "\u2026", "\\textellipsis");
  d("math", "inner", "\u2026", "\\mathellipsis");
  d("text", "inner", "\u2026", "\\ldots", !0);
  d("math", "inner", "\u2026", "\\ldots", !0);
  d("math", "inner", "\u22f0", "\\iddots", !0);
  d("math", "inner", "\u22ef", "\\@cdots", !0);
  d("math", "inner", "\u22f1", "\\ddots", !0);
  d("math", "textord", "\u22ee", "\\varvdots");
  d("math", "accent-token", "\u02ca", "\\acute");
  d("math", "accent-token", "`", "\\grave");
  d("math", "accent-token", "\u00a8", "\\ddot");
  d("math", "accent-token", "\u2026", "\\dddot");
  d("math", "accent-token", "\u2026.", "\\ddddot");
  d("math", "accent-token", "~", "\\tilde");
  d("math", "accent-token", "\u203e", "\\bar");
  d("math", "accent-token", "\u00af", "\\overline");
  d("math", "accent-token", "_", "\\underline");
  d("math", "accent-token", "\u02d8", "\\breve");
  d("math", "accent-token", "\u02c7", "\\check");
  d("math", "accent-token", "^", "\\hat");
  d("math", "accent-token", "\u2192", "\\vec");
  d("math", "accent-token", "\u02d9", "\\dot");
  d("math", "accent-token", "\u02da", "\\mathring");
  d("math", "mathord", "\u0131", "\\imath", !0);
  d("math", "mathord", "\u0237", "\\jmath", !0);
  d("math", "textord", "\u0131", "\u0131");
  d("math", "textord", "\u0237", "\u0237");
  d("text", "textord", "\u0131", "\\i", !0);
  d("text", "textord", "\u0237", "\\j", !0);
  d("text", "textord", "\u00df", "\\ss", !0);
  d("text", "textord", "\u00e6", "\\ae", !0);
  d("text", "textord", "\u0153", "\\oe", !0);
  d("text", "textord", "\u00f8", "\\o", !0);
  d("math", "mathord", "\u00f8", "\\o", !0);
  d("text", "textord", "\u00c6", "\\AE", !0);
  d("text", "textord", "\u0152", "\\OE", !0);
  d("text", "textord", "\u00d8", "\\O", !0);
  d("math", "mathord", "\u00d8", "\\O", !0);
  d("text", "accent-token", "\u02ca", "\\'");
  d("text", "accent-token", "\u02cb", "\\`");
  d("text", "accent-token", "\u02c6", "\\^");
  d("text", "accent-token", "\u02dc", "\\~");
  d("text", "accent-token", "\u02c9", "\\=");
  d("text", "accent-token", "\u02d8", "\\u");
  d("text", "accent-token", "\u02d9", "\\.");
  d("text", "accent-token", "\u00b8", "\\c");
  d("text", "accent-token", "\u02da", "\\r");
  d("text", "accent-token", "\u02c7", "\\v");
  d("text", "accent-token", "\u00a8", '\\"');
  d("text", "accent-token", "\u02dd", "\\H");
  d("math", "accent-token", "\u02ca", "\\'");
  d("math", "accent-token", "\u02cb", "\\`");
  d("math", "accent-token", "\u02c6", "\\^");
  d("math", "accent-token", "\u02dc", "\\~");
  d("math", "accent-token", "\u02c9", "\\=");
  d("math", "accent-token", "\u02d8", "\\u");
  d("math", "accent-token", "\u02d9", "\\.");
  d("math", "accent-token", "\u00b8", "\\c");
  d("math", "accent-token", "\u02da", "\\r");
  d("math", "accent-token", "\u02c7", "\\v");
  d("math", "accent-token", "\u00a8", '\\"');
  d("math", "accent-token", "\u02dd", "\\H");
  const Sb = { "--": !0, "---": !0, "``": !0, "''": !0 };
  d("text", "textord", "\u2013", "--", !0);
  d("text", "textord", "\u2013", "\\textendash");
  d("text", "textord", "\u2014", "---", !0);
  d("text", "textord", "\u2014", "\\textemdash");
  d("text", "textord", "\u2018", "`", !0);
  d("text", "textord", "\u2018", "\\textquoteleft");
  d("text", "textord", "\u2019", "'", !0);
  d("text", "textord", "\u2019", "\\textquoteright");
  d("text", "textord", "\u201c", "``", !0);
  d("text", "textord", "\u201c", "\\textquotedblleft");
  d("text", "textord", "\u201d", "''", !0);
  d("text", "textord", "\u201d", "\\textquotedblright");
  d("math", "textord", "\u00b0", "\\degree", !0);
  d("text", "textord", "\u00b0", "\\degree");
  d("text", "textord", "\u00b0", "\\textdegree", !0);
  d("math", "textord", "\u00a3", "\\pounds");
  d("math", "textord", "\u00a3", "\\mathsterling", !0);
  d("text", "textord", "\u00a3", "\\pounds");
  d("text", "textord", "\u00a3", "\\textsterling", !0);
  d("math", "textord", "\u2720", "\\maltese");
  d("text", "textord", "\u2720", "\\maltese");
  d("math", "textord", "\u20ac", "\\euro", !0);
  d("text", "textord", "\u20ac", "\\euro", !0);
  d("text", "textord", "\u20ac", "\\texteuro");
  d("math", "textord", "\u00a9", "\\copyright", !0);
  d("text", "textord", "\u00a9", "\\textcopyright");
  d("math", "textord", "\ud835\udee4", "\\varGamma");
  d("math", "textord", "\ud835\udee5", "\\varDelta");
  d("math", "textord", "\ud835\udee9", "\\varTheta");
  d("math", "textord", "\ud835\udeec", "\\varLambda");
  d("math", "textord", "\ud835\udeef", "\\varXi");
  d("math", "textord", "\ud835\udef1", "\\varPi");
  d("math", "textord", "\ud835\udef4", "\\varSigma");
  d("math", "textord", "\ud835\udef6", "\\varUpsilon");
  d("math", "textord", "\ud835\udef7", "\\varPhi");
  d("math", "textord", "\ud835\udef9", "\\varPsi");
  d("math", "textord", "\ud835\udefa", "\\varOmega");
  d("text", "textord", "\ud835\udee4", "\\varGamma");
  d("text", "textord", "\ud835\udee5", "\\varDelta");
  d("text", "textord", "\ud835\udee9", "\\varTheta");
  d("text", "textord", "\ud835\udeec", "\\varLambda");
  d("text", "textord", "\ud835\udeef", "\\varXi");
  d("text", "textord", "\ud835\udef1", "\\varPi");
  d("text", "textord", "\ud835\udef4", "\\varSigma");
  d("text", "textord", "\ud835\udef6", "\\varUpsilon");
  d("text", "textord", "\ud835\udef7", "\\varPhi");
  d("text", "textord", "\ud835\udef9", "\\varPsi");
  d("text", "textord", "\ud835\udefa", "\\varOmega");
  for (let a = 0; 14 > a; a++) {
    const b = '0123456789/@."'.charAt(a);
    d("math", "textord", b, b);
  }
  for (let a = 0; 25 > a; a++) {
    const b = '0123456789!@*()-=+";:?/.,'.charAt(a);
    d("text", "textord", b, b);
  }
  for (let a = 0; 52 > a; a++) {
    const b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(a);
    d("math", "mathord", b, b);
    d("text", "textord", b, b);
  }
  for (let a = 0; 30 > a; a++) {
    const b =
      "\u00c7\u00d0\u00de\u00e7\u00fe\u2102\u210d\u2115\u2119\u211a\u211d\u2124\u210e\u210f\u210a\u210b\u210c\u2110\u2111\u2112\u2113\u2118\u211b\u211c\u212c\u2130\u2131\u2133\u212d\u2128".charAt(
        a
      );
    d("math", "mathord", b, b);
    d("text", "textord", b, b);
  }
  let r = "";
  for (let a = 0; 52 > a; a++) {
    r = String.fromCharCode(55349, 56320 + a);
    d("math", "mathord", r, r);
    d("text", "textord", r, r);
    r = String.fromCharCode(55349, 56372 + a);
    d("math", "mathord", r, r);
    d("text", "textord", r, r);
    r = String.fromCharCode(55349, 56424 + a);
    d("math", "mathord", r, r);
    d("text", "textord", r, r);
    r = String.fromCharCode(55349, 56580 + a);
    d("math", "mathord", r, r);
    d("text", "textord", r, r);
    r = String.fromCharCode(55349, 56736 + a);
    d("math", "mathord", r, r);
    d("text", "textord", r, r);
    r = String.fromCharCode(55349, 56788 + a);
    d("math", "mathord", r, r);
    d("text", "textord", r, r);
    r = String.fromCharCode(55349, 56840 + a);
    d("math", "mathord", r, r);
    d("text", "textord", r, r);
    r = String.fromCharCode(55349, 56944 + a);
    d("math", "mathord", r, r);
    d("text", "textord", r, r);
    r = String.fromCharCode(55349, 56632 + a);
    d("math", "mathord", r, r);
    d("text", "textord", r, r);
    const b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(a);
    r = String.fromCharCode(55349, 56476 + a);
    d("math", "mathord", b, r);
    d("text", "textord", b, r);
  }
  for (let a = 0; 10 > a; a++)
    (r = String.fromCharCode(55349, 57294 + a)),
      d("math", "mathord", r, r),
      d("text", "textord", r, r),
      (r = String.fromCharCode(55349, 57314 + a)),
      d("math", "mathord", r, r),
      d("text", "textord", r, r),
      (r = String.fromCharCode(55349, 57324 + a)),
      d("math", "mathord", r, r),
      d("text", "textord", r, r),
      (r = String.fromCharCode(55349, 57334 + a)),
      d("math", "mathord", r, r),
      d("text", "textord", r, r);
  const J = function (a, b, c) {
      !F[b][a] ||
        !F[b][a].replace ||
        55349 === a.charCodeAt(0) ||
        (Object.prototype.hasOwnProperty.call(Sb, a) &&
          c &&
          ((c.fontFamily && "tt" === c.fontFamily.slice(4, 6)) ||
            (c.font && "tt" === c.font.slice(4, 6)))) ||
        (a = F[b][a].replace);
      return new l.TextNode(a);
    },
    Ra = (a) => {
      if (
        "mrow" !== a.type ||
        0 === a.children.length ||
        !a.children[0].attributes ||
        "mtext" !== a.children[0].type
      )
        return a;
      const b = a.children[0].attributes.mathvariant || "",
        c = new l.MathNode("mtext", [
          new l.TextNode(a.children[0].children[0].text),
        ]);
      for (let f = 1; f < a.children.length; f++) {
        var e = a.children[f].attributes.mathvariant || "";
        if ("mrow" === a.children[f].type) {
          e = a.children[f];
          for (let g = 0; g < e.children.length; g++) {
            if (
              (e.children[g].attributes.mathvariant || "") !== b ||
              "mtext" !== e.children[g].type
            )
              return a;
            c.children[0].text += e.children[g].children[0].text;
          }
        } else {
          if (e !== b || "mtext" !== a.children[f].type) return a;
          c.children[0].text += a.children[f].children[0].text;
        }
      }
      " " === c.children[0].text.charAt(0) &&
        (c.children[0].text = "\u00a0" + c.children[0].text.slice(1));
      a = c.children[0].text.length;
      0 < a &&
        " " === c.children[0].text.charAt(a - 1) &&
        (c.children[0].text = c.children[0].text.slice(0, -1) + "\u00a0");
      return c;
    },
    M = function (a) {
      return 1 === a.length ? a[0] : new l.MathNode("mrow", a);
    },
    ka = (a) =>
      ("atom" === a.type && "rel" === a.family) ||
      ("mclass" === a.type && "mrel" === a.mclass),
    C = function (a, b, c) {
      if (1 === a.length)
        return (
          (a = A(a[0], b)),
          c &&
            a instanceof L &&
            "mo" === a.type &&
            (a.setAttribute("lspace", "0em"), a.setAttribute("rspace", "0em")),
          [a]
        );
      c = [];
      for (let e = 0; e < a.length; e++) {
        const f = A(a[e], b);
        e < a.length - 1 &&
          ka(a[e]) &&
          ka(a[e + 1]) &&
          f.setAttribute("rspace", "0em");
        0 < e && ka(a[e]) && ka(a[e - 1]) && f.setAttribute("lspace", "0em");
        c.push(f);
      }
      return c;
    },
    A = function (a, b) {
      if (!a) return new l.MathNode("mrow");
      if (ca[a.type]) return ca[a.type](a, b);
      throw new p("Got group of unknown type: '" + a.type + "'");
    },
    Sa = (a) => new l.MathNode("mtd", [], [], { padding: "0", width: "50%" }),
    Ta = (a, b) => {
      const c = a.isStretchy
        ? ja.mathMLnode(a.label)
        : new l.MathNode("mo", [J(a.label, a.mode)]);
      "\\vec" === a.label
        ? (c.style.transform = "scale(0.75) translate(10%, 30%)")
        : ((c.style.mathStyle = "normal"), (c.style.mathDepth = "0"));
      a.isStretchy || c.setAttribute("stretchy", "false");
      return new l.MathNode("\\c" === a.label ? "munder" : "mover", [
        A(a.base, b),
        c,
      ]);
    },
    Tb = new RegExp(
      "\\acute \\grave \\ddot \\dddot \\ddddot \\tilde \\check \\hat \\vec \\dot \\mathring"
        .split(" ")
        .map((a) => `\\${a}`)
        .join("|")
    );
  q({
    type: "accent",
    names:
      "\\acute \\grave \\ddot \\dddot \\ddddot \\tilde \\bar \\overline \\breve \\check \\hat \\vec \\dot \\mathring \\overparen \\widecheck \\widehat \\wideparen \\widetilde \\overrightarrow \\overleftarrow \\Overrightarrow \\overleftrightarrow \\overgroup \\overleftharpoon \\overrightharpoon".split(
        " "
      ),
    props: { numArgs: 1 },
    handler: (a, b) => {
      b = Y(b[0]);
      const c = !Tb.test(a.funcName);
      return {
        type: "accent",
        mode: a.parser.mode,
        label: a.funcName,
        isStretchy: c,
        base: b,
      };
    },
    mathmlBuilder: Ta,
  });
  q({
    type: "accent",
    names: "\\' \\` \\^ \\~ \\= \\c \\u \\. \\\" \\r \\H \\v".split(" "),
    props: {
      numArgs: 1,
      allowedInText: !0,
      allowedInMath: !0,
      argTypes: ["primitive"],
    },
    handler: (a, b) => {
      b = Y(b[0]);
      const c = a.parser.mode;
      "math" === c &&
        a.parser.settings.strict &&
        console.log(
          `Temml parse error: Command ${a.funcName} is invalid in math mode.`
        );
      return {
        type: "accent",
        mode: c,
        label: a.funcName,
        isStretchy: !1,
        isShifty: !0,
        base: b,
      };
    },
    mathmlBuilder: Ta,
  });
  q({
    type: "accentUnder",
    names:
      "\\underleftarrow \\underrightarrow \\underleftrightarrow \\undergroup \\underparen \\utilde \\underline".split(
        " "
      ),
    props: { numArgs: 1 },
    handler: ({ parser: a, funcName: b }, c) => ({
      type: "accentUnder",
      mode: a.mode,
      label: b,
      base: c[0],
    }),
    mathmlBuilder: (a, b) => {
      const c = ja.mathMLnode(a.label);
      c.style["math-depth"] = 0;
      return new l.MathNode("munder", [A(a.base, b), c]);
    },
  });
  const Ua = {
      pt: 800 / 803,
      pc: 9600 / 803,
      dd: ((1238 / 1157) * 800) / 803,
      cc: ((14856 / 1157) * 800) / 803,
      nd: ((685 / 642) * 800) / 803,
      nc: ((1370 / 107) * 800) / 803,
      sp: ((1 / 65536) * 800) / 803,
      mm: 25.4 / 72,
      cm: 2.54 / 72,
      in: 1 / 72,
      px: 96 / 72,
    },
    Ub = "em ex mu pt mm cm in px bp pc dd cc nd nc sp".split(" "),
    Va = function (a) {
      "string" !== typeof a && (a = a.unit);
      return -1 < Ub.indexOf(a);
    },
    P = function (a, b) {
      let c = a.number;
      if (0 > b.maxSize[0] && 0 < c) return { number: 0, unit: "em" };
      a = a.unit;
      switch (a) {
        case "mm":
        case "cm":
        case "in":
        case "px":
          return c * Ua[a] > b.maxSize[1]
            ? { number: b.maxSize[1], unit: "pt" }
            : { number: c, unit: a };
        case "em":
        case "ex":
          return (
            "ex" === a && (c *= 0.431),
            (c = Math.min(
              c / [1, 0.7, 0.5][Math.max(b.level - 1, 0)],
              b.maxSize[0]
            )),
            { number: y.round(c), unit: "em" }
          );
        case "bp":
          return (
            c > b.maxSize[1] && (c = b.maxSize[1]), { number: c, unit: "pt" }
          );
        case "pt":
        case "pc":
        case "dd":
        case "cc":
        case "nd":
        case "nc":
        case "sp":
          return (
            (c = Math.min(c * Ua[a], b.maxSize[1])),
            { number: y.round(c), unit: "pt" }
          );
        case "mu":
          return (
            (c = Math.min(c / 18, b.maxSize[0])),
            { number: y.round(c), unit: "em" }
          );
        default:
          throw new p("Invalid unit: '" + a + "'");
      }
    },
    Q = (a) => {
      const b = new l.MathNode("mspace");
      b.setAttribute("width", a + "em");
      return b;
    },
    la = (a, b = 0.3, c = 0) => {
      if (null == a && 0 === c) return Q(b);
      a = a ? [a] : [];
      0 !== b && a.unshift(Q(b));
      0 < c && a.push(Q(c));
      return new l.MathNode("mrow", a);
    },
    wa = (a, b, c, e) => {
      var f = ja.mathMLnode(a),
        g = "eq" === a.slice(1, 3);
      a =
        "x" === a.charAt(1)
          ? "1.75"
          : "cd" === a.slice(2, 4)
          ? "3.0"
          : g
          ? "1.0"
          : "2.0";
      f.setAttribute("minsize", String(a) + "em");
      f.setAttribute("lspace", "0");
      f.setAttribute("rspace", g ? "0.5em" : "0");
      e = e.withLevel(2 > e.level ? 2 : 3);
      const m = (a / [1, 0.7, 0.5][Math.max(e.level - 1, 0)]).toFixed(4),
        n = ((g ? 0 : 0.3) / [1, 0.7, 0.5][Math.max(e.level - 1, 0)]).toFixed(
          4
        );
      g = ((g ? 0 : 0.3) / [1, 0.7, 0.5][Math.max(e.level - 1, 0)]).toFixed(4);
      b =
        b && b.body && (b.body.body || 0 < b.body.length)
          ? la(A(b, e), n, g)
          : la(null, m, 0);
      c =
        c && c.body && (c.body.body || 0 < c.body.length)
          ? la(A(c, e), n, g)
          : la(null, m, 0);
      f = new l.MathNode("munderover", [f, c, b]);
      "3.0" === a && (f.style.height = "1em");
      return f;
    };
  q({
    type: "xArrow",
    names:
      "\\xleftarrow \\xrightarrow \\xLeftarrow \\xRightarrow \\xleftrightarrow \\xLeftrightarrow \\xhookleftarrow \\xhookrightarrow \\xmapsto \\xrightharpoondown \\xrightharpoonup \\xleftharpoondown \\xleftharpoonup \\xlongequal \\xtwoheadrightarrow \\xtwoheadleftarrow \\yields \\yieldsLeft \\mesomerism \\longrightharpoonup \\longleftharpoondown \\\\cdrightarrow \\\\cdleftarrow \\\\cdlongequal".split(
        " "
      ),
    props: { numArgs: 1, numOptionalArgs: 1 },
    handler({ parser: a, funcName: b }, c, e) {
      return { type: "xArrow", mode: a.mode, name: b, body: c[0], below: e[0] };
    },
    mathmlBuilder(a, b) {
      a = [wa(a.name, a.body, a.below, b)];
      a.unshift(Q(0.2778));
      a.push(Q(0.2778));
      return new l.MathNode("mrow", a);
    },
  });
  const Wa = {
    "\\xtofrom": ["\\xrightarrow", "\\xleftarrow"],
    "\\xleftrightharpoons": ["\\xleftharpoonup", "\\xrightharpoondown"],
    "\\xrightleftharpoons": ["\\xrightharpoonup", "\\xleftharpoondown"],
    "\\yieldsLeftRight": ["\\yields", "\\yieldsLeft"],
    "\\equilibrium": ["\\longrightharpoonup", "\\longleftharpoondown"],
    "\\equilibriumRight": ["\\longrightharpoonup", "\\eqleftharpoondown"],
    "\\equilibriumLeft": ["\\eqrightharpoonup", "\\longleftharpoondown"],
  };
  q({
    type: "stackedArrow",
    names:
      "\\xtofrom \\xleftrightharpoons \\xrightleftharpoons \\yieldsLeftRight \\equilibrium \\equilibriumRight \\equilibriumLeft".split(
        " "
      ),
    props: { numArgs: 1, numOptionalArgs: 1 },
    handler({ parser: a, funcName: b }, c, e) {
      return {
        type: "stackedArrow",
        mode: a.mode,
        name: b,
        body: c[0],
        upperArrowBelow: e[0]
          ? { type: "hphantom", mode: a.mode, body: e[0] }
          : null,
        lowerArrowBody: c[0]
          ? { type: "hphantom", mode: a.mode, body: c[0] }
          : null,
        below: e[0],
      };
    },
    mathmlBuilder(a, b) {
      const c = Wa[a.name][1];
      var e = wa(Wa[a.name][0], a.body, a.upperArrowBelow, b);
      b = wa(c, a.lowerArrowBody, a.below, b);
      e = new l.MathNode("mpadded", [e]);
      e.setAttribute("voffset", "0.3em");
      e.setAttribute("height", "+0.3em");
      e.setAttribute("depth", "-0.3em");
      "\\equilibriumLeft" === a.name
        ? ((a = new l.MathNode("mpadded", [b])),
          a.setAttribute("width", "0.5em"),
          (a = new l.MathNode("mpadded", [Q(0.2778), a, e, Q(0.2778)])))
        : (e.setAttribute(
            "width",
            "\\equilibriumRight" === a.name ? "0.5em" : "0"
          ),
          (a = new l.MathNode("mpadded", [Q(0.2778), e, b, Q(0.2778)])));
      a.setAttribute("voffset", "-0.18em");
      a.setAttribute("height", "-0.18em");
      a.setAttribute("depth", "+0.18em");
      return a;
    },
  });
  const Kb = {
      ">": "\\\\cdrightarrow",
      "<": "\\\\cdleftarrow",
      "=": "\\\\cdlongequal",
      A: "\\uparrow",
      V: "\\downarrow",
      "|": "\\Vert",
      ".": "no arrow",
    },
    Xa = () => ({
      type: "styling",
      body: [],
      mode: "math",
      scriptLevel: "display",
    }),
    Ya = (a) => "textord" === a.type && "@" === a.text;
  q({
    type: "cdlabel",
    names: ["\\\\cdleft", "\\\\cdright"],
    props: { numArgs: 1 },
    handler({ parser: a, funcName: b }, c) {
      return { type: "cdlabel", mode: a.mode, side: b.slice(4), label: c[0] };
    },
    mathmlBuilder(a, b) {
      b = new l.MathNode("mrow", [A(a.label, b)]);
      b = new l.MathNode("mpadded", [b]);
      b.setAttribute("width", "0");
      "left" === a.side && b.setAttribute("lspace", "-1width");
      b.setAttribute("voffset", "0.7em");
      b = new l.MathNode("mstyle", [b]);
      b.setAttribute("displaystyle", "false");
      b.setAttribute("scriptlevel", "1");
      return b;
    },
  });
  q({
    type: "cdlabelparent",
    names: ["\\\\cdparent"],
    props: { numArgs: 1 },
    handler({ parser: a }, b) {
      return { type: "cdlabelparent", mode: a.mode, fragment: b[0] };
    },
    mathmlBuilder(a, b) {
      return new l.MathNode("mrow", [A(a.fragment, b)]);
    },
  });
  q({
    type: "textord",
    names: ["\\@char"],
    props: { numArgs: 1, allowedInText: !0 },
    handler({ parser: a, token: b }, c) {
      var e = w(c[0], "ordgroup").body;
      c = "";
      for (let f = 0; f < e.length; f++) {
        const g = w(e[f], "textord");
        c += g.text;
      }
      e = parseInt(c);
      if (isNaN(e)) throw new p(`\\@char has non-numeric argument ${c}`, b);
      return { type: "textord", mode: a.mode, text: String.fromCodePoint(e) };
    },
  });
  const Vb = /^(#[a-f0-9]{3}|#?[a-f0-9]{6})$/i,
    Wb = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i,
    Xb = /^ *\d{1,3} *(?:, *\d{1,3} *){2}$/,
    Yb = /^ *[10](?:\.\d*)? *(?:, *[10](?:\.\d*)? *){2}$/,
    Zb = /^[a-f0-9]{6}$/i,
    Za = (a) => {
      a = a.toString(16);
      1 === a.length && (a = "0" + a);
      return a;
    },
    $a = JSON.parse(
      '{\n  "Apricot": "#ffb484",\n  "Aquamarine": "#08b4bc",\n  "Bittersweet": "#c84c14",\n  "blue": "#0000FF",\n  "Blue": "#303494",\n  "BlueGreen": "#08b4bc",\n  "BlueViolet": "#503c94",\n  "BrickRed": "#b8341c",\n  "brown": "#BF8040",\n  "Brown": "#802404",\n  "BurntOrange": "#f8941c",\n  "CadetBlue": "#78749c",\n  "CarnationPink": "#f884b4",\n  "Cerulean": "#08a4e4",\n  "CornflowerBlue": "#40ace4",\n  "cyan": "#00FFFF",\n  "Cyan": "#08acec",\n  "Dandelion": "#ffbc44",\n  "darkgray": "#404040",\n  "DarkOrchid": "#a8548c",\n  "Emerald": "#08ac9c",\n  "ForestGreen": "#089c54",\n  "Fuchsia": "#90348c",\n  "Goldenrod": "#ffdc44",\n  "gray": "#808080",\n  "Gray": "#98949c",\n  "green": "#00FF00",\n  "Green": "#08a44c",\n  "GreenYellow": "#e0e474",\n  "JungleGreen": "#08ac9c",\n  "Lavender": "#f89cc4",\n  "lightgray": "#c0c0c0",\n  "lime": "#BFFF00",\n  "LimeGreen": "#90c43c",\n  "magenta": "#FF00FF",\n  "Magenta": "#f0048c",\n  "Mahogany": "#b0341c",\n  "Maroon": "#b03434",\n  "Melon": "#f89c7c",\n  "MidnightBlue": "#086494",\n  "Mulberry": "#b03c94",\n  "NavyBlue": "#086cbc",\n  "olive": "#7F7F00",\n  "OliveGreen": "#407c34",\n  "orange": "#FF8000",\n  "Orange": "#f8843c",\n  "OrangeRed": "#f0145c",\n  "Orchid": "#b074ac",\n  "Peach": "#f8945c",\n  "Periwinkle": "#8074bc",\n  "PineGreen": "#088c74",\n  "pink": "#ff7f7f",\n  "Plum": "#98248c",\n  "ProcessBlue": "#08b4ec",\n  "purple": "#BF0040",\n  "Purple": "#a0449c",\n  "RawSienna": "#983c04",\n  "red": "#ff0000",\n  "Red": "#f01c24",\n  "RedOrange": "#f86434",\n  "RedViolet": "#a0246c",\n  "Rhodamine": "#f0549c",\n  "Royallue": "#0874bc",\n  "RoyalPurple": "#683c9c",\n  "RubineRed": "#f0047c",\n  "Salmon": "#f8948c",\n  "SeaGreen": "#30bc9c",\n  "Sepia": "#701404",\n  "SkyBlue": "#48c4dc",\n  "SpringGreen": "#c8dc64",\n  "Tan": "#e09c74",\n  "teal": "#007F7F",\n  "TealBlue": "#08acb4",\n  "Thistle": "#d884b4",\n  "Turquoise": "#08b4cc",\n  "violet": "#800080",\n  "Violet": "#60449c",\n  "VioletRed": "#f054a4",\n  "WildStrawberry": "#f0246c",\n  "yellow": "#FFFF00",\n  "Yellow": "#fff404",\n  "YellowGreen": "#98cc6c",\n  "YellowOrange": "#ffa41c"\n}'
    ),
    W = (a, b) => {
      let c = "";
      if ("HTML" === a) {
        if (!Vb.test(b)) throw new p("Invalid HTML input.");
        c = b;
      } else if ("RGB" === a) {
        if (!Xb.test(b)) throw new p("Invalid RGB input.");
        b.split(",").map((e) => {
          c += Za(Number(e.trim()));
        });
      } else {
        if (!Yb.test(b)) throw new p("Invalid rbg input.");
        b.split(",").map((e) => {
          e = Number(e.trim());
          if (1 < e) throw new p("Color rgb input must be < 1.");
          c += Za(255 * e);
        });
      }
      "#" !== c.charAt(0) && (c = "#" + c);
      return c;
    },
    Z = (a, b, c) => {
      const e = `\\\\color@${a}`;
      if (!Wb.exec(a)) throw new p("Invalid color: '" + a + "'", c);
      if (Zb.test(a)) return "#" + a;
      "#" !== a.charAt(0) &&
        (b.has(e) ? (a = b.get(e).tokens[0].text) : $a[a] && (a = $a[a]));
      return a;
    },
    ab = (a, b) => {
      b = C(a.body, b.withColor(a.color));
      b = ia(b);
      b.setAttribute("mathcolor", a.color);
      return b;
    };
  q({
    type: "color",
    names: ["\\textcolor"],
    props: {
      numArgs: 2,
      numOptionalArgs: 1,
      allowedInText: !0,
      argTypes: ["raw", "raw", "original"],
    },
    handler({ parser: a, token: b }, c, e) {
      (e = e[0] && w(e[0], "raw").string)
        ? ((b = w(c[0], "raw").string), (b = W(e, b)))
        : (b = Z(w(c[0], "raw").string, a.gullet.macros, b));
      return { type: "color", mode: a.mode, color: b, body: D(c[1]) };
    },
    mathmlBuilder: ab,
  });
  q({
    type: "color",
    names: ["\\color"],
    props: {
      numArgs: 1,
      numOptionalArgs: 1,
      allowedInText: !0,
      argTypes: ["raw", "raw"],
    },
    handler({ parser: a, token: b }, c, e) {
      (e = e[0] && w(e[0], "raw").string)
        ? ((b = w(c[0], "raw").string), (b = W(e, b)))
        : (b = Z(w(c[0], "raw").string, a.gullet.macros, b));
      a.gullet.macros.set("\\current@color", b);
      c = a.parseExpression(!0, "\\color");
      return { type: "color", mode: a.mode, color: b, body: c };
    },
    mathmlBuilder: ab,
  });
  q({
    type: "color",
    names: ["\\definecolor"],
    props: { numArgs: 3, allowedInText: !0, argTypes: ["raw", "raw", "raw"] },
    handler({ parser: a, token: b }, c) {
      const e = w(c[0], "raw").string;
      if (!/^[A-Za-z]+$/.test(e))
        throw new p("Color name must be latin letters.", b);
      var f = w(c[1], "raw").string;
      if (!["HTML", "RGB", "rgb"].includes(f))
        throw new p("Color model must be HTML, RGB, or rgb.", b);
      b = w(c[2], "raw").string;
      f = W(f, b);
      a.gullet.macros.set(`\\\\color@${e}`, {
        tokens: [{ text: f }],
        numArgs: 0,
      });
      return { type: "internal", mode: a.mode };
    },
  });
  q({
    type: "cr",
    names: ["\\\\"],
    props: { numArgs: 0, numOptionalArgs: 0, allowedInText: !0 },
    handler({ parser: a }, b, c) {
      b = "[" === a.gullet.future().text ? a.parseSizeGroup(!0) : null;
      return {
        type: "cr",
        mode: a.mode,
        newLine: !a.settings.displayMode,
        size: b && w(b, "size").value,
      };
    },
    mathmlBuilder(a, b) {
      const c = new l.MathNode("mo");
      a.newLine &&
        (c.setAttribute("linebreak", "newline"),
        a.size &&
          ((a = P(a.size, b)), c.setAttribute("height", a.number + a.unit)));
      return c;
    },
  });
  const xa = {
      "\\global": "\\global",
      "\\long": "\\\\globallong",
      "\\\\globallong": "\\\\globallong",
      "\\def": "\\gdef",
      "\\gdef": "\\gdef",
      "\\edef": "\\xdef",
      "\\xdef": "\\xdef",
      "\\let": "\\\\globallet",
      "\\futurelet": "\\\\globalfuture",
    },
    ma = (a) => {
      const b = a.text;
      if (/^(?:[\\{}$&#^_]|EOF)$/.test(b))
        throw new p("Expected a control sequence", a);
      return b;
    },
    bb = (a, b, c, e) => {
      let f = a.gullet.macros.get(c.text);
      null == f &&
        ((c.noexpand = !0),
        (f = {
          tokens: [c],
          numArgs: 0,
          unexpandable: !a.gullet.isExpandable(c.text),
        }));
      a.gullet.macros.set(b, f, e);
    };
  q({
    type: "internal",
    names: ["\\global", "\\long", "\\\\globallong"],
    props: { numArgs: 0, allowedInText: !0 },
    handler({ parser: a, funcName: b }) {
      a.consumeSpaces();
      const c = a.fetch();
      if (xa[c.text]) {
        if ("\\global" === b || "\\\\globallong" === b) c.text = xa[c.text];
        return w(a.parseFunction(), "internal");
      }
      throw new p("Invalid token after macro prefix", c);
    },
  });
  q({
    type: "internal",
    names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
    props: { numArgs: 0, allowedInText: !0, primitive: !0 },
    handler({ parser: a, funcName: b }) {
      var c = a.gullet.popToken();
      const e = c.text;
      if (/^(?:[\\{}$&#^_]|EOF)$/.test(e))
        throw new p("Expected a control sequence", c);
      let f = 0,
        g;
      const m = [[]];
      for (; "{" !== a.gullet.future().text; )
        if (((c = a.gullet.popToken()), "#" === c.text)) {
          if ("{" === a.gullet.future().text) {
            g = a.gullet.future();
            m[f].push("{");
            break;
          }
          c = a.gullet.popToken();
          if (!/^[1-9]$/.test(c.text))
            throw new p(`Invalid argument number "${c.text}"`);
          if (parseInt(c.text) !== f + 1)
            throw new p(`Argument number "${c.text}" out of order`);
          f++;
          m.push([]);
        } else {
          if ("EOF" === c.text) throw new p("Expected a macro definition");
          m[f].push(c.text);
        }
      ({ tokens: c } = a.gullet.consumeArg());
      g && c.unshift(g);
      if ("\\edef" === b || "\\xdef" === b)
        (c = a.gullet.expandTokens(c)), c.reverse();
      a.gullet.macros.set(
        e,
        { tokens: c, numArgs: f, delimiters: m },
        b === xa[b]
      );
      return { type: "internal", mode: a.mode };
    },
  });
  q({
    type: "internal",
    names: ["\\let", "\\\\globallet"],
    props: { numArgs: 0, allowedInText: !0, primitive: !0 },
    handler({ parser: a, funcName: b }) {
      const c = ma(a.gullet.popToken());
      a.gullet.consumeSpaces();
      let e = a.gullet.popToken();
      "=" === e.text &&
        ((e = a.gullet.popToken()),
        " " === e.text && (e = a.gullet.popToken()));
      bb(a, c, e, "\\\\globallet" === b);
      return { type: "internal", mode: a.mode };
    },
  });
  q({
    type: "internal",
    names: ["\\futurelet", "\\\\globalfuture"],
    props: { numArgs: 0, allowedInText: !0, primitive: !0 },
    handler({ parser: a, funcName: b }) {
      const c = ma(a.gullet.popToken()),
        e = a.gullet.popToken(),
        f = a.gullet.popToken();
      bb(a, c, f, "\\\\globalfuture" === b);
      a.gullet.pushToken(f);
      a.gullet.pushToken(e);
      return { type: "internal", mode: a.mode };
    },
  });
  q({
    type: "internal",
    names: ["\\newcommand", "\\renewcommand", "\\providecommand"],
    props: { numArgs: 0, allowedInText: !0, primitive: !0 },
    handler({ parser: a, funcName: b }) {
      var c = a.gullet.popToken();
      "{" === c.text
        ? ((c = ma(a.gullet.popToken())), a.gullet.popToken())
        : (c = ma(c));
      var e = a.gullet.isDefined(c);
      if (e && "\\newcommand" === b)
        throw new p(
          `\\newcommand{${c}} attempting to redefine ${c}; use \\renewcommand`
        );
      if (!e && "\\renewcommand" === b)
        throw new p(
          `\\renewcommand{${c}} when command ${c} does not yet exist; use \\newcommand`
        );
      b = 0;
      if ("[" === a.gullet.future().text) {
        a.gullet.popToken();
        e = a.gullet.popToken();
        if (!/^[0-9]$/.test(e.text))
          throw new p(`Invalid number of arguments: "${e.text}"`);
        b = parseInt(e.text);
        e = a.gullet.popToken();
        if ("]" !== e.text) throw new p(`Invalid argument "${e.text}"`);
      }
      ({ tokens: e } = a.gullet.consumeArg());
      a.gullet.macros.set(c, { tokens: e, numArgs: b }, !a.settings.strict);
      return { type: "internal", mode: a.mode };
    },
  });
  const ya = {
      "\\bigl": { mclass: "mopen", size: 1 },
      "\\Bigl": { mclass: "mopen", size: 2 },
      "\\biggl": { mclass: "mopen", size: 3 },
      "\\Biggl": { mclass: "mopen", size: 4 },
      "\\bigr": { mclass: "mclose", size: 1 },
      "\\Bigr": { mclass: "mclose", size: 2 },
      "\\biggr": { mclass: "mclose", size: 3 },
      "\\Biggr": { mclass: "mclose", size: 4 },
      "\\bigm": { mclass: "mrel", size: 1 },
      "\\Bigm": { mclass: "mrel", size: 2 },
      "\\biggm": { mclass: "mrel", size: 3 },
      "\\Biggm": { mclass: "mrel", size: 4 },
      "\\big": { mclass: "mord", size: 1 },
      "\\Big": { mclass: "mord", size: 2 },
      "\\bigg": { mclass: "mord", size: 3 },
      "\\Bigg": { mclass: "mord", size: 4 },
    },
    Ma =
      "( \\lparen ) \\rparen [ \\lbrack ] \\rbrack \\{ \\lbrace \\} \\rbrace \\lfloor \\rfloor \u230a \u230b \\lceil \\rceil \u2308 \u2309 < > \\langle \u27e8 \\rangle \u27e9 \\lt \\gt \\lvert \\rvert \\lVert \\rVert \\lgroup \\rgroup \u27ee \u27ef \\lmoustache \\rmoustache \u23b0 \u23b1 \\llbracket \\rrbracket \u27e6 \u27e6 \\lBrace \\rBrace \u2983 \u2984 / \\backslash | \\vert \\| \\Vert \\uparrow \\Uparrow \\downarrow \\Downarrow \\updownarrow \\Updownarrow .".split(
        " "
      ),
    $b = ["}", "\\left", "\\middle", "\\right"],
    na = (a) => 0 < a.length && (Ma.includes(a) || ya[a] || $b.includes(a)),
    ac = [0, 1.2, 1.8, 2.4, 3];
  q({
    type: "delimsizing",
    names:
      "\\bigl \\Bigl \\biggl \\Biggl \\bigr \\Bigr \\biggr \\Biggr \\bigm \\Bigm \\biggm \\Biggm \\big \\Big \\bigg \\Bigg".split(
        " "
      ),
    props: { numArgs: 1, argTypes: ["primitive"] },
    handler: (a, b) => {
      b = ea(b[0], a);
      return {
        type: "delimsizing",
        mode: a.parser.mode,
        size: ya[a.funcName].size,
        mclass: ya[a.funcName].mclass,
        delim: b.text,
      };
    },
    mathmlBuilder: (a) => {
      var b = [];
      "." === a.delim && (a.delim = "");
      b.push(J(a.delim, a.mode));
      b = new l.MathNode("mo", b);
      const c = F.math[a.delim].group;
      "mopen" === a.mclass || "mclose" === a.mclass
        ? b.setAttribute("fence", "true")
        : "mord" == a.mclass &&
          3 <= a.size &&
          c &&
          ("open" == c || "close" == c)
        ? b.setAttribute("fence", "true")
        : b.setAttribute("fence", "false");
      ("\u2216" === a.delim || -1 < a.delim.indexOf("arrow")) &&
        b.setAttribute("stretchy", "true");
      b.setAttribute("symmetric", "true");
      b.setAttribute("minsize", ac[a.size] + "em");
      return b;
    },
  });
  q({
    type: "leftright-right",
    names: ["\\right"],
    props: { numArgs: 1, argTypes: ["primitive"] },
    handler: (a, b) => {
      const c = a.parser.gullet.macros.get("\\current@color");
      if (c && "string" !== typeof c)
        throw new p("\\current@color set to non-string in \\right");
      return {
        type: "leftright-right",
        mode: a.parser.mode,
        delim: ea(b[0], a).text,
        color: c,
      };
    },
  });
  q({
    type: "leftright",
    names: ["\\left"],
    props: { numArgs: 1, argTypes: ["primitive"] },
    handler: (a, b) => {
      b = ea(b[0], a);
      a = a.parser;
      ++a.leftrightDepth;
      const c = a.parseExpression(!1);
      --a.leftrightDepth;
      a.expect("\\right", !1);
      const e = w(a.parseFunction(), "leftright-right");
      return {
        type: "leftright",
        mode: a.mode,
        body: c,
        left: b.text,
        right: e.delim,
        rightColor: e.color,
      };
    },
    mathmlBuilder: (a, b) => {
      if (!a.body)
        throw Error("Bug: The leftright ParseNode wasn't fully parsed.");
      b = C(a.body, b);
      "." === a.left && (a.left = "");
      var c = new l.MathNode("mo", [J(a.left, a.mode)]);
      c.setAttribute("fence", "true");
      c.setAttribute("form", "prefix");
      ("\u2216" === a.left || -1 < a.left.indexOf("arrow")) &&
        c.setAttribute("stretchy", "true");
      b.unshift(c);
      "." === a.right && (a.right = "");
      c = new l.MathNode("mo", [J(a.right, a.mode)]);
      c.setAttribute("fence", "true");
      c.setAttribute("form", "postfix");
      ("\u2216" === a.right || -1 < a.right.indexOf("arrow")) &&
        c.setAttribute("stretchy", "true");
      a.rightColor && c.setAttribute("mathcolor", a.rightColor);
      b.push(c);
      return M(b);
    },
  });
  q({
    type: "middle",
    names: ["\\middle"],
    props: { numArgs: 1, argTypes: ["primitive"] },
    handler: (a, b) => {
      b = ea(b[0], a);
      if (!a.parser.leftrightDepth)
        throw new p("\\middle without preceding \\left", b);
      return { type: "middle", mode: a.parser.mode, delim: b.text };
    },
    mathmlBuilder: (a, b) => {
      b = J(a.delim, a.mode);
      b = new l.MathNode("mo", [b]);
      b.setAttribute("fence", "true");
      -1 < a.delim.indexOf("arrow") && b.setAttribute("stretchy", "true");
      b.setAttribute("form", "prefix");
      b.setAttribute("lspace", "0.05em");
      b.setAttribute("rspace", "0.05em");
      return b;
    },
  });
  const cb = (a) => {
      a = new l.MathNode("mspace");
      a.setAttribute("width", "3pt");
      return a;
    },
    za = (a, b) => {
      b =
        -1 < a.label.indexOf("colorbox")
          ? new l.MathNode("mpadded", [cb(), A(a.body, b), cb()])
          : new l.MathNode("menclose", [A(a.body, b)]);
      switch (a.label) {
        case "\\overline":
          b.setAttribute("notation", "top");
          b.style.padding = "0.1em 0 0 0";
          b.style.borderTop = "0.065em solid";
          break;
        case "\\underline":
          b.setAttribute("notation", "bottom");
          b.style.padding = "0 0 0.1em 0";
          b.style.borderBottom = "0.065em solid";
          break;
        case "\\cancel":
          b.setAttribute("notation", "updiagonalstrike");
          b.classes.push("cancel");
          break;
        case "\\bcancel":
          b.setAttribute("notation", "downdiagonalstrike");
          b.classes.push("bcancel");
          break;
        case "\\angl":
          b.setAttribute("notation", "actuarial");
          b.style.padding = "0.03889em 0.03889em 0 0.03889em";
          b.style.borderTop = "0.049em solid";
          b.style.borderRight = "0.049em solid";
          b.style.marginRight = "0.03889em";
          break;
        case "\\sout":
          b.setAttribute("notation", "horizontalstrike");
          b.style["text-decoration"] = "line-through 0.08em solid";
          break;
        case "\\fbox":
          b.setAttribute("notation", "box");
          b.style = { padding: "3pt", border: "1px solid" };
          break;
        case "\\fcolorbox":
        case "\\colorbox":
          const c = { padding: "3pt 0 3pt 0" };
          "\\fcolorbox" === a.label &&
            (c.border = "0.06em solid " + String(a.borderColor));
          b.style = c;
          break;
        case "\\xcancel":
          b.setAttribute("notation", "updiagonalstrike downdiagonalstrike"),
            b.classes.push("xcancel");
      }
      a.backgroundColor && b.setAttribute("mathbackground", a.backgroundColor);
      return b;
    };
  q({
    type: "enclose",
    names: ["\\colorbox"],
    props: {
      numArgs: 2,
      numOptionalArgs: 1,
      allowedInText: !0,
      argTypes: ["raw", "raw", "text"],
    },
    handler({ parser: a, funcName: b }, c, e) {
      if ((e = e[0] && w(e[0], "raw").string)) {
        const f = w(c[0], "raw").string;
        e = W(e, f);
      } else e = Z(w(c[0], "raw").string, a.gullet.macros);
      return {
        type: "enclose",
        mode: a.mode,
        label: b,
        backgroundColor: e,
        body: c[1],
      };
    },
    mathmlBuilder: za,
  });
  q({
    type: "enclose",
    names: ["\\fcolorbox"],
    props: {
      numArgs: 3,
      numOptionalArgs: 1,
      allowedInText: !0,
      argTypes: ["raw", "raw", "raw", "text"],
    },
    handler({ parser: a, funcName: b }, c, e) {
      e = e[0] && w(e[0], "raw").string;
      if (e) {
        var f = w(c[0], "raw").string;
        const g = w(c[0], "raw").string;
        f = W(e, f);
        e = W(e, g);
      } else
        (f = Z(w(c[0], "raw").string, a.gullet.macros)),
          (e = Z(w(c[1], "raw").string, a.gullet.macros));
      return {
        type: "enclose",
        mode: a.mode,
        label: b,
        backgroundColor: e,
        borderColor: f,
        body: c[2],
      };
    },
    mathmlBuilder: za,
  });
  q({
    type: "enclose",
    names: ["\\fbox"],
    props: { numArgs: 1, argTypes: ["hbox"], allowedInText: !0 },
    handler({ parser: a }, b) {
      return { type: "enclose", mode: a.mode, label: "\\fbox", body: b[0] };
    },
  });
  q({
    type: "enclose",
    names: ["\\angl", "\\cancel", "\\bcancel", "\\xcancel", "\\sout"],
    props: { numArgs: 1 },
    handler({ parser: a, funcName: b }, c) {
      return { type: "enclose", mode: a.mode, label: b, body: c[0] };
    },
    mathmlBuilder: za,
  });
  const Na = {},
    aa = (a) => {
      if (!a.parser.settings.displayMode)
        throw new p(`{${a.envName}} can be used only in display mode.`);
    },
    bc = (a, b, c) => {
      const e = a.tags.shift();
      e
        ? e.body
          ? ((a = M(C(e.body, b, void 0))), (a.classes = ["tml-tag"]))
          : (a = new l.MathNode("mtext", [], []))
        : (a =
            a.envClasses.includes("multline") &&
            ((a.leqno && 0 !== c) || (!a.leqno && c !== a.body.length - 1))
              ? new l.MathNode("mtext", [], [])
              : new l.MathNode("mtext", [], ["tml-eqn"]));
      return a;
    },
    cc = { c: "center ", l: "left ", r: "right " },
    db = (a) => {
      const b = new l.MathNode("mtd", []);
      b.style = { padding: "0", width: "50%" };
      a.envClasses.includes("multline") && (b.style.width = "7.5%");
      return b;
    },
    K = function (a, b) {
      var c = [],
        e = a.body.length,
        f = a.hLinesBeforeRow;
      for (var g = 0; g < e; g++) {
        var m = a.body[g],
          n = [];
        const u =
          "text" === a.scriptLevel ? 1 : "script" === a.scriptLevel ? 2 : 0;
        for (let B = 0; B < m.length; B++) {
          const v = new l.MathNode("mtd", [A(m[B], b.withLevel(u))]);
          if (a.envClasses.includes("multline")) {
            const z = 0 === g ? "left" : g === e - 1 ? "right" : "center";
            v.setAttribute("columnalign", z);
            "center" !== z && (v.style.textAlign = "-webkit-" + z);
          }
          n.push(v);
        }
        a.addEqnNum &&
          (n.unshift(db(a)),
          n.push(db(a)),
          (m = bc(a, b.withLevel(u), g)),
          a.leqno
            ? (n[0].children.push(m), (n[0].style.textAlign = "-webkit-left"))
            : (n[n.length - 1].children.push(m),
              (n[n.length - 1].style.textAlign = "-webkit-right")));
        n = new l.MathNode("mtr", n, []);
        0 === g &&
          0 < f[0].length &&
          (2 === f[0].length
            ? n.classes.push("tml-top-double")
            : n.classes.push(f[0][0] ? "tml-top-dashed" : "tml-top-solid"));
        0 < f[g + 1].length &&
          (2 === f[g + 1].length
            ? n.classes.push("tml-hline-double")
            : n.classes.push(
                f[g + 1][0] ? "tml-hline-dashed" : "tml-hline-solid"
              ));
        c.push(n);
      }
      b = new l.MathNode("mtable", c);
      0 < a.envClasses.length &&
        (b.classes = a.envClasses.map((u) => "tml-" + u));
      "display" === a.scriptLevel && b.setAttribute("displaystyle", "true");
      if (a.addEqnNum || a.envClasses.includes("multline"))
        b.style.width = "100%";
      c = "";
      if (a.cols && 0 < a.cols.length) {
        e = a.cols;
        g = !1;
        n = 0;
        for (f = e.length; "separator" === e[n].type; ) n += 1;
        for (; "separator" === e[f - 1].type; ) --f;
        if ("separator" === e[0].type) {
          m =
            "separator" === e[1].type
              ? "0.15em double"
              : "|" === e[0].separator
              ? "0.06em solid "
              : "0.06em dashed ";
          for (var t of b.children) t.children[0].style.borderLeft = m;
        }
        for (t = a.addEqnNum ? 0 : -1; n < f; n++)
          if ("align" === e[n].type) {
            g = cc[e[n].align];
            c += g;
            t += 1;
            for (var x of b.children)
              "center" !== g.trim() &&
                t < x.children.length &&
                (x.children[t].style.textAlign = "-webkit-" + g.trim());
            g = !0;
          } else if ("separator" === e[n].type) {
            if (g) {
              g =
                "separator" === e[n + 1].type
                  ? "0.15em double"
                  : "|" === e[n].separator
                  ? "0.06em solid"
                  : "0.06em dashed";
              for (const u of b.children)
                t < u.children.length && (u.children[t].style.borderRight = g);
            }
            g = !1;
          }
        if ("separator" === e[e.length - 1].type) {
          x =
            "separator" === e[e.length - 2].type
              ? "0.15em double"
              : "|" === e[e.length - 1].separator
              ? "0.06em solid"
              : "0.06em dashed";
          for (const u of b.children)
            (u.children[u.children.length - 1].style.borderRight = x),
              (u.children[u.children.length - 1].style.paddingRight = "0.4em");
        }
      }
      a.addEqnNum && (c = "left " + (0 < c.length ? c : "center ") + "right ");
      c && b.setAttribute("columnalign", c.trim());
      a.envClasses.includes("small") &&
        ((b = new l.MathNode("mstyle", [b])),
        b.setAttribute("scriptlevel", "1"));
      return b;
    },
    eb = function (a, b) {
      -1 === a.envName.indexOf("ed") && aa(a);
      const c = [],
        e = N(
          a.parser,
          {
            cols: c,
            addEqnNum: "align" === a.envName || "alignat" === a.envName,
            emptySingleRow: !0,
            envClasses: ["jot", "abut"],
            maxNumCols: "split" === a.envName ? 2 : void 0,
            leqno: a.parser.settings.leqno,
          },
          "display"
        );
      let f,
        g = 0;
      if (b[0] && "ordgroup" === b[0].type) {
        var m = "";
        for (let t = 0; t < b[0].body.length; t++) {
          const x = w(b[0].body[t], "textord");
          m += x.text;
        }
        f = Number(m);
        g = 2 * f;
      }
      const n = !g;
      e.body.forEach(function (t) {
        if (n) g < t.length && (g = t.length);
        else {
          const x = t.length / 2;
          if (f < x)
            throw new p(
              "Too many math in a row: " + `expected ${f}, but got ${x}`,
              t[0]
            );
        }
      });
      for (b = 0; b < g; ++b)
        (m = "r"),
          1 === b % 2 && (m = "l"),
          (c[b] = { type: "align", align: m });
      "split" !== a.envName &&
        (-1 < a.envName.indexOf("ed")
          ? e.envClasses.push("aligned")
          : n
          ? (e.envClasses[1] = "align*" === a.envName ? "align-star" : "align")
          : e.envClasses.push("aligned"));
      return e;
    };
  I({
    type: "array",
    names: ["array", "darray"],
    props: { numArgs: 1 },
    handler(a, b) {
      b = (da(b[0]) ? [b[0]] : w(b[0], "ordgroup").body).map(function (c) {
        const e = ua(c).text;
        if (-1 !== "lcr".indexOf(e)) return { type: "align", align: e };
        if ("|" === e) return { type: "separator", separator: "|" };
        if (":" === e) return { type: "separator", separator: ":" };
        throw new p("Unknown column alignment: " + e, c);
      });
      return N(
        a.parser,
        { cols: b, envClasses: ["array"], maxNumCols: b.length },
        "d" === a.envName.slice(0, 1) ? "display" : "text"
      );
    },
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names:
      "matrix pmatrix bmatrix Bmatrix vmatrix Vmatrix matrix* pmatrix* bmatrix* Bmatrix* vmatrix* Vmatrix*".split(
        " "
      ),
    props: { numArgs: 0 },
    handler(a) {
      const b = {
        matrix: null,
        pmatrix: ["(", ")"],
        bmatrix: ["[", "]"],
        Bmatrix: ["\\{", "\\}"],
        vmatrix: ["|", "|"],
        Vmatrix: ["\\Vert", "\\Vert"],
      }[a.envName.replace("*", "")];
      let c = "c";
      var e = { envClasses: [], cols: [] };
      if ("*" === a.envName.charAt(a.envName.length - 1)) {
        const f = a.parser;
        f.consumeSpaces();
        if ("[" === f.fetch().text) {
          f.consume();
          f.consumeSpaces();
          c = f.fetch().text;
          if (-1 === "lcr".indexOf(c))
            throw new p("Expected l or c or r", f.nextToken);
          f.consume();
          f.consumeSpaces();
          f.expect("]");
          f.consume();
          e.cols = [];
        }
      }
      e = N(a.parser, e, "text");
      e.cols = Array(e.body[0].length).fill({ type: "align", align: c });
      return b
        ? {
            type: "leftright",
            mode: a.mode,
            body: [e],
            left: b[0],
            right: b[1],
            rightColor: void 0,
          }
        : e;
    },
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names: ["smallmatrix"],
    props: { numArgs: 0 },
    handler(a) {
      a = N(a.parser, { type: "small" }, "script");
      a.envClasses = ["small"];
      return a;
    },
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names: ["subarray"],
    props: { numArgs: 1 },
    handler(a, b) {
      b = (da(b[0]) ? [b[0]] : w(b[0], "ordgroup").body).map(function (c) {
        const e = ua(c).text;
        if (-1 !== "lc".indexOf(e)) return { type: "align", align: e };
        throw new p("Unknown column alignment: " + e, c);
      });
      if (1 < b.length) throw new p("{subarray} can contain only one column");
      b = { cols: b, envClasses: ["small"] };
      b = N(a.parser, b, "script");
      if (0 < b.body.length && 1 < b.body[0].length)
        throw new p("{subarray} can contain only one column");
      return b;
    },
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names: ["cases", "dcases", "rcases", "drcases"],
    props: { numArgs: 0 },
    handler(a) {
      const b = N(
        a.parser,
        { cols: [], envClasses: ["cases"] },
        "d" === a.envName.slice(0, 1) ? "display" : "text"
      );
      return {
        type: "leftright",
        mode: a.mode,
        body: [b],
        left: -1 < a.envName.indexOf("r") ? "." : "\\{",
        right: -1 < a.envName.indexOf("r") ? "\\}" : ".",
        rightColor: void 0,
      };
    },
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names: ["align", "align*", "aligned", "split"],
    props: { numArgs: 0 },
    handler: eb,
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names: ["alignat", "alignat*", "alignedat"],
    props: { numArgs: 1 },
    handler: eb,
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names: ["gathered", "gather", "gather*"],
    props: { numArgs: 0 },
    handler(a) {
      "gathered" !== a.envName && aa(a);
      return N(
        a.parser,
        {
          cols: [],
          envClasses: ["jot", "abut"],
          addEqnNum: "gather" === a.envName,
          emptySingleRow: !0,
          leqno: a.parser.settings.leqno,
        },
        "display"
      );
    },
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names: ["equation", "equation*"],
    props: { numArgs: 0 },
    handler(a) {
      aa(a);
      return N(
        a.parser,
        {
          addEqnNum: "equation" === a.envName,
          emptySingleRow: !0,
          singleRow: !0,
          maxNumCols: 1,
          envClasses: ["align"],
          leqno: a.parser.settings.leqno,
        },
        "display"
      );
    },
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names: ["multline", "multline*"],
    props: { numArgs: 0 },
    handler(a) {
      aa(a);
      return N(
        a.parser,
        {
          addEqnNum: "multline" === a.envName,
          maxNumCols: 1,
          envClasses: ["jot", "multline"],
          leqno: a.parser.settings.leqno,
        },
        "display"
      );
    },
    mathmlBuilder: K,
  });
  I({
    type: "array",
    names: ["CD"],
    props: { numArgs: 0 },
    handler(a) {
      aa(a);
      a = a.parser;
      const b = [];
      a.gullet.beginGroup();
      a.gullet.macros.set("\\cr", "\\\\\\relax");
      for (a.gullet.beginGroup(); ; ) {
        b.push(a.parseExpression(!1, "\\\\"));
        a.gullet.endGroup();
        a.gullet.beginGroup();
        var c = a.fetch().text;
        if ("&" === c || "\\\\" === c) a.consume();
        else if ("\\end" === c) {
          0 === b[b.length - 1].length && b.pop();
          break;
        } else throw new p("Expected \\\\ or \\cr or \\end", a.nextToken);
      }
      c = [];
      const e = [c];
      for (let g = 0; g < b.length; g++) {
        const m = b[g];
        var f = Xa();
        for (let n = 0; n < m.length; n++)
          if (Ya(m[n])) {
            c.push(f);
            n += 1;
            const t = ua(m[n]).text,
              x = Array(2);
            x[0] = { type: "ordgroup", mode: "math", body: [] };
            x[1] = { type: "ordgroup", mode: "math", body: [] };
            if (!(-1 < "=|.".indexOf(t)))
              if (-1 < "<>AV".indexOf(t))
                for (let u = 0; 2 > u; u++) {
                  let B = !0;
                  for (let v = n + 1; v < m.length; v++) {
                    f = m[v];
                    if (
                      ("mathord" === f.type || "atom" === f.type) &&
                      f.text === t
                    ) {
                      B = !1;
                      n = v;
                      break;
                    }
                    if (Ya(m[v]))
                      throw new p(
                        "Missing a " + t + " character to complete a CD arrow.",
                        m[v]
                      );
                    x[u].body.push(m[v]);
                  }
                  if (B)
                    throw new p(
                      "Missing a " + t + " character to complete a CD arrow.",
                      m[n]
                    );
                }
              else throw new p('Expected one of "<>AV=|." after @.');
            f = Jb(t, x, a);
            c.push(f);
            f = Xa();
          } else f.body.push(m[n]);
        0 === g % 2 ? c.push(f) : c.shift();
        c = [];
        e.push(c);
      }
      e.pop();
      a.gullet.endGroup();
      a.gullet.endGroup();
      return {
        type: "array",
        mode: "math",
        body: e,
        envClasses: ["jot", "cd"],
        cols: [],
        hLinesBeforeRow: Array(e.length + 1).fill([]),
      };
    },
    mathmlBuilder: K,
  });
  q({
    type: "text",
    names: ["\\hline", "\\hdashline"],
    props: { numArgs: 0, allowedInText: !0, allowedInMath: !0 },
    handler(a, b) {
      throw new p(`${a.funcName} valid only within array environment`);
    },
  });
  const fb = Na;
  q({
    type: "environment",
    names: ["\\begin", "\\end"],
    props: { numArgs: 1, argTypes: ["text"] },
    handler({ parser: a, funcName: b }, c) {
      var e = c[0];
      if ("ordgroup" !== e.type) throw new p("Invalid environment name", e);
      c = "";
      for (let f = 0; f < e.body.length; ++f) c += w(e.body[f], "textord").text;
      if ("\\begin" === b) {
        if (!Object.prototype.hasOwnProperty.call(fb, c))
          throw new p("No such environment: " + c, e);
        b = fb[c];
        const { args: f, optArgs: g } = a.parseArguments(
          "\\begin{" + c + "}",
          b
        );
        b = b.handler({ mode: a.mode, envName: c, parser: a }, f, g);
        a.expect("\\end", !1);
        e = a.nextToken;
        a = w(a.parseFunction(), "environment");
        if (a.name !== c)
          throw new p(`Mismatch: \\begin{${c}} matched by \\end{${a.name}}`, e);
        return b;
      }
      return { type: "environment", mode: a.mode, name: c, nameGroup: e };
    },
  });
  q({
    type: "envTag",
    names: ["\\env@tag"],
    props: { numArgs: 1, argTypes: ["math"] },
    handler({ parser: a }, b) {
      return { type: "envTag", mode: a.mode, body: b[0] };
    },
    mathmlBuilder(a, b) {
      return new l.MathNode("mrow");
    },
  });
  q({
    type: "noTag",
    names: ["\\env@notag"],
    props: { numArgs: 0 },
    handler({ parser: a }) {
      return { type: "noTag", mode: a.mode };
    },
    mathmlBuilder(a, b) {
      return new l.MathNode("mrow");
    },
  });
  const gb = (a, b) => {
      var c = a.font;
      b = b.withFont(c);
      b = A(a.body, b);
      ("boldsymbol" != a.font && "mathbf" != a.font) ||
        !b.attributes.hasOwnProperty("mathvariant") ||
        ("script" !== b.attributes.mathvariant &&
          "fraktur" !== b.attributes.mathvariant) ||
        (b.attributes.mathvariant = "bold-" + b.attributes.mathvariant);
      if (0 === b.children.length) return b;
      if ("boldsymbol" === c && ["mo", "mpadded"].includes(b.type))
        return (b.style.fontWeight = "bold"), b;
      let e = "mo" === b.children[0].type;
      for (var f = 1; f < b.children.length; f++)
        "mo" === b.children[f].type &&
          "boldsymbol" === c &&
          (b.children[f].style.fontWeight = "bold"),
          "mi" !== b.children[f].type && (e = !1),
          "normal" !==
            ((b.children[f].attributes &&
              b.children[f].attributes.mathvariant) ||
              "") && (e = !1);
      for (c = 0; c < b.children.length; c++)
        (f =
          (b.children[c].attributes && b.children[c].attributes.mathvariant) ||
          ""),
          "mathbf" == a.font &&
            ["script", "fraktur"].includes(f) &&
            (b.children[c].attributes.mathvariant = "bold-" + f);
      if (!e) return b;
      a = b.children[0];
      for (c = 1; c < b.children.length; c++)
        a.children.push(b.children[c].children[0]);
      b.attributes.mathcolor &&
        (a.attributes.mathcolor = b.attributes.mathcolor);
      return a.attributes.mathvariant && "normal" === a.attributes.mathvariant
        ? ((b = new l.MathNode("mtext", new l.TextNode("\u200b"))),
          new l.MathNode("mrow", [b, a]))
        : a;
    },
    hb = {
      "\\Bbb": "\\mathbb",
      "\\bold": "\\mathbf",
      "\\frak": "\\mathfrak",
      "\\bm": "\\boldsymbol",
    };
  q({
    type: "font",
    names:
      "\\mathrm \\mathit \\mathbf \\mathnormal \\up@greek \\boldsymbol \\mathbb \\mathcal \\mathfrak \\mathscr \\mathsf \\mathtt \\Bbb \\bm \\bold \\frak".split(
        " "
      ),
    props: { numArgs: 1, allowedInArgument: !0 },
    handler: ({ parser: a, funcName: b }, c) => {
      c = Y(c[0]);
      b in hb && (b = hb[b]);
      return { type: "font", mode: a.mode, font: b.slice(1), body: c };
    },
    mathmlBuilder: gb,
  });
  q({
    type: "font",
    names: "\\rm \\sf \\tt \\bf \\it \\cal".split(" "),
    props: { numArgs: 0, allowedInText: !0 },
    handler: ({ parser: a, funcName: b, breakOnTokenText: c }, e) => {
      ({ mode: e } = a);
      c = a.parseExpression(!0, c);
      b = `math${b.slice(1)}`;
      return {
        type: "font",
        mode: e,
        font: b,
        body: { type: "ordgroup", mode: a.mode, body: c },
      };
    },
    mathmlBuilder: gb,
  });
  const ib = ["display", "text", "script", "scriptscript"],
    dc = { auto: -1, display: 0, text: 0, script: 1, scriptscript: 2 },
    Aa = (a, b) => {
      var c =
        "auto" === a.scriptLevel
          ? b.incrementLevel()
          : "display" === a.scriptLevel
          ? b.withLevel(1)
          : "text" === a.scriptLevel
          ? b.withLevel(2)
          : b.withLevel(3);
      c = new l.MathNode("mfrac", [A(a.numer, c), A(a.denom, c)]);
      a.hasBarLine
        ? a.barSize &&
          ((b = P(a.barSize, b)),
          c.setAttribute("linethickness", b.number + b.unit))
        : c.setAttribute("linethickness", "0px");
      if (null != a.leftDelim || null != a.rightDelim) {
        b = [];
        if (null != a.leftDelim) {
          const e = new l.MathNode("mo", [
            new l.TextNode(a.leftDelim.replace("\\", "")),
          ]);
          e.setAttribute("fence", "true");
          b.push(e);
        }
        b.push(c);
        null != a.rightDelim &&
          ((c = new l.MathNode("mo", [
            new l.TextNode(a.rightDelim.replace("\\", "")),
          ])),
          c.setAttribute("fence", "true"),
          b.push(c));
        c = M(b);
      }
      "auto" !== a.scriptLevel &&
        ((c = new l.MathNode("mstyle", [c])),
        c.setAttribute("displaystyle", String("display" === a.scriptLevel)),
        c.setAttribute("scriptlevel", dc[a.scriptLevel]));
      return c;
    };
  q({
    type: "genfrac",
    names:
      "\\dfrac \\frac \\tfrac \\dbinom \\binom \\tbinom \\\\atopfrac \\\\bracefrac \\\\brackfrac".split(
        " "
      ),
    props: { numArgs: 2, allowedInArgument: !0 },
    handler: ({ parser: a, funcName: b }, c) => {
      const e = c[0];
      c = c[1];
      let f = !1,
        g = null,
        m = null,
        n = "auto";
      switch (b) {
        case "\\dfrac":
        case "\\frac":
        case "\\tfrac":
          f = !0;
          break;
        case "\\\\atopfrac":
          f = !1;
          break;
        case "\\dbinom":
        case "\\binom":
        case "\\tbinom":
          g = "(";
          m = ")";
          break;
        case "\\\\bracefrac":
          g = "\\{";
          m = "\\}";
          break;
        case "\\\\brackfrac":
          g = "[";
          m = "]";
          break;
        default:
          throw Error("Unrecognized genfrac command");
      }
      switch (b) {
        case "\\dfrac":
        case "\\dbinom":
          n = "display";
          break;
        case "\\tfrac":
        case "\\tbinom":
          n = "text";
      }
      return {
        type: "genfrac",
        mode: a.mode,
        continued: !1,
        numer: e,
        denom: c,
        hasBarLine: f,
        leftDelim: g,
        rightDelim: m,
        scriptLevel: n,
        barSize: null,
      };
    },
    mathmlBuilder: Aa,
  });
  q({
    type: "genfrac",
    names: ["\\cfrac"],
    props: { numArgs: 2 },
    handler: ({ parser: a }, b) => ({
      type: "genfrac",
      mode: a.mode,
      continued: !0,
      numer: b[0],
      denom: b[1],
      hasBarLine: !0,
      leftDelim: null,
      rightDelim: null,
      scriptLevel: "display",
      barSize: null,
    }),
  });
  q({
    type: "infix",
    names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
    props: { numArgs: 0, infix: !0 },
    handler({ parser: a, funcName: b, token: c }) {
      switch (b) {
        case "\\over":
          b = "\\frac";
          break;
        case "\\choose":
          b = "\\binom";
          break;
        case "\\atop":
          b = "\\\\atopfrac";
          break;
        case "\\brace":
          b = "\\\\bracefrac";
          break;
        case "\\brack":
          b = "\\\\brackfrac";
          break;
        default:
          throw Error("Unrecognized infix genfrac command");
      }
      return { type: "infix", mode: a.mode, replaceWith: b, token: c };
    },
  });
  const jb = function (a) {
    let b = null;
    0 < a.length && ((b = a), (b = "." === b ? null : b));
    return b;
  };
  q({
    type: "genfrac",
    names: ["\\genfrac"],
    props: {
      numArgs: 6,
      allowedInArgument: !0,
      argTypes: "math math size text math math".split(" "),
    },
    handler({ parser: a }, b) {
      const c = b[4],
        e = b[5];
      var f = Y(b[0]);
      f = "atom" === f.type && "open" === f.family ? jb(f.text) : null;
      var g = Y(b[1]);
      g = "atom" === g.type && "close" === g.family ? jb(g.text) : null;
      var m = w(b[2], "size");
      let n = null;
      m.isBlank ? (m = !0) : ((n = m.value), (m = 0 < n.number));
      let t = "auto";
      b = b[3];
      "ordgroup" === b.type
        ? 0 < b.body.length &&
          ((b = w(b.body[0], "textord")), (t = ib[Number(b.text)]))
        : ((b = w(b, "textord")), (t = ib[Number(b.text)]));
      return {
        type: "genfrac",
        mode: a.mode,
        numer: c,
        denom: e,
        continued: !1,
        hasBarLine: m,
        barSize: n,
        leftDelim: f,
        rightDelim: g,
        scriptLevel: t,
      };
    },
    mathmlBuilder: Aa,
  });
  q({
    type: "infix",
    names: ["\\above"],
    props: { numArgs: 1, argTypes: ["size"], infix: !0 },
    handler({ parser: a, token: b }, c) {
      return {
        type: "infix",
        mode: a.mode,
        replaceWith: "\\\\abovefrac",
        barSize: w(c[0], "size").value,
        token: b,
      };
    },
  });
  q({
    type: "genfrac",
    names: ["\\\\abovefrac"],
    props: { numArgs: 3, argTypes: ["math", "size", "math"] },
    handler: ({ parser: a }, b) => {
      const c = b[0];
      var e = w(b[1], "infix").barSize;
      if (!e) throw Error("Expected non-null, but got " + String(e));
      return {
        type: "genfrac",
        mode: a.mode,
        numer: c,
        denom: b[2],
        continued: !1,
        hasBarLine: 0 < e.number,
        barSize: e,
        leftDelim: null,
        rightDelim: null,
        scriptLevel: "auto",
      };
    },
    mathmlBuilder: Aa,
  });
  q({
    type: "horizBrace",
    names: ["\\overbrace", "\\underbrace"],
    props: { numArgs: 1 },
    handler({ parser: a, funcName: b }, c) {
      return {
        type: "horizBrace",
        mode: a.mode,
        label: b,
        isOver: /^\\over/.test(b),
        base: c[0],
      };
    },
    mathmlBuilder: (a, b) => {
      const c = ja.mathMLnode(a.label);
      c.style["math-depth"] = 0;
      return new l.MathNode(a.isOver ? "mover" : "munder", [A(a.base, b), c]);
    },
  });
  q({
    type: "href",
    names: ["\\href"],
    props: { numArgs: 2, argTypes: ["url", "original"], allowedInText: !0 },
    handler: ({ parser: a, token: b }, c) => {
      const e = c[1];
      c = w(c[0], "url").url;
      if (!a.settings.isTrusted({ command: "\\href", url: c }))
        throw new p('Function "\\href" is not trusted', b);
      return { type: "href", mode: a.mode, href: c, body: D(e) };
    },
    mathmlBuilder: (a, b) => {
      b = M(C(a.body, b, void 0));
      b instanceof L || (b = new L("mrow", [b]));
      b.setAttribute("href", a.href);
      return b;
    },
  });
  q({
    type: "href",
    names: ["\\url"],
    props: { numArgs: 1, argTypes: ["url"], allowedInText: !0 },
    handler: ({ parser: a, token: b }, c) => {
      c = w(c[0], "url").url;
      if (!a.settings.isTrusted({ command: "\\url", url: c }))
        throw new p('Function "\\url" is not trusted', b);
      b = [];
      for (let e = 0; e < c.length; e++) {
        let f = c[e];
        "~" === f && (f = "\\textasciitilde");
        b.push({ type: "textord", mode: "text", text: f });
      }
      return {
        type: "href",
        mode: a.mode,
        href: c,
        body: D({ type: "text", mode: a.mode, font: "\\texttt", body: b }),
      };
    },
  });
  q({
    type: "html",
    names: ["\\class", "\\id", "\\style", "\\data"],
    props: { numArgs: 2, argTypes: ["raw", "original"], allowedInText: !0 },
    handler: ({ parser: a, funcName: b, token: c }, e) => {
      var f = w(e[0], "raw").string;
      e = e[1];
      if (a.settings.strict)
        throw new p(`Function "${b}" is disabled in strict mode`, c);
      const g = {};
      switch (b) {
        case "\\class":
          g.class = f;
          f = { command: "\\class", class: f };
          break;
        case "\\id":
          g.id = f;
          f = { command: "\\id", id: f };
          break;
        case "\\style":
          g.style = f;
          f = { command: "\\style", style: f };
          break;
        case "\\data":
          f = f.split(",");
          for (let m = 0; m < f.length; m++) {
            const n = f[m].split("=");
            if (2 !== n.length)
              throw new p("Error parsing key-value for \\data");
            g["data-" + n[0].trim()] = n[1].trim();
          }
          f = { command: "\\data", attributes: g };
          break;
        default:
          throw Error("Unrecognized html command");
      }
      if (!a.settings.isTrusted(f))
        throw new p(`Function "${b}" is not trusted`, c);
      return { type: "html", mode: a.mode, attributes: g, body: D(e) };
    },
    mathmlBuilder: (a, b) => {
      b = M(C(a.body, b, void 0));
      const c = [];
      a.attributes.class && c.push(...a.attributes.class.trim().split(/\s+/));
      b.classes = c;
      for (const e in a.attributes)
        "class" !== e &&
          Object.prototype.hasOwnProperty.call(a.attributes, e) &&
          b.setAttribute(e, a.attributes[e]);
      return b;
    },
  });
  const Ba = function (a) {
    if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(a))
      return { number: +a, unit: "bp" };
    const b = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(a);
    if (!b) throw new p("Invalid size: '" + a + "' in \\includegraphics");
    a = { number: +(b[1] + b[2]), unit: b[3] };
    if (!Va(a))
      throw new p("Invalid unit: '" + a.unit + "' in \\includegraphics.");
    return a;
  };
  q({
    type: "includegraphics",
    names: ["\\includegraphics"],
    props: {
      numArgs: 1,
      numOptionalArgs: 1,
      argTypes: ["raw", "url"],
      allowedInText: !1,
    },
    handler: ({ parser: a, token: b }, c, e) => {
      let f = { number: 0, unit: "em" },
        g = { number: 0.9, unit: "em" },
        m = { number: 0, unit: "em" },
        n = "";
      if (e[0]) {
        e = w(e[0], "raw").string.split(",");
        for (let t = 0; t < e.length; t++) {
          const x = e[t].split("=");
          if (2 === x.length) {
            const u = x[1].trim();
            switch (x[0].trim()) {
              case "alt":
                n = u;
                break;
              case "width":
                f = Ba(u);
                break;
              case "height":
                g = Ba(u);
                break;
              case "totalheight":
                m = Ba(u);
                break;
              default:
                throw new p(
                  "Invalid key: '" + x[0] + "' in \\includegraphics."
                );
            }
          }
        }
      }
      c = w(c[0], "url").url;
      "" === n &&
        ((n = c.replace(/^.*[\\/]/, "")),
        (n = n.substring(0, n.lastIndexOf("."))));
      if (!a.settings.isTrusted({ command: "\\includegraphics", url: c }))
        throw new p('Function "\\includegraphics" is not trusted', b);
      return {
        type: "includegraphics",
        mode: a.mode,
        alt: n,
        width: f,
        height: g,
        totalheight: m,
        src: c,
      };
    },
    mathmlBuilder: (a, b) => {
      const c = P(a.height, b),
        e = { number: 0, unit: "em" };
      0 < a.totalheight.number &&
        a.totalheight.unit === c.unit &&
        a.totalheight.number > c.number &&
        ((e.number = a.totalheight.number - c.number), (e.unit = c.unit));
      let f = 0;
      0 < a.width.number && (f = P(a.width, b));
      b = { height: c.number + e.number + "em" };
      0 < f.number && (b.width = f.number + f.unit);
      0 < e.number && (b.verticalAlign = -e.number + e.unit);
      a = new Pb(a.src, a.alt, b);
      a.height = c;
      a.depth = e;
      return new l.MathNode("mtext", [a]);
    },
  });
  q({
    type: "kern",
    names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
    props: { numArgs: 1, argTypes: ["size"], primitive: !0, allowedInText: !0 },
    handler({ parser: a, funcName: b, token: c }, e) {
      e = w(e[0], "size");
      if (a.settings.strict) {
        const f = "mu" === e.value.unit;
        if ("m" === b[1]) {
          if (!f)
            throw new p(
              `LaTeX's ${b} supports only mu units, ` +
                `not ${e.value.unit} units`,
              c
            );
          if ("math" !== a.mode)
            throw new p(`LaTeX's ${b} works only in math mode`, c);
        } else if (f) throw new p(`LaTeX's ${b} doesn't support mu units`, c);
      }
      return { type: "kern", mode: a.mode, dimension: e.value };
    },
    mathmlBuilder(a, b) {
      b = P(a.dimension, b);
      const c = "em" === b.unit ? kb(b.number) : "";
      if ("text" === a.mode && 0 < c.length)
        return (a = new l.TextNode(c)), new l.MathNode("mtext", [a]);
      a = new l.MathNode("mspace");
      a.setAttribute("width", b.number + b.unit);
      0 > b.number && (a.style.marginLeft = b.number + b.unit);
      return a;
    },
  });
  const kb = function (a) {
      return 0.05555 <= a && 0.05556 >= a
        ? "\u200a"
        : 0.1666 <= a && 0.1667 >= a
        ? "\u2009"
        : 0.2222 <= a && 0.2223 >= a
        ? "\u2005"
        : 0.2777 <= a && 0.2778 >= a
        ? "\u2005\u200a"
        : "";
    },
    lb = /[^A-Za-z_0-9-]/g;
  q({
    type: "label",
    names: ["\\label"],
    props: { numArgs: 1, argTypes: ["raw"] },
    handler({ parser: a }, b) {
      return {
        type: "label",
        mode: a.mode,
        string: b[0].string.replace(lb, ""),
      };
    },
    mathmlBuilder(a, b) {
      b = new l.MathNode("mrow", [], ["tml-label"]);
      0 < a.string.length && b.setAttribute("id", a.string);
      return b;
    },
  });
  const ec = ["\\clap", "\\llap", "\\rlap"];
  q({
    type: "lap",
    names: "\\mathllap \\mathrlap \\mathclap \\clap \\llap \\rlap".split(" "),
    props: { numArgs: 1, allowedInText: !0 },
    handler: ({ parser: a, funcName: b, token: c }, e) => {
      if (ec.includes(b)) {
        if (a.settings.strict && "text" !== a.mode)
          throw new p(
            `{${b}} can be used only in text mode.
 Try \\math${b.slice(1)}`,
            c
          );
        b = b.slice(1);
      } else b = b.slice(5);
      return { type: "lap", mode: a.mode, alignment: b, body: e[0] };
    },
    mathmlBuilder: (a, b) => {
      if ("llap" === a.alignment) {
        var c = C(D(a.body), b);
        c = new l.MathNode("mphantom", c);
        c = new l.MathNode("mpadded", [c]);
        c.setAttribute("width", "0px");
      }
      b = A(a.body, b);
      "llap" === a.alignment
        ? ((b.style.position = "absolute"),
          (b.style.right = "0"),
          (b.style.bottom = "0"),
          (b = new l.MathNode("mpadded", [c, b])))
        : (b = new l.MathNode("mpadded", [b]));
      "rlap" === a.alignment
        ? 0 < a.body.body.length &&
          "genfrac" === a.body.body[0].type &&
          b.setAttribute("lspace", "0.16667em")
        : (b.setAttribute(
            "lspace",
            ("llap" === a.alignment ? "-1" : "-0.5") + "width"
          ),
          "llap" === a.alignment
            ? (b.style.position = "relative")
            : ((b.style.display = "flex"),
              (b.style.justifyContent = "center")));
      b.setAttribute("width", "0px");
      return b;
    },
  });
  q({
    type: "ordgroup",
    names: ["\\(", "$"],
    props: { numArgs: 0, allowedInText: !0, allowedInMath: !1 },
    handler({ funcName: a, parser: b }, c) {
      c = b.mode;
      b.switchMode("math");
      a = "\\(" === a ? "\\)" : "$";
      const e = b.parseExpression(!1, a);
      b.expect(a);
      b.switchMode(c);
      return { type: "ordgroup", mode: b.mode, body: e };
    },
  });
  q({
    type: "text",
    names: ["\\)", "\\]"],
    props: { numArgs: 0, allowedInText: !0, allowedInMath: !1 },
    handler(a, b) {
      throw new p(`Mismatched ${a.funcName}`, b);
    },
  });
  const fc = (a, b) => {
    switch (b.level) {
      case 0:
        return a.display;
      case 1:
        return a.text;
      case 2:
        return a.script;
      case 3:
        return a.scriptscript;
      default:
        return a.text;
    }
  };
  q({
    type: "mathchoice",
    names: ["\\mathchoice"],
    props: { numArgs: 4, primitive: !0 },
    handler: ({ parser: a }, b) => ({
      type: "mathchoice",
      mode: a.mode,
      display: D(b[0]),
      text: D(b[1]),
      script: D(b[2]),
      scriptscript: D(b[3]),
    }),
    mathmlBuilder: (a, b) => {
      a = fc(a, b);
      return M(C(a, b, void 0));
    },
  });
  const gc = ["text", "textord", "mathord", "atom"],
    U = (a) => {
      const b = new l.MathNode("mspace");
      b.setAttribute("width", a + "em");
      return b;
    };
  q({
    type: "mclass",
    names:
      "\\mathord \\mathbin \\mathrel \\mathopen \\mathclose \\mathpunct \\mathinner".split(
        " "
      ),
    props: { numArgs: 1, primitive: !0 },
    handler({ parser: a, funcName: b }, c) {
      c = c[0];
      const e = y.isCharacterBox(c);
      let f = !0;
      const g = { type: "mathord", text: "", mode: a.mode },
        m = c.body ? c.body : [c];
      for (const n of m)
        if (gc.includes(n.type))
          n.text
            ? (g.text += n.text)
            : n.body &&
              n.body.map((t) => {
                g.text += t.text;
              });
        else {
          f = !1;
          break;
        }
      return {
        type: "mclass",
        mode: a.mode,
        mclass: "m" + b.slice(5),
        body: D(f ? g : c),
        isCharacterBox: e,
        mustPromote: f,
      };
    },
    mathmlBuilder: Pa,
  });
  q({
    type: "mclass",
    names: ["\\@binrel"],
    props: { numArgs: 2 },
    handler({ parser: a }, b) {
      a = a.mode;
      var c = b[0];
      c = "ordgroup" === c.type && c.body.length ? c.body[0] : c;
      c =
        "atom" !== c.type || ("bin" !== c.family && "rel" !== c.family)
          ? "mord"
          : "m" + c.family;
      return {
        type: "mclass",
        mode: a,
        mclass: c,
        body: D(b[1]),
        isCharacterBox: y.isCharacterBox(b[1]),
      };
    },
  });
  q({
    type: "mclass",
    names: ["\\stackrel", "\\overset", "\\underset"],
    props: { numArgs: 2 },
    handler({ funcName: a }, b) {
      var c = b[1];
      b = b[0];
      c = {
        type: "op",
        mode: c.mode,
        limits: !0,
        alwaysHandleSupSub: !0,
        parentIsSupSub: !1,
        symbol: !1,
        stack: !0,
        suppressBaseShift: "\\stackrel" !== a,
        body: D(c),
      };
      return {
        type: "supsub",
        mode: b.mode,
        base: c,
        sup: "\\underset" === a ? null : b,
        sub: "\\underset" === a ? b : null,
      };
    },
    mathmlBuilder: Pa,
  });
  const oa = (a, b, c) => {
    if (!a) return c;
    a = A(a, b);
    return "mrow" === a.type && 0 === a.children.length ? c : a;
  };
  q({
    type: "multiscript",
    names: ["\\sideset", "\\pres@cript"],
    props: { numArgs: 3 },
    handler({ parser: a, funcName: b, token: c }, e) {
      if (0 === e[2].body.length)
        throw new p(b + "cannot parse an empty base.");
      const f = e[2].body[0];
      if (a.settings.strict && "\\sideset" === b && !f.symbol)
        throw new p(
          "The base of \\sideset must be a big operator. Try \\prescript."
        );
      if (
        (0 < e[0].body.length && "supsub" !== e[0].body[0].type) ||
        (0 < e[1].body.length && "supsub" !== e[1].body[0].type)
      )
        throw new p(
          "\\sideset can parse only subscripts and superscripts in its first two arguments",
          c
        );
      c = 0 < e[0].body.length ? e[0].body[0] : null;
      e = 0 < e[1].body.length ? e[1].body[0] : null;
      return c || e
        ? c
          ? {
              type: "multiscript",
              mode: a.mode,
              isSideset: "\\sideset" === b,
              prescripts: c,
              postscripts: e,
              base: f,
            }
          : {
              type: "styling",
              mode: a.mode,
              scriptLevel: "text",
              body: [
                {
                  type: "supsub",
                  mode: a.mode,
                  base: f,
                  sup: e.sup,
                  sub: e.sub,
                },
              ],
            }
        : f;
    },
    mathmlBuilder(a, b) {
      var c = A(a.base, b);
      const e = new l.MathNode("mprescripts"),
        f = new l.MathNode("none"),
        g = oa(a.prescripts.sub, b, f),
        m = oa(a.prescripts.sup, b, f);
      a.isSideset &&
        (g.setAttribute("style", "text-align: left;"),
        m.setAttribute("style", "text-align: left;"));
      if (a.postscripts) {
        const n = oa(a.postscripts.sub, b, f);
        a = oa(a.postscripts.sup, b, f);
        c = [c, n, a, e, g, m];
      } else c = [c, e, g, m];
      return new l.MathNode("mmultiscripts", c);
    },
  });
  q({
    type: "not",
    names: ["\\not"],
    props: { numArgs: 1, primitive: !0, allowedInText: !1 },
    handler({ parser: a }, b) {
      const c = y.isCharacterBox(b[0]);
      c
        ? ((b = D(b[0])),
          "\\" === b[0].text.charAt(0) &&
            (b[0].text = F.math[b[0].text].replace),
          (b[0].text = b[0].text.slice(0, 1) + "\u0338" + b[0].text.slice(1)))
        : (b = [
            { type: "textord", mode: "math", text: "\u0338" },
            {
              type: "kern",
              mode: "math",
              dimension: { number: -0.6, unit: "em" },
            },
            b[0],
          ]);
      return { type: "not", mode: a.mode, body: b, isCharacterBox: c };
    },
    mathmlBuilder(a, b) {
      return a.isCharacterBox ? C(a.body, b)[0] : M(C(a.body, b, !0));
    },
  });
  const hc = ["textord", "mathord", "atom"],
    ic = ["\\smallint"],
    Ca = ["textord", "mathord", "ordgroup", "close", "leftright"],
    ba = (a, b) => {
      a.symbol
        ? ((b = new L("mo", [J(a.name, a.mode)])),
          ic.includes(a.name)
            ? b.setAttribute("largeop", "false")
            : b.setAttribute("movablelimits", "false"))
        : (b = ["\\mathop", "\\stackrel", "\\overset", "\\underset"].includes(
            a.name
          )
            ? new L("mrow", C(a.body, b))
            : a.body
            ? new L("mo", C(a.body, b))
            : new L("mi", [new Qa(a.name.slice(1))]));
      return b;
    },
    jc = {
      "\u220f": "\\prod",
      "\u2210": "\\coprod",
      "\u2211": "\\sum",
      "\u22c0": "\\bigwedge",
      "\u22c1": "\\bigvee",
      "\u22c2": "\\bigcap",
      "\u22c3": "\\bigcup",
      "\u2a00": "\\bigodot",
      "\u2a01": "\\bigoplus",
      "\u2a02": "\\bigotimes",
      "\u2a04": "\\biguplus",
      "\u2a05": "\\bigsqcap",
      "\u2a06": "\\bigsqcup",
    };
  q({
    type: "op",
    names:
      "\\coprod \\bigvee \\bigwedge \\biguplus \\bigcap \\bigcup \\intop \\prod \\sum \\bigotimes \\bigoplus \\bigodot \\bigsqcap \\bigsqcup \\smallint \u220f \u2210 \u2211 \u22c0 \u22c1 \u22c2 \u22c3 \u2a00 \u2a01 \u2a02 \u2a04 \u2a06".split(
        " "
      ),
    props: { numArgs: 0 },
    handler: ({ parser: a, funcName: b }, c) => {
      1 === b.length && (b = jc[b]);
      return {
        type: "op",
        mode: a.mode,
        limits: a.settings.bigOpDefLimits,
        alwaysHandleSupSub: !0,
        parentIsSupSub: !1,
        symbol: !0,
        stack: !1,
        name: b,
      };
    },
    mathmlBuilder: ba,
  });
  q({
    type: "op",
    names: ["\\mathop"],
    props: { numArgs: 1, primitive: !0 },
    handler: ({ parser: a }, b) => {
      b = b[0];
      const c = b.body ? b.body : [b],
        e = 1 === c.length && hc.includes(c[0].type);
      return {
        type: "op",
        mode: a.mode,
        limits: a.settings.mathOpDefLimits,
        parentIsSupSub: !1,
        symbol: e,
        stack: !1,
        name: e ? c[0].text : null,
        body: e ? null : D(b),
      };
    },
    mathmlBuilder: ba,
  });
  const kc = {
    "\u222b": "\\int",
    "\u222c": "\\iint",
    "\u222d": "\\iiint",
    "\u222e": "\\oint",
    "\u222f": "\\oiint",
    "\u2230": "\\oiiint",
    "\u2231": "\\intclockwise",
    "\u2232": "\\varointclockwise",
    "\u2a0c": "\\iiiint",
    "\u2a0d": "\\intbar",
    "\u2a0e": "\\intBar",
    "\u2a0f": "\\fint",
    "\u2a12": "\\rppolint",
    "\u2a13": "\\scpolint",
    "\u2a15": "\\pointint",
    "\u2a16": "\\sqint",
    "\u2a17": "\\intlarhk",
    "\u2a18": "\\intx",
    "\u2a19": "\\intcap",
    "\u2a1a": "\\intcup",
  };
  q({
    type: "op",
    names:
      "\\arcsin \\arccos \\arctan \\arctg \\arcctg \\arg \\ch \\cos \\cosec \\cosh \\cot \\cotg \\coth \\csc \\ctg \\cth \\deg \\dim \\exp \\hom \\ker \\lg \\ln \\log \\sec \\sin \\sinh \\sh \\sgn \\tan \\tanh \\tg \\th".split(
        " "
      ),
    props: { numArgs: 0 },
    handler({ parser: a, funcName: b }) {
      const c = a.prevAtomType,
        e = a.gullet.future().text;
      return {
        type: "op",
        mode: a.mode,
        limits: a.settings.trigoOpDefLimits,
        parentIsSupSub: !1,
        symbol: !1,
        stack: !1,
        isFollowedByDelimiter: na(e),
        needsLeadingSpace: 0 < c.length && Ca.includes(c),
        name: b,
      };
    },
    mathmlBuilder: ba,
  });
  q({
    type: "op",
    names: "\\det \\gcd \\inf \\lim \\max \\min \\Pr \\sup".split(" "),
    props: { numArgs: 0 },
    handler({ parser: a, funcName: b }) {
      const c = a.prevAtomType,
        e = a.gullet.future().text;
      return {
        type: "op",
        mode: a.mode,
        limits: a.settings.limOpDefLimits,
        alwaysHandleSupSub: !0,
        parentIsSupSub: !1,
        symbol: !1,
        stack: !1,
        isFollowedByDelimiter: na(e),
        needsLeadingSpace: 0 < c.length && Ca.includes(c),
        name: b,
      };
    },
    mathmlBuilder: ba,
  });
  q({
    type: "op",
    names:
      "\\int \\iint \\iiint \\iiiint \\oint \\oiint \\oiiint \\intclockwise \\varointclockwise \\intbar \\intBar \\fint \\rppolint \\scpolint \\pointint \\sqint \\intlarhk \\intx \\intcap \\intcup \u222b \u222c \u222d \u222e \u222f \u2230 \u2231 \u2232 \u2a0c \u2a0d \u2a0e \u2a0f \u2a12 \u2a13 \u2a15 \u2a16 \u2a17 \u2a18 \u2a19 \u2a1a".split(
        " "
      ),
    props: { numArgs: 0 },
    handler({ parser: a, funcName: b }) {
      1 === b.length && (b = kc[b]);
      return {
        type: "op",
        mode: a.mode,
        limits: a.settings.intOpDefLimits,
        parentIsSupSub: !1,
        symbol: !0,
        stack: !1,
        name: b,
      };
    },
    mathmlBuilder: ba,
  });
  const h = {};
  q({
    type: "operatorname",
    names: ["\\operatorname@", "\\operatornamewithlimits"],
    props: { numArgs: 1, allowedInArgument: !0 },
    handler: ({ parser: a, funcName: b }, c) => {
      c = c[0];
      const e = a.prevAtomType,
        f = a.gullet.future().text;
      return {
        type: "operatorname",
        mode: a.mode,
        body: D(c),
        alwaysHandleSupSub: "\\operatornamewithlimits" === b,
        limits: !1,
        parentIsSupSub: !1,
        isFollowedByDelimiter: na(f),
        needsLeadingSpace: 0 < e.length && Ca.includes(e),
      };
    },
    mathmlBuilder: (a, b) => {
      b = C(a.body, b.withFont("mathrm"));
      var c = !0;
      for (let f = 0; f < b.length; f++) {
        var e = b[f];
        if (e instanceof l.MathNode)
          switch (
            ("mrow" === e.type &&
              1 === e.children.length &&
              e.children[0] instanceof l.MathNode &&
              (e = e.children[0]),
            e.type)
          ) {
            case "mi":
            case "mn":
            case "ms":
            case "mtext":
              break;
            case "mspace":
              e.attributes.width &&
                ((e = e.attributes.width.replace("em", "")),
                (e = kb(Number(e))),
                "" === e
                  ? (c = !1)
                  : (b[f] = new l.MathNode("mtext", [new l.TextNode(e)])));
              break;
            case "mo":
              const g = e.children[0];
              1 === e.children.length && g instanceof l.TextNode
                ? (g.text = g.text
                    .replace(/\u2212/, "-")
                    .replace(/\u2217/, "*"))
                : (c = !1);
              break;
            default:
              c = !1;
          }
        else c = !1;
      }
      if (c) (b = b.map((f) => f.toText()).join("")), (b = [new l.TextNode(b)]);
      else if (
        1 === b.length &&
        ["mover", "munder"].includes(b[0].type) &&
        ("mi" === b[0].children[0].type || "mtext" === b[0].children[0].type)
      ) {
        b[0].children[0].type = "mi";
        if (a.parentIsSupSub) return new l.MathNode("mrow", b);
        a = new l.MathNode("mo", [J("\u2061", "text")]);
        return l.newDocumentFragment([b[0], a]);
      }
      c
        ? ((c = new l.MathNode("mi", b)),
          1 === b[0].text.length && c.setAttribute("mathvariant", "normal"))
        : (c = new l.MathNode("mrow", b));
      return a.parentIsSupSub
        ? c
        : ((b = new l.MathNode("mo", [J("\u2061", "text")])),
          (b = [c, b]),
          a.needsLeadingSpace &&
            ((c = new l.MathNode("mspace")),
            c.setAttribute("width", "0.1667em"),
            b.unshift(c)),
          a.isFollowedByDelimiter ||
            ((a = new l.MathNode("mspace")),
            a.setAttribute("width", "0.1667em"),
            b.push(a)),
          l.newDocumentFragment(b));
    },
  });
  h["\\operatorname"] = "\\@ifstar\\operatornamewithlimits\\operatorname@";
  S({
    type: "ordgroup",
    mathmlBuilder(a, b) {
      return M(C(a.body, b, !0));
    },
  });
  q({
    type: "phantom",
    names: ["\\phantom"],
    props: { numArgs: 1, allowedInText: !0 },
    handler: ({ parser: a }, b) => ({
      type: "phantom",
      mode: a.mode,
      body: D(b[0]),
    }),
    mathmlBuilder: (a, b) => {
      a = C(a.body, b);
      return new l.MathNode("mphantom", a);
    },
  });
  q({
    type: "hphantom",
    names: ["\\hphantom"],
    props: { numArgs: 1, allowedInText: !0 },
    handler: ({ parser: a }, b) => ({
      type: "hphantom",
      mode: a.mode,
      body: b[0],
    }),
    mathmlBuilder: (a, b) => {
      a = C(D(a.body), b);
      a = new l.MathNode("mphantom", a);
      a = new l.MathNode("mpadded", [a]);
      a.setAttribute("height", "0px");
      a.setAttribute("depth", "0px");
      return a;
    },
  });
  q({
    type: "vphantom",
    names: ["\\vphantom"],
    props: { numArgs: 1, allowedInText: !0 },
    handler: ({ parser: a }, b) => ({
      type: "vphantom",
      mode: a.mode,
      body: b[0],
    }),
    mathmlBuilder: (a, b) => {
      a = C(D(a.body), b);
      a = new l.MathNode("mphantom", a);
      a = new l.MathNode("mpadded", [a]);
      a.setAttribute("width", "0px");
      return a;
    },
  });
  q({
    type: "pmb",
    names: ["\\pmb"],
    props: { numArgs: 1, allowedInText: !0 },
    handler({ parser: a }, b) {
      return { type: "pmb", mode: a.mode, body: D(b[0]) };
    },
    mathmlBuilder(a, b) {
      a = C(a.body, b);
      a = ia(a);
      a.setAttribute("style", "font-weight:bold");
      return a;
    },
  });
  const mb = (a, b) => {
    var c = b.withLevel(1);
    c = new l.MathNode("mpadded", [A(a.body, c)]);
    a = P(a.dy, b);
    c.setAttribute("voffset", a.number + a.unit);
    b = Math.abs(a.number);
    c.setAttribute("height", (0 <= a.number ? "+" : "-") + b + a.unit);
    c.setAttribute("depth", (0 <= -a.number ? "+" : "-") + b + a.unit);
    return c;
  };
  q({
    type: "raise",
    names: ["\\raise", "\\lower"],
    props: { numArgs: 2, argTypes: ["size", "primitive"], primitive: !0 },
    handler({ parser: a, funcName: b }, c) {
      const e = w(c[0], "size").value;
      "\\lower" === b && (e.number *= -1);
      return { type: "raise", mode: a.mode, dy: e, body: c[1] };
    },
    mathmlBuilder: mb,
  });
  q({
    type: "raise",
    names: ["\\raisebox"],
    props: { numArgs: 2, argTypes: ["size", "hbox"], allowedInText: !0 },
    handler({ parser: a }, b) {
      const c = w(b[0], "size").value;
      return { type: "raise", mode: a.mode, dy: c, body: b[1] };
    },
    mathmlBuilder: mb,
  });
  q({
    type: "ref",
    names: ["\\ref", "\\eqref"],
    props: { numArgs: 1, argTypes: ["raw"] },
    handler({ parser: a, funcName: b }, c) {
      return {
        type: "ref",
        mode: a.mode,
        funcName: b,
        string: c[0].string.replace(lb, ""),
      };
    },
    mathmlBuilder(a, b) {
      b = "\\ref" === a.funcName ? ["tml-ref"] : ["tml-ref", "tml-eqref"];
      b = new l.MathNode("mtext", [new l.TextNode("")], b);
      b.setAttribute("href", "#" + a.string);
      return b;
    },
  });
  q({
    type: "internal",
    names: ["\\relax"],
    props: { numArgs: 0, allowedInText: !0 },
    handler({ parser: a }) {
      return { type: "internal", mode: a.mode };
    },
  });
  q({
    type: "rule",
    names: ["\\rule"],
    props: {
      numArgs: 2,
      numOptionalArgs: 1,
      argTypes: ["size", "size", "size"],
    },
    handler({ parser: a }, b, c) {
      c = c[0];
      const e = w(b[0], "size");
      b = w(b[1], "size");
      return {
        type: "rule",
        mode: a.mode,
        shift: c && w(c, "size").value,
        width: e.value,
        height: b.value,
      };
    },
    mathmlBuilder(a, b) {
      var c = P(a.width, b);
      const e = P(a.height, b);
      a = a.shift ? P(a.shift, b) : { number: 0, unit: "em" };
      b = (b.color && b.getColor()) || "black";
      const f = new l.MathNode("mspace");
      0 < c.number && 0 < e.number && f.setAttribute("mathbackground", b);
      f.setAttribute("width", c.number + c.unit);
      f.setAttribute("height", e.number + e.unit);
      if (0 === a.number) return f;
      c = new l.MathNode("mpadded", [f]);
      0 <= a.number
        ? c.setAttribute("height", "+" + a.number + a.unit)
        : (c.setAttribute("height", a.number + a.unit),
          c.setAttribute("depth", "+" + -a.number + a.unit));
      c.setAttribute("voffset", a.number + a.unit);
      return c;
    },
  });
  const nb = {
    "\\tiny": 0.5,
    "\\sixptsize": 0.6,
    "\\Tiny": 0.6,
    "\\scriptsize": 0.7,
    "\\footnotesize": 0.8,
    "\\small": 0.9,
    "\\normalsize": 1,
    "\\large": 1.2,
    "\\Large": 1.44,
    "\\LARGE": 1.728,
    "\\huge": 2.074,
    "\\Huge": 2.488,
  };
  q({
    type: "sizing",
    names:
      "\\tiny \\sixptsize \\Tiny \\scriptsize \\footnotesize \\small \\normalsize \\large \\Large \\LARGE \\huge \\Huge".split(
        " "
      ),
    props: { numArgs: 0, allowedInText: !0 },
    handler: ({ breakOnTokenText: a, funcName: b, parser: c }, e) => {
      c.settings.strict &&
        "math" === c.mode &&
        console.log(
          `Temml strict-mode warning: Command ${b} is invalid in math mode.`
        );
      a = c.parseExpression(!1, a);
      return { type: "sizing", mode: c.mode, funcName: b, body: a };
    },
    mathmlBuilder: (a, b) => {
      var c = b.withFontSize(nb[a.funcName]);
      c = C(a.body, c);
      c = ia(c);
      a = (nb[a.funcName] / b.fontSize).toFixed(4);
      c.setAttribute("mathsize", a + "em");
      return c;
    },
  });
  q({
    type: "smash",
    names: ["\\smash"],
    props: { numArgs: 1, numOptionalArgs: 1, allowedInText: !0 },
    handler: ({ parser: a }, b, c) => {
      let e = !1,
        f = !1;
      if ((c = c[0] && w(c[0], "ordgroup"))) {
        let g;
        for (let m = 0; m < c.body.length; ++m)
          if (((g = c.body[m].text), "t" === g)) e = !0;
          else if ("b" === g) f = !0;
          else {
            f = e = !1;
            break;
          }
      } else f = e = !0;
      return {
        type: "smash",
        mode: a.mode,
        body: b[0],
        smashHeight: e,
        smashDepth: f,
      };
    },
    mathmlBuilder: (a, b) => {
      b = new l.MathNode("mpadded", [A(a.body, b)]);
      a.smashHeight && b.setAttribute("height", "0px");
      a.smashDepth && b.setAttribute("depth", "0px");
      return b;
    },
  });
  q({
    type: "sqrt",
    names: ["\\sqrt"],
    props: { numArgs: 1, numOptionalArgs: 1 },
    handler({ parser: a }, b, c) {
      return { type: "sqrt", mode: a.mode, body: b[0], index: c[0] };
    },
    mathmlBuilder(a, b) {
      const { body: c, index: e } = a;
      return e
        ? new l.MathNode("mroot", [A(c, b), A(e, b.incrementLevel())])
        : new l.MathNode("msqrt", [A(c, b)]);
    },
  });
  const lc = { display: 0, text: 1, script: 2, scriptscript: 3 },
    mc = {
      display: ["0", "true"],
      text: ["0", "false"],
      script: ["1", "false"],
      scriptscript: ["2", "false"],
    };
  q({
    type: "styling",
    names: [
      "\\displaystyle",
      "\\textstyle",
      "\\scriptstyle",
      "\\scriptscriptstyle",
    ],
    props: { numArgs: 0, allowedInText: !0, primitive: !0 },
    handler({ breakOnTokenText: a, funcName: b, parser: c }, e) {
      a = c.parseExpression(!0, a);
      b = b.slice(1, b.length - 5);
      return { type: "styling", mode: c.mode, scriptLevel: b, body: a };
    },
    mathmlBuilder(a, b) {
      b = b.withLevel(lc[a.scriptLevel]);
      b = C(a.body, b);
      b = ia(b);
      a = mc[a.scriptLevel];
      b.setAttribute("scriptlevel", a[0]);
      b.setAttribute("displaystyle", a[1]);
      return b;
    },
  });
  const nc = /^m(over|under|underover)$/;
  S({
    type: "supsub",
    mathmlBuilder(a, b) {
      let c = !1,
        e;
      if (a.base && "horizBrace" === a.base.type) {
        var f = !!a.sup;
        f === a.base.isOver && ((c = !0), (e = a.base.isOver));
      }
      !a.base ||
        a.base.stack ||
        ("op" !== a.base.type && "operatorname" !== a.base.type) ||
        (a.base.parentIsSupSub = !0);
      f = [A(a.base, b)];
      const g = b.inSubOrSup();
      a.sub && f.push(A(a.sub, g));
      a.sup && f.push(A(a.sup, g));
      b = c
        ? e
          ? "mover"
          : "munder"
        : a.sub
        ? a.sup
          ? (a = a.base) &&
            (("op" === a.type && a.limits) || "multiscript" === a.type) &&
            (0 === b.level || a.alwaysHandleSupSub)
            ? "munderover"
            : a &&
              "operatorname" === a.type &&
              a.alwaysHandleSupSub &&
              (0 === b.level || a.limits)
            ? "munderover"
            : "msubsup"
          : (a = a.base) &&
            "op" === a.type &&
            a.limits &&
            (0 === b.level || a.alwaysHandleSupSub)
          ? "munder"
          : a &&
            "operatorname" === a.type &&
            a.alwaysHandleSupSub &&
            (a.limits || 0 === b.level)
          ? "munder"
          : "msub"
        : (a = a.base) &&
          "op" === a.type &&
          a.limits &&
          (0 === b.level || a.alwaysHandleSupSub)
        ? "mover"
        : a &&
          "operatorname" === a.type &&
          a.alwaysHandleSupSub &&
          (a.limits || 0 === b.level)
        ? "mover"
        : "msup";
      f = new l.MathNode(b, f);
      nc.test(b) && (f = new l.MathNode("mrow", [f]));
      return f;
    },
  });
  const oc = [
      "\\shortmid",
      "\\nshortmid",
      "\\shortparallel",
      "\\nshortparallel",
      "\\smallsetminus",
    ],
    pc = ["\\Rsh", "\\Lsh", "\\restriction"];
  S({
    type: "atom",
    mathmlBuilder(a, b) {
      b = new l.MathNode("mo", [J(a.text, a.mode)]);
      if ("punct" === a.family) b.setAttribute("separator", "true");
      else if ("open" === a.family || "close" === a.family)
        "open" === a.family
          ? (b.setAttribute("form", "prefix"),
            b.setAttribute("stretchy", "false"))
          : "close" === a.family &&
            (b.setAttribute("form", "postfix"),
            b.setAttribute("stretchy", "false"));
      else if ("\\mid" === a.text)
        b.setAttribute("lspace", "0.22em"),
          b.setAttribute("rspace", "0.22em"),
          b.setAttribute("stretchy", "false");
      else {
        var c;
        if ((c = "rel" === a.family))
          (c = a.text),
            1 === c.length
              ? ((c = c.codePointAt(0)), (c = 8591 < c && 8704 > c))
              : (c =
                  -1 < c.indexOf("arrow") ||
                  -1 < c.indexOf("harpoon") ||
                  pc.includes(c));
        c
          ? b.setAttribute("stretchy", "false")
          : oc.includes(a.text)
          ? b.setAttribute("mathsize", "70%")
          : ":" === a.text &&
            ((b.attributes.lspace = "0.2222em"),
            (b.attributes.rspace = "0.2222em"));
      }
      return b;
    },
  });
  const ob = {
      mathbf: "bold",
      mathrm: "normal",
      textit: "italic",
      mathit: "italic",
      mathnormal: "italic",
      mathbb: "double-struck",
      mathcal: "script",
      mathfrak: "fraktur",
      mathscr: "script",
      mathsf: "sans-serif",
      mathtt: "monospace",
    },
    pb = function (a, b) {
      if ("texttt" === b.fontFamily) return "monospace";
      if ("textsc" === b.fontFamily) return "normal";
      if ("textsf" === b.fontFamily)
        return "textit" === b.fontShape && "textbf" === b.fontWeight
          ? "sans-serif-bold-italic"
          : "textit" === b.fontShape
          ? "sans-serif-italic"
          : "textbf" === b.fontWeight
          ? "sans-serif-bold"
          : "sans-serif";
      if ("textit" === b.fontShape && "textbf" === b.fontWeight)
        return "bold-italic";
      if ("textit" === b.fontShape) return "italic";
      if ("textbf" === b.fontWeight) return "bold";
      b = b.font;
      if (!b || "mathnormal" === b) return null;
      switch (b) {
        case "mathit":
          return "italic";
        case "mathrm":
          return (
            (a = a.text.codePointAt(0)),
            939 < a && 975 > a ? "italic" : "normal"
          );
        case "greekItalic":
          return "italic";
        case "up@greek":
          return "normal";
        case "boldsymbol":
        case "mathboldsymbol":
          return "bold-italic";
        case "mathbf":
          return "bold";
        case "mathbb":
          return "double-struck";
        case "mathfrak":
          return "fraktur";
        case "mathscr":
        case "mathcal":
          return "script";
        case "mathsf":
          return "sans-serif";
        case "mathtt":
          return "monospace";
      }
      return Object.prototype.hasOwnProperty.call(ob, b) ? ob[b] : null;
    },
    qb = Object.freeze({
      B: 8426,
      E: 8427,
      F: 8427,
      H: 8387,
      I: 8391,
      L: 8390,
      M: 8422,
      R: 8393,
      e: 8394,
      g: 8355,
      o: 8389,
    }),
    qc = Object.freeze({ C: 8426, H: 8388, I: 8392, R: 8394, Z: 8398 }),
    rc = Object.freeze({
      C: 8383,
      H: 8389,
      N: 8391,
      P: 8393,
      Q: 8393,
      R: 8395,
      Z: 8394,
    }),
    sc = Object.freeze({
      "\u03f5": 119527,
      "\u03d1": 119564,
      "\u03f0": 119534,
      "\u03c6": 119577,
      "\u03f1": 119535,
      "\u03d6": 119563,
    }),
    tc = Object.freeze({
      "\u03f5": 119643,
      "\u03d1": 119680,
      "\u03f0": 119650,
      "\u03c6": 119693,
      "\u03f1": 119651,
      "\u03d6": 119679,
    }),
    rb = Object.freeze({
      "\u03f5": 119701,
      "\u03d1": 119738,
      "\u03f0": 119708,
      "\u03c6": 119751,
      "\u03f1": 119709,
      "\u03d6": 119737,
    }),
    uc = Object.freeze({
      "\u03f5": 119759,
      "\u03d1": 119796,
      "\u03f0": 119766,
      "\u03c6": 119809,
      "\u03f1": 119767,
      "\u03d6": 119795,
    });
  Object.freeze({
    upperCaseLatin: {
      normal: (a) => 0,
      bold: (a) => 119743,
      italic: (a) => 119795,
      "bold-italic": (a) => 119847,
      script: (a) => qb[a] || 119899,
      "script-bold": (a) => 119951,
      fraktur: (a) => qc[a] || 120003,
      "fraktur-bold": (a) => 120107,
      "double-struck": (a) => rc[a] || 120055,
      "sans-serif": (a) => 120159,
      "sans-serif-bold": (a) => 120211,
      "sans-serif-italic": (a) => 120263,
      "sans-serif-bold-italic": (a) => 120380,
      monospace: (a) => 120367,
    },
    lowerCaseLatin: {
      normal: (a) => 0,
      bold: (a) => 119737,
      italic: (a) => ("h" === a ? 8358 : 119789),
      "bold-italic": (a) => 119841,
      script: (a) => qb[a] || 119893,
      "script-bold": (a) => 119945,
      fraktur: (a) => 119997,
      "fraktur-bold": (a) => 120101,
      "double-struck": (a) => 120049,
      "sans-serif": (a) => 120153,
      "sans-serif-bold": (a) => 120205,
      "sans-serif-italic": (a) => 120257,
      "sans-serif-bold-italic": (a) => 120309,
      monospace: (a) => 120361,
    },
    upperCaseGreek: {
      normal: (a) => 0,
      bold: (a) => ("\u2207" === a ? 111802 : 119575),
      italic: (a) => ("\u2207" === a ? 111860 : 119633),
      "bold-italic": (a) => ("\u2207" === a ? 111802 : 119575),
      script: (a) => 0,
      "script-bold": (a) => 0,
      fraktur: (a) => 0,
      "fraktur-bold": (a) => 0,
      "double-struck": (a) => 0,
      "sans-serif": (a) => ("\u2207" === a ? 111976 : 119749),
      "sans-serif-bold": (a) => ("\u2207" === a ? 111976 : 119749),
      "sans-serif-italic": (a) => 0,
      "sans-serif-bold-italic": (a) => ("\u2207" === a ? 112034 : 119807),
      monospace: (a) => 0,
    },
    lowerCaseGreek: {
      normal: (a) => 0,
      bold: (a) => 119569,
      italic: (a) => 119627,
      "bold-italic": (a) => ("\u03d5" === a ? 119678 : 119685),
      script: (a) => 0,
      "script-bold": (a) => 0,
      fraktur: (a) => 0,
      "fraktur-bold": (a) => 0,
      "double-struck": (a) => 0,
      "sans-serif": (a) => 119743,
      "sans-serif-bold": (a) => 119743,
      "sans-serif-italic": (a) => 0,
      "sans-serif-bold-italic": (a) => 119801,
      monospace: (a) => 0,
    },
    varGreek: {
      normal: (a) => 0,
      bold: (a) => sc[a] || -51,
      italic: (a) => 0,
      "bold-italic": (a) => tc[a] || 58,
      script: (a) => 0,
      "script-bold": (a) => 0,
      fraktur: (a) => 0,
      "fraktur-bold": (a) => 0,
      "double-struck": (a) => 0,
      "sans-serif": (a) => rb[a] || 116,
      "sans-serif-bold": (a) => rb[a] || 116,
      "sans-serif-italic": (a) => 0,
      "sans-serif-bold-italic": (a) => uc[a] || 174,
      monospace: (a) => 0,
    },
    numeral: {
      normal: (a) => 0,
      bold: (a) => 120734,
      italic: (a) => 0,
      "bold-italic": (a) => 0,
      script: (a) => 0,
      "script-bold": (a) => 0,
      fraktur: (a) => 0,
      "fraktur-bold": (a) => 0,
      "double-struck": (a) => 120744,
      "sans-serif": (a) => 120754,
      "sans-serif-bold": (a) => 120764,
      "sans-serif-italic": (a) => 0,
      "sans-serif-bold-italic": (a) => 0,
      monospace: (a) => 120774,
    },
  });
  const pa = (a, b) => {
      a.codePointAt(0);
      return a;
    },
    vc = Object.freeze({
      a: "\u1d00",
      b: "\u0299",
      c: "\u1d04",
      d: "\u1d05",
      e: "\u1d07",
      f: "\ua730",
      g: "\u0262",
      h: "\u029c",
      i: "\u026a",
      j: "\u1d0a",
      k: "\u1d0b",
      l: "\u029f",
      m: "\u1d0d",
      n: "\u0274",
      o: "\u1d0f",
      p: "\u1d18",
      q: "\u01eb",
      r: "\u0280",
      s: "s",
      t: "\u1d1b",
      u: "\u1d1c",
      v: "\u1d20",
      w: "\u1d21",
      x: "x",
      y: "\u028f",
      z: "\u1d22",
    }),
    wc = /^\d(?:[\d,.]*\d)?$/,
    xc = /[A-Ba-z]/,
    yc = (a, b, c) => {
      a = new l.MathNode(c, [a]);
      a = new l.MathNode("mstyle", [a]);
      a.style["font-style"] = "italic";
      a.style["font-family"] = "Cambria, 'Times New Roman', serif";
      "bold-italic" === b && (a.style["font-weight"] = "bold");
      return a;
    };
  S({
    type: "mathord",
    mathmlBuilder(a, b) {
      const c = J(a.text, a.mode, b);
      c.text.codePointAt(0);
      a = pb(a, b) || "italic";
      "italic" !== a &&
        "fraktur" !== a &&
        "script" !== a &&
        "double-struck" !== a &&
        (c.text = pa(c.text, a));
      b = new l.MathNode("mi", [c]);
      "normal" === a
        ? (b.setAttribute("mathvariant", "normal"),
          1 === c.text.length && (b = new l.MathNode("mrow", [b])))
        : "double-struck" === a || "script" === a || "fraktur" === a
        ? b.setAttribute("mathvariant", a)
        : "italic" != a && b.setAttribute("mathvariant", a);
      return b;
    },
  });
  S({
    type: "textord",
    mathmlBuilder(a, b) {
      var c = a.text;
      const e = c.codePointAt(0);
      "textsc" === b.fontFamily && 96 < e && 123 > e && (c = vc[c]);
      c = J(c, a.mode, b);
      const f = pb(a, b) || "normal";
      if (wc.test(a.text)) {
        a = "text" === a.mode ? "mtext" : "mn";
        if ("italic" === f || "bold-italic" === f) return yc(c, f, a);
        "normal" !== f &&
          (c.text = c.text
            .split("")
            .map((g) => pa(g, f))
            .join(""));
        a = new l.MathNode(a, [c]);
      } else
        "text" === a.mode
          ? ("normal" !== f && (c.text = pa(c.text, f)),
            (a = new l.MathNode("mtext", [c])))
          : "\\prime" === a.text
          ? ((a = new l.MathNode("mo", [c])), a.classes.push("tml-prime"))
          : ((b = c.text),
            "italic" !== f && (c.text = pa(c.text, f)),
            (a = new l.MathNode("mi", [c])),
            c.text === b &&
              xc.test(b) &&
              a.setAttribute("mathvariant", "italic"));
      return a;
    },
  });
  const zc = { "\\nobreak": "nobreak", "\\allowbreak": "allowbreak" },
    Ac = {
      " ": {},
      "\\ ": {},
      "~": { className: "nobreak" },
      "\\space": {},
      "\\nobreakspace": { className: "nobreak" },
    };
  S({
    type: "spacing",
    mathmlBuilder(a, b) {
      if (Object.prototype.hasOwnProperty.call(Ac, a.text))
        b = new l.MathNode("mtext", [new l.TextNode("\u00a0")]);
      else if (Object.prototype.hasOwnProperty.call(zc, a.text))
        (b = new l.MathNode("mo")),
          "\\nobreak" === a.text && b.setAttribute("linebreak", "nobreak");
      else throw new p(`Unknown type of space "${a.text}"`);
      return b;
    },
  });
  S({ type: "tag" });
  const sb = {
      "\\text": void 0,
      "\\textrm": "textrm",
      "\\textsf": "textsf",
      "\\texttt": "texttt",
      "\\textnormal": "textrm",
      "\\textsc": "textsc",
    },
    tb = { "\\textbf": "textbf", "\\textmd": "textmd" },
    Bc = { "\\textit": "textit", "\\textup": "textup" };
  q({
    type: "text",
    names:
      "\\text \\textrm \\textsf \\texttt \\textnormal \\textsc \\textbf \\textmd \\textit \\textup".split(
        " "
      ),
    props: {
      numArgs: 1,
      argTypes: ["text"],
      allowedInArgument: !0,
      allowedInText: !0,
    },
    handler({ parser: a, funcName: b }, c) {
      return { type: "text", mode: a.mode, body: D(c[0]), font: b };
    },
    mathmlBuilder(a, b) {
      const c = a.font;
      b = c
        ? sb[c]
          ? b.withTextFontFamily(sb[c])
          : tb[c]
          ? b.withTextFontWeight(tb[c])
          : b.withTextFontShape(Bc[c])
        : b;
      a = M(C(a.body, b, void 0));
      return Ra(a);
    },
  });
  q({
    type: "verb",
    names: ["\\verb"],
    props: { numArgs: 0, allowedInText: !0 },
    handler(a, b, c) {
      throw new p("\\verb ended by end of line instead of matching delimiter");
    },
    mathmlBuilder(a, b) {
      a = new l.TextNode(a.body.replace(/ /g, a.star ? "\u2423" : "\u00a0"));
      a = new l.MathNode("mtext", [a]);
      a.setAttribute("mathvariant", "monospace");
      return a;
    },
  });
  const V = ta;
  class H {
    constructor(a, b, c) {
      this.lexer = a;
      this.start = b;
      this.end = c;
    }
    static range(a, b) {
      return b
        ? a && a.loc && b.loc && a.loc.lexer === b.loc.lexer
          ? new H(a.loc.lexer, a.loc.start, b.loc.end)
          : null
        : a && a.loc;
    }
  }
  class R {
    constructor(a, b) {
      this.text = a;
      this.loc = b;
    }
    range(a, b) {
      return new R(b, H.range(this, a));
    }
  }
  const Cc = RegExp("[\u0300-\u036f]+$");
  class ub {
    constructor(a, b) {
      this.input = a;
      this.settings = b;
      this.tokenRegex = RegExp(
        "([ \r\n\t]+)|\\\\(\n|[ \r\t]+\n?)[ \r\t]*|([!-\\[\\]-\u2027\u202a-\ud7ff\uf900-\uffff][\u0300-\u036f]*|[\ud800-\udbff][\udc00-\udfff][\u0300-\u036f]*|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5|(\\\\[a-zA-Z@]+)[ \r\n\t]*|\\\\[^\ud800-\udfff])",
        "g"
      );
      this.catcodes = { "%": 14, "~": 13 };
    }
    setCatcode(a, b) {
      this.catcodes[a] = b;
    }
    lex() {
      const a = this.input;
      var b = this.tokenRegex.lastIndex;
      if (b === a.length) return new R("EOF", new H(this, b, b));
      var c = this.tokenRegex.exec(a);
      if (null === c || c.index !== b)
        throw new p(
          `Unexpected character: '${a[b]}'`,
          new R(a[b], new H(this, b, b + 1))
        );
      c = c[6] || c[3] || (c[2] ? "\\ " : " ");
      if (14 === this.catcodes[c]) {
        b = a.indexOf("\n", this.tokenRegex.lastIndex);
        if (-1 === b) {
          if (((this.tokenRegex.lastIndex = a.length), this.settings.strict))
            throw new p(
              "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode"
            );
        } else this.tokenRegex.lastIndex = b + 1;
        return this.lex();
      }
      return new R(c, new H(this, b, this.tokenRegex.lastIndex));
    }
  }
  class Dc {
    constructor(a = {}, b = {}) {
      this.current = b;
      this.builtins = a;
      this.undefStack = [];
    }
    beginGroup() {
      this.undefStack.push({});
    }
    endGroup() {
      if (0 === this.undefStack.length)
        throw new p(
          "Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug"
        );
      const a = this.undefStack.pop();
      for (const b in a)
        Object.prototype.hasOwnProperty.call(a, b) &&
          (void 0 === a[b] ? delete this.current[b] : (this.current[b] = a[b]));
    }
    has(a) {
      return (
        Object.prototype.hasOwnProperty.call(this.current, a) ||
        Object.prototype.hasOwnProperty.call(this.builtins, a)
      );
    }
    get(a) {
      return Object.prototype.hasOwnProperty.call(this.current, a)
        ? this.current[a]
        : this.builtins[a];
    }
    set(a, b, c = !1) {
      if (c) {
        for (c = 0; c < this.undefStack.length; c++)
          delete this.undefStack[c][a];
        0 < this.undefStack.length &&
          (this.undefStack[this.undefStack.length - 1][a] = b);
      } else
        (c = this.undefStack[this.undefStack.length - 1]) &&
          !Object.prototype.hasOwnProperty.call(c, a) &&
          (c[a] = this.current[a]);
      this.current[a] = b;
    }
  }
  const Ec = h;
  E("\\noexpand", function (a) {
    const b = a.popToken();
    a.isExpandable(b.text) && ((b.noexpand = !0), (b.treatAsRelax = !0));
    return { tokens: [b], numArgs: 0 };
  });
  E("\\expandafter", function (a) {
    const b = a.popToken();
    a.expandOnce(!0);
    return { tokens: [b], numArgs: 0 };
  });
  E("\\@firstoftwo", function (a) {
    return { tokens: a.consumeArgs(2)[0], numArgs: 0 };
  });
  E("\\@secondoftwo", function (a) {
    return { tokens: a.consumeArgs(2)[1], numArgs: 0 };
  });
  E("\\@ifnextchar", function (a) {
    const b = a.consumeArgs(3);
    a.consumeSpaces();
    a = a.future();
    return 1 === b[0].length && b[0][0].text === a.text
      ? { tokens: b[1], numArgs: 0 }
      : { tokens: b[2], numArgs: 0 };
  });
  h["\\@ifstar"] = "\\@ifnextchar *{\\@firstoftwo{#1}}";
  E("\\TextOrMath", function (a) {
    const b = a.consumeArgs(2);
    return "text" === a.mode
      ? { tokens: b[0], numArgs: 0 }
      : { tokens: b[1], numArgs: 0 };
  });
  const Fc = (a) => {
      let b = "";
      for (let c = a.length - 1; -1 < c; c--) b += a[c].text;
      return b;
    },
    Da = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15,
    },
    vb = (a) => {
      a = a.future().text;
      return "EOF" === a ? [null, ""] : [Da[a.charAt(0)], a];
    },
    wb = (a, b, c) => {
      for (let e = 1; e < b.length; e++) {
        const f = Da[b.charAt(e)];
        a *= c;
        a += f;
      }
      return a;
    };
  E("\\char", function (a) {
    var b = a.popToken();
    let c,
      e = "";
    if ("'" === b.text) (c = 8), (b = a.popToken());
    else if ('"' === b.text) (c = 16), (b = a.popToken());
    else if ("`" === b.text)
      if (((b = a.popToken()), "\\" === b.text[0])) e = b.text.charCodeAt(1);
      else {
        if ("EOF" === b.text) throw new p("\\char` missing argument");
        e = b.text.charCodeAt(0);
      }
    else c = 10;
    if (c) {
      let f = b.text;
      e = Da[f.charAt(0)];
      if (null == e || e >= c) throw new p(`Invalid base-${c} digit ${b.text}`);
      e = wb(e, f, c);
      for ([b, f] = vb(a); null != b && b < c; )
        (e *= c), (e += b), (e = wb(e, f, c)), a.popToken(), ([b, f] = vb(a));
    }
    return `\\@char{${e}}`;
  });
  h["\\surd"] = "\\sqrt{\\vphantom{|}}";
  h["\\hbox"] = "\\text{#1}";
  h["/"] = "{\u2044}";
  h["\\long"] = "";
  h["\\bgroup"] = "{";
  h["\\egroup"] = "}";
  h["~"] = "\\nobreakspace";
  h["\\lq"] = "`";
  h["\\rq"] = "'";
  h["\\aa"] = "\\r a";
  h["\\Bbbk"] = "\\Bbb{k}";
  h["\\mathstrut"] = "\\vphantom{(}";
  h["\\underbar"] = "\\underline{\\text{#1}}";
  h["\\vdots"] = "{\\varvdots\\rule{0pt}{15pt}}";
  h["\u22ee"] = "\\vdots";
  h["\\substack"] = "\\begin{subarray}{c}#1\\end{subarray}";
  h["\\boxed"] = "\\fbox{$\\displaystyle{#1}$}";
  h["\\iff"] = "\\DOTSB\\;\\Longleftrightarrow\\;";
  h["\\implies"] = "\\DOTSB\\;\\Longrightarrow\\;";
  h["\\impliedby"] = "\\DOTSB\\;\\Longleftarrow\\;";
  const xb = {
    ",": "\\dotsc",
    "\\not": "\\dotsb",
    "+": "\\dotsb",
    "=": "\\dotsb",
    "<": "\\dotsb",
    ">": "\\dotsb",
    "-": "\\dotsb",
    "*": "\\dotsb",
    ":": "\\dotsb",
    "\\DOTSB": "\\dotsb",
    "\\coprod": "\\dotsb",
    "\\bigvee": "\\dotsb",
    "\\bigwedge": "\\dotsb",
    "\\biguplus": "\\dotsb",
    "\\bigcap": "\\dotsb",
    "\\bigcup": "\\dotsb",
    "\\prod": "\\dotsb",
    "\\sum": "\\dotsb",
    "\\bigotimes": "\\dotsb",
    "\\bigoplus": "\\dotsb",
    "\\bigodot": "\\dotsb",
    "\\bigsqcap": "\\dotsb",
    "\\bigsqcup": "\\dotsb",
    "\\And": "\\dotsb",
    "\\longrightarrow": "\\dotsb",
    "\\Longrightarrow": "\\dotsb",
    "\\longleftarrow": "\\dotsb",
    "\\Longleftarrow": "\\dotsb",
    "\\longleftrightarrow": "\\dotsb",
    "\\Longleftrightarrow": "\\dotsb",
    "\\mapsto": "\\dotsb",
    "\\longmapsto": "\\dotsb",
    "\\hookrightarrow": "\\dotsb",
    "\\doteq": "\\dotsb",
    "\\mathbin": "\\dotsb",
    "\\mathrel": "\\dotsb",
    "\\relbar": "\\dotsb",
    "\\Relbar": "\\dotsb",
    "\\xrightarrow": "\\dotsb",
    "\\xleftarrow": "\\dotsb",
    "\\DOTSI": "\\dotsi",
    "\\int": "\\dotsi",
    "\\oint": "\\dotsi",
    "\\iint": "\\dotsi",
    "\\iiint": "\\dotsi",
    "\\iiiint": "\\dotsi",
    "\\idotsint": "\\dotsi",
    "\\DOTSX": "\\dotsx",
  };
  E("\\dots", function (a) {
    let b = "\\dotso";
    a = a.expandAfterFuture().text;
    a in xb
      ? (b = xb[a])
      : "\\not" === a.slice(0, 4)
      ? (b = "\\dotsb")
      : a in F.math &&
        ["bin", "rel"].includes(F.math[a].group) &&
        (b = "\\dotsb");
    return b;
  });
  const Ea = {
    ")": !0,
    "]": !0,
    "\\rbrack": !0,
    "\\}": !0,
    "\\rbrace": !0,
    "\\rangle": !0,
    "\\rceil": !0,
    "\\rfloor": !0,
    "\\rgroup": !0,
    "\\rmoustache": !0,
    "\\right": !0,
    "\\bigr": !0,
    "\\biggr": !0,
    "\\Bigr": !0,
    "\\Biggr": !0,
    $: !0,
    ";": !0,
    ".": !0,
    ",": !0,
  };
  E("\\dotso", function (a) {
    return a.future().text in Ea ? "\\ldots\\," : "\\ldots";
  });
  E("\\dotsc", function (a) {
    a = a.future().text;
    return a in Ea && "," !== a ? "\\ldots\\," : "\\ldots";
  });
  E("\\cdots", function (a) {
    return a.future().text in Ea ? "\\@cdots\\," : "\\@cdots";
  });
  h["\\dotsb"] = "\\cdots";
  h["\\dotsm"] = "\\cdots";
  h["\\dotsi"] = "\\!\\cdots";
  h["\\idotsint"] = "\\dotsi";
  h["\\dotsx"] = "\\ldots\\,";
  h["\\DOTSI"] = "\\relax";
  h["\\DOTSB"] = "\\relax";
  h["\\DOTSX"] = "\\relax";
  h["\\tmspace"] = "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax";
  h["\\,"] = "{\\tmspace+{3mu}{.1667em}}";
  h["\\thinspace"] = "\\,";
  h["\\>"] = "\\mskip{4mu}";
  h["\\:"] = "{\\tmspace+{4mu}{.2222em}}";
  h["\\medspace"] = "\\:";
  h["\\;"] = "{\\tmspace+{5mu}{.2777em}}";
  h["\\thickspace"] = "\\;";
  h["\\!"] = "{\\tmspace-{3mu}{.1667em}}";
  h["\\negthinspace"] = "\\!";
  h["\\negmedspace"] = "{\\tmspace-{4mu}{.2222em}}";
  h["\\negthickspace"] = "{\\tmspace-{5mu}{.277em}}";
  h["\\enspace"] = "\\kern.5em ";
  h["\\enskip"] = "\\hskip.5em\\relax";
  h["\\quad"] = "\\hskip1em\\relax";
  h["\\qquad"] = "\\hskip2em\\relax";
  h["\\tag"] = "\\@ifstar\\tag@literal\\tag@paren";
  h["\\tag@paren"] = "\\tag@literal{({#1})}";
  E("\\tag@literal", (a) => {
    if (a.macros.get("\\df@tag")) throw new p("Multiple \\tag");
    return "\\def\\df@tag{\\text{#1}}";
  });
  h["\\bmod"] = "\\mathbin{\\text{mod}}";
  h["\\pod"] =
    "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)";
  h["\\pmod"] = "\\pod{{\\rm mod}\\mkern6mu#1}";
  h["\\mod"] =
    "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1";
  h["\\newline"] = "\\\\\\relax";
  h["\\TeX"] =
    "\\textrm{T}\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125em\\textrm{X}";
  h["\\LaTeX"] =
    "\\textrm{L}\\kern-.35em\\raisebox{0.2em}{\\scriptstyle A}\\kern-.15em\\TeX";
  h["\\Temml"] =
    "\\textrm{T}\\kern-0.2em\\lower{0.2em}\\textrm{E}\\kern-0.08em{\\textrm{M}\\kern-0.08em\\raise{0.2em}\\textrm{M}\\kern-0.08em\\textrm{L}}";
  h["\\hspace"] = "\\@ifstar\\@hspacer\\@hspace";
  h["\\@hspace"] = "\\hskip #1\\relax";
  h["\\@hspacer"] = "\\rule{0pt}{0pt}\\hskip #1\\relax";
  h["\\colon"] = '\\mathpunct{\\char"3a}';
  h["\\prescript"] = "\\pres@cript{_{#1}^{#2}}{}{#3}";
  h["\\ordinarycolon"] = '\\char"3a';
  h["\\vcentcolon"] = "\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}}";
  h["\\coloneq"] = '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"2212}';
  h["\\Coloneq"] = '\\mathrel{\\char"2237\\char"2212}';
  h["\\Eqqcolon"] = '\\mathrel{\\char"3d\\char"2237}';
  h["\\Eqcolon"] = '\\mathrel{\\char"2212\\char"2237}';
  h["\\colonapprox"] =
    '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"2248}';
  h["\\Colonapprox"] = '\\mathrel{\\char"2237\\char"2248}';
  h["\\colonsim"] =
    '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"223c}';
  h["\\Colonsim"] =
    '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"223c}';
  h["\\ratio"] = "\\vcentcolon";
  h["\\coloncolon"] = "\\dblcolon";
  h["\\colonequals"] = "\\coloneqq";
  h["\\coloncolonequals"] = "\\Coloneqq";
  h["\\equalscolon"] = "\\eqqcolon";
  h["\\equalscoloncolon"] = "\\Eqqcolon";
  h["\\colonminus"] = "\\coloneq";
  h["\\coloncolonminus"] = "\\Coloneq";
  h["\\minuscolon"] = "\\eqcolon";
  h["\\minuscoloncolon"] = "\\Eqcolon";
  h["\\coloncolonapprox"] = "\\Colonapprox";
  h["\\coloncolonsim"] = "\\Colonsim";
  h["\\notni"] = "\\mathrel{\\char`\u220c}";
  h["\\limsup"] = "\\DOTSB\\operatorname*{lim\\,sup}";
  h["\\liminf"] = "\\DOTSB\\operatorname*{lim\\,inf}";
  h["\\injlim"] = "\\DOTSB\\operatorname*{inj\\,lim}";
  h["\\projlim"] = "\\DOTSB\\operatorname*{proj\\,lim}";
  h["\\varlimsup"] = "\\DOTSB\\operatorname*{\\overline{\\text{lim}}}";
  h["\\varliminf"] = "\\DOTSB\\operatorname*{\\underline{\\text{lim}}}";
  h["\\varinjlim"] = "\\DOTSB\\operatorname*{\\underrightarrow{\\text{lim}}}";
  h["\\varprojlim"] = "\\DOTSB\\operatorname*{\\underleftarrow{\\text{lim}}}";
  h["\\centerdot"] = "{\\medspace\\rule{0.167em}{0.189em}\\medspace}";
  h["\\argmin"] = "\\DOTSB\\operatorname*{arg\\,min}";
  h["\\argmax"] = "\\DOTSB\\operatorname*{arg\\,max}";
  h["\\plim"] = "\\DOTSB\\operatorname*{plim}";
  h["\\bra"] = "\\mathinner{\\langle{#1}|}";
  h["\\ket"] = "\\mathinner{|{#1}\\rangle}";
  h["\\braket"] = "\\mathinner{\\langle{#1}\\rangle}";
  h["\\Bra"] = "\\left\\langle#1\\right|";
  h["\\Ket"] = "\\left|#1\\right\\rangle";
  const yb = (a) => (b) => {
    var c = b.consumeArg().tokens;
    const e = b.consumeArg().tokens,
      f = b.consumeArg().tokens,
      g = b.consumeArg().tokens,
      m = b.macros.get("|"),
      n = b.macros.get("\\|");
    b.macros.beginGroup();
    var t = (x) => (u) => {
      a && (u.macros.set("|", m), f.length && u.macros.set("\\|", n));
      let B = x;
      !x && f.length && "|" === u.future().text && (u.popToken(), (B = !0));
      return { tokens: B ? f : e, numArgs: 0 };
    };
    b.macros.set("|", t(!1));
    f.length && b.macros.set("\\|", t(!0));
    t = b.consumeArg().tokens;
    c = b.expandTokens([...g, ...t, ...c]);
    b.macros.endGroup();
    return { tokens: c.reverse(), numArgs: 0 };
  };
  E("\\bra@ket", yb(!1));
  E("\\bra@set", yb(!0));
  h["\\Braket"] =
    "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}";
  h["\\Set"] =
    "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}";
  h["\\set"] = "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}";
  h["\\angln"] = "{\\angl n}";
  h["\\odv"] = "\\@ifstar\\odv@next\\odv@numerator";
  h["\\odv@numerator"] = "\\frac{\\mathrm{d}#1}{\\mathrm{d}#2}";
  h["\\odv@next"] = "\\frac{\\mathrm{d}}{\\mathrm{d}#2}#1";
  h["\\pdv"] = "\\@ifstar\\pdv@next\\pdv@numerator";
  const zb = (a) => {
    const b = a[0][0].text;
    a = Fc(a[1]).split(",");
    var c = String(a.length);
    c = "1" === c ? "\\partial" : `\\partial^${c}`;
    let e = "";
    a.map((f) => {
      e += "\\partial " + f.trim() + "\\,";
    });
    return [b, c, e.replace(/\\,$/, "")];
  };
  E("\\pdv@numerator", function (a) {
    const [b, c, e] = zb(a.consumeArgs(2));
    return `\\frac{${c} ${b}}{${e}}`;
  });
  E("\\pdv@next", function (a) {
    const [b, c, e] = zb(a.consumeArgs(2));
    return `\\frac{${c}}{${e}} ${b}`;
  });
  h["\\upalpha"] = "\\up@greek{\\alpha}";
  h["\\upbeta"] = "\\up@greek{\\beta}";
  h["\\upgamma"] = "\\up@greek{\\gamma}";
  h["\\updelta"] = "\\up@greek{\\delta}";
  h["\\upepsilon"] = "\\up@greek{\\epsilon}";
  h["\\upzeta"] = "\\up@greek{\\zeta}";
  h["\\upeta"] = "\\up@greek{\\eta}";
  h["\\uptheta"] = "\\up@greek{\\theta}";
  h["\\upiota"] = "\\up@greek{\\iota}";
  h["\\upkappa"] = "\\up@greek{\\kappa}";
  h["\\uplambda"] = "\\up@greek{\\lambda}";
  h["\\upmu"] = "\\up@greek{\\mu}";
  h["\\upnu"] = "\\up@greek{\\nu}";
  h["\\upxi"] = "\\up@greek{\\xi}";
  h["\\upomicron"] = "\\up@greek{\\omicron}";
  h["\\uppi"] = "\\up@greek{\\pi}";
  h["\\upalpha"] = "\\up@greek{\\alpha}";
  h["\\uprho"] = "\\up@greek{\\rho}";
  h["\\upsigma"] = "\\up@greek{\\sigma}";
  h["\\uptau"] = "\\up@greek{\\tau}";
  h["\\upupsilon"] = "\\up@greek{\\upsilon}";
  h["\\upphi"] = "\\up@greek{\\phi}";
  h["\\upchi"] = "\\up@greek{\\chi}";
  h["\\uppsi"] = "\\up@greek{\\psi}";
  h["\\upomega"] = "\\up@greek{\\omega}";
  h["\\invamp"] = '\\mathbin{\\char"214b}';
  h["\\parr"] = '\\mathbin{\\char"214b}';
  h["\\with"] = '\\mathbin{\\char"26}';
  h["\\multimapinv"] = '\\mathrel{\\char"27dc}';
  h["\\multimapboth"] = '\\mathrel{\\char"29df}';
  h["\\scoh"] = '{\\mkern5mu\\char"2322\\mkern5mu}';
  h["\\sincoh"] = '{\\mkern5mu\\char"2323\\mkern5mu}';
  h["\\coh"] =
    '{\\mkern5mu\\rule{}{0.7em}\\mathrlap{\\smash{\\raise2mu{\\char"2322}}}\n{\\smash{\\lower4mu{\\char"2323}}}\\mkern5mu}';
  h["\\incoh"] =
    '{\\mkern5mu\\rule{}{0.7em}\\mathrlap{\\smash{\\raise2mu{\\char"2323}}}\n{\\smash{\\lower4mu{\\char"2322}}}\\mkern5mu}';
  h["\\standardstate"] = "\\text{\\tiny\\char`\u29b5}";
  const Ab = { "^": !0, _: !0, "\\limits": !0, "\\nolimits": !0 };
  class Gc {
    constructor(a, b, c) {
      this.settings = b;
      this.expansionCount = 0;
      this.feed(a);
      this.macros = new Dc(Ec, b.macros);
      this.mode = c;
      this.stack = [];
    }
    feed(a) {
      this.lexer = new ub(a, this.settings);
    }
    switchMode(a) {
      this.mode = a;
    }
    beginGroup() {
      this.macros.beginGroup();
    }
    endGroup() {
      this.macros.endGroup();
    }
    future() {
      0 === this.stack.length && this.pushToken(this.lexer.lex());
      return this.stack[this.stack.length - 1];
    }
    popToken() {
      this.future();
      return this.stack.pop();
    }
    pushToken(a) {
      this.stack.push(a);
    }
    pushTokens(a) {
      this.stack.push(...a);
    }
    scanArgument(a) {
      let b, c;
      if (a) {
        this.consumeSpaces();
        if ("[" !== this.future().text) return null;
        a = this.popToken();
        ({ tokens: c, end: b } = this.consumeArg(["]"]));
      } else ({ tokens: c, start: a, end: b } = this.consumeArg());
      this.pushToken(new R("EOF", b.loc));
      this.pushTokens(c);
      return a.range(b, "");
    }
    consumeSpaces() {
      for (;;)
        if (" " === this.future().text) this.stack.pop();
        else break;
    }
    consumeArg(a) {
      const b = [],
        c = a && 0 < a.length;
      c || this.consumeSpaces();
      const e = this.future();
      let f,
        g = 0,
        m = 0;
      do {
        f = this.popToken();
        b.push(f);
        if ("{" === f.text) ++g;
        else if ("}" === f.text) {
          if ((--g, -1 === g)) throw new p("Extra }", f);
        } else if ("EOF" === f.text)
          throw new p(
            "Unexpected end of input in a macro argument, expected '" +
              (a && c ? a[m] : "}") +
              "'",
            f
          );
        if (a && c)
          if ((0 === g || (1 === g && "{" === a[m])) && f.text === a[m]) {
            if ((++m, m === a.length)) {
              b.splice(-m, m);
              break;
            }
          } else m = 0;
      } while (0 !== g || c);
      "{" === e.text && "}" === b[b.length - 1].text && (b.pop(), b.shift());
      b.reverse();
      return { tokens: b, start: e, end: f };
    }
    consumeArgs(a, b) {
      if (b) {
        if (b.length !== a + 1)
          throw new p(
            "The length of delimiters doesn't match the number of args!"
          );
        var c = b[0];
        for (var e = 0; e < c.length; e++) {
          const f = this.popToken();
          if (c[e] !== f.text)
            throw new p("Use of the macro doesn't match its definition", f);
        }
      }
      c = [];
      for (e = 0; e < a; e++) c.push(this.consumeArg(b && b[e + 1]).tokens);
      return c;
    }
    expandOnce(a) {
      var b = this.popToken(),
        c = b.text,
        e = b.noexpand ? null : this._getExpansion(c);
      if (null == e || (a && e.unexpandable)) {
        if (a && null == e && "\\" === c[0] && !this.isDefined(c))
          throw new p("Undefined control sequence: " + c);
        this.pushToken(b);
        return !1;
      }
      this.expansionCount++;
      if (this.expansionCount > this.settings.maxExpand)
        throw new p(
          "Too many expansions: infinite loop or need to increase maxExpand setting"
        );
      a = e.tokens;
      b = this.consumeArgs(e.numArgs, e.delimiters);
      if (e.numArgs)
        for (a = a.slice(), e = a.length - 1; 0 <= e; --e)
          if (((c = a[e]), "#" === c.text)) {
            if (0 === e)
              throw new p("Incomplete placeholder at end of macro body", c);
            c = a[--e];
            if ("#" === c.text) a.splice(e + 1, 1);
            else if (/^[1-9]$/.test(c.text)) a.splice(e, 2, ...b[+c.text - 1]);
            else throw new p("Not a valid argument number", c);
          }
      this.pushTokens(a);
      return a.length;
    }
    expandAfterFuture() {
      this.expandOnce();
      return this.future();
    }
    expandNextToken() {
      for (;;)
        if (!1 === this.expandOnce()) {
          const a = this.stack.pop();
          a.treatAsRelax && (a.text = "\\relax");
          return a;
        }
      throw Error();
    }
    expandMacro(a) {
      return this.macros.has(a) ? this.expandTokens([new R(a)]) : void 0;
    }
    expandTokens(a) {
      const b = [],
        c = this.stack.length;
      for (this.pushTokens(a); this.stack.length > c; )
        !1 === this.expandOnce(!0) &&
          ((a = this.stack.pop()),
          a.treatAsRelax && ((a.noexpand = !1), (a.treatAsRelax = !1)),
          b.push(a));
      return b;
    }
    expandMacroAsText(a) {
      return (a = this.expandMacro(a)) ? a.map((b) => b.text).join("") : a;
    }
    _getExpansion(a) {
      var b = this.macros.get(a);
      if (null == b) return b;
      if (
        1 === a.length &&
        ((a = this.lexer.catcodes[a]), null != a && 13 !== a)
      )
        return;
      a = "function" === typeof b ? b(this) : b;
      if ("string" === typeof a) {
        b = 0;
        if (-1 !== a.indexOf("#"))
          for (var c = a.replace(/##/g, ""); -1 !== c.indexOf("#" + (b + 1)); )
            ++b;
        a = new ub(a, this.settings);
        c = [];
        let e = a.lex();
        for (; "EOF" !== e.text; ) c.push(e), (e = a.lex());
        c.reverse();
        return { tokens: c, numArgs: b };
      }
      return a;
    }
    isDefined(a) {
      return (
        this.macros.has(a) ||
        Object.prototype.hasOwnProperty.call(V, a) ||
        Object.prototype.hasOwnProperty.call(F.math, a) ||
        Object.prototype.hasOwnProperty.call(F.text, a) ||
        Object.prototype.hasOwnProperty.call(Ab, a)
      );
    }
    isExpandable(a) {
      const b = this.macros.get(a);
      return null != b
        ? "string" === typeof b || "function" === typeof b || !b.unexpandable
        : Object.prototype.hasOwnProperty.call(V, a) && !V[a].primitive;
    }
  }
  const qa = [];
  [
    {
      name: "latin",
      blocks: [
        [256, 591],
        [768, 879],
      ],
    },
    { name: "cyrillic", blocks: [[1024, 1279]] },
    { name: "armenian", blocks: [[1328, 1423]] },
    { name: "brahmic", blocks: [[2304, 4255]] },
    { name: "georgian", blocks: [[4256, 4351]] },
    {
      name: "cjk",
      blocks: [
        [12288, 12543],
        [19968, 40879],
        [65280, 65376],
      ],
    },
    { name: "hangul", blocks: [[44032, 55215]] },
  ].forEach((a) => a.blocks.forEach((b) => qa.push(...b)));
  const Bb =
      /^[\u208a\u208b\u208c\u208d\u208e\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089\u2090\u2091\u2095\u1d62\u2c7c\u2096\u2097\u2098\u2099\u2092\u209a\u1d63\u209b\u209c\u1d64\u1d65\u2093\u1d66\u1d67\u1d68\u1d69\u1d6a]/,
    ra = Object.freeze({
      "\u208a": "+",
      "\u208b": "-",
      "\u208c": "=",
      "\u208d": "(",
      "\u208e": ")",
      "\u2080": "0",
      "\u2081": "1",
      "\u2082": "2",
      "\u2083": "3",
      "\u2084": "4",
      "\u2085": "5",
      "\u2086": "6",
      "\u2087": "7",
      "\u2088": "8",
      "\u2089": "9",
      "\u2090": "a",
      "\u2091": "e",
      "\u2095": "h",
      "\u1d62": "i",
      "\u2c7c": "j",
      "\u2096": "k",
      "\u2097": "l",
      "\u2098": "m",
      "\u2099": "n",
      "\u2092": "o",
      "\u209a": "p",
      "\u1d63": "r",
      "\u209b": "s",
      "\u209c": "t",
      "\u1d64": "u",
      "\u1d65": "v",
      "\u2093": "x",
      "\u1d66": "\u03b2",
      "\u1d67": "\u03b3",
      "\u1d68": "\u03c1",
      "\u1d69": "\u03d5",
      "\u1d6a": "\u03c7",
      "\u207a": "+",
      "\u207b": "-",
      "\u207c": "=",
      "\u207d": "(",
      "\u207e": ")",
      "\u2070": "0",
      "\u00b9": "1",
      "\u00b2": "2",
      "\u00b3": "3",
      "\u2074": "4",
      "\u2075": "5",
      "\u2076": "6",
      "\u2077": "7",
      "\u2078": "8",
      "\u2079": "9",
      "\u1d2c": "A",
      "\u1d2e": "B",
      "\u1d30": "D",
      "\u1d31": "E",
      "\u1d33": "G",
      "\u1d34": "H",
      "\u1d35": "I",
      "\u1d36": "J",
      "\u1d37": "K",
      "\u1d38": "L",
      "\u1d39": "M",
      "\u1d3a": "N",
      "\u1d3c": "O",
      "\u1d3e": "P",
      "\u1d3f": "R",
      "\u1d40": "T",
      "\u1d41": "U",
      "\u2c7d": "V",
      "\u1d42": "W",
      "\u1d43": "a",
      "\u1d47": "b",
      "\u1d9c": "c",
      "\u1d48": "d",
      "\u1d49": "e",
      "\u1da0": "f",
      "\u1d4d": "g",
      "\u02b0": "h",
      "\u2071": "i",
      "\u02b2": "j",
      "\u1d4f": "k",
      "\u02e1": "l",
      "\u1d50": "m",
      "\u207f": "n",
      "\u1d52": "o",
      "\u1d56": "p",
      "\u02b3": "r",
      "\u02e2": "s",
      "\u1d57": "t",
      "\u1d58": "u",
      "\u1d5b": "v",
      "\u02b7": "w",
      "\u02e3": "x",
      "\u02b8": "y",
      "\u1dbb": "z",
      "\u1d5d": "\u03b2",
      "\u1d5e": "\u03b3",
      "\u1d5f": "\u03b4",
      "\u1d60": "\u03d5",
      "\u1d61": "\u03c7",
      "\u1dbf": "\u03b8",
    }),
    Cb = Object.freeze({
      "\ud835\udc9c": "A",
      "\u212c": "B",
      "\ud835\udc9e": "C",
      "\ud835\udc9f": "D",
      "\u2130": "E",
      "\u2131": "F",
      "\ud835\udca2": "G",
      "\u210b": "H",
      "\u2110": "I",
      "\ud835\udca5": "J",
      "\ud835\udca6": "K",
      "\u2112": "L",
      "\u2113": "M",
      "\ud835\udca9": "N",
      "\ud835\udcaa": "O",
      "\ud835\udcab": "P",
      "\ud835\udcac": "Q",
      "\u211b": "R",
      "\ud835\udcae": "S",
      "\ud835\udcaf": "T",
      "\ud835\udcb0": "U",
      "\ud835\udcb1": "V",
      "\ud835\udcb2": "W",
      "\ud835\udcb3": "X",
      "\ud835\udcb4": "Y",
      "\ud835\udcb5": "Z",
    });
  var Fa = {
      "\u0301": { text: "\\'", math: "\\acute" },
      "\u0300": { text: "\\`", math: "\\grave" },
      "\u0308": { text: '\\"', math: "\\ddot" },
      "\u0303": { text: "\\~", math: "\\tilde" },
      "\u0304": { text: "\\=", math: "\\bar" },
      "\u0306": { text: "\\u", math: "\\breve" },
      "\u030c": { text: "\\v", math: "\\check" },
      "\u0302": { text: "\\^", math: "\\hat" },
      "\u0307": { text: "\\.", math: "\\dot" },
      "\u030a": { text: "\\r", math: "\\mathring" },
      "\u030b": { text: "\\H" },
      "\u0327": { text: "\\c" },
    },
    Db = {
      "\u00e1": "a\u0301",
      "\u00e0": "a\u0300",
      "\u00e4": "a\u0308",
      "\u01df": "a\u0308\u0304",
      "\u00e3": "a\u0303",
      "\u0101": "a\u0304",
      "\u0103": "a\u0306",
      "\u1eaf": "a\u0306\u0301",
      "\u1eb1": "a\u0306\u0300",
      "\u1eb5": "a\u0306\u0303",
      "\u01ce": "a\u030c",
      "\u00e2": "a\u0302",
      "\u1ea5": "a\u0302\u0301",
      "\u1ea7": "a\u0302\u0300",
      "\u1eab": "a\u0302\u0303",
      "\u0227": "a\u0307",
      "\u01e1": "a\u0307\u0304",
      "\u00e5": "a\u030a",
      "\u01fb": "a\u030a\u0301",
      "\u1e03": "b\u0307",
      "\u0107": "c\u0301",
      "\u010d": "c\u030c",
      "\u0109": "c\u0302",
      "\u010b": "c\u0307",
      "\u010f": "d\u030c",
      "\u1e0b": "d\u0307",
      "\u00e9": "e\u0301",
      "\u00e8": "e\u0300",
      "\u00eb": "e\u0308",
      "\u1ebd": "e\u0303",
      "\u0113": "e\u0304",
      "\u1e17": "e\u0304\u0301",
      "\u1e15": "e\u0304\u0300",
      "\u0115": "e\u0306",
      "\u011b": "e\u030c",
      "\u00ea": "e\u0302",
      "\u1ebf": "e\u0302\u0301",
      "\u1ec1": "e\u0302\u0300",
      "\u1ec5": "e\u0302\u0303",
      "\u0117": "e\u0307",
      "\u1e1f": "f\u0307",
      "\u01f5": "g\u0301",
      "\u1e21": "g\u0304",
      "\u011f": "g\u0306",
      "\u01e7": "g\u030c",
      "\u011d": "g\u0302",
      "\u0121": "g\u0307",
      "\u1e27": "h\u0308",
      "\u021f": "h\u030c",
      "\u0125": "h\u0302",
      "\u1e23": "h\u0307",
      "\u00ed": "i\u0301",
      "\u00ec": "i\u0300",
      "\u00ef": "i\u0308",
      "\u1e2f": "i\u0308\u0301",
      "\u0129": "i\u0303",
      "\u012b": "i\u0304",
      "\u012d": "i\u0306",
      "\u01d0": "i\u030c",
      "\u00ee": "i\u0302",
      "\u01f0": "j\u030c",
      "\u0135": "j\u0302",
      "\u1e31": "k\u0301",
      "\u01e9": "k\u030c",
      "\u013a": "l\u0301",
      "\u013e": "l\u030c",
      "\u1e3f": "m\u0301",
      "\u1e41": "m\u0307",
      "\u0144": "n\u0301",
      "\u01f9": "n\u0300",
      "\u00f1": "n\u0303",
      "\u0148": "n\u030c",
      "\u1e45": "n\u0307",
      "\u00f3": "o\u0301",
      "\u00f2": "o\u0300",
      "\u00f6": "o\u0308",
      "\u022b": "o\u0308\u0304",
      "\u00f5": "o\u0303",
      "\u1e4d": "o\u0303\u0301",
      "\u1e4f": "o\u0303\u0308",
      "\u022d": "o\u0303\u0304",
      "\u014d": "o\u0304",
      "\u1e53": "o\u0304\u0301",
      "\u1e51": "o\u0304\u0300",
      "\u014f": "o\u0306",
      "\u01d2": "o\u030c",
      "\u00f4": "o\u0302",
      "\u1ed1": "o\u0302\u0301",
      "\u1ed3": "o\u0302\u0300",
      "\u1ed7": "o\u0302\u0303",
      "\u022f": "o\u0307",
      "\u0231": "o\u0307\u0304",
      "\u0151": "o\u030b",
      "\u1e55": "p\u0301",
      "\u1e57": "p\u0307",
      "\u0155": "r\u0301",
      "\u0159": "r\u030c",
      "\u1e59": "r\u0307",
      "\u015b": "s\u0301",
      "\u1e65": "s\u0301\u0307",
      "\u0161": "s\u030c",
      "\u1e67": "s\u030c\u0307",
      "\u015d": "s\u0302",
      "\u1e61": "s\u0307",
      "\u1e97": "t\u0308",
      "\u0165": "t\u030c",
      "\u1e6b": "t\u0307",
      "\u00fa": "u\u0301",
      "\u00f9": "u\u0300",
      "\u00fc": "u\u0308",
      "\u01d8": "u\u0308\u0301",
      "\u01dc": "u\u0308\u0300",
      "\u01d6": "u\u0308\u0304",
      "\u01da": "u\u0308\u030c",
      "\u0169": "u\u0303",
      "\u1e79": "u\u0303\u0301",
      "\u016b": "u\u0304",
      "\u1e7b": "u\u0304\u0308",
      "\u016d": "u\u0306",
      "\u01d4": "u\u030c",
      "\u00fb": "u\u0302",
      "\u016f": "u\u030a",
      "\u0171": "u\u030b",
      "\u1e7d": "v\u0303",
      "\u1e83": "w\u0301",
      "\u1e81": "w\u0300",
      "\u1e85": "w\u0308",
      "\u0175": "w\u0302",
      "\u1e87": "w\u0307",
      "\u1e98": "w\u030a",
      "\u1e8d": "x\u0308",
      "\u1e8b": "x\u0307",
      "\u00fd": "y\u0301",
      "\u1ef3": "y\u0300",
      "\u00ff": "y\u0308",
      "\u1ef9": "y\u0303",
      "\u0233": "y\u0304",
      "\u0177": "y\u0302",
      "\u1e8f": "y\u0307",
      "\u1e99": "y\u030a",
      "\u017a": "z\u0301",
      "\u017e": "z\u030c",
      "\u1e91": "z\u0302",
      "\u017c": "z\u0307",
      "\u00c1": "A\u0301",
      "\u00c0": "A\u0300",
      "\u00c4": "A\u0308",
      "\u01de": "A\u0308\u0304",
      "\u00c3": "A\u0303",
      "\u0100": "A\u0304",
      "\u0102": "A\u0306",
      "\u1eae": "A\u0306\u0301",
      "\u1eb0": "A\u0306\u0300",
      "\u1eb4": "A\u0306\u0303",
      "\u01cd": "A\u030c",
      "\u00c2": "A\u0302",
      "\u1ea4": "A\u0302\u0301",
      "\u1ea6": "A\u0302\u0300",
      "\u1eaa": "A\u0302\u0303",
      "\u0226": "A\u0307",
      "\u01e0": "A\u0307\u0304",
      "\u00c5": "A\u030a",
      "\u01fa": "A\u030a\u0301",
      "\u1e02": "B\u0307",
      "\u0106": "C\u0301",
      "\u010c": "C\u030c",
      "\u0108": "C\u0302",
      "\u010a": "C\u0307",
      "\u010e": "D\u030c",
      "\u1e0a": "D\u0307",
      "\u00c9": "E\u0301",
      "\u00c8": "E\u0300",
      "\u00cb": "E\u0308",
      "\u1ebc": "E\u0303",
      "\u0112": "E\u0304",
      "\u1e16": "E\u0304\u0301",
      "\u1e14": "E\u0304\u0300",
      "\u0114": "E\u0306",
      "\u011a": "E\u030c",
      "\u00ca": "E\u0302",
      "\u1ebe": "E\u0302\u0301",
      "\u1ec0": "E\u0302\u0300",
      "\u1ec4": "E\u0302\u0303",
      "\u0116": "E\u0307",
      "\u1e1e": "F\u0307",
      "\u01f4": "G\u0301",
      "\u1e20": "G\u0304",
      "\u011e": "G\u0306",
      "\u01e6": "G\u030c",
      "\u011c": "G\u0302",
      "\u0120": "G\u0307",
      "\u1e26": "H\u0308",
      "\u021e": "H\u030c",
      "\u0124": "H\u0302",
      "\u1e22": "H\u0307",
      "\u00cd": "I\u0301",
      "\u00cc": "I\u0300",
      "\u00cf": "I\u0308",
      "\u1e2e": "I\u0308\u0301",
      "\u0128": "I\u0303",
      "\u012a": "I\u0304",
      "\u012c": "I\u0306",
      "\u01cf": "I\u030c",
      "\u00ce": "I\u0302",
      "\u0130": "I\u0307",
      "\u0134": "J\u0302",
      "\u1e30": "K\u0301",
      "\u01e8": "K\u030c",
      "\u0139": "L\u0301",
      "\u013d": "L\u030c",
      "\u1e3e": "M\u0301",
      "\u1e40": "M\u0307",
      "\u0143": "N\u0301",
      "\u01f8": "N\u0300",
      "\u00d1": "N\u0303",
      "\u0147": "N\u030c",
      "\u1e44": "N\u0307",
      "\u00d3": "O\u0301",
      "\u00d2": "O\u0300",
      "\u00d6": "O\u0308",
      "\u022a": "O\u0308\u0304",
      "\u00d5": "O\u0303",
      "\u1e4c": "O\u0303\u0301",
      "\u1e4e": "O\u0303\u0308",
      "\u022c": "O\u0303\u0304",
      "\u014c": "O\u0304",
      "\u1e52": "O\u0304\u0301",
      "\u1e50": "O\u0304\u0300",
      "\u014e": "O\u0306",
      "\u01d1": "O\u030c",
      "\u00d4": "O\u0302",
      "\u1ed0": "O\u0302\u0301",
      "\u1ed2": "O\u0302\u0300",
      "\u1ed6": "O\u0302\u0303",
      "\u022e": "O\u0307",
      "\u0230": "O\u0307\u0304",
      "\u0150": "O\u030b",
      "\u1e54": "P\u0301",
      "\u1e56": "P\u0307",
      "\u0154": "R\u0301",
      "\u0158": "R\u030c",
      "\u1e58": "R\u0307",
      "\u015a": "S\u0301",
      "\u1e64": "S\u0301\u0307",
      "\u0160": "S\u030c",
      "\u1e66": "S\u030c\u0307",
      "\u015c": "S\u0302",
      "\u1e60": "S\u0307",
      "\u0164": "T\u030c",
      "\u1e6a": "T\u0307",
      "\u00da": "U\u0301",
      "\u00d9": "U\u0300",
      "\u00dc": "U\u0308",
      "\u01d7": "U\u0308\u0301",
      "\u01db": "U\u0308\u0300",
      "\u01d5": "U\u0308\u0304",
      "\u01d9": "U\u0308\u030c",
      "\u0168": "U\u0303",
      "\u1e78": "U\u0303\u0301",
      "\u016a": "U\u0304",
      "\u1e7a": "U\u0304\u0308",
      "\u016c": "U\u0306",
      "\u01d3": "U\u030c",
      "\u00db": "U\u0302",
      "\u016e": "U\u030a",
      "\u0170": "U\u030b",
      "\u1e7c": "V\u0303",
      "\u1e82": "W\u0301",
      "\u1e80": "W\u0300",
      "\u1e84": "W\u0308",
      "\u0174": "W\u0302",
      "\u1e86": "W\u0307",
      "\u1e8c": "X\u0308",
      "\u1e8a": "X\u0307",
      "\u00dd": "Y\u0301",
      "\u1ef2": "Y\u0300",
      "\u0178": "Y\u0308",
      "\u1ef8": "Y\u0303",
      "\u0232": "Y\u0304",
      "\u0176": "Y\u0302",
      "\u1e8e": "Y\u0307",
      "\u0179": "Z\u0301",
      "\u017d": "Z\u030c",
      "\u1e90": "Z\u0302",
      "\u017b": "Z\u0307",
      "\u03ac": "\u03b1\u0301",
      "\u1f70": "\u03b1\u0300",
      "\u1fb1": "\u03b1\u0304",
      "\u1fb0": "\u03b1\u0306",
      "\u03ad": "\u03b5\u0301",
      "\u1f72": "\u03b5\u0300",
      "\u03ae": "\u03b7\u0301",
      "\u1f74": "\u03b7\u0300",
      "\u03af": "\u03b9\u0301",
      "\u1f76": "\u03b9\u0300",
      "\u03ca": "\u03b9\u0308",
      "\u0390": "\u03b9\u0308\u0301",
      "\u1fd2": "\u03b9\u0308\u0300",
      "\u1fd1": "\u03b9\u0304",
      "\u1fd0": "\u03b9\u0306",
      "\u03cc": "\u03bf\u0301",
      "\u1f78": "\u03bf\u0300",
      "\u03cd": "\u03c5\u0301",
      "\u1f7a": "\u03c5\u0300",
      "\u03cb": "\u03c5\u0308",
      "\u03b0": "\u03c5\u0308\u0301",
      "\u1fe2": "\u03c5\u0308\u0300",
      "\u1fe1": "\u03c5\u0304",
      "\u1fe0": "\u03c5\u0306",
      "\u03ce": "\u03c9\u0301",
      "\u1f7c": "\u03c9\u0300",
      "\u038e": "\u03a5\u0301",
      "\u1fea": "\u03a5\u0300",
      "\u03ab": "\u03a5\u0308",
      "\u1fe9": "\u03a5\u0304",
      "\u1fe8": "\u03a5\u0306",
      "\u038f": "\u03a9\u0301",
      "\u1ffa": "\u03a9\u0300",
    };
  const Hc = /^\d(?:[\d,.]*\d)?$/;
  class sa {
    constructor(a, b, c = !1) {
      this.mode = "math";
      this.gullet = new Gc(a, b, this.mode);
      this.settings = b;
      this.isPreamble = c;
      this.leftrightDepth = 0;
      this.prevAtomType = "";
    }
    expect(a, b = !0) {
      if (this.fetch().text !== a)
        throw new p(
          `Expected '${a}', got '${this.fetch().text}'`,
          this.fetch()
        );
      b && this.consume();
    }
    consume() {
      this.nextToken = null;
    }
    fetch() {
      null == this.nextToken &&
        (this.nextToken = this.gullet.expandNextToken());
      return this.nextToken;
    }
    switchMode(a) {
      this.mode = a;
      this.gullet.switchMode(a);
    }
    parse() {
      this.gullet.beginGroup();
      this.settings.colorIsTextColor &&
        this.gullet.macros.set("\\color", "\\textcolor");
      const a = this.parseExpression(!1);
      this.expect("EOF");
      if (this.isPreamble) {
        const c = Object.create(null);
        Object.entries(this.gullet.macros.current).forEach(([e, f]) => {
          c[e] = f;
        });
        this.gullet.endGroup();
        return c;
      }
      const b = this.gullet.macros.get("\\df@tag");
      this.gullet.endGroup();
      b && (this.gullet.macros.current["\\df@tag"] = b);
      return a;
    }
    static get endOfExpression() {
      return "} \\endgroup \\end \\right \\endtoggle &".split(" ");
    }
    subparse(a) {
      const b = this.nextToken;
      this.consume();
      this.gullet.pushToken(new R("}"));
      this.gullet.pushTokens(a);
      a = this.parseExpression(!1);
      this.expect("}");
      this.nextToken = b;
      return a;
    }
    parseExpression(a, b) {
      const c = [];
      for (;;) {
        "math" === this.mode && this.consumeSpaces();
        var e = this.fetch();
        if (-1 !== sa.endOfExpression.indexOf(e.text)) break;
        if (b && e.text === b) break;
        if (a && V[e.text] && V[e.text].infix) break;
        e = this.parseAtom(b);
        if (!e) break;
        else if ("internal" === e.type) continue;
        c.push(e);
        this.prevAtomType = "atom" === e.type ? e.family : e.type;
      }
      "text" === this.mode && this.formLigatures(c);
      return this.handleInfixNodes(c);
    }
    handleInfixNodes(a) {
      let b = -1,
        c;
      for (var e = 0; e < a.length; e++)
        if ("infix" === a[e].type) {
          if (-1 !== b)
            throw new p("only one infix operator per group", a[e].token);
          b = e;
          c = a[e].replaceWith;
        }
      if (-1 !== b && c) {
        e = a.slice(0, b);
        var f = a.slice(b + 1);
        e =
          1 === e.length && "ordgroup" === e[0].type
            ? e[0]
            : { type: "ordgroup", mode: this.mode, body: e };
        f =
          1 === f.length && "ordgroup" === f[0].type
            ? f[0]
            : { type: "ordgroup", mode: this.mode, body: f };
        return [
          "\\\\abovefrac" === c
            ? this.callFunction(c, [e, a[b], f], [])
            : this.callFunction(c, [e, f], []),
        ];
      }
      return a;
    }
    handleSupSubscript(a) {
      const b = this.fetch(),
        c = b.text;
      this.consume();
      this.consumeSpaces();
      a = this.parseGroup(a);
      if (!a) throw new p("Expected group after '" + c + "'", b);
      return a;
    }
    formatUnsupportedCmd(a) {
      const b = [];
      for (let c = 0; c < a.length; c++)
        b.push({ type: "textord", mode: "text", text: a[c] });
      return {
        type: "color",
        mode: this.mode,
        color: this.settings.errorColor,
        body: [{ type: "text", mode: this.mode, body: b }],
      };
    }
    parseAtom(a) {
      a = this.parseGroup("atom", a);
      if ("text" === this.mode) return a;
      let b;
      for (;;) {
        this.consumeSpaces();
        var c = this.fetch();
        if ("\\limits" === c.text || "\\nolimits" === c.text) {
          if (a && "op" === a.type)
            (a.limits = "\\limits" === c.text), (a.alwaysHandleSupSub = !0);
          else if (a && "operatorname" === a.type)
            a.alwaysHandleSupSub && (a.limits = "\\limits" === c.text);
          else throw new p("Limit controls must follow a math operator", c);
          this.consume();
        } else if ("^" === c.text) {
          if (e) throw new p("Double superscript", c);
          var e = this.handleSupSubscript("superscript");
        } else if ("_" === c.text) {
          if (b) throw new p("Double subscript", c);
          b = this.handleSupSubscript("subscript");
        } else if ("'" === c.text) {
          if (e) throw new p("Double superscript", c);
          e = { type: "textord", mode: this.mode, text: "\\prime" };
          var f = [e];
          for (this.consume(); "'" === this.fetch().text; )
            f.push(e), this.consume();
          "^" === this.fetch().text &&
            f.push(this.handleSupSubscript("superscript"));
          e = { type: "ordgroup", mode: this.mode, body: f };
        } else if (ra[c.text]) {
          f = Bb.test(c.text);
          var g = [];
          g.push(new R(ra[c.text]));
          for (this.consume(); ; ) {
            c = this.fetch().text;
            if (!ra[c]) break;
            if (Bb.test(c) !== f) break;
            g.unshift(new R(ra[c]));
            this.consume();
          }
          g = this.subparse(g);
          f
            ? (b = { type: "ordgroup", mode: "math", body: g })
            : (e = { type: "ordgroup", mode: "math", body: g });
        } else break;
      }
      if (e || b) {
        if (a && "multiscript" === a.type && !a.postscripts)
          return (a.postscripts = { sup: e, sub: b }), a;
        f =
          !a || ("op" !== a.type && "operatorname" !== a.type)
            ? void 0
            : na(this.nextToken.text);
        return {
          type: "supsub",
          mode: this.mode,
          base: a,
          sup: e,
          sub: b,
          isFollowedByDelimiter: f,
        };
      }
      return a;
    }
    parseFunction(a, b) {
      const c = this.fetch(),
        e = c.text,
        f = V[e];
      if (!f) return null;
      this.consume();
      if (b && "atom" !== b && !f.allowedInArgument)
        throw new p(
          "Got function '" + e + "' with no arguments" + (b ? " as " + b : ""),
          c
        );
      if ("text" === this.mode && !f.allowedInText)
        throw new p("Can't use function '" + e + "' in text mode", c);
      if ("math" === this.mode && !1 === f.allowedInMath)
        throw new p("Can't use function '" + e + "' in math mode", c);
      b = this.prevAtomType;
      const { args: g, optArgs: m } = this.parseArguments(e, f);
      this.prevAtomType = b;
      return this.callFunction(e, g, m, c, a);
    }
    callFunction(a, b, c, e, f) {
      e = { funcName: a, parser: this, token: e, breakOnTokenText: f };
      if ((f = V[a]) && f.handler)
        return (
          (b = f.handler(e, b, c)),
          b.name || "\\mathop" != a
            ? !b.name &&
              ["\\stackrel", "\\overset", "\\underset"].includes(a) &&
              b.base &&
              (b.base.name = a)
            : (b.name = a),
          b
        );
      throw new p(`No function handler for ${a}`);
    }
    parseArguments(a, b) {
      const c = b.numArgs + b.numOptionalArgs;
      if (0 === c) return { args: [], optArgs: [] };
      const e = [],
        f = [];
      for (let m = 0; m < c; m++) {
        var g = b.argTypes && b.argTypes[m];
        const n = m < b.numOptionalArgs;
        if (
          (b.primitive && null == g) ||
          ("sqrt" === b.type && 1 === m && null == f[0])
        )
          g = "primitive";
        g = this.parseGroupOfType(`argument to '${a}'`, g, n);
        if (n) f.push(g);
        else if (null != g) e.push(g);
        else throw new p("Null argument, please report this as a bug");
      }
      return { args: e, optArgs: f };
    }
    parseGroupOfType(a, b, c) {
      switch (b) {
        case "size":
          return this.parseSizeGroup(c);
        case "url":
          return this.parseUrlGroup(c);
        case "math":
        case "text":
          return this.parseArgumentGroup(c, b);
        case "hbox":
          return (
            (a = this.parseArgumentGroup(c, "text")),
            null != a
              ? {
                  type: "styling",
                  mode: a.mode,
                  body: [a],
                  scriptLevel: "text",
                }
              : null
          );
        case "raw":
          return (
            (a = this.parseStringGroup("raw", c)),
            null != a ? { type: "raw", mode: "text", string: a.text } : null
          );
        case "primitive":
          if (c) throw new p("A primitive argument cannot be optional");
          b = this.parseGroup(a);
          if (null == b) throw new p("Expected group as " + a, this.fetch());
          return b;
        case "original":
        case null:
        case void 0:
          return this.parseArgumentGroup(c);
        default:
          throw new p("Unknown group type as " + a, this.fetch());
      }
    }
    consumeSpaces() {
      for (;;) {
        const a = this.fetch().text;
        if (" " === a || "\u00a0" === a || "\ufe0e" === a) this.consume();
        else break;
      }
    }
    parseStringGroup(a, b) {
      a = this.gullet.scanArgument(b);
      if (null == a) return null;
      b = "";
      let c;
      for (; "EOF" !== (c = this.fetch()).text; ) (b += c.text), this.consume();
      this.consume();
      a.text = b;
      return a;
    }
    parseRegexGroup(a, b) {
      const c = this.fetch();
      let e = c,
        f = "",
        g;
      for (; "EOF" !== (g = this.fetch()).text && a.test(f + g.text); )
        (e = g), (f += e.text), this.consume();
      if ("" === f) throw new p("Invalid " + b + ": '" + c.text + "'", c);
      return c.range(e, f);
    }
    parseSizeGroup(a) {
      let b,
        c = !1;
      this.gullet.consumeSpaces();
      b =
        a || "{" === this.gullet.future().text
          ? this.parseStringGroup("size", a)
          : this.parseRegexGroup(
              /^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/,
              "size"
            );
      if (!b) return null;
      a || 0 !== b.text.length || ((b.text = "0pt"), (c = !0));
      a = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(b.text);
      if (!a) throw new p("Invalid size: '" + b.text + "'", b);
      a = { number: +(a[1] + a[2]), unit: a[3] };
      if (!Va(a)) throw new p("Invalid unit: '" + a.unit + "'", b);
      return { type: "size", mode: this.mode, value: a, isBlank: c };
    }
    parseUrlGroup(a) {
      this.gullet.lexer.setCatcode("%", 13);
      this.gullet.lexer.setCatcode("~", 12);
      a = this.parseStringGroup("url", a);
      this.gullet.lexer.setCatcode("%", 14);
      this.gullet.lexer.setCatcode("~", 13);
      if (null == a) return null;
      a.text.replace(/\\([#$%&~_^{}])/g, "$1");
      a = a.text.replace(/{\u2044}/g, "/");
      return { type: "url", mode: this.mode, url: a };
    }
    parseArgumentGroup(a, b) {
      var c = this.gullet.scanArgument(a);
      if (null == c) return null;
      a = this.mode;
      b && this.switchMode(b);
      this.gullet.beginGroup();
      const e = this.parseExpression(!1, "EOF");
      this.expect("EOF");
      this.gullet.endGroup();
      c = { type: "ordgroup", mode: this.mode, loc: c.loc, body: e };
      b && this.switchMode(a);
      return c;
    }
    parseGroup(a, b) {
      var c = this.fetch();
      const e = c.text;
      if ("{" === e || "\\begingroup" === e || "\\toggle" === e) {
        this.consume();
        a =
          "{" === e ? "}" : "\\begingroup" === e ? "\\endgroup" : "\\endtoggle";
        this.gullet.beginGroup();
        b = this.parseExpression(!1, a);
        const f = this.fetch();
        this.expect(a);
        this.gullet.endGroup();
        c = {
          type: "\\endtoggle" === f.text ? "toggle" : "ordgroup",
          mode: this.mode,
          loc: H.range(c, f),
          body: b,
          semisimple: "\\begingroup" === e || void 0,
        };
      } else
        (c = this.parseFunction(b, a) || this.parseSymbol()),
          null != c ||
            "\\" !== e[0] ||
            Object.prototype.hasOwnProperty.call(Ab, e) ||
            ((c = this.formatUnsupportedCmd(e)), this.consume());
      return c;
    }
    formLigatures(a) {
      let b = a.length - 1;
      for (let c = 0; c < b; ++c) {
        const e = a[c],
          f = e.text;
        "-" === f &&
          "-" === a[c + 1].text &&
          (c + 1 < b && "-" === a[c + 2].text
            ? (a.splice(c, 3, {
                type: "textord",
                mode: "text",
                loc: H.range(e, a[c + 2]),
                text: "---",
              }),
              (b -= 2))
            : (a.splice(c, 2, {
                type: "textord",
                mode: "text",
                loc: H.range(e, a[c + 1]),
                text: "--",
              }),
              --b));
        ("'" !== f && "`" !== f) ||
          a[c + 1].text !== f ||
          (a.splice(c, 2, {
            type: "textord",
            mode: "text",
            loc: H.range(e, a[c + 1]),
            text: f + f,
          }),
          --b);
      }
    }
    parseSymbol() {
      var a = this.fetch(),
        b = a.text;
      if (/^\\verb[^a-zA-Z]/.test(b)) {
        this.consume();
        a = b.slice(5);
        var c = "*" === a.charAt(0);
        c && (a = a.slice(1));
        if (2 > a.length || a.charAt(0) !== a.slice(-1))
          throw new p(
            "\\verb assertion failed --\n                    please report what input caused this bug"
          );
        a = a.slice(1, -1);
        return { type: "verb", mode: "text", body: a, star: c };
      }
      if (
        Object.prototype.hasOwnProperty.call(Db, b[0]) &&
        !F[this.mode][b[0]]
      ) {
        if (this.settings.strict && "math" === this.mode)
          throw new p(
            `Accented Unicode text character "${b[0]}" used in ` + "math mode",
            a
          );
        b = Db[b[0]] + b.slice(1);
      }
      if ((c = Cc.exec(b)))
        (b = b.substring(0, c.index)),
          "i" === b ? (b = "\u0131") : "j" === b && (b = "\u0237");
      if (F[this.mode][b]) {
        var e = F[this.mode][b].group,
          f = H.range(a);
        if (Object.prototype.hasOwnProperty.call(Rb, e))
          b = { type: "atom", mode: this.mode, family: e, loc: f, text: b };
        else {
          if (Cb[b])
            return (
              this.consume(),
              (a = this.fetch().text.charCodeAt(0)),
              (c = 65025 === a ? "mathscr" : "mathcal"),
              (65024 !== a && 65025 !== a) || this.consume(),
              {
                type: "font",
                mode: "math",
                font: c,
                body: { type: "mathord", mode: "math", loc: f, text: Cb[b] },
              }
            );
          b = { type: e, mode: this.mode, loc: f, text: b };
        }
      } else {
        if (!this.strict && Hc.test(b))
          return (
            this.consume(),
            { type: "textord", mode: this.mode, loc: H.range(a), text: b }
          );
        if (128 <= b.charCodeAt(0)) {
          if (this.settings.strict) {
            a: {
              f = b.charCodeAt(0);
              for (e = 0; e < qa.length; e += 2)
                if (f >= qa[e] && f <= qa[e + 1]) {
                  f = !0;
                  break a;
                }
              f = !1;
            }
            if (!f)
              throw new p(
                `Unrecognized Unicode character "${b[0]}"` +
                  ` (${b.charCodeAt(0)})`,
                a
              );
            if ("math" === this.mode)
              throw new p(
                `Unicode text character "${b[0]}" used in math mode`,
                a
              );
          }
          b = org.imatheq.formulaeditor.parsing.expression.MOList[b]
            ? { type: "atom", mode: "math", loc: H.range(a), text: b }
            : { type: "textord", mode: "math", loc: H.range(a), text: b };
        } else return null;
      }
      this.consume();
      if (c)
        for (f = 0; f < c[0].length; f++) {
          e = c[0][f];
          if (!Fa[e]) throw new p(`Unknown accent ' ${e}'`, a);
          const g = Fa[e][this.mode] || Fa[e].text;
          if (!g)
            throw new p(`Accent ${e} unsupported in ${this.mode} mode`, a);
          b = {
            type: "accent",
            mode: this.mode,
            loc: H.range(a),
            label: g,
            isStretchy: !1,
            isShifty: !0,
            base: b,
          };
        }
      return b;
    }
  }
  const Eb = function (a, b, c) {
      if (!("string" === typeof a || a instanceof String))
        throw new TypeError("Temml can only parse string typed expression");
      const e = new sa(a, b);
      delete e.gullet.macros.current["\\df@tag"];
      a = e.parse();
      if (
        window.location.hostname != Ga("GGG^9=1D85A^3?=") &&
        (void 0 === c.pdata.epc || 0 == c.lst)
      )
        return (
          (b = new sa(Ga(",6B13KaMKbM"), b)),
          delete b.gullet.macros.current["\\df@tag"],
          b.parse()
        );
      if (
        !(
          0 < a.length &&
          a[0].type &&
          "array" === a[0].type &&
          a[0].addEqnNum
        ) &&
        e.gullet.macros.get("\\df@tag")
      ) {
        if (!b.displayMode) throw new p("\\tag works only in display mode");
        e.gullet.feed("\\df@tag");
        a = [{ type: "tag", mode: "text", body: a, tag: e.parse() }];
      }
      return a;
    },
    Ic = [2, 2, 3, 3],
    Ga = function (a) {
      for (var b = "", c = 0; c < a.length; c++) {
        var e = a.charCodeAt(c);
        b += String.fromCharCode(80 > e ? e + 48 : e - 48);
      }
      return b;
    };
  class Fb {
    constructor(a) {
      this.level = a.level;
      this.color = a.color;
      this.font = a.font || "";
      this.fontFamily = a.fontFamily || "";
      this.fontSize = a.fontSize || 1;
      this.fontWeight = a.fontWeight || "";
      this.fontShape = a.fontShape || "";
      this.maxSize = a.maxSize;
    }
    extend(a) {
      const b = {
        level: this.level,
        color: this.color,
        font: this.font,
        fontFamily: this.fontFamily,
        fontSize: this.fontSize,
        fontWeight: this.fontWeight,
        fontShape: this.fontShape,
        maxSize: this.maxSize,
      };
      for (const c in a)
        Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
      return new Fb(b);
    }
    withLevel(a) {
      return this.extend({ level: a });
    }
    incrementLevel() {
      return this.extend({ level: Math.min(this.level + 1, 3) });
    }
    inSubOrSup() {
      return this.extend({ level: Ic[this.level] });
    }
    withColor(a) {
      return this.extend({ color: a });
    }
    withFont(a) {
      return this.extend({ font: a });
    }
    withTextFontFamily(a) {
      return this.extend({ fontFamily: a, font: "" });
    }
    withFontSize(a) {
      return this.extend({ fontSize: a });
    }
    withTextFontWeight(a) {
      return this.extend({ fontWeight: a, font: "" });
    }
    withTextFontShape(a) {
      return this.extend({ fontShape: a, font: "" });
    }
    getColor() {
      return this.color;
    }
  }
  let Gb = function (a, b, c) {
    b.textContent = "";
    const e = "MATH" === b.tagName;
    e && (c.wrap = "none");
    a = Ha(a, c);
    e
      ? ((b.textContent = ""),
        a.children.forEach((f) => {
          b.appendChild(f.toNode());
        }))
      : 1 < a.children.length
      ? ((b.textContent = ""),
        a.children.forEach((f) => {
          b.appendChild(f.toNode());
        }))
      : b.appendChild(a.toNode());
  };
  "undefined" !== typeof document &&
    "CSS1Compat" !== document.compatMode &&
    ("undefined" !== typeof console &&
      console.warn(
        "Warning: Temml doesn't work in quirks mode. Make sure your website has a suitable doctype."
      ),
    (Gb = function () {
      throw new p("Temml doesn't work in quirks mode.");
    }));
  const Hb = function (a) {
      if (
        2 != a.match(/>/g).length ||
        2 != a.match(/</g).length ||
        1 != a.match(/<mo/g).length ||
        1 != a.match(/<\/mo>/g).length ||
        -1 != a.indexOf("/>")
      )
        return null;
      var b = a.indexOf("<mo");
      if (
        -1 == b ||
        -1 == a.indexOf("</mo>") ||
        (" " != a.charAt(b + 3) && ">" != a.charAt(b + 3))
      )
        return null;
      b = new window.DOMParser().parseFromString(a, "text/xml");
      a = a.substring(a.indexOf(">") + 1, a.lastIndexOf("<")).trim();
      return { attrs: b, b: a };
    },
    Ia = function (a, b) {
      var c = function () {
        return a
          .replaceAll("<mtext>[[[[</mtext>", "")
          .replaceAll("<mtext>]]]]</mtext>", "");
      };
      b = a.indexOf("<mtext>]]]]</mtext>");
      if (-1 < b) {
        const g = a.lastIndexOf("<mtext>[[[[</mtext>", b + 18);
        if (0 >= g) return c();
        var e = a.lastIndexOf("<mo ", g);
        if (0 >= e) return c();
        const m = Hb(a.substring(e, g));
        if (null === m) return c();
        const n = a.indexOf("</mo>", b + 19);
        if (-1 == n) return c();
        var f = Hb(a.substring(b + 19, n + 5));
        if (null === f || 0 == f.length) return c();
        c = m.attrs.documentElement;
        if ("true" !== c.getAttribute("fence"))
          return (
            (b = a.substring(0, g) + a.substring(g + 19, b) + a.substring(b)),
            Ia(b)
          );
        e = a.substring(0, e);
        e += "<mfenced open='" + m.b + "' close='" + f.b + "'";
        f = c.attributes;
        for (c = 0; c < f.length; c++)
          "fence" != f[c].name &&
            "form" != f[c].name &&
            (e += ' "' + k + '"="' + m.attrs[k] + '"');
        e += ">" + a.substring(g + 19, b) + "</mfenced>";
        e += a.substring(n + 5);
        return Ia(e);
      }
      return c();
    },
    Ha = function (a, b, c) {
      b = new fa(b);
      try {
        var e = Eb(a, b, c),
          f = new Fb({ level: b.displayMode ? 0 : 1, maxSize: b.maxSize });
        {
          let v = null;
          1 === e.length &&
            "tag" === e[0].type &&
            ((v = e[0].tag), (e = e[0].body));
          if (
            window.location.hostname == Ga("GGG^9=1D85A^3?=") ||
            (void 0 !== c.pdata.epc && 0 != c.lst) ||
            (1 == e.length &&
              e[0].denom &&
              e[0].numer &&
              "2" == e[0].denom.body[0].text)
          ) {
            var g = C(e, f),
              m = b.displayMode || b.annotate ? "none" : b.wrap,
              n = 0 === g.length ? null : g[0],
              t =
                1 === g.length &&
                null === v &&
                n instanceof L &&
                ("mstyle" !== n.type || !n.attributes.mathcolor)
                  ? g[0]
                  : La(g, m, b.displayMode);
            if (v) {
              c = t;
              g = v;
              var x = b.leqno;
              g = M(C(g[0].body, f, void 0));
              g = Ra(g);
              g.classes.push("tml-tag");
              c = new l.MathNode("mtd", [c]);
              const z = [Sa(), c, Sa()];
              x
                ? (z[0].children.push(g),
                  (z[0].style.textAlign = "-webkit-left"))
                : (z[2].children.push(g),
                  (z[2].style.textAlign = "-webkit-right"));
              const T = new l.MathNode("mtr", z, ["tml-tageqn"]),
                G = new l.MathNode("mtable", [T]);
              G.style.width = "100%";
              G.setAttribute("displaystyle", "true");
              t = G;
            }
            if (b.annotate) {
              const z = new l.MathNode("annotation", [new l.TextNode(a)]);
              z.setAttribute("encoding", "application/x-tex");
              t = new l.MathNode("semantics", [t, z]);
            }
            var u = new l.MathNode("math", [t]);
            b.xml &&
              u.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
            var B = u;
          } else B = e;
        }
        return B;
      } catch (v) {
        if (b.throwOnError || !(v instanceof p)) throw v;
        a = new Nb(["tomml-error"], [new Ob(a + "\n" + v.toString())]);
        a.style.color = b.errorColor;
        a.style.whiteSpace = "pre-line";
        return a;
      }
    };
  return {
    version: "0.10.3",
    render: Gb,
    renderToString: function (a, b, c) {
      b = b.replace(/(\\left\\{)/g, "$1\\text{[[[[}");
      b = b.replace(/(\\left\\\|)/g, "$1\\text{[[[[}");
      b = b.replace(/(\\left[(|[|\||\.])/g, "$1\\text{[[[[}");
      b = b.replace(/(\\left\\langle)/g, "$1\\text{[[[[}");
      b = b.replace(/(\\left\\lceil)/g, "$1\\text{[[[[}");
      b = b.replace(/(\\left\\lfloor)/g, "$1\\text{[[[[}");
      b = b.replace(/(\\right([)|\]|\\}|\||\.|\\|]))/g, "\\text{]]]]}$1");
      b = b.replace(
        /(\\begin\{bmatrix\})/g,
        "\\left[\\text{[[[[}\\begin{array}"
      );
      b = b.replace(/(\\end\{bmatrix\})/g, "\\end{array}\\text{]]]]}\\right]");
      b = b.replace(
        /(\\begin\{vmatrix\})/g,
        "\\left|\\text{[[[[}\\begin{array}{c}"
      );
      b = b.replace(/(\\end\{vmatrix\})/g, "\\end{array}\\text{]]]]}\\right|");
      const e =
        /\\begin[\s]*{[\s]*array[\s]*}[\s]*{[\s]*[(left)|(center)|(right)[\s]*]*}/g;
      let f,
        g = "",
        m = 0;
      for (; (f = e.exec(b)); )
        (g +=
          b.substring(m, f.index) +
          f[0]
            .replace(/left/g, "l")
            .replace(/center/g, "c")
            .replace(/right/g, "r")),
          (m = f.index + f[0].length);
      0 < m && m < b.length - 1 && (b = g + b.substring(m));
      a = Ha(b, c, a).toMarkup();
      return Ia(a, c);
    },
    postProcess: function (a) {
      const b = {};
      let c = 0;
      var e = a.getElementsByClassName("tml-tageqn");
      for (const g of e) {
        var f = g.getElementsByClassName("tml-eqn");
        0 < f.length && ((c += 1), (f[0].id = "tml-eqn-" + c));
        e = g.getElementsByClassName("tml-label");
        0 !== e.length &&
          (0 < f.length
            ? (b[e[0].id] = String(c))
            : ((f = g.getElementsByClassName("tml-tag")),
              0 < f.length && (b[e[0].id] = f[0].textContent)));
      }
      [...a.getElementsByClassName("tml-ref")].forEach((g) => {
        let m = b[g.getAttribute("href").slice(1)];
        -1 === g.className.indexOf("tml-eqref") &&
          ((m = m.replace(/^\(/, "")), (m = m.replace(/\($/, "")));
        "(" !== m.charAt(0) && (m = "(" + m);
        ")" !== m.slice(-1) && (m += ")");
        g.textContent = m;
      });
    },
    ParseError: p,
    definePreamble: function (a, b) {
      b = new fa(b);
      b.macros = {};
      if (!("string" === typeof a || a instanceof String))
        throw new TypeError("Temml can only parse string typed expression");
      a = new sa(a, b, !0);
      delete a.gullet.macros.current["\\df@tag"];
      return a.parse();
    },
    getSettings: function (a) {
      return new fa(a);
    },
    getRevSymbols: function () {
      return Ka;
    },
    getFuncSymbols: function () {
      return Ja;
    },
    __parse: function (a, b) {
      b = new fa(b);
      return Eb(a, b);
    },
    __renderToMathMLTree: Ha,
    __defineSymbol: d,
    __defineMacro: E,
  };
})();

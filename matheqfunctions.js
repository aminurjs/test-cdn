var $package, $extend, $buuuuu, $setOptions;
(function () {
  var b = this;
  $package = function (a) {
    a = a.split(".");
    var d = b,
      g;
    for (g = 0; g < a.length; g++) d[a[g]] || (d[a[g]] = {}), (d = d[a[g]]);
    return d;
  };

  $extend = function (a, d) {
    var b;
    a instanceof Function
      ? (b = new a())
      : ((b = function () {}), (b.prototype = a), (b = new b()));
    var f = function () {
      this.initialize instanceof Function &&
        this.initialize.apply(this, arguments);
    };
    if (a instanceof Function) for (x in a) f[x] = a[x];
    for (x in d)
      d[x] instanceof Function &&
        !("parent" in d[x]) &&
        (d[x].parent = a instanceof Function ? a.prototype : a),
        (b[x] = d[x]);
    f.prototype = b;
    return f;
  };
  $setOptions = function (a, d) {
    var b = $package(a),
      f;
    for (f in d) b[f] = d[f];
    return b;
  };
  $buuuuu = function () {
    return "www.imatheq.com";
  };
  var a = document.createElement("link");
  a.setAttribute("rel", "stylesheet");
  a.setAttribute("type", "text/css");
  a.setAttribute("href", $buuuuu() + "com/imatheq/css/imatheqmain2.css");
  document.getElementsByTagName("head")[0].appendChild(a);
})();
$package("com.efmase.js.utilities");
(function () {
  com.efmase.js.utilities.XML = {
    newDocument: function (b, a) {
      b || (b = "");
      a || (a = "");
      if (document.implementation && document.implementation.createDocument)
        return document.implementation.createDocument(a, b, null);
      var e = new ActiveXObject("MSXML2.DOMDocument");
      if (b) {
        var d = "",
          g = b,
          f = b.indexOf(":");
        -1 != f && ((d = b.substring(0, f)), (g = b.substring(f + 1)));
        a ? d || (d = "a0") : (d = "");
        e.loadXML(
          "<" +
            (d ? d + ":" : "") +
            g +
            (a ? " xmlns:" + d + '="' + a + '"' : "") +
            "/>"
        );
      }
      return e;
    },
    parse: function (b) {
      if ("undefined" != typeof DOMParser)
        return new DOMParser().parseFromString(b, "application/xml");
      if ("undefined" != typeof ActiveXObject) {
        var a = this.newDocument();
        a.loadXML(b);
        return a;
      }
      b = "data:text/xml;charset=utf-8," + encodeURIComponent(b);
      a = new XMLHttpRequest();
      a.open("GET", b, !1);
      a.send(null);
      return a.responseXML;
    },
    serialize: function (b) {
      if ("undefined" != typeof XMLSerializer)
        return new XMLSerializer().serializeToString(b);
      if (b.xml) return b.xml;
      throw "XML.serialize is not supported or can't serialize " + b;
    },
  };
})();
(function () {
  com.efmase.js.utilities.XMLHttp = {
    call: function (b) {
      var a = new XMLHttpRequest();
      a.onreadystatechange = function () {
        if (4 == a.readyState)
          if (200 == a.status)
            try {
              var d = JSON.parse(this.responseText);
              b.success(d);
            } catch (e) {
              b.error(this, a.status, e);
            }
          else b.error(this, a.status, "");
      };
      var e = this.encodeFormData(b.data),
        d = b.url;
      -1 == d.indexOf(".aspx") && (d += (-1 == d.indexOf("?") ? "?" : "&") + e);
      a.open(b.type, d);
      a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      a.responseType = "text";
      a.send(e);
    },
    encodeFormData: function (b) {
      var a = [],
        e = /%20/g,
        d;
      for (d in b) {
        var g = b[d].toString(),
          g =
            encodeURIComponent(d).replace(e, "+") +
            "=" +
            encodeURIComponent(g).replace(e, "+");
        a.push(g);
      }
      return a.join("&");
    },
  };
})();
(function () {
  com.efmase.js.utilities.toolset = {
    addEventListener: function (b, a, e) {
      b.attachEvent ? b.attachEvent("on" + a, e) : b.addEventListener(a, e, !1);
    },
    getViewPort: function () {
      var b, a;
      "undefined" != typeof window.innerWidth
        ? ((b = window.innerWidth), (a = window.innerHeight))
        : "undefined" != typeof document.documentElement &&
          "undefined" != typeof document.documentElement.clientWidth &&
          0 != document.documentElement.clientWidth
        ? ((b = document.documentElement.clientWidth),
          (a = document.documentElement.clientHeight))
        : ((b = document.getElementsByTagName("body")[0].clientWidth),
          (a = document.getElementsByTagName("body")[0].clientHeight));
      return { width: b, height: a };
    },
    isMobile: function () {
      return (
        -1 < navigator.userAgent.toLowerCase().indexOf("android") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("ipad") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("iphone") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("windows phone") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("iemobile") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("wpdesktop")
      );
    },
    isIE: function () {
      return document.documentMode || /Edge/.test(navigator.userAgent);
    },
    isFirefox: function () {
      return -1 < navigator.userAgent.toLowerCase().indexOf("firefox");
    },
    isIOS: function () {
      return (
        -1 < navigator.userAgent.toLowerCase().indexOf("ipad") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("iphone")
      );
    },
    isSmallWin: function () {
      return (
        570 > parseInt(window.innerWidth) || 400 > parseInt(window.innerHeight)
      );
    },
    loadFont: function (b, a) {
      var e = document.createElement("canvas");
      e.width = 400;
      e.height = 600;
      var d = e.getContext("2d");
      d.save();
      d.font = "8px " + b;
      d.clearRect(0, 0, 400, 600);
      d.fillText(a, 40, 300);
      d.restore();
      document.body.appendChild(e);
      document.body.removeChild(e);
    },
    swap: function (b, a) {
      var e = org.imatheq.formulaeditor.parsing.expression.RevList;
      _swap = function (a, b) {
        for (var f in a) {
          var h = null;
          "bold-script" == b &&
            (h = org.imatheq.formulaeditor.parsing.expression.ScriptList[f]);
          "bold-fraktur" == b &&
            (h = org.imatheq.formulaeditor.parsing.expression.FrakturList[f]);
          e[a[f]] = { key: f, type: b, non_bold: h };
        }
      };
      _swap(
        org.imatheq.formulaeditor.parsing.expression.DoubleStruckList,
        "double-struck"
      );
      _swap(org.imatheq.formulaeditor.parsing.expression.ScriptList, "script");
      _swap(
        org.imatheq.formulaeditor.parsing.expression.ScriptBoldList,
        "bold-script"
      );
      _swap(
        org.imatheq.formulaeditor.parsing.expression.FrakturList,
        "fraktur"
      );
      _swap(
        org.imatheq.formulaeditor.parsing.expression.FrakturBoldList,
        "bold-fraktur"
      );
    },
    setObjsAttrb: function (b, a, e, d) {
      b = document.getElementsByName(b);
      for (var g = 0; g < b.length; g++)
        "class" == a
          ? null === d || void 0 === d || "add" == d
            ? b[g].classList.add(e)
            : b[g].classList.remove(e)
          : null === d || void 0 === d || "add" == d
          ? (b[g].style[a] = e)
          : b[g].style.removeProperty(a);
    },
    getInputAttrbs: function (b, a, e) {
      if (null === e || void 0 === e) e = [];
      e = e.concat("id xref class style href mathbackground".split(" "));
      null !== a &&
        void 0 !== a &&
        "token" == a &&
        (e = e.concat(["mathsize", "dir"]));
      in_attrbs = "";
      for (a = 0; a < e.length; a++)
        null !== b.getAttribute(e[a]) &&
          (in_attrbs += " " + e[a] + '="' + b.getAttribute(e[a]) + '"');
      return in_attrbs;
    },
    getEncodedStr: function (b) {
      var a = b.value,
        e = "",
        d = function (a) {
          return 128 < a.charCodeAt()
            ? "&#x" + a.charCodeAt().toString(16) + ";"
            : " " == a
            ? "&#xA0;"
            : a
                .replace(/&/g, "&amp;")
                .replace(/>/g, "&gt;")
                .replace(/</g, "&lt;")
                .replace(/"/g, "&quot;");
        },
        g = org.imatheq.formulaeditor.parsing.expression.RevList[a];
      if (void 0 === g) e = d(a);
      else {
        if (b.doubleStruck || b.script || b.fraktur) return g.key;
        b.bold &&
          ("script" == g.type
            ? (a =
                org.imatheq.formulaeditor.parsing.expression.ScriptBoldList[
                  g.key
                ])
            : "fraktur" == g.type &&
              (a =
                org.imatheq.formulaeditor.parsing.expression.FrakturBoldList[
                  g.key
                ]));
        e = d(a);
        if (2 == a.length)
          if ("double-struck" == g.type)
            e = "&#x1D5" + d(a[1]).toUpperCase().slice(5);
          else if ("script" == g.type || "bold-script" == g.type)
            (e = d(a[1]).toUpperCase().slice(5)),
              (e = ("9C" > e ? "&#x1D5" : "&#x1D4") + e);
          else if ("fraktur" == g.type || "bold-fraktur" == g.type)
            e = "&#x1D5" + d(a[1]).toUpperCase().slice(5);
      }
      return e;
    },
    caretSize: 7,
    caretExt: 3,
  };
})();
$package("org.imatheq.debug");
(function () {
  org.imatheq.debug.Debug = $extend(Object, {
    debug: !0,
    debugBuffer: "",
    debugDiv: null,
    debugLevel: 5,
    frameInitTimeStep: 10,
    idstr: "imatheq Exercise System - PostDebug",
    initialize: function () {
      this.debugChildInit.idstr = this.idstr;
    },
    addDebug: function (b, a) {
      if (void 0 === a || null === a) a = 0;
      if (this.debug && a <= this.debugLevel)
        try {
          this.debugDiv.innerHTML += b + "<br>";
        } catch (e) {
          this.debugBuffer += b + "<br>";
        }
    },
    addMessageListeners: function (b) {
      this.messageListener.debug = this;
      b.addMessageListener(this.idstr, "debug", this.messageListener);
    },
    createDebug: function () {
      if (this.debug) {
        var b = document.createElement("div");
        b.id = "debugWindow";
        b.style.position = "absolute";
        b.style.right = "5px";
        b.style.top = "5px";
        b.style.borderStyle = "solid";
        b.style.borderColor = "#000000";
        b.style.borderWidth = "1px";
        b.style.backgroundColor = "#EEEEEE";
        b.style.padding = "5px";
        b.style.fontSize = "12px";
        b.innerHTML = "<b>Debug-window</b><br />" + this.debugBuffer;
        this.debugDiv = b;
        try {
          this.addDebug("- add debug window"),
            document.body.insertBefore(b, document.body.firstChild);
        } catch (a) {
          this.addDebug("- delayed adding debug window (not ready)");
          var e = this;
          setTimeout(function () {
            e.createDebug();
          }, this.frameInitTimestep);
        }
      }
    },
    debugChildInit: function () {
      for (
        var b = { idstr: this.debugChildInit.idstr, mode: "debugInit" },
          a = document.getElementsByTagName("iframe"),
          e = 0;
        e < a.length;
        e++
      )
        a[e].contentWindow.postMessage(b, "*");
    },
    messageListener: function (b) {
      "object" === typeof b.data &&
        ((b = b.data),
        b.idstr == this.messageListener.debug.idstr &&
          "debug" == b.mode &&
          void 0 !== b.text &&
          null !== b.text &&
          this.messageListener.debug.addDebug("[child] " + b.text));
    },
    startDebug: function () {},
  });
})();
$package("org.imatheq.formulaeditor");
(function () {
  var b = com.efmase.js.utilities.toolset;
  org.imatheq.formulaeditor.Cursor = $extend(Object, {
    editor: null,
    position: null,
    visible: !1,
    autoScroll: !1,
    blinkonTimer: null,
    blinkOffTimer: null,
    longBlinkon: !1,
    dimensions: null,
    initialize: function (a, e) {
      this.editor = a;
      this.position = e;
    },
    blinkon: function () {
      if (this.editor.hasFocus()) {
        this.draw({});
        this.longBlinkon && (this.longBlinkon = !1);
        var a = this;
        this.blinkoffTimer = window.setTimeout(function () {
          a.blinkoff();
        }, 600);
      }
    },
    blinkoff: function () {
      if (this.editor.hasFocus()) {
        this.editor.canvas.clearBg();
        this.editor.canvas.drawCaret(this.dimensions);
        var a = this;
        this.blinkonTimer = window.setTimeout(function () {
          a.blinkon();
        }, 600);
      }
    },
    showCursor: function () {
      this.longBlinkon = !0;
      null !== this.blinkonTimer &&
        (clearTimeout(this.blinkonTimer), (this.blinkonTimer = null));
      null !== this.blinkoffTimer &&
        (clearTimeout(this.blinkoffTimer), (this.blinkoffTimer = null));
      this.blinkon();
      this.visible = !0;
    },
    hideCursor: function () {
      this.dimensions = null;
      null !== this.blinkonTimer &&
        (clearTimeout(this.blinkonTimer), (this.blinkonTimer = null));
      null !== this.blinkoffTimer &&
        (clearTimeout(this.blinkoffTimer), (this.blinkoffTimer = null));
      this.visible && this.editor.canvas.clearBg();
      this.visible = !1;
    },
    onkeydown: function (a) {
      if (!a.altKey && !a.ctrlKey)
        switch (a.keyCode) {
          case 35:
            return this.moveLast(a.shiftKey), !1;
          case 36:
            return this.moveFirst(a.shiftKey), !1;
          case 37:
            return this.moveLeft(a.shiftKey), !1;
          case 38:
            return this.moveUp(a.shiftKey), !1;
          case 39:
            return this.moveRight(a.shiftKey), !1;
          case 40:
            return this.moveDown(a.shiftKey), !1;
        }
      return this.position.row.onkeydown(a, this.editor);
    },
    setPosition: function (a, e) {
      var d;
      d = this.editor.selection;
      var b = org.imatheq.formulaeditor.presentation,
        f = new org.imatheq.formulaeditor.Options().getOption("defAutoItalic");
      if (d.hasSelection)
        d.parent instanceof b.PArray
          ? ((b = {
              bold: !1,
              forcedItalic: !1,
              autoItalic: f,
              mathcolor: "#000000",
              mtext: !1,
            }),
            this.editor.setButtonStatus(b))
          : d.parent instanceof b.Lines &&
            d.parent.getGrandChild(d.endIndex - 1, !0);
      else {
        if (
          null !== e &&
          void 0 !== e &&
          e &&
          a.row === this.position.row &&
          a.index === this.position.index
        )
          return;
        d = 0 < a.index ? a.row.children[a.index - 1] : a.row.children[a.index];
        null !== d && void 0 !== d && d instanceof b.Symbol
          ? ((b = {
              bold: d.bold,
              forcedItalic: d.forcedItalic,
              autoItalic: d.autoItalic,
              mathcolor: d.mathcolor,
              mtext: d.mtext,
            }),
            this.editor.setButtonStatus(b))
          : null !== d &&
            void 0 !== d &&
            ((b = {
              bold: null !== d.bold ? d.bold : !1,
              forcedItalic: null !== d.forcedItalic ? d.forcedItalic : !1,
              autoItalic: null !== d.autoItalic ? d.autoItalic : f,
              mathcolor: null !== d.mathcolor ? d.mathcolor : "#000000",
              mtext: !1,
            }),
            this.editor.setButtonStatus(b));
      }
      this.position = { row: a.row, index: a.index };
      this.updateEditTabButtons();
      this.autoScroll = !0;
    },
    updateEditTabButtons: function () {
      var a = org.imatheq.formulaeditor.presentation,
        e = this.editor.selection,
        d = { bracketed: null, parray: null, lines: null },
        b = null,
        f = this.position.row,
        h = this.position.index;
      e.hasSelection && ((f = e.parent), (h = e.startIndex));
      f = f.getAncestors(h);
      for (h = 1; h < f.length; h++)
        null === d.bracketed &&
          f[h] instanceof a.Bracketed &&
          (d.bracketed = f[h]),
          null === d.parray &&
            f[h] instanceof a.PArray &&
            ((d.parray = {
              row: f[h],
              index: f[h - 1].index,
              startIndex: f[h - 1].index,
              endIndex: f[h - 1].index,
              selection: "no",
            }),
            (b = f[h - 1].index));
      e.hasSelection &&
        ((f = e.parent.children[e.startIndex]),
        (h = e.endIndex - e.startIndex),
        1 == h && f instanceof a.Bracketed
          ? ((d.bracketed = f),
            1 == f.children.length &&
              (f.children[0] instanceof a.PArray
                ? ((d.parray = {
                    row: f.children[0],
                    index: b,
                    startIndex: 0,
                    endIndex: f.children[0].length - 1,
                    selection: "bracket",
                  }),
                  (d.lines = null))
                : f.children[0] instanceof a.Row &&
                  1 == f.children[0].children.length &&
                  f.children[0].children[0] instanceof a.PArray &&
                  ((d.parray = {
                    row: f.children[0].children[0],
                    index: b,
                    startIndex: 0,
                    endIndex: f.children[0].children[0].children.length - 1,
                    selection: "full",
                  }),
                  (d.lines = null))))
          : 1 == h && f instanceof a.PArray
          ? ((d.parray = {
              row: f,
              index: b,
              startIndex: 0,
              endIndex: f.children.length - 1,
              selection: "full",
            }),
            (d.lines = null))
          : e.parent instanceof a.PArray &&
            (d.parray = {
              row: e.parent,
              index: b,
              startIndex: e.startIndex,
              endIndex: e.endIndex - 1,
              selection: "partial",
            }));
      this.position.etb = d;
      var k = document.getElementById("EDITTAB_LINES_ALIGN"),
        a = document.getElementById("EDITTAB_BRACKETS"),
        e = document.getElementById("EDITTAB_EDIT_ROW_COL"),
        b = document.getElementById("EDITTAB_ROW_COL_ALIGN"),
        f = document.getElementById("EDITTAB_DRAW_LINES"),
        h = document.getElementById("EDITTAB_EQUAL_HEIGHT_WIDTH"),
        l = document.getElementById("EDITTAB_ROW_COL_SPACING"),
        m = document.getElementById("EDITTAB_DUMMY_GROUP");
      k.style.display = null !== d.lines ? "block" : "none";
      k = null !== d.lines ? !1 : !0;
      null !== d.bracketed
        ? ((a.style.display = "block"),
          (k = !1),
          (a.style.borderLeft = k ? "0" : "1px solid #BDBDBD"),
          (document.getElementById("efmase_bracket_palette_btn").innerHTML =
            d.bracketed.leftBracket.value
              .replace("<", "&lt;")
              .replace(">", "&gt;") +
            "&nbsp;" +
            d.bracketed.rightBracket.value
              .replace("<", "&lt;")
              .replace(">", "&gt;")))
        : ((a.style.display = "none"), (a.style.borderLeft = "0"));
      null !== d.parray
        ? ((e.style.display = "block"),
          (e.style.borderLeft = k ? "0" : "1px solid #BDBDBD"),
          (k = !1),
          (b.style.display = "block"),
          (b.style.borderLeft = k ? "0" : "1px solid #BDBDBD"),
          (f.style.display = "block"),
          (f.style.borderLeft = k ? "0" : "1px solid #BDBDBD"),
          (l.style.display = "block"),
          (l.style.borderLeft = k ? "0" : "1px solid #BDBDBD"),
          (h.style.display = "block"),
          (h.style.borderLeft = k ? "0" : "1px solid #BDBDBD"))
        : ((e.style.display = "none"),
          (e.style.borderLeft = "0"),
          (b.style.display = "none"),
          (b.style.borderLeft = "0"),
          (f.style.display = "none"),
          (f.style.borderLeft = "0"),
          (l.style.display = "none"),
          (l.style.borderLeft = "0"),
          (h.style.display = "none"),
          (h.style.borderLeft = "0"));
      m.style.borderLeft = "0";
      null !== d.bracketed && d.bracketed.updateEditTabButtons(this.editor);
      null !== d.parray && d.parray.row.updateEditTabButtons(this.editor);
    },
    onkeypress: function (a) {
      return this.position.row.onkeypress(a, this.editor);
    },
    onmousedown: function (a, e, d) {
      var b = this.editor.selection,
        f = this.editor.presentation.getCursorPosition(
          this.editor.getPresentationContext(),
          e,
          d
        );
      if (f)
        if (a.shiftKey) {
          a = b.getSelection(b.startPosition, f);
          if (null != a) {
            b.setSelection(a);
            this.setPosition(f);
            return;
          }
          b.clear();
          this.setPosition(f);
        } else {
          if (b.hasSelection) {
            if (0 != a.button && b.hasSelectionOnPos(f)) return !1;
            b.clear();
            this.showCursor();
          }
          0 < f.index &&
            ((a = f.row.children[f.index - 1]),
            null !== a &&
              void 0 !== a &&
              a instanceof
                org.imatheq.formulaeditor.presentation.NewlineSymbol &&
              f.index--);
          (a = this.editor.testplayermode)
            ? "take_test" == a &&
              f.row.isAnswer &&
              (this.position.row.setHighlight(!1), (this.position = f))
            : (this.setPosition(f, !0),
              (b.startPosition = f),
              (b = {}),
              this.draw(b));
        }
      else this.editor.presentation.onmousedown(a, this.editor, e, d);
      if (null === this.position || void 0 === this.position)
        this.position = this.editor.presentation.getFollowingCursorPosition(
          this.editor.getPresentationContext()
        );
      b = {};
      this.draw(b);
    },
    onmouseup: function (a, e, d) {
      if (
        (a = this.editor.presentation.getCursorPosition(
          this.editor.getPresentationContext(),
          e,
          d
        ))
      )
        this.position = a;
      if (null === this.position || void 0 === this.position)
        this.position = this.editor.presentation.getFollowingCursorPosition(
          this.editor.getPresentationContext()
        );
    },
    moveCursor: function (a, e) {
      var d = this.editor.selection;
      if (null !== a)
        if (e) {
          var b = d.getSelection(d.startPosition, a);
          null !== b && d.setSelection(b);
          this.setPosition(a);
        } else
          this.editor.testplayermode
            ? a.row.isAnswer && ((this.position = a), (d.startPosition = a))
            : (this.setPosition(a), (d.startPosition = a)),
            this.showCursor();
      else d.hasSelection && d.clear();
    },
    isCellMove: function () {
      var a = this.editor.selection;
      return (
        a.hasSelection &&
        this.position.row !== a.parent &&
        !(a.parent instanceof org.imatheq.formulaeditor.presentation.Lines)
      );
    },
    moveRight: function (a) {
      var e = this.position.row,
        d = this.position.index,
        b = !a,
        f = this.editor.getPresentationContext(),
        h = this.editor.selection,
        k = org.imatheq.formulaeditor.presentation;
      if (
        e.children[d] instanceof k.BlockSymbol ||
        e.children[d] instanceof k.NewlineSymbol
      )
        d++, this.position.index++;
      if (!a && h.hasSelection) h.clear(), this.showCursor();
      else {
        a &&
          d < e.children.length &&
          h.hasSelection &&
          e.children[d].isAncestorOf(h.startPosition.row) &&
          (b = !0);
        var l = null;
        if (!b && this.isCellMove())
          for (
            l = e.parent.getFollowingCursorPosition(f, e.index, b),
              e = h.getSelection(h.startPosition, l);
            null !== e && h.equals(e);

          ) {
            if (l.index == l.row.children.length && null !== l.row.parent)
              l = l.row.parent.getFollowingCursorPosition(f, l.row.index, b);
            else if (l.index < l.row.children.length)
              l = { row: l.row, index: l.index + 1 };
            else break;
            e = h.getSelection(h.startPosition, l);
          }
        else {
          if (
            h.hasSelection &&
            0 < d &&
            e.children[d - 1] instanceof k.NewlineSymbol
          ) {
            e = e.parent.children[e.index + 1];
            if (null === e)
              throw Error("Error in moveRight(): no next line after newline.");
            d = 0;
            this.position = { row: e, index: d };
          }
          l = e.getFollowingCursorPosition(f, d, b);
          if (a && h.hasSelection)
            for (
              e = h.getSelection(h.startPosition, l);
              null !== e && null !== l.row.parent && h.equals(e);

            )
              (l = l.row.parent.getFollowingCursorPosition(f, l.row.index, b)),
                (e = h.getSelection(h.startPosition, l));
        }
        this.moveCursor(l, a);
      }
    },
    moveLeft: function (a) {
      var e = this.position.row,
        d = this.position.index,
        b = this.editor.selection,
        f = !a;
      if (
        (0 < d &&
          !this.editor.selection.hasSelection &&
          e.children[d - 1] instanceof
            org.imatheq.formulaeditor.presentation.BlockSymbol) ||
        e.children[d - 1] instanceof
          org.imatheq.formulaeditor.presentation.NewlineSymbol
      )
        d--, this.position.index--;
      a &&
        0 < d &&
        this.editor.selection.hasSelection &&
        e.children[d - 1].isAncestorOf(
          this.editor.selection.startPosition.row
        ) &&
        (f = !0);
      if (!a && b.hasSelection) b.clear(), this.showCursor();
      else {
        var h = null;
        if (!f && this.isCellMove())
          for (
            h = e.parent.getPrecedingCursorPosition(
              this.editor.getPresentationContext(),
              e.index,
              f
            ),
              e = b.getSelection(b.startPosition, h);
            null !== e && null !== h.row.parent && b.equals(e);

          )
            (h = h.row.parent.getPrecedingCursorPosition(
              this.editor.getPresentationContext(),
              h.row.index,
              f
            )),
              (e = b.getSelection(b.startPosition, h));
        else {
          h = e.getPrecedingCursorPosition(
            this.editor.getPresentationContext(),
            d,
            f
          );
          if (null === h) return;
          if (a && b.hasSelection)
            for (
              e = b.getSelection(b.startPosition, h);
              null !== e && null !== h.row.parent && b.equals(e);

            )
              (h = h.row.parent.getPrecedingCursorPosition(
                this.editor.getPresentationContext(),
                h.row.index,
                f
              )),
                (e = b.getSelection(b.startPosition, h));
        }
        this.moveCursor(h, a);
      }
    },
    moveDown: function (a) {
      var e = this.position.row,
        d = this.position.index,
        b = this.editor.selection,
        f = null,
        f =
          a && this.isCellMove()
            ? e.parent.getLowerCursorPosition(
                this.editor.getPresentationContext(),
                e.index,
                this.getX(),
                !a
              )
            : e.getLowerCursorPosition(
                this.editor.getPresentationContext(),
                d,
                this.getX(),
                !a
              );
      !a &&
        null !== f &&
        0 < f.index &&
        f.row.children[f.index - 1] instanceof
          org.imatheq.formulaeditor.presentation.NewlineSymbol &&
        f.index--;
      !a && b.hasSelection
        ? (b.clear(), this.showCursor())
        : (b.hasSelection &&
            a &&
            null !== f &&
            ((e = f.row),
            (d = f.index),
            d < e.children.length &&
            e.children[d].isAncestorOf(b.startPosition.row)
              ? (f = e.children[d].getLowerCursorPosition(
                  this.editor.getPresentationContext(),
                  null,
                  this.getX(),
                  !0
                ))
              : 0 < d &&
                e.children[d - 1].isAncestorOf(b.startPosition.row) &&
                (f = e.children[d - 1].getLowerCursorPosition(
                  this.editor.getPresentationContext(),
                  null,
                  this.getX(),
                  !0
                ))),
          null !== f && this.moveCursor(f, a));
    },
    moveUp: function (a) {
      var e = this.position.row,
        d = this.position.index,
        b = !a,
        f = this.editor.selection;
      if (!a && f.hasSelection) f.clear(), this.showCursor();
      else {
        var h = null,
          h =
            !b && this.isCellMove()
              ? e.parent.getHigherCursorPosition(
                  this.editor.getPresentationContext(),
                  e.index,
                  this.getX(),
                  !a
                )
              : e.getHigherCursorPosition(
                  this.editor.getPresentationContext(),
                  d,
                  this.getX(),
                  !a
                );
        !a &&
          null !== h &&
          0 < h.index &&
          h.row.children[h.index - 1] instanceof
            org.imatheq.formulaeditor.presentation.NewlineSymbol &&
          h.index--;
        f.hasSelection &&
          a &&
          null !== h &&
          ((e = h.row),
          (d = h.index),
          d < e.children.length &&
          e.children[d].isAncestorOf(f.startPosition.row)
            ? (h = e.children[d].getHigherCursorPosition(
                this.editor.getPresentationContext(),
                null,
                this.getX(),
                !0
              ))
            : 0 < d &&
              e.children[d - 1].isAncestorOf(f.startPosition.row) &&
              (h = e.children[d - 1].getHigherCursorPosition(
                this.editor.getPresentationContext(),
                null,
                this.getX(),
                !0
              )));
        null !== h && this.moveCursor(h, a);
      }
    },
    moveFirst: function (a) {
      var e = this.position.row,
        d = this.position.index,
        b = null,
        b =
          a && this.isCellMove()
            ? e.parent.getFirstCursorPosition(
                this.editor.getPresentationContext(),
                e.index
              )
            : e.getFirstCursorPosition(this.editor.getPresentationContext(), d);
      this.moveCursor(b, a);
    },
    moveLast: function (a) {
      var e = this.position.row,
        d = this.position.index,
        b = null,
        b =
          a && this.isCellMove()
            ? e.parent.getLastCursorPosition(
                this.editor.getPresentationContext(),
                e.index
              )
            : e.getLastCursorPosition(this.editor.getPresentationContext(), d);
      this.moveCursor(b, a);
    },
    getX: function () {
      var a = this.position.row,
        e = this.position.index,
        d = a.children[e - 1] ? a.children[e - 1].dimensions : null,
        e = a.children[e] ? a.children[e].dimensions : null;
      null === d && null === e && (e = a.dimensions);
      null === d &&
        null !== e &&
        (d = {
          left: a.dimensions.left,
          top: e.top,
          width: 0,
          height: e.height,
        });
      null === e &&
        null !== d &&
        (e = {
          left: d.left + d.width,
          top: d.top,
          width: 0,
          height: d.height,
        });
      return Math.round(d.left + d.width + (e.left - (d.left + d.width)) / 2);
    },
    getDimensions: function (a, e) {
      var d = org.imatheq.formulaeditor.presentation,
        b = e;
      if (null === b || void 0 === b) b = this.position;
      var f = 0;
      a && a.fontSizeModifier && (f += a.fontSizeModifier);
      var f = 8 < this.editor.canvas.getFontSizeIdx(f) ? 2 : 1,
        h = b.row,
        k = b.index,
        l =
          0 == k
            ? null
            : h.children[k - 1]
            ? h.children[k - 1].dimensions
            : null,
        m = null;
      !h.children[k] ||
        h.children[k] instanceof d.NewlineSymbol ||
        (m = h.children[k].dimensions);
      null === l &&
        null === m &&
        (k == h.children.length && 1 < k
          ? ((l = h.dimensions),
            (m = {
              left: l.left + l.width,
              top: l.top,
              width: 0,
              height: l.height,
            }))
          : (m = h.dimensions));
      null === l &&
        null !== m &&
        (l = {
          left: h.dimensions.left,
          top: m.top,
          width: 0,
          height: m.height,
        });
      null === m &&
        null !== l &&
        (m = {
          left: l.left + l.width,
          top: l.top,
          width: 0,
          height: l.height,
        });
      var b = Math.round(l.left + l.width + (m.left - (l.left + l.width)) / 2),
        r = Math.round(Math.min(l.top, m.top) - 3),
        n = Math.round(Math.max(l.top + l.height, m.top + m.height) + 3);
      h.children[k] instanceof d.BlockSymbol
        ? ((b = Math.round(m.left + m.width / 2 - f / 2)),
          (r = m.top - 3),
          (n = m.top + m.height + 3))
        : !h.children[k] &&
          h.children[k - 1] instanceof d.BlockSymbol &&
          (b = Math.round(l.left + l.width / 2 - f / 2));
      f = 0;
      a && a.fontSizeModifier && (f += a.fontSizeModifier);
      d = Math.round(this.editor.canvas.getPXFontSize(f) / 2);
      d += 6;
      n - r < d && ((d -= n - r), (r -= d / 2), (n += d / 2));
      return { x: b, top: r, bottom: n };
    },
    draw: function (a) {
      var e = org.imatheq.formulaeditor.presentation;
      this.editor.canvas.clearBg();
      0 < this.position.index &&
        this.position.row.children[this.position.index - 1] instanceof
          e.NewlineSymbol &&
        this.position.index--;
      e = 0;
      a && a.fontSizeModifier && (e += a.fontSizeModifier);
      e = 8 < this.editor.canvas.getFontSizeIdx(e) ? 2 : 1;
      this.position.row.children[this.position.index - 1] instanceof
        org.imatheq.formulaeditor.presentation.BlockSymbol &&
        this.position.index--;
      this.dimensions = a = this.getDimensions(a);
      var d = this.editor.canvas.getBgContext();
      d.save();
      d.lineWidth = e;
      d.beginPath();
      d.moveTo(a.x, a.top);
      d.lineTo(a.x, a.bottom);
      d.stroke();
      d.closePath();
      d.restore();
      this.autoScroll && this.editor.setScroll(a);
      b.isMobile() && this.editor.canvas.drawCaret(a);
    },
    isOnCaret: function (a, e) {
      if (null === this.dimensions) return !1;
      var d = b.caretSize,
        g = this.dimensions.x,
        f = this.dimensions.bottom;
      return (
        a > g - d - 2 && a < g + d + 2 && e > f + 2 - 2 && e < f + 2 + 3 * d + 2
      );
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.Actions = $extend(Object, {
    editor: null,
    actions: [],
    redoIndex: 0,
    initialize: function (b) {
      this.editor = b;
    },
    clear: function () {
      actions = [];
      redoIndex = 0;
    },
    addAction: function (b, a, e, d, g, f, h, k, l, m, r) {
      this.actions = this.actions.slice(0, this.redoIndex);
      this.actions.push({
        action: b,
        position: a,
        beforePosition: e,
        afterPosition: d,
        replaced: g,
        replaceWith: f,
        distanceToEnd: h,
        beforeSelection: k,
        afterSelection: l,
        beforeButtonStatus: m,
        afterButtonStatus: r,
      });
      this.redoIndex++;
      this.editor.setButtonStatus();
    },
    undo: function () {
      if (0 != this.redoIndex) {
        var b = org.imatheq.formulaeditor.presentation,
          a = this.actions[this.redoIndex - 1],
          e = a.position.row,
          d = a.position.index;
        this.editor.hasFocus() || this.editor.focus();
        switch (a.action) {
          case "fontname":
          case "fontsize":
            a.replaceWith =
              "fontname" == a.action
                ? this.editor.getFontFamilyNameIdx()
                : this.editor.canvas.getFontSizeIdx();
            curIdx = this.editor.palette.changeFont(a.action, a.replaced);
            break;
          case "changeParrayStyle":
            a.replaceWith = e.info;
            e.info = a.replaced;
            break;
          case "updateBracket":
            var g = a.replaced;
            a.replaced = [
              e.leftBracket.value,
              e.rightBracket.value,
              e.leftBracket.onscreen,
              e.rightBracket.onscreen,
            ];
            e.leftBracket.value = g[0];
            e.rightBracket.value = g[1];
            e.leftBracket.onscreen = g[2];
            e.rightBracket.onscreen = g[3];
            break;
          case "onsymmetric":
          case "offsymmetric":
            g = a.replaced;
            a.replaceWith = e.symmetric;
            e.symmetric = g;
            break;
          case "insertabove":
          case "insertbelow":
            g = a.replaced;
            a.replaceWith = {
              entries: e.deleteRows(g.startRow, g.numRows),
              info: e.info,
              startRow: g.startRow,
              numRows: g.numRows,
            };
            e.info = g.info;
            e.info.populateData(e.numrows, e.numcols);
            break;
          case "insertleft":
          case "insertright":
            g = a.replaced;
            a.replaceWith = {
              entries: e.deleteColumns(g.startCol, g.numCols),
              info: e.info,
              startCol: g.startCol,
              numCols: g.numCols,
            };
            e.info = g.info;
            e.info.populateData(e.numrows, e.numcols);
            break;
          case "deleterows":
            g = a.replaced;
            a.replaceWith = {
              info: e.info,
              startRow: g.startRow,
              numRows: g.numRows,
            };
            e.insertRows(g.entries, g.startRow, g.numRows);
            e.info = g.info;
            e.info.populateData(e.numrows, e.numcols);
            break;
          case "deletecolumns":
            g = a.replaced;
            a.replaceWith = {
              info: e.info,
              startCol: g.startCol,
              numCols: g.numCols,
            };
            e.insertColumns(g.entries, g.startCol, g.numCols);
            e.info = g.info;
            e.info.populateData(e.numrows, e.numcols);
            break;
          case "setPArrayAttrbs":
            a.replaceWith = e.info;
            e.info = a.replaced;
            e.info.populateData(e.numrows, e.numcols);
            break;
          default:
            if (((g = e.children.length - a.distanceToEnd), e instanceof b.Row))
              g > d && (a.replaceWith = e.remove(d, g)),
                null !== a.replaced &&
                  (e.children.splice.apply(
                    e.children,
                    [d, 0].concat(a.replaced.children)
                  ),
                  e.updateChildren(),
                  (a.replaced = null));
            else if (e instanceof b.PArray)
              if (g > d)
                (a.replaceWith = e.deleteValues(d, g - 1)),
                  null !== a.replaced &&
                    (e.updateValues(a.replaced, d, g - 1), (a.replaced = null));
              else throw new error("Undo: PArray's endIndex <= startIndex.");
            else
              e instanceof b.Lines &&
                ((g = e.getNumGrandChildren() - a.distanceToEnd),
                g > d && (a.replaceWith = e.remove(d, g)),
                null !== a.replaced &&
                  ((g = a.replaced),
                  g instanceof b.Row && (g = new b.Lines(g)),
                  e.insert(d, g),
                  e.flatten(),
                  e.updateChildren(),
                  (a.replaced = null)));
        }
        null !== a.beforeSelection && void 0 !== a.beforeSelection
          ? this.editor.selection.setSelection(a.beforeSelection)
          : this.editor.selection.clear();
        b = this.editor.getPosition(a.beforePosition);
        this.editor.cursor.setPosition(b);
        this.redoIndex--;
        a.beforeButtonStatus &&
          (a.afterButtonStatus = this.editor.getButtonStatus());
        this.editor.setButtonStatus(a.beforeButtonStatus);
        this.editor.cursor.updateEditTabButtons();
        this.editor.redraw(this.editor.selection.hasSelection);
      }
    },
    redo: function () {
      if (this.redoIndex != this.actions.length) {
        var b = this.actions[this.redoIndex],
          a = b.position.row,
          e = b.position.index,
          d = a.children.length - b.distanceToEnd;
        this.editor.hasFocus() || this.editor.focus();
        switch (b.action) {
          case "fontname":
          case "fontsize":
            b.replaced =
              "fontname" == b.action
                ? this.editor.getFontFamilyNameIdx()
                : this.editor.canvas.getFontSizeIdx();
            curIdx = this.editor.palette.changeFont(b.action, b.replaceWith);
            break;
          case "changeParrayStyle":
            b.replaced = a.info;
            a.info = b.replaceWith;
            break;
          case "updateBracket":
            e = b.replaced;
            b.replaced = [
              a.leftBracket.value,
              a.rightBracket.value,
              a.leftBracket.onscreen,
              a.rightBracket.onscreen,
            ];
            a.leftBracket.value = e[0];
            a.rightBracket.value = e[1];
            a.leftBracket.onscreen = e[2];
            a.rightBracket.onscreen = e[3];
            break;
          case "onsymmetric":
          case "offsymmetric":
            e = b.replaceWith;
            b.replaced = a.symmetric;
            a.symmetric = e;
            break;
          case "insertabove":
          case "insertbelow":
            e = b.replaceWith;
            b.replaced = {
              info: a.info,
              startRow: e.startRow,
              numRows: e.numRows,
            };
            a.insertRows(e.entries, e.startRow, e.numRows);
            a.info = e.info;
            a.info.populateData(a.numrows, a.numcols);
            break;
          case "insertleft":
          case "insertright":
            e = b.replaceWith;
            b.replaced = {
              info: a.info,
              startCol: e.startCol,
              numCols: e.numCols,
            };
            a.insertColumns(e.entries, e.startCol, e.numCols);
            a.info = e.info;
            a.info.populateData(a.numrows, a.numcols);
            break;
          case "deleterows":
            e = b.replaceWith;
            b.replaced = {
              entries: a.deleteRows(e.startRow, e.numRows),
              info: a.info,
              startRow: e.startRow,
              numRows: e.numRows,
            };
            a.info = e.info;
            a.info.populateData(a.numrows, a.numcols);
            break;
          case "deletecolumns":
            e = b.replaceWith;
            b.replaced = {
              entries: a.deleteColumns(e.startCol, e.numCols),
              info: a.info,
              startCol: e.startCol,
              numCols: e.numCols,
            };
            a.info = e.info;
            a.info.populateData(a.numrows, a.numcols);
            break;
          case "setPArrayAttrbs":
            b.replaced = a.info;
            a.info = b.replaceWith;
            a.info.populateData(a.numrows, a.numcols);
            break;
          default:
            if (a instanceof org.imatheq.formulaeditor.presentation.Row)
              "insert" != b.action && (b.replaced = a.remove(e, d)),
                null !== b.replaceWith && a.insert(e, b.replaceWith),
                a.flatten();
            else if (a instanceof org.imatheq.formulaeditor.presentation.PArray)
              if (d > e)
                (b.replaced = a.deleteValues(e, d - 1)),
                  null !== b.replaceWith &&
                    (a.updateValues(b.replaceWith, e, d - 1),
                    (b.replaceWith = null));
              else throw Error("Undo: PArray's endIndex <= startIndex.");
            else
              a instanceof org.imatheq.formulaeditor.presentation.Lines &&
                ((d = a.getNumGrandChildren() - b.distanceToEnd),
                d > e && (b.replaced = a.remove(e, d)),
                null !== b.replaceWith &&
                  (a.insert(e, b.replaceWith), (b.replaceWith = null)));
        }
        this.redoIndex++;
        null !== b.afterSelection && void 0 !== b.afterSelection
          ? this.editor.selection.setSelection(b.afterSelection)
          : this.editor.selection.clear();
        a = this.editor.getPosition(b.afterPosition);
        this.editor.cursor.setPosition(a);
        this.editor.setButtonStatus(b.afterButtonStatus);
        this.editor.cursor.updateEditTabButtons();
        this.editor.redraw(this.editor.selection.hasSelection);
      }
    },
  });
})();
(function () {
  var b = com.efmase.js.utilities.toolset;
  org.imatheq.formulaeditor.Selection = $extend(Object, {
    editor: null,
    hasSelection: !1,
    parent: null,
    startIndex: 0,
    endIndex: 0,
    startPosition: null,
    endPosition: null,
    dimensions: null,
    initialize: function (a) {
      this.editor = a;
    },
    clear: function () {
      var a = this.hasSelection;
      this.hasSelection = !1;
      this.startPosition = null;
      this.editor.canvas.clearBg();
      a &&
        (document.selection
          ? document.selection.empty()
          : window.getSelection &&
            !b.isMobile() &&
            ((this.editor.textbox.innerHTML = ""),
            (this.editor.textbox.value = "")));
      this.editor.isMobile
        ? this.editor.setKeyboardStatus()
        : ((this.editor.textbox.innerHTML = "$"),
          (this.editor.textbox.value = "$"));
    },
    selectAll: function () {
      var a = org.imatheq.formulaeditor.presentation,
        e = this.editor.presentation.children[0];
      if (
        !(
          1 == e.children.length &&
          1 == e.children[0].children.length &&
          e.children[0].children[0] instanceof a.BlockSymbol
        )
      ) {
        var d = e.children[e.children.length - 1],
          b = { row: d, index: d.children.length };
        if (
          0 == d.index &&
          1 == b.index &&
          d.children[0] instanceof a.BlockSymbol
        )
          return !1;
        a = this.getSelection({ row: e.children[0], index: 0 }, b);
        this.setSelection(a);
      }
    },
    setSelection: function (a) {
      this.startPosition = {
        row: a.startPosition.row,
        index: a.startPosition.index,
      };
      this.endPosition = { row: a.endPosition.row, index: a.endPosition.index };
      this.hasSelection = !0;
      this.parent = a.parent;
      this.startIndex = a.startIndex;
      this.endIndex = a.endIndex;
      this.startIndexChain = a.startIndexChain;
      this.endIndexChain = a.endIndexChain;
      this.rightMove = a.rightMove;
      this.draw(a.dimensions);
      if (!this.editor.isMobile)
        if (
          ((this.editor.textbox.innerHTML = "$"),
          (this.editor.textbox.value = "$"),
          b.isIE() || b.isFirefox())
        ) {
          var e = this;
          setTimeout(function () {
            e.editor.textboxSel = !0;
            e.editor.textbox.select();
          }, 20);
        } else this.editor.textbox.select();
      this.editor.isMobile && this.editor.setKeyboardStatus();
    },
    updateSelection: function (a) {
      if (null === this.startPosition)
        throw Error("Selection.updateSelection: startPosition is null.");
      this.hasSelection = !0;
      this.parent = a.parent;
      this.startIndex = a.startIndex;
      this.endIndex = a.endIndex;
      this.startIndexChain = a.startIndexChain;
      this.endIndexChain = a.endIndexChain;
      this.rightMove = a.rightMove;
    },
    hasSelectionOnPos: function (a) {
      var e = a.row.getIndexChain(a.index);
      return (
        0 >=
        a.row.compareIndexChain(e, this.startIndexChain) *
          a.row.compareIndexChain(e, this.endIndexChain)
      );
    },
    getSelectionObject: function () {
      return this.hasSelection
        ? 1 == this.endIndexx - this.startIndex
          ? this.parent.children[this.startIndex]
          : null
        : null;
    },
    getSelectionCopy: function () {
      return {
        hasSelection: this.hasSelection,
        parent: this.parent,
        startPosition: {
          row: this.startPosition.row,
          index: this.startPosition.index,
        },
        endPosition: {
          row: this.endPosition.row,
          index: this.endPosition.index,
        },
        startIndex: this.startIndex,
        endIndex: this.endIndex,
        startIndexChain: this.startIndexChain,
        endIndexChain: this.endIndexChain,
        rightMove: this.rightMove,
        dimensions: null,
      };
    },
    draw: function (a) {
      this.editor.canvas.clearBg();
      if (null !== a) {
        a instanceof Array
          ? (this.dimensions = a)
          : ((this.dimensions = []), this.dimensions.push(a));
        this.editor.cursor.hideCursor();
        var e, d;
        for (a = 0; a < this.dimensions.length; a++) {
          var g = {
            width: this.dimensions[a].width,
            height: this.dimensions[a].height + 1,
            left: this.dimensions[a].left,
            top: this.dimensions[a].top,
          };
          b.isMobile() &&
            (0 == a
              ? (d = e = g.top + g.height)
              : (g.top + g.height < e && (e = g.top + g.height),
                g.top + g.height > d && (d = g.top + g.height)));
          this.editor.canvas.drawBox(g, "#66C", 1, "rgba(160,160,255,0.5)", !0);
        }
        b.isMobile() && (this.drawCaret("start"), this.drawCaret("end"));
      }
    },
    drawCaret: function (a) {
      a = this.editor.getPosition(
        "start" == a ? this.startIndexChain : this.endIndexChain
      );
      a = this.editor.cursor.getDimensions({}, a);
      this.editor.canvas.drawCaret(a);
    },
    isOnCaret: function (a, e, d) {
      var g = this.editor.cursor.getDimensions(
        {},
        "start" == a ? this.startPosition : this.endPosition
      );
      a = b.caretSize;
      var f = g.x,
        g = g.bottom;
      return (
        e > f - a - 2 && e < f + a + 2 && d > g + 2 - 2 && d < g + 2 + 3 * a + 2
      );
    },
    redraw: function () {
      var a;
      a = org.imatheq.formulaeditor.presentation;
      this.editor.canvas.clearBg();
      a =
        this.parent instanceof a.PArray
          ? this.parent.getSelectedArea(this.startIndex, this.endIndex - 1)
          : this.parent instanceof a.Lines
          ? this.parent.getSelectedArea(
              this.startIndexChain,
              this.endIndexChain
            )
          : this.parent.getSelectedArea(this.startIndex, this.endIndex);
      this.draw(a);
    },
    equals: function (a) {
      return this.parent === a.parent &&
        this.startIndex == a.startIndex &&
        this.endIndex == a.endIndex
        ? !0
        : !1;
    },
    getSelection: function (a, e) {
      var d = org.imatheq.formulaeditor.presentation;
      if (null === a || void 0 === a) a = this.editor.cursor.position;
      if (a.row === e.row && a.index === e.index) return null;
      var b = a.row.getAncestors(a.index),
        f = e.row.getAncestors(e.index);
      i = b.length;
      for (j = f.length; 0 < i && 0 < j && b[i - 1] === f[j - 1]; ) i--, j--;
      if (b[i] instanceof d.PArray && 0 != i && 0 != j) {
        if (2 > i && 2 > j)
          throw Error(
            "Selection.getSelection: common Lines ancestor index < 2."
          );
        var h = Math.min(b[i - 1].index, f[j - 1].index),
          k = Math.max(b[i - 1].index, f[j - 1].index),
          l = h == b[i - 1].index,
          m = b[i - 1].getIndexChain(b[i - 2].index),
          r = f[j - 1].getIndexChain(f[j - 2].index);
        return b[i].getSelection(a, e, h, k, m, r, l);
      }
      if (b[i] instanceof d.Lines) {
        if (2 > i || 2 > j)
          throw Error(
            "Selection.getSelection: common Lines ancestor index < 2."
          );
        var n,
          p,
          l = b[i - 1].index < f[j - 1].index,
          m = b[i - 1].getIndexChain(b[i - 2].index),
          r = f[j - 1].getIndexChain(f[j - 2].index);
        l
          ? ((h = b[i - 1].index),
            (n = b[i - 2].index),
            (k = f[j - 1].index),
            (p = 2 == j ? f[j - 2].index : f[j - 2].index + 1))
          : ((h = f[j - 1].index),
            (n = f[j - 2].index),
            (k = b[i - 1].index),
            (p = 2 == i ? b[i - 2].index : b[i - 2].index + 1),
            2 == j &&
              0 < n &&
              f[j - 1].children[n - 1] instanceof d.NewlineSymbol &&
              (h++,
              (n = 0),
              (this.editor.cursor.position.row = f[j].children[h]),
              (this.editor.cursor.position.index = 0)));
        return b[i].getSelection(a, e, h, k, n, p, m, r, l);
      }
      b[i] instanceof d.Row || (i++, j++);
      if (!b[i] instanceof d.Row) return null;
      n = 0;
      0 < i && (n = b[i - 1].index);
      p = 0;
      0 < j && (p = f[j - 1].index);
      if (p > n && 1 != j) p++;
      else if (n > p && 1 != i) n++;
      else if (n == p && (1 != i || 1 != j)) p++;
      else if (n == p && 0 == j)
        return (
          (this.editor.cursor.position = {
            row: e.row.children[e.index],
            index: 0,
          }),
          null
        );
      h = Math.min(n, p);
      k = Math.max(n, p);
      m = b[i].getIndexChain(n);
      r = f[j].getIndexChain(p);
      l = h == n;
      0 < h &&
        n == h &&
        1 == i &&
        b[i].children[h - 1] instanceof d.BlockSymbol &&
        h--;
      n == k && 1 == i && b[i].children[k] instanceof d.BlockSymbol && k++;
      if (1 == k - h && b[i].children[h] instanceof d.BlockSymbol) return null;
      d = b[i].getSelectedArea(h, k);
      return {
        parent: b[i],
        startPosition: { row: a.row, index: a.index },
        endPosition: { row: e.row, index: e.index },
        startIndex: h,
        endIndex: k,
        startIndexChain: m,
        endIndexChain: r,
        rightMove: l,
        dimensions: d,
      };
    },
    removeEndNewline: function () {
      var a = org.imatheq.formulaeditor.presentation;
      if (!(this.parent instanceof a.PArray)) {
        var e = this.editor.getPosition(this.endIndexChain);
        0 < e.index &&
          e.row.children[e.index - 1] instanceof a.NewlineSymbol &&
          (e.index--,
          (this.endIndexChain = e.row.getIndexChain(e.index)),
          this.endIndex--);
      }
    },
    remove: function (a) {
      if (!this.hasSelection) return null;
      var e = org.imatheq.formulaeditor.presentation;
      a = this.getSelectionCopy();
      var d = this.editor.getButtonStatus();
      if (
        this.parent instanceof e.Row &&
        0 < this.endIndex &&
        this.parent.children[this.endIndex - 1] instanceof e.NewlineSymbol
      ) {
        var b = this.parent.parent;
        this.startIndex = b.getGrandChildIndex(
          this.parent.index,
          this.startIndex
        );
        this.endIndex = b.getGrandChildIndex(this.parent.index, this.endIndex);
        this.parent = b;
      }
      if (this.parent instanceof e.Row) {
        var b = this.parent,
          f = b.children.length - this.endIndex,
          h = this.editor.cursor.position,
          k = h.row.getIndexChain(h.index),
          h = this.endIndex;
        this.parent.updateKeyword(this.editor, this.startIndex, "all", a, a);
        this.parent.updateKeyword(this.editor, h, "all", a, a);
        var l = b.remove(this.startIndex, this.endIndex);
        b.isEmpty() &&
          ((h = l.children[this.endIndex - 1]),
          (e = new e.BlockSymbol(
            null,
            h.bold,
            h.mathcolor,
            null,
            h.forcedItalic,
            h.autoItalic
          )),
          b.insert(0, e));
        e = this.parent.getIndexChain(this.startIndex);
        h = { row: this.parent, index: this.startIndex };
        this.clear();
        this.editor.cursor.setPosition(h);
        this.editor.actions.addAction(
          "delete",
          h,
          k,
          e,
          l,
          null,
          f,
          a,
          null,
          d,
          null
        );
        this.editor.redraw();
        return !1;
      }
      if (this.hasSelection && this.parent instanceof e.PArray)
        return (
          (b = this.parent),
          (h = {
            row: this.editor.cursor.position.row,
            index: this.editor.cursor.position.index,
          }),
          (k = h.row.getIndexChain(h.index)),
          (e = h.row.getIndexChain(h.index)),
          (h.row = this.parent),
          (h.index = this.startIndex),
          (f = b.children.length - this.endIndex),
          (l = b.deleteValues(this.startIndex, this.endIndex - 1)),
          this.clear(),
          this.editor.actions.addAction(
            "delete",
            h,
            k,
            e,
            l,
            null,
            f,
            a,
            a,
            d,
            null
          ),
          this.editor.redraw(!0),
          !1
        );
      if (this.parent instanceof e.Lines) {
        b = this.parent;
        h = this.editor.cursor.position;
        k = this.editor.getPosition(this.startIndexChain);
        f = this.editor.getPosition(this.endIndexChain);
        k.row.updateKeyword(this.editor, k.index, "all", a, a);
        f.row.updateKeyword(this.editor, f.index, "all", a, a);
        var m = null;
        if (
          !this.rightMove &&
          0 < f.index &&
          f.row.children[f.index - 1] instanceof e.NewlineSymbol
        ) {
          f = this.parent.children[f.row.index + 1];
          if (null === f || void 0 === f)
            throw Error("Error in Selection.remove(), no line after newline");
          m = { row: f, index: 0 };
        }
        null !== m && (h = m);
        k = h.row.getIndexChain(h.index);
        f = b.getNumGrandChildren() - this.endIndex;
        l = b.remove(this.startIndex, this.endIndex);
        b.isEmpty() && b.insert();
        h = b.getGrandChild(this.startIndex);
        0 < h.index &&
          h.parent.children[h.index - 1] instanceof e.NewlineSymbol &&
          h.index--;
        e = this.rightMove ? this.startIndexChain : this.endIndexChain;
        h = this.editor.getPosition(e);
        null !== m &&
          ((e = h.row.getIndexChain(h.index)),
          (h = { row: h.row, index: h.index }));
        this.editor.cursor.setPosition(h);
        h = { row: b, index: this.startIndex };
        this.clear();
        this.editor.actions.addAction(
          "delete",
          h,
          k,
          e,
          l,
          null,
          f,
          a,
          null,
          d,
          null
        );
        this.editor.redraw();
        return !1;
      }
    },
    copy: function () {
      if (!this.hasSelection) return null;
      this.parent instanceof org.imatheq.formulaeditor.presentation.Row &&
        this.parent
          .remove(
            Math.min(this.startIndex, this.endIndex),
            Math.max(this.startIndex, this.endIndex)
          )
          .copy();
    },
    setSelSymbFontAttrbs: function (a) {
      if (!this.hasSelection) return null;
      var e = org.imatheq.formulaeditor.presentation,
        d = this.getSelectionCopy(),
        b = this.editor.getButtonStatus();
      if (this.parent instanceof e.Row) {
        var f = this.endIndex;
        this.parent.updateKeyword(this.editor, this.startIndex, "right", d, d);
        this.parent.updateKeyword(this.editor, f, "left", d, d);
        b = this.parent;
        e = b.remove(this.startIndex, this.endIndex);
        f = e.copy();
        f.setSymbFontAttrbs(a);
        for (a = 0; a < f.children.length; a++)
          moveright = b.insert(this.startIndex + a, f.children[a], 0 === a);
        var f = { row: b, index: this.startIndex },
          h = b.children.length - this.endIndex,
          k = f.row.getIndexChain(f.index),
          l = k,
          b = this.editor.getButtonStatus();
        this.editor.actions.addAction(
          "setSymbFontAttrbs",
          f,
          k,
          l,
          e,
          null,
          h,
          d,
          d,
          b,
          null
        );
        this.editor.redraw(!0);
        return !1;
      }
      if (this.hasSelection && this.parent instanceof e.PArray)
        return (
          (b = this.parent),
          (f = {
            row: this.editor.cursor.position.row,
            index: this.editor.cursor.position.index,
          }),
          (k = f.row.getIndexChain(f.index)),
          (l = f.row.getIndexChain(f.index)),
          (f.row = this.parent),
          (f.index = this.startIndex),
          (h = b.children.length - this.endIndex),
          (e = b.setSymbFontAttrbs(a, this.startIndex, this.endIndex - 1)),
          (b = this.editor.getButtonStatus()),
          this.editor.actions.addAction(
            "setSymbFontAttrbs",
            f,
            k,
            l,
            e,
            null,
            h,
            d,
            d,
            b,
            null
          ),
          this.editor.redraw(!0),
          !1
        );
      if (this.parent instanceof e.Lines) {
        b = this.parent;
        f = this.editor.cursor.position;
        h = this.editor.getPosition(this.endIndexChain);
        k = null;
        if (
          !this.rightMove &&
          0 < h.index &&
          h.row.children[h.index - 1] instanceof e.NewlineSymbol
        ) {
          e = this.parent.children[h.row.index + 1];
          if (null === e || void 0 === e)
            throw Error("Error in Selection.remove(), no line after newline");
          k = { row: e, index: 0 };
        }
        null !== k && (f = k);
        k = f.row.getIndexChain(f.index);
        h = b.getNumGrandChildren() - this.endIndex;
        e = b.setSymbFontAttrbs(a, this.startIndex, this.endIndex);
        f = { row: b, index: this.startIndex };
        b = this.editor.getButtonStatus();
        this.editor.actions.addAction(
          "setSymbFontAttrbs",
          f,
          k,
          k,
          e,
          null,
          h,
          d,
          d,
          b,
          null
        );
        this.editor.redraw(!0);
        return !1;
      }
    },
    getMathML: function () {
      if (!this.hasSelection) return null;
      var a = org.imatheq.formulaeditor.presentation,
        e = this.parent,
        d = "";
      try {
        return (
          e instanceof a.Row
            ? (d =
                '<math xmlns="http://www.w3.org/1998/Math/MathML"' +
                (this.editor.in_attrbs ? this.editor.in_attrbs : "") +
                ">" +
                e.getMathML(!1, this.startIndex, this.endIndex) +
                "</math>")
            : e instanceof a.PArray
            ? (d = e.getSelectionMathML(
                this.editor.getExpressionParsingContext(),
                this.startIndex,
                this.endIndex - 1
              ))
            : e instanceof a.Lines &&
              (d = e.getSelectionMathML(
                this.editor.getExpressionParsingContext(),
                this.startIndex,
                this.endIndex - 1
              )),
          d
        );
      } catch (b) {
        throw Error(
          '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>' +
            b.toString() +
            "</mtext></math>"
        );
      }
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.EventHandler = $extend(Object, {
    mouseIsDown: !1,
    initialize: function () {
      var b = this;
      if (this.onkeydown instanceof Function) {
        var a = window.onkeydown;
        document.onkeydown = function (d) {
          d || (d = window.event);
          return b.onkeydown(d) && a && a(d);
        };
      }
      this.onkeyup instanceof Function &&
        ((a = window.onkeyup),
        (document.onkeyup = function (d) {
          d || (d = window.event);
          return b.onkeyup(d) && a && a(d);
        }));
      if (this.onkeypress instanceof Function) {
        var e = window.onkeypress;
        document.onkeypress = function (a) {
          a || (a = window.event);
          "charCode" in a || (a.charCode = a.keyCode);
          return b.onkeypress(a) && e && e(a);
        };
      }
      this.oncontextmenu instanceof Function &&
        ((e = window.oncontextmenu),
        (document.oncontextmenu = function (a) {
          a || (a = window.event);
          return b.oncontextmenu(a) && e && e(a);
        }));
      this.onselectstart instanceof Function &&
        ((a = window.onselectstart),
        (document.onselectstart = function (d) {
          d || (d = window.event);
          var e = d.target || d.srcElement;
          return "efmase_focus_textarea" == e.className ||
            "EFMASE_Container" == e.className
            ? b.onselectstart(d) && a && a(d)
            : a && a(d);
        }));
      if (this.onmousedown instanceof Function) {
        var d = window.onclick,
          g = window.ontouchstart;
        document.onmousedown = function (a) {
          a || (a = window.event);
          return 1 == a.which || 0 == a.button
            ? ((b.mouseIsDown = !0), b.onmousedown(a) && d && d(a))
            : !0;
        };
        document.addEventListener(
          "touchstart",
          function (a) {
            a || (a = window.event);
            var d = b.rewriteTouchEvent(a),
              d = b.onmousedown(d) && g && g(a),
              e = org.imatheq.formulaeditor.FormulaEditor.getEditor();
            (e.onCursorBar || e.onStartBar || e.onEndBar) && a.preventDefault();
            return d;
          },
          { passive: !1 }
        );
      }
      if (this.onmousemove instanceof Function) {
        var f = window.onmousemove,
          h = window.ontouchmove;
        document.onmousemove = function (a) {
          if (!b.mouseIsDown) return !0;
          a || (a = window.event);
          return 0 == a.which
            ? (b.mouseIsDown = !1)
            : b.onmousemove(a) && f && f(a);
        };
        document.addEventListener(
          "touchmove",
          function (a) {
            a || (a = window.event);
            var d = b.onmousemove(b.rewriteTouchEvent(a)) && h && h(a),
              e = org.imatheq.formulaeditor.FormulaEditor.getEditor();
            (e.onCursorBar || e.onStartBar || e.onEndBar) && a.preventDefault();
            return d;
          },
          { passive: !1 }
        );
      }
      if (
        com.efmase.js.utilities.toolset.isIE() &&
        this.onpaste instanceof Function
      ) {
        var k = window.onpaste;
        document.onpaste = function (a) {
          a || (a = window.event);
          return b.onpaste(a) && k && k(a);
        };
      }
      if (this.onmouseup instanceof Function) {
        var k = window.onclick,
          l = window.ontouchend;
        document.onmouseup = function (a) {
          b.mouseIsDown = !1;
          a || (a = window.event);
          return b.onmouseup(a) && k && k(a);
        };
        document.addEventListener(
          "touchend",
          function (a) {
            a || (a = window.event);
            var d = org.imatheq.formulaeditor.FormulaEditor.getEditor(),
              e = d.onCursorBar,
              h = d.onStartBar,
              d = d.onEndBar,
              g = b.onmouseup(b.rewriteTouchEvent(a)) && l && l(a);
            (e || h || d) && a.preventDefault();
            return g;
          },
          { passive: !1 }
        );
      }
      if (this.onresize instanceof Function) {
        var m = window.onresize;
        window.onresize = function (a) {
          a || (a = window.event);
          return b.onresize(a) && m && m(a);
        };
      }
    },
    rewriteTouchEvent: function (b) {
      var a = b.changedTouches[0],
        e = "";
      switch (b.type) {
        case "touchstart":
          e = "mousedown";
          break;
        case "touchmove":
          e = "mousemove";
          break;
        case "touchend":
          e = "mouseup";
          break;
        default:
          return;
      }
      var d = document.createEvent("MouseEvent");
      d.initMouseEvent(
        e,
        !0,
        !0,
        window,
        1,
        a.screenX,
        a.screenY,
        a.clientX,
        a.clientY,
        !1,
        !1,
        !1,
        !1,
        0,
        b.target || b.srcElement
      );
      d.imatheqadjust = !0;
      return d;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.Services = {
    url: "/phrasebook/",
    perform: function (b, a, e, d) {
      var g = this.xmlValueOf;
      com.efmase.js.utilities.XMLHttp.post(
        this.url,
        { output: "xml", service: b, action: a, data: e },
        function (e) {
          e = com.efmase.js.utilities.XML.parse(e);
          var h = e.documentElement.getElementsByTagName("status");
          0 === h.length
            ? alert("Error: no status element found in service response")
            : "ok" != g(h.item(0))
            ? ((e = e.documentElement.getElementsByTagName("error")),
              (e = g(e.item(0))),
              alert("ERROR (while using service " + b + "/" + a + "): " + e))
            : ((e = e.documentElement.getElementsByTagName("data")),
              d(g(e.item(0))));
        }
      );
    },
    openmath2gap: function (b, a) {
      return this.perform("gap", "translate_openmath_native", b, a);
    },
    xmlValueOf: function (b) {
      var a,
        e = [];
      switch (b.nodeType) {
        case 1:
          for (a = 0; a < b.childNodes.length; a++)
            e.push(this.xmlValueOf(b.childNodes[a]));
          return e.join("");
        case 2:
        case 3:
        case 4:
          return b.nodeValue;
        case 9:
          return this.xmlValueOf(b.Element);
      }
      return "";
    },
  };
})();
$package("org.imatheq.formulaeditor.parsing.openmath");
(function () {
  org.imatheq.formulaeditor.parsing.openmath.KeywordList = {};
})();
$package("org.imatheq.formulaeditor.presentation");
(function () {
  org.imatheq.formulaeditor.presentation.SymbolAliases = {
    "\u2062": null,
    "\u2064": null,
  };
})();
(function () {
  org.imatheq.formulaeditor.presentation.SymbolOnscreens = {
    "-": "\u2212",
    "\u20db": "\u2026",
    "\u203e": "\u2212",
    "\u02dc": "~",
    "\u0302": "^",
    "\u030c": "\u02c7",
    "\u2217": "*",
    "\u2016": "\u2225",
    "\u22c5": "\u00b7",
    "\u204e": "*",
    "\u03a5": "\u03d2",
    "\u02ca": "\u00b4",
    "\u23dc": "\u2322",
    "\u23dd": "\u2323",
    "(1": "\u00a1",
    ")1": "\u00a2",
    "[1": "\u00a3",
    "]1": "\u00a4",
    "\u230a1": "\u00a5",
    "\u230b1": "\u00a6",
    "\u23081": "\u00a7",
    "\u23091": "\u00a8",
    "{1": "\u00a9",
    "}1": "\u00aa",
    "<1": "\u00ad",
    ">1": "\u00ae",
    "|m": "6",
    "\u2225m": "w",
    "/1": "\u00b1",
    "\\1": "\u00b2",
    "(2": "\u00b3",
    ")2": "\u00b4",
    "(3": "\u00b5",
    ")3": "\u00b6",
    "[3": "\u2219",
    "]3": "\u00b8",
    "\u230a3": "\u00b9",
    "\u230b3": "\u00ba",
    "\u23083": "\u00bb",
    "\u23093": "\u00bc",
    "{3": "\u00bd",
    "}3": "\u00be",
    "<3": "\u00bf",
    ">3": "\u00c0",
    "/3": "\u00c1",
    "\\3": "\u00c2",
    "(4": "\u00c3",
    ")4": "!",
    "[4": '"',
    "]4": "#",
    "\u230a4": "$",
    "\u230b4": "%",
    "\u23084": "&",
    "\u23094": "'",
    "{4": "(",
    "}4": ")",
    "<4": "*",
    ">4": "+",
    "/4": ",",
    "\\4": "-",
    "/2": ".",
    "\\2": "/",
    "(u": "0",
    ")u": "1",
    "[u": "2",
    "]u": "3",
    "[l": "4",
    "]l": "5",
    "[m": "6",
    "]m": "7",
    "{u": "8",
    "}u": "9",
    "{l": ":",
    "}l": ";",
    "{m": "<",
    "}m": "=",
    "{c": ">",
    "}c": ">",
    "(l": "@",
    ")l": "A",
    "(m": "B",
    ")m": "C",
    "<2": "D",
    ">2": "E",
    "\u222e": "I",
    "\u2211": "X",
    "\u220f": "Y",
    "\u222b": "Z",
    "\u22c3": "[",
    "\u22c2": "\\",
    "\u22c0": "^",
    "\u22c1": "_",
    "\u2210": "a",
    "\u222c": "\u2018",
    "\u222d": "\u2019",
    "\u222f": "\u201c",
    "\u2230": "\u201d",
    "[2": "h",
    "]2": "i",
    "\u230a2": "j",
    "\u230b2": "k",
    "\u23082": "l",
    "\u23092": "m",
    "{2": "n",
    "}2": "o",
    "\u23221": "\u00a1",
    "\u23222": "\u00b3",
    "\u23224": "\u00c3",
    "\u2322l": "@",
    "\u2322r": "0",
    "~1": "e",
    "\u2194bl": "\u00c7",
    "\u2194l": "\u00cd",
    "\u23de1": "\u00a9",
    "\u23de4": "(",
    "\u23del": ":",
    "\u21bcm": "\u011a",
    "\u21bcl": "\u010e",
    "\u2190m": "\u011a",
    "\u2190l": "\u0118",
    "\u23231": "\u00a2",
    "\u23232": "\u00b4",
    "\u23234": "!",
    "\u2323l": "A",
    "\u2323r": "1",
    "~2": "f",
    "\u2194br": "\u0106",
    "\u2194r": "\u00ce",
    "\u23df1": "\u00aa",
    "\u23df4": ")",
    "\u23dfl": ";",
    "\u21c0m": "\u011a",
    "\u21c0r": "\u0110",
    "\u2192m": "\u011a",
    "\u2192r": "\u00cb",
    "\u23223": "\u00b5",
    "\u2322m": "B",
    "~3": "g",
    "\u2194bm": "?",
    "\u2194m": "\u011a",
    "^1": "b",
    "\u23de3": "\u00bd",
    "\u23der": "8",
    "\u2212m": "\u2014",
    "\u00afm": "\u2014",
    "\u02d81": "\u0139",
    "\u23233": "\u00b6",
    "\u2323m": "C",
    "\u21d0bl": "\u00c4",
    "\u02c71": "\u201c",
    "\u23df3": "\u00be",
    "\u23dfr": "9",
    "\u033fm": "\u0150",
    _m: "\u2122",
    "\u02d82": "\u013a",
    "^2": "c",
    "\u2192br": "\u0106",
    "\u21d0bm": "w",
    "^3": "d",
    "\u23dem": "<",
    "\u02d83": "\u0143",
    "\u02c72": "\u201d",
    "\u2192bm": "?",
    "\u21d2br": "~",
    "\u02c73": "\u2022",
    "\u23dfm": "=",
    "\u21d4br": "\u010c",
    "\u2190bl": "y",
    "\u21d2bm": "w",
    "\u23dec": "\u2018",
    "\u21d4bl": "\u00c9",
    "\u23de2": "n",
    "\u2190bm": "?",
    "\u23dfc": "\u2019",
    "\u21d4bm": "w",
    "\u23df2": "o",
    "\u03bf": "o",
  };
})();
(function () {
  org.imatheq.formulaeditor.presentation.Node = $extend(Object, {
    editor: null,
    parent: null,
    index: null,
    children: [],
    dimensions: null,
    highlight: !1,
    slowDelete: !1,
    onBaseline: !0,
    firstRow: null,
    defCursorPos: null,
    forcedItalic: null,
    autoItalic: null,
    bold: null,
    mathcolor: null,
    in_mathvariant: null,
    in_mathcolor: null,
    in_attrbs: null,
    initialize: function () {
      this.children = Array.prototype.slice.call(arguments);
      this.updateChildren();
    },
    isEmbellished: function () {
      return 0 < this.children.length && this.children[0].isEmbellished();
    },
    getFontSizeData: function (b, a, e) {
      for (var d = 0; d < this.children.length; d++)
        this.children[d].getFontSizeData(b, a, e);
    },
    getSymbol: function () {
      for (
        var b = this;
        !(b instanceof org.imatheq.formulaeditor.presentation.Symbol) &&
        0 < b.children.length &&
        b.children[0].isEmbellished();

      )
        b = b.getSymbol();
      return b instanceof org.imatheq.formulaeditor.presentation.Symbol
        ? b
        : null;
    },
    getSymbFontAttrbs: function () {
      return {
        bold: this.bold,
        forcedItalic: this.forcedItalic,
        autoItalic: this.autoItalic,
        mathcolor: this.mathcolor,
      };
    },
    setSymbFontAttrbs: function (b) {
      if (
        0 < this.children.length &&
        0 < Object.keys(b).length &&
        b.constructor === Object
      )
        for (var a = 0; a < this.children.length; a++)
          this.children[a].setSymbFontAttrbs(b);
      for (var e in b)
        switch (((a = b[e]), e)) {
          case "bold":
            this.bold = a;
            break;
          case "forcedItalic":
            (this.forcedItalic = a) &&
              void 0 !== b.autoItalic &&
              b.autoItalic &&
              sllert(
                "Error in Node.setSymbFontAttrbs: forceItalic and autoItalic values are conflict"
              );
            break;
          case "autoItalic":
            this.autoItalic = a;
            break;
          case "mathcolor":
            this.mathcolor = a;
            break;
          case "mtext":
            this.setMtext && this.setMtext(a);
        }
    },
    isAncestorOf: function (b) {
      if (null === b.parent || void 0 === b.parent) return !1;
      if (b === this) return !0;
      for (b = b.parent; null !== b && void 0 != b; ) {
        if (b === this) return !0;
        b = b.parent;
      }
      return !1;
    },
    getAncestorOf: function (b) {
      for (; null !== b.parent && b.parent !== this; ) b = b.parent;
      return b.parent === this ? b : null;
    },
    getAncestors: function (b) {
      for (
        var a = [],
          e = null,
          e =
            b == this.children.length
              ? { parent: this, index: b }
              : this.children[b];
        null !== e && void 0 !== e;

      )
        a.push(e), (e = e.parent);
      return a;
    },
    getIndexChain: function (b) {
      indexChain = [];
      indexChain.push(b);
      for (
        b = this;
        null !== b && void 0 !== b && null !== b.index && void 0 !== b.index;

      )
        indexChain.push(b.index), (b = b.parent);
      return indexChain;
    },
    compareIndexChain: function (b, a) {
      for (
        var e = b.length, d = a.length, g = Math.min(e, d), f = 0;
        f < g && b[e - 1 - f] == a[d - 1 - f];

      )
        f++;
      return f == g ? e - d : b[e - 1 - f] - a[d - 1 - f];
    },
    clone: function () {
      var b = function () {};
      b.prototype = Object.getPrototypeOf(this);
      b = new b();
      b.initialize.apply(b, arguments);
      b.bold = this.bold;
      b.forcedItalic = this.forcedItalic;
      b.autoItalic = this.autoItalic;
      b.mathcolor = this.mathcolor;
      for (x in this)
        !Object.prototype.hasOwnProperty.call(this, x) ||
          this[x] instanceof Function ||
          this[x] instanceof Object ||
          (b[x] = this[x]);
      return b;
    },
    copy: function () {
      return this.clone.apply(this, this.copyArray(this.children));
    },
    copyArray: function (b) {
      for (var a = [], e = 0; e < b.length; e++)
        b[e] instanceof Array
          ? a.push(this.copyArray(b[e]))
          : a.push(b[e].copy());
      return a;
    },
    canDelete: function (b) {
      return !this.slowDelete;
    },
    draw: function (b, a, e, d, g) {
      throw Error("abstract method called");
    },
    getMathML: function (b) {
      throw Error("abstract method called");
    },
    onchange: function (b) {
      if (null !== this.parent) this.parent.onchange(this);
    },
    onkeypress: function (b, a) {},
    onmousedown: function (b, a, e, d) {
      return !0;
    },
    flatten: function () {
      for (var b = 0; b < this.children.length; b++)
        this.children[b]
          ? this.children[b].flatten
            ? this.children[b].flatten()
            : alert("no flatten in : " + b + ".")
          : alert("no child at :" + b);
    },
    updateChildren: function (b) {
      if (null === b || void 0 === b) b = 0;
      for (; b < this.children.length; b++)
        this.children[b]
          ? ((this.children[b].parent = this), (this.children[b].index = b))
          : alert("empty child : " + b + ".");
    },
    getCursorPosition: function (b, a, e) {
      return null !== this.parent
        ? a < this.dimensions.left + this.dimensions.width / 2
          ? this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1)
        : null;
    },
    getFirstCursorPosition: function (b, a, e) {
      return null !== this.parent
        ? this.parent.getFirstCursorPosition(b, null, e)
        : null;
    },
    getLastCursorPosition: function (b, a, e) {
      return null !== this.parent
        ? this.parent.getLastCursorPosition(b, null, e)
        : null;
    },
    getFollowingCursorPosition: function (b, a, e) {
      return null;
    },
    getPrecedingCursorPosition: function (b, a) {
      return null;
    },
    getLowerCursorPosition: function (b, a, e, d) {
      var g = org.imatheq.formulaeditor.presentation;
      return null !== this.parent
        ? (null === a || void 0 === a) && this.parent instanceof g.Row
          ? this.index == this.parent.children.length - 1 &&
            Math.abs(this.dimensions.left - e) >
              Math.abs(this.dimensions.left + this.dimensions.width - e)
            ? { row: this.parent, index: this.index + 1 }
            : { row: this.parent, index: this.index }
          : this.parent.getLowerCursorPosition(b, this.index, e, d)
        : null;
    },
    getHigherCursorPosition: function (b, a, e, d) {
      var g = org.imatheq.formulaeditor.presentation;
      return null !== this.parent
        ? (null === a || void 0 === a) && this.parent instanceof g.Row
          ? this.index == this.parent.children.length - 1 &&
            Math.abs(this.dimensions.left - e) >
              Math.abs(this.dimensions.left + this.dimensions.width - e)
            ? { row: this.parent, index: this.index + 1 }
            : { row: this.parent, index: this.index }
          : this.parent.getHigherCursorPosition(b, this.index, e, d)
        : null;
    },
    toString: function () {
      if (this.value) return this.value;
      if (this.children) {
        for (var b = "[ ", a = 0; a < this.children.length; a++)
          (b += this.children[a]), a < this.children.length - 1 && (b += ", ");
        return b + " ]";
      }
    },
    maxDimensions: function (b, a, e) {
      var d = { top: a, left: b, width: 0, height: 0 },
        g,
        f;
      for (b = 0; b < e.length; b++)
        (a = Math.min(d.top, e[b].top)),
          (g = Math.max(d.top + d.height, e[b].top + e[b].height)),
          (f = Math.min(d.left, e[b].left)),
          (d = Math.max(d.left + d.width, e[b].left + e[b].width)),
          (d = { top: a, left: f, width: d - f, height: g - a });
      return d;
    },
    setHighlight: function (b) {
      if (!0 === b || !1 === b) this.highlight = b;
      if (!1 === b && 0 < this.children.length)
        for (b = 0; b < this.children.length; b++)
          this.children[b].setHighlight(!1);
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.presentation.Symbol = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      value: null,
      onscreen: null,
      keyword: null,
      lspace: null,
      rspace: null,
      mtext: !1,
      mo: !1,
      mn: !1,
      doubleStruck: !1,
      script: !1,
      fraktur: !1,
      initialize: function () {
        var b = null;
        0 < arguments.length &&
          (arguments[0] instanceof Array
            ? ((this.value = arguments[0][0]),
              1 < arguments[0].length && (this.onscreen = arguments[0][1]))
            : (this.value = arguments[0]),
          (b = org.imatheq.formulaeditor.presentation.SymbolAliases),
          void 0 !== b[this.value] &&
            null !== b[this.value] &&
            (this.value = b[this.value]),
          (b = org.imatheq.formulaeditor.presentation.SymbolOnscreens),
          null === this.onscreen &&
            void 0 !== b[this.value] &&
            null !== b[this.value] &&
            (this.onscreen = b[this.value]));
        13 < arguments.length &&
          null !== arguments[13] &&
          void 0 !== arguments[13] &&
          (this.fraktur = arguments[13]);
        12 < arguments.length &&
          null !== arguments[12] &&
          void 0 !== arguments[12] &&
          (this.script = arguments[12]);
        11 < arguments.length &&
          null !== arguments[11] &&
          void 0 !== arguments[11] &&
          (this.doubleStruck = arguments[11]);
        10 < arguments.length &&
          null !== arguments[10] &&
          void 0 !== arguments[10] &&
          (this.mn = arguments[10]);
        9 < arguments.length &&
          null !== arguments[9] &&
          void 0 !== arguments[9] &&
          (this.mo = arguments[9]);
        8 < arguments.length &&
          null !== arguments[8] &&
          void 0 !== arguments[8] &&
          (this.rspace = arguments[8]);
        7 < arguments.length &&
          null !== arguments[7] &&
          void 0 !== arguments[7] &&
          (this.lspace = arguments[7]);
        6 < arguments.length &&
          null !== arguments[6] &&
          void 0 !== arguments[6] &&
          (this.keyword = arguments[6]);
        this.bold =
          1 < arguments.length
            ? null !== arguments[1] && void 0 !== arguments[1]
              ? arguments[1]
              : !1
            : !1;
        this.mathcolor =
          2 < arguments.length
            ? null !== arguments[2] && void 0 !== arguments[2]
              ? arguments[2]
              : "#000000"
            : "#000000";
        3 < arguments.length &&
          null !== arguments[3] &&
          void 0 !== arguments[3] &&
          (this.mtext = arguments[3]);
        4 < arguments.length &&
          null !== arguments[4] &&
          void 0 !== arguments[4] &&
          (this.forcedItalic = arguments[4]);
        5 < arguments.length &&
          null !== arguments[5] &&
          void 0 !== arguments[5] &&
          ((this.autoItalic = arguments[5]),
          "auto" == this.autoItalic &&
            ((b = org.imatheq.formulaeditor.FormulaEditor.getEditor()),
            null == b
              ? alert("Error symbol.initialize: failed to get editor")
              : ((this.autoItalic = b.isAutoItalic()),
                this.autoItalic || (this.forcedItalic = !0))),
          this.autoItalic && (this.forcedItalic = !1));
        if (0 < arguments.length) {
          b = org.imatheq.formulaeditor.FormulaEditor.getEditor();
          if (null === this.autoItalic || void 0 === this.autoItalic)
            this.autoItalic =
              null !== b && void 0 !== b
                ? b.isAutoItalic()
                : new org.imatheq.formulaeditor.Options().getOption(
                    "defAutoItalic"
                  );
          if (null === this.forcedItalic || void 0 === this.forcedItalic)
            this.forcedItalic =
              null !== b && void 0 !== b ? b.isForcedItalic() : !1;
          if (null === this.bold || void 0 === this.bold)
            this.bold = null !== b && void 0 !== b ? b.isBold() : !1;
        }
      },
      isSymbolAutoItalic: function () {
        var b = !0,
          a = org.imatheq.formulaeditor.presentation.SymbolOnscreens,
          e = this.value;
        if (this.mo || this.mn || this.mtext) return !1;
        null === this.onscreen &&
          void 0 !== a[e] &&
          null !== a[e] &&
          (e = a[e]);
        if (
          null !== this.keyword ||
          ("0" <= e && "9" >= e) ||
          void 0 !== org.imatheq.formulaeditor.parsing.expression.MOList[e] ||
          -1 !=
            org.imatheq.formulaeditor.parsing.expression.NonItalicMiList.indexOf(
              e
            ) ||
          void 0 !== org.imatheq.formulaeditor.parsing.expression.RevList[e]
        )
          b = !1;
        return b;
      },
      getStyleString: function () {
        var b = "";
        this.doubleStruck
          ? (b = "double-struck")
          : this.script
          ? (b = (this.bold ? "bold-" : "") + "script")
          : this.fraktur
          ? (b = (this.bold ? "bold-" : "") + "fraktur")
          : this.isSymbolAutoItalic()
          ? this.bold
            ? (b = this.forcedItalic
                ? "bold-italic"
                : this.autoItalic
                ? "bold-italic"
                : "bold")
            : this.forcedItalic || this.autoItalic || (b = "normal")
          : (b = this.forcedItalic
              ? this.bold
                ? "bold-italic"
                : "italic"
              : this.bold
              ? "bold"
              : "");
        "" != b && (b = ' mathvariant="' + b + '"');
        return (b +=
          null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"');
      },
      getItalicValue: function () {
        return this.autoItalic
          ? this.isSymbolAutoItalic(this.value)
          : this.forcedItalic;
      },
      hasSameStyle: function (b, a) {
        var e = !0;
        if (
          this.mtext != b.mtext ||
          this.mo != b.mo ||
          this.mn != b.mn ||
          this.doubleStruck != b.doubleStruck ||
          this.script != b.script ||
          this.fraktur != b.fraktur
        )
          return !1;
        (null !== this.bold && null !== b.bold) ||
          alert("Error in hasSameStyle: bold is null");
        this.bold != b.bold && (e = !1);
        (null !== this.mathcolor && null !== b.mathcolor) ||
          alert("Error in hasSameStyle: mathcolor is null");
        this.mathcolor != b.mathcolor && (e = !1);
        var d =
            org.imatheq.formulaeditor.parsing.expression.RevList[this.value],
          g = org.imatheq.formulaeditor.parsing.expression.RevList[b.value];
        if (
          (void 0 === d && void 0 !== g) ||
          (void 0 !== d && void 0 === g) ||
          (void 0 !== d && void 0 !== g && d.type != g.type)
        )
          e = !1;
        if (
          (null === this.keyword && null !== b.keyword) ||
          (null !== this.keyword && null === b.keyword) ||
          (null !== this.keyword &&
            null !== b.keyword &&
            this.keyword != b.keyword)
        )
          e = !1;
        if (
          null === this.forcedItalic ||
          null === this.autoItalic ||
          null === b.forcedItalic ||
          null === b.autoItalic
        )
          alert("Error in hasSameStyle: some italic para is null.");
        else {
          if (this.forcedItalic != b.forcedItalic) return !1;
          a && this.autoItalic != b.autoItalic && (e = !1);
        }
        return e;
      },
      isEmbellished: function () {
        return (
          void 0 !==
          org.imatheq.formulaeditor.parsing.expression.MOList[this.value]
        );
      },
      setMtext: function (b) {
        this.mtext = b;
      },
      copy: function () {
        return this.clone(
          null !== this.onscreen ? [this.value, this.onscreen] : this.value,
          this.bold,
          this.mathcolor,
          this.mtext,
          this.forcedItalic,
          this.autoItalic,
          this.keyword,
          this.lspace,
          this.rspace,
          this.mo,
          this.mn,
          this.doubleStruck,
          this.script,
          this.fraktur
        );
      },
      getFontSizeData: function (b, a, e, d) {
        var g = !1;
        if (
          (null !== d && void 0 !== d && d) ||
          -1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(f)
        )
          g = !0;
        var f = this.value;
        g ||
          null === this.onscreen ||
          -1 !=
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              f
            ) ||
          (f = this.onscreen);
        d = 0;
        void 0 !== a.fontSizeModifier &&
          null !== a.fontSizeModifier &&
          (d = a.fontSizeModifier);
        a = this.getItalicValue();
        g && (a = !1);
        var h = null !== this.bold && void 0 !== this.bold ? this.bold : !1;
        g && (h = !1);
        g = b.canvas.getFontInfo(f, d, a, h);
        if (
          g.hasDimensions &&
          ((b = g.fontSizeGroup),
          (g = g.bmpSize),
          (f = org.imatheq.formulaeditor.MathCanvas.fontsByPosition),
          null === f[b] ||
            void 0 === f[b] ||
            null === f[b][g] ||
            void 0 === f[b][g])
        ) {
          if (null === e[b] || void 0 === e[b]) e[b] = {};
          if (null === e[b][g] || void 0 === e[b][g]) e[b][g] = "";
        }
      },
      draw: function (b, a, e, d, g, f) {
        var h = org.imatheq.formulaeditor.presentation,
          k = this.value;
        null !== this.onscreen &&
          -1 ==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              k
            ) &&
          (k = this.onscreen);
        var l = f;
        if (void 0 === f || null === f) l = { lspace: 0, rspace: 0 };
        f = 0;
        void 0 !== a.fontSizeModifier &&
          null !== a.fontSizeModifier &&
          (f = a.fontSizeModifier);
        var m = this.getItalicValue();
        this.parent instanceof h.Row &&
          0 < this.index &&
          this.parent.children[this.index - 1] instanceof h.Symbol &&
          b.getFontSizeIdx(a.fontSizeModifier);
        b = b.drawSymbol(
          k,
          Math.round(e + 0 + l.lspace),
          Math.round(d),
          g,
          m,
          this.bold,
          this.mathcolor,
          f
        );
        return (this.dimensions = {
          left: e + 0,
          top: b.top,
          width: b.width + l.lspace + l.rspace,
          height: b.height,
        });
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Subsup = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      onBaseline: !1,
      margin: 1,
      mtype: "msubsup",
      msubtype: "",
      uid: "",
      initialize: function () {
        this.children = [];
        if (0 < arguments.length) {
          this.mtype = arguments[0];
          var b = arguments[1];
          null !== b && void 0 !== b && this.children.push(b);
          b = arguments[2];
          null !== b && void 0 !== b && this.children.push(b);
          this.msubtype = 3 < arguments.length ? arguments[3] : "";
          this.uid = 4 < arguments.length ? arguments[4] : "";
        }
        this.updateChildren();
      },
      getFontSizeData: function (b, a, e) {
        var d = null,
          g = null;
        "msubsup" == this.mtype
          ? ((g = this.children[0]), (d = this.children[1]))
          : "msub" == this.mtype
          ? (d = this.children[0])
          : (g = this.children[0]);
        var f = { fontSizeModifier: 0 },
          h;
        for (h in a) f[h] = a[h];
        --f.fontSizeModifier;
        null !== g && g.getFontSizeData(b, f, e);
        null !== d && d.getFontSizeData(b, f, e);
      },
      draw: function (b, a, e, d, g, f) {
        var h = null,
          k = null;
        "msubsup" == this.mtype
          ? ((k = this.children[0]), (h = this.children[1]))
          : "msub" == this.mtype
          ? (h = this.children[0])
          : (k = this.children[0]);
        var l,
          m = org.imatheq.formulaeditor.presentation,
          r = { fontSizeModifier: 0 },
          n;
        for (n in a) r[n] = a[n];
        --r.fontSizeModifier;
        n = { lspace: 0, rspace: 0 };
        var p = -1;
        if (this.parent instanceof m.Row)
          if ("mprescripts" == this.msubtype) {
            p = this.index + 1;
            m = this.uid;
            for (
              p < this.parent.children.length &&
              (l = this.parent.children[p].draw(b, a, e, d, !0, n));
              p < this.parent.children.length &&
              "mprescripts" == this.parent.children[p].msubtype &&
              this.parent.children[p].uid == m;

            )
              p++;
            p >= this.parent.children.length && (p = -1);
          } else if ("mmultiscripts" == this.msubtype)
            for (
              p = this.index - 1,
                m = this.uid,
                0 <= p && (l = this.parent.children[p].dimensions);
              0 <= p &&
              "mprescripts" == this.parent.children[p].msubtype &&
              this.parent.children[p] == m;

            )
              p--;
          else {
            for (
              p = this.index - 1;
              0 <= p && this.parent.children[p] instanceof m.Space;

            )
              p--;
            0 <= p && (l = this.parent.children[p].dimensions);
          }
        0 <= p
          ? ((a =
              p > this.index
                ? this.parent.children[p].draw(b, a, e, d, !0, n)
                : this.parent.children[p].dimensions),
            (l = {
              left: l.left,
              top: a.top,
              width: l.width,
              height: a.height,
            }))
          : ((l = b.getXDimentions(r, e, d)), (l.left = e - l.width));
        a =
          null !== h && void 0 !== h
            ? h.draw(b, r, 0, 0, !0)
            : { left: 0, top: 0, width: 0, height: 0 };
        var m =
            null !== k && void 0 !== k
              ? k.draw(b, r, 0, 0, !0)
              : { left: 0, top: 0, width: 0, height: 0 },
          t = 0,
          p = b.getXDimentions(r, e, d),
          q = Math.round((l.height + p.height) / 2) - 2 * this.margin;
        n = d = q - Math.round(p.height / 2);
        a.height < q && (d = a.height - Math.round(p.height / 2));
        m.height < q && (n = m.height - Math.round(p.height / 2));
        var u,
          p = 0,
          q = null,
          v = l.left + l.width,
          y = (t = v);
        "mprescripts" == this.msubtype &&
          ((v = Math.max(a.width, m.width)),
          (t = v - a.width),
          (v -= m.width),
          (t = e + t),
          (y = e + v),
          (v = Math.min(t, y)));
        null !== h &&
          void 0 !== h &&
          ((q = l.top + l.height + a.height - d),
          (u = q - a.height),
          (p = a.width),
          (u = Math.min(u, l.top)));
        null !== k &&
          void 0 !== k &&
          ((u = l.top - m.height + n),
          null === q && (q = u + m.height),
          (p = Math.max(p, m.width)),
          (q = Math.max(q, l.top + l.height)));
        this.dimensions = {
          left: v,
          top: Math.min(u, l.top),
          width: p + f.rspace,
          height: q - u,
        };
        if (!1 === g || null === g || void 0 === g)
          null !== h &&
            void 0 !== h &&
            h.draw(b, r, t, l.top + l.height - a.top - d, g),
            null !== k &&
              void 0 !== k &&
              k.draw(b, r, y, l.top - (m.height + m.top) + n, g);
        return this.dimensions;
      },
      getCursorPosition: function (b, a, e) {
        if (
          a > this.dimensions.left &&
          a < this.dimensions.left + this.dimensions.width - 1
        ) {
          if (2 == this.children.length) {
            var d = this.children[0].dimensions;
            return e < (d.top + d.height + this.children[1].dimensions.top) / 2
              ? this.children[0].getCursorPosition(b, a, e)
              : this.children[1].getCursorPosition(b, a, e);
          }
          return this.children[0].getCursorPosition(b, a, e);
        }
        return a <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getFollowingCursorPosition: function (b, a, e) {
        return null === a || void 0 === a
          ? this.children[0].getFollowingCursorPosition(b, null, e)
          : 0 == a && !0 === b.continuingNavigation && 2 == this.children.length
          ? this.children[1].getFollowingCursorPosition(b, null, e)
          : null !== this.parent
          ? e
            ? { row: this.parent, index: this.index + 1 }
            : this.parent.getFollowingCursorPosition(b, this.index, e)
          : null;
      },
      getPrecedingCursorPosition: function (b, a, e) {
        if (!0 === b.continuingNavigation && 2 == this.children.length) {
          if (null === a || void 0 === a)
            return this.children[1].getPrecedingCursorPosition(b, null, e);
          if (1 == a)
            return this.children[0].getPrecedingCursorPosition(b, null, e);
        }
        return null === a || void 0 === a
          ? this.children[0].getPrecedingCursorPosition(b, null, e)
          : null !== this.parent
          ? e
            ? { row: this.parent, index: this.index }
            : this.parent.getPrecedingCursorPosition(b, this.index, e)
          : null;
      },
      getLowerCursorPosition: function (b, a, e, d) {
        return null === a || void 0 === a
          ? this.children[0].getLowerCursorPosition(b, null, e, d)
          : 0 === a && 2 == this.children.length
          ? this.children[1].getLowerCursorPosition(b, null, e, d)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(b, this.index, e, d)
          : null;
      },
      getHigherCursorPosition: function (b, a, e, d) {
        return null === a || void 0 === a
          ? this.children[1].getHigherCursorPosition(b, null, e, d)
          : 1 == a
          ? this.children[0].getHigherCursorPosition(b, null, e, d)
          : null !== this.parent
          ? this.parent.getHigherCursorPosition(b, this.index, e, d)
          : null;
      },
      copy: function () {
        var b = null,
          a = null;
        "msubsup" == this.mtype
          ? ((a = this.children[0].copy()), (b = this.children[1].copy()))
          : "msub" == this.mtype
          ? (b = this.children[0].copy())
          : (a = this.children[0].copy());
        return this.clone(this.mtype, b, a);
      },
      getMathML: function (b) {
        var a = "";
        "msubsup" == this.mtype
          ? (a =
              this.children[1].getMathML(!0) + this.children[0].getMathML(!0))
          : "msub" == this.mtype
          ? ((a = this.children[0].getMathML(!0)), b && (a += "<none/>"))
          : (b && (a += "<none/>"), (a += this.children[0].getMathML(!0)));
        return a;
      },
      getAltText: function (b) {
        var a = org.imatheq.formulaeditor.FormulaEditor.getEditor().altstrs,
          e = "mprescripts" == this.msubtype ? "pre" : "";
        if ("msubsup" == this.mtype)
          var d = this.children[1].getAltText(!0),
            g =
              this.children[1] && 1 < this.children[1].children.length ? 1 : 0,
            d = a[e + "subscript"][g].replace("$0$", d.trim()),
            f = this.children[0].getAltText(!0),
            g =
              this.children[0] && 1 < this.children[0].children.length ? 1 : 0,
            f = a[e + "superscript"][g].replace("$0$", f.trim());
        else
          "msup" == this.mtype
            ? ((f = this.children[0].getAltText(!0)),
              (g =
                this.children[0] && 1 < this.children[0].children.length
                  ? 1
                  : 0),
              (f =
                "mprescripts" == this.msubtype
                  ? a[e + "superscript"][g].replace("$0$", f.trim())
                  : a.power[g].replace("$0$", f.trim())),
              (d = ""),
              b && (d = a[e + "subscript"][0].replace("$0$", a.blank.trim())))
            : ((f = ""),
              b && (f = a[e + "superscript"][0].replace("$0$", a.blank.trim())),
              (d = this.children[0].getAltText(!0)),
              (g =
                this.children[0] && 1 < this.children[0].children.length
                  ? 1
                  : 0),
              (d =
                "mprescripts" == this.msubtype
                  ? a[e + "subscript"][g].replace("$0$", d.trim())
                  : a.subscript[g].replace("$0$", d.trim())));
        return d + f;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.LargeOpSubsup = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      onBaseline: !1,
      margin: 1,
      mtype: "msubsup",
      base: null,
      sub: null,
      sup: null,
      initialize: function () {
        this.children = [];
        0 < arguments.length &&
          ((this.mtype = arguments[0]),
          (this.base = arguments[1]),
          (this.sup = arguments[2]),
          null !== this.sup &&
            void 0 !== this.sup &&
            this.children.push(this.sup),
          (this.sub = arguments[3]),
          null !== this.sub &&
            void 0 !== this.sub &&
            this.children.push(this.sub));
        this.updateChildren();
      },
      getFontSizeData: function (b, a, e) {
        var d = { fontSizeModifier: 0 },
          g;
        for (g in a) d[g] = a[g];
        --d.fontSizeModifier;
        null !== this.sup && this.sup.getFontSizeData(b, d, e);
        null !== this.sub && this.sub.getFontSizeData(b, d, e);
        this.base.getFontSizeData(b, a, e);
      },
      setSymbFontAttrbs: function (b) {
        this.base.setSymbFontAttrbs(b);
        this.setSymbFontAttrbs.parent.setSymbFontAttrbs.call(this, b);
      },
      draw: function (b, a, e, d, g) {
        var f = { fontSizeModifier: 0 },
          h;
        for (h in a) f[h] = a[h];
        --f.fontSizeModifier;
        this.base.draw(b, a, 0, 0, !0);
        var k;
        h =
          null !== this.sub && void 0 !== this.sub
            ? this.sub.draw(b, f, 0, 0, !0)
            : { left: 0, top: 0, width: 0, height: 0 };
        k =
          null !== this.sup && void 0 !== this.sup
            ? this.sup.draw(b, f, 0, 0, !0)
            : { left: 0, top: 0, width: 0, height: 0 };
        var l = 0;
        this.base.dimensions.bottomindent &&
          (l = -this.base.dimensions.bottomindent);
        d = b.getXDimentions(f, e, d);
        var m =
            Math.round((this.base.dimensions.height + d.height) / 2) -
            2 * this.margin,
          r = m - Math.round(d.height / 2),
          n = r;
        h.height < m && (r = h.height - Math.round(d.height / 2));
        k.height < m && (n = k.height - Math.round(d.height / 2));
        d = d.top + Math.round(0.4 * d.height - 0.5);
        m =
          -Math.round(this.base.dimensions.height / 2) -
          this.base.dimensions.top;
        this.dimensions = {
          left: e,
          top: d - (k.height - n) - Math.round(this.base.dimensions.height / 2),
          width:
            this.base.dimensions.width +
            this.margin +
            Math.max(h.width + l, k.width),
          height: this.base.dimensions.height + k.height + h.height - r - n,
        };
        if (!1 === g || null === g || void 0 === g)
          this.base.draw(b, a, e, d + m, g),
            null !== this.sub &&
              void 0 !== this.sub &&
              this.sub.draw(
                b,
                f,
                this.base.dimensions.left +
                  this.base.dimensions.width +
                  l +
                  this.margin,
                this.base.dimensions.top +
                  this.base.dimensions.height -
                  h.top -
                  r,
                g
              ),
            null !== this.sup &&
              void 0 !== this.sup &&
              this.sup.draw(
                b,
                f,
                this.base.dimensions.left +
                  this.base.dimensions.width +
                  this.margin,
                this.dimensions.top - k.top,
                g
              );
        return this.dimensions;
      },
      getCursorPosition: function (b, a, e) {
        if (
          a > this.dimensions.left &&
          a < this.dimensions.left + this.dimensions.width - 1
        ) {
          if (2 == this.children.length) {
            var d = this.children[0].dimensions;
            return e < (d.top + d.height + this.children[1].dimensions.top) / 2
              ? this.children[0].getCursorPosition(b, a, e)
              : this.children[1].getCursorPosition(b, a, e);
          }
          return this.children[0].getCursorPosition(b, a, e);
        }
        return a <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getFollowingCursorPosition: function (b, a, e) {
        return null === a || void 0 === a
          ? this.children[0].getFollowingCursorPosition(b, null, e)
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : null;
      },
      getPrecedingCursorPosition: function (b, a, e) {
        return null === a || void 0 === a
          ? this.children[0].getPrecedingCursorPosition(b, null, e)
          : null !== this.parent
          ? { row: this.parent, index: this.index }
          : null;
      },
      getLowerCursorPosition: function (b, a, e, d) {
        return null === a || void 0 === a
          ? this.children[0].getLowerCursorPosition(b, null, e, d)
          : 0 === a && 2 == this.children.length
          ? this.children[1].getLowerCursorPosition(b, null, e, d)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(b, this.index, e, d)
          : null;
      },
      getHigherCursorPosition: function (b, a, e, d) {
        return null === a || void 0 === a
          ? this.children[1].getHigherCursorPosition(b, null, e, d)
          : 1 == a
          ? this.children[0].getHigherCursorPosition(b, null, e, d)
          : null !== this.parent
          ? this.parent.getHigherCursorPosition(b, this.index, e, d)
          : null;
      },
      getMathML: function () {
        var b =
          "<" +
          this.mtype +
          (this.in_attrbs ? this.in_attrbs : "") +
          (null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"') +
          "><mo>" +
          com.efmase.js.utilities.toolset.getEncodedStr(this.base) +
          "</mo>";
        if ("msub" == this.mtype || "msubsup" == this.mtype)
          b += this.sub.getMathML(!0);
        if ("msup" == this.mtype || "msubsup" == this.mtype)
          b += this.sup.getMathML(!0);
        return (b += "</" + this.mtype + ">");
      },
      getAltText: function () {
        var b = org.imatheq.formulaeditor.FormulaEditor.getEditor(),
          a = b.getSymbolAltText(this.base.value);
        if ("msub" == this.mtype || "msubsup" == this.mtype)
          var e = this.sub.children && 1 < this.sub.children.length ? 1 : 0,
            a =
              a +
              b.altstrs.subscript[e].replace(
                "$0$",
                this.sub.getAltText().trim()
              );
        if ("msup" == this.mtype || "msubsup" == this.mtype)
          (e = this.sup.children && 1 < this.sup.children.length ? 1 : 0),
            (a += b.altstrs["msup" == this.mtype ? "power" : "superscript"][
              e
            ].replace("$0$", this.sup.getAltText().trim()));
        return a;
      },
      copy: function () {
        return this.clone(
          this.mtype,
          this.base.copy(),
          this.sup.copy(),
          this.sub.copy()
        );
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.BlockSymbol = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      initialize: function () {
        this.value = "\u25a1";
        this.onscreen = "c";
        0 < arguments.length &&
          null !== arguments[0] &&
          void 0 != arguments[0] &&
          (this.onscreen = arguments[0]);
        1 < arguments.length
          ? this.initialize.parent.initialize.call(
              this,
              this.value,
              arguments[1],
              arguments[2],
              arguments[3],
              arguments[4],
              arguments[5]
            )
          : this.initialize.parent.initialize.call(this, this.value);
      },
      copy: function () {
        return this.clone(this.onscreen);
      },
      draw: function (b, a, e, d, g) {
        var f = 0;
        void 0 !== a.fontSizeModifier &&
          null !== a.fontSizeModifier &&
          (f = a.fontSizeModifier);
        a = b.readonly ? !0 : g;
        return (this.dimensions = b.drawcBox(
          Math.round(e),
          Math.round(d),
          a,
          this.onscreen,
          !0,
          !1,
          this.mathcolor,
          f
        ));
      },
      isEmbellished: function () {
        return !1;
      },
      getAltText: function () {
        return strs.blank;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.NewlineSymbol = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      initialize: function () {
        this.value = "\n";
        this.onscreen = 1 == arguments.length ? arguments[0] : "a";
      },
      copy: function () {
        return this.clone(this.onscreen);
      },
      setMtext: function (b) {
        this.mtext = !1;
      },
      draw: function (b, a, e, d, g) {
        return (this.dimensions =
          new org.imatheq.formulaeditor.presentation.Space(
            "0.2em",
            "0.5em",
            "0.1em",
            " "
          ).draw(b, a, e, d, !0));
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Space = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      width: 0,
      height: 0,
      depth: 0,
      initialize: function () {
        var b = null,
          b = null;
        0 < arguments.length &&
          ((b = org.imatheq.formulaeditor.FormulaEditor.getEditor()),
          (b = b.canvas),
          (this.width = b.getEMSize(arguments[0])));
        1 < arguments.length && (this.height = b.getEMSize(arguments[1]));
        2 < arguments.length && (this.depth = b.getEMSize(arguments[2]));
        3 < arguments.length && (this.value = arguments[3]);
        4 < arguments.length && (this.mtext = arguments[4]);
        0 < arguments.length &&
          this.initialize.parent.initialize.call(this, this.value);
      },
      copy: function () {
        return this.clone(
          this.width + "em",
          this.height + "em",
          this.depth + "em",
          this.value,
          this.mtext
        );
      },
      setMtext: function (b) {
        this.mtext = 0 <= this.width ? b : !1;
      },
      getFontSizeData: function (b, a, e) {},
      draw: function (b, a, e, d, g) {
        g = 0;
        void 0 !== a.fontSizeModifier &&
          null !== a.fontSizeModifier &&
          (g = a.fontSizeModifier);
        a = Math.round(this.width * b.getFontUnitEm(g));
        var f = Math.round(this.height * b.getFontUnitEm(g)),
          h = Math.round(this.depth * b.getFontUnitEm(g));
        this.dimensions = b.drawFBox(
          Math.round(e),
          Math.round(d),
          !0,
          "x",
          !1,
          !1,
          "#000000",
          g
        );
        this.dimensions.top =
          this.dimensions.top + this.dimensions.height - f + h;
        this.dimensions.height = f - h;
        this.dimensions.width = 0 < a ? a : 0;
        this.dimensions.left =
          0 < a ? this.dimensions.left : this.dimensions.left + a;
        return this.dimensions;
      },
      getMathML: function () {
        if (this.mtext && 0 < this.width && 0.4 > this.width) return "&#x200A;";
        if (this.mtext && 0.4 <= this.width) return "&#x2007;";
        if (null !== this.value)
          return (
            "<mo" +
            (this.in_attrbs ? this.in_attrbs : "") +
            ">" +
            com.efmase.js.utilities.toolset.getEncodedStr(this) +
            "</mo>"
          );
        if (0 != this.width) {
          var b = '<mspace width="' + this.width + 'em"';
          0 != this.height && (b += ' height="' + this.height + 'em"');
          0 != this.depth && (b += ' depth="' + this.depth + 'em"');
          return b + (this.in_attrbs ? this.in_attrbs : "") + "/>";
        }
        return "";
      },
      getAltText: function () {
        return org.imatheq.formulaeditor.FormulaEditor.getEditor().getSymbolAltText(
          "space"
        );
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Alignmark = $extend(
    org.imatheq.formulaeditor.presentation.Space,
    {
      type: "maligngroup",
      groupalign: null,
      edge: null,
      initialize: function () {
        0 < arguments.length &&
          ((this.type = arguments[0]),
          1 < arguments.length &&
            ("maligngroup" == this.type
              ? (this.groupalign = arguments[1])
              : (this.edge = arguments[1])),
          this.initialize.parent.initialize.call(this, "0", "0", "0", " "));
      },
      getMathML: function () {
        var b = "<" + this.type;
        return (b =
          "maligngroup" == this.type && this.groupalign
            ? b + (' groupalign="' + this.groupalign + '"/>')
            : "malignmark" == this.type && this.edge
            ? b + (' edge="' + this.edge + '"/>')
            : b + "/>");
      },
      getAltText: function () {
        return org.imatheq.formulaeditor.FormulaEditor.getEditor().getSymbolAltText(
          this.type
        );
      },
    }
  );
})();
(function () {
  var b = com.efmase.js.utilities.toolset;
  org.imatheq.formulaeditor.presentation.Row = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      isAnswer: !1,
      margin: 2,
      inputType: null,
      keywordIdx: 0,
      initialize: function () {
        var a = org.imatheq.formulaeditor.presentation.BlockSymbol,
          e;
        if (1 == arguments.length && "string" == typeof arguments[0]) {
          var a = arguments[0],
            d = [];
          for (e = 0; e < a.length; e++) d.push(this.newSymbol(a.charAt(e)));
        } else
          for (
            d = Array.prototype.slice.call(arguments),
              0 === d.length && ((d = []), d.push(null)),
              e = 0;
            e < d.length;
            e++
          )
            if (null === d[e] || void 0 === d[e]) d[e] = new a();
        this.initialize.parent.initialize.apply(this, d);
      },
      getBracketedAncestor: function (a) {
        a = this.getAncestors(position.index);
        for (
          var e = 0;
          e < a.length && !(a[e] instanceof presentation.Bracketed);

        )
          e++;
        e == a.length &&
          console.log("updateBracket: error cannot find Bracketed parent.");
      },
      getFontSizeData: function (a, e, d) {
        var b = org.imatheq.formulaeditor.presentation;
        new b.Symbol("x", !1, null, null, !0, !1).getFontSizeData(a, e, d);
        new b.Symbol("x", !1, null, null, !1, !1).getFontSizeData(a, e, d);
        new b.Symbol("x", !0, null, null, !0, !1).getFontSizeData(a, e, d);
        new b.Symbol("x", !0, null, null, !1, !1).getFontSizeData(a, e, d);
        new b.Symbol("c", !1, null, null, !0).getFontSizeData(a, e, d);
        this.getFontSizeData.parent.getFontSizeData.call(this, a, e, d);
      },
      curindex: 0,
      getMathML: function (a, e, d) {
        var b = org.imatheq.formulaeditor.presentation;
        if (
          0 == this.children.length ||
          (1 == this.children.length &&
            this.children[0] instanceof b.BlockSymbol)
        )
          return "<mrow" + (this.in_attrbs ? this.in_attrbs : "") + "/>";
        this.curindex = null === e || void 0 === e ? 0 : e;
        e = null === d || void 0 === d ? this.children.length : d;
        d = "";
        var f = 0,
          h = "",
          k = 0,
          l = "";
        for (
          0 < e &&
          this.children[e - 1] instanceof
            org.imatheq.formulaeditor.presentation.NewlineSymbol &&
          e--;
          this.curindex < e;

        ) {
          var m = this.children[this.curindex];
          if (
            m instanceof b.Subsup &&
            ("mprescripts" == m.msubtype || "mmultiscripts" == m.msubtype)
          ) {
            var r = "",
              n = "",
              p = "",
              t = m.uid,
              p = m.msubtype,
              l = "<mmultiscripts" + (m.in_attrbs ? m.in_attrbs : "") + ">";
            if ("mprescripts" == p) {
              for (
                ;
                this.curindex < e &&
                m instanceof b.Subsup &&
                "mprescripts" == m.msubtype &&
                m.uid == t;

              )
                (r += m.getMathML(!0)), (m = this.children[++this.curindex]);
              for (
                p = this.curindex < e ? this.getSubMathML(e) : "<mrow/>";
                this.curindex < e && m instanceof b.Subsup && m.uid == t;

              )
                (n += m.getMathML(!0)), (m = this.children[++this.curindex]);
              l += p + n + "<mprescripts/>" + r;
            } else {
              for (; this.curindex < e && m instanceof b.Subsup && m.uid == t; )
                (n += m.getMathML(!0)), (m = this.children[++this.curindex]);
              l += h + n;
              h = "";
              k = 0;
            }
            l += "</mmultiscripts>";
          } else
            m instanceof b.Subsup
              ? ((n = ""),
                (n += m.getMathML(!1)),
                (l =
                  "<" +
                  m.mtype +
                  (m.in_attrbs ? m.in_attrbs : "") +
                  ">" +
                  (1 < k ? "<mrow>" : "") +
                  h +
                  (1 < k ? "</mrow>" : "") +
                  n +
                  "</" +
                  m.mtype +
                  ">"),
                (h = ""),
                (k = 0),
                this.curindex++)
              : (l = this.getSubMathML(e));
          (m instanceof b.Symbol &&
            null !== m.value &&
            (8289 == m.value.charCodeAt(0) || " " == m.value)) ||
          m instanceof b.Space
            ? ((h += l), k++)
            : ((d += h), (h = l), (k = 1));
          f++;
        }
        d += h;
        1 < f &&
          a &&
          (d =
            "<mrow" +
            (this.in_attrbs ? this.in_attrbs : "") +
            ">" +
            d +
            "</mrow>");
        return d;
      },
      getSubMathML: function (a) {
        var e = org.imatheq.formulaeditor.presentation,
          d = org.imatheq.formulaeditor.parsing.expression.RevList,
          g = "";
        child = this.children[this.curindex];
        if (child instanceof e.BlockSymbol) (g = "<mrow/>"), this.curindex++;
        else if (child instanceof e.Alignmark)
          (g += child.getMathML()), this.curindex++;
        else if ("string" == typeof child.value) {
          child.getStyleString();
          var f = child.keyword,
            h = null !== child.mtext && void 0 !== child.mtext && child.mtext,
            k = child.value,
            e = child.in_attrbs ? child.in_attrbs : "";
          void 0 === f && (f = null);
          var l = f;
          null !== f &&
            0 < f.indexOf("_") &&
            (l = f.slice(0, child.keyword.indexOf("_")));
          if (h) {
            g +=
              "<mtext" +
              e +
              child.getStyleString() +
              ">" +
              b.getEncodedStr(child);
            for (
              this.curindex++;
              this.curindex < a &&
              ("string" == typeof this.children[this.curindex].value ||
                (this.children[this.curindex] instanceof
                  org.imatheq.formulaeditor.presentation.Space &&
                  0 < this.children[this.curindex].width)) &&
              child.hasSameStyle(this.children[this.curindex], !1);

            )
              g =
                this.children[this.curindex] instanceof
                org.imatheq.formulaeditor.presentation.Space
                  ? g + this.children[this.curindex++].getMathML()
                  : g + b.getEncodedStr(this.children[this.curindex++]);
            g += "</mtext>";
          } else if (child.mn && null !== f && 0 == f.indexOf(k)) {
            for (var h = "", d = this.curindex, m = 0; m < l.length; m++)
              if (
                ((k = this.children[this.curindex].value),
                this.curindex < a &&
                  "string" == typeof k &&
                  k == f.charAt(m) &&
                  this.children[this.curindex].mn &&
                  child.hasSameStyle(this.children[this.curindex], !1))
              )
                h =
                  this.children[this.curindex] instanceof
                  org.imatheq.formulaeditor.presentation.Space
                    ? h + this.children[this.curindex++].getMathML()
                    : h + b.getEncodedStr(this.children[this.curindex++]);
              else {
                for (
                  iKeyword = d;
                  null !== this.children[iKeyword].keyword &&
                  this.children[iKeyword].keyword == f;

                )
                  (this.children[iKeyword].keyword = null),
                    (this.children[iKeyword].mn = !1),
                    iKeyword++;
                this.curindex = d;
                break;
              }
            this.curindex != d &&
              (g += "<mn" + e + child.getStyleString() + ">" + h + "</mn>");
          } else if (child.mo && null !== f && 0 == f.indexOf(k)) {
            h = "";
            d = this.curindex;
            for (m = 0; m < l.length; m++)
              if (
                ((k = this.children[this.curindex].value),
                this.curindex < a &&
                  "string" == typeof k &&
                  k == f.charAt(m) &&
                  this.children[this.curindex].mo &&
                  child.hasSameStyle(this.children[this.curindex], !1))
              )
                h =
                  this.children[this.curindex] instanceof
                  org.imatheq.formulaeditor.presentation.Space
                    ? h + this.children[this.curindex++].getMathML()
                    : h + b.getEncodedStr(this.children[this.curindex++]);
              else {
                for (
                  iKeyword = d;
                  null !== this.children[iKeyword].keyword &&
                  this.children[iKeyword].keyword == f;

                )
                  (this.children[iKeyword].keyword = null),
                    (this.children[iKeyword].mo = !1),
                    iKeyword++;
                this.curindex = d;
                break;
              }
            this.curindex != d &&
              (g +=
                "<mo" +
                e +
                child.getStyleString() +
                (null !== child.in_attrs && void 0 !== child.in_attrs
                  ? child.in_attrs
                  : "") +
                ">" +
                h +
                "</mo>");
          } else if ("0" <= k && "9" >= k) {
            g += "<mn" + e + child.getStyleString() + ">";
            e = k;
            for (
              d = this.curindex + 1;
              d < a &&
              "string" == typeof this.children[d].value &&
              (("0" <= this.children[d] && "9" >= this.children[d]) ||
                "." == this.children[d] ||
                "," == this.children[d]) &&
              child.hasSameStyle(this.children[d], !1);

            )
              e += this.children[d++];
            a = e.length;
            arrDot = e.split(".");
            2 < arrDot.length && (a = arrDot[0].length + arrDot[1].length + 1);
            1 < arrDot.length &&
              -1 != arrDot[1].indexOf(",") &&
              (a = arrDot[0].length + arrDot[1].indexOf(",") + 1);
            arrComma = arrDot[0].split(",");
            len1 = arrComma[0].length;
            for (f = 1; f < arrComma.length; f++) {
              if (3 != arrComma[f].length) {
                a = len1;
                break;
              }
              len1 += 4;
            }
            g += e.slice(0, a);
            this.curindex += a;
            g += "</mn>";
          } else if (
            void 0 !== org.imatheq.formulaeditor.parsing.expression.MOList[k]
          )
            (g +=
              "<mo" +
              e +
              child.getStyleString() +
              ">" +
              b.getEncodedStr(child) +
              "</mo>"),
              this.curindex++;
          else if (void 0 !== d[k]) {
            for (
              h = b.getEncodedStr(child);
              ++this.curindex < a &&
              "string" == typeof this.children[this.curindex].value &&
              child.hasSameStyle(this.children[this.curindex], !1);

            )
              h += b.getEncodedStr(this.children[this.curindex]);
            a =
              child.bold &&
              ["script", "fraktur"].includes(d[k].type) &&
              d[k].non_bold
                ? ""
                : child.getStyleString();
            g += "<mi" + e + a + ">" + h + "</mi>";
          } else if (
            null === child.keyword ||
            0 != f.indexOf(k) ||
            (child.bold && !child.forcedItalic && child.autoItalic)
          )
            if (
              null !== child.keyword ||
              child.bold ||
              child.forcedItalic ||
              child.autoItalic ||
              !/[a-zA-Z]/.test(k)
            )
              (g +=
                "<mi" +
                e +
                child.getStyleString() +
                ">" +
                b.getEncodedStr(child) +
                "</mi>"),
                this.curindex++;
            else {
              g +=
                "<mi" + child.getStyleString() + ">" + b.getEncodedStr(child);
              for (
                this.curindex++;
                this.curindex < a &&
                "string" == typeof this.children[this.curindex].value &&
                /[a-zA-Z]/.test(this.children[this.curindex].value) &&
                child.hasSameStyle(this.children[this.curindex], !0);

              )
                g += b.getEncodedStr(this.children[this.curindex++]);
              g += "</mi>";
            }
          else {
            h = "";
            d = this.curindex;
            for (m = 0; m < l.length; m++)
              if (
                ((k = this.children[this.curindex].value),
                this.curindex < a &&
                  "string" == typeof k &&
                  k == f.charAt(m) &&
                  child.hasSameStyle(this.children[this.curindex], !1))
              )
                h =
                  this.children[this.curindex] instanceof
                  org.imatheq.formulaeditor.presentation.Space
                    ? h + this.children[this.curindex++].getMathML()
                    : h + b.getEncodedStr(this.children[this.curindex++]);
              else {
                for (
                  iKeyword = d;
                  null !== this.children[iKeyword].keyword &&
                  this.children[iKeyword].keyword == f;

                )
                  (this.children[iKeyword].keyword = null), iKeyword++;
                this.curindex = d;
                break;
              }
            this.curindex != d &&
              (g += "<mi" + e + child.getStyleString() + ">" + h + "</mi>");
          }
        } else (g += child.getMathML()), this.curindex++;
        return g;
      },
      curAltIndex: 0,
      firstNonSpace: null,
      getAltText: function (a, e, d) {
        a = org.imatheq.formulaeditor.presentation;
        var b = org.imatheq.formulaeditor.FormulaEditor.getEditor().altstrs;
        if (
          0 == this.children.length ||
          (1 == this.children.length &&
            this.children[0] instanceof a.BlockSymbol)
        )
          return " blank";
        this.curAltIndex = null === e || void 0 === e ? 0 : e;
        e = null === d || void 0 === d ? this.children.length : d;
        d = "";
        var f = 0,
          h = "",
          k = "";
        for (
          0 < e &&
          this.children[e - 1] instanceof
            org.imatheq.formulaeditor.presentation.NewlineSymbol &&
          e--;
          this.curAltIndex < e;

        ) {
          k = this.children[this.curAltIndex];
          if (
            k instanceof a.Subsup &&
            ("mprescripts" == k.msubtype || "mmultiscripts" == k.msubtype)
          ) {
            var l = "",
              m = "",
              r = "",
              n = (r = 0),
              p = k.uid;
            if ("mprescripts" == k.msubtype) {
              for (
                ;
                this.curAltIndex < e &&
                k instanceof a.Subsup &&
                "mprescripts" == k.msubtype &&
                k.uid == p;

              )
                (l += k.getAltText(!0)),
                  (k = this.children[++this.curAltIndex]),
                  r++;
              for (
                r = this.curAltIndex < e ? this.getSubAltText(e) : str.blank;
                this.curAltIndex < e && k instanceof a.Subsup && k.uid == p;

              )
                (m += k.getAltText(!0)),
                  (k = this.children[++this.curAltIndex]),
                  n++;
              k = r + l + b.mprescripts + m;
            } else {
              for (
                ;
                this.curAltIndex < e && k instanceof a.Subsup && k.uid == p;

              )
                (m += k.getAltText(!0)),
                  (k = this.children[++this.curAltIndex]),
                  n++;
              k = h + m;
              h = "";
            }
            k = b.mmultiscripts.replace("$0$", k);
          } else
            k instanceof a.Subsup
              ? ((m = ""),
                (m += k.getAltText(!1)),
                (k = h + m),
                (h = ""),
                this.curAltIndex++)
              : (k = this.getSubAltText(e));
          d += h;
          h = k;
          f++;
        }
        return d + h;
      },
      getSubAltText: function (a) {
        var e = org.imatheq.formulaeditor.presentation,
          d = org.imatheq.formulaeditor.FormulaEditor.getEditor(),
          b = d.altstrs,
          f = b.word_space,
          h = function (a) {
            var d = a.length;
            arrDot = a.split(".");
            2 < arrDot.length && (d = arrDot[0].length + arrDot[1].length + 1);
            1 < arrDot.length &&
              -1 != arrDot[1].indexOf(",") &&
              (d = arrDot[0].length + arrDot[1].indexOf(",") + 1);
            arrComma = arrDot[0].split(",");
            len1 = arrComma[0].length;
            for (a = 1; a < arrComma.length; a++) {
              if (3 != arrComma[a].length) {
                d = len1;
                break;
              }
              len1 += 4;
            }
            return d;
          },
          k = function (a) {
            var d = "";
            a.doubleStruck
              ? (d = b["double-struck"])
              : a.script
              ? (d = (a.bold ? b.bold : "") + b.script)
              : a.fraktur
              ? (d = (a.bold ? b.bold : "") + b.fraktur)
              : a.isSymbolAutoItalic()
              ? a.bold
                ? (d = a.forcedItalic
                    ? b.bold + b.italic
                    : a.autoItalic
                    ? b.bold + b.italic
                    : b.bold)
                : a.forcedItalic || a.autoItalic || (d = b.normal)
              : (d = a.forcedItalic
                  ? a.bold
                    ? b.bold + b.italic
                    : b.italic
                  : a.bold
                  ? b.bold
                  : "");
            return d;
          },
          l = "";
        child = this.children[this.curAltIndex];
        if (child instanceof e.BlockSymbol) (l = b.blank), this.curAltIndex++;
        else if ("string" == typeof child.value) {
          k(child);
          var m = child.keyword,
            r = null !== child.mtext && void 0 !== child.mtext && child.mtext,
            e = child.value,
            n = org.imatheq.formulaeditor.parsing.expression.RevList;
          void 0 === m && (m = null);
          var p = m;
          null !== m &&
            0 < m.indexOf("_") &&
            (p = m.slice(0, child.keyword.indexOf("_")));
          if (r) {
            for (
              l += k(child) + f + this.children[this.curAltIndex++];
              this.curAltIndex < a &&
              ("string" == typeof this.children[this.curAltIndex].value ||
                (this.children[this.curAltIndex] instanceof
                  org.imatheq.formulaeditor.presentation.Space &&
                  0 < this.children[this.curAltIndex].width)) &&
              child.hasSameStyle(this.children[this.curAltIndex], !1);

            )
              this.children[this.curAltIndex] instanceof
              org.imatheq.formulaeditor.presentation.Space
                ? ((l += b.space), this.curAltIndex++)
                : (l += this.children[this.curAltIndex++].value);
            l = b.mtext.replace("$0$", l);
          } else if (child.mn && null !== m && 0 == m.indexOf(e)) {
            h = f;
            f = this.curAltIndex;
            for (d = 0; d < p.length; d++)
              if (
                ((e = this.children[this.curAltIndex].value),
                this.curAltIndex < a &&
                  "string" == typeof e &&
                  e == m.charAt(d) &&
                  this.children[this.curAltIndex].mn &&
                  child.hasSameStyle(this.children[this.curAltIndex], !1))
              )
                (h =
                  this.children[this.curAltIndex] instanceof
                  org.imatheq.formulaeditor.presentation.Space
                    ? h + b.space
                    : h + e),
                  this.curAltIndex++;
              else {
                for (
                  iKeyword = f;
                  null !== this.children[iKeyword].keyword &&
                  this.children[iKeyword].keyword == m;

                )
                  (this.children[iKeyword].keyword = null),
                    (this.children[iKeyword].mn = !1),
                    iKeyword++;
                m = null;
                this.curAltIndex = f;
                break;
              }
            this.curAltIndex != f && (l += k(child) + h);
          } else if (child.mo && null !== m && 0 == m.indexOf(e)) {
            h = f;
            f = this.curAltIndex;
            for (d = 0; d < p.length; d++)
              if (
                ((e = this.children[this.curAltIndex].value),
                this.curAltIndex < a &&
                  "string" == typeof e &&
                  e == m.charAt(d) &&
                  this.children[this.curAltIndex].mo &&
                  child.hasSameStyle(this.children[this.curAltIndex], !1))
              )
                (h =
                  this.children[this.curAltIndex] instanceof
                  org.imatheq.formulaeditor.presentation.Space
                    ? h + b.space
                    : h + e),
                  this.curAltIndex++;
              else {
                for (
                  iKeyword = f;
                  null !== this.children[iKeyword].keyword &&
                  this.children[iKeyword].keyword == m;

                )
                  (this.children[iKeyword].keyword = null),
                    (this.children[iKeyword].mo = !1),
                    iKeyword++;
                m = null;
                this.curAltIndex = f;
                break;
              }
            this.curAltIndex != f && (l += k(child) + h);
          } else if ("0" <= e && "9" >= e) {
            l += k(child);
            k = f + e;
            for (
              f = this.curAltIndex + 1;
              f < a &&
              "string" == typeof this.children[f].value &&
              (("0" <= this.children[f] && "9" >= this.children[f]) ||
                "." == this.children[f] ||
                "," == this.children[f]) &&
              child.hasSameStyle(this.children[f], !1);

            )
              k += this.children[f++];
            a = h(k);
            l += k.slice(0, a);
            this.curAltIndex += a - 1;
          } else if (
            void 0 !== org.imatheq.formulaeditor.parsing.expression.MOList[e]
          )
            (l += k(child)),
              (l =
                this.firstNonSpace == this.curAltIndex && "-" == e
                  ? l + b.negative
                  : l + d.getSymbolAltText(e)),
              this.curAltIndex++;
          else if (void 0 !== n[e]) {
            for (
              h = n[e].key;
              ++this.curAltIndex < a &&
              "string" == typeof this.children[this.curAltIndex].value &&
              child.hasSameStyle(this.children[this.curAltIndex], !1);

            )
              h += n[this.children[this.curAltIndex].value].key;
            1 == h.length && -1 != "CNPQRZ".indexOf(h)
              ? (l += d.getSymbolAltText(e))
              : ((l += k(child)),
                (a = n[e].type.replace("bold-", "")),
                (e = -1 != n[e].type.indexOf("bold") ? " bold " : " "),
                -1 == k(child).indexOf(a) && (l += e + a),
                (l += f + h));
          } else if (
            null === child.keyword ||
            0 != m.indexOf(e) ||
            (child.bold && !child.forcedItalic && child.autoItalic)
          )
            if (
              null !== child.keyword ||
              child.forcedItalic ||
              child.autoItalic ||
              !/[a-zA-Z]/.test(e)
            )
              l +=
                k(child) +
                d.getSymbolAltText(this.children[this.curAltIndex++].value);
            else
              for (
                l += k(child) + f + e, this.curindex++;
                this.curAltIndex < a &&
                "string" == typeof this.children[this.curAltIndex].value &&
                /[a-zA-Z]/.test(this.children[this.curAltIndex].value) &&
                child.hasSameStyle(this.children[this.curAltIndex], !0);

              )
                l += this.children[this.curAltIndex++].value;
          else {
            h = f;
            f = this.curAltIndex;
            for (d = 0; d < p.length; d++)
              if (
                ((e = this.children[this.curAltIndex].value),
                this.curAltIndex < a &&
                  "string" == typeof e &&
                  e == m.charAt(d) &&
                  child.hasSameStyle(this.children[this.curAltIndex], !1))
              )
                (h =
                  this.children[this.curAltIndex] instanceof
                  org.imatheq.formulaeditor.presentation.Space
                    ? h + b.space
                    : h + e),
                  this.curAltIndex++;
              else {
                for (
                  iKeyword = f;
                  null !== this.children[iKeyword].keyword &&
                  this.children[iKeyword].keyword == m;

                )
                  (this.children[iKeyword].keyword = null), iKeyword++;
                m = null;
                this.curAltIndex = f;
                break;
              }
            this.curAltIndex != f && (l += k(child) + h);
          }
        } else (l += child.getAltText()), this.curAltIndex++;
        return l;
      },
      isSpaceLike: function (a) {
        var e = org.imatheq.formulaeditor.presentation;
        return a instanceof e.Space || a instanceof e.NewlineSymbol;
      },
      isEmbellished: function () {
        if (0 == this.children.length) return !1;
        for (
          var a = 0;
          a < this.children.length && this.isSpaceLike(this.children[a]);

        )
          a++;
        if (a == this.children.length || !this.isSpaceLike(this.children[a]))
          return !1;
        for (
          var e = this.children.length - 1;
          e > a && this.isSpaceLike(this.children[a]);

        )
          e--;
        return a == e && this.isSpaceLike(this.children[a]) ? !0 : !1;
      },
      getSymbol: function () {
        if (!this.isEmbellished()) return null;
        for (
          var a = 0;
          a < this.children.length && this.isSpaceLike(this.children[a]);

        )
          a++;
        return this.children[a];
      },
      getMOSpaces: function (a, e, d) {
        var b = org.imatheq.formulaeditor.parsing.expression.MOList[e.value],
          f = null;
        if (null !== e.lspace || null !== e.rspace)
          return {
            lspace: null !== e.lspace ? a.getPXSize(e.lspace) : 0,
            rspace: null !== e.rspace ? a.getPXSize(e.rspace) : 0,
          };
        if (void 0 !== b[d] && null !== b[d])
          f = {
            lspace:
              null !== e.lspace ? e.lspace : a.getPXSize(b[d].ls / 18 + "em"),
            rspace:
              null !== e.rspace ? e.rspace : a.getPXSize(b[d].rs / 18 + "em"),
          };
        else {
          e = 0;
          for (var h, f = 0; 3 > f; f++)
            null !== b[f] && void 0 !== b[f] && ((h = f), e++);
          f =
            1 == e
              ? {
                  lspace: a.getPXSize(b[h].ls / 18 + "em"),
                  rspace: a.getPXSize(b[h].rs / 18 + "em"),
                }
              : 2 == d && void 0 !== b[1] && null !== b[1]
              ? { lspace: a.getPXSize(b[1].ls / 18 + "em"), rspace: 0 }
              : 0 == d && void 0 !== b[1] && null !== b[1]
              ? { lspace: 0, rspace: a.getPXSize(b[1].rs / 18 + "em") }
              : {
                  lspace: 0 == d ? 0 : a.getPXSize("0.28em"),
                  rspace: 2 == d ? 0 : a.getPXSize("0.28em"),
                };
        }
        return f;
      },
      draw: function (a, e, d, b, f) {
        var h = org.imatheq.formulaeditor.presentation;
        if (0 < this.children.length) {
          for (
            var k = d,
              l = b,
              m = d,
              r = b,
              n = null,
              p = 0,
              t = !1,
              q = !1,
              u = this.children[0].getMathvariant
                ? this.children[0].getMathvariant()
                : null,
              v = this.children[0].mathcolor,
              y = null,
              A = null,
              C = null,
              z = null,
              w = !1,
              D = !1,
              B =
                8 <
                org.imatheq.formulaeditor.FormulaEditor.getEditor().canvas.getFontSizeIdx(
                  B
                )
                  ? 2
                  : 1,
              E = 0;
            E < this.children.length;
            E++
          )
            this.isSpaceLike(this.children[E]) ||
              (null === n && (n = E), (p = E));
          for (E = 0; E < this.children.length; E++) {
            var F = this.children[E],
              G = null !== F.mtext && void 0 !== F.mtext && F.mtext,
              H = {
                lspace:
                  null === F.lspace || void 0 === F.lspace
                    ? 0
                    : a.getPXSize(F.lspace),
                rspace:
                  null === F.rspace || void 0 === F.rspace
                    ? 0
                    : a.getPXSize(F.rspace),
              },
              I = F.getMathvariant ? F.getMathvariant() : null,
              w =
                (null === y && G) ||
                (null !== y && (u !== I || v !== F.mathcolor)),
              D = !1;
            G && E == this.children.length - 1
              ? (D = !0)
              : G &&
                ((D = this.children[E + 1].getMathvariant
                  ? this.children[E + 1].getMathvariant()
                  : null),
                (D =
                  !this.children[E + 1].mtext ||
                  I !== D ||
                  F.mathcolor !== this.children[E + 1].mathcolor));
            if (G) H = { lspace: w ? B : 0, rspace: D ? B : 0 };
            else if (n != p && E >= n && E <= p)
              if (q) (q = !1), (H = { lspace: 0, rspace: nextRspace });
              else if (F.isEmbellished()) {
                v = 0;
                E > n && E < p ? (v = 1) : E == p && (v = 2);
                u = F.getSymbol();
                if (null === u || void 0 === u)
                  throw Error(
                    "Error failed to find operator in embellished node"
                  );
                H = this.getMOSpaces(a, u, v);
                E < p &&
                  this.children[E + 1] instanceof h.Subsup &&
                  ((t = !0), (nextRspace = H.rspace), (H.rspace = 0));
              } else if (t) (H.rspace = nextRspace), (nextRspace = 0), (t = !1);
              else if (
                F instanceof h.Subsup &&
                "mprescripts" == F.msubtype &&
                E < p &&
                this.children[E + 1].isEmbellished()
              ) {
                v = 0;
                E + 1 > n && E + 1 < p ? (v = 1) : E + 1 == p && (v = 2);
                u = this.children[E + 1].getSymbol();
                if (null === u || void 0 === u)
                  throw Error(
                    "Error failed to find operator in embellished node"
                  );
                H = this.getMOSpaces(a, u, v);
                q = !0;
                nextRspace = H.rspace;
                H.rspace = 0;
              }
            v = F.draw(a, e, m, b, f, H);
            k = Math.min(k, v.left);
            l = Math.min(l, v.top);
            d = Math.max(d, v.left + v.width);
            m = v.left + v.width;
            r = Math.max(r, v.top + v.height);
            w
              ? ((y = v.left),
                (A = v.top),
                (C = v.left + v.width),
                (z = v.top + v.height))
              : G &&
                ((y = Math.min(y, v.left)),
                (A = Math.min(A, v.top)),
                (C = Math.max(C, v.left + v.width)),
                (z = Math.max(z, v.top + v.height)));
            D &&
              ((mt_dimensions = {
                left: y + B,
                top: A,
                width: C - y - B,
                height: z - A + 2 * B,
              }),
              f || a.drawBox(mt_dimensions, "#99ebff"),
              (z = C = A = y = null));
            u = this.children[E].getMathvariant
              ? this.children[E].getMathvariant()
              : null;
            v = F.mathcolor;
          }
          this.dimensions = { left: k, top: l, width: d - k, height: r - l };
        } else {
          var B = 0;
          void 0 !== e.fontSizeModifier &&
            null !== e.fontSizeModifier &&
            (B = e.fontSizeModifier);
          this.dimensions = a.drawFBox(d, b, !0, null, !1, !1, v, B);
        }
        return this.dimensions;
      },
      getSelectedArea: function (a, e) {
        for (var d = null, b = a; b < e; b++)
          if (b < this.children.length)
            var f = this.children[b],
              d =
                b == a
                  ? {
                      top: f.dimensions.top,
                      left: f.dimensions.left,
                      width: f.dimensions.width,
                      height: f.dimensions.height,
                    }
                  : {
                      top: Math.min(d.top, f.dimensions.top),
                      left: Math.min(d.left, f.dimensions.left),
                      width:
                        Math.max(
                          d.left + d.width,
                          f.dimensions.left + f.dimensions.width
                        ) - Math.min(d.left, f.dimensions.left),
                      height:
                        Math.max(
                          d.top + d.height,
                          f.dimensions.top + f.dimensions.height
                        ) - Math.min(d.top, f.dimensions.top),
                    };
        1 == e - a &&
          this.children[a] instanceof
            org.imatheq.formulaeditor.presentation.NewlineSymbol &&
          (d = {
            top: this.dimensions.top,
            left: d.left,
            width: d.width,
            height: this.dimensions.height,
          });
        return d;
      },
      newSymbol: function (a, e, d, b, f, h) {
        var k = org.imatheq.formulaeditor.presentation;
        return " " == a || "\u00a0" == a
          ? new k.Space("0.4em", "0", "0", a)
          : new k.Symbol(a, e, d, b, f, h);
      },
      onkeydown: function (a, e) {
        return !0;
      },
      backDelete: function (a) {
        var e = org.imatheq.formulaeditor.presentation,
          d = { row: a.cursor.position.row, index: a.cursor.position.index },
          b = a.getButtonStatus();
        if (0 < d.index)
          if (this.children[d.index - 1].canDelete(a)) {
            var f = this.children.length - d.index,
              h = this.remove(d.index - 1),
              k = this.getIndexChain(d.index),
              l = this.getIndexChain(d.index - 1);
            d.index--;
            if (this.isEmpty()) {
              var m = h.children[0];
              (this.parent instanceof e.Lines && 0 != this.index) ||
                ((e = new e.BlockSymbol(
                  null,
                  m.bold,
                  m.mathcolor,
                  null,
                  m.forcedItalic,
                  m.autoItalic
                )),
                this.insert(0, e));
            }
            a.cursor.setPosition(d);
            a.actions.addAction("delete", d, k, l, h, null, f, null, null, b);
            a.redraw();
          } else
            (b = { row: d.row, index: d.index - 1 }),
              (f = { row: d.row, index: d.index }),
              (h = d.row.getIndexChain(d.index - 1)),
              (k = d.row.getIndexChain(d.index)),
              a.selection.setSelection({
                parent: this,
                startPosition: b,
                endPosition: f,
                startIndex: d.index - 1,
                endIndex: d.index,
                startIndexChain: h,
                endIndexChain: k,
                dimensions: this.children[d.index - 1].dimensions,
              });
      },
      foreDelete: function (a) {
        var e = { row: a.cursor.position.row, index: a.cursor.position.index },
          d = a.getButtonStatus();
        if (e.index < this.children.length)
          if (this.children[e.index].canDelete(a)) {
            var b = this.remove(e.index),
              f = this.getIndexChain(e.index),
              h = this.getIndexChain(e.index);
            this.isEmpty() && this.insert(0);
            a.cursor.setPosition(e);
            a.actions.addAction(
              "delete",
              e,
              f,
              h,
              b,
              null,
              this.children.length - e.index,
              null,
              null,
              d
            );
            a.redraw();
          } else
            (d = { row: e.row, index: e.index }),
              (b = { row: e.row, index: e.index + 1 }),
              (f = e.row.getIndexChain(e.index)),
              (h = e.row.getIndexChain(e.index + 1)),
              a.selection.setSelection({
                parent: this,
                startPosition: d,
                endPosition: b,
                startIndex: e.index,
                endIndex: e.index + 1,
                startIndexChain: f,
                endIndexChain: h,
                dimensions: this.children[e.index].dimensions,
              });
      },
      onkeypress: function (a, e) {
        if (!a.altKey && !a.ctrlKey) {
          var d = String.fromCharCode(a.charCode);
          return 13 == a.charCode ? !1 : this.charInput(d, e);
        }
        return !0;
      },
      charInput: function (a, e) {
        var d = org.imatheq.formulaeditor.presentation,
          b = null,
          f = e.getButtonStatus(),
          h = org.imatheq.formulaeditor.presentation.BlockSymbol,
          k = { row: e.cursor.position.row, index: e.cursor.position.index },
          l = k.row.getIndexChain(k.index),
          m,
          r = e.selection,
          n = "insert";
        r.hasSelection
          ? ((b = r.getSelectionCopy()),
            (k.row = r.parent),
            (h = r.startIndex),
            (n = r.endIndex),
            0 < n && this.children[n - 1] instanceof d.NewlineSymbol && n--,
            this.updateKeyword(e, h),
            this.updateKeyword(e, n),
            (d = this.children.length - n),
            n > h && (m = this.remove(h, n)),
            r.clear(),
            (n = "update"),
            (k.index = h))
          : (this.updateKeyword(e, k.index),
            (d = this.children.length - k.index),
            0 <= k.index - 1 && this.children[k.index - 1] instanceof h
              ? (k.index--, (m = this.remove(k.index)), (n = "update"))
              : this.children[k.index] instanceof h
              ? ((m = this.remove(k.index)), d--, (n = "update"))
              : (m = null));
        null != m &&
          ((r = m.children[m.children.length - 1]),
          (f.bold = r.bold),
          (f.mathcolor = r.mathcolor),
          (f.forcedItalic = r.forcedItalic),
          (f.autoItalic = r.autoItalic),
          (f.mtext = r.mtext));
        r = this.insert(
          k.index,
          this.newSymbol(
            a,
            f.bold,
            f.mathcolor,
            f.mtext,
            f.forcedItalic,
            f.autoItalic
          )
        );
        e.cursor.setPosition(k);
        r && e.cursor.moveRight(!1);
        r = e.cursor.position.row.getIndexChain(e.cursor.position.index);
        e.actions.addAction(n, k, l, r, m, null, d, b, null, f, f);
        this.convertKeyword(e);
        return !1;
      },
      updateKeyword: function (a, e, d, b, f) {
        d = org.imatheq.formulaeditor.presentation;
        new org.imatheq.formulaeditor.Options();
        if (
          0 < e &&
          e < this.children.length &&
          "string" == typeof this.children[e].value &&
          "string" == typeof this.children[e - 1].value &&
          null !== this.children[e].keyword &&
          this.children[e - 1].keyword == this.children[e].keyword
        ) {
          for (
            var h = e, k = this.children[e].keyword;
            h < this.children.length &&
            "string" == typeof this.children[h].value &&
            this.children[h].keyword == k;

          )
            h++;
          for (
            var l = h, h = e - 1;
            0 <= h &&
            "string" == typeof this.children[h].value &&
            this.children[h].keyword == k;

          )
            h--;
          var h = h + 1,
            m = [];
          k.slice(k.indexOf("_") + 1);
          for (k = h; k < l; k++)
            m.push(this.children[k].copy()),
              (this.children[k].keyword = null),
              (this.children[k].mo = !1),
              (this.children[k].mn = !1);
          l = this.children.length - l;
          d = new d.Row();
          d.initialize.apply(d, m);
          h = { row: this, index: h };
          e = this.getIndexChain(e);
          m = a.getButtonStatus();
          a.actions.addAction("update", h, e, e, d, null, l, b, f, m, null);
          a.redraw(!0);
        }
      },
      convertKeyword: function (a) {
        var e = org.imatheq.formulaeditor.presentation,
          d = a.cursor.position.index,
          b = a.cursor.position.row;
        if (1 < d) {
          var f = d - 1,
            h = b.children[f],
            k = "",
            l = h;
          for (
            hasKeyword = !1;
            0 <= f &&
            7 >= d - f &&
            "string" == typeof h.value &&
            l.hasSameStyle(h);

          ) {
            if (null !== h.keyword) {
              var m = h.keyword.slice(0, h.keyword.indexOf("_")),
                r = m.length;
              if (7 < d - f - 1 + r) break;
              else (hasKeyword = !0), (k = m + k), (f -= r);
            } else (k = h.value + k), f--;
            0 <= f && (h = b.children[f]);
          }
          h = f + 1;
          for (
            f = 0;
            f < k.length - 1 &&
            ((str1 = k.slice(f, k.length)),
            void 0 ===
              org.imatheq.formulaeditor.parsing.expression.KeywordList[str1]);

          )
            f++;
          h += f;
          if (f < k.length - 1) {
            for (f = l = 0; f < this.children.length; f++)
              null !== this.children[f].keyword &&
                void 0 !== this.children[f].keyword &&
                ((m = parseInt(
                  this.children[f].keyword.slice(
                    this.children[f].keyword.indexOf("_") + 1
                  )
                )),
                (l = Math.max(l, m)));
            f = this.children.length - d;
            e = new e.Row();
            m = [];
            for (r = h; r < d; r++)
              m.push(b.children[r].copy()),
                (b.children[r].keyword = k + "_" + (l + 1));
            e.initialize.apply(e, m);
            k = { row: b, index: h };
            d = b.getIndexChain(d);
            b = a.getButtonStatus();
            a.actions.addAction(
              "setSymbFontAttrbs",
              k,
              d,
              d,
              e,
              null,
              f,
              null,
              null,
              b,
              null
            );
          }
        }
        a.redraw(!0);
      },
      flatten: function () {
        var a = org.imatheq.formulaeditor.presentation.Row;
        this.flatten.parent.flatten.apply(this);
        for (var e = this.children, d = 0; d < e.length; d++) {
          var b = e[d];
          b instanceof a && e.splice.apply(e, [d, 1].concat(b.children));
        }
        this.updateChildren();
      },
      getCursorPosition: function (a, e, d) {
        for (var b = this.children.length, f = 0; f < b; f++) {
          var h = this.children[f].dimensions;
          if (e < h.left + h.width || f == b - 1)
            return this.children[f].getCursorPosition(a, e, d);
        }
        return { row: this, index: 0 };
      },
      getFirstCursorPosition: function (a, e, d) {
        if (null === d || void 0 === d) d = !0;
        return null === e || void 0 === e || 0 < e
          ? this.getFollowingCursorPosition(a, null, d)
          : null !== this.parent
          ? this.parent.getFirstCursorPosition(a, null, d)
          : null;
      },
      getLastCursorPosition: function (a, e, d) {
        return null === e || void 0 === e || e < this.children.length
          ? this.getPrecedingCursorPosition(a, null, d)
          : null !== this.parent
          ? this.parent.getLastCursorPosition(a, null, d)
          : null;
      },
      getFollowingCursorPosition: function (a, e, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === e || void 0 === e)
          return null === this.parent && null !== this.children[0]
            ? this.children[0].getFollowingCursorPosition(a, null, d)
            : { row: this, index: 0 };
        if (e < this.children.length) {
          var b = null;
          d && (b = this.children[e].getFollowingCursorPosition(a, null, d));
          null === b && (b = { row: this, index: e + 1 });
          return b;
        }
        return null !== this.parent
          ? this.parent.getFollowingCursorPosition(a, this.index, d)
          : null;
      },
      getPrecedingCursorPosition: function (a, e, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === e || void 0 === e) {
          if (0 == this.children.length)
            throw Error(
              "Error in Row.getPrecedingCursorPosition: children length is 0."
            );
          return this.children[this.children.length - 1] instanceof
            org.imatheq.formulaeditor.presentation.NewlineSymbol
            ? { row: this, index: this.children.length - 1 }
            : { row: this, index: this.children.length };
        }
        if (0 < e) {
          var b = null;
          d &&
            (b = this.children[e - 1].getPrecedingCursorPosition(a, null, d));
          null === b && (b = { row: this, index: e - 1 });
          return b;
        }
        return null !== this.parent
          ? this.parent.getPrecedingCursorPosition(a, this.index, d)
          : null;
      },
      getLowerCursorPosition: function (a, e, d, b) {
        if (null === e || void 0 === e) {
          if (0 == this.children.length) return { row: this, index: 0 };
          e = null;
          for (var f = 0, h = 0; h <= this.children.length; h++) {
            var k;
            h < this.children.length
              ? (k = this.children[h].dimensions.left)
              : 0 < this.children.length
              ? ((k = this.children[this.children.length - 1].dimensions),
                (k = k.left + k.width))
              : (k = this.dimensions.left);
            k = Math.abs(k - d);
            if (null === e || k < e) (e = k), (f = h);
          }
          if (b) {
            if (
              f < this.children.length &&
              null !== this.children[f] &&
              void 0 !== this.children[f]
            )
              return this.children[f].getLowerCursorPosition(a, null, d, b);
            if (
              0 < f &&
              f == this.children.length &&
              null !== this.children[f - 1] &&
              void 0 !== this.children[f - 1]
            )
              return this.children[f - 1].getLowerCursorPosition(a, null, d, b);
          } else return { row: this, index: f };
        } else return this.parent.getLowerCursorPosition(a, this.index, d, b);
      },
      getHigherCursorPosition: function (a, e, d, b) {
        if (null === e || void 0 === e) {
          e = null;
          for (var f = 0, h = 0; h <= this.children.length; h++) {
            var k;
            h < this.children.length
              ? (k = this.children[h].dimensions.left)
              : 0 < this.children.length
              ? ((k = this.children[this.children.length - 1].dimensions),
                (k = k.left + k.width))
              : (k = this.dimensions.left);
            k = Math.abs(k - d);
            if (null === e || k < e) (e = k), (f = h);
          }
          if (b) {
            if (
              f < this.children.length &&
              null !== this.children[f] &&
              void 0 !== this.children[f]
            )
              return this.children[f].getHigherCursorPosition(a, null, d, b);
            if (
              0 < f &&
              f == this.children.length &&
              null !== this.children[f - 1] &&
              void 0 !== this.children[f - 1]
            )
              return this.children[f - 1].getHigherCursorPosition(
                a,
                null,
                d,
                b
              );
          } else return { row: this, index: f };
        } else return this.parent.getHigherCursorPosition(a, this.index, d, b);
      },
      isEmpty: function () {
        return 0 === this.children.length;
      },
      insert: function (a, e, d) {
        var b = org.imatheq.formulaeditor.presentation.BlockSymbol,
          f = a,
          h = !0;
        if (null === d || void 0 === d) d = !0;
        if (null === e || void 0 === e) e = new b();
        d && a <= this.children.length && this.children[a] instanceof b
          ? this.children.splice(a, 1, e)
          : d && 0 <= a - 1 && this.children[a - 1] instanceof b
          ? (this.children.splice(a - 1, 1, e), (f = a - 1), (h = !1))
          : this.children.splice(f, 0, e);
        this.updateChildren(f);
        return h;
      },
      replace: function (a, e) {
        this.children.splice(a, 1, e);
        this.updateChildren(a);
      },
      remove: function (a, e, d) {
        var b = org.imatheq.formulaeditor.presentation,
          f = e;
        if (null === e || void 0 === e) f = a + 1;
        e = new b.Row();
        e.initialize.apply(e, this.children.splice(a, f - a));
        0 == this.children.length &&
          null !== d &&
          void 0 !== d &&
          d &&
          ((d = e.children[e.children.length - 1]),
          (b = new b.BlockSymbol(
            null,
            d.bold,
            null,
            null,
            d.forcedItalic,
            d.autoItalic
          )),
          this.children.splice(0, 0, b));
        this.updateChildren(a);
        return e;
      },
    }
  );
})();
(function () {
  var b = com.efmase.js.utilities.toolset;
  org.imatheq.formulaeditor.presentation.Bracketed = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      leftBracket: null,
      rightBracket: null,
      separator: null,
      slowDelete: !0,
      symmetric: null,
      isMO: !1,
      margin: 2,
      initialize: function () {
        if (0 < arguments.length) {
          this.leftBracket = arguments[0];
          var a = arguments[1];
          this.rightBracket = arguments[2];
          this.children = [];
          this.children.push(a);
          3 < arguments.length && (this.mathcolor = arguments[3]);
        } else this.children = [];
        for (
          var a = new org.imatheq.formulaeditor.presentation.Row(),
            e = this.functionsFromRow.length - 1;
          0 <= e;
          e--
        )
          this[this.functionsFromRow[e]] ||
            (this[this.functionsFromRow[e]] = a[this.functionsFromRow[e]]);
        this.updateChildren();
      },
      draw: function (a, e, d, b, f) {
        var h, k;
        h = this.getSymmetric();
        k = a.getXDimentions(e, 0, 0);
        baseline = k.top + Math.round(0.4 * k.height);
        7 > a.getFontSizeIdx(e.fontSizeModifier) && (this.margin = 1);
        k = this.children[0];
        k.draw(a, e, 0, 0, !0);
        var l = Math.max(
            k.dimensions.top < baseline ? baseline - k.dimensions.top : 0,
            k.dimensions.top + k.dimensions.height > baseline
              ? k.dimensions.top + k.dimensions.height - baseline
              : 0
          ),
          m = h ? baseline - l : k.dimensions.top,
          r = h ? 2 * l : k.dimensions.height;
        h = h ? 2 * l + 2 * this.margin : k.dimensions.height + 2 * this.margin;
        this.leftBracket.minimumHeight = h;
        this.rightBracket.minimumHeight = h;
        "" != this.leftBracket.value && this.leftBracket.draw(a, e, 0, 0, !0);
        "" != this.rightBracket.value && this.rightBracket.draw(a, e, 0, 0, !0);
        "" == this.leftBracket.value && "" == this.rightBracket.value
          ? ((this.leftBracket.dimensions = {
              top: m,
              left: k.dimensions.left,
              width: 0,
              height: r,
            }),
            (this.rightBracket.dimensions = {
              top: m,
              left: k.dimensions.left + k.dimensions.width,
              width: 0,
              height: r,
            }))
          : "" == this.leftBracket.value
          ? (this.leftBracket.dimensions = {
              top: this.rightBracket.dimensions.top,
              left: k.dimensions.left,
              width: 0,
              height: this.rightBracket.dimensions.height,
            })
          : "" == this.rightBracket.value &&
            (this.rightBracket.dimensions = {
              top: this.leftBracket.dimensions.top,
              left: k.dimensions.left + k.dimensions.width,
              width: 0,
              height: this.leftBracket.dimensions.height,
            });
        h = Math.max(
          this.leftBracket.dimensions.height,
          r,
          this.rightBracket.dimensions.height
        );
        var l = this.leftBracket.value,
          n = this.rightBracket.value;
        if (
          "\u27e8" == l ||
          "\u2329" == l ||
          "<" == l ||
          "\u2308" == l ||
          "\u230a" == l
        )
          (this.leftBracket.minimumHeight = h),
            this.leftBracket.draw(a, e, 0, 0, !0);
        if (
          "\u27e9" == n ||
          "\u2329" == n ||
          ">" == n ||
          "\u2309" == n ||
          "\u230b" == n
        )
          (this.rightBracket.minimumHeight = h),
            this.rightBracket.draw(a, e, 0, 0, !0);
        var p = (n = l = 0);
        h > r && (l = (h - r) / 2);
        this.leftBracket.dimensions.height < h &&
          (n = (h - this.leftBracket.dimensions.height) / 2);
        this.rightBracket.dimensions.height < h &&
          (p = (h - this.rightBracket.dimensions.height) / 2);
        this.dimensions = {
          height: h,
          width:
            this.leftBracket.dimensions.width +
            k.dimensions.width +
            this.rightBracket.dimensions.width +
            2 * this.margin +
            2,
          left: d,
          top: b + m - l,
        };
        if (!1 === f || null === f || void 0 === f)
          "" != this.leftBracket.value &&
            this.leftBracket.draw(
              a,
              e,
              d + 1 - this.leftBracket.dimensions.left,
              this.dimensions.top + n - this.leftBracket.dimensions.top,
              f
            ),
            k.draw(
              a,
              e,
              d +
                1 +
                this.leftBracket.dimensions.width -
                k.dimensions.left +
                this.margin,
              b,
              f
            ),
            "" != this.rightBracket.value &&
              this.rightBracket.draw(
                a,
                e,
                d +
                  1 +
                  this.leftBracket.dimensions.width +
                  k.dimensions.width -
                  this.rightBracket.dimensions.left +
                  2 * this.margin,
                this.dimensions.top + p - this.rightBracket.dimensions.top,
                f
              );
        return this.dimensions;
      },
      getFontSizeData: function (a, e, d) {
        var b = org.imatheq.formulaeditor.presentation;
        if ("" != this.leftBracket.value) {
          var f = this.leftBracket.onscreen
            ? this.leftBracket.onscreen
            : this.leftBracket.value;
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f] &&
            new b.Symbol(f).getFontSizeData(a, e, d, !0);
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "1"]
            ? new b.Symbol(f + "1").getFontSizeData(a, e, d, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "m"] &&
              new b.Symbol(f + "m").getFontSizeData(a, e, d, !0);
        }
        "" != this.rightBracket.value &&
          ((f = this.rightBracket.onscreen
            ? this.rightBracket.onscreen
            : this.rightBracket.value),
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f] &&
            new b.Symbol(f).getFontSizeData(a, e, d, !0),
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "1"]
            ? new b.Symbol(f + "1").getFontSizeData(a, e, d, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "m"] &&
              new b.Symbol(f + "m").getFontSizeData(a, e, d, !0));
        this.getFontSizeData.parent.getFontSizeData.call(this, a, e, d);
      },
      setSymbFontAttrbs: function (a) {
        this.leftBracket.setSymbFontAttrbs(a);
        this.rightBracket.setSymbFontAttrbs(a);
        this.setSymbFontAttrbs.parent.setSymbFontAttrbs.call(this, a);
        this.isMO = !1;
      },
      functionsFromRow: [
        "getFirstCursorPosition",
        "getLastCursorPosition",
        "getLowerCursorPosition",
        "getHigherCursorPosition",
      ],
      getCursorPosition: function (a, e, d) {
        var b;
        if (
          "" != this.leftBracket.value &&
          ((b = this.leftBracket.dimensions),
          e < b.left + Math.floor(b.width / 2))
        )
          return null !== this.parent
            ? { row: this.parent, index: this.index }
            : null;
        b = this.children[0].dimensions;
        return e < b.left + b.width
          ? this.children[0].getCursorPosition(a, e, d)
          : "" != this.rightBracket.value &&
            ((b = this.rightBracket.dimensions),
            e < b.left + Math.floor(b.width / 2))
          ? { row: this.children[0], index: this.children[0].children.length }
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : this.getPrecedingCursorPosition(a);
      },
      getFollowingCursorPosition: function (a, e, d) {
        if (null === d || void 0 === d) d = !0;
        return null === e || void 0 === e
          ? this.children[0].getFollowingCursorPosition(a, null, d)
          : null !== this.parent
          ? this.parent.getFollowingCursorPosition(a, this.index, !1)
          : null;
      },
      getPrecedingCursorPosition: function (a, e, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === e || void 0 === e)
          return this.children[0].getPrecedingCursorPosition(a, null, d);
        var b = null;
        1 == e &&
          d &&
          (b = this.children[0].getPrecedingCursorPosition(a, null, d));
        return null === b && null !== this.parent
          ? this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : b;
      },
      copy: function () {
        return this.clone(
          this.leftBracket.copy(),
          this.children[0].copy(),
          this.rightBracket.copy()
        );
      },
      getMathML: function () {
        var a, e;
        this.isMO
          ? ((a = "<mrow>" + this.leftBracket.getMathML()),
            (e = this.rightBracket.getMathML() + "</mrow>"))
          : ((a =
              "<mfenced" +
              (this.in_attrbs ? this.in_attrbs : "") +
              ("(" == this.leftBracket.value
                ? this.in_open
                : ' open="' + b.getEncodedStr(this.leftBracket) + '"') +
              (")" == this.rightBracket.value
                ? this.in_close
                : ' close="' + b.getEncodedStr(this.rightBracket) + '"') +
              this.in_separators +
              (null === this.mathcolor ||
              "" == this.mathcolor ||
              "null" == this.mathcolor ||
              "#000000" == this.mathcolor
                ? ""
                : ' mathcolor="' + this.mathcolor + '"') +
              ">"),
            (e = "</mfenced>"),
            null != this.symmetric &&
              ((a = '<mstyle symmetric="' + this.symmetric + '">' + a),
              (e += "</mstyle>")));
        for (var d = 0; d < this.children.length; d++)
          a += this.children[d].getMathML(!0);
        return a + e;
      },
      getAltText: function () {
        for (
          var a = org.imatheq.formulaeditor.FormulaEditor.getEditor(),
            e =
              "|" == this.leftBracket.value ||
              "\u2225" == this.leftBracket.value ||
              "" == this.leftBracket.value
                ? a.getSymbolAltText("open_" + this.leftBracket.value)
                : a.getSymbolAltText(this.leftBracket.value),
            d = 0;
          d < this.children.length;
          d++
        )
          e += this.children[d].getAltText();
        return (e +=
          "|" == this.rightBracket.value ||
          "\u2225" == this.rightBracket.value ||
          "" == this.rightBracket.value
            ? a.getSymbolAltText("close_" + this.rightBracket.value)
            : a.getSymbolAltText(this.rightBracket.value));
      },
      getSymmetric: function () {
        var a = new org.imatheq.formulaeditor.Options().getOption(
          "defSymmetric"
        );
        return null === this.symmetric ? a : this.symmetric;
      },
      setSymmetric: function (a) {
        this.symmetric = a;
      },
      updateEditTabButtons: function (a) {
        a = document.getElementById("BRACKETS_SYMMETRIC_ON");
        var e = document.getElementById("BRACKETS_SYMMETRIC_OFF");
        this.getSymmetric()
          ? (a.classList.add("efmase_palettebutton_select"),
            e.classList.remove("efmase_palettebutton_select"))
          : (a.classList.remove("efmase_palettebutton_select"),
            e.classList.add("efmase_palettebutton_select"));
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Bracket = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      minimumHeight: 1,
      initialize: function () {
        0 < arguments.length &&
          this.initialize.parent.initialize.apply(
            this,
            Array.prototype.slice.call(arguments)
          );
      },
      copy: function () {
        return this.clone(this.value, this.minimumHeight, this.onscreen);
      },
      draw: function (b, a, e, d, g) {
        var f = this.value;
        null !== this.onscreen && (f = this.onscreen);
        return (this.dimensions =
          "\u27e8" == f ||
          "\u2329" == f ||
          "<" == f ||
          "\u27e9" == f ||
          "\u232a" == f ||
          ">" == f
            ? b.drawAngleBracket(
                a,
                f,
                Math.round(e),
                Math.round(d),
                this.minimumHeight,
                g,
                null,
                this.mathcolor
              )
            : "\u2308" == f || "\u230a" == f || "\u2309" == f || "\u230b" == f
            ? b.drawCeilingFloorBracket(
                a,
                f,
                Math.round(e),
                Math.round(d),
                this.minimumHeight,
                g,
                null,
                this.mathcolor
              )
            : b.drawBracket(
                a,
                f,
                Math.round(e),
                Math.round(d),
                this.minimumHeight,
                g,
                null,
                this.mathcolor
              ));
      },
      getMathML: function () {
        var b = "",
          a = this.in_attrbs ? this.in_attrbs : "";
        if ("" != this.value) {
          for (var e in this)
            Object.prototype.hasOwnProperty.call(this, e) &&
              "mo_" == e.substring(0, 3) &&
              (a += " " + e.substring(3) + '="' + this[e] + '"');
          b =
            "<mo" +
            a +
            this.getStyleString() +
            ">" +
            com.efmase.js.utilities.toolset.getEncodedStr(this) +
            "</mo>";
        }
        return b;
      },
    }
  );
})();
(function () {
  var b = com.efmase.js.utilities.toolset;
  org.imatheq.formulaeditor.presentation.VerticalBracket = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      value: null,
      minimumWidth: 1,
      fullWidth: 1,
      accent: !0,
      initialize: function () {
        0 < arguments.length &&
          this.initialize.parent.initialize.apply(
            this,
            Array.prototype.slice.call(arguments)
          );
      },
      copy: function () {
        return this.clone(
          this.value,
          this.minimumWidth,
          this.onscreen,
          this.accent
        );
      },
      getFontSizeData: function (a, e, d) {
        var b = org.imatheq.formulaeditor.presentation;
        new b.Symbol("(1").getFontSizeData(a, e, d, !0);
        new b.Symbol("~1").getFontSizeData(a, e, d, !0);
      },
      draw: function (a, e, d, b, f) {
        var h = this.value;
        null !== this.onscreen && (h = this.onscreen);
        return (this.dimensions = a.drawVerticalBracket(
          h,
          Math.round(d),
          Math.round(b),
          this.minimumWidth,
          this.fullWidth,
          f,
          this.mathcolor,
          e.fontSizeModifier,
          this.accent
        ));
      },
      getMathML: function () {
        return (
          "<mo" +
          (this.in_attrbs ? this.in_attrbs : "") +
          this.getStyleString() +
          ">" +
          b.getEncodedStr(this) +
          "</mo>"
        );
      },
    }
  );
})();
$package("org.imatheq.formulaeditor.parsing.expression");
(function () {
  org.imatheq.formulaeditor.parsing.expression.KeywordList = {};
})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.OperatorList = {};
})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.BracketList =
    "()[]{}||\u27e8\u27e9\u2308\u2309\u230a\u230b\u2225\u2225";
  org.imatheq.formulaeditor.parsing.expression.VertBracketList =
    "_\u23de\u23df\u2322\u2323\u02d8^\u02c7\u2212\u00af\u033f~\u21c0\u21bc\u02d9\u00a8\u2026`\u00b4\u2192\u2190\u2194\u21d2\u21d0\u21d4\u03a3\u220f\u2210\u22c3\u22c2\u22c1\u22c0\u222b\u222d\u222c\u222e\u222f\u2230";
  org.imatheq.formulaeditor.parsing.expression.MidVertBracketList =
    "\u21c0\u21bc\u02d9\u00a8\u2026\u2192\u2190\u2194\u21d2\u21d0\u21d4";
  org.imatheq.formulaeditor.parsing.expression.LargeopList =
    "\u2211\u220f\u2210\u22c3\u22c2\u22c1\u22c0\u222b\u222d\u222c\u222e\u222f\u2230";
  org.imatheq.formulaeditor.parsing.expression.DoubleStruckList = {
    A: "\ud835\udd38",
    B: "\ud835\udd39",
    C: "\u2102",
    D: "\ud835\udd3b",
    E: "\ud835\udd3c",
    F: "\ud835\udd3d",
    G: "\ud835\udd3e",
    H: "\u210d",
    I: "\ud835\udd40",
    J: "\ud835\udd41",
    K: "\ud835\udd42",
    L: "\ud835\udd43",
    M: "\ud835\udd44",
    N: "\u2115",
    O: "\ud835\udd46",
    P: "\u2119",
    Q: "\u211a",
    R: "\u211d",
    S: "\ud835\udd4a",
    T: "\ud835\udd4b",
    U: "\ud835\udd4c",
    V: "\ud835\udd4d",
    W: "\ud835\udd4e",
    X: "\ud835\udd4f",
    Y: "\ud835\udd50",
    Z: "\u2124",
  };
  org.imatheq.formulaeditor.parsing.expression.ScriptList = {
    A: "\ud835\udc9c",
    B: "\u212c",
    C: "\ud835\udc9e",
    D: "\ud835\udc9f",
    E: "\u2130",
    F: "\u2131",
    G: "\ud835\udca2",
    H: "\u210b",
    I: "\u2110",
    J: "\ud835\udca5",
    K: "\ud835\udca6",
    L: "\u2112",
    M: "\u2133",
    N: "\ud835\udca9",
    O: "\ud835\udcaa",
    P: "\ud835\udcab",
    Q: "\ud835\udcac",
    R: "\u211b",
    S: "\ud835\udcae",
    T: "\ud835\udcaf",
    U: "\ud835\udcb0",
    V: "\ud835\udcb1",
    W: "\ud835\udcb2",
    X: "\ud835\udcb3",
    Y: "\ud835\udcb4",
    Z: "\ud835\udcb5",
    a: "\ud835\udcb6",
    b: "\ud835\udcb7",
    c: "\ud835\udcb8",
    d: "\ud835\udcb9",
    e: "\u212f",
    f: "\ud835\udcbb",
    g: "\u210a",
    h: "\ud835\udcbd",
    i: "\ud835\udcbe",
    j: "\ud835\udcbf",
    k: "\ud835\udcc0",
    l: "\ud835\udcc1",
    m: "\ud835\udcc2",
    n: "\ud835\udcc3",
    o: "\u2134",
    p: "\ud835\udcc5",
    q: "\ud835\udcc6",
    r: "\ud835\udcc7",
    s: "\ud835\udcc8",
    t: "\ud835\udcc9",
    u: "\ud835\udcca",
    v: "\ud835\udccb",
    w: "\ud835\udccc",
    x: "\ud835\udccd",
    y: "\ud835\udcce",
    z: "\ud835\udccf",
  };
  org.imatheq.formulaeditor.parsing.expression.ScriptBoldList = {
    A: "\ud835\udcd0",
    B: "\ud835\udcd1",
    C: "\ud835\udcd2",
    D: "\ud835\udcd3",
    E: "\ud835\udcd4",
    F: "\ud835\udcd5",
    G: "\ud835\udcd6",
    H: "\ud835\udcd7",
    I: "\ud835\udcd8",
    J: "\ud835\udcd9",
    K: "\ud835\udcda",
    L: "\ud835\udcdb",
    M: "\ud835\udcdc",
    N: "\ud835\udcdd",
    O: "\ud835\udcde",
    P: "\ud835\udcdf",
    Q: "\ud835\udce0",
    R: "\ud835\udce1",
    S: "\ud835\udce2",
    T: "\ud835\udce3",
    U: "\ud835\udce4",
    V: "\ud835\udce5",
    W: "\ud835\udce6",
    X: "\ud835\udce7",
    Y: "\ud835\udce8",
    Z: "\ud835\udce9",
    a: "\ud835\udcea",
    b: "\ud835\udceb",
    c: "\ud835\udcec",
    d: "\ud835\udced",
    e: "\ud835\udcee",
    f: "\ud835\udcef",
    g: "\ud835\udcf0",
    h: "\ud835\udcf1",
    i: "\ud835\udcf2",
    j: "\ud835\udcf3",
    k: "\ud835\udcf4",
    l: "\ud835\udcf5",
    m: "\ud835\udcf6",
    n: "\ud835\udcf7",
    o: "\ud835\udcf8",
    p: "\ud835\udcf9",
    q: "\ud835\udcfa",
    r: "\ud835\udcfb",
    s: "\ud835\udcfc",
    t: "\ud835\udcfd",
    u: "\ud835\udcfe",
    v: "\ud835\udcff",
    w: "\ud835\udd00",
    x: "\ud835\udd01",
    y: "\ud835\udd02",
    z: "\ud835\udd03",
  };
  org.imatheq.formulaeditor.parsing.expression.FrakturList = {
    A: "\ud835\udd04",
    B: "\ud835\udd05",
    C: "\u212d",
    D: "\ud835\udd07",
    E: "\ud835\udd08",
    F: "\ud835\udd09",
    G: "\ud835\udd0a",
    H: "\u210c",
    I: "\u2111",
    J: "\ud835\udd0d",
    K: "\ud835\udd0e",
    L: "\ud835\udd0f",
    M: "\ud835\udd10",
    N: "\ud835\udd11",
    O: "\ud835\udd12",
    P: "\ud835\udd13",
    Q: "\ud835\udd14",
    R: "\u211c",
    S: "\ud835\udd16",
    T: "\ud835\udd17",
    U: "\ud835\udd18",
    V: "\ud835\udd19",
    W: "\ud835\udd1a",
    X: "\ud835\udd1b",
    Y: "\ud835\udd1c",
    Z: "\u2128",
    a: "\ud835\udd1e",
    b: "\ud835\udd1f",
    c: "\ud835\udd20",
    d: "\ud835\udd21",
    e: "\ud835\udd22",
    f: "\ud835\udd23",
    g: "\ud835\udd24",
    h: "\ud835\udd25",
    i: "\ud835\udd26",
    j: "\ud835\udd27",
    k: "\ud835\udd28",
    l: "\ud835\udd29",
    m: "\ud835\udd2a",
    n: "\ud835\udd2b",
    o: "\ud835\udd2c",
    p: "\ud835\udd2d",
    q: "\ud835\udd2e",
    r: "\ud835\udd2f",
    s: "\ud835\udd30",
    t: "\ud835\udd31",
    u: "\ud835\udd32",
    v: "\ud835\udd33",
    w: "\ud835\udd34",
    x: "\ud835\udd35",
    y: "\ud835\udd36",
    z: "\ud835\udd37",
  };
  org.imatheq.formulaeditor.parsing.expression.FrakturBoldList = {
    A: "\ud835\udd6c",
    B: "\ud835\udd6d",
    C: "\ud835\udd6e",
    D: "\ud835\udd6f",
    E: "\ud835\udd70",
    F: "\ud835\udd71",
    G: "\ud835\udd72",
    H: "\ud835\udd73",
    I: "\ud835\udd74",
    J: "\ud835\udd75",
    K: "\ud835\udd76",
    L: "\ud835\udd77",
    M: "\ud835\udd78",
    N: "\ud835\udd79",
    O: "\ud835\udd7a",
    P: "\ud835\udd7b",
    Q: "\ud835\udd7c",
    R: "\ud835\udd7d",
    S: "\ud835\udd7e",
    T: "\ud835\udd7f",
    U: "\ud835\udd80",
    V: "\ud835\udd81",
    W: "\ud835\udd82",
    X: "\ud835\udd83",
    Y: "\ud835\udd84",
    Z: "\ud835\udd85",
    a: "\ud835\udd86",
    b: "\ud835\udd87",
    c: "\ud835\udd88",
    d: "\ud835\udd89",
    e: "\ud835\udd8a",
    f: "\ud835\udd8b",
    g: "\ud835\udd8c",
    h: "\ud835\udd8d",
    i: "\ud835\udd8e",
    j: "\ud835\udd8f",
    k: "\ud835\udd90",
    l: "\ud835\udd91",
    m: "\ud835\udd92",
    n: "\ud835\udd93",
    o: "\ud835\udd94",
    p: "\ud835\udd95",
    q: "\ud835\udd96",
    r: "\ud835\udd97",
    s: "\ud835\udd98",
    t: "\ud835\udd99",
    u: "\ud835\udd9a",
    v: "\ud835\udd9b",
    w: "\ud835\udd9c",
    x: "\ud835\udd9d",
    y: "\ud835\udd9e",
    z: "\ud835\udd9f",
  };
  org.imatheq.formulaeditor.parsing.expression.RevList = {};
  com.efmase.js.utilities.toolset.swap();
})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.NonItalicMiList =
    "\u221e\u2102\u2145\u210d\u212a\u2115\u2119\u211a\u211d\u2124\u2135\u2205";
})();
$package("org.imatheq.parsing");
$package("org.imatheq.formulaeditor.options");
(function () {
  org.imatheq.formulaeditor.Options = $extend(Object, {
    defaultOptions: {
      debug: !1,
      continuingNavigation: !0,
      decimalMark: ".",
      featureUndo: !0,
      modeArith1Divide: "restricted",
      optionVerboseStyle: "false",
      optionArith1UnaryMinusBrackets: "false",
      optionInterval1Brackets: { lo: "(", lc: "[", ro: ")", rc: "]" },
      optionResizeBrackets: !0,
      styleArith1Divide: "mfrac",
      styleArith1Times: "cross",
      styleTransc1Log: "function",
      symbolArith1Times: "\u00b7",
      defaultFontNameIdx: 0,
      defaultFontSizeIdx: 6,
      defaultFont4NewSymbol: "Times New Roman",
      defAutoItalic: !0,
      defSymmetric: !0,
      stretchMOBrackets: !0,
      hideFontTools: !1,
    },
    getOption: function (b) {
      return void 0 !== org.imatheq.formulaeditor.options[b]
        ? org.imatheq.formulaeditor.options[b]
        : void 0 !== this.defaultOptions[b]
        ? this.defaultOptions[b]
        : null;
    },
    getArith1DivideMode: function () {
      var b = this.getOption("modeArith1Divide");
      return "normal" == b || "restricted" == b || "inline" == b
        ? b
        : "restricted";
    },
    getArith1PowerOptionInversePrefix: function () {
      return "true" == this.getOption("optionArith1PowerInversePrefix")
        ? "true"
        : "false";
    },
    getArith1PowerOptionPrefix: function () {
      return "true" == this.getOption("optionArith1PowerPrefix")
        ? "true"
        : "false";
    },
    getArith1TimesStyle: function () {
      var b = this.getOption("styleArith1Times");
      return "dot" == b || "cross" == b || "star" == b
        ? b
        : this.defaultOptions.styleArith1Times;
    },
    getArith1TimesSymbol: function () {
      var b = this.getOption("styleArith1Times");
      return "dot" == b
        ? "\u00b7"
        : "cross" == b
        ? "\u00d7"
        : "star" == b
        ? "*"
        : this.defaultOptions.symbolArith1Times;
    },
    getArith1UnaryMinusOptionBrackets: function () {
      return "true" == this.getOption("optionArith1UnaryMinusBrackets")
        ? "true"
        : "false";
    },
    getDecimalMark: function () {
      var b = this.getOption("decimalMark");
      return "." === b || "," === b ? b : this.defaultOptions.decimalMark;
    },
    getContinuingNavigation: function () {
      var b = this.getOption("continuingNavigation");
      return 1 == b || 0 == b ? b : this.defaultOptions.optionResizeBrackets;
    },
    getInterval1BracketsOption: function () {
      var b = this.getOption("continuingNavigation");
      return "object" === typeof b &&
        "string" === typeof b.lo &&
        "string" === typeof b.lc &&
        "string" === typeof b.ro &&
        "string" === typeof b.rc
        ? b
        : this.defaultOptions.optionInterval1Brackets;
    },
    getListSeparator: function () {
      var b = this.getDecimalMark();
      if ("." === b) return ",";
      if ("," === b) return ";";
      alert("Options: unable to get listseparator.");
      return null;
    },
    getListSeparatorFixed: function () {
      var b = this.getOption("optionListSeparatorFixed"),
        a = this.getListSeparator();
      return null !== b ? b : a;
    },
    getResizeBracketsOption: function () {
      var b = this.getOption("optionResizeBrackets");
      return 1 == b || 0 == b ? b : this.defaultOptions.optionResizeBrackets;
    },
    getTransc1LogStyle: function () {
      var b = this.getOption("styleTransc1Log");
      return "prefix" == b || "postfix" == b || "function" == b
        ? b
        : this.defaultOptions.styleTransc1Log;
    },
    getVerboseStyleOption: function () {
      var b = this.getOption("optionVerboseStyle");
      return "true" == b || "false" == b
        ? b
        : this.defaultOptions.optionVerboseStyle;
    },
    getExpressionParsingContext: function () {
      return {
        decimalMark: this.getDecimalMark(),
        continuingNavigation: this.getContinuingNavigation(),
        listSeparator: this.getListSeparator(),
        optionArith1DivideMode: this.getArith1DivideMode(),
        optionArith1PowerInversePrefix:
          this.getArith1PowerOptionInversePrefix(),
        optionArith1PowerPrefix: this.getArith1PowerOptionPrefix(),
        optionArith1UnaryMinusBrackets:
          this.getArith1UnaryMinusOptionBrackets(),
        styleTransc1Log: this.getTransc1LogStyle(),
        symbolArith1Times: this.getArith1TimesSymbol(),
      };
    },
    getPresentationContext: function () {
      return {
        decimalMark: this.getDecimalMark(),
        continuingNavigation: this.getContinuingNavigation(),
        listSeparator: this.getListSeparator(),
        listSeparatorFixed: this.getListSeparatorFixed(),
        modeArith1Divide: this.getArith1DivideMode(),
        optionArith1UnaryMinusBrackets:
          this.getArith1UnaryMinusOptionBrackets(),
        optionInterval1Brackets: this.getInterval1BracketsOption(),
        optionResizeBrackets: this.getResizeBracketsOption(),
        styleTransc1Log: this.getTransc1LogStyle(),
        symbolArith1Times: this.getArith1TimesSymbol(),
      };
    },
  });
})();
(function () {
  var b = org.imatheq.parsing.Parser,
    a = [],
    e = null;
  org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser =
    $extend(Object, {
      getParser: function (d) {
        var e;
        if (null === d || void 0 === d) d = this.getContext();
        if (void 0 === d.parser) {
          var f = b;
          for (e = 0; e < a.length; e++) f = $extend(f, a[e](d));
          d.parser = f;
        }
        return d.parser;
      },
    });
  org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser.addFunction =
    function (d) {
      a.push(d);
    };
  org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser.clearCache =
    function () {
      e = null;
    };
  org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser.getContext =
    function () {
      null === e &&
        (e =
          new org.imatheq.formulaeditor.Options().getExpressionParsingContext());
      return e;
    };
})();
$package("org.imatheq.formulaeditor.parsing.xml");
(function () {
  org.imatheq.formulaeditor.parsing.xml.XMLParser = $extend(Object, {
    name: "XMLParser",
    xmldoc: null,
    parse: function (b, a) {
      var e,
        d = [],
        g,
        f;
      for (e = 0; e < b.childNodes.length; e++) {
        g = b.childNodes.item(e);
        f = g.getAttribute("id");
        var h = this.handle(g);
        d[f] = {
          id: f,
          w: g.getAttribute("w"),
          h: g.getAttribute("h"),
          l: g.getAttribute("l"),
          t: g.getAttribute("t"),
          b: g.getAttribute("b"),
          entry: h,
        };
      }
      return d;
    },
    loadXml: function (b) {
      var a,
        e = b.match(/\s*<[^(>|\s)]*\s*/);
      if (null === e) throw Error("Invalid XML string: " + b);
      if (window.DOMParser) {
        parser = new DOMParser();
        try {
          a = parser.parseFromString(b, "text/xml");
        } catch (d) {
          throw Error("XML parsing error.");
        }
      } else
        (a = new ActiveXObject("Microsoft.XMLDOM")),
          (a.async = !1),
          a.loadXML(b);
      b = null;
      if (a.parseError && 0 != a.parseError.errorCode)
        throw (
          ((b =
            "XML Parsing Error: " +
            a.parseError.reason +
            " at line " +
            a.parseError.line +
            " at position " +
            a.parseError.linepos),
          Error(b))
        );
      if (
        a.documentElement.localName != e[0].trim().slice(1) &&
        "math/" != e[0].trim().slice(1)
      )
        throw Error(
          "Error parsing XML: wrong root node" +
            a.documentElement.localName +
            ", instead of " +
            e[0].slice(1) +
            " returned"
        );
      return a;
    },
    parseString: function (b, a, e) {
      var d = org.imatheq.formulaeditor.presentation;
      if ("string" != typeof b)
        throw Error("Error in parseString(): input not string");
      b = b.replace(/&nbsp;/g, "&#xa0;");
      this.xmldoc = b = this.loadXml(b);
      b = b.documentElement;
      if ("math" != b.localName.toLowerCase()) {
        var g = this.loadXml(
          '<math xmlns="http://www.w3.org/1998/Math/MathML"/>'
        );
        this.xmldoc = g;
        g.documentElement.appendChild(b);
        b = g.documentElement;
      }
      if (null !== b) this.removeComments(b), this.removeWhitespace(b);
      else return null;
      if (
        1 == b.childNodes.length &&
        "mrow" == b.childNodes.item(0).localName.toLowerCase()
      ) {
        var f = b.childNodes.item(0);
        for (b.removeChild(f); 0 < f.childNodes.length; )
          (g = f.childNodes.item(0)), b.appendChild(g);
      }
      if (null !== e && void 0 !== e && e)
        for (e = b.childNodes.length - 1; 0 <= e; e--)
          (g = b.childNodes.item(e)),
            ("mo" != g.localName.toLowerCase() &&
              "mspace" != g.localName.toLowerCase()) ||
              null === g.getAttribute("linebreak") ||
              "newline" != g.getAttribute("linebreak").toLowerCase() ||
              b.removeChild(g);
      e = null;
      return (e =
        0 == b.childNodes.length
          ? new d.Row(new d.BlockSymbol())
          : this.handle(b, a));
    },
    handle: function (b, a) {
      if (null === b.localName) return null;
      var e = "handle" + b.localName.replace("-", "");
      if (e in this) {
        var d = b.parentNode,
          g = b.getAttribute("mathvariant"),
          f = b.getAttribute("mathcolor"),
          h = b.getAttribute("symmetric");
        "math" != b.localName.toLowerCase() &&
          null !== d &&
          void 0 !== d &&
          (null === g &&
            null !== d.getAttribute("mathvariant") &&
            ((g = d.getAttribute("mathvariant")),
            b.setAttribute("mathvariant", g)),
          null === f &&
            null !== d.getAttribute("mathcolor") &&
            ((f = d.getAttribute("mathcolor")), b.setAttribute("mathcolor", f)),
          null === h &&
            null !== d.getAttribute("symmetric") &&
            ((h = d.getAttribute("symmetric")),
            b.setAttribute("symmetric", h)));
        d = null;
        d = null !== a && void 0 !== a ? this[e](b, a) : this[e](b);
        "mi" != b.localName &&
          "mn" != b.localName &&
          "mo" != b.localName &&
          "ms" != b.localName &&
          "mtext" != b.localName &&
          (null !== g &&
            ("normal" == g.toLowerCase()
              ? ((d.bold = !1), (d.forcedItalic = !1), (d.autoItalic = !1))
              : "bold" == g.toLowerCase()
              ? ((d.bold = !0), (d.forcedItalic = !1), (d.autoItalic = !1))
              : "italic" == g.toLowerCase()
              ? ((d.bold = !1), (d.forcedItalic = !0), (d.autoItalic = !1))
              : "bold-italic" == g.toLowerCase() &&
                ((d.bold = !0), (d.forcedItalic = !0), (d.autoItalic = !1))),
          null !== f && (d.mathcolor = f));
        return d;
      }
      throw Error(
        this.name + " doesn't know how to handle this node: " + b + ". INFO: 1."
      );
    },
    removeComments: function (b) {
      for (var a = b.childNodes, e = a.length - 1; 0 <= e; e--) {
        var d = a.item(e);
        d &&
          (8 == d.nodeType
            ? b.removeChild(d)
            : d.hasChildNodes() && this.removeComments(d));
      }
    },
    removeWhitespace: function (b) {
      for (var a = b.childNodes, e = a.length - 1; 0 <= e; e--) {
        var d = a.item(e);
        if (d && "mtext" != d.parentNode.localName.toLowerCase())
          if (3 == d.nodeType) {
            var g = d.nodeValue.trim();
            "" === g &&
            "mo" == d.parentNode.localName.toLowerCase() &&
            1 == d.parentNode.childNodes.length
              ? -1 != d.nodeValue.indexOf("\u00a0")
                ? (d.nodeValue = "\u00a0")
                : -1 != d.nodeValue.charAt(" ") && (d.nodeValue = " ")
              : "" === g && b.removeChild(d);
          } else d.hasChildNodes() && this.removeWhitespace(d);
      }
    },
    getMOPP: function (b, a) {
      var e = org.imatheq.formulaeditor.parsing.expression.MOList[b],
        d = org.imatheq.formulaeditor.presentation.SymbolOnscreens,
        d =
          null !== d[b] && void 0 !== d[b]
            ? org.imatheq.formulaeditor.parsing.expression.MOList[d[b]]
            : null,
        g = { fence: !1, stretchy: !1 };
      void 0 !== e && void 0 !== e[a] && null !== e[a]
        ? (-1 != e[a].pp.indexOf("fence") && (g.fence = !0),
          -1 != e[a].pp.indexOf("stretchy") && (g.stretchy = !0))
        : d &&
          void 0 !== d[a] &&
          null !== d[a] &&
          (-1 != d[a].pp.indexOf("fence") && (g.fence = !0),
          -1 != d[a].pp.indexOf("stretchy") && (g.stretchy = !0));
      return g;
    },
    isStretchy: function (b, a) {
      if (null !== a.getAttribute("stretchy")) {
        var e =
          "false" == a.getAttribute("stretchy").toLowerCase()
            ? !1
            : "true" == a.getAttribute("stretchy").toLowerCase()
            ? !0
            : null;
        if (null !== e) return e;
      }
      return b.stretchy;
    },
    areBracketsPaired: function (b, a) {
      var e = org.imatheq.formulaeditor.presentation.SymbolOnscreens,
        d = org.imatheq.formulaeditor.parsing.expression.BracketList,
        g = null === e[b] ? "A" : e[b],
        e = null === e[a] ? "A" : e[a],
        g =
          -1 != d.indexOf(b)
            ? d.indexOf(b)
            : -1 != d.indexOf(g)
            ? d.indexOf(g)
            : -1,
        d =
          -1 != d.lastIndexOf(a)
            ? d.lastIndexOf(a)
            : -1 != d.lastIndexOf(e)
            ? d.lastIndexOf(e)
            : -1;
      return g == d - 1 && 0 == g % 2 ? !0 : !1;
    },
    copyMOAttributes: function (b, a, e) {
      if (null !== a)
        for (var d = 0; d < a.attributes.length; d++) {
          var g = a.attributes[d];
          b.setAttribute(e + "_" + g.name, g.value);
        }
    },
    MOsToMfenced: function (b, a, e, d, g, f, h, k) {
      var l = b.childNodes,
        m = this.xmldoc.createElement("mfenced");
      m.setAttribute("isMO", "true");
      null !== k && m.setAttribute("symmetric", k);
      var r = a + 1;
      d
        ? ((k = l[a]),
          m.setAttribute("open", k.firstChild.nodeValue.trim()),
          m.setAttribute("o_stretchy", f),
          this.copyMOAttributes(m, k, "open"))
        : ((k = null),
          r--,
          m.setAttribute("open", ""),
          m.setAttribute("o_stretchy", "false"));
      g
        ? ((f = l[e]),
          m.setAttribute("close", f.firstChild.nodeValue.trim()),
          m.setAttribute("c_stretchy", h),
          this.copyMOAttributes(m, f, "close"))
        : ((f = null),
          m.setAttribute("close", ""),
          m.setAttribute("c_stretchy", "false"));
      e = (g ? e : e + 1) - r;
      d = d ? k : f;
      for (g = 0; g < e; g++) m.appendChild(l[r]);
      b.insertBefore(m, d);
      null !== k && b.removeChild(k);
      null !== f && b.removeChild(f);
      return a;
    },
    ConvertMOsToMfenced: function (b, a, e) {
      for (var d = b.childNodes; a < d.length; a++) {
        var g = d.item(a);
        if (
          g &&
          "mo" == g.localName.toLowerCase() &&
          1 == g.childNodes.length &&
          3 == g.childNodes.item(0).nodeType
        ) {
          var f = g.firstChild.nodeValue.trim(),
            h = this.getMOPP(f, 0),
            k = this.getMOPP(f, 2),
            f = this.isStretchy(h, g),
            l = this.isStretchy(k, g),
            g = g.getAttribute("symmetric");
          if (
            (1 == e && h.fence && !k.fence && f) ||
            (2 == e && h.fence && k.fence)
          ) {
            h = this.Convert1PairMOs(b, a, e);
            if (2 == e && h >= d.length && 0 < a && f) {
              this.MOsToMfenced(b, 0, a, !1, !0, null, f, g);
              break;
            }
            a = h;
          } else
            1 == e &&
              0 != a &&
              !h.fence &&
              k.fence &&
              l &&
              (this.MOsToMfenced(b, 0, a, !1, !0, null, l, g), (a = 0));
        } else g.firstElementChild && this.ConvertMOsToMfenced(g, 0, e);
      }
    },
    Convert1PairMOs: function (b, a, e) {
      var d = b.childNodes,
        g = null,
        f = d.item(a),
        g = f.firstChild.nodeValue.trim(),
        h = this.getMOPP(g, 0),
        k = this.getMOPP(g, 2),
        l = this.isStretchy(h, f);
      this.isStretchy(k, f);
      for (var f = f.getAttribute("symmetric"), m = a + 1; m < d.length; m++) {
        var r = d.item(m);
        if (
          r &&
          "mo" == r.localName.toLowerCase() &&
          1 == r.childNodes.length &&
          3 == r.childNodes.item(0).nodeType
        ) {
          var n = r.firstChild.nodeValue.trim(),
            p = this.getMOPP(n, 2),
            t = this.getMOPP(n, 0),
            q = this.isStretchy(t, r),
            u = this.isStretchy(p, r);
          r.getAttribute("symmetric");
          if (
            (1 == e && h.fence && !k.fence && !t.fence && p.fence) ||
            (2 == e &&
              h.fence &&
              k.fence &&
              t.fence &&
              p.fence &&
              this.areBracketsPaired(g, n))
          )
            return (
              (g = m),
              l && u && 1 < g - a
                ? (this.MOsToMfenced(b, a, g, !0, !0, l, u, f),
                  2 == e ? a - 1 : a)
                : m
            );
          if (1 == e && !p.fence && t.fence && q) {
            u = this.Convert1PairMOs(b, m, e);
            if (2 == e && u >= d.length && 1 < m - a)
              return this.MOsToMfenced(b, a + 1, m, !1, !0, l, null, f), a + 1;
            m = u;
          }
        } else r.firstElementChild && this.ConvertMOsToMfenced(r, 0, e);
      }
      return m >= d.length &&
        l &&
        1 == e &&
        h.fence &&
        !k.fence &&
        a < d.length - 1
        ? this.MOsToMfenced(b, a, d.length - 1, !0, !1, l, null, f)
        : m;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.parsing.openmath.VariableList = {};
})();
(function () {
  org.imatheq.formulaeditor.presentation.Fraction = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      lineWidth: null,
      draw: function (b, a, e, d, g) {
        d = b.getXDimentions(a, e, d);
        d = d.top + Math.round(0.4 * d.height);
        e = Math.round(e);
        var f = this.children[0],
          h = this.children[1],
          k = null === this.lineWidth ? 1 : this.lineWidth,
          l = f.draw(b, a, 0, 0, !0),
          m = h.draw(b, a, 0, 0, !0),
          r = e + Math.min(l.left, m.left),
          n = d - l.height - 4,
          p = Math.max(l.width, m.width) + 8 + 4 * k;
        this.dimensions = {
          left: r,
          top: n,
          width: p,
          height: l.height + m.height + 8 + k,
        };
        g ||
          (f.draw(b, a, e + Math.round((p - l.width) / 2), n - l.top, g),
          0 != k &&
            ((f = b.getContext()),
            f.save(),
            (f.strokeStyle = this.mathcolor),
            (f.lineWidth = k),
            f.beginPath(),
            f.moveTo(e + 2 * k, d),
            f.lineTo(e + p - 2 * k, d),
            f.stroke(),
            f.closePath(),
            f.restore()),
          h.draw(
            b,
            a,
            e + Math.round((p - m.width) / 2),
            d + 4 - m.top + 1,
            g
          ));
        return this.dimensions;
      },
      getCursorPosition: function (b, a, e) {
        var d = this.children[0].dimensions,
          g = this.children[1].dimensions;
        return a > this.dimensions.left &&
          a < this.dimensions.left + this.dimensions.width - 1
          ? e < (d.top + d.height + g.top) / 2
            ? this.children[0].getCursorPosition(b, a, e)
            : this.children[1].getCursorPosition(b, a, e)
          : a <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getFollowingCursorPosition: function (b, a, e) {
        return null === a || void 0 === a
          ? this.children[0].getFollowingCursorPosition(b, null, e)
          : 0 == a && !0 === b.continuingNavigation
          ? this.children[1].getFollowingCursorPosition(b, null, e)
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : null;
      },
      getPrecedingCursorPosition: function (b, a, e) {
        if (!0 === b.continuingNavigation) {
          if (null === a || void 0 === a)
            return this.children[1].getPrecedingCursorPosition(b, null, e);
          if (1 == a)
            return this.children[0].getPrecedingCursorPosition(b, null, e);
        }
        return null === a || void 0 === a
          ? this.children[0].getPrecedingCursorPosition(b, null, e)
          : null !== this.parent
          ? { row: this.parent, index: this.index }
          : null;
      },
      getLowerCursorPosition: function (b, a, e, d) {
        return null === a || void 0 === a
          ? this.children[0].getLowerCursorPosition(b, null, e, d)
          : 0 === a
          ? this.children[1].getLowerCursorPosition(b, null, e, d)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(b, this.index, e, d)
          : null;
      },
      getHigherCursorPosition: function (b, a, e, d) {
        return null === a || void 0 === a
          ? this.children[1].getHigherCursorPosition(b, null, e, d)
          : 1 == a
          ? this.children[0].getHigherCursorPosition(b, null, e, d)
          : null !== this.parent
          ? this.parent.getHigherCursorPosition(b, this.index, e, d)
          : null;
      },
      getMathML: function () {
        return (
          "<mfrac" +
          (this.in_attrbs ? this.in_attrbs : "") +
          (null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"') +
          (null === this.lineWidth
            ? ""
            : ' linethickness="' + this.lineWidth + '"') +
          ">" +
          this.children[0].getMathML(!0) +
          this.children[1].getMathML(!0) +
          "</mfrac>"
        );
      },
      getAltText: function () {
        var b = org.imatheq.formulaeditor.FormulaEditor.getEditor(),
          a = b.altstrs.fraction[
            (this.children[0].children &&
              1 < this.children[0].children.length) ||
            (this.children[1].children && 1 < this.children[1].children.length)
              ? 1
              : 0
          ]
            .replace("$0$", this.children[0].getAltText().trim())
            .replace("$1$", this.children[1].getAltText().trim()),
          e = a.trim();
        null !== b.altstrs[e] && void 0 !== b.altstrs[e] && (a = b.altstrs[e]);
        return a;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.VerticalBracketed = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      mtype: "mover",
      accent: "",
      accentunder: "",
      middle: null,
      upperBracket: null,
      lowerBracket: null,
      slowDelete: !0,
      margin: 2,
      initialize: function () {
        0 < arguments.length
          ? ((this.mtype = arguments[0]),
            (this.upperBracket = arguments[1]),
            (this.middle = arguments[2]),
            (this.lowerBracket = arguments[3]),
            4 < arguments.length && (this.mathcolor = arguments[4]),
            (this.children = []),
            this.children.push(this.middle))
          : (this.children = []);
        for (
          var b = new org.imatheq.formulaeditor.presentation.Row(),
            a = this.functionsFromRow.length - 1;
          0 <= a;
          a--
        )
          this[this.functionsFromRow[a]] ||
            (this[this.functionsFromRow[a]] = b[this.functionsFromRow[a]]);
        this.updateChildren();
      },
      getFontSizeData: function (b, a, e) {
        var d = org.imatheq.formulaeditor.presentation;
        if ("" != this.upperBracket.value) {
          var g = this.upperBracket.onscreen
            ? this.upperBracket.onscreen
            : this.upperBracket.value;
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[g] &&
            new d.Symbol(g).getFontSizeData(b, a, e, !0);
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[g + "1"]
            ? new d.Symbol(g + "1").getFontSizeData(b, a, e, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[g + "m"] &&
              new d.Symbol(g + "m").getFontSizeData(b, a, e, !0);
        }
        "" != this.lowerBracket.value &&
          ((g = this.lowerBracket.onscreen
            ? this.lowerBracket.onscreen
            : this.lowerBracket.value),
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[g] &&
            new d.Symbol(g).getFontSizeData(b, a, e, !0),
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[g + "1"]
            ? new d.Symbol(g + "1").getFontSizeData(b, a, e, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[g + "m"] &&
              new d.Symbol(g + "m").getFontSizeData(b, a, e, !0));
        this.getFontSizeData.parent.getFontSizeData.call(this, b, a, e);
      },
      draw: function (b, a, e, d, g) {
        6 > b.getFontSizeIdx(a.fontSizeModifier) && (this.margin = 1);
        this.middle.draw(b, a, 0, 0, !0);
        this.upperBracket.minimumWidth =
          this.middle.dimensions.width -
          Math.min(
            this.middle.children[0].dimensions.width,
            this.middle.children[this.middle.children.length - 1].dimensions
              .width
          );
        1 == this.middle.children.length &&
          (this.upperBracket.minimumWidth = this.middle.dimensions.width);
        this.lowerBracket.minimumWidth = this.upperBracket.minimumWidth;
        this.upperBracket.fullWidth = this.middle.dimensions.width;
        this.lowerBracket.fullWidth = this.middle.dimensions.width;
        "" == this.upperBracket.value
          ? (this.upperBracket.dimensions = {
              top: this.middle.dimensions.top,
              left: this.middle.dimensions.left,
              width: this.middle.dimensions.width,
              height: 0,
            })
          : this.upperBracket.draw(b, a, 0, 0, !0);
        "" == this.lowerBracket.value
          ? (this.lowerBracket.dimensions = {
              top: this.middle.dimensions.top + this.middle.dimensions.height,
              left: this.middle.dimensions.left,
              width: this.middle.dimensions.width,
              height: 0,
            })
          : this.lowerBracket.draw(b, a, 0, 0, !0);
        width = Math.max(
          this.upperBracket.dimensions.width,
          this.middle.dimensions.width,
          this.lowerBracket.dimensions.width
        );
        var f = 0,
          h = 0,
          k = 0;
        width > this.middle.dimensions.width &&
          (f = (width - this.middle.dimensions.width) / 2);
        this.upperBracket.dimensions.width < width &&
          (h = (width - this.upperBracket.dimensions.width) / 2);
        this.lowerBracket.dimensions.width < width &&
          (k = (width - this.lowerBracket.dimensions.width) / 2);
        this.dimensions = {
          width: width,
          height:
            this.upperBracket.dimensions.height +
            this.middle.dimensions.height +
            this.lowerBracket.dimensions.height +
            2 * this.margin,
          left: e,
          top:
            d +
            this.middle.dimensions.top -
            this.upperBracket.dimensions.height -
            this.margin,
        };
        this.upperBracket.fullWidth = this.middle.dimensions.width;
        "" != this.upperBracket.value &&
          this.upperBracket.draw(
            b,
            a,
            e + h,
            this.dimensions.top - this.upperBracket.dimensions.top,
            g
          );
        this.middle.draw(b, a, e + f, d, g);
        this.lowerBracket.fullWidth = this.middle.dimensions.width;
        "" != this.lowerBracket.value &&
          this.lowerBracket.draw(
            b,
            a,
            e + k,
            this.middle.dimensions.top +
              this.middle.dimensions.height -
              this.lowerBracket.dimensions.top +
              this.margin,
            g
          );
        return this.dimensions;
      },
      setSymbFontAttrbs: function (b) {
        "" != this.upperBracket.value && this.upperBracket.setSymbFontAttrbs(b);
        "" != this.lowerBracket.value && this.lowerBracket.setSymbFontAttrbs(b);
        this.setSymbFontAttrbs.parent.setSymbFontAttrbs.call(this, b);
      },
      functionsFromRow: [
        "getFirstCursorPosition",
        "getLastCursorPosition",
        "getLowerCursorPosition",
        "getHigherCursorPosition",
      ],
      getCursorPosition: function (b, a, e) {
        var d;
        d = this.middle.dimensions;
        return a >= d.left && a < d.left + d.width
          ? this.middle.getCursorPosition(b, a, e)
          : a < d.left
          ? null !== this.parent
            ? { row: this.parent, index: 0 == this.index ? 0 : this.index - 1 }
            : this.getPrecedingCursorPosition(b)
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : this.getPrecedingCursorPosition(b);
      },
      getFollowingCursorPosition: function (b, a, e) {
        if (null === e || void 0 === e) e = !0;
        if (null === a || void 0 === a)
          return this.middle.getFollowingCursorPosition(b, null, e);
        if (null !== this.parent)
          return this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getPrecedingCursorPosition: function (b, a, e) {
        if (null === e || void 0 === e) e = !0;
        if (null === a || void 0 === a)
          return this.middle.getPrecedingCursorPosition(b, null, e);
        if (null !== this.parent)
          return this.parent.getPrecedingCursorPosition(b, this.index + 1, !1);
      },
      copy: function () {
        return this.clone(
          this.mtype,
          this.upperBracket.copy(),
          this.children[0].copy(),
          this.lowerBracket.copy()
        );
      },
      getMathML: function () {
        var b = "<" + this.mtype + (this.in_attrbs ? this.in_attrbs : "");
        if ("mover" == this.mtype || "munderover" == this.mtype)
          b =
            "" != this.accent
              ? b + (" accent='" + this.accent + "'")
              : "" != this.upperBracket
              ? b + " accent='true'"
              : b + " accent='false'";
        if ("munder" == this.mtype || "munderover" == this.mtype)
          b =
            "" != this.accentunder
              ? b + (" accentunder='" + this.accentunder + "'")
              : "" != this.lowerBracket
              ? b + " accentunder='true'"
              : b + " accentunder='false'";
        b +=
          null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"';
        b += ">" + this.middle.getMathML(!0);
        "" != this.lowerBracket.value && (b += this.lowerBracket.getMathML());
        "" != this.upperBracket.value && (b += this.upperBracket.getMathML());
        return (b += "</" + this.mtype + ">");
      },
      getAltText: function () {
        var b = org.imatheq.formulaeditor.FormulaEditor.getEditor();
        if ("mover" == this.mtype)
          return b.altstrs.mover
            .replace("$0$", this.middle.getAltText().trim())
            .replace("$1$", b.getSymbolAltText(this.upperBracket.value).trim());
        if ("munder" == this.mtype)
          return b.altstrs.munder
            .replace("$0$", this.middle.getAltText().trim())
            .replace("$1$", b.getSymbolAltText(this.lowerBracket.value).trim());
        if ("munderover" == this.mtype)
          return b.altstrs.munderover
            .replace("$0$", this.middle.getAltText().trim())
            .replace("$1$", b.getSymbolAltText(this.lowerBracket.value).trim())
            .replace("$2$", b.getSymbolAltText(this.upperBracket.value).trim());
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.MiddleBracketed = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      middleBracket: null,
      upper: null,
      lower: null,
      slowDelete: !0,
      margin: 2,
      mtype: "mover",
      accent: "",
      accentunder: "",
      initialize: function () {
        0 < arguments.length
          ? ((this.mtype = arguments[0]),
            (this.middleBracket = arguments[1]),
            (this.children = arguments[2]),
            3 < arguments.length && (this.mathcolor = arguments[3]),
            (this.lower = this.upper = null),
            "mover" == this.mtype
              ? (this.upper = this.children[0])
              : "munder" == this.mtype
              ? (this.lower = this.children[0])
              : ((this.upper = this.children[0]),
                (this.lower = this.children[1])))
          : (this.children = []);
        this.updateChildren();
      },
      isEmbellished: function () {
        return (
          void 0 !==
          org.imatheq.formulaeditor.parsing.expression.MOList[
            this.middleBracket
          ]
        );
      },
      getSymbol: function () {
        return this.middleBracket;
      },
      getFontSizeData: function (b, a, e) {
        var d = org.imatheq.formulaeditor.presentation;
        if ("" != this.middleBracket.value) {
          var g = this.middleBracket.onscreen
            ? this.middleBracket.onscreen
            : this.middleBracket.value;
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[g] &&
            new d.Symbol(g).getFontSizeData(b, a, e, !0);
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[g + "1"]
            ? new d.Symbol(g + "1").getFontSizeData(b, a, e, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[g + "m"]
            ? new d.Symbol(g + "m").getFontSizeData(b, a, e, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[g + "bm"] &&
              new d.Symbol(g + "bm").getFontSizeData(b, a, e, !0);
        }
        var d = { fontSizeModifier: 0 },
          f;
        for (f in a) d[f] = a[f];
        --d.fontSizeModifier;
        null !== this.upper && this.upper.getFontSizeData(b, d, e);
        null !== this.lower && this.lower.getFontSizeData(b, d, e);
        this.getFontSizeData.parent.getFontSizeData.call(this, b, a, e);
      },
      draw: function (b, a, e, d, g, f) {
        var h = f;
        if (void 0 === f || null === f) h = { lspace: 0, rspace: 0 };
        6 > b.getFontSizeIdx(a.fontSizeModifier) && (this.margin = 1);
        f = { fontSizeModifier: 0 };
        for (var k in a) f[k] = a[k];
        --f.fontSizeModifier;
        var l = 0,
          m = (k = 0),
          r = 0;
        null !== this.upper &&
          void 0 !== this.upper &&
          (this.upper.draw(b, f, 0, 0, !0),
          (l = this.upper.dimensions.width),
          (k = this.upper.dimensions.height));
        null !== this.lower &&
          void 0 !== this.lower &&
          (this.lower.draw(b, f, 0, 0, !0),
          (m = this.lower.dimensions.width),
          (r = this.lower.dimensions.height));
        if (null === this.upper || void 0 === this.upper)
          l = this.lower.dimensions.width;
        if (null === this.lower || void 0 === this.lower)
          m = this.upper.dimensions.width;
        this.middleBracket.minimumWidth = Math.max(l, m);
        this.middleBracket.fullWidth = this.middleBracket.minimumWidth;
        this.middleBracket.draw(b, a, 0, 0, !0);
        var n = 0,
          p = 0,
          t = 0;
        if (this.middleBracket.dimensions.topcentre) {
          var t =
              Math.max(
                Math.round(l / 2),
                this.middleBracket.dimensions.topcentre
              ) - this.middleBracket.dimensions.topcentre,
            n =
              Math.max(
                Math.round(l / 2),
                this.middleBracket.dimensions.width -
                  this.middleBracket.dimensions.topcentre
              ) -
              (this.middleBracket.dimensions.width -
                this.middleBracket.dimensions.topcentre),
            q =
              Math.max(
                Math.round(m / 2),
                this.middleBracket.dimensions.bottomcentre
              ) - this.middleBracket.dimensions.bottomcentre,
            p =
              Math.max(
                Math.round(m / 2),
                this.middleBracket.dimensions.width -
                  this.middleBracket.dimensions.bottomcentre
              ) -
              (this.middleBracket.dimensions.width -
                this.middleBracket.dimensions.bottomcentre),
            t = Math.max(t, q),
            n = Math.max(n, p);
          width = t + this.middleBracket.dimensions.width + n;
          n = t + this.middleBracket.dimensions.topcentre - Math.round(l / 2);
          p =
            t + this.middleBracket.dimensions.bottomcentre - Math.round(m / 2);
        } else
          (width = Math.max(l, this.middleBracket.dimensions.width, m)),
            (n = Math.max(0, Math.round((width - l) / 2))),
            (p = Math.max(0, Math.round((width - m) / 2))),
            (t = Math.max(
              0,
              Math.round((width - this.middleBracket.dimensions.width) / 2)
            ));
        d = b.getXDimentions(a, e, d);
        d = d.top + Math.round(0.4 * d.height - 0.5);
        l =
          -Math.round(this.middleBracket.dimensions.height / 2) -
          this.middleBracket.dimensions.top;
        this.dimensions = {
          width: width + h.lspace + h.rspace,
          height:
            k + this.middleBracket.dimensions.height + r + 2 * this.margin,
          left: e,
          top:
            d -
            k -
            Math.round(this.middleBracket.dimensions.height / 2) -
            this.margin,
        };
        g ||
          (null !== this.upper &&
            void 0 !== this.upper &&
            this.upper.draw(
              b,
              f,
              e + n + h.lspace,
              this.dimensions.top - this.upper.dimensions.top,
              g
            ),
          this.middleBracket.draw(b, a, e + t + h.lspace, d + l, g),
          null !== this.lower &&
            void 0 !== this.lower &&
            this.lower.draw(
              b,
              f,
              e + p + h.lspace,
              d +
                Math.round(this.middleBracket.dimensions.height / 2) +
                this.margin -
                this.lower.dimensions.top,
              g
            ));
        return this.dimensions;
      },
      setSymbFontAttrbs: function (b) {
        "" != this.middleBracket.value &&
          this.middleBracket.setSymbFontAttrbs(b);
        this.setSymbFontAttrbs.parent.setSymbFontAttrbs.call(this, b);
      },
      getCursorPosition: function (b, a, e) {
        if (
          a > this.dimensions.left &&
          a < this.dimensions.left + this.dimensions.width - 1
        ) {
          if (2 == this.children.length) {
            var d = this.children[0].dimensions;
            return e < (d.top + d.height + this.children[1].dimensions.top) / 2
              ? this.children[0].getCursorPosition(b, a, e)
              : this.children[1].getCursorPosition(b, a, e);
          }
          return this.children[0].getCursorPosition(b, a, e);
        }
        return a <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? (console.log("error fraction no parent."), null)
            : this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getFollowingCursorPosition: function (b, a, e) {
        return null === a || void 0 === a
          ? this.children[0].getFollowingCursorPosition(b, null, e)
          : 0 == a && 1 < this.children.length && !0 === b.continuingNavigation
          ? this.children[1].getFollowingCursorPosition(b, null, e)
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : null;
      },
      getPrecedingCursorPosition: function (b, a, e) {
        if (!0 === b.continuingNavigation) {
          if (null === a || void 0 === a)
            return 1 == this.children.length
              ? this.children[0].getPrecedingCursorPosition(b, null, e)
              : this.children[1].getPrecedingCursorPosition(b, null, e);
          if (1 == a)
            return this.children[0].getPrecedingCursorPosition(b, null, e);
        }
        return null === a || void 0 === a
          ? this.children[0].getPrecedingCursorPosition(b, null, e)
          : null !== this.parent
          ? { row: this.parent, index: this.index }
          : null;
      },
      getLowerCursorPosition: function (b, a, e, d) {
        return null === a || void 0 === a
          ? this.children[0].getLowerCursorPosition(b, null, e, d)
          : 0 === a && 2 == this.children.length
          ? this.children[1].getLowerCursorPosition(b, null, e, d)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(b, this.index, e, d)
          : null;
      },
      getHigherCursorPosition: function (b, a, e, d) {
        return (null !== a && void 0 !== a) || 2 != this.children.length
          ? 1 == a
            ? this.children[0].getHigherCursorPosition(b, null, e, d)
            : null !== this.parent
            ? this.parent.getHigherCursorPosition(b, this.index, e)
            : null
          : this.children[1].getHigherCursorPosition(b, null, e, d);
      },
      copy: function () {
        return this.clone(
          this.mtype,
          this.middleBracket.copy(),
          this.copyArray(this.children)
        );
      },
      getMathML: function () {
        var b = "<" + this.mtype + (this.in_attrbs ? this.in_attrbs : "");
        if ("mover" == this.mtype || "munderover" == this.mtype)
          b =
            "" != this.accent
              ? b + (" accent='" + this.accent + "'")
              : b + " accent='false'";
        if ("munder" == this.mtype || "munderover" == this.mtype)
          b =
            "" != this.accentunder
              ? b + (" accentunder='" + this.accentunder + "'")
              : b + " accentunder='false'";
        b +=
          null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"';
        b += ">" + this.middleBracket.getMathML();
        b =
          "mover" == this.mtype || "munder" == this.mtype
            ? b + this.children[0].getMathML(!0)
            : b + this.children[1].getMathML(!0);
        "munderover" == this.mtype && (b += this.children[0].getMathML(!0));
        return (b += "</" + this.mtype + ">");
      },
      getAltText: function () {
        var b = org.imatheq.formulaeditor.FormulaEditor.getEditor();
        if ("mover" == this.mtype)
          return b.altstrs.middle_bracket_over
            .replace("$0$", b.getSymbolAltText(this.middleBracket))
            .replace("$1$", this.children[0].getAltText().trim());
        if ("munder" == this.mtype)
          return b.altstrs.middle_bracket_under
            .replace("$0$", b.getSymbolAltText(this.middleBracket))
            .replace("$1$", this.children[0].getAltText().trim());
        if ("munderover" == this.mtype)
          return b.altstrs.middle_bracket_underover
            .replace("$0$", b.getSymbolAltText(this.middleBracket))
            .replace("$1$", this.children[1].getAltText().trim())
            .replace("$2$", this.children[0].getAltText().trim());
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Column = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      margin: 2,
      align: "center",
      fontSizeModifierArray: null,
      baselineIndex: null,
      mtype: "",
      accent: "",
      accentunder: "",
      getFontSizeData: function (b, a, e) {
        for (var d = 0; d < this.children.length; d++) {
          var g;
          if (
            null !== this.fontSizeModifierArray &&
            void 0 !== this.fontSizeModifierArray[d] &&
            null !== this.fontSizeModifierArray[d]
          ) {
            g = { fontSizeModifier: 0 };
            for (var f in a) g[f] = a[f];
            g.fontSizeModifier += this.fontSizeModifierArray[d];
          } else g = a;
          this.children[d].getFontSizeData(b, g, e);
        }
      },
      draw: function (b, a, e, d, g) {
        for (
          var f = this.margin, h = [], k = 0, l = 0, m = [], r = 0;
          r < this.children.length;
          r++
        ) {
          var n, p, t;
          if (
            null !== this.fontSizeModifierArray &&
            void 0 !== this.fontSizeModifierArray[r] &&
            null !== this.fontSizeModifierArray[r]
          ) {
            n = { fontSizeModifier: 0 };
            for (var q in a) n[q] = a[q];
            n.fontSizeModifier += this.fontSizeModifierArray[r];
          } else n = a;
          m.push(n);
          var u = this.children[r].draw(b, m[r], 0, 0, !0),
            k = Math.max(k, u.width);
          n = u.height;
          0 === r
            ? ((t = 0), (p = t + u.top), (l += n))
            : ((p = h[r - 1].top + h[r - 1].height + f),
              (t = p - u.top),
              (l += n + f));
          h[r] = { height: n, top: p, baseline: t };
        }
        f =
          null === this.baselineIndex
            ? h[Math.floor(this.children.length / 2)].baseline
            : h[this.baselineIndex].baseline;
        for (a = 0; a < this.children.length; a++)
          (h[a].top -= f), (h[a].baseline -= f);
        this.dimensions = { top: d + h[0].top, left: e, width: k, height: l };
        l = e + k / 2;
        for (a = 0; a < this.children.length; a++)
          (f = e),
            "center" == this.align
              ? (f = l - this.children[a].dimensions.width / 2)
              : "right" == this.align &&
                (f = k - this.children[a].dimensions.width),
            this.children[a].draw(b, m[a], f, d + h[a].baseline, g);
        return this.dimensions;
      },
      getMathML: function () {
        var b = "<" + this.mtype + (this.in_attrbs ? this.in_attrbs : "");
        if ("mover" == this.mtype || "munderover" == this.mtype)
          b =
            "" != this.accent
              ? b + (" accent='" + this.accent + "'")
              : b + " accent='false'";
        if ("munder" == this.mtype || "munderover" == this.mtype)
          b =
            "" != this.accentunder
              ? b + (" accentunder='" + this.accentunder + "'")
              : b + " accentunder='false'";
        b +=
          null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"';
        b =
          "mover" == this.mtype || "munderover" == this.mtype
            ? b + (">" + this.children[1].getMathML(!0))
            : b + (">" + this.children[0].getMathML(!0));
        "mover" == this.mtype
          ? (b += this.children[0].getMathML(!0))
          : "munder" == this.mtype
          ? (b += this.children[1].getMathML(!0))
          : "munderover" == this.mtype && (b += this.children[2].getMathML(!0));
        "munderover" == this.mtype && (b += this.children[0].getMathML(!0));
        return (b += "</" + this.mtype + ">");
      },
      getAltText: function () {
        var b = org.imatheq.formulaeditor.FormulaEditor.getEditor();
        if ("mover" == this.mtype)
          return b.altstrs.mover
            .replace("$0$", this.children[1].getAltText().trim())
            .replace("$1$", this.children[0].getAltText().trim());
        if ("munder" == this.mtype)
          return b.altstrs.munder
            .replace("$0$", this.children[0].getAltText().trim())
            .replace("$1$", this.children[1].getAltText().trim());
        if ("munderover" == this.mtype)
          return b.altstrs.munderover
            .replace("$0$", this.children[1].getAltText().trim())
            .replace("$1$", this.children[2].getAltText().trim())
            .replace("$2$", this.children[0].getAltText().trim());
      },
      getCursorPosition: function (b, a, e) {
        if (
          a > this.dimensions.left &&
          a < this.dimensions.left + this.dimensions.width - 1
        ) {
          for (var d = 0; d < this.children.length - 1; d++)
            if (e < this.children[d + 1].dimensions.top)
              return this.children[d].getCursorPosition(b, a, e);
          return this.children[this.children.length - 1].getCursorPosition(
            b,
            a,
            e
          );
        }
        return a <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getFollowingCursorPosition: function (b, a, e) {
        var d = null;
        if (!0 === b.continuingNavigation)
          null === a || void 0 === a
            ? (d = this.children[0].getFollowingCursorPosition(b, null, e))
            : a + 1 < this.children.length &&
              (d = this.children[a + 1].getFollowingCursorPosition(b, null, e));
        else if (null === a || void 0 === a)
          for (
            var g = (a = Math.floor(this.children.length / 2));
            null === d && 0 <= g && g < this.children.length;

          )
            (d = this.children[g].getFollowingCursorPosition(b, null, e)),
              (g = g >= a ? 2 * a - g - 1 : 2 * a - g);
        null === d &&
          null !== this.parent &&
          (d = this.parent.getFollowingCursorPosition(b, this.index, !1));
        return d;
      },
      getPrecedingCursorPosition: function (b, a, e) {
        if (!0 === b.continuingNavigation)
          if (null === a || void 0 === a) {
            if (0 < this.children.length)
              return this.children[
                this.children.length - 1
              ].getPrecedingCursorPosition(b, null, e);
          } else if (0 < a)
            return this.children[a - 1].getPrecedingCursorPosition(b, null, e);
        if (null === a || void 0 === a) {
          a = null;
          for (
            var d = Math.floor(this.children.length / 2), g = d;
            null === a && 0 <= g && g < this.children.length;

          )
            (a = this.children[g].getPrecedingCursorPosition(b, null, e)),
              (g = g >= d ? 2 * d - g - 1 : 2 * d - g);
          return a;
        }
        return null !== this.parent
          ? { row: this.parent, index: this.index }
          : null;
      },
      getLowerCursorPosition: function (b, a, e, d) {
        var g = this.children.length - 1;
        return null === a || void 0 === a
          ? this.children[0].getLowerCursorPosition(b, null, e, d)
          : a < g
          ? this.children[a + 1].getLowerCursorPosition(b, null, e, d)
          : this.getLowerCursorPosition.parent.getLowerCursorPosition.call(
              b,
              this,
              a,
              e,
              d
            );
      },
      getHigherCursorPosition: function (b, a, e, d) {
        var g = this.children.length - 1;
        return null === a || void 0 === a
          ? this.children[g].getHigherCursorPosition(b, null, e, d)
          : 0 < a
          ? this.children[a - 1].getHigherCursorPosition(b, null, e, d)
          : this.getHigherCursorPosition.parent.getHigherCursorPosition.call(
              b,
              this,
              a,
              e,
              d
            );
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Lines = $extend(
    org.imatheq.formulaeditor.presentation.Column,
    {
      fontSizeModifierArray: null,
      margin: 20,
      align: "left",
      baselineIndex: null,
      mtype: "",
      initialize: function () {
        var b = this.initialize.parent,
          a = [];
        return 0 == arguments.length
          ? b.initialize.apply(this, a)
          : b.initialize.apply(this, arguments);
      },
      getRowSpace: function () {
        return this.margin;
      },
      getSelection: function (b, a, e, d, g, f, h, k, l) {
        for (var m = g, r = f, n = 0; n < e; n++)
          (m += this.children[n].children.length),
            (r += this.children[n].children.length);
        for (var p = [], n = e; n <= d; n++) {
          var t = 0,
            q,
            u = this.children[n];
          n == e && (t = g);
          n == d
            ? (q = f)
            : ((r += this.children[n].children.length),
              (q = this.children[n].children.length));
          for (var v, y, A, C, z = t; z < q; z++) {
            var w = u.children[z].dimensions;
            u.children[z] instanceof
              org.imatheq.formulaeditor.presentation.NewlineSymbol &&
              (w = {
                left: w.left,
                top: u.dimensions.top,
                width: w.width,
                height: u.dimensions.height,
              });
            z == t
              ? ((v = w.left),
                (y = w.top),
                (A = w.left + w.width),
                (C = w.top + w.height))
              : ((v = Math.min(v, w.left)),
                (y = Math.min(y, w.top)),
                (A = Math.max(A, w.left + w.width)),
                (C = Math.max(C, w.top + w.height)));
          }
          p.push({ left: v, top: y, width: A - v, height: C - y });
        }
        return {
          parent: this,
          startPosition: { row: b.row, index: b.index },
          endPosition: { row: a.row, index: a.index },
          startIndex: m,
          endIndex: r,
          startIndexChain: h,
          endIndexChain: k,
          rightMove: l,
          dimensions: p,
        };
      },
      getSelectedArea: function (b, a) {
        for (
          var e = b[b.length - 2],
            d = a[a.length - 2],
            g = b[b.length - 3],
            f = a[a.length - 3],
            h = e <= d ? e : d,
            k = e > d ? e : d,
            l = e < d ? g : e == d ? Math.min(g, f) : f,
            e = e > d ? g : e == d ? Math.max(g, f) : f,
            d = [],
            g = h;
          g <= k;
          g++
        ) {
          var f = 0,
            m,
            r = this.children[g];
          g == h && (f = l);
          m = g == k ? e : this.children[g].children.length;
          for (var n, p, t, q, u = f; u < m; u++) {
            var v = r.children[u].dimensions;
            r.children[u] instanceof
              org.imatheq.formulaeditor.presentation.NewlineSymbol &&
              (v = {
                left: v.left,
                top: r.dimensions.top,
                width: v.width,
                height: r.dimensions.height,
              });
            u == f
              ? ((n = v.left),
                (p = v.top),
                (t = v.left + v.width),
                (q = v.top + v.height))
              : ((n = Math.min(n, v.left)),
                (p = Math.min(p, v.top)),
                (t = Math.max(t, v.left + v.width)),
                (q = Math.max(q, v.top + v.height)));
          }
          d.push({ left: n, top: p, width: t - n, height: q - p });
        }
        return d;
      },
      getMathML: function () {
        for (var b = "", a = 0; a < this.children.length; a++) {
          var e = this.children[a].getMathML(!1);
          1 < this.children.length &&
            a == this.children.length - 1 &&
            "<mrow/>" === e &&
            (e = "");
          b += e;
          a != this.children.length - 1 &&
            (b += '<mspace linebreak="newline"/>');
        }
        return b;
      },
      getAltText: function () {
        for (var b = "", a = 0; a < this.children.length; a++) {
          var e = this.children[a].getAltText().trim(),
            b = b + e;
          a != this.children.length - 1 && (b += "\n");
        }
        return b;
      },
      getSelectionMathML: function (b, a, e) {
        b = '<math xmlns="http://www.w3.org/1998/Math/MathML">';
        a = this.getGrandChild(a, !0);
        e = this.getGrandChild(e, !0);
        for (var d = a.parent.index; d <= e.parent.index; d++) {
          var g = this.children[d],
            f = d == a.parent.index ? a.index : 0,
            h = d == e.parent.index ? e.index : g.children.length - 1;
          null === g.children[h] ||
            void 0 === g.children[h] ||
            g.children[h] instanceof
              org.imatheq.formulaeditor.presentation.NewlineSymbol ||
            h++;
          h >= f &&
            ((b += g.getMathML(!1, f, h)),
            g.children[h] instanceof
              org.imatheq.formulaeditor.presentation.NewlineSymbol &&
              (b += '<mspace linebreak="newline"/>'));
        }
        return b + "</math>";
      },
      onkeypress: function (b, a) {
        var e = org.imatheq.formulaeditor.presentation;
        if (!b.altKey && !b.ctrlKey) {
          var d = String.fromCharCode(b.charCode),
            d = new e.Row(a.cursor.position.row.newSymbol(d)),
            g = new e.Lines(d),
            d = null;
          if (13 == b.charCode) return !1;
          var f = a.selection,
            h = this.getGrandChild(f.startIndex),
            k = h.parent;
          f.hasSelection && (d = f.getSelectionCopy());
          var l = a.cursor.position,
            h = l.index;
          0 < h && l.row.children[h - 1] instanceof e.NewlineSymbol && h--;
          var e = l.row.getIndexChain(h),
            l = f.startIndex,
            m = this.getNumGrandChildren() - f.endIndex,
            r = this.remove(l, f.endIndex);
          f.clear();
          this.insert(l, g);
          this.updateChildren();
          h = this.getGrandChild(f.startIndex + 1);
          g = h.parent.getIndexChain(h.index);
          l = { row: this, index: l };
          a.cursor.position.row = h.parent;
          a.cursor.position.index = h.index;
          a.actions.addAction("update", l, e, g, r, null, m, d);
          k.convertKeyword(a);
          return !1;
        }
        return !0;
      },
      onNewline: function (b) {
        var a = b.selection,
          e = org.imatheq.formulaeditor.presentation,
          d = b.cursor.position,
          g = d.row.getIndexChain(d.index),
          f = { parent: d.row, index: d.index },
          h = "insert",
          k = null,
          l = null,
          k = null;
        if (a.hasSelection) {
          h = "update";
          d = a.parent;
          if (d instanceof e.PArray) return;
          l = {
            parent: d,
            startIndex: a.startIndex,
            endIndex: a.endIndex,
            dimensions: a.dimensions,
          };
          k = d.remove(a.startIndex, a.endIndex);
          f = { parent: d, index: a.startIndex };
        }
        var d = this.getAncestorOf(f),
          m = d.getAncestorOf(f).index;
        !a.hasSelection &&
          1 == d.children.length &&
          d.children[0] instanceof e.BlockSymbol &&
          ((k = d.remove(0)), (m = 0));
        f.parent !== d && m++;
        var m = this.getGrandChildIndex(d.index, m),
          a = this.getNumGrandChildren() - m,
          d = { row: this, index: m },
          r = new e.Row(new e.NewlineSymbol()),
          e = new e.Lines(r);
        this.insert(m, e);
        e = this.children[f.parent.index + 1];
        f = e.getIndexChain(0);
        b.cursor.setPosition({ row: e, index: 0 });
        b.actions.addAction(h, d, g, f, k, null, a, l);
        b.redraw();
        return !1;
      },
      deleteNewline: function (b, a) {
        var e = this.children[a],
          d = e.children.length - 1,
          g = { row: b.cursor.position.row, index: b.cursor.position.index },
          f = g.row.getIndexChain(g.index),
          h = e.getIndexChain(d),
          g = { row: this, index: this.getGrandChildIndex(a, d) },
          d = b.getButtonStatus();
        b.cursor.setPosition({ row: e, index: e.children.length - 1 });
        var e = this.getNumGrandChildren() - g.index - 1,
          k = this.remove(g.index, g.index + 1);
        b.actions.addAction("delete", g, f, h, k, null, e, null, null, d);
        b.redraw();
        return !1;
      },
      getGrandChildIndex: function (b, a) {
        for (var e = a, d = 0; d < b; d++)
          e += this.children[d].children.length;
        return e;
      },
      getNumGrandChildren: function () {
        return this.getGrandChildIndex(
          this.children.length - 1,
          this.children[this.children.length - 1].children.length
        );
      },
      getGrandChild: function (b, a) {
        var e = 0;
        if (b == this.getNumGrandChildren())
          return 0 == b
            ? { parent: this.children[0], index: 0 }
            : {
                parent: this.children[this.children.length - 1],
                index: this.children[this.children.length - 1].children.length,
              };
        for (var d = 0; d < this.children.length; d++) {
          if (b >= e && b <= e + this.children[d].children.length)
            if (b == e + this.children[d].children.length) {
              if (0 == b - e && 0 == this.children[d].children.length)
                return { parent: this.children[d], index: 0 };
              if (null === a || void 0 === a || !1 === a)
                return {
                  parent: this.children[d],
                  index: this.children[d].children.length,
                };
            } else return this.children[d].children[b - e];
          e += this.children[d].children.length;
        }
      },
      setSymbFontAttrbs: function (b, a, e) {
        var d = org.imatheq.formulaeditor.presentation,
          g = this.getGrandChild(a, !0),
          f = this.getGrandChild(e, !0);
        e = [];
        a = g.parent;
        var h = f.parent,
          k = g.index,
          g = f.index;
        if (a.index == h.index) {
          var f = new d.Row(),
            l = [];
          for (e.push(f); k < g; k++)
            l.push(a.children[k].copy()), a.children[k].setSymbFontAttrbs(b);
          f.initialize.apply(f, l);
        } else {
          f = new d.Row();
          l = [];
          for (e.push(f); k < a.children.length; k++)
            l.push(a.children[k].copy()), a.children[k].setSymbFontAttrbs(b);
          f.initialize.apply(f, l);
          f = new d.Row();
          l = [];
          for (k = 0; k < g; k++)
            l.push(h.children[k].copy()), h.children[k].setSymbFontAttrbs(b);
          f.initialize.apply(f, l);
          for (k = a.index + 1; k < h.index; k++)
            e.push(this.children[k].copy()),
              this.children[k].setSymbFontAttrbs(b);
          e.push(f);
        }
        b = new d.Lines();
        b.initialize.apply(b, e);
        return b;
      },
      remove: function (b, a) {
        var e = org.imatheq.formulaeditor.presentation,
          d = this.getGrandChild(b, !0),
          g = this.getGrandChild(a, !0),
          f = [],
          h = d.parent,
          k = g.parent,
          d = d.index,
          g = g.index,
          l;
        if (h.index == k.index) (l = h.remove(d, g)), h.updateChildren();
        else {
          for (l = h.remove(d, h.children.length); k.children.length > g; )
            (f = k.children.pop()), h.children.splice(d, 0, f);
          h.updateChildren();
          f = this.children.splice(h.index + 1, k.index - h.index);
        }
        f.splice(0, 0, l);
        this.updateChildren();
        e = new e.Lines();
        e.initialize.apply(e, f);
        return e;
      },
      insert: function (b, a) {
        var e = org.imatheq.formulaeditor.presentation;
        if (0 == arguments.length) {
          var d = this.children[0];
          null === d
            ? ((d = new e.Row()), this.children.splice(0, 0, d))
            : d.insert(0);
        } else {
          if (0 == a.children.length) return null;
          if (0 == this.children.length)
            for (; 0 < a.children.length; )
              (d = a.children.pop()), this.children.splice(0, 0, d);
          else {
            var g = this.getGrandChild(b, !0),
              d = g.parent,
              g = g.index,
              f = a.children[a.children.length - 1];
            (0 == f.children.length
              ? null
              : f.children[f.children.length - 1]) instanceof e.NewlineSymbol &&
              ((f = new e.Row()),
              f.children.splice(0, 1),
              a.children.push(f),
              a.updateChildren());
            for (var h = f.children.length; d.children.length > g; )
              (e = d.children.pop()),
                f.children.splice(h, 0, e),
                f.updateChildren();
            for (f = a.children[0]; 0 < f.children.length; )
              (e = f.children.pop()),
                d.children.splice(g, 0, e),
                d.updateChildren();
            for (; 1 < a.children.length; )
              (g = a.children.pop()), this.children.splice(d.index + 1, 0, g);
          }
        }
        this.updateChildren();
      },
      isEmpty: function () {
        return (
          0 == this.children.length ||
          (1 == this.children.length && this.children[0].isEmpty())
        );
      },
      getCursorPosition: function (b, a, e) {
        for (var d = this.getRowSpace(), g = 0; g < this.children.length; g++) {
          var f = this.children[g];
          if (
            e > f.dimensions.top - d / 2 &&
            (g == this.children.length - 1 ||
              e < f.dimensions.top + f.dimensions.height + d / 2)
          )
            return this.children[g].getCursorPosition(b, a, e);
        }
      },
      getFollowingCursorPosition: function (b, a, e) {
        var d = null;
        if (!0 === b.continuingNavigation)
          if (null === a || void 0 === a)
            d = this.children[0].getFollowingCursorPosition(b, null, e);
          else if (a + 1 < this.children.length)
            d = this.children[a + 1].getFollowingCursorPosition(b, null, e);
          else {
            if (a + 1 == this.children.length) return null;
          }
        else if (null === a || void 0 === a)
          for (
            var g = (a = Math.floor(this.children.length / 2));
            null === d && 0 <= g && g < this.children.length;

          )
            (d = this.children[g].getFollowingCursorPosition(b, null, e)),
              (g = g >= a ? 2 * a - g - 1 : 2 * a - g);
        null === d &&
          null !== this.parent &&
          (d = this.parent.getFollowingCursorPosition(b, this.index, !1));
        return d;
      },
      getPrecedingCursorPosition: function (b, a, e) {
        if (!0 === b.continuingNavigation)
          if (null === a || void 0 === a) {
            if (0 < this.children.length)
              return this.children[
                this.children.length - 1
              ].getPrecedingCursorPosition(b, null, e);
          } else {
            if (0 < a)
              return this.children[a - 1].getPrecedingCursorPosition(
                b,
                null,
                e
              );
            if (0 == a) return null;
          }
        if (null === a || void 0 === a) {
          a = null;
          for (
            var d = Math.floor(this.children.length / 2), g = d;
            null === a && 0 <= g && g < this.children.length;

          )
            (a = this.children[g].getPrecedingCursorPosition(b, null, e)),
              (g = g >= d ? 2 * d - g - 1 : 2 * d - g);
          return a;
        }
        return null;
      },
      getLowerCursorPosition: function (b, a, e, d) {
        var g = this.children.length - 1;
        return null === a || void 0 === a
          ? this.children[0].getLowerCursorPosition(b, null, e, d)
          : a < g
          ? this.children[a + 1].getLowerCursorPosition(b, null, e, d)
          : null;
      },
      getHigherCursorPosition: function (b, a, e, d) {
        var g = this.children.length - 1;
        return null === a || void 0 === a
          ? this.children[g].getHigherCursorPosition(b, null, e, d)
          : 0 < a
          ? this.children[a - 1].getHigherCursorPosition(b, null, e, d)
          : null;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Root = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      lineWidth: 1,
      margin: 2,
      drawBase: !1,
      left: { dimensions: null },
      top: { dimensions: null },
      initialize: function () {
        0 < arguments.length
          ? ((this.children = []),
            null !== arguments[1] && this.children.push(arguments[1]),
            null !== arguments[2] && (this.mathcolor = arguments[2]),
            this.children.push(arguments[0]))
          : (this.children = []);
        for (
          var b = new org.imatheq.formulaeditor.presentation.Row(),
            a = this.functionsFromRow.length - 1;
          0 <= a;
          a--
        )
          this[this.functionsFromRow[a]] ||
            (this[this.functionsFromRow[a]] = b[this.functionsFromRow[a]]);
        this.drawBase = this.drawBaseQ();
        this.updateChildren();
      },
      drawBaseQ: function () {
        return 2 == this.children.length;
      },
      getFontSizeData: function (b, a, e) {
        var d = this.children[this.children.length - 1],
          g = 1 == this.children.length ? null : this.children[0];
        if (null !== g) {
          var f = { fontSizeModifier: 0 },
            h;
          for (h in a) f[h] = a[h];
          f.fontSizeModifier -= 2;
          g.getFontSizeData(b, f, e);
        }
        d.getFontSizeData(b, a, e);
      },
      drawTopLeft: function (b, a, e, d, g, f, h, k, l, m, r) {
        r = { fontSizeModifier: 0 };
        for (var n in m) r[n] = m[n];
        r.fontSizeModifier -= 2;
        var p = 0,
          t = 0,
          q;
        null !== f &&
          void 0 !== f &&
          (f.draw(b, r, 0, 0, !0),
          (p = f.dimensions.width),
          (t = f.dimensions.height),
          (q = f.dimensions.top));
        var u = Math.round(0.38 * b.getPXFontSize(m.fontSizeModifier)),
          v = Math.max(g, 8),
          y = Math.max(Math.round(u / 3), 1),
          A = Math.round(0.38 * v);
        m = k + 1;
        var C = Math.floor((6 * u) / 4 - h),
          z = Math.max(p, C) - C;
        h = a + z;
        n = e - (A - y);
        var y = h + y,
          A = e - A,
          w = h + u,
          D = h + 2 * u,
          B = e - v;
        if (null === f || void 0 === f) q = B;
        var E = D + d,
          v = e - v,
          F = Math.floor(g / 2);
        g = g + Math.max(t, F) - F;
        p = a + C - Math.min(C, p);
        a = { height: g, width: z + 2 * u + d + 1, left: a, top: e - g };
        if (void 0 === l || null === l || !1 === l)
          null !== f && void 0 !== f && f.draw(b, r, p, e - g - q, l),
            (this.left.dimensions = {
              left: h,
              top: B,
              width: a.width - d,
              height: a.height,
            }),
            (this.top.dimensions = {
              left: D,
              top: B,
              width: a.width,
              height: k,
            }),
            (b = b.getContext()),
            b.save(),
            (b.strokeStyle = this.mathcolor),
            (b.lineWidth = k),
            b.beginPath(),
            b.moveTo(h, n),
            b.lineTo(y, A),
            (b.lineWidth = m),
            b.lineTo(w, e),
            (b.lineWidth = k),
            b.lineTo(D, B),
            b.lineTo(E, v),
            b.stroke(),
            b.restore();
        return a;
      },
      draw: function (b, a, e, d, g) {
        var f = org.imatheq.formulaeditor.presentation,
          h = b.getFontSizeIdx(a.fontSizeModifier);
        8 < h && (this.lineWidth = 2);
        6 > h && (this.margin = 1);
        var h = this.children[this.children.length - 1],
          k = 1 == this.children.length ? null : this.children[0];
        h.draw(b, a, 0, 0, !0);
        var l = h.dimensions.height + this.lineWidth + 2 * this.margin,
          m = h.dimensions.width + 2 * this.margin;
        1 <= h.children.length &&
          !(h.children[h.children.length - 1] instanceof f.Root) &&
          (m += this.margin);
        this.dimensions = this.drawTopLeft(
          b,
          e,
          d + (h.dimensions.top + h.dimensions.height) + this.margin,
          m,
          l,
          k,
          this.margin,
          this.lineWidth,
          g,
          a
        );
        g || h.draw(b, a, e + this.dimensions.width - m + this.margin, d, g);
        return this.dimensions;
      },
      functionsFromRow: [
        "getFirstCursorPosition",
        "getLastCursorPosition",
        "getLowerCursorPosition",
        "getHigherCursorPosition",
      ],
      getCursorPosition: function (b, a, e) {
        if (
          a > this.dimensions.left &&
          a < this.dimensions.left + this.dimensions.width - 1
        ) {
          var d = this.children[this.children.length - 1],
            g = 1 == this.children.length ? null : this.children[0];
          if (this.drawBase) {
            var f =
              (g.dimensions.left + g.dimensions.width + d.dimensions.left) / 2;
            return a < f
              ? g.getCursorPosition(b, a, e)
              : d.getCursorPosition(b, a, e);
          }
          f = (this.dimensions.left + d.dimensions.left) / 2;
          return a < f
            ? { row: this.parent, index: this.index }
            : d.getCursorPosition(b, a, e);
        }
        return a <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getFollowingCursorPosition: function (b, a, e) {
        if (null === e || void 0 === e) e = !0;
        var d = this.children[this.children.length - 1],
          g = 1 == this.children.length ? null : this.children[0];
        if (null === a || void 0 === a)
          return this.drawBase
            ? g.getFollowingCursorPosition(b, null, e)
            : d.getFollowingCursorPosition(b, null, e);
        d = null;
        if (0 === a)
          if (e)
            this.drawBase &&
              (d = this.children[1].getFollowingCursorPosition(b, null, e));
          else if (this.drawBase) return { row: this.children[1], index: 0 };
        return null === d && null !== this.parent
          ? this.parent.getFollowingCursorPosition(b, this.index, !1)
          : d;
      },
      getPrecedingCursorPosition: function (b, a, e) {
        if (null === e || void 0 === e) e = !0;
        var d = this.children[this.children.length - 1];
        if (null === a || void 0 === a)
          return d.getPrecedingCursorPosition(b, null, e);
        d = null;
        if (1 == a)
          if (e) d = this.children[0].getLastCursorPosition(b, null, e);
          else
            return {
              row: this.children[0],
              index: this.children[0].children.length,
            };
        return null === d && null !== this.parent
          ? { row: this.parent, index: this.index }
          : d;
      },
      getLowerCursorPosition: function (b, a, e, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === a || void 0 === a)
          return this.children[0].getLowerCursorPosition(b, null, e, d);
        var g = null;
        if (1 < this.children.length && 0 === a)
          if (d)
            g = this.children[this.children.length - 1].getLowerCursorPosition(
              b,
              null,
              e,
              d
            );
          else return { row: this.moddle, index: 0 };
        return null === g && null !== this.parent
          ? this.parent.getLowerCursorPosition(b, this.index, e, !1)
          : g;
      },
      getHigherCursorPosition: function (b, a, e, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === a || void 0 === a)
          return this.children[
            this.children.length - 1
          ].getHigherCursorPosition(b, null, e, d);
        var g = null;
        if (1 < this.children.length && 1 === a)
          if (d) g = this.children[0].getHigherCursorPosition(b, null, e, d);
          else return { row: this.moddle, index: 0 };
        return null === g && null !== this.parent
          ? this.parent.getHigherCursorPosition(b, this.index, e, !1)
          : g;
      },
      copy: function () {
        return 2 == this.children.length
          ? this.clone(this.children[1].copy(), this.children[0].copy())
          : this.clone(this.children[0].copy(), null);
      },
      getMathML: function () {
        var b = this.children[this.children.length - 1],
          a = 1 == this.children.length ? null : this.children[0];
        return null === a
          ? "<msqrt" +
              (this.in_attrbs ? this.in_attrbs : "") +
              (null === this.mathcolor ||
              "" == this.mathcolor ||
              "null" == this.mathcolor ||
              "#000000" == this.mathcolor
                ? ""
                : ' mathcolor="' + this.mathcolor + '"') +
              ">" +
              b.getMathML(!0) +
              "</msqrt>"
          : "<mroot" +
              (this.in_attrbs ? this.in_attrbs : "") +
              (null === this.mathcolor ||
              "" == this.mathcolor ||
              "null" == this.mathcolor ||
              "#000000" == this.mathcolor
                ? ""
                : ' mathcolor="' + this.mathcolor + '"') +
              ">" +
              b.getMathML(!0) +
              a.getMathML(!0) +
              "</mroot>";
      },
      getAltText: function () {
        var b = this.children[this.children.length - 1],
          a = 1 == this.children.length ? null : this.children[0],
          e = org.imatheq.formulaeditor.FormulaEditor.getEditor(),
          d = b.children && 1 < b.children.length ? 1 : 0;
        a &&
          a.children &&
          1 == a.children.length &&
          2 == a.children[0].value &&
          (a = null);
        return null === a
          ? e.altstrs["square root"][d].replace("$0$", b.getAltText().trim())
          : e.altstrs.root[d]
              .replace("$0$", b.getAltText().trim())
              .replace("$1$", a.getAltText().trim());
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.PArray = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      numrows: 0,
      numcols: 0,
      tblframe: null,
      tblFrame: null,
      editor: null,
      info: null,
      initialize: function () {
        0 < arguments.length &&
          ((this.entries = Array.prototype.slice.call(arguments)),
          (this.numrows = this.entries.length),
          (this.numcols = this.entries[0].length));
        this.children = [];
        for (var b = 0; b < this.numrows; b++)
          for (var a = 0; a < this.numcols; a++)
            this.children.push(this.entries[b][a]);
        this.updateChildren();
        this.editor = org.imatheq.formulaeditor.FormulaEditor.getEditor();
        null == this.editor &&
          alert("Error PArray.initialize: failed to get editor");
      },
      insertRows: function (b, a, e) {
        for (var d = a; d < a + e; d++)
          for (var g = 0; g < this.numcols; g++)
            this.children.splice(d * this.numcols + g, 0, b[d - a][g]);
        this.entries.splice.apply(this.entries, [a, 0].concat(b));
        this.numrows += e;
        this.updateChildren();
      },
      insertColumns: function (b, a, e) {
        for (var d = this.numrows - 1; 0 <= d; d--) {
          for (var g = 0; g < e; g++)
            this.children.splice(d * this.numcols + a + g, 0, b[d][g]);
          this.entries[d].splice.apply(this.entries[d], [a, 0].concat(b[d]));
        }
        this.numcols += e;
        this.updateChildren();
      },
      deleteRows: function (b, a) {
        var e = this.entries.splice(b, a);
        this.children.splice(b * this.numcols, a * this.numcols);
        this.updateChildren();
        this.numrows -= a;
        this.updateChildren();
        return e;
      },
      deleteColumns: function (b, a) {
        for (var e = [], d = this.numrows - 1; 0 <= d; d--)
          e.splice(0, 0, this.entries[d].splice(b, a)),
            this.children.splice(d * this.numcols + b, a);
        this.numcols -= a;
        this.updateChildren();
        return e;
      },
      actInsertRows: function (b, a) {
        var e = org.imatheq.formulaeditor.presentation,
          d = b.selection,
          g = null,
          f = null,
          h = b.cursor.position,
          k = h.etb.parray,
          l = null,
          m = null,
          r = null,
          n = Math.floor(k.startIndex / this.numcols),
          p = Math.floor(k.endIndex / this.numcols) + 1 - n,
          t = this.info,
          q = "front",
          u = n;
        "insertbelow" == a && ((u += p), (q = "behind"));
        var r = {
            info: this.info.copy(this.numrows, this.numcols),
            startRow: u,
            numRows: p,
          },
          v = { row: this, index: k.startIndex },
          y = h.row.getIndexChain(h.index),
          A = h.row.children[h.index];
        d.hasSelection &&
          ((l = this.children[k.startIndex]),
          (m = this.children[k.endIndex]),
          (g = d.getSelectionCopy()));
        k = h.row.children[h.index];
        if (null === k || void 0 === k) k = h.row.children[h.index - 1];
        for (var k = k.getSymbFontAttrbs(), C = [], z = 0; z < p; z++) {
          for (var w = [], D = 0; D < this.numcols; D++) {
            var B = new e.Row(new e.BlockSymbol());
            B.setSymbFontAttrbs(k);
            w.splice(0, 0, B);
          }
          C.splice(0, 0, w);
        }
        this.insertRows(C, u, p);
        t.rowalign = t.insertArrayAtttrbs(
          t.rowalign,
          n,
          n + p - 1,
          q,
          "baseline"
        );
        t.rows = t.insertArrayAtttrbs(t.rows, n, n + p - 1, q, "baseline");
        t.rowspacing = t.insertArrayAtttrbs(
          t.rowspacing,
          n,
          n + p - 1,
          q,
          "1.0ex"
        );
        t.rowlines = t.insertArrayAtttrbs(t.rowlines, n, n + p - 1, q, "none");
        t.populateData(this.numrows, this.numcols);
        e = {
          row: null !== A && void 0 !== A ? A.parent : h.row,
          index: null !== A && void 0 !== A ? A.index : h.index,
        };
        n = e.row.getIndexChain(e.index);
        d.hasSelection &&
          ((f = l.parent.getIndexChain(l.index)),
          (h = m.parent.getIndexChain(m.index)),
          (l = this.getSelection(
            d.startPosition,
            d.endPosition,
            l.index,
            m.index,
            f,
            h,
            d.rightMove
          )),
          d.setSelection(l),
          (n = d.endPosition.row.getIndexChain(d.endPosition.index)),
          (f = d.getSelectionCopy()));
        h = { row: e.row, index: e.index };
        b.cursor.setPosition(h);
        l = b.getButtonStatus();
        b.actions.addAction(a, v, y, n, r, null, null, g, f, l, l);
        b.cursor.setPosition(e);
        b.redraw(d.hasSelection);
      },
      actInsertColumns: function (b, a) {
        var e = org.imatheq.formulaeditor.presentation,
          d = b.selection,
          g = null,
          f = null,
          h = b.cursor.position,
          k = h.etb.parray,
          l = null,
          m = null,
          r = null,
          n = k.startIndex % this.numcols,
          p = (k.endIndex % this.numcols) + 1 - n,
          t = this.info,
          q = "front",
          u = n;
        "insertright" == a && ((u += p), (q = "behind"));
        var r = {
            info: this.info.copy(this.numrows, this.numcols),
            startCol: u,
            numCols: p,
          },
          v = { row: this, index: k.startIndex },
          y = h.row.getIndexChain(h.index),
          A = h.row.children[h.index];
        d.hasSelection &&
          ((l = this.children[k.startIndex]),
          (m = this.children[k.endIndex]),
          (g = d.getSelectionCopy()));
        k = h.row.children[h.index];
        if (null === k || void 0 === k) k = h.row.children[h.index - 1];
        for (
          var k = k.getSymbFontAttrbs(), C = [], z = 0;
          z < this.numrows;
          z++
        ) {
          for (var w = [], D = 0; D < p; D++) {
            var B = new e.Row(new e.BlockSymbol());
            B.setSymbFontAttrbs(k);
            w.splice(0, 0, B);
          }
          C.splice(z, 0, w);
        }
        this.insertColumns(C, u, p);
        t.colalign = t.insertArrayAtttrbs(
          t.colalign,
          n,
          n + p - 1,
          q,
          "center"
        );
        for (z = 0; z < this.numrows; z++)
          (t.rows[z].colalign = t.insertArrayAtttrbs(
            t.rows[z].colalign,
            n,
            n + p - 1,
            q,
            "center"
          )),
            (t.rows[z].cols = t.insertArrayAtttrbs(
              t.rows[z].cols,
              n,
              n + p - 1,
              q,
              "center"
            ));
        t.colspacing = t.insertArrayAtttrbs(
          t.colspacing,
          n,
          n + p - 1,
          q,
          "0.8em"
        );
        t.collines = t.insertArrayAtttrbs(t.collines, n, n + p - 1, q, "none");
        t.populateData(this.numrows, this.numcols);
        e = {
          row: null !== A && void 0 !== A ? A.parent : h.row,
          index: null !== A && void 0 !== A ? A.index : h.index,
        };
        h = e.row.getIndexChain(e.index);
        d.hasSelection &&
          ((f = l.parent.getIndexChain(l.index)),
          (h = m.parent.getIndexChain(m.index)),
          (l = this.getSelection(
            d.startPosition,
            d.endPosition,
            l.index,
            m.index,
            f,
            h,
            d.rightMove
          )),
          d.setSelection(l),
          (h = d.endPosition.row.getIndexChain(d.endPosition.index)),
          (f = d.getSelectionCopy()));
        this.updateEditTabButtons(b);
        l = b.getButtonStatus();
        b.actions.addAction(a, v, y, h, r, null, null, g, f, l, l);
        b.cursor.setPosition(e);
        b.redraw(d.hasSelection);
      },
      actDeleteRows: function (b) {
        var a = b.cursor.position,
          e = a.etb.parray,
          d = Math.floor(e.startIndex / this.numcols),
          g = Math.floor(e.endIndex / this.numcols) + 1,
          f = b.selection,
          h = null,
          k = null,
          l,
          m = "deleterows",
          r = null,
          k = this.info,
          e = { row: this, index: e.startIndex },
          n = a.row.getIndexChain(a.index),
          p = null;
        f.hasSelection && (h = f.getSelectionCopy());
        var t = b.getButtonStatus();
        if (g - d == this.numrows)
          (r = this.parent),
            (e = { row: r, index: this.index }),
            (k = { row: r, index: this.index }),
            (l = r.children.length - this.index - 1),
            (p = r.remove(this.index, this.index + 1, !0)),
            (m = "delete");
        else {
          var q = a.row.children[a.index];
          if (null === q || void 0 === q) q = a.row.children[a.index - 1];
          q = this.getAncestorOf(q);
          p = q.index;
          p =
            g < this.numrows
              ? g * this.numcols + (p % this.numcols)
              : (d - 1) * this.numcols + (p % this.numcols);
          q = this.children[p];
          p = {
            entries: this.deleteRows(d, g - d),
            info: this.info.copy(this.numrows, this.numcols),
            startRow: d,
            numRows: g - d,
          };
          k.rowalign = k.deleteArrayAtttrbs(
            k.rowalign,
            d,
            g - 1,
            this.numrows,
            !0,
            "baseline"
          );
          k.rows = k.deleteArrayAtttrbs(k.rows, d, g - 1, this.numrows, !1);
          k.rowspacing = k.deleteArrayAtttrbs(
            k.rowspacing,
            g - 1,
            this.numrows,
            !0,
            "1.0ex"
          );
          k.rowlines = k.deleteArrayAtttrbs(
            k.rowlines,
            d,
            g - 1,
            this.numrows,
            !0,
            "none"
          );
          k.populateData(this.numrows, this.numcols);
          k = { row: q, index: 0 };
        }
        d = k.row.getIndexChain(k.index);
        f.clear();
        b.cursor.setPosition(k);
        g = b.getButtonStatus();
        null === r && this.updateEditTabButtons(b);
        b.actions.addAction(m, e, n, d, p, null, l, h, null, t, g);
        b.redraw(f.hasSelection);
      },
      actDeleteColumns: function (b) {
        var a = b.cursor.position,
          e = a.etb.parray,
          d = e.startIndex % this.numcols,
          g = (e.endIndex % this.numcols) + 1,
          f = b.selection,
          h = null,
          k = null,
          l,
          m = "deletecolumns",
          r = null,
          k = this.info,
          e = { row: this, index: e.startIndex },
          n = a.row.getIndexChain(a.index),
          p = null;
        f.hasSelection && (h = f.getSelectionCopy());
        var t = b.getButtonStatus();
        if (g - d == this.numcols)
          (r = this.parent),
            (e = { row: r, index: this.index }),
            (k = { row: r, index: this.index }),
            (l = r.children.length - this.index - 1),
            (p = r.remove(this.index, this.index + 1, !0)),
            (m = "delete");
        else {
          var q = a.row.children[a.index];
          if (null === q || void 0 === q) q = a.row.children[a.index - 1];
          q = this.getAncestorOf(q);
          p = q.index;
          p =
            g < this.numcols
              ? Math.floor(p / this.numcols) * this.numcols + g
              : Math.floor(p / this.numcols) * this.numcols + d - 1;
          q = this.children[p];
          p = {
            entries: this.deleteColumns(d, g - d),
            info: this.info.copy(this.numrows, this.numcols),
            startCol: d,
            numCols: g - d,
          };
          k.colalign = k.deleteArrayAtttrbs(
            k.colalign,
            d,
            g - 1,
            this.numcols,
            !0,
            "center"
          );
          for (a = 0; a < this.numrows; a++)
            (k.rows[a].colalign = k.deleteArrayAtttrbs(
              k.rows[a].colalign,
              d,
              g - 1,
              this.numcols,
              !1
            )),
              (k.rows[a].cols = k.deleteArrayAtttrbs(
                k.rows[a].cols,
                d,
                g - 1,
                this.numcols,
                !1
              ));
          k.colspacing = k.deleteArrayAtttrbs(
            k.colspacing,
            g - 1,
            this.numcols,
            !0,
            "0.8em"
          );
          k.collines = k.deleteArrayAtttrbs(
            k.collines,
            d,
            g - 1,
            this.numcols,
            !0,
            "none"
          );
          k.populateData(this.numrows, this.numcols);
          k = { row: q, index: 0 };
        }
        d = k.row.getIndexChain(k.index);
        f.clear();
        b.cursor.setPosition(k);
        g = b.getButtonStatus();
        null === r && this.updateEditTabButtons(b);
        b.actions.addAction(m, e, n, d, p, null, l, h, null, t, g);
        b.redraw(f.hasSelection);
      },
      getSelection: function (b, a, e, d, g, f, h) {
        var k = null,
          l = this.entries,
          m = Math.floor(e / this.numcols);
        e %= this.numcols;
        var r = Math.floor(d / this.numcols);
        d %= this.numcols;
        b = {
          parent: this,
          startPosition: { row: b.row, index: b.index },
          endPosition: { row: a.row, index: a.index },
          startIndex: m * this.numcols + e,
          endIndex: r * this.numcols + d + 1,
          startIndexChain: g,
          endIndexChain: f,
          rightMove: h,
          dimensions: null,
        };
        if (null === b.startIndex || null === b.endIndex) return null;
        for (a = Math.min(m, r); a <= Math.max(m, r); a++)
          for (g = Math.min(e, d); g <= Math.max(e, d); g++)
            (f = l[a][g]),
              null === k
                ? (k = {
                    top: f.dimensions.top,
                    left: f.dimensions.left,
                    width: f.dimensions.width,
                    height: f.dimensions.height,
                  })
                : ((k.top = Math.min(k.top, f.dimensions.top)),
                  (k.left = Math.min(k.left, f.dimensions.left)),
                  (k.width =
                    Math.max(
                      k.left + k.width,
                      f.dimensions.left + f.dimensions.width
                    ) - Math.min(k.left, f.dimensions.left)),
                  (k.height =
                    Math.max(
                      k.top + k.height,
                      f.dimensions.top + f.dimensions.height
                    ) - Math.min(k.top, f.dimensions.top)));
        b.dimensions = k;
        return b;
      },
      getSelectedArea: function (b, a) {
        var e = null,
          d = this.entries,
          g = Math.floor(b / this.numcols),
          f = b % this.numcols,
          h = Math.floor(a / this.numcols),
          k = a % this.numcols;
        if (null === b || null === a)
          throw Error("PArray failed to find input children.");
        for (var l = Math.min(g, h); l <= Math.max(g, h); l++)
          for (var m = Math.min(f, k); m <= Math.max(f, k); m++) {
            var r = d[l][m];
            null === e
              ? (e = {
                  top: r.dimensions.top,
                  left: r.dimensions.left,
                  width: r.dimensions.width,
                  height: r.dimensions.height,
                })
              : ((e.top = Math.min(e.top, r.dimensions.top)),
                (e.left = Math.min(e.left, r.dimensions.left)),
                (e.width =
                  Math.max(
                    e.left + e.width,
                    r.dimensions.left + r.dimensions.width
                  ) - Math.min(e.left, r.dimensions.left)),
                (e.height =
                  Math.max(
                    e.top + e.height,
                    r.dimensions.top + r.dimensions.height
                  ) - Math.min(e.top, r.dimensions.top)));
          }
        return e;
      },
      deleteValues: function (b, a) {
        var e = this.entries,
          d = Math.floor(b / this.numcols),
          g = b % this.numcols,
          f = Math.floor(a / this.numcols),
          h = a % this.numcols,
          k = [];
        if (null === b || null === a)
          throw Error("PArray failed to find input children.");
        for (var l = 0, m = Math.min(d, f); m <= Math.max(d, f); m++)
          for (var r = Math.min(g, h); r <= Math.max(g, h); r++) {
            var n = e[m][r];
            k[l++] = n.remove(0, n.children.length, !0);
          }
        return k;
      },
      updateValues: function (b, a, e) {
        var d = this.entries,
          g = Math.floor(a / this.numcols),
          f = a % this.numcols,
          h = Math.floor(e / this.numcols),
          k = e % this.numcols,
          l = Math.min(g, h),
          g = Math.max(g, h),
          h = Math.min(f, k),
          f = Math.max(f, k);
        if (null === a || null === e)
          throw Error("PArray failed to find input children.");
        a = 0;
        for (e = l; e <= g; e++)
          for (k = h; k <= f; k++) {
            var m = d[e][k];
            for (
              value =
                b instanceof Array
                  ? b[a++]
                  : b instanceof org.imatheq.formulaeditor.presentation.PArray
                  ? b.entries[(e - l) % b.columns][(k - h) % b.rows].copy()
                  : b.copy();
              0 < value.children.length;

            )
              m.insert(0, value.children.pop());
          }
        return [];
      },
      setSymbFontAttrbs: function (b, a, e) {
        var d = this.entries,
          g,
          f,
          h,
          k;
        if (null === a || void 0 === a)
          (h = g = 0), (f = d.length - 1), (k = d[0].length - 1);
        else {
          f = Math.floor(a / this.numcols);
          h = Math.floor(e / this.numcols);
          g = Math.min(f, h);
          f = Math.max(f, h);
          k = a % this.numcols;
          var l = e % this.numcols;
          h = Math.min(k, l);
          k = Math.max(k, l);
        }
        l = [];
        if (null === a || null === e)
          throw Error("PArray failed to find input children.");
        for (a = 0; g <= f; g++)
          for (e = h; e <= k; e++) {
            var m = d[g][e];
            l[a++] = m.copy();
            m.setSymbFontAttrbs(b);
          }
        this.setSymbFontAttrbs.parent.setSymbFontAttrbs.call(this, b);
        return l;
      },
      setStylingAttrbs: function (b, a, e) {
        var d = b.startIndex % this.numcols,
          g = b.endIndex % this.numcols,
          f = Math.floor(b.startIndex / this.numcols);
        b = Math.floor(b.endIndex / this.numcols);
        var h = 0 == d && g == this.numcols - 1,
          k = 0 == f && b == this.numrows - 1,
          l = this.info;
        switch (a) {
          case "rowalign":
            if (h)
              for (
                l.rowalign = l.populateArrayAtttrbs(
                  l.rowalign,
                  f,
                  b,
                  this.numrows,
                  e,
                  "baseline"
                ),
                  a = f;
                a <= b;
                a++
              ) {
                if (void 0 !== l.rows[a])
                  for (l.rows[a].rowalign = null, f = 0; f < this.cols; f++)
                    l.clearColAttrb(a, f, "rowalign");
              }
            else
              for (a = f; a <= b; a++)
                for (f = d; f <= g; f++) l.setColAttrb(a, f, "rowalign", e);
            break;
          case "colalign":
            if (k) {
              l.colalign = l.populateArrayAtttrbs(
                l.colalign,
                d,
                g,
                this.numcols,
                e,
                "center"
              );
              for (a = 0; a < this.numrows; a++)
                l.rows[a] = l.populateArrayAtttrbs(
                  l.rows[a],
                  d,
                  g,
                  this.numcols,
                  e,
                  "center"
                );
              for (f = d; f <= g; f++)
                for (a = 0; a < this.numrows; a++)
                  void 0 !== l.rows[a] &&
                    (l.rows[a].colalign &&
                      void 0 !== l.rows[a].colalign[f] &&
                      delete l.rows[a].colalign[f],
                    l.clearColAttrb(a, f, "colalign"));
            } else
              for (a = f; a <= b; a++)
                for (f = d; f <= g; f++) l.setColAttrb(a, f, "colalign", e);
            break;
          case "addframe":
            l.frame = this.editor.getPArrayLine();
            break;
          case "removeframe":
            l.frame = "none";
            break;
          case "addrowline":
            l.rowlines = l.populateArrayAtttrbs(
              l.rowlines,
              f,
              b,
              this.numrows,
              this.editor.getPArrayLine(),
              "none"
            );
            break;
          case "removerowline":
            l.rowlines = l.populateArrayAtttrbs(
              l.rowlines,
              f,
              b,
              this.numrows,
              "none",
              "none"
            );
            break;
          case "addcolline":
            l.collines = l.populateArrayAtttrbs(
              l.collines,
              d,
              g,
              this.numcols,
              this.editor.getPArrayLine(),
              "none"
            );
            break;
          case "removecolline":
            l.collines = l.populateArrayAtttrbs(
              l.collines,
              d,
              g,
              this.numcols,
              "none",
              "none"
            );
            break;
          case "setsolidline":
            this.editor.setPArrayLine("solid");
            break;
          case "setdashedline":
            this.editor.setPArrayLine("dashed");
            break;
          case "toggleequalrows":
            l.equalrows = l.equalrows && "true" == l.equalrows ? null : "true";
            break;
          case "toggleequalcols":
            l.equalcols = l.equalcols && "true" == l.equalcols ? null : "true";
            break;
          case "rowspacing":
            l.rowspacing = l.populateArrayAtttrbs(
              l.rowspacing,
              f,
              b,
              this.numrows,
              e,
              "1.0ex"
            );
            break;
          case "colspacing":
            l.colspacing = l.populateArrayAtttrbs(
              l.colspacing,
              d,
              g,
              this.numcols,
              e,
              "0.8em"
            );
        }
      },
      updateEditTabButtons: function (b) {
        etb = b.cursor.position.etb.parray;
        var a = etb.startIndex % this.numcols,
          e = Math.floor(etb.startIndex / this.numcols),
          d = "none";
        b = "none";
        d = this.info.infod.cells[e][a].rowalign;
        b = this.info.infod.cells[e][a].colalign;
        for (
          var a = etb.startIndex % this.numcols,
            e = Math.floor(etb.startIndex / this.numcols),
            g = etb.endIndex % this.numcols,
            f = Math.floor(etb.endIndex / this.numcols),
            h = document.querySelectorAll('[id^="PARRAY_ROW_ALIGN_"]'),
            k = "PARRAY_ROW_ALIGN_" + d.toUpperCase(),
            d = 0;
          d < h.length;
          d++
        ) {
          var l = h[d].id;
          l == k
            ? h[d].classList.add("efmase_palettebutton_select")
            : h[d].classList.remove("efmase_palettebutton_select");
        }
        h = document.querySelectorAll('[id^="PARRAY_COL_ALIGN_"]');
        k = "PARRAY_COL_ALIGN_" + b.toUpperCase();
        for (d = 0; d < h.length; d++)
          (l = h[d].id),
            l == k
              ? h[d].classList.add("efmase_palettebutton_select")
              : h[d].classList.remove("efmase_palettebutton_select");
        b = document.querySelectorAll('[id^="PARRAY_INS_DEL_"]');
        for (d = 0; d < b.length; d++)
          (h = (g - a + 1).toString()),
            -1 != b[d].id.indexOf("PARRAY_INS_DEL_ROW_") &&
              (h = (f - e + 1).toString()),
            (b[d].title = b[d].title.replace(/[0-9]+/, h)),
            (b[d].firstChild.alt = b[d].title.replace(/[0-9]+/, h)),
            (b[d].firstChild.title = b[d].title.replace(/[0-9]+/, h));
        b = document.getElementById("PARRAY_ROW_H_EQUAL");
        this.info.infod.equalrows
          ? b.classList.add("efmase_palettebutton_select")
          : b.classList.remove("efmase_palettebutton_select");
        b = document.getElementById("PARRAY_COL_W_EQUAL");
        this.info.infod.equalcols
          ? b.classList.add("efmase_palettebutton_select")
          : b.classList.remove("efmase_palettebutton_select");
      },
      getMathML: function () {
        var b = this.entries,
          a = this.info,
          e = "<mtable" + (a.in_attrbs ? a.in_attrbs : ""),
          e = e + (a.frame ? ' frame="' + a.frame + '"' : ""),
          e =
            e +
            (a.displaystyle ? ' displaystyle="' + a.displaystyle + '"' : ""),
          e = e + (a.side ? ' side="' + a.side + '"' : ""),
          e = e + (a.width ? ' width="' + a.width + '"' : ""),
          e = e + (a.groupalign ? ' groupalign="' + a.groupalign + '"' : ""),
          e =
            e +
            (a.alignmentscope
              ? ' alignmentscope="' + a.alignmentscope + '"'
              : ""),
          e = e + (a.colwidth ? ' columnwidth="' + a.colwidth + '"' : ""),
          e =
            e +
            (a.minlabelspacing
              ? ' minlabelspacing="' + a.minlabelspacing + '"'
              : ""),
          e = e + (a.equalrows ? ' equalrows="' + a.equalrows + '"' : ""),
          e = e + (a.equalcols ? ' equalcolumns="' + a.equalcols + '"' : "");
        if (a.align) {
          var d = a.align;
          a.alignrow && d + " " + a.alignrow.toString();
          e += ' align="' + d + '"';
        }
        a.vspacing && (e += ' framespacing="' + d + '"');
        for (
          var d = function (a, d, e) {
              var b = "";
              if (null !== a && void 0 !== a && a[d]) {
                for (var h = a[d][0], f = 1; f < a[d].length; f++)
                  h += " " + a[d][f];
                b += " " + e + '="' + h + '"';
              }
              return b;
            },
            e = e + d(a, "rowspacing", "rowspacing"),
            e = e + d(a, "rowlines", "rowlines"),
            e = e + d(a, "rowalign", "rowalign"),
            e = e + d(a, "colspacing", "columnspacing"),
            e = e + d(a, "collines", "columnlines"),
            e = e + d(a, "colalign", "columnalign"),
            e = e + ">",
            g = 0;
          g < b.length;
          g++
        ) {
          for (
            var e =
                e +
                ("<mtr" +
                  (a.rows[g].in_attrbs ? a.rows[g].in_attrbs : "") +
                  d(a.rows[g], "rowalign", "rowalign") +
                  d(a.rows[g], "colalign", "columnalign") +
                  (a.rows[g].groupalign
                    ? ' groupalign="' + a.rows[g].groupalign + '"'
                    : "") +
                  ">"),
              f = 0;
            f < b[g].length;
            f++
          )
            var h =
                "<mtd" +
                (a.rows[g].cols[f].in_attrbs
                  ? a.rows[g].cols[f].in_attrbs
                  : ""),
              h =
                h +
                (a.rows[g].cols[f].rowspan
                  ? ' rowspan="' + a.rows[g].cols[f].rowspan + '"'
                  : ""),
              h =
                h +
                (a.rows[g].cols[f].colspan
                  ? ' columnspan="' + a.rows[g].cols[f].colspan + '"'
                  : ""),
              h =
                h +
                (a.rows[g].cols[f].rowalign
                  ? ' rowalign="' + a.rows[g].cols[f].rowalign + '"'
                  : ""),
              h =
                h +
                (a.rows[g].cols[f].colalign
                  ? ' columnalign="' + a.rows[g].cols[f].colalign + '"'
                  : ""),
              h =
                h +
                (a.rows[g].cols[f].groupalign
                  ? ' groupalign="' + a.rows[g].cols[f].groupalign + '"'
                  : ""),
              h = h + ">",
              h = h + (b[g][f].getMathML() + "</mtd>"),
              e = e + ("<mtd><mrow/></mtd>" == h ? "<mtd/>" : h);
          e += "</mtr>";
        }
        return e + "</mtable>";
      },
      getAltText: function () {
        for (
          var b = org.imatheq.formulaeditor.FormulaEditor.getEditor(),
            a = this.entries,
            e = "",
            d = 0;
          d < a.length;
          d++
        ) {
          for (var g = "", f = 0; f < a[d].length; f++)
            g += b.altstrs.cell[
              a[d][f].children && 1 < a[d][f].children.length ? 1 : 0
            ].replace("$0$", a[d][f].getAltText().trim());
          g = b.altstrs.row.replace("$0$", g.trim());
          e += g;
        }
        return (e = b.altstrs.table.replace("$0$", e.trim()));
      },
      getSelectionMathML: function (b, a, e) {
        b = this.entries;
        var d = Math.floor(a / this.numcols),
          g = a % this.numcols,
          f = Math.floor(e / this.numcols),
          h = e % this.numcols;
        a = Math.min(d, f);
        e = Math.min(g, h);
        d = Math.max(d, f);
        g = Math.max(g, h);
        for (
          f = '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtable>';
          a <= d;
          a++
        ) {
          f += "<mtr>";
          for (h = e; h <= g; h++)
            (f += "<mtd>"), (f += b[a][h].getMathML()), (f += "</mtd>");
          f += "</mtr>";
        }
        return f + "</mtable></math>";
      },
      getMaxHeight: function (b) {
        for (var a = 0, e = 0, d = 0; d < this.numcols; d++)
          (a = Math.min(a, this.entries[b][d].dimensions.top)),
            (e = Math.max(
              e,
              this.entries[b][d].dimensions.top +
                this.entries[b][d].dimensions.height
            ));
        return { height: e - a, top: a, bottom: e };
      },
      getMaxWidth: function (b) {
        for (var a = 0, e = 0; e < this.numrows; e++)
          a = Math.max(a, this.entries[e][b].dimensions.width);
        return a;
      },
      draw: function (b, a, e, d, g) {
        var f,
          h = org.imatheq.formulaeditor.presentation;
        f = a.fontSizeModifier;
        this.editor.canvas.getFontSizeIdx(f);
        var k = b.getLinewidth(a.fontModifier),
          l = b.getMargin(a.fontModifier),
          m = 0,
          r = this.info,
          n = this.info.infod;
        "none" != n.frame
          ? ((n.vspacing =
              null === r.vspacing ? null : b.getPXSize(r.vspacing, f)),
            (n.vspacing =
              null === n.vspacing ? b.getPXSize("0.5ex", f) : n.vspacing),
            (n.hspacing =
              null === r.hspacing ? null : b.getPXSize(r.hspacing, f)),
            (n.hspacing =
              null === n.hspacing ? b.getPXSize("0.4em", f) : n.hspacing))
          : ((n.vspacing = l), (n.hspacing = l));
        n.rowspacing = [];
        for (var p = 0; p < this.numrows; p++)
          (n.rowspacing[p] =
            null === r.rowspacing || void 0 === r.rowspacing[p]
              ? null
              : b.getPXSize(r.rowspacing[p], f)),
            null === n.rowspacing[p] &&
              (n.rowspacing[p] =
                0 == p ? b.getPXSize("1.0ex", f) : n.rowspacing[p - 1]);
        n.colspacing = [];
        for (p = 0; p < this.numcols; p++)
          (n.colspacing[p] =
            null === r.colspacing || void 0 === r.colspacing[p]
              ? null
              : b.getPXSize(r.colspacing[p], f)),
            null === n.colspacing[p] &&
              (n.colspacing[p] =
                0 == p ? b.getPXSize("0.8em", f) : n.colspacing[p - 1]);
        for (f = 0; f < this.numrows; f++)
          for (r = 0; r < this.numcols; r++)
            this.entries[f][r] && this.entries[f][r].draw
              ? this.entries[f][r].draw(b, a, 0, 0, !0)
              : alert("PArray could not draw row:" + f + ", col:" + r + ".");
        r = 0;
        arrRowInfo = [];
        for (f = 0; f < this.numrows; f++)
          (arrRowInfo[f] = this.getMaxHeight(f)),
            n.equalrows && (r = Math.max(r, arrRowInfo[f].height));
        n.maxRowHeight = r;
        for (f = 0; f < this.numrows; f++) {
          var p = Math.max(r, arrRowInfo[f].height),
            t,
            q,
            u;
          0 === f
            ? ((u = 0),
              (t = u + arrRowInfo[f].top - (p - arrRowInfo[f].height) / 2),
              (q = t + p / 2),
              (m += p + n.vspacing + l))
            : ((t =
                n.rows[f - 1].top + n.rows[f - 1].height + n.rowspacing[f - 1]),
              (q = t + p / 2),
              (u = t - arrRowInfo[f].top + (p - arrRowInfo[f].height) / 2),
              (m += p + n.rowspacing[f - 1]));
          n.rows[f].height = p;
          n.rows[f].top = t;
          n.rows[f].center = q;
          n.rows[f].baseline = u;
        }
        m += n.vspacing + l;
        f = new h.Symbol("x").draw(b, a, e, d, !0);
        r =
          Math.round((m - 2 * n.vspacing - 2 * l) / 2) +
          n.rows[0].top +
          Math.round(0.6 * f.height - 0.5);
        for (f = 0; f < this.numrows; f++)
          (n.rows[f].top -= r),
            (n.rows[f].center -= r),
            (n.rows[f].baseline -= r);
        f = h = 0;
        arrColInfo = [];
        for (r = 0; r < this.numcols; r++)
          (arrColInfo[r] = this.getMaxWidth(r)),
            n.equalcols && (f = Math.max(f, arrColInfo[r]));
        for (r = 0; r < this.numcols; r++)
          (p = Math.max(f, arrColInfo[r])),
            0 === r
              ? ((colCenter = p / 2 + n.hspacing + l),
                (h += p + n.hspacing + l))
              : ((colCenter =
                  n.cols[r - 1].center +
                  n.cols[r - 1].width / 2 +
                  n.colspacing[r - 1] +
                  p / 2),
                (h += p + n.colspacing[r - 1] + l)),
            (n.cols[r].left = colCenter - p / 2),
            (n.cols[r].width = p),
            (n.cols[r].center = colCenter);
        h += n.hspacing;
        n.framedim = {
          left: e + l,
          top: d + n.rows[0].top - n.vspacing,
          width: h - 2 * l,
          height: m - 2 * l,
        };
        if (!g) {
          for (f = 0; f < this.numrows; f++) {
            for (r = 0; r < this.numcols; r++) {
              p = this.entries[f][r];
              t = p.dimensions.width;
              u = p.dimensions.height;
              var v = p.dimensions.top;
              q = d + n.rows[f].baseline;
              var y = n.rows[f].baseline + v;
              switch (n.cells[f][r].rowalign) {
                case "top":
                  var A = n.rows[f].top;
                  q -= y - A;
                  break;
                case "bottom":
                  A = n.rows[f].top + n.rows[f].height - u;
                  q += A - y;
                  n.rows[f].top + n.rows[f].height - v - u;
                  break;
                case "center":
                  (A = n.rows[f].center - u / 2), (q += A - y);
              }
              u = e + n.cols[r].center - t / 2;
              v = n.cells[f][r].colalign;
              "left" == v
                ? (u = e + n.cols[r].left)
                : "right" == v &&
                  (u = e + n.cols[r].left + n.cols[r].width - t);
              p.draw(b, a, u, q, g);
              f == this.numrows - 1 &&
                "none" != n.collines[r] &&
                ((p = b.getContext()),
                (t =
                  e + n.cols[r].left + n.cols[r].width + n.colspacing[r] / 2),
                p.save(),
                "dashed" == n.collines[r] && p.setLineDash([5, 3]),
                (p.strokeStyle = this.mathcolor),
                (p.lineWidth = k),
                p.beginPath(),
                p.moveTo(t, n.framedim.top),
                p.lineTo(t, n.framedim.top + n.framedim.height - k),
                p.stroke(),
                p.closePath(),
                p.restore());
            }
            "none" != n.rowlines[f] &&
              ((p = b.getContext()),
              (r = d + n.rows[f].top + n.rows[f].height + n.rowspacing[f] / 2),
              p.save(),
              "dashed" == n.rowlines[f] && p.setLineDash([5, 3]),
              (p.strokeStyle = this.mathcolor),
              (p.lineWidth = k),
              p.beginPath(),
              p.moveTo(n.framedim.left, r),
              p.lineTo(n.framedim.left + n.framedim.width - k, r),
              p.stroke(),
              p.closePath(),
              p.restore());
          }
          "none" != n.frame &&
            this.editor.canvas.drawBox(
              n.framedim,
              this.mathcolor,
              k,
              null,
              null,
              "dashed" == n.frame ? [5, 3] : null
            );
        }
        return (this.dimensions = {
          top: d + n.rows[0].top - n.vspacing - l,
          left: e,
          width: h,
          height: m,
        });
      },
      getCoordinatesFromPosition: function (b, a) {
        var e, d;
        for (
          e = 0;
          e < this.numrows - 1 &&
          a >
            this.entries[e][0].dimensions.top -
              (this.info.infod.rows[e].height -
                this.entries[e][0].dimensions.height) /
                2 +
              this.info.infod.rows[e].height;

        )
          e++;
        for (
          d = 0;
          d < this.numcols - 1 &&
          b >
            this.dimensions.left +
              this.info.infod.cols[d].left +
              this.info.infod.cols[d].width;

        )
          d++;
        return { row: e, col: d };
      },
      getEntryFromPosition: function (b, a) {
        var e = this.getCoordinatesFromPosition(b, a);
        return this.entries[e.row][e.col];
      },
      getCursorPosition: function (b, a, e) {
        return a > this.dimensions.left &&
          a < this.dimensions.left + this.dimensions.width - 1
          ? this.getEntryFromPosition(a, e).getCursorPosition(b, a, e)
          : a <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getFollowingCursorPosition: function (b, a, e) {
        var d = null,
          g;
        if (!0 === b.continuingNavigation)
          return (
            null === a || void 0 === a
              ? (d = this.children[0].getFollowingCursorPosition(b, null, e))
              : a + 1 < this.children.length &&
                (d = this.children[a + 1].getFollowingCursorPosition(
                  b,
                  null,
                  e
                )),
            (null !== d && void 0 !== d) ||
              null === this.parent ||
              (d = this.parent.getFollowingCursorPosition(b, this.index, !1)),
            d
          );
        if (null === a || void 0 === a) {
          for (
            g = middle = Math.floor(this.numrows / 2);
            null === d && 0 <= g && g < this.numrows;

          )
            (d = this.entries[g][0].getFollowingCursorPosition(b, null, e)),
              (g = g >= middle ? 2 * middle - g - 1 : 2 * middle - g);
          return d;
        }
        g = Math.floor(a / this.numcols);
        a %= this.numcols;
        a + 1 < this.numcols &&
          (d = this.entries[g][a + 1].getFirstCursorPosition(b, null, e));
        (null !== d && void 0 !== d) ||
          null === this.parent ||
          (d = this.parent.getFollowingCursorPosition(b, this.index, !1));
        return d;
      },
      getPrecedingCursorPosition: function (b, a, e) {
        var d = null,
          g = null,
          f = null;
        if (!0 === b.continuingNavigation)
          return (
            null === a || void 0 === a
              ? 0 < this.children.length &&
                (d = this.children[
                  this.children.length - 1
                ].getPrecedingCursorPosition(b, null, e))
              : 0 < a &&
                (d = this.children[a - 1].getPrecedingCursorPosition(
                  b,
                  null,
                  e
                )),
            (null !== d && void 0 !== d) ||
              null === this.parent ||
              (d = this.parent.getPrecedingCursorPosition(b, this.index, !1)),
            d
          );
        if (null === a || void 0 === a) {
          for (
            g = a = Math.floor(this.numrows / 2);
            null === d && 0 <= g && g < this.numrows;

          )
            (f = this.entries[g].length - 1),
              (d = this.entries[g][f].getPrecedingCursorPosition(b, null, e)),
              (g = g >= a ? 2 * a - g - 1 : 2 * a - g);
          return d;
        }
        0 < a &&
          ((g = Math.floor(a / this.numcols)),
          (f = a % this.numcols),
          0 < f &&
            (d = this.entries[g][f - 1].getLastCursorPosition(b, null, e)));
        (null !== d && void 0 !== d) ||
          null === this.parent ||
          (d = this.parent.getPrecedingCursorPosition(b, this.index, !1));
        return d;
      },
      getLowerCursorPosition: function (b, a, e, d) {
        if (null === a || void 0 === a)
          return this.entries[0][0].getLowerCursorPosition(b, null, e, d);
        var g = Math.floor(a / this.numcols);
        a %= this.numcols;
        var f;
        g + 1 < this.numrows &&
          (f = this.entries[g + 1][a].getLowerCursorPosition(b, null, e, d));
        (null !== f && void 0 !== f) ||
          null === this.parent ||
          (f = this.parent.getLowerCursorPosition(b, this.index, e, d));
        return f;
      },
      getHigherCursorPosition: function (b, a, e, d) {
        if (null === a || void 0 === a)
          return this.entries[0][this.numrows - 1].getHigherCursorPosition(
            b,
            null,
            e,
            d
          );
        if (a < this.children.length) {
          var g = Math.floor(a / this.numcols);
          a %= this.numcols;
          var f;
          0 < g &&
            (f = this.entries[g - 1][a].getHigherCursorPosition(b, null, e, d));
          (null !== f && void 0 !== f) ||
            null === this.parent ||
            (f = this.parent.getHigherCursorPosition(b, this.index, e, d));
          return f;
        }
        return null;
      },
      copy: function () {
        parray = this.clone.apply(this, this.copyArray(this.entries));
        parray.info = this.info.copy(this.numrows, this.numcols);
        return parray;
      },
    }
  );
})();
(function () {
  var b = com.efmase.js.utilities.toolset;
  org.imatheq.formulaeditor.presentation.PArray.Info = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      align: null,
      alignrow: null,
      spacing: null,
      frame: null,
      displaystyle: null,
      side: null,
      width: null,
      groupalign: null,
      alignmentscope: null,
      colwidth: null,
      minlabelspacing: null,
      rowspacing: null,
      rowlines: null,
      rowalign: null,
      equalrows: null,
      colspacing: null,
      collines: null,
      colalign: null,
      equalcols: null,
      rows: null,
      cols: null,
      infod: null,
      in_attrbs: null,
      initialize: function () {
        var a = org.imatheq.formulaeditor.presentation;
        if (1 == arguments.length && arguments[0] instanceof a.PArray)
          for (
            a = arguments[0], this.rows = [], row = 0;
            row < a.numrows;
            row++
          )
            for (
              this.rows[row] = {
                rowalign: null,
                colalign: null,
                groupalign: null,
                cols: [],
              },
                col = 0;
              col < a.numcols;
              col++
            )
              this.rows[row].cols[col] = {
                rowspan: null,
                colspan: null,
                rowalign: null,
                colalign: null,
                groupalign: null,
              };
        else if (1 == arguments.length) {
          a = arguments[0];
          this.in_attrbs = b.getInputAttrbs(a);
          var e = /s*(true|false)s*/,
            d = a.getAttribute("align"),
            g = /s*(top|bottom|center|baseline|axis)(s+-?[0-9]+)?s*/;
          d &&
            g.test(d) &&
            ((d = d.split(/\s+/)),
            (this.align = d[0]),
            (this.alignrow = 1 < arrAlign.length ? parseInt(arrAlign[1]) : 0));
          (d = a.getAttribute("frame")) &&
            /s*(none|solid|dashed)s*/.test(d) &&
            (this.frame = d);
          a.getAttribute("framespacing") &&
            ((d = fspacing.split(/\s+/)),
            (this.hspacing = arrFSpacing[0]),
            (this.vspacing = 0 < d.length ? arrFSpacing[1] : null));
          (d = a.getAttribute("displaystyle")) &&
            e.test(d) &&
            (this.displaystyle = d);
          d = a.getAttribute("side");
          g = /s*(left|right|leftoverlap|rightoverlap)s*/;
          d && g.test(d) && (this.side = d);
          d = parseInt(a.getAttribute("width"));
          isNaN(d) || (this.width = d);
          this.groupAlign = a.getAttribute("groupalign");
          this.alignmentscope = a.getAttribute("alignmentscope");
          this.colwidth = a.getAttribute("columnwidth");
          this.width = a.getAttribute("width");
          this.minLabelSpacing = a.getAttribute("minlabelspacing");
          (d = a.getAttribute("rowspacing")) &&
            "" != d.trim() &&
            (this.rowspacing = d.trim().split(/\s+/));
          (d = a.getAttribute("columnspacing")) &&
            "" != d.trim() &&
            (this.colspacing = d.trim().split(/\s+/));
          d = /s*(none|solid|dashed)s*(s+(none|solid|dashed)s*)*/;
          (g = a.getAttribute("rowlines")) &&
            d.test(g) &&
            (this.rowlines = g.trim().split(/\s+/));
          (g = a.getAttribute("columnlines")) &&
            d.test(g) &&
            (this.collines = g.trim().split(/\s+/));
          d = a.getAttribute("rowalign");
          g =
            /s*(top|bottom|center|baseline|axis)s*(s+(top|bottom|center|baseline|axis)s*)*/;
          d && g.test(d) && (this.rowalign = d.trim().split(/\s+/));
          d = a.getAttribute("columnalign");
          g = /s*(left|center|right)s*(s+(left|center|right)s*)*/;
          d && g.test(d) && (this.colalign = d.trim().split(/\s+/));
          (d = a.getAttribute("equalrows")) &&
            e.test(d) &&
            (this.equalrows = d.trim());
          (d = a.getAttribute("equalcolumns")) &&
            e.test(d) &&
            (this.equalcols = d.trim());
          e = a.childNodes.length;
          for (row = d = 0; row < e; row++)
            for (
              g = a.childNodes.item(row),
                this.setRowAttrbs(row, g),
                d = Math.max(d, g.childNodes.length),
                col = 0;
              col < g.childNodes.length;
              col++
            ) {
              var f = g.childNodes.item(col);
              this.setColAttrbs(row, col, f);
            }
          this.populateData(e, d);
        } else
          1 < arguments.length &&
            ((this.rows = arguments[0]),
            (this.cols = arguments[1]),
            (this.rowspacing = arguments[2]),
            (this.colspacing = arguments[3]),
            (this.rowlines = arguments[4]),
            (this.collines = arguments[5]),
            (this.rowalign = arguments[6]),
            (this.colalign = arguments[7]),
            this.populateData(e, d));
      },
      setRowAttrbs: function (a, e) {
        this.rows || (this.rows = []);
        void 0 === this.rows[a] &&
          (this.rows[a] = {
            rowalign: null,
            colalign: null,
            groupalign: null,
            in_attrbs: null,
            cols: [],
          });
        this.rows[a].in_attrbs = b.getInputAttrbs(e);
        var d = e.getAttribute("rowalign"),
          g = /s*(top|bottom|center|baseline|axis)s*/;
        d && g.test(d) && (this.rows[a].rowalign = d.trim());
        d = e.getAttribute("columnalign");
        g = /s*(left|center|right)s*(s+(left|center|right)s*)*/;
        d && g.test(d) && (this.rows[a].colalign = d.split(/\s+/));
        this.rows[a].groupAlign = e.getAttribute("groupalign");
      },
      setColAttrbs: function (a, e, d) {
        this.rows || (this.rows = []);
        void 0 === this.rows[a] &&
          (this.rows[a] = {
            rowalign: null,
            colalign: null,
            groupalign: null,
            cols: [],
          });
        var g = this.rows[a].cols;
        void 0 === g[e] &&
          (g[e] = {
            rowspan: null,
            colspan: null,
            rowalign: null,
            colalign: null,
            groupalign: null,
            in_attrbs: null,
          });
        if (d) {
          g[e].in_attrbs = b.getInputAttrbs(d);
          var f = parseInt(d.getAttribute("rowspan"));
          isNaN(f) || (g[e].rowspan = f);
          f = parseInt(d.getAttribute("colspan"));
          isNaN(f) || (g[e].colspan = f);
          var f = d.getAttribute("rowalign"),
            h = /s*(top|bottom|center|baseline|axis)s*/;
          f && h.test(f) && (g[e].rowalign = f.trim());
          f = d.getAttribute("columnalign");
          h = /s*(left|center|right)s*/;
          f && h.test(f) && (g[e].colalign = f.trim());
          this.rows[a].groupAlign = d.getAttribute("groupalign");
        }
      },
      mergeArrayAtttrbs: function (a, e) {
        for (var d = a.length, b = a[d - 1], d = d - 2; 0 <= d; d--)
          a[d] == b && a.splice(-1, 1);
        if (0 == a.length || (1 == a.length && a[0] == e)) a = null;
        return a;
      },
      populateArrayAtttrbs: function (a, e, d, b, f, h) {
        a || (a = []);
        for (var k = a.length; k < e; k++)
          a[k] = 0 == a.length ? h : a[a.length - 1];
        d + 1 >= a.length &&
          d + 1 < b &&
          (a[d + 1] = 0 == a.length ? h : a[a.length - 1]);
        for (k = e; k <= d; k++) a[k] = f;
        a && (a = this.mergeArrayAtttrbs(a, h));
        return a;
      },
      insertArrayAtttrbs: function (a, e, d, b, f) {
        var h = "behind" == b ? d + 1 : e;
        if (!a) return null;
        b = "behind" == b ? a[d] : a[e];
        if (null === b || void 0 === b) return a;
        e = d - e + 1;
        if ("object" != typeof b) {
          for (d = 0; d < e; d++) a.splice(h, 0, b);
          a && (a = this.mergeArrayAtttrbs(a, f));
        } else
          for (d = 0; d < e; d++) (f = this.copyObject(b)), a.splice(h, 0, f);
        return a;
      },
      deleteArrayAtttrbs: function (a, e, d, b, f, h) {
        if (!a) return null;
        var k = !1;
        if (f && d < b - 1 && a[e] && void 0 !== a[e] && void 0 === a[d])
          for (k = !0, b = d; b >= e; b--)
            if (k && void 0 !== a[b]) {
              a[d + 1] = this.copyObject(a[b]);
              break;
            }
        a.splice(e, d - e + 1);
        f && (a = this.mergeArrayAtttrbs(a, h));
        return a;
      },
      populateData: function (a, e) {
        this.infod || (this.infod = {});
        var d = this.infod;
        d.frame = "none";
        if ("solid" == this.frame || "dashed" == this.frame)
          d.frame = this.frame;
        d.equalrows = !1;
        "true" == this.equalrows && (d.equalrows = !0);
        d.equalcols = !1;
        "true" == this.equalcols && (d.equalcols = !0);
        var b = function (a, d, e, b) {
          return d && 0 != d.length ? (d[a] ? d[a] : e[a - 1]) : b;
        };
        d.rowlines = [];
        d.rows = [];
        for (var f = [], h = 0; h < a; h++)
          (d.rows[h] = {}),
            (d.rowlines[h] =
              h == a - 1 ? "none" : b(h, this.rowlines, d.rowlines, "none")),
            (f[h] = b(h, this.rowalign, f, "baseline"));
        d.collines = [];
        d.cols = [];
        for (var k = [], h = 0; h < e; h++)
          (d.cols[h] = {}),
            (d.collines[h] =
              h == e - 1 ? "none" : b(h, this.collines, d.collines, "none")),
            (k[h] = b(h, this.colalign, k, "center"));
        d.cells = [];
        for (h = 0; h < a; h++)
          for (
            this.rows &&
              void 0 !== this.rows[h] &&
              null !== this.rows[h].rowalign &&
              void 0 !== this.rows[h].rowalign &&
              (f[h] = this.rows[h].rowalign),
              d.cells[h] = [],
              b = 0;
            b < e;
            b++
          )
            d.cells[h][b] =
              this.rows &&
              void 0 !== this.rows[h] &&
              null !== this.rows[h].colalign &&
              void 0 !== this.rows[h].colalign[b]
                ? { colalign: this.rows[h].colalign[b] }
                : { colalign: k[b] };
        for (h = 0; h < a; h++)
          for (b = 0; b < e; b++)
            (d.cells[h][b].rowalign =
              this.rows &&
              void 0 !== this.rows[h] &&
              this.rows[h].cols &&
              this.rows[h].cols[b] &&
              void 0 !== this.rows[h].cols[b] &&
              null !== this.rows[h].cols[b].rowalign &&
              void 0 !== this.rows[h].cols[b].rowalign
                ? this.rows[h].cols[b].rowalign
                : f[h]),
              this.rows &&
                void 0 !== this.rows[h] &&
                this.rows[h].cols &&
                this.rows[h].cols[b] &&
                void 0 !== this.rows[h].cols[b] &&
                null !== this.rows[h].cols[b].colalign &&
                void 0 !== this.rows[h].cols[b].colalign &&
                (d.cells[h][b].colalign = this.rows[h].cols[b].colalign);
      },
      setColAttrb: function (a, e, d, b) {
        void 0 === this.rows[a] &&
          (this.rows[a] = {
            rowalign: null,
            colalign: null,
            groupalign: null,
            cols: [],
          });
        a = this.rows[a].cols;
        void 0 === a[e] &&
          (a[e] = {
            rowspan: null,
            colspan: null,
            rowalign: null,
            colalign: null,
            groupalign: null,
          });
        switch (d) {
          case "rowalign":
            d = /s*(top|bottom|center|baseline|axis)s*/;
            b && d.test(b)
              ? (a[e].rowalign = b.trim())
              : (a[e].rowalign = null);
            break;
          case "colalign":
            d = /s*(left|center|right)s*/;
            b && d.test(b)
              ? (a[e].colalign = b.trim())
              : (a[e].colalign = null);
            break;
          case "rowspan":
            b = parseInt(b);
            isNaN(b) ? (a[e].rowspan = null) : (a[e].rowspan = b);
            break;
          case "colspan":
            b = parseInt(b);
            isNaN(b) ? (a[e].colspan = null) : (a[e].colspan = b);
            break;
          case "groupalign":
            a[e].groupalign = b;
        }
      },
      clearColAttrb: function (a, b, d) {
        if (
          void 0 !== this.rows[a] &&
          ((a = this.rows[a].cols), void 0 !== a[b])
        )
          switch (d) {
            case "rowalign":
              a[b].rowalign = null;
              break;
            case "colalign":
              a[b].colalign = null;
              break;
            case "rowspan":
              a[b].rowspan = null;
              break;
            case "colspan":
              a[b].colspan = null;
              break;
            case "groupalign":
              a[b].groupalign = value;
          }
      },
      copyObject: function (a) {
        "function" != typeof Object.assign &&
          (Object.assign = function (a, d) {
            if (null == a)
              throw new TypeError("Cannot convert undefined or null to object");
            for (var b = Object(a), e = 1; e < arguments.length; e++) {
              var l = arguments[e];
              if (null != l)
                for (var m in l)
                  Object.prototype.hasOwnProperty.call(l, m) && (b[m] = l[m]);
            }
            return b;
          });
        if (null === a) return null;
        if ("object" != typeof a) return a;
        var b = null;
        if (Array.isArray(a))
          for (var b = [], d = 0; d < a.length; d++)
            b[d] = this.copyObject(a[d]);
        else
          for (d in ((b = Object.assign({}, a)), a))
            Object.prototype.hasOwnProperty.call(a, d) &&
              null !== a[d] &&
              "object" == typeof a[d] &&
              (b[d] = this.copyObject(a[d]));
        return b;
      },
      copy: function (a, b) {
        var d = this.clone();
        for (prop in this)
          !Object.prototype.hasOwnProperty.call(this, prop) ||
            this[prop] instanceof Function ||
            "children" == prop ||
            "infod" == prop ||
            (d[prop] = this.copyObject(this[prop]));
        d.populateData(a, b);
        return d;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.PseudoRow = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      draw: null,
      functionsFromRow:
        "getFirstCursorPosition getFollowingCursorPosition getPrecedingCursorPosition getLastCursorPosition getLowerCursorPosition getHigherCursorPosition draw isEmpty getMathML insert replace remove".split(
          " "
        ),
      initialize: function () {
        this.children = Array.prototype.slice.call(arguments);
        for (
          var b = new org.imatheq.formulaeditor.presentation.Row(),
            a = this.functionsFromRow.length - 1;
          0 <= a;
          a--
        )
          this[this.functionsFromRow[a]] ||
            (this[this.functionsFromRow[a]] = b[this.functionsFromRow[a]]);
        this.updateChildren();
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Enclose = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      notations: ["longdiv"],
      children: null,
      margin: {
        box: { l: 5, t: 5, r: 5, b: 5 },
        circle: { l: 1, t: 1, r: 0, b: 0 },
        horizontalstrike: { l: 3, t: 0, r: 3, b: 0 },
        updiagonalstrike: { l: 1, t: 2, r: 1, b: 2 },
        downdiagonalstrike: { l: 1, t: 2, r: 1, b: 2 },
      },
      border_color: "#000000",
      lineWidth: 1,
      slowDelete: !0,
      initialize: function () {
        this.children = 0 == arguments.length ? [] : [arguments[0]];
        1 < arguments.length && (this.notations = arguments[1]);
        2 < arguments.length && (this.mathcolor = arguments[2]);
        this.updateChildren();
      },
      draw: function (b, a, e, d, g) {
        for (
          var f = org.imatheq.formulaeditor.presentation,
            h = e,
            k = d,
            l = e,
            m = d,
            r = null,
            n = 0;
          n < this.notations.length;
          n++
        ) {
          var p = this.margin[this.notations[n]];
          1 == this.children[0].children.length &&
            this.children[0].children[0] instanceof f.Enclose &&
            (p =
              1 == this.children[0].children[0].notations.length &&
              "horizontalstrike" == this.children[0].children[0].notations[0]
                ? {
                    l: 1,
                    t: this.margin[this.notations[n]].t,
                    r: 1,
                    b: this.margin[this.notations[n]].b,
                  }
                : { l: 1, t: 1, r: 1, b: 1 });
          switch (this.notations[n]) {
            case "box":
              r = this.drawBox(b, a, p, e, d, g);
              break;
            case "circle":
              r = this.drawCircle(b, a, p, e, d, g);
              break;
            case "horizontalstrike":
              r = this.drawHStrike(b, a, p, e, d, g);
              break;
            case "updiagonalstrike":
              r = this.drawSlash(b, a, p, e, d, g);
              break;
            case "downdiagonalstrike":
              r = this.drawBackslash(b, a, p, e, d, g);
          }
          h = Math.min(h, r.left);
          k = Math.min(k, r.top);
          l = Math.max(l, r.left + r.width);
          m = Math.max(m, r.top + r.height);
        }
        return { left: h, top: k, width: l - h, height: m - k };
      },
      drawBox: function (b, a, e, d, g, f) {
        var h = this.children[0].draw(b, a, 0, 0, !0);
        this.dimensions = {
          height:
            this.children[0].dimensions.height + e.t + e.b + this.lineWidth,
          width: this.children[0].dimensions.width + e.l + e.r + this.lineWidth,
          left: h.left + d,
          top: h.top + g - e.t,
        };
        f ||
          (b.drawBox(this.dimensions, this.mathcolor, this.lineWidth),
          this.children[0].draw(b, a, d + e.l, g, !1));
        return this.dimensions;
      },
      drawSlash: function (b, a, e, d, g, f) {
        var h = this.children[0].draw(b, a, 0, 0, !0);
        this.dimensions = {
          height: this.children[0].dimensions.height + e.t + e.b,
          width: this.children[0].dimensions.width + e.l + e.r,
          left: h.left + d,
          top: h.top + g - e.t,
        };
        f ||
          (b.drawSlash(this.dimensions, this.mathcolor, this.lineWidth),
          this.children[0].draw(b, a, d + e.l, g, !1));
        return this.dimensions;
      },
      drawBackslash: function (b, a, e, d, g, f) {
        var h = this.children[0].draw(b, a, 0, 0, !0);
        this.dimensions = {
          height: this.children[0].dimensions.height + e.t + e.b,
          width: this.children[0].dimensions.width + e.l + e.r,
          left: h.left + d,
          top: h.top + g - e.t,
        };
        f ||
          (b.drawBackslash(this.dimensions, this.mathcolor, this.lineWidth),
          this.children[0].draw(b, a, d + e.l, g, !1));
        return this.dimensions;
      },
      drawHStrike: function (b, a, e, d, g, f) {
        var h = this.children[0].draw(b, a, 0, 0, !0);
        this.dimensions = {
          height: this.children[0].dimensions.height,
          width: this.children[0].dimensions.width + e.l + e.r,
          left: h.left + d,
          top: h.top + g,
        };
        f ||
          (this.children[0].draw(b, a, d + e.l, g, !1),
          b.drawHStrike(this.dimensions, this.mathcolor, this.lineWidth));
        return this.dimensions;
      },
      drawCircle: function (b, a, e, d, g, f) {
        var h = this.children[0].draw(b, a, 0, 0, !0),
          h = {
            left: h.left,
            top: h.top - e.t,
            width: h.width + e.l + e.r,
            height: h.height + e.t + e.b,
          },
          k = Math.round((0.414 * h.width) / 2),
          l = Math.round((0.414 * h.height) / 2);
        this.dimensions = {
          left: d + h.left,
          top: g + h.top - l,
          width: h.width + 2 * k + this.lineWidth,
          height: h.height + 2 * l + this.lineWidth,
        };
        f ||
          ((h = this.children[0].draw(b, a, d + k + e.l, g, !1)),
          (h = {
            left: h.left - e.l,
            top: h.top - e.t,
            width: h.width + e.l + e.r,
            height: h.height + e.t + e.b,
          }),
          (this.dimensions = b.drawCircle(h, this.mathcolor, this.lineWidth)));
        return this.dimensions;
      },
      getFirstCursorPosition: function (b, a, e) {
        return this.getFollowingCursorPosition(b, null, e);
      },
      getLastCursorPosition: function (b, a, e) {
        return this.getPrecedingCursorPosition(b, null, e);
      },
      getFollowingCursorPosition: function (b, a, e) {
        if (null === e || void 0 === e) e = !0;
        var d = this.children[0];
        if (null === a || void 0 === a)
          return d.getFollowingCursorPosition(b, null, e);
        if (null !== this.parent)
          return this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getPrecedingCursorPosition: function (b, a, e) {
        if (null === e || void 0 === e) e = !0;
        var d = this.children[0];
        if (null === a || void 0 === a)
          return d.getPrecedingCursorPosition(b, null, e);
        d = null;
        if (1 == a)
          if (e) d = this.children[0].getLastCursorPosition(b, null, e);
          else
            return {
              row: this.children[0],
              index: this.children[0].children.length,
            };
        return null === d && null !== this.parent
          ? { row: this.parent, index: this.index }
          : d;
      },
      getCursorPosition: function (b, a, e) {
        return a > this.dimensions.left &&
          a < this.dimensions.left + this.dimensions.width - 1
          ? a < (this.dimensions.left + this.children[0].dimensions.left) / 2
            ? { row: this.parent, index: this.index }
            : this.children[0].getCursorPosition(b, a, e)
          : a <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getLowerCursorPosition: function (b, a, e, d) {
        if (null === d || void 0 === d) d = !0;
        return null === a || void 0 === a
          ? this.children[0].getLowerCursorPosition(b, null, e, d)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(b, this.index, e, !1)
          : null;
      },
      getHigherCursorPosition: function (b, a, e, d) {
        if (null === d || void 0 === d) d = !0;
        return null === a || void 0 === a
          ? this.children[0].getHigherCursorPosition(b, null, e, d)
          : null !== this.parent
          ? this.parent.getHigherCursorPosition(b, this.index, e, !1)
          : null;
      },
      copy: function () {
        return this.clone(this.children[0].copy(), this.notations);
      },
      getMathML: function () {
        return (
          '<menclose notation="' +
          this.notations.join(" ") +
          '"' +
          (this.in_attrbs ? this.in_attrbs : "") +
          (null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"') +
          ">" +
          this.children[0].getMathML() +
          "</menclose>"
        );
      },
      getAltText: function () {
        for (
          var b = org.imatheq.formulaeditor.FormulaEditor.getEditor(),
            a = "",
            e = "strike",
            d = 0;
          d < this.notations.length;
          d++
        ) {
          if ("box" == this.notations[d] || "circle" == this.notations[d])
            e = "enclose";
          a += b.getSymbolAltText(this.notations[d]);
        }
        d =
          this.children[0].children && 1 < this.children[0].children.length
            ? 1
            : 0;
        return b.altstrs[e][d]
          .replace("$0$", a.trim())
          .replace("$1$", this.children[0].getAltText().trim());
      },
    }
  );
})();
$package("org.imatheq.formulaeditor.parsing.mathml");
(function () {
  var b = com.efmase.js.utilities.toolset;
  org.imatheq.formulaeditor.parsing.mathml.MathMLParser = $extend(
    org.imatheq.formulaeditor.parsing.xml.XMLParser,
    {
      name: "MathMLParser",
      handlemath: function (a, e) {
        new org.imatheq.formulaeditor.Options().getOption(
          "stretchMOBrackets"
        ) && this.ConvertMOsToMfenced(a, 0, 1);
        org.imatheq.formulaeditor.FormulaEditor.getEditor().in_attrbs =
          b.getInputAttrbs(a);
        return this.handlelines(a, e);
      },
      handleTextNode: function (a, e, d) {
        var g = org.imatheq.formulaeditor.presentation,
          f = "",
          h = b.getInputAttrbs(a, "token");
        if (null !== a.firstChild) f = "" + a.firstChild.nodeValue;
        else return null;
        var k = f.charAt(0);
        e = [];
        var l,
          m =
            null === a.getAttribute("lspace") ? null : a.getAttribute("lspace"),
          r =
            null === a.getAttribute("rspace") ? null : a.getAttribute("rspace"),
          n = "mtext" == a.localName.toLowerCase();
        l = a.getAttribute("mathvariant");
        var p = a.getAttribute("mathcolor"),
          t = !1,
          q = !1,
          u = !1,
          v = "mo" == a.localName.toLowerCase(),
          k = void 0 !== org.imatheq.formulaeditor.parsing.expression.MOList[k],
          y = "mn" == a.localName.toLowerCase(),
          A = "mi" == a.localName.toLowerCase(),
          C = !1,
          z = !1,
          w = !1;
        a.getAttribute("accent");
        var D = (A || v || y) && 1 < f.length,
          A = D ? "" : null;
        null === l && (l = "");
        switch (l) {
          case "":
            w = n || v || y || D || k ? null : "auto";
            break;
          case "bold":
            C = !0;
            break;
          case "italic":
            z = !0;
            break;
          case "bold-italic":
            C = !0;
            D ? (z = !0) : (w = "auto");
            break;
          case "double-struck":
            t = !0;
            A = null;
            D = !1;
            break;
          case "script":
            q = !0;
            w = "auto";
            A = null;
            D = !1;
            break;
          case "bold-script":
            C = q = !0;
            w = "auto";
            A = null;
            D = !1;
            break;
          case "fraktur":
            u = !0;
            A = null;
            D = !1;
            break;
          case "bold-fraktur":
            (u = !0), (A = null), (D = !1), (C = !0);
        }
        arrCh = [];
        for (l = 0; l < f.length; l++) {
          var k = f.charAt(l),
            B =
              org.imatheq.formulaeditor.parsing.expression.RevList[
                f.slice(l, l + 2)
              ];
          l + 1 < f.length && void 0 !== B && (k = f.slice(l, ++l + 1));
          if (
            void 0 === org.imatheq.formulaeditor.presentation.SymbolAliases[k]
          ) {
            B = org.imatheq.formulaeditor.parsing.expression.RevList[k];
            if (void 0 !== B) {
              !q && C && "script" == B.type && (q = !0);
              !u && C && "fraktur" == B.type && (u = !0);
              if ("bold-script" == B.type || "bold-fraktur" == B.type)
                (k = B.non_bold), (C = !0);
              if ("bold-script" == B.type || "script" == B.type) italic = !0;
            }
            t &&
              void 0 !==
                org.imatheq.formulaeditor.parsing.expression.DoubleStruckList[
                  k
                ] &&
              (k =
                org.imatheq.formulaeditor.parsing.expression.DoubleStruckList[
                  k
                ]);
            q &&
              void 0 !==
                org.imatheq.formulaeditor.parsing.expression.ScriptList[k] &&
              (k = org.imatheq.formulaeditor.parsing.expression.ScriptList[k]);
            u &&
              void 0 !==
                org.imatheq.formulaeditor.parsing.expression.FrakturList[k] &&
              (k = org.imatheq.formulaeditor.parsing.expression.FrakturList[k]);
            " " == k
              ? arrCh.push([" ", null, null, null])
              : arrCh.push([k, C, q, u]);
            void 0 !== org.imatheq.formulaeditor.parsing.expression.MOList[k] &&
              ((D = !1), (A = null));
            D && (A += k);
          }
        }
        for (l = 0; l < arrCh.length; l++) {
          if (" " == arrCh[l][0]) f = new g.Space("0.4em", "0", "0", " ", n);
          else
            for (
              f =
                "Bracket" == d
                  ? new g.Bracket(
                      arrCh[l][0],
                      arrCh[l][1],
                      p,
                      n,
                      z,
                      w,
                      A,
                      m,
                      r,
                      v,
                      y,
                      t,
                      arrCh[l][2],
                      arrCh[l][3]
                    )
                  : "VerticalBracket" == d
                  ? new g.VerticalBracket(
                      arrCh[l][0],
                      arrCh[l][1],
                      p,
                      n,
                      z,
                      w,
                      A,
                      m,
                      r,
                      v,
                      y,
                      t,
                      arrCh[l][2],
                      arrCh[l][3]
                    )
                  : new g.Symbol(
                      arrCh[l][0],
                      arrCh[l][1],
                      p,
                      n,
                      z,
                      w,
                      A,
                      m,
                      r,
                      v,
                      y,
                      t,
                      arrCh[l][2],
                      arrCh[l][3]
                    ),
                q =
                  "form fence separator lspace rspace stretchy symmetric maxsize minsize largeop movablelimits accent".split(
                    " "
                  ),
                u = 0;
              u < a.attributes.length;
              u++
            )
              (C = a.attributes[u]),
                -1 != q.indexOf(C.localName) &&
                  (h += " " + C.localName + '="' + C.value + '"');
          f.in_attrbs = h;
          e.push(f);
        }
        a = new g.Row();
        a.initialize.apply(a, e);
        return a;
      },
      handleInferredMrow: function (a, b) {
        return 0 == a.childElementCount
          ? null
          : 1 != a.childElementCount
          ? this.handlemrow(a, b)
          : this.handle(a.firstElementChild);
      },
      handlemi: function (a, b) {
        return this.handleTextNode(a, b);
      },
      handlemn: function (a, b) {
        return this.handleTextNode(a, b);
      },
      handlemo: function (a, b) {
        return this.handleTextNode(a, b);
      },
      handlems: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation;
        return new d.Row(
          new d.Symbol('"'),
          this.handleTextNode(a, b),
          new d.Symbol('"')
        );
      },
      handlemspace: function (a, e) {
        var d = org.imatheq.formulaeditor.presentation,
          g =
            "" == a.getAttribute("width") || null === a.getAttribute("width")
              ? "0"
              : a.getAttribute("width"),
          f =
            "" == a.getAttribute("height") || null === a.getAttribute("height")
              ? "0"
              : a.getAttribute("height"),
          h =
            "" == a.getAttribute("depth") || null === a.getAttribute("depth")
              ? "0"
              : a.getAttribute("depth"),
          k = b.getInputAttrbs(a, "token"),
          g = new d.Space(g, f, h);
        g.in_attrbs = k;
        return new d.Row(g);
      },
      handlemtext: function (a, b) {
        return this.handleTextNode(a, b);
      },
      handlelines: function (a, b) {
        var d = a.childNodes,
          g = [],
          f = [],
          h = org.imatheq.formulaeditor.presentation;
        1 == d.length &&
          "mrow" == d.item(0).localName.toLowerCase() &&
          (d = d.item(0).childNodes);
        for (var k = 0; k < d.length; k++)
          if (
            ((child = d.item(k)),
            ("mo" != child.localName && "mspace" != child.localName) ||
              "newline" != child.getAttribute("linebreak"))
          )
            (a = this.handle(d.item(k), b)), null !== a && f.push(a);
          else {
            "before" == child.getAttribute("linebreakstyle") &&
              ((a = this.handle(d.item(k), b)), null !== a && f.push(child));
            f.push(new h.NewlineSymbol());
            var l = new h.Row();
            l.initialize.apply(l, f);
            l.flatten();
            g.push(l);
            f = [];
            "after" == child.getAttribute("linebreakstyle") &&
              ((a = this.handle(d.item(k), b)), null !== a && f.push(child));
          }
        l = new h.Row();
        0 != f.length ? l.initialize.apply(l, f) : l.remove(0, 1);
        l.flatten();
        g.push(l);
        if (0 == g.length) return null;
        if (1 == g.length)
          return 1 == g[0].children.length &&
            g[0].children[0] instanceof h.PArray
            ? g[0].children[0]
            : g[0];
        d = new h.Lines();
        d.initialize.apply(d, g);
        return d;
      },
      handlemstack: function (a, b) {
        var d = a.childNodes,
          g = [],
          f = [],
          h = org.imatheq.formulaeditor.presentation;
        1 == d.length &&
          "mrow" == d.item(0).localName.toLowerCase() &&
          (d = d.item(0).childNodes);
        for (var k = "0", l = d.length - 1; 0 <= l; l--)
          if ("msgroup" == t.localName) {
            var m = d.item(l);
            k++;
            for (
              var r = m.getAttribute("position"),
                n = m.getAttribute("shift"),
                p = m.length - 1;
              0 <= p;
              p--
            ) {
              var t = m.childNodes.item(p);
              t.setAttribute("group_id", k);
              t.setAttribute("group_position", r);
              t.setAttribute("group_shift", n);
              m.removeChild(t);
              a.appendChild(t);
            }
            a.removeChild(m);
          } else if ("mscarries" == t.localName)
            for (
              var m = d.item(l),
                r = m.getAttribute("position"),
                n = m.getAttribute("location"),
                p = m.getAttribute("crossout"),
                q = m.getAttribute("scriptsizemultiplier"),
                u = 0;
              u < m.childNods.length;
              u++
            )
              (t = m.childNodes.item(u)),
                t.setAttribute("msc_position", r),
                t.setAttribute("msc_location", n),
                t.setAttribute("msc_crossout", p),
                t.setAttribute("msc_scriptsizemultiplier", q);
        k = null;
        for (l = 0; l < d.length; l++)
          "mscarries" == t.localName
            ? null === k && (k = l)
            : ((msrow = d.item(l)),
              ("mo" != t.localName && "mspace" != t.localName) ||
              "newline" != t.getAttribute("linebreak")
                ? ((a = this.handle(d.item(l), b)), null !== a && f.push(a))
                : ("before" == t.getAttribute("linebreakstyle") &&
                    ((a = this.handle(d.item(l), b)), null !== a && f.push(t)),
                  f.push(new h.NewlineSymbol()),
                  (k = new h.Row()),
                  k.initialize.apply(k, f),
                  k.flatten(),
                  k.updateChildren(),
                  g.push(k),
                  (f = []),
                  "after" == t.getAttribute("linebreakstyle") &&
                    ((a = this.handle(d.item(l), b)), null !== a && f.push(t))),
              (k = null));
        k = new h.Row();
        0 != f.length ? k.initialize.apply(k, f) : k.remove(0, 1);
        g.push(k);
        if (0 == g.length) return null;
        if (1 == g.length)
          return 1 == g[0].children.length &&
            g[0].children[0] instanceof h.PArray
            ? g[0].children[0]
            : g[0];
        d = new h.Lines();
        d.initialize.apply(d, g);
        return d;
      },
      handlemrow: function (a, e) {
        for (
          var d = a.childNodes,
            g = [],
            f = org.imatheq.formulaeditor.presentation,
            h = 0;
          h < d.length;
          h++
        ) {
          var k = this.handle(d.item(h), e);
          null !== k && g.push(k);
        }
        0 == g.length && g.push(new f.BlockSymbol());
        d = new f.Row();
        d.initialize.apply(d, g);
        d.flatten();
        d.updateChildren();
        a.getAttribute("is_answer") &&
          "true" == a.getAttribute("is_answer") &&
          (d.isAnswer = !0);
        d.in_attrbs = b.getInputAttrbs(a);
        return d;
      },
      handleannotationxml: function (a, b) {
        a.getAttribute("encoding");
        return this.handlemrow(a, b);
      },
      handlesemantics: function (a, b) {
        return this.handleInferredMrow(a, b);
      },
      handlemfrac: function (a, e) {
        for (
          var d = a.childNodes,
            g = [],
            f = org.imatheq.formulaeditor.presentation,
            h = 0;
          h < d.length;
          h++
        ) {
          var k = this.handle(d.item(h), e);
          g.push(k);
        }
        d = null;
        d =
          "true" == a.getAttribute("bevelled")
            ? new f.BevelledFraction(g[0], g[1])
            : new f.Fraction(g[0], g[1]);
        g = b.getInputAttrbs(a);
        d.in_attrbs = g;
        g = a.getAttribute("linethickness");
        isNaN(parseFloat(g)) || (d.lineWidth = parseFloat(g));
        return new f.Row(d);
      },
      handlemover: function (a, b) {
        return this.handlemunderovers(a, b);
      },
      handlemunder: function (a, b) {
        return this.handlemunderovers(a, b);
      },
      handlemunderover: function (a, b) {
        return this.handlemunderovers(a, b);
      },
      handlemunderovers: function (a, e) {
        var d = a.childNodes,
          g = org.imatheq.formulaeditor.presentation;
        a.getAttribute("accent");
        a.getAttribute("accentunder");
        var f = a.getAttribute("mathcolor"),
          h = a.localName,
          k = g.SymbolOnscreens,
          l = b.getInputAttrbs(a),
          m = null;
        "mo" == d.item(0).localName
          ? (m = d.item(0))
          : "mrow" == d.item(0).localName &&
            1 == d.item(0).childElementCount &&
            "mo" == d.item(0).firstChild.localName &&
            (m = d.item(0).firstChild);
        if (
          m &&
          0 == m.childElementCount &&
          "string" == typeof m.firstChild.nodeValue &&
          1 == m.firstChild.nodeValue.length &&
          (-1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              m.firstChild.nodeValue
            ) ||
            -1 !==
              org.imatheq.formulaeditor.parsing.expression.MidVertBracketList.indexOf(
                m.firstChild.nodeValue
              ) ||
            (void 0 !== k[m.firstChild.nodeValue] &&
              (-1 !==
                org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                  k[m.firstChild.nodeValue]
                ) ||
                -1 !==
                  org.imatheq.formulaeditor.parsing.expression.MidVertBracketList.indexOf(
                    k[m.firstChild.nodeValue]
                  ))))
        ) {
          var r = k[m.firstChild.nodeValue],
            r = void 0 === r ? null : r;
          if (
            -1 !==
              org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                m.firstChild.nodeValue
              ) ||
            -1 !==
              org.imatheq.formulaeditor.parsing.expression.MidVertBracketList.indexOf(
                m.firstChild.nodeValue
              )
          )
            r = null;
          var n = this.handleTextNode(m, e, "VerticalBracket").children[0];
          n.onscreen = r;
          n.accent = !1;
          m = [];
          "munderover" != h &&
            (2 <= d.length
              ? m.push(this.handle(d.item(1), e))
              : m.push(new g.Row(new g.BlockSymbol())));
          "munderover" == h &&
            (3 <= d.length
              ? m.push(this.handle(d.item(2), e))
              : m.push(new g.Row(new g.BlockSymbol())),
            2 <= d.length
              ? m.push(this.handle(d.item(1), e))
              : m.push(new g.Row(new g.BlockSymbol())));
          h = new g.MiddleBracketed(h, n, m, f);
          h.in_attrbs = l;
          return new g.Row(h);
        }
        var p = !1,
          t = !1;
        2 <= d.length
          ? "mo" == d.item(1).localName &&
            0 == d.item(1).childElementCount &&
            "string" == typeof d.item(1).firstChild.nodeValue &&
            1 == d.item(1).firstChild.nodeValue.length &&
            (-1 !==
              org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                d.item(1).firstChild.nodeValue
              ) ||
              (void 0 !== k[d.item(1).firstChild.nodeValue] &&
                -1 !==
                  org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                    k[d.item(1).firstChild.nodeValue]
                  )))
            ? ((r = k[d.item(1).firstChild.nodeValue]),
              (r = void 0 === r ? null : r),
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                  d.item(1).firstChild.nodeValue
                ) && (r = null),
              (p = !0),
              (m = this.handleTextNode(d.item(1), e, "VerticalBracket")
                .children[0]),
              (m.onscreen = r))
            : "mrow" == d.item(1).localName &&
              1 == d.item(1).childElementCount &&
              "mo" == d.item(1).firstChild.localName &&
              0 == d.item(1).firstChild.childElementCount &&
              "string" == typeof d.item(1).firstChild.firstChild.nodeValue &&
              1 == d.item(1).firstChild.firstChild.nodeValue.length &&
              (-1 !==
                org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                  d.item(1).firstChild.firstChild.nodeValue
                ) ||
                (void 0 !== k[d.item(1).firstChild.firstChild.nodeValue] &&
                  -1 !==
                    org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                      k[d.item(1).firstChild.firstChild.nodeValue]
                    )))
            ? ((r = k[d.item(1).firstChild.firstChild.nodeValue]),
              (r = void 0 === r ? null : r),
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                  d.item(1).firstChild.firstChild.nodeValue
                ) && (r = null),
              (p = !0),
              (m = this.handleTextNode(
                d.item(1).firstChild,
                e,
                "VerticalBracket"
              ).children[0]),
              (m.onscreen = r))
            : (m = this.handle(d.item(1), e))
          : (m = new g.Row(new g.BlockSymbol()));
        3 <= d.length
          ? "mo" == d.item(2).localName &&
            0 == d.item(1).childElementCount &&
            "string" == typeof d.item(1).firstChild.nodeValue &&
            1 == d.item(1).firstChild.nodeValue.length &&
            (-1 !==
              org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                d.item(2).firstChild.nodeValue
              ) ||
              (void 0 !== k[d.item(2).firstChild.nodeValue] &&
                -1 !==
                  org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                    k[d.item(2).firstChild.nodeValue]
                  )))
            ? ((r = k[d.item(2).firstChild.nodeValue]),
              (r = void 0 === r ? null : r),
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                  d.item(2).firstChild.nodeValue
                ) && (r = null),
              (t = !0),
              (n = new g.VerticalBracket(
                d.item(2).firstChild.nodeValue,
                null,
                r,
                null,
                f
              )))
            : (n = this.handle(d.item(2), e))
          : "munderover" == h && (n = new g.Row(new g.BlockSymbol()));
        d = this.handle(d.item(0), e);
        if (p || t) {
          r = null;
          if ("munderover" == h)
            return (
              p
                ? t || ((d = new g.column(d)), (n = new g.VerticalBracket("")))
                : ((d = new g.column(m, d)), (m = new g.VerticalBracket(""))),
              (r = new g.VerticalBracketed(h, n, d, m, f)),
              (r.in_attrbs = l),
              new g.Row(r)
            );
          n = new g.VerticalBracket("");
          r =
            "mover" == h
              ? new g.VerticalBracketed(h, m, d, n, f)
              : new g.VerticalBracketed(h, n, d, m, f);
          r.in_attrbs = l;
          return new g.Row(r);
        }
        f = null;
        if ("mover" == h)
          return (
            (f = new g.Column(m, d)),
            (f.fontSizeModifierArray = [-1, 0]),
            (f.baselineIndex = 1),
            (f.mtype = h),
            (f.in_attrbs = l),
            new g.Row(f)
          );
        if ("munder" == h)
          return (
            (f = new g.Column(d, m)),
            (f.fontSizeModifierArray = [0, -1]),
            (f.baselineIndex = 0),
            (f.mtype = h),
            (f.in_attrbs = l),
            new g.Row(f)
          );
        f = new g.Column(n, d, m);
        f.fontSizeModifierArray = [-1, 0, -1];
        f.baselineIndex = 1;
        f.mtype = h;
        f.in_attrbs = l;
        return new g.Row(f);
      },
      handlemsqrt: function (a, e) {
        var d = org.imatheq.formulaeditor.presentation,
          g = a.getAttribute("mathcolor"),
          f = b.getInputAttrbs(a),
          h = this.handleInferredMrow(a, e),
          g = new d.Root(h, null, g);
        g.in_attrbs = f;
        return new d.Row(g);
      },
      handlemroot: function (a, e) {
        var d = a.childNodes,
          g = a.getAttribute("mathcolor");
        "" == g && (g = null);
        var f = b.getInputAttrbs(a),
          h = this.handle(d.item(0), e),
          k = this.handle(d.item(1), e),
          d = org.imatheq.formulaeditor.presentation,
          g = new d.Root(h, k, g);
        g.in_attrbs = f;
        return new d.Row(g);
      },
      handlemstyle: function (a, b) {
        return this.handlemrow(a, b);
      },
      handlemerror: function (a, b) {
        return this.handlemrow(a, b);
      },
      handlempadded: function (a, b) {
        return this.handlemrow(a, b);
      },
      handlemfenced: function (a, e) {
        var d = a.getAttribute("open"),
          g = a.getAttribute("close"),
          f = a.getAttribute("separators"),
          h = a.getAttribute("mathcolor"),
          k = a.childNodes,
          l = org.imatheq.formulaeditor.presentation,
          m = l.SymbolOnscreens,
          r = "",
          n = "",
          p = "",
          t = b.getInputAttrbs(a),
          q = [];
        "" == h && (h = null);
        null === d || void 0 === d ? (d = "(") : "(" == d && (r = ' open="("');
        var u = m[d],
          u = void 0 === u ? null : u,
          d = new l.Bracket(d, null, h);
        d.onscreen = u;
        null === g || void 0 === g ? (g = ")") : ")" == g && (n = ' close=")"');
        closeOnscreen = m[g];
        closeOnscreen = void 0 === closeOnscreen ? null : closeOnscreen;
        g = new l.Bracket(g, null, h);
        g.onscreen = closeOnscreen;
        for (m = 0; m < a.attributes.length; m++)
          (u = a.attributes[m]),
            (h = u.localName.split("_")),
            1 < h.length && "open" == h[0] && (d["mo_" + h[1]] = u.value),
            1 < h.length && "close" == h[0] && (g["mo_" + h[1]] = u.value);
        null === f || void 0 === f ? (f = "") : (p = ' separators="' + f + '"');
        if ("" == f) m = null;
        else if (
          ((m = f.split("\\s+")),
          "" === m[0] && (m = m.slice(1)),
          0 < m.length && "" === m[m.length] && m.splice(m.length - 1),
          1 == m.length)
        ) {
          h = [];
          for (f = 0; f < m[0].length; f++) h.push(m[0].charAt(f));
          m = h;
        }
        for (f = 0; f < k.length; f++) {
          if (0 < f && null !== m) {
            var v;
            0 < m.length && (v = f < m.length ? m[f] : m[0]);
            for (h = 0; h < v.length; h++) q.push(new l.Symbol(v.charAt(h)));
          }
          h = this.handle(k.item(f), e);
          q.push(h);
        }
        k = null;
        1 == q.length && q[0] instanceof l.Row
          ? (k = q[0])
          : ((k = new l.Row()), k.initialize.apply(k, q));
        q = new l.Bracketed(d, k, g);
        "true" == a.getAttribute("isMO") && (q.isMO = !0);
        null != a.getAttribute("symmetric") &&
          (q.symmetric =
            "true" == a.getAttribute("symmetric").toLowerCase()
              ? !0
              : "false" == a.getAttribute("symmetric").toLowerCase()
              ? !1
              : null);
        q.in_attrbs = t;
        q.in_open = r;
        q.in_close = n;
        q.in_separators = p;
        return new l.Row(q);
      },
      handlemtable: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          g = [],
          f,
          h,
          k,
          l = new org.imatheq.formulaeditor.presentation.PArray.Info(a);
        for (f = 0; f < a.childNodes.length; f++) {
          var m = [],
            r = a.childNodes.item(f);
          for (h = 0; h < r.childNodes.length; h++) {
            var n = r.childNodes.item(h),
              p = [];
            for (k = 0; k < n.childNodes.length; k++) {
              var t = n.childNodes.item(k);
              p.push(this.handle(t, b));
            }
            k = new d.Row();
            k.initialize.apply(k, p);
            m.push(k);
          }
          g.push(m);
        }
        for (f = r = 0; f < g.length; f++) r < g[f].length && (r = g[f].length);
        for (f = 0; f < g.length; f++)
          if (g[f].length < r)
            for (m = g[f], h = m.length; h < r; h++)
              m.push(new d.Row(new d.BlockSymbol())), l.setColAttrbs(f, h);
        f = new org.imatheq.formulaeditor.presentation.PArray();
        f.initialize.apply(f, g);
        f.margin = 10;
        f.info = l;
        return new d.Row(f);
      },
      handlemaligngroup: function (a, b) {
        var d = a.getAttribute("groupalign");
        return new org.imatheq.formulaeditor.presentation.Alignmark(
          "maligngroup",
          d
        );
      },
      handlemalignmark: function (a, b) {
        var d = a.getAttribute("edge");
        return new org.imatheq.formulaeditor.presentation.Alignmark(
          "malignmark",
          d
        );
      },
      handlemenclose: function (a, e) {
        var d = org.imatheq.formulaeditor.presentation,
          g = b.getInputAttrbs(a),
          f = a.getAttribute("notation").replace(/\s\s+/g, " ").split(" "),
          h = a.getAttribute("mathcolor"),
          h = "" == h ? null : h,
          k = this.handleInferredMrow(a, e),
          f = new d.Enclose(k, f, h);
        f.in_attrbs = g;
        return new d.Row(f);
      },
      handlemsub: function (a, b) {
        return this.handlemsubsup(a, b);
      },
      handlemsup: function (a, b) {
        return this.handlemsubsup(a, b);
      },
      handlemsubsup: function (a, e) {
        var d = a.childNodes,
          g = org.imatheq.formulaeditor.presentation,
          f = a.localName;
        a.getAttribute("mathcolor");
        var h = g.SymbolOnscreens,
          k = null,
          l = b.getInputAttrbs(a);
        if (
          "mo" == d.item(0).localName &&
          0 == d.item(0).childElementCount &&
          "string" == typeof d.item(0).firstChild.nodeValue &&
          1 == d.item(0).firstChild.nodeValue.length &&
          (-1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              d.item(0).firstChild.nodeValue
            ) ||
            (void 0 !== h[d.item(0).firstChild.nodeValue] &&
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                  h[d.item(0).firstChild.nodeValue]
                )))
        ) {
          var m = h[d.item(0).firstChild.nodeValue],
            m = void 0 === m ? null : m;
          -1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              d.item(0).firstChild.nodeValue
            ) && (m = null);
          h = this.handleTextNode(d.item(0), e, "VerticalBracket").children[0];
          h.onscreen = m;
          h.accent = !1;
          m = k = null;
          "msub" == f
            ? (k =
                2 == d.length
                  ? this.handle(d.item(1), e)
                  : new g.Row(new g.BlockSymbol()))
            : "msup" == f
            ? (m =
                2 == d.length
                  ? this.handle(d.item(1), e)
                  : new g.Row(new g.BlockSymbol()))
            : "msubsup" == f &&
              ((k =
                2 <= d.length
                  ? this.handle(d.item(1), e)
                  : new g.Row(new g.BlockSymbol())),
              (m =
                3 <= d.length
                  ? this.handle(d.item(2), e)
                  : new g.Row(new g.BlockSymbol())));
          k = new g.LargeOpSubsup(a.localName, h, m, k);
          k.in_attrbs = l;
          return new g.Row(k);
        }
        if (
          "mrow" == d.item(0).localName &&
          1 == d.item(0).childElementCount &&
          "mo" == d.item(0).firstChild.localName &&
          0 == d.item(0).firstChild.childElementCount &&
          "string" == typeof d.item(0).firstChild.firstChild.nodeValue &&
          1 == d.item(0).firstChild.firstChild.nodeValue.length &&
          (-1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              d.item(0).firstChild.firstChild.nodeValue
            ) ||
            (void 0 !== h[d.item(0).firstChild.firstChild.nodeValue] &&
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                  h[d.item(0).firstChild.firstChild.nodeValue]
                )))
        )
          return (
            (m = h[d.item(0).firstChild.firstChild.nodeValue]),
            (m = void 0 === m ? null : m),
            -1 !==
              org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                d.item(0).firstChild.firstChild.nodeValue
              ) && (m = null),
            (h = this.handleTextNode(d.item(0).firstChild, e, "VerticalBracket")
              .children[0]),
            (h.onscreen = m),
            (h.accent = !1),
            (m = k = null),
            "msub" == f
              ? (k =
                  2 == d.length
                    ? this.handle(d.item(1), e)
                    : new g.Row(new g.BlockSymbol()))
              : "msup" == f
              ? (m =
                  2 == d.length
                    ? this.handle(d.item(1), e)
                    : new g.Row(new g.BlockSymbol()))
              : "msubsup" == f &&
                ((k =
                  2 <= d.length
                    ? this.handle(d.item(1), e)
                    : new g.Row(new g.BlockSymbol())),
                (m =
                  3 <= d.length
                    ? this.handle(d.item(2), e)
                    : new g.Row(new g.BlockSymbol()))),
            (k = new g.LargeOpSubsup(a.localName, h, m, k)),
            (k.in_attrbs = l),
            new g.Row(k)
          );
        h = this.handle(d.item(0), e);
        k =
          2 <= d.length
            ? this.handle(d.item(1), e)
            : new g.Row(new g.BlockSymbol());
        "msubsup" == f &&
          (m =
            3 <= d.length
              ? this.handle(d.item(2), e)
              : new g.Row(new g.BlockSymbol()));
        k = new g.Subsup(f, m, k);
        k.in_attrbs = l;
        return new g.Row(h, k);
      },
      handlemmultiscripts: function (a, e) {
        for (
          var d = a.childNodes,
            g = [],
            f = [],
            h = org.imatheq.formulaeditor.presentation,
            k = this.handle(d.item(0), e),
            l =
              "id" + new Date().getTime() + Math.random().toString(16).slice(2),
            m = b.getInputAttrbs(a),
            r = !1,
            n = 1;
          n < d.length;
          n++
        )
          if ("mprescripts" == d.item(n).localName) r = !0;
          else {
            var p = null;
            "none" != d.item(n).localName && (p = this.handle(d.item(n), e));
            var t = null;
            n + 1 < d.length &&
              "none" != d.item(n + 1).localName &&
              "mprescripts" != d.item(n + 1).localName &&
              (t = this.handle(d.item(++n), e));
            var q = null;
            if (null !== p || null !== t)
              (q = null === p ? "msup" : null === t ? "msub" : "msubsup"),
                r
                  ? ((q = new h.Subsup(q, t, p, "mprescripts", l)),
                    (q.in_attrbs = m),
                    f.push(q))
                  : ((q = new h.Subsup(q, t, p, "mmultiscripts", l)),
                    (q.in_attrbs = m),
                    g.push(q));
          }
        f.push(k);
        for (n = 0; n < g.length; n++) f.push(g[n]);
        d = new h.Row();
        d.initialize.apply(d, f);
        return d;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.version = {
    showAboutPopup: function () {
      alert(
        "imatheq Formulaeditor\nversion: " +
          this.toString() +
          "\nhttp://imatheq.org/formulaeditor/\ninfo@imatheq.org"
      );
    },
    toString: function () {
      return this.versionInfo;
    },
    versionInfo: "1.1.31f",
  };
})();
(function () {
  org.imatheq.formulaeditor.Palettes = { defaultPalette: null };
})();
(function () {
  var b = com.efmase.js.utilities.toolset;
  org.imatheq.formulaeditor.MathCanvas = $extend(Object, {
    editor: null,
    canvas: null,
    fontName: "cmr",
    fontFamilyNameIdx: 0,
    exFontCache: [],
    fontSizes: [
      144, 173, 193, 207, 249, 298, 358, 430, 537, 716, 860, 1074, 1432, 1720,
    ],
    fontNames:
      "Math Font;Arial;Courier New;Tahoma;Times New Roman;Verdana".split(";"),
    fontSizeIdx: null,
    imageCache: null,
    loadingImages: 0,
    loadingCallbacks: [],
    readonly: !1,
    initialize: function (a, b) {
      this.editor = a;
      this.canvas = b;
      this.imageCache = {};
      if (org.imatheq.formulaeditor.options.fontSize) {
        for (
          var d = 0;
          d < this.fontSizes.length - 1 &&
          this.fontSizes[d] < org.imatheq.formulaeditor.options.fontSize;

        )
          d++;
        this.fontSizeIdx = d;
      } else
        this.fontSizeIdx = new org.imatheq.formulaeditor.Options().getOption(
          "defaultFontSizeIdx"
        );
    },
    drawBracketFont: function (a, b, d, g, f) {
      var h = document.createElement("span");
      h.style.position = "absolute";
      h.style.top = d;
      h.style.left = b;
      h.style.width = g;
      h.style.height = f;
      h.innerHTML = a;
    },
    waitToLoadImage: function () {
      var a = this;
      checkImgLoading = function () {
        0 < a.loadingImages
          ? ((document.getElementById("com_imatheq_loading_msg").style.display =
              ""),
            window.setTimeout(checkImgLoading, 500))
          : (document.getElementById("com_imatheq_loading_msg").style.display =
              "none");
      };
      window.setTimeout(checkImgLoading, 500);
    },
    getLinewidth: function (a) {
      return 8 < this.getFontSizeIdx(a) ? 2 : 1;
    },
    getMargin: function (a) {
      return 8 < this.getFontSizeIdx(a) ? 2 : 1;
    },
    getPXSize: function (a, b) {
      var d, g;
      if (null === a || void 0 === a) return null;
      a = a.trim();
      if ("0" == a) return 0;
      "%" == a.slice(a.length - 1)
        ? ((d = parseFloat(a.slice(0, a.length - 1))), (g = "%"))
        : ((d = parseFloat(a.slice(0, a.length - 2))),
          (g = a.slice(a.length - 2).toLowerCase()));
      switch (g) {
        case "px":
          return d;
        case "em":
          d *= this.getFontUnitEm(b);
          break;
        case "ex":
          d *= this.getFontUnitEx(b);
          break;
        case "in":
          d *= 96;
          break;
        case "cm":
          d = (96 * d) / 2.54;
          break;
        case "mm":
          d = (96 * d) / 25.4;
          break;
        case "pt":
          d = (96 * d) / 72;
          break;
        case "pc":
          d = (96 * d) / 6;
          break;
        case "%":
          d = (d * this.getFontUnitEm(b)) / 100;
          break;
        case "ce":
          switch (a) {
            case "veryverythinmathspace":
              d = this.getFontUnitEm(b) / 18;
              break;
            case "verythinmathspace":
              d = (2 * this.getFontUnitEm(b)) / 18;
              break;
            case "thinmathspace":
              d = (3 * this.getFontUnitEm(b)) / 18;
              break;
            case "mediummathspace":
              d = (4 * this.getFontUnitEm(b)) / 18;
              break;
            case "thickmathspace":
              d = (5 * this.getFontUnitEm(b)) / 18;
              break;
            case "verythickmathspace":
              d = (6 * this.getFontUnitEm(b)) / 18;
              break;
            case "veryverythickmathspace":
              d = (7 * this.getFontUnitEm(b)) / 18;
              break;
            case "negativeveryverythinmathspace":
              d = -this.getFontUnitEm(b) / 18;
              break;
            case "negativeverythinmathspace":
              d = (2 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativethinmathspace":
              d = (3 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativemediummathspace":
              d = (4 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativethickmathspace":
              d = (5 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativeverythickmathspace":
              d = (6 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativeveryverythickmathspace":
              d = (7 * -this.getFontUnitEm(b)) / 18;
              break;
            default:
              return null;
          }
          break;
        default:
          return null;
      }
      return Math.round(d);
    },
    getEMStringFromPx: function (a, b) {
      return a / this.getFontUnitEm(b);
    },
    getEMSize: function (a, b) {
      var d, g;
      if ("0" == a.trim()) return 0;
      if ("%" == a.trim().slice(a.trim().length - 1))
        (d = parseFloat(a.trim().slice(0, a.trim().length - 1))), (g = "%");
      else {
        if (-1 != a.indexOf("mathspace")) {
          switch (a) {
            case "veryverythinmathspace":
              d = 1 / 18;
              break;
            case "verythinmathspace":
              d = 2 / 18;
              break;
            case "thinmathspace":
              d = 3 / 18;
              break;
            case "mediummathspace":
              d = 4 / 18;
              break;
            case "thickmathspace":
              d = 5 / 18;
              break;
            case "verythickmathspace":
              d = 6 / 18;
              break;
            case "veryverythickmathspace":
              d = 7 / 18;
              break;
            case "negativeveryverythinmathspace":
              d = -1 / 18;
              break;
            case "negativeverythinmathspace":
              d = -2 / 18;
              break;
            case "negativethinmathspace":
              d = -3 / 18;
              break;
            case "negativemediummathspace":
              d = -4 / 18;
              break;
            case "negativethickmathspace":
              d = -5 / 18;
              break;
            case "negativeverythickmathspace":
              d = -6 / 18;
              break;
            case "negativeveryverythickmathspace":
              d = -7 / 18;
          }
          return d;
        }
        d = parseFloat(a.trim().slice(0, a.trim().length - 2));
        g = a
          .trim()
          .slice(a.trim().length - 2)
          .toLowerCase();
      }
      switch (g) {
        case "ex":
          d = (d * this.getFontUnitEx(b)) / this.getFontUnitEm(b);
          break;
        case "in":
          d = (96 * d) / this.getFontUnitEm(b);
          break;
        case "cm":
          d = (96 * d) / 2.54 / this.getFontUnitEm(b);
          break;
        case "mm":
          d = (96 * d) / 25.4 / this.getFontUnitEm(b);
          break;
        case "pt":
          d = (96 * d) / 72 / this.getFontUnitEm(b);
          break;
        case "pc":
          d = (96 * d) / 6 / this.getFontUnitEm(b);
          break;
        case "%":
          d /= 100;
      }
      return d;
    },
    getPXFontSize: function (a, b) {
      return [10, 12, 13, 14, 17, 20, 24, 32, 40, 48, 64, 80, 96, 128][
        this.getFontSizeIdx(a, b)
      ];
    },
    getFontSizeFromPX: function (a) {
      return [8, 9, 10, 11, 12, 15, 18, 24, 30, 36, 48, 60, 72, 96].indexOf(a);
    },
    isTTFFont: function (a, b) {
      var d = this.getFontSizeIdx(b),
        g = org.imatheq.formulaeditor.MathCanvas.symbolPositions[a];
      return null === g ||
        void 0 === g ||
        ("cmex10" != g.font &&
          "cmey10" != g.font &&
          "bnormal10" != g.font &&
          "msbm10" != g.font &&
          "imescr10" != g.font &&
          "eufm10" != g.font)
        ? 7 <= d
        : !0;
    },
    getContext: function () {
      return this.canvas.getContext("2d");
    },
    getBgContext: function () {
      return this.bgCanvas.getContext("2d");
    },
    setFontSizeIdx: function (a) {
      this.fontSizeIdx = a;
    },
    drawBracket: function (a, b, d, g, f, h, k, l) {
      k = 0;
      void 0 !== a.fontSizeModifier && null !== k && (k = a.fontSizeModifier);
      if (
        -1 ==
        org.imatheq.formulaeditor.parsing.expression.BracketList.indexOf(b)
      )
        return this.drawSymbol(b, d, g, h, !1, !1, l, k);
      var m;
      a = null;
      for (var r = 4; 0 <= r; r--) {
        var n = b + r;
        0 == r && (n = b);
        var p = this.getSymbolDataByPosition(n, k);
        null !== p && void 0 !== p && p.height >= f && ((a = n), (m = p));
      }
      var t;
      if (null !== m && void 0 !== m)
        return this.drawSymbol(a, d, g, h, !1, !1, l, k);
      m = b + "u";
      var q = this.getSymbolDataByPosition(m, k);
      a = b + "l";
      var u = this.getSymbolDataByPosition(a, k),
        r = b + "c",
        n = this.getSymbolDataByPosition(r, k);
      b += "m";
      p = this.getSymbolDataByPosition(b, k);
      null === q &&
        (q = {
          font: null,
          height: 0,
          width: p.width,
          x: p.x,
          xadjust: p.xadjust,
          y: p.y,
          yadjust: p.yadjust,
        });
      null === u &&
        (u = {
          font: null,
          height: 0,
          width: p.width,
          x: p.x,
          xadjust: p.xadjust,
          y: p.y,
          yadjust: p.yadjust,
        });
      null === n &&
        (n = {
          font: null,
          height: 0,
          width: p.width,
          x: p.x,
          xadjust: p.xadjust,
          y: p.y,
          yadjust: p.yadjust,
        });
      p.adjusted ||
        ((p.adjusted = !0),
        1 < q.height && --q.height,
        2 < n.height && ((n.height -= 2), (n.x += 1)),
        1 < u.height && (--u.height, (u.x += 1)));
      f = Math.max(f, q.height + p.height + u.height + 2 * n.height);
      g = g - f + u.yadjust;
      t = Math.max(q.width, p.width, n.width, u.width);
      if (!h) {
        var v = Math.min(q.xadjust, u.xadjust, p.xadjust, n.xadjust),
          y = d + q.xadjust - v,
          A = g + q.height - q.yadjust,
          q = q.height,
          C = d + u.xadjust - v,
          z = g + f - u.yadjust,
          u = u.height,
          w = 0,
          D = 0;
        0 < n.height &&
          ((w = (f - q - u - p.height) / 2),
          (w = Math.round(w)),
          (D = f - q - u - p.height - w));
        var B = d - p.xadjust + v,
          E = g + q + w + p.height - p.yadjust,
          F = f - q - u - w - D,
          G = null,
          H = null;
        0 < n.height &&
          ((G = {
            x: d - n.xadjust + v,
            y: g + q + n.height - n.yadjust,
            width: n.width,
            height: w,
          }),
          (H = {
            x: d - n.xadjust + v,
            y: g + q + w + p.height + n.height - n.yadjust,
            width: n.width,
            height: D,
          }));
        0 < q && this.drawSymbol(m, y, A, h, !1, !1, l, k);
        0 < F &&
          this.drawSymbol(
            b,
            B,
            E,
            h,
            !1,
            !1,
            l,
            k,
            null,
            0 == n.height ? F : null
          );
        0 < n.height &&
          (0 < w &&
            this.drawSymbol(r, G.x, G.y, h, !1, !1, l, k, null, G.height),
          0 < D &&
            this.drawSymbol(r, H.x, H.y, h, !1, !1, l, k, null, H.height));
        0 < u && this.drawSymbol(a, C, z, h, !1, !1, l, k);
      }
      return { left: d, top: g, width: t, height: f };
    },
    drawAngleBracket: function (a, b, d, g, f, h, k, l, m) {
      a = this.getContext();
      k = 0;
      void 0 !== a.fontSizeModifier &&
        null !== a.fontSizeModifier &&
        (k = a.fontSizeModifier);
      if (void 0 === m || null === m) m = 1;
      k = Math.min(Math.round(f / 4), this.getFontUnitEm(k));
      var r = g + Math.round(f / 2),
        n = "\u27e8" == b || "\u2329" == b || "<" == b ? d + m : d + k + m;
      b = "\u27e8" == b || "\u2329" == b || "<" == b ? d + k + m : d + m;
      h ||
        (a.save(),
        void 0 !== l && (a.strokeStyle = l),
        (a.lineWidth = m),
        a.beginPath(),
        a.moveTo(b, g),
        a.lineTo(n, r),
        a.lineTo(b, g + f),
        a.stroke(),
        a.closePath(),
        a.restore());
      return { left: d, top: g, width: k + 2 * m, height: f };
    },
    drawCeilingFloorBracket: function (a, b, d, g, f, h, k, l, m) {
      a = this.getContext();
      k = 0;
      void 0 !== a.fontSizeModifier &&
        null !== a.fontSizeModifier &&
        (k = a.fontSizeModifier);
      if (void 0 === m || null === m) m = 1;
      k = Math.round(Math.min(f / 6, this.getFontUnitEm(k) / 2));
      k = 2 > k ? 2 : k;
      var r = "\u2308" == b || "\u230a" == b ? d + m : d + k + m,
        n = "\u230a" == b || "\u230b" == b ? g : g + f,
        p = "\u230a" == b || "\u230b" == b ? g + f : g,
        t = "\u2309" == b || "\u230b" == b ? d + m : d + k + m;
      b = "\u2308" == b || "\u2309" == b ? g : g + f;
      h ||
        (a.save(),
        void 0 !== l && (a.strokeStyle = l),
        (a.lineWidth = m),
        a.beginPath(),
        a.moveTo(r, n),
        a.lineTo(r, p),
        a.lineTo(t, b),
        a.stroke(),
        a.closePath(),
        a.restore());
      return { left: d, top: g, width: k + 2 * m, height: f };
    },
    drawVerticalBracket: function (a, b, d, g, f, h, k, l, m, r) {
      for (
        var n, p = (r = null), t = null, q = null, u = null, v = 65535, y = 5;
        1 <= y;
        y--
      ) {
        var A = this.getSymbolDataByPosition(a + y, l);
        if (
          null !== A &&
          void 0 !== A &&
          (null === p && ((q = a + y), (p = A)),
          null === t && A.width <= 0.7 * f && ((u = a + y), (t = A)),
          A.width >= g)
        ) {
          var C = A.width > f ? A.width - f : f - A.width;
          C < v && ((r = a + y), (n = A), (v = C));
        }
      }
      g = null;
      v = m ? "" : "b";
      m = a + v + "m";
      g = this.getSymbolDataByPosition(m, l);
      (null !== n && void 0 !== n) ||
        (null !== g && void 0 !== g) ||
        (null !== p && void 0 !== p
          ? ((r = q), (n = p))
          : ((r = a), (n = this.getSymbolDataByPosition(a, l))));
      -1 !== "\u02d8^\u02c7~".indexOf(a) &&
        (null !== t
          ? ((n = t), (r = u))
          : void 0 !==
              org.imatheq.formulaeditor.MathCanvas.symbolPositions[a] &&
            ((r = a), (n = this.getSymbolDataByPosition(a, l))));
      if (null !== n && void 0 !== n)
        return (
          (b = this.drawSymbol(r, b, d, h, !1, !1, k, l)),
          n.topcentre
            ? {
                left: b.left,
                top: b.top,
                width: b.width,
                height: b.height,
                topcentre: n.topcentre,
                bottomcentre: n.bottomcentre,
                bottomindent: n.bottomindent,
              }
            : { left: b.left, top: b.top, width: b.width, height: b.height }
        );
      n = a + v + "l";
      var z = this.getSymbolDataByPosition(n, l);
      r = a + v + "r";
      var w = this.getSymbolDataByPosition(r, l),
        p = a + v + "c",
        t = this.getSymbolDataByPosition(p, l),
        u = (q = 0);
      null === z &&
        ((z = {
          font: null,
          height: g.height,
          width: 0,
          x: g.x,
          xadjust: g.xadjust,
          y: g.y,
          yadjust: g.yadjust,
        }),
        this.isTTFFont(m, l) && (null !== t ? (q = 1) : null !== g && (q = 1)));
      Array.prototype.slice.call(g);
      null === w &&
        ((w = {
          font: null,
          height: g.height,
          width: 0,
          x: g.x,
          xadjust: g.xadjust,
          y: g.y,
          yadjust: g.yadjust,
        }),
        this.isTTFFont(m, l) && (null !== t ? (u = 1) : null !== g && (u = 1)));
      null === t &&
        (t = {
          font: null,
          height: g.height,
          width: 0,
          x: g.x,
          xadjust: g.xadjust,
          y: g.y,
          yadjust: g.yadjust,
        });
      g.adjusted ||
        this.isTTFFont(m, l) ||
        ((g.adjusted = !0),
        1 < z.width && --z.width,
        2 < g.width && ((g.width -= 2), (g.x += 1)),
        2 < t.width && ((t.width -= 2), (t.x += 1)),
        1 < w.width && (--w.width, (w.x += 1)));
      v = Math.max(z.yadjust, g.yadjust, t.yadjust, w.yadjust);
      a = Math.max(z.height, g.height, t.height, w.height);
      v = d - a + v;
      f = Math.max(f, z.width + g.width + w.width + 2 * t.width);
      if (!h) {
        var y = Math.min(z.yadjust, w.yadjust, g.yadjust, t.yadjust),
          A = b + q,
          C = d - z.yadjust + y,
          z = z.width,
          D = b + f + q + u - w.width,
          B = d - w.yadjust + y,
          w = w.width,
          E = 0,
          F = 0;
        0 < t.width &&
          ((E = (f - z - w - g.width) / 2),
          (E = Math.round(E)),
          (F = f - z - w - g.width - E));
        var G = A + z + E,
          H = d - g.yadjust + y,
          I = f - z - w - E - F,
          J = null,
          K = null;
        0 < t.width &&
          ((J = { x: A + z, y: d - t.yadjust + y, width: E, height: t.height }),
          (K = {
            x: A + z + E + g.width,
            y: d - t.yadjust + y,
            width: F,
            height: t.height,
          }));
        0 < z && this.drawSymbol(n, A, C, h, !1, !1, k, l);
        0 < I &&
          this.drawSymbol(m, G, H, h, !1, !1, k, l, 0 == t.width ? I : null);
        0 < t.width &&
          (0 < E && this.drawSymbol(p, J.x, J.y, h, !1, !1, k, l, J.width),
          0 < F && this.drawSymbol(p, K.x, K.y, h, !1, !1, k, l, K.width));
        0 < w && this.drawSymbol(r, D, B, h, !1, !1, k, l);
      }
      return { left: b, top: v, width: f + q + u, height: a };
    },
    drawBox: function (a, b, d, g, f, h) {
      var k = null,
        l = d;
      if (void 0 === d || null === d) l = 1;
      k = void 0 != f && f ? this.getBgContext() : this.getContext();
      k.save();
      void 0 !== h && null !== h && k.setLineDash(h);
      void 0 !== g && null !== g && (k.fillStyle = g);
      void 0 !== b && (k.strokeStyle = b);
      g && k.fillRect(a.left, a.top, a.width, a.height);
      if (!g || (g && b))
        (k.lineWidth = l),
          k.strokeRect(a.left, a.top, a.width - 1, a.height - 1);
      k.restore();
    },
    drawCaret: function (a) {
      if (null !== a) {
        var e = this.editor.canvas.getBgContext();
        if (b.isMobile()) {
          e.save();
          e.lineWidth = 1;
          e.beginPath();
          var d = b.caretSize;
          e.strokeStyle = "#0F8394";
          e.fillStyle = "#18DAF6";
          e.moveTo(a.x, a.bottom + 2);
          e.lineTo(a.x - d, a.bottom + 2 + d);
          e.lineTo(a.x - d, a.bottom + 2 + 3 * d);
          e.lineTo(a.x + d, a.bottom + 2 + 3 * d);
          e.lineTo(a.x + d, a.bottom + 2 + d);
          e.lineTo(a.x, a.bottom + 2);
          e.fill();
          e.stroke();
          e.closePath();
          e.restore();
        }
      }
    },
    drawSlash: function (a, b, d) {
      var g = this.getContext();
      g.save();
      void 0 !== b && (g.strokeStyle = b);
      g.lineWidth = d;
      g.beginPath();
      g.moveTo(a.left, a.top + a.height);
      g.lineTo(a.left + a.width, a.top);
      g.stroke();
      g.closePath();
      g.restore();
    },
    drawBackslash: function (a, b, d) {
      var g = this.getContext();
      g.save();
      void 0 !== b && (g.strokeStyle = b);
      g.lineWidth = d;
      g.beginPath();
      g.moveTo(a.left, a.top);
      g.lineTo(a.left + a.width, a.top + a.height);
      g.stroke();
      g.closePath();
      g.restore();
    },
    drawHStrike: function (a, b, d) {
      var g = null,
        g = this.getContext();
      g.save();
      void 0 !== b && (g.strokeStyle = b);
      g.lineWidth = d;
      if (void 0 === d || null === d) g.lineWidth = 1;
      g.beginPath();
      g.moveTo(a.left, a.top + Math.round(a.height / 2));
      g.lineTo(a.left + a.width, a.top + Math.round(a.height / 2));
      g.stroke();
      g.closePath();
      g.restore();
    },
    drawCircle: function (a, b, d) {
      var g = this.getContext(),
        f = Math.round(a.width / 2),
        h = Math.round(a.height / 2),
        f = a.left + f,
        h = a.top + h,
        k = 1.414 * a.width;
      a = 1.414 * a.height;
      g.save();
      g.beginPath();
      var l = f - k / 2,
        m = f + k / 2,
        r = h - a / 2,
        n = h + a / 2,
        p = (0.551784 * k) / 2,
        t = (0.551784 * a) / 2;
      g.moveTo(f, r);
      g.bezierCurveTo(f + p, r, m, h - t, m, h);
      g.bezierCurveTo(m, h + t, f + p, n, f, n);
      g.bezierCurveTo(f - p, n, l, h + t, l, h);
      g.bezierCurveTo(l, h - t, f - p, r, f, r);
      g.strokeStyle = b;
      g.lineWidth = d;
      g.stroke();
      g.restore();
      return {
        left: f - Math.round(k / 2),
        top: h - Math.round(a / 2),
        width: k + d,
        height: a + d,
      };
    },
    drawCircle1: function (a, b, d) {
      var g = this.getContext(),
        f = Math.round(a.width / 2 - d / 2),
        h = Math.round(a.height / 2 - d / 2),
        k = Math.round((a.width * Math.sqrt(2)) / 2 - d / 2),
        l = Math.round((a.height * Math.sqrt(2)) / 4 - d / 4),
        m = a.left + f,
        r = a.top + h,
        n = [];
      n.push({ rc_x: m + a.width - k, rc_y: r - 2 * l, x: m + f, y: r - h });
      n.push({ rc_x: m + k, rc_y: r - l + 1, x: m + k, y: r });
      n.push({
        rc_x: m + k,
        rc_y: r + l - 1,
        x: a.left + a.width,
        y: a.top + a.height,
      });
      n.push({ rc_x: m + a.width - k, rc_y: r + 2 * l, x: m, y: r + 2 * l });
      n.push({ rc_x: m - a.width + k, rc_y: r + 2 * l, x: m - f, y: r + h });
      n.push({ rc_x: m - k, rc_y: r + l - 1, x: m - k, y: r });
      n.push({ rc_x: m - k, rc_y: r - l + 1, x: m - f, y: r - h });
      n.push({ rc_x: m - a.width + k, rc_y: r - 2 * l, x: m, y: r - 2 * l });
      g.save();
      g.beginPath();
      g.moveTo(n[n.length - 1].x, n[n.length - 1].y);
      for (a = 0; a < n.length; a++)
        g.quadraticCurveTo(n[a].rc_x, n[a].rc_y, n[a].x, n[a].y);
      g.strokeStyle = b;
      g.lineWidth = d;
      g.stroke();
      g.restore();
      return {
        left: m - k,
        top: r - 2 * l,
        width: 2 * k + d,
        height: 2 * l + d,
      };
    },
    drawBoxWithBaseline: function (a, b, d, g) {
      this.drawBox(a, g, 1, d);
      g = this.getContext();
      g.save();
      b &&
        (void 0 !== d && (g.strokeStyle = d),
        g.beginPath(),
        g.moveTo(a.left, b),
        g.lineTo(a.left + a.width - 1, b),
        g.stroke(),
        g.closePath());
      g.restore();
    },
    drawFBox: function (a, b, d, g, f, h, k, l) {
      if (null === g || void 0 === g) g = "f";
      a = this.drawSymbol(g, a, b, !0, f, h, k, l);
      d ||
        ((d = this.getContext()),
        d.save(),
        (d.fillStyle = "rgba(167,191,255, 0.5)"),
        d.fillRect(a.left + 1, a.top + 1, a.width - 2, a.height - 2),
        (d.lineWidth = "1"),
        (d.strokeStyle = "black"),
        d.strokeRect(a.left, a.top, a.width, a.height),
        d.restore());
      return a;
    },
    drawcBox: function (a, b, d, g, f, h, k, l) {
      if (null === g || void 0 === g) g = "c";
      dim0 = this.getXDimentions(m, a, b);
      baseline = dim0.top + Math.round(0.4 * dim0.height);
      a = this.drawSymbol(g, a, b, !0, f, h, k, l);
      a.height = 2 * Math.round(a.width / 2);
      a.top = baseline - a.height / 2;
      if (!d) {
        var m = this.getContext();
        m.save();
        m.fillStyle = "rgba(167,191,255, 0.5)";
        m.fillRect(a.left + 1, a.top + 1, a.width - 2, a.height - 2);
        m.lineWidth = "1";
        m.strokeStyle = "black";
        m.strokeRect(a.left, a.top, a.width, a.height);
        m.restore();
      }
      return a;
    },
    getObjectOffset: function (a) {
      var b = (currtop = 0);
      if (a.offsetParent) {
        do (b += a.offsetLeft), (currtop += a.offsetTop);
        while ((a = a.offsetParent));
      } else (b += a.offsetLeft), (currtop += a.offsetTop);
      return [b, currtop];
    },
    getExFontHeights: function (a, b, d, g) {
      var f = document.createElement("span");
      f.style.fontFamily = b;
      f.style.fontSize = d + "px";
      f.style.fontStyle = g;
      f.innerHTML = a;
      d = document.createElement("div");
      d.style.display = "inline-block";
      d.style.width = "1px";
      d.style.height = "0px";
      a = document.createElement("div");
      a.appendChild(f);
      a.appendChild(d);
      a.style.height = "0px";
      a.style.overflow = "hidden";
      document.body.appendChild(a);
      d.style.verticalAlign = "baseline";
      g = this.getObjectOffset(d);
      var h = this.getObjectOffset(f);
      b = g[1] - h[1];
      d.style.verticalAlign = "bottom";
      g = this.getObjectOffset(d);
      h = this.getObjectOffset(f);
      f = g[1] - h[1];
      d = f - b;
      document.body.removeChild(a);
      return [b, f, d];
    },
    getCachedExFontHeights: function (a, b) {
      var d = null,
        g = "normal";
      b.italic && b.bold
        ? (g = "bold_italic")
        : b.bold
        ? (g = "bold")
        : b.italic && (g = "italic");
      if (null === this.exFontCache[a] || void 0 === this.exFontCache[a])
        this.exFontCache[a] = [];
      if (
        null === this.exFontCache[a][b.ttfFontFamily] ||
        void 0 === this.exFontCache[a][b.ttfFontFamily]
      )
        this.exFontCache[a][b.ttfFontFamily] = [];
      if (
        null === this.exFontCache[a][b.ttfFontFamily][g] ||
        void 0 === this.exFontCache[a][b.ttfFontFamily][g]
      )
        this.exFontCache[a][b.ttfFontFamily][g] = [];
      return null === this.exFontCache[a][b.ttfFontFamily][g][b.pxSize] ||
        void 0 === this.exFontCache[a][b.ttfFontFamily][g][b.pxSize]
        ? ((typeface = g.replace("_", " ")),
          (d = this.getExFontHeights(a, b.ttfFontFamily, b.pxSize, typeface)),
          (this.exFontCache[a][b.ttfFontFamily][g][b.pxSize] = d))
        : this.exFontCache[a][b.ttfFontFamily][g][b.pxSize];
    },
    getXDimentions: function (a, b, d) {
      b = 0;
      a && a.fontSizeModifier && (b = a.fontSizeModifier);
      a = this.getSymbolDataByPosition("x", b, !1, this.editor.isBold());
      a.top = d + a.yadjust - a.height;
      return a;
    },
    drawSymbol: function (a, b, d, g, f, h, k, l, m, r) {
      var n = org.imatheq.formulaeditor.MathCanvas;
      if (void 0 !== n.specialSymbols[a]) {
        m = { top: d, left: b, width: 0, height: 0 };
        var p,
          t = n.specialSymbols[a];
        for (p = 0; p < t.length; p++)
          (r = m),
            (m = this.drawSymbol(t[p], b, d, g, f, h, k, l)),
            (m = {
              top: Math.min(r.top, m.top),
              height:
                Math.max(r.top + r.height, m.top + m.height) -
                Math.min(r.top, m.top),
              left: Math.min(r.left, m.left),
              width:
                Math.max(r.left + r.width, m.left + m.width) -
                Math.min(r.left, m.left),
            });
        return m;
      }
      p = this.getFontInfo(a, l, f, h);
      if ("BMP" != p.glyphType) {
        var q = this.getSymbolDataByPosition(a, l, f, h);
        f = p.onscreen ? p.onscreen : a;
        if (
          "msbm7" == p.ttfFontFamily ||
          "imescr7" == p.ttfFontFamily ||
          "eufm7" == p.ttfFontFamily
        )
          f = org.imatheq.formulaeditor.parsing.expression.RevList[f].key;
        t = 0;
        -1 !==
          org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(a) &&
          ((h = this.getXDimentions({ fontSizeModifier: 0 }, b, d)),
          (l = d - q.height + q.yadjust),
          (t =
            Math.round(h.top + Math.round(0.4 * h.height) - q.height / 2) - l));
        h = {
          left: b,
          top: d - q.height + q.yadjust + t,
          width: q.width,
          height: q.height,
        };
        if (!0 !== g) {
          g = this.getContext("2d");
          g.save();
          g.font = p.typeface;
          g.fillStyle = k;
          if (null !== m && void 0 !== m)
            for (k = Math.round(m / q.width + 0.5), p = 0; p < k; p++)
              g.fillText(
                f,
                b + q.xadjust + (p < k - 1 ? p * q.width : m - q.width),
                d
              );
          else if (null !== r && void 0 !== r)
            for (k = Math.round(r / q.height + 0.5), p = 0; p < k; p++)
              g.fillText(
                f,
                b + q.xadjust,
                d + (p < k - 1 ? p * q.height : r - q.height)
              );
          else g.fillText(f, b + q.xadjust, d + t);
          g.restore();
        }
        return h;
      }
      var q = this.getSymbolDataByPosition(a, l, f, h),
        u = q.font;
      q.margin &&
        (q = this.extendObject(q, {
          x: q.x - q.margin,
          width: q.width + 2 * q.margin,
        }));
      var v = d - q.height + q.yadjust + t,
        y = null !== m && void 0 !== m ? m : q.width,
        A = null !== r && void 0 !== r ? r : q.height;
      if (!g) {
        var C = this.canvas,
          z = this.imageCache;
        d = function () {
          C.getContext("2d").drawImage(
            z[u.image],
            q.x,
            q.y,
            2 * q.width,
            2 * q.height,
            b,
            v,
            y,
            A
          );
        };
        if (null === z[u.image] || void 0 === z[u.image]) {
          var w = new Image(),
            n = this;
          w.onload = function () {
            if (z[u.image] instanceof Array) {
              var a = z[u.image];
              z[u.image] = w;
              for (var b = 0; b < a.length; b++) a[b]();
              n.loadingImages--;
            }
          };
          z[u.image] = [];
          z[u.image].push(d);
          w.src = u.image;
          this.loadingImages++;
          this.waitToLoadImage();
        } else z[u.image] instanceof Array ? z[u.image].push(d) : d();
      }
      return { left: b, top: v, width: y, height: A };
    },
    extendObject: function (a, b) {
      var d = {},
        g;
      for (g in a) d[g] = a[g];
      for (g in b) d[g] = b[g];
      return d;
    },
    getFontInfo: function (a, b, d, g) {
      if (" " == a) return null;
      var f = org.imatheq.formulaeditor.MathCanvas.symbolPositions["m" + a];
      2 == a.length &&
        "m" == a.charAt(0) &&
        (f = org.imatheq.formulaeditor.MathCanvas.symbolPositions[a]);
      var h = 0 == this.fontFamilyNameIdx && d && null !== f && void 0 !== f,
        k = this.getFontSizeIdx(b),
        k = this.fontSizes[k];
      b = this.getPXFontSize(b);
      h || (f = org.imatheq.formulaeditor.MathCanvas.symbolPositions[a]);
      if (1 < a.length && (null === f || void 0 === f)) return null;
      var l = org.imatheq.formulaeditor.presentation.SymbolOnscreens[a];
      void 0 === l && (l = null);
      l &&
        null !== f &&
        void 0 !== f &&
        "cmex10" != f.font &&
        "cmey10" != f.font &&
        (f = org.imatheq.formulaeditor.MathCanvas.symbolPositions[l]);
      var m =
          null !== f &&
          void 0 !== f &&
          ("cmex10" == f.font ||
            "cmey10" == f.font ||
            0 == this.fontFamilyNameIdx),
        r =
          null !== f &&
          void 0 !== f &&
          f.font &&
          f.font.indexOf("10") == f.font.length - 2,
        n;
      r && (n = f.font.slice(0, f.font.length - 2));
      var p;
      "cmex" == n || "cmey" == n
        ? (p = n + "10")
        : h || "msbm" == n || "imescr" == n || "eufm" == n || "\u2202" == a
        ? (p = n + (g ? "b" : "") + "10")
        : ((p = n + (d ? "i" : "") + (g ? "b" : "") + "10"),
          0 != this.fontFamilyNameIdx &&
            (p =
              this.fontNames[this.fontFamilyNameIdx].replace(/ /g, "") +
              "_" +
              p));
      if (0 == this.fontFamilyNameIdx || "cmex" == n || "cmey" == n)
        if (m) {
          if (((m = n + "7"), "cmsy" == n || "cmsz" == n || "bnormal" == n))
            m = "cmr7";
        } else
          m = new org.imatheq.formulaeditor.Options().getOption(
            "defaultFont4NewSymbol"
          );
      else m = this.fontNames[this.fontFamilyNameIdx];
      var t = "TTF_WO_DIM";
      r && (t = "TTF_W_DIM");
      var q = !1;
      if (!r) {
        q = "normal";
        if (g && d) q = "bold_italic";
        else if (g || d) q = g ? "bold" : "italic";
        q =
          this.exFontCache[a] &&
          this.exFontCache[a][m] &&
          this.exFontCache[a][m][q] &&
          this.exFontCache[a][m][q][b];
      }
      var u = (g ? "bold " : "") + "" + b + "px " + m;
      d &&
        !h &&
        "msbm" != n &&
        "imescr" != n &&
        "eufm" != n &&
        "\u2202" != a &&
        (u = "italic " + u);
      return {
        ttfFontFamily: m,
        pxSize: b,
        typeface: u,
        bold: g,
        italic: d,
        glyphType: t,
        fontSizeGroup: p,
        isCmmi: h,
        hasDimensions: r,
        cached: q,
        bmpSize: k,
        row: f ? f.row : null,
        col: f ? f.col : null,
        onscreen: l,
      };
    },
    getSymbolDataByPosition: function (a, b, d, g) {
      d = null !== d && void 0 !== d ? d : !1;
      g = null !== g && void 0 !== g ? g : !1;
      var f = this.getFontInfo(a, b, d, g),
        h = org.imatheq.formulaeditor.MathCanvas.fontsByPosition;
      if (!f) {
        if (1 < a.length) return null;
        throw Error("getFontInfo() returns null");
      }
      if (f.hasDimensions)
        a = h[f.fontSizeGroup][f.bmpSize][16 * f.row + f.col];
      else {
        if ("cmex10" == f.fontSizeGroup || "cmey10" == f.fontSizeGroup)
          return null;
        var h = this.getContext("2d"),
          k = this.getCachedExFontHeights(a, f);
        h.font =
          (d ? "italic " : "") +
          (g ? "bold " : "") +
          this.getPXFontSize(b) +
          "px " +
          f.ttfFontFamily;
        a = {
          font: f.ttfFontFamily,
          x: 0,
          y: 0,
          xadjust: 0,
          yadjust: 2 * k[2],
          width: 2 * h.measureText(a).width,
          height: 2 * k[1],
        };
      }
      b = a.x;
      d = a.y;
      g = a.xadjust;
      var f = a.yadjust,
        h = a.width,
        k = a.height,
        l = a.topcentre ? a.topcentre : null,
        m = a.bottomcentre ? a.bottomcentre : null,
        r = a.bottomindent ? a.bottomindent : null;
      0 != g % 2 && (g--, h++, b--, l && l++, m && m++);
      0 != h % 2 && (h++, r && r++);
      0 != f % 2 && (f++, k++);
      0 != k % 2 && (k++, d--);
      l && 0 != l % 2 && l++;
      m && 0 != m % 2 && m++;
      r && 0 != r % 2 && r++;
      return {
        font: a.font,
        x: b,
        y: d,
        xadjust: g / 2,
        yadjust: f / 2,
        width: h / 2,
        height: k / 2,
        topcentre: a.topcentre ? l / 2 : null,
        bottomcentre: a.bottomcentre ? m / 2 : null,
        bottomindent: a.bottomindent ? r / 2 : null,
      };
    },
    getFontSizeIdx: function (a, b) {
      var d = null === b || void 0 === b ? this.fontSizeIdx : b;
      null !== a && void 0 !== a && (d += a);
      0 > d && (d = 0);
      d > this.fontSizes.length - 1 && (d = this.fontSizes.length - 1);
      return d;
    },
    getFontUnit: function (a, b, d, g, f) {
      if ("em" == a)
        return (a = this.getSymbolDataByPosition("M", b, g, f)), a.width;
      a = this.getSymbolDataByPosition("x", b, g, f);
      return a.height;
    },
    getFontUnitEm: function (a) {
      return this.getFontUnit("em", a);
    },
    getFontUnitEx: function (a) {
      return this.getFontUnit("ex", a);
    },
    clear: function () {
      var a = this.canvas,
        b = a.width,
        d = a.height;
      a.getContext("2d").clearRect(0, 0, b, d);
    },
    clearBg: function () {
      var a = this.bgCanvas,
        b = a.width,
        d = a.height;
      a.getContext("2d").clearRect(0, 0, b, d);
    },
    decreaseSize: function () {
      0 < this.fontSizeIdx && --this.fontSizeIdx;
    },
    increaseSize: function () {
      this.fontSizeIdx < this.fontSizes.length - 1 && (this.fontSizeIdx += 1);
    },
  });
  org.imatheq.formulaeditor.MathCanvas.addFont = function (a, b) {
    var d = "" + a;
    org.imatheq.formulaeditor.MathCanvas.fontsByPosition ||
      (org.imatheq.formulaeditor.MathCanvas.fontsByPosition = {});
    var g = org.imatheq.formulaeditor.MathCanvas.fontsByPosition,
      f;
    for (f in b) {
      g[f] || (g[f] = {});
      var h = g[f],
        k = b[f],
        l = { image: $buuuuu() + "com/imatheq/fonts/" + f + "/" + d + ".png" };
      h[d] || (h[d] = []);
      for (var h = h[d], m = k.length, r = 0; 8 > r; r++)
        for (var n = 0; 16 > n; n++) {
          var p = 16 * r + n;
          if (p < m - 3) {
            var t = 0,
              q = k[p][0],
              u = k[p][1],
              v = k[p][2];
            k[p][3] && (t = k[p][3]);
            t = k[p][4]
              ? {
                  x: k[m - 3][n] - t,
                  y: k[m - 2][r] - u + v,
                  width: q,
                  height: u,
                  xadjust: -t,
                  yadjust: v,
                  font: l,
                  topcentre: k[p][4],
                  bottomcentre: k[p][5],
                  bottomindent: k[p][6],
                }
              : {
                  x: k[m - 3][n] - t,
                  y: k[m - 2][r] - u + v,
                  width: q,
                  height: u,
                  xadjust: -t,
                  yadjust: v,
                  font: l,
                };
          }
          h.push(t);
        }
    }
  };
  org.imatheq.formulaeditor.MathCanvas.symbolsInFont = {
    msbm10: [
      "\ud835\udd38 \ud835\udd39 \u2102 \ud835\udd3b \ud835\udd3c \ud835\udd3d \ud835\udd3e \u210d \ud835\udd40 \ud835\udd41 \ud835\udd42 \ud835\udd43 \ud835\udd44 \u2115 \ud835\udd46 \u2119".split(
        " "
      ),
      [
        "\u211a",
        "\u211d",
        "\ud835\udd4a",
        "\ud835\udd4b",
        "\ud835\udd4c",
        "\ud835\udd4d",
        "\ud835\udd4e",
        "\ud835\udd4f",
        "\ud835\udd50",
        "\u2124",
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    ],
    imescr10: [
      "\ud835\udc9c \u212c \ud835\udc9e \ud835\udc9f \u2130 \u2131 \ud835\udca2 \u210b \u2110 \ud835\udca5 \ud835\udca6 \u2112 \u2133 \ud835\udca9 \ud835\udcaa \ud835\udcab".split(
        " "
      ),
      "\ud835\udcac \u211b \ud835\udcae \ud835\udcaf \ud835\udcb0 \ud835\udcb1 \ud835\udcb2 \ud835\udcb3 \ud835\udcb4 \ud835\udcb5 \ud835\udcb6 \ud835\udcb7 \ud835\udcb8 \ud835\udcb9 \u212f \ud835\udcbb".split(
        " "
      ),
      "\u210a \ud835\udcbd \ud835\udcbe \ud835\udcbf \ud835\udcc0 \ud835\udcc1 \ud835\udcc2 \ud835\udcc3 \u2134 \ud835\udcc5 \ud835\udcc6 \ud835\udcc7 \ud835\udcc8 \ud835\udcc9 \ud835\udcca \ud835\udccb".split(
        " "
      ),
      [
        "\ud835\udccc",
        "\ud835\udccd",
        "\ud835\udcce",
        "\ud835\udccf",
        null,
        null,
        null,
        null,
      ],
    ],
    eufm10: [
      "\ud835\udd04 \ud835\udd05 \u212d \ud835\udd07 \ud835\udd08 \ud835\udd09 \ud835\udd0a \u210c \u2111 \ud835\udd0d \ud835\udd0e \ud835\udd0f \ud835\udd10 \ud835\udd11 \ud835\udd12 \ud835\udd13".split(
        " "
      ),
      "\ud835\udd14 \u211c \ud835\udd16 \ud835\udd17 \ud835\udd18 \ud835\udd19 \ud835\udd1a \ud835\udd1b \ud835\udd1c \u2128 \ud835\udd1e \ud835\udd1f \ud835\udd20 \ud835\udd21 \ud835\udd22 \ud835\udd23".split(
        " "
      ),
      "\ud835\udd24 \ud835\udd25 \ud835\udd26 \ud835\udd27 \ud835\udd28 \ud835\udd29 \ud835\udd2a \ud835\udd2b \ud835\udd2c \ud835\udd2d \ud835\udd2e \ud835\udd2f \ud835\udd30 \ud835\udd31 \ud835\udd32 \ud835\udd33".split(
        " "
      ),
      [
        "\ud835\udd34",
        "\ud835\udd35",
        "\ud835\udd36",
        "\ud835\udd37",
        null,
        null,
        null,
        null,
      ],
    ],
    bnormal10: [
      "\u03b1\u03b2\u03b3\u03b4\u03b5\u03f5\u03b6\u03b7\u03b8\u03d1\u03b9\u03ba\u03bb\u03bc\u03bd\u03be".split(
        ""
      ),
      [
        "\u03bf",
        "\u03c0",
        "\u03d6",
        "\u03c1",
        "\u03f1",
        "\u03c3",
        "\u03c2",
        "\u03c4",
        "\u03c5",
        "\u03c6",
        "\u03d5",
        "\u03c7",
        "\u03c8",
        "\u03c9",
        null,
        "\u2145",
      ],
      [
        null,
        "\u212a",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    ],
    cmr10: [
      "\u0393\u0394\u0398\u039e\u039b\u03a0\u03a3\u03d2\u03a6\u03a8\u03a9\ufb00\ufb01\ufb02\ufb03\ufb04".split(
        ""
      ),
      [
        "\u2030",
        "\u02d8",
        "`",
        "\u00b4",
        "\u02c7",
        "\u2026",
        null,
        "\u00b0",
        "\u00b8",
        "\u00df",
        "\u00e6",
        "\u0153",
        "\u00f8",
        "\u00c6",
        "\u0152",
        "\u00d8",
      ],
      [
        null,
        "!",
        '"',
        "#",
        "$",
        "%",
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        ",",
        null,
        ".",
        "/",
      ],
      "0123456789:;<=>?".split(""),
      "@ABCDEFGHIJKLMNO".split(""),
      "PQRSTUVWXYZ[\\]^\u02d9".split(""),
      [
        null,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
      ],
      [
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        null,
        null,
        null,
        "~",
        "\u00a8",
      ],
    ],
    cmex10: [
      "(1 )1 [1 ]1 \u230a1 \u230b1 \u23081 \u23091 {1 }1 <1 >1 |m \u2225m /1 \\1".split(
        " "
      ),
      "(2 )2 (3 )3 [3 ]3 \u230a3 \u230b3 \u23083 \u23093 {3 }3 <3 >3 /3 \\3".split(
        " "
      ),
      "(4 )4 [4 ]4 \u230a4 \u230b4 \u23084 \u23094 {4 }4 <4 >4 /4 \\4 /2 \\2".split(
        " "
      ),
      "(u )u [u ]u [l ]l [m ]m {u }u {l }l {m }m {c }c".split(" "),
      [
        "(l",
        ")l",
        "(m",
        ")m",
        "<2",
        ">2",
        null,
        null,
        null,
        "\u222e",
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "\u2211",
        "\u220f",
        "\u222b",
        "\u22c3",
        "\u22c2",
        null,
        "\u22c0",
        "\u22c1",
      ],
      [
        null,
        "\u2210",
        "\u222c",
        "\u222d",
        "\u222f",
        "\u2230",
        null,
        null,
        "[2",
        "]2",
        "\u230a2",
        "\u230b2",
        "\u23082",
        "\u23092",
        "{2",
        "}2",
      ],
      [
        "v1",
        "v2",
        "v3",
        "v4",
        "vl",
        "vm",
        "vu",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    ],
    cmey10: [
      [
        "\u23221",
        "\u23222",
        "\u23224",
        "\u2322l",
        "\u2322r",
        "~1",
        "\u2194bl",
        "\u2194l",
        "\u23de1",
        null,
        "\u23de4",
        "\u23del",
        "\u21bcm",
        "\u21bcl",
        "\u2190m",
        "\u2190l",
      ],
      [
        "\u23231",
        "\u23232",
        "\u23234",
        "\u2323l",
        "\u2323r",
        "~2",
        "\u2194br",
        "\u2194r",
        "\u23df1",
        null,
        "\u23df4",
        "\u23dfl",
        "\u21c0m",
        "\u21c0r",
        "\u2192m",
        "\u2192r",
      ],
      [
        null,
        "\u23223",
        null,
        null,
        "\u2322m",
        "~3",
        "\u2194bm",
        "\u2194m",
        "^1",
        "\u23de3",
        null,
        "\u23der",
        "\u2212m",
        "\u00afm",
        "\u02d81",
        null,
      ],
      [
        null,
        "\u23233",
        null,
        null,
        "\u2323m",
        null,
        "\u21d0bl",
        null,
        "\u02c71",
        "\u23df3",
        null,
        "\u23dfr",
        "\u033fm",
        "_m",
        "\u02d82",
        null,
      ],
      [
        null,
        null,
        null,
        null,
        "^2",
        "\u2192br",
        "\u21d0bm",
        null,
        null,
        "^3",
        null,
        "\u23dem",
        null,
        null,
        "\u02d83",
        null,
      ],
      [
        null,
        null,
        null,
        null,
        "\u02c72",
        "\u2192bm",
        "\u21d2br",
        null,
        null,
        "\u02c73",
        null,
        "\u23dfm",
        "\u21d4br",
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        "\u2190bl",
        "\u21d2bm",
        null,
        null,
        null,
        null,
        "\u23dec",
        "\u21d4bl",
        null,
        "\u23de2",
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        "\u2190bm",
        null,
        null,
        null,
        null,
        null,
        "\u23dfc",
        "\u21d4bm",
        null,
        "\u23df2",
        null,
      ],
    ],
    cmmi10: [
      "m\u0393 m\u0394 m\u0398 m\u039b m\u039e m\u03a0 m\u03a3 m\u03d2 m\u03a6 m\u03a8 m\u03a9 m\u03b1 m\u03b2 m\u03b3 m\u03b4 m\u03f5".split(
        " "
      ),
      "m\u03b6 m\u03b7 m\u03b8 m\u03b9 m\u03ba m\u03bb m\u03bc m\u03bd m\u03be m\u03c0 m\u03c1 m\u03c3 m\u03c4 m\u03c5 m\u03d5 m\u03c7".split(
        " "
      ),
      [
        "m\u03c8",
        "m\u03c9",
        "m\u03b5",
        "m\u03d1",
        "m\u03d6",
        "m\u03f1",
        "m\u03c2",
        "m\u03c6",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      "\u2202 mA mB mC mD mE mF mG mH mI mJ mK mL mM mN mO".split(" "),
      [
        "mP",
        "mQ",
        "mR",
        "mS",
        "mT",
        "mU",
        "mV",
        "mW",
        "mX",
        "mY",
        "mZ",
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        "ma",
        "mb",
        "mc",
        "md",
        "me",
        "mf",
        "mg",
        "mh",
        "mi",
        "mj",
        "mk",
        "ml",
        "mm",
        "mn",
        "mo",
      ],
      [
        "mp",
        "mq",
        "mr",
        "ms",
        "mt",
        "mu",
        "mv",
        "mw",
        "mx",
        "my",
        "mz",
        null,
        null,
        null,
        null,
        null,
      ],
    ],
    cmsy10: [
      "\u2212\u00b7\u00d7\u204e\u00f7\u22c4\u00b1\u2213\u2295\u2296\u2297\u2298\u2299\u25cb\u2218\u2022".split(
        ""
      ),
      "\u224d\u2261\u2286\u2287\u2264\u2265\u227c\u227d\u223c\u2248\u2282\u2283\u226a\u226b\u227a\u227b".split(
        ""
      ),
      "\u2190\u2192\u2191\u2193\u2194\u2197\u2198\u2243\u21d0\u21d2\u21d1\u21d3\u21d4\u2196\u2199\u221d".split(
        ""
      ),
      [
        "\u2032",
        "\u221e",
        "\u2208",
        "\u220b",
        "\u25b3",
        "\u25bd",
        "\u2215",
        null,
        "\u2200",
        "\u2203",
        "\u00ac",
        "\u2205",
        null,
        null,
        "\u22a4",
        "\u22a5",
      ],
      [
        "\u2135",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "\u222a",
        "\u2229",
        "\u228e",
        "\u2227",
        "\u2228",
      ],
      [
        "\u22a2",
        "\u22a3",
        "\u230a",
        "\u230b",
        "\u2308",
        "\u2309",
        "{",
        "}",
        "\u27e8",
        "\u27e9",
        "|",
        "\u2225",
        "\u2195",
        "\u21d5",
        null,
        "\u2240",
      ],
      "\u221a\u2a3f\u2207\u0283\u2294\u2293\u2291\u2292\u00a7\u2020\u2021\u00b6\u2663\u2662\u2661\u2660".split(
        ""
      ),
    ],
    cmsz10: [
      "\u2201\u2204\u2220\u2221\u2222\u221f\u2234\u2235\u2260\u2262\u2245\u226e\u226f\u2270\u2271\u2209".split(
        ""
      ),
      [
        "\u2241",
        "\u2249",
        "\u2244",
        "\u2247",
        "\u220c",
        "\u2284",
        "\u2285",
        "\u2288",
        "\u2289",
        "\u00a1",
        "\u00bf",
        "\u22ef",
        "\u22ee",
        "\u22f0",
        "\u22f1",
        null,
      ],
      "\u22b2\u22b3\u228f\u2290\u2226\u21a9\u21aa\u21ab\u21ac\u21a2\u21a3\u21b0\u21b1\u21b2\u21b3\u21da".split(
        ""
      ),
      "\u21db\u21b6\u21b7\u21ba\u21bb\u22b8\u21ad\u21dc\u21dd\u219c\u219d\u219e\u21a0\u219a\u219b\u21ae".split(
        ""
      ),
      [
        "\u21cd",
        "\u21cf",
        "\u21ce",
        "\u21e0",
        "\u21e2",
        "\u21a4",
        "\u21a6",
        "\u296a",
        "\u296c",
        "\u21cb",
        "\u21cc",
        "\u21c6",
        "\u21c4",
        "\u21c7",
        "\u21c9",
        null,
      ],
      [
        "\u21bf",
        "\u21be",
        "\u21c3",
        "\u21c2",
        "\u296e",
        "\u296f",
        "\u21c8",
        "\u21ca",
        "\u21c5",
        "\u21f5",
        "\u2921",
        "\u2922",
        "\u2206",
        null,
        null,
        null,
      ],
      [
        "\u21bc",
        "\u21bd",
        "\u21c0",
        "\u21c1",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    ],
  };
  org.imatheq.formulaeditor.MathCanvas.specialSymbols = { "\u2146": ["d"] };
  org.imatheq.formulaeditor.MathCanvas.fillSymbolPositions = function () {
    var a, b;
    org.imatheq.formulaeditor.MathCanvas.symbolPositions ||
      (org.imatheq.formulaeditor.MathCanvas.symbolPositions = {});
    a = org.imatheq.formulaeditor.MathCanvas.symbolPositions;
    b = org.imatheq.formulaeditor.MathCanvas.symbolsInFont;
    for (var d in b)
      for (var g = b[d], f = 0; f < g.length; f++)
        for (var h = 0; h < g[f].length; h++) {
          var k = g[f][h];
          null !== k &&
            void 0 !== k &&
            (k in a
              ? alert(
                  'duplicate entry for "' +
                    k +
                    '"\n' +
                    a[k].font +
                    ": (" +
                    a[k].row +
                    ", " +
                    a[k].col +
                    ")\n" +
                    d +
                    ": (" +
                    f +
                    ", " +
                    h +
                    ")\n"
                )
              : (a[k] = { font: d, row: f, col: h }));
        }
  };
  org.imatheq.formulaeditor.MathCanvas.fillSymbolPositions();
})();
(function () {
  org.imatheq.formulaeditor.MathCanvas.fontsByPosition = {};
})();
(function () {
  var b = [],
    a,
    e = null,
    d = com.efmase.js.utilities.toolset;
  org.imatheq.formulaeditor.FormulaEditor = $extend(Object, {
    system: "java",
    container: null,
    textarea: null,
    inMathml: null,
    canvas: null,
    keyboard: null,
    textbox: null,
    textboxHeight: 0,
    textboxSel: !1,
    presentation: null,
    selection: null,
    actions: null,
    cursor: null,
    palette: null,
    gifunc: {},
    showPalette: !0,
    testplayermode: !1,
    lst: "0",
    swNenuOn: !1,
    mouseIsDown: !1,
    onCursorBar: !1,
    onStartBar: !1,
    onEndBar: !1,
    isDragging: !1,
    pressTimer: null,
    initPosition: null,
    width: null,
    height: null,
    lang: null,
    isMobile: !1,
    pasteCache: null,
    pasteEvtSupport: !1,
    ctrlPressed: !1,
    cmdPressed: !1,
    initializing: !0,
    redrawing: !0,
    onComposition: !1,
    parrayLine: "PARRAY_LINE_SOLID",
    keyboardNavi: 0,
    keyboardNaviSW: 0,
    menuItems: null,
    curMenuItem: 0,
    paletteTabs: null,
    paletteBtns: null,
    curPaletteBtn: null,
    btnBarBtns: null,
    curBtnBarBtn: null,
    smallWinItems: null,
    symbolindex: null,
    altstrs: null,
    in_attrbs: "",
    kdata: null,
    focused: !1,
    clickState: 0,
    rp_count: 0,
    callbacks: [],
    hasFocus: function () {
      return this.isMobile
        ? this.focused
        : "efmase_focus_textarea" === document.activeElement.className;
    },
    getAltText: function () {
      var a = this.lang,
        b = "";
      if ("zh-cn" == a) return b;
      try {
        b = this.presentation.getAltText(a).trim();
      } catch (d) {
        b = "Error retrieving accessible text";
      }
      return b;
    },
    getSymbolAltText: function (a) {
      var b = "";
      null !== this.altstrs[a] && void 0 !== this.altstrs[a]
        ? (b = this.altstrs[a])
        : null !== this.symbolindex[a] && void 0 !== this.symbolindex[a]
        ? ((b =
            null !== this.pData.EN_TITLES && void 0 !== this.pData.EN_TITLES
              ? this.pData.EN_TITLES[this.symbolindex[a]]
              : this.pData.TITLES[this.symbolindex[a]]),
          null !== b && void 0 != b
            ? ((b = b.toLowerCase()),
              (b = b.replace("sign", "")),
              (b = b
                .replace("with over script", "")
                .replace("with under script", "")
                .replace("with Under and Over Script", "")))
            : (b = a))
        : (b =
            void 0 !== org.imatheq.formulaeditor.parsing.expression.RevList[a]
              ? org.imatheq.formulaeditor.parsing.expression.RevList[a].key
              : a);
      return " " + b.trim();
    },
    isBold: function () {
      var a = document.getElementById("efmase_menubar_item_bold");
      return this.checkClass(a.className, "efmase_palettebutton_down");
    },
    setBold: function () {
      var a = org.imatheq.formulaeditor.presentation;
      this.hasFocus() || this.focus();
      var b = { bold: !this.isBold() };
      if (this.selection.hasSelection) this.selection.setSelSymbFontAttrbs(b);
      else {
        var d = this.cursor.position.row.children[this.cursor.position.index];
        d instanceof a.BlockSymbol && d.setSymbFontAttrbs(b);
      }
      this.setButtonStatus(b);
    },
    isForcedItalic: function () {
      var a = document.getElementById("efmase_menubar_item_italic");
      return this.checkClass(a.className, "efmase_palettebutton_down");
    },
    setForcedItalic: function () {
      var a = org.imatheq.formulaeditor.presentation;
      this.hasFocus() || this.focus();
      var b = !this.isForcedItalic(),
        d = { forcedItalic: b };
      b && this.isAutoItalic() && (d.autoItalic = !1);
      this.selection.hasSelection
        ? this.selection.setSelSymbFontAttrbs(d)
        : (this.hasFocus() || this.focus(),
          (b = this.cursor.position.row.children[this.cursor.position.index]),
          b instanceof a.BlockSymbol && b.setSymbFontAttrbs(d));
      this.setButtonStatus(d);
    },
    isAutoItalic: function () {
      var a = document.getElementById("efmase_menubar_item_autoitalic");
      return this.checkClass(a.className, "efmase_palettebutton_down");
    },
    isMtext: function () {
      var a = document.getElementById("efmase_menubar_item_mtext");
      return this.checkClass(a.className, "efmase_palettebutton_down");
    },
    getMathColor: function () {
      return document
        .getElementById("efmase_menubar_item_mathcolor")
        .getAttribute("mathcolor");
    },
    getHeadlist: function () {
      ed = this;
      "ime_js_dat_headlist" in window &&
      "undefined" !== typeof ime_js_dat_headlist
        ? ed.getData()
        : this.loadjs("en", "headlist.js", function () {
            ed.pdata.tstr2 = new Date().getTime();
            ed.getSymbollist();
          });
    },
    getPArrayLine: function () {
      var a = document.getElementById("PARRAY_LINE_SOLID");
      return this.checkClass(a.className, "efmase_palettebutton_select")
        ? "solid"
        : "dashed";
    },
    setPArrayLine: function (a) {
      var b = document.getElementById("PARRAY_LINE_SOLID"),
        d = document.getElementById("PARRAY_LINE_DASHED");
      "solid" == a
        ? (b.classList.add("efmase_palettebutton_select"),
          d.classList.remove("efmase_palettebutton_select"))
        : (b.classList.remove("efmase_palettebutton_select"),
          d.classList.add("efmase_palettebutton_select"));
      this.parrayLine = "PARRAY_LINE_" + a.toUpperCase();
    },
    addPalette: function (b, d) {
      a || (a = []);
      this.palette = new org.imatheq.formulaeditor.Palette();
      a.push(this.palette);
      this.palette.initialize(this.container, b, d);
    },
    setKeyboardStatus: function () {
      this.isMobile &&
        (this.selection.hasSelection
          ? (d.setObjsAttrb(
              "KEYBOARD_CUT",
              "class",
              "efmase_palettebtn_disabled",
              "remove"
            ),
            d.setObjsAttrb(
              "KEYBOARD_COPY",
              "class",
              "efmase_palettebtn_disabled",
              "remove"
            ))
          : (d.setObjsAttrb(
              "KEYBOARD_CUT",
              "class",
              "efmase_palettebtn_disabled"
            ),
            d.setObjsAttrb(
              "KEYBOARD_COPY",
              "class",
              "efmase_palettebtn_disabled"
            )));
    },
    setButtonStatus: function (a) {
      if (null !== a && void 0 !== a)
        for (var b in a)
          switch (b) {
            case "bold":
              a[b]
                ? d.setObjsAttrb(
                    "efmase_menubar_item_bold",
                    "class",
                    "efmase_palettebutton_down"
                  )
                : d.setObjsAttrb(
                    "efmase_menubar_item_bold",
                    "class",
                    "efmase_palettebutton_down",
                    "remove"
                  );
              break;
            case "forcedItalic":
              a[b]
                ? d.setObjsAttrb(
                    "efmase_menubar_item_italic",
                    "class",
                    "efmase_palettebutton_down"
                  )
                : d.setObjsAttrb(
                    "efmase_menubar_item_italic",
                    "class",
                    "efmase_palettebutton_down",
                    "remove"
                  );
              break;
            case "autoItalic":
              a[b]
                ? d.setObjsAttrb(
                    "efmase_menubar_item_autoitalic",
                    "class",
                    "efmase_palettebutton_down"
                  )
                : d.setObjsAttrb(
                    "efmase_menubar_item_autoitalic",
                    "class",
                    "efmase_palettebutton_down",
                    "remove"
                  );
              break;
            case "mathcolor":
              var e = document.getElementById("efmase_menubar_item_mathcolor");
              e.setAttribute("mathcolor", a[b]);
              e.firstChild.style.borderBottom = "4px solid " + a[b];
              break;
            case "mtext":
              a[b]
                ? d.setObjsAttrb(
                    "efmase_menubar_item_mtext",
                    "class",
                    "efmase_palettebutton_down"
                  )
                : d.setObjsAttrb(
                    "efmase_menubar_item_mtext",
                    "class",
                    "efmase_palettebutton_down",
                    "remove"
                  );
          }
      0 == this.actions.redoIndex
        ? d.setObjsAttrb(
            "efmase_menubar_item_undo",
            "class",
            "efmase_palettebtn_disabled"
          )
        : d.setObjsAttrb(
            "efmase_menubar_item_undo",
            "class",
            "efmase_palettebtn_disabled",
            "remove"
          );
      this.actions.redoIndex == this.actions.actions.length
        ? d.setObjsAttrb(
            "efmase_menubar_item_redo",
            "class",
            "efmase_palettebtn_disabled"
          )
        : d.setObjsAttrb(
            "efmase_menubar_item_redo",
            "class",
            "efmase_palettebtn_disabled",
            "remove"
          );
    },
    getButtonStatus: function () {
      return {
        bold: this.isBold(),
        forcedItalic: this.isForcedItalic(),
        autoItalic: this.isAutoItalic(),
        mathcolor: this.getMathColor(),
        mtext: this.isMtext(),
        parrayLine: this.getPArrayLine(),
      };
    },
    getBracketedObject: function () {
      var a = org.imatheq.formulaeditor.presentation,
        b = null;
      this.selection.hasSelection &&
        this.selection.getSelectionObject() instanceof a.Bracketed &&
        (b = this.selection.getSelectionObject());
      if (null === b) {
        for (
          var d = this.cursor.position.row.getAncestors(
              this.cursor.position.index
            ),
            e = 0;
          e < d.length && !(d[e] instanceof a.Bracketed);

        )
          e++;
        e == d.length
          ? console.log("updateBracket: error cannot find Bracketed parent.")
          : (b = d[e]);
      }
      return b;
    },
    checkClass: function (a, b) {
      var d = a.split(" "),
        e;
      for (e = 0; e < d.length; e++) if (d[e] == b) return !0;
      return !1;
    },
    sub: function (a) {
      for (var b = [], d = 0, e = 0; e < a.length; e++) {
        var f = a.charCodeAt(e);
        128 > f
          ? (b[d++] = f)
          : (2048 > f
              ? (b[d++] = (f >> 6) | 192)
              : (55296 == (f & 64512) &&
                e + 1 < a.length &&
                56320 == (a.charCodeAt(e + 1) & 64512)
                  ? ((f =
                      65536 + ((f & 1023) << 10) + (a.charCodeAt(++e) & 1023)),
                    (b[d++] = (f >> 18) | 240),
                    (b[d++] = ((f >> 12) & 63) | 128))
                  : (b[d++] = (f >> 12) | 224),
                (b[d++] = ((f >> 6) & 63) | 128)),
            (b[d++] = (f & 63) | 128));
      }
      return b;
    },
    ubs: function (a) {
      for (var b = [], d = 0, e = 0; d < a.length; ) {
        var f = a[d++];
        if (128 > f) b[e++] = String.fromCharCode(f);
        else if (191 < f && 224 > f) {
          var g = a[d++];
          b[e++] = String.fromCharCode(((f & 31) << 6) | (g & 63));
        } else if (239 < f && 365 > f) {
          var g = a[d++],
            p = a[d++],
            t = a[d++],
            f =
              (((f & 7) << 18) |
                ((g & 63) << 12) |
                ((p & 63) << 6) |
                (t & 63)) -
              65536;
          b[e++] = String.fromCharCode(55296 + (f >> 10));
          b[e++] = String.fromCharCode(56320 + (f & 1023));
        } else
          (g = a[d++]),
            (p = a[d++]),
            (b[e++] = String.fromCharCode(
              ((f & 15) << 12) | ((g & 63) << 6) | (p & 63)
            ));
      }
      return b.join("");
    },
    togglePalette: function () {
      this.palette
        ? org.imatheq.formulaeditor.Palette.removePalette(this.palette)
        : this.addPalette();
    },
    initialize: function (e, f, g, m, r, n, p, t, q, u, v, y, A) {
      var C,
        z = null;
      this.lskey = g;
      if (null === m || void 0 === m) m = "en";
      this.lang = m.toLowerCase();
      this.initializing = !0;
      null !== r && void 0 !== r && (this.width = r);
      null !== n && void 0 !== n && (this.height = n);
      null !== u &&
        void 0 !== u &&
        $setOptions("org.imatheq.formulaeditor.options", { defAutoItalic: u });
      null !== v &&
        void 0 !== v &&
        $setOptions("org.imatheq.formulaeditor.options", { defSymmetric: v });
      null !== y &&
        void 0 !== y &&
        $setOptions("org.imatheq.formulaeditor.options", {
          stretchMOBrackets: y,
        });
      null !== A &&
        void 0 !== A &&
        $setOptions("org.imatheq.formulaeditor.options", { hideFontTools: A });
      if (e) {
        var w = this;
        this.container = e;
        this.inMathml = "div" == e.localName ? e.innerHTML : e.value;
        e.innerHTML = "";
        g = org.imatheq.formulaeditor.Cursor;
        r = org.imatheq.formulaeditor.Selection;
        n = org.imatheq.formulaeditor.Actions;
        u = org.imatheq.formulaeditor.MathCanvas;
        this.isMobile = d.isMobile();
        for (v = 0; v < b.length; v++) if (b[v].container == e) return b[v];
        if (f)
          (this.container = e),
            (this.canvas = new u(this, f)),
            (this.canvas.bgCanvas = z);
        else {
          this.isMobile
            ? ((f = this.createHiDPICanvas(10, 10)),
              (z = this.createHiDPICanvas(10, 10)))
            : ((f = document.createElement("canvas")),
              (z = document.createElement("canvas")));
          this.isMobile ||
            ((this.textbox = document.createElement("textarea")),
            (this.textbox.btnGrp = "textarea"),
            (this.textbox.autocapitalize = "off"),
            (this.textbox.autocomplete = "off"),
            (this.textbox.autocorrect = "off"),
            (this.textbox.spellcheck = !1),
            (this.textbox.className = "efmase_focus_textarea"),
            (this.textbox.innerHTML = "$"),
            (this.textbox.value = "$"));
          this.container = e;
          this.canvas = new u(this, f);
          this.canvas.bgCanvas = z;
          f.mozImageSmoothingEnabled = !1;
          f.webkitImageSmoothingEnabled = !1;
          f.msImageSmoothingEnabled = !1;
          f.imageSmoothingEnabled = !1;
          z.mozImageSmoothingEnabled = !1;
          z.webkitImageSmoothingEnabled = !1;
          z.msImageSmoothingEnabled = !1;
          z.imageSmoothingEnabled = !1;
          u = new org.imatheq.formulaeditor.Options();
          v = u.getOption("defaultFontNameIdx");
          v =
            null === p || void 0 === p || -1 == this.canvas.fontNames.indexOf(p)
              ? v
              : this.canvas.fontNames.indexOf(p);
          this.canvas.fontFamilyNameIdx = v;
          p = u.getOption("defaultFontSizeIdx");
          d.isMobile()
            ? (null === q ||
                void 0 === q ||
                isNaN(q) ||
                -1 != this.canvas.getFontSizeFromPX(q) ||
                alert(
                  "Mobile Fontsize (" +
                    q +
                    ") must be a value in [8, 9, 10, 11, 12, 15, 18, 24, 30, 36, 48, 60, 72, 96]."
                ),
              (p =
                null === q ||
                void 0 === q ||
                isNaN(q) ||
                -1 == this.canvas.getFontSizeFromPX(q)
                  ? p
                  : this.canvas.getFontSizeFromPX(q)))
            : (null === t ||
                void 0 === t ||
                isNaN(t) ||
                -1 != this.canvas.getFontSizeFromPX(t) ||
                alert(
                  "Fontsize (" +
                    t +
                    ") must be a value in [8, 9, 10, 11, 12, 15, 18, 24, 30, 36, 48, 60, 72, 96]."
                ),
              (p =
                null === t ||
                void 0 === t ||
                isNaN(t) ||
                -1 == this.canvas.getFontSizeFromPX(t)
                  ? p
                  : this.canvas.getFontSizeFromPX(t)));
          this.canvas.setFontSizeIdx(p);
          if (!org.imatheq.formulaeditor.options.ignoreTextareaStyle)
            for (C in e.style)
              try {
                f.style[C] = e.style[C];
              } catch (D) {}
          f.className = "imatheqformula";
          null !== e.getAttribute("style") &&
          void 0 !== e.getAttribute("style") &&
          void 0 !== e.getAttribute("style").value
            ? f.setAttribute("style", e.getAttribute("style"))
            : org.imatheq.formulaeditor.options.inputStyle
            ? f.setAttribute(
                "style",
                org.imatheq.formulaeditor.options.inputStyle
              )
            : ((f.className = "fore_canvas"), (z.className = "bg_canvas"));
          "div" == e.localName &&
          this.checkClass(e.className, "imatheqvisibletextarea")
            ? (e.parentNode.insertBefore(f, e.nextSibling),
              (t = document.createElement("div")),
              (t.className = "EFMASE_Container"),
              e.parentNode.replaceChild(t, f),
              t.appendChild(f),
              f.parentNode.insertBefore(z, f),
              this.isMobile ||
                t.parentNode.insertBefore(this.textbox, t.nextSibling),
              (w = this),
              w.isMobile ||
                d.addEventListener(
                  this.textbox,
                  "input",
                  (function () {
                    return function (a) {
                      if (!w.isMobile && w.onComposition) return !0;
                      if ("" == this.value || "$" == this.value) return !1;
                      a = this.value;
                      this.value = "";
                      this.innerHTML = this.value = "$";
                      1 < a.length && "$" == a[0] && (a = a.slice(1));
                      if (w.hasFocus())
                        for (var b = 0; b < a.length; b++)
                          w.isMobile ||
                            ("a" <= this.value && "z" >= this.value) ||
                            ("0" <= this.value && "9" >= this.value) ||
                            ((this.value = ""),
                            (result = w.cursor.position.row.charInput(
                              a[b],
                              w
                            ))),
                            w.isMobile &&
                              (result = w.cursor.position.row.charInput(
                                a[b],
                                w
                              ));
                      return !1;
                    };
                  })()
                ),
              w.isMobile ||
                d.addEventListener(
                  this.textbox,
                  "focus",
                  (function () {
                    return function (a) {
                      w.keyboardNavi = 4;
                      w.clearKBNavi();
                      w.setKBNavi(a);
                    };
                  })()
                ),
              w.isMobile ||
                d.addEventListener(
                  this.textbox,
                  "copy",
                  (function () {
                    return function (a) {
                      w.onCutCopy(a, "copy");
                    };
                  })()
                ),
              w.isMobile ||
                d.addEventListener(
                  this.textbox,
                  "compositionstart",
                  (function () {
                    return function (a) {
                      w.onComposition = !0;
                    };
                  })()
                ),
              w.isMobile ||
                d.addEventListener(
                  this.textbox,
                  "compositionend",
                  (function () {
                    return function (a) {
                      if ("" == this.value || "$" == this.value) return !1;
                      a = this.value;
                      this.value = "";
                      1 < a.length && "$" == a[0]
                        ? (a = a.slice(1))
                        : 1 < a.length &&
                          "$" == a[a.length - 1] &&
                          (a = a.slice(0, a.length - 1));
                      if (w.hasFocus())
                        for (var b = 0; b < a.length; b++)
                          w.isMobile ||
                            ("a" <= this.value && "z" >= this.value) ||
                            ("0" <= this.value && "9" >= this.value) ||
                            ((this.value = ""),
                            (result = w.cursor.position.row.charInput(
                              a[b],
                              w
                            ))),
                            w.isMobile &&
                              (result = w.cursor.position.row.charInput(
                                a[b],
                                w
                              ));
                      return (w.onComposition = !1);
                    };
                  })()
                ),
              w.isMobile ||
                d.addEventListener(
                  this.textbox,
                  "compositionupdate",
                  (function () {
                    return function (a) {};
                  })()
                ),
              w.isMobile ||
                d.addEventListener(
                  this.textbox,
                  "cut",
                  (function () {
                    return function (a) {
                      w.onCutCopy(a, "cut");
                    };
                  })()
                ),
              w.isMobile ||
                d.addEventListener(
                  this.textbox,
                  "paste",
                  (function () {
                    return function (a) {
                      w.onpaste(a);
                      a.preventDefault();
                    };
                  })()
                ),
              !w.isMobile &&
                d.isFirefox() &&
                d.addEventListener(
                  this.textbox,
                  "select",
                  (function () {
                    return function (a) {
                      w.onselectstart(a);
                      a.preventDefault();
                    };
                  })()
                ),
              this.resizeWindow(),
              this.resizeCanvas(this.getPresentationContext()),
              d.addEventListener(
                t,
                "scroll",
                (function () {
                  return function (a) {
                    a =
                      org.imatheq.formulaeditor.FormulaEditor.getFirstEditor();
                    a.cursor && (a.cursor.autoScroll = !1);
                    return !1;
                  };
                })()
              ))
            : e.parentNode.insertBefore(f, e);
        }
        pasteCache = document.createElement("div");
        pasteCache.setAttribute("id", "efmase_paste_cache");
        pasteCache.setAttribute("contenteditable", "");
        pasteCache.style.cssText =
          "opacity:0;position:fixed;top:0px;left:0px;width:10px;margin-left:-20px;";
        document.body.appendChild(pasteCache);
        this.pasteCache = pasteCache;
        f = new MutationObserver(function (a) {
          var b = "";
          a.forEach(function (a) {
            if (
              !0 === w.pasteEvtSupport ||
              0 == w.ctrlPressed ||
              "childList" != a.type
            )
              return !0;
            1 == a.addedNodes.length && (b += a.addedNodes[0].textContent);
          });
          "" != b &&
            ((b = w.pasteCache.innerText),
            w.focus(),
            w.doonpaste(b, !1),
            setTimeout(function () {
              w.pasteCache.innerHTML = "";
            }, 20));
        });
        z = document.getElementById("efmase_paste_cache");
        f.observe(z, { attributes: !0, childList: !0, characterData: !0 });
        this.gifunc.gi0 = function () {
          return w.gi0();
        };
        f = document.createElement("div");
        f.setAttribute("id", "com_imatheq_loading_msg");
        f.innerHTML = "Loading, please wait...";
        document.body.appendChild(f);
        this.checkClass(e.className, "imatheqpalette")
          ? (this.showPalette = this.showPalette && !0)
          : this.checkClass(e.className, "imatheqnopalette")
          ? (this.showPalette = this.showPalette && !1)
          : (this.showPalette =
              "all" == org.imatheq.formulaeditor.options.paletteShow
                ? this.showPalette && !0
                : "none" == org.imatheq.formulaeditor.options.paletteShow
                ? this.showPalette && !1
                : this.showPalette && !a);
        this.showPalette =
          this.showPalette &&
          (this.checkClass(e.className, "imatheqpalette") ||
            (!this.checkClass(e.className, "imatheqnopalette") && !a));
        this.checkClass(e.className, "imatheqvisibletextarea") ||
          (e.style.display = "none");
        this.checkClass(e.className, "testplayermode") &&
          (this.testplayermode = !0);
        this.load();
        this.selection = new r(this);
        this.actions = new n(this);
        this.cursor = new g(
          this,
          this.presentation.getFollowingCursorPosition(
            this.getPresentationContext()
          )
        );
        this.showPalette && this.addPalette(this, m);
        this.pdata = { tstr0: new Date().getTime() };
        this.gifunc.gi25536 = function () {
          return w.gi25536();
        };
        this.getpdata();
        b.push(this);
      }
    },
    drawEditor: function (a) {
      this.palette.draw();
      this.palette.initPanels();
      this.redraw(!1);
    },
    PIXEL_RATIO: (function () {
      var a = document.createElement("canvas").getContext("2d");
      return (
        (window.devicePixelRatio || 1) /
        (a.webkitBackingStorePixelRatio ||
          a.mozBackingStorePixelRatio ||
          a.msBackingStorePixelRatio ||
          a.oBackingStorePixelRatio ||
          a.backingStorePixelRatio ||
          1)
      );
    })(),
    createHiDPICanvas: function (a, b, d) {
      d || (d = this.PIXEL_RATIO);
      var e = document.createElement("canvas");
      e.width = a * d;
      e.height = b * d;
      e.style.width = a + "px";
      e.style.height = b + "px";
      e.getContext("2d").setTransform(d, 0, 0, d, 0, 0);
      return e;
    },
    setHiDPICanvasDims: function (a, b, d, e) {
      e || (e = this.PIXEL_RATIO);
      a.width = b * e;
      a.height = d * e;
      a.style.width = b + "px";
      a.style.height = d + "px";
      a.getContext("2d").setTransform(e, 0, 0, e, 0, 0);
    },
    getSymbollist: function () {
      ed = this;
      this.loadjs("en", "symbollist.js", function () {
        ed.pdata.tstr3 = new Date().getTime();
        ed.getMenusymbol();
      });
    },
    load: function () {
      var a = org.imatheq.formulaeditor.presentation,
        b = org.imatheq.formulaeditor.parsing.mathml.MathMLParser,
        d = org.imatheq.formulaeditor.presentation.Editor,
        e = org.imatheq.formulaeditor.presentation.Row,
        f;
      try {
        var g = new b().parseString(this.inMathml);
        if (org.imatheq.formulaeditor.options.useBar)
          (f = this.palette ? !0 : !1),
            (this.presentation = new d(
              g.getPresentation(this.getPresentationContext()),
              f
            ));
        else {
          var p = new e(g),
            t = new a.Lines(p);
          this.presentation = new a.Row(t);
          this.presentation.flatten();
        }
      } catch (q) {
        org.imatheq.formulaeditor.options.useBar
          ? ((f = this.palette ? !0 : !1), (this.presentation = new d(null, f)))
          : ((t = new a.Lines(new a.Row(new a.BlockSymbol()))),
            (a = []),
            a.push(t),
            (e = new e()),
            e.initialize.apply(e, a),
            (this.presentation = e));
      }
    },
    loadMathML: function (a) {
      org.imatheq.formulaeditor.FormulaEditor.addDebug("loading MathML");
      var b = org.imatheq.formulaeditor.presentation.Row;
      a = new org.imatheq.formulaeditor.parsing.mathml.MathMLParser().parse(
        a,
        this.getPresentationContext()
      );
      org.imatheq.formulaeditor.FormulaEditor.addDebug("parsed: " + a);
      this.presentation = new b(a);
      this.presentation.flatten();
    },
    insertLiteral: function (a, b) {
      var d = document.createTextNode(a);
      b.appendChild(d);
      return d;
    },
    save: function () {
      return { success: "".success, errorString: "".errorString };
    },
    redraw: function (a) {
      editor = this;
      this.redrawing = !0;
      this.cursor.hideCursor();
      var b = {};
      a = [];
      this.presentation.getFontSizeData(this, {}, b);
      for (var d in b)
        if (b.hasOwnProperty(d)) for (var e in b[d]) a.push(d + "_" + e);
      0 !== Object.keys(b).length && JSON.stringify(b) !== JSON.stringify({})
        ? ((d = window.location.href.split("/")),
          (e = $buuuuu()),
          (b =
            e.substring(0, e.indexOf("/")) +
            "//www.imatheq.com/imatheq?token=12346"),
          "java" == this.system && (b = e + "imatheq?token=12346"),
          "net" == this.system &&
            (b = e + "com/imatheq/default.aspx?token=12346"),
          com.efmase.js.utilities.XMLHttp.call({
            url: b,
            type: "post",
            dataType: "json",
            data: {
              action: "fondataj",
              lang: this.lang,
              dm: d[2].replace(":", "_"),
              lsk: this.lskey,
              fsgroups: a.toString(),
            },
            mimeType: "application/json",
            success: function (a) {
              a = JSON.parse(editor.fetchData(a.d));
              for (var b in a)
                if (a.hasOwnProperty(b)) {
                  if ("error" == b) {
                    alert(a[b]);
                    return;
                  }
                  var d = b.substring(b.lastIndexOf("_") + 1);
                  org.imatheq.formulaeditor.MathCanvas.addFont(d, a[b]);
                }
              editor.redraw_func();
            },
            error: function (a, b, d) {
              "" == a.responseText
                ? alert("error in server call, status: " + b + ", error: " + d)
                : alert("error: status: " + b + ", error: " + d);
            },
          }))
        : this.redraw_func();
    },
    redraw_func: function () {
      bb = function () {
        for (
          var a = document.getElementsByTagName("script"),
            b = /(.*)com\/imatheq\/scripts\/imatheqfunctions.js/,
            d = 0;
          d < a.length;
          d++
        ) {
          var e = a[d].src.match(b);
          if (null !== e)
            return (
              (a = /192.168.86.250/),
              (b = new RegExp(document.location.hostname)),
              e[1].match(/www.imatheq.com/) || e[1].match(a) || e[1].match(b)
                ? !0
                : !1
            );
        }
      };
      if (bb()) {
        this.canvas.clear();
        var a = this.selection.hasSelection;
        this.draw(a);
        a && this.selection.redraw();
        this.hasFocus() && !a && this.cursor.showCursor();
        this.initializing = this.redrawing = !1;
      }
    },
    setScroll: function (a) {
      var b = {},
        d = this.canvas.canvas.parentNode,
        e = this.getScrollBarWidth();
      (null !== a && void 0 !== a) || this.cursor.getDimensions(b);
      var b = Math.round((parseInt(d.style.width) - e) / 2),
        f = Math.round((parseInt(d.style.height) - e) / 2);
      if (
        a.x - d.scrollLeft > parseInt(d.style.width) - e - 8 ||
        20 > a.x - d.scrollLeft
      )
        d.scrollLeft = a.x > b ? a.x - b : 0;
      if (
        a.bottom - d.scrollTop > parseInt(d.style.height) - e - 8 ||
        8 > a.top - d.scrollTop
      )
        d.scrollTop = a.top > f ? a.top - f : 0;
    },
    registerCallback: function (a) {
      this.callbacks.push(a);
    },
    draw: function (a) {
      var b,
        d = {};
      org.imatheq.formulaeditor.options.useBar
        ? (b = this.presentation.draw(this.canvas, d, 0, 0, !0))
        : ((b = this.presentation.draw(this.canvas, d, 0, 0, !0)),
          (b = {
            top: b.top - 8,
            left: b.left - 20,
            width: b.width + 28,
            height: b.height + 8,
          }));
      this.canvas.clear();
      (null !== a && void 0 !== a && a) || this.selection.clear();
      this.resizeCanvas(this.getPresentationContext(), b);
      this.presentation.draw(this.canvas, d, -b.left, -b.top);
      for (a = 0; a < this.callbacks.length; a++) this.callbacks[a]();
    },
    getMenusymbol: function () {
      ed = this;
      this.loadjs(this.lang.toLowerCase(), "menusymbol.js", function () {
        ed.pdata.tstr4 = new Date().getTime();
        ed.getAltstrs();
      });
    },
    gi25536: function () {
      var a;
      try {
        var b = this.canvas.canvas;
        b.toDataURL("image/png");
        var d = document.getElementById("com_imatheq_loading_msg");
        d.innerHTML = "Generating image, please wait...";
        d.style.display = "";
        this.canvas.readonly = !0;
        this.redraw();
        var e = document.createElement("canvas"),
          f = 2 * this.presentation.dimensions.width,
          g = 2 * this.presentation.dimensions.height;
        e.setAttribute("width", f / 2 + 20);
        e.setAttribute("height", g / 2 + 8);
        e.getContext("2d").drawImage(
          b,
          40,
          16,
          f + 4,
          g + 4,
          2,
          2,
          (f + 4) / 2,
          (g + 4) / 2
        );
        a = e.toDataURL("image/png");
        this.canvas.readonly = !1;
        this.redraw();
        d.innerHTML = "Loading, please wait...";
        d.style.display = "none";
      } catch (p) {}
      return a;
    },
    getPosition: function (a) {
      for (var b = this.presentation, d = a[0], e = a.length - 1; 0 < e; e--)
        b = b.children[a[e]];
      return { row: b, index: d };
    },
    onBackspace: function () {
      if (this.selection.hasSelection) this.selection.remove();
      else {
        var a = this.cursor.position;
        0 < a.index
          ? (a.row.updateKeyword(this, a.index),
            a.row.updateKeyword(this, a.index - 1),
            a.row.backDelete(this))
          : null !== a.row.parent &&
            void 0 !== a.row.parent &&
            a.row.parent instanceof
              org.imatheq.formulaeditor.presentation.Lines &&
            0 < a.row.index &&
            this.presentation.children[0].deleteNewline(this, a.row.index - 1);
      }
    },
    onkeydown: function (a) {
      (17 != a.keyCode && !a.metaKey && !a.ctrlKey) ||
        this.ctrlPressed ||
        (this.ctrlPressed = !0);
      if (null !== this.palette.activePanel)
        return this.palette.activePanel.onkeydown(a);
      if (9 == a.keyCode || (37 <= a.keyCode && 40 >= a.keyCode)) {
        var b = document.activeElement,
          d = b ? b.className : "";
        if (
          !this.checkClass(d, "efmase_palettebutton") &&
          !this.checkClass(d, "efmase_focus_textarea")
        ) {
          this.keyboardNavi = -1;
          return;
        }
        switch (b.btnGrp) {
          case "menu":
            this.keyboardNavi = 1;
            break;
          case "palette_tab":
            this.keyboardNavi = 2;
            break;
          case "palette":
            this.keyboardNavi = 3;
            break;
          case "textarea":
            this.keyboardNavi = 4;
            break;
          default:
            alert("Error in editor.onkeydown: Wrong button group.");
        }
      }
      if (9 == a.keyCode && 1 <= this.keyboardNavi && 4 >= this.keyboardNavi) {
        this.clearKBNavi();
        b = this.getCurPalGrpId();
        a.shiftKey
          ? (--this.keyboardNavi,
            3 == this.keyboardNavi && -1 == b && --this.keyboardNavi)
          : ((this.keyboardNavi = ++this.keyboardNavi),
            3 == this.keyboardNavi && -1 == b && ++this.keyboardNavi);
        if (1 > this.keyboardNavi || 4 < this.keyboardNavi) return;
        this.palette.isSmallWin() &&
          2 == this.keyboardNavi &&
          (a.shiftKey ? --this.keyboardNavi : ++this.keyboardNavi);
        this.hasFocus() &&
          4 != this.keyboardNavi &&
          (this.blur(), this.cursor.hideCursor());
        this.setKBNavi(a);
        return !1;
      }
      if (this.hasFocus()) {
        if (this.ctrlPressed && !a.altKey)
          switch (a.keyCode) {
            case 66:
            case 99:
              return this.setBold(), !1;
            case 73:
            case 105:
              return this.setForcedItalic(), !1;
            case 67:
            case 88:
              return !0;
            case 86:
              if (
                void 0 != document.activeElement &&
                "text" == document.activeElement.type
              )
                return !1;
              1 == this.ctrlPressed &&
                null != this.pasteCache &&
                this.pasteCache.focus();
              return !0;
            case 90:
              return this.actions.undo(), !1;
            case 89:
              return this.actions.redo(), !1;
            case 65:
              return this.selection.selectAll(), !1;
            case 107:
              return this.changeFontsize(1), !1;
            case 109:
              return this.changeFontsize(-1), !1;
          }
        switch (a.keyCode) {
          case 116:
            return (
              (a = org.imatheq.formulaeditor.Cursor),
              (b = this.save()),
              b.success
                ? (this.load(),
                  (this.cursor = new a(
                    this,
                    this.presentation.getFollowingCursorPosition(
                      this.getPresentationContext()
                    )
                  )),
                  this.focus(),
                  this.redraw())
                : alert(
                    "The formula could not be interpreted correctly. The error message was:\n" +
                      b.errorString
                  ),
              !1
            );
          case 8:
            return this.onBackspace();
          case 46:
            return (
              this.selection.hasSelection
                ? this.selection.remove()
                : ((a = this.cursor.position),
                  a.index < a.row.children.length &&
                  !(
                    a.row.children[a.index] instanceof
                    org.imatheq.formulaeditor.presentation.NewlineSymbol
                  )
                    ? (a.row.updateKeyword(this, a.index + 1),
                      a.row.updateKeyword(this, a.index),
                      a.row.foreDelete(this))
                    : null !== a.row.parent &&
                      void 0 !== a.row.parent &&
                      a.row.children[a.index] instanceof
                        org.imatheq.formulaeditor.presentation.NewlineSymbol &&
                      a.row.index < a.row.parent.children.length - 1 &&
                      this.presentation.children[0].deleteNewline(
                        this,
                        a.row.index
                      )),
              !1
            );
        }
        return this.cursor.onkeydown(a);
      }
      if (
        37 <= a.keyCode &&
        40 >= a.keyCode &&
        1 <= this.keyboardNavi &&
        3 >= this.keyboardNavi
      )
        switch (a.keyCode) {
          case 37:
            return this.kbNaviMove("left"), !1;
          case 38:
            return this.kbNaviMove("up"), !1;
          case 39:
            return this.kbNaviMove("right"), !1;
          case 40:
            return this.kbNaviMove("down"), !1;
        }
      if (
        (13 == a.charCode || 13 == a.keyCode) &&
        1 <= this.keyboardNavi &&
        3 >= this.keyboardNavi
      )
        this.onEnter(a);
    },
    kbNaviMove: function (a) {
      switch (this.keyboardNavi) {
        case 1:
          var b = this.curMenuItem,
            e = this.menuItems[b],
            f = document.getElementById("efmase_menubar_item_" + e);
          do
            "left" == a ? b-- : "right" == a && b++,
              (e = this.menuItems[b]),
              (e = document.getElementById("efmase_menubar_item_" + e));
          while (
            0 <= b &&
            b <= this.menuItems.length &&
            null !== e &&
            this.checkClass(e.className, "efmase_palettebtn_disabled")
          );
          0 <= b &&
            b < this.menuItems.length &&
            null !== e &&
            !this.checkClass(e.className, "efmase_palettebtn_disabled") &&
            ((this.curMenuItem = b),
            f.style.removeProperty("border"),
            (e.style.border = "2px solid #000000"));
          break;
        case 2:
          f = b = this.paletteTabs.indexOf(this.palette.curtab);
          "left" == a && 0 < f
            ? f--
            : "right" == a && f < this.paletteTabs.length - 1 && f++;
          if (f == b) break;
          this.palette.handleTabBtnOverClick(this.paletteTabs[f]);
          break;
        case 3:
          if (null === this.curPaletteBtn) break;
          else {
            var g = this.pData.PALETTE[this.curPaletteBtn.tab].GROUPS,
              n = g[this.curPaletteBtn.group].ROWS,
              p = n[this.curPaletteBtn.row].ITEMS,
              b = this.curPaletteBtn.tab,
              f = this.curPaletteBtn.group,
              e = this.curPaletteBtn.row,
              t = this.curPaletteBtn.col;
            if ("left" == a || "right" == a) {
              if (((t += "left" == a ? -1 : 1), 0 > t || t >= p.length)) {
                f += "left" == a ? -1 : 1;
                if (0 > f && 0 == e) break;
                f >= g.length
                  ? ((f = 0), e++)
                  : 0 > f && ((f = g.length - 1), e--);
                n = g[f].ROWS;
                for (
                  t = document.getElementById(g[f].id);
                  0 <= f &&
                  f < g.length &&
                  (e >= n.length || "none" == t.style.display);

                ) {
                  f += "left" == a ? -1 : 1;
                  if (("left" == a && 0 > f) || ("right" == a && f >= g.length))
                    return;
                  n = g[f].ROWS;
                  t = document.getElementById(g[f].id);
                }
                if (0 > f || f >= g.length) break;
                p = n[e].ITEMS;
                t = "left" == a ? p.length - 1 : 0;
              }
            } else {
              e += "up" == a ? -1 : 1;
              if (0 > e || e >= n.length) break;
              p = n[e].ITEMS;
              if (t >= p.length) break;
            }
            a = p[t];
            g = a.id;
            "PALETTE_TAB_EDIT_BUTTONS" == this.palette.curtab &&
              (g = this.palette.symbols[a.id].name);
            this.clearKBNavi();
            d.setObjsAttrb(g, "border", "2px solid #000000");
            this.curPaletteBtn = { tab: b, group: f, row: e, col: t };
          }
          break;
        case 5:
          if ("left" != a && "right" != a) break;
          b = document.getElementsByClassName("imatheq_save_buttons");
          0 == b.length && (b = document.getElementsByTagName("input"));
          curBtn = this.curBtnBarBtn;
          curBtn += "left" == a ? -1 : 1;
          0 <= curBtn &&
            curBtn < b.length &&
            (b[this.curBtnBarBtn].blur(),
            b[curBtn].focus(),
            (this.curBtnBarBtn = curBtn));
      }
    },
    onEnter: function (a) {
      switch (this.keyboardNavi) {
        case 1:
          var b = this.palette.isSmallWin()
              ? "Menu"
              : this.menuItems[this.curMenuItem],
            d = document.getElementById("efmase_menubar_item_" + b);
          this.palette.isSmallWin()
            ? (d.style.background = "#E8EAEB")
            : d.style.removeProperty("border");
          this.clearKBNavi();
          this.keyboardNavi = 4;
          this.curMenuItem = 0;
          this.palette.efmase_menugrp_click(b, a);
          this.hasFocus() || this.focus();
          this.selection.hasSelection || this.cursor.showCursor();
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
          a.preventDefault();
          break;
        case 3:
          return (
            (b =
              this.pData.PALETTE[this.curPaletteBtn.tab].GROUPS[
                this.curPaletteBtn.group
              ].ROWS[this.curPaletteBtn.row].ITEMS[this.curPaletteBtn.col]),
            this.clearKBNavi(),
            (this.keyboardNavi = 4),
            this.palette.handlePaletteBtnOverClick(b.id, a.pageX, a.pageY),
            org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a),
            a.preventDefault(),
            !1
          );
      }
    },
    setKBNavi: function (a) {
      switch (this.keyboardNavi) {
        case 1:
          if (this.palette.isSmallWin()) {
            var b = document.getElementById("efmase_menubar_item_Menu");
            b.style.border = "2px solid #000000";
          } else
            for (a = 0; a < this.menuItems.length; a++) {
              var e = document.getElementById(
                "efmase_menubar_item_" + this.menuItems[a]
              );
              if (!this.checkClass(e.className, "efmase_palettebtn_disabled")) {
                e.style.border = "2px solid #000000";
                this.curMenuItem = a;
                break;
              }
            }
          document.getElementsByName("efmase_menubar_item_logo")[0].focus();
          break;
        case 2:
          document.getElementsByName(this.palette.curtab)[0].focus();
          break;
        case 3:
          a = this.paletteTabs.indexOf(this.palette.curtab);
          var f = this.pData.PALETTE[a].GROUPS,
            e = this.getCurPalGrpId();
          if (-1 != e) {
            b = f[e].ROWS[0].ITEMS[0];
            f = b.id;
            "PALETTE_TAB_EDIT_BUTTONS" == this.palette.curtab &&
              (f = this.palette.symbols[b.id].name);
            for (
              var b = document.getElementsByName(f), g = 0;
              null === b[g].offsetParent;

            )
              g++;
            b = b[g];
            b.focus();
            d.setObjsAttrb(f, "border", "2px solid #000000");
            this.curPaletteBtn = { tab: a, group: e, row: 0, col: 0 };
          }
          break;
        case 4:
          this.hasFocus() || this.focus();
          this.selection.hasSelection || this.cursor.showCursor();
          break;
        case 5:
          (e = document.getElementsByClassName("imatheq_save_buttons")),
            0 == e.length && (e = document.getElementsByTagName("input")),
            0 < e.length && e[0].focus(),
            (this.curBtnBarBtn = 0),
            org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a),
            a.stopPropagation(),
            a.preventDefault(a);
      }
    },
    clearKBNavi: function () {
      switch (this.keyboardNavi) {
        case 1:
          this.palette.isSmallWin()
            ? document
                .getElementById("efmase_menubar_item_Menu")
                .style.removeProperty("border")
            : document
                .getElementById(
                  "efmase_menubar_item_" + this.menuItems[this.curMenuItem]
                )
                .style.removeProperty("border");
          this.curMenuItem = 0;
          break;
        case 3:
          if (null === this.curPaletteBtn) break;
          var a =
              this.pData.PALETTE[this.curPaletteBtn.tab].GROUPS[
                this.curPaletteBtn.group
              ].ROWS[this.curPaletteBtn.row].ITEMS[this.curPaletteBtn.col],
            b = a.id;
          "PALETTE_TAB_EDIT_BUTTONS" == this.palette.curtab &&
            (b = this.palette.symbols[a.id].name);
          d.setObjsAttrb(b, "border", null, "remove");
          this.curPaletteBtn = null;
          break;
        case 5:
          (a = document.getElementsByClassName("imatheq_save_buttons")),
            0 == a.length && (a = document.getElementsByTagName("input")),
            0 < a.length && a[0].focus(),
            null !== a[this.curBtnBarBtn] &&
              void 0 != a[this.curBtnBarBtn] &&
              a[this.curBtnBarBtn].blur(),
            (this.curBtnBarBtn = 0);
      }
    },
    getCurPalGrpId: function () {
      var a = this.paletteTabs.indexOf(this.palette.curtab),
        a = this.pData.PALETTE[a].GROUPS,
        b = 0;
      if ("PALETTE_TAB_EDIT_BUTTONS" == this.palette.curtab) {
        for (var d = 0; d < a.length; d++)
          if (
            ((gDiv = document.getElementById(a[d].id)),
            "none" != gDiv.style.display)
          ) {
            b = d;
            break;
          }
        d >= a.length && ((b = -1), (this.curPaletteBtn = null));
      }
      return b;
    },
    isSmallWinMenu: function () {
      return (
        document.getElementById("efmase_menubar_item_Close") &&
        "" == document.getElementById("efmase_menubar_item_Close").style.display
      );
    },
    onkeyup: function (a) {
      if (0 == a.ctrlKey && 1 == this.ctrlPressed) this.ctrlPressed = !1;
      else if (0 == a.metaKey && 1 == this.cmdPressed)
        this.ctrlPressed = this.cmdPressed = !1;
      else if (
        editor.isMobile &&
        229 == a.keyCode &&
        "efmase_focus_textarea" === a.target.className &&
        "" == a.target.value
      ) {
        if (this.selection.hasSelection) this.selection.remove();
        else {
          var b = this.cursor.position;
          0 < b.index
            ? (b.row.updateKeyword(this, b.index),
              b.row.updateKeyword(this, b.index - 1),
              b.row.backDelete(this))
            : null !== b.row.parent &&
              void 0 !== b.row.parent &&
              b.row.parent instanceof
                org.imatheq.formulaeditor.presentation.Lines &&
              0 < b.row.index &&
              this.presentation.children[0].deleteNewline(
                this,
                b.row.index - 1
              );
        }
        a.target.value = "$";
        a.target.innerHTML = "$";
        return !1;
      }
    },
    dec: function (a, b) {
      for (
        var d = this.b6de(b), e = this.sub(a), f = [], g = 0;
        g < d.length;
        g++
      )
        f[g] = d[g - 1] ^ d[g] ^ e[g % e.length];
      f.splice(0, f.indexOf(0) + 1);
      return this.ubs(f);
    },
    oncontextmenu: function (a) {
      if (this.selection.hasSelection) {
        if (d.isIE() || d.isFirefox()) this.textboxSel = !0;
        if (this.isMobile) return !1;
        this.textbox.select();
      }
      return !0;
    },
    onselectstart: function (a) {
      if (this.textboxSel) return (this.textboxSel = !1), !0;
      this.selection.selectAll();
    },
    changeFontsize: function (b) {
      b = this.canvas.getFontSizeIdx(b);
      for (i = 0; i < a.length; i++)
        a[i].execPalCmd(a[i].symbols["109"], "", b), a[i].editor.redraw();
      return !1;
    },
    setFontSizeIdx: function (a) {
      for (var d = 0; d < b.length; d++)
        b[d].canvas &&
          (b[d].canvas.setFontSizeIdx(a),
          b[d].canvas.clearBg(),
          b[d].redraw(!0));
      return !0;
    },
    setFontFamilyNameIdx: function (a) {
      for (var d = 0; d < b.length; d++)
        b[d].canvas && ((b[d].canvas.fontFamilyNameIdx = a), b[d].redraw());
      return !0;
    },
    initPress: function (a) {
      if (
        this.isMobile &&
        ((this.pressTimer = null), null === this.pressTimer)
      ) {
        var b = this;
        this.pressTimer = setTimeout(function () {
          b.cancelClicks();
          var d = b.mouseeventinfo(a);
          b.cursor.onmousedown(a, d.x, d.y);
          b.onpress(a);
          b.cancelPress();
          b.onEndBar = !0;
        }, 500);
      }
    },
    getpdata: function (a) {
      var b = this;
      if (!a || window.navigator.onLine) {
        var b = this,
          d = window.location.href.split("/")[2].replace(":", "_"),
          e = $buuuuu(),
          f =
            e.substring(0, e.indexOf("/")) +
            "//www.imatheq.com/imatheq?token=12346";
        if ("java" == this.system || "ijava" == this.system)
          f = e + "imatheq?token=12346";
        if ("net" == this.system || "inet" == this.system)
          f = e + "com/imatheq/default.aspx?token=12346";
        com.efmase.js.utilities.XMLHttp.call({
          url: f,
          type: "post",
          dataType: "json",
          data: {
            action: "pdata",
            lang: this.lang,
            dm: d,
            lsk: this.lskey,
            tstr: this.pdata.tstr0.toString(),
            rp: null === a || void 0 === a ? "false" : "true",
          },
          mimeType: "application/json",
          success: function (d) {
            void 0 !== d.error
              ? alert(d.error)
              : ((b.lst = d.lstype),
                (b.pdata.epc = d.epc),
                (b.pdata.tstr1 = new Date().getTime()),
                (null !== a && void 0 !== a && a) || b.getHeadlist(b.lang));
          },
          error: function (b, d, e) {
            a ||
              ("" == b.responseText
                ? alert("error in server call, status: " + d + ", error: " + e)
                : alert("error: status: " + d + ", error: " + e));
          },
        });
      }
    },
    cancelPress: function () {
      null !== this.pressTimer &&
        (clearTimeout(this.pressTimer), (this.pressTimer = null));
    },
    mouseMoved: function (a, b) {
      var d = this.initPosition;
      return 4 < Math.sqrt((d.x - a) * (d.x - a) + (d.y - b) * (d.y - b));
    },
    onkeypress: function (a) {
      if (null !== this.palette.activePanel)
        return this.palette.activePanel.onkeypress(a);
      if (this.hasFocus()) {
        var b = !0;
        if (a.ctrlKey)
          switch (a.charCode) {
            case 43:
              this.changeFontsize(1);
              b = !1;
              $;
              break;
            case 45:
              this.changeFontsize(-1), (b = !1);
          }
        else if (13 == a.charCode || 13 == a.keyCode)
          return this.presentation.children[0].onNewline(this);
        b &&
          (b = this.selection.hasSelection
            ? this.selection.parent.onkeypress(a, this)
            : this.cursor.position.row.onkeypress(a, this));
        return b;
      }
    },
    loadjs: function (a, b, d) {
      a = $buuuuu() + "com/imatheq/scripts/langs/" + a + "/" + b;
      b = document.createElement("script");
      b.setAttribute("type", "text/javascript");
      b.async = !0;
      b.onload = function () {
        return d();
      };
      b.setAttribute("src", a);
      document.getElementsByTagName("head")[0].appendChild(b);
    },
    mouseeventinfo: function (a) {
      var b = document.body.scrollTop + a.clientY,
        d = a.target || a.srcElement || a.relatedTarget;
      if (
        "efmase_focus_textarea" == d.className ||
        "fore_canvas" == d.className
      ) {
        var b = a.clientX,
          d = a.clientY,
          e = window.pageXOffset,
          f = window.pageYOffset;
        if (null === e || void 0 === e)
          (f = document.documentElement),
            (f && f.scrollLeft) || (f = document.body),
            (e = f.scrollLeft),
            (f = f.scrollTop);
        a.imatheqnoadjust || ((b += e), (d += f));
        var f = this.canvas.canvas,
          g = (e = 0),
          p = f.offsetWidth,
          t = f.offsetHeight;
        parent = f.parentNode;
        if ("EFMASE_Container" == parent.className) {
          var q = getComputedStyle(parent, "");
          parseInt(q.paddingLeft);
          parseInt(q.paddingTop);
          parseInt(q.paddingRight);
          parseInt(q.paddingBottom);
        }
        var q =
            void 0 !== f.currentStyle && null !== f.currentStyle
              ? f.currentStyle
              : getComputedStyle(f, null),
          u,
          v;
        v = parseInt(q.borderLeftWidth);
        u = parseInt(q.paddingLeft);
        isFinite(u) && isFinite(v)
          ? (e = u > v ? e + u : e + v)
          : isFinite(u)
          ? (e += u)
          : isFinite(v) && (e += v);
        v = parseInt(q.borderTopWidth);
        u = parseInt(q.paddingTop);
        for (
          isFinite(u) && isFinite(v)
            ? (g = u > v ? g + u : g + v)
            : isFinite(u)
            ? (g += u)
            : isFinite(v) && (g += v);
          f;

        )
          (e += f.offsetLeft), (g += f.offsetTop), (f = f.offsetParent);
        for (f = this.canvas.canvas; f; )
          f.scrollLeft &&
            "div" == f.localName.toLowerCase() &&
            (e -= f.scrollLeft),
            f.scrollTop &&
              "div" == f.localName.toLowerCase() &&
              (g -= f.scrollTop),
            (f = f.parentNode);
        return !this.isMobile &&
          ((f = this.canvas.canvas.parentNode),
          a.offsetX >= f.clientWidth || a.offsetY >= f.clientHeight)
          ? { pos: "out", x: 0, y: 0 }
          : e <= b && b <= e + p && g <= d && d <= g + t
          ? { pos: "canvas", x: b - e, y: d - g }
          : { pos: "canvas", x: b < e ? 0 : p, y: d < g ? 0 : t };
      }
      if ("EFMASE_Container" == d.className)
        return { pos: "scroll", x: 0, y: 0 };
      a = 0;
      for (d = this.canvas.canvas.parentNode; d; )
        (a += d.offsetTop - d.scrollTop + d.clientTop), (d = d.offsetParent);
      return b <= a
        ? { pos: "palette", x: 0, y: 0 }
        : { pos: "out", x: 0, y: 0 };
    },
    onpress: function (a) {
      a = this.mouseeventinfo(a);
      if ("canvas" == a.pos)
        this.selection.hasSelection && this.selection.clear(),
          (a = this.cursor.position),
          (a = this.selection.getSelection(
            { row: a.row, index: 0 },
            { row: a.row, index: a.row.children.length }
          )),
          null != a && this.selection.setSelection(a);
      else return "out" == a.pos && this.blur(), !0;
    },
    isPanelEvent: function (a) {
      for (
        a = a.target || a.srcElement || a.relatedTarget;
        a &&
        "efmase_panel_pad" != a.className &&
        "body" !== a.localName.toLowerCase();

      )
        a = a.parentNode;
      return null !== a && "efmase_panel_pad" == a.className;
    },
    onmousedown: function (a) {
      var b = !0;
      if (null !== this.palette.activePanel && this.isPanelEvent(a)) return !0;
      this.palette.clearPanels();
      if (this.isMobile && !a.imatheqadjust) return !0;
      var e = this.mouseeventinfo(a);
      if ("canvas" == e.pos) {
        this.clearKBNavi();
        this.keyboardNavi = 4;
        if (0 == a.button) {
          this.mouseIsDown = !0;
          this.initPosition = { x: a.clientX, y: a.clientY };
          if (this.isMobile) {
            this.isDragging =
              this.onEndBar =
              this.onStartBar =
              this.onCursorBar =
                !1;
            this.selection.hasSelection
              ? ((this.onStartBar = this.selection.isOnCaret(
                  "start",
                  e.x,
                  e.y
                )),
                (this.onEndBar = this.selection.isOnCaret("end", e.x, e.y)))
              : this.hasFocus() &&
                (this.onCursorBar = this.cursor.isOnCaret(e.x, e.y));
            if (this.onStartBar || this.onEndBar || this.onCursorBar)
              return this.cancelClicks(), !0;
            this.initPress(a);
          }
          this.isMobile ||
            (document.selection
              ? document.selection.empty()
              : window.getSelection && window.getSelection().removeAllRanges());
        }
        0 == this.clickState ? this.initClicks() : this.clickState++;
        this.isMobile ||
          (this.hasFocus() ||
            (this.focus(),
            this.selection.hasSelection || this.cursor.showCursor(),
            d.isIE() || window.focus()),
          !this.isMobile && d.isIE() && a.preventDefault(),
          (b = this.cursor.onmousedown(a, e.x, e.y)));
      } else
        "out" == e.pos &&
          (this.clearKBNavi(), (this.keyboardNavi = 0), this.blur());
      return b;
    },
    onmousemove: function (a) {
      if (
        !this.mouseIsDown ||
        (null !== this.palette.activePanel && this.isPanelEvent(a)) ||
        (this.isMobile && !a.imatheqadjust)
      )
        return !0;
      var b = this.mouseeventinfo(a);
      if ("canvas" == b.pos) {
        !this.isDragging &&
          this.mouseMoved(a.clientX, a.clientY) &&
          ((this.isDragging = !0),
          this.cancelClicks(),
          this.isMobile && null !== this.pressTimer && this.cancelPress());
        var e = b.x,
          b = b.y,
          f = null,
          g = (f = null);
        if (this.isDragging) {
          if (this.isMobile)
            if (this.onCursorBar || this.onStartBar || this.onEndBar) {
              b -= 2 * d.caretSize;
              if (this.onCursorBar)
                return (
                  this.cursor.onmousedown(a, e, b),
                  a.stopPropagation(),
                  a.preventDefault(),
                  !1
                );
              this.onStartBar
                ? ((f = this.selection.endPosition),
                  (this.onStartBar = !1),
                  (this.onEndBar = !0))
                : this.onEndBar && (f = this.selection.startPosition);
            } else return !0;
          else f = this.selection.startPosition;
          if (
            (g = this.presentation.getCursorPosition(
              this.getPresentationContext(),
              e,
              b
            ))
          )
            (f = this.selection.getSelection(f, g)),
              null != f
                ? this.selection.setSelection(f)
                : this.selection.clear(),
              this.cursor.setPosition(g);
          this.isMobile || a.preventDefault();
        }
      }
      return !0;
    },
    onmouseup: function (a) {
      this.isDragging = this.mouseIsDown = !1;
      this.initPosition = null;
      if (this.isMobile && !a.imatheqadjust) return !0;
      var b = this.mouseeventinfo(a);
      0 < this.clickState && this.clickState++;
      this.isMobile &&
        2 == this.clickState &&
        (this.hasFocus() ||
          (this.focus(),
          this.selection.hasSelection || this.cursor.showCursor(),
          d.isIE() || window.focus()),
        (ret = this.cursor.onmousedown(a, b.x, b.y)));
      if (4 == this.clickState) this.onpress(a);
      6 == this.clickState && (this.selection.selectAll(), this.cancelClicks());
      return this.isMobile &&
        (this.cancelPress(),
        this.onCursorBar || this.onStartBar || this.onEndBar)
        ? (a.stopPropagation(),
          a.preventDefault(),
          (this.onEndBar = this.onStartBar = this.onCursorBar = !1))
        : !0;
    },
    initClicks: function (a) {
      this.clickState = 1;
      this.cancelClicksTimer = null;
      if (null === this.cancelClicksTimer) {
        var b = this;
        this.cancelClicksTimer = setTimeout(function () {
          b.clickState = 0;
        }, 500);
      }
    },
    cancelClicks: function () {
      this.clickState = 0;
      null !== this.cancelClicksTimer &&
        (clearTimeout(this.cancelClicksTimer), (this.cancelClicksTimer = null));
    },
    oncopy: function (a) {
      if (!this.selection.hasSelection) return !0;
      window.clipboardData
        ? window.clipboardData.setData("text/plain", this.selection.getMathML())
        : a.clipboardData
        ? a.clipboardData.setData("text/plain", this.selection.getMathML())
        : alert("Clipboard Data are not supported in this browser. Sorry.");
      a.preventDefault();
    },
    onCutCopy: function (a, b) {
      if (!this.selection.hasSelection) return !0;
      this.hasFocus() || this.focus();
      var d = this.selection.getMathML();
      "cut" == b && this.selection.remove();
      if (this.isMobile)
        try {
          "https:" != location.protocol
            ? alert(
                "In order to use this function, you need to access iMathEQ Math Equation Editor with HTTPS."
              )
            : null === navigator ||
              void 0 === navigator ||
              null === navigator.clipboard ||
              void 0 === navigator.clipboard
            ? alert(
                "Your browser/device currently does not support this function."
              )
            : navigator.clipboard.writeText(d);
        } catch (e) {
          alert(e);
        }
      else {
        if (document.body.createTextRange) {
          var f = document.createElement("div");
          f.style.opacity = 0;
          f.style.position = "absolute";
          f.style.pointerEvents = "none";
          f.style.zIndex = -1;
          document.body.appendChild(f);
          f.innerHTML = d
            .replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
          d = document.createRange();
          d.setStartBefore(f.firstChild);
          d.setEndAfter(f.lastChild);
          window.getSelection().addRange(d);
          try {
            document.execCommand("copy") ||
              console.log("execCommand returned false !");
          } catch (g) {
            console.log("execCommand failed ! exception " + g);
          }
          document.body.removeChild(f);
        } else if (window.clipboardData)
          window.clipboardData.setData("text/plain", d);
        else if (a.clipboardData) a.clipboardData.setData("text/plain", d);
        else {
          f = document.createElement("textarea");
          f.style.opacity = 0;
          f.style.position = "absolute";
          f.style.pointerEvents = "none";
          f.style.zIndex = -1;
          document.body.appendChild(f);
          f.value = d;
          f.select();
          try {
            document.execCommand("copy") ||
              console.log("execCommand returned false !");
          } catch (p) {
            console.log("execCommand failed ! exception " + p);
          }
        }
        a.preventDefault();
        this.focus();
      }
    },
    b6de: function (a) {
      var b,
        d,
        e,
        f,
        g,
        p = 0,
        t = [];
      if (!a) return a;
      a += "";
      do
        (b =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
            a.charAt(p++)
          )),
          (d =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
              a.charAt(p++)
            )),
          (f =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
              a.charAt(p++)
            )),
          (g =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
              a.charAt(p++)
            )),
          (e = (b << 18) | (d << 12) | (f << 6) | g),
          (b = (e >> 16) & 255),
          (d = (e >> 8) & 255),
          (e &= 255),
          t.push(b),
          64 !== f && (t.push(d), 64 !== g && t.push(e));
      while (p < a.length);
      return t;
    },
    clearMathML: function () {
      if (this.redrawing || this.initializing) {
        var a = this;
        setTimeout(function () {
          a.clearMathML();
        }, 1e3);
      } else
        try {
          this.selection.selectAll(),
            this.selection.remove(),
            this.actions.clear();
        } catch (b) {
          throw Error("Error in clearMathML()");
        }
    },
    getpc: function () {
      var a = this.pdata;
      return this.dec(a.tstr0.toString(), a.epc);
    },
    doonpaste: function (a, b) {
      var d = org.imatheq.formulaeditor.presentation,
        e = this.selection,
        f = this.getButtonStatus(),
        g = null;
      e.hasSelection && (g = e.getSelectionCopy());
      this.cursor.hideCursor();
      var p = this.getExpressionParsingContext(),
        t = {
          row: this.cursor.position.row,
          index: this.cursor.position.index,
        },
        q = {
          row: this.cursor.position.row,
          index: this.cursor.position.index,
        },
        u =
          (e.hasSelection &&
            (e.parent instanceof d.PArray ||
              (!(e.parent instanceof d.Lines) &&
                !(e.parent.parent instanceof d.Lines)))) ||
          (!e.hasSelection &&
            !(this.cursor.position.row.parent instanceof d.Lines));
      a = a.replace(RegExp("<mi>\u21b5</mi>", "g"), "");
      a = a.replace(RegExp("opens*=s*['|\"]<['|\"]", "g"), "open='&lt;'");
      a = a.replace(RegExp("closes*=s*['|\"]>['|\"]", "g"), "close='&gt;'");
      a = a.replace(RegExp('mathcolor="null"', "g"), "");
      var v = this.getPresentationFromMathML(p, a, u, b);
      if (null === v && ((v = new d.Row(a)), null === v)) return !1;
      if (e.hasSelection && e.parent instanceof d.PArray) {
        f = e.copy();
        p = this.cursor.position.row.getIndexChain(this.cursor.position.index);
        u = "update";
        g = e.parent;
        q.row = g;
        if (e.endIndex < e.startIndex)
          throw new error(
            "onpaste: PArray selection.endIndex<selection.startIndex"
          );
        var y = g.deleteValues(e.startIndex, e.endIndex - 1);
        q.index = e.startIndex;
        var A = g.children.length - e.endIndex;
        g.updateValues(v, e.startIndex, e.endIndex - 1);
        t = g.children[e.endIndex - 1].getLastCursorPosition(
          this.getPresentationContext()
        );
        e.clear();
        v = t.row.getIndexChain(t.index);
        this.actions.addAction(u, q, p, v, y, null, A, f);
      } else {
        var p = this.cursor.position.row.getIndexChain(
            this.cursor.position.index
          ),
          u = "insert",
          y = null,
          C = this.cursor.position.row,
          A =
            this.cursor.position.row.children.length -
            this.cursor.position.index;
        e.hasSelection &&
          ((u = "update"),
          (q.row = e.parent),
          e.removeEndNewline(),
          e.parent instanceof d.Row
            ? ((t = { row: e.parent, index: e.startIndex }),
              (A = e.parent.children.length - e.endIndex))
            : ((y = e.parent.getGrandChild(e.startIndex)),
              (t = { row: y.parent, index: y.index }),
              (A = e.parent.getNumGrandChildren() - e.endIndex)),
          (y = e.parent.remove(e.startIndex, e.endIndex)),
          (q.index = e.startIndex),
          (C = t.row));
        v instanceof d.PArray && (v = new d.Row(v));
        1 == C.children.length &&
          C.children[0] instanceof d.BlockSymbol &&
          ((u = "update"),
          (y = C.remove(0, 1)),
          (A = 0),
          1 == t.index && (t.index = 0));
        if (v instanceof d.Row) {
          if (v.children)
            for (var z = 0; z < v.children.length; z++)
              (d = C.insert(t.index, v.children[z], 0 === z)) && t.index++;
          C.flatten();
          v = t.row.getIndexChain(t.index);
        } else
          (q = C.parent.getGrandChildIndex(
            C.index,
            this.cursor.position.index
          )),
            (A = C.parent.getNumGrandChildren() - q),
            (t = q + v.getNumGrandChildren()),
            C.parent.insert(q, v),
            (t = C.parent.getGrandChild(t)),
            (v = t.parent.getIndexChain(t.index)),
            (t = { row: t.parent, index: t.index }),
            (q = { row: C.parent, index: q });
        e.clear();
        this.actions.addAction(u, q, p, v, y, null, A, g, null, f);
      }
      this.cursor.setPosition(t);
      this.redraw();
      return !1;
    },
    onpaste: function (a) {
      var b = "";
      if (!this.hasFocus()) return !0;
      this.pasteEvtSupport = !1;
      null !== this.pasteCache && (this.pasteCache.innerHTML = "");
      window.clipboardData
        ? (b = window.clipboardData.getData("Text"))
        : a.clipboardData && (b = a.clipboardData.getData("Text"));
      "" != b && (this.doonpaste(b, !1), a.preventDefault());
    },
    fetchData: function (a) {
      var b = this.getpc();
      return this.dec(b, a);
    },
    onresize: function (a) {
      if (!this.isMobile)
        if (this.redrawing || this.initializing) {
          var b = this;
          setTimeout(function () {
            b.onresize(a);
          }, 200);
        } else
          try {
            clearTimeout(this.resizeTimer),
              (b = this),
              (this.resizeTimer = setTimeout(function () {
                b.resizeWindow();
                b.redraw();
              }, 250));
          } catch (d) {
            throw Error("Error in onresize()");
          }
    },
    getScrollBarWidth: function () {
      var a = document.createElement("p");
      a.style.width = "100%";
      a.style.height = "200px";
      var b = document.createElement("div");
      b.style.position = "absolute";
      b.style.top = "0px";
      b.style.left = "0px";
      b.style.visibility = "hidden";
      b.style.width = "200px";
      b.style.height = "150px";
      b.style.overflow = "hidden";
      b.appendChild(a);
      document.body.appendChild(b);
      var d = a.offsetWidth;
      b.style.overflow = "scroll";
      a = a.offsetWidth;
      d == a && (a = b.clientWidth);
      document.body.removeChild(b);
      return d - a;
    },
    resizeWindow: function () {
      var a = window.innerWidth;
      this.isMobile || null === this.width || (a = this.width);
      var b = window.innerHeight;
      this.isMobile || null === this.height || (b = this.height + 21);
      var d = document.getElementsByClassName("efmase_tab_bar");
      0 < d.length && (d[0].style.width = parseInt(a) - 18 + "px");
      for (
        var d = document.querySelectorAll(".efmase_palette"), e = 0;
        e < d.length;
        e++
      )
        d[e].style.width = parseInt(a) - 18 + "px";
      a = parseInt(a) - 28;
      b = parseInt(b) - 290;
      d = this.canvas.canvas.parentNode;
      d.style.width = a + 22 + "px";
      d.style.height = b + 22 + "px";
      this.isMobile ||
        ((this.textbox.style.width = a + "px"),
        (this.textbox.style.height = b + "px"),
        this.isMobile && (this.textbox.style.height = b + 22 + "px"),
        (this.textbox.style.marginTop = -b - 28 + "px"));
      null === this.palette || this.isMobile || this.palette.redrawMenuBar();
    },
    resizeCanvas: function (a, b) {
      var e = this.canvas.canvas,
        f = this.canvas.bgCanvas,
        g = window.innerWidth;
      this.isMobile || null === this.width || (g = this.width);
      var n = window.innerHeight;
      this.isMobile || null === this.height || (n = this.height + 21);
      yScrollbarWidth = xScrollbarWidth = this.getScrollBarWidth();
      var p = parseInt(g) - 6 - xScrollbarWidth - 12,
        t = parseInt(n) - 290 - xScrollbarWidth,
        g = p,
        n = t,
        q = 0,
        q = 0;
      null !== b &&
        void 0 !== b &&
        b.width >= p &&
        ((q = Math.round(p / 2)), (g = Math.round(b.width / q + 0.5) * q));
      null !== b &&
        void 0 !== b &&
        b.height >= t &&
        ((q = Math.round(t / 2)),
        (n = Math.round(b.height / q + 0.5) * q),
        this.isMobile &&
          (n = Math.round((b.height + 3 * d.caretSize) / q + 0.5) * q));
      null === b ||
        void 0 === b ||
        (g == parseInt(e.style.width) && n == parseInt(e.style.height)) ||
        (e.setAttribute("width", 2 * g),
        e.setAttribute("height", 2 * n),
        f.setAttribute("width", 2 * g),
        f.setAttribute("height", 2 * n),
        (e.style.width = g + "px"),
        (e.style.height = n + "px"),
        (e.style.marginTop = -n - 4 + "px"),
        (f.style.width = g + "px"),
        (f.style.height = n + "px"),
        e.getContext("2d").scale(2, 2),
        f.getContext("2d").scale(2, 2));
      var u = this;
      u.isMobile ||
        (this.resizeTimer = setTimeout(function () {
          u.textbox.style.width = p + 2 + "px";
          u.textbox.style.height = t + 22 + "px";
          u.isMobile && (u.textbox.style.height = t + "px");
        }, 250));
    },
    getAltstrs: function () {
      ed = this;
      this.loadjs("en", "alttext.js", function () {
        ed.pdata.tstr5 = new Date().getTime();
        ed.getData();
      });
    },
    getPresentationFromMathML: function (a, b, d, e) {
      if ("" == b) return null;
      var f = org.imatheq.formulaeditor.presentation,
        g = org.imatheq.formulaeditor.parsing.mathml.MathMLParser,
        p = {},
        t;
      for (t in a) p[t] = a[t];
      try {
        var q = new g().parseString(b, p, d);
        return 1 == q.children.length &&
          1 == q.children[0].children.length &&
          q.children[0].children[0] instanceof f.PArray &&
          e
          ? q.children[0].children[0]
          : q;
      } catch (u) {
        try {
          return (
            (newmathml =
              "<math><mi>" +
              b
                .replace(/&/g, "&amp;")
                .replace(/>/g, "&gt;")
                .replace(/</g, "&lt;")
                .replace(/"/g, "&quot;") +
              "</mi></math>"),
            (q = new g().parseString(newmathml, p, d)),
            1 == q.children.length &&
            1 == q.children[0].children.length &&
            q.children[0].children[0] instanceof f.PArray &&
            e
              ? q.children[0].children[0]
              : q
          );
        } catch (v) {
          return new f.Row(b.trim());
        }
      }
    },
    focus: function () {
      this.isMobile ? (this.focused = !0) : this.textbox.focus();
      var a = this.cursor.position;
      1 == a.row.children.length &&
        a.row.children[0] instanceof
          org.imatheq.formulaeditor.presentation.BlockSymbol &&
        (a.index = 0);
    },
    blur: function () {
      this.hasFocus() &&
        (org.imatheq.formulaeditor.FormulaEditor.lastFocused = this);
      this.cursor.hideCursor();
      this.isMobile ? (this.focused = !1) : this.textbox.blur();
      this.cancelClicks();
    },
    getFontFamilyNameIdx: function () {
      return this.canvas.fontFamilyNameIdx;
    },
    getMathML: function () {
      var a;
      try {
        a =
          '<math xmlns="http://www.w3.org/1998/Math/MathML"' +
          (this.in_attrbs ? this.in_attrbs : "") +
          ">" +
          this.presentation.getMathML() +
          "</math>";
      } catch (b) {
        a =
          '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>' +
          b.toString() +
          "</mtext></math>";
      }
      return a;
    },
    setMathML: function (a) {
      if (null !== a && void 0 !== a && "" != a)
        if (this.redrawing || this.initializing) {
          var b = this;
          setTimeout(function () {
            b.setMathML(a);
          }, 1e3);
        } else
          try {
            this.selection.selectAll(),
              this.focus(),
              this.doonpaste(a, !1),
              this.actions.clear();
          } catch (d) {
            throw Error("Error in setMathML()");
          }
    },
    getImage: function () {
      return this.gifunc["gi" + this.lst]();
    },
    indentXML: function (a) {
      var b = [],
        d,
        e,
        f = 0,
        g,
        p = function () {
          var a;
          0 < b.length && b.push("\n");
          for (a = f; 0 < a; a--) b.push("  ");
        };
      for (d = 0; 0 <= (e = a.indexOf("<", d)); ) {
        e > d && (!0 === g && p(), b.push(a.substr(d, e - d)), (d = e));
        e++;
        c = a.charAt(e);
        switch (c) {
          case "/":
            --f;
            0 > f && (f = 0);
            !0 === g && p();
            e = a.indexOf(">", e);
            if (0 > e) return b.join("") + a.substr(d);
            e += 1;
            g = !0;
            break;
          case "!":
            e++;
            c = a.charAt(e);
            switch (c) {
              case "[":
                g = !0;
                e = a.indexOf("]]\x3e", e);
                if (0 > e) return b.join("") + a.substr(d);
                e += 3;
                p();
                break;
              case "-":
                g = !0;
                e = a.indexOf("--\x3e", e);
                if (0 > e) return b.join("") + a.substr(d);
                e += 3;
                p();
                break;
              default:
                return b.join("") + a.substr(d);
            }
            break;
          default:
            e = a.indexOf(">", e);
            if (0 > e) return b.join("") + a.substr(d);
            p();
            "/" != a.charAt(e - 1) ? ((g = !1), (f += 1)) : (g = !0);
            e += 1;
        }
        b.push(a.substr(d, e - d));
        d = e;
      }
      d < a.length && b.push(a.substr(d));
      return b.join("");
    },
    getData: function () {
      var a = this.fetchData(ime_js_dat_symbollist);
      try {
        this.palette.symbols = JSON.parse(a);
      } catch (b) {
        throw Error("Fail to parse: ime_js_dat_symbollist, " + b);
      }
      this.symbolindex = {};
      this.encloses = {};
      for (var d in this.palette.symbols)
        if (
          ((a = this.palette.symbols[d]),
          "ch" == a.tp &&
            (null === a.font ||
              ("imescr7" != a.font &&
                "eufm7" != a.font &&
                "msbm7" != a.font)) &&
            "d" != a.ch)
        )
          this.symbolindex[a.ch] = d;
        else if ("enclose" == a.sub_tp) this.symbolindex[a.name] = d;
        else if (null !== a.middle_bracket && void 0 !== a.middle_bracket)
          this.symbolindex[a.middle_bracket] = d;
        else if ("vertical_bracket" == a.sub_tp || "bracket" == a.sub_tp)
          this.symbolindex[a.bracket] = d;
      this.drawEditor(this.lang);
    },
    gi0: function () {
      var a;
      try {
        var b = this.canvas.canvas;
        b.toDataURL("image/png");
        var d = document.getElementById("com_imatheq_loading_msg");
        d.innerHTML = "Generating image, please wait...";
        d.style.display = "";
        this.canvas.readonly = !0;
        this.redraw();
        var e = document.createElement("canvas"),
          f = 2 * this.presentation.dimensions.width,
          g = 2 * this.presentation.dimensions.height;
        e.setAttribute("width", f / 2 + 20);
        e.setAttribute("height", g / 2 + 8);
        e.getContext("2d").drawImage(
          b,
          40,
          16,
          f + 4,
          g + 4,
          2,
          2,
          (f + 4) / 2,
          (g + 4) / 2
        );
        e.toDataURL("image/png");
        e.toDataURL("image/png");
        this.canvas.readonly = !1;
        this.redraw();
        var p = document.createElement("canvas"),
          t = p.getContext("2d"),
          q,
          u;
        q = p.width = e.width;
        u = p.height = e.height;
        t.drawImage(e, 0, 0);
        p.toDataURL("image/png");
        lineW = 40 < q ? 20 : q / 2;
        b = lineW / 2;
        t.beginPath();
        t.globalAlpha = 0.5;
        t.lineWidth = lineW;
        for (t.strokeStyle = "#97F1EC"; b < q + u - lineW / 2; )
          b < u
            ? (t.moveTo(b, 0), t.lineTo(0, b))
            : (b < q ? t.moveTo(b, 0) : t.moveTo(q, b - q), t.lineTo(b - u, u)),
            (b += 2 * lineW);
        t.stroke();
        a = p.toDataURL("image/png");
        d.innerHTML = "Loading, please wait...";
        d.style.display = "none";
      } catch (v) {}
      return a;
    },
    getExpressionParsingContext: function () {
      return org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser.getContext();
    },
    getPresentationContext: function () {
      Options = new org.imatheq.formulaeditor.Options();
      return Options.getPresentationContext();
    },
  });
  org.imatheq.formulaeditor.FormulaEditor.addDebug = function (a) {
    void 0 !== e && null !== e && e.addDebug(a);
    return e;
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanup = function () {
    this.cleanupEditors();
    this.cleanupCanvases();
    this.cleanupTextareas();
    this.cleanupGroup();
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanupCanvases = function () {
    var a = document.getElementsByTagName("canvas");
    for (i = 0; i < a.length; i++) {
      var b = a[i];
      (classattribute = b.getAttribute("class")) ||
        (classattribute = b.getAttribute("className"));
      classattribute &&
        classattribute.match(/(^| )imatheqformula($| )/) &&
        (this.getEditorByCanvas(b) || b.parentNode.removeChild(b));
    }
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanupEditors = function () {
    for (var a = b.length; 0 < a; a--) {
      var d = b[a - 1].canvas.canvas,
        e = b[a - 1].textarea;
      (d && e) ||
        (d && d.parentNode && d.parentNode.removeChild(d),
        e && e.parentNode && e.parentNode.removeChild(e),
        delete b[a - 1],
        b.splice(a - 1, 1));
    }
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanupGroup = function () {
    var a,
      d = !0;
    for (a = 0; a < b.length; a++) {
      var e = b[a].canvas.canvas,
        f = b[a].textarea;
      e && e.parentNode && f && f.parentNode
        ? (e.nextSibling && e.nextSibling == f) ||
          ((f = f.cloneNode(!0)),
          e.nextSibling
            ? e.parentNode.insertBefore(f, e.nextSibling)
            : e.parentNode.appendChild(f),
          (b[a].textarea = f),
          textarea.parentNode.removeChild(textarea))
        : (d = !1);
    }
    return d;
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanupTextareas = function () {
    var a = document.getElementsByTagName("textarea");
    for (i = 0; i < a.length; i++) {
      var b = a[i];
      (classattribute = b.getAttribute("class")) ||
        (classattribute = b.getAttribute("className"));
      if (classattribute && classattribute.match(/(^| )imatheqformula($| )/)) {
        var d = this.getEditorByTextArea(b);
        d ? (b.innerHTML = d.textarea.value) : b.parentNode.removeChild(b);
      }
    }
  };
  org.imatheq.formulaeditor.FormulaEditor.deleteEditor = function (a) {
    var d;
    if ("number" == typeof a) {
      if (((d = a), 0 > d || d >= b.length)) return !1;
    } else if (a instanceof org.imatheq.formuleditor.FormulaEditor) {
      for (d = 0; d < b.length && b[d] != a; ) d++;
      if (d == b.length) return !1;
    } else return !1;
    a = b[d].canvas.canvas;
    var e = b[d].textarea;
    a && a.parentNode && a.parentNode.removeChild(a);
    e && e.parentNode && e.parentNode.removeChild(e);
    delete b[d];
    b.splice(d, 1);
    return !0;
  };
  org.imatheq.formulaeditor.FormulaEditor.getEditorByCanvas = function (a) {
    var d;
    if (void 0 === a || null === a) return null;
    if ("string" == typeof a)
      for (d = 0; d < b.length; d++) {
        if (a == b[d].canvas.id) return b[d];
      }
    else if (a instanceof HTMLElement)
      for (d = 0; d < b.length; d++) if (b[d].canvas.canvas == a) return b[d];
    return null;
  };
  org.imatheq.formulaeditor.FormulaEditor.getEditorByTextArea = function (a) {
    var d;
    if (void 0 === a || null === a) return null;
    if ("string" == typeof a)
      for (d = 0; d < b.length; d++) {
        if (a == b[d].textarea.id) return b[d];
      }
    else if (a instanceof HTMLElement)
      for (d = 0; d < b.length; d++) if (b[d].textarea == a) return b[d];
    return null;
  };
  org.imatheq.formulaeditor.FormulaEditor.getFocusedEditor = function () {
    for (var a = 0; a < b.length; a++) if (b[a].hasFocus()) return b[a];
    return null;
  };
  org.imatheq.formulaeditor.FormulaEditor.getFirstEditor = function () {
    return b[0];
  };
  org.imatheq.formulaeditor.FormulaEditor.lastFocused = null;
  org.imatheq.formulaeditor.FormulaEditor.getLastFocusedEditor = function () {
    var a = org.imatheq.formulaeditor.FormulaEditor.getFocusedEditor();
    return null !== a ? a : org.imatheq.formulaeditor.FormulaEditor.lastFocused;
  };
  org.imatheq.formulaeditor.FormulaEditor.getEditor = function () {
    var a = org.imatheq.formulaeditor.FormulaEditor.getFocusedEditor();
    null === a &&
      (a = org.imatheq.formulaeditor.FormulaEditor.getFirstEditor());
    return a;
  };
  org.imatheq.formulaeditor.FormulaEditor.updateByTextAreas = function (a) {
    var d = document.getElementsByTagName("div"),
      e;
    if (a) {
      for (a = 0; a < b.length; ) {
        for (e = 0; e < d.length && b[a].textarea != d[e]; ) e++;
        e == d.length ? this.deleteEditor(a) : (a += 1);
      }
      this.cleanupCanvases();
    }
    for (a = 0; a < d.length; a++) {
      var f = d[a];
      (e = f.getAttribute("class")) || (e = f.getAttribute("className"));
      e &&
        e.match(/(^| )imatheqformula($| )/) &&
        new org.imatheq.formulaeditor.FormulaEditor(f);
    }
  };
  org.imatheq.formulaeditor.FormulaEditor.addEventListener = function (
    a,
    b,
    d
  ) {
    a.attachEvent ? a.attachEvent("on" + b, d) : a.addEventListener(b, d, !1);
  };
  org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation = function (a) {
    a.stopPropagation ? a.stopPropagation() : (a.cancelBubble = !0);
  };
  org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault = function (a) {
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  };
  org.imatheq.formulaeditor.Palette = $extend(
    org.imatheq.formulaeditor.FormulaEditor,
    {
      container: null,
      menubar: null,
      palette: null,
      editor: null,
      curtab: "PALETTE_TAB_BASIC",
      symbols: null,
      smallwindow: null,
      matrixPanel: null,
      bracketPanel: null,
      colorPanel: null,
      sizePanel: null,
      fontsizePanel: null,
      fontnamePanel: null,
      description: null,
      curBtnId: null,
      activePanel: null,
      isSmallWin: function () {
        return null !== this.smallwindow && this.smallwindow;
      },
      htmlelement: null,
      initialize: function (b, d, e) {
        if (!b) return null;
        this.container = b;
        this.editor = d;
        this.symbols = null;
        d.isMobile && (this.curtab = "PALETTE_TAB_KEYBOARD");
        org.imatheq.formulaeditor.options.paletteURL
          ? ((b = org.imatheq.formulaeditor.options.paletteURL),
            org.imatheq.formulaeditor.Palette.description ||
              ((org.imatheq.formulaeditor.Palette.description = "loading"),
              com.efmase.js.utilities.XMLHttp.getText(b, function (b) {
                org.imatheq.formulaeditor.Palette.description = b;
                for (b = 0; b < a.length; b++)
                  a[b].loadPalette(
                    org.imatheq.formulaeditor.Palette.description
                  ),
                    a[b].draw();
              })),
            (d.palette = this))
          : (org.imatheq.formulaeditor.Palette.description =
              org.imatheq.formulaeditor.Palettes.defaultPalette);
      },
      initPanels: function () {
        this.matrixPanel =
          new org.imatheq.formulaeditor.presentation.MatrixPanel(this);
        this.bracketPanel =
          new org.imatheq.formulaeditor.presentation.BracketPanel(this);
        this.sizePanel = new org.imatheq.formulaeditor.presentation.SizePanel(
          this,
          "0px 1px 2px 3px 4px 5px 6px 7px 8px 9px 10px 12px 15px 20px 25px 30px 35px 40px".split(
            " "
          )
        );
        this.fontsizePanel =
          new org.imatheq.formulaeditor.presentation.SizePanel(
            this,
            [8, 9, 10, 11, 12, 15, 18, 24, 30, 36, 48, 60, 72, 96]
          );
        for (
          var a = this.editor.palette.symbols["108"].ITEMS, b = [], d = 0;
          d < a.length;
          d++
        )
          b.push(this.editor.pData.TITLES[a[d]]);
        this.fontnamePanel =
          new org.imatheq.formulaeditor.presentation.SizePanel(this, b, 1);
        this.colorPanel = new org.imatheq.formulaeditor.presentation.ColorPanel(
          this
        );
      },
      loadPalette: function (a, b) {
        var d = new org.imatheq.formulaeditor.parsing.xml.XMLParser(),
          e;
        e = d.loadXml(a).documentElement;
        d.removeComments(e);
        d.removeWhitespace(e);
        this.menubar = e.childNodes.item(0);
        this.palette = e.childNodes.item(1);
      },
      efmase_menugrp_timeout: 500,
      efmase_menugrp_closetimer: 0,
      efmase_menugrp_ddmenugrp: 0,
      efmase_menugrp_cancelclosetime: function () {
        this.efmase_menugrp_closetimer &&
          (window.clearTimeout(this.efmase_menugrp_closetimer),
          (this.efmase_menugrp_closetimer = null));
      },
      efmase_menugrp_click: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation;
        this.clearPanels();
        this.efmase_menugrp_cancelclosetime();
        this.efmase_menugrp_ddmenugrp &&
          (this.efmase_menugrp_ddmenugrp.style.visibility = "hidden");
        var e = document.getElementById("efmase_menubar_item_" + a);
        if (null !== e && void 0 !== e) {
          var f = this.editor,
            g = e.getAttribute("name");
          switch (g) {
            case "efmase_menubar_item_logo":
              window.open("http://www.imatheq.com", "_blank").focus();
              break;
            case "efmase_menubar_item_undo":
              f.actions.undo();
              break;
            case "efmase_menubar_item_redo":
              f.actions.redo();
              break;
            case "efmase_menubar_item_bold":
              f.setBold();
              break;
            case "efmase_menubar_item_italic":
              f.setForcedItalic();
              break;
            case "efmase_menubar_item_autoitalic":
              f.hasFocus() || f.focus();
              e = !f.isAutoItalic();
              g = { autoItalic: e };
              e && f.isForcedItalic() && (g.forcedItalic = !1);
              f.selection.hasSelection
                ? f.selection.setSelSymbFontAttrbs(g)
                : (f.hasFocus() || f.focus(),
                  (e = f.cursor.position.row.children[f.cursor.position.index]),
                  e instanceof d.BlockSymbol && e.setSymbFontAttrbs(g));
              f.setButtonStatus(g);
              break;
            case "efmase_menubar_item_mathcolor":
              f.hasFocus() || f.focus();
              this.colorPanel.show(b.pageX, b.pageY);
              break;
            case "efmase_menubar_item_mtext":
              f.hasFocus() || f.focus();
              g = { mtext: !f.isMtext() };
              f.selection.hasSelection
                ? f.selection.setSelSymbFontAttrbs(g)
                : (f.hasFocus() || f.focus(),
                  (e = f.cursor.position.row.children[f.cursor.position.index]),
                  e instanceof d.BlockSymbol && e.setSymbFontAttrbs(g));
              f.setButtonStatus(g);
              break;
            case "fontname":
            case "efmase_menubar_item_mobile_fontname":
            case "efmase_menubar_item_mobile_fontsize":
            case "fontsize":
              (d = e.getAttribute("btn_id")),
                "fontname" == g || "efmase_menubar_item_mobile_fontname" == g
                  ? ((f = this.editor.getFontFamilyNameIdx()),
                    this.fontnamePanel.show(d, b.pageX, b.pageY, f))
                  : ((f = this.editor.canvas.getFontSizeIdx()),
                    this.fontsizePanel.show(d, b.pageX, b.pageY, f));
          }
        }
      },
      efmase_menugrp_close: function () {
        this.efmase_menugrp_ddmenugrp &&
          (this.efmase_menugrp_ddmenugrp.style.visibility = "hidden");
      },
      efmase_menugrp_closetime: function () {
        var a = this;
        this.efmase_menugrp_closetimer = window.setTimeout(function () {
          a.efmase_menugrp_close();
        }, this.efmase_menugrp_timeout);
      },
      efmase_submenuitem_select: function (a, b) {
        var d = document.getElementById(b),
          e = document.getElementById(a),
          f = d.getAttribute("cld_id"),
          f = document.getElementById(f);
        null != f && void 0 != f && (f.className = "");
        f = d.getAttribute("name");
        d.setAttribute("cld_id", a);
        if (this.isSmallWin())
          e.className = "efmase_mobile_font_n_size_focused";
        else {
          if ("fontsize" == f || "fontname" == f)
            d.innerHTML = e.innerHTML.slice(0, 11);
          this.efmase_menugrp_close();
        }
        d = org.imatheq.formulaeditor.FormulaEditor.getEditor();
        if ("Edit" == f)
          switch (document.getElementById(a).innerHTML) {
            case "Undo":
              d.actions.undo();
              break;
            case "Redo":
              d.actions.redo();
              break;
            case "Cut":
              d.selection.hasSelection && d.selection.remove();
              break;
            case "Copy":
              d.selection.hasSelection && d.selection.copy();
              break;
            case "Test":
              d.onTest();
          }
        else
          "fontsize" == f
            ? ((e = parseInt(a.substring(a.lastIndexOf("_") + 1, a.length))),
              d.setFontSizeIdx(e))
            : "fontname" == f &&
              ((fontnameIdx = parseInt(
                a.substring(a.lastIndexOf("_") + 1, a.length)
              )),
              d.setFontFamilyNameIdx(fontnameIdx));
      },
      clearMenuTabBar: function () {
        var a = document.getElementById("efmase_menubar");
        null !== a && ((a = a.parentNode), a.parentNode.removeChild(a));
        oSWMenuTabBar = document.getElementById("efmase_sw_menutab_div");
        null !== oSWMenuTabBar &&
          oSWMenuTabBar.parentNode.removeChild(oSWMenuTabBar);
        this.smallwindow = null;
      },
      drawMenuBar: function (a) {
        var b = a;
        if (null === a || void 0 === a) b = d.isSmallWin();
        this.smallwindow = b;
        var e = document.createElement("div");
        this.container.insertBefore(e, this.container.firstChild);
        a = document.createElement("ul");
        a.setAttribute("id", "efmase_menubar");
        a.className = b
          ? "efmase_menubar efmase_menubar_mobile"
          : "efmase_menubar";
        e.appendChild(a);
        var e = this.editor.pData.MENUBAR,
          f = this.editor.pData.TITLES,
          g = new org.imatheq.formulaeditor.Options(),
          n = g.getOption("hideFontTools");
        this.editor.menuItems = [];
        for (var p = 0; p < e.length; p++) {
          var t = e[p].id,
            q = this.symbols[t];
          0 < p && this.editor.menuItems.push(q.name);
          if (b || ("mobile_fontname" != q.name && "mobile_fontsize" != q.name))
            if (!b || "efmase_menugrp_drop" != q["class"]) {
              var u = document.createElement("li");
              u.className = q["class"];
              u.style["float"] = "left";
              n &&
                "logo" != q.name &&
                "undo" != q.name &&
                "redo" != q.name &&
                (u.style.display = "none");
              a.appendChild(u);
              var v;
              if ("efmase_menugrp_drop" != q["class"]) {
                v = document.createElement("button");
                v.btnGrp = "menu";
                v.title = f[t];
                v.name = "efmase_menubar_item_" + q.name;
                v.setAttribute("btn_id", t);
                v.style.width = q.w + "px";
                if ("logo" == q.name) {
                  var y = this.editor;
                  d.addEventListener(
                    v,
                    "focus",
                    (function () {
                      return function (a) {
                        y.clearKBNavi();
                        y.keyboardNavi = 1;
                        y.setKBNavi(a);
                      };
                    })()
                  );
                }
                "undo" == q.name || "redo" == q.name
                  ? (v.className =
                      "efmase_palettebutton efmase_palettebtn_disabled")
                  : "autoitalic" == q.name
                  ? g.getOption("defAutoItalic")
                    ? (v.className =
                        "efmase_palettebutton efmase_palettebutton_down")
                    : (v.className = "efmase_palettebutton")
                  : ("mathcolor" == q.name &&
                      v.setAttribute("mathcolor", "#000000"),
                    (v.className = "efmase_palettebutton"));
                if (void 0 !== q.itp && "svg" == q.itp)
                  (v.innerHTML = q.svg), (v.style.width = "auto");
                else if (void 0 !== q.itp && "ft" == q.itp) {
                  t = document.createElement("span");
                  t.style.fontFamily = q.font;
                  t.innerHTML = q.ich;
                  if (b && "mobile_fontsize" == q.name) {
                    var A = this.symbols[q.related],
                      C = this.editor.canvas.getFontSizeIdx(),
                      A = A.ITEMS[C];
                    t.innerHTML = f[A];
                  }
                  if ("autoitalic" == q.name || "italic" == q.name)
                    (t.style.letterSpacing =
                      "italic" == q.name ? "-1px" : "-2px"),
                      (t.style.width = "22px");
                  v.appendChild(t);
                  v.style.fontFamily = q.font;
                  v.style.width = "auto";
                  v.marginTop = "-1px";
                }
                v.setAttribute("id", "efmase_menubar_item_" + q.name);
                v.setAttribute("name", "efmase_menubar_item_" + q.name);
                u.appendChild(v);
              } else if (!b) {
                var z = q.name,
                  C =
                    "fontname" == z
                      ? this.editor.getFontFamilyNameIdx()
                      : this.editor.canvas.getFontSizeIdx(),
                  A = q.ITEMS[C];
                v = document.createElement("a");
                v.btnGrp = "menu";
                v.title = f[t];
                v.innerHTML = f[A];
                v.setAttribute("name", z);
                v.setAttribute("btn_id", t);
                t = this.symbols[A];
                v.setAttribute("style", "width:auto");
                v.setAttribute("id", "efmase_menubar_item_" + q.name);
                t = this.symbols[A];
                void 0 !== t && v.setAttribute("cld_name", t.name);
                v.setAttribute("cld_id", C);
                u.appendChild(v);
              }
              var w = this;
              d.addEventListener(
                v,
                "mousedown",
                (function (a) {
                  return function (b) {
                    w.efmase_menugrp_click(a[0], b);
                    org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(
                      b
                    );
                    b.preventDefault();
                    return !1;
                  };
                })([q.name])
              );
              d.addEventListener(v, "mouseout", function (a) {
                w.efmase_menugrp_closetime();
                return !1;
              });
            }
        }
        u = document.createElement("li");
        a.appendChild(u);
        t = document.createElement("span");
        u.appendChild(t);
        t.innerHTML = "&nbsp;";
      },
      redrawMenuBar: function () {
        var a = d.isSmallWin() || this.editor.isMobile;
        if (this.smallwindow !== a) {
          var b = null;
          null !== this.smallwindow && (b = this.editor.getButtonStatus());
          this.smallwindow = a;
          this.clearMenuTabBar();
          this.drawMenuBar(a);
          null !== b && this.editor.setButtonStatus(b);
        }
      },
      draw: function () {
        var a = this.editor.fetchData(ime_js_dat_headlist);
        this.editor.pData = JSON.parse("{" + a + "}");
        a = this.editor.fetchData(ime_js_dat_menusymbol);
        this.editor.pData.TITLES = JSON.parse(a);
        a = this.editor.fetchData(ime_js_dat_alttext);
        this.editor.altstrs = JSON.parse(a);
        a = this.editor.pData.PALETTE;
        this.editor.isMobile || a.shift();
        var b = this.editor.pData.TITLES;
        this.editor.paletteTabs = [];
        var e = document.createElement("div");
        e.className = "efmase_tab_bar";
        e.style.width = parseInt(window.innerWidth) - 2 + "px";
        this.container.appendChild(e);
        var f = document.createElement("table");
        e.appendChild(f);
        var g = document.createElement("tr");
        f.appendChild(g);
        f = document.createElement("td");
        g.appendChild(f);
        e = document.createElement("button");
        e.className = "efmase_button_head";
        f.appendChild(e);
        f = a.length;
        for (e = 0; e < f; e++) {
          var n = a[e].id,
            p = this.symbols[n];
          if (this.editor.isMobile || "Keyboard" != p.name) {
            var t = document.createElement("td");
            g.appendChild(t);
            var q = document.createElement("a"),
              q = document.createElement("button");
            q.btnGrp = "palette_tab";
            q.title = b[n];
            q.name = "PALETTE_TAB_" + p.name.toUpperCase().replace(/ /, "_");
            this.editor.paletteTabs.push(q.name);
            q.className = "efmase_palettebutton";
            q.name == this.curtab &&
              (q.className += " efmase_palettebutton_focus");
            q.style.width = p.w + "px";
            q.style.height = p.h + "px";
            var u = document.createElement("img");
            u.alt = b[n];
            u.style.width = "1500px";
            u.style.height = "220px";
            u.src = $buuuuu() + "com/imatheq/icons/icons_2x.png";
            u.title = b[n];
            u.style.marginLeft = p.l + "px";
            u.style.marginTop = p.t + "px";
            u.style.marginBottom = p.b + "px";
            q.appendChild(u);
            t.appendChild(q);
            e == this.curtab && (q.className += " efmase_palettebutton_focus");
            g.appendChild(t);
            var p = [q.name],
              v = this;
            d.addEventListener(
              q,
              "mouseover",
              (function (a) {
                return function (b) {
                  v.editor.clearKBNavi();
                  v.handleTabBtnOverClick(a[0]);
                };
              })(p)
            );
            d.addEventListener(
              q,
              "mousedown",
              (function (a) {
                return function (b) {
                  v.editor.clearKBNavi();
                  v.handleTabBtnOverClick(a[0]);
                };
              })(p)
            );
          }
        }
        g = document.createElement("div");
        g.className = "efmase_palettes";
        this.container.appendChild(g);
        a = this.editor.pData.PALETTE;
        f = a.length;
        b = this.editor.pData.TITLES;
        for (e = 0; e < f; e++)
          if (
            ((n = a[e].id),
            (p = this.symbols[n]),
            this.editor.isMobile || "Keyboard" != p.name)
          )
            for (
              n =
                "PALETTE_TAB_" +
                p.name.replace(/ /, "_").toUpperCase() +
                "_BODY",
                q = document.createElement("div"),
                q.className = "efmase_palette",
                q.style.width = parseInt(window.innerWidth) - 2 + "px",
                q.id = n,
                q.style.display = n == this.curtab + "_BODY" ? "" : "none",
                g.appendChild(q),
                n = document.createElement("table"),
                q.appendChild(n),
                oTR = document.createElement("tr"),
                n.appendChild(oTR),
                n = a[e].GROUPS,
                t = 0;
              t < n.length;
              t++
            ) {
              gType = n[t].hasOwnProperty("type") ? n[t].type : "";
              var y = n[t].ROWS,
                q = n[t].id;
              oTD = document.createElement("td");
              oTR.appendChild(oTD);
              u = document.createElement("div");
              "Edit Buttons" == p.name &&
                ((u.id = q),
                (u.name = q),
                (u.style.display = "none"),
                (oTD.style.borderLeft = "0"));
              u.className = "efmase_palette_grp_div";
              "dummy" == gType && (u.style.display = "block");
              oTD.appendChild(u);
              oTable = document.createElement("table");
              u.appendChild(oTable);
              oTbody = document.createElement("tbody");
              oTable.appendChild(oTbody);
              for (var A = null, C = 0; C < y.length; C++) {
                A = document.createElement("tr");
                oTbody.appendChild(A);
                for (var z = y[C].ITEMS, w = 0; w < z.length; w++) {
                  var D = z[w].id,
                    B = this.symbols[D],
                    u = document.createElement("td");
                  A.appendChild(u);
                  q = document.createElement("button");
                  q.btnGrp = "palette";
                  q.title = void 0 === b[D] ? "" : b[D];
                  "Edit Buttons" == p.name ||
                  (B.name && "KEYBOARD_" == B.name.substring(0, 9))
                    ? ((q.id = B.name), (q.name = B.name))
                    : (q.name = D);
                  q.className =
                    "KEYBOARD_CUT" == B.name || "KEYBOARD_COPY" == B.name
                      ? "efmase_palettebutton efmase_palettebtn_disabled"
                      : "efmase_palettebutton";
                  "dummy" == gType &&
                    (q.className = "efmase_palettebutton_dummy");
                  void 0 !== B.name &&
                    this.editor.parrayLine == B.name &&
                    (q.className += " efmase_palettebutton_select");
                  "menu_b" == B.tp &&
                    ((q.id = "efmase_menubar_item_" + B.name),
                    (q.name = "efmase_menubar_item_" + B.name),
                    "undo" == B.name || "redo" == B.name) &&
                    (q.className += " efmase_palettebtn_disabled");
                  q.style.width = B.w + "px";
                  q.style.height = B.h + "px";
                  q.style.padding = "1px 6px";
                  d.isIOS() && (q.style.padding = "1px 6px");
                  u.appendChild(q);
                  "988" == D && (aaa = 2);
                  if ("BRACKETS_UPDATE" == B.name)
                    (u = document.createElement("div")),
                      (oBracket = document.createElement("a")),
                      (oBracket.style.fontSize = "22px"),
                      u.appendChild(oBracket),
                      q.appendChild(u),
                      (oSpan = document.createElement("span")),
                      (oSpan.id = "efmase_bracket_palette_btn"),
                      (oSpan.name = B.name),
                      oBracket.appendChild(oSpan),
                      (oSpan.innerHTML = "(&nbsp;)"),
                      q.classList.add("efmase_menugrp_drop"),
                      (q.style.width = "auto"),
                      (q.style.height = "auto"),
                      (q.style.padding = "1px"),
                      (u.style.width = "auto"),
                      (u.style.height = "auto"),
                      (u.style.border = "1px solid #000000"),
                      (u.style.padding = "2px 4px 3px 4px");
                  else if (void 0 !== B.itp && "ft" == B.itp)
                    3e3 < D && 3027 > D
                      ? (q.title = b["3000"].replace(
                          "$0$",
                          B.ich.toLowerCase()
                        ))
                      : 3027 < D && 3054 > D
                      ? (q.title = b["3027"].replace(
                          "$0$",
                          B.ich.toLowerCase()
                        ))
                      : 3054 < D && 3081 > D
                      ? (q.title = b["3054"].replace(
                          "$0$",
                          B.ich.toLowerCase()
                        ))
                      : 3081 < D && 3108 > D
                      ? (q.title = b["3081"].replace(
                          "$0$",
                          B.ich.toLowerCase()
                        ))
                      : 3108 < D &&
                        3135 > D &&
                        (q.title =
                          "" != q.title
                            ? q.title +
                              (" (" +
                                b["3108"].replace("$0$", B.ich.toLowerCase()) +
                                ")")
                            : b["3108"].replace("$0$", B.ich.toLowerCase())),
                      (oLink = document.createElement("a")),
                      (oLink.style.fontSize = "22px"),
                      q.appendChild(oLink),
                      (oSpan = document.createElement("span")),
                      oLink.appendChild(oSpan),
                      (oSpan.innerHTML = B.ich),
                      (q.style.fontFamily = B.font),
                      (q.style.width = "auto"),
                      (q.marginTop = "-1px");
                  else if (
                    ((u = document.createElement("img")),
                    (u.alt = b[D]),
                    750 > parseInt(D)
                      ? ((u.style.width = "1500px"),
                        (u.style.height = "220px"),
                        (u.src = $buuuuu() + "com/imatheq/icons/icons_2x.png"))
                      : ((u.style.width = "2000px"),
                        (u.style.height = "327px"),
                        (u.src =
                          $buuuuu() + "com/imatheq/icons/icons2_2x.png")),
                    (u.title = b[D]),
                    (u.style.marginLeft = B.l + "px"),
                    (u.style.marginTop = B.t + "px"),
                    (u.style.marginBottom = B.b + "px"),
                    "PARRAY_ROW_SPACING" == B.name ||
                      "PARRAY_COL_SPACING" == B.name)
                  ) {
                    q.style.width = B.w + 8 + "px";
                    q.style.height = B.h + 8 + "px";
                    q.style.padding = "1px";
                    var E = document.createElement("div");
                    E.style.width = B.w + "px";
                    E.style.height = B.h + "px";
                    E.style.border = "1px solid";
                    oSpan = document.createElement("div");
                    oSpan.appendChild(u);
                    E.appendChild(oSpan);
                    q.appendChild(E);
                    q.classList.add("efmase_menugrp_drop");
                  } else q.appendChild(u);
                  u = [D];
                  v = this;
                  d.addEventListener(
                    q,
                    "mousedown",
                    (function (a) {
                      return function (b) {
                        v.clearPanels();
                        var d = v.handlePaletteBtnOverClick(
                          a[0],
                          b.pageX,
                          b.pageY
                        );
                        org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(
                          b
                        );
                        b.preventDefault();
                        return d;
                      };
                    })(u)
                  );
                }
              }
            }
        this.redrawMenuBar();
      },
      getPresentation: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e = null;
        switch (a.tp) {
          case "ch":
            e = new d.Symbol(a.ch);
            break;
          case "sp":
            e = new d.Space(a.width + "em", a.height + "em", a.depth + "em");
            break;
          case "xml":
            var d = org.imatheq.formulaeditor.parsing.mathml.MathMLParser,
              f = {},
              g;
            for (g in b) f[g] = b[g];
            try {
              var p =
                  "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
                  a.xml +
                  "</math>",
                t = new d().parseString(p, f, !0);
              if (null !== a.firstRowPos && void 0 !== a.firstRowPos) {
                t.firstRow = t.children[a.firstRowPos[0]];
                for (var q = 1; q < a.firstRowPos.length; q++)
                  t.firstRow = t.firstRow.children[a.firstRowPos[q]];
              }
              if (null !== a.defCursorPos && void 0 !== a.defCursorPos) {
                for (
                  var u = t.children[a.defCursorPos[0]], q = 1;
                  q < a.defCursorPos.length;
                  q++
                )
                  u = u.children[a.defCursorPos[q]];
                t.defCursorPos = { row: u, index: 0 };
              }
              e = t;
            } catch (v) {
              throw Error(
                "Compound symbol: " + this.mathml + "cannot be parsed."
              );
            }
            break;
          case "mx_d":
          case "mx":
            f = {};
            for (g in b) f[g] = b[g];
            f.inMatrix = !0;
            e = [];
            f = a.inputNumRows;
            if (null === f || void 0 === f) f = a.num_rows;
            g = a.inputNumCols;
            if (null === g || void 0 === g) g = a.num_cols;
            if ("IdentityWith0" == a.data_type)
              for (p = 0; p < f; p++) {
                t = [];
                for (q = 0; q < g; q++)
                  (u =
                    p == q
                      ? new d.Row(new d.Symbol(a.one))
                      : new d.Row(new d.Symbol(a.zero))),
                    t.push(u);
                e[p] = t;
              }
            else
              for (p = 0; p < f; p++) {
                t = [];
                for (q = 0; q < g; q++)
                  (u = new d.Row(new d.BlockSymbol())), t.push(u);
                e[p] = t;
              }
            f = new d.Bracket(a.left_bracket);
            g = new d.Bracket(a.right_bracket);
            pArray = new org.imatheq.formulaeditor.presentation.PArray();
            pArray.initialize.apply(pArray, e);
            e = new org.imatheq.formulaeditor.presentation.PArray.Info(pArray);
            void 0 != a.col_align && (e.colalign = [a.col_align]);
            e.populateData(pArray.numrows, pArray.numcols);
            pArray.info = e;
            "" == f.value && "" == g.value
              ? (e = pArray)
              : ((e = new d.Row(pArray)),
                (e = new d.Bracketed(f, e, g)),
                (e.in_attrbs = ""),
                (e.in_open = ""),
                (e.in_close = ""),
                (e.in_separators = ""));
            if (null !== a.firstRowPos && void 0 !== a.firstRowPos)
              for (
                e.firstRow = e.children[a.firstRowPos[0]], q = 1;
                q < a.firstRowPos.length;
                q++
              )
                e.firstRow = e.firstRow.children[a.firstRowPos[q]];
            if (null !== a.defCursorPos && void 0 !== a.defCursorPos) {
              u = e.children[a.defCursorPos[0]];
              for (q = 1; q < a.defCursorPos.length; q++)
                u = u.children[a.defCursorPos[q]];
              e.defCursorPos = { row: u, index: 0 };
            }
        }
        return e;
      },
      changeFont: function (a, b) {
        var d =
          "fontname" == a
            ? this.editor.getFontFamilyNameIdx()
            : this.editor.canvas.getFontSizeIdx();
        if (b != d) {
          var e = document.getElementById("efmase_menubar_item_" + a);
          "fontname" == a
            ? this.editor.setFontFamilyNameIdx(b)
            : this.editor.canvas.setFontSizeIdx(b);
          var f = "fontname" == a ? this.fontnamePanel : this.fontsizePanel;
          this.isSmallWin()
            ? "fontsize" == a &&
              (document.getElementsByName(
                "efmase_menubar_item_mobile_" + a
              )[0].firstChild.innerHTML = f.getValue(b))
            : (e.innerHTML = f.getValue(b));
        }
        return d;
      },
      execPalCmd: function (a, b, d) {
        switch (a.cmd) {
          case "fontname":
          case "fontsize":
            curIdx = this.changeFont(a.cmd, d);
            if (d != curIdx) {
              var e = {
                row: this.editor.cursor.position.row,
                index: this.editor.cursor.position.index,
              };
              d = e.row.getIndexChain(e.index);
              this.editor.actions.addAction(a.cmd, e, d, d, curIdx, null, 0);
            }
            break;
          case "addrowline":
          case "removerowline":
            var e = this.editor.cursor.position,
              f = e.etb.parray;
            if (Math.floor(f.startIndex / f.row.numcols) == f.row.numrows - 1)
              break;
          case "addcolline":
          case "removecolline":
            if (
              ((e = this.editor.cursor.position),
              (f = e.etb.parray),
              f.startIndex % f.row.numcols == f.row.numcols - 1)
            )
              break;
          case "rowalign":
          case "colalign":
          case "addframe":
          case "removeframe":
          case "setsolidline":
          case "setdashedline":
          case "toggleequalrows":
          case "toggleequalcols":
          case "rowspacing":
          case "colspacing":
            var g = null,
              p = null,
              t = null,
              q = this.editor,
              e = this.editor.cursor.position,
              f = e.etb.parray,
              u = { row: f.row, index: f.index };
            d = e.row.getIndexChain(e.index);
            var e = e.row.getIndexChain(e.index),
              v,
              g = {
                parent: f.row,
                position: u,
                beforePosition: d,
                afterPosition: e,
                startIndex: f.startIndex,
                endIndex: f.endIndex,
                hasSelection: !1,
              };
            q.selection.hasSelection &&
              ((p = this.editor.selection.getSelectionCopy()),
              (t = this.editor.selection.getSelectionCopy()));
            v = f.row.info.copy(f.row.numrows, f.row.numcols);
            b = "rowspacing" == a.cmd || "colspacing" == a.cmd ? b : a.dir;
            f.row.setStylingAttrbs(g, a.cmd, b);
            f.row.info.populateData(f.row.numrows, f.row.numcols);
            f.row.updateEditTabButtons(q);
            b = this.editor.getButtonStatus();
            this.editor.actions.addAction(
              "setPArrayAttrbs",
              u,
              d,
              e,
              v,
              null,
              null,
              p,
              t,
              b,
              null
            );
            this.editor.redraw(q.selection.hasSelection);
            break;
          case "insertabove":
          case "insertbelow":
            e = this.editor.cursor.position;
            f = e.etb.parray;
            f.row.actInsertRows(this.editor, a.cmd);
            break;
          case "insertleft":
          case "insertright":
            e = this.editor.cursor.position;
            f = e.etb.parray;
            f.row.actInsertColumns(this.editor, a.cmd);
            break;
          case "deleterows":
            e = this.editor.cursor.position;
            f = e.etb.parray;
            f.row.actDeleteRows(this.editor);
            break;
          case "deletecolumns":
            e = this.editor.cursor.position;
            f = e.etb.parray;
            f.row.actDeleteColumns(this.editor);
            break;
          case "onsymmetric":
          case "offsymmetric":
            t = p = null;
            q = this.editor;
            e = q.cursor.position;
            b = e.etb.bracketed;
            if (
              (b.getSymmetric() && "offsymmetric" == a.cmd) ||
              (!b.getSymmetric() && "onsymmetric" == a.cmd)
            )
              (u = { row: b, index: e.index }),
                (d = e.row.getIndexChain(e.index)),
                (e = e.row.getIndexChain(e.index)),
                (v = b.symmetric),
                q.selection.hasSelection &&
                  ((p = this.editor.selection.getSelectionCopy()),
                  (t = this.editor.selection.getSelectionCopy())),
                b.setSymmetric("offsymmetric" == a.cmd ? !1 : !0),
                b.updateEditTabButtons(q),
                (b = this.editor.getButtonStatus()),
                this.editor.actions.addAction(
                  a.cmd,
                  u,
                  d,
                  e,
                  v,
                  null,
                  null,
                  p,
                  t,
                  b,
                  null
                ),
                (this.isMO = !1),
                this.editor.redraw(q.selection.hasSelection);
            break;
          case "kb_backspace":
            this.editor.onBackspace();
            break;
          case "kb_enter":
            return this.editor.presentation.children[0].onNewline(this.editor);
          case "kb_space":
            this.editor.hasFocus() &&
              (this.editor.selection.hasSelection
                ? this.editor.selection.parent
                : this.editor.cursor.position.row
              ).charInput(" ", this.editor);
            break;
          case "kb_cut":
          case "kb_copy":
            this.editor.onCutCopy(null, a.cmd.substring(3));
            break;
          case "kb_paste":
            q = this.editor;
            try {
              "https:" != location.protocol
                ? alert(
                    "In order to use this function, you need to access iMathEQ Math Equation Editor with HTTPS."
                  )
                : null === navigator ||
                  void 0 === navigator ||
                  null === navigator.clipboard ||
                  void 0 === navigator.clipboard
                ? alert(
                    "Your browser/device currently does not support this function."
                  )
                : navigator.clipboard.readText().then(
                    function (a) {
                      "" != a && q.hasFocus && q.doonpaste(a, !1);
                    },
                    function (a) {
                      alert(a);
                    }
                  );
            } catch (y) {
              alert(y);
            }
        }
      },
      updateBracket: function (a, b, d) {
        var e = null,
          e = (a = null),
          f = this.editor,
          g = {
            row: this.editor.cursor.position.row,
            index: this.editor.cursor.position.index,
          },
          p = g.row.getIndexChain(g.index),
          t = g.row.getIndexChain(g.index),
          q,
          u = this.editor.getBracketedObject();
        g.row = u;
        g.index = u.index;
        f.selection.hasSelection && (a = e = f.selection.getSelectionCopy());
        q = [
          u.leftBracket.value,
          u.rightBracket.value,
          u.leftBracket.onscreen,
          u.rightBracket.onscreen,
        ];
        u.leftBracket.value = b.replace("&lt;", "<").replace("&gt;", ">");
        u.rightBracket.value = d.replace("&lt;", "<").replace("&gt;", ">");
        u.leftBracket.onscreen = null;
        u.rightBracket.onscreen = null;
        document.getElementById("efmase_bracket_palette_btn").innerHTML =
          b.replace("<", "&lt;").replace(">", "&gt;") +
          "&nbsp;" +
          d.replace("<", "&lt;").replace(">", "&gt;");
        b = this.editor.getButtonStatus();
        this.editor.actions.addAction(
          "updateBracket",
          g,
          p,
          t,
          q,
          null,
          null,
          a,
          e,
          b,
          null
        );
        this.editor.redraw(f.selection.hasSelection);
        this.editor.clearKBNavi();
        this.editor.keyboardNavi = 4;
      },
      handlePaletteBtnOverClick: function (a, b, d) {
        var e = this.editor;
        e.getButtonStatus();
        this.curBtnId = parseInt(a);
        var f = this.symbols[this.curBtnId],
          g = null !== f.sub_tp && void 0 !== f.sub_tp ? f.sub_tp : "";
        return "mx" == f.tp && "panel" == g
          ? (this.matrixPanel.show(a, b, d), !1)
          : "bkt_panel" == g
          ? (this.bracketPanel.show(a, b, d), !1)
          : "PARRAY_ROW_SPACING" == f.name || "PARRAY_COL_SPACING" == f.name
          ? (this.sizePanel.show(a, b, d), !1)
          : "emx" == f.tp
          ? ((f = this.symbols[this.curBtnId]), this.execPalCmd(f), !1)
          : this.handlePaletteBtnClick(e, b, d);
      },
      handleTabBtnOverClick: function (a) {
        a != this.curtab &&
          (d.setObjsAttrb(
            this.curtab,
            "class",
            "efmase_palettebutton_focus",
            "remove"
          ),
          (document.getElementById(a + "_BODY").style.display = ""),
          (document.getElementById(this.curtab + "_BODY").style.display =
            "none"),
          (this.curtab = a),
          d.setObjsAttrb(a, "class", "efmase_palettebutton_focus"));
      },
      handlePaletteBtnClick: function (a, b, d) {
        a = this.editor;
        var e = org.imatheq.formulaeditor.presentation,
          f = a.selection,
          g = a.getButtonStatus(),
          p = null,
          t = null;
        a.cursor.hideCursor();
        f.hasSelection && (p = f.getSelectionCopy());
        a.hasFocus() || a.focus();
        var q = { row: a.cursor.position.row, index: a.cursor.position.index },
          u = { row: a.cursor.position.row, index: a.cursor.position.index },
          v = q.row.getIndexChain(q.index),
          y = this.symbols[this.curBtnId];
        if ("menu_b" == y.tp) {
          switch (y.name) {
            case "undo":
              a.actions.undo();
              break;
            case "redo":
              a.actions.redo();
          }
          return !1;
        }
        900 <= this.curBtnId &&
          908 > this.curBtnId &&
          ((y.inputNumRows = b),
          (y.inputNumCols = d),
          "906" == this.curBtnId || "907" == this.curBtnId) &&
          ((y.inputNumRows = Math.max(b, d)),
          (y.inputNumCols = y.inputNumRows));
        406 == this.curBtnId &&
          (y.xml =
            "<mfenced open='" +
            b.replace("<", "&lt;").replace(">", "&gt;") +
            "' close='" +
            d.replace("<", "&lt;").replace(">", "&gt;") +
            "'><mrow/></mfenced>");
        b = "insert";
        var A = null,
          C = null,
          z = q.row,
          w = y.basePosition;
        d = q.row.children.length - q.index;
        if (f.hasSelection) {
          b = "update";
          f.parent instanceof e.PArray &&
            0 == f.startIndex &&
            f.endIndex == f.parent.children.length &&
            ((f = a.selection.getSelectionCopy()),
            (f.parent = a.selection.parent.parent),
            (f.startIndex = a.selection.parent.index),
            (f.endIndex = a.selection.parent.index + 1));
          z = f.parent;
          A = null;
          q.row = f.parent;
          var D = f.startIndex,
            B = f.endIndex;
          if (z instanceof e.Row)
            0 < B && z.children[B - 1] instanceof e.NewlineSymbol && B--,
              (u = { row: f.parent, index: D }),
              null === w || void 0 === w
                ? ((d = z.children.length - B),
                  (A = z.remove(D, B)),
                  a.selection.clear(),
                  (q.index = D))
                : "i" == w
                ? ((d = z.children.length - B),
                  (A = z.remove(D, B)),
                  (C = A.copy()),
                  (q.index = D))
                : "r" == w
                ? ((b = "insert"), (q.index = D), (d = z.children.length - D))
                : "l" == w &&
                  ((b = "insert"), (q.index = B), (d = z.children.length - B));
          else if (z instanceof e.Lines)
            (w = null),
              (u = z),
              (d = u.getNumGrandChildren() - B),
              (A = u.remove(D, B)),
              a.selection.clear(),
              (u = a.getPosition(f.startIndexChain)),
              (q.index = D),
              (z = u.row);
          else return !1;
        } else
          a.cursor.position.row.children[a.cursor.position.index] instanceof
            e.BlockSymbol &&
            (0 <= u.index - 1 &&
            z.children[u.index - 1] instanceof e.BlockSymbol
              ? (u.index--, (A = z.remove(u.index)), (b = "update"))
              : z.children[u.index] instanceof e.BlockSymbol
              ? ((A = z.remove(u.index)), d--, (b = "update"))
              : (A = null));
        var E = this.getPresentation(y, this.getPresentationContext());
        E.setSymbFontAttrbs(g);
        "ch" == y.tp &&
          E instanceof e.Symbol &&
          ((y = org.imatheq.formulaeditor.parsing.expression.RevList[y.ch]),
          void 0 !== y &&
            ("script" == y.type
              ? (E.script = !0)
              : "fraktur" == y.type
              ? (E.fraktur = !0)
              : "double-struck" == y.type && (E.doubleStruck = !0)));
        var y = E.firstRow,
          B = (D = null),
          F = E.defCursorPos;
        a.selection.hasSelection &&
          null !== y &&
          "i" == w &&
          (y instanceof e.Row
            ? y.children.splice(0, y.children.length, C)
            : y.parent instanceof e.Row &&
              ((D = y.index),
              (B = y.parent.children.length - D - 1),
              y.parent.children.splice(y.index, 1, C)));
        C = new e.Row(E);
        C.flatten();
        if (C.children)
          for (var G = 0; G < C.children.length; G++)
            (E = z.insert(u.index, C.children[G], 0 === G)) && u.index++;
        else (E = z.insert(u.index, C, !0)) && u.index++;
        z = null;
        a.selection.hasSelection
          ? ("i" == w && null !== y
              ? y instanceof e.Row
                ? (z = {
                    parent: y,
                    startPosition: { row: y, index: 0 },
                    endPosition: { row: y, index: y.children.length },
                    startIndex: 0,
                    endIndex: y.children.length,
                    startIndexChain: y.getIndexChain(0),
                    endIndexChain: y.getIndexChain(y.children.length),
                    rightMove: !1,
                    dimensions: null,
                  })
                : ((f = y.parent.children.length - B),
                  (z = {
                    parent: y.parent,
                    startPosition: { row: y.parent, index: D },
                    endPosition: {
                      row: y.parent,
                      index: y.parent.children.length - B,
                    },
                    startIndex: D,
                    endIndex: y.parent.children.length - B,
                    startIndexChain: y.parent.getIndexChain(D),
                    endIndexChain: y.getIndexChain(f),
                    rightMove: !1,
                    dimensions: null,
                  }))
              : "r" == w &&
                ((f = u.index + f.endIndex - f.startIndex),
                (z = {
                  parent: u.row,
                  startPosition: { row: u.row, index: u.index },
                  endPosition: { row: u.row, index: f },
                  startIndex: u.index,
                  endIndex: f,
                  startIndexChain: u.row.getIndexChain(u.index),
                  endIndexChain: u.row.getIndexChain(f),
                  rightMove: !1,
                  dimensions: null,
                })),
            null !== z && void 0 !== z && z
              ? (a.selection.setSelection(z),
                (t = a.selection.getSelectionCopy()))
              : 900 <= this.curBtnId &&
                908 > this.curBtnId &&
                a.selection.clear())
          : a.selection.clear();
        F
          ? F.row instanceof e.Row
            ? a.cursor.setPosition(F)
            : null === z
            ? a.cursor.setPosition({ row: F.row.parent, index: F.row.index })
            : a.cursor.setPosition({ row: z.parent, index: z.endIndex })
          : a.cursor.setPosition(u);
        e = a.cursor.position.row.getIndexChain(a.cursor.position.index);
        a.actions.addAction(b, q, v, e, A, null, d, p, t, g, null);
        900 <= this.curBtnId && 908 > this.curBtnId && this.matrixPanel.hide();
        406 == this.curBtnId && this.bracketPanel.hide();
        (900 > this.curBtnId || 908 <= this.curBtnId) && a.redraw(null !== z);
        this.editor.clearKBNavi();
        this.editor.keyboardNavi = 4;
        return !1;
      },
      clearPanels: function () {
        null !== this.activePanel &&
          this.activePanel instanceof
            org.imatheq.formulaeditor.presentation.SizePanel &&
          this.activePanel.hide();
      },
    }
  );
  org.imatheq.formulaeditor.Palette.removePalette = function (d) {
    if (null !== d && void 0 !== d) {
      var e;
      for (e = 0; e < a.length; e++) a[e] == d && a.splice(e, 1);
      for (e = 0; e < b.length; e++) b[e].palette == d && (b[e].palette = null);
      d =
        null !== d.htmlelement && void 0 !== d.htmlelement
          ? d.htmlelement
          : d.canvas.canvas;
      d.parentNode.removeChild(d);
    }
  };
  var g = function () {
    d.loadFont("cmr7", "a");
    d.loadFont("cmmi7", "a");
    d.loadFont("cmex7", "\u00b3");
    d.loadFont("cmey7", "\u00c9");
    d.loadFont("msbm7", "A");
    d.loadFont("imescr7", "A");
    d.loadFont("eufm7", "A");
    !0 === new org.imatheq.formulaeditor.Options().getOption("debug") &&
      ((e = new org.imatheq.debug.Debug()), e.createDebug());
    for (
      var a = document.getElementsByTagName("textarea"), f = 0;
      f < a.length;
      f++
    ) {
      var g = a[f],
        m = g.getAttribute("class");
      m || (m = g.getAttribute("className"));
      m &&
        m.match(/(^| )imatheqformula($| )/) &&
        new org.imatheq.formulaeditor.FormulaEditor(g);
    }
    a = new org.imatheq.formulaeditor.Options().getOption("onloadFocus");
    if ("string" == typeof a) {
      if ((a = document.getElementById(a)))
        if (
          (a = org.imatheq.formulaeditor.FormulaEditor.getEditorByTextArea(a))
        )
          a.hasFocus() || a.focus(),
            a.selection.hasSelection || a.cursor.showCursor();
    } else
      1 == a &&
        (b[0].hasFocus() || b[0].focus(),
        b[0].selection.hasSelection || b[0].cursor.showCursor());
  };
  org.imatheq.formulaeditor.createEditor = function (
    a,
    f,
    g,
    m,
    r,
    n,
    p,
    t,
    q,
    u,
    v,
    y,
    A,
    C
  ) {
    !0 === new org.imatheq.formulaeditor.Options().getOption("debug") &&
      ((e = new org.imatheq.debug.Debug()), e.createDebug());
    a = new org.imatheq.formulaeditor.FormulaEditor(
      a,
      null,
      f,
      g,
      m,
      r,
      n,
      p,
      t,
      q,
      u,
      v,
      y,
      A,
      C
    );
    new ($extend(org.imatheq.formulaeditor.EventHandler, {
      onpress: function (a) {
        for (var d = !0, e = 0; e < b.length; e++) {
          var f = b[e].onpress(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onkeydown: function (a) {
        for (var d = !0, e = 0; e < b.length; e++) {
          var f = b[e].onkeydown(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onkeyup: function (a) {
        for (var d = !0, e = 0; e < b.length; e++) {
          var f = b[e].onkeyup(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onkeypress: function (a) {
        for (var d = !0, e = 0; e < b.length; e++) {
          var f = b[e].onkeypress(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      oncontextmenu: function (a) {
        for (var d = !0, e = 0; e < b.length; e++) {
          var f = b[e].oncontextmenu(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onselectstart: function (a) {
        for (var d = !0, e = 0; e < b.length; e++) {
          var f = b[e].onselectstart(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onmousedown: function (a) {
        var e = (this.mouseIsDown = !0),
          f;
        viewport = d.getViewPort();
        for (f = 0; f < b.length; f++) {
          var g = b[f].onmousedown(a);
          null !== g && void 0 !== g && !1 === g && (e = !1);
        }
        return e;
      },
      onmousemove: function (a) {
        var d = !0,
          e;
        for (e = 0; e < b.length; e++) {
          var f = b[e].onmousemove(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      oncopy: function (a) {
        var d = !0,
          e;
        for (e = 0; e < b.length; e++) {
          var f = b[e].oncopy(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onpaste: function (a) {
        var d = !0,
          e;
        for (e = 0; e < b.length; e++) {
          var f = b[e].onpaste(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      oncut: function (a) {
        var d = !0,
          e;
        for (e = 0; e < b.length; e++) {
          var f = b[e].oncut(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onmouseup: function (a) {
        var d = !0;
        this.mouseIsDown = !1;
        var e;
        for (e = 0; e < b.length; e++) {
          var f = b[e].onmouseup(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onresize: function (a) {
        var d = !0,
          e;
        for (e = 0; e < b.length; e++) {
          var f = b[e].onresize(a);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
    }))();
    f = new org.imatheq.formulaeditor.Options().getOption("onloadFocus");
    if ("string" == typeof f) {
      if ((f = document.getElementById(f)))
        if (
          (f = org.imatheq.formulaeditor.FormulaEditor.getEditorByTextArea(f))
        )
          f.hasFocus() || f.focus(),
            f.selection.hasSelection || f.cursor.showCursor();
    } else
      1 == f &&
        (b[0].hasFocus() || b[0].focus(),
        b[0].selection.hasSelection || b[0].cursor.showCursor());
    return a;
  };
  if (window.addEventListener)
    org.imatheq.formulaeditor.hasLoaded ||
    (document.readyState && "complete" == document.readyState)
      ? g()
      : window.addEventListener("load", g, !1);
  else {
    var f;
    f = function () {
      document.body
        ? document.body.attachEvent &&
          ("complete" == document.readyState
            ? g()
            : document.body.attachEvent("onload", g))
        : setTimeout(f, 50);
    };
    f();
  }
})();
(function () {
  org.imatheq.formulaeditor.presentation.MatrixPanel = $extend(Object, {
    palette: null,
    padWindow: null,
    oCancel: null,
    keyboardNavi: 1,
    rowNoInput: null,
    colNoInput: null,
    matrixBtnTbody: null,
    initialize: function (b) {
      this.palette = b;
    },
    create: function (b) {
      var a = this,
        e = this.palette.editor,
        d = document.createElement("div");
      d.id = "efmase_matrix_pad";
      d.className = "efmase_panel_pad";
      d.style.display = "none";
      var g = document.createElement("div");
      d.appendChild(g);
      g.innerHTML = e.pData.TITLES["2203"];
      oClose = document.createElement("span");
      oClose.id = "matrix_panel_0";
      oClose.className = "efmase_panel_close";
      oClose.innerHTML = "x";
      g.appendChild(oClose);
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        oClose,
        "mousedown",
        function (b) {
          a.hide();
          return !1;
        }
      );
      var f = document.createElement("div");
      d.appendChild(f);
      var h = document.createElement("table");
      h.id = "efmase_pad_table";
      f.appendChild(h);
      g = document.createElement("table");
      f.appendChild(g);
      var k = document.createElement("tbody");
      g.appendChild(k);
      var l = document.createElement("tr"),
        g = document.createElement("td");
      g.className = "efmase_pad_label";
      g.innerHTML = e.pData.TITLES["2204"];
      l.appendChild(g);
      var m = document.createElement("td");
      l.appendChild(m);
      g = document.createElement("input");
      g.id = "matrix_panel_2";
      g.className = "efmase_pad_input";
      g.type = "number";
      g.title = "Rows";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        g,
        "focus",
        function (b) {
          a.keyboardNavi = 2;
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(b);
        }
      );
      m.appendChild(g);
      var r = document.createElement("tr"),
        m = document.createElement("td");
      m.className = "efmase_pad_label";
      m.innerHTML = e.pData.TITLES["2204"];
      r.appendChild(m);
      var n = document.createElement("td");
      n.style.verticalAlign = "right";
      r.appendChild(n);
      m = document.createElement("input");
      m.id = "matrix_panel_3";
      m.className = "efmase_pad_input";
      m.type = "number";
      m.title = "Rows";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        m,
        "focus",
        function (b) {
          a.keyboardNavi = 3;
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(b);
        }
      );
      n.appendChild(m);
      k.appendChild(l);
      k.appendChild(r);
      k = document.createElement("div");
      k.style.zindex = "500";
      f.appendChild(k);
      f = document.createElement("input");
      f.id = "matrix_panel_4";
      f.type = "button";
      f.value = e.pData.TITLES["2200"];
      k.appendChild(f);
      f.onclick = function (b) {
        return a.onSubmit(b);
      };
      f = document.createElement("input");
      f.id = "matrix_panel_5";
      f.type = "button";
      f.value = e.pData.TITLES["2201"];
      k.appendChild(f);
      f.onclick = function (b) {
        a.hide();
        return !1;
      };
      e = document.createElement("tbody");
      h.appendChild(e);
      for (h = 0; 6 > h; h++) {
        k = document.createElement("tr");
        for (l = 0; 6 > l; l++)
          (r = document.createElement("td")),
            (btnDiv = document.createElement("div")),
            (btnDiv.className = "efmase_pad_btn"),
            org.imatheq.formulaeditor.FormulaEditor.addEventListener(
              btnDiv,
              "mouseover",
              (function (b, d) {
                return function (e) {
                  return a.onDrag(d[0], b[0]);
                };
              })([l], [h])
            ),
            org.imatheq.formulaeditor.FormulaEditor.addEventListener(
              btnDiv,
              "mousedown",
              function (b) {
                return a.onSubmit(b);
              }
            ),
            r.appendChild(btnDiv),
            k.appendChild(r);
        e.appendChild(k);
      }
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        d,
        "mousedown",
        function (a) {
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        }
      );
      b.appendChild(d);
      this.padWindow = d;
      this.rowNoInput = g;
      this.colNoInput = m;
      this.oCancel = f;
      this.matrixBtnTbody = e;
    },
    show: function (b, a, e) {
      null === this.padWindow && this.create(this.palette.container, a, e);
      document.getElementById("efmase_pad_table").style.display = "";
      document.getElementById("efmase_matrix_pad").style.left = a + "px";
      document.getElementById("efmase_matrix_pad").style.top = e + "px";
      editor.blur();
      this.padWindow.btnId = b;
      this.padWindow.style.display = "block";
      this.padWindow.style.left = "0px";
      a + this.padWindow.offsetWidth > parseInt(window.innerWidth) &&
        (a = parseInt(window.innerWidth) - this.padWindow.offsetWidth);
      this.padWindow.style.left = a + "px";
      this.padWindow.style.top = e + "px";
      editor.isMobile ||
        ((editor.textboxHeight = editor.textbox.style.height),
        (editor.textbox.style.height = 0));
      this.palette.activePanel = this;
      this.keyboardNavi = 1;
      this.onDrag(1, 1);
    },
    hide: function () {
      this.rowNoInput.blur();
      this.colNoInput.blur();
      this.padWindow.btnId = "";
      this.padWindow.style.display = "none";
      var b = org.imatheq.formulaeditor.FormulaEditor.getFirstEditor();
      b.isMobile || (b.textbox.style.height = b.textboxHeight);
      b.hasFocus() || b.focus();
      b.redraw();
      b.keyboardNavi = 4;
      this.palette.activePanel === this && (this.palette.activePanel = null);
    },
    onDrag: function (b, a) {
      if ("906" == this.padWindow.btnId || "907" == this.padWindow.btnId)
        a = b = Math.max(b, a);
      for (var e = 0; e < this.matrixBtnTbody.childNodes.length; e++)
        for (
          var d = 0;
          d < this.matrixBtnTbody.childNodes[e].childNodes.length;
          d++
        )
          this.matrixBtnTbody.childNodes[e].childNodes[
            d
          ].firstChild.style.backgroundColor =
            e <= b && d <= a ? "#778E9A" : "#fff";
      this.rowNoInput.value = b + 1;
      this.colNoInput.value = a + 1;
    },
    onSubmit: function (b) {
      if ("906" == this.padWindow.btnId || "907" == this.padWindow.btnId)
        (this.rowNoInput.value =
          Math.max(this.rowNoInput.value, this.colNoInput.value) + 1),
          (this.colNoInput.value = this.rowNoInput.value);
      this.palette.handlePaletteBtnClick(
        this.palette.editor,
        this.rowNoInput.value,
        this.colNoInput.value
      );
      org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(b);
      b.preventDefault();
      return !1;
    },
    onkeydown: function (b) {
      if (9 == b.keyCode)
        return (
          this.clearKBNavi("matrix_panel_"),
          b.shiftKey
            ? --this.keyboardNavi
            : (this.keyboardNavi = ++this.keyboardNavi),
          -1 == this.keyboardNavi && (this.keyboardNavi = 5),
          6 == this.keyboardNavi && (this.keyboardNavi = 0),
          this.setKBNavi("matrix_panel_", b),
          !1
        );
      if (13 == b.keyCode)
        return (
          (activeElm = document.activeElement),
          ("input" == activeElm.localName.toLowerCase() &&
            "cancel" == activeElm.value.toLowerCase()) ||
          ("span" == activeElm.localName.toLowerCase() &&
            "x" == activeElm.value.toLowerCase())
            ? (this.hide(),
              org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(b),
              b.preventDefault(),
              !1)
            : this.onSubmit(b)
        );
      if (
        1 == this.keyboardNavi &&
        "matrix_panel_2" != document.activeElement.id &&
        "matrix_panel_3" != document.activeElement.id
      )
        switch (b.keyCode) {
          case 37:
            return this.kbNaviMove("left"), !1;
          case 38:
            return this.kbNaviMove("up"), !1;
          case 39:
            return this.kbNaviMove("right"), !1;
          case 40:
            return this.kbNaviMove("down"), !1;
        }
    },
    kbNaviMove: function (b) {
      if (1 == this.keyboardNavi) {
        var a = this.rowNoInput.value - 1,
          e = this.colNoInput.value - 1;
        0 < e && "left" == b && e--;
        5 > e && "right" == b && e++;
        0 < a && "up" == b && a--;
        5 > a && "down" == b && a++;
        this.onDrag(a, e);
      }
      return !1;
    },
    setKBNavi: function (b, a) {
      if (1 != this.keyboardNavi) {
        var e = document.getElementById(b + this.keyboardNavi);
        e.focus();
        0 == this.keyboardNavi && e.classList.add("efmase_panel_close_hover");
      }
      return !1;
    },
    clearKBNavi: function (b) {
      1 != this.keyboardNavi &&
        ((b = document.getElementById(b + this.keyboardNavi)),
        b.blur(),
        0 == this.keyboardNavi &&
          b.classList.remove("efmase_panel_close_hover"));
      return !1;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.presentation.BracketPanel = $extend(Object, {
    palette: null,
    padWindow: null,
    oCancel: null,
    keyboardNavi: 1,
    bracketBtnTbody: null,
    row: 0,
    col: 0,
    titleElm: null,
    initialize: function (b) {
      this.palette = b;
    },
    create: function (b) {
      var a = this,
        e = this.palette.editor,
        d = document.createElement("div");
      d.id = "efmase_bracket_pad";
      brackets = org.imatheq.formulaeditor.parsing.expression.BracketList;
      d.className = "efmase_panel_pad";
      var g = document.createElement("div");
      d.appendChild(g);
      var f = document.createElement("span");
      g.appendChild(f);
      this.titleElm = f;
      oClose = document.createElement("span");
      g.appendChild(oClose);
      oClose.id = "bracket_panel_0";
      oClose.className = "efmase_panel_close";
      oClose.innerHTML = "x";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        oClose,
        "mousedown",
        function (b) {
          a.hide();
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(b);
          b.preventDefault();
          return !1;
        }
      );
      f = document.createElement("div");
      d.appendChild(f);
      g = document.createElement("table");
      g.id = "efmase_bracket_pad_table";
      f.appendChild(g);
      var h = document.createElement("div");
      h.style.zindex = "500";
      f.appendChild(h);
      f = document.createElement("input");
      f.type = "button";
      f.value = e.pData.TITLES["2200"];
      f.id = "bracket_panel_2";
      h.appendChild(f);
      f.onclick = function (b) {
        return a.onSubmit(b);
      };
      f = document.createElement("input");
      f.type = "button";
      f.value = e.pData.TITLES["2201"];
      f.id = "bracket_panel_3";
      h.appendChild(f);
      f.onclick = function (b) {
        a.hide();
        org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(event);
        event.preventDefault();
        return !1;
      };
      e = document.createElement("tbody");
      g.appendChild(e);
      for (h = 0; h < brackets.length / 2 + 1; h++) {
        for (var k = document.createElement("tr"), l = 0; 2 > l; l++) {
          var m = document.createElement("td");
          btnDiv = document.createElement("div");
          btnDiv.className = "efmase_bracket_pad_btn";
          h < brackets.length / 2
            ? ((btnDiv.innerHTML = brackets[2 * h + l]),
              (btnDiv.id = "efmase_bracket_" + brackets[2 * h + l]))
            : ((btnDiv.innerHTML = "&nbsp;"), (btnDiv.id = "efmase_bracket_"));
          org.imatheq.formulaeditor.FormulaEditor.addEventListener(
            btnDiv,
            "mousedown",
            (function (b, d) {
              return function (e) {
                return a.onSelect(d[0], b[0], e);
              };
            })([l], [h])
          );
          m.appendChild(btnDiv);
          k.appendChild(m);
        }
        e.appendChild(k);
      }
      g.appendChild(e);
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        d,
        "mousedown",
        function (a) {
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        }
      );
      b.appendChild(d);
      this.padWindow = d;
      this.oCancel = f;
      this.bracketBtnTbody = e;
    },
    show: function (b, a, e, d) {
      var g = "406" == b ? "create" : "edit";
      (null !== this.padWindow && void 0 !== this.padWindow) ||
        this.create(this.palette.container);
      document.getElementById("efmase_bracket_pad_table").style.display = "";
      document.getElementById("efmase_bracket_pad").style.left = a + "px";
      document.getElementById("efmase_bracket_pad").style.top = e + "px";
      d = this.palette.editor;
      d.blur();
      this.padWindow.btnId = b;
      this.titleElm.innerHTML = d.pData.TITLES[b];
      b = ["(", ")"];
      "edit" == g &&
        ((b = d.getBracketedObject()),
        (b = [
          "" == b.leftBracket.value ? "&nbsp;" : b.leftBracket.value,
          "" == b.rightBracket.value ? "&nbsp;" : b.rightBracket.value,
        ]));
      for (
        var g = document.getElementById("efmase_bracket_pad_table").firstChild,
          f = 0;
        f < g.childNodes.length;
        f++
      ) {
        var h = g.childNodes[f].childNodes[0].firstChild;
        h.innerText != b[0] && h.innerHTML != b[0]
          ? h.classList.remove("efmase_bracket_panel_sel")
          : ((this.row = f),
            (this.col = 0),
            h.classList.add("efmase_bracket_panel_sel"));
        h = g.childNodes[f].childNodes[1].firstChild;
        h.innerText != b[1] && h.innerHTML != b[1]
          ? h.classList.remove("efmase_bracket_panel_sel")
          : h.classList.add("efmase_bracket_panel_sel");
      }
      this.padWindow.style.display = "block";
      this.padWindow.style.left = "0px";
      a + this.padWindow.offsetWidth > parseInt(window.innerWidth) &&
        (a = parseInt(window.innerWidth) - this.padWindow.offsetWidth);
      this.padWindow.style.left = a + "px";
      this.padWindow.style.top = e + "px";
      d.isMobile ||
        ((d.textboxHeight = d.textbox.style.height),
        (d.textbox.style.height = 0));
      this.palette.activePanel = this;
      this.keyboardNavi = 1;
    },
    hide: function () {
      this.padWindow.btnId = "";
      this.padWindow.style.display = "none";
      var b = this.palette.editor;
      b.textbox.style.height = b.textboxHeight;
      b.hasFocus() ||
        (b.focus(), b.selection.hasSelection || b.cursor.showCursor());
      b.keyboardNavi = 4;
      this.palette.activePanel === this && (this.palette.activePanel = null);
      this.bracketBtnTbody.childNodes[this.row].childNodes[
        this.col
      ].firstChild.classList.remove("efmase_common_panel_hover");
    },
    onSubmit: function (b) {
      var a = this.palette.editor,
        e = document.getElementsByClassName("efmase_bracket_panel_sel");
      2 != e.length && alert("Please select left bracket and right bracket");
      e =
        null === e[0].parentNode.nextSibling
          ? [e[1].innerHTML, e[0].innerHTML]
          : [e[0].innerHTML, e[1].innerHTML];
      "&nbsp;" == e[0] && (e[0] = "");
      "&nbsp;" == e[1] && (e[1] = "");
      "406" == this.padWindow.btnId
        ? ("" == e[0] && "" == e[1]) ||
          this.palette.handlePaletteBtnClick(a, e[0], e[1])
        : this.palette.updateBracket(this.padWindow.btnId, e[0], e[1]);
      this.hide();
      org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(b);
      b.preventDefault();
      return !1;
    },
    onSelect: function (b, a, e) {
      for (var d = 0; d < this.bracketBtnTbody.childNodes.length; d++) {
        var g = this.bracketBtnTbody.childNodes[d].childNodes[a].firstChild;
        d != b && g.classList.contains("efmase_bracket_panel_sel")
          ? (g.classList.remove("efmase_bracket_panel_sel"),
            g.classList.contains("efmase_common_panel_hover") &&
              g.classList.remove("efmase_common_panel_hover"))
          : d != b ||
            g.classList.contains("efmase_bracket_panel_sel") ||
            (g.classList.add("efmase_bracket_panel_sel"),
            g.classList.contains("efmase_common_panel_hover") &&
              g.classList.remove("efmase_common_panel_hover"));
      }
      org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(e);
      e.preventDefault();
      return !1;
    },
    onkeydown: function (b) {
      if (9 == b.keyCode)
        return (
          this.clearKBNavi("bracket_panel_"),
          b.shiftKey
            ? --this.keyboardNavi
            : (this.keyboardNavi = ++this.keyboardNavi),
          -1 == this.keyboardNavi && (this.keyboardNavi = 3),
          4 == this.keyboardNavi && (this.keyboardNavi = 0),
          this.setKBNavi("bracket_panel_", b),
          !1
        );
      if (13 == b.keyCode)
        return (
          (activeElm = document.activeElement),
          ("input" == activeElm.localName.toLowerCase() &&
            "cancel" == activeElm.value.toLowerCase()) ||
          ("span" == activeElm.localName.toLowerCase() &&
            "x" == activeElm.value.toLowerCase())
            ? (this.hide(),
              org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(b),
              b.preventDefault(),
              !1)
            : this.onSubmit(b)
        );
      if (1 == this.keyboardNavi)
        switch (b.keyCode) {
          case 37:
            return this.kbNaviMove("left"), !1;
          case 38:
            return this.kbNaviMove("up"), !1;
          case 39:
            return this.kbNaviMove("right"), !1;
          case 40:
            return this.kbNaviMove("down"), !1;
        }
    },
    onkeypress: function (b) {
      if (1 == this.keyboardNavi && 32 == b.charCode)
        this.onSelect(this.row, this.col, b);
    },
    kbNaviMove: function (b) {
      if (1 == this.keyboardNavi) {
        var a =
          this.bracketBtnTbody.childNodes[this.row].childNodes[this.col]
            .firstChild;
        a.classList.contains("efmase_bracket_panel_sel") ||
          a.classList.remove("efmase_common_panel_hover");
        0 < this.col && "left" == b && this.col--;
        0 == this.col && "right" == b && this.col++;
        0 < this.row && "up" == b && this.row--;
        this.row < this.bracketBtnTbody.childNodes.length - 1 &&
          "down" == b &&
          this.row++;
        a =
          this.bracketBtnTbody.childNodes[this.row].childNodes[this.col]
            .firstChild;
        a.classList.contains("efmase_bracket_panel_sel") ||
          a.classList.add("efmase_common_panel_hover");
      }
      return !1;
    },
    setKBNavi: function (b, a) {
      if (1 != this.keyboardNavi) {
        var e = document.getElementById(b + this.keyboardNavi);
        e.focus();
        0 == this.keyboardNavi && e.classList.add("efmase_panel_close_hover");
      }
      return !1;
    },
    clearKBNavi: function (b) {
      1 != this.keyboardNavi &&
        ((b = document.getElementById(b + this.keyboardNavi)),
        b.blur(),
        0 == this.keyboardNavi &&
          b.classList.remove("efmase_panel_close_hover"));
      return !1;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.presentation.SizePanel = $extend(Object, {
    palette: null,
    padWindow: null,
    bracketBtnTbody: null,
    sizes: null,
    numRows: null,
    numCols: 2,
    row: -1,
    col: -1,
    titleElm: null,
    initialize: function (b, a, e) {
      this.palette = b;
      this.sizes = a;
      null !== e && void 0 !== e && (this.numCols = e);
      this.numRows = this.sizes.length / this.numCols;
    },
    getValue: function (b) {
      return this.sizes[b];
    },
    create: function (b) {
      var a = this,
        e = document.createElement("div");
      e.id = "efmase_size_pad";
      e.className = "efmase_panel_pad";
      var d = document.createElement("div");
      e.appendChild(d);
      this.titleElm = d;
      var g = document.createElement("div");
      e.appendChild(g);
      d = document.createElement("table");
      d.id = "efmase_size_pad_table";
      g.appendChild(d);
      g = document.createElement("tbody");
      d.appendChild(g);
      for (var f = 0; f < this.numRows; f++) {
        for (
          var h = document.createElement("tr"), k = 0;
          k < this.numCols;
          k++
        ) {
          var l = this.sizes[f * this.numCols + k],
            m = document.createElement("td");
          btnDiv = document.createElement("div");
          btnDiv.className = "efmase_bracket_pad_btn";
          btnDiv.innerHTML = l;
          org.imatheq.formulaeditor.FormulaEditor.addEventListener(
            btnDiv,
            "mousedown",
            (function (b, d) {
              return function (e) {
                return a.onSubmit(b[0], d[0], e);
              };
            })([f], [k])
          );
          m.appendChild(btnDiv);
          h.appendChild(m);
        }
        g.appendChild(h);
      }
      d.appendChild(g);
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        e,
        "mousedown",
        function (a) {
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        }
      );
      b.appendChild(e);
      this.padWindow = this.sizePad = e;
      this.sizeBtnTbody = g;
    },
    show: function (b, a, e, d) {
      this.col = this.row = -1;
      (null !== this.padWindow && void 0 !== this.padWindow) ||
        this.create(this.palette.container);
      this.padWindow.style.display = "block";
      null !== d &&
        void 0 !== d &&
        ((this.row = Math.floor(d / this.numCols)),
        (this.col = 1 == this.numCols ? 0 : d % this.numCols));
      document.getElementById("efmase_size_pad_table").style.display = "";
      document.getElementById("efmase_size_pad").style.left = a + "px";
      document.getElementById("efmase_size_pad").style.top = e + "px";
      d = this.palette.editor;
      d.blur();
      this.padWindow.btnId = b;
      this.titleElm.innerHTML =
        "&nbsp;&nbsp;" + d.pData.TITLES[b] + "&nbsp;&nbsp;";
      -1 !== this.row &&
        ((cell =
          this.sizeBtnTbody.childNodes[this.row].childNodes[this.col]
            .firstChild),
        cell.classList.add("efmase_common_panel_hover"));
      this.padWindow.style.left = "0px";
      a + this.padWindow.offsetWidth > parseInt(window.innerWidth) &&
        (a = parseInt(window.innerWidth) - this.padWindow.offsetWidth);
      this.padWindow.style.left = a + "px";
      this.padWindow.style.top = e + "px";
      d.isMobile ||
        ((d.textboxHeight = d.textbox.style.height),
        (d.textbox.style.height = 0));
      this.palette.activePanel = this;
    },
    hide: function () {
      this.padWindow.btnId = "";
      this.padWindow.style.display = "none";
      var b = this.palette.editor;
      b.isMobile || (b.textbox.style.height = b.textboxHeight);
      b.hasFocus() ||
        (b.focus(), b.selection.hasSelection || b.cursor.showCursor());
      b.keyboardNavi = 4;
      b.redraw();
      this.palette.activePanel === this && (this.palette.activePanel = null);
      -1 !== this.row &&
        ((cell =
          this.sizeBtnTbody.childNodes[this.row].childNodes[this.col]
            .firstChild),
        cell.classList.remove("efmase_common_panel_hover"));
    },
    onSubmit: function (b, a, e) {
      if (0 <= b && 0 <= a) {
        var d = this.sizeBtnTbody.childNodes[b].childNodes[a].firstChild;
        d.classList.remove("efmase_common_panel_hover");
        this.palette.execPalCmd(
          this.palette.symbols[this.padWindow.btnId],
          d.innerHTML,
          b * this.numCols + a
        );
      }
      this.hide();
      org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(e);
      e.preventDefault();
      return !1;
    },
    onkeydown: function (b) {
      if (13 == b.keyCode) return this.onSubmit(this.row, this.col, b);
      switch (b.keyCode) {
        case 37:
          return this.kbNaviMove("left"), !1;
        case 38:
          return this.kbNaviMove("up"), !1;
        case 39:
          return this.kbNaviMove("right"), !1;
        case 40:
          return this.kbNaviMove("down"), !1;
      }
    },
    onkeypress: function (b) {
      return !1;
    },
    kbNaviMove: function (b) {
      if (-1 == this.row && -1 == this.col) this.col = this.row = 0;
      else {
        var a =
          this.sizeBtnTbody.childNodes[this.row].childNodes[this.col]
            .firstChild;
        a.classList.contains("efmase_common_panel_hover") &&
          a.classList.remove("efmase_common_panel_hover");
        0 < this.col && "left" == b && this.col--;
        this.col < this.numCols - 1 && "right" == b && this.col++;
        0 < this.row && "up" == b && this.row--;
        this.row < this.sizeBtnTbody.childNodes.length - 1 &&
          "down" == b &&
          this.row++;
      }
      a =
        this.sizeBtnTbody.childNodes[this.row].childNodes[this.col].firstChild;
      a.classList.add("efmase_common_panel_hover");
      return !1;
    },
  });
})();
(function () {
  color_palette = [
    [
      { t: "black", rgb: [0, 0, 0] },
      { t: "dark gray 4", rgb: [67, 67, 67] },
      { t: "dark gray 3", rgb: [102, 102, 102] },
      { t: "dark gray 2", rgb: [153, 153, 153] },
      { t: "dark gray 1", rgb: [183, 183, 183] },
      { t: "gray", rgb: [204, 204, 204] },
      { t: "light gray 1", rgb: [217, 217, 217] },
      { t: "light gray 2", rgb: [239, 239, 239] },
      { t: "light gray 3", rgb: [243, 243, 243] },
      { t: "white", rgb: [255, 255, 255] },
    ],
    [
      { t: "red berry", rgb: [152, 0, 0] },
      { t: "red", rgb: [255, 0, 0] },
      { t: "orange", rgb: [255, 153, 0] },
      { t: "yellow", rgb: [255, 255, 0] },
      { t: "green", rgb: [0, 255, 0] },
      { t: "cyan", rgb: [0, 255, 255] },
      { t: "cornflower blue", rgb: [74, 134, 232] },
      { t: "blue", rgb: [0, 0, 255] },
      { t: "purple", rgb: [153, 0, 255] },
      { t: "magenta", rgb: [255, 0, 255] },
    ],
    [
      { t: "light red berry 3", rgb: [230, 184, 175] },
      { t: "light red 3", rgb: [244, 204, 204] },
      { t: "light orange 3", rgb: [252, 229, 205] },
      { t: "light yellow 3", rgb: [255, 242, 204] },
      { t: "light green 3", rgb: [217, 234, 211] },
      { t: "light cyan 3", rgb: [208, 224, 227] },
      { t: "light cornflower blue 3", rgb: [201, 218, 248] },
      { t: "light blue 3", rgb: [207, 226, 243] },
      { t: "light purple 3", rgb: [217, 210, 233] },
      { t: "light magenta 3", rgb: [234, 209, 220] },
    ],
    [
      { t: "light red berry 2", rgb: [221, 126, 107] },
      { t: "light red 2", rgb: [234, 153, 153] },
      { t: "light orange 2", rgb: [249, 203, 156] },
      { t: "light yellow 2", rgb: [255, 229, 153] },
      { t: "light green 2", rgb: [182, 215, 168] },
      { t: "light cyan 2", rgb: [162, 196, 201] },
      { t: "light cornflower blue 2", rgb: [164, 194, 244] },
      { t: "light blue 2", rgb: [159, 197, 232] },
      { t: "light purple 2", rgb: [180, 167, 214] },
      { t: "light magenta 2", rgb: [213, 166, 189] },
    ],
    [
      { t: "light red berry 1", rgb: [204, 65, 37] },
      { t: "light red 1", rgb: [224, 102, 102] },
      { t: "light orange 1", rgb: [246, 178, 107] },
      { t: "light yellow 1", rgb: [255, 217, 102] },
      { t: "light green 1", rgb: [147, 196, 125] },
      { t: "light cyan 1", rgb: [118, 165, 175] },
      { t: "light cornflower blue 1", rgb: [109, 158, 235] },
      { t: "light blue 1", rgb: [111, 168, 220] },
      { t: "light purple 1", rgb: [142, 124, 195] },
      { t: "light magenta 1", rgb: [194, 123, 160] },
    ],
    [
      { t: "dark red berry 1", rgb: [166, 28, 0] },
      { t: "dark red 1", rgb: [204, 0, 0] },
      { t: "dark orange 1", rgb: [230, 145, 56] },
      { t: "dark yellow 1", rgb: [241, 194, 50] },
      { t: "dark green 1", rgb: [106, 168, 79] },
      { t: "dark cyan 1", rgb: [69, 129, 142] },
      { t: "dark cornflower blue 1", rgb: [60, 120, 216] },
      { t: "dark blue 1", rgb: [61, 133, 198] },
      { t: "dark purple 1", rgb: [103, 78, 167] },
      { t: "dark magenta 1", rgb: [166, 77, 121] },
    ],
    [
      { t: "dark red berry 2", rgb: [133, 32, 12] },
      { t: "dark red 2", rgb: [153, 0, 0] },
      { t: "dark orange 2", rgb: [180, 95, 6] },
      { t: "dark yellow 2", rgb: [191, 144, 0] },
      { t: "dark green 2", rgb: [56, 118, 29] },
      { t: "dark cyan 2", rgb: [19, 79, 92] },
      { t: "dark cornflower blue 2", rgb: [17, 85, 204] },
      { t: "dark blue 2", rgb: [11, 83, 148] },
      { t: "dark purple 2", rgb: [53, 28, 117] },
      { t: "dark magenta 2", rgb: [116, 27, 71] },
    ],
    [
      { t: "dark red berry 3", rgb: [91, 15, 0] },
      { t: "dark red 3", rgb: [102, 0, 0] },
      { t: "dark orange 3", rgb: [120, 63, 4] },
      { t: "dark yellow 3", rgb: [127, 96, 0] },
      { t: "dark green 3", rgb: [39, 78, 19] },
      { t: "dark cyan 3", rgb: [12, 52, 61] },
      { t: "dark cornflower blue 3", rgb: [28, 69, 135] },
      { t: "dark blue 3", rgb: [7, 55, 99] },
      { t: "dark purple 3", rgb: [32, 18, 77] },
      { t: "dark magenta 3", rgb: [76, 17, 48] },
    ],
  ];
  org.imatheq.formulaeditor.presentation.ColorPanel = $extend(Object, {
    palette: null,
    padWindow: null,
    oCancel: null,
    keyboardNavi: 1,
    colorCodeInput: null,
    colorBtnTbody: null,
    row: 0,
    col: 0,
    curRow: 0,
    curCol: 0,
    titleElm: null,
    initialize: function (b) {
      this.palette = b;
    },
    create: function (b) {
      var a = this,
        e = this.palette.editor,
        d = document.createElement("div");
      d.id = "efmase_color_pad";
      d.className = "efmase_panel_pad";
      d.style.display = "none";
      var g = document.createElement("div");
      d.appendChild(g);
      var f = document.createElement("span");
      g.appendChild(f);
      this.titleElm = f;
      oClose = document.createElement("span");
      g.appendChild(oClose);
      oClose.id = "color_panel_0";
      oClose.className = "efmase_panel_close";
      oClose.innerHTML = "x";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        oClose,
        "mousedown",
        function (b) {
          a.hide();
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(b);
          b.preventDefault();
          return !1;
        }
      );
      var h = document.createElement("div");
      d.appendChild(h);
      g = document.createElement("table");
      g.id = "efmase_color_pad_table";
      h.appendChild(g);
      f = document.createElement("table");
      h.appendChild(f);
      var k = document.createElement("tbody");
      f.appendChild(k);
      var l = document.createElement("tr"),
        f = document.createElement("td");
      f.className = "efmase_pad_label";
      f.innerHTML = e.pData.TITLES["2202"];
      l.appendChild(f);
      var m = document.createElement("td");
      l.appendChild(m);
      f = document.createElement("input");
      f.className = "efmase_pad_input";
      f.id = "color_panel_2";
      f.value = "#000000";
      f.row = 0;
      f.col = 0;
      f.style.width = "80px";
      f.type = "text";
      f.title = "Input color code, like #00000";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        f,
        "focus",
        function (b) {
          a.keyboardNavi = 2;
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(b);
        }
      );
      m.appendChild(f);
      k.appendChild(l);
      k = document.createElement("div");
      k.style.zindex = "500";
      h.appendChild(k);
      h = document.createElement("input");
      h.type = "button";
      h.value = e.pData.TITLES["2200"];
      h.id = "color_panel_3";
      k.appendChild(h);
      h.onclick = function (b) {
        a.onSubmit(b);
        a.hide();
        org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(b);
        b.preventDefault();
        return !1;
      };
      h = document.createElement("input");
      h.type = "button";
      h.value = e.pData.TITLES["2201"];
      h.id = "color_panel_4";
      k.appendChild(h);
      h.onclick = function (b) {
        a.hide();
        org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(b);
        b.preventDefault();
        return !1;
      };
      e = document.createElement("tbody");
      g.appendChild(e);
      for (k = 0; 8 > k; k++) {
        3 > k &&
          ((l = document.createElement("tr")),
          e.appendChild(l),
          (m = document.createElement("td")),
          (m.height = "5px"),
          l.appendChild(m));
        for (var l = document.createElement("tr"), r = 0; 10 > r; r++) {
          m = document.createElement("td");
          btnDiv = document.createElement("div");
          btnDiv.className = "efmase_pad_btn";
          btnDiv.id = "efmase_color_" + k + "_" + r;
          var n = color_palette[k][r].rgb;
          btnDiv.style.backgroundColor =
            "rgb(" +
            n[0].toString() +
            "," +
            n[1].toString() +
            "," +
            n[2].toString() +
            ")";
          org.imatheq.formulaeditor.FormulaEditor.addEventListener(
            btnDiv,
            "mousedown",
            (function (b, d) {
              return function (e) {
                var f = color_palette[d[0]][b[0]].rgb;
                a.colorCodeInput.value =
                  "#" +
                  ("0" + f[0].toString(16)).slice(-2) +
                  ("0" + f[1].toString(16)).slice(-2) +
                  ("0" + f[2].toString(16)).slice(-2);
                a.onSubmit(e);
                a.hide();
                org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(e);
                e.preventDefault();
                return !1;
              };
            })([r], [k])
          );
          m.appendChild(btnDiv);
          l.appendChild(m);
        }
        e.appendChild(l);
      }
      g.appendChild(e);
      b.appendChild(d);
      this.padWindow = d;
      this.colorCodeInput = f;
      this.oCancel = h;
      this.colorBtnTbody = e;
    },
    show: function (b, a, e) {
      (null !== this.padWindow && void 0 !== this.padWindow) ||
        this.create(this.palette.container);
      this.padWindow.style.display = "block";
      document.getElementById("efmase_color_pad_table").style.display = "";
      document.getElementById("efmase_color_pad").style.left = b + "px";
      document.getElementById("efmase_color_pad").style.top = a + "px";
      e = this.palette.editor;
      this.titleElm.innerHTML =
        "&nbsp;&nbsp;" + e.pData.TITLES["106"] + "&nbsp;&nbsp;";
      this.colorCodeInput.value = e.getMathColor();
      this.hlightColorBtn();
      this.padWindow.style.left = "0px";
      b + this.padWindow.offsetWidth > parseInt(window.innerWidth) &&
        (b = parseInt(window.innerWidth) - this.padWindow.offsetWidth);
      this.padWindow.style.left = b + "px";
      this.padWindow.style.top = a + "px";
      e.blur();
      e.isMobile ||
        ((e.textboxHeight = e.textbox.style.height),
        (e.textbox.style.height = 0));
      this.palette.activePanel = this;
      this.keyboardNavi = 1;
    },
    hide: function () {
      this.colorCodeInput.blur();
      this.padWindow.style.display = "none";
      var b = this.palette.editor;
      b.isMobile || (b.textbox.style.height = b.textboxHeight);
      b.hasFocus() || b.focus();
      b.selection.hasSelection || b.cursor.showCursor();
      b.redraw();
      b.keyboardNavi = 4;
      this.palette.activePanel === this && (this.palette.activePanel = null);
    },
    onSubmit: function (b) {
      var a = this.colorCodeInput.value,
        e = org.imatheq.formulaeditor.presentation,
        d = { mathcolor: a },
        g = this.palette.editor;
      if (g.selection.hasSelection) g.selection.setSelSymbFontAttrbs(d);
      else {
        var f = g.cursor.position.row.children[g.cursor.position.index];
        f instanceof e.BlockSymbol && f.setSymbFontAttrbs(d);
      }
      g.setButtonStatus({ mathcolor: a });
      this.hide();
      org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(b);
      b.preventDefault();
      return !1;
    },
    hlightColorBtn: function () {
      var b = parseInt(this.colorCodeInput.value.slice(1), 16),
        a = (b >> 16) & 255,
        e = (b >> 8) & 255,
        b = b & 255,
        d = document.getElementById(
          "efmase_color_" + this.row + "_" + this.col
        );
      null !== d &&
        void 0 !== d &&
        (d.parentNode.classList.remove("efmase_color_pad_table_sel"),
        (this.col = this.row = 255));
      for (d = 0; 8 > d; d++)
        for (var g = 0; 10 > g; g++) {
          var f = color_palette[d][g].rgb;
          if (f[0] == a && f[1] == e && f[2] == b) {
            document
              .getElementById("efmase_color_" + d + "_" + g)
              .parentNode.classList.add("efmase_color_pad_table_sel");
            this.row = d;
            this.col = g;
            this.curRow = d;
            this.curCol = g;
            break;
          }
        }
    },
    setMathcolor: function () {
      (null !== this.padWindow && void 0 !== this.padWindow) ||
        this.create(this.palette.container);
      this.colorCodeInput.value = colorCode;
      this.hlightColorBtn();
    },
    getMathcolor: function () {
      return null === this.padWindow || void 0 === this.padWindow
        ? "#000000"
        : this.colorCodeInput.value;
    },
    onkeydown: function (b) {
      if (9 == b.keyCode)
        return (
          this.clearKBNavi("color_panel_"),
          b.shiftKey
            ? --this.keyboardNavi
            : (this.keyboardNavi = ++this.keyboardNavi),
          -1 == this.keyboardNavi && (this.keyboardNavi = 4),
          5 == this.keyboardNavi && (this.keyboardNavi = 0),
          this.setKBNavi("color_panel_", b),
          !1
        );
      if (13 == b.keyCode)
        return (
          (activeElm = document.activeElement),
          ("input" == activeElm.localName.toLowerCase() &&
            "cancel" == activeElm.value.toLowerCase()) ||
          ("span" == activeElm.localName.toLowerCase() &&
            "x" == activeElm.value.toLowerCase())
            ? (this.hide(),
              org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(b),
              b.preventDefault(),
              !1)
            : this.onSubmit(b)
        );
      if (
        1 == this.keyboardNavi &&
        "color_panel_2" != document.activeElement.id
      )
        switch (b.keyCode) {
          case 37:
            return this.kbNaviMove("left"), !1;
          case 38:
            return this.kbNaviMove("up"), !1;
          case 39:
            return this.kbNaviMove("right"), !1;
          case 40:
            return this.kbNaviMove("down"), !1;
        }
    },
    onkeypress: function (b) {},
    kbNaviMove: function (b) {
      if (1 == this.keyboardNavi) {
        var a = color_palette.length,
          e = color_palette[0].length,
          d = 3 > this.row ? 2 * this.row + 1 : this.row + 3,
          d = this.colorBtnTbody.childNodes[d].childNodes[this.col];
        d.classList.remove("efmase_color_pad_table_sel");
        0 < this.col && "left" == b && this.col--;
        this.col < e - 1 && "right" == b && this.col++;
        0 < this.row && "up" == b && this.row--;
        this.row < a - 1 && "down" == b && this.row++;
        d = 3 > this.row ? 2 * this.row + 1 : this.row + 3;
        d = this.colorBtnTbody.childNodes[d].childNodes[this.col];
        d.classList.contains("efmase_color_pad_table_sel") ||
          d.classList.add("efmase_color_pad_table_sel");
        b = color_palette[this.row][this.col].rgb;
        this.colorCodeInput.value =
          "#" +
          ("0" + b[0].toString(16)).slice(-2) +
          ("0" + b[1].toString(16)).slice(-2) +
          ("0" + b[2].toString(16)).slice(-2);
      }
      return !1;
    },
    setKBNavi: function (b, a) {
      if (1 != this.keyboardNavi) {
        var e = document.getElementById(b + this.keyboardNavi);
        e.focus();
        0 == this.keyboardNavi && e.classList.add("efmase_panel_close_hover");
      }
      return !1;
    },
    clearKBNavi: function (b) {
      1 != this.keyboardNavi &&
        ((b = document.getElementById(b + this.keyboardNavi)),
        b.blur(),
        0 == this.keyboardNavi &&
          b.classList.remove("efmase_panel_close_hover"));
      return !1;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.presentation.BevelledFraction = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      draw: function (b, a, e, d, g) {
        var f,
          h,
          k,
          l = 1,
          m = 2;
        d =
          this.parent instanceof org.imatheq.formulaeditor.presentation.Row &&
          0 < this.index
            ? this.parent.children[this.index - 1].dimensions
            : b.getXDimentions(a, e, d);
        d = d.top + d.height / 2;
        e = Math.round(e);
        d = Math.round(d);
        var r = 0;
        void 0 !== a.fontSizeModifier &&
          null !== a.fontSizeModifier &&
          (r = a.fontSizeModifier);
        var n = b.getFontSizeIdx(r),
          r = { fontSizeModifier: r };
        for (k in a) r[k] = a[k];
        8 < n && (l = 2);
        6 > n && (m = 1);
        this.children[1].draw(b, a, 0, 0, !0);
        f = this.children[1].dimensions.height;
        this.children[0].draw(b, r, 0, 0, !0);
        h = this.children[0].dimensions.height;
        slashDims = {
          left: e,
          top: d,
          width: Math.round(0.4 * (f + h)),
          height: f + h,
        };
        k = slashDims.height;
        var p = k / 2,
          n = 0,
          n = Math.min(
            0,
            slashDims.width - 0.4 * h - (this.children[0].dimensions.width + m)
          );
        leftXAdjust = Math.max(
          0,
          slashDims.width - 0.4 * h - (this.children[0].dimensions.width + m)
        );
        var t = 0,
          t = Math.min(
            0,
            slashDims.width - 0.4 * f - (this.children[1].dimensions.width + m)
          );
        middleXAdjust = 0.4 * f + m;
        +Math.max(0, 0.4 * h - this.children[1].dimensions.width - m);
        this.dimensions = {
          height: k,
          width: slashDims.width + -n - t,
          left: e,
          top: d - slashDims.height / 2,
        };
        this.children[0].draw(
          b,
          r,
          e - this.children[0].dimensions.left + leftXAdjust,
          d +
            p -
            (k - this.children[0].dimensions.height) -
            (this.children[0].dimensions.top +
              this.children[0].dimensions.height),
          g
        );
        this.children[1].draw(
          b,
          a,
          e - n + middleXAdjust,
          d +
            p -
            (this.children[1].dimensions.top +
              this.children[1].dimensions.height),
          g
        );
        g ||
          ((b = b.getContext()),
          b.save(),
          (b.strokeStyle = this.mathcolor),
          (b.lineWidth = l),
          b.beginPath(),
          b.moveTo(e - n + slashDims.width, this.dimensions.top),
          b.lineTo(e - n, this.dimensions.top + k),
          b.stroke(),
          b.closePath(),
          b.restore());
        return this.dimensions;
      },
      functionsFromRow: ["getFirstCursorPosition", "getLastCursorPosition"],
      getCursorPosition: function (b, a, e) {
        return a > this.dimensions.left &&
          a < this.dimensions.left + this.dimensions.width - 1
          ? ((right_dim = this.children[1].dimensions),
            a < right_dim.left
              ? this.children[0].getCursorPosition(b, a, e)
              : this.children[1].getCursorPosition(b, a, e))
          : a <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(b, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(b, this.index, !1);
      },
      getFollowingCursorPosition: function (b, a, e) {
        if (null === e || void 0 === e) e = !0;
        if (null === a || void 0 === a)
          return this.children[0].getFollowingCursorPosition(b, null, e);
        var d = null;
        if (0 === a)
          if (e) d = this.children[1].getFollowingCursorPosition(b, null, e);
          else return { row: this.children[1], index: 0 };
        return null === d && null !== this.parent
          ? this.parent.getFollowingCursorPosition(b, this.index, !1)
          : d;
      },
      getPrecedingCursorPosition: function (b, a, e) {
        if (null === e || void 0 === e) e = !0;
        if (null === a || void 0 === a)
          return this.children[1].getPrecedingCursorPosition(b, null, e);
        var d = null;
        if (1 == a)
          if (e) d = this.children[0].getLastCursorPosition(b, null, e);
          else
            return {
              row: this.children[0],
              index: this.children[0].children.length,
            };
        return null === d && null !== this.parent
          ? { row: this.parent, index: this.index }
          : d;
      },
      getLowerCursorPosition: function (b, a, e, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === a || void 0 === a)
          return this.children[0].getLowerCursorPosition(b, null, e, d);
        var g = null;
        if (0 === a)
          if (d) g = this.children[1].getLowerCursorPosition(b, null, e, d);
          else return { row: this.moddle, index: 0 };
        return null === g && null !== this.parent
          ? this.parent.getLowerCursorPosition(b, this.index, e, !1)
          : g;
      },
      getHigherCursorPosition: function (b, a, e, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === a || void 0 === a)
          return this.children[1].getHigherCursorPosition(b, null, e, d);
        var g = null;
        if (1 === a)
          if (d) g = this.children[0].getHigherCursorPosition(b, null, e, d);
          else return { row: this.moddle, index: 0 };
        return null === g && null !== this.parent
          ? this.parent.getHigherCursorPosition(b, this.index, e, !1)
          : g;
      },
      initialize: function () {
        0 < arguments.length
          ? ((this.children = []),
            this.children.push(arguments[0]),
            this.children.push(arguments[1]))
          : (this.children = []);
        for (
          var b = new org.imatheq.formulaeditor.presentation.Row(),
            a = this.functionsFromRow.length - 1;
          0 <= a;
          a--
        )
          this[this.functionsFromRow[a]] ||
            (this[this.functionsFromRow[a]] = b[this.functionsFromRow[a]]);
        this.updateChildren();
      },
      copy: function () {
        return 2 == this.children.length
          ? this.clone(this.children[0].copy(), this.children[1].copy())
          : this.clone();
      },
      getMathML: function () {
        return (
          '<mfrac bevelled="true"' +
          (this.in_attrbs ? this.in_attrbs : "") +
          (null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"') +
          ">" +
          this.children[0].getMathML(!0) +
          this.children[1].getMathML(!0) +
          "</mfrac>"
        );
      },
      getAltText: function () {
        var b = org.imatheq.formulaeditor.FormulaEditor.getEditor(),
          a = b.altstrs.bevelled[
            (this.children[0].children &&
              1 < this.children[0].children.length) ||
            (this.children[1].children && 1 < this.children[1].children.length)
              ? 1
              : 0
          ]
            .replace("$0$", this.children[0].getAltText().trim())
            .replace("$1$", this.children[1].getAltText().trim()),
          e = a.trim();
        null !== b.altstrs[e] && void 0 !== b.altstrs[e] && (a = b.altstrs[e]);
        return a;
      },
    }
  );
})();
(function () {})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.KeywordList = {
    arccos: { type: "f", fix: "i" },
    arccosh: { type: "f", fix: "i" },
    arccot: { type: "f", fix: "i" },
    arccoth: { type: "f", fix: "i" },
    arccsc: { type: "f", fix: "i" },
    arccsch: { type: "f", fix: "i" },
    arcsec: { type: "f", fix: "i" },
    arcsech: { type: "f", fix: "i" },
    arcsin: { type: "f", fix: "i" },
    arcsinh: { type: "f", fix: "i" },
    arctan: { type: "f", fix: "i" },
    arctanh: { type: "f", fix: "i" },
    cos: { type: "f", fix: "i" },
    cosh: { type: "f", fix: "i" },
    cot: { type: "f", fix: "i" },
    coth: { type: "f", fix: "i" },
    csc: { type: "f", fix: "i" },
    csch: { type: "f", fix: "i" },
    exp: { type: "f", fix: "i" },
    ln: { type: "f", fix: "i" },
    log: { type: "f", fix: "i" },
    sec: { type: "f", fix: "i" },
    sech: { type: "f", fix: "i" },
    sin: { type: "f", fix: "i" },
    sinh: { type: "f", fix: "i" },
    tan: { type: "f", fix: "i" },
    tanh: { type: "f", fix: "i" },
  };
})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.MOList = {
    " ": {
      0: null,
      1: { gl: " ", nm: "space", pr: 880, ls: 0, rs: 0, pp: "" },
      2: null,
    },
    "\u00a0": {
      0: { gl: " ", nm: "space", pr: 880, ls: 0, rs: 0, pp: "" },
      1: { gl: " ", nm: "space", pr: 880, ls: 0, rs: 0, pp: "" },
      2: { gl: " ", nm: "space", pr: 880, ls: 0, rs: 0, pp: "" },
    },
    "'": {
      0: null,
      1: null,
      2: { gl: "'", nm: "apostrophe", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "-": {
      0: { gl: "-", nm: "hyphen-minus", pr: 275, ls: 0, rs: 1, pp: "" },
      1: { gl: "-", nm: "hyphen-minus", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "--": {
      0: null,
      1: null,
      2: {
        gl: "--",
        nm: "multiple character operator: --",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "",
      },
    },
    "!": {
      0: null,
      1: null,
      2: { gl: "!", nm: "exclamation mark", pr: 810, ls: 1, rs: 0, pp: "" },
    },
    "!!": {
      0: null,
      1: null,
      2: {
        gl: "!!",
        nm: "multiple character operator: !!",
        pr: 810,
        ls: 1,
        rs: 0,
        pp: "",
      },
    },
    "!=": {
      0: null,
      1: {
        gl: "!=",
        nm: "multiple character operator: !=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "%": {
      0: null,
      1: { gl: "%", nm: "percent sign", pr: 640, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2030": {
      0: null,
      1: { gl: "\u2030", nm: "permille sign", pr: 640, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2016": {
      0: {
        gl: "\u2016",
        nm: "double vertical line",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy",
      },
      1: null,
      2: {
        gl: "\u2016",
        nm: "double vertical line",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy",
      },
    },
    "\u2018": {
      0: {
        gl: "\u2018",
        nm: "left single quotation mark",
        pr: 10,
        ls: 0,
        rs: 0,
        pp: "fence",
      },
      1: null,
      2: null,
    },
    "\u2019": {
      0: null,
      1: null,
      2: {
        gl: "\u2019",
        nm: "right single quotation mark",
        pr: 10,
        ls: 0,
        rs: 0,
        pp: "fence",
      },
    },
    "\u201a": {
      0: null,
      1: null,
      2: {
        gl: "\u201a",
        nm: "single low-9 quotation mark",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u201b": {
      0: null,
      1: null,
      2: {
        gl: "\u201b",
        nm: "single high-reversed-9 quotation mark",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u201c": {
      0: {
        gl: "\u201c",
        nm: "left double quotation mark",
        pr: 10,
        ls: 0,
        rs: 0,
        pp: "fence",
      },
      1: null,
      2: null,
    },
    "\u201d": {
      0: null,
      1: null,
      2: {
        gl: "\u201d",
        nm: "right double quotation mark",
        pr: 10,
        ls: 0,
        rs: 0,
        pp: "fence",
      },
    },
    "\u201e": {
      0: null,
      1: null,
      2: {
        gl: "\u201e",
        nm: "double low-9 quotation mark",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u201f": {
      0: null,
      1: null,
      2: {
        gl: "\u201f",
        nm: "double high-reversed-9 quotation mark",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2022": {
      0: null,
      1: { gl: "\u2022", nm: "bullet", pr: 390, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2026": {
      0: null,
      1: {
        gl: "\u2026",
        nm: "horizontal ellipsis",
        pr: 150,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u2032": {
      0: null,
      1: null,
      2: { gl: "\u2032", nm: "prime", pr: 800, ls: 0, rs: 0, pp: "" },
    },
    "\u2033": {
      0: null,
      1: null,
      2: {
        gl: "\u2033",
        nm: "double prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2034": {
      0: null,
      1: null,
      2: {
        gl: "\u2034",
        nm: "triple prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2035": {
      0: null,
      1: null,
      2: {
        gl: "\u2035",
        nm: "reversed prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2036": {
      0: null,
      1: null,
      2: {
        gl: "\u2036",
        nm: "reversed double prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2037": {
      0: null,
      1: null,
      2: {
        gl: "\u2037",
        nm: "reversed triple prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u203e": {
      0: null,
      1: null,
      2: {
        gl: "\u203e",
        nm: "overline",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u2043": {
      0: null,
      1: { gl: "\u2043", nm: "hyphen bullet", pr: 390, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2044": {
      0: null,
      1: {
        gl: "\u2044",
        nm: "fraction slash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2057": {
      0: null,
      1: null,
      2: {
        gl: "\u2057",
        nm: "quadruple prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2061": {
      0: null,
      1: {
        gl: "&#x2061;",
        nm: "\u2061function application",
        pr: 850,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u2062": {
      0: null,
      1: {
        gl: "&#x2062;",
        nm: "\u2062invisible times",
        pr: 390,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u2063": {
      0: null,
      1: {
        gl: "&#x2063;",
        nm: "\u2063invisible separator",
        pr: 40,
        ls: 0,
        rs: 0,
        pp: "separator, linebreakstyle=after",
      },
      2: null,
    },
    "\u2064": {
      0: null,
      1: {
        gl: "&#x2064;",
        nm: "\u2064invisible plus",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u20db": {
      0: null,
      1: null,
      2: {
        gl: "\u20db",
        nm: "combining three dots above",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u20dc": {
      0: null,
      1: null,
      2: {
        gl: "\u20dc",
        nm: "combining four dots above",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2145": {
      0: {
        gl: "\u2145",
        nm: "double-struck italic capital d",
        pr: 845,
        ls: 2,
        rs: 1,
        pp: "",
      },
      1: null,
      2: null,
    },
    "\u2146": {
      0: {
        gl: "\u2146",
        nm: "double-struck italic small d",
        pr: 845,
        ls: 2,
        rs: 0,
        pp: "",
      },
      1: null,
      2: null,
    },
    "\u2190": {
      0: null,
      1: {
        gl: "\u2190",
        nm: "leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2191": {
      0: null,
      1: {
        gl: "\u2191",
        nm: "upwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2192": {
      0: null,
      1: {
        gl: "\u2192",
        nm: "rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2193": {
      0: null,
      1: {
        gl: "\u2193",
        nm: "downwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2194": {
      0: null,
      1: {
        gl: "\u2194",
        nm: "left right arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2195": {
      0: null,
      1: {
        gl: "\u2195",
        nm: "up down arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2196": {
      0: null,
      1: {
        gl: "\u2196",
        nm: "north west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2197": {
      0: null,
      1: {
        gl: "\u2197",
        nm: "north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2198": {
      0: null,
      1: {
        gl: "\u2198",
        nm: "south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2199": {
      0: null,
      1: {
        gl: "\u2199",
        nm: "south west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u219a": {
      0: null,
      1: {
        gl: "\u219a",
        nm: "leftwards arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u219b": {
      0: null,
      1: {
        gl: "\u219b",
        nm: "rightwards arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u219c": {
      0: null,
      1: {
        gl: "\u219c",
        nm: "leftwards wave arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u219d": {
      0: null,
      1: {
        gl: "\u219d",
        nm: "rightwards wave arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u219e": {
      0: null,
      1: {
        gl: "\u219e",
        nm: "leftwards two headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u219f": {
      0: null,
      1: {
        gl: "\u219f",
        nm: "upwards two headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a0": {
      0: null,
      1: {
        gl: "\u21a0",
        nm: "rightwards two headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a1": {
      0: null,
      1: {
        gl: "\u21a1",
        nm: "downwards two headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21a2": {
      0: null,
      1: {
        gl: "\u21a2",
        nm: "leftwards arrow with tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a3": {
      0: null,
      1: {
        gl: "\u21a3",
        nm: "rightwards arrow with tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a4": {
      0: null,
      1: {
        gl: "\u21a4",
        nm: "leftwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a5": {
      0: null,
      1: {
        gl: "\u21a5",
        nm: "upwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21a6": {
      0: null,
      1: {
        gl: "\u21a6",
        nm: "rightwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a7": {
      0: null,
      1: {
        gl: "\u21a7",
        nm: "downwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21a8": {
      0: null,
      1: {
        gl: "\u21a8",
        nm: "up down arrow with base",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21a9": {
      0: null,
      1: {
        gl: "\u21a9",
        nm: "leftwards arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21aa": {
      0: null,
      1: {
        gl: "\u21aa",
        nm: "rightwards arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ab": {
      0: null,
      1: {
        gl: "\u21ab",
        nm: "leftwards arrow with loop",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ac": {
      0: null,
      1: {
        gl: "\u21ac",
        nm: "rightwards arrow with loop",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ad": {
      0: null,
      1: {
        gl: "\u21ad",
        nm: "left right wave arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ae": {
      0: null,
      1: {
        gl: "\u21ae",
        nm: "left right arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21af": {
      0: null,
      1: {
        gl: "\u21af",
        nm: "downwards zigzag arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b0": {
      0: null,
      1: {
        gl: "\u21b0",
        nm: "upwards arrow with tip leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b1": {
      0: null,
      1: {
        gl: "\u21b1",
        nm: "upwards arrow with tip rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b2": {
      0: null,
      1: {
        gl: "\u21b2",
        nm: "downwards arrow with tip leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b3": {
      0: null,
      1: {
        gl: "\u21b3",
        nm: "downwards arrow with tip rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b4": {
      0: null,
      1: {
        gl: "\u21b4",
        nm: "rightwards arrow with corner downwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b5": {
      0: null,
      1: {
        gl: "\u21b5",
        nm: "downwards arrow with corner leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b6": {
      0: null,
      1: {
        gl: "\u21b6",
        nm: "anticlockwise top semicircle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21b7": {
      0: null,
      1: {
        gl: "\u21b7",
        nm: "clockwise top semicircle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21b8": {
      0: null,
      1: {
        gl: "\u21b8",
        nm: "north west arrow to long bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21b9": {
      0: null,
      1: {
        gl: "\u21b9",
        nm: "leftwards arrow to bar over rightwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ba": {
      0: null,
      1: {
        gl: "\u21ba",
        nm: "anticlockwise open circle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21bb": {
      0: null,
      1: {
        gl: "\u21bb",
        nm: "clockwise open circle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21bc": {
      0: null,
      1: {
        gl: "\u21bc",
        nm: "leftwards harpoon with barb upwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21bd": {
      0: null,
      1: {
        gl: "\u21bd",
        nm: "leftwards harpoon with barb downwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21be": {
      0: null,
      1: {
        gl: "\u21be",
        nm: "upwards harpoon with barb rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21bf": {
      0: null,
      1: {
        gl: "\u21bf",
        nm: "upwards harpoon with barb leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c0": {
      0: null,
      1: {
        gl: "\u21c0",
        nm: "rightwards harpoon with barb upwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c1": {
      0: null,
      1: {
        gl: "\u21c1",
        nm: "rightwards harpoon with barb downwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c2": {
      0: null,
      1: {
        gl: "\u21c2",
        nm: "downwards harpoon with barb rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c3": {
      0: null,
      1: {
        gl: "\u21c3",
        nm: "downwards harpoon with barb leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c4": {
      0: null,
      1: {
        gl: "\u21c4",
        nm: "rightwards arrow over leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c5": {
      0: null,
      1: {
        gl: "\u21c5",
        nm: "upwards arrow leftwards of downwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c6": {
      0: null,
      1: {
        gl: "\u21c6",
        nm: "leftwards arrow over rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c7": {
      0: null,
      1: {
        gl: "\u21c7",
        nm: "leftwards paired arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c8": {
      0: null,
      1: {
        gl: "\u21c8",
        nm: "upwards paired arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c9": {
      0: null,
      1: {
        gl: "\u21c9",
        nm: "rightwards paired arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ca": {
      0: null,
      1: {
        gl: "\u21ca",
        nm: "downwards paired arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21cb": {
      0: null,
      1: {
        gl: "\u21cb",
        nm: "leftwards harpoon over rightwards harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21cc": {
      0: null,
      1: {
        gl: "\u21cc",
        nm: "rightwards harpoon over leftwards harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21cd": {
      0: null,
      1: {
        gl: "\u21cd",
        nm: "leftwards double arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21ce": {
      0: null,
      1: {
        gl: "\u21ce",
        nm: "left right double arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21cf": {
      0: null,
      1: {
        gl: "\u21cf",
        nm: "rightwards double arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21d0": {
      0: null,
      1: {
        gl: "\u21d0",
        nm: "leftwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21d1": {
      0: null,
      1: {
        gl: "\u21d1",
        nm: "upwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d2": {
      0: null,
      1: {
        gl: "\u21d2",
        nm: "rightwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21d3": {
      0: null,
      1: {
        gl: "\u21d3",
        nm: "downwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d4": {
      0: null,
      1: {
        gl: "\u21d4",
        nm: "left right double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21d5": {
      0: null,
      1: {
        gl: "\u21d5",
        nm: "up down double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d6": {
      0: null,
      1: {
        gl: "\u21d6",
        nm: "north west double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d7": {
      0: null,
      1: {
        gl: "\u21d7",
        nm: "north east double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d8": {
      0: null,
      1: {
        gl: "\u21d8",
        nm: "south east double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d9": {
      0: null,
      1: {
        gl: "\u21d9",
        nm: "south west double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21da": {
      0: null,
      1: {
        gl: "\u21da",
        nm: "leftwards triple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21db": {
      0: null,
      1: {
        gl: "\u21db",
        nm: "rightwards triple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21dc": {
      0: null,
      1: {
        gl: "\u21dc",
        nm: "leftwards squiggle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21dd": {
      0: null,
      1: {
        gl: "\u21dd",
        nm: "rightwards squiggle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21de": {
      0: null,
      1: {
        gl: "\u21de",
        nm: "upwards arrow with double stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21df": {
      0: null,
      1: {
        gl: "\u21df",
        nm: "downwards arrow with double stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21e0": {
      0: null,
      1: {
        gl: "\u21e0",
        nm: "leftwards dashed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e1": {
      0: null,
      1: {
        gl: "\u21e1",
        nm: "upwards dashed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21e2": {
      0: null,
      1: {
        gl: "\u21e2",
        nm: "rightwards dashed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e3": {
      0: null,
      1: {
        gl: "\u21e3",
        nm: "downwards dashed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21e4": {
      0: null,
      1: {
        gl: "\u21e4",
        nm: "leftwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e5": {
      0: null,
      1: {
        gl: "\u21e5",
        nm: "rightwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e6": {
      0: null,
      1: {
        gl: "\u21e6",
        nm: "leftwards white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e7": {
      0: null,
      1: {
        gl: "\u21e7",
        nm: "upwards white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21e8": {
      0: null,
      1: {
        gl: "\u21e8",
        nm: "rightwards white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e9": {
      0: null,
      1: {
        gl: "\u21e9",
        nm: "downwards white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ea": {
      0: null,
      1: {
        gl: "\u21ea",
        nm: "upwards white arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21eb": {
      0: null,
      1: {
        gl: "\u21eb",
        nm: "upwards white arrow on pedestal",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ec": {
      0: null,
      1: {
        gl: "\u21ec",
        nm: "upwards white arrow on pedestal with horizontal bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ed": {
      0: null,
      1: {
        gl: "\u21ed",
        nm: "upwards white arrow on pedestal with vertical bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ee": {
      0: null,
      1: {
        gl: "\u21ee",
        nm: "upwards white double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ef": {
      0: null,
      1: {
        gl: "\u21ef",
        nm: "upwards white double arrow on pedestal",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21f0": {
      0: null,
      1: {
        gl: "\u21f0",
        nm: "rightwards white arrow from wall",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21f1": {
      0: null,
      1: {
        gl: "\u21f1",
        nm: "north west arrow to corner",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21f2": {
      0: null,
      1: {
        gl: "\u21f2",
        nm: "south east arrow to corner",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21f3": {
      0: null,
      1: {
        gl: "\u21f3",
        nm: "up down white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21f4": {
      0: null,
      1: {
        gl: "\u21f4",
        nm: "right arrow with small circle",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21f5": {
      0: null,
      1: {
        gl: "\u21f5",
        nm: "downwards arrow leftwards of upwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21f6": {
      0: null,
      1: {
        gl: "\u21f6",
        nm: "three rightwards arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21f7": {
      0: null,
      1: {
        gl: "\u21f7",
        nm: "leftwards arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21f8": {
      0: null,
      1: {
        gl: "\u21f8",
        nm: "rightwards arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21f9": {
      0: null,
      1: {
        gl: "\u21f9",
        nm: "left right arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21fa": {
      0: null,
      1: {
        gl: "\u21fa",
        nm: "leftwards arrow with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21fb": {
      0: null,
      1: {
        gl: "\u21fb",
        nm: "rightwards arrow with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21fc": {
      0: null,
      1: {
        gl: "\u21fc",
        nm: "left right arrow with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21fd": {
      0: null,
      1: {
        gl: "\u21fd",
        nm: "leftwards open-headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21fe": {
      0: null,
      1: {
        gl: "\u21fe",
        nm: "rightwards open-headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ff": {
      0: null,
      1: {
        gl: "\u21ff",
        nm: "left right open-headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2200": {
      0: { gl: "\u2200", nm: "for all", pr: 230, ls: 2, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u2201": {
      0: null,
      1: { gl: "\u2201", nm: "complement", pr: 240, ls: 1, rs: 2, pp: "" },
      2: null,
    },
    "\u2202": {
      0: {
        gl: "\u2202",
        nm: "partial differential",
        pr: 740,
        ls: 2,
        rs: 1,
        pp: "",
      },
      1: null,
      2: null,
    },
    "\u2203": {
      0: { gl: "\u2203", nm: "there exists", pr: 230, ls: 2, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u2204": {
      0: {
        gl: "\u2204",
        nm: "there does not exist",
        pr: 230,
        ls: 2,
        rs: 1,
        pp: "",
      },
      1: null,
      2: null,
    },
    "\u2206": {
      0: null,
      1: { gl: "\u2206", nm: "increment", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2207": {
      0: { gl: "\u2207", nm: "nabla", pr: 740, ls: 2, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u2208": {
      0: null,
      1: { gl: "\u2208", nm: "element of", pr: 240, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2209": {
      0: null,
      1: {
        gl: "\u2209",
        nm: "not an element of",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220a": {
      0: null,
      1: {
        gl: "\u220a",
        nm: "small element of",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220b": {
      0: null,
      1: {
        gl: "\u220b",
        nm: "contains as member",
        pr: 160,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220c": {
      0: null,
      1: {
        gl: "\u220c",
        nm: "does not contain as member",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220d": {
      0: null,
      1: {
        gl: "\u220d",
        nm: "small contains as member",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220e": {
      0: null,
      1: { gl: "\u220e", nm: "end of proof", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u220f": {
      0: {
        gl: "\u220f",
        nm: "n-ary product",
        pr: 350,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2210": {
      0: {
        gl: "\u2210",
        nm: "n-ary coproduct",
        pr: 350,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2211": {
      0: {
        gl: "\u2211",
        nm: "n-ary summation",
        pr: 290,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2212": {
      0: { gl: "\u2212", nm: "minus sign", pr: 275, ls: 0, rs: 1, pp: "" },
      1: { gl: "\u2212", nm: "minus sign", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2213": {
      0: {
        gl: "\u2213",
        nm: "minus-or-plus sign",
        pr: 275,
        ls: 0,
        rs: 1,
        pp: "",
      },
      1: {
        gl: "\u2213",
        nm: "minus-or-plus sign",
        pr: 275,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2214": {
      0: null,
      1: { gl: "\u2214", nm: "dot plus", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2215": {
      0: null,
      1: {
        gl: "\u2215",
        nm: "division slash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2216": {
      0: null,
      1: { gl: "\u2216", nm: "set minus", pr: 650, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2217": {
      0: null,
      1: {
        gl: "\u2217",
        nm: "asterisk operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2218": {
      0: null,
      1: { gl: "\u2218", nm: "ring operator", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2219": {
      0: null,
      1: { gl: "\u2219", nm: "bullet operator", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u221a": {
      0: {
        gl: "\u221a",
        nm: "square root",
        pr: 845,
        ls: 1,
        rs: 1,
        pp: "stretchy",
      },
      1: null,
      2: null,
    },
    "\u221b": {
      0: { gl: "\u221b", nm: "cube root", pr: 845, ls: 1, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u221c": {
      0: { gl: "\u221c", nm: "fourth root", pr: 845, ls: 1, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u221d": {
      0: null,
      1: { gl: "\u221d", nm: "proportional to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u221f": {
      0: null,
      1: { gl: "\u221f", nm: "right angle", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2220": {
      0: { gl: "\u2220", nm: "angle", pr: 670, ls: 0, rs: 0, pp: "" },
      1: null,
      2: null,
    },
    "\u2221": {
      0: { gl: "\u2221", nm: "measured angle", pr: 670, ls: 0, rs: 0, pp: "" },
      1: null,
      2: null,
    },
    "\u2222": {
      0: { gl: "\u2222", nm: "spherical angle", pr: 670, ls: 0, rs: 0, pp: "" },
      1: null,
      2: null,
    },
    "\u2223": {
      0: null,
      1: { gl: "\u2223", nm: "divides", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2224": {
      0: null,
      1: { gl: "\u2224", nm: "does not divide", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2225": {
      0: null,
      1: { gl: "\u2225", nm: "parallel to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2226": {
      0: null,
      1: { gl: "\u2226", nm: "not parallel to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2227": {
      0: null,
      1: { gl: "\u2227", nm: "logical and", pr: 200, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2228": {
      0: null,
      1: { gl: "\u2228", nm: "logical or", pr: 190, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2229": {
      0: null,
      1: { gl: "\u2229", nm: "intersection", pr: 350, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u222a": {
      0: null,
      1: { gl: "\u222a", nm: "union", pr: 350, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u222b": {
      0: {
        gl: "\u222b",
        nm: "integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u222c": {
      0: {
        gl: "\u222c",
        nm: "double integral",
        pr: 300,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u222d": {
      0: {
        gl: "\u222d",
        nm: "triple integral",
        pr: 300,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u222e": {
      0: {
        gl: "\u222e",
        nm: "contour integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u222f": {
      0: {
        gl: "\u222f",
        nm: "surface integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2230": {
      0: {
        gl: "\u2230",
        nm: "volume integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2231": {
      0: {
        gl: "\u2231",
        nm: "clockwise integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2232": {
      0: {
        gl: "\u2232",
        nm: "clockwise contour integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2233": {
      0: {
        gl: "\u2233",
        nm: "anticlockwise contour integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2234": {
      0: null,
      1: { gl: "\u2234", nm: "therefore", pr: 70, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2235": {
      0: null,
      1: { gl: "\u2235", nm: "because", pr: 70, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2236": {
      0: null,
      1: { gl: "\u2236", nm: "ratio", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2237": {
      0: null,
      1: { gl: "\u2237", nm: "proportion", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2238": {
      0: null,
      1: { gl: "\u2238", nm: "dot minus", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2239": {
      0: null,
      1: { gl: "\u2239", nm: "excess", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223a": {
      0: null,
      1: {
        gl: "\u223a",
        nm: "geometric proportion",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u223b": {
      0: null,
      1: { gl: "\u223b", nm: "homothetic", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223c": {
      0: null,
      1: { gl: "\u223c", nm: "tilde operator", pr: 250, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223d": {
      0: null,
      1: { gl: "\u223d", nm: "reversed tilde", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223d\u0331": {
      0: null,
      1: {
        gl: "\u223d\u0331",
        nm: "reversed tilde with underline",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u223e": {
      0: null,
      1: { gl: "\u223e", nm: "inverted lazy s", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223f": {
      0: null,
      1: { gl: "\u223f", nm: "sine wave", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2240": {
      0: null,
      1: { gl: "\u2240", nm: "wreath product", pr: 340, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2241": {
      0: null,
      1: { gl: "\u2241", nm: "not tilde", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2242": {
      0: null,
      1: { gl: "\u2242", nm: "minus tilde", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2242\u0338": {
      0: null,
      1: {
        gl: "\u2242\u0338",
        nm: "minus tilde with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2243": {
      0: null,
      1: {
        gl: "\u2243",
        nm: "asymptotically equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2244": {
      0: null,
      1: {
        gl: "\u2244",
        nm: "not asymptotically equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2245": {
      0: null,
      1: {
        gl: "\u2245",
        nm: "approximately equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2246": {
      0: null,
      1: {
        gl: "\u2246",
        nm: "approximately but not actually equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2247": {
      0: null,
      1: {
        gl: "\u2247",
        nm: "neither approximately nor actually equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2248": {
      0: null,
      1: { gl: "\u2248", nm: "almost equal to", pr: 247, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2249": {
      0: null,
      1: {
        gl: "\u2249",
        nm: "not almost equal to",
        pr: 250,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224a": {
      0: null,
      1: {
        gl: "\u224a",
        nm: "almost equal or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224b": {
      0: null,
      1: { gl: "\u224b", nm: "triple tilde", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u224c": {
      0: null,
      1: { gl: "\u224c", nm: "all equal to", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u224d": {
      0: null,
      1: { gl: "\u224d", nm: "equivalent to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u224e": {
      0: null,
      1: {
        gl: "\u224e",
        nm: "geometrically equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224e\u0338": {
      0: null,
      1: {
        gl: "\u224e\u0338",
        nm: "geometrically equivalent to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224f": {
      0: null,
      1: {
        gl: "\u224f",
        nm: "difference between",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224f\u0338": {
      0: null,
      1: {
        gl: "\u224f\u0338",
        nm: "difference between with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2250": {
      0: null,
      1: {
        gl: "\u2250",
        nm: "approaches the limit",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2251": {
      0: null,
      1: {
        gl: "\u2251",
        nm: "geometrically equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2252": {
      0: null,
      1: {
        gl: "\u2252",
        nm: "approximately equal to or the image of",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2253": {
      0: null,
      1: {
        gl: "\u2253",
        nm: "image of or approximately equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2254": {
      0: null,
      1: { gl: "\u2254", nm: "colon equals", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2255": {
      0: null,
      1: { gl: "\u2255", nm: "equals colon", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2256": {
      0: null,
      1: {
        gl: "\u2256",
        nm: "ring in equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2257": {
      0: null,
      1: { gl: "\u2257", nm: "ring equal to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2258": {
      0: null,
      1: { gl: "\u2258", nm: "corresponds to", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2259": {
      0: null,
      1: { gl: "\u2259", nm: "estimates", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225a": {
      0: null,
      1: { gl: "\u225a", nm: "equiangular to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225b": {
      0: null,
      1: { gl: "\u225b", nm: "star equals", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225c": {
      0: null,
      1: { gl: "\u225c", nm: "delta equal to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225d": {
      0: null,
      1: {
        gl: "\u225d",
        nm: "equal to by definition",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u225e": {
      0: null,
      1: { gl: "\u225e", nm: "measured by", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225f": {
      0: null,
      1: {
        gl: "\u225f",
        nm: "questioned equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2260": {
      0: null,
      1: { gl: "\u2260", nm: "not equal to", pr: 255, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2261": {
      0: null,
      1: { gl: "\u2261", nm: "identical to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2262": {
      0: null,
      1: {
        gl: "\u2262",
        nm: "not identical to",
        pr: 252,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2263": {
      0: null,
      1: {
        gl: "\u2263",
        nm: "strictly equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2264": {
      0: null,
      1: {
        gl: "\u2264",
        nm: "less-than or equal to",
        pr: 241,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2265": {
      0: null,
      1: {
        gl: "\u2265",
        nm: "greater-than or equal to",
        pr: 242,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2266": {
      0: null,
      1: {
        gl: "\u2266",
        nm: "less-than over equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2266\u0338": {
      0: null,
      1: {
        gl: "\u2266\u0338",
        nm: "less-than over equal to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2267": {
      0: null,
      1: {
        gl: "\u2267",
        nm: "greater-than over equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2268": {
      0: null,
      1: {
        gl: "\u2268",
        nm: "less-than but not equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2269": {
      0: null,
      1: {
        gl: "\u2269",
        nm: "greater-than but not equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226a": {
      0: null,
      1: { gl: "\u226a", nm: "much less-than", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u226a\u0338": {
      0: null,
      1: {
        gl: "\u226a\u0338",
        nm: "much less than with slash",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226b": {
      0: null,
      1: {
        gl: "\u226b",
        nm: "much greater-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226b\u0338": {
      0: null,
      1: {
        gl: "\u226b\u0338",
        nm: "much greater than with slash",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226c": {
      0: null,
      1: { gl: "\u226c", nm: "between", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u226d": {
      0: null,
      1: {
        gl: "\u226d",
        nm: "not equivalent to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226e": {
      0: null,
      1: { gl: "\u226e", nm: "not less-than", pr: 246, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u226f": {
      0: null,
      1: {
        gl: "\u226f",
        nm: "not greater-than",
        pr: 244,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2270": {
      0: null,
      1: {
        gl: "\u2270",
        nm: "neither less-than nor equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2271": {
      0: null,
      1: {
        gl: "\u2271",
        nm: "neither greater-than nor equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2272": {
      0: null,
      1: {
        gl: "\u2272",
        nm: "less-than or equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2273": {
      0: null,
      1: {
        gl: "\u2273",
        nm: "greater-than or equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2274": {
      0: null,
      1: {
        gl: "\u2274",
        nm: "neither less-than nor equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2275": {
      0: null,
      1: {
        gl: "\u2275",
        nm: "neither greater-than nor equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2276": {
      0: null,
      1: {
        gl: "\u2276",
        nm: "less-than or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2277": {
      0: null,
      1: {
        gl: "\u2277",
        nm: "greater-than or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2278": {
      0: null,
      1: {
        gl: "\u2278",
        nm: "neither less-than nor greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2279": {
      0: null,
      1: {
        gl: "\u2279",
        nm: "neither greater-than nor less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227a": {
      0: null,
      1: { gl: "\u227a", nm: "precedes", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u227b": {
      0: null,
      1: { gl: "\u227b", nm: "succeeds", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u227c": {
      0: null,
      1: {
        gl: "\u227c",
        nm: "precedes or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227d": {
      0: null,
      1: {
        gl: "\u227d",
        nm: "succeeds or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227e": {
      0: null,
      1: {
        gl: "\u227e",
        nm: "precedes or equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227f": {
      0: null,
      1: {
        gl: "\u227f",
        nm: "succeeds or equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227f\u0338": {
      0: null,
      1: {
        gl: "\u227f\u0338",
        nm: "succeeds or equivalent to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2280": {
      0: null,
      1: {
        gl: "\u2280",
        nm: "does not precede",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2281": {
      0: null,
      1: {
        gl: "\u2281",
        nm: "does not succeed",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2282": {
      0: null,
      1: { gl: "\u2282", nm: "subset of", pr: 240, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2282\u20d2": {
      0: null,
      1: {
        gl: "\u2282\u20d2",
        nm: "subset of with vertical line",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2283": {
      0: null,
      1: { gl: "\u2283", nm: "superset of", pr: 240, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2283\u20d2": {
      0: null,
      1: {
        gl: "\u2283\u20d2",
        nm: "superset of with vertical line",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2284": {
      0: null,
      1: { gl: "\u2284", nm: "not a subset of", pr: 240, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2285": {
      0: null,
      1: {
        gl: "\u2285",
        nm: "not a superset of",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2286": {
      0: null,
      1: {
        gl: "\u2286",
        nm: "subset of or equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2287": {
      0: null,
      1: {
        gl: "\u2287",
        nm: "superset of or equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2288": {
      0: null,
      1: {
        gl: "\u2288",
        nm: "neither a subset of nor equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2289": {
      0: null,
      1: {
        gl: "\u2289",
        nm: "neither a superset of nor equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u228a": {
      0: null,
      1: {
        gl: "\u228a",
        nm: "subset of with not equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u228b": {
      0: null,
      1: {
        gl: "\u228b",
        nm: "superset of with not equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u228c": {
      0: null,
      1: { gl: "\u228c", nm: "multiset", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u228d": {
      0: null,
      1: {
        gl: "\u228d",
        nm: "multiset multiplication",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u228e": {
      0: null,
      1: { gl: "\u228e", nm: "multiset union", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u228f": {
      0: null,
      1: { gl: "\u228f", nm: "square image of", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u228f\u0338": {
      0: null,
      1: {
        gl: "\u228f\u0338",
        nm: "square image of with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2290": {
      0: null,
      1: {
        gl: "\u2290",
        nm: "square original of",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2290\u0338": {
      0: null,
      1: {
        gl: "\u2290\u0338",
        nm: "square original of with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2291": {
      0: null,
      1: {
        gl: "\u2291",
        nm: "square image of or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2292": {
      0: null,
      1: {
        gl: "\u2292",
        nm: "square original of or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2293": {
      0: null,
      1: { gl: "\u2293", nm: "square cap", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2294": {
      0: null,
      1: { gl: "\u2294", nm: "square cup", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2295": {
      0: null,
      1: { gl: "\u2295", nm: "circled plus", pr: 300, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2296": {
      0: null,
      1: { gl: "\u2296", nm: "circled minus", pr: 300, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2297": {
      0: null,
      1: { gl: "\u2297", nm: "circled times", pr: 410, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2298": {
      0: null,
      1: {
        gl: "\u2298",
        nm: "circled division slash",
        pr: 300,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2299": {
      0: null,
      1: {
        gl: "\u2299",
        nm: "circled dot operator",
        pr: 710,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u229a": {
      0: null,
      1: {
        gl: "\u229a",
        nm: "circled ring operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u229b": {
      0: null,
      1: {
        gl: "\u229b",
        nm: "circled asterisk operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u229c": {
      0: null,
      1: { gl: "\u229c", nm: "circled equals", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u229d": {
      0: null,
      1: { gl: "\u229d", nm: "circled dash", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u229e": {
      0: null,
      1: { gl: "\u229e", nm: "squared plus", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u229f": {
      0: null,
      1: { gl: "\u229f", nm: "squared minus", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22a0": {
      0: null,
      1: { gl: "\u22a0", nm: "squared times", pr: 390, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22a1": {
      0: null,
      1: {
        gl: "\u22a1",
        nm: "squared dot operator",
        pr: 390,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22a2": {
      0: null,
      1: { gl: "\u22a2", nm: "right tack", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a3": {
      0: null,
      1: { gl: "\u22a3", nm: "left tack", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a4": {
      0: null,
      1: { gl: "\u22a4", nm: "down tack", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a5": {
      0: null,
      1: { gl: "\u22a5", nm: "up tack", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a6": {
      0: null,
      1: { gl: "\u22a6", nm: "assertion", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a7": {
      0: null,
      1: { gl: "\u22a7", nm: "models", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a8": {
      0: null,
      1: { gl: "\u22a8", nm: "", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a9": {
      0: null,
      1: { gl: "\u22a9", nm: "forces", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22aa": {
      0: null,
      1: {
        gl: "\u22aa",
        nm: "triple vertical bar right turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ab": {
      0: null,
      1: {
        gl: "\u22ab",
        nm: "double vertical bar double right turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ac": {
      0: null,
      1: { gl: "\u22ac", nm: "does not prove", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22ad": {
      0: null,
      1: { gl: "\u22ad", nm: "not true", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22ae": {
      0: null,
      1: { gl: "\u22ae", nm: "does not force", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22af": {
      0: null,
      1: {
        gl: "\u22af",
        nm: "negated double vertical bar double right turnstile",
        pr: 170,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b0": {
      0: null,
      1: {
        gl: "\u22b0",
        nm: "precedes under relation",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b1": {
      0: null,
      1: {
        gl: "\u22b1",
        nm: "succeeds under relation",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b2": {
      0: null,
      1: {
        gl: "\u22b2",
        nm: "normal subgroup of",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b3": {
      0: null,
      1: {
        gl: "\u22b3",
        nm: "contains as normal subgroup",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b4": {
      0: null,
      1: {
        gl: "\u22b4",
        nm: "normal subgroup of or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b5": {
      0: null,
      1: {
        gl: "\u22b5",
        nm: "contains as normal subgroup or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b6": {
      0: null,
      1: { gl: "\u22b6", nm: "original of", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22b7": {
      0: null,
      1: { gl: "\u22b7", nm: "image of", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22b8": {
      0: null,
      1: { gl: "\u22b8", nm: "multimap", pr: 270, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22b9": {
      0: null,
      1: {
        gl: "\u22b9",
        nm: "hermitian conjugate matrix",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ba": {
      0: null,
      1: { gl: "\u22ba", nm: "intercalate", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22bb": {
      0: null,
      1: { gl: "\u22bb", nm: "xor", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22bc": {
      0: null,
      1: { gl: "\u22bc", nm: "nand", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22bd": {
      0: null,
      1: { gl: "\u22bd", nm: "nor", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22be": {
      0: null,
      1: {
        gl: "\u22be",
        nm: "right angle with arc",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u22bf": {
      0: null,
      1: { gl: "\u22bf", nm: "right triangle", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u22c0": {
      0: {
        gl: "\u22c0",
        nm: "n-ary logical and",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u22c1": {
      0: {
        gl: "\u22c1",
        nm: "n-ary logical or",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u22c2": {
      0: {
        gl: "\u22c2",
        nm: "n-ary intersection",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u22c3": {
      0: {
        gl: "\u22c3",
        nm: "n-ary union",
        pr: 320,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u22c4": {
      0: null,
      1: {
        gl: "\u22c4",
        nm: "diamond operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22c5": {
      0: null,
      1: { gl: "\u22c5", nm: "dot operator", pr: 390, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22c6": {
      0: null,
      1: { gl: "\u22c6", nm: "star operator", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22c7": {
      0: null,
      1: { gl: "\u22c7", nm: "division times", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22c8": {
      0: null,
      1: { gl: "\u22c8", nm: "bowtie", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22c9": {
      0: null,
      1: {
        gl: "\u22c9",
        nm: "left normal factor semidirect product",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22ca": {
      0: null,
      1: {
        gl: "\u22ca",
        nm: "right normal factor semidirect product",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22cb": {
      0: null,
      1: {
        gl: "\u22cb",
        nm: "left semidirect product",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22cc": {
      0: null,
      1: {
        gl: "\u22cc",
        nm: "right semidirect product",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22cd": {
      0: null,
      1: {
        gl: "\u22cd",
        nm: "reversed tilde equals",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ce": {
      0: null,
      1: {
        gl: "\u22ce",
        nm: "curly logical or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22cf": {
      0: null,
      1: {
        gl: "\u22cf",
        nm: "curly logical and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22d0": {
      0: null,
      1: { gl: "\u22d0", nm: "double subset", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22d1": {
      0: null,
      1: { gl: "\u22d1", nm: "double superset", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22d2": {
      0: null,
      1: {
        gl: "\u22d2",
        nm: "double intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22d3": {
      0: null,
      1: { gl: "\u22d3", nm: "double union", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22d4": {
      0: null,
      1: { gl: "\u22d4", nm: "pitchfork", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22d5": {
      0: null,
      1: {
        gl: "\u22d5",
        nm: "equal and parallel to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22d6": {
      0: null,
      1: {
        gl: "\u22d6",
        nm: "less-than with dot",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22d7": {
      0: null,
      1: {
        gl: "\u22d7",
        nm: "greater-than with dot",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22d8": {
      0: null,
      1: {
        gl: "\u22d8",
        nm: "very much less-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22d9": {
      0: null,
      1: {
        gl: "\u22d9",
        nm: "very much greater-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22da": {
      0: null,
      1: {
        gl: "\u22da",
        nm: "less-than equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22db": {
      0: null,
      1: {
        gl: "\u22db",
        nm: "greater-than equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22dc": {
      0: null,
      1: {
        gl: "\u22dc",
        nm: "equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22dd": {
      0: null,
      1: {
        gl: "\u22dd",
        nm: "equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22de": {
      0: null,
      1: {
        gl: "\u22de",
        nm: "equal to or precedes",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22df": {
      0: null,
      1: {
        gl: "\u22df",
        nm: "equal to or succeeds",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e0": {
      0: null,
      1: {
        gl: "\u22e0",
        nm: "does not precede or equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e1": {
      0: null,
      1: {
        gl: "\u22e1",
        nm: "does not succeed or equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e2": {
      0: null,
      1: {
        gl: "\u22e2",
        nm: "not square image of or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e3": {
      0: null,
      1: {
        gl: "\u22e3",
        nm: "not square original of or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e4": {
      0: null,
      1: {
        gl: "\u22e4",
        nm: "square image of or not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e5": {
      0: null,
      1: {
        gl: "\u22e5",
        nm: "square original of or not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e6": {
      0: null,
      1: {
        gl: "\u22e6",
        nm: "less-than but not equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e7": {
      0: null,
      1: {
        gl: "\u22e7",
        nm: "greater-than but not equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e8": {
      0: null,
      1: {
        gl: "\u22e8",
        nm: "precedes but not equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e9": {
      0: null,
      1: {
        gl: "\u22e9",
        nm: "succeeds but not equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ea": {
      0: null,
      1: {
        gl: "\u22ea",
        nm: "not normal subgroup of",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22eb": {
      0: null,
      1: {
        gl: "\u22eb",
        nm: "does not contain as normal subgroup",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ec": {
      0: null,
      1: {
        gl: "\u22ec",
        nm: "not normal subgroup of or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ed": {
      0: null,
      1: {
        gl: "\u22ed",
        nm: "does not contain as normal subgroup or equal",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ee": {
      0: null,
      1: {
        gl: "\u22ee",
        nm: "vertical ellipsis",
        pr: 150,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ef": {
      0: null,
      1: {
        gl: "\u22ef",
        nm: "midline horizontal ellipsis",
        pr: 150,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u22f0": {
      0: null,
      1: {
        gl: "\u22f0",
        nm: "up right diagonal ellipsis",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f1": {
      0: null,
      1: {
        gl: "\u22f1",
        nm: "down right diagonal ellipsis",
        pr: 150,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f2": {
      0: null,
      1: {
        gl: "\u22f2",
        nm: "element of with long horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f3": {
      0: null,
      1: {
        gl: "\u22f3",
        nm: "element of with vertical bar at end of horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f4": {
      0: null,
      1: {
        gl: "\u22f4",
        nm: "small element of with vertical bar at end of horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f5": {
      0: null,
      1: {
        gl: "\u22f5",
        nm: "element of with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f6": {
      0: null,
      1: {
        gl: "\u22f6",
        nm: "element of with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f7": {
      0: null,
      1: {
        gl: "\u22f7",
        nm: "small element of with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f8": {
      0: null,
      1: {
        gl: "\u22f8",
        nm: "element of with underbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f9": {
      0: null,
      1: {
        gl: "\u22f9",
        nm: "element of with two horizontal strokes",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fa": {
      0: null,
      1: {
        gl: "\u22fa",
        nm: "contains with long horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fb": {
      0: null,
      1: {
        gl: "\u22fb",
        nm: "contains with vertical bar at end of horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fc": {
      0: null,
      1: {
        gl: "\u22fc",
        nm: "small contains with vertical bar at end of horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fd": {
      0: null,
      1: {
        gl: "\u22fd",
        nm: "contains with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fe": {
      0: null,
      1: {
        gl: "\u22fe",
        nm: "small contains with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ff": {
      0: null,
      1: {
        gl: "\u22ff",
        nm: "z notation bag membership",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2308": {
      0: {
        gl: "\u2308",
        nm: "left ceiling",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2309": {
      0: null,
      1: null,
      2: {
        gl: "\u2309",
        nm: "right ceiling",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u230a": {
      0: {
        gl: "\u230a",
        nm: "left floor",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u230b": {
      0: null,
      1: null,
      2: {
        gl: "\u230b",
        nm: "right floor",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2329": {
      0: {
        gl: "\u2329",
        nm: "left-pointing angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u232a": {
      0: null,
      1: null,
      2: {
        gl: "\u232a",
        nm: "right-pointing angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u23b4": {
      0: null,
      1: null,
      2: {
        gl: "\u23b4",
        nm: "top square bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23b5": {
      0: null,
      1: null,
      2: {
        gl: "\u23b5",
        nm: "bottom square bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23dc": {
      0: null,
      1: null,
      2: {
        gl: "\u23dc",
        nm: "top parenthesis",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23dd": {
      0: null,
      1: null,
      2: {
        gl: "\u23dd",
        nm: "bottom parenthesis",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23de": {
      0: null,
      1: null,
      2: {
        gl: "\u23de",
        nm: "top curly bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23df": {
      0: null,
      1: null,
      2: {
        gl: "\u23df",
        nm: "bottom curly bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23e0": {
      0: null,
      1: null,
      2: {
        gl: "\u23e0",
        nm: "top tortoise shell bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23e1": {
      0: null,
      1: null,
      2: {
        gl: "\u23e1",
        nm: "bottom tortoise shell bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u25a0": {
      0: null,
      1: { gl: "\u25a0", nm: "black square", pr: 260, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u25a1": {
      0: null,
      1: { gl: "\u25a1", nm: "white square", pr: 260, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u25aa": {
      0: null,
      1: {
        gl: "\u25aa",
        nm: "black small square",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25ab": {
      0: null,
      1: {
        gl: "\u25ab",
        nm: "white small square",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25ad": {
      0: null,
      1: { gl: "\u25ad", nm: "white rectangle", pr: 260, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u25ae": {
      0: null,
      1: {
        gl: "\u25ae",
        nm: "black vertical rectangle",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25af": {
      0: null,
      1: {
        gl: "\u25af",
        nm: "white vertical rectangle",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25b0": {
      0: null,
      1: {
        gl: "\u25b0",
        nm: "black parallelogram",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25b1": {
      0: null,
      1: {
        gl: "\u25b1",
        nm: "white parallelogram",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25b2": {
      0: null,
      1: {
        gl: "\u25b2",
        nm: "black up-pointing triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b3": {
      0: null,
      1: {
        gl: "\u25b3",
        nm: "white up-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b4": {
      0: null,
      1: {
        gl: "\u25b4",
        nm: "black up-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b5": {
      0: null,
      1: {
        gl: "\u25b5",
        nm: "white up-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b6": {
      0: null,
      1: {
        gl: "\u25b6",
        nm: "black right-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b7": {
      0: null,
      1: {
        gl: "\u25b7",
        nm: "white right-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b8": {
      0: null,
      1: {
        gl: "\u25b8",
        nm: "black right-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b9": {
      0: null,
      1: {
        gl: "\u25b9",
        nm: "white right-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25bc": {
      0: null,
      1: {
        gl: "\u25bc",
        nm: "black down-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25bd": {
      0: null,
      1: {
        gl: "\u25bd",
        nm: "white down-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25be": {
      0: null,
      1: {
        gl: "\u25be",
        nm: "black down-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25bf": {
      0: null,
      1: {
        gl: "\u25bf",
        nm: "white down-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c0": {
      0: null,
      1: {
        gl: "\u25c0",
        nm: "black left-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c1": {
      0: null,
      1: {
        gl: "\u25c1",
        nm: "white left-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c2": {
      0: null,
      1: {
        gl: "\u25c2",
        nm: "black left-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c3": {
      0: null,
      1: {
        gl: "\u25c3",
        nm: "white left-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c4": {
      0: null,
      1: {
        gl: "\u25c4",
        nm: "black left-pointing pointer",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c5": {
      0: null,
      1: {
        gl: "\u25c5",
        nm: "white left-pointing pointer",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c6": {
      0: null,
      1: { gl: "\u25c6", nm: "black diamond", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25c7": {
      0: null,
      1: { gl: "\u25c7", nm: "white diamond", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25c8": {
      0: null,
      1: {
        gl: "\u25c8",
        nm: "white diamond containing black small diamond",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c9": {
      0: null,
      1: { gl: "\u25c9", nm: "fisheye", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25cc": {
      0: null,
      1: { gl: "\u25cc", nm: "dotted circle", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25cd": {
      0: null,
      1: {
        gl: "\u25cd",
        nm: "circle with vertical fill",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25ce": {
      0: null,
      1: { gl: "\u25ce", nm: "bullseye", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25cf": {
      0: null,
      1: { gl: "\u25cf", nm: "black circle", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25d6": {
      0: null,
      1: {
        gl: "\u25d6",
        nm: "left half black circle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25d7": {
      0: null,
      1: {
        gl: "\u25d7",
        nm: "right half black circle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25e6": {
      0: null,
      1: { gl: "\u25e6", nm: "white bullet", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u266d": {
      0: null,
      1: null,
      2: { gl: "\u266d", nm: "music flat sign", pr: 800, ls: 0, rs: 2, pp: "" },
    },
    "\u266e": {
      0: null,
      1: null,
      2: {
        gl: "\u266e",
        nm: "music natural sign",
        pr: 800,
        ls: 0,
        rs: 2,
        pp: "",
      },
    },
    "\u266f": {
      0: null,
      1: null,
      2: {
        gl: "\u266f",
        nm: "music sharp sign",
        pr: 800,
        ls: 0,
        r$s: 2,
        pp: "",
      },
    },
    "\u2758": {
      0: null,
      1: {
        gl: "\u2758",
        nm: "light vertical bar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2772": {
      0: {
        gl: "\u2772",
        nm: "light left tortoise shell bracket ornament",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2773": {
      0: null,
      1: null,
      2: {
        gl: "\u2773",
        nm: "light right tortoise shell bracket ornament",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27c2": {
      0: null,
      1: { gl: "\u27c2", nm: "perp", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u27e6": {
      0: {
        gl: "\u27e6",
        nm: "mathematical left white square bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27e7": {
      0: null,
      1: null,
      2: {
        gl: "\u27e7",
        nm: "mathematical right white square bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27e8": {
      0: {
        gl: "\u27e8",
        nm: "mathematical left angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27e9": {
      0: null,
      1: null,
      2: {
        gl: "\u27e9",
        nm: "mathematical right angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27ea": {
      0: {
        gl: "\u27ea",
        nm: "mathematical left double angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27eb": {
      0: null,
      1: null,
      2: {
        gl: "\u27eb",
        nm: "mathematical right double angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27ec": {
      0: {
        gl: "\u27ec",
        nm: "mathematical left white tortoise shell bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27ed": {
      0: null,
      1: null,
      2: {
        gl: "\u27ed",
        nm: "mathematical right white tortoise shell bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27ee": {
      0: {
        gl: "\u27ee",
        nm: "mathematical left flattened parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27ef": {
      0: null,
      1: null,
      2: {
        gl: "\u27ef",
        nm: "mathematical right flattened parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27f0": {
      0: null,
      1: {
        gl: "\u27f0",
        nm: "upwards quadruple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u27f1": {
      0: null,
      1: {
        gl: "\u27f1",
        nm: "downwards quadruple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u27f5": {
      0: null,
      1: {
        gl: "\u27f5",
        nm: "long leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27f6": {
      0: null,
      1: {
        gl: "\u27f6",
        nm: "long rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27f7": {
      0: null,
      1: {
        gl: "\u27f7",
        nm: "long left right arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27f8": {
      0: null,
      1: {
        gl: "\u27f8",
        nm: "long leftwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27f9": {
      0: null,
      1: {
        gl: "\u27f9",
        nm: "long rightwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fa": {
      0: null,
      1: {
        gl: "\u27fa",
        nm: "long left right double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fb": {
      0: null,
      1: {
        gl: "\u27fb",
        nm: "long leftwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fc": {
      0: null,
      1: {
        gl: "\u27fc",
        nm: "long rightwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fd": {
      0: null,
      1: {
        gl: "\u27fd",
        nm: "long leftwards double arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fe": {
      0: null,
      1: {
        gl: "\u27fe",
        nm: "long rightwards double arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27ff": {
      0: null,
      1: {
        gl: "\u27ff",
        nm: "long rightwards squiggle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2900": {
      0: null,
      1: {
        gl: "\u2900",
        nm: "rightwards two-headed arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2901": {
      0: null,
      1: {
        gl: "\u2901",
        nm: "rightwards two-headed arrow with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2902": {
      0: null,
      1: {
        gl: "\u2902",
        nm: "leftwards double arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2903": {
      0: null,
      1: {
        gl: "\u2903",
        nm: "rightwards double arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2904": {
      0: null,
      1: {
        gl: "\u2904",
        nm: "left right double arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2905": {
      0: null,
      1: {
        gl: "\u2905",
        nm: "rightwards two-headed arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2906": {
      0: null,
      1: {
        gl: "\u2906",
        nm: "leftwards double arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2907": {
      0: null,
      1: {
        gl: "\u2907",
        nm: "rightwards double arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2908": {
      0: null,
      1: {
        gl: "\u2908",
        nm: "downwards arrow with horizontal stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2909": {
      0: null,
      1: {
        gl: "\u2909",
        nm: "upwards arrow with horizontal stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u290a": {
      0: null,
      1: {
        gl: "\u290a",
        nm: "upwards triple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u290b": {
      0: null,
      1: {
        gl: "\u290b",
        nm: "downwards triple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u290c": {
      0: null,
      1: {
        gl: "\u290c",
        nm: "leftwards double dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u290d": {
      0: null,
      1: {
        gl: "\u290d",
        nm: "rightwards double dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u290e": {
      0: null,
      1: {
        gl: "\u290e",
        nm: "leftwards triple dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u290f": {
      0: null,
      1: {
        gl: "\u290f",
        nm: "rightwards triple dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2910": {
      0: null,
      1: {
        gl: "\u2910",
        nm: "rightwards two-headed triple dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2911": {
      0: null,
      1: {
        gl: "\u2911",
        nm: "rightwards arrow with dotted stem",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2912": {
      0: null,
      1: {
        gl: "\u2912",
        nm: "upwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2913": {
      0: null,
      1: {
        gl: "\u2913",
        nm: "downwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2914": {
      0: null,
      1: {
        gl: "\u2914",
        nm: "rightwards arrow with tail with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2915": {
      0: null,
      1: {
        gl: "\u2915",
        nm: "rightwards arrow with tail with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2916": {
      0: null,
      1: {
        gl: "\u2916",
        nm: "rightwards two-headed arrow with tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2917": {
      0: null,
      1: {
        gl: "\u2917",
        nm: "rightwards two-headed arrow with tail with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2918": {
      0: null,
      1: {
        gl: "\u2918",
        nm: "rightwards two-headed arrow with tail with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2919": {
      0: null,
      1: {
        gl: "\u2919",
        nm: "leftwards arrow-tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291a": {
      0: null,
      1: {
        gl: "\u291a",
        nm: "rightwards arrow-tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291b": {
      0: null,
      1: {
        gl: "\u291b",
        nm: "leftwards double arrow-tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291c": {
      0: null,
      1: {
        gl: "\u291c",
        nm: "rightwards double arrow-tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291d": {
      0: null,
      1: {
        gl: "\u291d",
        nm: "leftwards arrow to black diamond",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291e": {
      0: null,
      1: {
        gl: "\u291e",
        nm: "rightwards arrow to black diamond",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291f": {
      0: null,
      1: {
        gl: "\u291f",
        nm: "leftwards arrow from bar to black diamond",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2920": {
      0: null,
      1: {
        gl: "\u2920",
        nm: "rightwards arrow from bar to black diamond",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2921": {
      0: null,
      1: {
        gl: "\u2921",
        nm: "north west and south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2922": {
      0: null,
      1: {
        gl: "\u2922",
        nm: "north east and south west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2923": {
      0: null,
      1: {
        gl: "\u2923",
        nm: "north west arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2924": {
      0: null,
      1: {
        gl: "\u2924",
        nm: "north east arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2925": {
      0: null,
      1: {
        gl: "\u2925",
        nm: "south east arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2926": {
      0: null,
      1: {
        gl: "\u2926",
        nm: "south west arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2927": {
      0: null,
      1: {
        gl: "\u2927",
        nm: "north west arrow and north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2928": {
      0: null,
      1: {
        gl: "\u2928",
        nm: "north east arrow and south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2929": {
      0: null,
      1: {
        gl: "\u2929",
        nm: "south east arrow and south west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292a": {
      0: null,
      1: {
        gl: "\u292a",
        nm: "south west arrow and north west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292b": {
      0: null,
      1: {
        gl: "\u292b",
        nm: "rising diagonal crossing falling diagonal",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292c": {
      0: null,
      1: {
        gl: "\u292c",
        nm: "falling diagonal crossing rising diagonal",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292d": {
      0: null,
      1: {
        gl: "\u292d",
        nm: "south east arrow crossing north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292e": {
      0: null,
      1: {
        gl: "\u292e",
        nm: "north east arrow crossing south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292f": {
      0: null,
      1: {
        gl: "\u292f",
        nm: "falling diagonal crossing north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2930": {
      0: null,
      1: {
        gl: "\u2930",
        nm: "rising diagonal crossing south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2931": {
      0: null,
      1: {
        gl: "\u2931",
        nm: "north east arrow crossing north west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2932": {
      0: null,
      1: {
        gl: "\u2932",
        nm: "north west arrow crossing north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2933": {
      0: null,
      1: {
        gl: "\u2933",
        nm: "wave arrow pointing directly right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2934": {
      0: null,
      1: {
        gl: "\u2934",
        nm: "arrow pointing rightwards then curving upwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2935": {
      0: null,
      1: {
        gl: "\u2935",
        nm: "arrow pointing rightwards then curving downwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2936": {
      0: null,
      1: {
        gl: "\u2936",
        nm: "arrow pointing downwards then curving leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2937": {
      0: null,
      1: {
        gl: "\u2937",
        nm: "arrow pointing downwards then curving rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2938": {
      0: null,
      1: {
        gl: "\u2938",
        nm: "right-side arc clockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2939": {
      0: null,
      1: {
        gl: "\u2939",
        nm: "left-side arc anticlockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u293a": {
      0: null,
      1: {
        gl: "\u293a",
        nm: "top arc anticlockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u293b": {
      0: null,
      1: {
        gl: "\u293b",
        nm: "bottom arc anticlockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u293c": {
      0: null,
      1: {
        gl: "\u293c",
        nm: "top arc clockwise arrow with minus",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u293d": {
      0: null,
      1: {
        gl: "\u293d",
        nm: "top arc anticlockwise arrow with plus",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u293e": {
      0: null,
      1: {
        gl: "\u293e",
        nm: "lower right semicircular clockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u293f": {
      0: null,
      1: {
        gl: "\u293f",
        nm: "lower left semicircular anticlockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2940": {
      0: null,
      1: {
        gl: "\u2940",
        nm: "anticlockwise closed circle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2941": {
      0: null,
      1: {
        gl: "\u2941",
        nm: "clockwise closed circle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2942": {
      0: null,
      1: {
        gl: "\u2942",
        nm: "rightwards arrow above short leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2943": {
      0: null,
      1: {
        gl: "\u2943",
        nm: "leftwards arrow above short rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2944": {
      0: null,
      1: {
        gl: "\u2944",
        nm: "short rightwards arrow above leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2945": {
      0: null,
      1: {
        gl: "\u2945",
        nm: "rightwards arrow with plus below",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2946": {
      0: null,
      1: {
        gl: "\u2946",
        nm: "leftwards arrow with plus below",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2947": {
      0: null,
      1: {
        gl: "\u2947",
        nm: "rightwards arrow through x",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2948": {
      0: null,
      1: {
        gl: "\u2948",
        nm: "left right arrow through small circle",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2949": {
      0: null,
      1: {
        gl: "\u2949",
        nm: "upwards two-headed arrow from small circle",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u294a": {
      0: null,
      1: {
        gl: "\u294a",
        nm: "left barb up right barb down harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u294b": {
      0: null,
      1: {
        gl: "\u294b",
        nm: "left barb down right barb up harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u294c": {
      0: null,
      1: {
        gl: "\u294c",
        nm: "up barb right down barb left harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u294d": {
      0: null,
      1: {
        gl: "\u294d",
        nm: "up barb left down barb right harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u294e": {
      0: null,
      1: {
        gl: "\u294e",
        nm: "left barb up right barb up harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u294f": {
      0: null,
      1: {
        gl: "\u294f",
        nm: "up barb right down barb right harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2950": {
      0: null,
      1: {
        gl: "\u2950",
        nm: "left barb down right barb down harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2951": {
      0: null,
      1: {
        gl: "\u2951",
        nm: "up barb left down barb left harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2952": {
      0: null,
      1: {
        gl: "\u2952",
        nm: "leftwards harpoon with barb up to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2953": {
      0: null,
      1: {
        gl: "\u2953",
        nm: "rightwards harpoon with barb up to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2954": {
      0: null,
      1: {
        gl: "\u2954",
        nm: "upwards harpoon with barb right to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2955": {
      0: null,
      1: {
        gl: "\u2955",
        nm: "downwards harpoon with barb right to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2956": {
      0: null,
      1: {
        gl: "\u2956",
        nm: "leftwards harpoon with barb down to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2957": {
      0: null,
      1: {
        gl: "\u2957",
        nm: "rightwards harpoon with barb down to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2958": {
      0: null,
      1: {
        gl: "\u2958",
        nm: "upwards harpoon with barb left to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2959": {
      0: null,
      1: {
        gl: "\u2959",
        nm: "downwards harpoon with barb left to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u295a": {
      0: null,
      1: {
        gl: "\u295a",
        nm: "leftwards harpoon with barb up from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u295b": {
      0: null,
      1: {
        gl: "\u295b",
        nm: "rightwards harpoon with barb up from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u295c": {
      0: null,
      1: {
        gl: "\u295c",
        nm: "upwards harpoon with barb right from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u295d": {
      0: null,
      1: {
        gl: "\u295d",
        nm: "downwards harpoon with barb right from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u295e": {
      0: null,
      1: {
        gl: "\u295e",
        nm: "leftwards harpoon with barb down from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u295f": {
      0: null,
      1: {
        gl: "\u295f",
        nm: "rightwards harpoon with barb down from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2960": {
      0: null,
      1: {
        gl: "\u2960",
        nm: "upwards harpoon with barb left from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2961": {
      0: null,
      1: {
        gl: "\u2961",
        nm: "downwards harpoon with barb left from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2962": {
      0: null,
      1: {
        gl: "\u2962",
        nm: "leftwards harpoon with barb up above leftwards harpoon with barb down",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2963": {
      0: null,
      1: {
        gl: "\u2963",
        nm: "upwards harpoon with barb left beside upwards harpoon with barb right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2964": {
      0: null,
      1: {
        gl: "\u2964",
        nm: "rightwards harpoon with barb up above rightwards harpoon with barb down",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2965": {
      0: null,
      1: {
        gl: "\u2965",
        nm: "downwards harpoon with barb left beside downwards harpoon with barb right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2966": {
      0: null,
      1: {
        gl: "\u2966",
        nm: "leftwards harpoon with barb up above rightwards harpoon with barb up",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2967": {
      0: null,
      1: {
        gl: "\u2967",
        nm: "leftwards harpoon with barb down above rightwards harpoon with barb down",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2968": {
      0: null,
      1: {
        gl: "\u2968",
        nm: "rightwards harpoon with barb up above leftwards harpoon with barb up",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2969": {
      0: null,
      1: {
        gl: "\u2969",
        nm: "rightwards harpoon with barb down above leftwards harpoon with barb down",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296a": {
      0: null,
      1: {
        gl: "\u296a",
        nm: "leftwards harpoon with barb up above long dash",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296b": {
      0: null,
      1: {
        gl: "\u296b",
        nm: "leftwards harpoon with barb down below long dash",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296c": {
      0: null,
      1: {
        gl: "\u296c",
        nm: "rightwards harpoon with barb up above long dash",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296d": {
      0: null,
      1: {
        gl: "\u296d",
        nm: "rightwards harpoon with barb down below long dash",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296e": {
      0: null,
      1: {
        gl: "\u296e",
        nm: "upwards harpoon with barb left beside downwards harpoon with barb right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u296f": {
      0: null,
      1: {
        gl: "\u296f",
        nm: "downwards harpoon with barb left beside upwards harpoon with barb right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2970": {
      0: null,
      1: {
        gl: "\u2970",
        nm: "right double arrow with rounded head",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2971": {
      0: null,
      1: {
        gl: "\u2971",
        nm: "equals sign above rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2972": {
      0: null,
      1: {
        gl: "\u2972",
        nm: "tilde operator above rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2973": {
      0: null,
      1: {
        gl: "\u2973",
        nm: "leftwards arrow above tilde operator",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2974": {
      0: null,
      1: {
        gl: "\u2974",
        nm: "rightwards arrow above tilde operator",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2975": {
      0: null,
      1: {
        gl: "\u2975",
        nm: "rightwards arrow above almost equal to",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2976": {
      0: null,
      1: {
        gl: "\u2976",
        nm: "less-than above leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2977": {
      0: null,
      1: {
        gl: "\u2977",
        nm: "leftwards arrow through less-than",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2978": {
      0: null,
      1: {
        gl: "\u2978",
        nm: "greater-than above rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2979": {
      0: null,
      1: {
        gl: "\u2979",
        nm: "subset above rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297a": {
      0: null,
      1: {
        gl: "\u297a",
        nm: "leftwards arrow through subset",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297b": {
      0: null,
      1: {
        gl: "\u297b",
        nm: "superset above leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297c": {
      0: null,
      1: {
        gl: "\u297c",
        nm: "left fish tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297d": {
      0: null,
      1: {
        gl: "\u297d",
        nm: "right fish tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297e": {
      0: null,
      1: { gl: "\u297e", nm: "up fish tail", pr: 270, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u297f": {
      0: null,
      1: { gl: "\u297f", nm: "down fish tail", pr: 270, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2980": {
      0: {
        gl: "\u2980",
        nm: "triple vertical bar delimiter",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy",
      },
      1: null,
      2: {
        gl: "\u2980",
        nm: "triple vertical bar delimiter",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy",
      },
    },
    "\u2981": {
      0: null,
      1: { gl: "\u2981", nm: "z notation spot", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2982": {
      0: null,
      1: {
        gl: "\u2982",
        nm: "z notation type colon",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2983": {
      0: {
        gl: "\u2983",
        nm: "left white curly bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2984": {
      0: null,
      1: null,
      2: {
        gl: "\u2984",
        nm: "right white curly bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2985": {
      0: {
        gl: "\u2985",
        nm: "left white parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2986": {
      0: null,
      1: null,
      2: {
        gl: "\u2986",
        nm: "right white parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2987": {
      0: {
        gl: "\u2987",
        nm: "z notation left image bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2988": {
      0: null,
      1: null,
      2: {
        gl: "\u2988",
        nm: "z notation right image bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2989": {
      0: {
        gl: "\u2989",
        nm: "z notation left binding bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u298a": {
      0: null,
      1: null,
      2: {
        gl: "\u298a",
        nm: "z notation right binding bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u298b": {
      0: {
        gl: "\u298b",
        nm: "left square bracket with underbar",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u298c": {
      0: null,
      1: null,
      2: {
        gl: "\u298c",
        nm: "right square bracket with underbar",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u298d": {
      0: {
        gl: "\u298d",
        nm: "left square bracket with tick in top corner",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u298e": {
      0: null,
      1: null,
      2: {
        gl: "\u298e",
        nm: "right square bracket with tick in bottom corner",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u298f": {
      0: {
        gl: "\u298f",
        nm: "left square bracket with tick in bottom corner",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2990": {
      0: null,
      1: null,
      2: {
        gl: "\u2990",
        nm: "right square bracket with tick in top corner",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2991": {
      0: {
        gl: "\u2991",
        nm: "left angle bracket with dot",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2992": {
      0: null,
      1: null,
      2: {
        gl: "\u2992",
        nm: "right angle bracket with dot",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2993": {
      0: {
        gl: "\u2993",
        nm: "left arc less-than bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2994": {
      0: null,
      1: null,
      2: {
        gl: "\u2994",
        nm: "right arc greater-than bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2995": {
      0: {
        gl: "\u2995",
        nm: "double left arc greater-than bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2996": {
      0: null,
      1: null,
      2: {
        gl: "\u2996",
        nm: "double right arc less-than bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2997": {
      0: {
        gl: "\u2997",
        nm: "left black tortoise shell bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2998": {
      0: null,
      1: null,
      2: {
        gl: "\u2998",
        nm: "right black tortoise shell bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2999": {
      0: null,
      1: { gl: "\u2999", nm: "dotted fence", pr: 270, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u299a": {
      0: null,
      1: {
        gl: "\u299a",
        nm: "vertical zigzag line",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299b": {
      0: null,
      1: {
        gl: "\u299b",
        nm: "measured angle opening left",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299c": {
      0: null,
      1: {
        gl: "\u299c",
        nm: "right angle variant with square",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299d": {
      0: null,
      1: {
        gl: "\u299d",
        nm: "measured right angle with dot",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299e": {
      0: null,
      1: {
        gl: "\u299e",
        nm: "angle with s inside",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299f": {
      0: null,
      1: { gl: "\u299f", nm: "acute angle", pr: 270, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29a0": {
      0: null,
      1: {
        gl: "\u29a0",
        nm: "spherical angle opening left",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a1": {
      0: null,
      1: {
        gl: "\u29a1",
        nm: "spherical angle opening up",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a2": {
      0: null,
      1: { gl: "\u29a2", nm: "turned angle", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29a3": {
      0: null,
      1: { gl: "\u29a3", nm: "reversed angle", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29a4": {
      0: null,
      1: {
        gl: "\u29a4",
        nm: "angle with underbar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a5": {
      0: null,
      1: {
        gl: "\u29a5",
        nm: "reversed angle with underbar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a6": {
      0: null,
      1: {
        gl: "\u29a6",
        nm: "oblique angle opening up",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a7": {
      0: null,
      1: {
        gl: "\u29a7",
        nm: "oblique angle opening down",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a8": {
      0: null,
      1: {
        gl: "\u29a8",
        nm: "measured angle with open arm ending in arrow pointing up and right",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a9": {
      0: null,
      1: {
        gl: "\u29a9",
        nm: "measured angle with open arm ending in arrow pointing up and left",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29aa": {
      0: null,
      1: {
        gl: "\u29aa",
        nm: "measured angle with open arm ending in arrow pointing down and right",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ab": {
      0: null,
      1: {
        gl: "\u29ab",
        nm: "measured angle with open arm ending in arrow pointing down and left",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ac": {
      0: null,
      1: {
        gl: "\u29ac",
        nm: "measured angle with open arm ending in arrow pointing right and up",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ad": {
      0: null,
      1: {
        gl: "\u29ad",
        nm: "measured angle with open arm ending in arrow pointing left and up",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ae": {
      0: null,
      1: {
        gl: "\u29ae",
        nm: "measured angle with open arm ending in arrow pointing right and down",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29af": {
      0: null,
      1: {
        gl: "\u29af",
        nm: "measured angle with open arm ending in arrow pointing left and down",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b0": {
      0: null,
      1: {
        gl: "\u29b0",
        nm: "reversed empty set",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b1": {
      0: null,
      1: {
        gl: "\u29b1",
        nm: "empty set with overbar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b2": {
      0: null,
      1: {
        gl: "\u29b2",
        nm: "empty set with small circle above",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b3": {
      0: null,
      1: {
        gl: "\u29b3",
        nm: "empty set with right arrow above",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b4": {
      0: null,
      1: {
        gl: "\u29b4",
        nm: "empty set with left arrow above",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b5": {
      0: null,
      1: {
        gl: "\u29b5",
        nm: "circle with horizontal bar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b6": {
      0: null,
      1: {
        gl: "\u29b6",
        nm: "circled vertical bar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29b7": {
      0: null,
      1: {
        gl: "\u29b7",
        nm: "circled parallel",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29b8": {
      0: null,
      1: {
        gl: "\u29b8",
        nm: "circled reverse solidus",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29b9": {
      0: null,
      1: {
        gl: "\u29b9",
        nm: "circled perpendicular",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29ba": {
      0: null,
      1: {
        gl: "\u29ba",
        nm: "circle divided by horizontal bar and top half divided by vertical bar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29bb": {
      0: null,
      1: {
        gl: "\u29bb",
        nm: "circle with superimposed x",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29bc": {
      0: null,
      1: {
        gl: "\u29bc",
        nm: "circled anticlockwise-rotated division sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29bd": {
      0: null,
      1: {
        gl: "\u29bd",
        nm: "up arrow through circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29be": {
      0: null,
      1: {
        gl: "\u29be",
        nm: "circled white bullet",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29bf": {
      0: null,
      1: { gl: "\u29bf", nm: "circled bullet", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29c0": {
      0: null,
      1: {
        gl: "\u29c0",
        nm: "circled less-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29c1": {
      0: null,
      1: {
        gl: "\u29c1",
        nm: "circled greater-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29c2": {
      0: null,
      1: {
        gl: "\u29c2",
        nm: "circle with small circle to the right",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29c3": {
      0: null,
      1: {
        gl: "\u29c3",
        nm: "circle with two horizontal strokes to the right",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29c4": {
      0: null,
      1: {
        gl: "\u29c4",
        nm: "squared rising diagonal slash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29c5": {
      0: null,
      1: {
        gl: "\u29c5",
        nm: "squared falling diagonal slash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29c6": {
      0: null,
      1: {
        gl: "\u29c6",
        nm: "squared asterisk",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29c7": {
      0: null,
      1: {
        gl: "\u29c7",
        nm: "squared small circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29c8": {
      0: null,
      1: { gl: "\u29c8", nm: "squared square", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29c9": {
      0: null,
      1: {
        gl: "\u29c9",
        nm: "two joined squares",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ca": {
      0: null,
      1: {
        gl: "\u29ca",
        nm: "triangle with dot above",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29cb": {
      0: null,
      1: {
        gl: "\u29cb",
        nm: "triangle with underbar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29cc": {
      0: null,
      1: { gl: "\u29cc", nm: "s in triangle", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29cd": {
      0: null,
      1: {
        gl: "\u29cd",
        nm: "triangle with serifs at bottom",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ce": {
      0: null,
      1: {
        gl: "\u29ce",
        nm: "right triangle above left triangle",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29cf": {
      0: null,
      1: {
        gl: "\u29cf",
        nm: "left triangle beside vertical bar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29cf\u0338": {
      0: null,
      1: {
        gl: "\u29cf\u0338",
        nm: "left triangle beside vertical bar with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d0": {
      0: null,
      1: {
        gl: "\u29d0",
        nm: "vertical bar beside right triangle",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d0\u0338": {
      0: null,
      1: {
        gl: "\u29d0\u0338",
        nm: "vertical bar beside right triangle with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d1": {
      0: null,
      1: {
        gl: "\u29d1",
        nm: "bowtie with left half black",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d2": {
      0: null,
      1: {
        gl: "\u29d2",
        nm: "bowtie with right half black",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d3": {
      0: null,
      1: { gl: "\u29d3", nm: "black bowtie", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u29d4": {
      0: null,
      1: {
        gl: "\u29d4",
        nm: "times with left half black",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d5": {
      0: null,
      1: {
        gl: "\u29d5",
        nm: "times with right half black",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d6": {
      0: null,
      1: { gl: "\u29d6", nm: "white hourglass", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29d7": {
      0: null,
      1: { gl: "\u29d7", nm: "black hourglass", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29d8": {
      0: null,
      1: {
        gl: "\u29d8",
        nm: "left wiggly fence",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29d9": {
      0: null,
      1: {
        gl: "\u29d9",
        nm: "right wiggly fence",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29db": {
      0: null,
      1: {
        gl: "\u29db",
        nm: "right double wiggly fence",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29dc": {
      0: null,
      1: {
        gl: "\u29dc",
        nm: "incomplete infinity",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29dd": {
      0: null,
      1: {
        gl: "\u29dd",
        nm: "tie over infinity",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29de": {
      0: null,
      1: {
        gl: "\u29de",
        nm: "infinity negated with vertical bar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29df": {
      0: null,
      1: {
        gl: "\u29df",
        nm: "double-ended multimap",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29e0": {
      0: null,
      1: {
        gl: "\u29e0",
        nm: "square with contoured outline",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29e1": {
      0: null,
      1: { gl: "\u29e1", nm: "increases as", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u29e2": {
      0: null,
      1: { gl: "\u29e2", nm: "shuffle product", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29e3": {
      0: null,
      1: {
        gl: "\u29e3",
        nm: "equals sign and slanted parallel",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29e4": {
      0: null,
      1: {
        gl: "\u29e4",
        nm: "equals sign and slanted parallel with tilde above",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29e5": {
      0: null,
      1: {
        gl: "\u29e5",
        nm: "identical to and slanted parallel",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29e6": {
      0: null,
      1: { gl: "\u29e6", nm: "gleich stark", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u29e7": {
      0: null,
      1: { gl: "\u29e7", nm: "thermodynamic", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29e8": {
      0: null,
      1: {
        gl: "\u29e8",
        nm: "down-pointing triangle with left half black",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29e9": {
      0: null,
      1: {
        gl: "\u29e9",
        nm: "down-pointing triangle with right half black",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ea": {
      0: null,
      1: {
        gl: "\u29ea",
        nm: "black diamond with down arrow",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29eb": {
      0: null,
      1: { gl: "\u29eb", nm: "black lozenge", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29ec": {
      0: null,
      1: {
        gl: "\u29ec",
        nm: "white circle with down arrow",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ed": {
      0: null,
      1: {
        gl: "\u29ed",
        nm: "black circle with down arrow",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ee": {
      0: null,
      1: {
        gl: "\u29ee",
        nm: "error-barred white square",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ef": {
      0: null,
      1: {
        gl: "\u29ef",
        nm: "error-barred black square",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f0": {
      0: null,
      1: {
        gl: "\u29f0",
        nm: "error-barred white diamond",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f1": {
      0: null,
      1: {
        gl: "\u29f1",
        nm: "error-barred black diamond",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f2": {
      0: null,
      1: {
        gl: "\u29f2",
        nm: "error-barred white circle",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f3": {
      0: null,
      1: {
        gl: "\u29f3",
        nm: "error-barred black circle",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f4": {
      0: null,
      1: { gl: "\u29f4", nm: "rule-delayed", pr: 270, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u29f5": {
      0: null,
      1: {
        gl: "\u29f5",
        nm: "reverse solidus operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29f6": {
      0: null,
      1: {
        gl: "\u29f6",
        nm: "solidus with overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29f7": {
      0: null,
      1: {
        gl: "\u29f7",
        nm: "reverse solidus with horizontal stroke",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29f8": {
      0: null,
      1: { gl: "\u29f8", nm: "big solidus", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29f9": {
      0: null,
      1: {
        gl: "\u29f9",
        nm: "big reverse solidus",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29fa": {
      0: null,
      1: { gl: "\u29fa", nm: "double plus", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29fb": {
      0: null,
      1: { gl: "\u29fb", nm: "triple plus", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29fc": {
      0: {
        gl: "\u29fc",
        nm: "left-pointing curved angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u29fd": {
      0: null,
      1: null,
      2: {
        gl: "\u29fd",
        nm: "right-pointing curved angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u29fe": {
      0: null,
      1: { gl: "\u29fe", nm: "tiny", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29ff": {
      0: null,
      1: { gl: "\u29ff", nm: "miny", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2a00": {
      0: {
        gl: "\u2a00",
        nm: "n-ary circled dot operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a01": {
      0: {
        gl: "\u2a01",
        nm: "n-ary circled plus operator",
        pr: 300,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a02": {
      0: {
        gl: "\u2a02",
        nm: "n-ary circled times operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a03": {
      0: {
        gl: "\u2a03",
        nm: "n-ary union operator with dot",
        pr: 320,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a04": {
      0: {
        gl: "\u2a04",
        nm: "n-ary union operator with plus",
        pr: 320,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a05": {
      0: {
        gl: "\u2a05",
        nm: "n-ary square intersection operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a06": {
      0: {
        gl: "\u2a06",
        nm: "n-ary square union operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a07": {
      0: {
        gl: "\u2a07",
        nm: "two logical and operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a08": {
      0: {
        gl: "\u2a08",
        nm: "two logical or operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a09": {
      0: {
        gl: "\u2a09",
        nm: "n-ary times operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0a": {
      0: {
        gl: "\u2a0a",
        nm: "modulo two sum",
        pr: 290,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0b": {
      0: {
        gl: "\u2a0b",
        nm: "summation with integral",
        pr: 290,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0c": {
      0: {
        gl: "\u2a0c",
        nm: "quadruple integral operator",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0d": {
      0: {
        gl: "\u2a0d",
        nm: "finite part integral",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0e": {
      0: {
        gl: "\u2a0e",
        nm: "integral with double stroke",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0f": {
      0: {
        gl: "\u2a0f",
        nm: "integral average with slash",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a10": {
      0: {
        gl: "\u2a10",
        nm: "circulation function",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a11": {
      0: {
        gl: "\u2a11",
        nm: "anticlockwise integration",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a12": {
      0: {
        gl: "\u2a12",
        nm: "line integration with rectangular path around pole",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a13": {
      0: {
        gl: "\u2a13",
        nm: "line integration with semicircular path around pole",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a14": {
      0: {
        gl: "\u2a14",
        nm: "line integration not including the pole",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a15": {
      0: {
        gl: "\u2a15",
        nm: "integral around a point operator",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a16": {
      0: {
        gl: "\u2a16",
        nm: "quaternion integral operator",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a17": {
      0: {
        gl: "\u2a17",
        nm: "integral with leftwards arrow with hook",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a18": {
      0: {
        gl: "\u2a18",
        nm: "integral with times sign",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a19": {
      0: {
        gl: "\u2a19",
        nm: "integral with intersection",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a1a": {
      0: {
        gl: "\u2a1a",
        nm: "integral with union",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a1b": {
      0: {
        gl: "\u2a1b",
        nm: "integral with overbar",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a1c": {
      0: {
        gl: "\u2a1c",
        nm: "integral with underbar",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a1d": {
      0: null,
      1: { gl: "\u2a1d", nm: "join", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2a1e": {
      0: null,
      1: {
        gl: "\u2a1e",
        nm: "large left triangle operator",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2a1f": {
      0: null,
      1: {
        gl: "\u2a1f",
        nm: "z notation schema composition",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2a20": {
      0: null,
      1: {
        gl: "\u2a20",
        nm: "z notation schema piping",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2a21": {
      0: null,
      1: {
        gl: "\u2a21",
        nm: "z notation schema projection",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2a22": {
      0: null,
      1: {
        gl: "\u2a22",
        nm: "plus sign with small circle above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a23": {
      0: null,
      1: {
        gl: "\u2a23",
        nm: "plus sign with circumflex accent above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a24": {
      0: null,
      1: {
        gl: "\u2a24",
        nm: "plus sign with tilde above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a25": {
      0: null,
      1: {
        gl: "\u2a25",
        nm: "plus sign with dot below",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a26": {
      0: null,
      1: {
        gl: "\u2a26",
        nm: "plus sign with tilde below",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a27": {
      0: null,
      1: {
        gl: "\u2a27",
        nm: "plus sign with subscript two",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a28": {
      0: null,
      1: {
        gl: "\u2a28",
        nm: "plus sign with black triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a29": {
      0: null,
      1: {
        gl: "\u2a29",
        nm: "minus sign with comma above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2a": {
      0: null,
      1: {
        gl: "\u2a2a",
        nm: "minus sign with dot below",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2b": {
      0: null,
      1: {
        gl: "\u2a2b",
        nm: "minus sign with falling dots",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2c": {
      0: null,
      1: {
        gl: "\u2a2c",
        nm: "minus sign with rising dots",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2d": {
      0: null,
      1: {
        gl: "\u2a2d",
        nm: "plus sign in left half circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2e": {
      0: null,
      1: {
        gl: "\u2a2e",
        nm: "plus sign in right half circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2f": {
      0: null,
      1: {
        gl: "\u2a2f",
        nm: "vector or cross product",
        pr: 390,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a30": {
      0: null,
      1: {
        gl: "\u2a30",
        nm: "multiplication sign with dot above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a31": {
      0: null,
      1: {
        gl: "\u2a31",
        nm: "multiplication sign with underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a32": {
      0: null,
      1: {
        gl: "\u2a32",
        nm: "semidirect product with bottom closed",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a33": {
      0: null,
      1: { gl: "\u2a33", nm: "smash product", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2a34": {
      0: null,
      1: {
        gl: "\u2a34",
        nm: "multiplication sign in left half circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a35": {
      0: null,
      1: {
        gl: "\u2a35",
        nm: "multiplication sign in right half circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a36": {
      0: null,
      1: {
        gl: "\u2a36",
        nm: "circled multiplication sign with circumflex accent",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a37": {
      0: null,
      1: {
        gl: "\u2a37",
        nm: "multiplication sign in double circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a38": {
      0: null,
      1: {
        gl: "\u2a38",
        nm: "circled division sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a39": {
      0: null,
      1: {
        gl: "\u2a39",
        nm: "plus sign in triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3a": {
      0: null,
      1: {
        gl: "\u2a3a",
        nm: "minus sign in triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3b": {
      0: null,
      1: {
        gl: "\u2a3b",
        nm: "multiplication sign in triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3c": {
      0: null,
      1: {
        gl: "\u2a3c",
        nm: "interior product",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3d": {
      0: null,
      1: {
        gl: "\u2a3d",
        nm: "righthand interior product",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3e": {
      0: null,
      1: {
        gl: "\u2a3e",
        nm: "z notation relational composition",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3f": {
      0: null,
      1: {
        gl: "\u2a3f",
        nm: "amalgamation or coproduct",
        pr: 390,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a40": {
      0: null,
      1: {
        gl: "\u2a40",
        nm: "intersection with dot",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a41": {
      0: null,
      1: {
        gl: "\u2a41",
        nm: "union with minus sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a42": {
      0: null,
      1: {
        gl: "\u2a42",
        nm: "union with overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a43": {
      0: null,
      1: {
        gl: "\u2a43",
        nm: "intersection with overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a44": {
      0: null,
      1: {
        gl: "\u2a44",
        nm: "intersection with logical and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a45": {
      0: null,
      1: {
        gl: "\u2a45",
        nm: "union with logical or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a46": {
      0: null,
      1: {
        gl: "\u2a46",
        nm: "union above intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a47": {
      0: null,
      1: {
        gl: "\u2a47",
        nm: "intersection above union",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a48": {
      0: null,
      1: {
        gl: "\u2a48",
        nm: "union above bar above intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a49": {
      0: null,
      1: {
        gl: "\u2a49",
        nm: "intersection above bar above union",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4a": {
      0: null,
      1: {
        gl: "\u2a4a",
        nm: "union beside and joined with union",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4b": {
      0: null,
      1: {
        gl: "\u2a4b",
        nm: "intersection beside and joined with intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4c": {
      0: null,
      1: {
        gl: "\u2a4c",
        nm: "closed union with serifs",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4d": {
      0: null,
      1: {
        gl: "\u2a4d",
        nm: "closed intersection with serifs",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4e": {
      0: null,
      1: {
        gl: "\u2a4e",
        nm: "double square intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4f": {
      0: null,
      1: {
        gl: "\u2a4f",
        nm: "double square union",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a50": {
      0: null,
      1: {
        gl: "\u2a50",
        nm: "closed union with serifs and smash product",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a51": {
      0: null,
      1: {
        gl: "\u2a51",
        nm: "logical and with dot above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a52": {
      0: null,
      1: {
        gl: "\u2a52",
        nm: "logical or with dot above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a53": {
      0: null,
      1: {
        gl: "\u2a53",
        nm: "double logical and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a54": {
      0: null,
      1: {
        gl: "\u2a54",
        nm: "double logical or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a55": {
      0: null,
      1: {
        gl: "\u2a55",
        nm: "two intersecting logical and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a56": {
      0: null,
      1: {
        gl: "\u2a56",
        nm: "two intersecting logical or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a57": {
      0: null,
      1: {
        gl: "\u2a57",
        nm: "sloping large or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a58": {
      0: null,
      1: {
        gl: "\u2a58",
        nm: "sloping large and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a59": {
      0: null,
      1: {
        gl: "\u2a59",
        nm: "logical or overlapping logical and",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a5a": {
      0: null,
      1: {
        gl: "\u2a5a",
        nm: "logical and with middle stem",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5b": {
      0: null,
      1: {
        gl: "\u2a5b",
        nm: "logical or with middle stem",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5c": {
      0: null,
      1: {
        gl: "\u2a5c",
        nm: "logical and with horizontal dash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5d": {
      0: null,
      1: {
        gl: "\u2a5d",
        nm: "logical or with horizontal dash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5e": {
      0: null,
      1: {
        gl: "\u2a5e",
        nm: "logical and with double overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5f": {
      0: null,
      1: {
        gl: "\u2a5f",
        nm: "logical and with underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a60": {
      0: null,
      1: {
        gl: "\u2a60",
        nm: "logical and with double underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a61": {
      0: null,
      1: {
        gl: "\u2a61",
        nm: "small vee with underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a62": {
      0: null,
      1: {
        gl: "\u2a62",
        nm: "logical or with double overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a63": {
      0: null,
      1: {
        gl: "\u2a63",
        nm: "logical or with double underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a64": {
      0: null,
      1: {
        gl: "\u2a64",
        nm: "z notation domain antirestriction",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a65": {
      0: null,
      1: {
        gl: "\u2a65",
        nm: "z notation range antirestriction",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a66": {
      0: null,
      1: {
        gl: "\u2a66",
        nm: "equals sign with dot below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a67": {
      0: null,
      1: {
        gl: "\u2a67",
        nm: "identical with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a68": {
      0: null,
      1: {
        gl: "\u2a68",
        nm: "triple horizontal bar with double vertical stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a69": {
      0: null,
      1: {
        gl: "\u2a69",
        nm: "triple horizontal bar with triple vertical stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6a": {
      0: null,
      1: {
        gl: "\u2a6a",
        nm: "tilde operator with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6b": {
      0: null,
      1: {
        gl: "\u2a6b",
        nm: "tilde operator with rising dots",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6c": {
      0: null,
      1: {
        gl: "\u2a6c",
        nm: "similar minus similar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6d": {
      0: null,
      1: {
        gl: "\u2a6d",
        nm: "congruent with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6e": {
      0: null,
      1: {
        gl: "\u2a6e",
        nm: "equals with asterisk",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6f": {
      0: null,
      1: {
        gl: "\u2a6f",
        nm: "almost equal to with circumflex accent",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a70": {
      0: null,
      1: {
        gl: "\u2a70",
        nm: "approximately equal or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a71": {
      0: null,
      1: {
        gl: "\u2a71",
        nm: "equals sign above plus sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a72": {
      0: null,
      1: {
        gl: "\u2a72",
        nm: "plus sign above equals sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a73": {
      0: null,
      1: {
        gl: "\u2a73",
        nm: "equals sign above tilde operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a74": {
      0: null,
      1: {
        gl: "\u2a74",
        nm: "double colon equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a75": {
      0: null,
      1: {
        gl: "\u2a75",
        nm: "two consecutive equals signs",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a76": {
      0: null,
      1: {
        gl: "\u2a76",
        nm: "three consecutive equals signs",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a77": {
      0: null,
      1: {
        gl: "\u2a77",
        nm: "equals sign with two dots above and two dots below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a78": {
      0: null,
      1: {
        gl: "\u2a78",
        nm: "equivalent with four dots above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a79": {
      0: null,
      1: {
        gl: "\u2a79",
        nm: "less-than with circle inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7a": {
      0: null,
      1: {
        gl: "\u2a7a",
        nm: "greater-than with circle inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7b": {
      0: null,
      1: {
        gl: "\u2a7b",
        nm: "less-than with question mark above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7c": {
      0: null,
      1: {
        gl: "\u2a7c",
        nm: "greater-than with question mark above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7d": {
      0: null,
      1: {
        gl: "\u2a7d",
        nm: "less-than or slanted equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7d\u0338": {
      0: null,
      1: {
        gl: "\u2a7d\u0338",
        nm: "less-than or slanted equal to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7e": {
      0: null,
      1: {
        gl: "\u2a7e",
        nm: "greater-than or slanted equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7e\u0338": {
      0: null,
      1: {
        gl: "\u2a7e\u0338",
        nm: "greater-than or slanted equal to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7f": {
      0: null,
      1: {
        gl: "\u2a7f",
        nm: "less-than or slanted equal to with dot inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a80": {
      0: null,
      1: {
        gl: "\u2a80",
        nm: "greater-than or slanted equal to with dot inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a81": {
      0: null,
      1: {
        gl: "\u2a81",
        nm: "less-than or slanted equal to with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a82": {
      0: null,
      1: {
        gl: "\u2a82",
        nm: "greater-than or slanted equal to with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a83": {
      0: null,
      1: {
        gl: "\u2a83",
        nm: "less-than or slanted equal to with dot above right",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a84": {
      0: null,
      1: {
        gl: "\u2a84",
        nm: "greater-than or slanted equal to with dot above left",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a85": {
      0: null,
      1: {
        gl: "\u2a85",
        nm: "less-than or approximate",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a86": {
      0: null,
      1: {
        gl: "\u2a86",
        nm: "greater-than or approximate",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a87": {
      0: null,
      1: {
        gl: "\u2a87",
        nm: "less-than and single-line not equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a88": {
      0: null,
      1: {
        gl: "\u2a88",
        nm: "greater-than and single-line not equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a89": {
      0: null,
      1: {
        gl: "\u2a89",
        nm: "less-than and not approximate",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8a": {
      0: null,
      1: {
        gl: "\u2a8a",
        nm: "greater-than and not approximate",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8b": {
      0: null,
      1: {
        gl: "\u2a8b",
        nm: "less-than above double-line equal above greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8c": {
      0: null,
      1: {
        gl: "\u2a8c",
        nm: "greater-than above double-line equal above less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8d": {
      0: null,
      1: {
        gl: "\u2a8d",
        nm: "less-than above similar or equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8e": {
      0: null,
      1: {
        gl: "\u2a8e",
        nm: "greater-than above similar or equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8f": {
      0: null,
      1: {
        gl: "\u2a8f",
        nm: "less-than above similar above greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a90": {
      0: null,
      1: {
        gl: "\u2a90",
        nm: "greater-than above similar above less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a91": {
      0: null,
      1: {
        gl: "\u2a91",
        nm: "less-than above greater-than above double-line equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a92": {
      0: null,
      1: {
        gl: "\u2a92",
        nm: "greater-than above less-than above double-line equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a93": {
      0: null,
      1: {
        gl: "\u2a93",
        nm: "less-than above slanted equal above greater-than above slanted equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a94": {
      0: null,
      1: {
        gl: "\u2a94",
        nm: "greater-than above slanted equal above less-than above slanted equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a95": {
      0: null,
      1: {
        gl: "\u2a95",
        nm: "slanted equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a96": {
      0: null,
      1: {
        gl: "\u2a96",
        nm: "slanted equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a97": {
      0: null,
      1: {
        gl: "\u2a97",
        nm: "slanted equal to or less-than with dot inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a98": {
      0: null,
      1: {
        gl: "\u2a98",
        nm: "slanted equal to or greater-than with dot inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a99": {
      0: null,
      1: {
        gl: "\u2a99",
        nm: "double-line equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9a": {
      0: null,
      1: {
        gl: "\u2a9a",
        nm: "double-line equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9b": {
      0: null,
      1: {
        gl: "\u2a9b",
        nm: "double-line slanted equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9c": {
      0: null,
      1: {
        gl: "\u2a9c",
        nm: "double-line slanted equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9d": {
      0: null,
      1: {
        gl: "\u2a9d",
        nm: "similar or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9e": {
      0: null,
      1: {
        gl: "\u2a9e",
        nm: "similar or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9f": {
      0: null,
      1: {
        gl: "\u2a9f",
        nm: "similar above less-than above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa0": {
      0: null,
      1: {
        gl: "\u2aa0",
        nm: "similar above greater-than above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa1": {
      0: null,
      1: {
        gl: "\u2aa1",
        nm: "double nested less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa1\u0338": {
      0: null,
      1: {
        gl: "\u2aa1\u0338",
        nm: "double nested less-than with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa2": {
      0: null,
      1: {
        gl: "\u2aa2",
        nm: "double nested greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa2\u0338": {
      0: null,
      1: {
        gl: "\u2aa2\u0338",
        nm: "double nested greater-than with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa3": {
      0: null,
      1: {
        gl: "\u2aa3",
        nm: "double nested less-than with underbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa4": {
      0: null,
      1: {
        gl: "\u2aa4",
        nm: "greater-than overlapping less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa5": {
      0: null,
      1: {
        gl: "\u2aa5",
        nm: "greater-than beside less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa6": {
      0: null,
      1: {
        gl: "\u2aa6",
        nm: "less-than closed by curve",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa7": {
      0: null,
      1: {
        gl: "\u2aa7",
        nm: "greater-than closed by curve",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa8": {
      0: null,
      1: {
        gl: "\u2aa8",
        nm: "less-than closed by curve above slanted equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa9": {
      0: null,
      1: {
        gl: "\u2aa9",
        nm: "greater-than closed by curve above slanted equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aaa": {
      0: null,
      1: { gl: "\u2aaa", nm: "smaller than", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2aab": {
      0: null,
      1: { gl: "\u2aab", nm: "larger than", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2aac": {
      0: null,
      1: {
        gl: "\u2aac",
        nm: "smaller than or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aad": {
      0: null,
      1: {
        gl: "\u2aad",
        nm: "larger than or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aae": {
      0: null,
      1: {
        gl: "\u2aae",
        nm: "equals sign with bumpy above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aaf": {
      0: null,
      1: {
        gl: "\u2aaf",
        nm: "precedes above single-line equals sign",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aaf\u0338": {
      0: null,
      1: {
        gl: "\u2aaf\u0338",
        nm: "precedes above single-line equals sign with slash",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab0": {
      0: null,
      1: {
        gl: "\u2ab0",
        nm: "succeeds above single-line equals sign",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab0\u0338": {
      0: null,
      1: {
        gl: "\u2ab0\u0338",
        nm: "succeeds above single-line equals sign with slash",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab1": {
      0: null,
      1: {
        gl: "\u2ab1",
        nm: "precedes above single-line not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab2": {
      0: null,
      1: {
        gl: "\u2ab2",
        nm: "succeeds above single-line not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab3": {
      0: null,
      1: {
        gl: "\u2ab3",
        nm: "precedes above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab4": {
      0: null,
      1: {
        gl: "\u2ab4",
        nm: "succeeds above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab5": {
      0: null,
      1: {
        gl: "\u2ab5",
        nm: "precedes above not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab6": {
      0: null,
      1: {
        gl: "\u2ab6",
        nm: "succeeds above not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab7": {
      0: null,
      1: {
        gl: "\u2ab7",
        nm: "precedes above almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab8": {
      0: null,
      1: {
        gl: "\u2ab8",
        nm: "succeeds above almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab9": {
      0: null,
      1: {
        gl: "\u2ab9",
        nm: "precedes above not almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aba": {
      0: null,
      1: {
        gl: "\u2aba",
        nm: "succeeds above not almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2abb": {
      0: null,
      1: { gl: "\u2abb", nm: "double precedes", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2abc": {
      0: null,
      1: { gl: "\u2abc", nm: "double succeeds", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2abd": {
      0: null,
      1: { gl: "\u2abd", nm: "subset with dot", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2abe": {
      0: null,
      1: {
        gl: "\u2abe",
        nm: "superset with dot",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2abf": {
      0: null,
      1: {
        gl: "\u2abf",
        nm: "subset with plus sign below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac0": {
      0: null,
      1: {
        gl: "\u2ac0",
        nm: "superset with plus sign below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac1": {
      0: null,
      1: {
        gl: "\u2ac1",
        nm: "subset with multiplication sign below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac2": {
      0: null,
      1: {
        gl: "\u2ac2",
        nm: "superset with multiplication sign below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac3": {
      0: null,
      1: {
        gl: "\u2ac3",
        nm: "subset of or equal to with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac4": {
      0: null,
      1: {
        gl: "\u2ac4",
        nm: "superset of or equal to with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac5": {
      0: null,
      1: {
        gl: "\u2ac5",
        nm: "subset of above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac6": {
      0: null,
      1: {
        gl: "\u2ac6",
        nm: "superset of above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac7": {
      0: null,
      1: {
        gl: "\u2ac7",
        nm: "subset of above tilde operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac8": {
      0: null,
      1: {
        gl: "\u2ac8",
        nm: "superset of above tilde operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac9": {
      0: null,
      1: {
        gl: "\u2ac9",
        nm: "subset of above almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aca": {
      0: null,
      1: {
        gl: "\u2aca",
        nm: "superset of above almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2acb": {
      0: null,
      1: {
        gl: "\u2acb",
        nm: "subset of above not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2acc": {
      0: null,
      1: {
        gl: "\u2acc",
        nm: "superset of above not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2acd": {
      0: null,
      1: {
        gl: "\u2acd",
        nm: "square left open box operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ace": {
      0: null,
      1: {
        gl: "\u2ace",
        nm: "square right open box operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2acf": {
      0: null,
      1: { gl: "\u2acf", nm: "closed subset", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2ad0": {
      0: null,
      1: { gl: "\u2ad0", nm: "closed superset", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2ad1": {
      0: null,
      1: {
        gl: "\u2ad1",
        nm: "closed subset or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad2": {
      0: null,
      1: {
        gl: "\u2ad2",
        nm: "closed superset or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad3": {
      0: null,
      1: {
        gl: "\u2ad3",
        nm: "subset above superset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad4": {
      0: null,
      1: {
        gl: "\u2ad4",
        nm: "superset above subset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad5": {
      0: null,
      1: {
        gl: "\u2ad5",
        nm: "subset above subset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad6": {
      0: null,
      1: {
        gl: "\u2ad6",
        nm: "superset above superset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad7": {
      0: null,
      1: {
        gl: "\u2ad7",
        nm: "superset beside subset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad8": {
      0: null,
      1: {
        gl: "\u2ad8",
        nm: "superset beside and joined by dash with subset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad9": {
      0: null,
      1: {
        gl: "\u2ad9",
        nm: "element of opening downwards",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ada": {
      0: null,
      1: {
        gl: "\u2ada",
        nm: "pitchfork with tee top",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2adb": {
      0: null,
      1: {
        gl: "\u2adb",
        nm: "transversal intersection",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2add": {
      0: null,
      1: { gl: "\u2add", nm: "nonforking", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2add\u0338": {
      0: null,
      1: {
        gl: "\u2add\u0338",
        nm: "nonforking with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ade": {
      0: null,
      1: { gl: "\u2ade", nm: "short left tack", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2adf": {
      0: null,
      1: { gl: "\u2adf", nm: "short down tack", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2ae0": {
      0: null,
      1: { gl: "\u2ae0", nm: "short up tack", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2ae1": {
      0: null,
      1: {
        gl: "\u2ae1",
        nm: "perpendicular with s",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae2": {
      0: null,
      1: {
        gl: "\u2ae2",
        nm: "vertical bar triple right turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae3": {
      0: null,
      1: {
        gl: "\u2ae3",
        nm: "double vertical bar left turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae4": {
      0: null,
      1: {
        gl: "\u2ae4",
        nm: "vertical bar double left turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae5": {
      0: null,
      1: {
        gl: "\u2ae5",
        nm: "double vertical bar double left turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae6": {
      0: null,
      1: {
        gl: "\u2ae6",
        nm: "long dash from left member of double vertical",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae7": {
      0: null,
      1: {
        gl: "\u2ae7",
        nm: "short down tack with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae8": {
      0: null,
      1: {
        gl: "\u2ae8",
        nm: "short up tack with underbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae9": {
      0: null,
      1: {
        gl: "\u2ae9",
        nm: "short up tack above short down tack",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aea": {
      0: null,
      1: {
        gl: "\u2aea",
        nm: "double down tack",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aeb": {
      0: null,
      1: { gl: "\u2aeb", nm: "double up tack", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2aec": {
      0: null,
      1: {
        gl: "\u2aec",
        nm: "double stroke not sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aed": {
      0: null,
      1: {
        gl: "\u2aed",
        nm: "reversed double stroke not sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aee": {
      0: null,
      1: {
        gl: "\u2aee",
        nm: "does not divide with reversed negation slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aef": {
      0: null,
      1: {
        gl: "\u2aef",
        nm: "vertical line with circle above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af0": {
      0: null,
      1: {
        gl: "\u2af0",
        nm: "vertical line with circle below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af1": {
      0: null,
      1: {
        gl: "\u2af1",
        nm: "down tack with circle below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af2": {
      0: null,
      1: {
        gl: "\u2af2",
        nm: "parallel with horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af3": {
      0: null,
      1: {
        gl: "\u2af3",
        nm: "parallel with tilde operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af4": {
      0: null,
      1: {
        gl: "\u2af4",
        nm: "triple vertical bar binary relation",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2af5": {
      0: null,
      1: {
        gl: "\u2af5",
        nm: "triple vertical bar with horizontal stroke",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2af6": {
      0: null,
      1: {
        gl: "\u2af6",
        nm: "triple colon operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2af7": {
      0: null,
      1: {
        gl: "\u2af7",
        nm: "triple nested less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af8": {
      0: null,
      1: {
        gl: "\u2af8",
        nm: "triple nested greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af9": {
      0: null,
      1: {
        gl: "\u2af9",
        nm: "double-line slanted less-than or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2afa": {
      0: null,
      1: {
        gl: "\u2afa",
        nm: "double-line slanted greater-than or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2afb": {
      0: null,
      1: {
        gl: "\u2afb",
        nm: "triple solidus binary relation",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2afc": {
      0: {
        gl: "\u2afc",
        nm: "large triple vertical bar operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2afd": {
      0: null,
      1: {
        gl: "\u2afd",
        nm: "double solidus operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2afe": {
      0: null,
      1: {
        gl: "\u2afe",
        nm: "white vertical bar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2aff": {
      0: {
        gl: "\u2aff",
        nm: "n-ary white vertical bar",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2b45": {
      0: null,
      1: {
        gl: "\u2b45",
        nm: "leftwards quadruple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2b46": {
      0: null,
      1: {
        gl: "\u2b46",
        nm: "rightwards quadruple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u02c6": {
      0: null,
      1: null,
      2: {
        gl: "\u02c6",
        nm: "modifier letter circumflex accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02c7": {
      0: null,
      1: null,
      2: {
        gl: "\u02c7",
        nm: "caron",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02c9": {
      0: null,
      1: null,
      2: {
        gl: "\u02c9",
        nm: "modifier letter macron",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02ca": {
      0: null,
      1: null,
      2: {
        gl: "\u02ca",
        nm: "modifier letter acute accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u02cb": {
      0: null,
      1: null,
      2: {
        gl: "\u02cb",
        nm: "modifier letter grave accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u02cd": {
      0: null,
      1: null,
      2: {
        gl: "\u02cd",
        nm: "modifier letter low macron",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02d8": {
      0: null,
      1: null,
      2: { gl: "\u02d8", nm: "breve", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "\u02d9": {
      0: null,
      1: null,
      2: { gl: "\u02d9", nm: "dot above", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "\u02da": {
      0: null,
      1: null,
      2: {
        gl: "\u02da",
        nm: "ring above",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u02dc": {
      0: null,
      1: null,
      2: {
        gl: "&#x2DC;",
        nm: "\u02dcsmall tilde",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02dd": {
      0: null,
      1: null,
      2: {
        gl: "\u02dd",
        nm: "double acute accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u02f7": {
      0: null,
      1: null,
      2: {
        gl: "\u02f7",
        nm: "modifier letter low tilde",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u0302": {
      0: null,
      1: null,
      2: {
        gl: "\u0302",
        nm: "combining circumflex accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u0311": {
      0: null,
      1: null,
      2: {
        gl: "\u0311",
        nm: "combining inverted breve",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u03f6": {
      0: null,
      1: {
        gl: "\u03f6",
        nm: "greek reversed lunate epsilon symbol",
        pr: 110,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u00a8": {
      0: null,
      1: null,
      2: { gl: "\u00a8", nm: "diaeresis", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "\u00aa": {
      0: null,
      1: null,
      2: {
        gl: "\u00aa",
        nm: "feminine ordinal indicator",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00ac": {
      0: { gl: "\u00ac", nm: "not sign", pr: 680, ls: 2, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u00af": {
      0: null,
      1: null,
      2: {
        gl: "\u00af",
        nm: "macron",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u00b0": {
      0: null,
      1: null,
      2: { gl: "\u00b0", nm: "degree sign", pr: 880, ls: 0, rs: 0, pp: "" },
    },
    "\u00b1": {
      0: { gl: "\u00b1", nm: "plus-minus sign", pr: 275, ls: 0, rs: 1, pp: "" },
      1: { gl: "\u00b1", nm: "plus-minus sign", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u00b2": {
      0: null,
      1: null,
      2: {
        gl: "\u00b2",
        nm: "superscript two",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00b3": {
      0: null,
      1: null,
      2: {
        gl: "\u00b3",
        nm: "superscript three",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00b4": {
      0: null,
      1: null,
      2: {
        gl: "\u00b4",
        nm: "acute accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00b7": {
      0: null,
      1: { gl: "\u00b7", nm: "middle dot", pr: 400, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u00b8": {
      0: null,
      1: null,
      2: { gl: "\u00b8", nm: "cedilla", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "\u00b9": {
      0: null,
      1: null,
      2: {
        gl: "\u00b9",
        nm: "superscript one",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00ba": {
      0: null,
      1: null,
      2: {
        gl: "\u00ba",
        nm: "masculine ordinal indicator",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00d7": {
      0: null,
      1: {
        gl: "\u00d7",
        nm: "multiplication sign",
        pr: 390,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u00f7": {
      0: null,
      1: { gl: "\u00f7", nm: "division sign", pr: 660, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "&amp": {
      0: null,
      1: null,
      2: { gl: "&", nm: "ampersand", pr: 880, ls: 0, rs: 0, pp: "" },
    },
    "&amp&amp": {
      0: null,
      1: {
        gl: "&&",
        nm: "multiple character operator: &&",
        pr: 200,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "<": {
      0: null,
      1: { gl: "<", nm: "less-than sign", pr: 245, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "&lt=": {
      0: null,
      1: {
        gl: "<=",
        nm: "multiple character operator: <=",
        pr: 241,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "&lt>": {
      0: null,
      1: {
        gl: "<>",
        nm: "multiple character operator: <>",
        pr: 780,
        ls: 1,
        rs: 1,
        pp: "",
      },
      2: null,
    },
    "(": {
      0: {
        gl: "(",
        nm: "left parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    ")": {
      0: null,
      1: null,
      2: {
        gl: ")",
        nm: "right parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "*": {
      0: null,
      1: { gl: "*", nm: "asterisk", pr: 390, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "**": {
      0: null,
      1: {
        gl: "**",
        nm: "multiple character operator: **",
        pr: 780,
        ls: 1,
        rs: 1,
        pp: "",
      },
      2: null,
    },
    "*=": {
      0: null,
      1: {
        gl: "*=",
        nm: "multiple character operator: *=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    ",": {
      0: null,
      1: {
        gl: ",",
        nm: "comma",
        pr: 40,
        ls: 0,
        rs: 3,
        pp: "separator, linebreakstyle=after",
      },
      2: null,
    },
    ".": {
      0: null,
      1: { gl: ".", nm: "full stop", pr: 390, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "..": {
      0: null,
      1: null,
      2: {
        gl: "..",
        nm: "multiple character operator: ..",
        pr: 100,
        ls: 0,
        rs: 0,
        pp: "",
      },
    },
    "...": {
      0: null,
      1: null,
      2: {
        gl: "...",
        nm: "multiple character operator: ...",
        pr: 100,
        ls: 0,
        rs: 0,
        pp: "",
      },
    },
    "/": {
      0: null,
      1: { gl: "/", nm: "solidus", pr: 660, ls: 1, rs: 1, pp: "" },
      2: null,
    },
    "//": {
      0: null,
      1: {
        gl: "//",
        nm: "multiple character operator: //",
        pr: 820,
        ls: 1,
        rs: 1,
        pp: "",
      },
      2: null,
    },
    "/=": {
      0: null,
      1: {
        gl: "/=",
        nm: "multiple character operator: /=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    ":": {
      0: null,
      1: { gl: ":", nm: "colon", pr: 100, ls: 1, rs: 2, pp: "" },
      2: null,
    },
    ":=": {
      0: null,
      1: {
        gl: ":=",
        nm: "multiple character operator: :=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "": {
      0: null,
      1: {
        gl: ";",
        nm: "semicolon",
        pr: 30,
        ls: 0,
        rs: 3,
        pp: "separator, linebreakstyle=after",
      },
      2: null,
    },
    "?": {
      0: null,
      1: { gl: "?", nm: "question mark", pr: 835, ls: 1, rs: 1, pp: "" },
      2: null,
    },
    "@": {
      0: null,
      1: { gl: "@", nm: "commercial at", pr: 825, ls: 1, rs: 1, pp: "" },
      2: null,
    },
    "[": {
      0: {
        gl: "[",
        nm: "left square bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\\": {
      0: null,
      1: { gl: "\\", nm: "reverse solidus", pr: 650, ls: 0, rs: 0, pp: "" },
      2: null,
    },
    "]": {
      0: null,
      1: null,
      2: {
        gl: "]",
        nm: "right square bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "^": {
      0: null,
      1: { gl: "^", nm: "circumflex accent", pr: 780, ls: 1, rs: 1, pp: "" },
      2: {
        gl: "^",
        nm: "circumflex accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    _: {
      0: null,
      1: { gl: "_", nm: "low line", pr: 900, ls: 1, rs: 1, pp: "" },
      2: {
        gl: "_",
        nm: "low line",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "`": {
      0: null,
      1: null,
      2: { gl: "`", nm: "grave accent", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "{": {
      0: {
        gl: "{",
        nm: "left curly bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "|": {
      0: {
        gl: "|",
        nm: "vertical line",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: {
        gl: "|",
        nm: "vertical line",
        pr: 270,
        ls: 2,
        rs: 2,
        pp: "fence, stretchy, symmetric",
      },
      2: {
        gl: "|",
        nm: "vertical line",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "||": {
      0: {
        gl: "||",
        nm: "multiple character operator: ||",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: {
        gl: "||",
        nm: "multiple character operator: ||",
        pr: 270,
        ls: 2,
        rs: 2,
        pp: "fence, stretchy, symmetric",
      },
      2: {
        gl: "||",
        nm: "multiple character operator: ||",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "|||": {
      0: {
        gl: "|||",
        nm: "multiple character operator: |||",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: {
        gl: "|||",
        nm: "multiple character operator: |||",
        pr: 270,
        ls: 2,
        rs: 2,
        pp: "fence, stretchy, symmetric",
      },
      2: {
        gl: "|||",
        nm: "multiple character operator: |||",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "}": {
      0: null,
      1: null,
      2: {
        gl: "}",
        nm: "right curly bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "~": {
      0: null,
      1: null,
      2: {
        gl: "~",
        nm: "tilde",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "+": {
      0: { gl: "+", nm: "plus sign", pr: 275, ls: 0, rs: 1, pp: "" },
      1: { gl: "+", nm: "plus sign", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "++": {
      0: null,
      1: null,
      2: {
        gl: "++",
        nm: "multiple character operator: ++",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "",
      },
    },
    "+=": {
      0: null,
      1: {
        gl: "+=",
        nm: "multiple character operator: +=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "=": {
      0: null,
      1: { gl: "=", nm: "equals sign", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "-=": {
      0: null,
      1: {
        gl: "-=",
        nm: "multiple character operator: -=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "==": {
      0: null,
      1: {
        gl: "==",
        nm: "multiple character operator: ==",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    ">": {
      0: null,
      1: { gl: ">", nm: "greater-than sign", pr: 243, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "->": {
      0: null,
      1: {
        gl: "->",
        nm: "multiple character operator: ->",
        pr: 90,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    ">=": {
      0: null,
      1: {
        gl: ">=",
        nm: "multiple character operator: >=",
        pr: 243,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    '"': {
      0: null,
      1: null,
      2: {
        gl: '"',
        nm: 'quotation mark: "',
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
  };
})();
org.imatheq.formulaeditor.hasLoaded = !1;
if (window.addEventListener) {
  var setLoaded = function () {
    org.imatheq.formulaeditor.hasLoaded = !0;
  };
  window.addEventListener("load", setLoaded, !1);
}

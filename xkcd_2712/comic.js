/*! by chromako.de */ (() => {
  var t = {
      79: (t) => {
        t.exports = {
          name: "Gravity",
          alt: "It's a long way down.",
          url: "/2712",
          width: 740,
          height: 700,
        };
      },
      743: function (t, e) {
        !(function (t) {
          const e = Symbol("newer"),
            n = Symbol("older");
          class i {
            constructor(t, e) {
              "number" != typeof t && ((e = t), (t = 0)),
                (this.size = 0),
                (this.limit = t),
                (this.oldest = this.newest = void 0),
                (this._keymap = new Map()),
                e && (this.assign(e), t < 1 && (this.limit = this.size));
            }
            _markEntryAsUsed(t) {
              t !== this.newest &&
                (t[e] &&
                  (t === this.oldest && (this.oldest = t[e]), (t[e][n] = t[n])),
                t[n] && (t[n][e] = t[e]),
                (t[e] = void 0),
                (t[n] = this.newest),
                this.newest && (this.newest[e] = t),
                (this.newest = t));
            }
            assign(t) {
              let i,
                o = this.limit || Number.MAX_VALUE;
              this._keymap.clear();
              let s = t[Symbol.iterator]();
              for (let t = s.next(); !t.done; t = s.next()) {
                let s = new r(t.value[0], t.value[1]);
                if (
                  (this._keymap.set(s.key, s),
                  i ? ((i[e] = s), (s[n] = i)) : (this.oldest = s),
                  (i = s),
                  0 == o--)
                )
                  throw new Error("overflow");
              }
              (this.newest = i), (this.size = this._keymap.size);
            }
            get(t) {
              var e = this._keymap.get(t);
              return e ? (this._markEntryAsUsed(e), e.value) : void 0;
            }
            set(t, i) {
              var o = this._keymap.get(t);
              return o
                ? ((o.value = i), this._markEntryAsUsed(o), this)
                : (this._keymap.set(t, (o = new r(t, i))),
                  this.newest
                    ? ((this.newest[e] = o), (o[n] = this.newest))
                    : (this.oldest = o),
                  (this.newest = o),
                  ++this.size,
                  this.size > this.limit && this.shift(),
                  this);
            }
            shift() {
              var t = this.oldest;
              if (t)
                return (
                  this.oldest[e]
                    ? ((this.oldest = this.oldest[e]),
                      (this.oldest[n] = void 0))
                    : ((this.oldest = void 0), (this.newest = void 0)),
                  (t[e] = t[n] = void 0),
                  this._keymap.delete(t.key),
                  --this.size,
                  [t.key, t.value]
                );
            }
            find(t) {
              let e = this._keymap.get(t);
              return e ? e.value : void 0;
            }
            has(t) {
              return this._keymap.has(t);
            }
            delete(t) {
              var i = this._keymap.get(t);
              return i
                ? (this._keymap.delete(i.key),
                  i[e] && i[n]
                    ? ((i[n][e] = i[e]), (i[e][n] = i[n]))
                    : i[e]
                    ? ((i[e][n] = void 0), (this.oldest = i[e]))
                    : i[n]
                    ? ((i[n][e] = void 0), (this.newest = i[n]))
                    : (this.oldest = this.newest = void 0),
                  this.size--,
                  i.value)
                : void 0;
            }
            clear() {
              (this.oldest = this.newest = void 0),
                (this.size = 0),
                this._keymap.clear();
            }
            keys() {
              return new s(this.oldest);
            }
            values() {
              return new a(this.oldest);
            }
            entries() {
              return this;
            }
            [Symbol.iterator]() {
              return new o(this.oldest);
            }
            forEach(t, n) {
              "object" != typeof n && (n = this);
              let i = this.oldest;
              for (; i; ) t.call(n, i.value, i.key, this), (i = i[e]);
            }
            toJSON() {
              for (var t = new Array(this.size), n = 0, i = this.oldest; i; )
                (t[n++] = { key: i.key, value: i.value }), (i = i[e]);
              return t;
            }
            toString() {
              for (var t = "", n = this.oldest; n; )
                (t += String(n.key) + ":" + n.value),
                  (n = n[e]) && (t += " < ");
              return t;
            }
          }
          function r(t, i) {
            (this.key = t),
              (this.value = i),
              (this[e] = void 0),
              (this[n] = void 0);
          }
          function o(t) {
            this.entry = t;
          }
          function s(t) {
            this.entry = t;
          }
          function a(t) {
            this.entry = t;
          }
          (t.LRUMap = i),
            (o.prototype[Symbol.iterator] = function () {
              return this;
            }),
            (o.prototype.next = function () {
              let t = this.entry;
              return t
                ? ((this.entry = t[e]), { done: !1, value: [t.key, t.value] })
                : { done: !0, value: void 0 };
            }),
            (s.prototype[Symbol.iterator] = function () {
              return this;
            }),
            (s.prototype.next = function () {
              let t = this.entry;
              return t
                ? ((this.entry = t[e]), { done: !1, value: t.key })
                : { done: !0, value: void 0 };
            }),
            (a.prototype[Symbol.iterator] = function () {
              return this;
            }),
            (a.prototype.next = function () {
              let t = this.entry;
              return t
                ? ((this.entry = t[e]), { done: !1, value: t.value })
                : { done: !0, value: void 0 };
            });
        })(e);
      },
      475: (t) => {
        "use strict";
        t.exports = lil - gui;
      },
    },
    e = {};
  function n(i) {
    var r = e[i];
    if (void 0 !== r) return r.exports;
    var o = (e[i] = { exports: {} });
    return t[i].call(o.exports, o, o.exports, n), o.exports;
  }
  (n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var i in e)
        n.o(e, i) &&
          !n.o(t, i) &&
          Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
    }),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (() => {
      "use strict";
      const t = function (t, e, n) {
        return (
          t == t &&
            (void 0 !== n && (t = t <= n ? t : n),
            void 0 !== e && (t = t >= e ? t : e)),
          t
        );
      };
      var e = /\s/;
      const i = function (t) {
        for (var n = t.length; n-- && e.test(t.charAt(n)); );
        return n;
      };
      var r = /^\s+/;
      const o = function (t) {
        return t ? t.slice(0, i(t) + 1).replace(r, "") : t;
      };
      const s = function (t) {
        var e = typeof t;
        return null != t && ("object" == e || "function" == e);
      };
      const a =
        "object" == typeof global &&
        global &&
        global.Object === Object &&
        global;
      var c = "object" == typeof self && self && self.Object === Object && self;
      const h = a || c || Function("return this")();
      const l = h.Symbol;
      var u = Object.prototype,
        d = u.hasOwnProperty,
        f = u.toString,
        p = l ? l.toStringTag : void 0;
      const y = function (t) {
        var e = d.call(t, p),
          n = t[p];
        try {
          t[p] = void 0;
          var i = !0;
        } catch (t) {}
        var r = f.call(t);
        return i && (e ? (t[p] = n) : delete t[p]), r;
      };
      var g = Object.prototype.toString;
      const v = function (t) {
        return g.call(t);
      };
      var b = l ? l.toStringTag : void 0;
      const w = function (t) {
        return null == t
          ? void 0 === t
            ? "[object Undefined]"
            : "[object Null]"
          : b && b in Object(t)
          ? y(t)
          : v(t);
      };
      const _ = function (t) {
        return null != t && "object" == typeof t;
      };
      const m = function (t) {
        return "symbol" == typeof t || (_(t) && "[object Symbol]" == w(t));
      };
      var x = /^[-+]0x[0-9a-f]+$/i,
        j = /^0b[01]+$/i,
        k = /^0o[0-7]+$/i,
        O = parseInt;
      const S = function (t) {
        if ("number" == typeof t) return t;
        if (m(t)) return NaN;
        if (s(t)) {
          var e = "function" == typeof t.valueOf ? t.valueOf() : t;
          t = s(e) ? e + "" : e;
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = o(t);
        var n = j.test(t);
        return n || k.test(t) ? O(t.slice(2), n ? 2 : 8) : x.test(t) ? NaN : +t;
      };
      const M = function (e, n, i) {
        return (
          void 0 === i && ((i = n), (n = void 0)),
          void 0 !== i && (i = (i = S(i)) == i ? i : 0),
          void 0 !== n && (n = (n = S(n)) == n ? n : 0),
          t(S(e), n, i)
        );
      };
      var z = Math.floor,
        T = Math.random;
      const E = function (t, e) {
        return t + z(T() * (e - t + 1));
      };
      const C = function (t) {
        var e = t.length;
        return e ? t[E(0, e - 1)] : void 0;
      };
      const A = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length, r = Array(i); ++n < i; )
          r[n] = e(t[n], n, t);
        return r;
      };
      const L = function (t, e) {
        return A(e, function (e) {
          return t[e];
        });
      };
      const $ = function (t, e) {
        for (var n = -1, i = Array(t); ++n < t; ) i[n] = e(n);
        return i;
      };
      const I = function (t) {
        return _(t) && "[object Arguments]" == w(t);
      };
      var P = Object.prototype,
        R = P.hasOwnProperty,
        D = P.propertyIsEnumerable;
      const B = I(
        (function () {
          return arguments;
        })()
      )
        ? I
        : function (t) {
            return _(t) && R.call(t, "callee") && !D.call(t, "callee");
          };
      const U = Array.isArray;
      const F = function () {
        return !1;
      };
      var K =
          "object" == typeof exports && exports && !exports.nodeType && exports,
        q =
          K &&
          "object" == typeof module &&
          module &&
          !module.nodeType &&
          module,
        W = q && q.exports === K ? h.Buffer : void 0;
      const N = (W ? W.isBuffer : void 0) || F;
      var V = /^(?:0|[1-9]\d*)$/;
      const G = function (t, e) {
        var n = typeof t;
        return (
          !!(e = null == e ? 9007199254740991 : e) &&
          ("number" == n || ("symbol" != n && V.test(t))) &&
          t > -1 &&
          t % 1 == 0 &&
          t < e
        );
      };
      const J = function (t) {
        return (
          "number" == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
        );
      };
      var Q = {};
      (Q["[object Float32Array]"] =
        Q["[object Float64Array]"] =
        Q["[object Int8Array]"] =
        Q["[object Int16Array]"] =
        Q["[object Int32Array]"] =
        Q["[object Uint8Array]"] =
        Q["[object Uint8ClampedArray]"] =
        Q["[object Uint16Array]"] =
        Q["[object Uint32Array]"] =
          !0),
        (Q["[object Arguments]"] =
          Q["[object Array]"] =
          Q["[object ArrayBuffer]"] =
          Q["[object Boolean]"] =
          Q["[object DataView]"] =
          Q["[object Date]"] =
          Q["[object Error]"] =
          Q["[object Function]"] =
          Q["[object Map]"] =
          Q["[object Number]"] =
          Q["[object Object]"] =
          Q["[object RegExp]"] =
          Q["[object Set]"] =
          Q["[object String]"] =
          Q["[object WeakMap]"] =
            !1);
      const H = function (t) {
        return _(t) && J(t.length) && !!Q[w(t)];
      };
      const X = function (t) {
        return function (e) {
          return t(e);
        };
      };
      var Z =
          "object" == typeof exports && exports && !exports.nodeType && exports,
        Y =
          Z &&
          "object" == typeof module &&
          module &&
          !module.nodeType &&
          module,
        tt = Y && Y.exports === Z && a.process,
        et = (function () {
          try {
            var t = Y && Y.require && Y.require("util").types;
            return t || (tt && tt.binding && tt.binding("util"));
          } catch (t) {}
        })();
      var nt = et && et.isTypedArray;
      const it = nt ? X(nt) : H;
      var rt = Object.prototype.hasOwnProperty;
      const ot = function (t, e) {
        var n = U(t),
          i = !n && B(t),
          r = !n && !i && N(t),
          o = !n && !i && !r && it(t),
          s = n || i || r || o,
          a = s ? $(t.length, String) : [],
          c = a.length;
        for (var h in t)
          (!e && !rt.call(t, h)) ||
            (s &&
              ("length" == h ||
                (r && ("offset" == h || "parent" == h)) ||
                (o &&
                  ("buffer" == h || "byteLength" == h || "byteOffset" == h)) ||
                G(h, c))) ||
            a.push(h);
        return a;
      };
      var st = Object.prototype;
      const at = function (t) {
        var e = t && t.constructor;
        return t === (("function" == typeof e && e.prototype) || st);
      };
      const ct = (function (t, e) {
        return function (n) {
          return t(e(n));
        };
      })(Object.keys, Object);
      var ht = Object.prototype.hasOwnProperty;
      const lt = function (t) {
        if (!at(t)) return ct(t);
        var e = [];
        for (var n in Object(t))
          ht.call(t, n) && "constructor" != n && e.push(n);
        return e;
      };
      const ut = function (t) {
        if (!s(t)) return !1;
        var e = w(t);
        return (
          "[object Function]" == e ||
          "[object GeneratorFunction]" == e ||
          "[object AsyncFunction]" == e ||
          "[object Proxy]" == e
        );
      };
      const dt = function (t) {
        return null != t && J(t.length) && !ut(t);
      };
      const ft = function (t) {
        return dt(t) ? ot(t) : lt(t);
      };
      const pt = function (t) {
        return null == t ? [] : L(t, ft(t));
      };
      const yt = function (t) {
        return C(pt(t));
      };
      const gt = function (t) {
        return (U(t) ? C : yt)(t);
      };
      var vt = n(79),
        bt = n.n(vt),
        wt = n(743);
      function _t(t) {
        const e = new wt.LRUMap(t);
        return (t, n = null) => {
          let i = e.get(t);
          return (
            i ||
            ((i = new Image()), (i.src = t), null == n || n(i), e.set(t, i), i)
          );
        };
      }
      const mt = h["__core-js_shared__"];
      var xt,
        jt = (xt = /[^.]+$/.exec((mt && mt.keys && mt.keys.IE_PROTO) || ""))
          ? "Symbol(src)_1." + xt
          : "";
      const kt = function (t) {
        return !!jt && jt in t;
      };
      var Ot = Function.prototype.toString;
      const St = function (t) {
        if (null != t) {
          try {
            return Ot.call(t);
          } catch (t) {}
          try {
            return t + "";
          } catch (t) {}
        }
        return "";
      };
      var Mt = /^\[object .+?Constructor\]$/,
        zt = Function.prototype,
        Tt = Object.prototype,
        Et = zt.toString,
        Ct = Tt.hasOwnProperty,
        At = RegExp(
          "^" +
            Et.call(Ct)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        );
      const Lt = function (t) {
        return !(!s(t) || kt(t)) && (ut(t) ? At : Mt).test(St(t));
      };
      const $t = function (t, e) {
        return null == t ? void 0 : t[e];
      };
      const It = function (t, e) {
        var n = $t(t, e);
        return Lt(n) ? n : void 0;
      };
      const Pt = (function () {
        try {
          var t = It(Object, "defineProperty");
          return t({}, "", {}), t;
        } catch (t) {}
      })();
      const Rt = function (t, e, n) {
        "__proto__" == e && Pt
          ? Pt(t, e, {
              configurable: !0,
              enumerable: !0,
              value: n,
              writable: !0,
            })
          : (t[e] = n);
      };
      const Dt = (function (t) {
        return function (e, n, i) {
          for (var r = -1, o = Object(e), s = i(e), a = s.length; a--; ) {
            var c = s[t ? a : ++r];
            if (!1 === n(o[c], c, o)) break;
          }
          return e;
        };
      })();
      const Bt = function (t, e) {
        return t && Dt(t, e, ft);
      };
      const Ut = function () {
        (this.__data__ = []), (this.size = 0);
      };
      const Ft = function (t, e) {
        return t === e || (t != t && e != e);
      };
      const Kt = function (t, e) {
        for (var n = t.length; n--; ) if (Ft(t[n][0], e)) return n;
        return -1;
      };
      var qt = Array.prototype.splice;
      const Wt = function (t) {
        var e = this.__data__,
          n = Kt(e, t);
        return (
          !(n < 0) &&
          (n == e.length - 1 ? e.pop() : qt.call(e, n, 1), --this.size, !0)
        );
      };
      const Nt = function (t) {
        var e = this.__data__,
          n = Kt(e, t);
        return n < 0 ? void 0 : e[n][1];
      };
      const Vt = function (t) {
        return Kt(this.__data__, t) > -1;
      };
      const Gt = function (t, e) {
        var n = this.__data__,
          i = Kt(n, t);
        return i < 0 ? (++this.size, n.push([t, e])) : (n[i][1] = e), this;
      };
      function Jt(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var i = t[e];
          this.set(i[0], i[1]);
        }
      }
      (Jt.prototype.clear = Ut),
        (Jt.prototype.delete = Wt),
        (Jt.prototype.get = Nt),
        (Jt.prototype.has = Vt),
        (Jt.prototype.set = Gt);
      const Qt = Jt;
      const Ht = function () {
        (this.__data__ = new Qt()), (this.size = 0);
      };
      const Xt = function (t) {
        var e = this.__data__,
          n = e.delete(t);
        return (this.size = e.size), n;
      };
      const Zt = function (t) {
        return this.__data__.get(t);
      };
      const Yt = function (t) {
        return this.__data__.has(t);
      };
      const te = It(h, "Map");
      const ee = It(Object, "create");
      const ne = function () {
        (this.__data__ = ee ? ee(null) : {}), (this.size = 0);
      };
      const ie = function (t) {
        var e = this.has(t) && delete this.__data__[t];
        return (this.size -= e ? 1 : 0), e;
      };
      var re = Object.prototype.hasOwnProperty;
      const oe = function (t) {
        var e = this.__data__;
        if (ee) {
          var n = e[t];
          return "__lodash_hash_undefined__" === n ? void 0 : n;
        }
        return re.call(e, t) ? e[t] : void 0;
      };
      var se = Object.prototype.hasOwnProperty;
      const ae = function (t) {
        var e = this.__data__;
        return ee ? void 0 !== e[t] : se.call(e, t);
      };
      const ce = function (t, e) {
        var n = this.__data__;
        return (
          (this.size += this.has(t) ? 0 : 1),
          (n[t] = ee && void 0 === e ? "__lodash_hash_undefined__" : e),
          this
        );
      };
      function he(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var i = t[e];
          this.set(i[0], i[1]);
        }
      }
      (he.prototype.clear = ne),
        (he.prototype.delete = ie),
        (he.prototype.get = oe),
        (he.prototype.has = ae),
        (he.prototype.set = ce);
      const le = he;
      const ue = function () {
        (this.size = 0),
          (this.__data__ = {
            hash: new le(),
            map: new (te || Qt)(),
            string: new le(),
          });
      };
      const de = function (t) {
        var e = typeof t;
        return "string" == e || "number" == e || "symbol" == e || "boolean" == e
          ? "__proto__" !== t
          : null === t;
      };
      const fe = function (t, e) {
        var n = t.__data__;
        return de(e) ? n["string" == typeof e ? "string" : "hash"] : n.map;
      };
      const pe = function (t) {
        var e = fe(this, t).delete(t);
        return (this.size -= e ? 1 : 0), e;
      };
      const ye = function (t) {
        return fe(this, t).get(t);
      };
      const ge = function (t) {
        return fe(this, t).has(t);
      };
      const ve = function (t, e) {
        var n = fe(this, t),
          i = n.size;
        return n.set(t, e), (this.size += n.size == i ? 0 : 1), this;
      };
      function be(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var i = t[e];
          this.set(i[0], i[1]);
        }
      }
      (be.prototype.clear = ue),
        (be.prototype.delete = pe),
        (be.prototype.get = ye),
        (be.prototype.has = ge),
        (be.prototype.set = ve);
      const we = be;
      const _e = function (t, e) {
        var n = this.__data__;
        if (n instanceof Qt) {
          var i = n.__data__;
          if (!te || i.length < 199)
            return i.push([t, e]), (this.size = ++n.size), this;
          n = this.__data__ = new we(i);
        }
        return n.set(t, e), (this.size = n.size), this;
      };
      function me(t) {
        var e = (this.__data__ = new Qt(t));
        this.size = e.size;
      }
      (me.prototype.clear = Ht),
        (me.prototype.delete = Xt),
        (me.prototype.get = Zt),
        (me.prototype.has = Yt),
        (me.prototype.set = _e);
      const xe = me;
      const je = function (t) {
        return this.__data__.set(t, "__lodash_hash_undefined__"), this;
      };
      const ke = function (t) {
        return this.__data__.has(t);
      };
      function Oe(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.__data__ = new we(); ++e < n; ) this.add(t[e]);
      }
      (Oe.prototype.add = Oe.prototype.push = je), (Oe.prototype.has = ke);
      const Se = Oe;
      const Me = function (t, e) {
        for (var n = -1, i = null == t ? 0 : t.length; ++n < i; )
          if (e(t[n], n, t)) return !0;
        return !1;
      };
      const ze = function (t, e) {
        return t.has(e);
      };
      const Te = function (t, e, n, i, r, o) {
        var s = 1 & n,
          a = t.length,
          c = e.length;
        if (a != c && !(s && c > a)) return !1;
        var h = o.get(t),
          l = o.get(e);
        if (h && l) return h == e && l == t;
        var u = -1,
          d = !0,
          f = 2 & n ? new Se() : void 0;
        for (o.set(t, e), o.set(e, t); ++u < a; ) {
          var p = t[u],
            y = e[u];
          if (i) var g = s ? i(y, p, u, e, t, o) : i(p, y, u, t, e, o);
          if (void 0 !== g) {
            if (g) continue;
            d = !1;
            break;
          }
          if (f) {
            if (
              !Me(e, function (t, e) {
                if (!ze(f, e) && (p === t || r(p, t, n, i, o)))
                  return f.push(e);
              })
            ) {
              d = !1;
              break;
            }
          } else if (p !== y && !r(p, y, n, i, o)) {
            d = !1;
            break;
          }
        }
        return o.delete(t), o.delete(e), d;
      };
      const Ee = h.Uint8Array;
      const Ce = function (t) {
        var e = -1,
          n = Array(t.size);
        return (
          t.forEach(function (t, i) {
            n[++e] = [i, t];
          }),
          n
        );
      };
      const Ae = function (t) {
        var e = -1,
          n = Array(t.size);
        return (
          t.forEach(function (t) {
            n[++e] = t;
          }),
          n
        );
      };
      var Le = l ? l.prototype : void 0,
        $e = Le ? Le.valueOf : void 0;
      const Ie = function (t, e, n, i, r, o, s) {
        switch (n) {
          case "[object DataView]":
            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
              return !1;
            (t = t.buffer), (e = e.buffer);
          case "[object ArrayBuffer]":
            return !(t.byteLength != e.byteLength || !o(new Ee(t), new Ee(e)));
          case "[object Boolean]":
          case "[object Date]":
          case "[object Number]":
            return Ft(+t, +e);
          case "[object Error]":
            return t.name == e.name && t.message == e.message;
          case "[object RegExp]":
          case "[object String]":
            return t == e + "";
          case "[object Map]":
            var a = Ce;
          case "[object Set]":
            var c = 1 & i;
            if ((a || (a = Ae), t.size != e.size && !c)) return !1;
            var h = s.get(t);
            if (h) return h == e;
            (i |= 2), s.set(t, e);
            var l = Te(a(t), a(e), i, r, o, s);
            return s.delete(t), l;
          case "[object Symbol]":
            if ($e) return $e.call(t) == $e.call(e);
        }
        return !1;
      };
      const Pe = function (t, e) {
        for (var n = -1, i = e.length, r = t.length; ++n < i; ) t[r + n] = e[n];
        return t;
      };
      const Re = function (t, e, n) {
        var i = e(t);
        return U(t) ? i : Pe(i, n(t));
      };
      const De = function (t, e) {
        for (
          var n = -1, i = null == t ? 0 : t.length, r = 0, o = [];
          ++n < i;

        ) {
          var s = t[n];
          e(s, n, t) && (o[r++] = s);
        }
        return o;
      };
      const Be = function () {
        return [];
      };
      var Ue = Object.prototype.propertyIsEnumerable,
        Fe = Object.getOwnPropertySymbols;
      const Ke = Fe
        ? function (t) {
            return null == t
              ? []
              : ((t = Object(t)),
                De(Fe(t), function (e) {
                  return Ue.call(t, e);
                }));
          }
        : Be;
      const qe = function (t) {
        return Re(t, ft, Ke);
      };
      var We = Object.prototype.hasOwnProperty;
      const Ne = function (t, e, n, i, r, o) {
        var s = 1 & n,
          a = qe(t),
          c = a.length;
        if (c != qe(e).length && !s) return !1;
        for (var h = c; h--; ) {
          var l = a[h];
          if (!(s ? l in e : We.call(e, l))) return !1;
        }
        var u = o.get(t),
          d = o.get(e);
        if (u && d) return u == e && d == t;
        var f = !0;
        o.set(t, e), o.set(e, t);
        for (var p = s; ++h < c; ) {
          var y = t[(l = a[h])],
            g = e[l];
          if (i) var v = s ? i(g, y, l, e, t, o) : i(y, g, l, t, e, o);
          if (!(void 0 === v ? y === g || r(y, g, n, i, o) : v)) {
            f = !1;
            break;
          }
          p || (p = "constructor" == l);
        }
        if (f && !p) {
          var b = t.constructor,
            w = e.constructor;
          b == w ||
            !("constructor" in t) ||
            !("constructor" in e) ||
            ("function" == typeof b &&
              b instanceof b &&
              "function" == typeof w &&
              w instanceof w) ||
            (f = !1);
        }
        return o.delete(t), o.delete(e), f;
      };
      const Ve = It(h, "DataView");
      const Ge = It(h, "Promise");
      const Je = It(h, "Set");
      const Qe = It(h, "WeakMap");
      var He = "[object Map]",
        Xe = "[object Promise]",
        Ze = "[object Set]",
        Ye = "[object WeakMap]",
        tn = "[object DataView]",
        en = St(Ve),
        nn = St(te),
        rn = St(Ge),
        on = St(Je),
        sn = St(Qe),
        an = w;
      ((Ve && an(new Ve(new ArrayBuffer(1))) != tn) ||
        (te && an(new te()) != He) ||
        (Ge && an(Ge.resolve()) != Xe) ||
        (Je && an(new Je()) != Ze) ||
        (Qe && an(new Qe()) != Ye)) &&
        (an = function (t) {
          var e = w(t),
            n = "[object Object]" == e ? t.constructor : void 0,
            i = n ? St(n) : "";
          if (i)
            switch (i) {
              case en:
                return tn;
              case nn:
                return He;
              case rn:
                return Xe;
              case on:
                return Ze;
              case sn:
                return Ye;
            }
          return e;
        });
      const cn = an;
      var hn = "[object Arguments]",
        ln = "[object Array]",
        un = "[object Object]",
        dn = Object.prototype.hasOwnProperty;
      const fn = function (t, e, n, i, r, o) {
        var s = U(t),
          a = U(e),
          c = s ? ln : cn(t),
          h = a ? ln : cn(e),
          l = (c = c == hn ? un : c) == un,
          u = (h = h == hn ? un : h) == un,
          d = c == h;
        if (d && N(t)) {
          if (!N(e)) return !1;
          (s = !0), (l = !1);
        }
        if (d && !l)
          return (
            o || (o = new xe()),
            s || it(t) ? Te(t, e, n, i, r, o) : Ie(t, e, c, n, i, r, o)
          );
        if (!(1 & n)) {
          var f = l && dn.call(t, "__wrapped__"),
            p = u && dn.call(e, "__wrapped__");
          if (f || p) {
            var y = f ? t.value() : t,
              g = p ? e.value() : e;
            return o || (o = new xe()), r(y, g, n, i, o);
          }
        }
        return !!d && (o || (o = new xe()), Ne(t, e, n, i, r, o));
      };
      const pn = function t(e, n, i, r, o) {
        return (
          e === n ||
          (null == e || null == n || (!_(e) && !_(n))
            ? e != e && n != n
            : fn(e, n, i, r, t, o))
        );
      };
      const yn = function (t, e, n, i) {
        var r = n.length,
          o = r,
          s = !i;
        if (null == t) return !o;
        for (t = Object(t); r--; ) {
          var a = n[r];
          if (s && a[2] ? a[1] !== t[a[0]] : !(a[0] in t)) return !1;
        }
        for (; ++r < o; ) {
          var c = (a = n[r])[0],
            h = t[c],
            l = a[1];
          if (s && a[2]) {
            if (void 0 === h && !(c in t)) return !1;
          } else {
            var u = new xe();
            if (i) var d = i(h, l, c, t, e, u);
            if (!(void 0 === d ? pn(l, h, 3, i, u) : d)) return !1;
          }
        }
        return !0;
      };
      const gn = function (t) {
        return t == t && !s(t);
      };
      const vn = function (t) {
        for (var e = ft(t), n = e.length; n--; ) {
          var i = e[n],
            r = t[i];
          e[n] = [i, r, gn(r)];
        }
        return e;
      };
      const bn = function (t, e) {
        return function (n) {
          return null != n && n[t] === e && (void 0 !== e || t in Object(n));
        };
      };
      const wn = function (t) {
        var e = vn(t);
        return 1 == e.length && e[0][2]
          ? bn(e[0][0], e[0][1])
          : function (n) {
              return n === t || yn(n, t, e);
            };
      };
      var _n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        mn = /^\w*$/;
      const xn = function (t, e) {
        if (U(t)) return !1;
        var n = typeof t;
        return (
          !(
            "number" != n &&
            "symbol" != n &&
            "boolean" != n &&
            null != t &&
            !m(t)
          ) ||
          mn.test(t) ||
          !_n.test(t) ||
          (null != e && t in Object(e))
        );
      };
      function jn(t, e) {
        if ("function" != typeof t || (null != e && "function" != typeof e))
          throw new TypeError("Expected a function");
        var n = function () {
          var i = arguments,
            r = e ? e.apply(this, i) : i[0],
            o = n.cache;
          if (o.has(r)) return o.get(r);
          var s = t.apply(this, i);
          return (n.cache = o.set(r, s) || o), s;
        };
        return (n.cache = new (jn.Cache || we)()), n;
      }
      jn.Cache = we;
      const kn = jn;
      var On =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        Sn = /\\(\\)?/g;
      const Mn = (function (t) {
        var e = kn(t, function (t) {
            return 500 === n.size && n.clear(), t;
          }),
          n = e.cache;
        return e;
      })(function (t) {
        var e = [];
        return (
          46 === t.charCodeAt(0) && e.push(""),
          t.replace(On, function (t, n, i, r) {
            e.push(i ? r.replace(Sn, "$1") : n || t);
          }),
          e
        );
      });
      var zn = l ? l.prototype : void 0,
        Tn = zn ? zn.toString : void 0;
      const En = function t(e) {
        if ("string" == typeof e) return e;
        if (U(e)) return A(e, t) + "";
        if (m(e)) return Tn ? Tn.call(e) : "";
        var n = e + "";
        return "0" == n && 1 / e == -Infinity ? "-0" : n;
      };
      const Cn = function (t) {
        return null == t ? "" : En(t);
      };
      const An = function (t, e) {
        return U(t) ? t : xn(t, e) ? [t] : Mn(Cn(t));
      };
      const Ln = function (t) {
        if ("string" == typeof t || m(t)) return t;
        var e = t + "";
        return "0" == e && 1 / t == -Infinity ? "-0" : e;
      };
      const $n = function (t, e) {
        for (var n = 0, i = (e = An(e, t)).length; null != t && n < i; )
          t = t[Ln(e[n++])];
        return n && n == i ? t : void 0;
      };
      const In = function (t, e, n) {
        var i = null == t ? void 0 : $n(t, e);
        return void 0 === i ? n : i;
      };
      const Pn = function (t, e) {
        return null != t && e in Object(t);
      };
      const Rn = function (t, e, n) {
        for (var i = -1, r = (e = An(e, t)).length, o = !1; ++i < r; ) {
          var s = Ln(e[i]);
          if (!(o = null != t && n(t, s))) break;
          t = t[s];
        }
        return o || ++i != r
          ? o
          : !!(r = null == t ? 0 : t.length) &&
              J(r) &&
              G(s, r) &&
              (U(t) || B(t));
      };
      const Dn = function (t, e) {
        return null != t && Rn(t, e, Pn);
      };
      const Bn = function (t, e) {
        return xn(t) && gn(e)
          ? bn(Ln(t), e)
          : function (n) {
              var i = In(n, t);
              return void 0 === i && i === e ? Dn(n, t) : pn(e, i, 3);
            };
      };
      const Un = function (t) {
        return t;
      };
      const Fn = function (t) {
        return function (e) {
          return null == e ? void 0 : e[t];
        };
      };
      const Kn = function (t) {
        return function (e) {
          return $n(e, t);
        };
      };
      const qn = function (t) {
        return xn(t) ? Fn(Ln(t)) : Kn(t);
      };
      const Wn = function (t) {
        return "function" == typeof t
          ? t
          : null == t
          ? Un
          : "object" == typeof t
          ? U(t)
            ? Bn(t[0], t[1])
            : wn(t)
          : qn(t);
      };
      const Nn = function (t, e) {
          var n = {};
          return (
            (e = Wn(e, 3)),
            Bt(t, function (t, i, r) {
              Rt(n, i, e(t, i, r));
            }),
            n
          );
        },
        Vn = JSON.parse(
          '{"ev":{"coin-cannonball":{"consumable":"yes","effect":"transformship|ship-tintin","image":"coin","loc":[359,-815],"size":[40,40]},"coin-figure":{"consumable":"yes","effect":"transformship|ship-figure","image":"figure","loc":[-15050,-2984],"size":[40,40]},"coin-regular":{"consumable":"yes","effect":"transformship|ship2","image":"regular","loc":[-29976,-8077],"size":[40,40]},"coin-soccerball":{"consumable":"yes","effect":"transformship|ship-soccer","image":"soccerball","loc":[15293,11140],"size":[40,40]}},"Kl":{"b612":{"gravity":60,"height":2048,"loc":[2610,3700],"radius":82,"width":2048},"dogplanet":{"gravity":600,"height":2048,"loc":[1240,11230],"radius":337,"width":2048},"earth":{"gravity":21000,"height":16384,"loc":[14360,14360],"radius":3275,"width":16384},"enterprise":{"gravity":200,"height":2048,"loc":[1010,30440],"radius":160,"width":2048},"europa":{"gravity":5000,"height":8192,"loc":[13180,-2540],"radius":1625,"width":8192},"goodhart":{"gravity":9000,"height":8192,"loc":[-13300,-3260],"radius":1625,"width":8192},"greatattractor":{"gravity":450000,"height":4096,"loc":[-297000,-125000],"radius":800,"width":4096},"japanmoon":{"gravity":50,"height":2048,"loc":[-5930,-5800],"radius":67,"width":2048},"maw1":{"gravity":2000,"height":2048,"loc":[-31576,-9077],"radius":18,"width":2048},"maw10":{"gravity":2000,"height":2048,"loc":[-29516,-6321],"radius":15,"width":2048},"maw11":{"gravity":2000,"height":2048,"loc":[-29381,-6248],"radius":12,"width":2048},"maw12":{"gravity":2000,"height":2048,"loc":[-26832,-5928],"radius":18,"width":2048},"maw13":{"gravity":2000,"height":2048,"loc":[-31743,-4724],"radius":18,"width":2048},"maw14":{"gravity":2000,"height":2048,"loc":[-26071,-10824],"radius":18,"width":2048},"maw2":{"gravity":2000,"height":2048,"loc":[-30211,-8831],"radius":18,"width":2048},"maw3":{"gravity":2000,"height":2048,"loc":[-27975,-8266],"radius":18,"width":2048},"maw4":{"gravity":2000,"height":2048,"loc":[-29546,-7971],"radius":18,"width":2048},"maw5":{"gravity":2000,"height":2048,"loc":[-29791,-7631],"radius":18,"width":2048},"maw6":{"gravity":2000,"height":2048,"loc":[-29328,-7575],"radius":18,"width":2048},"maw7":{"gravity":2000,"height":2048,"loc":[-29700,-7426],"radius":18,"width":2048},"maw8":{"gravity":2000,"height":2048,"loc":[-29165,-7160],"radius":18,"width":2048},"maw9":{"gravity":2000,"height":2048,"loc":[-30772,-6910],"radius":18,"width":2048},"nojapan":{"gravity":80,"height":2048,"loc":[-7680,-5850],"radius":200,"width":2048},"origin":{"gravity":2300,"height":4096,"loc":[0,0],"radius":630,"width":4096},"outside":{"gravity":200,"height":16384,"loc":[0,-14500],"radius":125,"width":16384},"peeler":{"gravity":50,"height":2048,"loc":[-9270,620],"radius":40,"width":2048},"pigeons":{"gravity":100,"height":2048,"loc":[-9020,-2490],"radius":160,"width":2048},"present":{"gravity":300,"height":2048,"loc":[22820,-18920],"radius":195,"width":2048},"qwantz":{"gravity":1400,"height":4096,"loc":[11060,24870],"radius":850,"width":4096},"remnant":{"gravity":9000,"height":4096,"loc":[19620,3800],"radius":537,"width":4096},"roads":{"gravity":40,"height":16384,"loc":[13240,-11510],"radius":30,"width":16384},"soupiter":{"gravity":1300,"height":4096,"loc":[-8000,-9040],"radius":812,"width":4096},"steerswoman":{"gravity":600,"height":4096,"loc":[-35070,-2500],"radius":520,"width":4096},"sun":{"gravity":9000,"height":16384,"loc":[-14950,12080],"radius":540,"width":16384}},"hM":{"Zh":[0,750]},"O_":"tile","JR":1024}'
        );
      var Gn = function (t, e) {
        var n = {};
        for (var i in t)
          Object.prototype.hasOwnProperty.call(t, i) &&
            e.indexOf(i) < 0 &&
            (n[i] = t[i]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
          var r = 0;
          for (i = Object.getOwnPropertySymbols(t); r < i.length; r++)
            e.indexOf(i[r]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(t, i[r]) &&
              (n[i[r]] = t[i[r]]);
        }
        return n;
      };
      function Jn(t) {
        const [e, n] = t;
        return [2 * e, 2 * -n];
      }
      const Qn = Nn(
          Vn.Kl,
          ({ loc: t }) =>
            () =>
              Jn(t)
        ),
        Hn = Object.entries(Qn).map(([t, e]) => {
          const n = Vn.Kl[t],
            { width: i, height: r, gravity: o } = n;
          return {
            id: t,
            loc: e,
            width: i,
            height: r,
            radius: "radius" in n ? n.radius : null,
            gravity: o,
          };
        }),
        Xn = Object.values(Vn.ev).map((t) => {
          var { loc: e } = t,
            n = Gn(t, ["loc"]);
          return Object.assign({ loc: Jn(e) }, n);
        }),
        Zn = { startPos: Jn(Vn.hM.Zh), tileSize: Vn.JR, tileBase: Vn.O_ };
      var Yn = function (t, e) {
        var n = {};
        for (var i in t)
          Object.prototype.hasOwnProperty.call(t, i) &&
            e.indexOf(i) < 0 &&
            (n[i] = t[i]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
          var r = 0;
          for (i = Object.getOwnPropertySymbols(t); r < i.length; r++)
            e.indexOf(i[r]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(t, i[r]) &&
              (n[i[r]] = t[i[r]]);
        }
        return n;
      };
      function ti(t, e, n, i, r, o) {
        return t >= n && t <= r && e >= i && e <= o;
      }
      function ei(t, e, n, i, r, o, s, a) {
        return n >= r && t <= s && i >= o && e <= a;
      }
      function ni(t, e, n, i, ...r) {
        return ei(t, e, n, i, ...r) && ei(n, i, t, e, ...r);
      }
      function ii(t, e, n, i, r, o, s, a) {
        return [Math.max(t, r), Math.max(e, o), Math.min(n, s), Math.min(i, a)];
      }
      const ri = 2 * Math.PI;
      function oi(t, e) {
        return ((t % e) + e) % e;
      }
      function si(t) {
        return oi(t, ri);
      }
      function ai(t, e) {
        Object.assign(t.style, e);
      }
      function ci(t, e = {}) {
        const n = document.createElement(t),
          { style: i } = e;
        Yn(e, ["style"]);
        return Object.assign(n, e), ai(n, i), n;
      }
      class hi {
        constructor(t, e) {
          (this.renderedBounds = [0, 0, 0, 0]),
            (this.getCanvas = kn(() => {
              const { name: t, zIndex: e, collision: n } = this.opts,
                i = ci("canvas", {
                  style: {
                    position: "absolute",
                    left: "0",
                    top: "0",
                    zIndex: e.toString(),
                  },
                });
              i.dataset.name = t;
              const r = i.getContext("2d");
              return { canvasEl: i, ctx: r };
            })),
            (this.parentEl = t),
            (this.opts = e),
            (this.getImg = _t(e.tileCacheSize));
        }
        getTile(t, e = null) {
          const { tileURL: n } = this.opts;
          return this.getImg(n(t), e);
        }
        _tileBounds(t, e = 0) {
          const [n, i, r, o] = t,
            { tileSize: s } = this.opts,
            a = Math.floor((n - e) / s),
            c = Math.ceil((r + e) / s);
          return [a, Math.floor((i - e) / s), c, Math.ceil((o + e) / s)];
        }
        *_iterTileCoords(t) {
          const [e, n, i, r] = t;
          for (let t = e; t < i; t++)
            for (let e = n; e < r; e++) {
              const n = this.opts.key(t, e);
              null != n && (yield { xt: t, yt: e, key: n });
            }
        }
        load(t, e) {
          const n = [],
            i = this._tileBounds(t, e);
          for (const { key: t } of this._iterTileCoords(i)) {
            const e = this.getTile(t);
            e.complete ||
              n.push(
                new Promise((t, n) => {
                  e.addEventListener("load", t), e.addEventListener("error", n);
                })
              );
          }
          return Promise.all(n);
        }
        _preload(t) {
          const { preloadDistance: e } = this.opts,
            n = this._tileBounds(t, e);
          for (const { xt: t, yt: e, key: i } of this._iterTileCoords(n))
            this.getTile(i, (n) => {
              n.addEventListener("load", () => {
                const n = this._tileBounds(this.renderedBounds);
                ti(t, e, ...n) && this._rerenderTile(i, t, e);
              });
            });
        }
        _renderTile(t, e, n) {
          const { debug: i, tileSize: r } = this.opts,
            { ctx: o } = this.getCanvas(),
            s = this.getTile(t);
          try {
            o.drawImage(s, e, n, r, r);
          } catch (t) {
            i && console.warn("error rendering tile", s);
          }
          i &&
            (o.save(),
            (o.lineWidth = 2),
            (o.strokeStyle = "rgb(255, 0, 0, .5)"),
            o.strokeRect(e, n, r, r),
            (o.fillStyle = o.strokeStyle),
            (o.font = "bold 30px sans-serif"),
            o.fillText(t, e + 16, n + r - 16),
            o.restore());
        }
        _rerenderTile(t, e, n) {
          const { tileSize: i } = this.opts,
            [r, o] = this.renderedBounds;
          this._renderTile(t, e * i - r, n * i - o);
        }
        _render(t) {
          const {
              tileSize: e,
              prerenderTiles: n,
              width: i,
              height: r,
            } = this.opts,
            { canvasEl: o, ctx: s } = this.getCanvas(),
            a = n * e,
            c = this._tileBounds(t, a),
            h = ii(...c.map((t) => t * e), 0, 0, i, r);
          if (ni(...h, ...this.renderedBounds)) return;
          const l = this._resize(t),
            [u, d] = h,
            f = ii(...this.renderedBounds, ...h),
            [p, y] = this.renderedBounds,
            [g, v, b, w] = f;
          if (
            !l &&
            !(function (t, e, n, i) {
              return n - t == 0 || i - e == 0;
            })(...f)
          ) {
            const t = b - g,
              e = w - v;
            (s.globalCompositeOperation = "copy"),
              s.drawImage(o, g - p, v - y, t, e, g - u, v - d, t, e),
              (s.globalCompositeOperation = "source-over");
          }
          for (const { xt: t, yt: n, key: i } of this._iterTileCoords(c)) {
            const r = t * e,
              o = n * e,
              a = r - u,
              c = o - d;
            ni(r, o, r + e, o + e, ...this.renderedBounds) ||
              (s.clearRect(a, c, e, e), this._renderTile(i, a, c));
          }
          this.renderedBounds = h;
        }
        _resize(t) {
          const { tileSize: e, prerenderTiles: n } = this.opts,
            { canvasEl: i } = this.getCanvas(),
            [r, o, s, a] = t,
            c = (Math.ceil((s - r) / e) + 1 + 2 * n) * e,
            h = (Math.ceil((a - o) / e) + 1 + 2 * n) * e;
          let l = !1;
          return (
            i.width !== c && ((i.width = c), (l = !0)),
            i.height !== h && ((i.height = h), (l = !0)),
            l
          );
        }
        update(t) {
          const { canvasEl: e } = this.getCanvas();
          e.parentElement !== this.parentEl && this.parentEl.appendChild(e),
            this._preload(t),
            this._render(t);
          const [n, i] = t,
            [r, o, s, a] = this.renderedBounds;
          ai(e, { transform: `translate(${r - n}px, ${o - i}px)` });
        }
        copyTo(t, e) {
          const { canvasEl: n } = this.getCanvas(),
            [i, r, o, s] = t,
            [a, c] = this.renderedBounds,
            h = o - i,
            l = s - r;
          e.drawImage(n, i - a, r - c, h, l, 0, 0, h, l);
        }
        remove() {
          const { canvasEl: t } = this.getCanvas();
          t.parentElement === this.parentEl && this.parentEl.removeChild(t);
        }
      }
      class li {
        constructor(t, e) {
          (this.el = t), (this.layers = e.map((e) => new hi(t, e)));
        }
        *_iterLayers(t, e, n = this.el.clientWidth, i = this.el.clientHeight) {
          const { layers: r } = this,
            o = t - n / 2,
            s = e - i / 2,
            a = o + n,
            c = s + i,
            h = [o, s, a, c];
          for (const n of r) {
            const i = n.opts.rect(t, e),
              r = ei(...h, ...i),
              [l, u] = i,
              d = [o - l, s - u, a - l, c - u];
            yield { layer: n, frameRect: h, renderRect: d, inView: r };
          }
        }
        load(t, e) {
          const n = [];
          for (const { layer: i, renderRect: r, inView: o } of this._iterLayers(
            t,
            e
          ))
            o && n.push(i.load(r, 0));
          return Promise.all(n);
        }
        frame(t, e) {
          for (const { layer: n, renderRect: i, inView: r } of this._iterLayers(
            t,
            e
          ))
            ("earth" === n.opts.name &&
              Math.abs(t - 31523) < 400 &&
              Math.abs(e + 34629) < 400 &&
              Math.random() > 0.5) ||
              (r ? n.update(i) : n.remove());
        }
        flattenToCanvas(
          t,
          e,
          n,
          i,
          r,
          { onlyCollision: o } = { onlyCollision: !1 }
        ) {
          for (const { layer: s, renderRect: a, inView: c } of this._iterLayers(
            e,
            n,
            i,
            r
          ))
            !c || (o && !s.opts.collision) || s.copyTo(a, t);
        }
      }
      const { PI: ui } = Math,
        di = ui / 2;
      class fi {
        constructor(t, e) {
          (this._keyState = { left: !1, right: !1, up: !1, down: !1 }),
            (this._touches = { left: null, right: null, up: null, down: null }),
            (this._objects = []),
            (this._frameQueued = 0),
            (this.ready = !1),
            (this.lastTick = 0),
            (this.el = t),
            (this.opts = e),
            ai(this.el, { position: "relative", overflow: "hidden" });
          const n =
            2 *
            Math.floor(
              Math.sqrt(Math.pow(bt().width, 2) + Math.pow(bt().height, 2))
            );
          (this.tiglEl = ci("div", {
            style: {
              position: "absolute",
              width: `${n}px`,
              height: `${n}px`,
              left: "50%",
              top: "50%",
              marginLeft: `-${n / 2}px`,
              marginTop: `-${n / 2}px`,
            },
          })),
            t.appendChild(this.tiglEl),
            (this.canvas = ci("canvas")),
            (this.ctx = this.canvas.getContext("2d", {
              willReadFrequently: !0,
            }));
          const { character: i, startPos: r } = e,
            o = 2 * i.collisionRadius;
          (this.canvas.width = o),
            (this.canvas.height = o),
            (this.pos = {
              x: r[0],
              y: r[1],
              a: -di,
              vx: 0,
              vy: 0,
              ax: 0,
              ay: 0,
              va: 0,
              aa: 0,
              isColliding: !1,
              isLanded: !1,
              lastCollisionTime: -1 / 0,
              lastLandingTime: -1 / 0,
              cameraAngle: 0,
            });
          for (const t of e.objects) {
            const e = Math.ceil(t.w / 2),
              n = Math.ceil(t.h / 2),
              i = {
                w: t.w,
                h: t.h,
                x1: t.x - e,
                x2: t.x + e,
                y1: t.y - n,
                y2: t.y + n,
                render:
                  "imgURL" in t
                    ? () =>
                        ci("div", {
                          style: {
                            width: `${i.w}px`,
                            height: `${i.h}px`,
                            backgroundImage: `url(${t.imgURL}`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            filter: "invert(1)",
                          },
                        })
                    : t.render,
                effect: t.effect,
                consumable: t.consumable,
                got: !1,
                el: null,
              };
            this._objects.push(i);
          }
          (this.tigl = new li(this.tiglEl, e.layers)),
            (this.charEl = ci("div", {
              className: "self",
              style: {
                position: "absolute",
                zIndex: "100",
                left: `calc(50% - ${i.width / 2}px`,
                top: `calc(50% - ${i.height / 2}px`,
                width: `${i.width}px`,
                height: `${i.height}px`,
              },
            })),
            this.el.appendChild(this.charEl),
            (this.ready = !1),
            (t.tabIndex = 0),
            t.addEventListener("keydown", this.onKey.bind(this)),
            t.addEventListener("keyup", this.onKey.bind(this)),
            t.addEventListener("touchstart", this.onTouchDown.bind(this)),
            t.addEventListener("touchend", this.onTouchUp.bind(this)),
            t.addEventListener("touchcancel", this.onTouchUp.bind(this)),
            document.addEventListener(
              "visibilitychange",
              this.onVisibilityChange.bind(this)
            );
        }
        start() {
          this.opts.onTick(0, this.pos, this._keyState),
            this.tigl.load(this.pos.x, this.pos.y).finally(() => {
              (this.ready = !0), this.startTicking();
            });
        }
        _updateCollision() {
          const t = this.pos,
            { debug: e, character: n } = this.opts,
            { collisionRadius: i, landingAngleThreshold: r } = n,
            o = n.width / 2,
            s = n.height / 2,
            a = t.x - o,
            c = a + n.width,
            h = t.y - s,
            l = h + n.height;
          for (let t = 0; t < this._objects.length; t++) {
            const e = this._objects[t];
            ei(e.x1, e.y1, e.x2, e.y2, a, h, c, l) &&
              e.consumable &&
              ((e.got = !0), this.opts.onGotObject(e));
          }
          const u = this.canvas.width,
            d = this.canvas.height,
            f = u / 2,
            p = d / 2;
          this.ctx.clearRect(0, 0, u, d),
            this.tigl.flattenToCanvas(
              this.ctx,
              Math.round(t.x),
              Math.round(t.y),
              u,
              d,
              { onlyCollision: !0 }
            );
          let y = 0,
            g = !1;
          const v = this.ctx.getImageData(0, 0, u, d);
          if (!this.opts.disableCollision) {
            const n = 1.1 / i,
              o = ui / 2,
              s =
                (0 !== t.vx || 0 !== t.vy ? Math.atan2(t.vy, t.vx) : t.a) -
                o / 2;
            let a = 0,
              c = 0;
            for (let t = s; t < s + o; t += n) {
              const n = Math.floor(Math.cos(t) * i),
                r = Math.floor(Math.sin(t) * i),
                o = 4 * (n + f + u * (r + p)),
                s = 1 & v.data[o + 3];
              let h = !1;
              e &&
                (h =
                  v.data[o] > 128 &&
                  v.data[o + 1] <= 128 &&
                  v.data[o + 2] <= 128),
                s && !h && (y++, (a += n), (c += r)),
                this.opts.debug &&
                  (s && (v.data[o + 2] = 128), (v.data[o + 1] = 128));
            }
            if (y > 0) {
              const e = Math.atan2(c / y, a / y);
              g = Math.abs(si(e - t.a) - Math.PI) < r;
              const n = g ? 0.25 : 0.75,
                i = g ? 0 : 0.5,
                o = Math.cos(e),
                s = Math.sin(e),
                h = o * t.vx + s * t.vy,
                l = h * o,
                u = h * s;
              (t.vx = n * (t.vx - l) - i * l),
                (t.vy = n * (t.vy - u) - i * u),
                g && (t.va *= 0.75);
            }
          }
          if (this.opts.debug) {
            for (let t = 0; t < u; t++)
              for (let e = 0; e < d; e++) {
                const n = 4 * (t + u * e);
                v.data[n + 3];
                v.data[n + 3] = 256;
              }
            const { ctx: t } = this;
            t.putImageData(v, 0, 0), (t.fillStyle = "rgba(255, 255, 255, .35)");
          }
          return { isColliding: y > 0, isLanded: g };
        }
        onKey(t) {
          const e = this._keyState,
            n = "keydown" == t.type;
          let i = !0;
          switch (t.code) {
            case "ArrowLeft":
            case "KeyA":
            case "KeyH":
              e.left = n;
              break;
            case "ArrowUp":
            case "KeyW":
            case "KeyK":
              e.up = n;
              break;
            case "ArrowRight":
            case "KeyD":
            case "KeyL":
              e.right = n;
              break;
            case "ArrowDown":
            case "KeyS":
            case "KeyJ":
              e.down = n;
              break;
            default:
              i = !1;
          }
          i && (t.preventDefault(), this.startTicking());
        }
        onTouchDown(t) {
          t.preventDefault(),
            document.fullscreenElement !== this.el &&
              document.webkitFullscreenElement !== this.el &&
              ("requestFullscreen" in this.el && this.el.requestFullscreen(),
              "webkitRequestFullscreen" in this.el &&
                this.el.webkitRequestFullscreen());
          const e = t.changedTouches[0],
            { left: n, width: i } = this.el.getBoundingClientRect(),
            r = e.clientX - n;
          r < 0.25 * i
            ? ((this._keyState.left = !0), (this._touches.left = e.identifier))
            : r > 0.75 * i
            ? ((this._keyState.right = !0),
              (this._touches.right = e.identifier))
            : ((this._keyState.up = !0), (this._touches.up = e.identifier));
        }
        onTouchUp(t) {
          t.preventDefault();
          const e = t.changedTouches[0];
          e.identifier === this._touches.left
            ? ((this._keyState.left = !1), (this._touches.left = null))
            : e.identifier === this._touches.right
            ? ((this._keyState.right = !1), (this._touches.right = null))
            : e.identifier === this._touches.up &&
              ((this._keyState.up = !1), (this._touches.up = null));
        }
        onVisibilityChange() {
          document.hidden ? this.pauseTicking() : this.startTicking();
        }
        startTicking() {
          this._frameQueued ||
            ((this.lastTick = performance.now()),
            (this._frameQueued = requestAnimationFrame(this.tick.bind(this))));
        }
        pauseTicking() {
          this._frameQueued &&
            ((this.lastTick = 0), cancelAnimationFrame(this._frameQueued));
        }
        tick(t) {
          if (!this.ready) return;
          const { maxSpeed: e } = this.opts,
            n = (this.lastTick > 0 ? t - this.lastTick : 0) / 16,
            i = this.pos,
            r = this._keyState;
          if (
            (!i.isLanded && r.left
              ? (i.aa = -this.opts.turnSpeed)
              : !i.isLanded && r.right
              ? (i.aa = this.opts.turnSpeed)
              : (i.aa = 0),
            r.up)
          ) {
            const t = this.pos.isLanded
              ? this.opts.launchSpeed
              : this.opts.speed;
            (i.ax = t * Math.cos(i.a)),
              (i.ay = t * Math.sin(i.a)),
              (i.isLanded = !1);
          } else
            r.down
              ? ((i.ax = -this.opts.speed * Math.cos(i.a)),
                (i.ay = -this.opts.speed * Math.sin(i.a)))
              : ((i.ax = 0), (i.ay = 0));
          if (
            ((i.vx += i.ax),
            (i.vy += i.ay),
            (i.va += i.aa),
            (i.vx = M(i.vx, -e, e)),
            (i.vy = M(i.vy, -e, e)),
            (i.a += i.va * n),
            (i.a = si(i.a)),
            this.opts.onTick && this.opts.onTick(t, i, this._keyState),
            !i.isLanded)
          ) {
            const { isColliding: e, isLanded: n } = this._updateCollision();
            e && (i.lastCollisionTime = t),
              n && !i.isLanded && (i.lastLandingTime = t),
              (i.isColliding = e),
              (i.isLanded = n);
          }
          i.isLanded
            ? ((i.x = Math.round(i.x)),
              (i.y = Math.round(i.y)),
              (i.va = 0),
              (i.vx = 0),
              (i.vy = 0))
            : ((i.x += i.vx * n),
              (i.y += i.vy * n),
              (i.va *= 1 - this.opts.turnDrag),
              (i.vx *= 1 - this.opts.drag),
              (i.vy *= 1 - this.opts.drag)),
            requestAnimationFrame(this.tick.bind(this)),
            (this.lastTick = t),
            this.frame(t);
        }
        frame(t) {
          const e = this.pos,
            { character: n } = this.opts,
            i = this.tiglEl.clientWidth / 2,
            r = this.tiglEl.clientHeight / 2,
            o = e.x - i,
            s = e.x + i,
            a = e.y - r,
            c = e.y + r,
            h = this.tigl.frame(e.x, e.y);
          (this.tiglEl.style.transform = `scale(.5) rotate(${e.cameraAngle}rad)`),
            n.update(this.charEl, t, e, this._keyState),
            (this.charEl.style.backgroundImage = "red"),
            (this.charEl.style.transform = `rotate(${
              e.a + e.cameraAngle + di
            }rad)`);
          for (const t of this._objects) {
            const e = ei(t.x1, t.y1, t.x2, t.y2, o, a, s, c);
            if ((t.consumable && t.got) || !e)
              null != t.el &&
                (t.el.parentElement.removeChild(t.el), (t.el = null));
            else {
              null == t.el &&
                ((t.el = t.render()),
                ai(t.el, {
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: "100",
                }),
                this.tiglEl.appendChild(t.el));
              const e = t.x1 - o,
                n = t.y1 - a;
              t.el.style.transform = `translate(${e}px, ${n}px)`;
            }
          }
          return h;
        }
      }
      const pi = !1;
      function yi(t) {
        return `${bt().url + "/"}${Zn.tileBase}/${t}.png`;
      }
      const gi = 0.35;
      (window.Comic = new (class {
        constructor() {
          (this.planetRects = {}),
            (this.wayfinderEls = new Map()),
            (this.getImg = _t(128)),
            (this.ship = "ship2"),
            (this.cameraRotation = !0),
            (this.gravityConstant = 100),
            (this.gravityExponent = 2),
            (this.wayfinderRadius = 30),
            (this.wayfinderCloseDistance = 15),
            (this.wayfinderFarDistance = 1e4),
            (this.lightMode = !1);
        }
        init(t) {
          const e = {
              debug: pi,
              tileSize: Zn.tileSize,
              tileURL: yi,
              prerenderTiles: 0,
              preloadDistance: Zn.tileSize,
              tileCacheSize: 128,
            },
            n = [];
          n.push(
            Object.assign(Object.assign({}, e), {
              name: "starfield",
              collision: !1,
              rect: (t, e) => [
                t - oi(t / 2, Zn.tileSize) - 1 * Zn.tileSize,
                e - oi(e / 2, Zn.tileSize) - 1 * Zn.tileSize,
                1e9,
                1e9,
              ],
              width: 3 * Zn.tileSize,
              height: 3 * Zn.tileSize,
              key: () => "starfield_bright",
              zIndex: 1,
            })
          ),
            n.push(
              ...Hn.map(({ id: t, width: n, height: i }) => {
                const r = Math.ceil(n / Zn.tileSize) - 1,
                  o = Math.ceil(i / Zn.tileSize) - 1;
                return Object.assign(
                  {
                    name: t,
                    collision: !0,
                    zIndex: 10,
                    rect: () => this.planetRects[t],
                    width: n,
                    height: i,
                    key: (e, n) =>
                      ti(e, n, 0, 0, r, o) ? `${t}_${e}_${n}` : null,
                  },
                  e
                );
              })
            );
          const i = Object.values(Xn).map(({ loc: [t, e], effect: n }) => ({
            x: t,
            y: e,
            w: 40,
            h: 40,
            imgURL: yi("coin"),
            consumable: !0,
            effect: n,
          }));
          i.push({
            x: 1500,
            y: -2e5,
            w: 200,
            h: 50,
            consumable: !1,
            render: () =>
              ci("button", {
                style: { width: "200px", height: "50px", fontSize: "30px" },
                textContent: "light mode",
                onclick: () => (this.lightMode = !0),
              }),
          }),
            ai(t, {
              width: `${bt().width}px`,
              height: `${bt().height}px`,
              background: "black",
              outline: "2px solid black",
              margin: "0 auto",
            }),
            (t.title = bt().alt),
            (this.voyager = new fi(t, {
              debug: pi,
              startPos: Zn.startPos,
              speed: gi,
              launchSpeed: 5,
              turnSpeed: 0.002,
              drag: 0,
              turnDrag: 0.05,
              maxSpeed: 100,
              character: {
                width: 50,
                height: 50,
                collisionRadius: 44,
                landingAngleThreshold: Math.PI / 12,
                update: this.updatePlayer.bind(this),
              },
              objects: i,
              layers: n,
              onTick: this.onTick.bind(this),
              onGotObject: this.onGotObject.bind(this),
              disableCollision: !1,
            })),
            this._preloadShipImgs(),
            this.voyager.start();
        }
        _getShipImg(t) {
          const { character: e } = this.voyager.opts;
          return this.getImg(yi(`${this.ship}/${t}`), (t) => {
            (t.width = e.width),
              (t.height = e.height),
              ai(t, { position: "absolute", left: "0", top: "0" });
          });
        }
        _preloadShipImgs() {
          const t = [
            "shield1",
            "shield2",
            "shield3",
            "shield4",
            "shield5",
            "shield6",
            "ship_engines_2x",
            "ship_gliding_2x",
            "ship_landing_down_2x",
            "ship_landing_high_2x",
            "ship_landing_mid_2x",
            "ship_left_2x",
            "ship_right_2x",
          ];
          for (const e of t) this._getShipImg(e);
        }
        updatePlayer(t, e, n, i) {
          let r = "gliding";
          i.up || i.down
            ? (r = "engines")
            : i.left
            ? (r = "right")
            : i.right
            ? (r = "left")
            : n.isLanded &&
              (r =
                e - n.lastLandingTime < 100
                  ? "landing_high"
                  : e - n.lastLandingTime < 200
                  ? "landing_mid"
                  : "landing_down");
          const o = [`ship_${r}_2x`];
          if (
            !n.isLanded &&
            e - n.lastCollisionTime < 250 &&
            window.ship.shields
          ) {
            const t = Math.floor(6 * Math.random()) + 1;
            o.push(`shield${t}`);
          }
          const s = new Set();
          for (const t of o) s.add(this._getShipImg(t));
          for (const e of s) e.parentElement !== t && t.appendChild(e);
          for (const e of t.children) s.has(e) ? s.delete(e) : t.removeChild(e);
        }
        updateWayfinder({
          pos: t,
          id: e,
          radius: n,
          angleTo: i,
          wayfinderDistance: r,
          minWayfinderDistance: o,
        }) {
          const s = this.wayfinderCloseDistance,
            a = this.wayfinderFarDistance;
          let c = this.wayfinderEls.get(e);
          if (!c) {
            const t = M(n / 50, 3, 6);
            (c = ci("div", {
              style: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: `${t}px`,
                height: `${t}px`,
                background: "white",
                borderRadius: "99px",
              },
            })),
              this.voyager.el.appendChild(c),
              this.wayfinderEls.set(e, c);
          }
          let h = 1 - (r - o) / a;
          (h = M(h, 0, 1)),
            r < s && (h = Math.max(0, h - (s - r) / s)),
            (c.style.opacity = (0.5 * h).toString());
          const l = i + t.cameraAngle,
            u = this.wayfinderRadius + 10 * (1 - h),
            d = Math.cos(l) * u,
            f = Math.sin(l) * u;
          c.style.transform = `translate(${d}px, ${f}px)`;
        }
        // t is requestAnimationFrame time detla, e is position? n is ?
        onTick(t, e, n) {
          (this.voyager.opts.disableCollision = window.noclip),
            (this.voyager.opts.speed =
              "warp" === window.ship.engines ? 1.4 : gi),
            !1 === window.ship.shields &&
              e.isColliding &&
              (ai(document.body, {
                background: "black",
                opacity: "0",
                filter: "invert(1)",
                transition: "all 1s ease",
              }),
              (e.vx = 0),
              (e.vy = 0)),
            (this.voyager.el.style.filter = this.lightMode
              ? "invert(1)"
              : "none");
          let i = {
            x: 0,
            y: 0,
            wayfinderDistance: 1 / 0,
            angleTo: 0,
            radius: 0,
            id: "",
          };
          const r = [];
          let o = 0,
            s = 0;
          this.planetRects = {};
          for (const {
            id: n,
            loc: a,
            width: c,
            height: h,
            radius: l,
            gravity: u,
          } of Hn) {
            const d = c / 2,
              f = h / 2,
              // not sure what t being passed in here is
              // but expect p and y to be x, y of planet
              [p, y] = a(t),
              g = p - d,
              v = y - f,
              b = g + c,
              w = v + h;
            this.planetRects[n] = [g, v, b, w];
            const _ = Math.atan2(y - e.y, p - e.x),
              // abs distance from ship to planent, as hyptonus of triangle
              m = Math.sqrt(Math.pow(e.x - p, 2) + Math.pow(e.y - y, 2)),
              x = Math.max(0, m - l),
              j = {
                x: p,
                y,
                wayfinderDistance: x,
                angleTo: _,
                radius: l,
                id: n,
              };
            r.push(j), x < i.wayfinderDistance && (i = j);
            // this is what turns distance between ship and planet into a vecoltiy number
            const k = (t) =>
              (u * this.gravityConstant) / Math.pow(t, this.gravityExponent);
            let O = 0,
              S = 0;
            // if distance from ship to planet > radius
            if (m > l) {
              const t = k(m);
              // t is gravity veclotty vector of planet on ship
              // O and S are X and Y components
              (O = Math.cos(_) * t), (S = Math.sin(_) * t);
            } else {
              // guess gravity is different if your inside the planet
              const t = m / l,
                e = t * k(l);
              (O = t * Math.cos(_) * e), (S = t * Math.sin(_) * e);
            }
            (o += O), (s += S);
          }
          // note: ((e.vx += o), (e.vy += s)) is the velcitoy change if not landed
          // from cumulative gravity o and s?
          e.isLanded
            ? (e.a = si((9 * e.a + Math.atan2(s, o) + Math.PI) / 10))
            : ((e.vx += o), (e.vy += s));
          const a = this.cameraRotation ? -Math.atan2(s, o) + Math.PI / 2 : 0;
          e.cameraAngle = a;
          for (const {
            id: t,
            radius: n,
            angleTo: o,
            wayfinderDistance: s,
          } of r)
            this.updateWayfinder({
              pos: e,
              id: t,
              radius: n,
              angleTo: o,
              wayfinderDistance: s,
              minWayfinderDistance: i.wayfinderDistance,
            });
          if (
            "infinite improbability drive" === window.ship.engines &&
            n.up &&
            Math.random() < 0.1
          ) {
            (e.vx = 0), (e.vy = 0), (e.va = 0);
            const t = gt(r.filter((t) => !t.id.startsWith("maw")));
            (e.x = t.x + 400 * (Math.random() - 0.5)),
              (e.y = t.y + 400 * (Math.random() - 0.5));
          }
        }
        onGotObject(t) {
          const [e, n] = t.effect.split("|");
          "transformship" === e && ((this.ship = n), this._preloadShipImgs());
        }
      })()),
        (window.ze = {
          goggles: () => {
            console.warn("they do nothing!");
          },
        }),
        (window.ship = { engines: "standard", shields: !0 }),
        (window.python = function (t) {
          "import antigravity" === t && (window.Comic.gravityConstant *= -1);
        });
    })();
})();

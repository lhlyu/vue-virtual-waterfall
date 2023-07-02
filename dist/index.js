import { ref as y, watch as R, unref as Z, getCurrentInstance as q, onMounted as I, nextTick as ee, getCurrentScope as te, onScopeDispose as oe, computed as _, reactive as j, defineComponent as ne, useSlots as re, openBlock as z, createElementBlock as H, createElementVNode as le, normalizeStyle as N, Fragment as ie, renderList as se, renderSlot as ue } from "vue";
function J(e) {
  return te() ? (oe(e), !0) : !1;
}
function S(e) {
  return typeof e == "function" ? e() : Z(e);
}
const ae = typeof window != "undefined", M = () => {
};
function K(e, n) {
  function o(...t) {
    return new Promise((r, v) => {
      Promise.resolve(e(() => n.apply(this, t), { fn: n, thisArg: this, args: t })).then(r).catch(v);
    });
  }
  return o;
}
function ce(e, n = {}) {
  let o, t, r = M;
  const v = (s) => {
    clearTimeout(s), r(), r = M;
  };
  return (s) => {
    const a = S(e), c = S(n.maxWait);
    return o && v(o), a <= 0 || c !== void 0 && c <= 0 ? (t && (v(t), t = null), Promise.resolve(s())) : new Promise((l, d) => {
      r = n.rejectOnCancel ? d : l, c && !t && (t = setTimeout(() => {
        o && v(o), t = null, l(s());
      }, c)), o = setTimeout(() => {
        t && v(t), t = null, l(s());
      }, a);
    });
  };
}
function fe(e, n = !0, o = !0, t = !1) {
  let r = 0, v, u = !0, s = M, a;
  const c = () => {
    v && (clearTimeout(v), v = void 0, s(), s = M);
  };
  return (d) => {
    const f = S(e), m = Date.now() - r, g = () => a = d();
    return c(), f <= 0 ? (r = Date.now(), g()) : (m > f && (o || !u) ? (r = Date.now(), g()) : n && (a = new Promise((p, h) => {
      s = t ? h : p, v = setTimeout(() => {
        r = Date.now(), u = !0, p(g()), c();
      }, Math.max(0, f - m));
    })), !o && !v && (v = setTimeout(() => u = !0, f)), u = !1, a);
  };
}
function P(e, n = 200, o = {}) {
  return K(
    ce(n, o),
    e
  );
}
function X(e, n = 200, o = {}) {
  const t = y(e.value), r = P(() => {
    t.value = e.value;
  }, n, o);
  return R(e, () => r()), t;
}
function de(e, n = 200, o = !1, t = !0, r = !1) {
  return K(
    fe(n, o, t, r),
    e
  );
}
function ve(e, n = !0) {
  q() ? I(e) : n ? e() : ee(e);
}
function O(e) {
  var n;
  const o = S(e);
  return (n = o == null ? void 0 : o.$el) != null ? n : o;
}
const B = ae ? window : void 0;
function $(...e) {
  let n, o, t, r;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([o, t, r] = e, n = B) : [n, o, t, r] = e, !n)
    return M;
  Array.isArray(o) || (o = [o]), Array.isArray(t) || (t = [t]);
  const v = [], u = () => {
    v.forEach((l) => l()), v.length = 0;
  }, s = (l, d, f, m) => (l.addEventListener(d, f, m), () => l.removeEventListener(d, f, m)), a = R(
    () => [O(n), S(r)],
    ([l, d]) => {
      u(), l && v.push(
        ...o.flatMap((f) => t.map((m) => s(l, f, m, d)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    a(), u();
  };
  return J(c), c;
}
function me() {
  const e = y(!1);
  return q() && I(() => {
    e.value = !0;
  }), e;
}
function pe(e) {
  const n = me();
  return _(() => (n.value, !!e()));
}
var G = Object.getOwnPropertySymbols, he = Object.prototype.hasOwnProperty, be = Object.prototype.propertyIsEnumerable, ge = (e, n) => {
  var o = {};
  for (var t in e)
    he.call(e, t) && n.indexOf(t) < 0 && (o[t] = e[t]);
  if (e != null && G)
    for (var t of G(e))
      n.indexOf(t) < 0 && be.call(e, t) && (o[t] = e[t]);
  return o;
};
function Q(e, n, o = {}) {
  const t = o, { window: r = B } = t, v = ge(t, ["window"]);
  let u;
  const s = pe(() => r && "ResizeObserver" in r), a = () => {
    u && (u.disconnect(), u = void 0);
  }, c = _(
    () => Array.isArray(e) ? e.map((f) => O(f)) : [O(e)]
  ), l = R(
    c,
    (f) => {
      if (a(), s.value && r) {
        u = new ResizeObserver(n);
        for (const m of f)
          m && u.observe(m, v);
      }
    },
    { immediate: !0, flush: "post", deep: !0 }
  ), d = () => {
    a(), l();
  };
  return J(d), {
    isSupported: s,
    stop: d
  };
}
function we(e, n = {}) {
  const {
    reset: o = !0,
    windowResize: t = !0,
    windowScroll: r = !0,
    immediate: v = !0
  } = n, u = y(0), s = y(0), a = y(0), c = y(0), l = y(0), d = y(0), f = y(0), m = y(0);
  function g() {
    const p = O(e);
    if (!p) {
      o && (u.value = 0, s.value = 0, a.value = 0, c.value = 0, l.value = 0, d.value = 0, f.value = 0, m.value = 0);
      return;
    }
    const h = p.getBoundingClientRect();
    u.value = h.height, s.value = h.bottom, a.value = h.left, c.value = h.right, l.value = h.top, d.value = h.width, f.value = h.x, m.value = h.y;
  }
  return Q(e, g), R(() => O(e), (p) => !p && g()), r && $("scroll", g, { capture: !0, passive: !0 }), t && $("resize", g, { passive: !0 }), ve(() => {
    v && g();
  }), {
    height: u,
    bottom: s,
    left: a,
    right: c,
    top: l,
    width: d,
    x: f,
    y: m,
    update: g
  };
}
function ye(e, n = { width: 0, height: 0 }, o = {}) {
  const { window: t = B, box: r = "content-box" } = o, v = _(() => {
    var a, c;
    return (c = (a = O(e)) == null ? void 0 : a.namespaceURI) == null ? void 0 : c.includes("svg");
  }), u = y(n.width), s = y(n.height);
  return Q(
    e,
    ([a]) => {
      const c = r === "border-box" ? a.borderBoxSize : r === "content-box" ? a.contentBoxSize : a.devicePixelContentBoxSize;
      if (t && v.value) {
        const l = O(e);
        if (l) {
          const d = t.getComputedStyle(l);
          u.value = Number.parseFloat(d.width), s.value = Number.parseFloat(d.height);
        }
      } else if (c) {
        const l = Array.isArray(c) ? c : [c];
        u.value = l.reduce((d, { inlineSize: f }) => d + f, 0), s.value = l.reduce((d, { blockSize: f }) => d + f, 0);
      } else
        u.value = a.contentRect.width, s.value = a.contentRect.height;
    },
    o
  ), R(
    () => O(e),
    (a) => {
      u.value = a ? n.width : 0, s.value = a ? n.height : 0;
    }
  ), {
    width: u,
    height: s
  };
}
const U = 1;
function xe(e, n = {}) {
  const {
    throttle: o = 0,
    idle: t = 200,
    onStop: r = M,
    onScroll: v = M,
    offset: u = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventListenerOptions: s = {
      capture: !1,
      passive: !0
    },
    behavior: a = "auto"
  } = n, c = y(0), l = y(0), d = _({
    get() {
      return c.value;
    },
    set(i) {
      m(i, void 0);
    }
  }), f = _({
    get() {
      return l.value;
    },
    set(i) {
      m(void 0, i);
    }
  });
  function m(i, b) {
    var D, C, E;
    const A = S(e);
    A && ((E = A instanceof Document ? document.body : A) == null || E.scrollTo({
      top: (D = S(b)) != null ? D : f.value,
      left: (C = S(i)) != null ? C : d.value,
      behavior: S(a)
    }));
  }
  const g = y(!1), p = j({
    left: !0,
    right: !1,
    top: !0,
    bottom: !1
  }), h = j({
    left: !1,
    right: !1,
    top: !1,
    bottom: !1
  }), L = (i) => {
    g.value && (g.value = !1, h.left = !1, h.right = !1, h.top = !1, h.bottom = !1, r(i));
  }, w = P(L, o + t), T = (i) => {
    const b = i === window ? i.document.documentElement : i === document ? i.documentElement : i, { display: D, flexDirection: C } = getComputedStyle(b), E = b.scrollLeft;
    h.left = E < c.value, h.right = E > c.value;
    const A = Math.abs(E) <= 0 + (u.left || 0), F = Math.abs(E) + b.clientWidth >= b.scrollWidth - (u.right || 0) - U;
    D === "flex" && C === "row-reverse" ? (p.left = F, p.right = A) : (p.left = A, p.right = F), c.value = E;
    let W = b.scrollTop;
    i === document && !W && (W = document.body.scrollTop), h.top = W < l.value, h.bottom = W > l.value;
    const k = Math.abs(W) <= 0 + (u.top || 0), V = Math.abs(W) + b.clientHeight >= b.scrollHeight - (u.bottom || 0) - U;
    D === "flex" && C === "column-reverse" ? (p.top = V, p.bottom = k) : (p.top = k, p.bottom = V), l.value = W;
  }, x = (i) => {
    const b = i.target === document ? i.target.documentElement : i.target;
    T(b), g.value = !0, w(i), v(i);
  };
  return $(
    e,
    "scroll",
    o ? de(x, o, !0, !1) : x,
    s
  ), $(
    e,
    "scrollend",
    L,
    s
  ), {
    x: d,
    y: f,
    isScrolling: g,
    arrivedState: p,
    directions: h,
    measure() {
      const i = S(e);
      i && T(i);
    }
  };
}
const Y = /* @__PURE__ */ ne({
  name: "VirtualWaterfall",
  __name: "virtual-waterfall",
  props: {
    key: { default: "id" },
    gap: { default: 15 },
    preloadScreenCount: { default: 1 },
    bottomDistance: { default: 2e3 },
    itemMinWidth: { default: 240 },
    loading: { type: Boolean, default: !1 },
    items: { default: () => [] },
    calcItemHeight: { type: Function, default: (e, n) => 0 }
  },
  emits: ["load-more"],
  setup(e, { expose: n, emit: o }) {
    const t = e;
    re();
    const r = y(), { y: v } = xe(r), u = P(
      () => {
        t.loading || s.value.offsetHeight - v.value - r.value.clientHeight < t.bottomDistance && o("load-more");
      },
      100,
      { maxWait: 500 }
    );
    I(() => {
      var w;
      (w = r.value) == null || w.addEventListener("scroll", u);
    });
    const s = y(), { width: a } = ye(s), { top: c } = we(s), l = X(a, 200, { maxWait: 400 }), d = X(c, 200, { maxWait: 400 }), f = _(() => {
      if (!l.value)
        return 0;
      const w = l.value + t.gap * 2;
      return w >= t.itemMinWidth * 2 ? Math.ceil(w / t.itemMinWidth) : 2;
    }), m = y(new Array(f.value).fill(0)), g = _(() => !l.value || f.value <= 0 ? 0 : (l.value - (f.value - 1) * t.gap) / f.value), p = _(() => {
      if (!l.value)
        return [];
      m.value = new Array(f.value).fill(0);
      const w = t.items.length, T = [];
      for (let x = 0; x < w; x++) {
        const i = L(), b = {
          item: t.items[x],
          column: i,
          top: m.value[i],
          left: (g.value + t.gap) * i,
          height: t.calcItemHeight(t.items[x], g.value)
        };
        m.value[i] += t.calcItemHeight(t.items[x], g.value) + t.gap, T.push(b);
      }
      return T;
    }), h = _(() => {
      const w = p.value.length;
      if (!w)
        return [];
      const T = -d.value - t.preloadScreenCount * window.innerHeight, x = -d.value + (t.preloadScreenCount + 1) * window.innerHeight, i = [];
      for (let b = 0; b < w; b++)
        p.value[b].top > T && p.value[b].top < x && i.push(p.value[b]);
      return i;
    }), L = () => m.value.indexOf(Math.min(...m.value));
    return n({
      backTop() {
        var w;
        (w = r.value) == null || w.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }), (w, T) => (z(), H("div", {
      ref_key: "container",
      ref: r,
      style: { width: "100%", height: "100%", overflow: "auto", "scroll-behavior": "smooth" }
    }, [
      le("div", {
        ref_key: "content",
        ref: s,
        style: N({
          position: "relative",
          height: `${Math.max(...m.value) + t.gap}px`,
          padding: `${w.gap}px`,
          boxSizing: "border-box",
          width: "100%",
          willChange: "height"
        })
      }, [
        (z(!0), H(ie, null, se(h.value, (x, i) => {
          var b;
          return z(), H("div", {
            key: (b = x.item[w.key]) != null ? b : i,
            style: N({
              position: "absolute",
              width: `${g.value}px`,
              height: `${x.height}px`,
              transform: `translate(${x.left}px, ${x.top}px)`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              contentVisibility: "auto",
              containIntrinsicSize: `${x.height}px`
            })
          }, [
            ue(w.$slots, "default", {
              item: x.item,
              index: i
            })
          ], 4);
        }), 128))
      ], 4)
    ], 512));
  }
}), Se = (e) => {
  e.component(Y.name, Y);
}, Te = {
  install: Se
};
export {
  Y as VirtualWaterfall,
  Te as default
};

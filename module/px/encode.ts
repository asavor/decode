// @ts-nocheck

const Ev = (t, e, n) => {
  for (var r = ie(encode(n), 10), o = [], a = -1, i = 0; i < t.length; i++) {
    var l = Math.floor(i / r.length + 1),
      c = i >= r.length ? i % r.length : i,
      u = r.charCodeAt(c) * r.charCodeAt(l)
    u > a && (a = u)
  }
  for (var f = 0; t.length > f; f++) {
    var s = Math.floor(f / r.length) + 1,
      d = f % r.length,
      p = r.charCodeAt(d) * r.charCodeAt(s)
    for (p >= e && (p = wv(p, 0, a, 0, e - 1)); -1 !== o.indexOf(p); ) p += 1
    o.push(p)
  }

  return o.sort(function (t, e) {
    return t - e
  })
}
const encode = (t: string) => {
  return Buffer.from(
    encodeURIComponent(t).replace(
      /%([0-9A-F]{2})/g,
      function (_t, e) {
        return String.fromCharCode('0x' + e)
      }.toString('base64')
    )
  )
}

const ie = (t, e) => {
  for (var n = '', r = 0; r < t.length; r++)
    n += String.fromCharCode(e ^ t.charCodeAt(r))

  return n
}

const wv = (t, e, n, r, o) => {
  return Math.floor(((t - e) / (n - e)) * (o - r) + r)
}

const Fa = (t, e, n) => {
  for (var r = '', o = 0, a = t.split(''), i = 0; i < t.length; i++)
    (r += e.substring(o, n[i] - i - 1) + a[i]), (o = n[i] - i - 1)

  return (r += e.substring(o))
}

export default function obfuscatePayload(
  payload: string,
  uuid: string,
  sts: string
) {
  var sts = sts.length === 0 ? '1604064986000' : sts

  const BasePayload = encode(ie(payload, 50))

  const fv = ie(encode(sts), 10)

  return Fa(fv, BasePayload, Ev(fv, BasePayload.length, uuid))
}

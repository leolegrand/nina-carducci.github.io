export const createSlider = (e) => {
  const t = document.body.querySelector('#slider'),
    n = document.body.querySelector('#indicators'),
    r = document.body.querySelector('#slides')
  let o,
    a = 1
  e.map((t) => {
    ;(r.innerHTML += `<img width="410" height="190"\n    srcset="${t.imageUrl}?w=320 320w, ${t.imageUrl}?w=450 450w ${t.imageUrl}?w=640 640w, ${t.imageUrl}?w=1024 1024w, ${t.imageUrl}?w=1920 1920w"\n        src="${t.imageUrl}?w=1920"\n        alt="${t.altText}"\n        class="slide"\n      />`),
      (n.innerHTML += `<button class="indicator" aria-label="Go to slide ${
        e.indexOf(t) + 1
      }" data-number="${e.indexOf(t) + 1}" tabindex="2"></button>`)
  })
  const d = () => {
    clearInterval(o),
      (o = setInterval(() => {
        m()
      }, 5e3))
  }
  t.addEventListener('mouseenter', () => clearInterval(o)),
    t.addEventListener('mouseleave', d),
    d()
  const l = document.body.querySelectorAll('.slide'),
    s = l[0].cloneNode(!0)
  r.append(s)
  const i = l[l.length - 1].cloneNode(!0)
  r.prepend(i)
  const c = document.body.querySelectorAll('.slide'),
    u = document.body.querySelectorAll('.slider button')
  c.forEach((e) => {
    e.addEventListener(
      'transitionend',
      () => (
        u.forEach((e) => (e.disabled = !1)),
        a === c.length - 1
          ? ((a = 1),
            v(a),
            void c.forEach((e) => {
              ;(e.style.transition = 'none'),
                (e.style.transform = `translateX(-${a}00%)`)
            }))
          : 0 === a
          ? ((a = c.length - 2),
            v(a),
            void c.forEach((e) => {
              ;(e.style.transition = 'none'),
                (e.style.transform = `translateX(-${a}00%)`)
            }))
          : void 0
      )
    )
  })
  const m = () => {
      a++, b(a)
    },
    y = document.body.querySelectorAll('.indicator'),
    b = (e) => {
      e > 4 && ((e = 1), (a = 1), d()),
        u.forEach((e) => (e.disabled = !0)),
        c.forEach((t) => {
          ;(t.style.transition = '750ms ease-in-out'),
            (t.style.transform = `translateX(-${e}00%)`)
        }),
        v(e)
    },
    v = (e) => {
      y.forEach((t) => {
        t.dataset.number == e
          ? t.classList.add('indicator--active')
          : t.classList.remove('indicator--active')
      })
    }
  y.forEach((e) => {
    const t = e.dataset.number
    e.addEventListener('click', () => {
      b(t), u.forEach((e) => (e.disabled = !1))
    })
  })
  document.body.querySelector('#slider-next').addEventListener('click', m)
  document.body.querySelector('#slider-prev').addEventListener('click', () => {
    a--, b(a)
  }),
    v(1)
}

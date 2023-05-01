import { informations as e } from './modules/informations.js'
import { createGallery as t } from './modules/gallery.js'
import { createServices as r } from './modules/services.js'
import { createSlider as o } from './modules/slider.js'
;(async () => {
  let i = `https://v1vbd0i1.api.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(
    "{\n    'profil': *[_type == 'profil'][0]\n    {\"profilePicture\": profilePicture.asset->url, profilePictureAltText, aboutText1, aboutText2, quote1, quoteAuthor1, quote2, quoteAuthor2, \"formPicture\": formPicture.asset->url, formPictureAltText },\n    'services': *[_type == 'services']\n      {title, body, price, info},\n    'gallery': *[_type == 'gallery']\n    {title, tag, altText, \"imageUrl\": image.asset->url},\n    'slider': *[_type == 'slider']\n    {title, altText, \"imageUrl\": image.asset->url}\n  }"
  )}`
  try {
    const l = await fetch(i),
      s = await l.json(),
      { services: a, profil: u, gallery: m, slider: n } = s.result
    r(a), e(u), t(m), o(n)
  } catch (e) {
    console.log(e)
  }
})()

import { informations } from './modules/informations.js'
import { createGallery } from './modules/gallery.js'
import { createServices } from './modules/services.js'
import { createSlider } from './modules/slider.js'

const init = async () => {
  // Sanity.io,
  // Project settings
  let PROJECT_ID = 'v1vbd0i1'
  let DATASET = 'production'

  // GROQ query to select what we want from our API
  let QUERY = encodeURIComponent(`{
    'profil': *[_type == 'profil'][0]
    {"profilePicture": profilePicture.asset->url, profilePictureAltText, aboutText1, aboutText2, quote1, quoteAuthor1, quote2, quoteAuthor2, "formPicture": formPicture.asset->url, formPictureAltText },
    'services': *[_type == 'services']
      {title, body, price, info},
    'gallery': *[_type == 'gallery']
    {title, tag, altText, "imageUrl": image.asset->url},
    'slider': *[_type == 'slider']
    {title, altText, "imageUrl": image.asset->url}
  }`)

  // Compose the URL for the project's endpoint and add the query
  let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`

  try {
    const query = await fetch(PROJECT_URL)
    const response = await query.json()
    const { services, profil, gallery, slider } = response.result
    createServices(services)
    informations(profil)
    createGallery(gallery)
    createSlider(slider)
  } catch (error) {
    console.log(error)
  }
}

init()

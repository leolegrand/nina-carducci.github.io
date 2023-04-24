export const createSlider = (slider) => {
  const DOMSlides = document.body.querySelector('#slides')

  slider.map((slide) => {
    DOMSlides.innerHTML += `<img
        src="${slide.imageUrl}"
        alt="${slide.altText}"
        class="slide"
      />`
  })

  const slides = document.body.querySelectorAll('.slide')

  const firstClone = slides[0].cloneNode(true)
  const lastClone = slides[slides.length - 1].cloneNode(true)

  DOMSlides.prepend(lastClone)
  DOMSlides.append(firstClone)
}

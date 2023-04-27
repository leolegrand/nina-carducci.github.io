export const createSlider = (slider) => {
  const DOMSlider = document.body.querySelector('#slider')
  const DOMIndicators = document.body.querySelector('#indicators')
  const DOMSlides = document.body.querySelector('#slides')

  let index = 1

  slider.map((slide) => {
    DOMSlides.innerHTML += `<img
    srcset="${slide.imageUrl}?w=320 320w, ${slide.imageUrl}?w=640 640w, ${slide.imageUrl}?w=1024 1024w, ${slide.imageUrl}?w=1920 1920w"
        src="${slide.imageUrl}?w=1920"
        alt="${slide.altText}"
        class="slide"
      />`
    DOMIndicators.innerHTML += `<button class="indicator" data-number="${
      slider.indexOf(slide) + 1
    }"></button>`
  })

  const slides = document.body.querySelectorAll('.slide')

  // clone the first image and place it at the end,
  // clone the last image and place it at the beginning,
  // this will create an infinite scroll effect later
  const firstClone = slides[0].cloneNode(true)
  DOMSlides.append(firstClone)
  const lastClone = slides[slides.length - 1].cloneNode(true)
  DOMSlides.prepend(lastClone)

  // all slides, including the cloned ones
  const currentSlides = document.body.querySelectorAll('.slide')

  // since the slide is "infinite", when the user arrives on a duplicated image,
  // we take the index back to the original image
  currentSlides.forEach((slide) => {
    slide.addEventListener('transitionend', () => {
      if (index === currentSlides.length - 1) {
        index = 1
        currentSlides.forEach((slide) => {
          slide.style.transition = 'none'
          slide.style.transform = `translateX(-${index}00%)`
        })
        changeIndicator(index)
        return
      }
      if (index === 0) {
        index = currentSlides.length - 2
        currentSlides.forEach((slide) => {
          slide.style.transition = 'none'
          slide.style.transform = `translateX(-${index}00%)`
        })
        changeIndicator(index)
        return
      }
    })
  })

  const nextSlide = () => {
    if (index >= currentSlides.length - 1) {
      index = 1
    } else {
      index++
    }
    moveToSlide(index)
  }

  const prevSlide = () => {
    if (index < 0) {
      index = 1
    } else {
      index--
    }
    moveToSlide(index)
  }

  const indicators = document.body.querySelectorAll('.indicator')

  const moveToSlide = (number) => {
    currentSlides.forEach((slide) => {
      slide.style.transition = '750ms ease-in-out'
      slide.style.transform = `translateX(-${number}00%)`
    })
    changeIndicator(number)
  }

  // change the indicator based on an index
  const changeIndicator = (number) => {
    indicators.forEach((indicator) => {
      indicator.dataset.number == number
        ? indicator.classList.add('indicator--active')
        : indicator.classList.remove('indicator--active')
    })
  }

  // scroll through the slides at regular intervals
  let sliderTimer

  const startSlide = () => {
    sliderTimer = setInterval(() => {
      nextSlide()
    }, 5000)
  }

  // for each indicator button, on click, scroll to selected slide
  indicators.forEach((indicator) => {
    const indicatorNumber = indicator.dataset.number
    indicator.addEventListener('click', () => moveToSlide(indicatorNumber))
  })

  // stops scrolling if the user hovers their mouse over the slider
  DOMSlider.addEventListener('mouseenter', () => clearInterval(sliderTimer))
  // // resumes scrolling if the user is no longer on the slider
  DOMSlider.addEventListener('mouseleave', startSlide)

  // two buttons to go to the next or previous element in the slider
  const DOMButtonNext = document.body.querySelector('#slider-next')
  DOMButtonNext.addEventListener('click', nextSlide)

  const DOMButtonPrev = document.body.querySelector('#slider-prev')
  DOMButtonPrev.addEventListener('click', prevSlide)

  // watch indicator's state
  changeIndicator(index)

  // start the slideshow
  startSlide()
}

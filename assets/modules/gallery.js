// AU CLIC SUR UN ELEMENT, L'OUVRE DANS UNE LIGHTBOX
export const createGallery = (gallery) => {
  const DOMTags = document.body.querySelector('#tags')
  const DOMGallery = document.body.querySelector('#gallery')
  const tags = []

  gallery.map((image) => {
    // Remove the tags that are duplicates then create a button for each of them
    if (tags.indexOf(image.tag) === -1) {
      tags.push(image.tag)
      DOMTags.innerHTML += `<li><button>${image.tag}</button></li>`
    }
    DOMGallery.innerHTML = ''
    DOMGallery.innerHTML += `<img width="600" height="600" srcset="${image.imageUrl}?w=360 320w, ${image.imageUrl}?w=575 640w, ${image.imageUrl}?w=900 1024w" src="${image.imageUrl}?w=900"  alt="${image.altText}" data-tag="${image.tag}">`
  })

  const DOMTagsButton = document.body.querySelectorAll('#tags button')
  const DOMGalleryItems = document.body.querySelectorAll('#gallery img')

  DOMTagsButton.forEach((button) => {
    button.addEventListener('click', () => {
      // Display every item on the gallery
      if (button.innerHTML === 'Tous') {
        removeActiveTagClass()
        button.classList.add('active-tag')
        removeHiddenClass()
        return
      }
      // Display filtered items
      DOMGalleryItems.forEach((item) => {
        if (item.dataset.tag === button.innerHTML) {
          removeActiveTagClass()
          button.classList.add('active-tag')
          item.classList.remove('hidden')
        } else {
          item.classList.add('hidden')
        }
      })
    })
  })

  const removeActiveTagClass = () => {
    const activeTags = document.body.querySelectorAll('.active-tag')
    activeTags.forEach((element) => element.classList.remove('active-tag'))
  }

  const removeHiddenClass = () => {
    const hidden = document.body.querySelectorAll('.hidden')
    hidden.forEach((element) => element.classList.remove('hidden'))
  }

  DOMGalleryItems.forEach((item) => {
    item.addEventListener('click', () => createLightbox(item))
  })

  const createLightbox = (item) => {
    // prevent the user scroll
    document.body.style.height = '100vh'
    document.body.style.overflowY = 'hidden'

    // create the modal window from the clicked element then insert it in the DOM

    const chevron = `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg  width="5vw" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
         viewBox="0 0 185.343 185.343" xml:space="preserve">
    <g>
        <g>
            <path style="fill:#010002;" d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175
                l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934
                c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"/>
        </g>
    </g>
    </svg>`

    const dialog = document.createElement('dialog')
    dialog.classList.add('lightbox')

    const prevButton = document.createElement('button')
    prevButton.classList.add('lightbox__button', 'lightbox__button--prev')

    const nextButton = document.createElement('button')
    nextButton.classList.add('lightbox__button', 'lightbox__button--next')

    const spanNext = document.createElement('span')
    spanNext.innerHTML = chevron

    const spanPrev = document.createElement('span')
    spanPrev.innerHTML = chevron

    prevButton.appendChild(spanPrev)
    nextButton.appendChild(spanNext)

    const img = document.createElement('img')
    img.src = item.src
    img.alt = item.alt

    dialog.appendChild(img)
    dialog.appendChild(prevButton)
    dialog.appendChild(nextButton)

    document.body.appendChild(dialog)
    dialog.showModal()

    // convert NodeList into an Array then find index of current displayed item
    const arrayOfGalleryItems = Array.from(DOMGalleryItems)
    let index = arrayOfGalleryItems.indexOf(item)

    // lightbox control, go to the previous item
    const lightboxPrev = () => {
      index--
      if (index < 0) {
        index = arrayOfGalleryItems.length - 1
      }
      img.src = arrayOfGalleryItems[index].src
      img.alt = arrayOfGalleryItems[index].alt
    }

    // lightbox control, go to the next item
    const lightboxNext = () => {
      index++
      if (index >= arrayOfGalleryItems.length) {
        index = 0
      }
      img.src = arrayOfGalleryItems[index].src
      img.alt = arrayOfGalleryItems[index].alt
    }

    prevButton.addEventListener('click', lightboxPrev)
    nextButton.addEventListener('click', lightboxNext)

    // handle lightbox control with arrow keys
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        lightboxNext()
      } else if (e.key === 'ArrowLeft') {
        lightboxPrev()
      }
    })

    const closeDialog = (dialog) => {
      dialog.classList.add('lightbox-close')
      // a timeout is needed to see the disappearing animation
      setTimeout(() => {
        dialog.close()
        dialog.remove()
      }, 300)

      // let the user scroll
      document.body.style.height = ''
      document.body.style.overflowY = ''
    }

    // change the behaviour of native close modal on escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeDialog(dialog)
      }
    })

    // close the modal on click on the ::backdrop
    // maybe add a close icon in future ?
    dialog.addEventListener('click', function (event) {
      // compare dialog element position & user click event position
      let rect = dialog.getBoundingClientRect()
      let isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      if (!isInDialog) {
        closeDialog(dialog)
      }
    })
  }
}

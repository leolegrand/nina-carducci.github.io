export const informations = (userInformations) => {
  // Profile picture
  const DOMProfilePicture = document.body.querySelector('#profile-picture')

  DOMProfilePicture.src = userInformations.profilePicture
  DOMProfilePicture.srcset = `${userInformations.profilePicture}?w320 320w, ${userInformations.profilePicture}?w640 640w, ${userInformations.profilePicture}?w1024 1024w, ${userInformations.profilePicture}?w1920 1920w`
  DOMProfilePicture.alt = userInformations.profilePictureAltText

  // About me
  const DOMAboutText1 = document.body.querySelector('#about-text-1')
  DOMAboutText1.innerHTML = userInformations.aboutText1

  const DOMAboutText2 = document.body.querySelector('#about-text-2')
  DOMAboutText2.innerHTML = userInformations.aboutText2

  // Quote
  const DOMQuote1 = document.body.querySelector('#quote-1')
  DOMQuote1.innerHTML = userInformations.quote1

  const DOMQuoteAuthor1 = document.body.querySelector('#quote-1-author')
  DOMQuoteAuthor1.innerHTML = userInformations.quoteAuthor1

  const DOMQuote2 = document.body.querySelector('#quote-2')
  DOMQuote2.innerHTML = userInformations.quote2

  const DOMQuoteAuthor2 = document.body.querySelector('#quote-2-author')
  DOMQuoteAuthor2.innerHTML = userInformations.quoteAuthor2

  // Form picture
  const DOMFormPicture = document.body.querySelector('#form-picture')

  DOMFormPicture.src = userInformations.formPicture
  DOMFormPicture.srcset = `${userInformations.formPicture}?w320 320w, ${userInformations.formPicture}?w640 640w, ${userInformations.formPicture}?w1024 1024w, ${userInformations.formPicture}?w1920 1920w`
  DOMFormPicture.alt = userInformations.formPictureAltText
}

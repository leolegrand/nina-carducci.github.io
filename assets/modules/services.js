export const createServices = (services) => {
  const DOMServices = document.body.querySelector('#services-container')

  services.map((service) => {
    DOMServices.innerHTML += `<div class="service">
    <div class="service__description" tabindex="6">
      <h3>${service.title}</h3>
      <p>
        ${service.body}
      </p>
    </div>
    <div class="service__price">
      <p tabindex="6">${service.price}</p>
      <span tabindex="6">${service.info}</span>
    </div>
  </div>`
  })
}

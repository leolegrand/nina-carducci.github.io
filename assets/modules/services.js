export const createServices = (services) => {
  const DOMServices = document.body.querySelector('#services-container')

  services.map((service) => {
    DOMServices.innerHTML += `<div class="service">
    <div class="service__description">
      <h3>${service.title}</h3>
      <p>
        ${service.body}
      </p>
    </div>
    <div class="service__price">
      <p>${service.price}</p>
      <span>${service.info}</span>
    </div>
  </div>`
  })
}

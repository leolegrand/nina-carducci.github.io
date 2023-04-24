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
      <h4>${service.price}</h4>
      <span>${service.info}</span>
    </div>
  </div>`
  })
}

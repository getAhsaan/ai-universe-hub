const getToolsData = () => {
    fetch(' https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showToolsData(data.data.tools))
};
getToolsData();

const showToolsData = (data) => {
    // console.log(data);
    data.forEach(toolData => {
        // console.log(toolData);
        const { image, features, name, published_in: date, id } = toolData;
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML += `
         <div class="col-12 col-md-6 col-lg-4 mb-4">
                        <div class="card">
                            <img src="${image}" class="card-img-top img-fluid"
                                style="width: 437px; height: 300px;" alt="...">
                            <div class="card-body">
                                <h4>Features</h4>
                                <ol class="list list-numbered">
                                ${features.map(f => `<li class="list-item">${f}</li>`).join(' ')}
                                </ol>
                                <hr>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>${name}</h4>
                                        <i class="fa-regular fa-calendar"></i> <span>${date}</span>
                                    </div>
                                    <div>
                                        <i onclick="getModalData('${id}')" type="button" data-bs-toggle="modal"
                                         data-bs-target="#universeModal"
                                         class="fa-solid fa-arrow-right bg-danger bg-opacity-10 
                                         btn text-danger rounded-circle p-2">
                                         </i>

                                    </div>
                                </div>
                            </div>

                           
                        </div>
                    </div>
    `
    });
}

const getModalData = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json())
        .then(data => showModalData(data.data))
}
const showModalData = (modalData) => {
    // console.log(modalData);

    const { description, features, pricing, integrations, image_link, input_output_examples } = modalData;
   
    // for modal description
    document.getElementById('modal-description').innerHTML = description;
    // for modal pricing
    document.getElementById('price-1').innerHTML = pricing[0].price + ' ' + pricing[0].plan;
    document.getElementById('price-2').innerHTML = pricing[1].price + ' ' + pricing[1].plan;
    document.getElementById('price-3').innerHTML = pricing[2].price + ' ' + pricing[2].plan;
    // for modal feature
    document.getElementById('modal-feature-container').innerHTML = `

    `
    // for modal integrations 
    document.getElementById('modal-integrations-container').innerHTML = `
         ${integrations.map(i => `<li class="list-item">${i}</li>`).join('')}
    `
    // for modal image and input, output
    document.getElementById('modal right-container').innerHTML =  `
        <img src="${image_link[0]}" style="width: 437px; height: 250px;"
          class="img-fluid rounded" alt="">
          <h5 class="text-center mt-4">${input_output_examples[0].input}</h5>
          <p class="text-center">${input_output_examples[0].output}</p>
          <span class="text-white bg-danger bg-opacity-75 rounded-pill me-3 mt-3 px-2 py-1 position-absolute top-0 end-0">94%
           accuracy</span>
    `
}
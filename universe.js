const getToolsData = (showMore) => {
    fetch(' https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showToolsData(data.data.tools, showMore))
};

const showToolsData = (data, showMore) => {
    // console.log(data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    let setShowingData;
    if (showMore) {
        setShowingData = data.slice(0, data.length);
    } else {
        setShowingData = data.slice(0, 6);
    }
    setShowingData.forEach(toolData => {
        // console.log(toolData);
        const { image, features, name, published_in: date, id } = toolData;
        cardContainer.innerHTML += `
         <div id="toolCard" class="col-12 col-md-6 col-lg-4 mb-4">
                        <div class="card">
                            <img src="${image}" class="card-img-top img-fluid w-100"
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
                                        <i class="fa-regular fa-calendar"></i> <span id="toolDate">${date}</span>
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
    showLoader(false);
}

const getModalData = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json())
        .then(data => showModalData(data.data))
}
const showModalData = (modalData) => {
    console.log(modalData);

    const { description, features, pricing, integrations, image_link, input_output_examples, accuracy } = modalData;
    // for modal description
    document.getElementById('modal-description').innerHTML = description;
    // for modal pricing
    document.getElementById('price-1').innerHTML = `${pricing ? pricing[0].price !== '0' && pricing[0].price !== 'No cost' ? pricing[0].price : 'Free Of Cost/' : 'Free of Cost/'} ${pricing ? pricing[0].plan : 'Basic'}`;

    document.getElementById('price-2').innerHTML = `${pricing ? pricing[1].price !== '0' && pricing[0].price !== 'No cost' ? pricing[1].price : 'Free Of Cost/' : 'Free of Cost/'} ${pricing ? pricing[1].plan : 'Pro'}`;

    document.getElementById('price-3').innerHTML = `${pricing ? pricing[2].price !== '0' && pricing[0].price !== 'No cost' ? pricing[2].price : 'Free Of Cost/' : 'Free of Cost/'} ${pricing ? pricing[2].plan : 'Enterprise'}`;

    // document.getElementById('price-2').innerHTML = `${pricing ? pricing[1].price : 'Free Of Cost/'} ${pricing ? pricing[1].plan : 'Pro'}`;
    // document.getElementById('price-3').innerHTML = `${pricing ? pricing[2].price : 'Free of Cost /'} ${pricing ? pricing[2].plan : 'Enterprise'}`;
    // for modal feature
    const fName = [];
    for (const f in features) {
        fName.push(features[f].feature_name)
    }
    document.getElementById('modal-feature-container').innerHTML = `
    ${fName.map(f => `<li class="list-item">${f}</li>`).join(' ')}
    `
    // for modal integrations 
    document.getElementById('modal-integrations-container').innerHTML = `
         ${integrations ? integrations.map(i => `<li class="list-item">${i}</li>`).join('') : 'No data Found'}
    `
    // for modal image and input, output
    document.getElementById('modal right-container').innerHTML = `
        <img src="${image_link[0]}" style="width: 437px; height: 250px;"
          class="img-fluid rounded" alt="">
          <h5 class="text-center mt-4">${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}</h5>
          <p class="text-center">${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
          <span style="display:${accuracy.score === null ? 'none' : 'block'}" id="score" class="text-white bg-danger bg-opacity-75 rounded-pill me-3 mt-3 px-2 py-1 position-absolute top-0 end-0">${accuracy.score ?
            (accuracy.score).toString().slice(2, 4) :
            ''}%
           accuracy</span>
    `
}

// loader/spinner control
const showLoader = (isLoading) => {
    const loaderBtn = document.getElementById('loader-btn');
    if (isLoading) {
        loaderBtn.classList.remove('d-none');
    } else {
        loaderBtn.classList.add('d-none');
    }
}

// show more control
const handleSeeMore = () => {
    getToolsData('showAll');
    const showMoreBtn = document.getElementById('see-more-btn');
    showMoreBtn.classList.remove('d-block');
    showMoreBtn.style.display = 'none';

}
// sorting by date
let isDescending = true;
const sortingByDate = () => {
    const cards = [...document.querySelectorAll('#toolCard')];
    cards.sort((a, b) => {
        const aDate = new Date(a.querySelector('#toolDate').innerText);
        const bDate = new Date(b.querySelector('#toolDate').innerText);

        if (aDate > bDate) {
            return isDescending ? 1 : -1;
        } else if (aDate < bDate) {
            return isDescending ? -1 : 1;
        } else {
            return 0
        }
    });
    const cardContainer = document.getElementById('card-container');
    cards.forEach(card => cardContainer.appendChild(card));
    // console.log('i am clicked', cards);
    isDescending = !isDescending;

}
getToolsData();
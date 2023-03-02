
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
        const { image, features, name, published_in: date } = toolData;
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
                                        <i class="fa-solid fa-arrow-right bg-danger bg-opacity-10 btn text-danger rounded-circle p-2"></i>
                                
                                    </div>
                                </div>
                            </div>

                           
                        </div>
                    </div>
    `
    });
}
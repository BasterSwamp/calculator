const modalWindow = document.querySelector('#modal'); 

async function getResponseEl() {
  try {
    let response = await fetch('https://script.google.com/macros/s/AKfycbzYqtA0rMrNIeoUUn6HUpwB8BJFCmhsnMV79qC-rNHTVuQjzvM-gR5CC-LbabpspiiJFA/exec');
    let content = await response.json();
    content = content.elect;
    
    const mainNumber = document.querySelector('#mainNumberEl');
    const paymentNumber = document.querySelector('#paymentNumberEl');
    const consumptionVolume = document.querySelector('#inpNumEl');
    const paymentMethod = document.querySelector('#paymentMethodEl').children;
    const actualPriceID = document.querySelector('#radio4');
    const transmissionTariffID = document.querySelector('#radio5');
    const radioMPE = document.querySelector('#mpeEl');
    const mainPage = document.querySelector('#sectionEl');

    function calculate(endPrice) {
      mainNumber.textContent = Math.round(+endPrice * 100) / 100;
      let overPrice = mainNumber.textContent * consumptionVolume.value;
      paymentNumber.textContent = Math.round(overPrice); 
    }
    const arrRegion = content.map(city => city.region);
    const filterRegion = arrRegion.filter((el, i) => arrRegion.indexOf(el) === i);
    let city = document.querySelector('#cityEl');
    filterRegion.forEach(e => city.insertAdjacentHTML("beforeend", `<span class="option-item">${e}</span>`));
    const arrMonth = content.map(city => city.month);
    const filterMonth = arrMonth.filter((el, i) => arrMonth.indexOf(el) === i);
    let month = document.querySelector('#monthEl');
    filterMonth.forEach(e => month.insertAdjacentHTML("beforeend", `<span class="option-item">${e}</span>`));

    let currentPrice = "";
    function paymentMethodFunction() {
      for (const radio of [...paymentMethod]) {
        if (radio.checked) {
          const filteredArray = content.filter((region) => (region.region === city.closest('.select').querySelector('.select-current').textContent && region.month === month.closest('.select').querySelector('.select-current').textContent && region.paymentMethod === radio.value));
          if (filteredArray <= 0) {
            modalWindow.classList.add("open");
          }
          function radioMPEValue() {
            if (radioMPE.checked) {
              currentPrice = +(currentPrice.join(','))
              currentPrice = currentPrice + (currentPrice * 0.2)
            } else {
              currentPrice = +(currentPrice.join(','))
            }
          }
          if (actualPriceID.checked) {
            currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice);
            radioMPEValue()
          } else if (transmissionTariffID.checked) {
            currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice + price.transmissionTariff);
            radioMPEValue()
          } else {
            currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice + price.transmissionTariff + price.distributionTariff);
            radioMPEValue()
          }
          calculate(currentPrice);
        }
      }
    }
    
    let selectHeader = mainPage.querySelectorAll('.select-header');
    let optionItem = mainPage.querySelectorAll('.option-item');

    selectHeader.forEach(function(e) {
      e.querySelector('.select-current').innerText = e.closest('.select').querySelector('.option-body').firstElementChild.innerText;
      e.addEventListener('click', function() {
        e.parentElement.classList.toggle('active');
      });
    });

    optionItem.forEach(e => {
      e.addEventListener('click', function() {
        let text = e.innerText,
        select = e.closest('.select'),
        currentText = select.querySelector('.select-current')
        currentText.innerText = text;
        paymentMethodFunction()
        select.classList.remove('active');
      })
    }); 
    
    paymentMethodFunction();

    mainPage.addEventListener('change', () => {
      paymentMethodFunction()
    })
  } catch (e) {
    console.log(e);
  }
}
getResponseEl()

async function getResponseGas() {
  try {
    let response = await fetch('https://script.google.com/macros/s/AKfycbwIfbOJPSU_pvH8LofOyz01dxkFZWHr7iCD9YAk8kQNnQ5XQh1IOo4CplP5SaWpvccEIw/exec');
    let content = await response.json();
    content = content.gas;
    const mainNumber = document.querySelector('#mainNumberGas');
    const paymentNumber = document.querySelector('#paymentNumberGas');
    const consumptionVolume = document.querySelector('#inpNumGas');
    const paymentMethod = document.querySelector('#paymentMethodGas').children;
    const radioMPE = document.querySelector('#mpeGas');
    const mainPage = document.querySelector('#sectionGas');

    function calculate(endPrice) {
      mainNumber.textContent = Math.round(+endPrice * 100) / 100;
      let overPrice = mainNumber.textContent * consumptionVolume.value;
      paymentNumber.textContent = Math.round(overPrice);
    }    
    const arrMonth = content.map(city => city.month);
    const filterMonth = arrMonth.filter((el, i) => arrMonth.indexOf(el) === i);
    let month = document.querySelector('#monthGas');
    filterMonth.forEach(e => month.insertAdjacentHTML("beforeend", `<span class="option-item">${e}</span>`));

    let selectHeader = mainPage.querySelectorAll('.select-header');
    let optionItem = mainPage.querySelectorAll('.option-item');

    selectHeader.forEach(function(e) {
        e.querySelector('.select-current').innerText = e.closest('.select').querySelector('.option-body').firstElementChild.innerText;
        e.addEventListener('click', function() {
          e.parentElement.classList.toggle('active');
        });
    });

    optionItem.forEach(e => {
        e.addEventListener('click', function() {
          let text = e.innerText,
          select = e.closest('.select'),
          currentText = select.querySelector('.select-current')
      currentText.innerText = text;
      
      paymentMethodFunction()
      select.classList.remove('active');
        })
    });
    
    let currentPrice = "";
    function paymentMethodFunction() {
      for (const radio of [...paymentMethod]) {
        if (radio.checked) {
          const filteredArray = content.filter((region) => (region.month === month.closest('.select').querySelector('.select-current').textContent && region.paymentMethod === radio.value));
          if (filteredArray <= 0) {
            modalWindow.classList.add("open");
          }
          if (radioMPE.checked) {
            currentPrice = filteredArray.map(price => price.actualPriceVAT);
          } else {
            currentPrice = filteredArray.map(price => price.actualPrice);
          }
          currentPrice = currentPrice.join(',')
          calculate(currentPrice);
        }
      }
    }
    paymentMethodFunction();
    mainPage.addEventListener('change', () => {
      paymentMethodFunction()
    })
  } catch (e) {
    console.log(e);
  }
}
getResponseGas()

const subtitleBtn = document.querySelectorAll('.subtitle-btn');
const pageBlocks = document.querySelectorAll('.page-block');

subtitleBtn[0].classList.add('active');
pageBlocks[0].classList.add('active');

subtitleBtn.forEach((item) => {
  item.addEventListener('click', (e)=> {
    e.preventDefault();
    const id = e.target.getAttribute('href').replace('#','');

    subtitleBtn.forEach((child) => child.classList.remove('active'));
    pageBlocks.forEach((child) => child.classList.remove('active'));

    item.classList.add('active');
    document.getElementById(id).classList.add('active');
  });
});

try {
  const closeBtn = document.querySelector('#closeBtn');
  closeBtn.addEventListener("click", ()=> {
    modalWindow.classList.remove("open");
  })
  document.addEventListener('keydown', function(e) {
    if( e.keyCode == 27 ){ 
      modalWindow.classList.remove("open");
    }
  });
  document.addEventListener( 'click', (e) => {
    const withinBoundaries = e.composedPath().includes(modalWindow.querySelector('.content'));
    if ( ! withinBoundaries ) {
      modalWindow.classList.remove("open");
    }
  })
} catch (e) {
  console.log(e);
}

document.addEventListener('keydown', function(e) {
	if( e.keyCode == 27 ){ 
		document.querySelectorAll('.select').forEach(e => e.classList.remove('active'));
	}
});

const sel = document.querySelector('.select-header');
document.addEventListener('click', function(e) {
    // if (!e.composedPath().includes(sel)) {
    //   document.querySelectorAll('.select').forEach(e => e.classList.remove('active'));
    // }
});
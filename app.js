const modalWindow = document.querySelector('#modal');

async function getResponseEl() {
  try {
    let response = await fetch('https://script.google.com/macros/s/AKfycbzlMYOz_WrhWjcaL-00wdVIm-m6V5HTOwkz9RNUPRDfbCfEUxrC__cFNo3oYjctoBoP6g/exec');
    let content = await response.json();
    content = content.elect;
    const mainNumber = document.querySelector('#mainNumberEl');
    const paymentNumber = document.querySelector('#paymentNumberEl');
    const consumptionVolume = document.querySelector('#inpNumEl');
    const paymentMethod = document.querySelector('#paymentMethodEl').children;
    const actualPriceID = document.querySelector('#radio4');
    const transmissionTariffID = document.querySelector('#radio5');
    const selectMPE = document.querySelector('#mpeEl');
    const mainPage = document.querySelector('#sectionEl');

    function calculate(endPrice) {
      mainNumber.textContent = Math.round(+endPrice * 100) / 100;
      let overPrice = mainNumber.textContent * consumptionVolume.value;
      paymentNumber.textContent = Math.round(overPrice); 
    }
    const arrRegion = content.map(city => city.region);
    const filterRegion = arrRegion.filter((el, i) => arrRegion.indexOf(el) === i);
    let city = document.querySelector('#cityEl');
    filterRegion.forEach(e => city.insertAdjacentHTML("beforeend", `<option value="${e}">${e}</option>`));
    const arrMonth = content.map(city => city.month);
    const filterMonth = arrMonth.filter((el, i) => arrMonth.indexOf(el) === i);
    let month = document.querySelector('#monthEl');
    filterMonth.forEach(e => month.insertAdjacentHTML("beforeend", `<option value="${e}">${e}</option>`));

    let currentPrice = "";
    function paymentMethodFunction() {
      for (const radio of [...paymentMethod]) {
        if (radio.checked) {
          const filteredArray = content.filter((region) => (region.region === city.value && region.month === month.value && region.paymentMethod === radio.value));
          if (filteredArray <= 0) {
            modalWindow.classList.add("open");
          }
          function selectMPEValue() {
            if (selectMPE.value == "no") {
              currentPrice = +(currentPrice.join(','))
            } else {
              currentPrice = +(currentPrice.join(','))
              currentPrice = currentPrice + (currentPrice * 0.2)
            }
          }
          if (actualPriceID.checked) {
            currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice);
            selectMPEValue()
          } else if (transmissionTariffID.checked) {
            currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice + price.transmissionTariff);
            selectMPEValue()
          } else {
            currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice + price.transmissionTariff + price.distributionTariff);
            selectMPEValue()
          }
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
getResponseEl()

async function getResponseGas() {
  try {
    let response = await fetch('https://script.google.com/macros/s/AKfycbwW27ozjYWvHgHWZ5gYhCLveFSjjwE6fLGLTbdFLjSurh67-zzFewh1PqnvicUgRtxtKg/exec');
    let content = await response.json();
    content = content.users;
    const mainNumber = document.querySelector('#mainNumberGas');
    const paymentNumber = document.querySelector('#paymentNumberGas');
    const consumptionVolume = document.querySelector('#inpNumGas');
    const paymentMethod = document.querySelector('#paymentMethodGas').children;
    const selectMPE = document.querySelector('#mpeGas');
    const mainPage = document.querySelector('#sectionGas');

    function calculate(endPrice) {
      mainNumber.textContent = Math.round(+endPrice * 100) / 100;
      let overPrice = mainNumber.textContent * consumptionVolume.value;
      paymentNumber.textContent = Math.round(overPrice);
    }    
    const arrMonth = content.map(city => city.month);
    const filterMonth = arrMonth.filter((el, i) => arrMonth.indexOf(el) === i);
    let month = document.querySelector('#monthGas');
    filterMonth.forEach(e => month.insertAdjacentHTML("beforeend", `<option value="${e}">${e}</option>`));

    let currentPrice = "";
    function paymentMethodFunction() {
      for (const radio of [...paymentMethod]) {
        if (radio.checked) {
          const filteredArray = content.filter((region) => (region.month === month.value && region.paymentMethod === radio.value));
          if (filteredArray <= 0) {
            modalWindow.classList.add("open");
          }
          if (selectMPE.value == "no") {
            currentPrice = filteredArray.map(price => price.actualPrice);
          } else {
            currentPrice = filteredArray.map(price => price.actualPriceVAT);
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
  } catch (el) {
    Error
  }


//   let currentPrice = "";
//   let radioSave = "";
//   for (const radio of [...paymentMethod]) {
//     if (radio.checked) {
//       radioSave = radio.id;
//       const filteredArray = content.filter((region) => (region.region === city.value && region.month === month.value && region.paymentMethod === radio.value));
      
//       function selectMPEValue() {
//         if (selectMPE.value == "no") {
//           currentPrice = +(currentPrice.join(','))
//         } else {
//           currentPrice = +(currentPrice.join(','))
//           currentPrice = currentPrice + (currentPrice * 0.2)
//         }
//       }
//       if (actualPriceID.checked) {
//         currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice);
//         selectMPEValue()
//       } else if (transmissionTariffID.checked) {
//         currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice + price.transmissionTariff);
//         selectMPEValue()
//       } else {
//         currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice + price.transmissionTariff + price.distributionTariff);
//         selectMPEValue()
//       }
//       calculate(currentPrice);
//     }
//   }

 
//   console.log(radioSave);

//   mainPage.addEventListener('change', (event) => {
//     event.preventDefault()
//     let currentPrice = "";
//       for (const radio of paymentMethod) {
//         if (radio.checked) {
//           const filteredArray = content.filter((region) => (region.region === city.value && region.month === month.value && region.paymentMethod === radio.value));
//           if (filteredArray <= 0) {
//             modalWindow.classList.add("open");
//             return document.getElementById(radioSave).checked = true;
//           }
//           function selectMPEValue() {
//             if (selectMPE.value == "no") {
//               currentPrice = +(currentPrice.join(','))
//             } else {
//               currentPrice = +(currentPrice.join(','))
//               currentPrice = currentPrice + (currentPrice * 0.2)
//             }
//           }
//           if (actualPriceID.checked) {
//             currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice);
//             selectMPEValue()
//           } else if (transmissionTariffID.checked) {
//             currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice + price.transmissionTariff);
//             selectMPEValue()
//           } else {
//             currentPrice = filteredArray.map(price => price.supplierTariff + price.purchasePrice + price.transmissionTariff + price.distributionTariff);
//             selectMPEValue()
//           }
//           calculate(currentPrice);
//         }
//       }
//   })

// }
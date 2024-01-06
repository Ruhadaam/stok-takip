
//SCRIPTS FOR FROM FETCH PROCESS

  function createAlert(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  document.getElementById('addNumberForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addNumber();
    getMachineNumber();
  });
  document.getElementById('addNameForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addName();
    getMachineName();
  });
  document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addProduct();
    getProductName();
  });


//SCRIPTS FOR ADD DATA TO DB

  function addNumber() {
    let number = document.getElementById('number').value;

    const data = {
      number: number,
    };


    fetch('/admin/add/number', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        // Yanıt kontrolü
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {

        createAlert("Başarılı!", "Numara Kaydı Başarılı.", "success");
        document.getElementById('number').value = "";
      })
      .catch(error => {
        // Hata durumunda
        console.error('Error:', error);
      });

  }
  function addName() {
    let name = document.getElementById('name').value;

    const data = {
      name: name
    }
    fetch('/admin/add/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        // Yanıt kontrolü
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        createAlert("Başarılı!", "Makine Kaydı Başarılı.", "success");
        document.getElementById('name').value = "";
      })
      .catch(error => {
        // Hata durumunda
        console.error('Error:', error);
      });




  }
  function addProduct() {
    let product = document.getElementById('product').value;

    const data = {
      product: product
    };
    fetch('/admin/add/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        // Yanıt kontrolü
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        createAlert("Başarılı!", "Ürün Kaydı Başarılı.", "success");
        document.getElementById('product').value = "";
      })
      .catch(error => {
        // Hata durumunda
        console.error('Error:', error);
      });

  }
  function addProduction() {
    let date = document.getElementById('date').value;
    let productName = document.getElementById('productName').value;
    let machineNumber = document.getElementById('machineNumber').value;
    let machineName = document.getElementById('machineName').value;
    let count = document.getElementById('count').value;
    ;
    const data = {
      date: date,
      productName: productName,
      machineNumber: machineNumber,
      machineName: machineName,
      count: count
    };
    fetch('/admin/add/production', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        // Yanıt kontrolü
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        createAlert("Başarılı!", "Ürün Kaydı Başarılı.", "success");
        document.getElementById('product').value = "";
      })
      .catch(error => {
        // Hata durumunda
        console.error('Error:', error);
      });


  }


//SCRIPTS FOR GET DATA FROM DB

  function getMachineNumber() {
    fetch('/admin/get-machine-number')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let numbersList = document.getElementById('numbersList');
        numbersList.innerHTML = '';

        data.forEach(dataList => {
          let modalId = `modal_${dataList.makine_id}`;

          numbersList.innerHTML += `
    <div class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 mb-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <div class="flex justify-between w-full px-4 py-2 border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            <p class="flex items-center">
                ${dataList.makine_numarasi}
            </p>
            <div class="flex items-center space-x-2">
                <!-- Düzenleme butonu/linki -->
                <a id="duzenle" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onclick="openModal('${modalId}')">Düzenle</a>
                <!-- Silme ikonu -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" onclick="deleteMachineNumber(${dataList.makine_id})" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-700 rotate-0 hover:rotate-[30deg] transition-all">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div id="${modalId}" class="fixed inset-0 z-10 hidden overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
            <div class="bg-black bg-opacity-60 absolute inset-0" onclick="closeModal('${modalId}')"></div>
            <div class="bg-white p-6 rounded-lg z-20 w-96">
                <!-- Modal içeriği -->
                <div class="flex justify-end">
                    <button class="text-gray-600 hover:text-gray-800" onclick="closeModal('${modalId}')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="mt-4">
                  <form id="updateNumberForm">
                    <label for="updateNumber" class="block text-sm font-medium text-gray-700">Yeni Değer:</label>
                    <input type="number" id="updateNumber" value ="${dataList.makine_numarasi}"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

       </div>
                <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onclick="updateNumber('${modalId}')">Güncelle</button>
            </div>
          </form>
        </div>
    </div>
`;
        });

      }).catch(error => {
        console.error('Error during fetch:', error);
      });
  }
  function getMachineName() {
    fetch('/admin/get-machine-name')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let nameList = document.getElementById('nameList');
        nameList.innerHTML = '';
        data.forEach(dataList => {
          nameList.innerHTML += `
          <div  
        class="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 mb-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <div
            class="flex justify-between w-full px-4 py-2   border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            <p  class="flex items-center">
              ${dataList.makine_ad}
            </p>
            <div class="flex items-center space-x-2">
                <!-- Düzenleme butonu/linki -->
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Düzenle</a>
                <!-- Silme ikonu -->
                <svg xmlns="http://www.w3.org/2000/svg" onclick="deleteMachineName(${dataList.ad_id})" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6 text-red-700 rotate-0 hover:rotate-[30deg] transition-all">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    </div>`

        });
      })

      .catch(error => {
        console.error('Error during fetch:', error);
      });
  }
  function getProductName() {
    fetch('/admin/get-product-name')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let productNameList = document.getElementById('productNameList');
        productNameList.innerHTML = '';
        data.forEach(dataList => {
          productNameList.innerHTML += `
          <div  
        class="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 mb-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <div
            class="flex justify-between w-full px-4 py-2   border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            <p  class="flex items-center">
              ${dataList.urun_ad}
            </p>
            <div class="flex items-center space-x-2">
                <!-- Düzenleme butonu/linki -->
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Düzenle</a>
                <!-- Silme ikonu -->
                <svg xmlns="http://www.w3.org/2000/svg" onclick="deleteProductName(${dataList.urun_id})" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6 text-red-700 rotate-0 hover:rotate-[30deg] transition-all">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    </div>`

        });
      })

      .catch(error => {
        console.error('Error during fetch:', error);
      });
  }



//SCRIPTS FOR DELETE DATA FROM DB


  function deleteMachineNumber(makine_id) {
    fetch('/admin/delete/machine-number/' + makine_id, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {

        createAlert("Başarılı!", "Numara Silme Başarılı.", "success");
        getMachineNumber();

      })
      .catch()
  }
  function deleteMachineName(ad_id) {
    fetch('/admin/delete/machine-name/' + ad_id, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {

        createAlert("Başarılı!", "Ad Silme Başarılı.", "success");
        getMachineName();

      })
      .catch()
  }
  function deleteProductName(urun_id) {
    fetch('/admin/delete/product-name/' + urun_id, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {

        createAlert("Başarılı!", "Ürün Silme Başarılı.", "success");
        getProductName();

      })
      .catch()
  }


//SCRIPTS FOR MODAL


 function openModal(modalId) {
document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
document.getElementById(modalId).classList.add('hidden');
}

function updateMachineNumber(modalId) {
// Güncelleme işlemi burada yapılacak
// Örneğin, input değerini alarak güncelleme işlemi gerçekleştirilebilir.
let updatedValue = document.getElementById('updateInput').value;
console.log(`Modal ID: ${modalId}, Updated Value: ${updatedValue}`);
closeModal(modalId);
}




addEventListener("DOMContentLoaded", () => {
    getMachineNumber();
    getMachineName();
    getProductName();
  });   
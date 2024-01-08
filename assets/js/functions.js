
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






addEventListener("DOMContentLoaded", () => {
    getMachineNumber();
    getMachineName();
    getProductName();
  });   
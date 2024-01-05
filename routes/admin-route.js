const express = require('express');
const router = express.Router();
const db = require('../data/db');



router.get('/admin', (req, res) => {
    const data = {
        value: "uretim-ekle",
        title: "Admin",

    };
    res.render('admin/admin-index', data);

});


router.get('/admin/makine', (req, res) => {
    const data = {
        value: "makine",
        title: "Admin",

    };
    res.render('admin/admin-index', data);
})

router.post('/admin/add/number', (req, res) => {

    let number = req.body.number;
    console.log(number);
    const sql = `INSERT INTO numara_tbl (makine_numarasi)
    VALUES (?); `
    db.query(sql, [number], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);

        }
    });
});

router.post('/admin/add/name', (req, res) => {

    let name = req.body.name;

    const sql = `INSERT INTO makine_tbl (makine_ad)
        VALUES (?); `
    db.query(sql, [name], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);

        }
    });
});

router.post('/admin/add/product', (req, res) => {

    let product = req.body.product;

    const sql = `INSERT INTO urun_tbl (urun_ad)
            VALUES (?); `
    db.query(sql, [product], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);

        }
    });
});


router.post('/admin/add/production', (req, res) => {
    let uretim_tarih = req.body.date;
    let parts = uretim_tarih.split('/');
    let jsDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    let mysqlDate = jsDate.toISOString().split('T')[0];
    let makine_ad = req.body.productName;
    let makine_numarasi = req.body.machineNumber;
    let uretim_adedi = req.body.count;
    console.log(req.body);

    const sql = `INSERT INTO uretim_tbl (urun_id, uretim_tarih, makine_ad, makine_numarasi, uretim_adedi)
                 VALUES (NULL, ?, ?, ?, ?);`;

    db.query(sql, [mysqlDate, makine_ad, makine_numarasi, uretim_adedi], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ title: "Hata", text: "İşlem sırasında bir hata oluştu.", icon: "error" });
        } else {
            res.status(200).send({ title: "Başarılı!", text: "İşlem Başarıyla Gerçekleşti.", icon: "success" });
        }
    });
});


//GET DATA

router.get('/admin/get-machine-number', (req, res) => {
    db.query('SELECT * FROM numara_tbl LIMIT 5', (error, result) => {
        if (error) {
            console.log("Bir hata oluştu: " + error);
            res.status(500).send("Veri çekme sırasında bir hata oluştu.");
        } else {
          
            res.status(200).send(result);
        }
    });
});
router.get('/admin/get-machine-name', (req, res) => {
    db.query('SELECT * FROM makine_tbl LIMIT 5', (error, result) => {
        if (error) {
            console.log("Bir hata oluştu: " + error);
            res.status(500).send("Veri çekme sırasında bir hata oluştu.");
        } else {
          
            res.status(200).send(result);
        }
    });
});
router.get('/admin/get-product-name', (req, res) => {
    db.query('SELECT * FROM urun_tbl LIMIT 5', (error, result) => {
        if (error) {
            console.log("Bir hata oluştu: " + error);
            res.status(500).send("Veri çekme sırasında bir hata oluştu.");
        } else {
          
            res.status(200).send(result);
        }
    });
});
router.get('/admin/get-production', (req, res) => {
    db.query('SELECT * FROM uretim_tbl', (error, result) => {
        if (error) {
            console.log("Bir hata oluştu: " + error);
            res.status(500).send("Veri çekme sırasında bir hata oluştu.");
        } else {
          console.log(result);
            res.status(200).send(result);
        }
    });
});








module.exports = router;
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
    let urun_ad = req.body.productName;
    let makine_ad = req.body.machineName;
    let makine_numarasi = req.body.machineNumber;
    let uretim_adedi = req.body.count;
    console.log(req.body);

    const sql = `INSERT INTO uretim_tbl (uretim_tarih, urun_ad, makine_ad, makine_numarasi, uretim_adedi)
                 VALUES (?, ?, ?, ?, ?);`;

    db.query(sql, [mysqlDate, urun_ad, makine_ad, makine_numarasi, uretim_adedi], (error, result) => {
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
    const today = new Date().toISOString().split('T')[0];

    db.query('SELECT * FROM uretim_tbl WHERE DATE(uretim_tarih) = ? ORDER BY uretim_tarih ASC', [today], (error, result) => {
        if (error) {
            console.log("Bir hata oluştu: " + error);
            res.status(500).send("Veri çekme sırasında bir hata oluştu.");
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    });
});

//DELETE DATA
router.delete("/admin/delete/machine-number/:makine_id", (req, res) => {

    let makine_id = req.params.makine_id;

    const sql = `DELETE FROM numara_tbl  WHERE makine_id = ?`;


    db.query(sql, [makine_id], (error, result) => {
        if (error) {
            console.error('Soru silinirken hata oluştu:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json({ message: 'Soru başarıyla silindi.' });
        }
    })

});
router.delete("/admin/delete/machine-name/:ad_id", (req, res) => {

    let ad_id = req.params.ad_id;

    const sql = `DELETE FROM makine_tbl  WHERE ad_id = ?`;


    db.query(sql, [ad_id], (error, result) => {
        if (error) {
            console.error('Soru silinirken hata oluştu:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json({ message: 'Soru başarıyla silindi.' });
        }
    })

});
router.delete("/admin/delete/product-name/:urun_id", (req, res) => {

    let urun_id = req.params.urun_id;

    const sql = `DELETE FROM urun_tbl  WHERE urun_id = ?`;


    db.query(sql, [urun_id], (error, result) => {
        if (error) {
            console.error('Soru silinirken hata oluştu:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json({ message: 'Soru başarıyla silindi.' });
        }
    })

});











module.exports = router;
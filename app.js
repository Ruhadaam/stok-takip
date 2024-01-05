const express = require('express');
const path = require('path');
const router = require('./routes/route');
const adminRoute = require('./routes/admin-route');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/css', express.static(path.join(__dirname,'assets', 'css')));
app.use('/js', express.static(path.join(__dirname,'assets', 'js')));
app.use('/img', express.static(path.join(__dirname,'assets', 'img')));
app.use('/flowbite', express.static(path.join(__dirname, 'node_modules', 'flowbite', 'dist')));
app.use('/alert', express.static(path.join(__dirname, 'node_modules', 'sweetalert2', 'dist')));


app.use(router);
app.use(adminRoute);


const port = process.env.PORT || 3000;

app.listen(port, () => {

  console.log(`This serve is using ${port} port`);
})


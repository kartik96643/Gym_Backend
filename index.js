const express = require('express');
const {connectToMongo} = require('./connection.js')
const adminRoute = require('./routes/admin.js');
const planRoute = require('./routes/plan.js');
const galleryRoute = require('./routes/gallery.js')
const timingRoute = require('./routes/timing.js')
const { checkToken } = require('./middleware/auth.js');
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors');


const app = express();
const PORT = 5000

connectToMongo();

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(checkToken('token'))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

app.use('/admin', adminRoute)
app.use('/plans', planRoute)
app.use('/gallery', galleryRoute)
app.use('/timing',timingRoute)

app.listen(PORT, ()=>{
console.log("server started")
});


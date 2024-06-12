import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';
import exphbs from 'express-handlebars';


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

import productRoutes from './routes/products.js';
import cartRoutes from './routes/carts.js';

app.use('/api/products', productRoutes(io));
app.use('/api/carts', cartRoutes);

app.get('/', (req, res) => {
  res.render('realTimeProducts');
});

const PORT = 8050;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

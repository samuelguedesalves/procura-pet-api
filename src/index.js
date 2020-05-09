const express = require('express');
const cors = require('cors');

const case_router = require('./routers/case_router');
const user_router = require('./routers/user_router');
const upload_router = require('./routers/upload_router');

const app = express();

app.use(express.json());
app.use([user_router, case_router, upload_router]);

app.use(cors());

app.listen( process.env.PORT || 3333 );


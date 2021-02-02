const app = require('./config/express')
const { port } = require('./config/environment')

/**
 * Routers Import
 */
const quotationRouter = require('./routes/quotations');
const slipRouter = require('./routes/slip');
const { Sequelizer } = require('./config/database');

/**
 * Routers
 */
app.use('/quotations', quotationRouter);
app.use('/slips', slipRouter);
app.put('/clear', async(req,res) => 
{
    await Sequelizer.sync({ force: true });
    res.send("OK");
});


app.listen(port, () => console.log(`ExpressJS running at ${port}`))
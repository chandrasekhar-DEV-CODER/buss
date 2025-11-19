require('dotenv').config();
const express = require("express");
const cors = require("cors");

const connectDB = require('./db');

const driversRoute = require('./routes/DriverRoute');
const busRoutesRoute = require('./routes/RouteforBusRoute'); // Import your busRoutes routes
const busSchedulesRouter = require('./routes/BusSchedulesRoute'); // Import your busSchedules routes
const localPassengersRouter = require('./routes/localPassengersRoute'); // Import your localPassengers routes
const busInspectorsRouter = require('./routes/BusInspectorsRoute'); // Import your busInspectors routes
const busesRoute = require('./routes/BusRoute'); // Import busroute routes
const passengerTravelHistoryRoutes = require('./routes/PassengerTravelHistoryRoute'); // Replace with the actual path
const transportManagerRoute = require('./routes/TransportManagerRoute'); // Replace with the actual path

const app = express();
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5000',
    credentials: true,
}));
app.use(express.json());


app.use('/api/driver', driversRoute);
app.use('/api/busroutes', busRoutesRoute);
app.use('/api/bus-schedules', busSchedulesRouter);
app.use('/api/localpassengers', localPassengersRouter);
app.use('/api/businspectors', busInspectorsRouter);
app.use('/api/bus', busesRoute);
app.use('/api/travelhistory', passengerTravelHistoryRoutes);
app.use('/api/manager', transportManagerRoute);

app.get("/", (_req, res) => {
    res.json({ name: 'SriPass backend', status: 'ok' });
});







const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`[server] Listening on port ${port}`);
    });
};

startServer();
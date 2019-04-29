var routes = require('express').Router();
var axios = require('axios');

routes.get('/test', (req, rsp) => {
    rsp.send({ "test": true });
});

function fetchChartPointers() {
    try {
        return axios.get(`${process.env.API_LINK}data`).then(pointData => {
            return { data: pointData.data.values || [], status: 'SUCCESS' }
        }).catch(err => {
            /** in case promise fail */
            console.log('error in fetch pointer data');
            return Promise.reject(err);
        });
    } catch (err) {
        console.log('error in server axios fetch');
        // console.log(err);
        return Promise.reject(err);
    }
}

routes.get('/fetch', (req, resp) => {
    fetchChartPointers()
        .then(responseData => resp.send(responseData))
        .catch(err => {
            /** error can be log */
            console.log(err);
        });
});

/**
 * on fetch after add not receiving submitted data
 */
routes.post('/add', (request, response) => {
    const { date, value } = request.body;
    axios.post(`${process.env.API_LINK}points`, { x: date, y: value }).then(result => {
        if (result.data.status === 'ok') {
            return response.send({ status: 'SUCCESS' });
        } else {
            return response.send({ status: 'SERVER_ERROR' });
        }
    }).catch(err => {
        console.log('error in server axios add request');
        console.log(err);
    })
});

module.exports = routes;
const Op = require('sequelize').Op;
let {Job} = require('../models');


let JobSchedule = {
    start() {
        this.getjob('shopify');
    },

    async getjob(type) {
        let job = await Job.findOne({
            where: {
                type: 'shopify-multi',
            },
            raw: true
        });
        console.log(job);
    }
};

module.exports = JobSchedule;
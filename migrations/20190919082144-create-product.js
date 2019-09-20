'use strict';
const BaseAttibutes = require('../app/helpers/BaseAttibutes');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            // list columns in table
            jobId: {
                type: Sequelize.INTEGER,
                field: 'job_id'
            },
            spaceId: {
                type: Sequelize.INTEGER,
                field: 'space_id'
            },
            productId: {
                type: Sequelize.INTEGER,
                field: 'product_id'
            },
            status: {
                type: Sequelize.INTEGER,
                field: 'status'
            },
            name: {
                type: Sequelize.STRING,
                field: 'name'
            },
            slug: {
                type: Sequelize.STRING,
                field: 'slug'
            },
            price: {
                type: Sequelize.INTEGER,
                field: 'price',
                allowNull: true
            },
            description: {
                type: Sequelize.STRING,
                field: 'description'
            },
            categories: {
                type: Sequelize.JSON,
                field: 'categories'
            },
            tags: {
                type: Sequelize.JSON,
                field: 'tags'
            },
            variants: {
                type: Sequelize.JSON,
                field: 'variants'
            },
            images: {
                type: Sequelize.JSON,
                field: 'images'
            },
            options: {
                type: Sequelize.JSON,
                field: 'options'
            },
            // created, updated, deleted column.
            ...BaseAttibutes,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Product');
    }
};
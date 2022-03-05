const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-2"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = 'Thoughts';

router.get('/users', (req, res) => {
    const params = {
        TableName: table
    };

    dynamodb.scan(params, (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(data.Items);
        }
    })
});

router.get('/users/:username', (req, res) => {
    const params = {
        TableName: table,
        ProjectionExpression: '#un, #th, #ca, #img',
        KeyConditionExpression: '#un = :user',
        ExpressionAttributeNames: {
            '#un': 'username',
            '#ca': 'createdAt',
            '#th': 'thought',
            '#img': 'image'
        },
        ExpressionAttributeValues: {
            ':user': req.params.username
        }
    }


    dynamodb.query(params, (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(data.Items);
        }
    });
});

router.post('/users', (req, res) => {
    const params = {
        TableName: table,
        Item: {
            'username': req.body.username,
            'createdAt': Date.now(),
            'thought': req.body.thought,
            'image': req.body.image
        }
    }

    dynamodb.put(params, (err, data) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(data);
        }
    });
});

module.exports = router;
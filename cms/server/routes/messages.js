const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
    Message.find()
        .populate()
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(error => {
            errorCatch(error, res);
        });
});

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");
    console.log('maxMessageId', maxMessageId);
    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: '101' // TODO: Hard-coded value
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                message: createdMessage
            });
        })
        .catch(error => {
            errorCatch(error, res);
        });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({
            id: req.params.id
        })
        .then(message => {
            message.subject = req.body.subject;
            message.msgText = req.body.msgText;
            message.sender = '101'; // TODO: Hard-coded value

            Message.updateOne({
                    id: req.params.id
                }, message)
                .then(result => {
                    res.status(204).json({
                        message: 'Message updated successfully'
                    })
                })
                .catch(error => {
                    errorCatch(error, res);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Message not found.',
                error: {
                    message: 'Message not found'
                }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({
            id: req.params.id
        })
        .then(message => {
            Message.deleteOne({
                    id: req.params.id
                })
                .then(result => {
                    res.status(204).json({
                        message: "Message deleted successfully"
                    });
                })
                .catch(error => {
                    errorCatch(error, res);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Message not found.',
                error: {
                    message: 'Message not found'
                }
            });
        });
});

function errorCatch(error, res) {
    return res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}

module.exports = router;
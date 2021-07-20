var express = require('express');
const { ACTION } = require('../../constant');
const { HistoryAction } = require('../../models');

function deleteMessageSession(request, response) {
    delete request.session.message;
    response.status(200).json({
        status: 200,
    })
}

async function updateHistoryAction(request, response) {
    try {

        let historyActions = [];

        await HistoryAction.deleteMany({});

        for (let history in ACTION) {
            historyAction = new HistoryAction({ name: ACTION[history] });
            historyActions = [...historyActions, historyAction];
        }
        
        await HistoryAction.insertMany(historyActions);
        
        response.status(200).json({
            status: 200,
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            status: 500,
        })
    }
}

module.exports = {
    deleteMessageSession,
    updateHistoryAction,
}
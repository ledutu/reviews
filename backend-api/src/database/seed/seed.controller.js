var express = require('express');
const Seeder = require('../../utils/seeder');
const {
    AccessToken,
    Comment,
    History,
    HistoryAction,
    Reaction,
    Review,
    ReviewCategory,
    Role,
    User,
} = require('../../models');

async function createUser(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);

    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createUserDatabaseSeed(times, locale);
        console.log("User database: ");

        await User.insertMany(seeders.users);
        // await Profile.insertMany(seeders.profiles);

        console.info('Create user database successful');
        response.status(200).json({
            status: 'OK',
        });
    } catch (error) {
        console.error(error);
        console.error('Creaate user database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createReviewCategory(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);

    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createReviewCategory(times, locale);
        console.log("Category database: ");

        await ReviewCategory.insertMany(seeders.reviewCategories);

        console.info('Create category database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Creaate category database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createReview(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);
    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createReviewDatabaseSeed(times, locale);
        console.log("Review database: ");

        await Review.insertMany(seeders.reviews);
        console.info('Create review database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Create review database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createComment(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);

    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createComment(times, locale);
        console.log("comment database: ");

        await Comment.insertMany(seeders.comments);

        console.info('Create comment database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Creaate comment database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createReaction(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);

    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createReaction(times, locale);
        console.log("Reaction database: ");

        await Reaction.insertMany(seeders.reactions);

        console.info('Create Reaction database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Creaate Reaction database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function calculateVote(request, response) {
    try {
        seeders = await Seeder.calculateRating();

        console.info('calculate vote database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('calculate vote database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createRole(request, response) {
    try {
        seeders = await Seeder.createRole();
        console.log("role database: ");

        await Role.insertMany(seeders.roles);

        console.info('Create roles database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Creaate roles database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

module.exports = {
    createUser,
    createReviewCategory,
    createReview,
    createComment,
    createReaction,
    calculateVote,
    createRole,
}
var express = require('express');
var router = express.Router();

const SeedController = require('./seed.controller');

// User -> BookCategory -> Book -> Blog -> Book Comment -> Blog Comment
router.get('/user', SeedController.createUser);
router.get('/review-category', SeedController.createReviewCategory);
router.get('/review', SeedController.createReview);
router.get('/comment', SeedController.createComment);
router.get('/create-review-vote', SeedController.createReaction);
router.get('/calculate-vote', SeedController.calculateVote);
router.get('/role', SeedController.createRole);

module.exports = router;
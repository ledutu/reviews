function index(request, response) {
    response.status(200).json({ok: 'OK'})
}

module.exports = {
    index,
}
function index(request, response) {
    response.status(200).json({
        ok: 'ok',
    })
}

module.exports = {
    index,
}
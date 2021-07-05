function getDocs(request, response) {
    return response.render('openapi/index');
}

module.exports = {
    getDocs,
}
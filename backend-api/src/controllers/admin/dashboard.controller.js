function index(request, response) {
    console.log('asdfasdf');
    return response.render('admin/dashboard');
}

module.exports = {
    index
}
exports.getPrivateData = (request, response, next) => {
    response.status(200).json({
        success: true,
        data: "You got access to the private data in this route",
    });
}
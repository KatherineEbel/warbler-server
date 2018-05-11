const errorHandler = (error, request, response, next) => (
  response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something went wrong"
    }
  })
)

module.exports = errorHandler
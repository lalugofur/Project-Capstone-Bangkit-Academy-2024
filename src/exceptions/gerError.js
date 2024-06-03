module.exports = (err, req, res, next) => {
    console.error(err.stack);  // Log error stack trace for debugging
  
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  };
  
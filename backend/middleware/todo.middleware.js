const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed!",
                errors: error.details.map(error => error.message)
            });
        }
        
        next();
    }
};

export default validate;



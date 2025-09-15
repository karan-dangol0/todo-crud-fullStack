import joi from "joi";

const todoValidationSchema = joi.object({
    task: joi.string().min(2).max(100).required().trim(),
    completed: joi.boolean().required(),
});

export default todoValidationSchema;
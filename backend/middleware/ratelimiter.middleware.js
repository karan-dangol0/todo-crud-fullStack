import rateLimit from "express-rate-limit";
// import { rateLimit } from 'express-rate';


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: {
    error: "Too many requests!",
    info: "Try again after 1 minute",
  },
    
    statusCode: 429, 
    standardHeaders: 'draft-8', 
    legacyHeader: false, 
  

});

export default limiter;

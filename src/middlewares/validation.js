
const blogValidation = (req,res,next)=>{
let {title, body, category}  = req.body
    if (
        typeof title !== "string" ||
        typeof body !== "string" ||
        typeof category !== "string" 
      ) {
        return res.status(400).send({
            status: false,
          message: "Type is wrong for the fields. They should be strings.",
        });
      }
    next()
}




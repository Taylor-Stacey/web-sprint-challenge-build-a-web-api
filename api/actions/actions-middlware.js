// add middlewares here related to actions
const Action = require('./actions-model')


async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if(!action) {
            res.status(400).json({
                message: "action not found",
            })
        }else {
            req.action = action
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: 'problem finding user',
        })
    }
}

function validateAction(req,res,next) {
  const { description, notes } = req.body
  if(!description || !description.trim()){
    res.status(400).json({ message: 'missing required description',})
  }
  if(!notes || !notes.trim()){
    res.status(400).json({ message: 'missing required notes',})
  }
  else {
    req.description = description.trim()
    next();
  }
}

module.exports={
    validateAction,
    validateActionId
}
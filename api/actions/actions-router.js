// Write your "actions" router here!
const express = require('express');

const { validateAction, validateActionId } = require('./actions-middlware');
const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req,res,next) => {
    Actions.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
});

router.get('/:id', (req,res)=>{
    Actions.get(req.params.id)
    .then(action => {
        if(action) {
            res.status(200).json(action);
            return;
        }
        res.status(404).json({ message: 'action not found'});
    })
    .catch(error =>{
        res.status(500).json({message: 'error retrieving the action'});
    });
});

router.post('/', validateAction, async (req, res, next) => {
  try{
    const action = await Actions.insert(req.body)
    res.json(action)
  }catch (err) {
    next(err)
  }
});

router.put('/:id', validateAction, validateActionId, async (req, res, next) => {
  try{
    const action = await Actions.update(req.params.id, req.body)
    res.json(action)
  }catch (err) {
    next(err)
  }
})

router.delete('/:id', validateActionId, async (req, res, next) =>{
  try {
    const action = await Actions.remove(req.params.id)
    res.json(action)
  }catch (err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})
module.exports = router
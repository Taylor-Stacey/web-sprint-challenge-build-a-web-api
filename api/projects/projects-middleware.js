// add middlewares here related to projects
const Project = require('./projects-model')

function validateProject(req, res, next) {
    if (typeof req.body.name !== 'string' || req.body.name.trim() === '' ) {
        next({ message: 'invalid project', status: 400 });
        return;
    }
    if (typeof req.body.description !== 'string'  || req.body.description.trim() === '' ) {
        next({ message: 'invalid project', status: 400 });
        return;
    }
    if (typeof req.body.completed != 'boolean'){
        next({ message: 'invalid project', status: 400 });
        return;
    }
    req.newProject = { name: req.body.name.trim(), description: req.body.description.trim(), completed: req.body.completed};
    next();
}

async function validateProjectId(req,res,next){
   try{
    const project = await Project.get(req.params.id)
    if(!project){
        res.status(404).json({
            message: 'project not found',
        })
    }else {
        req.project = project
        next()
    }
   }catch(err){
    res.status(500).json({
        message: 'problem finding project'
    })
   }
}

module.exports = {
    validateProject,
    validateProjectId
}
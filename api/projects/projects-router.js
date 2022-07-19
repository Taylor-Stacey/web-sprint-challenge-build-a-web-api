// Write your "projects" router here!
const express = require('express');

const { validateProject, validateProjectId } = require('./projects-middleware');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
                return;
            }
            res.status(404).json({ message: 'Project not found' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving the project' });
        });
});

router.post('/', validateProject, (req,res) =>{
    Projects.insert({ name: req.body.name, description: req.body.description, completed: req.body.completed })
    .then(newProject => {
        res.status(201).json(newProject);
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error adding the project',
        });
    });
});

router.put('/:id', validateProjectId, validateProject, (req,res)=>{
    Projects.update(req.params.id, req.newProject)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json({
            message: "error updating the project"
        })
    })
});

router.delete('/:id', validateProjectId, (req,res) =>{
    Projects.remove(req.params.id)
    .then(() =>{
        res.status(200).json(req.project);
    })
    .catch(error => {
        res.status(404).json({
            message: 'error removing the project'
        })
    })
})

router.get('/:id/actions',validateProjectId, async (req,res,next) => {
    try{
        const result = await Projects.getProjectActions(req.params.id)
        res.json(result)
    }catch(err){
        next(err)
    }
});

module.exports = router
const projectModel = require('../models/projects');

module.exports = {
    getById: function (req, res, next) {
        projectModel.find({ ownerId: req.body.userId, _id: req.params.projectId }, function (err, projectInfo) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "Project found.", data: { projects: projectInfo } });
            }
        });
    },

    getAll: function (req, res, next) {
        let projectsList = [];

        projectModel.find({ ownerId: req.body.userId }, function (err, projects) {
            if (err) {
                next(err);
            } else {
                for (let project of projects) {
                    projectsList.push({ id: project._id, name: project.name, tasks: project.tasks });
                }
                res.json({ status: "success", message: "Projects list found.", data: { projects: projectsList } });
            }
        });
    },

    updateById: function (req, res, next) {
        projectModel.findOneAndUpdate({ ownerId: req.body.userId, _id: req.params.projectId },
            { name: req.body.name, tasks: req.body.tasks }, function (err, projectInfo) {
                if (err)
                    next(err);
                else {
                    res.json({ status: "success", message: "Project updated successfully.", data: null });
                }
            }
        );
    },

    deleteById: function (req, res, next) {
        projectModel.findOneAndRemove({ ownerId: req.body.userId, _id: req.params.projectId },
            function (err, projectInfo) {
                if (err)
                    next(err);
                else {
                    res.json({ status: "success", message: "Project deleted successfully.", data: null });
                }
            });
    },

    create: function (req, res, next) {
        projectModel.create({ name: req.body.name, ownerId: req.body.userId }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Project added successfully.", data: null });

        });
    },
}
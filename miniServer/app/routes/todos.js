(function ()
{
    'use strict';

    var express = require('express'),
        router = express.Router();

    // Todos route
    var todosCtrl = require('../controllers/todosCtrl');

    router.post('/', function(req, res)
    {
        var data = req.body.newTodo;
        todosCtrl.createTodo(data, function(err, newModel)
        {
            if(err)
            {
                res.status(500).json('Fail to create new todo');
                return;
            }

            res.jsonp({newModel: newModel});
        });
    });

    module.exports = router;
})();

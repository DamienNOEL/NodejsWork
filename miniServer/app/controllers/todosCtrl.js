(function ()
{
    'use strict';

    exports.createTodo = function (todo, callback)
    {
        if(!todo)
        {
            callback('no todo');
            return;
        }

        var savedTodo = {
            _id: '123',
            name: 'saved ' + todo.name,
            desc: 'saved ' + todo.desc,
        }

        callback(null, savedTodo);
    };


}());

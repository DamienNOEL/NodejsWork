(function ()
{
    'use strict';

    module.exports.start = function (readyCallback)
    {
        console.log('server start initialization');

        /* istanbul ignore if */
        if (this.server)
        {
            return;
        }

        var express     = require('express'),
            compression = require('compression'),
            bodyParser  = require('body-parser'),
            morgan      = require('morgan'),
            http        = require('http'),
            app         = express(),
            config = require('./config.js');

        this.server = http.createServer(app);

        //config
        console.log('Env is : ' + config.env);
        app.set('port', config.port);

        //active compression
        app.use(compression(
            {
                filter: function (req, res)
                {
                    /* istanbul ignore next */
                    return (/json|text|javascript|css|svg/).test(res.getHeader('Content-Type'));
                }
                //,threshold: 512
            }
            )
        );

        /* istanbul ignore next */
        if (config.env !== 'production')
        {
            app.locals.pretty = true;
        }

        // view engine setup
        app.set('views', __dirname + '/app/views');
        app.set('view engine', 'ejs');
        app.engine('html', require('ejs').renderFile);

        //body parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        //logger
        app.use(morgan('dev'));	

        //check https requests
        app.use(function (req, res, next)
        {            
            // we need use X-Forwarded-Proto HTTP header            
            if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV !== 'development' && process.env.SSL !== 'NO_SSL')
            {
                //do not redirect if /api/documents/downloadZIP
                if (req.url.indexOf('/api/documents/downloadZIP') === -1)
                {
                    console.warn('redirect to https ' + 'https://' + req.headers.host + req.url);
                    res.redirect('https://' + req.headers.host + req.url);
                    return;
                }
            }

            next();
        });
    
        //public directory
        app.use(express.static(__dirname + '/' + config.publicDir));       

        //routes
        app.use('/todos', require('./app/routes/todos'));
       
        //Error handlers
        // catch 404 and forward to error handler
        app.use(function (req, res, next)
            {
                var err = new Error('Url Not Found: ' + req.method + ':' + req.originalUrl);
                err.status = 404;
                next(err);
            }
        );

        // development error handler
        // will print stacktrace
        /* istanbul ignore if */
        if (config.env === 'development')
        {
            app.use(
                function (err, req, res)
                {
                    res.status(err.status || 500);
                    res.render('500', {
                        message: err.message,
                        error: err,
                        status: err.status || 500
                    });
                }
            );
        }
        else
        {
            // production error handler
            // no stacktraces leaked to user
            app.use(
                function (err, req, res)
                {
                    res.status(err.status || 500);
                    res.render('500', {
                        message: err.message,
                        error: {},
                        status: err.status || 500
                    });
                }
            );
        }

        this.server.listen(config.port);
        console.log('INFast started on port ' + config.port);

        // callback to call when the server is ready
        if (readyCallback)
        {
            readyCallback();
        }
    };

    module.exports.close = function ()
    {
        this.server.close();
        this.server = null;
    };
})();







(function ()
{
    'use strict';

    // process.env.TZ = 'Europe/Paris';
    process.env.TZ = 'UTC';


    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',     //production, development, test
    
    //default is production configuration
    //test configuration must be edited in backendTestLauncher
    config = {
        
        test: false,

        env: env,

        port: process.env.PORT || 3000,

        publicDir: 'public',
    };


    if(config.env === 'test')
    {
        config.publicDir = 'dist';
    }

    if (config.env === 'production')
    {
        config.publicDir = 'dist';
    }

    module.exports = config;

})();


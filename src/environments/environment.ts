// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const apiurls = {
    // Common routes for all
    all_api_url:
        'http://127.0.0.1:8081',
    // 'https://e294sbftrc.execute-api.ap-south-1.amazonaws.com/acdev',
    // Individual routes
    url_regis: 'http://127.0.0.1:8081',
    url_acsignupcallbk: 'http://127.0.0.1:8081',
    url_login: 'http://127.0.0.1:8081',
    url_aclogincallbk: 'http://127.0.0.1:8081',
};

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyDQg2KUEAJaj-bfdQfp_08T6L2ybnpbOSc',
        authDomain: 'ananew-472d8.firebaseapp.com',
        databaseURL: 'https://ananew-472d8.firebaseio.com',
        projectId: 'ananew-472d8',
        storageBucket: 'ananew-472d8.appspot.com',
        messagingSenderId: '753856447807',
        appId: '1:753856447807:web:57c96b85c3d84613'
    },
    // url_<screen + Functionality>
    url_auth_signup: apiurls.all_api_url,
    endpt_auth_signup: 'signup',
    url_auth_login: apiurls.all_api_url,
    endpt_auth_login: 'login',
    url_auth_loginks: apiurls.all_api_url,
    endpt_auth_loginks: 'loginks',
    url_auth_logout: apiurls.all_api_url,
    endpt_auth_logout: 'logout',
    url_auth_userregchk: apiurls.all_api_url,
    endpt_auth_userregchk: 'userregchk',
    url_gold_price: apiurls.all_api_url,
    endpt_gold_price: 'bullionprice',
    url_admin_entity: apiurls.all_api_url,
    url_admin_branch: apiurls.all_api_url
    /*
    url_auth_osignup: apiurls.all_api_url,
    endpt_auth_osignup : 'osignupnotkn',
    url_auth_ologin: apiurls.all_api_url,
    endpt_auth_ologin : 'ologin'
    */
};


export const installation = {
    standaloneinstall: true,  // This decisides the login screen to be shown If standalone True ===> No Public
    thirpartyauth: true,      // This decisides the authentication flow (whether to use firebase or use own database)
    siteid: 'ng',  // uh -> universal hotel solution, ng -> for nawalgold
    // usertype:''               // This is mandatory.  "" for thirdpartyauth and "S" only for standalone installations
    // This is mandatory only for standalone installations
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const analytics = {
    analytics_enabled: true
};

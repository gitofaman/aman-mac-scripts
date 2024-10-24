var defaultEmbed = () => {
    var o = {
                mode: 'unit-listing',
                token: {
                    corp: 'cb920dfad9f26d691bdd964edb5e8ec719e212b446e006c9c5b7b73fd103d716fdbd6e14f60a1d1941c7fe7a6822ad11',
                    site: '22b031b14eee782ec9f88d07f0020a80042017f07cfef93d15b544f6198921089211270ac08f4cf732ee339ddcdbe029'
                },
                filter:filterJson,
                url: 'https://prod.rapidstorapp.com',
                parent_element_id: 'rapidstor-popup',
                script_path: '/public/application/scripts/publicPanel/bootstrapper/bootstrapper.js',
                ignore_template: false,
                standalone: false
            };
            var t = document.getElementById(o.parent_element_id);
            var s = document.createElement("script");
            var e = Math.round((new Date()).getTime() / 1000);
            window.rapidstor_options = o;
            s.src = o.url + o.script_path + "?epoch=" + e;
            console.log("rsbsl: loading '" + s.src + "'...");
            s.type = 'text/javascript';
            s.async = true;
            s.onload = function () {
                console.log("rsbsl: loaded '" + s.src + "'.");
            };
            t.appendChild(s);
}
var richmondEmbed = () => {
    var o = {
        showSpaceCalculator: true,
        filter: filterJson,
        mode: 'unit-listing',
        token: {
            corp: 'cb920dfad9f26d691bdd964edb5e8ec719e212b446e006c9c5b7b73fd103d716fdbd6e14f60a1d1941c7fe7a6822ad11',
            site: 'efa538a9618f78fd74799610acebab972187e72192e26cdbade9e7f7a2bd1097af36a84dae2bbe9145ce8e5b7ff01bae'
        },
        url: 'https://prod.rapidstorapp.com',
        parent_element_id: 'rapidstor-popup',
        script_path: '/public/application/scripts/publicPanel/bootstrapper/bootstrapper.js',
        ignore_template: false,
        standalone: false
    };
    var t = document.getElementById(o.parent_element_id);
    var s = document.createElement("script");
    var e = Math.round((new Date()).getTime() / 1000);
    window.rapidstor_options = o;
    s.src = o.url + o.script_path + "?epoch=" + e;
    console.log("rsbsl: loading '" + s.src + "'...");
    s.type = 'text/javascript';
    s.async = true;
    s.onload = function () {
        console.log("rsbsl: loaded '" + s.src + "'.");
    };
    t.appendChild(s);
}
var kingsburyEmbed = () => {
    var o = {
        mode: 'unit-listing',
        filter: filterJson,
        token: {
            corp: 'cb920dfad9f26d691bdd964edb5e8ec719e212b446e006c9c5b7b73fd103d716fdbd6e14f60a1d1941c7fe7a6822ad11',
            site: '681018283e7c69e239e2ba94ef224ae0acb6ea4be326039ffada388324fa1edb22b3453093261e5343c12e15fa904db1'
        },
        url: 'https://prod.rapidstorapp.com',
        parent_element_id: 'rapidstor-popup',
        script_path: '/public/application/scripts/publicPanel/bootstrapper/bootstrapper.js',
        ignore_template: false,
        standalone: false
    };
    var t = document.getElementById(o.parent_element_id);
    var s = document.createElement("script");
    var e = Math.round((new Date()).getTime() / 1000);
    window.rapidstor_options = o;
    s.src = o.url + o.script_path + "?epoch=" + e;
    console.log("rsbsl: loading '" + s.src + "'...");
    s.type = 'text/javascript';
    s.async = true;
    s.onload = function () {
        console.log("rsbsl: loaded '" + s.src + "'.");
    };
    t.appendChild(s);
}

var alreadyEmbed = false;

$('.space-visualiser').on('click', ()=>{
    console.log('CLIcked')
    if(!alreadyEmbed) {
        defaultEmbed()
        alreadyEmbed = true;
    }
})

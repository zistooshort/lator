Template7.registerHelper('top', (context: Array<any>, options: any) => {
    function isArray(arr: any) {
        return Object.prototype.toString.apply(arr) === '[object Array]';
    }
    var ret = '', i = 0;
    if (isArray(context)) {
        var shuffled = context.concat().sort(function () { return 0.5 - Math.random(); });
        context = new Array();
        for (var i = 0; (i < 5) && (i < shuffled.length); i++) {
            context.push(shuffled[i]);
        }
        if (options.hash.reverse) {
            context = context.reverse();
        }
        for (i = 0; i < context.length; i++) {
            ret += options.fn(context[i], {first: i === 0, last: i === context.length - 1, index: i});
        }
        if (options.hash.reverse) {
            context = context.reverse();
        }
    }
    else {
        for (var key in context) {
            i++;
            ret += options.fn(context[key], {key: key});
        }
    }
    if (i > 0) return ret;
    else return options.inverse(this);
});

Template7.registerHelper('json', (context: Array<any>, options: any) => JSON.stringify(context).replace(/[\""]/g, '&quot;'));
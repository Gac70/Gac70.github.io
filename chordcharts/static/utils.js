var Gjm = window.Gjm = {};
Gjm.utils = {};
/**
 * @function
 * @descr parse url and returns parts found
 */
Gjm.utils.parseUrl = function(url)
{
	var regex = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?", "gi");

	var matches = regex.exec(url);

	return {
		protocol: matches[2],
		host:     matches[4],
		path:     matches[5],
		query:    matches[7],
		hash:     matches[9]
	};
};
	
/**
 * @function
 * @description redirect to a new domain keeping the hash and current page
 */
Gjm.utils.redirectToNewDomain = function(domain)
{
	var parsedUrl = Gjm.utils.parseUrl(decodeURIComponent(window.document.location.toString()));
	var parsedNewDomain = Gjm.utils.parseUrl(decodeURIComponent(domain));
	var subdomain = parsedNewDomain.host.split('.')[0];

	// var date = new Date();
	// date.setTime(date.getTime() + 315360000000); // <= 60*60*24*365*10 (*1000 because in ms) = 10 years as in mappygeoip\mappygeoip.module
	// jQuery.cookie('userPrefLanguage', subdomain, {'domain':Mappy.conf.common_subdomain, 'expires':date});

	// TODO: check if page param is present in hash and if so redirect straight to this page
	window.document.location = parsedUrl.path !== "" ? domain + parsedUrl.path + window.document.location.hash : domain + window.document.location.hash;
};

Gjm.utils.str_replace  = function(search, replace, subject, count) {
    // Replaces all occurrences of search in haystack with replace  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/str_replace
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Oleg Eremeev
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Oleg Eremeev
    // %          note 1: The count parameter must be passed as a string in order
    // %          note 1:  to find a global variable in which the result will be given
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }
 
    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
};

Gjm.utils.array_unique = function(inputArr) {
    // Removes duplicate values from array  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/array_unique
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      input by: duncan
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Nate
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Michael Grier
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: The second argument, sort_flags is not implemented;
    // %          note 1: also should be sorted (asort?) first according to docs
    // *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
    // *     returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
    // *     example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
    // *     returns 2: {a: 'green', 0: 'red', 1: 'blue'}
    var key = '',
        tmp_arr2 = {},
        val = '';
 
    var __array_search = function (needle, haystack) {
        var fkey = '';
        for (fkey in haystack) {
            if (haystack.hasOwnProperty(fkey)) {
                if ((haystack[fkey] + '') === (needle + '')) {
                    return fkey;
                }
            }
        }
        return false;
    };
 
    for (key in inputArr) {
        if (inputArr.hasOwnProperty(key)) {
            val = inputArr[key];
            if (false === __array_search(val, tmp_arr2)) {
                tmp_arr2[key] = val;
            }
        }
    }
 
    return tmp_arr2;
};

Gjm.utils.array_values = function(input) {
    // Return just the values from the input array  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/array_values
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}
    var tmp_arr = [],
        key = '';
 
    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.values();
    }
 
    for (key in input) {
        tmp_arr[tmp_arr.length] = input[key];
    }
 
    return tmp_arr;
};

Gjm.utils.typeOf = function(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (value instanceof Array) {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
};
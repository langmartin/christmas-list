// repeatedly(shuffle)
function randos (xs) {
    return function () {
        return shuffle(xs.slice());
    };
}

function isFamily (fs) {
    fs = fs.map(arrSet);
    return function (xs) {
        var i, j, e = xs.length - 1;
        for (i=0; i<fs.length; i++) {
            // for each element of r
            for (j=0; j<e; j++) {
                // if both r r+1 are in this family
                if (fs[i][xs[j]] && fs[i][xs[j+1]]) {
                    return true;
                }
            }
            // check last -> first
            if (fs[i][xs[0]] && fs[i][xs[e]]) return true;
        }
        // else not family
        return false;
    };
}

// n filtered lists of similarity <= s
function xmas (next, n, sim) {
    var x, xs = [], s = 0, i;
    function lp () {
        // n of them, so we're done
        if (xs.length == n) return xs;
        x = next();

        // for each xs
        for (i=0; i<xs.length; i++) {
            // if similarity to x > d
            s = similarity(x, xs[i]);
            if (s > sim)
                // skip it move to the next one
                return lp();
            // else
            //     console.log(s)
        }

        // otherwise push
        xs.push(x);
        return lp();
    }
    return lp();
}

// intersection(set(pairs) set(pairs)), count
function similarity (l, m) {
    var ls = pairSet(l),
        ms = pairSet(m),
        k, s = 0;
    for (k in intersection(ls, ms)) s++;
    return s;
}

// 2 == similarity([1, 2, 3], [1, 2, 3]);
// 0 == similarity([5, 6, 7], [1, 2, 3]);
// 0 == similarity([3, 2, 1], [1, 2, 3]);

// set of all pairs
function pairSet (l) {
    var s = {}, i, e = l.length - 1, k;
    for (i=0; i<e; i++) {
        k = [l[i], l[i+1]];
        s[k] = true;
    }
    k = [l[l.length], l[0]];
    s[k] = true;
    return s;
}

// pairSet([1, 2, 3])
// {"1,2":true,"2,3":true}

// set/intersection
function intersection (s, t) {
    var k, u = {};
    for (k in s) if (t[k]) u[k] = true;
    return u;
}

// intersection({1: true}, {3: true})
// {}
// intersection({1: true}, {1: true, 2: true})
// {"1": true}

function take (next, n) {
    var i, l = [];
    for (i=0; i<n; i++) {
        l = l.concat([next()]);
    }
    return l;
}

// destructive!
function shuffle (a) {
    var i, j, t;
    for (i=a.length - 1; i>0; i--) {
        j = Math.floor(Math.random() * i);
        t = a[j];
        a[j] = a[i];
        a[i] = t;
    }
    return a;
}

// shuffle(peeps);

function arrSet (f) {
    var s = {}, i;
    for (i=0; i<f.length; i++)
        s[f[i]] = true;
    return s;
}

function filter (next, f) {
    function lp () {
        var x = next();
        if (f(x)) return x;
        return lp();
    }
    return lp;
}

function complement (f) {
    return function (x) {
        return ! f(x);
    };
}

function remove (next, f) {
    return filter(next, complement(f));
}

function $i (id) {
    return document.getElementById(id);
}
function $n (kind) {
    return document.createElement(kind);
}

function removeChildren (dom) {
    while (dom.firstChild)
        dom.removeChild(dom.firstChild);
}

function params (qs) {
    var re = /([^&=]+)=([^&]*)/g, m,
        ps = {}, k, v;
    while ((m = re.exec(qs))) {
        k = window.decodeURIComponent(m[1]);
        v = window.decodeURIComponent(m[2]);
        if (! ps[k]) {
            ps[k] = v;
            continue;
        }
        if (ps[k] instanceof Array) ps[k].push(v);
        else ps[k] = [ps[k], v];
    }
    return ps;
}

function main () {
    var ps = params(window.location.search.slice(1)),
        k, v,
        fams = [],
        peeps,
        xs = [];

    // read in the fams from query string
    for (k in ps)
        if ('f' == k.charAt(0)) {
            v = ps[k];
            v = (v instanceof Array) ? v : [v];
            fams.push(v);
        }

    // map it to peeps
    peeps = fams.reduce(function (a, b) { return a.concat(b); });

    xs = randos(peeps);
    xs = remove(xs, isFamily(fams));
    xs = xmas(xs, ps.y, ps.s);
    // xs = xmas(xs, v('years'), v('similarity'));
    // xs = xmas(xs, 10, 1);

    // show args
    $i('fams').innerText = JSON.stringify(fams, null, 4);
    $i('args').innerText = ps.y + ' yrs, similarity ' + ps.s;
    $i('args').setAttribute('href', window.location.search);

    var rs = $i('results');
    xs.forEach(function (ls) {
        var ul = $n('tr');

        ls.forEach(function (p) {
            var li = $n('td');
            li.innerText = p;
            ul.appendChild(li);
        });

        rs.appendChild(ul);
    });
}

main();

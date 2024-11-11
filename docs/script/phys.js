const hr = 3600, day = 24 * hr, yr = 365.24 * day;
const G = 6.67e-11, Ms = 1.99e30, Me = 5.97e24, Re = 6.37e6, g = 9.81;
const c = 3.00e8, k = 8.99e9, qe = 1.6e-19, me = 9.11e-31, mp = 1.67e-27;
const h = 6.63e-34, E1 = -13.6;

// 2hc^2 = 1.19101e-16, hc/kB = 0.0143838
const planck = (w, T) => 1.19101e-16 / Math.pow(w, 5) / (Math.exp(0.0143838 / (w * T)) - 1);
const wien = (T) => 0.00289777 / T;

const orbit = function(data) {
// Solve circular orbital problems given 2 of 5 variables: r, v, T, a, M
    let w = 0;
    if (data.r) {
        let r = data.r;
        if (data.T) {
            w = 2 * pi / data.T;
            data.v = w * r;
            data.a = w * w * r;
        }
        else {
            if (data.M) {
                data.a = G * data.M / sq(r);
                w = root(data.a / r);
                data.v = w * r;
            }
            else if (data.a) {
                w = root(data.a / r);
                data.v = w * r;
            }
            else if (data.v) {
                w = data.v / r;
                data.a = w * data.v;
            }
        }
    }
    else if (data.T) {
        w = 2 * pi / data.T;
        if (data.v) {
            data.a = w * data.v;
            data.r = data.v / w;
        }
        else if (data.a) {
            data.v = data.a / w;
            data.r = data.v / w;
        }
        else if (data.M) {
            data.r = root(G * data.M / sq(w), 3)
            data.v = w * data.r;
            data.a = w * data.v;
        }
    }
    else if (data.v) {
        if (data.a) {
            w = data.a / data.v;
            data.r = data.v / w;
        }
        else if (data.M) {
            data.r = G * data.M / sq(data.v);
            w = data.v / data.r;
            data.a = w * data.v;
        }
    }
    else if (data.a && data.M) {
        data.r = root(G * data.M / data.a);
        w = root(data.a / data.r);
        data.v = w * data.r;
    }
    if (!data.M) data.M = data.a * sq(data.r) / G;
    if (!data.T) data.T = 2 * pi / w;
    return data;
}

const uam = function(info) {
    let [a, vi, vf, d, t] = [info.a, info.vi, info.vf, info.d, info.t];
    if (a == null) {
        [vi, vf, d, t] = uam.solve2(vi, vf, d, t);
        a = (vf - vi) / t;
    }
    else if (d == null) {
        [a, vi, vf, t] = uam.solve1(a, vi, vf, t);   
        d = (vi + vf) * t / 2;
    }
    else if (t == null) {
        [vf, vi, a, d] = uam.solve3(vf, vi, a, d);
        if (a == 0) t = d / (typeof(vi) == "number" ? vi : vf);
        else if (vi instanceof Array) t = [(vf - vi[0]) / a, (vf - vi[1]) / a];
        else if (vf instanceof Array) t = [(vf[0] - vi) / a, (vf[1] - vi) / a];
        else t = (vf - vi) / a;
    }
    if (vi == null) vi = d / t - a / 2 * t;
    if (vf == null) vf = d / t + a / 2 * t;
    if (t instanceof Array) {
        if (t[0] < 0) {
            t = t[1];
            if (vi instanceof Array) vi = vi[1];
            if (vf instanceof Array) vf = vf[1];
        }
        else if (t[1] < 0) {
            t = t[0];
            if (vi instanceof Array) vi = vi[0];
            if (vf instanceof Array) vf = vf[0];
        }
    }
    return {a:a, vi:vi, vf:vf, d:d, t:t}
}

uam.solve1 = (a, vi, vf, t) => {
    if (a == null) a = (vf - vi) / t;
    else if (vf == null) vf = vi + a * t;
    else if (vi == null) vi = vf - a * t;
    else if (t == null) t = (vf - vi) / a;
    return [a, vi, vf, t];
}

uam.solve2 = (vi, vf, d, t) => {
    if (d == null) d = (vi + vf) * t / 2;
    else if (vf == null) vf = 2 * d / t - vi;
    else if (vi == null) vi = 2 * d / t - vf;
    else if (t == null) t = 2 * d / (vi + vf);
    return [vi, vf, d, t];
}

uam.solve3 = (vf, vi, a, d) => {
    if (vf == null) {
        vf = root(vi * vi + 2 * a * d);
        vf = [vf, -vf];
    }
    else if (vi == null) {
        vi = root(vf * vf - 2 * a * d);
        vi = [vi, -vi];
    }
    else if (a == null) a = (vf * vf - vi * vi) / (2 * d);
    else if (d == null) d = (vf * vf - vi * vi) / (2 * a);
    return [vf, vi, a, d];
}

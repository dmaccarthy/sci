save("p20/energy/img/cons", {
 
bar: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.energygraph.graph(sel, {
        sym: ["E_k", "E_g", "E_rotn"],
        calc: (t) => {
            let E = 16.5 * t * t;
            return [5/7*E, 16.5-E, 2/7*E];
        },
        xMargin: [-1.1, 0.1],
        yMargin: [-1.8, 0.6],
        Emax: 18, dE: 1, interval: 3,
    });
},

Ex1: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.energygraph.graph(sel, {
        sym: ["E_k", "E_g"],
        calc: (t) => {
            let E0 = 0.24 * 9.81;
            let E = E0 * t * t;
            return [E, E0 - E];
        },
        xMargin: [-0.8, 0.1],
        yMargin: [-0.25, 0.1],
        Emax: 2.5, dE: 0.1, interval: 0.5, fixed: 1,
    });
},

Ex2: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.energygraph.graph(sel, {
        sym: ["E_k", "E_g"],
        data: [0.14 * 9.81, 0.981],
        xMargin: [-0.8, 0.1],
        yMargin: [-0.25, 0.1],
        Emax: 2.5, dE: 0.1, interval: 0.5, fixed: 1,
    });
},

Ex3: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.energygraph.graph(sel, {
        sym: ["E_k", "E_elas", "E_rotn", "E_g"],
        calc: (t) => {
            if (t < 0.05) return [1000*t/7, 10-200*t, 400*t/7, 0];
            t = (t - 0.05) / 0.95;
            let Eg = 10 * t * t;
            let E = (10 - Eg) / 7;
            return [5*E, 0, 2*E, Eg]
        },
        xMargin: [-1.5, 0.1],
        yMargin: [-1.5, 0.5],
        Emax: 11, dE: 1, interval: 2,
    });
},

});
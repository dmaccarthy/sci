class WordClue {

    constructor(word, clue, grid) {
        this.word = word.toUpperCase();
        this.clue = clue;
        if (grid) this.grid = grid;
    }

}

class Crossword {

    constructor(words, size, title) {
        this.size = size;
        this.title = title;
        this.modified = false;
        let w = this._words = [...words];
        for (let i=0;i<w.length;i++)
            w[i] = new WordClue(...w[i]);
    }

    static load(a) {
        cw = new Crossword(a.words, a.size, a.title);
        cw.wordlist().grid();
    }

    at(x, y) {
        let words = [];
        for (let w of this._words) if (w.grid) {
            let [c, r, d] = w.grid;
            if (c == x && r == y) words.push(w);
        }
        return words;
    }

    wordlist() {
        let div = $("#WordList").html("");
        div[0].crossword = this;
        let w = this._words;
        for (let i=0;i<w.length;i++) {
            let wi = w[i];
            let p = $("<p>").html($("<span>").html(wi.word)).appendTo(div);
            p[0].word = wi;
            if (!wi.grid) p.addClass("Unused");
        }
        div.find("p > span").on("click", (ev) => {
            cw.deselect();
            let p = $(ev.currentTarget).closest("p");
            let w = p[0].word;
            w.selected = true;
            if (ev.ctrlKey) cw.editword(w);
            else if (ev.altKey) {
                let i = p.parent().index(p[0]);
                cw.del(i);
            }
        });
        return this;
    }

    editword(w) {
        let word = prompt("Enter word...", w.word);
        if (word) {
            let clue = prompt("Enter clue...", w.clue);
            if (clue) {
                w.word = word.replaceAll(" ", "").toUpperCase();
                w.clue = clue;
            }
            this.modified = true;
            this.wordlist().grid();
        }
    }

    deselect() {
        let w = this._words;
        for (let i=0;i<w.length;i++) delete w[i].selected;
    }

    resize(c, r) {return this.grid([c, r])}

    grid(resize) {
        let tbl = $("#Crossword").html("");
        if (resize) {
            this.modified = true;
            this.size = resize;
        }
        let [cols, rows] = this.size;
        for (let r=0;r<rows;r++) {
            let tr = $("<tr>").appendTo(tbl);
            for (let c=0;c<cols;c++) $("<td>").appendTo(tr);
        }
        tbl.find("td").removeClass("Red").html("");
        let w = this._words;
        for (let i=0;i<w.length;i++) {
            let wi = w[i];
            if (wi.grid) {
                let [c, r, down] = wi.grid;
                let word = wi.word;
                for (let i=0;i<word.length;i++) {
                    let x = c + (down ? 0 : i);
                    let y = r + (down ? i : 0);
                    let td = $($(tbl.find("tr")[y]).find("td")[x]);
                    let c1 = word.charAt(i);
                    let c0 = td.html();
                    if (c0 && c1 != c0) td.html("!!").addClass("Red");
                    else td.html(c1);
                }
            }
        }
        if (!tbl.hasClass("Final")) tbl.find("td").on("click", (ev) => {
            let e = $(ev.currentTarget);
            let tr = e.closest("tr");
            let x = tr.find("td").index(e[0]);
            let y = tr.parent().find("tr").index(tr[0]);
            cw.setword(ev, x, y);
        });
        return this;
    }

    shift(x, y) {
        for (let w of this._words) {
            let g = w.grid;
            if (g) {
                g[0] += x;
                g[1] += y;
            }
        }
        this.modified = true;
        this.grid();
    }

    del(n) {
        let w = this._words;
        w.splice(n ? n : w.length - 1, 1);
        this.modified = true;
        this.wordlist().grid();
    }

    setword(ev, x, y) {
        let s, w = this._words;
        for (let i=0;i<w.length;i++) if (w[i].selected) s = i;
        w[s].grid = [x, y, ev.ctrlKey];
        $($("#WordList > p")[s]).removeClass("Unused");
        this.modified = true;
        this.grid();
    }

    newword() {
        let w = this._words;
        w.push({word: "WORD", clue: "Clue", selected: true});
        this.wordlist().editword(w[w.length-1]);
    }

    finish() {
        let w = this._words;
        let j = [], [cols, rows] = this.size;
        for (let i=0;i<w.length;i++) {
            let wi = w[i];
            j.push([wi.word, wi.clue, wi.grid]);
        }
        this.title = $("h2").text();
        if (this.modified)
            BData.init({"title": this.title, "words": j, size: this.size}, "crossword.json").save();
        $("#Crossword").addClass("Final");
        this.grid();
        $("#Icons, #WordList, #Help").remove();
        let f = (x) => $('#'+x).html($("<h3>").html(x));
        f("Across"); f("Down");
        let tr = $("#Crossword tr");
        let n = 0;
        let key = "";
        for (let r=0;r<rows;r++) {
            for (let c=0;c<cols;c++) {
                let td = $($(tr[r]).find("td")[c]);
                let letter = td.html();
                if (letter) {
                    let clue = this.at(c, r);
                    td.addClass("Letter").html(clue.length ? ++n : "");
                    for (let i=0;i<clue.length;i++) {
                        let cur = clue[i];
                        let p = $("<p>").html(`${n}. ${cur.clue}`);
                        let direct = cur.grid[2] ? "#Down" : "#Across";
                        p.appendTo(direct);
                        key += direct.charAt(1) + `,${n},${cur.word}\n`;
                    }
                }
            }
        }
        if (this.modified) BData.init(key, "crossword_key.csv").save();
        tr.find("td:not(.Letter)").css({border: "none"});
        print();
        $("#Down").closest("table").addClass("Break");
    }

}

let cw;

/*** Event handlers ***/

function loadFile() {
    let e = $("#File");
    let f = e[0].files[0];
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
        Crossword.load(JSON.parse(reader.result));
        $("h2").html(cw.title);
    });
    reader.readAsText(f); 
    e.val("");
}

function askXY(s, d) {
    let x, y;
    try {
        s = prompt(s, d).replaceAll(",", " ").trim().split(" ");
        while (s.length > 2 && s[1] == "") s.splice(1, 1);
        x = parseInt(s[0]);
        y = parseInt(s[1]);
    }
    catch(err) {x = null}
    return x != null && y != null && !isNaN(x) && !isNaN(y) ? [x, y] : null;
}

function shift() {
    let xy = askXY("Enter shift x and y shift", "1 1");
    if (xy) cw.shift(...xy);
}

function resize() {
    let [c, r] = cw.size;
    let xy = askXY("Enter new size", `${r} ${c}`);
    if (xy) cw.resize(...xy);
}

$(() => Crossword.load({size: [12, 12], words: [["ottawa", "Canada’s capital city", [0, 0]]]}))

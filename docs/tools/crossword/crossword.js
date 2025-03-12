class WordClue {

    constructor(word, clue, grid) {
        this.word = word.toUpperCase();
        this.clue = clue;
        if (grid) this.grid = grid;
    }

}

class Crossword {

    constructor(words, size) {
        this.size = size;
        let w = this._words = [...words];
        for (let i=0;i<w.length;i++)
            w[i] = new WordClue(...w[i]);
    }

    static _load(url) {
        $.ajax({url: url, success: (a) => {
            Crossword.onload(a);
        }, error: console.log})
    }

    load(url) {
        Crossword._load(url);
    }

    static onload(a) {
        cw = new Crossword(a.words, a.size);
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
        }
        div.find("p > span").on("click", (ev) => {
            cw.deselect();
            let w = $(ev.currentTarget).closest("p")[0].word;
            w.selected = true;
            if (ev.ctrlKey) cw.editword(w);
        });
        return this;
    }

    editword(w) {
        let word = prompt("Enter word...", w.word);
        if (word) {
            let clue = prompt("Enter clue...", w.clue);
            if (clue) {
                w.word = word.toUpperCase();
                w.clue = clue;
            }
        }
        this.wordlist().grid();
    }

    deselect() {
        let w = this._words;
        for (let i=0;i<w.length;i++) delete w[i].selected;
    }

    resize(c, r) {return this.grid([c, r])}

    grid(resize) {
        let tbl = $("body > table").html("");
        if (resize) this.size = resize;
        let [cols, rows] = this.size;
        for (let r=0;r<rows;r++) {
            let tr = $("<tr>").appendTo(tbl);
            for (let c=0;c<cols;c++) {
                let td = $("<td>").appendTo(tr);
            }
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
        this.grid();
    }

    del(n) {
        let w = this._words;
        w.splice(n ? n : w.length - 1, 1);
        this.wordlist().grid();
    }

    setword(ev, x, y) {
        let s, w = this._words;
        for (let i=0;i<w.length;i++) if (w[i].selected) s = w[i];
        s.grid = [x, y, ev.ctrlKey];
        this.grid();
    }

    newword() {
        let w = this._words;
        w.push({word: "WORD", clue: "Clue", selected: true});
        this.editword(w[w.length-1]);
    }

    finish() {
        let w = this._words;
        let j = [], [rows, cols] = this.size;
        for (let i=0;i<w.length;i++) {
            let wi = w[i];
            j.push([wi.word, wi.clue, wi.grid]);
        }
        BData.init({"words": j, size: this.size}, "crossword.json").save();
        $("table").addClass("Final");
        this.grid();
        $("#WordList, body > p").remove();
        let f = (x) => $('#'+x).html($("<h3>").html(x));
        f("Across"); f("Down");
        let tr = $("table tr");
        let n = 0;
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
                        p.appendTo(cur.grid[2] ? "#Down" : "#Across");
                    }
                }
            }
        }
        tr.find("td:not(.Letter)").css({border: "none"});
        print();
    }

}

let cw;

$(() => {
    let url = qsArgs("puzzle");
    Crossword._load(url ? url : "test.json");
    console.log(`Load JSON file:
   cw.load(url)

Resize grid:
   cw.resize(12, 12)

Shift grid:
   cw.shift(-1, 1)

Delete word:
  cw.del(0)`);
})

scripts.cache["cs/cs30/rec/img/rec"] = {

hanoi: sel => {
    // Create an animation instance
    let svg = new SVG2(sel, {size: [540, 192], lrbt: [-0.5, 2.5, -1, 11]}).config({frameRate: 6});

    // Draw the ground and tower axes
    let lines = svg.group("black@3").shift_by([0, "-1"]);
    for (let x=0;x<3;x++) lines.line([x, 10], [x, 0]);
    lines.line([-0.5, 0], [2.5, 0]);

    // Draw the move counter
    let step = svg.text("0", [2.4, 11, "tr"], 0, ["sans", 28]).$;

    // Create a group to contain the disks
    let disk_group = svg.group("black@1");

    let init = disks => {
        /* Reset the animation for the specified number of disks */

        // Draw the disks
        svg.pause();
        disk_group.$.html("");
        let items = []; // Array of disks
        let color = ["#0065fe", "red", "yellow", "lightgrey", "violet", "orange", "purple", "limegreen", "#ff42ca", "cyan"];
        for (let i=0;i<disks;i++) {
            let item = disk_group.group(color[i % color.length]);
            item.rect([(i+2)/(disks+2), 0.99], [0, 0, "b"]);
            items.push(item);
        }

        // Initial arrangement of disks (all in tower[0])
        let towers = [[...range(disks, 0, -1)], [], []];
        let soln = []; // Sequence of disk states
    
        // Record the current state of the towers
        let update = () => soln.push([[...towers[0]], [...towers[1]], [...towers[2]], soln.length]);

        let move = (src, dest, n) => {
            /* Recursively generate a sequence of moves for the given number of disks */
            if (n > 1) {
                let tmp = 3 - src - dest;
                move(src, tmp, n - 1);
                move(src, dest, 1);
                move(tmp, dest, n - 1);
            }
            else if (n == 1) {
                update(); // Record state before moving
                towers[dest].push(towers[src].pop());
            }
        }
    
        // Record all disk moves in an array (soln)
        move(0, 1, disks);
        update();

        return [soln, items];
    }

    let draw = i => {
        /* Position the disks for the specified move number */
        if (i >= soln.length) {
            svg.pause();
            svg.tower_step = -1;
        }
        else {
            svg.tower_step = i;
            step.find("text").html(i); // Move counter
            for (let x=0;x<3;x++) { // Tower position
                let y = 0;
                for (let d of soln[i][x]) items[d - 1].config({shift: [x, y++]});
            }
        }
    }

    svg.beforeupdate = () => {
        /* Perform one move every 10 animation frames */
        if (svg.frameCount % 10 == 0) draw(svg.tower_step + 1);
    }

    let soln = [], items; // Closure variables

    svg.hanoi = (disks, wait) => {
        /* Start the animation */
        [soln, items] = init(disks);
        draw(0);
        svg.frameCount = 1;
        if (!wait) svg.play();
    }

    svg.$.on("click", () => {
        /* Play/pause/restart the animation */
        if (soln.length) {
            svg.toggle();
            if (svg.playing) svg.frameCount = -1;
        }
    });
},

};

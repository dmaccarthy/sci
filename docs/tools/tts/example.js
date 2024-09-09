// Select voices
F = [5, {rate: 0.95, pitch: 1.1}];
M = [1, {rate: 1.0, pitch: 0.9}];
F2 = [7, {rate: 1.05, pitch: 0.9}];

// Confirm voice selection
console.log("Cast", [cast[F[0]], cast[M[0]], cast[F2[0]]]);

scene1 = () => {
    queue("Hello. This is the male narrator.", M);
    queue("Hi there. This is the female narrator.", F, 2);
    queue("Today we are going to learn about the physics of waves.", F, 2);
    queue("Hello. This is your alternate narrator.", F2, 2);
}

// Run the script
scene1();
play();

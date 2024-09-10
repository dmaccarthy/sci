// Select and confirm preferred voices
[F, M] = tts.find(["Amy", "Linda", "Liz", "Zira", "Marie"], ["Richard", "Mark", "Phil", "David", "Ned"])
F2 = [F[1], {rate: 1.05, pitch: 0.9}];
F = [F[0], {rate: 0.95, pitch: 1.1}];
M = [M[0], {rate: 1.0, pitch: 0.9}];
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

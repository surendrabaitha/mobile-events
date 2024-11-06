// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Variables to track the shake event
let lastX, lastY, lastZ;
let lastTime;

// Threshold for shake detection
const shakeThreshold = 15;

// Event listener for device motion
window.addEventListener('devicemotion', (event) => {
    const acceleration = event.accelerationIncludingGravity;

    const currentTime = new Date().getTime();
    if (lastTime && (currentTime - lastTime) > 100) {
        const diffTime = currentTime - lastTime;
        lastTime = currentTime;

        // Calculate the change in acceleration
        const deltaX = acceleration.x - lastX;
        const deltaY = acceleration.y - lastY;
        const deltaZ = acceleration.z - lastZ;

        // Calculate the shake intensity
        const shakeIntensity = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

        // If shake intensity exceeds the threshold, change the background color
        if (shakeIntensity > shakeThreshold) {
            document.body.style.backgroundColor = getRandomColor();
        }
    }

    // Update last values
    lastX = acceleration.x;
    lastY = acceleration.y;
    lastZ = acceleration.z;
});
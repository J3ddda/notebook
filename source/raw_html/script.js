function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }
  
  function rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map(x => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }
  
  // Get the complementary color by subtracting RGB values from 255
  function getComplementaryColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    const compR = 255 - r;
    const compG = 255 - g;
    const compB = 255 - b;
    return rgbToHex(compR, compG, compB);
  }
  
  document.getElementById("baseColor").addEventListener("input", function () {
    const baseColor = this.value;
    const complementary = getComplementaryColor(baseColor);
  
    // Update CSS variables
    document.documentElement.style.setProperty("--accent-color", baseColor);
    document.documentElement.style.setProperty("--bg-color", complementary);
  
    // Decide if text should be light or dark
    const { r, g, b } = hexToRgb(complementary);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    const textColor = brightness > 125 ? "#000000" : "#ffffff";
    document.documentElement.style.setProperty("--text-color", textColor);
  });
  
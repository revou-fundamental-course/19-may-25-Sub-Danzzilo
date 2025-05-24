const audio = document.getElementById("background-music");
audio.volume = 0.2;

const muteBtn = document.getElementById("mute-btn");
const muteIcon = document.getElementById("mute-icon");
const audioEl = document.getElementById("background-music");

let isMuted = false;

muteBtn.addEventListener("click", function() {
    isMuted = !isMuted;
    audioEl.muted = isMuted;
    muteIcon.src = isMuted ? "assets/audio-off-light.png" : "assets/audio-on-light.png";
});

const inputSelect = document.querySelector('.inputtemp select');
const outputSelect = document.querySelector('.outputtemp select');

inputSelect.addEventListener('change', function() {
    if (inputSelect.value === outputSelect.value) {
        outputSelect.value = inputSelect.oldValue || (inputSelect.value === "C" ? "F" : "C");
    }
    inputSelect.oldValue = inputSelect.value;
    convertTemperature(); // otomatis konversi
});

outputSelect.addEventListener('change', function() {
    if (inputSelect.value === outputSelect.value) {
        inputSelect.value = outputSelect.oldValue || (outputSelect.value === "C" ? "F" : "C");
    }
    outputSelect.oldValue = outputSelect.value;
    convertTemperature(); // otomatis konversi
});

document.querySelectorAll('details').forEach((detail) => {
    const contentEls = Array.from(detail.children).filter(el => el.tagName.toLowerCase() !== 'summary');
    detail.addEventListener('toggle', function() {
        contentEls.forEach(el => {
            if (detail.open) {
                // Reset max-height, lalu animasi ke scrollHeight
                el.style.transition = 'none';
                el.style.maxHeight = '0';
                void el.offsetWidth; // force reflow
                el.style.transition = '';
                el.style.maxHeight = el.scrollHeight + 'px';
                el.style.opacity = '1';
                detail.classList.add('open');
                // Setelah animasi selesai, set max-height ke none agar responsif
                el.addEventListener('transitionend', function handler(e) {
                    if (detail.open) el.style.maxHeight = 'none';
                    el.removeEventListener('transitionend', handler);
                });
            } else {
                // Saat tutup, animasi dari tinggi sekarang ke 0
                el.style.transition = 'none';
                el.style.maxHeight = el.scrollHeight + 'px';
                void el.offsetWidth;
                el.style.transition = '';
                el.style.maxHeight = '0';
                el.style.opacity = '0';
                // Hapus class .open setelah animasi selesai
                el.addEventListener('transitionend', function handler(e) {
                    if (!detail.open) detail.classList.remove('open');
                    el.removeEventListener('transitionend', handler);
                });
            }
        });
    });
    // Inisialisasi agar tertutup/terbuka dengan benar saat load
    if (!detail.open) {
        contentEls.forEach(el => {
            el.style.maxHeight = '0';
            el.style.opacity = '0';
        });
    } else {
        contentEls.forEach(el => {
            el.style.maxHeight = 'none';
            el.style.opacity = '1';
            detail.classList.add('open');
        });
    }
});

function convertTemperature() {
    const inputTemp = document.querySelector(".inputtemp input").value;
    const inputUnit = document.querySelector(".inputtemp select").value;
    const outputInput = document.querySelector(".outputtemp input");
    const outputSelect = document.querySelector(".outputtemp select");
    const explain = document.querySelector(".explaintemp input");
    const invalidInputmsg = "Invalid input! Please enter a numeric value!";
    const unsupportedConversionMsg = "This conversion is currently not supported.";

    if (inputUnit === "C" && outputSelect.value === "F") {
        const c = parseFloat(inputTemp);
        if (!isNaN(c)) {
            const f = c * 9/5 + 32;
            outputInput.value = f.toFixed(2);
            explain.value = `${c}°C × 9⁄5 + 32 = ${f.toFixed(2)}°F`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Celsius to Fahrenheit

    } else if (inputUnit === "C" && outputSelect.value === "K") {
        const c = parseFloat(inputTemp);
        if (!isNaN(c)) {
            const k = c + 273.15;
            outputInput.value = k.toFixed(2);
            explain.value = `${c}°C + 273.15 = ${k.toFixed(2)}°K`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Celsius to Kelvin

    } else if (inputUnit === "C" && outputSelect.value === "R") {
        const c = parseFloat(inputTemp);
        if (!isNaN(c)) {
            const r = c * 4/5;
            outputInput.value = r.toFixed(2);
            explain.value = `${c}°C × 4⁄5 = ${r.toFixed(2)}°R`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Celsius to Reaumur

    } else if (inputUnit === "F" && outputSelect.value === "C") {
        const f = parseFloat(inputTemp);
        if (!isNaN(f)) {
            const c = (f - 32) * 5/9;
            outputInput.value = c.toFixed(2);
            explain.value = `(${f}°F - 32) × 5⁄9 = ${c.toFixed(2)}°C`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Fahrenheit to Celsius

    } else if (inputUnit === "F" && outputSelect.value === "K") {
        const f = parseFloat(inputTemp);
        if (!isNaN(f)) {
            const k = (f - 32) * 5/9 + 273.15;
            outputInput.value = k.toFixed(2);
            explain.value = `(${f}°F - 32) × 5⁄9 + 273.15 = ${k.toFixed(2)}°K`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Fahrenheit to Kelvin

    } else if (inputUnit === "F" && outputSelect.value === "R") {
        const f = parseFloat(inputTemp);
        if (!isNaN(f)) {
            const r = (f + 32) * 4/9;
            outputInput.value = r.toFixed(2);
            explain.value = `(${f}°F + 32) × 4⁄9 = ${r.toFixed(2)}°R`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Fahrenheit to Reaumur
        
    } else if (inputUnit === "K" && outputSelect.value === "C") {
        const k = parseFloat(inputTemp);
        if (!isNaN(k)) {
            const c = k - 273.15;
            outputInput.value = c.toFixed(2);
            explain.value = `${k}°K - 273.15 = ${c.toFixed(2)}°C`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Kelvin to Celsius

    } else if (inputUnit === "K" && outputSelect.value === "F") {
        const k = parseFloat(inputTemp);
        if (!isNaN(k)) {
            const f = (k - 273.15) * 9/5 + 32;
            outputInput.value = f.toFixed(2);
            explain.value = `(${k}°K - 273.15) × 9⁄5 + 32 = ${f.toFixed(2)}°F`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Kelvin to Fahrenheit

    } else if (inputUnit === "K" && outputSelect.value === "R") {
        const k = parseFloat(inputTemp);
        if (!isNaN(k)) {
            const r = (k - 273.15) * 4/5;
            outputInput.value = r.toFixed(2);
            explain.value = `(${k}°K - 273.15) × 4⁄5 = ${r.toFixed(2)}°R`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Kelvin to Reaumur

    } else if (inputUnit === "R" && outputSelect.value === "C") {
        const r = parseFloat(inputTemp);
        if (!isNaN(r)) {
            const c = r * 5/4;
            outputInput.value = c.toFixed(2);
            explain.value = `${r}°R × 5⁄4 = ${c.toFixed(2)}°C`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Reaumur to Celsius

    } else if (inputUnit === "R" && outputSelect.value === "F") {
        const r = parseFloat(inputTemp);
        if (!isNaN(r)) {
            const f = r * 9/4 + 32;
            outputInput.value = f.toFixed(2);
            explain.value = `${r}°R × 9⁄4 + 32 = ${f.toFixed(2)}°F`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Reaumur to Fahrenheit

    } else if (inputUnit === "R" && outputSelect.value === "K") {
        const r = parseFloat(inputTemp);
        if (!isNaN(r)) {
            const k = r * 5/4 + 273.15;
            outputInput.value = k.toFixed(2);
            explain.value = `${r}°R × 5⁄4 + 273.15 = ${k.toFixed(2)}°K`;
        } else {
            outputInput.value = "";
            explain.value = invalidInputmsg;
        }
        // Convert Reaumur to Kelvin

    } else {
        outputInput.value = "";
        explain.value = unsupportedConversionMsg;
    }
};

document.getElementById("convert").addEventListener("click", convertTemperature);

const swapBtn = document.getElementById("swap");
const inputTempInput = document.querySelector(".inputtemp input");
const outputTempInput = document.querySelector(".outputtemp input");

swapBtn.addEventListener("click", function() {
    // Swap satuan
    const tempUnit = inputSelect.value;
    inputSelect.value = outputSelect.value;
    outputSelect.value = tempUnit;

    // Swap nilai
    const tempValue = inputTempInput.value;
    inputTempInput.value = outputTempInput.value;
    outputTempInput.value = tempValue;

    // Konversi ulang
    convertTemperature();
});
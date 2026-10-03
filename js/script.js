/* ========================================
   DARK MODE
======================================== */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "Light mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.textContent = "Dark mode";
        localStorage.setItem("theme", "light");
    }
});


/* ========================================
   REMEMBER THEME
======================================== */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "Light mode";
}


/* ========================================
   MOBILE MENU
======================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.textContent = isOpen ? "Close" : "Menu";
});


/* ========================================
   CLOSE MOBILE MENU AFTER CLICK
======================================== */

const navLinks = nav.querySelectorAll("a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.textContent = "Menu";
    });
});


/* ========================================
   FOOTER YEAR
======================================== */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ========================================
   DATA PLOT
======================================== */

const plot = document.getElementById("plot");
const fitText = document.getElementById("fitText");
const resample = document.getElementById("resample");

function generatePlot() {

    plot.innerHTML = "";

    const width = 400;
    const height = 300;

    const padding = 35;

    const points = [];

    /* Generate random data */
    for (let i = 0; i < 35; i++) {

        const x = Math.random() * 330 + 35;

        const trend = 0.55 * x;

        const noise = (Math.random() - 0.5) * 100;

        const y = height - padding - trend - noise;

        points.push({
            x: x,
            y: Math.max(25, Math.min(height - 25, y))
        });
    }


    /* SVG namespace */
    const svgNS = "http://www.w3.org/2000/svg";


    /* Grid */

    for (let i = 0; i <= 5; i++) {

        const y = 30 + i * 48;

        const line = document.createElementNS(svgNS, "line");

        line.setAttribute("x1", padding);
        line.setAttribute("x2", width - padding);

        line.setAttribute("y1", y);
        line.setAttribute("y2", y);

        line.setAttribute("stroke", "currentColor");

        line.setAttribute("opacity", "0.1");

        plot.appendChild(line);
    }


    /* Scatter points */

    points.forEach(point => {

        const circle =
            document.createElementNS(svgNS, "circle");

        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);

        circle.setAttribute("r", "4");

        circle.setAttribute("fill", "#ff5a1f");

        circle.setAttribute("opacity", "0.75");

        plot.appendChild(circle);
    });


    /* Simple fitted line */

    const line =
        document.createElementNS(svgNS, "line");

    line.setAttribute("x1", 35);
    line.setAttribute("y1", 235);

    line.setAttribute("x2", 365);
    line.setAttribute("y2", 65);

    line.setAttribute("stroke", "#171717");

    line.setAttribute("stroke-width", "3");

    line.setAttribute("stroke-linecap", "round");

    plot.appendChild(line);


    /* Text */

    fitText.textContent =
        "Linear fit • noisy sample • n = 35";
}


/* Initial plot */

if (plot && fitText) {
    generatePlot();
}


/* Resample */

if (resample) {
    resample.addEventListener("click", generatePlot);
}
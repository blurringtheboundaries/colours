// Data for the timeline
        const data = [
            { color: "Red", start: "00:00", end: "01:00" },
            { color: "Indigo", start: "01:00", end: "01:30" },
            { color: "Magenta", start: "01:30", end: "02:22" },
            { color: "Green", start: "02:22", end: "03:00" },
            { color: "Blue", start: "03:00", end: "04:00" }
        ];

        // Parse the time strings into Date objects
        const parseTime = d3.timeParse("%M:%S");
        const formatTime = d3.timeFormat("%M:%S");

        data.forEach(d => {
            d.startParsed = parseTime(d.start);
            d.endParsed = parseTime(d.end);
        });

        // Set dimensions
        const margin = { top: 20, right: 30, bottom: 30, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Set up SVG
        const svg = d3.select("#timeline")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Set up scales
        const xScale = d3.scaleTime()
            .domain([parseTime("00:00"), parseTime("04:00")])
            .range([0, width]);

        const yScale = d3.scaleBand()
            .domain(data.map(d => d.color))
            .range([0, height])
            .padding(0.1);

        // Add axes
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickFormat(formatTime));

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));

        // Add bars
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.startParsed))
            .attr("y", d => yScale(d.color))
            .attr("width", d => xScale(d.endParsed) - xScale(d.startParsed))
            .attr("height", yScale.bandwidth())
            .attr("fill", d => d.color.toLowerCase());

        // Save SVG
        document.getElementById("saveButton").addEventListener("click", () => {
            const svgData = new XMLSerializer().serializeToString(document.querySelector("svg"));
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const svgUrl = URL.createObjectURL(svgBlob);
            const downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = "timeline.svg";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });

// function applyColorsToBars() {
//     svg.selectAll(".bar")
//         .data(data)
//         .attr("fill", d => d.color.toLowerCase());
// }


// applyColorsToBars();
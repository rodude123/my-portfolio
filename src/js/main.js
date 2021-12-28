// scrolling effect
const scrollLimit = 150;

// array with texts to type in typewriter
var dataText = ["full stack developer", "web designer", "student", "gamer", "drummer"];

window.onscroll = () =>
{
	// check if scrolled past limit if so add scrolled class to change background of nav
	if (document.body.scrollTop >= scrollLimit || document.documentElement.scrollTop >= scrollLimit)
	{
		document.querySelector("nav").classList.add("scrolled");
	}
	else
	{
		document.querySelector("nav").classList.remove("scrolled");
	}

	let current = ""; //id of current section scrolled to, set to "" if at top
	// go through all sections and find current section id scrolled to
	document.querySelectorAll("section").forEach((section) =>
	{
		const sectionTop = section.offsetTop;
		if (window.pageYOffset >= sectionTop - 60)
		{
			current = section.getAttribute("id");
		}
	});

	// go through all nav links, remove active class and add it to the link whose href matches the current id scrolled
	// to
	document.querySelectorAll("nav ul li a").forEach((a) =>
	{
		a.classList.remove("active");
		if (a.href.includes(current) && current !== "")
		{
			a.classList.add("active");
		}
		else if (current === "")
		{
			document.querySelector("nav ul li a").classList.add("active"); // at the top
		}
	});
};

// typewriter effect

/**
 * typeWriter function
 * type one character at a time in the typewriter
 * keeps calling itself until the text is finished
 * @param {string} text text to type
 * @param {number} i current index at which the next character should be typed
 * @param {function} fnCallback function to call back in this case the StartTextAnimation function
 */
function typeWriter(text, i, fnCallback)
{
    // check if text isn't finished yet
    if (i < (text.length))
    {
        // add next character to h1
        document.querySelector("header div h1").innerHTML = text.substring(0, i + 1) + "<span aria-hidden=\"true\">_</span>";

        // wait for a while and call this function again for next character
        setTimeout(function ()
        {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == "function")
    {
        // call callback after timeout
        setTimeout(fnCallback, 700);
    }
}

/**
 * StartTextAnimation function
 * start a typewriter animation for a text in the dataText array
 * @param {number} i current index at which text should be typed next
 */
function StartTextAnimation(i)
{
    if (typeof dataText[i] === "undefined")
    {
        setTimeout(function ()
        {
            StartTextAnimation(0);
        }, 1500);
    }
    else if (i < dataText[i].length)
    {
        // text exists! start typewriter animation
        typeWriter(dataText[i], 0, function ()
        {
            // after callback (and whole text has been animated), start next text
            setTimeout(StartTextAnimation, 1500, i + 1);
        });
    }
}

// cv timeline data
/**
 * getTimelineData function
 * Gets the timeline data from backend route and appends the data on to the timeline.
 */
function getTimelineData()
{
	fetch("/api/timelineData/edu").then(res =>
	{
		res.json().then(json =>
		{
			if (res.ok)
			{
				json.forEach(item =>
				{
					let timelineItem = document.createElement("div")
					timelineItem.classList.add("timelineItem");
					timelineItem.innerHTML = `
					<h3 class="timelineHeader">${item["startPeriod"]} - ${item["endPeriod"]}</h3>
					<span>Grade: ${item["grade"]}</span>
					<p class="timelineText">${item["course"]}</p>
				`;
					document.getElementById("edu").appendChild(timelineItem);
				});
			}
		})
	});

	fetch("/api/timelineData/work").then(res =>
	{
		res.json().then(json =>
		{
			if (res.ok)
			{
				json.forEach(item =>
				{
					let timelineItem = document.createElement("div")
					timelineItem.classList.add("timelineItem");
					timelineItem.innerHTML = `
					<h3 class="timelineHeader">${item["startPeriod"]} - ${item["endPeriod"]}</h3>
					<span>${item["companyName"]} - ${item["area"]}</span>
					<p class="timelineText">${item["title"]}</p>
				`;
					document.getElementById("work").appendChild(timelineItem);
				})
			}
		})
	})
}

/**
 * getProjectData function
 * Gets the project data from the backend route and appends the data on to the timeline.
 */
function getProjectData()
{
	fetch("/api/projectData").then(res =>
	{
		res.json().then(json =>
		{
			if (res.ok)
			{
				json.forEach(item =>
				{
					if (item["isMainProject"] === "1")
					{
						document.getElementById("mainProj").innerHTML = `
						<h1>${item["title"]}</h1>
						<div>
							<img src="imgs/1000x800.jpg" alt="">
							<div class="flexRow">
								<p>${item["information"]}</p>
								<div class="flexCol">
									<a href="${(item["projectLink"] === "N/A") ? "#" : item["projectLink"]}" class="btn btnPrimary boxShadowIn boxShadowOut" ${(item["projectLink"] === "N/A") ? "disabled=\"disabled\"" : ""}>View Project</a>
									<a href="${(item["githubLink"] === "N/A") ? "#" : item["gitubLink"]}" class="btn btnOutline boxShadowIn boxShadowOut" ${(item["githubLink"] === "N/A") ? "disabled=\"disabled\"" : ""}>GitHub</a>
								</div>
							</div>
						</div>
						`;
                        return null;
					}

                    document.querySelector("#otherProj div").innerHTML += `
                    <div class="oProjItem">
                        <img src="imgs/500x400.jpg" alt="">
                        <div class="flexCol">
                            <div>
                                <p>${item["information"]}</p>
                            </div>
                            <div>
                                <a href="${(item["projectLink"] === "N/A") ? "#" : item["projectLink"]}" class="btn btnPrimary boxShadowIn boxShadowOut"${(item["projectLink"] === "N/A") ? "disabled=\"disabled\"" : ""}>View Project</a>
                                <a href="${(item["githubLink"] === "N/A") ? "#" : item["gitubLink"]}" class="btn btnOutline boxShadowIn boxShadowOut">${(item["githubLink"] === "N/A") ? "disabled=\"disabled\"" : ""}Github</a>
                            </div>
                        </div>
                    </div>
                    `;
				})
			}
		})
	})
}

document.addEventListener('DOMContentLoaded', () =>
{
    // start the text animation
    StartTextAnimation(0);

    // get timeline data and add it to the timeline
	getTimelineData();

	// get projectData
	getProjectData();
});
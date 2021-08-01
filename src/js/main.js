// scrolling effect
const scrollLimit = 150;
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

document.addEventListener('DOMContentLoaded', () =>
{
	// array with texts to type in typewriter
	var dataText = [ "full stack developer", "web designer", "student", "gamer", "drummer"];

	// type one text in the typwriter
	// keeps calling itself until the text is finished
	function typeWriter(text, i, fnCallback) {
		// chekc if text isn't finished yet
		if (i < (text.length)) {
			// add next character to h1
			document.querySelector("header div h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true">_</span>';

			// wait for a while and call this function again for next character
			setTimeout(function() {
				typeWriter(text, i + 1, fnCallback)
			}, 100);
		}
		// text finished, call callback if there is a callback function
		else if (typeof fnCallback == 'function') {
			// call callback after timeout
			setTimeout(fnCallback, 700);
		}
	}
	// start a typewriter animation for a text in the dataText array
	function StartTextAnimation(i) {
		if (typeof dataText[i] === 'undefined'){
			setTimeout(function() {
				StartTextAnimation(0);
			}, 1500);
			// StartTextAnimation(0);
		}
		else if (i < dataText[i].length) {
			// text exists! start typewriter animation
			typeWriter(dataText[i], 0, function(){
				// after callback (and whole text has been animated), start next text
				setTimeout(StartTextAnimation, 1500, i + 1);
			});
		}
	}
	// start the text animation
	StartTextAnimation(0);
});


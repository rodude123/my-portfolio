window.onscroll = () =>
{
	if (document.body.scrollTop >= 150 || document.documentElement.scrollTop >= 150)
	{
		document.querySelector("nav").classList.add("scrolled");
	}
	else
	{
		document.querySelector("nav").classList.remove("scrolled");
	}
	
	let current = "";
	
	document.querySelectorAll("section").forEach((section) =>
	{
		const sectionTop = section.offsetTop;
		if (window.pageYOffset >= sectionTop - 60)
		{
			current = section.getAttribute("id");
		}
	});
	
	document.querySelectorAll("nav ul li").forEach((li) =>
	{
		li.firstChild.classList.remove("active");
		if (li.firstChild.href.includes(current) && current !== "")
		{
			li.firstChild.classList.add("active");
		}
		else if (current === "")
		{
			document.querySelector("nav ul li").firstChild.classList.add("active");
		}
	});
};

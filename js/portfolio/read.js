$(document).ready(function () {
	$.ajax({
		url: "/assets/json/portfolio/list.json",
		success: function (response) {
			renderPortfolioItems(response);
        }
	})
});

function renderPortfolioItems(obj) {
	let html = '';
	$.each(obj.Projects, function () {
		html += getItemHtml(this);
	});

	$('#portfolioWrapper').html(html);
}

function getItemHtml(obj) {
	return `
		<div class="col">
            <div class="card h-100">
                <a href="${obj.URL}">
                    <img src="${obj.Thumbnail}" class="card-img-top">
                </a>
                <div class="card-body">
                    <p class="card-subtitle">${obj.Subtitle}</p>
                    <a href="${obj.URL}" class="card-title">${obj.Title}</a>
                </div>
                <div class="card-footer pt-0">
                    <a href="${obj.URL}" class="btn btn-secondary">Read more</a>
                </div>
            </div>
        </div>
	`;
}
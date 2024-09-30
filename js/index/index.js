$(document).ready(function () {
	$.ajax({
		url: "/assets/json/index/list.json",
		success: function (response) {
			renderFeaturedItems(response);
        }
	})
});

function renderFeaturedItems(obj) {
	let html = '';
	$.each(obj.Featured, function () {
		html += getItemHtml(this);
	});

	$('#featuredItemsWrapper').html(html);
}

function getItemHtml(obj) {
	return `
	<a href="${obj.URL}" class="cc-item-card">
        <div class="cc-thumbnail">
            <img src="${obj.Thumbnail}" />
        </div>
        <div class="cc-subtitle">${obj.Subtitle}</div>
        <div class="cc-title">${obj.Title}</div>
    </a>
	`;
}
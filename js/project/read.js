$(document).ready(function () {

    const path = getQueryParam("p");
    const url = `/assets/json/project/${path}/read.json`;

    $.ajax({
        url: url,
        success: function (response) {
            $('#title, #breadcrumb').text(response.Title);
            $('#subtitle').text(response.Subtitle);
            $('#fullBannerWrapper').css({ 'background-color': response.ThemeColor, 'background-image': `url('${response.Banner}')` });
            renderGalleryItems(response);
        }
    });

    $(document).on('click', '[data-image]', function () {
        let image = $(this).data('image');
        $('#galleryPreview').attr('src', image);
    });

    $('#modal').on('shown.bs.modal', function () {
        history.pushState({ modalOpen: true }, '', '#modal');
    });

    $('#modal').on('hidden.bs.modal', function () {
        if (history.state && history.state.modalOpen) {
            history.back();
        }
    });

    window.addEventListener('popstate', function () {
        $('#modal').modal('hide');
    });
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function renderGalleryItems(obj) {
	let html = '';
    $.each(obj.GalleryItems, function () {
		html += getItemHtml(this);
	});

	$('#galleryWrapper').html(html);
}

function getItemHtml(obj) {
	return `
        <div class="col">
            <div class="card h-100 cc-gallery-item" data-bs-toggle="modal" data-bs-target="#modal" data-image="${obj.Image}">
                <img src="${obj.Thumbnail}" class="card-img cc-card-img">
                <div class="card-img-overlay cc-img-overlay">
                    <img src="/assets/img/project-search-plus.png" width="84" />
                </div>
            </div>
        </div>
	`;
}
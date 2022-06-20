function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

$(document).ready(function () {

    $(".hero-slider .carousel").slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000
    });

    if ($("#map").length) {

        var mapOptions = {
            zoom: 13,
            disableDefaultUI: true,
            center: { lat: 1.347933, lng: 103.880843 },
            styles: [{ "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#d3d3d3" }] }, { "featureType": "transit", "stylers": [{ "color": "#808080" }, { "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }, { "color": "#b3b3b3" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": 1.8 }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "color": "#d7d7d7" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ebebeb" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#a7a7a7" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ebebeb" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#696969" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "color": "#737373" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#d6d6d6" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, {}, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "color": "#dadada" }] }]
        };
        var mapElement = $('#map'),
            map = new google.maps.Map(document.getElementById('map'), mapOptions),
            marker = new google.maps.Marker({
                position: { lat: 1.347933, lng: 103.880843 },
                map: map
            });

    }

    // $('.modal .close').on('click', function (e) {
    //     e.preventDefault();
    //     $.modal().close();
    // });

    // $('[data-toggle="modal"]').on("click", function (e) {
    //     e.preventDefault();
    //     $($(this).data("target")).modal().open();
    // });

    if($("#thumbnail-grid").length) {
        Grid.init();
    }

    if(is_touch_device()) {
        $("body").addClass("no-pointer");

        $("nav > ul > li > a + ul").each(function(){
            $(this).closest("li").find("> a").attr("href", "javascript:void(0);");
        });

    }

    $(".menu-icon").click(function(){
        $("body").toggleClass("menu-open")
    });

    $("form").on("submit", function(e){
        var $form = $(this),
            data = getFormData($form),
            actionUrl = $form.attr("action");
        e.preventDefault();
        $.post(
            actionUrl,
            data,
            null,
            "json" // dataType must be set to json
          )
        .then(function (response) {
            $form[0].reset();
            $form.append("Enquiry submitted successfully!")
        })
        .catch(function (response) {
            console.error(response);
        });
    });

});
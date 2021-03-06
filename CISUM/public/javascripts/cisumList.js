/**
 * @author 이의현, 김민석, 김헌준
 * @version 0.0.1
 * @since 2020-11-03
 */

$(document).ready(function () {
    $("#left-menu").on("click", "#btn_search", function () {
        $.ajax({
            type: "POST",
            url: "/cisum/search/",
            data: $("#search"),

            success: function (result) {
                // var newHtml = $(result).find("#left-menu");
                $("#left-menu").html(result);
            },
            error: function (error) {
                alert("Error!");
            },
        });
    });

    $(".list-add-button")
        .unbind("click")
        .bind("click", function () {
            var csVO = $(this).data("id");

            $.ajax({
                type: "POST",
                url: "/cisum/addlist/",
                accept: "application/json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ 'csVO': csVO, 'userJSON': userJSON }),
                success: function (result) {
                    $("#playlist-body").html(result);

                    if (__player === undefined) {
                        createYouTubePlayer(
                            $("#play_view_tr_0 img").data("id")
                        );
                        titleChange(0);
                    }
                },
                error: function (error) {
                    alert("Error!");
                },
            });
        });
});

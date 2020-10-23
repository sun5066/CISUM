$(document).ready(function () {
    $("#left-menu").on("click", "#btn_search", function () {
        $.ajax({
            type: "POST",
            url: "/cisum/search/",
            data: $("#search"),

            error: function (error) {
                alert("Error!");
            },
            success: function (result) {
                // var newHtml = $(result).find("#left-menu");
                $("#left-menu").html(result);
            },
        });
    });

    $(document)
        .off()
        .on("click", ".list-add-button", function () {
            var data = $(this).data("id");
            $.ajax({
                type: "POST",
                url: "/cisum/addlist/",
                data,

                error: function (error) {
                    alert("Error!");
                },
                success: function (result) {
                    $("#playlist-body").html(result);

                    // 첫번째로 추가된 영상인경우 바로 재생
                    var listSize = $(".play-list").length;
                    if (listSize > 0) {
                        firstPlayVideo($("#play_view_tr_0 img").data("id"));
                    }
                },
            });
        });
});

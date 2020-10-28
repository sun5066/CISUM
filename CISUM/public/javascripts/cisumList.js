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
    
    $("i.fas.fa-search").click(function(e){
        $(".container-searchList").toggle();
        $(".container-searchList").toggleClass("open");

        if($(".container-searchList").hasClass("open")){
            $(".container-searchList").find("i").attr("class","fas fa-bars");
        } else {
            $(".container-searchList").find("i").attr("class","fas fa-search");
        }
    })
});
/*
     //접기/펼치기
        $(".btn").click(function(e){
            e.preventDefault();
            $(".nav").slideToggle();
            $(".btn").toggleClass("open");

            if($(".btn").hasClass("open")){
                //open이 있을 때
                $(".btn").find("i").attr("class","fa fa-angle-up");
            } else {
                //open이 없을 때
                $(".btn").find("i").attr("class","fa fa-angle-down");
            }
        });
*/
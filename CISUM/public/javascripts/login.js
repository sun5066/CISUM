$(function () {
    __init();
    $("#register").click(function () {
        let email = $("#email");
        let password = $("#password");
        register(email, password);
    });
});

/**
 * @author 이의현, 김민석, 김헌준
 * @version 0.0.1
 * @since 2020-11-03
 */

const firebaseConfig = {
    apiKey: "AIzaSyD2OeUNDTpU2l9eh0ZR0gTXBAJ_KU-vbZQ",
    authDomain: "test-4d92f.firebaseapp.com",
    databaseURL: "https://test-4d92f.firebaseio.com",
    projectId: "test-4d92f",
    storageBucket: "test-4d92f.appspot.com",
    messagingSenderId: "609390900195",
    appId: "1:609390900195:web:25f5270405789de6d2e6d6",
    measurementId: "G-DCHZTY80LM",
};

var userJSON = {};

// 나의 파이어베이스 서버에 연결
var defaultProject = firebase.initializeApp(firebaseConfig);

// 파이어베이스 서버에 있는 DB 담기
var defaultStorage = firebase.storage();
var defaultFirestore = firebase.firestore();

// 로그인 기능
function login(email, password) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (result) {
            $("div#login-modal").css("display", "none");
        })
        .catch(function (error) {
            var errorCode = error.code;
            console.log(errorCode);
            if (errorCode === "auth/wrong-password") {
                alert("아이디/비밀번호가 맞지 않습니다!");
                return;
            }
            if (errorCode === "auth/invalid-email") {
                alert("찾을 수 없는 계정입니다!");
                return;
            }
        });
}

// 회원가입 기능
function register(email, password) {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

function getUser() {
    /**
     * @example 데이터 코드
     * var displayName = user.displayName;
     * var email = user.email;
     * var emailVerified = user.emailVerified;
     * var photoURL = user.photoURL;
     * var isAnonymous = user.isAnonymous;
     * var uid = user.uid;
     * var providerData = user.providerData;
     */
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            const login_btn = document.getElementById("login_a");
            login_btn.setAttribute("class", "fas fa-toggle-on");
            login_btn.setAttribute("data-email", user.email);

            userJSON = {
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                photoURL: user.photoURL,
                isAnonymous: user.isAnonymous,
                uid: user.uid,
            };

            $.ajax({
                url: "/cisum/playlist/" + user.email,
                type: "GET",
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
                    alert("서버 통신 오류 :(");
                },
            });
        } else {
            // User is signed out.
            document
                .getElementById("login_a")
                .setAttribute("class", "fas fa-toggle-off");
        }
    });
}

function signOut() {
    firebase
        .auth()
        .signOut()
        .then(function () {
            // Sign-out successful.
        })
        .catch(function (error) {
            // An error happened.
        });
}

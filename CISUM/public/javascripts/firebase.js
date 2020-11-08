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
const login = (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
            $("div#login-modal").css("display", "none");
        })
        .catch((error) => {
            var status = $("#login-status-text");
            var errorCode = error.code;
            if (errorCode === "auth/wrong-password") {
                status.text("아이디/비밀번호가 맞지 않습니다.");
                return;
            }
            if (errorCode === "auth/invalid-email") {
                status.text("찾을 수 없는 계정입니다.");
                return;
            }
        });
};

// 회원가입 기능
const register = (email, password) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            $("div#login-modal").html(result);
        })
        .catch((error) => {
            var status = $("#join-status-text");
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === "auth/email-already-in-use") {
                status.text("이미 사용중인 이메일입니다.");
            } else if (errorCode === "auth/invalid-email") {
                status.text("메일 주소가 올바르지 않습니다.");
            } else if (errorCode === "auth/operation-not-allowed") {
                status.text("허가되지 않은 이메일입니다.");
            } else if (errorCode === "auth/weak-password") {
                status.text("암호를 좀더 강력하게 해주세요.");
            }
        });
};

const getUser = () => {
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
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            $("div#login-modal").css("display", "none");

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
                success: (result) => {
                    $("#playlist-body").html(result);

                    if (__player === undefined) {
                        createYouTubePlayer(
                            $("#play_view_tr_0 img").data("id")
                        );
                        titleChange(0);
                    }
                },
                error: (error) => {
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
};

const signOut = () => {
    firebase
        .auth()
        .signOut()
        .then((result) => {
            // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
        });
};

const googleLoginPopup = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/plus.login");
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(error);
        });
};

const twitterLoginPopup = () => {
    var provider = new firebase.auth.TwitterAuthProvider();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (authData) {
        })
        .catch(function (error) {
            console.log(error);
        });
};

const facebookLoginPopup = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("user_birthday");

    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (authData) {
        })
        .catch(function (error) {
            console.log(error);
        });
};

const githubLoginPopup = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");

    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log("성공!");
        })
        .catch(function (error) {
            console.log(error);
        });
};

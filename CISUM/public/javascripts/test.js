document.addEventListener("DOMContentLoaded", function () {
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
    var defaultProject = firebase.initializeApp(firebaseConfig);
    console.log(defaultProject.name);

    var defaultStorage = defaultProject.storage();
    var defaultFirestore = defaultProject.firestore();

    defaultStorage = firebase.storage();
    console.log(defaultStorage);
    defaultFirestore = firebase.firestore();
    console.log(defaultFirestore);

    // firebase
    //     .auth()
    //     .createUserWithEmailAndPassword("vasco_@naver.com", "sadasd22")
    //     .catch(function (error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         // ...
    //     });
});

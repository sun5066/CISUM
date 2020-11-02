/**
 * @author 이의현, 김민석, 김헌준
 * @version 0.0.1
 * @since 2020-11-03
 */

const express = require("express");
const router = express.Router();
const YoutubeNode = require("youtube-node");
const ytdl = require("ytdl-core");
const { v4: uuidv4 } = require('uuid');
var csVO = require("../models/csVO");

/**
 * @param 'order', 'rating' 평점 순으로 정렬
 * @param 'type', 'video' 타입 지정
 * @param 'videoLicense', 'creativeCommon' 크리에이티브 커먼즈 아이템만 불러옴
 */
router.post("/search", (req, res) => {
    var word = req.body.word;
    var youtube = new YoutubeNode();
    youtube.setKey("AIzaSyAlDuYSZyqDcJGGZvjbXxgv21_0pGrnKYE");
    youtube.addParam("order", "rating");
    youtube.addParam("type", "video");
    youtube.addParam("videoLicense", "creativeCommon");
    youtube.search(word, 5, function (error, result) {
        var cisumList = [];

        if (error) {
            console.log("트래픽 제한 걸림!");
            cisumList = defaultList();

            res.render("cisumList", {
                cisumList,
                search_word: "트래픽 제한 걸림!",
            });
            return;
        }

        var itemList = result["items"];
        for (var i in itemList) {
            var item = itemList[i];

            cisumList.push({
                cs_id: item["id"]["videoId"],
                cs_title: item["snippet"]["title"],
            });
        }

        res.render("cisumList", {
            cisumList: cisumList,
            search_word: word + " 검색결과",
        });
    });
});

/**
 * 사용자의 PlayList에 데이터 추가하는 메서드
 * @param json 검색창에서 보낸 데이터를 json 형식으로 변경
 * @param csVO 모델(DB)에 저장후
 * 메인화면과 /cisum/playlist/ 페이지 연결
 */
router.post("/addlist", (req, res) => {
    const json = JSON.parse(JSON.stringify(req.body));
    const userJSON = json['userJSON'];
    const csJSON = json['csVO'];
    const email = userJSON['email'];
    csJSON.user_email = email;

    let dataBase = new csVO(csJSON);
    dataBase
        .save()
        .then(function () {
            res.redirect("/cisum/playlist/" + email);
        })
        .catch(function (error) {
            console.log(error);
        });
});

/**
 * @param email params로 받은 email 값을 기준으로 DB 조회해서
 * 해당 email 이랑 일치한 값들만 리스트에 담기
 */
router.get("/playlist/:email", (req, res) => {
    let email = req.params.email;

    csVO.find({ "user_email": email })
        .then(function (csList) {
            res.render("playList", { csList });
        })
        .catch(function (error) {
            console.log(error);
        });
});

/**
 * @param id 는 Spring의 PathVariable 방식으로
 * @url http://localhost:3000/cisum/delete/id 값으로 오면 해당 id 값을 DB에서 찾아서 삭제
 */
router.get("/delete/:id/:email", (req, res) => {
    let _id = req.params.id;
    let email = req.params.email;
    console.log(email);
    csVO.findOneAndDelete({ _id })
        .then(function (result) {
            res.redirect("/cisum/playlist/" + email);
        })
        .catch(function (error) {
            console.log(error);
        });
});

/**
 * @url http://localhost:3000/cisum/login 로그인 화면 출력
 * @url http://localhost:3000/cisum/join 회원가입 화면 출력
 */
router.get("/login", (req, res) => {
    res.render("login", { title: "CISUM Player" });
});

router.get("/join", (req, res) => {
    res.render("join", { title: "CISUM Player" });
});

router.get("/video", (req, res) => {
    res.render("player");
});

router.get("/user", (req, res) => {
    res.render("user");
});

/**
 * @param id 로 다운로드 받을 유튜브 동영상의 url을 전달받아서
 * 인코딩후 ytdl 를 사용해서 .mp4 동영상 다운로드
 */
router.get("/download/:id", (req, res) => {
    var url = req.params.id;
    res.header(
        "Content-Disposition",
        'attachment;  filename="' + url + '".mp4'
    );
    ytdl(url, { format: "mp4" }).pipe(res);
});

/**
 * @HACK 검색시 YouTubeAPI 트래픽이 초과되었을때
 * 임의적인 데이터를 List 형식으로 반환
 */
function defaultList() {
    var cisumList = [
        {
            cs_id: "63w0XSapMf4",
            cs_title: "[녹음실 LIVE] 이진성 - 사실 나는 (원곡 : 경서예지)",
        },
        {
            cs_id: "1-JkDHQq1LY",
            cs_title: "범키 - 여기저기거기 (Feat. 수퍼비)",
        },
        {
            cs_id: "tlHTOlnPcbs",
            cs_title:
                "[MV] Monday Kiz(먼데이 키즈) _ My love has faded away(사랑이 식었다고 말해도 돼)",
        },
        {
            cs_id: "qBl1tpR_rbU",
            cs_title: "[MV] DK _ Lie(거짓말)",
        },
        {
            cs_id: "556I2f5311I",
            cs_title: "디셈버 DK 반만 Cover (원곡 진민호)",
        },
        {
            cs_id: "ltpHz8HGHKg",
            cs_title:
                "디셈버(DECEMBER) DK '거짓말' 소름돋는 라이브 '3옥타브 미 실화?'",
        },
        {
            cs_id: "JXJJkELW_Is",
            cs_title: "WASABI room freestyle vol.2 - 릴보이 (lIlBOI)",
        },
        {
            cs_id: "7pL7prArpfg",
            cs_title: "WASABI room freestyle vol.3 - 김태균 (TAKEONE)",
        },
        {
            cs_id: "x4Jwmyevto0",
            cs_title: "사실 나는 - 전건호 SOLO LlVE (원곡:경서예지)",
        },
    ];
    return cisumList;
}

module.exports = router;

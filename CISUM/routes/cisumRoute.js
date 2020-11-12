/**
 * @author 이의현, 김민석
 * @version 0.0.1
 * @since 2020-11-03
 */

const express = require("express");
const router = express.Router();
const YoutubeNode = require("youtube-node");
const ytdl = require("ytdl-core");
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
    youtube.addParam("order", "viewCount");
    youtube.addParam("type", "video");
    youtube.addParam("regionCode", "kr");
    youtube.addParam("safeSearch", "none");
    youtube.addParam("videoLicense", "creativeCommon");
    youtube.search(word, 5, function (error, result) {
        var cisumList = [];

        if (error) {
            console.log("트래픽 제한 걸림!");
            cisumList = defaultList();

            if (word == "playlist") {
                search_word = "playlist";
            } else {
                search_word = "트래픽 제한 걸림!";
            }

            res.render("cisumList", {
                cisumList,
                search_word,
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
        // cisumList = defaultList();
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
    const userJSON = json["userJSON"];
    const csJSON = json["csVO"];
    const email = userJSON["email"];
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
 * @HACK 보완이 필요한 코드
 * @param email params로 받은 email 값을 기준으로 DB 조회해서
 * 해당 email 이랑 일치한 값들만 리스트에 담기
 */
router.get("/playlist/:email", (req, res) => {
    let email = req.params.email;

    csVO.find({ user_email: email })
        .then(function (csList) {
            res.render("playList", { csList, email });
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
 * @url http://localhost:3000/cisum/video 동영상 다운로드
 * @url http://localhost:3000/cisum/user user 정보 + 로그아웃 버튼
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
            cs_id: "Q9KcDK5mb3o",
            cs_title:
                "Dua Lipa, Coldplay, Martin Garrix & Kygo, The Chainsmokers Style - Feeling Me #61",
        },
        {
            cs_id: "1n_hWwDiIXw",
            cs_title: "기리보이와 자이언티는 새벽영화를 같이 보곤했다",
        },
        {
            cs_id: "dyw8fLSAZs8",
            cs_title: "재즈를 곁들인 빈티지 크리스마스 캐롤",
        },
        {
            cs_id: "JM3Ey3tFa5s",
            cs_title: "수도세 플렉스 해버리는 샤워할 때 듣는 팝송 모음",
        },
        {
            cs_id: "6wJepYuiznU",
            cs_title:
                "[Playlist] 마음이 복잡하고 힘들 때 듣는 감성팝송 플레이리스트",
        },
        {
            cs_id: "uLgY05eOnqA",
            cs_title: "내 방구석을 와인바로 만드는 방법 (Playlist)",
        },
        {
            cs_id: "o_UUYwymh30",
            cs_title:
                "⭐알앤비: 감성 터지는 늦은 밤, 혼자만의 생각에 잠기기 좋은 20곡 (R&B Mix)",
        },
        {
            cs_id: "uPWSIBonxUA",
            cs_title: "[ᴘʟᴀʏʟɪsᴛ] 남한테 알려주기 싫은 트렌디한 팝송 모음 #1",
        },
        {
            cs_id: "3YRTxyn84mk",
            cs_title: "[playlist] 잔잔한 오후 카페에서 듣기 좋은 노래 ♬",
        },
        {
            cs_id: "U-fuJX3YBYY",
            cs_title: "𝑷𝑳𝑨𝒀𝑳𝑰𝑺𝑻 . 공부 할 때 듣는 팝송 플레이리스트",
        },
    ];
    return cisumList;
}

module.exports = router;

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, set, get, child, ref, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAry1j-WB5EMRLhPYuhVbX1OgsPXhUNpbw",
  authDomain: "skiyaki-f6d95.firebaseapp.com",
  databaseURL: "https://skiyaki-f6d95-default-rtdb.firebaseio.com",
  projectId: "skiyaki-f6d95",
  storageBucket: "skiyaki-f6d95.appspot.com",
  messagingSenderId: "490256298798",
  appId: "1:490256298798:web:7bd63c1a14aeff08b980bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app)

// declare variable
const buttonOk = document.getElementById('button-decision');
const buttonClose = document.getElementById('button-close');
const buttonControlComment = document.getElementById('button-control');
const modal = document.getElementById('modal');
const inputUsername = document.getElementById('username');
const iconButtonControl = document.getElementById('button-control-img');
const commentBoxOpen = document.getElementById('comment-box-open');
const commentBoxClose = document.getElementById('comment-box-close');
const commentForm = document.getElementById('form-comment');
const inputComment = document.getElementById('input-comment');
const listComment = document.getElementById('list-comment');
const buttonSend = document.getElementById('button-send');
let username = "";

// push key NG
// let string = "にぐろ,ニグロ,NIGURO,にがー,ニガー,NIGA,クロ,クロ,KURO,クロンボ,クロンボ,KUROMBO,黒んぼ,クロンボ,KUROMBO,ベトコン,ベトコン,BETOKON,スラム,スラム,SURAMU,ダッチマン,ダッチマン,DATCHIMAN,だっちわいふ,ダッチワイフ,DATCHIWAIFU,イタ公,イタコウ,ITAKO,アイヌ,アイヌ,AINU,アイヌ系,アイヌケイ,AINUKEI,台湾政府,タイワンセイフ,TAIWANSEIFU,台湾ハゲ,タイワンハゲ,TAIWANHAGE,北鮮,ホクセン,HOKUSEN,南鮮,ナンセン,NANSEN,鮮人,センジン,SENJIN,朝鮮征伐,チョウセンセイバツ,CHOSENSEIBATSU,三韓征伐,サンカンセイバツ,SANKANSEIBATSU,三国人,サンコクジン,SANKOKUJIN,紅毛人,コウモウジン,KOMOJIN,アメ公,アメコウ,AMEKO,中共,チュウキョウ,CHUKYO,ぽこぺん,ポコペン,POKOPEN,ちゃんころ,チャンコロ,CHANKORO,ばかちょん,バカチョン,BAKACHON,じゃっぷ,ジャップ,JAPPU,支那,シナ,SHINA,支那人,シナジン,SHINAJIN,支那蕎麦,シナソバ,SHINASOBA,支那竹,シナチク,SHINACHIKU,支那料理,シナリョウリ,SHINARYORI,露助,ロスケ,ROSUKE,後進国,コウシンコク,KOSHINKOKU,低開発国,テイカイハツコク,TEIKAIHATSUKOKU,未開発国,ミカイハツコク,MIKAIHATSUKOKU,タケノコ医者,タケノコイシャ,TAKENOKOISHA,ぽん引き,ポンビキ,POMBIKI,おわい屋,オワイヤ,OWAIYA,隠坊,オンボウ,OMBO,按摩,アンマ,AMMA,屠殺,トサツ,TOSATSU,屠殺場,トサツバ,TOSATSUBA,屠殺人,トサツニン,TOSATSUNIN,富山の三助,トヤマノサンスケ,TOYAMANOSANSUKE,犬殺し,イヌゴロシ,INUGOROSHI,下男,ゲナン,GENAN,下女,ゲジョ,GEJO,盲,メクラ,MEKURA,盲縞,メクラジマ,MEKURAJIMA,盲滅法,メクラメッポウ,MEKURAMEPPO,盲人,モウジン,MOJIN,盲目,モウモク,MOMOKU,文盲,モンモウ,MOMMO,明盲,アキメクラ,AKIMEKURA,唖,オシ　,OSHI,おし,オシ,OSHI,片端,カタワ　,KATAWA,精神異常,セイシンイジョウ,SEISHINIJO,精薄,セイハク,SEIHAKU,脳膜炎,ノウマクエン,NOUMAKUEN,白痴,ハクチ,HAKUCHI,こけ,コケ,KOKE,色盲,シキモウ,SHIKIMO,自閉症児,ジヘイショウジ,JIHEISHOJI,知恵遅れ,チエオクレ,CHIEOKURE,低脳,テイノウ,TEINO,低脳児,テイノウジ,TEINOUJI,がちゃ目,ガチャメ,GACHAME,吃,ドモリ　,DOMORI,どもり,ドモリ,DOMORI,醜男,ブオトコ,BUOTOKO,ブス,ブス,BUSU,不細工,ブサイク,BUSAIKU,キ印,キチガイ,KICHIGAI,きじるし,キジルシ,KIJIRUSHI,気違い,キチガイ,KICHIGAI,気違い沙汰,キチガイザタ,KICHIGAIZATA,気違いに刃物,キチガイニハモノ,KICHIGAINIHAMONO,みつくち,ミツクチ,MITSUKUCHI,狂気,キョウキ,KYOKI,狂気の沙汰,キョウキノサタ,KYOKINOSATA,狂女,キョウジョ,KYOJO,狂人,キョウジン,KYOJIN,発狂する,ハッキョウスル,HAKKYOSURU,傴僂,セムシ,SEMUSHI,せむし,セムシ,SEMUSHI,癩病,ライビョウ,RAIBYO,しらっこ,シラッコ,SHIRAKKO,しらこ,シラコ,SHIRAKO,白子,シラコ,SHIRAKO,愚鈍,グドン,GUDON,植物人間,ショクブツニンゲン,SHOKUBUTSUNINGEN,不具,フグ,FUGU,穢多,エタ,ETA,聾,ツンボ,TSUMBO,ツンボ,ツンボ,TSUMBO,聾桟敷,ツンボサジキ,TSUMBOSAJIKI,業病,ゴウビョウ,GOBYO,ロン,ロン,RON,パリ,パリ,PARI,ロンパリ,ロンパリ,ROMPARI,斜視,シャシ,SHASHI,跛,チンバ,CHIMBA,ちんば,チンバ,CHIMBA,躄,イザリ,IZARI,いざり,イザリ,IZARI,心障児,シンショウジ,SHINSHOJI,心障者,シンショウシャ,SHINSHOSHA,跛,チンバ,CHIMBA,びっこ,ビッコ,BIKKO,ころし,コロシ,KOROSHI,殺人,サツジン,SATSUJIN,サラ金,サラキン,SARAKIN,ヤミ金融,ヤミキンユウ,YAMIKINYU,落人部落,オチウドブラク,OCHIUDOBURAKU,四つ足,ヨツアシ,YOTSUASHI,ちび,チビ,CHIBI,がき,ガキ,GAKI,じゃり,ジャリ,JARI,情夫,ジョウフ,JOFU,情婦,ジョウフ,JOFU,すけ,スケ,SUKE,パン助,パンスケ,PANSUKE,垂れ流す,タレナガス,TARENAGASU,アル中,アルチュウ,ARUCHU,ペイ患,ペイカン,PEIKAN,ペイ中,ペイチュウ,PEICHU,出戻り,デモドリ,DEMODORI,オールドミス,オールドミス,ORUDOMISU,特殊学級,トクシュガッキュウ,TOKUSHUGAKKYU,特殊学校,トクシュガッコウ,TOKUSHUGAKKO,特殊部落,トクシュブラク,TOKUSHUBURAKU,土左衛門,ドザエモン,DOZAEMON,どや街,ドヤガイ,DOYAGAI,どや,ドヤ,DOYA,蛸部屋,タコベヤ,TAKOBEYA,ブタ箱,ブタバコ,BUTABAKO,ぶつ,ブツ,BUTSU,バカチョン,バカチョン,BAKACHON,いちゃもん,イチャモン,ICHAMON,浮浪児,フロウジ,FUROJI,浮浪者,フロウシャ,FUROSHA,半島人,ハントウジン,HANTOJIN,人非人,ニンピニン,NIMPININ,姦通,カンツウ,KANTSU,二号,ニゴウ,NIGO,妾,メカケ,MEKAKE,土人,ドジン,DOJIN,トルコ嬢,トルコジョウ,TORUKOJO,トルコ風呂,トルコブロ,TORUKOBURO,ばか,バカ,BAKA,あほ,アホ,AHO,はげ,ハゲ,HAGE,死ね,シネ,SHINE,ぼけ,ボケ,BOKE,かす,カス,KASU,クソじじい,クソジジイ,KUSOJIJII,クソばばあ,クソババア,KUSOBABAA,けろいど,ケロイド,KEROIDO,はんせん,ハンセン,HANSEN,えいず,エイズ,EIZU,ごきぶり,ゴキブリ,GOKIBURI,うじむし,ウジムシ,UJIMUSHI,はえ,ハエ,HAE,どぶねずみ,ドブネズミ,DOBUNEZUMI,性病,セイビョウ,SEIBYO,淋病,リンビョウ,RIMBYO,くらみじあ,クラミジア,KURAMIJIA,梅毒,バイドク,BAIDOKU,左翼,サヨク,SAYOKU,右翼,ウヨク,UYOKU,あか,アカ,AKA,あそ,ヤソ,YASO,ほも,ホモ,HOMO,てろりすと,テロリスト,TERORISUTO,はいじゃっく,ハイジャック,HAIJAKKU,内ゲバ,ウチゲバ,UCHIGEBA,革マル,カクマル,KAKUMARU,他殺,タサツ,TASATSU,自殺,ジサツ,JISATSU,虐殺,ギャクサツ,GYAKUSATSU,惨殺,ザンサツ,ZANSATSU,銃殺,ジュウサツ,JYUSATSU,屠殺,トサツ,TOSATSU,殺人,サツジン,SATSUJIN,殺人犯,サツジンハン,SATSUJINHAN,放火,ホウカ,HOKA,放火魔,ホウカマ,HOKAMA,やくざ,ヤクザ,YAKUZA,地回り,ジマワリ,JIMAWARI,ヤー様,ヤーサマ,YASAMA,ヤーサン,ヤーサン,YASAN,大麻,タイマ,TAIMA,へろいん,ヘロイン,HEROIN,あへん,アヘン,AHEN,こかいん,コカイン,KOKAIN,覚醒剤,カクセイザイ,KAKUSEIZAI,えむでぃーえむえー,エムディーエムエー,MDMA,まじっくまっしゅるーむ,マジックマッシュルーム,MAJIKKUMASSHURUMU,しゃぶ,シャブ,SHABU,麻薬,マヤク,MAYAKU,しんなー,シンナー,SHINNA,邪教,ジャキョウ,JAKYO,淫売,インバイ,IMBAI,売女,バイタ,BAITA,売春,バイシュン,BAISHUN,援助交際,エンジョコウサイ,ENJOKOSAI,ブルセラショップ,ブルセラショップ,BURUSERASHOPPU,まえつき,マエツキ,MAETSUKI,くわえ込む,クワエコム,KUWAEKOMU,テロ,テロ,TERO,テロリスト,テロリスト,TERORISUTO,愛液,アイエキ,AIEKI,まん汁,マンジル,MANJIRU,バルトリン腺液,バルトリンセンエキ,BARUTORINSENEKI,アクメ,アクメ,AKUME,エクスタシー,エクスタシー,EKUSUTASHI,おるがずむ,オルガズム,ORUGAZUMU,おーがずむ,オーガズム,OGAZUMU,クライマックス,クライマックス,KURAIMAKKUSU,フィニッシュ,フィニッシュ,FUINISSHU,イク,イク,IKU,穴兄弟,アナキョウダイ,ANAKYODAI,竿姉妹,サオシマイ,SAOSHIMAI,SEX,セックス,SEKKUSU,エッチ,エッチ,ETCHI,オーラルセックス,オーラルセックス,ORARUSEKKUSU,セックスフレンド,セックスフレンド,SEKKUSUFURENDO,セフレ,セフレ,SEFURE,ファック,ファック,FUAKKU,肉体関係,ニクタイカンケイ,NIKUTAIKANKEI,近親相姦,キンシンソウカン,KINSHINSOKAN,テレフォンセックス,テレフォンセックス,TEREFUONSEKKUSU,Tバック,ティーバック,TEIBAKKU,ブラジャー,ブラジャー,BURAJA,ランジェリー,ランジェリー,RANJIERI,パンスト,パンスト,PANSUTO,いめくら,イメクラ,IMEKURA,きゃばくら,キャバクラ,KYABAKURA,ラブホテル,ラブホテル,RABUHOTERU,ランジェリーパブ,ランジェリーパブ,RANJIERIPABU,テレクラ,テレクラ,TEREKURA,フードル,フードル,FUDORU,ファッションヘルス,ファッションヘルス,FUASSHONHERUSU,すかとろ,スカトロ,SUKATORO,飲尿,インニョウ,INNYO,放尿,ホウニョウ,HONYO,いんぽてんつ,インポテンツ,IMPOTENTSU,早漏,ソウロウ,SORO,遅漏,チロウ,CHIRO,朝起ち,アサダチ,ASADACHI,勃起,ボッキ,BOKKI,エレクト,エレクト,EREKUTO,風俗,フウゾク,FUZOKU,おさわりパブ,オサワリパブ,OSAWARIPABU,個室ビデオ,コシツビデオ,KOSHITSUBIDEO,ソープランド,ソープランド,SOPURANDO,ノーパン喫茶,ノーパンキッサ,NOPANKISSA,ノーパンしゃぶしゃぶ,ノーパンシャブシャブ,NOPANSHABUSHABU,デリバリーヘルス,デリバリーヘルス,DERIBARIHERUSU,でりへる,デリヘル,DELLIHERU,デリヘル嬢,デリヘルジョウ,DELLIHERU,SM,エスエム,ESUEMU,M男,エムオ,EMUO,M女,エムジョ,EMUJO,さど,サド,SADO,マゾ,マゾ,MAZO,肉奴隷,ニクドレイ,NIKUDOREI,えろ,エロ,ERO,えろす,エロス,EROSU,エロゲー,エロゲー,EROGE,えろさいと,エロサイト,EROSAITO,アダルトビデオ,アダルトビデオ,ADARUTOBIDEO,大人のおもちゃ,オトナノオモチャ,OTONANOMOCHA,バイブレーター,バイブレーター,BAIBURETA,ピンクローター,ピンクローター,PINKUROTA,電動こけし,デンドウコケシ,DENDOKOKESHI,ろーしょん,ローション,ROSHON,ろーたー,ローター,ROTA,バイブ,バイブ,BAIBU,マスターべーション,マスターべーション,MASUTABESHON,自慰,ジイ,JII,せんずり,センズリ,SENZURI,一人エッチ,ヒトリエッチ,HITORIETCHI,マスカキ,マスカキ,MASUKAKI,オナニー,オナニー,ONANI,手コキ,テコキ,TEKOKI,カウパー腺液,カウパーセンエキ,KAUPASENEKI,ガマン汁,ガマンジル,GAMANJIRU,元気汁,ゲンキジル,GENKIJIRU,先走り汁,サキバシリジル,SAKIBASHIRIJIRU,ちんこ,チンコ,CHINKO,いちもつ,イチモツ,ICHIMOTSU,ぺにす,ペニス,PENISU,ちんぽ,チンポ,CHIMPO,ちんちん,チンチン,CHINCHIN,ぽこちん,ポコチン,POKOCHIN,肉棒,ニクボウ,NIKUBO,陰茎,インケイ,INKEI,金玉,キンタマ,KINTAMA,睾丸,コウガン,KOGAN,まら,マラ,MARA,男性器,ダンセイキ,DANSEIKI,巨根,キョコン,KYOKON,でかまら,デカマラ,DEKAMARA,えろまら,エロマラ,EROMARA,亀頭,キトウ,KITO,カリ,カリ,KARI,カリ首,カリクビ,KARIKUBI,カリ高,カリダカ,KARIDAKA,皮被り,カワカブリ,KAWAKABURI,包茎,ホウケイ,HOKEI,短小,タンショウ,TANSHO,マンコ,マンコ,MANKO,まんこ,マンコ,MANKO,オメコ,オメコ,OMEKO,プッシー,プッシー,PUSSY,ヴァギナ,ヴァギナ,BUAGINA,クリトリス,クリトリス,KURITORISU,膣,チツ,CHITSU,女性器,じょせいき,JOSEIKI,われめ,ワレメ,WAREME,G-スポット,ジースポット,JISUPOTTO,陰核,インカク,INKAKU,女陰,ジョイン,JOIN,もりまん,モリマン,MORIMAN,ゆるまん,ユルマン,YURUMAN,さげまん,サゲマン,SAGEMAN,でかまん,デカマン,DEKAMAN,あげまん,アゲマン,AGEMAN,おっぱい,オッパイ,OPPAI,ぱいおつ,パイオツ,PAIOSTU,巨乳,キョニュウ,KYONYU,アヌス,アヌス,ANUSU,アナル,アナル,ANARU,尻の穴,シリノアナ,SHIRINOANA,ぱいずり,パイズリ,PAIZURI,ぱいぱん,パイパン,PAIPAN,ぱんちら,パンチラ,PANCHIRA,亀甲縛り,キッコウシバリ,KIKKOSHIBARI,青姦,アオカン,AOKAN,青空姦通,アオゾラカンツウ,AOZORAKANTSU,くんに,クンニ,KUNNI,くんにりんぐす,クンニリングス,KUNNIRINGUSU,けちゃまん,ケチャマン,KECHAMAN,月経,ゲッケイ,GEKKEI,生理,セイリ,SEIRI,強姦,ゴウカン,GOKAN,れいぷ,レイプ,RAPE,レイプ魔,レイプマ,RAPEMA,和姦,ワカン,WAKAN,視姦,シカン,SHIKAN,口内発射,コウナイハッシャ,KONAIHASSHA,ふぇらちお,フェラチオ,FUERACHIO,尺八,シャクハチ,SHAKUHACHI,顔射,ガンシャ,GANSHA,射精,シャセイ,SHASEI,でぃーぷすろーと,ディープスロート,DEIPUSUROTO,ろりこん,ロリコン,RORIKON,調教,チョウキョウ,CHOKYO,こんどーむ,コンドーム,KONDOMU,避妊,ヒニン,HININ,ザーメン,ザーメン,ZAMEN,精液,セイエキ,SEIEKI,すぺるま,スペルマ,SUPERUMA,夢精,ムセイ,MUSEI,よがる,ヨガル,YOGARU,猥褻,ワイセツ,WAISETSU,猥談,ワイダン,WAIDAN,3P,サンピー,SAMPI,48手,シジュウハッテ,SHIJUHATTE,スワップ,スワップ,SUWAPPU,潮吹き,シオフキ,SHIOFUKI,ワカメ酒,ワカメザケ,WAKAMEZAKE,しっくすないん,シックスナイン,SHIKKUSUNAIN,立ちバック,タチバック,TACHIBAKKU,騎乗位,キジョウイ,KIJOI,正常位,セイジョウイ,SEIJOI,松葉くずし,マツバクズシ,MATSUBAKUZUSHI,処女,ショジョ,SHOJO,バージン,バージン,BAJIN,童貞,ドウテイ,DOTEI,チェリーボーイ,チェリーボーイ,CHIERIBOI,すけべ,スケベ,SUKEBE,スケベ椅子,スケベイス,SUKEBEISU,夜這い,ヨバイ,YOBAI,性感帯,セイカンタイ,SEIKANTAI,淫ら,ミダラ,MIDARA,愛撫,アイブ,AIBU,やりちん,ヤリチン,YARICHIN,やりまん,ヤリマン,YARIMAN,させ子,サセコ,SASEKO,ハメ撮り,ハメドリ,HAMEDORI,女体盛り,ニョタイモリ,NYOTAIMORI,素股,スマタ,SUMATA,外出し,ソトダシ,SOTODASHI,中出し,ナカダシ,NAKADASHI,乱交パーティー,ランコウパーティー,RANKOPATEI,淋病,リンビョウ,RIMBYO,性感染,セイカンセン,SEIKANSEN,性病,セイビョウ,SEIBYO,痴女,チジョ,CHIJO,痴漢,チカン,CHIKAN,のぞき,ノゾキ,NOZOKI,露出狂,ロシュツキョウ,ROSHUTSUKYO,ちんぐり返し,チングリガエシ,CHINGURIGAESHI,まんぐり返し,マングリガエシ,MANGURIGAESHI,マン毛,マンゲ,MANGE,チン毛,チンゲ,CHINGE,陰毛,インモウ,IMMO,裸,ハダカ,HADAKA,裸エプロン,ハダカエプロン,HADAKAEPURON,ろりこん,ロリコン,RORIKON,ペド,ペド,PEDO,ろり,ロリ,RORI,少女買春,ショウジョカイシュン,SHOJOKAISHUN,ツルぺた,ツルペタ,TSURUPETA,スクール水着,スクールみずぎ,SUKURUMIZUGI,のぞき,ノゾキ,NOZOKI,盗撮,トウシャ,TOSHA,クソ,クソ,KUSO,糞,フン,FUN,しょうべん,ショウベン,SHOBEN,しょんべん,ションベン,SHONBEN,おしっこ,オシッコ,OSHIKKO,うんこ,ウンコ,UNKO,うんち,ウンチ,UNCHI,うんちょ,ウンチョ,UNCHO,44815,ABORTUS,ABRUTI,ABRUTIE,ACHTERLIJK,ADHD,AFFANCULO,ANAL,ANALPLUG,ANALSEX,ANUS,ARSCH,ARSCHLOCH,ARSE,ARSEL,ASS,ASSASSIN,BAGASCIA,BAISE,BAISÉ,BAISER,BALCONAR,BALDRACCA,BALLS,BASTARD,BASTARD,BATARD,BATTONA,BIMBO,BITCH,BITCH,BITE,BLOODY,BLOODYHELL,BLOWJOB,BOCCHINARA,BOCCHINARO,BOLLERA,BOLLOCKS,BONER,BOOB,BOOBIES,BOOBS,BOSNEGER,BOUGNOUL,BRANLEUR,BUGGER,BUKKAKE,BULLSHIT,BURNE,BURRO,CABRAO,CABRON,CABRÓN,CABRONA,CABRONAZO,CAGAR,CAGO,CAGON,CAGÓN,CAPULLA,CAPULLO,CARAJO,CARALHO,CAZZI,CAZZO,CHIAVARE,CHICHI,CHIER,CHINGAR,CHINK,CHOCHO,CHUJE,CHUJU,CHUPA,CHUPAME,CHÚPAME,CIPA,CLIT,CLITORIS,COCK,COCKSUCKER,COCU,COGLIONE,COJON,COJÓN,COJONES,COMEMERDA,COMEPOLLAS,CON,CONDOM,CONNARD,CONNASSE,CONNE,CONO,COÑO,COÑORITO,COON,CORRERSE,COUILLE,COUILLON,COUILLONNE,CRAP,CREVARD,CUL,CULATTONE,CULERO,CULO,CUM,CUMSHOT,CUNT,DAMM,DAMMIT,DAMN,DEBIEL,DICK,DICKHEAD,DILDO,DIO BESTIA,DIO CANE,DIO PORCO,DOGGYSTYLE,DRECKSACK,DRECKSAU,DUPA,DYKE,DZIWKA,ENCULE,ENCULÉ,ENCULEE,ENCULÉE,ENCULER,ENFOIRE,ENFOIRÉ,ESPORRA,ESPORRADA,ETTERBAK,F.U.C.K.,F0CK,FAEN,FAG,FAGGOT,FAGS,FANCULO,FANNY,FCK,FCKER,FCKR,FCKU,FCUK,FESSE,FICA,FICKEN,FICKFRESSE,FIGA,FILHODPUTA,FION,FITTA,FITTE,FITTETRYNE,FLIKKER,FLIKKER OP,FOCK,FODA SE,FODASSE,FODER,FODE-TE,FOLLAR,FOLLEN,FOTTERE,FOTZE,FOUTRE,FROCIO,FUCK,FUCK,FUCKER,FUCKFACE,FUCKR,FUCT,FUFA,FUK,FURCIA,FUT,GEIL,GEIL,GENITAL,GENITALIA,GENITALS,GILIPOLLAS,GLORY HOLE,GLORYHOLE,GOBSHITE,GODAMMET,GODAMMIT,GODDAMMET,GODDAMMIT,GODDAMN,GODVER,GODVERJU,GYPO,HACKFRESSE,HANDJOB,HELVETE,HESTKUK,HIJAPUTA,HIJO PUTA,HIJOPUTA,HITLER,HITLER,HOER,HOERTJE,HOLOCAUST,HOMO,HOMO,HOMOFIEL,HOOKER,HORE,HORE,HORNY,HOSTIA,H'STKUK,HUEVOS,HUPPELKUT,HURENSOHN,INCULARE,JESUSSUCKS,JIZZ,JIZZUM,JODER,JODETE,JÓDETE,JOPUTA,JUDENSAU,KACK,KACKBRATZE,KACKE,KAFFIR,KAK,KAKKER,KANACKE,KANKER,KANKEREN,KANKERJOCH,KANKERLYER,KIKE,KILL,KILLER,KILLIN,KILLING,KLERELIJER,KLOJO,KLOOTZAK,KUK,KUKHUVUD,KUKK SUGER,KUKKHUE,KUKSKALLE,KUKSUGARE,KUKSUGER,KUNT,KURWA,KUSI,KUSIPAA,KUSIPÄÄ,KUT,KYRPA,KYRPÄ,KZ,LESBO,LIJER,LUL,LULHANNES,MAKAK,MAKAKKEN,MAMADA,MAMADA,MAMON,MAMÓN,MAMONA,MARICA,MARICON,MARICÓN,MARICONA,MARICONAZO,MASTURBATE,MEITA,MEMMERDES,M'EMMERDES,MERDA,MERDA,MERDE,MIERDA,MIGNOTTA,MIJAR,MILF,MINCHIA,MISSGEBURT,MOF,MOLEST,MONGOLEN,MONGOOL,MORON,MOTHERFUCK,MTHRFCKR,MUFF,MUIE,MULKKU,MURDER,MURDERER,MUSCHI,NAZI,NAZI,NAZI,NEGER,NEGER,NEGERIN,NEGRE,NÈGRE,NEGRESSE,NÉGRESSE,NEGRO,NEUK,NEUKEN,NIGGA,NIGGAH,NIGGER,NIGGER,NIKKER,NIQUE,NIQUER,NONCE,NSB,NSBer,NSB'er,NUTTE,OJETE,OSTIA,OUWEHOEREN,PAARDELUL,PADOPHILER,PÄDOPHILER,PAEDO,PAEDOPHILE,PAJERO,PAJILLERO,PAKI,PARTOUZE,PASKA,PASKA-AIVO,PASKANAAMA,PASKAPÄÄ,PD,PECKER,PEDE,PÉDÉ,PEDO,PEDOFILE,PEDOPHILE,PENDEJO,PENDON,PENDÓN,PENIS,PETASSE,PÉTASSE,PHUK,PICHA,PIERDOL,PIERDOLSIE,PIG,PIK,PILA,PILLU,PIMP,PINE,PINGA,PISS,PISSER,PLEURIS,POEP,POEPEN,POKKE,POKKELIJER,POKKELYER,POKKEN,POKKENLYER,POKKER,POLLA,POLLON,POLLÓN,POLVO,POMPINARA,POMPINO,POOF,POOP,PORCO DIO,PORN,POTORRO,POUFFE,POUFFIASSE,PRICK,PRON,PROSTITUTE,PULA,PUSSY,PUTA,PUTAIN,PUTAMADRE,PUTE,PUTO,PUTON,PUTÓN,PUTTANA,QUEER,RAMERA,RAPE,RAPED,RAPES,RAPIST,RASSHULL,RATA,RICCHIONE,ROETMOP,ROTTINCULO,ROTZAK,SA,SALAUD,SALOP,SALOPARD,SALOPE,SAU,SBORRA,SCHEIẞE,SCHEISSE,SCHEIẞHAUS,SCHLAMPE,SCHLONG,SCHWANZ,SCHWUCHTEL,SCREW,SCROTUM,SEGAIOLO,SEKS,SEMEN,SEX,SHAG,SHEMALE,SHIT,SHITE,SHIZ,SIEG HEIL!,SKURWYSYN,SLAG,SLET,SLOERIE,SLUT,SNOL,SOBO,SODOMIE,SPASTI,SPASTIC,SPAZ,SPERM,SPLEETOOG,SPUNK,SS,STOEPHOER,STRICHER,STRIPPER,STRONT,STRONZO,SUCER,SUDACA,SUKA,SUKKEL,TABARNAK,TAPETTE,TARE,TARÉ,TARFA,TART,TENCULE,T'ENCULE,TERING,TERINGLYER,TERRORIST,TIET,TIETEN,TIETJES,TITS,TITTEN,TITTIES,TITTYFUCK,TORTILLERA,TOSSER,TREKUKK,TROIA,TROIETTA,TROIONA,TROIONE,TRØKUK,TROUDUC,TRUT,TURD,TWAT,TYFUS,TYFUSLIJER,TYFUSLYER,VAFFANCULO,VAGIN,VAGINA,VAGINAL,VERDAMMT,VERDAMNT,VERDOMME,VERGA,VETZAK,VIBRATOR,VIOL,VOLLIDIOT,VULVA,WANK,WANKER,WEED,WETBACK,WHOR,WHORE,WICHSER,WIXER,WOG,WTF,XXX,ZAKKEWASSR,ZANDNEGER,ZOB,ZOCCOLA,ZORRON,ZORRÓN"
// const arrKeyNG = string.split(",");
// for (let i = 0; i < arrKeyNG.length; i++) {
//   set(ref(db, "YUURI_5D_app_keyNG/" + generateUID()), {
//     key: arrKeyNG[i]
//   })
// }

// get NG key
let arrayKeyNG = []
get(child(ref(db), "YUURI_5D_app_keyNG")).then((snapshort) => {
  snapshort.forEach(childSnapshort => {
    arrayKeyNG.push(childSnapshort.val().key.toLowerCase())
  })
})

// get old comment
get(child(ref(db), "YUURI_5D_app_comments")).then((snapshort) => {
  snapshort.forEach(childSnapshort => {
    const item = document.createElement('li')
    const time = document.createElement('span')
    time.className = "item-comment-time"
    time.textContent = childSnapshort.val().Time + " "
    const username = document.createElement('span')
    username.className = "item-comment-name"
    username.textContent = childSnapshort.val().Username + " "
    const content = document.createElement('span')
    content.className = "item-comment-content"
    content.textContent = childSnapshort.val().Message
    item.appendChild(time)
    item.appendChild(username)
    item.appendChild(content)
    item.className = "item-comment"
    console.log(item)
    listComment.appendChild(item)
    listComment.scrollTop = listComment.scrollHeight;
  })
})

// handle event button
buttonOk.addEventListener("click", hideModal);
buttonControlComment.addEventListener("click", toggleCommentBox);

// connect socket.io
const socket = io('https://cedar-raspy-anorak.glitch.me/');

// handle function comment
buttonSend.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputComment.value) {
    let state = checkKeyNG(inputComment.value)
    if (state === false) {
      socket.emit('chat message', { time: getSystemTime(), username: username, content: inputComment.value })
      set(ref(db, "YUURI_5D_app_comments/" + generateUID()), {
        Username: username,
        Message: inputComment.value,
        Time: getSystemTime()
      })
      inputComment.value = ''
    } else {
      alert("ご入力いただいたメッセージはご利用いただけません")
    }
  }
});

// retrieve comment
socket.on('chat message', (data) => {
  const item = document.createElement('li')
  const time = document.createElement('span')
  time.className = "item-comment-time"
  time.textContent = data.time + " "
  const username = document.createElement('span')
  username.className = "item-comment-name"
  username.textContent = data.username + " "
  const content = document.createElement('span')
  content.className = "item-comment-content"
  content.textContent = data.content
  item.appendChild(time)
  item.appendChild(username)
  item.appendChild(content)
  item.className = "item-comment"
  console.log(item)
  listComment.appendChild(item)
})

function hideModal() {
  username = inputUsername.value;
  if (username != "" && username.length >= 8) {
    modal.style.display = "none";
  } else {
    alert("Username invalid!")
  }
}

function toggleCommentBox() {
  let srcIcon = iconButtonControl.src;
  if (srcIcon.includes("btn_close")) {
    iconButtonControl.src = "./img/comment_close/btn_open.png";
    commentBoxOpen.style.display = "none";
    commentBoxClose.style.borderTopLeftRadius = '10px';
  } else {
    iconButtonControl.src = "./img/comment_open/btn_close.png";
    commentBoxOpen.style.display = "block";
    commentBoxClose.style.borderTopLeftRadius = '0px';
  }
}

function generateUID() {
  return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36)
}

function checkKeyNG(string) {
  let status = false
  string = string.toLowerCase()
  for (let elem of arrayKeyNG) {
    if (string.includes(elem)) {
      status = true
      break
    }
  }
  return status
}

function getSystemTime() {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

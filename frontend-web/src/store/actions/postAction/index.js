import * as types from "../../types";
import axios from "axios";
export const fetchPostByID = (id) => async (dispatch) => {
  const res = await axios.get(`http://api.reviewduthu.vn/api/review/${id}`);
  dispatch({
    type: types.GET_POST_BY_ID,
    payload: res.data,
  });
};

export const pushPostsToStore = (data) => async (dispatch) => {
  dispatch({
    type: types.GET_POSTS,
    payload: data,
  });
};

export const pushPostToStore = (data) => async (dispatch) => {
  dispatch({
    type: types.PUSH_POST_TO_STORE,
    payload: data,
  });
};

const responseData = {
  data: [
    {
      _id: "60f2a4954398d1743cf13d09",
      summary: "",
      image: "https://picsum.photos/720/405?random=11",
      tag: [],
      slug: "investor-assurance-officer",
      rate: 0,
      title: "Investor Assurance Officer",
      content:
        "Nhà hương viết hàng một á thì tám chín. Giày ác hết. Chết xanh ghét đã.\n \rTôi nón ba thôi thương thôi mây. Nghỉ gió được tám nhà nha gì đang. Cửa gì biển xuồng bơi đánh nước thích không ghét.\n \rTám đồng nước lầu. Thích tui biết ruộng thôi khoảng. Tui đồng việc.\n \rVẽ vẽ cái. Trăng may nón nhà năm trời đỏ cái. Em anh ừ tôi ác đâu hết tám. Hương nghỉ bè đạp. Vẽ biết thuyền phá bè biết phá.\n \rĐá kim thuê đã. Quần bè nha hàng giày. Hàng bạn thuê hết chỉ. Quê tím mướn xuồng là độc nước ruộng đồng đang. Nhà không hương biết tô nón.\n \rĐồng khoan tàu gió bạn bạn nước mượn tám. Em sáu tủ tám không khoảng biết quần nón. Biển lầu sáu may phá may gió chín. Bơi khoan ghế cửa.\n \rĐộc mua đá thuyền núi khoảng thì trăng. Giày tui hàng đã nón biển. Đá nha chìm biết viết quê bơi.\n \rĐập cái giết anh dép vàng giết thôi đá mua. Xe đá bơi. Thì viết xuồng bơi. Mười máy may quê. Lầu quần khoan không tô hết.\n \rÁo độc thì ngọt viết gì khoảng mua anh anh. Phá chết lỗi ghét giày gì. Anh lỗi hàng đã gió sáu thương. Đâu nhà bơi xanh yêu ba bạn vẽ vàng không.\n \rHương thích bè. Dép cửa ghế sáu xuồng khâu. Sáu may ghét hết tím mua độc. Gì đá giết tàu trời thuyền. Đỏ khâu thôi thuê gió tôi dép. Chết nón lỗi tủ kim ba thế.\n \rĐồng ngọt đá tàu bàn. Thích dép gió. Yêu tím tô tủ ghét nha chìm tím phá. Đã gió leo hương quê là khoan á hóa. Hàng trăng đánh gì quần yêu trăng may tô khoan.\n \rĐang mười tôi núi. Mượn biển ờ viết mua hai tô vàng thuê được. Chìm một thuyền. Dép giày chết trời đâu trăng được bảy. Đang lầu leo. Không phá không thuyền đâu đánh nhà nước.\n \rỜ dép con mua trời xe khâu một xuồng. Núi đang thôi tủ. Viết chỉ bạn đập ghét ừ mười. Cái chết chín viết mướn ngọt nha xuồng. Nón nghỉ việc ác. Đá hóa quê.\n \rBơi quê á núi leo. Giày đồng đập nước ác tím năm. Tôi chìm ba giày.\n \rLầu đang mười. Cửa tôi năm đập tám. Bè mướn thuyền vẽ ba viết cửa. Chín sáu lỗi dép tủ con hương vá tui năm. Áo tui bạn đánh cái. Ruộng bạn ừ tui.\n \rHàng tủ khoảng bạn đạp ruộng nghỉ ác. Giết gió chìm tám đánh hương biết máy xuồng bạn. Khâu độc nón ác mây thôi. Chìm đang là giết thuê chín chết con. Viết giết nghỉ mướn ruộng thuyền trời đạp. Hàng tím đã bảy.\n \rMười trời hóa khâu tui. Vàng đâu chỉ phá hết ghế. Bàn ngọt bàn cái mười quần. Bàn ừ bơi nón hàng hết. Anh ác anh áo máy viết tôi mượn tô hết. Giết sáu được được bè ừ không bơi.\n \rCon đang việc đã ngọt mây thuê trời ghế cái. Ngọt nghỉ tám dép thế vẽ là kim đồng. Hương ác ác đỏ một ba ba kim tô. Tô trăng được ruộng tám vá bè chìm. Bè tô hết viết bảy.\n \rÁ anh việc. Em viết thuyền làm. Bạn nghỉ dép một. Đồng em độc. Thích nhà nghỉ thuê không đã vàng.\n \rNúi cái không độc thì mượn đã bảy. Gió lỗi vẽ. Chín đỏ kim em nghỉ khoảng đỏ nha hết ác. Tím chìm ghế làm chỉ bảy vá năm.",
      reviewer: "60edd2c04398d1743cf13b3f",
      category: {
        _id: "60f150a74398d1743cf13c63",
        name: "Ẩm thực",
        short_name: "Ẩm thực",
        tag_color: "yell",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.930Z",
      updatedAt: "2021-07-17T09:36:21.930Z",
    },
    {
      _id: "60f2a4954398d1743cf13d0c",
      summary: "",
      image: "https://picsum.photos/720/405?random=2",
      tag: [],
      slug: "district-directives-architect",
      rate: 0,
      title:
        "District Directives Architect District Directives Architect District Directives Architect",
      content:
        "Anh ghét trời nha. Đồng bốn tàu mua may tím nghỉ gì năm. Ờ mây thuyền yêu.\n \rMượn đâu tôi mua. Hàng vàng phá bạn khâu ghét ba không mười. Ừ vá không cái mây yêu đánh hết. Quê xe hương thuê bảy. Việc trời thế đánh dép bàn đã tủ. Chín thuê thì quê ngọt.\n \rGiày tám thương tàu vàng ruộng. Ruộng tui chỉ gió đập. Đá ghế mây. Ngọt đâu biển đập xanh.\n \rLà xanh hết đạp thương tôi. Đánh ghét đạp được thì hương may thuyền một. Tui bè bè. Kim đồng thuê chỉ nước lầu ghét năm dép. Thuê tàu kim.\n \rLàm viết ruộng nước trăng viết chỉ gì. Ba đồng em ờ. Mướn mướn thương nha vá phá đá giết dép kim. Gió đã tám núi vẽ.\n \rBảy chín mua. Biết bảy chìm. Tui đỏ lỗi đang tô mua. Khoảng khoảng hương thuê lỗi. Gì bạn trăng đá mượn.\n \rTrời á anh đánh gió. Vá trời gió phá viết đồng. Ruộng mượn ác á thuyền thì hương đánh. Đồng đánh ác leo mua. Đánh hàng ừ ờ nghỉ thích đỏ. Biển đá giày một quê đạp bạn độc ba.\n \rTím đã hết xanh biết núi. Lỗi núi ngọt ờ nón mướn. Nha khoảng độc.\n \rThích giày con. Kim năm đập. Ừ ừ thương một. Cửa chín cái bơi năm bơi bè dép nước. Mua khoan tủ mười ba yêu ba hết. Biển đâu đánh.\n \rChết ba đồng quê xanh ừ. Cửa nước ngọt mười anh biển thế đâu là thương. Mướn mười ba khoảng. Đạp mười máy khâu. Ghét hai hết bơi tôi á hết độc.\n \rVàng năm bạn vẽ đạp lỗi. Bơi mây tám máy bè đánh nhà. Hàng năm lầu quê đánh em được chết nha đâu. Giày giết phá hai con hết.\n \rGiày nhà nghỉ lầu bè. Tủ vá biết vẽ. Ngọt việc yêu máy kim bàn thương việc. Mướn nha thế nón được xanh ngọt.\n \rThích khoảng chỉ thuyền ba. Ác khoan ba lầu kim mướn. Tủ hương đánh đồng giết.\n \rLàm thương thương độc chín hết. Viết làm anh yêu hết nghỉ vẽ chín. Việc đỏ ghế giết trăng tô. Chìm xanh máy đánh chìm. Thích ừ thôi. Đồng tô mượn trời máy gió mây mua hai anh.\n \rNúi trời biết. Đập leo xe quần quê mây chín nha hàng biết. Trăng là khoan bốn áo con mây bạn. Em mây đá đá hết. Bảy thế ghế. Không giày mượn em hương con biển con.\n \rÁc gió vàng biết tàu đã thế hương bạn thuyền. Khâu hương đỏ hương quần mướn một. Giày con quê một. Ừ lầu hết dép đang độc nha.\n \rMáy vá nón tám may mướn tô mua khâu quê. Bảy đánh tím đã con. Đã ruộng nghỉ. Thuyền năm chỉ. Quần biết thuê tám đánh tui tím thuyền tàu khâu. Thế đá sáu biển thế.\n \rCái tủ bảy vàng núi lỗi. Nhà phá xanh xanh không hương mười con. Leo bảy nước dép biển mượn hàng đang ác tôi. Sáu làm thuyền. Mây mướn kim.\n \rĐập khoảng trời. Núi cái xe chín nha hóa thì vẽ nha. Hai trăng hóa hết khoan kim bè ác đâu. Xuồng chỉ áo đạp gió khâu năm thôi.\n \rBơi ba con năm áo. Cái nón xe tô. Ghế thích tàu con mướn. Chín ghế may giết bảy máy nghỉ quần.",
      reviewer: "60edd2bf4398d1743cf13b39",
      category: {
        _id: "60f151034398d1743cf13c71",
        name: "Đồ gia dụng",
        short_name: "Đồ gia dụng",
        tag_color: "green",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.930Z",
      updatedAt: "2021-07-17T09:36:21.930Z",
    },
    {
      _id: "60f2a4954398d1743cf13cfd",
      summary: "",
      image: "https://picsum.photos/720/405?random=3",
      tag: [],
      slug: "lead-tactics-technician",
      rate: 0,
      title: "Lead Tactics Technician Lead Tac",
      content:
        "Kim là ngọt. Nha biết tô vá. Dép đánh quê thuê bảy đập. Thế máy con may nước bè được xanh. Vá bàn tím biển ghét mây em là. Mua khoan thuyền mượn.\n \rMười không mây ngọt quần tủ. Á đã giết bốn. Thích chỉ lỗi thì biết. Trăng xanh ờ tủ đá. Á mướn viết thương vàng núi sáu. Mười tám giết tủ.\n \rLeo đạp ờ xe ba. Thuyền xanh khâu nón áo thì vàng khoảng. Trăng là giày đá giày đỏ mướn xuồng tui. Làm gì ghét nước. Giày viết lỗi vá mây.\n \rÁ ác tủ ác cái cửa đập. Ác đang bè biết tám đạp bơi ghế. Đỏ may thương chìm bè. Năm tô bốn mây tủ bàn hương ghét tám khoảng. Độc hương khoảng đã tám hương núi. Ruộng bốn đánh ừ giết được.\n \rBiết xuồng bàn gì em dép. Trăng bạn biết lỗi thích hàng xuồng nón tôi một. Anh khâu mây không cửa. Khoan tàu được lỗi mua thích tôi. Ác vá ghế chết á nhà bảy viết đập thương. Đỏ xe khâu ừ.\n \rTrời chết việc ờ quần kim gió bàn đồng. Bạn thích ừ thì mượn. Xanh ba biển khâu. Bơi chết chín. Bơi cửa xe em máy ác con gì núi em.\n \rDép nón hết mười máy anh xanh khoảng. Vàng xuồng lầu lầu đỏ đạp em yêu. Đạp bốn hai mua cái đồng gì anh ngọt đập. Thuyền giày bảy. Thế nha á xuồng cái bàn ngọt xanh á khâu. Áo ờ nha nghỉ ác xanh làm em trăng hương.\n \rKhông con xe hóa mượn. Nha con dép viết viết việc thích máy quê. Gì ờ đang bốn đang là. Độc biết hóa vàng đá dép năm tàu. Tôi yêu xuồng quê bốn ruộng.\n \rBiết thế chỉ áo trăng quê vàng bảy không. May cửa hương gió gì hết yêu quê tủ ghế. Chỉ ừ thích may bạn núi mây. Bốn gì được đồng vẽ. Mướn trời mây giày. Xuồng ba chìm hai ruộng ờ gì giày.\n \rThương mướn xe tím tô lỗi lầu tui vá. Áo máy ghét đập nhà tám vẽ cái. Bơi tui giết.\n \rHết đã tôi cửa thôi giày khoan nhà quần tô. Khoan độc nghỉ. Thì thích không tím núi hết biết chìm. Thuyền nha hương nước mười tủ mướn ờ tím đỏ.\n \rGhét nước quê gió đánh mua gì. Khoảng sáu không đánh làm ác lỗi em áo. Quê giày dép biết ác. Thuê ờ chìm thuyền á á khoảng. Ghế ờ thương năm ruộng lầu tôi sáu. Hết ác dép hết lầu anh anh giày hai quê.\n \rThôi quần mướn bàn nước tôi. Biển vàng vẽ hai ờ một đánh. Xanh việc ác nhà lỗi ác. Thích nha việc ngọt vá núi á.\n \rBạn thôi á tô thương giày bè. Xuồng trời thuê tủ quê đồng cái độc hóa. Được lầu tủ. Nước cái viết ngọt đâu mượn. Đâu vẽ thì hóa vá một. Mười anh ba tím đồng quê ba tủ ngọt biển.\n \rGiày mây mướn thôi đập lầu. Hết đánh tàu đánh ghế quần núi xuồng. Bạn nhà tô ba tám viết tàu vẽ. Lầu khoảng khoan cái xanh thuyền em. Phá xuồng xanh.\n \rBiển việc kim. Cửa máy một đã. Mướn hết mượn bơi nha ghế. May lầu việc thuê hóa. Lầu bàn hết chỉ đồng gió. Chỉ mười vẽ hết biết bơi ghế kim.\n \rÁc tôi giết ngọt nhà yêu. Mây hết bạn. Trời phá không bè nha may.\n \rChìm sáu thuyền giày. Máy ừ anh ờ cửa á cửa đá. Là thuyền hóa em ờ giết ờ năm mười.\n \rThương may leo khoan hết hết thì phá chìm. Thích xanh ừ cái đỏ xuồng đánh hóa nghỉ. Bè thích bè nón phá đánh anh. Cái khâu sáu cái. Vàng tím hết thôi bàn. Đánh thế đánh năm mướn hương.\n \rVẽ ngọt sáu em đạp một. Đá mượn ừ một là. Nước làm yêu.",
      reviewer: "60edd2c14398d1743cf13b41",
      category: {
        _id: "60f151034398d1743cf13c71",
        name: "Đồ gia dụng",
        short_name: "Đồ gia dụng",
        tag_color: "green",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.929Z",
      updatedAt: "2021-07-17T09:36:21.929Z",
    },
    {
      _id: "60f2a4954398d1743cf13d03",
      summary: "",
      image: "https://picsum.photos/720/405?random=4",
      tag: [],
      slug: "principal-group-coordinator",
      rate: 0,
      title: "Principal Group Coordinator",
      content:
        "Cửa ừ thôi viết tủ khâu ngọt. Nhà trăng mua xanh bàn tô. Hàng giày tô tím trăng. Bạn mướn thôi chìm. Ác chìm leo yêu năm mười gió đâu xe. Hương thì quê em thôi năm xanh.\n \rLeo đồng yêu hai thuyền ghế quần hương ruộng áo. Nha biết nghỉ máy. Thì lỗi lầu cái biển ờ lỗi đang.\n \rCon cái đá. Nhà vẽ ừ khoan sáu em thuê á. Bàn máy xuồng tím giết nghỉ biết nghỉ ghét. Cái việc yêu đập không bơi hết thích ghét mây. Gì việc không giết áo bè xe.\n \rTô lỗi áo độc mười khoan cái. Việc em tủ thế được nghỉ đã. Tím khâu hàng thế độc được anh ừ sáu. Mượn nón chín gì đâu tàu hương tui nha thôi. Mượn quần ghét độc tủ hàng chết mười. Biết tô giày thôi bạn ờ núi ác mây hương.\n \rGhế chín xanh lỗi bè em. Gì cửa mượn. Chín tô xuồng máy khoan. Gì hai anh một vàng độc kim khoảng.\n \rBiển trăng ghét cái. Không áo lầu hết tui áo bạn chín ruộng. Núi xe lầu phá nhà hương một ruộng thuyền thế.\n \rTui xanh nước đã máy là ừ ờ chìm. Mượn hết cái thuê trăng. Phá là nha. Thuê dép tô trời yêu bạn máy tôi khoan không.\n \rGhế nghỉ hóa mượn việc viết một thôi. Hai thế đã thôi con đã ờ bạn tôi. Hàng ba đá biết. Bạn trời sáu áo. Lỗi tôi mười mượn biển.\n \rGiết trời viết biết. Tô khâu tôi thích. Thôi tô mười. Nhà anh khoan quần ác may hết.\n \rKhông đang đá xe thích khoảng nón. Tám thuyền anh. Xanh xanh thôi. Em gì biển mười. Xe nha quần đập ờ hàng. Con anh anh lỗi mua mười đã.\n \rVẽ trăng ba yêu em anh nước. Đỏ á bàn leo. Việc bàn tô giày trăng hương thì. Ừ thì núi khoan bốn. Sáu ghét quê khâu nhà hai chìm đánh.\n \rGì thuê hai đỏ bảy áo gì xanh hết tui. Mua đập tím mây. Trăng tôi một bè mướn.\n \rKhông tàu chết lỗi bạn. Ghế bốn lầu quần đã. Lầu vẽ mướn. Áo á yêu. Cửa may đã quê việc ừ. Vá tôi biết khâu anh trời.\n \rMười áo giết cái khâu biết biển máy hàng. Xuồng gì là anh bơi. Thuê kim tủ kim đồng cửa tím.\n \rVẽ đồng khoan việc thuê sáu giết hết. Là nha xanh xanh anh mây cái hai đâu. Cửa thì tui chết sáu. Giết áo đã bốn khâu. Tui nhà bàn xuồng bơi tôi thích quê ghế.\n \rĐồng một máy cái độc khoảng bè bè. Ghế đánh vá bốn ba. Chìm á bảy đồng bốn thì. Chín chỉ quần viết khoảng gì không dép quê. Chỉ ghét mười nhà chìm giày cái một.\n \rXe biết tôi làm mười núi nước thì máy. Bè tám đá đang vàng. Thì đồng tám được trời con vá máy. May hết nhà đỏ là. Biển xe đá leo xe xanh biển cái con gì.\n \rTôi tàu may bạn thế đạp. Gì tàu mượn ba bàn là tui tôi bảy. Nhà hàng chìm ừ giày thuê. Mướn độc mười biển tui bơi ngọt chết thuê. Thôi nón chết một mượn.\n \rTô nước hết tui tím xanh dép bơi nha một. Khoan đập quê. Quần khoan yêu hết viết quần. Bảy mượn tô quần phá thương may việc chết khoảng. Ghế một tô viết chết máy đã anh giết tàu. Là là giày.\n \rNước leo chỉ bàn chỉ sáu áo. Yêu sáu nghỉ ghét máy khâu. Hóa chết ba ruộng đánh là chỉ đâu đá ruộng. Nón đang một. Thương khoảng chín hàng quần lầu bạn được là chìm. Mây lỗi đã dép mượn ghế giày biển nha.",
      reviewer: "60edd2bf4398d1743cf13b39",
      category: {
        _id: "60f151754398d1743cf13c90",
        name: "REVIEW ĐỦ THỨ",
        short_name: "REVIEW ĐỦ THỨ",
        tag_color: "yell",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.929Z",
      updatedAt: "2021-07-17T09:36:21.929Z",
    },
    {
      _id: "60f2a4954398d1743cf13d06",
      summary: "",
      image: "https://picsum.photos/720/405?random=5",
      tag: [],
      slug: "international-communications-architect",
      rate: 0,
      title: "International Communications Architect",
      content:
        "Tui đạp ruộng thích trời hai gì. Đâu bàn tám đã may tô. Thì thế máy. Khoan chìm trời núi thuyền lầu tôi bảy. Tủ chìm là em là việc nhà. Yêu đang bơi.\n \rCái ác là tàu nhà mười mướn. Đập lỗi áo. Thế xe năm tô. May sáu xuồng.\n \rTrời cửa bơi biển tủ thế tàu anh năm đạp. Ngọt việc ác hương tôi hết đã đá bốn năm. Mười mượn sáu. Bảy hết bảy vàng bốn viết gì thôi một chỉ. Xanh á tui thì biển nhà lầu chín hết.\n \rMay tui biển nhà mây. Mướn gì cửa ác gió dép. Đâu bơi thôi. Anh khoảng là máy cửa trăng đá tám anh hóa.\n \rĐánh bạn được. Hương sáu bàn thuê thế. Sáu mười phá hai thì sáu. Độc khâu thôi việc. Được vàng hết ngọt chết con việc lỗi sáu. Đánh nghỉ dép ừ quần mười.\n \rGiày con quê ghét mướn đã hương tui nước mười. Dép mua ừ nước. Con vá núi xe.\n \rNăm biển mười. Kim đập đạp giày máy đạp trăng chín. Hóa mượn việc bơi không nón yêu viết trời ba. Quê quần ừ. Đang nón phá chín mây. Một ghế thế được.\n \rBiết thuyền hóa. Phá hương mười đập đang. Nghỉ chín vá bảy. Tôi trời đang.\n \rĐỏ dép mười may thích cái kim lỗi hai. Bàn hương em nhà núi thôi giết vá ghét xanh. Chín xanh hương chìm. Bàn đánh hết lỗi khoảng hóa. Bơi tui thôi hương nước ngọt.\n \rYêu đập leo mua độc mười tủ kim. Thế máy hết thích tám áo. Đã giày ba. Ngọt gì em hết tám mượn bơi thuê. Ghét quê sáu chỉ chết bàn một chết. Hết gì khoan.\n \rAnh mười bạn nón đâu tôi gió thì. Bốn quê quê ngọt hương. Em gió mua. Ghế tui chìm. Trăng bốn nón.\n \rChết may giết yêu. Thôi thôi tô ừ. Đánh cái trăng hai thuê là. Em leo mười một năm lầu thuê.\n \rĐánh ờ xanh ghét ác hương nghỉ dép mây bàn. Nhà đánh con đạp đâu. Đập tui trời ác nghỉ trăng chín ruộng. Ờ leo gió mua khâu. Quần thuyền tôi bốn sáu.\n \rNăm anh thôi nha vẽ đỏ việc là bè. Bạn cái yêu đang việc. Quần bơi ngọt đang hết mây ờ.\n \rMượn bạn năm được đỏ hóa anh. Chín đâu mua sáu đã chết tô việc chín nghỉ. Chết ác ghế khoan hết xe. Thương biết ác yêu hết lỗi. Quần đá một đang ruộng mây núi. Chín nước tủ đỏ.\n \rĐồng đồng ngọt mướn đánh mây tàu đánh viết. Quê nón gì thương hết mười. Tủ viết vẽ nha thích ác. Không tím giết ghế vá thương cái. Mượn thế anh biển nha kim ngọt hai. Bơi cửa anh sáu xanh hàng chỉ.\n \rNước thì nha kim dép ngọt hóa mượn trời nón. Tủ nón tủ quần thế dép quê không. Núi á em ờ.\n \rĐạp sáu yêu xuồng thuê đá lỗi xe. Vàng chết ngọt bàn hết vàng. Việc làm dép mười nước. Ghế việc tôi leo thì. Thuyền ác giết.\n \rTàu vẽ đỏ con tô hết thuê yêu chỉ á. Nha đâu khâu bàn giày kim tím biển mua. Ừ chết viết bơi quần khoan anh máy xanh bốn. Tui hết viết vá ruộng anh cái nước thương bơi. Thích xe hết mây trăng khoan xuồng ruộng. Vàng bạn đá.\n \rĐập bạn hết khâu mây. Bạn ghế bè đạp tô độc ờ. Chỉ không cái chết hương khoan.",
      reviewer: "60edd2c14398d1743cf13b41",
      category: {
        _id: "60f151754398d1743cf13c90",
        name: "REVIEW ĐỦ THỨ",
        short_name: "REVIEW ĐỦ THỨ",
        tag_color: "yell",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.929Z",
      updatedAt: "2021-07-17T09:36:21.929Z",
    },
    {
      _id: "60f2a4954398d1743cf13d00",
      summary: "",
      image: "https://picsum.photos/720/405?random=6",
      tag: [],
      slug: "global-interactions-engineer",
      rate: 0,
      title: "Global Interactions Engineer",
      content:
        "Hết áo mướn quê tui. Đá bốn xanh. Đạp ghế hóa. Năm mượn là mượn cửa khoan em.\n \rCửa bốn mượn biết thích. Hương bạn anh khoan. Hóa nước thương. Giết việc năm dép. Anh gió ờ bốn xuồng vẽ cửa được dép phá. Việc cửa đá.\n \rGhế nha ghét nghỉ. Núi núi quần ba giày gì hương cái á anh. Vàng ghế kim tô việc gì phá. Chết nghỉ bốn năm ác tím con hóa chín. Chìm bơi thương giày núi quê lỗi dép.\n \rCon tôi ghét kim leo thôi được thương đạp. Vá em xanh đập ngọt bàn chỉ em việc. Mười tủ biết đánh đạp thế mây chín ghét. Thuê đang mua đá ruộng đang hương đánh xe.\n \rĐỏ phá lầu đỏ không thế. Không biết bảy thì làm. Ruộng con đánh khâu đang cửa anh một giày. Cửa thích may tôi một đá. Trăng tím trời bàn bàn khâu mướn ờ đã mướn.\n \rCái gì bạn nghỉ lỗi. Đang độc đập nước mây nghỉ giết hương tám hàng. Làm lỗi gió. Ba năm đã được quần chìm tui bơi gì.\n \rAnh ác bảy tím đạp bạn. Đang xe đã bạn xanh. Vàng năm quê gió thương hương. Hết chín ghế thì. Thế thế cái thích giết biển em mướn đâu. Nước chín biển đỏ tui.\n \rMướn tàu không. Bàn vẽ áo nha bơi hết nha hết. Lầu bạn đang cửa ghế vàng bơi đánh. Mười năm gì xe cái nha biết đang.\n \rQuê làm con. Anh một đỏ khâu. Thuyền tám việc bốn tủ. Tàu cửa đồng. Mượn chết phá bảy độc lỗi đạp lầu.\n \rNúi khâu dép quần trăng ghế. Khâu không anh thuê mướn bốn. Mây khâu hóa cửa là tui lỗi. Áo đỏ tím em ờ nha năm tám. Đồng hai lầu mua hai nước á. Quần áo thuyền giết giết ngọt không hóa.\n \rPhá bơi bàn đá đang thôi hàng lầu. Dép mây ừ không cái kim tui. Chìm không hàng được mười phá may đánh chỉ mượn. Đập tàu làm tui hàng nón tôi. Thích đâu máy.\n \rLà bơi nước chín vàng. Mướn làm mua vẽ xuồng nhà tui nhà được. Áo hai cửa đồng tô cửa gió giày được.\n \rNón sáu mượn đập. Lỗi thôi không không hết trời không giày. Là ruộng chìm ghét đánh bơi biển. Viết khoảng đồng xanh thế nghỉ. Tím may lỗi nón hết. Dép xanh gió một hết tôi ừ.\n \rNha ghét tàu sáu em mượn gió. Bơi mua con lầu con. Tủ thuê đá giày một viết mây hàng. Lầu leo á cửa khoảng kim vẽ gió bảy leo. Ờ chìm tô. Hai chìm bảy vá.\n \rThuê bảy á bè thích lầu gì thuyền mây. Hóa con nước nón khâu. Mây kim hóa tủ giày. Không con nhà anh bơi thuê nghỉ. Thế khâu mua gì chỉ tám lầu nghỉ bảy thích. Trăng thì nghỉ đánh.\n \rVàng xanh nón. Vá vá hàng chết trời nhà năm bạn. Hương biển độc xanh lầu.\n \rMười hết năm ờ. Việc thuê bè dép khâu đá đang phá vẽ. Tô đánh đá cửa. Xuồng cái áo biển em tui núi cửa lỗi. Độc tôi gió năm.\n \rMượn hương đang. Dép ngọt đã năm biển bè không. Vàng hết trăng biết.\n \rMướn biển may ghế hết mây thương em. Quần đánh quần năm khâu chỉ máy tui. Trăng ác vẽ bè tui đồng là hết. Kim thích làm biết trời.\n \rQuê hết phá nón tàu. Đá may khoảng mướn yêu giày bàn ác. Gió bè tím đạp chìm nước viết vàng tô. Nhà ờ lầu tôi đập được mười hóa ác lỗi.",
      reviewer: "60edd2c14398d1743cf13b41",
      category: {
        _id: "60f151754398d1743cf13c90",
        name: "REVIEW ĐỦ THỨ",
        short_name: "REVIEW ĐỦ THỨ",
        tag_color: "yell",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.929Z",
      updatedAt: "2021-07-17T09:36:21.929Z",
    },
    {
      _id: "60f2a4954398d1743cf13cf1",
      summary: "",
      image: "https://picsum.photos/720/405?random=7",
      tag: [],
      slug: "dynamic-intranet-assistant",
      rate: 0,
      title: "Dynamic Intranet Assistant",
      content:
        "Mượn gì không bốn. Trời hóa chín trời giết vẽ khoan. Xuồng ờ được. Kim mười ba. Đâu thế anh việc đập làm đồng anh.\n \rXe thì đạp bàn viết vàng ác làm đồng xe. Chỉ mây thích tàu nước. Tám bè vá. Nón vàng biết nón lỗi. Năm tô tôi nước tím hết bốn khâu nghỉ hương. Đạp thuyền quần ừ là hương thương độc.\n \rTô giày tủ nón chìm quần. Tàu vàng vàng. Vá đập thuê. Biển hết viết độc tàu bốn sáu.\n \rSáu đã thuyền trăng cửa. Được hết việc năm tui mười bạn giết. Chỉ thế bạn ghét cái.\n \rChín đánh lầu năm quần biển ba mười vẽ. Kim tôi không đã bè mười tàu giết được kim. Á vá phá bàn chìm.\n \rĐang cửa thích viết giết chỉ gì gió. Hai bạn biết giết được. Là máy hương. Anh tô độc biển kim vẽ em bốn hàng. Bè núi không chỉ. Bốn mướn khoan.\n \rTím biết may bàn bơi bảy ờ mây là. Cái tàu biển bảy xanh mướn biết mười. Việc ghế nghỉ mười. Mua chìm núi thích ngọt may cửa hàng núi. Máy tủ thuyền con. Ngọt hương trăng bơi thuyền hết yêu.\n \rNhà độc khoan gì nước nhà núi vá. Sáu đỏ bè. Áo đánh hóa năm em chín làm lầu đá tui.\n \rNúi bảy chỉ vàng viết. Em mười xe ngọt. Là thuê tui phá ba cửa. Biết bốn yêu chết. Thôi nghỉ ngọt gió tui đá giày mướn đánh. Mười quê đồng.\n \rThuê ờ xe giết núi. Được chín đạp thuyền mây năm. Đá giết làm bạn được mây. Chỉ bè vàng ghét ừ thôi. Nghỉ ghét gió thì làm vẽ bè em.\n \rNước ghét cửa máy vẽ. Ghế vàng mua. Cái tủ ba hết mây. Ngọt bảy sáu khoảng bàn thuê xuồng đánh chỉ tôi. Tôi được là tám bốn.\n \rSáu bè vá. Đạp khoan không một ghế trời đá. Ghét ừ trăng đánh một biển nhà sáu. Đạp thuyền việc nón nha thuyền nón hóa vàng ba. Xanh thì thuê khoảng ác.\n \rRuộng bốn thương tui vẽ thương một xe em hóa. Là tím ghét gì tím. Ghét đồng khâu bơi cửa núi năm.\n \rMượn hai thuyền em. Tàu làm nón ghét leo. Làm lỗi kim lỗi ghế. Đã độc trời mây biết không thì.\n \rMười biển thuyền thương hết dép gì em ba. Năm năm ngọt đang hết cửa gió dép con mây. Nhà đang bảy bàn một ngọt thuê chết. Hết đá ừ. Nước nước quê đỏ giết ghét leo.\n \rYêu biển trời leo khoảng. Bàn đã em leo anh. Cái đồng yêu nghỉ kim áo mua. Đâu một khoảng. Hương mây ờ. Ghét tám xuồng đâu thuê chín tui khâu.\n \rÁc cái nón đâu tủ mười. Bạn viết hương bơi xuồng nón thế đánh đạp gì. Mướn thế tím tàu may đồng. Ghét hương gió vẽ đồng. Hết cửa đỏ khoảng. Núi may ừ nghỉ nghỉ.\n \rĐâu khoan chỉ. Phá trăng được đồng đạp. Xuồng hết yêu. Gì độc mười kim tô yêu tô khâu may ác. Bơi thì đỏ nhà phá tui may đâu.\n \rĐộc chín chết được năm. Tủ xe khoảng đang đã hương vẽ gió. Không việc nhà gió yêu thì được độc vá hương. Vẽ tô tím thì độc núi. Thuyền tàu núi quần. Hàng đạp khoảng.\n \rKim dép em thuê nghỉ con làm nghỉ. Chết xe áo nghỉ xe đâu. Lỗi kim thuê vàng nước giày tôi ác.",
      reviewer: "60edd2bf4398d1743cf13b3c",
      category: {
        _id: "60f151754398d1743cf13c90",
        name: "REVIEW ĐỦ THỨ",
        short_name: "REVIEW ĐỦ THỨ",
        tag_color: "yell",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.928Z",
      updatedAt: "2021-07-17T09:36:21.928Z",
    },
    {
      _id: "60f2a4954398d1743cf13cf4",
      summary: "",
      image: "https://picsum.photos/720/405?random=8",
      tag: [],
      slug: "corporate-web-engineer",
      rate: 0,
      title: "Corporate Web Engineer",
      content:
        "Em đạp chết nhà làm lỗi. Thì vàng gió. Thế bơi việc tám độc hai việc. Khoảng anh biết giày con. Tím cửa yêu gió. Biết ừ xuồng sáu phá nha.\n \rKhông lầu khoảng trời vẽ quần thuê sáu chỉ bè. Mười dép dép tàu thôi hàng leo. Vàng vẽ hóa giày áo mười tui đã nón. Biết được em máy ngọt yêu bơi biển khoan nghỉ. Hết tôi khâu thì.\n \rEm biển gió. Quần bốn khâu gì ghét. Nghỉ hàng khâu thuê đạp phá thuyền.\n \rKhông chín leo. Không xe đồng tím việc cửa leo hai mười. Năm độc năm viết mướn. Xanh đá phá tàu đá năm.\n \rBàn chỉ chìm mướn cái hết kim xuồng đỏ. Tôi trăng đâu khoảng áo leo hóa thuyền xe. Máy khâu ruộng. Áo mướn nhà yêu hai. Máy yêu năm đánh hết bơi ngọt hóa đá.\n \rĐá làm em tô ba sáu chín cái cửa năm. Thế áo mướn mười bạn thích tôi. Biết chết gió kim. Dép yêu chín được thuê em nước tôi thích ác.\n \rKim tám chín tám một vẽ đá năm bàn. Xuồng mua xuồng đâu đồng hết mượn lầu quê. Cửa ghét trời mua chín. Nha thương mượn anh. Nón ác ghét đập ba áo nón gió.\n \rMượn đỏ chỉ chỉ ngọt bạn năm. Là năm ác hết. Khâu khoảng tôi khâu máy việc nha. Xuồng quần thuyền đã ờ độc đập đá chìm dép. Khoảng chết gió ngọt ruộng may trăng. Nha khoan cửa xanh thuê thuê hương đang.\n \rÁ vàng dép vá mười chìm khâu bàn quê. Anh trời chỉ phá mười được thôi anh. Mây ghét việc con máy quần đỏ. Đỏ gió tàu bàn. Phá tui gì hương thương tủ cái được tám.\n \rVá con áo ghét vá chết hóa giày tím. Hương mười việc bơi đồng giết lầu. Á tám tui á tôi không.\n \rVẽ đang thì đang ờ hàng mướn ngọt. Thuyền đâu nón thuyền thuyền hàng bơi bảy hết đâu. Tui yêu yêu ruộng.\n \rThuyền tám gió. Đá thích mây trăng đá tím. Tám thuyền biển quần phá. Tủ độc kim bốn ruộng ghét ghét mây. Vẽ tui tô nghỉ bè. Thôi tô vá mười chết may ghét.\n \rNhà lầu ác trời yêu núi tôi chìm quần. Trăng máy thuyền năm thuê cái. Tím hai bảy.\n \rBơi biển bảy không đập nón á dép bơi xanh. Chín cái thuê. Thuyền anh biết trời ngọt á yêu tám tủ đạp. Dép năm khoan đã bạn hương thuyền. Vẽ khoảng núi vàng leo giết. Bàn tủ ờ.\n \rKhâu đạp biển bạn đồng nhà. Nhà hai tô leo giết đâu yêu ngọt bàn. Tui hàng thế phá. Đâu chìm đập. Xanh máy được đánh mười á trăng hết bảy chết. Yêu nha nước trời bè mua áo.\n \rBàn hết là bảy đang. Nước anh hóa bốn. Trời leo thôi khoảng trời tủ em. Núi mượn vá đâu yêu bạn hàng lầu.\n \rĐánh kim đập hết thương khoan thuê bè biển yêu. Nhà đạp áo viết vẽ. Nón hương tui quê tủ tôi mười gió. Tám khâu viết thuyền sáu nhà hương khoảng gì thì. Nhà may xe mướn thì bạn khâu trăng một. Tui hóa bè leo tám đập đá mượn mua.\n \rYêu vá tàu. May tô ghế mướn. Con tô hương tui ba đang ờ đá bơi mượn. Sáu ba nha ruộng. Hai vá một.\n \rĐá giày ba khoảng đạp tôi xuồng. Gió đồng xe. Ừ mượn hai biển chết tám đâu nhà ruộng. Cái tui chìm ba quê thuyền đá việc tím thế. Cái quần chết thôi làm nha bảy bơi. Ngọt độc núi mướn khâu đã.\n \rChết thuê trăng núi đạp khoảng thế nha tím. Hai thương anh. Viết chỉ trời thuê cái chết mua. Đâu may hai mười mây xuồng gió thôi.",
      reviewer: "60edd2bf4398d1743cf13b3b",
      category: {
        _id: "60f150a74398d1743cf13c63",
        name: "Ẩm thực",
        short_name: "Ẩm thực",
        tag_color: "yell",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.928Z",
      updatedAt: "2021-07-17T09:36:21.928Z",
    },
    {
      _id: "60f2a4954398d1743cf13cf7",
      summary: "",
      image: "https://picsum.photos/720/405?random=9",
      tag: [],
      slug: "central-group-manager",
      rate: 0,
      title: "Central Group Manager",
      content:
        "Em đang ác. Ruộng quê mua bốn bốn thích nón ngọt chín bảy. Bè khâu đá. Biển nước tô không. Ruộng khâu ghét được khoan anh.\n \rHai thích mua thuyền một hàng leo vẽ. Thương đang ba mây ừ tàu. Đỏ bốn cửa mướn anh.\n \rHóa khâu thế. Giày khoảng ngọt yêu đá. Chết năm hết anh thuyền được. Chín nghỉ ruộng nhà bơi mướn tui lỗi. Nghỉ phá lầu ghét thì được làm.\n \rThuê may biết thương chỉ mượn trăng. Nha tôi năm chết lầu lỗi đang nhà. Vá ghế xuồng ờ xe ghế xe. Sáu thì tôi á tàu.\n \rGiết đánh xanh hàng. Ghế thì xanh đá. Tui giết trăng chín đỏ áo khoan một tui. Trời một leo á giày mua tui.\n \rBa em đạp khoảng vá. Vàng chín nón xanh. Trăng bảy bốn quần việc đập mười.\n \rMột thuê xuồng vẽ bàn hương ruộng. Viết bạn gì mượn thôi khoảng em đánh. Xuồng việc thích nước. Cái đang đồng ba bảy vàng không trời ba. Quê bảy bơi anh thế vàng.\n \rMay ác lầu khâu nghỉ. Khoảng nhà trăng yêu thuê tủ sáu thuyền nón. Đã xuồng ừ thôi bàn thuê khâu.\n \rThuê ghét ruộng máy áo đạp biết khoan áo biết. Tủ bạn tô thương anh đá hết mười đỏ xanh. Hàng xuồng vá quần lỗi đã thôi là viết bơi. Mua đạp ác khâu thương quê quần được bàn.\n \rGiày vẽ xanh bảy tôi ờ tàu biển phá. Việc đập hóa thì trời thì anh biết nhà em. Gì áo tui thương đập.\n \rHai nha bốn ghét. Ác thích anh ghét xuồng biển nghỉ vàng mua nha. Làm khâu anh. Bơi là đánh tô nha. Ba khâu yêu mười hóa sáu ờ. Xanh phá vẽ ác anh đâu con năm bơi leo.\n \rQuê làm việc máy xe hương. Năm đã bơi. Bạn bốn bốn con. Đá bè lầu nhà bảy mướn sáu vàng bốn vàng. Hết đồng gió anh.\n \rMây máy biết một á ngọt leo yêu thế ờ. Á xe nghỉ. Xuồng ghét làm vá. Hàng xe việc nghỉ em tui lỗi trăng tàu vàng. Được leo bạn tủ. Thì thì tím mua bốn ác xuồng.\n \rDép á mướn giết núi vá. Á đồng thuyền bạn khoan đang. Giày năm gì biển.\n \rNghỉ ruộng ghét tám bốn hương mây. Hết máy tàu bảy mười á. Núi không thôi mười tím giết ngọt biển. Gió hết đâu quần. Bàn được nhà đánh. Bảy xe núi mây ngọt ờ tủ.\n \rChìm áo leo cửa lầu khoảng. Mướn á tủ thôi. Gió máy độc phá. Hết tủ nón đã xanh ờ xanh bơi hết lầu. Đập khoảng sáu nha anh đâu nghỉ khâu. Bốn giày khoảng bạn gió nón.\n \rĐỏ bạn bơi là dép lầu chín thì á được. Năm hết lầu. Thuyền vàng độc con tím xanh biết. Khâu mướn khoảng may nhà ác. Thuê đỏ gió tàu khoan trăng khoảng. Tím vá cái hương tui núi nghỉ núi.\n \rXuồng hóa lầu hương sáu đạp quê bốn. Hàng anh việc vẽ chìm bè. Gì cửa hết hàng dép bàn ghét chìm làm việc. Bảy áo thuyền đã bốn độc chín.\n \rTủ viết mười ừ tủ. Đỏ thì tủ máy chết làm mây giày. Xanh yêu mua gì.\n \rNón năm ừ đạp xanh ghét đâu. Nghỉ biển đánh vẽ may khoan chỉ hết ruộng. Tô đỏ thương khoảng đập tím cửa thuyền nha.",
      reviewer: "60edd2bf4398d1743cf13b3b",
      category: {
        _id: "60f14de54398d1743cf13c3d",
        name: "Công nghệ",
        short_name: "Công nghệ",
        tag_color: "orange",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.928Z",
      updatedAt: "2021-07-17T09:36:21.928Z",
    },
    {
      _id: "60f2a4954398d1743cf13cfa",
      summary: "",
      image: "https://picsum.photos/720/405?random=10",
      tag: [],
      slug: "investor-data-technician",
      rate: 0,
      title: "Investor Data Technician",
      content:
        "Kim vá quần đạp thuê dép quần. Á được tô phá thương tủ. Lầu lỗi đạp thôi vẽ đỏ vá. Phá chìm khoan đang khoảng bảy ác thì.\n \rChết bơi đá ác chết giày mua mua ruộng ba. Hàng xe chỉ thích đồng thế hóa đã viết. Lầu anh vàng. Ghế ba một cái. Hết yêu nha đã. Á thôi lỗi.\n \rTủ xe đập dép tám thuê. Đạp tôi quê tím. Giày làm trăng chín bốn. Là ghét nghỉ. Á tàu vá. Được hương chìm gì việc.\n \rQuần không nghỉ giày. Cái hết thì cửa nhà giày tôi mười. Làm gió tím độc tàu em vẽ vá anh đâu. Ruộng thôi bơi ác đá em trăng. Mượn năm độc đạp một vàng ba hết chìm.\n \rMượn việc biển. Khoan xuồng gì lỗi mây không nha. Nghỉ hóa máy không phá. Nha yêu xuồng nón chỉ ờ.\n \rNước là kim hóa biển hóa dép thương trời. Nước bốn hết hết xe áo bơi tủ xe. Tủ thương tám vá phá tui việc. Nhà là thôi hàng nước trời anh vá.\n \rĐâu sáu ừ á. Đánh kim phá kim. Thuê nha vá đập thương tám em. Quần độc ác mây ruộng. Trời đang trăng đạp vàng tàu chìm.\n \rNón đá thì là mướn ừ xe ờ khoan. Nghỉ đỏ hóa. Hết bè vẽ bơi viết mây leo ghét chết.\n \rViết hết bảy trời đang. Em leo ghế mướn chín được. Bạn ờ làm. Bạn khâu biển biển mua mười bơi á bè đồng. Trời con mua hóa tàu.\n \rCon biển thuê xanh ghế á ghế hai cái. Hương tôi chỉ ờ tôi chìm dép. Tím con vá chìm năm bốn.\n \rChìm trăng tôi mười viết á thuê hương. Đồng tám bạn khoảng nhà đánh thế giày hai leo. Khoảng thích tàu một biển áo tô xe hết yêu. Thích được yêu được.\n \rNón nước tàu. Leo tím trăng viết vẽ một yêu. Chìm hết đỏ thương thích.\n \rĐạp năm á hóa tô bạn đã chín á thuyền. Gió xuồng bạn năm. Khoan đồng hàng. Đạp khoảng leo bơi vàng bơi nón mướn chết. Ruộng thuyền lầu thích ờ xanh bạn tô đã nhà. Con việc em bè một đồng hàng tủ chỉ.\n \rNghỉ đạp ừ xuồng hết đang quần bàn đồng trăng. Đâu thế chín vàng giết xanh hai nón thế. Á hai chìm đã. Mây đập cửa đánh xanh viết năm tàu tím ngọt.\n \rLỗi bảy mây nghỉ vẽ vá xanh đang. Đập một xanh việc. Hết gì hóa lỗi ngọt chìm áo tím xanh. Kim lỗi trời hết trăng nhà cửa. Mướn nhà ừ đang đang con cái đâu. Thì ừ mượn.\n \rMướn thôi lầu ờ đồng xe khoảng dép. Máy khoảng khoảng nha một sáu thì thế cửa tám. Nha vá nước. Giết đang tám nón thuê thuê. Mướn bạn thương thì giết chìm mua. Phá kim nha.\n \rYêu giết xe được tủ năm nghỉ cái hàng khoảng. Xanh hai bốn nước ngọt trời núi phá. Áo tám nón thì đang năm bạn.\n \rNghỉ đỏ hết. Tám biển đánh đập dép thương thuê hương. Ờ em nước nhà gió đâu tím tím. Đập á cái tô không hàng tủ giết gì. Đánh ngọt việc bơi hết. Quần ghế hai một chỉ.\n \rChín cái ngọt làm ừ cái nhà em thì. Gió bè bè núi núi áo khâu mượn. Hết đập lầu. Vẽ mướn xuồng bảy giày quê. May quần thì hết nghỉ giết leo yêu.\n \rĐâu thế khâu chỉ ừ. Phá khâu được một đánh giày chỉ ờ. Ghế em mướn máy lỗi núi ác đỏ tủ. Tôi ba đánh yêu ba quê đâu. Á hết tám tôi đánh vàng vàng xanh biết biết.",
      reviewer: "60edd2bf4398d1743cf13b3b",
      category: {
        _id: "60f151204398d1743cf13c85",
        name: "Phụ kiện",
        short_name: "Phụ kiện",
        tag_color: "blue",
      },
      __v: 0,
      createdAt: "2021-07-17T09:36:21.928Z",
      updatedAt: "2021-07-17T09:36:21.928Z",
    },
  ],
  total_page: 2,
  page: 1,
  limit: 10,
};

// export const fetchPostByID = async (id) => {
//   try {
//     const response = await axios.get(
//       `http://api.reviewduthu.vn/api/review/${id}`
//     );

//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchPosts = async () => {
  try {
    const response = await axios.get(
      `http://api.reviewduthu.vn/api/review/category`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

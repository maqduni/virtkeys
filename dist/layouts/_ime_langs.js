/**
 *  Container for the custom language IMEs, don't mess with the window object
 *
 *  @type {Object}
 */
var Langs = {};

/**
 * $Id: CN.js 546 2009-02-27 08:53:11Z wingedfox $
 *
 * Chinese char processor implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2007-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev: 546 $
 * @lastchange $Author: wingedfox $ $Date: 2009-02-27 11:53:11 +0300 (Пт, 27 фев 2009) $
 */
Langs.CN = new function () {
    var self = this;
    self.INPArr = [];
    /**
     *  Callback to process keyboard input in the current IME style
     *
     *  @see VirtualKeyboard.processChar
     *  @param {String} chr current input char
     *  @param {String} buf actual processing buffer
     *  @return {Array} new buffer contents and length
     *  @scope protected
     */
    self.processChar = function (chr, buf) {
        var num, str, arr
        if (chr == '\u0008') { // backspace
            if (buf && (str = buf.slice(0, -1))) {
                VirtualKeyboard.IME.show(self.INPArr[str.toLowerCase()] || []);
                return [str, str.length]
            } else {
                VirtualKeyboard.IME.hide()
                return ['', 0] //total delete; some other cases
            }
        } else { //non backspace
            str = buf + chr
            arr = self.INPArr[str.toLowerCase()] || []
            if (arr.length) { // miao
                VirtualKeyboard.IME.show((typeof arr == 'string') ? self.INPArr[str.toLowerCase()] = arr.split('') : arr)
                return [str, str.length]
            } else if (VirtualKeyboard.IME.getSuggestions().length) { // not a part of a syllable
                if (isFinite(num = parseInt(chr))) { // miao3
                    str = VirtualKeyboard.IME.getChar(num);
                    if (!str) { //miao9 - no such variant
                        return [buf, buf.length]
                    } else {
                        VirtualKeyboard.IME.hide();
                        return [str, 0]
                    }
                } else if ((arr = self.INPArr[chr.toLowerCase()] || []).length) { //nih
                    str = VirtualKeyboard.IME.getSuggestions()[0]
                    VirtualKeyboard.IME.setSuggestions((typeof arr == 'string') ? self.INPArr[str.toLowerCase()] = arr.split('') : arr)
                    return [str + chr, 1]
                } else { // ni,
                    str = VirtualKeyboard.IME.getSuggestions()[0]
                    VirtualKeyboard.IME.hide()
                    return [str + (chr.charCodeAt() == 10 ? '' : chr), 0]
                }
            }
        }
        return [buf + chr, 0] //non-chinese talk
    }
};

Langs.ET = {
    cons: {
        // e a,i,aa,ee,u,o,oa/wa
        // - aiAeuoWY
        'ህ': 'ህሀሂሃሄሁሆሇ'                 // h h 
        , 'ል': 'ልለሊላሌሉሎሏ'                 // l l
        , 'ሕ': 'ሕሐሒሓሔሑሖሗ'                 // hh H
        , 'ም': 'ምመሚማሜሙሞሟፙ'              // m m
        , 'ሥ': 'ሥሠሢሣሤሡሦሧ'                 // sz X
        , 'ር': 'ርረሪራሬሩሮሯፘ'              // r r
        , 'ስ': 'ስሰሲሳሴሱሶሷ'                 // s s
        , 'ሽ': 'ሽሸሺሻሼሹሾሿ'                 // sh S
        , 'ቅ': 'ቅቀቂቃቄቁቆቋ ቈቊቋቌቍ' // q q
        , 'ቍ': 'ቍቈቊቋቌ'                          // qw Oq
        , 'ቕ': 'ቕቐቒቓቔቑቖ  ቘቚቛቜቝ'   // qh Q
        , 'ቝ': 'ቝቘቚቛቜ'                          // qhw OQ
        , 'ብ': 'ብበቢባቤቡቦቧ'                 // b b
        , 'ቭ': 'ቭቨቪቫቬቩቮቯ'                 // v v
        , 'ት': 'ትተቲታቴቱቶቷ'                 // t t
        , 'ች': 'ችቸቺቻቼቹቾቿ'                 // c c
        , 'ኅ': 'ኅኀኂኃኄኁኆ  ኈኊኋኌኍ'   // x x
        , 'ኍ': 'ኍኈኊኋኌ'                          // xw Ox
        , 'ን': 'ንነኒናኔኑኖኗ'                 // n n
        , 'ኝ': 'ኝኘኚኛኜኙኞኟ'                 // ny N
        , 'እ': 'እአኢኣኤኡኦኧ'                 // glot '
        , 'ክ': 'ክከኪካኬኩኮ  ኰኲኳኴኵ'   // k k
        , 'ኵ': 'ኵኰኲኳኴ'                          // kw Ok
        , 'ኽ': 'ኽኸኺኻኼኹኾ  ዀዂዃዄዅ'   // kx K
        , 'ዅ': 'ዅዀዂዃዄ'                          // kxw OK
        , 'ው': 'ውወዊዋዌዉዎ'                    // w w
        , 'ዕ': 'ዕዐዒዓዔዑዖ'                    // pharyng '
        , 'ዝ': 'ዝዘዚዛዜዙዞዟ'                 // z z
        , 'ዥ': 'ዥዠዢዣዤዡዦዧ'                 // zh Z
        , 'ይ': 'ይየዪያዬዩዮ'                    // y y
        , 'ድ': 'ድደዲዳዴዱዶዷ'                 // d d
        , 'ዽ': 'ዽዸዺዻዼዹዾዿ'                 // dd D
        , 'ጅ': 'ጅጀጂጃጄጁጆጇ'                 // j j
        , 'ግ': 'ግገጊጋጌጉጎጏ ጐጒጓጔጕ' // g g
        , 'ጕ': 'ጕጐጒጓጔ'                          // gw Og
        , 'ጝ': 'ጝጘጚጛጜጙጞጟ'                 // gg G
        , 'ጥ': 'ጥጠጢጣጤጡጦጧ'                 // th T
        , 'ጭ': 'ጭጨጪጫጬጩጮጯ'                 // ch C
        , 'ጵ': 'ጵጰጲጳጴጱጶጷ'                 // ph P
        , 'ጽ': 'ጽጸጺጻጼጹጾጿ'                 // ts [
        , 'ፅ': 'ፅፀፂፃፄፁፆፇ'                 // tz ]
        , 'ፍ': 'ፍፈፊፋፌፉፎፏፚ'              // f f
        , 'ፕ': 'ፕፐፒፓፔፑፖፗ'                 // p p
        , 'ⶥ': 'ⶥⶠⶢⶣⶤⶡⶦ'                    // ss Os
        , 'ⶭ': 'ⶭⶨⶪⶫⶬⶩⶮ'                    // cc Oc
        , 'ⶵ': 'ⶵⶰⶲⶳⶴⶱⶶ'                    // zz Oz
        , 'ⶽ': 'ⶽⶸⶺⶻⶼⶹⶾ'                    // cch Ov
        , 'ⷅ': 'ⷅⷀⷂⷃⷄⷁⷆ'                    // QY
        , 'ⷍ': 'ⷍⷈⷊⷋⷌⷉⷎ'                    // KY
        , 'ⷕ': 'ⷕⷐⷒⷓⷔⷑⷖ'                    // XY 
        , 'ⷝ': 'ⷝⷘⷚⷛⷜⷙⷞ'                    // GY
    }
    , conv: {
        'ቀ': 'ቅ', 'ወ': 'ው', 'ረ': 'ር', 'ተ': 'ት', 'የ': 'ይ', 'u': '', 'i': '', 'o': '', 'ፐ': 'ፕ', 'ጸ': 'ጽ', 'ፀ': 'ፅ'
        , 'ሰ': 'ስ', 'ደ': 'ድ', 'ፈ': 'ፍ', 'ገ': 'ግ', 'ሀ': 'ህ', 'ጀ': 'ጅ', 'ከ': 'ክ', 'ለ': 'ል', 'አ': 'እ'
        , 'ዘ': 'ዝ', 'ኀ': 'ኅ', 'ቸ': 'ች', 'ቨ': 'ቭ', 'በ': 'ብ', 'ነ': 'ን', 'መ': 'ም'
        , 'ቐ': 'ቕ', 'ጠ': 'ጥ', 'ጰ': 'ጵ', 'ሸ': 'ሽ', 'ዻ': 'ዽ', 'ጘ': 'ጝ', 'ሐ': 'ሕ', 'ኸ': 'ኽ', 'ዐ': 'ዕ'
        , 'ዠ': 'ዥ', 'ሠ': 'ሥ', 'ጨ': 'ጭ', 'ኘ': 'ኝ'
        , 'ቈ': 'ቍ', 'ቘ': 'ቝ', 'ጐ': 'ጕ', 'ኰ': 'ኵ', 'ዀ': 'ዅ', 'ኈ': 'ኍ'
        , 'ⶠ': 'ⶥ', 'ⶨ': 'ⶭ', 'ⶰ': 'ⶵ', 'ⶸ': 'ⶽ'
        , 'ⷀ': 'ⷅ', 'ⷈ': 'ⷍ'
    }
}

/**
 * $Id$
 *
 * Inuktitut IME implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
Langs.IKU = new function () {
    var reNotIKU = /[^acefghijklłmnopqrstuvwxyᖃᐁᕋᑕᐂᐅᐃᐸᐊᓴᖕᒐᕼᔭᑲᓚᖤᕙᓇᒪ]/
        , remap = {
            'ᐊi': 'ᐁ', 'ᐃi': 'ᐄ', 'ᐅu': 'ᐆ', 'ᐊa': 'ᐋ'
            , 'ᐸi': 'ᐯ', 'ᐱi': 'ᐲ', 'ᐳu': 'ᐴ', 'ᐸa': 'ᐹ'
            , 'ᑕi': 'ᑌ', 'ᑎi': 'ᑏ', 'ᑐu': 'ᑑ', 'ᑕa': 'ᑖ'
            , 'ᑲi': 'ᑫ', 'ᑭi': 'ᑮ', 'ᑯu': 'ᑰ', 'ᑲa': 'ᑳ'
            , 'ᒐi': 'ᒉ', 'ᒋi': 'ᒌ', 'ᒍu': 'ᒎ', 'ᒐa': 'ᒑ'
            , 'ᒪi': 'ᒣ', 'ᒥi': 'ᒦ', 'ᒧu': 'ᒨ', 'ᒪa': 'ᒫ'
            , 'ᓇi': 'ᓀ', 'ᓂi': 'ᓃ', 'ᓄu': 'ᓅ', 'ᓇa': 'ᓈ'
            , 'ᓴi': 'ᓭ', 'ᓯi': 'ᓰ', 'ᓱu': 'ᓲ', 'ᓴa': 'ᓵ'
            , 'ᓚi': 'ᓓ', 'ᓕi': 'ᓖ', 'ᓗu': 'ᓘ', 'ᓚa': 'ᓛ'
            , 'ᔭi': 'ᔦ', 'ᔨi': 'ᔩ', 'ᔪu': 'ᔫ', 'ᔭa': 'ᔮ'
            , 'ᕙi': 'ᕓ', 'ᕕi': 'ᕖ', 'ᕗu': 'ᕘ', 'ᕙa': 'ᕚ'
            , 'ᕋi': 'ᕃ', 'ᕆi': 'ᕇ', 'ᕈu': 'ᕉ', 'ᕋa': 'ᕌ'
            , 'ᖃi': 'ᙯ', 'ᕿi': 'ᖀ', 'ᖁu': 'ᖂ', 'ᖃa': 'ᖄ'
            , 'ᖓi': 'ᙰ', 'ᖏi': 'ᖐ', 'ᖑu': 'ᖒ', 'ᖓa': 'ᖔ'
            , 'ᙱi': 'ᙲ', 'ᙳu': 'ᙴ', 'ᙵa': 'ᙶ'
            , 'ᖠi': 'ᖡ', 'ᖢu': 'ᖣ', 'ᖤa': 'ᖥ'

            , 'ᐂ': 'ᐂ', 'ᐧ': ''
            , 'ᐊᐃ': 'ᐁ', 'ᐃᐃ': 'ᐄ', 'ᐅᐅ': 'ᐆ', 'ᐊᐊ': 'ᐋ', 'ᐃᐧ': 'ᐄ', 'ᐅᐧ': 'ᐆ', 'ᐊᐧ': 'ᐋ'
            , 'ᑉᐂ': 'ᐰ', 'ᑉᐁ': 'ᐯ', 'ᐸᐃ': 'ᐯ', 'ᐱᐃ': 'ᐲ', 'ᐳᐅ': 'ᐴ', 'ᐸᐊ': 'ᐹ', 'ᐱᐧ': 'ᐲ', 'ᐳᐧ': 'ᐴ', 'ᐸᐧ': 'ᐹ'
            , 'ᑦᐂ': 'ᑍ', 'ᑦᐁ': 'ᑌ', 'ᑕᐃ': 'ᑌ', 'ᑎᐃ': 'ᑏ', 'ᑐᐅ': 'ᑑ', 'ᑕᐊ': 'ᑖ', 'ᑎᐧ': 'ᑏ', 'ᑐᐧ': 'ᑑ', 'ᑕᐧ': 'ᑖ'
            , 'ᒃᐂ': 'ᑬ', 'ᒃᐁ': 'ᑫ', 'ᑲᐃ': 'ᑫ', 'ᑭᐃ': 'ᑮ', 'ᑯᐅ': 'ᑰ', 'ᑲᐊ': 'ᑳ', 'ᑭᐧ': 'ᑮ', 'ᑯᐧ': 'ᑰ', 'ᑲᐧ': 'ᑳ'
            , 'ᒡᐂ': 'ᒊ', 'ᒡᐁ': 'ᒉ', 'ᒐᐃ': 'ᒉ', 'ᒋᐃ': 'ᒌ', 'ᒍᐅ': 'ᒎ', 'ᒐᐊ': 'ᒑ', 'ᒋᐧ': 'ᒌ', 'ᒍᐧ': 'ᒎ', 'ᒐᐧ': 'ᒑ'
            , 'ᒻᐂ': 'ᒤ', 'ᒻᐁ': 'ᒣ', 'ᒪᐃ': 'ᒣ', 'ᒥᐃ': 'ᒦ', 'ᒧᐅ': 'ᒨ', 'ᒪᐊ': 'ᒫ', 'ᒥᐧ': 'ᒦ', 'ᒧᐧ': 'ᒨ', 'ᒪᐧ': 'ᒫ'
            , 'ᓐᐂ': 'ᓁ', 'ᓐᐁ': 'ᓀ', 'ᓇᐃ': 'ᓀ', 'ᓂᐃ': 'ᓃ', 'ᓄᐅ': 'ᓅ', 'ᓇᐊ': 'ᓈ', 'ᓂᐧ': 'ᓃ', 'ᓄᐧ': 'ᓅ', 'ᓇᐧ': 'ᓈ'
            , 'ᔅᐂ': 'ᓮ', 'ᔅᐁ': 'ᓭ', 'ᓴᐃ': 'ᓭ', 'ᓯᐃ': 'ᓰ', 'ᓱᐅ': 'ᓲ', 'ᓴᐊ': 'ᓵ', 'ᓯᐧ': 'ᓰ', 'ᓱᐧ': 'ᓲ', 'ᓴᐧ': 'ᓵ'
            , 'ᓪᐂ': 'ᓔ', 'ᓪᐁ': 'ᓓ', 'ᓚᐃ': 'ᓓ', 'ᓕᐃ': 'ᓖ', 'ᓗᐅ': 'ᓘ', 'ᓚᐊ': 'ᓛ', 'ᓕᐧ': 'ᓖ', 'ᓗᐧ': 'ᓘ', 'ᓚᐧ': 'ᓛ'
            , 'ᔾᐂ': 'ᔧ', 'ᔾᐁ': 'ᔦ', 'ᔭᐃ': 'ᔦ', 'ᔨᐃ': 'ᔩ', 'ᔪᐅ': 'ᔫ', 'ᔭᐊ': 'ᔮ', 'ᔨᐧ': 'ᔩ', 'ᔪᐧ': 'ᔫ', 'ᔭᐧ': 'ᔮ'
            , 'ᕝᐂ': 'ᕔ', 'ᕝᐁ': 'ᕓ', 'ᕙᐃ': 'ᕓ', 'ᕕᐃ': 'ᕖ', 'ᕗᐅ': 'ᕘ', 'ᕙᐊ': 'ᕚ', 'ᕕᐧ': 'ᕖ', 'ᕗᐧ': 'ᕘ', 'ᕙᐧ': 'ᕚ'
            , 'ᕐᐂ': 'ᕅ', 'ᕐᐁ': 'ᕃ', 'ᕋᐃ': 'ᕃ', 'ᕆᐃ': 'ᕇ', 'ᕈᐅ': 'ᕉ', 'ᕋᐊ': 'ᕌ', 'ᕆᐧ': 'ᕇ', 'ᕈᐧ': 'ᕉ', 'ᕋᐧ': 'ᕌ'
            , 'ᖅᐂ': 'ᕾ', 'ᖅᐁ': 'ᙯ', 'ᖃᐃ': 'ᙯ', 'ᕿᐃ': 'ᖀ', 'ᖁᐅ': 'ᖂ', 'ᖃᐊ': 'ᖄ', 'ᕿᐧ': 'ᖀ', 'ᖁᐧ': 'ᖂ', 'ᖃᐧ': 'ᖄ'
            , 'ᖕᐁ': 'ᙰ', 'ᖓᐃ': 'ᙰ', 'ᖏᐃ': 'ᖐ', 'ᖑᐅ': 'ᖒ', 'ᖓᐊ': 'ᖔ', 'ᖏᐧ': 'ᖐ', 'ᖑᐧ': 'ᖒ', 'ᖓᐧ': 'ᖔ'
            , 'ᙱᐃ': 'ᙲ', 'ᙳᐅ': 'ᙴ', 'ᙵᐊ': 'ᙶ', 'ᙱᐧ': 'ᙲ', 'ᙳᐧ': 'ᙴ', 'ᙵᐧ': 'ᙶ'
            , 'ᖠᐃ': 'ᖡ', 'ᖢᐅ': 'ᖣ', 'ᖤᐊ': 'ᖥ', 'ᖠᐧ': 'ᖡ', 'ᖢᐧ': 'ᖣ', 'ᖤᐧ': 'ᖥ'
        }
        , submap = {
            p: 'ᑉ', t: 'ᑦ', k: 'ᒃ', g: 'ᒡ', m: 'ᒻ', n: 'ᓐ', s: 'ᔅ', h: 'ᔅ', l: 'ᓪ', j: 'ᔾ', v: 'ᕝ', r: 'ᕐ', q: 'ᖅ', 'ᓐg': 'ᖕ', 'ᓐn': 'ᓐᓐ', 'ᓐᓐg': 'ᖖ', 'ł': 'ᖦ', 'ᓪh': 'ᖦ', 'x': 'ᖦ'
            , i: 'ᐃ', 'u': 'ᐅ', 'a': 'ᐊ'
            , 'ᑉi': 'ᐱ', 'ᑉu': 'ᐳ', 'ᑉa': 'ᐸ'
            , 'ᑦi': 'ᑎ', 'ᑦu': 'ᑐ', 'ᑦa': 'ᑕ'
            , 'ᒃi': 'ᑭ', 'ᒃu': 'ᑯ', 'ᒃa': 'ᑲ'
            , 'ᒡi': 'ᒋ', 'ᒡu': 'ᒍ', 'ᒡa': 'ᒐ'
            , 'ᒻi': 'ᒥ', 'ᒻu': 'ᒧ', 'ᒻa': 'ᒪ'
            , 'ᓐi': 'ᓂ', 'ᓐu': 'ᓄ', 'ᓐa': 'ᓇ'
            , 'ᔅi': 'ᓯ', 'ᔅu': 'ᓱ', 'ᔅa': 'ᓴ'
            , 'ᔅi': 'ᓯ', 'ᔅu': 'ᓱ', 'ᔅa': 'ᓴ'
            , 'ᓪi': 'ᓕ', 'ᓪu': 'ᓗ', 'ᓪa': 'ᓚ'
            , 'ᔾi': 'ᔨ', 'ᔾu': 'ᔪ', 'ᔾa': 'ᔭ'
            , 'ᕝi': 'ᕕ', 'ᕝu': 'ᕗ', 'ᕝa': 'ᕙ'
            , 'ᕐi': 'ᕆ', 'ᕐu': 'ᕈ', 'ᕐa': 'ᕋ'
            , 'ᖅi': 'ᕿ', 'ᖅu': 'ᖁ', 'ᖅa': 'ᖃ'
            , 'ᖕi': 'ᖏ', 'ᖕu': 'ᖑ', 'ᖕa': 'ᖓ'
            , 'ᖖi': 'ᙱ', 'ᖖu': 'ᙳ', 'ᖖa': 'ᙵ'
            , 'ᖦi': 'ᖠ', 'ᖦu': 'ᖢ', 'ᖦa': 'ᖤ'

            , 'ᐸ': 'ᑉ', 'ᑕ': 'ᑦ', 'ᑲ': 'ᒃ', 'ᒐ': 'ᒡ', 'ᒪ': 'ᒻ', 'ᓇ': 'ᓐ', 'ᓴ': 'ᔅ', 'ᓚ': 'ᓪ', 'ᔭ': 'ᔾ', 'ᕙ': 'ᕝ', 'ᕋ': 'ᕐ', 'ᖃ': 'ᖅ', 'ᓐᒐ': 'ᖕ', 'ᓐᓇ': 'ᓐᓐ', 'ᓐᓐᒐ': 'ᖖ', 'ᖤ': 'ᖦ', 'ᓪᕼ': 'ᖦ'

            , 'ᐸᐃ': 'ᐯ', 'ᑉᐃ': 'ᐱ', 'ᑉᐅ': 'ᐳ', 'ᑉᐊ': 'ᐸ'
            , 'ᑦᐃ': 'ᑎ', 'ᑦᐅ': 'ᑐ', 'ᑦᐊ': 'ᑕ'
            , 'ᒃᐃ': 'ᑭ', 'ᒃᐅ': 'ᑯ', 'ᒃᐊ': 'ᑲ'
            , 'ᒡᐃ': 'ᒋ', 'ᒡᐅ': 'ᒍ', 'ᒡᐊ': 'ᒐ'
            , 'ᒻᐃ': 'ᒥ', 'ᒻᐅ': 'ᒧ', 'ᒻᐊ': 'ᒪ'
            , 'ᓐᐃ': 'ᓂ', 'ᓐᐅ': 'ᓄ', 'ᓐᐊ': 'ᓇ'
            , 'ᔅᐃ': 'ᓯ', 'ᔅᐅ': 'ᓱ', 'ᔅᐊ': 'ᓴ'
            , 'ᓪᐃ': 'ᓕ', 'ᓪᐅ': 'ᓗ', 'ᓪᐊ': 'ᓚ'
            , 'ᔾᐃ': 'ᔨ', 'ᔾᐅ': 'ᔪ', 'ᔾᐊ': 'ᔭ'
            , 'ᕝᐃ': 'ᕕ', 'ᕝᐅ': 'ᕗ', 'ᕝᐊ': 'ᕙ'
            , 'ᕐᐃ': 'ᕆ', 'ᕐᐅ': 'ᕈ', 'ᕐᐊ': 'ᕋ'
            , 'ᖅᐃ': 'ᕿ', 'ᖅᐅ': 'ᖁ', 'ᖅᐊ': 'ᖃ'
            , 'ᖕᐃ': 'ᖏ', 'ᖕᐅ': 'ᖑ', 'ᖕᐊ': 'ᖓ'
            , 'ᖖᐃ': 'ᙱ', 'ᖖᐅ': 'ᙳ', 'ᖖᐊ': 'ᙵ'
            , 'ᖦᐃ': 'ᖠ', 'ᖦᐅ': 'ᖢ', 'ᖦᐊ': 'ᖤ'
        }

        , premap = {
            'ᔾj': 'ᑦᔾ'
            , 'ᔾᔾ': 'ᑦᔾ'
        }

    this.charProcessor = function (chr, buf) {
        if (chr == '\u0008') { // backspace
            if (buf.length) {
                return [buf.slice(0, -1), buf.length - 1]
            }
        } else if (reNotIKU.test(chr)) {
            return remap[buf + chr] || [buf + chr, 0]
        } else {
            var str = buf + chr
                , res, cres, h = '';

            if (res = remap[str]) {
                return [res, 0]
            } else if (res = submap[str]) {
                return [res, res.length]
            } else if (res = premap[str]) {
                return [res, 1];
                /*
                            } else if (res=submap[buf]) {
                                if (cres=remap[chr])
                                    return [res+cres,1]
                                else
                                    return [res+chr,1]
                */
            } else {
                return [buf + (remap[chr] || submap[chr] || chr), 1]
            }
        }
    }
}

/**
 * $Id: JP.js 546 2009-02-27 08:53:11Z wingedfox $
 *
 * Japanese IME implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev: 546 $
 * @lastchange $Author: wingedfox $ $Date: 2009-02-27 11:53:11 +0300 (Пт, 27 фев 2009) $
 */
Langs.JP = new function () {
    var self = this
        , INPArr = {
            a: "日会四上合開明相当海安挙朝在空有足愛英赤歩悪登編厚我称充荒網揚阿遇麻浴亜芦吾晶遭唖娃逢宛或粟庵厭蛙敢窪鹸昂朱讐飽亞會呀哇嗟堊婀惡扛擧舉猗當痾稱辮翕翹褪襾覯覿逅遘邂錏鐚閼齏韲驤鴉", aa: "悪於乎于吁咨嗚嗟噫惡憙猗羌", aba: "発暴發訐", abara: "肋", abu: "危虻蛇炙炮焙煬熹", abumi: "鐙", abura: "油脂膏腴膩", aburaaka: "膩", aburamusi: "蜚", aburana: "薹", ada: "徒仇讐冦婀寇綽讎", ade: "艶艷", ae: "饗喘", aemono: "齏韲", aga: "何我吾崇", agana: "贖", agari: "東揚", agata: "県縣", age: "上", agito: "顎", ago: "顎腮諤頤頷顋齶", agu: "倦", ahiru: "鴨鶩", ahu: "溢", ai: "会合間東相和愛英秋娃哀挨姶逢鮎饗乃廼藍會哇噫埃曖欸瞹矮穢胥藹迺阨隘靄靉鞋", aida: "間", aite: "対對", aka: "明赤厚紅赫垢朱緋淦絳", akagane: "銅", akagire: "皸皹胝", akago: "嬰", akai: "赫", akane: "茜蒐", akara: "赧", akari: "灯燈", akaru: "耀", akarui: "熹", akasi: "証験證驗", akatuki: "暁曉", akatuti: "赭", akaza: "莱藜", ake: "明陽暁朱緋", akebono: "曙", aki: "日明成商天光白秋右清喜昭之陽章照哲徹旭輝啓昌朗鑑鏡晃彰祥顕晶亮穐叡瑛且亨尭暁倦昂燦嗣朱詮爽聡旦諦寧彬斌呆飽璃諒玲奐惘曉曄朖皓睿龝飫", akina: "商估賈", akira: "明現公成審映光史融央昭陽章智哲旭輝啓昌朗鑑晃彰顕晶亮卯瑛侃亨暁慧昂翠聡旦諦瞳彪彬諒玲昶熹皓聰", akiraka: "煕晃顕亮瞭冏杲晄晤晟晢晰暸曠昿渙炯烱炳煥熈顯熙", akitarinai: "歉", akitariru: "慊", akizora: "旻", ako: "赤", akoga: "憧憬", akome: "衵袙", akou: "榕", aku: "悪握唖渥飽堊幄惡扼軛阨鷽齷", akubi: "欠", akuta: "芥", akutu: "圷垰", ama: "海天赤余雨甘剰尼奄甜剩塰蜑餘", amadare: "霤", amane: "周普遍", amanesi: "普弥彌徇洽浹溥", amari: "羨衍贏", amaru: "余", amatu: "天", amatusae: "剰剩", amazake: "醴", ame: "天雨飴穹", ami: "網畢网罔罟罠罨", amigasira: "网", amo: "天", an: "行合安案暗庵按闇鞍杏厭晏殷罨菴諳閹餡鮟黯黶", ana: "穴窟孔坎塹壙嵌竅竇篏", anado: "侮傲妛狎謾", anagura: "窖", anazu: "侮", ane: "姉姐", ani: "兄哥豈", aniyome: "嫂", anzu: "杏", ao: "青仰襖煽蒼碧呷", aoga: "黽", aogiri: "梧", aoguro: "黝", aoi: "上葵", aomono: "蔬", appare: "遖", ara: "新表有非荒洗粗疏匪旌沐沽洒浣滌澣澡瑕盪蘯笨糲麁", aragane: "鉱砿礦鑛", arai: "洗", arakazi: "予豫", araragi: "蘭", arare: "霰", arasi: "嵐悍", araso: "争弁闘辨辧爭瓣諍辯鬪", arata: "改灼悛", aratama: "璞", arato: "砺礪", arawa: "表現著顕顯", areru: "蕪", ari: "家在有順蟻", ariduka: "垤", aru: "有歩", arui: "或", aruiha: "或儻", aruzi: "主", asa: "生朝漁浅麻旦晁晨淺苴", asagao: "蕣", asagara: "莇", asahi: "旭暾", asari: "蜊鯏", ase: "新焦汗", asi: "足愛茨脚芦葦疋葺葭蘆趺", asia: "亜亞", asibue: "笳", asige: "騅", asikase: "桎鐐", asinae: "蹇", asinoura: "跖蹠", asioto: "跫", asita: "旦晨", asiura: "蹠", aso: "朝遊敖游遨", asobime: "娼", asu: "明安足飛遊", ata: "中応防与辺熱仇傭估應沽與邊邉", atai: "価値價", ataka: "宛恰", atama: "頭顱", atara: "新", atarasi: "新", ataru: "中斉齊", atata: "温暖嫗煦煖", atataka: "暄燠", ate: "宛", ategi: "椹", ato: "後跡痕蹟址墟趾蹤踪迹阯", atu: "会集得熱圧安厚", atu: "徳温純充宏昌淳暑敦鳩渥斡纂蒐輯鍾篤惇睦湊亶會壓扎攅聚腆萃軋輳遏閼", atui: "醇", atuka: "扱", atumari: "集", atumono: "羹羮", atumu: "伍侑", atura: "誂", atusi: "温毅淳敦渥竺惇", au: "合", awa: "併阿淡哀粟慌泡沫怜憐勠并怱恊恤愍澹矜粱遽醂閔", awabi: "蚫鮑鰒", aware: "憫", awase: "袷", awatada: "遽", awati: "莱", aya: "理文史危順恵章礼錦奇彩怪紋絢綾郁苑琢斐彪妖冉竒恠愆綺綵黻黼", ayaginu: "綵", ayaka: "肖", ayama: "過誤謝謬繆訛譌", ayamatu: "跌", ayatu: "操", ayaui: "殆", ayu: "歩鮎", aza: "字鮮浅麻痣", azake: "嘲", azami: "莇薊", azamu: "欺詑紿詒誣謾", azana: "字糺", aze: "畦畔畛", azi: "味鯵蝋鰺", azika: "簣", azu: "安預阿", azuka: "与與", azuki: "荅", azuma: "東春", azusa: "梓"
            , ba: "場発化張映馬羽庭栄晴峡婆罵芭蕃塲麼旛瑪痲發碼薔蟇蟆鷭", baa: "婆", baba: "婆", bai: "売買倍枚梅賠培貝唄殻媒楳煤狽陪昧殼瑁眛苺莓賣邁霾黴", baku: "博暴爆幕麦曝漠縛莫駁貌摸寞瀑狢獏皃藐貘驀麥", ban: "万判番満馬板伴盤幡晩鰻播挽磐蕃蛮蔓卍曼幔悗滿瞞礬縵萬蠻謾輓鈑鑁鬘鷭", bara: "散払茨輩", baru: "原", bas: "罰", base: "橋", basi: "啄矼", bata: "端俣", batake: "畑", bate: "終", bati: "罰撥枹桴秡罸", batta: "蝗", batu: "末抜閥罰伐筏沫拔秣罸茉袙襪跋靺韈魃", be: "部米家可辺弁志倍缶瓶琶罐裴邊邉", bei: "米皿謎塀吠榠袂麑", beki: "冖冪幎汨羃覓", bekikanmuri: "冖", ben: "面弁便勉釆娩鞭緬麺俛冕辨辧卞宀抃汳泯湎瓣眄瞑辮辯麪黽", beni: "紅臙", bentou: "餉", besi: "志", betu: "別捌瞥蔑襪韈鼇鼈", bi: "日引備美火未尾老敏微梶弥鼻傍枇毘琵眉媚寐嵋麼弭彌濔瀰糒糜縻茯薇鞴麋靡黴", bibi: "周", bii: "為", biki: "引曳曵", bikko: "跛", bin: "備便敏貧瓶秤壜岷愍憫旻檳泯紊緡罎罠閔鬢黽", bira: "開", bita: "鐚", bitu: "蜜備", bo: "母模募暮干簿彫墓姥牡蒲惚莫慕戊菩呆摸姆媽拇毋糢謨", boka: "暈", bokasi: "暈", boko: "凹", boku: "目福木撲牧僕黙墨朴曝卜睦穆樸濮瀑默繆苜蹼雹鶩", bokudukuri: "攴攵", bokunoto: "卜", bokunyou: "攴攵", bon: "犯盆煩凡梵瞞笵", bora: "鯔", bori: "掘", boro: "繿襤", bosi: "星", botan: "釦鈕", boti: "点伐筏垈點", botu: "没勃勿孛悖歿沒渤坊", bou: "防望貿亡暴房夢忘膨妨忙冒謀乏傍坊帽棒紡牟矛霧虻卯牡茅畝戊剖某肪貌鉾妄孟蒙儚勗夘厖厶梦尨惘懋旁旄昴曚朦楙榜氓滂瀑瑁甍畆皃眸矇磅网罔耄冐膀艨芒茆茫莽蒡蚌蠎蟒袤謗鋩髦魍鴾黽", bu: "分部不保海打無夫武振歩豊舞歓奉峰霧蒲蔀舛汎賦侮撫葡蕪鮒蓬鵡嘸廡憮无毋豐錻鵐鶩", buka: "深", buki: "雪", buku: "袋茯", bun: "分文聞豊蚊吻紊馼", bune: "舟", bunnyou: "文", buri: "鰤", busa: "纈", busi: "節", busuki: "宿", buta: "豚", buti: "駁駮", buto: "蚋", butu: "物仏勿佛孛", buyo: "蚋", buyu: "蚋", byaku: "百白柏檗蘗甓闢", byou: "平病秒描妙猫苗鞄謬廟錨鋲屏杪渺皰眇緲苹藐蚌鉋", byuu: "謬繆"
            , da: "出立建打達伊抱妥那炊駄雫蔀蛇詑唾堕惰柁舵楕陀騨儺兌墮娜懦拏拿朶梛橢沱默糯荼蠕逹陏駝鴕", daasu: "打", dai: "大内代題第台提奈袋弟鵜醍悌梯乃廼眤睇臺迺餒鹹", daidai: "橙", dainomageasi: "尢", daira: "平", daka: "高瀉", dakari: "渠", dake: "丈", daku: "諾濁搦", dama: "神玉黙瞞騙", dan: "団男断談段玉弾壇暖敦灘蔀騨旦檀椴楠團彈斷煖葮", dana: "棚灘", dao: "倒", dare: "垂誰", date: "立", datu: "韃脱奪捺妲怛獺", de: "出田豊弟泥兌", dei: "泥禰祢臑袮", dekaguramu: "瓧", dekameetoru: "籵", dekarittoru: "竍", deki: "条溺嫋條滌", dekimono: "瘻", deko: "凸", deku: "塑", den: "田電伝典殿淀鮎佃纏澱傅傳甸奠拈畋沺癜臀鈿", desiguramu: "瓰", desimeetoru: "粉", desirittoru: "竕", detu: "涅", 'do': "百度取道水止土退友遠努撮怒豆澱奴曇呶孥帑弩迹駑", dobato: "鴿", dobu: "溝", dobuga: "蚌", doitu: "独", doki: "時", dokoro: "所", doku: "独読毒獨讀髑", doma: "地", dome: "止", domo: "共供吃吶訥謇", don: "殿鈍呑曇壜嫩緞罎飩", donburi: "丼", donguri: "杼", dono: "殿", doo: "通遠", doori: "通", dora: "鐃鑼", doro: "泥淤", doru: "取弗", dotu: "独", dou: "同百動道藤導働答登脳堂童桐洞銅吋寓竣憧撞瞳胴萄嚢膿仂僮儂呶嬲嫐恫慟曩橈檸潼獰瞠耨腦臑艟衲鐃閙鬧", dougamae: "冂", dousi: "通", dozyou: "鰍鯲鰌", duke: "付漬附", duki: "付築筑", duku: "作造", dukuri: "作造", dume: "都詰", dura: "辛", duta: "伝", duto: "勤", dutu: "砲宛"
            , e: "会生回家海画計重村得戸愛映英風衛吉央江図永植壊栄恵絵依笑誉獲飯衣柄也兄枝殖懐荏餌瑛頴詠榎廻隈慧潰歪會囘匯哇圖壞彗徊惠懷柯榮淮畫穢繪衞迴錏鐫", eba: "餌", ebara: "茨", ebi: "老蝦戎蛭蛯鰕", ebira: "箙", ebisu: "夷胡戎蛮戉狄羌蠻貊", eda: "条枝朶條", edati: "徭", ee: "詠", ega: "画描畫", egu: "刔刳剔抉", ei: "営映英影衛永栄泳鋭叡嬰曳洩瑛盈穎頴詠丿兌咏營塋暎曵楹榮殪泄潁瀛瑩瓔珱睿縊纓罌翳蠑衞裔贏郢霙饐", eki: "役益易駅液浴疫伯亦奕懌掖繹腋蜴蝪覓謚諡驛鯣", ekubo: "靨", emi: "笑蝦", emisi: "夷", en: "円演援園渉延圧遠沿塩炎煙縁垣媛渕堰鉛宛咽厭奄宴怨掩焔燕猿艶苑薗鴛俺羨鳶淵偃冤嚥圓圜壓娟婉嫣寃悁捐掾椽檐櫞衍涎淹渊湮湲烟焉爰筵篶簷罨臙艷茆莚蜒蜿袁覃讌豌轅鋺閼閻閹隕魘鹽黶", enagamae: "冂", enisi: "縁", ennyou: "廴", eno: "榎", enoki: "榎", enzi: "槐", enzyu: "槐", era: "選択豪偉撰掏揀擇柬腮顋鰓", eri: "衿襟", esa: "餌", eso: "鱠", eti: "越", etu: "越悦閲咽謁兌噎戉曰粤鉞饐", eu: "徭", eyami: "瘟癘"
            , ga: "勝書画夏賀我掛雅芽狩伽珂俄峨牙臥蛾餓駕瓦閑呀哦姜娥峩畫礒莪衙訝鵝鵞", gae: "谷", gaenzi: "肯", gai: "外害谷街垣概刈涯亥凱劾咳崖慨碍蓋該鎧骸苅乂倪儿剴匯啀喙垓孩乢崕崔愾榿漑皚盖睚磑礙葢豈駭鮠", gakari: "係掛", gake: "崖垳崕崔", gaki: "書城", gaku: "学額楽岳顎鍔鰐咢壑學斈嶽愕樂瘧萼蕚覺諤鄂鶚齶", gakusi: "隠", gama: "蒲", gami: "頭模耳尻", gan: "元含丸顔岩岸願頑眼巌玩癌翫贋雁偐嵒巖狠芫莟頷顏鴈鳫龕", gandare: "厂", gane: "金", gara: "潟柄殻搦", gasa: "笨", gase: "瀬", gasira: "頭", gata: "方県難形型潟堅髪縣", gati: "歹鞨", gatu: "月歹合", gatuhen: "歹", gawa: "代側", gaya: "谷", ge: "下外解夏芸植削殖霞蝦牙崖碍戯乂偈戲皚礙觧訝鮠", gei: "児芸迎鯨詣倪兒囈猊睨艾藝貎霓鯢麑黥", geki: "撃激劇逆戟隙屐檄覡郤闃鬩鵙鷁", gen: "現言原元減限験厳源彦嫌眼玄幻弦拳硯絃舷諺這偐儼呟咸嚴广愿狠痃眩芫衒阮驗", geti: "杰", getu: "月綴囓蘖齧", gi: "十議子決調切疑義着技親極儀岐貴犠衣偽裂伎毅宜欺蛾崖妓戯擬祇蟻誼其鰭僞嵬嶬嶷巍戲曦沂犧皚礒羲艤萓魏", gihunohu: "阜", gimi: "君", gin: "銀吟圻垠岑崟很憖沂齦", ginu: "被", giri: "切", giwa: "際", go: "五後期午語護越降互砂拒御豪誤牛悟剛棋呉吾后禦糊胡伍娯梧檎瑚碁醐冴其冱唔圄圉寤忤晤朞棊沍牾珸篌茣蜈衙麌齬", goe: "越", gokoro: "心", goku: "極獄", gome: "込篭籠", gomi: "芥塵埖", gon: "金言権厳勤僅欣檎艮嚴垠懃權", goo: "合", gori: "鮴", goro: "来殺頃", gose: "生", gosi: "越", goto: "毎如", gou: "業合強格楽号豪郷剛旺噛彊昂劫壕拷濠轟傲刧哈嗷囂抂敖樂毫熬藕螯遨鰲鷙鼇", gouri: "群", goya: "越", goza: "厶蓙", gu: "工求木宮供具居弘群呉臼仇倶愚虞寓吽嵎柩禺藕裘颶鬨麌", gui: "食", gumi: "実組", gumo: "雲", gun: "軍郡群羣", gura: "椋掠", gurai: "位", guramu: "瓦", gurasi: "暮", gure: "博暮", guri: "群", guro: "畔", guru: "苦", gusa: "種草枝", gusiku: "城", gusuku: "城", guu: "宮功遇偶隅寓嵎禺藕", gya: "伽", gyaku: "逆虐瘧謔", gyo: "漁御魚禦圄圉衙馭", gyoku: "玉嶷閠", gyou: "業行形刑仰凝尭暁僥嶢曉澆爻翹蟯迥餃驍堯", gyouninben: "彳", gyuu: "生牛"
            , ha: "二長生八米派半果土食南番張葉映針欧波破羽爆栄端晴歯覇刷掃跳幡芳刃恥把萩伯履牙捌腫頗穿馳脹填貼吐禿巴播杷琶芭這矧剥簸佩刄刎匍哈喀咯嘔坡垪嵌怕拊撥暎霸榮歐瀉爬犇玻碆笆篏羈羇耙耻菠葩袙覊跛迸陂霽駛齒", haba: "幅阻巾掵沮", habaka: "憚", habe: "侍", habiko: "蔓衍滔", habu: "省略畧", hada: "肌膚秦", hadagi: "襦襯", hadaka: "裸", hadanu: "裼", hadasi: "跣", hae: "蝿蠅鮠", hagane: "鋼鉅", hage: "激励烈蒋禿勵", hagi: "作萩矧脛骭", hagu: "逸", haguki: "矧齦齶", haguku: "育哺孚毓", hagusa: "莠", haha: "母姉媽毋", hahaso: "柞", hahuri: "葬", hai: "入配敗廃抜背排杯俳肺輩灰拝榛盃牌狽蝿誹稗箆吠孟佩坏孛廢徘怫悖憊拔抔拜擺旆朏沛湃焙珮琲癈碚祓篦糒胚蠅裴霈", haitaka: "鷂", haka: "高経権画計量図博測略称諮墓謀諏猷仞仭咨圖塋忖揆揣權畧畫稱經詢謨銓", hakado: "捗", hakama: "袴", hakana: "儚", hakari: "秤", hakarigoto: "画略謀猷揆畧畫籌", hakimono: "屐", hako: "運箱函笥漕箪凾匣匳奩椢筐筺筥篋", hakogamae: "匚", haku: "白博迫薄覇泊拍伯柏鞄栢狛剥箔粕舶駁亳佰岶帛怕搏擘霸樸檗蘗溥瀑狢珀璞膊貉貊陌雹駮魄", hama: "浜濱", hamaguri: "蛤蚌", hamasuge: "莎", hamati: "鰤", hamo: "鱧", han: "府判反阪半販般坂版犯板伴範飯繁幡漢搬班翻榛播叛帆斑氾汎畔藩釆煩頒磐蕃扮焚凡卞拌攀旛旙槃樊泛潘燔瘢礬笵絆繙飜胖膰范蟠袢蹣鈑鐇鷭", hana: "発話放英花離端華鼻畠塙咄洟發纐葩", hanabira: "弁辨辧瓣辯", hanabusa: "英", hanada: "縹", hanadi: "衄衂", hanaha: "甚", hanahada: "已", hanaiki: "嚊", hanamuke: "贐餞", hanare: "放", hanasi: "話噺咄譚", hanawa: "渕塙淵渊", hane: "羽翰翅", hanebou: "亅", hani: "埴", hanzou: "楾", hara: "原払源服腹妊姙孕拂攘祓禊禳肚胚襄", harai: "払秡", harami: "孕胚", haranomusi: "蛔", hararago: "鯡", harawata: "臓腸腑膓臟", hare: "晴", haremono: "腫癰", hari: "治張針榛播梁箴鍼", harinezumi: "彙蝟", harituke: "桀磔", haru: "東開明問治元美春温陽晴玄榛孟遥脩迢遙", haruka: "玄遼夐杳迥", has: "罸", hasa: "迫挟挿夾挾插箝襭鋏", hasama: "迫", hasami: "螯鋏", hase: "騁驟", hasi: "橋階走端趨啄箸梁嘴枦觜赱", hasibami: "榛", hasigo: "梯", hasika: "疹", hasike: "艀", hasira: "柱楹", hasiri: "走", hasitame: "婢", hasu: "荷泰斜芙蓉蓮", hasunone: "藕", hasya: "燥", hata: "機果将端旗畑幡傍秦叩畠將幢拮旃旆旌旛旙礑籏", hataasi: "旒", hataboko: "纛", hatagasira: "覇霸", hatahata: "鰰", hatake: "畑畠圃疥", hatara: "働仂", hatasu: "毅", hatato: "礑", hate: "涯崖垓", hati: "八平鉢捌蜂椀甌盂釟", hatigasira: "八", hatisu: "蓮", hato: "鳩鴿", hatoba: "埠", hatu: "八発初抜法白服削泊罰髪鉢捌廿肇溌醗伐筏叭垈撥癶發秡罸跋釟髮魃", hatugasira: "癶", haya: "早速勇逸捷隼囃湍趾駛鮠", hayabusa: "隼鶻", hayai: "斉夙蚤齊", hayao: "駿", hayase: "湍", hayasi: "林駿", haza: "狭硲挾陌", hazama: "迫峡硲峽", haze: "櫨枦鯊", hazi: "初始創弾恥垢肇甫剏彈忸愧慙慚羞耻詬", hazikami: "椒薑", hazime: "一大元創啓哉肇甫孟弌俶", hazu: "外弾筈彈", hazukasi: "辱愧詬", hazumi: "勢", he: "日経平減戸兵圧閉剥壓屁經舳", hebi: "蛇它", heda: "距隔鬲", hei: "平病兵並恵併閉柄瓶陛坪丙塀幣弊蔽僻箆餅俾凭娉嬖屏幤幵并憊敝斃枋炳睥砒秉竝篦聘苹萍蓖薜閇閖餠髀鮃", heki: "壁僻癖碧劈擘璧甓襞躄辟闢霹", heko: "凹", hekutoguramu: "瓸", hekutomeetoru: "粨", hekutorittoru: "竡", hen: "平変返辺弁編片偏逸扮篇遍鞭辨辧卞扁變旛旙汳瓣辮翩胼蝙褊諞貶辯邊邉駢騙", hena: "埴", hera: "箆篦", heri: "縁", herikuda: "遜", hesaki: "舳艫舮", heso: "臍", heta: "蒂蔕", heti: "暼", hettui: "竃竈", hetu: "蔽瞥丿暼鼈", hetura: "諂諛", heya: "曹", hezu: "剥", hi: "日一理平引費井比常英被退春火非飛否批冷等彼避秘陽弾悲旭似皮干輝陳肥孫灯披疲乾妃碑氷曳轡牽冴惹燈挽匪卑庇扉斐泌緋罷誹樋簸枇毘琵稗桧僻婁丕俾冱冰匕嚊坡妣婢屁彈彎弯怫拏拿掎掣攣暃曵朏杼檜梭榧沍狒痞痺砒碾祕秕粃紕絅羆翡脾腓臂茯菲蓖蜚裴裨譬貔豼賁贔跛輓轢辟鄙陂霏鞁鞴髀鯡鵯靡", hibi: "響皴皸皹罅", hibiki: "韵", hida: "摺襞", hidari: "左", hide: "任英栄秀豪偉嗣", hideri: "旱", hidesi: "秀", hido: "酷", hidume: "蹄", hie: "肥稗", higa: "東僻", higai: "鰉", higasi: "東", hige: "須髪髭髯鬚", higuma: "羆", higurasi: "蜩", hihi: "狒", hii: "秀", hiiragi: "柊", hika: "光控煕扣熈爍皓熙", hikagami: "膕", hikari: "光晶耀洸燿耿", hikaru: "輝晃", hike: "引", hiki: "引率匹抽曳挽疋逼蟇蟆", hikii: "将將", hikiri: "燧", hikitu: "痙", hikituke: "癇", hiko: "人光彦勉", hikobae: "蘖", hiku: "低矮", hima: "暇隙遑釁", hime: "媛姫嬪", himo: "綬紐", himogori: "膰", himono: "鱶", himorogi: "胙膰", himoto: "繙", himusi: "蛾", hin: "品浜貧頻秤彬斌瀕賓牝嬪擯梹檳殯濱稟禀繽蘋顰鬢", hina: "雛鄙", hine: "捻撚拈", hineku: "弄", hinoe: "丙", hinoki: "桧檜", hinokuti: "閘", hinosi: "熨", hinoto: "丁", hira: "開成平波枚啓拓衡挨擺攤豁辟闢", hirabi: "曰", hiraku: "拆磔", hirame: "閃鮃", hiratai: "扁", hire: "鰭", hiro: "大公海広容展太洋周央欧博拡幸普彦宇緩弘陽敬宗裕宏浩仁煕啓聖泰宙倫嘉寛祥尋拓弥郭拾伯祐丑恢紘氾汎凡廣擴敞汪洸滉瀚熈皓碵禮胖豁闊濶熙", hiromu: "弘", hiron: "寛", hirosi: "大海洋豊宇弘裕宏浩礼煕寛祐紘汎洸皓", hiru: "昼怯蒜蛭晝", hiruga: "翩飜飄飃", hirugae: "翻", hisa: "長教史久央永宣亀寿恒剛尚弥桐粥玖壽廂彌鬻", hisagi: "楸", hisago: "瓢匏瓠蠡", hisame: "霈", hisasi: "九永亀寿恒尚弥庇亘壽廂廡彌恆梠檐簷龜", hisi: "西菱拉犇蔆", hisihisi: "犇", hisikui: "鴻", hisio: "醤醢", hiso: "密秘潜窃潛濳竊顰", hissa: "挈", hissori: "闃", hisyaku: "杓", hita: "常浸淫婬涵溲", hitai: "額", hitaki: "鶲", hiti: "七篳", hitigi: "柩", hitikudo: "諄", hito: "一人民準独史等智仁斉匡傭弌凖獨疇畴薺鈞齊", hitoasi: "儿", hitoe: "単單襌褝", hitomi: "瞳眸睛", hitomosi: "鐙", hitori: "孑", hitorimono: "煢", hitosi: "平整均斎仁斉倫欽齊", hitotu: "一壱弌壹", hitoya: "牢圄圉", hitu: "必払筆匹泌疋弼畢逼匱拂櫃篳謐蹕鵯", hitugi: "柩", hitugiguruma: "轜", hituzi: "未羊", hituzisaru: "坤", hiuti: "燧", hiwa: "鶸", hiya: "涼凉", hiyodori: "鵯", hiyoko: "雛", hiyorinotori: "酉", hiza: "膝", hizamazu: "跪", hizi: "土泥肱肘臂", hiziki: "枅欒", hiziri: "聖", hizu: "歪", ho: "法保反補種捕火賞歩豊浦秀欲緒布宝誉掘干舗穂彫灯怖芳乾輔峰蒲惚讃畝捗燈帆埠葡鮒鋪圃甫蜂褒吠匍匏吼咐咆哮哺埔堡娉恍枋枹畆穗脯舖苹菠葆褓襃譽讚逋鐫雕餔鮑鯆黼", hobasira: "檣艢", hobi: "統", hobo: "略畧", hoda: "絆", hodo: "解程觧", hodoko: "施", hoe: "吠吽", hoga: "朗敞朖", hogi: "祝", hogo: "夸", hoho: "頬", hohu: "屠", hoi: "穂", hoka: "外他佗", hoke: "惚呆", hoko: "誇矛戟鋒鉾侘戈戛戞桙槊殳矜鉈", hokodukuri: "戈", hokora: "祠", hokori: "埃", hokoro: "綻", hokosaki: "鋩", hokotukuri: "殳", hoku: "北剥曝匐攴攵樸濮瀑蔔蹼", hokuro: "痣黶", hokuso: "樮", homa: "誉", homare: "誉", home: "称誉稱頌", hon: "本品反誉幡翻洪叛汎焚奔夲濆犇畚笨繙飜賁", hone: "骨", hono: "仄", honoo: "炎焔", hoo: "朴頬", hootuki: "面", hora: "洞", hori: "堀壕濠塹隍", horo: "亡幌滅泯袰", horobo: "殲殱", horoguruma: "輜", hos: "欲", hosaki: "穎頴", hosi: "星干", hosii: "糒", hosiimama: "淫亶婬恣擅肆", hoso: "細", hota: "榾", hotaru: "蛍螢", hoti: "弗", hoto: "程辺邊邉", hotoba: "迸", hotogi: "缶甌罌", hotohoto: "殆", hotoke: "仏佛", hoton: "殆", hotori: "阿瀕滸濆陲", hotu: "上発北払勃拂渤發法堀", hou: "方法保北報放防訪並豊崩抱邦宝包封砲庄胞芳棚奉峰縫朴逢鞄亨蔀鴇汎豹倣俸呆峯庖捧朋泡烹萌蓬蜂褒鋒飽鳳鵬勹匏匚咆垉堋堡娉寶寳幇弸彭彷怦抔抛旁枋枹榜泛泙滂澎瀑炮烽焙琺疱皰硼磅竝篷絣繃膀舫苹苞萠葆蒡蚌蚫袍裹褓襃謗豐迸鉋靤髣髱魴鮑麭", houdate: "楔", houki: "荘帚彗箒莊菷", houmu: "葬", hourensou: "菠薐", hozisi: "脩脯膊", hozo: "臍", hu: "二五生部化不文府増付福夫負風振船婦歩富降父踏普浮老更触阜布吹敷腐双缶殖怖伏噴釜践冨符膚赴輔嘘嬰臥蒲拭耽斑埠扶斧芙譜賦附撫葺鮒鋪圃甫仆俘俛俾俯偃傅吩咐坿孚孵巫拊枹柎桴榑殍殕溥牴畉罐罘脯腑艀苻藉蜉觝觸訃誣賻趺跋踐蹂蹈躔躙躪躡逋郛酖釡餔馮鯆鳧鳬麩麸黼", huda: "二札牒牌榜槧牘箋", hude: "筆翰聿", hudedukuri: "聿", hue: "笛笙簫籟籥鰾龠", huge: "鳳", hugo: "畚", hugu: "鮭鰒", huigo: "鞴", huiito: "呎", huka: "外深泓浤潭鱶", huki: "福吹葺蕗擽苳", huku: "福副含復幅服複腹膨伏覆巾脹逼匐哺愎箙茯蔔蝠蝮袱輻輹鞴馥鰒", hukube: "瓢", hukurahagi: "腓", hukuro: "袋嚢梟", humaki: "帙", humi: "人文史章訓冊郁翰册", humoto: "麓梺", humuto: "梺", hun: "分紛噴粉雰墳奮彬斌吻憤扮焚糞刎吩忿枌氛汾濆芬賁", huna: "船舟鮒舩", hunabata: "舷", hunabei: "舷", hunayosooi: "艤", hundosi: "褌襠", hune: "船舟槽舩舸艘", huran: "法鞦", hurebumi: "檄", huri: "振降", huru: "古旧降震揮奮慄掉篩舊顫", hurutori: "隹", huruzake: "酋", husa: "方総角房亮欝塞惣填妬杜堙壅悒鬱湮總錮閼雍", husaga: "阨", husagu: "梗", huse: "防伏臥禦扞捍", husego: "篝", husi: "節伏樶", husidukuri: "卩", husu: "熏燻", husuma: "襖衾麩麸", huta: "二再双蓋弐弍雙盖葢貳貮", hutamono: "盒", hutata: "二再弍", hutatu: "二両双兩雙", huti: "縁渕淵禄渊潯潭祿", hutido: "縁", huto: "太肥", hutokoro: "懐懷", hutu: "払仏弗沸蔽佛彿怫拂祓髴黹黻福富", huu: "夫風富豊阜封冨汎楓鳳梵瘋諷馮", huyu: "古冬", huyugasira: "夂", huzi: "藤", huzoro: "徭", huzyu: "藤", hyaku: "百柏栢碧佰劈怕擘襞霹", hyakume: "匁", hyan: "香", hyatu: "百", hyoku: "逼愎溽皀雹馥", hyou: "表平票評兵標拍俵氷漂杓彪瓢豹餅冫冰凭剽嫖并怦慓憑殍澎縹繃苞萍迸雹飄飃飆餠馮驃髟鮃鰾", hyousigi: "柝", hyuku: "百", hyuu: "彪髟"
            , i: "一十会五出市上生行合入子相意要言以指府委活告井容位比違医良風去好移衛易遺伊異維囲角善為居射依埋魚飯威衣斎寝慰往祖肥凍唯李緯胃炊胆函癒娃葦飴庵偉夷尉惟椅畏萎謂亥郁壱卯蔚云莞幾忌蛇壬煎詑陀鋳猪斑斐鮪冶揖倭佗倚凾噫囗圍壹姨寢已帷幃彝彜彙徃怡恚懿檍欹洟渭炒熨熬爲猗痍痿瘉眤瞋矣縊譱肄苡藺蝟詒諱豬貽逶醫鑄靉韋頤餒饐鰄", ibara: "茨荊楚棘", ibari: "溺溲", ibiki: "鼾", ibitu: "歪", ibo: "疣肬贅", ibu: "指熏燻", ibuka: "訝", ida: "抱懐懷", ide: "出", ido: "挑誂", ie: "家宇厦廈廬", iedo: "雖", iga: "歪毬", igamu: "啀", igata: "熔范鎔", igeta: "韓", igurumi: "弋", ihaya: "窟", ihori: "庵", ii: "飯謂粲", ika: "争厳怒嗔嚴忿恚慍爭瞋", ikada: "筏桴槎", ikade: "怎", ikaduti: "霆", ikame: "儼", ikan: "奈那", ikanobori: "凧", ikari: "碇錨忿", ikaru: "鵤", ikaruga: "鵤", ikazuti: "雷", ike: "生池垳", ikenie: "犠犧", iki: "生行気域息伯或粋气氣粹閾", ikidoo: "憤", ikio: "勢", iko: "憩偈憇", iku: "生行育城征郁粥幾墺拗毓澳燠礇鬻", ikuha: "的", ikusa: "戦戰", ikusabune: "艟艨", ima: "今未", imasi: "警戒勅飭敕箴誡", imawa: "忌", imina: "諱", imo: "芋薯藷蕷", imomusi: "蜀", imoto: "姨", imouto: "妹姨", 'in': "員院引音印因飲隠陰允咽姻淫胤蔭韻寅吽堙婬尹廴恁慇飮殞殷氤湮筍笋茵蚓贇酳隕隱霪韵鸚", ina: "員引否辞稲稻", inada: "鰍", inago: "蝗螽", inaka: "田", inana: "嘶", ine: "稲禾稻", inisie: "往徃", innyou: "廴", ino: "井稲祈猪祷", inoko: "豕", inosisi: "猪猯豬", inoti: "命", inti: "吋", inu: "犬狗戌", inui: "乾", io: "庵廬菴", iori: "庵廬菴", ira: "郎", irada: "苛", iraka: "甍", irezumi: "黥", iri: "入西飯煎圦杁", irie: "湾灣", iro: "色", irodo: "彩", irodori: "采釆", irori: "炉爐鑪鈩", irotuti: "堊", iru: "日一入", iruka: "鯆", isa: "石功砂威勇諌勳諍諫", isagiyo: "潔屑", isaka: "諍", isamu: "勲", isao: "功勲勣勳悳", isara: "小", isasaka: "些聊", ise: "竜", isi: "石眥眦", isibumi: "碑碣", isidatami: "甃", isiduki: "鐓", isiyama: "岨", isiyumi: "弩", isizue: "礎", iso: "急勤磯汐礒", isoga: "忙惣匆", isu: "石", ita: "分労傷致板痛至潮到惨悼詣戚俎勞廸怛恫悵惻愴慘摯炒疼臻迪", itada: "頂戴", itadaki: "頂顛巓", itama: "愴", itamu: "悽", itaru: "格之暢迪", itati: "鼬", itawa: "労勞", itazura: "徒", iti: "一市壱姪弌壹櫟檪聿", itigo: "苺莓", itinoku: "九", ititahen: "歹", itiziku: "九", itiziru: "著", ito: "内愛伊糸厭絃穉絲綸縷褸", itogasira: "幺", itoguti: "緒", itokenai: "稚", itoma: "暇遑", itona: "営營", itu: "一五厳逸壱溢乙姪揖稜弌佚噎壹曷汨聿軼鎰鴪鷸", ituki: "樹斎", ituku: "慈", itukusi: "厳嚴憮", itutu: "伍", ituwa: "偽詐佯僞詭譎", iu: "誘", iwa: "石況岩祝巌矧磐况嵒巖曰", iwao: "巌磐巖礒", iwasi: "鰯鰮鰛", iwata: "瀬", iwaya: "窟", iwayuru: "謂", iya: "否嫌弥癒厭賎卑俚彌瘉賤鄙陋", iyasiku: "苟", iyoiyo: "弥愈彌逾", iza: "蹇躄", izana: "誘", izi: "苛弄", iziku: "弄", izu: "出和泉厳", izuku: "焉", izukuni: "悪惡", izukunzo: "悪烏渠惡曷", izumi: "泉湶", izure: "孰"
            , ka: "日十三上合高回県代開下化家川勝支和加海書交変価神果過何可課個科花買白歌火積河鹿突夏賀換替貨香彼欠坂鳥巨借描我掛懸貸仮荷華兼甲雅駆偽克也稼鶴梨嘉暇刈飼掃佳嫁架菓霞葛冠勘靴圭桂枯哉狩鍋伯翔郁渦瓜榎伽寡珂禍禾箇苛茄蝦嘩迦蚊駕馨且樺噛萱苅駈卦袈繋乎跨咋斯曾掻鍛賭薙伐耶蘭猟个乂假僞價囘凅厦呀呵咀咥咬咼哥嗅嗄噬嚼囓囮堝夥夭夸孵崋廈彁戈挂搗變枷柯柧槁歟涸渮滓爬獵珈瑕痂窩笳縣缺罅胯舁舸艾芟葭萪虧蚋蝸蝌裹訛訶謌譁譌谺賈跏踝軻遐錵鍜闕顆馥驅鰕黴齧", kaba: "椛樺蒲庇", kaban: "鞄", kabe: "壁", kabi: "黴", kabu: "株被蕪", kabura: "鏑蕪", kaburaya: "鏑", kaburi: "頭", kabuto: "甲兜冑胄", kado: "門角圭稜楞", kae: "反返帰替却還卻栲歸皈", kaede: "楓槭", kaeri: "省顧眄眷", kaeru: "蛙", kaga: "利各鏡屈傴僂暉曄焜煌縢跼", kagami: "鑑鏡鑒", kagamidai: "魴", kagamitai: "魴", kagan: "鏡", kagari: "篝", kagaribi: "燎篝", kagaya: "輝旺赫耀燿", kage: "景影陰蔭翳", kagi: "画限鈎劃鍵勾亅畫鉤鎰鑰", kago: "駕輿篭筐筺籠簽籃轎", kagu: "神", kaho: "薫", kahoru: "馨薫", kai: "会回開海改界画解階競介壊街届絵掛戒械快悔皆刈飼怪懐拐灰貝堺柏亥頴塊廻恢魁晦芥蟹凱咳蓋鎧骸粥苅卦罫鮭詮潰桧丐乂乖价會偕傀囘剴匯哇咼喙喟垓壞夬孩屆峽嵬廨徊恠懷懈挂揩枴檜椢楷楫槐榿橈櫂欸歇淮漑獪瑰畍畫疥皚盖鬻繪膾艪艾茴葢薤薈薊蛔蠏褂觧詼誨誡諧豈迴邂醢醯隗鞋駭鮠鱠", kaibaoke: "櫪", kaigarabone: "胛", kaiko: "蚕蠶", kaina: "肱", kairi: "浬", kaityuu: "蛔", kaiyone: "糴", kaka: "関各係掲抱隠拘繋嬶罹關", kakaa: "嚊嬶", kakame: "嚊", kakari: "係掛", kakato: "踵", kake: "掛翔賭", kakeba: "齔", kakehasi: "桟棧", kakehi: "筧", kakei: "筧", kaki: "上書垣柿蛎堵墻牆硴籬蠣", kakimono: "帖牘", kako: "囲託圏喞圈圍埒埓", kakotu: "託寓詫", kakou: "蓋盖葢", kaku: "画各革格確客閣蔵核拡覚角秘隠獲較鶴隔脚潜渕穫郭碓劃嚇廓撹殻赫掴塙淵凅喀咯埆壑幗恪愨挌攪擱擴攫桷梏椁槨殼渊涸潛濳烙狢瓠畫癨矍硅祕竄膈膕茖藏螫蟄蠖覈覺貉钁隱霍馘駮骼鬩鬲鷽", kakuma: "匿", kakusigamae: "匸", kama: "構畑缶釜鎌竃蒲窯冓炯竈窰罐釡鑵", kamabisu: "嘩喧噌呶嗷囂聒諠譁讙", kamado: "竃爨竈", kamasu: "叺鰤", kamati: "框", kame: "亀瓶瓷甌甕缸罌龜", kami: "上神頭守紙髪侍帋髮", kamigasira: "髟", kamikanmuri: "髟", kamikazari: "彡珈", kaminari: "雷", kamisimo: "裃", kamo: "神甘樺鴨醸酎醗釀鳧鳬", kamome: "鴎", kamosika: "羚", kamozi: "髢", kamu: "齟", kamuro: "禿", kan: "上間金関官感神館幹監管環観韓完換康患刊巻緩還勧看簡甲慣歓肝喚干甘貫陥寒寛缶艦鑑乾冠勘汗漢菅函斡樺苅侃堪姦憾敢柑桓棺款澗潅竿翰莞諌閑舘串鹸湛亙亘丱凵凾刋勸卷厂咸啣喊圜坎坩奐奸姜嫺嫻宦寰嵌悍愃慳懽戡扞拑捍揀撼旱杆柬栞桿橄樌檻歉歡浣涵淦渙湲灌澣瀚煥煖燗疳癇皖盥眩瞰稈箝篏綸緘繝罐罕羹羮艱莟蒄蚶觀諫讙豢轗遑邯酣鉗銜鐶鑒鑵關陷頷顴餡駻驩骭鬟鰔鰥鸛鹹鼾龕", kana: "金神銀愛適奏称悲敵哉哀叶乎恊稱縢諧", kanae: "中鼎鬲", kanamari: "鋺", kaname: "要", kanara: "必", kanba: "芳樺", kane: "金銀兼包錦懐鎌謙鐘矩鉦鍾摂攝釛", kanegura: "帑", kanezasi: "矩", kanga: "考鑑稽攷鑒", kani: "蟹蠏", kanmuri: "冠冕", kanna: "鉋", kannagi: "巫覡", kannohaha: "毋", kannuki: "関閂關", kannyou: "凵", kano: "彼叶", kanoe: "庚", kanohoko: "戈", kanoko: "麑", kanoto: "辛", kanou: "叶", kanzasi: "簪釵鈿", kanziki: "橇", kanzou: "萱", kao: "顔香馨薫顏馥", kaori: "馨薫芬", kaorigusa: "鬯", kaoru: "芳郁馨薫彪", kappu: "冠", kara: "方空韓絡柄辛唐殻樺搦殼縢辣鹹", karada: "体躯躰軆體", karageru: "紮", karai: "苛", karaka: "揶", karakuri: "関枢樞關", karamusi: "苧", karanasi: "奈", karansi: "苧", karasi: "芥", karasu: "烏鴉", karatati: "枳", karazao: "枷", kare: "伊彼渠儂", karei: "餉鰔鰈", kari: "権仮滑刈狩苅雁猟假甸畋權獵藉鴈鳫", karigane: "雁厂鴈鳫", karimogari: "殯", karizumai: "寓", karo: "軽唐藐輕", karu: "軽剤苅佻劑嫖輕", kasa: "重襲笠傘畳蓋嵩套暈疊疉疂痂疽痒瘍瘡瘻盖葢", kasane: "褶", kasasagi: "鵲", kase: "械稼枷綛", kasi: "傾貸柏樫橿槝爨", kasiko: "賢畏俐", kasima: "姦囂", kasira: "頭魁頁孟仟顱", kasiwa: "柏栢膳怕槲", kasizu: "傅", kasizuku: "俾", kasu: "春微霞糟粕掠", kasugai: "鎹", kasui: "鷆鷏", kasumi: "霞", kasuri: "絣綛纃緕", kata: "議方交容語難形型固像傾片潟堅硬肩賢剛渕鎌塙淵牢渊糢艱騙", katabu: "傾", katado: "象", katadoru: "貌皃", katagata: "旁", katai: "鞏", kataki: "敵仇", kataku: "頑", katamari: "団塊團", katame: "瞎", katami: "互匪筐筺", katamu: "傾仄昃", katana: "刀釖", katanu: "袒", katasiro: "尸", katati: "体形貌皃躰軆頌體", katatumuri: "蝸", katawa: "傍", katawara: "旁", katayo: "偏頗", katazikena: "忝", kate: "糧粮", kati: "勝徒葛", katidoki: "凱", katu: "一勝和活割担雄達健合河刈葛恰将功括滑克曽桂巧喝渇褐轄且嘗捷曾筈刮剋劼尅戛戞戡擔拮揩曷歇猾甞瞎磆禊羯聒蛞蝎蠍豁闊濶鞨頡鶻黠", katuo: "鰹", katura: "葛桂蘰鬘", katuri: "和将", katute: "曽", kau: "耗", kawa: "代川交側革河皮煕乾渇逓楊巛晞渝熈獺躱遞銷熙", kawagoromo: "裘", kawagutu: "鞨", kawara: "瓦甎甓磧磚", kawarage: "駱", kawasemi: "翠翆", kawauso: "獺", kawaya: "厠廁溷", kawazu: "蛙", kaya: "茨栢茅萱榧茆", kayo: "通", kayowa: "孅", kayu: "粥痒癢鬻餬", kaza: "風飾翳餝", kazari: "文錺餝", kazasi: "釵", kaze: "風", kazi: "梶柁舵囓楫榜橈櫂齧", kazika: "鰍鮖", kazo: "数數", kazu: "一上員万千主数和計量憲昭宗寿嘉葛壱胤壽數萬", kazumi: "昭", kazunoko: "鯑", kazura: "葛鬘", kazutori: "籌籤籖", ke: "子明化気家外計価消宅花異希恵敬懸仮華慶毛怪圭葵瓜嘩迦塊恢芥稀卦袈祁罫蹴笥亟假價卉咼廨恠愾懈挂旡气氣痂罅膾薊褂襾譁銷閨餉鱠", keba: "毳", keda: "蓋盖葢", kedamono: "獣獸", kega: "汚涜溷穢褻黷", kegawa: "皮", kei: "京経計係警景境形型競系継刑軽契恵掲掛傾敬携慶兄啓鏡径佳圭桂馨卿珪慧憩渓畦稽繋罫茎荊蛍詣頚鶏頃鮭亰偈竸兮冂冏剄勁勍匸哇夐奎奚彑彗徑惠憇憬挂挈攜枅檠溪炯烱煢瓊痙盻眤矜硅磬禊笄絅經綮繼脛莖薊螢袿褂謦谿蹊蹶輕迥逕醯閠閨竟頸髻鴃鷄黥", keigamae: "冂", keigasira: "彑", keki: "隙屐檄覡郤闃鬩鴃鵙", kemi: "閲", kemono: "獣獸", kemu: "煙烟", kemudasi: "窓窗", kemuri: "煙烟", ken: "見間県権建件検研験監鉄券憲健献険欠遣巻懸勧兼圏堅剣嫌犬肩賢軒玄鎌乾謙顕菅絢鰹萱姦澗串倹倦喧拳捲牽硯絹鍵鹸狽繭丱俔儉劍劔劒剱劵勸卷圈夐妍娟嶮悁惓愆愃慊慳拑掀揀搴暄柬椦權檢歉涓煖狷獻甄痃眷瞼筧箝綣縣繝缺羂腱臉艱蒹虔蛯蜆蜷衒諠謇譴讙豢蹇釼鉗鉉險顯顴騫驗鵑黔", kena: "穴", kenu: "鑷", kenuki: "鑷", kera: "螻", keri: "鳧鳬", kesa: "畩", kesi: "岸", kesika: "嗾", keta: "桁", keti: "結决劼夬纈頡", ketu: "決結欠血穴潔桔傑訣頁蕨亅偈决刔厥囓夬孑抉拮挈杰桀楔歇獗碣竭纈缺羯袂襭覈訐譎蹶闕靹頡鴃齧", kewa: "険峨巌峻陀峩峭嵒嶇嶢嶮巖隗險", keyaki: "欅", kezu: "削創剤刋刪刮劑戮梳", ki: "生子決気公期来機記利次企切木聞基空置消規崎起着器帰材極効吉城寄危紀芸喜聴棄樹岐希貴季酒甲埼揮犠己茂雲旗既慶煕黄畿輝亀虫舗奇磯伎机棋毅祈軌鬼宜峡桐刃刀伯肌妃姫葵窺嬉幾忌汽稀徽飢騎妓祇桔杵玖祁乞碕斬訊其揃槻如伐鰭鮪箕亟來倚僖冀决几刄刋剞剪匯匱卉咥唏喟噐圻毀竒奎屎屓嵜幃弃悸愾愧憙截掎揆效斫旡晞暉曁曦朞杞枳棊槎櫃欷欹歸麾气氣沂淇熈熄熹燬犧畸癸皈瞶祺禧稘簣籏綺羈羇羲耆耒聽薊虧蟲覊覬詭諱譏豈跂跪逵鐫鑽鑚雉餽饋饑馗騏驥鮨麒龜熙", kiba: "牙", kibahen: "牙", kibi: "厳黍嚴峭禝稷踵", kibisi: "凛凜", kigamae: "气", kihada: "檗蘗", kii: "基給砥", kike: "乞", kikime: "効效", kiko: "樵", kikori: "樵蕘", kiku: "聴菊掬鞠麹椈聆鞫", kikuimusi: "蠹蠧", kimi: "公君仁卿辟", kimo: "肝胆膽", kimu: "金", kin: "金今京公近均禁勤緊筋琴訓堅亀錦菌僅巾斤欣欽禽芹衿襟謹檎亰听噤忻憖懃掀擒槿瑾皸皹矜窘箘箟腱菫衾覲釁鈞釿饉麕黔龜", kine: "杵", kiniiri: "嬖", kinoe: "甲", kinoko: "茸蕈", kinoto: "乙", kinu: "衣絹繭帛", kinugasa: "翳", kinuta: "砧碪", kinyou: "几", kira: "明現北嫌燦煌", kirame: "燦煌", kire: "巾", kiri: "切桐霧錐", kirigirisu: "蛬", kirimi: "臠", kiroguramu: "瓩", kiromeetoru: "粁", kirorittoru: "竏", kiru: "吉", kisa: "象", kisaki: "后妃", kisasage: "楸", kisi: "岸崖垠墺軋輾轢", kiso: "競竸埆", kissaki: "鋩", kisu: "鱚", kita: "来北阿鍛來徠", kitana: "汚", kiti: "吉詰佶", kitu: "切吉詰喫吃桔橘乞迄佶屹愾拮訖譎頡髻", kitune: "狐", kiwa: "際究谷極窮倪", kiwada: "檗蘗", kiyo: "清精貴誠聖浄恭圭潔淳澄馨匡瀞廉冽洌淨瀏皎", kiyon: "慶", kiyosi: "忠圭潔淳靖渙", kiza: "兆刻萌剞萠雕", kizahasi: "階", kizasi: "萌", kizi: "樸雉", kizu: "築傷創瑕疵痍瘢", kizuna: "紲絆緤縻", kko: "児", ko: "国東高金子小川来込木古神放戸個去好児呼請史処河庫故超越幸香固康居混樹彦巨拠雇顧己娘湖焦濃黄孤懲肥虚誇粉恋弓桑枯嘘箇堪鋸凝乎姑弧狐糊袴股胡菰虎跨鈷鼓瑚醐乞漉此冴蚕仔樵裾漕壷篭丐个估倨兒冱凅處刳呱哥國壺夸媚峺怙憮戀捏據杞柧桍棹楜沍沽涸滬滸濾炬琥瓠痼瞽箍籠粐罟胯葫虍乕蛄蝴蠱蠶觚詁谺賈踞踰辜逾扈錮餬鴣皷", koba: "拒", kobako: "筺", kobati: "碗", kobe: "首", kobi: "媚", kobo: "零溢毀", kobu: "瘤", kobura: "腓", kobusi: "拳", kodama: "谺魎", kodomo: "竪豎", koe: "声越肥聲腴", kogarasi: "凩", koge: "芝", kogo: "凍凝跼", koha: "神", kohada: "樸", kohaze: "鞐", kohituzi: "羔", koi: "肥恋鯉醇戀", koinega: "冀", koisi: "礫", koke: "苔鱗蘚", kokera: "柿苔鱗", koko: "此爰茲", kokoni: "云斯于曰焉粤聿", kokono: "九", kokoro: "心試嘗", kokoroyo: "快", kokoroza: "志", kokorozasi: "志", koku: "国告石可谷黒刻克穀酷或殻掬鵠剋哭囗圀國尅斛梏槲殼膕轂釛", kokubi: "衽袵", koma: "細困駒狛齣", komaka: "緻", komakai: "苛", komane: "拱", komanu: "拱", kome: "米罩", komegura: "稟禀", komi: "込", komiti: "径徑逕", komo: "薦菰篭籠", komogomo: "交", komono: "厮廝", komura: "腓", kon: "金今近建根献婚混困懇魂柑欣欽衿坤墾恨昏昆梱痕紺艮壼崑很悃棍棔淦渾溷滾焜狠獻琿緡菎蒟袞褌諢跟轗鯀鯤鰥鶤齦", kona: "粉", konamoti: "麭", konida: "輜", kono: "九金近楽好之斯這嗜憙樂", konosiro: "鮗", konzu: "漿", koo: "向光香弘群浩耕凍氷冴冱冰凅沍涸", koori: "織群凍氷冫冰", koorogi: "蛩", kora: "怺繆", kore: "伊維之是惟斯寔焉雖", kori: "織梱", koro: "転殺夷頃劉戮誅轉轆", korogi: "蛬", koromo: "衣頃衲", kosame: "濛", kosi: "後吉越腰輿", kosikake: "榻", kosiki: "甑轂", kosira: "拵", koso: "社刮", kosu: "擦狡", kota: "対応答堪對應荅", kote: "鏝鐺", koti: "乞鮴鯒", koto: "事言異功琴殊亊箏筝縡", kotobu: "寿壽", kotobuki: "寿壽", kotogoto: "尽悉盡", kotogotoku: "畢侭儘", kotoho: "寿壽", kotowa: "断斷", kotowari: "理", kotowaza: "諺", kotu: "骨滑窟糊乞忽惚兀圀榾汨笏鶻", kou: "日上行合後高小公区続工校岡向交考広口格神確港構好光河候効江航講興降拡攻皇厚幸抗香康更功弘控孝甲購項豪綱荒鋼較宏浩硬貢鉱黄稿絞穂幌狭恒拘晃紅耕郊剛尻渕峡仰后巧溝衡袷杏蓋鈎撹恰噛亨享怯狗桁佼侯倖勾喉坑垢孔巷庚慌昂杭梗洪糠紘肯肱腔膏酵砿閤鴻劫壕濠轟鵠梱肴皐鮫斯縞糟叩匂虹塙蛤淵釦岬耗亙亘藁亢伉佝倥傚冓冦凰刧匣區吽吭吼咎呷咬哄哽哮啌嚆嚮堽壙夾姜媾嫦寇岫峇峽崗廣很徨恆恍惶慷扣扛拱搆攪撓擴攷效敲杲昊昴晄晧曠昿杠枸栲棡椌槁槓槹歃毫汞洽洸浤渊淆湟溘滉滬烋煌熕爻犒狎狡狹猴甦畊皀皋皎皓盍盖盒睾矼礦磽稾窖箜篁篌篝簧粳絋絳絖絎續纐缸羔羹羮耿肛肓胛胯胱膠芒苟葢蒿薑薨號蚣蛟蝗覯訌詬誥軣逅遑遘鉤鍠鎬鏗鑛閘閧闔陜隍靠頏餃餝鬨鰉鱇鵁鴿鵺黌", kouba: "芬", kougai: "莱笄", koumori: "蝙", koumu: "被蒙", kounotori: "鸛", kouri: "郡梱", kousi: "犢", kouzi: "麹糀", kouzo: "楮", kowa: "強声壊恐怖毀壞聲", kowasi: "毅", koyomi: "暦", kozi: "抉拗", kozika: "麑", koziri: "鐺", kozisi: "脯", kozo: "挙擧舉", kozue: "梶梢槙杪槇", ku: "日九六子公家区来組工口空宮食球究供久庫苦繰功暮句駆訓貢仁悔奇駒紅呉鳩鈎幾朽汲灸倶狗玖矩躯駈喰袴勾垢咋酌腫韮釦于佝來傴刳劬區吁吼啖啗嘔竒崋嶇廾徠怐惧懼戮抒摎斟枸柧栩毆煦瞿窶箜絎耒苟蒟衢詬鉤韭颶餔驅齲", kuba: "配", kubi: "首頚縊跟踵頸", kubiha: "刎", kubikase: "箝鉗", kubiki: "剄軛馘", kubo: "凹窪", kuda: "下管降砕拉摧瀉碎", kudan: "件", kudo: "諄", kudokudo: "諄", kuga: "陸", kugi: "釘", kugiri: "閾", kugu: "潜潛濳", kugui: "鵠", kuguma: "跼", kugurido: "閤", kui: "杭咋懺懴杙", kuki: "茎岫莖", kuku: "括馥", kuma: "神熊奥阿隈奧嵎暈澳", kume: "粂", kumi: "組与汲伍與", kumo: "雲蜘曇翳", kumori: "翳", kun: "江君訓勲薫馴勳桾熏燻皸皹葷裙醺麕", kuna: "国", kuni: "国都正州有城邦郷訓薫晋邑圀國", kunigamae: "囗", kunigi: "椚", kunitukami: "祇", kuno: "訓", kunu: "功", kunugi: "橡栩椢椚櫟檪櫪", kura: "車比庫蔵倉夢暗較闇鞍晦昏咋餐沌昧冥蒙儚竸梦峅廩杳暝曖曚溟眩眛瞑矇祚藏黯", kurai: "位蔑", kuran: "蔵", kurasi: "蔵", kurawa: "啖", kure: "紅呉昏莫榑", kurenai: "紅", kuri: "作来繰栗", kuriya: "厨庖廚", kuro: "黒患玄緇黎黔", kurodake: "篶", kurogane: "鉄銕鐵鐡", kurogome: "糲", kurokibi: "秬", kuroma: "車", kurou: "蔵", kuru: "来苦包栗狂胡偬猖", kurubusi: "踝", kuruma: "車俥輅", kurume: "眩", kurumi: "生楜", kuruo: "狂", kurusi: "窘", kuruwa: "郭廓郛", kusa: "日種草腐臭卉艸苡莽", kusabi: "轄楔", kusabuki: "茨", kusagi: "耘耨", kusakanmuri: "艸", kusame: "嚔嚏", kusami: "嚔嚏", kusamura: "叢", kusari: "鎖瑣鏈鐺", kuse: "癖", kusi: "筆奇釧串櫛箆竒", kusige: "匳奩", kusikezu: "櫛梳", kusiro: "釧", kuso: "糞屎", kusu: "樟楠熏燻", kusugu: "擽", kusunoki: "梢楠", kusuri: "薬藥", kususi: "医醫", kusyami: "嚔嚏", kute: "湫", kuti: "口啄", kutibasi: "喙嘴觜", kutibiru: "唇脣", kutigayugamu: "咼", kutihige: "髭", kutinasi: "梔", kutisaki: "吻", kutisoso: "漱", kutisusu: "嗽漱", kutiwaki: "吻", kutu: "堀掘屈靴朽窟沓倔厥崛鞋鞜", kutugae: "覆", kuturo: "寛", kutusita: "韈", kutuwa: "轡啣銜勒", kuu: "空宮供咼啌", kuwa: "加詳桑鍬錆鋤啣耨", kuwada: "企", kuwai: "徊", kuwanomi: "椹", kuya: "悔", kuyu: "熏燻", kuzi: "挫抉籤籖鬮", kuzira: "鯨", kuzu: "崩葛屑堕楠墮頽", kya: "脚伽", kyaku: "格客却脚隙卻硅謔郤钁", kyan: "侠", kyo: "挙去許居巨拠拒距虚据嘘渠鋸裾倨墟據擧舉欅歔炬秬筥苣踞遽醵鉅", kyoku: "局極曲旭亟勗棘洫膕蕀跼閾馘髷", kyou: "京経教強協続校共境況供響橋競興香恐敬孝胸郷驚脅兄叫狭鏡脇凶峡恭狂亮袷杏旺馨橿恰叶窮亨享侠僑兇匡卿喬彊怯挟矯蕎饗暁茎佼梗劫頃匝頬亰僥僵兢竸冂冏况刧匈嚮囂夾姜嬌峽廾徼恟恊慊戮抂拱挾撓曉框梟橇歙洶炯烱烋狡狹畊疆皀皎矜磽穹窖竅筐筺筴篋經繦續羌膠莢莖薑蛩蛬蛟襁誑趙跫躬轎鋏鍄陜鞏竟餃驕驍", kyu: "究久喜", kyuu: "九求宮球急究久休給旧及級救吸亀丘泣弓鳩臼厩鞠仇朽汲灸窮笈糾僑玖韮咎嗅岌廐廏恷摎柩樛歙毬烋疚皀穹糺繆翕舅舊苙蚯裘貅赳躬逑邱韭鬮龜", kyuura: "厳"
            , ma: "十部間万目正先交増士松真番待負丸満益未舞馬曲混巻誠牧摩麻豆磨珠魔澗捲勾撒播麿麗俟卷嘛麼枉淆痲眞糅茉萬蟇蟆", maa: "真麻", maba: "疎踈", mabara: "稀疏", mabe: "米", maborosi: "幻", mabu: "眩", mabusi: "蔟", mabuta: "瞼", madara: "駁斑駮", madarausi: "犖", madare: "广", made: "迄", mado: "円真惑窓圓眩窗", madoka: "円欒", mae: "前", maga: "擬紆", magaki: "樊篳籬", magari: "勾", magarigawa: "巛", magata: "曲", mage: "髷", magemono: "椦", magi: "紛", mago: "孫", magokoro: "悃", maguro: "鮪", magusa: "秣芻蒭", magusakau: "秣", mai: "前米参舞毎枚埋牧妹鞠詣蒔舛剃煤昧參瑁眛苺莓邁黴", maiasi: "舛", maina: "賂", mairu: "哩", maka: "任蒔罷", makana: "賄", makase: "委", maki: "巻牧蒔薪填槙卷槇", makigamae: "冂", mako: "真誠眞", makomo: "菰蒋", makoto: "一実理信真良周慎誠賢丹淳胆亮允紳諦惇諒實忱恂愨洵眞詢", makotoni: "実涼諒凉寔", maku: "幕膜捲蒔莫摸寞幔繃", makura: "枕", mama: "海継畑侭儘圸墹壗盡繼", mame: "豆荳菽", mami: "塗猯覲逅遘", mamo: "護守戍掫衞", mamori: "戍衞", mamoru: "衛葵衞", mamusi: "蝮", man: "政万満茨幡慢漫鰻蔓卍曼幔悗懣滿瞞縵萬謾蹣鏝饅鬘", mana: "学真愛學斈", manabiya: "庠", manaita: "俎爼", manako: "眼", manaziri: "眥眦睚", mane: "招", manimani: "随隨", manuga: "免", manuka: "免", manzi: "卍", mara: "厩", mare: "希稀罕", mari: "鞠毬", maro: "円理転麿圓轉", maru: "円団丸圓團圜摶", marui: "肱欒", masa: "大政方全当理公成勝多和正容応真幹優存将順甲充雅誠仁賢昌聖剛庄祥征晶稚祐允款匡傑暢柾愈諒倭夛將橸當眞", masaka: "作", masakari: "戉鉞", masaki: "柾", masame: "柾", masani: "応祇應祗", masaru: "大超甲豪克賢冠將", masasi: "理正雅仁昌奨匡", mase: "柵", masi: "増況益猿况", masimasu: "坐", masu: "増益倍升舛斗鱒桝枡桀裨", masura: "丈", mata: "復街岐也俣股跨叉亦又椏殳胯", mataga: "跨", matata: "瞬", mate: "蟶鮴", mati: "海町待街襠陌韈", mato: "本的鵠纏繆繚纒", matou: "綢繞", matta: "全", matu: "松待末祭茨須奉真纏祷抹沫奠枩枌眞祀秣竢纒茉靺", matuge: "睫", maturi: "祭祀", maturigoto: "政", maturu: "祠", mawa: "回周廻囘繞", mawari: "仗", maya: "厩", mayo: "迷", mayu: "真眉繭", mayumi: "檀", mayuzumi: "黛", mazi: "交雑駁爻襍雜", mazina: "呪咒", mazinai: "咒", maziwaru: "参參爻", mazu: "貧", me: "五明目米海売女馬妻免眼銘芽雌召牝匁瑪碼聘辟", meawa: "娶", mebae: "萌萠", mebaru: "鮴", medogi: "筴筮蓍", meetoru: "米", megu: "愛恵巡芽斡廻匝寵匯圜徼恤惠紆繞繚輾遶邏", megumi: "愛恩潤慈", megumu: "萠", meguru: "流", mei: "明名命盟迷鳴銘謎冥姪暝溟瞑茗螟酩", mekake: "妾", mekki: "鍍", meku: "捲", mekura: "盲瞎", mema: "眩", memai: "暈", meme: "爻", men: "校面免毛綿雌牝棉緬麺俛冕宀泯湎眄瞑粫緜麪黽", meoto: "娚", mesi: "飯瞽矇", mesu: "雌牝", meto: "娶", metu: "滅", meziri: "眥眦", mezura: "珍奇竒珎瑰", mi: "三五生見民明実務海水利省男参宮神果規農身美視造味観望光深満江未薬皇績臨恵君純看顧御充診己湖臣微聖魅覧銘弥毅珠澄妃稔溢盈塞爾蛇桃眉巳箕實寳已麼弭彌滿瀰睥睹瞰瞿瞻矚縻胥茉覩覽觀躬靡黴", mida: "乱淫撹擾妄濫亂婬攪撓溷猥紜紊", midara: "姦", midare: "婬", midari: "淫猥", midarini: "叨", midaru: "妛", midori: "緑翠碧翆", midorigo: "嬰", miga: "磨瑳琢砥砺礪磋", migarini: "漫", migi: "右", migiri: "砌", migiwa: "汀", migomo: "妊姙", miha: "瞠", mihari: "哨", mika: "甕", mikado: "帝", mikaduki: "朏", miki: "幹寸", miko: "巫覡", mikoto: "尊", mikotonori: "詔勅敕", mima: "薨", mimami: "南", mimeyo: "娥", mimi: "耳", mimidama: "珥", mimiki: "馘", miminagusa: "苓", mimisii: "聾", mimizato: "聡聰", mimizu: "蚓蚯", min: "三民明水眠岷愍憫旻泯瞑緡罠閔黽", mina: "水南波源皆汎凡僉咸胥", minagi: "漲", minagoro: "鏖", minami: "南波", minamoto: "源", minato: "港湊", mine: "峰峯嶺岑岫崟嶂巒", miniku: "醜妛", minna: "皆", mino: "実稔箕蓑實簑簔", minori: "稔", minoru: "稔穣聡酉穰", mio: "澪", miri: "粍", miriguramu: "瓱", mirimeetoru: "粍", miririttoru: "竓", misa: "水操", misago: "鶚", misaki: "崎埼碕岬岫嵜", misao: "操", misasagi: "陵", mise: "店鋪廛肆", misogi: "禊", misoka: "晦", misona: "臠", misu: "簾", mit: "三", mitamaya: "寝廟寢", miti: "行方通実理治道導真路達満陸途康充慶至往倫径芳亨享實廸徃徑甼衢蹊迪逕闡陌隧", mitibi: "導", mito: "認", mitu: "三円道水参光満密弘充慎貢晃弥瑞苗允盈舜蜜參實樒櫁", mitugu: "諠", miturou: "蝋", mituru: "満暢", miu: "苗", miuti: "戚", miya: "都宮雅", miyabiyaka: "嫺嫻", miyako: "京都畿亰", miyakogae: "遷", miyuki: "幸", mizi: "惨慘", mizika: "短", mizo: "溝渠涜洫", mizore: "霙", mizu: "水端瑞", mizugane: "汞", mizuka: "自", mizukaki: "蹼", mizumori: "準凖", mizunoe: "壬", mizunoto: "癸", mizura: "髻鬟", mizutade: "薔", mizutamari: "瀦潴", mizuti: "鮫蛟", mizuumi: "湖", mo: "三方百最持文面木真門若守望母模盛馬輪燃茂喪毛添漏妹姥洩裳畝藻莫溌萌摸姆媽麼捩揉泄畆糢萠謨", moda: "黙悶懣默", modae: "悶", modo: "戻擬", moe: "萌", moenokori: "燼", mogasa: "疱", mogu: "潜潛濳", mogusa: "艾", mokko: "畚簣", moku: "目工木牧黙睦穆杢沐默苜", momi: "紅粟籾樅", momizi: "椛栴", momo: "百李股腿桃髀", momu: "蟐", mon: "問主文聞郎門紋悶們懣捫瞞馼", mondo: "百", monme: "匁", mono: "者物桃", monoimi: "斎齋", monoui: "嬾慵懶", monu: "蛻", moppa: "専專", moppara: "醇", mora: "貰", mori: "月保護守衛森盛晦杜傅籠銛", moro: "両師諸艶脆", moromi: "醪", moromoro: "烝", mosi: "儻", mosuso: "裳裙", mot: "以", mota: "凭擡抬齎靠", motai: "瓮甕罅罌", mote: "茂", moteaso: "玩翫弄", motena: "饗", moti: "用以持望須餌勿餅韈餠黐", motiaso: "玩", motiawa: "朮", motigome: "糯", motii: "餅餠", motinoki: "橿", moto: "大本東下意産元資求職始木基幹質森旧紀素許源順宗智須礎亙亘剌夲孕很忤悖愎狠舊覓貭邀", motodori: "髻", motoi: "基", motomu: "須", motoo: "回廻囘", motoru: "乖", motou: "繞", motte: "将將", motto: "最尤", mottomo: "尢", motu: "持物没沒縺", mou: "生設申望亡網毛忙帽猛盲卯詣摸妄孟耗蒙儲儚惘旄曚朦檬濛瑁矇网罔耄艨芒莽蠎蟒髦魍", mouke: "儲", mousen: "氈", moya: "舫霏靄", moyaibune: "舫", moyoo: "催", moyou: "催", mozi: "綟", mozu: "鴃鵙", mu: "生六務産向無武陸浮群夢茂慶虫謀蒸牟矛霧畝剥撫蕪鉾睦鵡厶噎嘸梦无旡毋烝畆眸羣鵐鶩", mugi: "麦麥", mugiko: "麺麪", mugo: "惨慘", mugura: "葎", mui: "六", muka: "対向迎逢這嚮對邀", mukabaki: "逼縢", mukae: "迎", mukai: "向", mukasi: "昔", mukatu: "嘔", muko: "向甥婿壻聟", mukou: "向", muku: "報酬讐椋讎", mukuge: "椴槿毳葮蕣", mukuinu: "尨", mukuro: "骸躯", muna: "空宗胸棟皆虚曠昿", munagai: "鞅", mune: "統順宗胸旨棟臆睦膺", munyou: "无", mura: "党西村群邸叢邑簇羣邨黨", murasaki: "紫", murazi: "連", mure: "羣", muro: "室榁窩", musabo: "昧婪貪餮饕", muse: "咽哽噎饐", musi: "虫寧毟蟲", musiatu: "溽", musiba: "蝕齲", musiro: "席筵莚蓆", musu: "結掬", musume: "娘嬢孃", mut: "六", muta: "村", muti: "鞭笞", mutiu: "捶", mutiutu: "鞭撻", mutu: "六陸睦", mutuka: "難", mutuki: "繦褓襁", mutuyubi: "跂", muzina: "狢貉", muzinahen: "豸", muduka: "難", myaku: "脈獏脉覓貊貘", myou: "明名命妙苗茅廟錨冥孟暝甍眇瞑緲茗螟", myuu: "謬"
            , n: "金武", na: "長生八方七今名成和女向済投無流農南難字並奈亡為樹納稲阿慣鳴穴菜那泣葦萎嘗凪薙馴楠撫做儺哭啾啼嚶娜拏拿拊捫梛涕濟爲狃狎甞痿竝糯綯舐褻齏韲", naba: "生", nabe: "辺鍋銚邊邉鎬鐺", nabebuta: "亠", nabi: "並靡", nabu: "嬲嫐", nada: "洋灘宥", nade: "撫", nadesi: "撫", nado: "等抔", nae: "苗秧", naga: "長流良修永栄寿亨暢眺酉乍呂曼脩", nagaame: "霖", nagae: "轅", nagare: "流", nagasa: "袤", nagasime: "睥", nage: "嘆歎唏哭喟嗟慟", nageku: "欷", nageu: "抛擲", nagi: "柳渚凪薙梛椥", nagisa: "渚汀沚瀲", nago: "和", nagu: "殴擲毆", nagusa: "慰", nai: "内奈袋没泥禰祢乃廼莫无毋沒罔迺靡", naigasiro: "蔑", naisi: "尚", naka: "中半史央仲莫勿毋", nakama: "党黨", nakare: "毋", nakatu: "仲", nakihaha: "妣", nakoudo: "妁", nama: "生天怠鈍艶妖膾艷訛譌", namagusa: "羶腥", namaku: "鈍", namameka: "嬌", namari: "鉛", namasu: "鱠", namazi: "憖", namazu: "鮎癜鯰", name: "行滑靼鞣", nameri: "滑", namesigawa: "靼鞣韋", nami: "行南波浪涛蔑甫凡濤瀚瀾", namida: "涙泗泪涕", nan: "男南何難納軟灘楠喃娚煖", nana: "七斜", naname: "陀", nani: "何難那浪渠曷", nanigasi: "某", nannanto: "垂埀", nano: "七", nanzi: "爾而汝乃廼尓迺", nanzo: "那烏渠胡奚怎曷瑕盍遐", nao: "治作成直有真順温巨忠尚猶仍犹矗胖", nara: "対効並均習楢倣伉傚嫺嫻對并效狃竝肄駢", narabu: "双儷雙", nare: "汝", naresika: "麋", nari: "業百体成済形城就芸為斉鳴也礼尚稔爲", naru: "成徳鳴稔", nasa: "情", nasi: "梨莫勿无旡", nata: "方屶鉈", natu: "夏懐捺懷納", natume: "棗", nawa: "輪縄苗綯緡繩", nawate: "畷", naya: "悩惱懊艱蹇", nayami: "悩惱艱", nayo: "嫋", nazo: "謎", nazora: "準凖", nazu: "懐", nazuna: "薺", ne: "十人年合子値音根婦練称寝眠峰稔如禰祢捻峯嶺煉錬寐寢捏捩柢殕袮", neba: "粘黏", nebu: "舐", neesan: "姐", nega: "願覦", negai: "願", negi: "葱", negira: "労勞犒", negura: "塒", nei: "苗寧嚀佞侫檸濘獰聹蚋", neko: "猫", nemu: "眠", nemunoki: "棔", nen: "年然念燃縁粘稔鮎楠捻撚冉拈棯蠕輾鯰黏", nengo: "懇諄", nengoro: "懃", nera: "狙", neri: "練", neta: "嫉妬悋猜", neti: "捏蚋", netu: "熱捏涅子", neya: "閨", nezi: "捻拗捩", nezu: "鼠鼡", nezukuri: "艮", nezumi: "鼠鼡", ni: "日二合新入理児逃荷似仁丹煮尼泥餌爾而煎弐迩烹弍于兒尓岻膩貳貮迯邇", nibe: "膠", nibu: "鈍駑", nie: "贄錵", niga: "苦", nigana: "荼", nigi: "和握賑", nigo: "汰濁渾溷", nigori: "濁", nigorizake: "醪", niguruma: "輜", niho: "薫", nii: "二新", nikawa: "膠", nikibi: "皰靤", niku: "難悪肉宍嫉憎惡蓐", nin: "人任認仁刃妊忍稔荏壬靭儿刄姙恁荵衽袵靫靱", nina: "担螺擔蜷蠡", ninniku: "蒜", ninnyou: "儿", nio: "臭匂鳰", nira: "韮盻眈睨薤韭", niragu: "淬", nire: "楡", nise: "偽贋僞", nisi: "西錦螺襾", nisiki: "錦", nisin: "鯡鰊", nisui: "冫", nita: "似", niti: "日", nitu: "日新", niu: "生", niwa: "庭圃", niwaka: "卒俄頓卆怱猝遽霍驟", niwakaame: "瀑", niwakani: "勃", niwatazumi: "潦", niwatori: "鶏鷄", niwazakura: "棣", nizi: "虹滲躙躪霓", nizyuu: "廿廾", nizyuuasi: "廾", no: "入野能農乗退述延及伸載之納飲泉布典濃篠咽洩餐呑乃廼埜箆丿乘舒喃嚥抒飮洵熨篦迺饒", nobe: "延", nobi: "信暢燹", nobiru: "蒜", nobo: "上登昇躋陞陟隲", nobori: "上登幟", noboru: "宣昂升敲陟", nobosi: "登", nobu: "業円経進信収常展史修延喜伸順宣房充誠至寿陳寛恒宜辰敦靖惟允薫晋暢寅庸亙亘脩頌", nobun: "攵", noburu: "辰暢", nodo: "咽喉吭臙頏", noga: "逃遁佚竄迯逋遯", nogan: "鴇", noge: "芒", nogi: "穎頴禾芒", nogihen: "禾", nogome: "釆", nokanmuri: "丿", noki: "軒宸檐", noko: "残鋸殘", nokogiri: "鋸", noku: "奥", nome: "雲", nomi: "爾蚤尓已鐫鑿", non: "音暖嫩", nonosi: "罵詈詬", noo: "直", nora: "苗", nori: "議学度理法経成教知記利統格式研能規義乗真準親展師憲周登織賀紀芸永順則徳儀載昇宣令功敬宗智裕孝慎仙典律雅哲範訓至祝仁礼賢寿穂倫寛祈宜敦尭矩糊孔詔暢勅禎乃凖笵經藝", noro: "呪咒詛麕", norosi: "烽燧", noru: "駕", nosi: "師熨", notama: "宣曰", notamu: "宣", noti: "後内", notto: "則節浬", nottoru: "糢", nou: "直能応農脳王納悩濃嚢膿儂惱曩瑙碯腦衲", nouzuru: "脳腦", nozo: "望除臨希覗莅覘", nozoku: "窺", nozomi: "希", nu: "野抜脱貫怒塗縫忽挺擢奴濡孥拔搴渟繹耨褪", nue: "鵺", nugu: "拭揩", nui: "縫", nuitori: "繍黹", nuka: "額糠糟倥濘粳", nukazuku: "頓", nukegara: "蛻", nuki: "抜貫緯擢樌", nuku: "温炎貫", numa: "沼", nume: "絖", nunawa: "茆蓴", nuno: "布", nunoko: "褞", nura: "濡", nure: "濡", nusa: "幣幤", nusi: "主", nusu: "盗窃偸攘盜竊", nuta: "垈汢", nuu: "饒黹", nya: "若", nyaku: "若搦蒻", nyo: "女如茹", nyou: "女尿溺仍嚀橈繞聶遶鐃鑷饒", nyu: "茸濡蠕", nyuu: "生入敷乳柔廿鞣"
            , o: "大長生百下小保和府億面男置終応士夫起落武郎渡追負音推史処雄悪青央織越降尾圧押帯遠居卒老汚房隆弘折措奥緒御隠雅包阿穂麻勇朗怖芳仰惜烏於翁牡乎堕苧捺乃邑佩處卆唹嗚堊塢壓帶悋惡擱擠淤穗穉訖趁飫", oba: "姑姨", obasima: "檻", obi: "帯怯帶", obidama: "佩珮", obie: "怯", obitada: "夥", obito: "首", obiya: "脅劫刧剽", obo: "思覚没溺沒湎覺", oboro: "朦朧", oda: "穏煽穩", oderu: "稚", odo: "躍威脅踊嚇縅踴", odori: "躍", odoro: "驚愕駭", odoroku: "咢", oga: "拝拜", ogi: "荻蒹", ogina: "補裨", ogo: "汰侈倨傲僭僣奢敖驕", ogoso: "厳荘嚴莊", ogosoka: "儼", ohituzi: "羝", oi: "生種追及老於甥笈姪耆", oibo: "耄", oite: "之于", oka: "田岡陸犯略阜侵阿岳丘冒傍峻坏壟奸崗畧冐邱隴", oke: "置桶", okera: "朮", oki: "置修興沖順居煕冲澳燠", okina: "翁叟", okite: "掟", okitu: "沖冲", oko: "行発起興怒煽勃熾發", okona: "行", okori: "瘧", okota: "怠嬾懈", okotaru: "懶", okotu: "興", oku: "後億屋送帰遅奥贈憶臆沃噫奧檍歸澳皈穉貽遲餽饋", okubi: "噫", okubuka: "邃", okugaki: "跋", okumi: "衽袵", okurina: "謚諡", okusuru: "臆", okute: "稚", omi: "臣", omo: "主思重面沢想懐惟謂侖懷", omoera: "思", omoga: "羈羇覊", omokage: "俤", omomu: "趣徐赴趨", omomuki: "況趣况", omone: "阿佞侫", omonpaka: "慮", omonpaku: "慮", omori: "権錘權", omote: "表面", on: "音園雄遠温飲奥御隠恩穏闇蔭厭怨苑薗鴛牡吽慍飮瘟穩薀袁褞諳隱鰮鰛", ona: "同女翁", onagazaru: "禺", onamomi: "葹", onara: "屁", oni: "遠鬼", oniyarai: "儺", onna: "女", ono: "自斤斧", onono: "戦慄戰", ononoku: "栗", onoono: "各", onore: "己", oo: "大多正近松被太衆欧王皇巨奥覆仰帽姶奄掩蓋巾碩庇蔽蒙邑丕冢凰嚶夛媼嫗屏枉殃汪泱泓瓮甌盍盖稠蓊葢閹鸚", oodate: "櫓", ooduna: "紘", ooga: "頁", oogame: "鰲鼇", oogi: "扇", oogo: "朸", oogoto: "瑟", ookami: "狼", ooki: "浩傀厖", ookimi: "王", oomune: "梗", oonira: "茘", oosi: "繽", ooti: "樗楝", ootori: "鴻鳳鵬凰", ooyake: "公", ooyumi: "弩", oozato: "邑", oozi: "逵", oozika: "麈", ore: "俺", ori: "織折澱匂檻滓", oro: "卸愚", oroga: "拝拜", oroka: "痴呆魯妛癡", orosi: "卸颪", oroti: "蠎蟒", osa: "長治収修蔵圧押略乱納抑按厭酋摂綜孟乂亂佰壓尹扼攝撥收斂熨畧穉筬脩艾藏釐", osae: "鎮鎭", osaka: "刑", osamu: "理修紀攻順磨靖乃脩", osana: "幼", osanai: "稚孺", osi: "教押排訓忍唖鴛吝嗇慳誨", osidori: "鴛", osikiuo: "魴", oso: "教遅恐襲怖忙畏兇怯兢怕恟惧悚惶惴慄慴懼懾晏瞿竦輓遲", osore: "虞", ossya: "仰", osu: "足雄押牡", osya: "長", osyaberi: "嗹", oti: "落墮殞隕", otii: "陥陷", oto: "二月音劣乙貶", otogai: "頤", otoko: "男郎", otokodate: "侠", otokoyomogi: "蔚", otori: "囮", otoro: "衰", otosi: "貶", otosiana: "穽", otosii: "陥陷", otouto: "弟", otozu: "訪", otto: "夫", otu: "越乙榲膃", ou: "大相区近応横央欧王玉皇圧押奥桜往黄殴鷹姶逢厭凹旺翁襖鴬鴎鴨匡扇邑凰區嘔嚶墺壓夭奧媼嫗尢徃怏懊應拗枉櫻歐殃毆汪泱泓澳燠狎瓮甌甕秧罌膺蓊謳鏖鞅鴦鶯鸚黌", ougi: "扇", ougo: "朸", oumu: "概", ouna: "媼嫗", outi: "樗楝欒", ouyo: "凡", ouzi: "皇", owa: "終竣畢竟", owasu: "坐", oya: "親押", oyayubi: "拇", oyazi: "爺", oyo: "及泳凡迄曁游", oyobi: "及", oyogu: "泅", ozika: "麌", oziru: "怯"
            , pa: "童", pai: "牌", pe: "部瓶", peezi: "頁", pi: "妃", pitu: "比", po: "暮", pon: "先椪", pondo: "听磅", ppana: "放"
            , ra: "原村楽英良等乱願荒柄羅螺裸蘭喇罹拉瘰薇蘿蠡邏鑼騾", rai: "来頼塁瀬洗礼雷狸莱來儡壘徠懶擂櫑瘰癘癩磊禮籟罍耒莉蕾藾蠡貍賚醴", raisuki: "耒", raki: "滝", rakkyou: "薤", raku: "楽落絡洛酪擽樂烙犖珞駱", ran: "乱卵覧嵐欄濫藍蘭漣亂儖婪嬾巒懍懶攬欒欖瀾燗爛籃繿纜羝襤襴覽醂鑾闌鸞", ras: "拉", rati: "埒埓", ratu: "剌喇埒埓拉溂糲辣", rau: "劉", re: "連列令礼伶玲禮黎", rehu: "猟獵", rei: "例冷戻令齢鈴礼黄励零涙霊祈蛎砺伶嶺怜玲苓隷麗儷冽勵唳囹捩櫺泪洌澪犂犁癘礪禮糲綟羚聆茘莅莉藜蛉蠣蠡醴隸靈驪鱧鴒黎齡龕", reidukuri: "隶", reki: "歴暦擽櫟檪櫪瀝癧礫轢轣靂鬲", rekki: "歴", ren: "連練恋鎌怜廉憐漣煉簾聯蓮錬匳嗹奩戀攣斂楝歛濂瀲縺聨臉臠茘賺輦鏈鰊", renzi: "櫺", retu: "列律裂劣烈冽唳埒埓捩洌", ri: "人合理成利美離裏里荷梨栗李履亥浬鯉抄狸哩莱吏璃痢裡麗俚俐悧罹漓犂犁籬茘莅莉蜊蠡詈貍釐驪黎黐", rie: "江", rii: "力利", riki: "力働仂篥", riku: "六陸勠戮淕蓼", rin: "林輪臨鈴隣倫綾厘淋燐琳鱗麟侖凛吝廩悋懍棆淪痳稟禀綸罧菻藺襴躙躪鄰醂釐霖凜", riri: "入", rissinben: "心", riti: "律篥", rittoru: "立", ritu: "立率律栗葎慄篥", riu: "竜", ro: "事路郎納露炉朗芦虜鷺櫨蕗侶呂魯櫓賂婁廬枦梠櫚滷濾瀘爐盧粐絽膂臚艢艪艫舮蘆褸輅轤鑢鑪鈩閭顱驢髏鱸鹵", roku: "六働録鹿陸緑漉麓禄肋仂戮淕碌祿轆勒", ron: "論乱亂侖崙崘淪", roo: "郎", rotu: "六", rou: "労郎良蔵老桜露竜龍朗浪漏糧滝廊摺瀧稜婁弄楼榔牢狼篭聾蝋僂勞咾哢喨壟拉撩撈朖朧柆楞槞樓櫟檪潦琅瑯瓏瘻癆窶籠簍粮縷臘臈莨薐蘢螂螻褸踉醪鏤鑞陋隴", rousoku: "蝋", ru: "十流路児留塁屡蕗劉琉瑠婁弄篭僂嚠榴璢畄瘤瘻窶籠簍縷螻褸鏤鰡", rugi: "動", rui: "類塁涙累壘泪瘰縲羸耒莅誄", rumata: "殳", ruri: "瑠", rutubo: "堝", ruuburu: "留畄", ryaku: "略掠擽畧", ryo: "良旅慮虜侶涼呂廬梠櫚濾絽膂臚鑢閭驢", ryoku: "力働緑仂朸", ryou: "料領両郎量良療僚漁養令了菱貞竜龍糧霊亮寮陵綾杏椋掠凌梁涼猟瞭稜諒遼伶嶺怜玲苓倆兩凉喨壟寥崚廖撩撈暸楞榴櫺燎獵簗粱粮繆繚羚聊聆蔆蓼裲踉輛輌鐐隴靈鬣魎鷯", ryu: "龍嶐鉚", ryuku: "働仂", ryuu: "生立流留隆柳竜龍笠粒劉溜琉硫瑠嚠戮旒榴毓游澑瀏犂犁璢畄瘤窿苙鏐霤餾鰡"
            , sa: "十三五生山決相下小作来道指点査任止割提再楽沢佐然早差注去左冷覚避射酒里砂刺謝茶鎖桜舎浅裂摩寒狭彩咲唆詐笹粧猿些叉嵯沙瑳裟坐挫冴桟紗抄靭醒挿乍捺蓑做决冱剳厦呰嗟嗄娑寤嵳廈扠扨插搓摧擘柤梭槎沍渣灑炸狹瑣磋磔箚簑簔縒苴莎螫覺蹉釵鍼靫靱鮓鯊鷦點齟", saba: "裁鯖捌", sabi: "寂錆淋寞寥銹鏥", sabu: "三纉", sada: "定断尊貞禎奠斷", sae: "三斎朗彩冴", saegi: "遮", saeru: "冴", saezu: "哢囀", saga: "相性捜探搜", sagan: "目", sagesu: "蔑", sagi: "鷺匂", sagu: "探", sai: "三最西済際税切歳井裁再崎財細材催採殺債妻載災祭埼斎斉菜彩栽柴哉宰才砕紫叉塞采犀砦碕晒偲靭凄殆蓑倅伜儕嵜崔截搓摧擠寨樶洒淬淒滓濟灑犲猜眥眦砌碎齋篩簑簔綵縡纔腮臍萃萋蔡豺戝賽齎躋釵隹雜霽靫靱齏韲顋骰鰓齊", saina: "苛嘖", saiwa: "幸倖禎禄祚祺祿禧釐", saka: "下作阪境早積盛逆坂栄酒賢祥圻垠榮櫑", sakadaru: "罍", sakaduki: "尽盡", sakae: "栄昌", sakai: "境堺畍疆", sakaki: "榊", sakamiti: "嶝", sakan: "目属昌壮旺壯奘屬弉殷熾", sakana: "魚肴", sakanobo: "遡溯", sakanoboru: "泝", sakara: "忤", sakazuki: "杯鍾盃卮巵盞觚觴", sake: "号酒叫鮭喊嘖嚆號", sakenotukasa: "酋", saki: "前東先崎幸埼往輝咲笹碕尖岬嵜徃曩", sakibarai: "蹕", sakigake: "魁", sakini: "嚮", sakka: "目属", sako: "迫浴硲逧", saku: "作数策昨削索冊錯咋搾朔柵窄酢雀遡捉乍做册劈嘖愬拆數柞槊溯炸筴筰簀胙薊醋鑿齪", sakura: "桜櫻", sakusa: "咋", sama: "様樣", samata: "妨碍礙", samayo: "彷徊徘徨", same: "雨鮫鯊", sami: "寂淋", samu: "寒凄淒皚", samurai: "士侍", san: "三山産参算残様散賛杉操酸尽寒傘惨柵撒桟燦珊纂蚕讃餐斬撰蒜刪參簒孱嶄巉彡慘懺懴戔攅棧槧汕潺潸爨疝盞盡竄簪粲繖纉纔芟蔘蠶衫讒讚贊跚鏨鑽鑚閂霰饌驂", sana: "真實眞", sanada: "絛", sanagi: "蛹", sanbongawa: "川", sandukuri: "彡", sane: "実重真實", sansyouuo: "鯢", santi: "珊", sanu: "讃", sanzyuu: "世卅丗", sao: "操竿棹", sara: "更皿晒曝攫浚渫濬盒", saragi: "佛", sarasi: "晒", saru: "申猿猴", sasa: "支朝笹篠捧", sasara: "筅簓", sasaya: "囁聶", sasi: "指蔵幸刺緡", sasigane: "矩", sasihasa: "挟挾縉", sasimane: "麾", sasiwatasi: "径徑逕", sasizubata: "麾", saso: "誘哘", sasori: "蝎蠍", sasu: "指剽戡", sasuga: "遉", sat: "颯", sata: "定聡", sate: "偖扠扨", sati: "幸祥祐薩禎", sato: "前理知解識達央覚恵里智誠哲郷仁啓賢聖諭悟暁慧聡吏怜喩嶷怱惺曉聰覺觧閭黠", satoi: "智敏慧", satoru: "理知解識了智哲勘暁慧聡學", satosi: "省説恵智哲敏訓啓賢聖慧詔聡怜聰", satoukibi: "蔗", satu: "五察札殺撮刷冊擦作早幸粟薩拶薩撒靭册刹剳囃扎箚紮靫靱颯", satuka: "目", satuki: "皐皋", sawa: "川沢早障触騒澤猿爽噪觸譟躁醂隰騷", sawaga: "閙騷鬧", sawan: "沢", sawara: "椹鰆", saya: "明清鞘莢", sayaka: "明", saza: "小貞", sazanami: "漣", sazi: "匙匕", sazinohi: "匕", sazo: "嘸", sazokasi: "嘸", sazoya: "嘸", sazu: "授", se: "所戦数世勢施谷競清責攻背迫瀬稲兄聖妹堰灘咳畝脊竸丗數灑畆眥眦訶誅誚謫蹙", seba: "狭狹", sebone: "呂膂", segare: "倅伜悴忰", seguku: "跼", sei: "政生制性成正世西済省歳情井勢製声整請青清盛静精背星瀬剤晴誠斉牲聖浄征蒸姓誓靖甥芹犀鯖錆汐鉦凄棲栖逝醒脆脊栴瀞畷婿貰丼倩儕劑丗嘶壻彁彗悽惺掣撕擠旌晟晢橇毳洒淨淒濟猩眥眦睛砌穽筬筮聟聲腥臍萋菁薺蛻蜻贅齎躋霽靜齏韲齊", seisyu: "鹹", seki: "関石席積赤責績跡折夕潟析籍舎釈昔堰寂隻惜咳汐尺錫戚斥脊蹟碩勣喘拆晰槭淅炙瘠皙碵磧簀腋舍蓆藉蜥螫裼跖蹐蹙蹠迹釋鉐關髢鶺齣", sekku: "石", seko: "迫逧", seku: "齪", sema: "迫狭窄拶逼狹褊遒逎阨陋陜隘齪", seme: "譴鬩", semi: "蝉蜩", semusi: "佝傴瘻駝", sen: "選山千川戦先線専船鮮占宣染泉薦仙銭浅洗繊潜釧践茜串鹸桟斬蝉尖扇撰栓栴煎煽旋穿箭羨腺舛詮賎遷銑閃禅膳揃苫鱒亘亶仟倩僉僊僭僣刋剪簒吮喘塹嬋孅專尠孱巛彡悛戔戰拈摶擅擶旃暹栫棧槧槫殲殱氈沾洒涎淺湶潺潛濳澹濺燹牋甎疝痊癬盞瞻磚禪笘筌筅箋簽籤籖綫纖纎羶翦臉舩芟荐蘚蟾譖譛譫賤贍跣踐銓銛錢鐫閂闡阡陝雋霰韆顫餞饌", senti: "珊糎", sentiguramu: "甅", sentimeetoru: "糎", sentirittoru: "竰", sento: "仙", seri: "芹糴糶", seti: "節刹緤", setu: "設切説接殺折節雪瀬洩屑脆拙摂窃鱈刹卩啜截掣攝晢椄楔毳泄浙渫竊紲絏緤膤薛褻鑷鞨", seu: "尠憔", sewa: "忙", si: "十市四自後新七子治氏思強支指知初資信次使始住示死私止石士施視試仕守姿紙史師林清司占締志執之染誌酒宗閉刺祉茨己芝敷茂至歯是也矢絞旨枝糸詩滋脚姉諮飼柴凍磯孜紫肢脂詞梓飴夷柿祇欣此嵯匙晒仔伺嗣屍斯獅賜雌侍蒔宍偲笥只弛痴漬砥覗髭巳吏亊侈俟卮厠厮厶呰咨咫啻嗜嗤嘴址塒孳尸屎妛岻巵帋幟廁廝弑徙恣恃懋揣摯撕朿枳梔檮殞沚沁泗滓滲熾瓷畤疵痣癡眥眦祀祠祗稠竢笶篩粢絲緇縒翅耆耜肆舐苡茲葆葹蓍蚩觜誣謚諡豕貲贄齎趾趺輜釶錙閇阯駟駛鮨鯔鰓鰤鴟鵄鷙齒", siawa: "幸倖", siba: "芝柴縛", sibara: "暫頃", sibaraku: "姑", sibasiba: "数屡亟數", sibe: "標蕊蘂蕋", sibi: "鮪痺痲", sibo: "絞葦萎搾凋皺", sibori: "纈", sibu: "信渋澁澀", sibuki: "沫", side: "幣椣", sidu: "静", siga: "信", sigara: "柵", sigarami: "柵", sige: "成重順樹栄恵瀬誠茂滋繁鎮欝薫慈穣茸蕃咸孳廡鬱", sigeru: "重滋卯蕃楙", sigesi: "縟", sigi: "鴫鷸", siguma: "羆", siha: "芝", sii: "後椎弑罔誣", siina: "秕粃", siita: "虐", sika: "然鹿色飾爾而叱呵咄咤聢訶詆顰", sikabane: "屍尸", sikabanekanmuri: "尸", sikari: "爾兪尓", sikaruni: "而", sikato: "聢", siki: "式識城色織敷頻拭鋪軾閾餝", sikigamae: "弋", sikigawara: "甃甎", sikii: "閾", sikimi: "梱樒櫁軾", sikirini: "仍荐", siko: "色而醜", sikoro: "錏錣鐚", siku: "鋪衍", sima: "島嶋洲縞嶌嶼陦", sime: "示観湿諜濕觀", simo: "下霜", simobe: "僕隷僮隸", simogasa: "痔", simoto: "楚笞", simoyasiki: "墅", simu: "占俾", sin: "新進心信参神身真親審申深請振針森清津伸震普慎診侵寝臣沈浸辛辰宍唇娠晋榛疹秦紳芯薪訊賑矧槙枕僭僣參呻哂嗔宸寢岑忱怎愼抻斟晉晨椹沁滲瀋甄畛眞瞋箴簪縉脣臻蓁蔘蓼蕈蜃袗襯譖譛讖贐軫酳鍼鐔駸鷆鷏齔槇", sina: "信品科姿階級葦萎靭撓粃綽靫靱", sinaya: "嫋", sine: "稲", sinigamae: "歹", sinnotatu: "辰", sino: "東信笹篠忍偲凌筱", sinobigoto: "誄", sinobu: "仁荵", sinogi: "鎬", sinogu: "駕", sinu: "歿", sinyou: "支", sio: "塩潮葦萎汐撓鹵鹽", siokara: "醢", siokarai: "鹹", sioke: "鹹", siori: "栞", sioti: "鹵", sira: "調検白按檢覈", sirami: "虱蝨", sirase: "訃", sire: "知", siri: "後知尻臀", sirigai: "紂鞦", siringu: "志", sirizo: "退却斥卻屏擯逡黜", siro: "代白城皎皓皙皚", sirogane: "銀", siroginu: "縞", siroko: "錏", sirotuti: "堊", siru: "記印汁", sirube: "標", sirusi: "験印標徴瑞徽驗", sisi: "鹿穴獅宍", sisibisio: "醢", sita: "下設親舌慕簧", sitaga: "従随遜馴隷倭从婉徇從隨扈隸", sitagaki: "稿稾", sitagau: "順", sitagi: "襦", sitata: "認滴溜澑瀝", siti: "七質叱悉貭", sito: "下淑", sitogi: "粢", sitomi: "蔀", sitone: "茵蓐衽袵褥", situ: "実質室失執湿櫛七叱嫉悉漆疾膝蛭嘯實桎濕瑟虱蝨蟋貭躾隲隰", situke: "躾", siwa: "吝皴皺襞", siwabu: "咳", siwabuki: "咳謦", siyau: "精", sizi: "榻", sizimi: "蜆", sizu: "静沈没鎮靖賎湛填汨沒淪湮湎賤鎭靜", sizuka: "禅禪謐闃靜", sizuku: "雫滴", so: "十生組初反夫訴想早殺左素削狙染草措宗沿曽礎祖添庄征阻磯逸疎粗荘姐且杵鋤噌塑岨曾楚疏租蘇遡鼠惣其柘剃疋俎做剔咀囎徂怎愬柤梳泝沮涅溯爼甦疽砠祚胥胙苴蔬蘓蛆詛踈酥麁鼡齟", soba: "側傍蕎岨", sobada: "屹峙崛欹", sobame: "妾", sobi: "聳", soda: "育毓", sode: "袖", soe: "副添弐貳貮", soeuma: "驂", sogi: "枌", soi: "副襲", soko: "損底椢", sokona: "残損殘", soku: "数側職足速則測息束促即粟塞燭趨戚捉仄喞嗾嗽惻數昃熄矚簇鏃齪", soma: "仙杣", some: "染", somu: "背舛伐叛乖韋", son: "成村存損尊孫噂餐遜巽樽鱒忖拵栫洒蹲邨齔", sona: "備供具膳饌", sone: "嫉妬", sono: "園彼苑爾厥囿尓茆", soo: "宗", sora: "空昊穹諳諷霄", sore: "厥", soregasi: "某", sori: "反刀橇膤艝轌釖", soro: "対算斉揃對齊", sos: "卒卆", sosi: "誹毀詆謗譏譖譛讒", soso: "注潅溌沃漑灌澆濺灑盥", sosonoka: "唆嗾", soti: "倅伜", soto: "外", sotu: "率卒倅伜卆埣猝", sou: "十三生相総世送争想早捜走蔵装将倉層繰創草葬奏宗贈操窓騒双喪曽箱奨庄掃巣桑僧壮槽荘遭滝鯵粟甥竃甑捷蒋鞘諏噌曾叢爽宋匝惣挿掻曹槍漕燥痩糟綜聡蒼藻鎗霜瀧蛸爪葱蚤湊薮偬冏剏剿勦匆卅丗雙叟哈嗾嗽噪囃壯奘奬妝娵嫂孀將崢帚廂弉怱愡愴憔懆找抓搜掫插搶棕椶棗樔歃淙滄溲漱澡炒爭爿牀猩獎瘡稍窗竈笊笙箒箏筝簇籔粽總聰臧艙艘艚艸莊菷蔟薔藪藏裝諍譟贓賍赱蹌踪躁輳銷錚鏘鐺霎颯騷髞鬆鮹鰺鰤", soukou: "艸", sourou: "候", souzite: "惣", soyogu: "戦戰", sozoroni: "坐", su: "日月子代主数総首西済直統住空州過助守好周素角為棄吸捨窓透酸釈刷寿須摩巣陶磨妹擦珠洲据菅澄寸隙漉朱鋤笥諏酢崇雛摺棲栖蘇叢綜剃簾鷲吮呷壽娵拗捐掏搨擂數梳樔歙漱澂濟爲窗笊箝簀總耡芻蒭蘓醋釋饐鬚麈", subaru: "昴", sube: "全総術滑凡渾總辷", subekara: "須", subesi: "須", subo: "窄", sudama: "魑", sudare: "箔簾", sude: "既已", sudenotukuri: "旡", sue: "末居季陶甄", suga: "管清菅縋", sugame: "眇", sugata: "姿", suge: "菅", sugi: "生杉椙叩軼", sugiru: "宕", sugo: "菅凄淒", sugu: "勝直優傑駿儁儻杰雋", suguru: "英豪俊卓", sui: "出水推塁剤吹穂遂垂炊衰酔瑞氷帥睡粋翠錐錘誰椎劑埀壘夊崔彗悴忰惴捶揣榱燧瘁祟穗邃粹綏翆隋膵萃雖觜醉陲隧隹騅", suinyou: "夊", suka: "賺", suke: "相資佐助右介賃裕典昌哉輔祐亮允丞弼甫佑", suki: "次銭鍬隙鋤犂犁罅耒耜耡耨釁銛錢", suko: "少健", sukobu: "頗", sukosi: "毫", suku: "済少城宿救句粛掬匡淑丞抔拯樔濟竦肅贍", sukumo: "粭糘", sukumomusi: "蝎", sukuna: "尠", suma: "澂", sumi: "住清速角純炭寿隅澄墨隈栖綴陬", sumire: "菫", sumiyaka: "亟遽", sumomo: "李", sumu: "済", sun: "寸吋駿", suna: "砂沙", sunao: "淳", sunawa: "即乃廼迺", sunawati: "曽而曾輒輙", sune: "強脛臑", suno: "春墨", sunori: "規", suppon: "鼇鼈", suru: "駿摺", surudo: "鋭尖", surume: "鯣", susa: "荒凄淒", susi: "鮓鮨", suso: "裾裔", susu: "進薦勧奨澄晋膳濯煤侑勸啜嗽奬廸慂慫晉歃洒漱獎迪邁陟", susuki: "薄芒", susume: "羞", susumi: "晋迪", susumu: "将奏晋侑迪", susurina: "歔", suta: "廃廢", sute: "弃", sutu: "出寿", suu: "数崇嵩枢趨雛數樞皺芻菘蒭鄒陬", suwa: "座坐", suwae: "楚", suzi: "線条筋脈條綫脉", suzu: "鈴紗錫鐸涼凉篶鑾", suzuki: "鱸", suzume: "雀", suzuri: "硯", sya: "社者車予左写射砂捨謝舎釈卸煮斜姐些叉沙裟赦紗遮柘這貰豫偖冩嗟奢娑寫洒瀉灑炙畭舍苴莎蔗藉赭鉈鯊鷓麝", syabe: "喋", syaga: "嗄躑", syake: "鮭", syako: "積", syaku: "石赤借釈昔錯勺尺杓灼爵酌錫雀蹟勣呎嚼妁斫晰爍癪皙笏筰綽芍蜥迹釋鑠鵲齣", syamo: "鶤", syan: "上", syao: "小", syati: "鯱", syatihoko: "鯱", syo: "所野書初松処署諸狙緒曙暑庶疎且杵黍渚薯藷恕鋤岨楚疏鼠埜疋舒俎處咀墅嶼抒杼沮爼疽砠絮胥苴蔗蔬蛆蜍詛踈雎鼡齟", syoku: "続職食色織植属触飾殖粟嘱埴拭燭蝕厠喞囑嗇寔屬廁惻昃昵矚禝稙稷穡續薔蜀觸謖贖軾餝", syou: "政上生相小性勝正省井少商消証乗松声象様請賞青接登渉障清従装将昭精償傷昇焼星招創扱秀承訟症称章笑唱紹衝床照焦昌沼詳聖咲奨尚庄彰祥篠匠晶粧鐘姓荘翔甥且挟鍬甑鯖錆腫升召哨嘗妾娼宵廠抄掌捷梢樟樵湘硝礁肖菖蒋蕉裳詔醤鉦鍾鞘丞摺摂噌槍鎗蛸憧橡瀞秤丼从倡剏剿劭勦厰燮嘯囁囎墻奬妝將峭嶂庠廂從悚悄愀慫慴慯慵憔懾拯挾搶攝敞旌枩杪枌椒椄楫樅樣橦檣歃歙殤浹淞湫漿瀟炒烝燒爿牀牆猖猩獎璋甞瘡瘴睫睛稍稱竦笙筱箏筝簫聳聲聶腥舂艘艟艢莊菁蕭薔蚣裝襄褶觴誦誚諍證踵蹌蹤踪逍邵鈔銷鏘陞霄霎韶頌顳餉驤驫鬆鮹鱆鱶鷦", syouhen: "爿", syouzyou: "猩", syu: "手主取最数首輸株種守修周衆捜酒秀趣須殊掃狩珠酬鰍朱腫呪鍾諏枢趨痩鋳撞柊侏咒娵娶戍搜數棕椶樞橦殳洙溲繻聚茱蛛鄒銖銹鑄鬆鬚鰌麈", syuku: "宿縮祝粛粥蹴叔夙淑俶槭倏矗鬻肅菽蓿謖蹙齪", syun: "春旬俊瞬淳峻竣舜駿醇訊惇遁馴隼儁吮墫徇恂悛惷洵浚濬皴筍笋荀蓴蕣蠢詢諄蹲逡雋駲鰆鶉", syutu: "出率卒卆恤朮蟀齣", syuu: "主集州終収修周秋衆捜週就習羽執昇秀宗襲渋祝寿湿拾洲臭舟酬萩穐鰍鍬呪囚愁繍蒐讐蹴輯酋醜什厨嵩摺痩袖鋳楢柊葺揖鷲叟咒售啾嗽壽夂娵岫帚廚愀慴搜掫收楸楫泅湫溲漱澁澀濕甃皺龝箒籀綉緝羞聚脩艘芻菘菷蒭蓚螽褶讎躊遒逎鄒銹鏥鑄陬隰鞦駲驟鰌齪", syuuto: "姑舅", syuutome: "姑"
            , ta: "大発高手立田度経原多海点女向建反屋裁食足起断楽種太天他馬絶閉貯泰丹耐垂炊駄堪矯仔汰詑唾柁舵楕陀騨竪誰焚溜詫佗侘咫咤哮埀夛它岔憚斷朶樔殄沱澑發經綏隋荼誑謖豎躱閇闌駝鴕點", taba: "抱束煙把繃", tabaka: "謀誑", tabako: "莨", tabi: "度旅羈羇覊韈", tabo: "髱", tabu: "椨", tabura: "誑", tabusa: "髻", tada: "三政内理正直真質督伊縄弾忠斉聖征唯宰惟祇糾匡只但禎董飭啻尹彈爛糜糺繩貭", tadasi: "理公正規義真督端雅忠貞侃匡矩旦禎肇", tadasu: "紀匡擶", tadatini: "径徑逕", tadayo: "漂汎漾", tade: "蓼", tado: "辿", tadori: "辿", taduna: "轡羈羇覊", tae: "成妙耐紗栲", taga: "違互畊箍靠", tagaini: "逓遞", tagane: "鏨", tagau: "爽", tagaya: "耕畉", tagi: "滾", tagosi: "輦", tagu: "類伉", tagui: "双雙疇畴", tahu: "椨", tai: "大対代体当来平台態待太退隊逮替帯貸滞袋泰耐怠敦夷碓秦汰堆岱戴胎腿苔黛鯛醍鎚梯諦殆來兌對帶擡抬棣歹滯炬玳紿臺蒂蔕薹蛻褪詒詆豸躰軆鐓隶靆頽颱駘體", taimai: "玳", taira: "平坦砥", taka: "学高京公挙考能応宅太好登延就将竹貴隆宇敬宗顧孝誉臣岳賢聖尊剛尚卓廷銘宜鷹享喬尭昂峻崇嵩琢寶岌崛巍敞杲陟魏堯", takaburu: "亢", takadono: "楼樓", takamu: "崇", takamura: "篁", takamusiro: "簟", takanna: "筍笋", takara: "用財宝珍寶寳珎貲", takasi: "大長天岐貴隆節敬孝律丘尚卓享喬尭昂皐峻崇嵩巍敞髞", takatuki: "鐙", take: "長全和建宅武雄健竹敬豪誉威岳丈尊剛毅穀猛傑虎嵩茸彪斌孟嶽蕈赳", takeki: "彪", taken: "武岳", takenawa: "酣闌", takenoko: "筍笋", takeru: "猛", takesi: "武健豪威剛毅猛彪孟壯悍洸赳驍", taki: "滝瀧嶽瀑", takigi: "薪掫蕘", tako: "凧蛸鮹鱆", taku: "度沢宅択託卓拓巧澤啄托濯琢鐸擢詫倬啅戳拆擇柝棹櫂炸磔謫躅鈬魄", takuma: "逞", takumi: "工巧匠倆", takuwa: "貯蓄儲薀", tama: "球環給玉弾霊偶圭魂珠瑞堪玖珪賜錫碧溜玲彈澑瑰瑶璧瓊賚靈魄瑤", tamago: "卵孚", tamaki: "環鐶", tamamono: "賚", tamari: "溜澑", tamasii: "魂", tamato: "袂", tamawa: "賜", tamaya: "廟", tame: "試験為溜澑爲驗", tameiki: "愾", tamera: "躇躊", tamesi: "験驗", tami: "民丹氓", tamo: "保給賜", tamoto: "袂", tamotu: "維", tamusi: "癬", tan: "田反担谷段単短探端弾炭誕丹淡壇嘆胆唐灘堪騨但坦旦歎湛箪綻耽蛋鍛檀椴丼亶啖啗單壜彈彖怛愽慱憚憺擔揣摶攤槫檐殫毯湍潭澹猯疸痰眈站簟緞罎膽葮蕁蜒蜑袒襌褝覃譚譫貪賺赧鄲酖鐔靼餤", tana: "店棚屶廛", tanagokoro: "掬掌", tane: "種胤稙", tani: "谷澗渓壑峪溪谿", tanigawa: "渓溪谿", tanimizu: "澗", tano: "楽頼嬉嘱托愉倚囑怙恃憑樂馮", tanosi: "煕佚熈熙", tanuki: "狸貍", tao: "倒顛仆僵垰嫋乢嵶斃殪蹶", taoyaka: "婀", tara: "平鱈槃鰔", tarai: "盥", tarasi: "足", tare: "誰孰", taregami: "髦", tari: "谷渡為爲", taru: "善垂樽弛", taruki: "桷椽榱", tasi: "確碓慥", tasina: "嗜窘", tasu: "助賛輔祐丞毘弼扶佑侑幇掖裨贊", tasuki: "襷", tasuku: "輔祐亮弼佑", tata: "賛称忠畳讃叩湛彳扣敲毆疊疉疂祟稱讚贊頌", tataka: "戦闘戰鬪", tatakaigamae: "鬥", tatami: "畳疊疉疂", tatara: "鑪", tatazu: "佇竚", tate: "立建館健帯賢縦盾舘楯竪縱豎鹵", tategami: "鬣", tatehuda: "榜", tateito: "経經", tatematu: "献奉亨獻", tati: "日立館質達城陸舘朔貭逹闥靼", tatibana: "橘", tatiki: "樹", tatima: "忽乍", tatimati: "奄倏", tatimotoo: "裴躑", tato: "例俔喩譬", tatto: "貴尊", tatu: "立建達樹竜龍辰蔦怛截撻燵獺逹闥靼韃", tatumi: "巽", taturu: "樹", tawa: "垰乢嵶懈撓橈", tawagoto: "譫", tawamu: "戯弄戲謔", tawamure: "詼", tawara: "俵", tayo: "便頼", tayu: "弛", tazi: "但", tazu: "訪鶴尋訊", tazune: "繹", tazusa: "携攜", te: "手守天達豊因稲照殿弟勅汀樋弖稻逹", tegata: "劵", teguruma: "輦", tei: "定体第提庁低程丁締聴停底庭滞袋弟抵邸貞帝廷訂亭堤艇鵜醍綴偵剃呈悌挺梯汀碇禎諦蹄逓鄭釘鼎砥薙畷俤剔叮啼嚔嚏奠姨幀廳廰掟柢梃棣楴洟涕渟滯牴疔眤睇羝蒂蔕蟶裼觝詆躰軆逞遉遞酊酲錣霆騁體髢", tekase: "梏", teki: "的摘適敵荻杓嫡擢滴笛鏑俶剔廸彳擲滌狄糴覿躑迪逖", teko: "杆杠桿梃槓", ten: "一出点店転展伝天典殿添淀蚕騨辿佃填纏甜貼顛澱槙丶傳甸唸囀壥奠巓廛忝恬掾畋椽殄沾癜癲碾篆簟纒腆蠶覘諂貂躔輾轉鈿銛霑靦鷆鷏點槇", tenmado: "窓窗", tenohira: "掌", tera: "寺衒", tero: "得", teru: "両映光央昭栄曜照旭輝晃瑛暁暉皓", tesuri: "欄檻闌", teti: "綴", tetu: "鉄達撤哲徹", tetu: "綴轍迭畷姪佚咥啜鉄哲徹垤屮捏耋跌軼輟銕錣鐵鐡餮", tetun: "哲", ti: "十五市地内千治都和知置質形値津丁散池遅血致盤智徴乳刃恥稚刀茅些陀弛痴蜘馳砥薙仟夂癡眞穉笞緻耻胝褫豸貭踟躓輊遲雉魑黐黹", tibi: "禿", tidi: "縮", tidori: "鵆", tiga: "違", tigaya: "茅", tigi: "契", tigo: "兒", tii: "小", tiisa: "小瑣", tiisai: "幺", tika: "近元朝義親史周央慎隣哉誓鎮允慈爾峻悌迩睦尹邇", tikadu: "昵", tikara: "力", tikasi: "迩", tiki: "飭", tikiri: "巾", tiku: "竹築筑蓄竺畜逐矗舳", timaki: "粽", timata: "巷", tin: "清丁賃沈珍陳鎮椿亭砧疹塵湛朕填枕戡抻椹狆珎碪趁酖鍖鎭闖鴆", tina: "因", tinba: "跛", tinomigo: "孩孺", tinu: "釁", tiri: "塵埃", tiriba: "鏤", tiru: "生散", tis: "蟄", tisuzi: "胄", tisya: "苣", titi: "父乳秩爺", titu: "秩窒蛭姪帙膣腟蟄鷙", tiya: "茶", to: "十人時問度取外名勝都利解藤止土石研夫説戸頭渡門音捕訪階融吉登図博飛採富津豊等留永徒途執停鳥闘閉撮臣仁泊遂跳溶刃塗刀冨翔兜采訊摂綴兎吐堵妬屠斗杜菟賭鍍砥砺涛釆樋熔兔咤圖抖搴攝搏攬斛梳樢畄當睹礪秉緘聘肚荼莵蚪蠹蠧覩觧跿遏銷鎔鐺鑠閇闍", tobari: "幌帳帷幄幃幎", tobi: "飛鳶鴟鵄鵈", tobira: "扉闔", tobiranoto: "戸", tobiti: "溌", tobo: "点乏恍點", toboso: "枢樞", tobuhi: "烽", tobura: "弔", todo: "止留届稽逗椴屆渟畄遏閼鯔", todokoo: "滞滯", todoro: "轟軣驫", toga: "尖栂尤咎愧謫", toge: "刺朿棘薊", togi: "時伽", toguro: "塒", toi: "樋", toisi: "砥", toka: "爍", tokage: "蜥", toke: "解", toki: "時言信常説秋斎辰穐鴇晨齋龝閧鬨鴾", toko: "所常床", tokoro: "所処處攸", tokosibari: "輹", toku: "得特独督読徳釈竺啄匿涜禿篤悳慝牘犢獨竇纛讀釋陟髑黷", toma: "苫篷", tomari: "泊", tomasu: "斗", tomata: "攴", tome: "留", tomi: "福富智臣冨頓", tomo: "大公作和知点共朝基視与供友具紀興幸伴智誠丈那倫寛灯珠奉乏允倶悌禎塘燈寅巴朋侶呂舳艢艫舮鞆點", tomoduna: "纜", tomoe: "巴", tomogara: "輩曹們儕儔", tomona: "伴", tomoni: "与偕與", tomosibi: "灯燭燈", tomura: "弔", ton: "通問団富敦噸屯惇沌豚遁頓呑丼團暾燉瓲臀褪貪遯飩齔", tona: "称唱隣倡徇稱誦鄰", tonari: "隣鄰", tonbi: "鳶", tone: "舍", tono: "殿", too: "十東通遠柔疏茫藐逖遐", tooi: "弥彌", tooru: "理達宣徹透亨享暢", tooruhu: "亨", tora: "捕虎囚捉寅彪擒乕", toragasira: "虍", torakanmuri: "虍", tori: "部取鳥舎禽鶏酉隹鷄", toride: "塁廓塞砦柵堡壘寨", torihen: "酉", toriko: "虜禽俘擒", toriku: "虜", toro: "蕩瀞盪蘯銷鑠", tose: "歳", tosi: "年明要世利福歳好史健紀厳順載齢季功敬宗智俊敏寿鋭毅哉稔慧淑峻駿聡惇肇甫禄壽彗齡", tosikatu: "寿", tosiyori: "耋", tote: "迚", totemo: "迚", toti: "構栃橡杤", totono: "調整薺", totu: "帰突嫁凸鳥頓吶咄柮歸皈肭訥", tou: "十党東田当道島投任統藤頭郎答討登読丁等倒踏闘逃納盗稲冬透嶋到棟湯凍灯筒豆陶騰桐酬刀唐塔悼糖洞吋桶兜沓逗喋斗杜塘套宕搭桃梼淘涛燈痘祷董蕩謄鐙憧撞瞳萄涜肇樋亠俑偸僮儻兪剳叨啅嘲嶌嶝帑幀幢恫慟抖掏掉掟搗搨撓擣朷档檮棹棠椡榻橙橦櫂盜濤淌滔滕溏潼當疼盪蘯瞠磴礑稻竇箚籐籘粡綉絛綢綯縢纛罩艟苳荅荳蓊薹螳蟷襠譫讀蹈迯酘釖鍮鐺閙陦鞜鞳韜饕骰鬧鬪鰈鶇鶫黨鼕", tougamae: "鬥", touge: "峠垰", toumaru: "鶤", toumi: "江", touru: "亨暢亘", touto: "貴尊", towa: "樋", toya: "塒", toyo: "豊樋豐", toza: "鎖", tu: "四子連通都水点告次付土着注積接摘突司津就継塚詰奥衝徹即尽鶴亜拓釣悉漬柘吊貼兎吐妬菟撞附葎亞偸兔兪剪憑抓搶搗擣攣椄痙盡綉繼纉舂莅莵薀蘊誥踵鉉顆鶇鶫點", tuba: "椿唾鍔鐔", tubaki: "椿唾沫", tubakura: "燕", tubakuro: "燕", tubame: "燕", tubasa: "翼翅", tubo: "窄坪壷坩壺", tubomi: "莟蕾", tubone: "局", tubu: "粒潰瞑", tubura: "円圓", tubusa: "備審具悉", tubute: "礫", tubuya: "呟", tuda: "伝", tudo: "集", tudu: "続綴續", tuduki: "仲續", tudumayaka: "倹儉", tudumi: "鼓皷", tudura: "葛", tuduri: "綴", tue: "杖仗枴梃棍", tuga: "番栂樛", tuge: "柘", tugi: "調次族亜胤嗣", tugomori: "晦", tugu: "二続次維承紹序亜尋胤嗣噤拑續鉗韶頌", tugumi: "鶇鶫", tuguna: "償", tui: "対立費終追築序遂叙堆墜椎槌鎚潰對敍敘縋隧", tuiba: "啄喋", tuide: "序叙敍敘", tuini: "卒卆訖竟", tuitati: "朔", tuka: "事発家支使労仕捕司塚遣束柄尽疲倦掴杷埠亊冢劬勞壟憊憑拏拿攫瘁發羸閊", tukae: "痞", tukai: "徭", tukasa: "務台司嗣曹宦臺", tukasado: "司", tuke: "野付", tuki: "月女付属築尽槻坏欟殄殫", tuku: "作土造属築為創筑啄做傅屬捏殄殲殱爲竭鏗", tukuba: "蹲", tukuda: "佃", tukue: "案机几", tukuri: "旁", tukuro: "繕", tuma: "最妻撮倹嬬爪儉抓褄", tumabasa: "襭", tumabi: "審詳", tumabiraka: "諦", tumada: "翹跂", tumako: "孥", tumami: "鈕", tumazu: "頓跌蹉蹶躓", tume: "冷爪", tumi: "積罪辜", tumo: "妬", tumu: "摘紡錘紬勣瞑緝", tumugi: "紬", tumuri: "頭", tumuzikaze: "飄飃飆", tuna: "之綱繋紘婁絆緤羈羇覊", tunagu: "紘", tunbo: "聾", tune: "経常毎典恒矩庸彝彜恆抓經", tuneni: "恒", tuno: "角募", tunza: "劈", tura: "連面貫辛聯緜聨肆", turanu: "貫串", turanuku: "琲", turatura: "倩", ture: "連", turea: "対對逑", tureai: "仇儷", turi: "釣", turiito: "緡", turu: "鶴弦敦吊蔓寉霍", turugi: "剣劍劔劒剱釼鋏", tusa: "橲", tusi: "対對", tuta: "伝蔦傳樢蘿", tutae: "伝", tutana: "拙", tute: "伝傳", tuti: "土壌坤椎槌鎚壤", tutihuru: "霾", tutika: "培", tutikure: "塊", tutinoe: "戊", tutinoto: "己", tuto: "務勤努勉孜劭勗懋苴苞黽", tutomu: "力功茂惇孟", tutoni: "夙", tutu: "包筒啄兢勹坡裹韜", tutuga: "恙", tutumi: "堤塘陂", tutumigamae: "勹", tutusi: "慎斎粛欽謹恪愨愿愼矜祗齋竦肅虔", tuu: "通痛", tuwamono: "兵戎仗", tuya: "沢彩澤艶艷", tuyo: "強剛毅侃彊倔勁勍遒逎", tuyosi: "幹雄剛毅壮彊彪", tuyu: "露汁", tuzi: "辻", tya: "茶楪茗", tyaku: "役着著嫡箸擲磔謫躇", tyan: "頭荘莊", tyo: "著緒貯樗瀦猪苧屠箸儲佇墸杼楮潴竚紵豬躇迢", tyoku: "直勅捗飭敕矗稙躅陟隲", tyou: "長場調町重朝提張庁条登超丁聴塚鳥兆徴敏挑潮懲帳彫跳頂釣畳澄敦恰杓鯛樗凋喋寵帖弔暢牒眺脹腸蝶諜銚蔦吊挺釘貼肇傭仗佻冢剳嘲塲姚幀廳廰悵掉掟昶晁條梃樢沾渫漲澂甼疊疉疂疔稠窕笘箚糴糶聽膓萇蜩褶誂貂趙輒輙迢陦雕髫鬯鰈齠", tyouzame: "鰉", tyu: "厨酎丶廚蛛誅躊", tyun: "仲椿", tyutu: "朮黜", tyuu: "中住注沖仲駐忠柱昼宙虫抽丑厨痩衷註酎鋳紬肘紐偸儔冑冲廚惆晝狆疇畴稠籌籀紂綢胄舳蟄蟲誅躊鈕鍮鑄"
            , u: "生産保受売府得打有武防優守失請討撃右友芸羽植雨浮遊宇承布埋御雅熟綿憂祐芋烏迂卯鵜碓瓜苑餓飢享饗倦胡蒔椎笛菟膿伐佑于侑傴夘吁售嗚塢嫗孳抃挌挧掫搨搏擣擽桙沽燠盂磑碾禹糴紆茹藝謳賈賣餒饉饑齲", uba: "奪姥簒姆褫", ubu: "生産幼", ude: "腕", udewa: "釧", udon: "饂", ue: "上植樹殖筌", uezini: "殍", uga: "穿鑿", ugai: "漱", ugo: "動揺蕩搖盪蘯蠢蹌", ugoka: "撼", ugome: "蠕", ugui: "鯏", uguisu: "鴬鶯", uhu: "大", ui: "外初黄茴", uka: "泛", ukaga: "窺伺諜覗俔覘遉闖", ukanmuri: "宀", uke: "請筌", ukebako: "凵", uketamawa: "承", uki: "浮", ukibukuro: "鰾", ukikusa: "萍蘋", uma: "午馬甘旨巧甜", umai: "生", umaka: "圉", umare: "生", umaya: "厩廐廏", ume: "梅楳呻", umeki: "呻", umi: "海湖膿溟瀛", umu: "惓", umusa: "茂", un: "海運銀芸雲欝云怨吽慍暈殞紜繧耘薀藝蘊褞隕饂鶤", una: "海唸髫魘", unaga: "促", unagi: "鰻", unari: "唸", unazi: "項", unazu: "頷", une: "畦畝釆壟畆疇畴", uo: "魚", ura: "占浦裏怨憾恨卜裡麗怏惆悵慍慊", urakata: "卦", urami: "怨", urana: "占卜筮", uranai: "卜", urasi: "嬉", uraya: "羨", ure: "憂嬉愁戚邑恤悄悒憫閔", ureerusama: "忙", urei: "騒騷", uresi: "嬉", uri: "売瓜", uriyone: "糶", uroko: "鱗", uru: "売潤漆", uruo: "沢湿潤澤渥濡沾洽濕霑", urusakusyabe: "譫", urusi: "漆", uruti: "粳", uruu: "閏閠", uruwa: "彬斌麗", us: "欝鬱", usa: "総", usagi: "兎菟兔莵", usagiami: "罘", usagiuma: "驢", usi: "後牛丑", usina: "失", usio: "潮汐", usiro: "後", usitora: "艮", uso: "嘘獺鷽", usobu: "嘯", usu: "薄碓臼涼凉漓菲", usudu: "臼舂", usuginu: "紗繻", usugu: "腰", usutu: "舂", uta: "歌欧詩謡唄詠宴賦咏哥嘔歐謌謠謳", utaga: "疑", utage: "宴讌", utaime: "妓", utata: "転轉", utena: "台柎臺萼蕚", uti: "中内家打蔚裡", utibari: "梁", utigi: "袿", utikake: "袿褂裲", utiki: "袿褂", uto: "疎疏踈", utta: "訴愬諍", utu: "空転映移写虚欝蔚遷槍冩寫徙拊暎鬱熨轉", utubari: "梁", utubo: "靭笂靫靱", utuku: "美娃佼倩妍姚婉窕", utukusi: "旺", utumu: "俯", utuo: "靫靱", utuwa: "器噐", uwa: "上", uwabami: "蠎蟒", uwagoto: "譫", uwagusuri: "釉", uwasa: "噂", uyama: "敬", uyauya: "恭", uzi: "氏牛蛆", uzu: "水埋渦填疼", uzuku: "踞", uzukuma: "蹲", uzumaki: "巴", uzura: "鶉", uzutaka: "堆"
            , wa: "十二大分発方話和際別割早葉環花訪丸久弁速波破羽王輪房盤我華把娃蛙劃窪詑杷琶磐沸湧涌倭鷲詫佗侘辨辧哇啝夥夬洶滕濆瓣窩苡萵辯鐚鐶靡", wabi: "詫佗侘", wadakama: "蟠", wadako: "和", wadati: "轍", wadatii: "轍", waga: "我吾綰", wage: "髷鬟", wai: "合賄隈歪匯淮猥矮穢薈", waka: "判解別若幼稚頒夭嫩觧", wakanmuri: "冖", wakare: "訣", wakazini: "夭殀殤", wake: "分訳脇譯", waki: "脇刀傍湧腋", wakibasa: "挟挾掖", wakigi: "輒輙", wakima: "弁辨辧瓣辯", wakka: "稚", wako: "若", waku: "若沖惑枠稚或湧冲蠖", wame: "喚諤", wan: "湾腕椀碗彎弯灣綰蜿豌", wana: "罠羂", wanana: "戦", wani: "丸鰐", wara: "原春笑稿穣藁听呵哂嗤稈稾穰", warabe: "童竣僮", warabi: "蕨", warawa: "竣妾", warazi: "鞋", warazimusi: "蟠", ware: "台我吾俺臺", wari: "割張", warihu: "質劵卩貭", waru: "悪兇惡慝獰", warugasiko: "狡猾獪黠", wasa: "沢", wase: "鷲", wasi: "儂雕", wasu: "忘諠", wata: "原済渡渉乱幡弥綿棉亙亘亂彌濟絖絮緜蹊竟", wataire: "袍", watakusi: "私厶", watana: "渡", watanabe: "競", watara: "渡", watari: "渡", wataru: "海済航超弥杭亘恆", watasi: "済私", watu: "斡和", waza: "業技態芸伎藝", wazaogi: "伎妓伶倡", wazawa: "災妖", wazawai: "禍夭殃", wazuka: "僅纔", wazura: "患擾煩", wazurawa: "数數", wo: "乎于"
            , ya: "三合八田野家安屋止病宅谷夜央辞遣焼養草柳寝也矢露泰亜弥悦哉乎蛇箭痩埜罷焚冶爺耶墅寢已弭彌揶椰歇歟烙煬熄燒燔燬疚窶蠱輟輻辭鵺", yaado: "碼", yaaru: "碼", yabu: "敗破壊薮毀壞敝硅籔藪", yabusa: "吝嗇", yabusaka: "悋", yado: "宿舎舍", yagate: "軅軈", yagi: "柳", yagura: "櫓艪", yahazu: "筈", yai: "焼柳", yaiba: "刃刄", yaito: "灸", yakai: "輩", yakama: "喧", yakara: "属輩屬", yakata: "館舘", yake: "宅宿", yaki: "焼燒", yakigari: "焚", yakko: "奴", yaku: "約役益薬訳躍疫灼亦厄喊奕扼櫟檪籥繹葯藥譯軛鑰阨隘龠", yakusyo: "庁廨廳廰", yama: "山岾疚", yamadori: "翰", yamaguwa: "柘", yamai: "病痾", yamainu: "犲豺", yamanasi: "杜棠", yamanire: "梗", yamanokatati: "嶐", yamato: "倭", yami: "闇", yamome: "孀鰥", yamoo: "鰥", yan: "山陽", yana: "柳柵楊梁簗", yanagi: "柳楊", yanai: "柳", yano: "山", yara: "萢", yarai: "柵", yari: "槍鎗鑓", yasa: "優易", yase: "憔瘠", yasi: "椰", yasiki: "邸廛", yasina: "養飴豢", yasiro: "社廟", yasu: "保和安育楽易休健康彦恵裕妥慶仁寿泰那祥芳恭鳩奉靖烈宴匡秦賎坦悌寧又庸倭恬綏賤", yasura: "恬", yasuri: "鑢", yasusi: "保健康純泰恭靖欣悌寧", yat: "八", yati: "八萢", yato: "雇傭", yatu: "八勉奴扮悴忰憔", yawa: "和柔軟輯穆燮諧", yawara: "雍", yawaragu: "凱廱", yaya: "稍", yaziri: "鏑鏃", yo: "四上代米世予止能由夫与葉良好洋呼夜吉寄除読余因善避拠陽依預誉隠訓嘉弥酔詠於寓乎撚輿羊蓉豫仍倚凭丗咏憑搓據攀歟淤畭籀綯縒譱臾舁與蕷誦譽讀醉閼隱靠飫餘饒馮", yobina: "号號", yoboru: "伸", yobu: "呼", yodare: "涎", yodo: "淀澱", yogo: "汚", yoi: "生嘉酔誼宵俶懿臧", yoikane: "鉚", yoko: "横", yokogi: "軫", yokoito: "緯", yokome: "网", yokosi: "邪", yokosima: "咼佞侫", yoku: "抑欲翌浴翼臆慾沃峪弋杙翊閾", yoma: "米", yome: "嫁娵", yomi: "読嘉詁", yomigae: "蘇甦蘓", yomo: "智", yomogi: "蓬艾蒿蕭", yon: "四鎔", yona: "米汰淘", yonageru: "沙", yone: "米", yonedo: "粐", yonkasira: "网", yono: "米", yori: "自和寄従賀頼順依於閑撚于从從", yoro: "寄宜鎧蹌蹣", yoroi: "鎧冑", yoroko: "喜歓慶煕悦欣僖兌忻怡憙懌懽歡熈驩熙", yorozu: "万萬", yoru: "夜仍仗", yose: "寄", yosi: "新理意成勝和元次福領能由義可美優愛英良好洋吉憲伊賀喜幸香順善徳儀彦栄貴宣功純敬宗孝充雅哲快慶克至仁兄啓昌詳泰嘉剛祥芳芦悦佳宜恭圭桂巧祐亮惟允艶馨巌欣欽芹薫慈叔淑膳悌禎如寧彬甫睦麗禄巖譱艷葭萬蘆", yosimi: "美嘉誼媾", yosoo: "装扮妝裝", yosuga: "縁", yot: "四", yoti: "頼", yotu: "四", yotugi: "胄", you: "八用要容領応葉様洋雄養栄陽曜揚揺桜腰菜幼踊擁溶鷹謡瑛厭桶暢銚蝿湧涌猷傭妖庸楊熔窯羊耀蓉遥沃丿佻佯俑咬壅夭姚孕幺廱徭徼怏恙慂慵應拗揄搖杳昜暎暘曄榮榕樣櫻殀殃漾瀁煬燿犹瑶瓔珱甬痒瘍癢癰穃窈窕窰纓罌膺臾蛹蠅謠踰踴邀酊酩醺鎔雍霙靨鞅頌飫魘鱶鷂鸚遙瑤", youhen: "幺", youyaku: "稍", yowa: "齢弱歯嬬孱懦羸齒齡", yowai: "歳歯脆齒", yozi: "捩", yu: "行百世結有輸由優与雄友油幸温遊裕夕揺露往宙湯諭唯猶弓癒憂逝愉愈佑悠揖柚湧涌侑兪喩彌徃徂揄搖楡渝瑜疣瘉肬腴臾茹萸蕕蝓覦諛踰逾邁閖雍鼬", yubi: "指", yubukuro: "韜", yuda: "委", yudame: "弼檠", yue: "故", yuga: "歪咼", yugi: "靭靫靱", yuha: "弭", yui: "結由遺維唯惟", yuka: "床牀", yukari: "縁紫", yuki: "行千元世展歩介将維喜志幸順徳之敬雪祥征恭亨晋靭如侑夊裄", yuku: "行之", yukuha: "的", yume: "夢梦", yumi: "歩之弓", yumibukuro: "韜", yuri: "岼", yuru: "万許聴緩釈寛恕弛宥綽聽萬釋", yuruga: "忽", yurusu: "允", yusu: "濯梼嗽", yuta: "豊寛豐", yutaka: "豊温裕浩泰寛穣穰胖饒", yuu: "結有由夫優雄融右友油熊遊郵裕誘夕諭勇猶輔憂祐郁厭酉楢鮪又尤愉佑宥幽悠揖柚湧涌猷邑侑俑囮囿岫悒拗揄攸梍游犹疣肬莠蕕蚰蛔蝣迪釉黝鼬", yuumesi: "餔", yuwai: "祝", yuzu: "譲禅遜柚禪讓", yuzuri: "譲", yuzuriha: "杠"
            , za: "三座蔵坂謝戯坐挫蓙", zabu: "三", zae: "三", zai: "在財材罪剤劑薺戝", zakana: "魚", zaki: "咲鷽", zako: "廻", zaku: "雀", zakuro: "榴", zan: "残暫惨斬鱒塹嶄巉慙慚懺懴槧殘竄纔讒鏨", zaru: "猿笊", zatu: "雑襍雜", ze: "慮是膳", zei: "税勢説城泉脆噬橇毳筮蚋蛻", zeki: "関", zen: "前全然善泉銭斬蝉賎漸禅繕膳楠冉喘懦禪譱苒蠕襌褝賤髯", zeni: "銭湶錢", zenisasi: "緡繦", zenmai: "薇", zero: "零", zeti: "鞨", zetu: "絶舌蚋", zi: "二人出事自時地治道持次示路仕良字値児除寺締辞遅樹染智茨似仁滋耳寿磁芽稚餌茅侍慈爾璽痔而蒔甚陀馳弐迩冶亊弍兒塒壽孳尓岻峙怩恃珥畤穉膩臑茲貳貮轜辭邇雉", zii: "爺", zika: "直", zikara: "力", ziki: "直食境喰寔", ziku: "軸竺宍柚忸肭舳衄衂", zime: "占", zin: "人神志陣臣仁尽沈珍尋刃辰鎮妊稔荏塵壬甚腎訊迅靭侭仞仭儘儿刄姙恁椹潯潭燼盡糂荵蕈蕁衽袵靫靱", zine: "笹", zinkou: "樒櫁", ziretta: "懊", zirusi: "印", zisya: "轜", ziti: "姪", zitu: "日実實昵衵十", zizi: "爺", zizii: "爺", zo: "三初染沿須", zoi: "添", zoki: "位", zoku: "続族財属俗粟賊嗾屬簇續蔟蜀戝鏃", zome: "染", zon: "存", zono: "園薗", zore: "嵐", zou: "三増藤造象蔵雑像贈臓曽篠曾曹憎橡慥筱臟臧艢藏襍雜", zu: "事手主都集済住頭図津鈴刷尽鶴尋豆擦瑞厨逗杜弗亊圖廚荼荳蚓誦連付積詰漬", zubon: "袴", zui: "泉随瑞髄蕊惴隋膸蘂蕋隨陏髓", zuimusi: "螟", duka: "塚使遣疲", duke: "付漬附", duki: "付築筑", duku: "造作", dukuri: "造作", dume: "詰都", dura: "辛", duta: "伝", duto: "勤", dutu: "砲宛", zuke: "野", zuki: "月附", zukin: "帽", zuma: "妻瀦", zumi: "水済積角泉棲曇", zumo: "雲", zuna: "網", zura: "面", zure: "連", zuri: "刷摺", zuru: "狡", zusa: "総總", zya: "写邪戯蛇惹耶闍麝", zyaku: "着若弱寂廻惹雀柘嫋搦擲瘠簀蒻藉鉐鵲鶸", zyan: "雀", zyo: "受女助除序徐藷叙恕鋤汝如舒抒敍敘絮耡茹莇", zyoi: "高", zyoku: "辱濁搦溽縟耨蓐褥", zyou: "上生場定成情状常乗門条城盛静縄譲娘丈剰浄壌畳蒸靖尉允嘗丞冗嬢擾杖穣醸錠茸帖牒鄭溺捻肇乘仍仗佻剩塲壤奘嫋嫦嬲嫐孃弉拯掟掾撓攘晟條橈淨滌烝犹甞疊疉疂禳穰絛繞繩聶蕘蟐蟯襄諚讓趙躡遶釀鑷靜饒驤", zyu: "入数受住授従就習樹需寿儒呪綬酋雛竪嬬濡鷲从儔咒壽孺從懦戍洳籀臑蠕襦誦豎躊頌", zyuku: "塾熟粥孰耨", zyun: "準順旬純巡准淳潤盾絢閏循楯殉遵醇惇馴隼凖徇恂洵筍笋荀詢閠鶉", zyutu: "術述恤戌朮十", zyuu: "十重住従充銃渋寿柔縦拾汁什戎獣瀞廿紐从從忸戉揉澁澀狃獸糅絨絛縱蹂鈕鞣", zyuumata: "支"
        }

        /**
         *  Look-up hash with transliteration sequences for getKanaFromRomaji method
         *
         *  @type Object
         *  @scope private
         */
        , Rom = {}
        /**
         *  RegExps for romaji syllables' matching
         *
         *
         */
        , reRomHira
        , reRomKata
    /**
    *  Replaces transliteration with corresponding kanas
    *
    *  @param {String} s
    *  @return {Array, Null} null if nothing matches or array with hiragana and katakana substitutions
    */
    var getKanaFromRomaji = function (s) {
        var h, k, rez
        if (rez = Rom[s]) return rez;
        h = s.replace(reRomHira, function ($0) {
            return Rom[$0][0]
        })
        k = s.replace(reRomKata, function ($0) {
            return Rom[$0][1]
        })
        return [h, k]
    }
    /**
     *  Builds suggestions list for the current buffer
     *
     *  @param {String} str string for checking matches
     *  @return {Array} new buffer and size of the selection
     *  @scope private
     */
    var prepareIME = function (str) {
        var kz
            , rePTKSC = /.[ptksc]$/
            , lc = str.toLowerCase()
            , lcslice;
        var arr = getKanaFromRomaji(lc);
        if (arr == null)
            return [str, str.length];
        if (rePTKSC.test(lc)) {
            lcslice = lc.slice(0, -1);
            kz = INPArr[lc = lcslice + 'tu'] || INPArr[lc = lcslice + 'ku']
        } else {
            kz = INPArr[lc]
        }
        VirtualKeyboard.IME.show(!kz ? arr
            : arr.concat((typeof kz == 'string') ? INPArr[lc] = kz.split('') : kz)
        )
        return [str, str.length]
    }
    /**
     *  Callback to process keyboard input in the current IME style
     *
     *  @see VirtualKeyboard.processChar
     *  @param {String} chr current input char
     *  @param {String} buf actual processing buffer
     *  @return {Array} new buffer contents and length
     *  @scope protected
     */
    self.processChar = function (chr, buf) {
        var num, str, arr, kz
            , IME = VirtualKeyboard.IME
            , reABC = /[A-z']/
        if (chr == '\u0008') { // backspace
            if (buf && (str = buf.slice(0, -1))) {
                return prepareIME(str)
            } else {
                IME.hide()
                return ['', 0] //total delete; some other cases
            }
        } else if (chr.charCodeAt() == 10) { //non backspace
            if (buf == '')
                return [chr, 0]
            str = IME.getChar(1)
            if (!str) { //no such variant
                return [buf + chr, 0]
            } else {
                IME.hide();
                return [str, 0]
            }
        } else if (isFinite(num = parseInt(chr))) { // hira/kata/kanzi
            if (buf == '')
                return [chr, 0]
            str = IME.getChar(num);
            if (!str) { //no such variant
                return [buf, buf.length]
            } else {
                IME.hide();
                return [str, 0]
            }
        } else if (reABC.test(chr)) { //abc input
            str = buf + chr
            return prepareIME(str)
        } else { //"blanks"
            str = (IME.getSuggestions()[0] || '') + chr
            IME.hide()
            return [str, 0]
        }
    }
    /**
     *  IME constructor
     *
     *  @scope private
     */
    var _construct = function () {
        var RomSum = []
            , aChoon = []
            , aSokuon = []
            , aChoonSokuon = []
            , dbi, dbi0
            , vowel, hiraVowel
            , kz, kzNew
            , sRomN = "n'(?=[aeiouy])|n(?=$|[^yaeiou])|"
            , sxtu = "|la|xa|li|xi|lu|xu|le|xe|lo|xo|lya|xya|lyu|xyu|lyo|xyo|ltu|xtu"
            , reNihonSiki = /sy|si|zy|zi|dy|di|du|ty|ti|tu|hu/g
            , hashNihonSiki = { sy: "sh", si: "shi", zy: "j", zi: "ji", dy: "j", di: "ji", du: "zu", ty: "ch", ti: "chi", tu: "tsu", hu: "fu" }
            , dbRom2Kana = [["a", "あ", "ア"], ["i", "い", "イ"], ["u", "う", "ウ"], ["e", "え", "エ"], ["o", "お", "オ"], ["ka", "か", "カ"], ["ki", "き", "キ"], ["ku", "く", "ク"], ["ke", "け", "ケ"], ["ko", "こ", "コ"], ["sa", "さ", "サ"], ["shi", "し", "シ"], ["si", "し", "シ"], ["su", "す", "ス"], ["se", "せ", "セ"], ["so", "そ", "ソ"], ["ta", "た", "タ"], ["chi", "ち", "チ"], ["tsu", "つ", "ツ"], ["te", "て", "テ"], ["to", "と", "ト"], ["na", "な", "ナ"], ["ni", "に", "ニ"], ["nu", "ぬ", "ヌ"], ["ne", "ね", "ネ"], ["no", "の", "ノ"], ["ha", "は", "ハ"], ["hi", "ひ", "ヒ"], ["fu", "ふ", "フ"], ["he", "へ", "ヘ"], ["ho", "ほ", "ホ"], ["ma", "ま", "マ"], ["mi", "み", "ミ"], ["mu", "む", "ム"], ["me", "め", "メ"], ["mo", "も", "モ"], ["ya", "や", "ヤ"], ["yu", "ゆ", "ユ"], ["yo", "よ", "ヨ"], ["ra", "ら", "ラ"], ["ri", "り", "リ"], ["ru", "る", "ル"], ["re", "れ", "レ"], ["ro", "ろ", "ロ"], ["wa", "わ", "ワ", "ウァ", "うぁ"], ["n", "ん", "ン"], ["ga", "が", "ガ"], ["gi", "ぎ", "ギ"], ["gu", "ぐ", "グ"], ["ge", "げ", "ゲ"], ["go", "ご", "ゴ"], ["za", "ざ", "ザ"], ["ji", "じ", "ジ"], ["zi", "じ", "ジ"], ["zu", "ず", "ズ"], ["ze", "ぜ", "ゼ"], ["zo", "ぞ", "ゾ"], ["da", "だ", "ダ"], ["di", "ぢ", "ヂ", "でぃ", "ディ"], ["du", "づ", "ヅ"], ["de", "で", "デ"], ["do", "ど", "ド"], ["ba", "ば", "バ"], ["bi", "び", "ビ"], ["bu", "ぶ", "ブ"], ["be", "べ", "ベ"], ["bo", "ぼ", "ボ"], ["pa", "ぱ", "パ"], ["pi", "ぴ", "ピ"], ["pu", "ぷ", "プ"], ["pe", "ぺ", "ペ"], ["po", "ぽ", "ポ"], ["kya", "きゃ", "キャ"], ["kyu", "きゅ", "キュ"], ["kyo", "きょ", "キョ"], ["sha", "しゃ", "シャ"], ["shu", "しゅ", "シュ"], ["sho", "しょ", "ショ"], ["sya", "しゃ", "シャ"], ["syu", "しゅ", "シュ"], ["syo", "しょ", "ショ"], ["cha", "ちゃ", "チャ"], ["chu", "ちゅ", "チュ"], ["cho", "ちょ", "チョ"], ["tya", "ちゃ", "チャ"], ["tyo", "ちょ", "チョ"], ["nya", "にゃ", "ニャ"], ["nyu", "にゅ", "ニュ"], ["nyo", "にょ", "ニョ"], ["hya", "ひゃ", "ヒャ"], ["hyu", "ひゅ", "ヒュ"], ["hyo", "ひょ", "ヒョ"], ["mya", "みゃ", "ミャ"], ["myu", "みゅ", "ミュ"], ["myo", "みょ", "ミョ"], ["rya", "りゃ", "リャ"], ["ryu", "りゅ", "リュ"], ["ryo", "りょ", "リョ"], ["gya", "ぎゃ", "ギャ"], ["gyu", "ぎゅ", "ギュ"], ["gyo", "ぎょ", "ギョ"], ["ja", "じゃ", "ジャ", "ぢゃ", "ヂャ"], ["ju", "じゅ", "ジュ", "ぢゅ", "ヂュ"], ["jo", "じょ", "ジョ", "ぢょ", "ヂョ"], ["zya", "じゃ", "ジャ"], ["zyu", "じゅ", "ジュ"], ["zyo", "じょ", "ジョ"], ["dya", "ぢゃ", "ヂャ"], ["dyu", "ぢゅ", "ヂュ"], ["dyo", "ぢょ", "ヂョ"], ["bya", "びゃ", "ビャ"], ["byu", "びゅ", "ビュ"], ["byo", "びょ", "ビョ"], ["pya", "ぴゃ", "ピャ"], ["pyu", "ぴゅ", "ピュ"], ["pyo", "ぴょ", "ピョ"], ["ye", "いぇ", "イェ"], ["we", "うぇ", "ウェ", "ヱ"], ["wi", "うぃ", "ウィ", "ヰ"], ["wo", "ウォ", "うぉ"], ["kwa", "くぁ", "クァ"], ["kwi", "くぃ", "クィ"], ["kwe", "くぇ", "クェ"], ["kwo", "くぉ", "クォ"], ["kwa", "くぁ", "クァ", "くゎ", "クヮ"], ["she", "しぇ", "シェ"], ["che", "ちぇ", "チェ"], ["tsa", "つぁ", "ツァ"], ["tsi", "つぃ", "ツィ"], ["tse", "つぇ", "ツェ"], ["tso", "つぉ", "ツォ"], ["tsyu", "つゅ", "ツュ"], ["ti", "てぃ", "ティ", "ち", "チ"], ["tyu", "てゅ", "テュ", "ちゅ", "チュ"], ["tu", "とぅ", "トゥ", "つ", "ツ"], ["nye", "にぇ", "ニェ"], ["hye", "ひぇ", "ヒェ"], ["hu", "ふ", "フ", "ホゥ"], ["fa", "ふぁ", "ファ"], ["fi", "ふぃ", "フィ"], ["fe", "ふぇ", "フェ"], ["fo", "ふぉ", "フォ"], ["fye", "ふぃぇ", "フィェ"], ["fya", "ふゃ", "フャ"], ["fyu", "ふゅ", "フュ"], ["fyo", "ふょ", "フョ"], ["mye", "みぇ", "ミェ"], ["rye", "りぇ", "リェ"], ["vu", "ゔ", "ヴ"], ["va", "ゔぁ", "ヴァ", "ヷ"], ["vi", "ゔぃ", "ヴィ", "ヸ"], ["ve", "ゔぇ", "ヴェ", "ヹ"], ["vo", "ゔぉ", "ヴォ", "ヺ"], ["vye", "ゔぃぇ", "ヴィェ"], ["vya", "ゔゃ", "ヴャ"], ["vyu", "ゔゅ", "ヴュ"], ["vyo", "ゔょ", "ヴョ"], ["gye", "ぎぇ", "ギェ"], ["gwa", "ぐぁ", "グァ", "げょ", "グヮ"], ["gwi", "ぐぃ", "グィ"], ["gwe", "ぐぇ", "グェ"], ["gwo", "ぐぉ", "グォ"], ["geo", "げぉ", "ゲォ"], ["geyo", "げょ", "ゲョ"], ["je", "じぇ", "ジェ"], ["dyu", "でゅ", "デュ"], ["du", "どぅ", "ドゥ", "ず", "ズ"], ["bye", "びぇ", "ビェ"], ["pye", "ぴぇ", "ピェ"]]

        i = 0;
        for (kz in INPArr) {
            if (reNihonSiki.test(kz)) {
                i++;
                kzNew = kz.replace(reNihonSiki, function ($0) { return hashNihonSiki[$0] })
                if (INPArr[kzNew]) INPArr[kzNew] += INPArr[kz]
                else INPArr[kzNew] = INPArr[kz]
            }
        }
        INPArr.aduma = "東";
        INPArr.du = "連付頭積図詰尽鶴漬";
        INPArr.idu = "出厳";
        INPArr.kadu = "一和";
        INPArr.di = "治痔";
        var addKanas = function (hira, kata, sokuon) {
            var kanas 　= [dbi[1] + hira, dbi[2] + kata]
            if (dbi.length > 4) kanas.push(dbi[3] + hira, dbi[4] + kata)
            else if (dbi.length > 3) kanas.push(dbi[3] + kata)
            Rom[dbi0 + 'k'] = Rom[dbi0 + 's'] = Rom[dbi0 + 't'] = Rom[dbi0 + 'p'] = Rom[dbi0 + 'c'] = kanas
            sokuon.push(dbi0 + 'k(?=k|$)', dbi0 + 's(?=s|$)', dbi0 + 't(?=ch|t|$)', dbi0 + 'c(?=ch|$)', dbi0 + 'p(?=p|$)')
        }

        for (var i = 0, drkL = dbRom2Kana.length; i < drkL; i++) {
            dbi = dbRom2Kana[i]
            dbi0 = dbi[0]
            Rom[dbi0] = dbi.slice(1)
            if (dbi0 != 'n') {
                addKanas('っ', 'ッ', aSokuon)
                RomSum.push(dbi0)
                vowel = dbi0.slice(-1)
                if (vowel == 'o') vowel = 'u'
                dbi0 += vowel
                hiraVowel = Rom[vowel][0]
                Rom[dbi0] = [dbi[1] + hiraVowel, dbi[2] + 'ー']
                if (dbi.length > 4)
                    Rom[dbi0].push(dbi[3] + hiraVowel, dbi[4] + 'ー')
                else if (dbi.length > 3)
                    Rom[dbi0].push(dbi[3] + 'ー')
                aChoon.push(dbi0)
                addKanas(hiraVowel + 'っ', 'ーッ', aChoonSokuon)
            }
        }
        Rom["n'"] = Rom.n;
        Rom.wo.unshift("を", "ヲ");
        Rom.la = Rom.xa = ["ぁ", "ァ"];
        Rom.li = Rom.xi = ["ぃ", "ィ"];
        Rom.lu = Rom.xu = ["ぅ", "ゥ"];
        Rom.le = Rom.xe = ["ぇ", "ェ"];
        Rom.lo = Rom.xo = ["ぉ", "ォ"];
        Rom.lya = Rom.xya = ["ゃ", "ャ"];
        Rom.lyu = Rom.xyu = ["ゅ", "ュ"];
        Rom.lyo = Rom.xyo = ["ょ", "ョ"];
        Rom.ltu = Rom.xtu = ["っ", "ッ"];
        reRomHira = RegExp(sRomN
            + aSokuon.join("|")
            + "|" + RomSum.join("|")
            + sxtu
            , "g");
        reRomKata = RegExp(sRomN
            + aChoon.join("|")
            + "|" + aSokuon.join("|")
            + "|" + aChoonSokuon.join("|")
            + "|" + RomSum.join("|")
            + sxtu
            , "g");
    }
    _construct();
};

/**
 * $Id$
 *
 * Korean IME implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2007-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
Langs.KR = new function () {
    var self = this;
    self.Jamo = { 'ㄱ': [14, 44032, 1], 'ㄲ': [6, 44620, 2], 'ㄳ': [4, -1, 3], 'ㄴ': [14, 45208, 4], 'ㄵ': [4, -1, 5], 'ㄶ': [4, -1, 6], 'ㄷ': [6, 45796, 7], 'ㄸ': [2, 46384, 0], 'ㄹ': [14, 46972, 8], 'ㄺ': [4, -1, 9], 'ㄻ': [4, -1, 10], 'ㄼ': [4, -1, 11], 'ㄽ': [4, -1, 12], 'ㄾ': [4, -1, 13], 'ㄿ': [4, -1, 14], 'ㅀ': [4, -1, 15], 'ㅁ': [6, 47560, 16], 'ㅂ': [14, 48148, 17], 'ㅃ': [2, 48736, 0], 'ㅄ': [4, -1, 18], 'ㅅ': [14, 49324, 19], 'ㅆ': [6, 49912, 20], 'ㅇ': [6, 50500, 21], 'ㅈ': [6, 51088, 22], 'ㅉ': [2, 51676, 0], 'ㅊ': [6, 52264, 23], 'ㅋ': [6, 52852, 24], 'ㅌ': [6, 53440, 25], 'ㅍ': [6, 54028, 26], 'ㅎ': [6, 54616, 27], 'ㅏ': [1, 0, 0], 'ㅐ': [1, 28, 0], 'ㅑ': [1, 56, 0], 'ㅒ': [1, 84, 0], 'ㅓ': [1, 112, 0], 'ㅔ': [1, 140, 0], 'ㅕ': [1, 168, 0], 'ㅖ': [1, 196, 0], 'ㅗ': [1, 224, 0], 'ㅛ': [1, 336, 0], 'ㅜ': [1, 364, 0], 'ㅠ': [1, 476, 0], 'ㅡ': [1, 504, 0], 'ㅣ': [1, 560, 0] }
    self.VV2V = [0, 0, 0, 0, 0, 0, 0, 0, 0, 224, 224, 224, 0, 0, 364, 364, 364, 0, 0, 504, 0]
    self.V2VV = [0, 0, 0, 0, 0, 0, 0, 0, { 'ㅏ': 252, 'ㅐ': 280, 'ㅣ': 308 }, 0, 0, 0, 0, { 'ㅓ': 392, 'ㅔ': 420, 'ㅣ': 448 }, 0, 0, 0, 0, { 'ㅣ': 532 }, 0, 0]
    self.CV2C = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split('')
    self.C2CC = { 'ㄱ': 'ㄲ', 'ㄷ': 'ㄸ', 'ㅂ': 'ㅃ', 'ㅅ': 'ㅆ', 'ㅈ': 'ㅉ' }
    self.CC2C = { 'ㄲ': 'ㄱ', 'ㄸ': 'ㄷ', 'ㅃ': 'ㅂ', 'ㅆ': 'ㅅ', 'ㅉ': 'ㅈ' }
    self.PP2P = [0, 0, 1, 1, 0, 4, 4, 0, 0, 8, 8, 8, 8, 8, 8, 8, 0, 0, 17, 0, 19, 0, 0, 0, 0, 0, 0, 0]
    self.PP2PC = [0, [0, 44032], [0, 44620], [1, 49324], [0, 45208], [4, 51088], [4, 54616], [0, 45796], [0, 46972], [8, 44032], [8, 47560], [8, 48148], [8, 49324], [8, 53440], [8, 54028], [8, 54616], [0, 47560], [0, 48148], [17, 49324], [0, 49324], [0, 49912], [0, 50500], [0, 51088], [0, 52264], [0, 52852], [0, 53440], [0, 54028], [0, 54616]]
    self.P2PP = [0, { 'ㄱ': 2, 'ㅅ': 3 }, 0, 0, { 'ㅈ': 5, 'ㅎ': 6 }, 0, 0, 0, { 'ㄱ': 9, 'ㅁ': 10, 'ㅂ': 11, 'ㅅ': 12, 'ㅌ': 13, 'ㅍ': 14, 'ㅎ': 15 }, 0, 0, 0, 0, 0, 0, 0, 0, { 'ㅅ': 18 }, 0, { 'ㅅ': 20 }, 0, 0, 0, 0, 0, 0, 0, 0]

    /**
     * 1 -sh
     * 2 -jot
     * 4 -w
     * 8 -
     * 16 -
     */
    self.flags = 0 //for some crosstalk

    self.parseHangul = function (bufchar) {
        if (bufchar == '' || bufchar.length > 1) return null
        var code = bufchar.charCodeAt()
        if (code < 0x3131 || code > 0xD7A3) return null // non Korean buffer
        else if (code < 0x314F && code > 0x3130) return [self.Jamo[bufchar][1], -1, 0] // consonant in buffer
        code -= 44032
        var arr = []
        arr[0] = 44032 + 588 * (code / 588 >> 0)
        code %= 588
        arr[1] = 28 * (code / 28 >> 0)
        arr[2] = code % 28
        return arr
    }
    self.charProcessor = function (chr, buf, CVC, rukbd) {
        var jamo = self.Jamo[chr]
        if (!CVC) CVC = self.parseHangul(buf)
        if (CVC == null) {
            if (!jamo) {
                return [chr, 0]
            } else {
                if (jamo[0] & 2) return [chr, 1] //can start a syllable
                else return [chr, 0]
            }
        } else { // full buf
            if (chr == '\u0008') {
                if (CVC[2]) {
                    return [String.fromCharCode(CVC[0] + CVC[1] + self.PP2P[CVC[2]]), 1]
                } else if (CVC[1] > -1) {
                    var VV2V = self.VV2V[CVC[1] / 28]
                    if (VV2V)
                        return [String.fromCharCode(CVC[0] + VV2V), 1]
                    else
                        return [self.CV2C[(CVC[0] - 44032) / 588], 1]
                } else if (self.CC2C[buf]) {
                    return [self.CC2C[buf], 1]
                } else {
                    self.flags = 0
                    return ['', 0]
                }
            } else if (!jamo) {
                self.flags = 0
                return [buf + chr, 0]
            } else if (CVC[2]) { // [CVC]
                if (jamo[0] & 2) { //[CVC] +C
                    var P2PP = self.P2PP[CVC[2]][chr]
                    if (P2PP) return [String.fromCharCode(CVC[0] + CVC[1] + P2PP), 1] // [CVCC]
                    else return [buf + chr, 1] // CVC, [C]
                } else if (jamo[0] & 1) {// [CVC] +V
                    if (rukbd && CVC[2] == 21)
                        return [buf + String.fromCharCode(50500 + jamo[1]), 1]

                    return [String.fromCharCode(CVC[0] + CVC[1] + self.PP2PC[CVC[2]][0])
                        + String.fromCharCode(self.PP2PC[CVC[2]][1] + self.Jamo[chr][1])
                        , 1] // CV(P) [PV]
                } else { // [CVC] + PP
                    return [buf + chr, 0]
                }
            } else if (CVC[1] > -1) { // [CV]
                self.flags &= ~3
                if (jamo[0] & 4) { // [CV] +P
                    return [String.fromCharCode(CVC[0] + CVC[1] + jamo[2]), 1] // [CVC]
                } else if (jamo[0] & 1) { // [CV]+V
                    if (rukbd) {
                        var vow
                        if (self.flags & 4 && (vow = '\u3153\u3154\u3163'.indexOf(chr)) != -1) {//weo, we, wi
                            self.flags &= ~4
                            return [String.fromCharCode(CVC[0] + [392, 308, 448][vow]), 1]
                        }
                    }
                    var V2VV = self.V2VV[CVC[1] / 28][chr]
                    if (V2VV) {// [CVV]
                        //self.flags &=~7
                        return [String.fromCharCode(CVC[0] + V2VV), 1]
                    } else {// CV,[V]
                        if (rukbd) {
                            //self.flags &=~7
                            return [buf + String.fromCharCode(50500 + jamo[1]), 1]
                        }
                        else return [buf + chr, 0]
                    }
                }
                else return [buf + chr, 1] //CV [C]
            } else if (jamo[0] & 1) {// [C] +V 
                return [String.fromCharCode(self.Jamo[buf][1] + jamo[1]), 1]
            } else { //[C]+C
                if (buf == chr && self.C2CC[buf]) return [self.C2CC[buf], 1]
                else return [buf + chr, 1]
            }
        }
    }
};

/**
 * $Id$
 *
 * Lakhota IME implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
Langs.LA = new function () {
    var self = this;
    var remap1 = {
        ga: 'ǧa', ge: 'ǧe', gi: 'ǧi', 'go': 'ǧo', gu: 'ǧu', Ga: 'Ʀa', Ge: 'Ʀe', GI: 'Ʀi', Go: 'Ʀo', Gu: 'Ʀu', GA: 'ƦA', GE: 'ƦE', GI: 'ƦI', GO: 'ƦO', GU: 'ƦU'
        , pha: 'p\u021fa', pho: 'p\u021fo', Pha: 'P\u021fa', Pho: 'P\u021fo', PHA: 'P\u021ea', PHo: 'P\u021eo'
        , tha: 't\u021fa', tho: 't\u021fo', Tha: 'T\u021fa', Tho: 'T\u021fo', THa: 'T\u021ea', THo: 'T\u021eo'
        , kha: 'k\u021fa', kho: 'k\u021fo', Kha: 'K\u021fa', Kho: 'K\u021fo', KHa: 'K\u021ea', KHo: 'K\u021eo'
        , "a'": 'á', "A'": 'Á', "e'": 'é', "E'": 'É', "i'": 'í', "I'": 'Í', "u'": 'ú', "U'": 'Ú', "o'": 'ó', "O'": 'Ó'
    }

        , remap4c = {
            'phun': 'pȟuŋ', 'Phun': 'Pȟuŋ', 'PHUN': 'PȞUŊ'
            , 'thun': 'tȟuŋ', 'Thun': 'Tȟuŋ', 'THUN': 'TȞUŊ'
            , 'khun': 'kȟuŋ', 'Khun': 'Kȟuŋ', 'KHUN': 'KȞUŊ'
            , 'phún': 'pȟúŋ', 'Phún': 'Pȟúŋ', 'PHÚN': 'PȞÚŊ'
            , 'thún': 'tȟúŋ', 'Thún': 'Tȟúŋ', 'THÚN': 'TȞÚŊ'
            , 'khún': 'kȟúŋ', 'Khún': 'Kȟúŋ', 'KHÚN': 'KȞÚŊ'
            , 'an': 'aŋ', 'An': 'Aŋ', 'AN': 'AŊ'
            , 'in': 'iŋ', 'In': 'Iŋ', 'IN': 'IŊ'
            , 'un': 'uŋ', 'Un': 'Uŋ', 'UN': 'UŊ'
            , 'án': 'áŋ', 'Án': 'Áŋ', 'ÁN': 'ÁŊ'
            , 'ín': 'íŋ', 'Ín': 'Íŋ', 'ÍN': 'ÍŊ'
            , 'ún': 'úŋ', 'Ún': 'Úŋ', 'ÚN': 'ÚŊ'
            , 'h': '\u021f', 'H': '\u021e'
        }

        , remap0 = {
            'phúŋ': 'pȟúŋ', 'Phúŋ': 'Pȟúŋ', 'PHÚ': 'PȞÚŊ'
            , 'thúŋ': 'tȟúŋ', 'Thú': 'Tȟúŋ', 'THÚŊ': 'TȞÚŊ'
            , 'khúŋ': 'kȟúŋ', 'Khúŋ': 'Kȟú', 'KHÚ': 'KȞÚŊ'
            , 'phúŋ': 'pȟúŋ', 'Phúŋ': 'Pȟú', 'PHÚ': 'PȞÚ'
            , 'thúŋ': 'tȟúŋ', 'Thúŋ': 'Tȟú', 'THÚŊ': 'TȞÚ'
            , 'khúŋ': 'kȟúŋ', 'Khúŋ': 'Kȟú', 'KHÚŊ': 'KȞÚ'
            , "p'": 'pʼ', "P'": 'Pʼ'
            , "k'": 'kʼ', "K'": 'Kʼ'
            , "t'": 'tʼ', "T'": 'Tʼ'
            , "c'": 'cʼ', "C'": 'Cʼ'
            , "s'": 'sʼ', "S'": 'Sʼ'
            , "š'": 'šʼ', "Š'": 'Šʼ'
            , "\u021f'": '\u021fʼ', "\u021e'": '\u021eʼ'
            , "h'": '\u021fʼ', "H'": '\u021eʼ'
        }

        , remap2 = {
            ph: 'ph', Ph: 'Ph', PH: 'PH'
            , th: 'th', Th: 'Th', TH: 'TH'
            , kh: 'kh', Kh: 'Kh', KH: 'KH'
            , an: 'an', An: 'An', AN: 'AN'
            , 'in': 'in', In: 'In', IN: 'IN'
            , un: 'un', Un: 'Un', UN: 'UN'
            , 'án': 'án', 'Án': 'Án', 'ÁN': 'ÁN'
            , 'ín': 'ín', 'Ín': 'Ín', 'ÍN': 'ÍN'
            , 'ún': 'ún', 'Ún': 'Ún', 'ÚN': 'ÚN'
        }

        , remap3 = {
            phu: 'phu', Phu: 'Phu', PHU: 'PHU'
            , thu: 'thu', Thu: 'Thu', THU: 'THU'
            , khu: 'khu', Khu: 'Khu', KHU: 'KHU'
            , "phu'": 'phú', "Phu'": 'Phú', "PHU'": 'PHÚ'
            , "thu'": 'thú', "Thu'": 'Thú', "THU'": 'THÚ'
            , "khu'": 'khú', "Khu'": 'Khú', "KHU'": 'KHÚ'
        }

        , remap4 = {
            'phun': 'phun', 'Phun': 'Phun', 'PHUN': 'PHUN'
            , 'thun': 'thun', 'Thun': 'Thun', 'THUN': 'THUN'
            , 'khun': 'khun', 'Khun': 'Khun', 'KHUN': 'KHUN'
            , 'phún': 'phún', 'Phún': 'Phún', 'PHÚN': 'PHÚN'
            , 'thún': 'thún', 'Thún': 'Thún', 'THÚN': 'THÚN'
            , 'khún': 'khún', 'Khún': 'Khún', 'KHÚN': 'KHÚN'
        }

        , remap = {};

    var __construct = function () {
        var i, k
        var cons = "ǧwštypsdghȟkl'zžčbnmǦWŠTPSDGH\u021eKLZŽČBNM".split('')
        var punct = " .,<>;:\"?`~1!2@3#4$5%6^7&8*9(0)-_=+\|\u00A0".split('')
        for (k in remap0) remap[k] = [remap0[k], 0]
        for (k in remap1) remap[k] = [remap1[k], 1]
        for (k in remap2) remap[k] = [remap2[k], 2]
        for (k in remap3) remap[k] = [remap3[k], 3]
        for (k in remap4) remap[k] = [remap4[k], 4]
        for (k in remap4c) {
            for (var i = 0, cL = cons.length; i < cL; i++)
                remap[k + cons[i]] = [remap4c[k] + (cons[i] == "'" ? "ʼ" : cons[i]), 1];
            for (var i = 0, pL = punct.length; i < pL; i++)
                remap[k + punct[i]] = [remap4c[k] + punct[i], 0];
        }
        // clear come memory
        remap0 = remap1 = remap2 = remap3 = remap4 = remap4c = null
        self.remap = remap;
    }
    __construct();
};

export { Langs };
const SrList = require('./classes/srList');

const ASSET = 'https://raw.githubusercontent.com/Tomartsh/Stremio-KanBoxAddon/main/assets/';
const LIVE = [
  ['il_kanTV_04', 'כאן 11', 'kan.jpg', 'https://n-121-7.il.cdn-redge.media/livehls/oil/kancdn-live/live/kan11/live.livx/playlist.m3u8'],
  ['il_kanTV_05', 'חינוכית', 'hinuchit.jpg', 'https://r.il.cdn-redge.media/livehls/oil/kancdn-live/live/kan_edu/live.livx/playlist.m3u8'],
  ['il_kanTV_07', 'שידורי ערוץ השידור הערבי', 'makan.png', 'https://r.il.cdn-redge.media/livehls/oil/kancdn-live/live/makan/live.livx/playlist.m3u8'],
  ['il_kan_TV_06', 'שידורי ערוץ הכנסת 99', 'knesset.png', 'https://kneset.gostreaming.tv/p2-kneset/_definst_/myStream/index.m3u8'],
  ['il_makoTV_01', 'מאקו ערוץ 12', 'LIVE_push_mako_tv.jpg', 'https://ll.cdn.mako.co.il/direct/hls/live/2033791/k12/index.m3u8'],
  ['il_24_01', 'ערוץ 24 חדשות', 'channel24_square.png', 'https://ll.cdn.mako.co.il/direct/hls/live/2035340/ch24live/index.m3u8'],
  ['il_reshetTV_01', 'רשת ערוץ 13', '13.jpg', 'https://dsk76kvc9kie6.cloudfront.net/media/87f59c77-03f6-4bad-a648-897e095e7360/mainManifest.m3u8'],
  ['il_14TV_01', 'ערוץ 14', '14square.png', 'https://ch14channel14.encoders.immergo.tv/app/2/streamPlaylist.m3u8'],
  ['il_ynetTv_01', 'שידור חי ynet', 'ynet.jpg', 'https://ynet-live-01.ynet-pic1.yit.co.il/ynet/live.m3u8']
];

const liveMeta = Object.fromEntries(LIVE.map(([id, name, image, url]) => [id, {
  id,
  type: 'tv',
  subtype: 'tv',
  name,
  poster: ASSET + image,
  background: ASSET + image,
  description: 'שידור חי',
  genres: ['Actuality'],
  streams: [{ url, name, title: name }]
}]));

const oldType = SrList.prototype.getMetasByType;
SrList.prototype.getMetasByType = function (type) {
  const result = oldType.call(this, type) || [];
  return type === 'tv' ? result.concat(Object.values(liveMeta)) : result;
};

const oldMeta = SrList.prototype.getMetaById;
SrList.prototype.getMetaById = async function (id) {
  if (liveMeta[id]) return liveMeta[id];
  return oldMeta.call(this, id);
};

const oldStreams = SrList.prototype.getStreamsById;
SrList.prototype.getStreamsById = async function (id) {
  if (liveMeta[id]) return liveMeta[id].streams;
  return oldStreams.call(this, id);
};

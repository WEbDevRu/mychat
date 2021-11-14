const { withTransaction } = require('../../utils/withTransaction');
const socket = require('../../utils/socket/socketEngine');
const { VIDEO_CONF_NEW_SDP_OFFER } = require('../../const/socket/EVENTS');

async function sendSDPOfferToRoom({ roomId, senderSocketId, offer }, { session } = {}) {
   const videoConfId = `videoConf:${roomId}`;

   socket.broadcastToRoom(videoConfId, VIDEO_CONF_NEW_SDP_OFFER, {
      offer,
      senderSocketId,
   })
}

exports.sendSDPOfferToRoom = sendSDPOfferToRoom;
exports.sendSDPOfferToRoom = withTransaction(sendSDPOfferToRoom);

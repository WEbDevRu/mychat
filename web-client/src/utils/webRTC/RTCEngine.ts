export class RTCEngine {
    private pc?:RTCPeerConnection;

    constructor() {
        this.pc = new RTCPeerConnection();
    }
}

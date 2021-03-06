"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugEnvironment = void 0;
const three_1 = require("three");
class DebugEnvironment extends three_1.Scene {
    constructor() {
        super();
        const geometry = new three_1.BoxGeometry();
        geometry.deleteAttribute('uv');
        const roomMaterial = new three_1.MeshStandardMaterial({ metalness: 0, side: three_1.BackSide });
        const room = new three_1.Mesh(geometry, roomMaterial);
        room.scale.setScalar(10);
        this.add(room);
        const mainLight = new three_1.PointLight(0xffffff, 50, 0, 2);
        this.add(mainLight);
        const material1 = new three_1.MeshLambertMaterial({ color: 0xff0000, emissive: 0xffffff, emissiveIntensity: 10 });
        const light1 = new three_1.Mesh(geometry, material1);
        light1.position.set(-5, 2, 0);
        light1.scale.set(0.1, 1, 1);
        this.add(light1);
        const material2 = new three_1.MeshLambertMaterial({ color: 0x00ff00, emissive: 0xffffff, emissiveIntensity: 10 });
        const light2 = new three_1.Mesh(geometry, material2);
        light2.position.set(0, 5, 0);
        light2.scale.set(1, 0.1, 1);
        this.add(light2);
        const material3 = new three_1.MeshLambertMaterial({ color: 0x0000ff, emissive: 0xffffff, emissiveIntensity: 10 });
        const light3 = new three_1.Mesh(geometry, material3);
        light3.position.set(2, 1, 5);
        light3.scale.set(1.5, 2, 0.1);
        this.add(light3);
    }
}
exports.DebugEnvironment = DebugEnvironment;

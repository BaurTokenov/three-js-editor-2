"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarProjectVideo = void 0;
const ui_1 = require("./libs/ui");
const app_1 = require("./libs/app");
function SidebarProjectVideo(editor) {
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setId('render');
    // Video
    container.add(new ui_1.UIText(strings.getKey('sidebar/project/video')).setTextTransform('uppercase'));
    container.add(new ui_1.UIBreak(), new ui_1.UIBreak());
    // Resolution
    const resolutionRow = new ui_1.UIRow();
    container.add(resolutionRow);
    resolutionRow.add(new ui_1.UIText(strings.getKey('sidebar/project/resolution')).setWidth('90px'));
    const videoWidth = new ui_1.UIInteger(1024).setTextAlign('center').setWidth('28px');
    resolutionRow.add(videoWidth);
    resolutionRow.add(new ui_1.UIText('×').setTextAlign('center').setFontSize('12px').setWidth('12px'));
    const videoHeight = new ui_1.UIInteger(1024).setTextAlign('center').setWidth('28px');
    resolutionRow.add(videoHeight);
    const videoFPS = new ui_1.UIInteger(30).setTextAlign('center').setWidth('20px');
    resolutionRow.add(videoFPS);
    resolutionRow.add(new ui_1.UIText('fps').setFontSize('12px'));
    // Duration
    const videoDurationRow = new ui_1.UIRow();
    videoDurationRow.add(new ui_1.UIText(strings.getKey('sidebar/project/duration')).setWidth('90px'));
    const videoDuration = new ui_1.UIInteger(10);
    videoDurationRow.add(videoDuration);
    container.add(videoDurationRow);
    // Render
    container.add(new ui_1.UIText('').setWidth('90px'));
    const progress = new ui_1.UIProgress(0);
    progress.setDisplay('none');
    progress.setWidth('170px');
    container.add(progress);
    const renderButton = new ui_1.UIButton(strings.getKey('sidebar/project/render')).setTextTransform('uppercase');
    renderButton.setWidth('170px');
    renderButton.onClick(() => __awaiter(this, void 0, void 0, function* () {
        renderButton.setDisplay('none');
        progress.setDisplay('');
        progress.setValue(0);
        const player = new app_1.APP.Player();
        player.load(editor.toJSON());
        player.setPixelRatio(1);
        player.setSize(videoWidth.getValue(), videoHeight.getValue());
        const canvas = player.dom.firstElementChild;
        //
        const { createFFmpeg, fetchFile } = FFmpeg; // eslint-disable-line no-undef
        const ffmpeg = createFFmpeg({ log: true });
        yield ffmpeg.load();
        ffmpeg.setProgress(({ ratio }) => {
            progress.setValue(ratio * 0.5 + 0.5);
        });
        const fps = videoFPS.getValue();
        const duration = videoDuration.getValue();
        const frames = duration * fps;
        let currentTime = 0;
        for (let i = 0; i < frames; i += 1) {
            player.render(currentTime);
            const num = i.toString().padStart(5, '0');
            ffmpeg.FS('writeFile', `tmp.${num}.png`, yield fetchFile(canvas.toDataURL()));
            currentTime += 1 / fps;
            progress.setValue((i / frames) * 0.5);
        }
        yield ffmpeg.run('-framerate', String(fps), '-pattern_type', 'glob', '-i', '*.png', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', String(5), 'out.mp4');
        const data = ffmpeg.FS('readFile', 'out.mp4');
        for (let i = 0; i < frames; i += 1) {
            const num = i.toString().padStart(5, '0');
            ffmpeg.FS('unlink', `tmp.${num}.png`);
        }
        save(new Blob([data.buffer], { type: 'video/mp4' }), 'out.mp4');
        player.dispose();
        renderButton.setDisplay('');
        progress.setDisplay('none');
    }));
    container.add(renderButton);
    // SAVE
    const link = document.createElement('a');
    function save(blob, filename) {
        if (link.href) {
            URL.revokeObjectURL(link.href);
        }
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.dispatchEvent(new MouseEvent('click'));
    }
    //
    return container;
}
exports.SidebarProjectVideo = SidebarProjectVideo;

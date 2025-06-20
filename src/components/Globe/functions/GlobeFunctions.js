import { dotRadius } from './GeometryUtils';
import { createInstancedDots, createSpecialDots } from './GlobeMeshes';
import ghUrl from '../../Utils/ghrul'

export function addGlobePoints(sceneRef, specialPoints) {
    return new Promise((resolve) => {
        const radius = dotRadius();
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = ghUrl('/src/Images/wmap.png');
        img.onload = () => {
            const { data, width, height } = extractImageData(img);
            const normalMesh = createInstancedDots(data, width, height, radius, 0.3, 0.2);
            const specialMesh = createSpecialDots(radius, specialPoints);
            sceneRef.current.add(normalMesh, specialMesh);
            resolve({ normalMesh, specialMesh });
        };
    });
}

function extractImageData(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.translate(0, img.height);
    ctx.scale(1, -1);
    ctx.drawImage(img, 0, 0);
    return { data: ctx.getImageData(0, 0, img.width, img.height).data, width: img.width, height: img.height };
}

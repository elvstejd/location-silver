
// https://stackoverflow.com/a/38935990
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export function asyncCompressImageFile(file) {
    return new Promise((resolve, reject) => {
        try {
            const originalName = file.name;

            // https://www.youtube.com/watch?v=bXf_UdyDzSA
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const imageHolder = document.createElement("img");
                imageHolder.src = event.target.result;

                imageHolder.onload = (event) => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 400;

                    const scaleSize = MAX_WIDTH / event.target.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = event.target.height * scaleSize;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(event.target, 0, 0, canvas.width, canvas.height);

                    const srcEncoded = ctx.canvas.toDataURL(event.target, "image/jpeg");
                    resolve(dataURLtoFile(srcEncoded, originalName));
                };
            };
        } catch (err) {
            reject(err);
        }
    });
}

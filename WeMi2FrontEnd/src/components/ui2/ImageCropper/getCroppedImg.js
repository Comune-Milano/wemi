/**
 * @param {Object} fileObj - File object
 * @param {File} fileObj.file - Image File object
 * @param {string} fileObj.type - Image File type
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
export const getCroppedImg = (fileObj, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.beginPath();
    ctx.arc(pixelCrop.width / 2, pixelCrop.width / 2, pixelCrop.width / 2, 0, 2 * Math.PI, true);
    ctx.clip();
    ctx.stroke();

    const image = new Image();
    image.src = fileObj.file;
    image.onload = () => {
      ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
      // Resolve as Base64 string
      resolve(canvas.toDataURL(fileObj.type === 'image/jpeg' ? 'image/jpg' : fileObj.type));

      // Resolve as a blob
      // return new Promise(resolve => {
      //   canvas.toBlob(file => {
      //     resolve(URL.createObjectURL(file));
      //   }, "image/jpeg");
      // });
    };

    image.onerror = (error) => reject(error);
  });
};

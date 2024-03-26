
import sharp from 'sharp';

export function circularCropImage(
  base64Image,
  cropSize = { width: 200, height: 200 }
) {
	const { width, height } = cropSize;

	const [imageDataExtension, imageURI] = base64Image.split(';base64,');
	const imageBuffer = Buffer.from(imageURI, 'base64');

	const roundedCorners = Buffer.from(`
		<svg>
			<rect x="0" y="0" width="${width}" height="${height}" rx="${width / 2}" ry="${height / 2}" />
		</svg>
	`);

	return sharp(imageBuffer)
		.rotate()
		.resize(width, height, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.background({ r: 0, g: 0, b: 0, alpha: 0})
		.composite([{
      input: roundedCorners,
      blend: 'dest-in'
    }])
  	.toBuffer()
  	.then(resizedImageBuf =>
			`${imageDataExtension};base64,${resizedImageBuf.toString('base64')}`
		);
}
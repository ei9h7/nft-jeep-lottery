import fs from 'fs';
import sharp from 'sharp';
import minterOptions from '../../config/minterOptions';
import {
    assetsPath,
    imagesPath,
    generationTmpPath,
    copyFile,
    generateCAR,
    imagesNameCAR,
    collectionProfilePicName
} from './utils';

const profilePicPath = `${imagesPath}/profile/${collectionProfilePicName}`;
const destroyedJeepName = "destroyed.png";
const destroyedJeepPath = `${imagesPath}/${destroyedJeepName}`;

function generateMergedImages(): Promise<sharp.OutputInfo[]> {

    const promises: Array<Promise<sharp.OutputInfo>> = [];
    minterOptions.body.variants.forEach((bodyVariant, bodyIndex) => {
        minterOptions.colour.variants.forEach((colourVariant, colourIndex) => {
            minterOptions.accessory.variants.forEach((accessoryVariant, accessoryIndex) => {
                minterOptions.power.variants.forEach((powerVariant, powerIndex) => {
                    
                    const filePath = `${generationTmpPath}/${bodyIndex}_${colourIndex}_${accessoryIndex}_${powerIndex}.png`;
                    const promise = sharp(assetsPath + minterOptions.accessory.getPath(accessoryIndex))
                                    .composite([
                                        { input: assetsPath + minterOptions.colour.getPath(colourIndex) },
                                        { input: assetsPath + minterOptions.power.getPath(powerIndex) },
                                        { input: assetsPath + minterOptions.body.getPath(bodyIndex) }
                                    ])
                                    .toFile(filePath);
                                    //.catch(err => console.log(err));
                    promises.push(promise);
                });
            });
        });
    });
    return Promise.all(promises);
}

/*
    * Generate images CAR
*/
async function run() {

    // Delete and recreate tmp/
    fs.rmSync(generationTmpPath, { recursive: true, force: true });
    fs.mkdirSync(generationTmpPath);

    // Copy collection logo to tmp/
    copyFile(profilePicPath, `${generationTmpPath}/${collectionProfilePicName}`)
    
    // Copy destroyed jeep visual to tmp/
    copyFile(destroyedJeepPath, `${generationTmpPath}/${destroyedJeepName}`)
    
    // Generate all combinations of merged PNGs and save them to tmp/
    await generateMergedImages();
    
    // At this point, all images we want to push on IPFS are in tmp/
    // Generate CAR for images
    await generateCAR(imagesNameCAR);
}
run();

export {}
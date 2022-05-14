import fs from 'fs';
import minterOptions from '../../config/minterOptions';
import {
    ipfsPath,
    generationTmpPath,
    getCIDFromCAR,
    imagesNameCAR,
    metadataNameCAR,
    collectionProfilePicName,
    generateCAR
} from './utils';

function getAssetURI(cid: string, fileName: string) {
    return `https://ipfs.io/ipfs/${cid}/${fileName}`;
}

function writeJSONToTmp(object: any, fileName: string) {

    const filePath = `${generationTmpPath}/${fileName}`;
    const json = JSON.stringify(object, null, 4);
    fs.writeFileSync(filePath, json);
}

/*
    * Generate metadata CAR
*/
async function run() {

    // Delete and recreate tmp/
    fs.rmSync(generationTmpPath, { recursive: true, force: true });
    fs.mkdirSync(generationTmpPath);

    // Get images CAR file CID
    const imagesCID = await getCIDFromCAR(`${ipfsPath}/${imagesNameCAR}`);

    // Generate and save collection metadata to tmp/
    const collectionMetadata = {
        "name": "Jeeps Season 1",
        "description": "The trail is calling. Get a Jeep and join the adventure!",
        "image": getAssetURI(imagesCID, collectionProfilePicName),
        "external_link": "https://nft-jeep-lottery.vercel.app/",
        //"seller_fee_basis_points": 100,
        //"fee_recipient": "0xf585378ff2A1DeCb335b4899250b83F46DC5c019"
    };
    writeJSONToTmp(collectionMetadata, "collection-metadata.json");

    // Generate and save variants metadata to tmp/
    let counter = 1;
    minterOptions.body.variants.forEach((bodyVariant, bodyIndex) => {
        minterOptions.colour.variants.forEach((colourVariant, colourIndex) => {
            minterOptions.accessory.variants.forEach((accessoryVariant, accessoryIndex) => {
                minterOptions.power.variants.forEach((powerVariant, powerIndex) => {
                    
                    const fileNameNoExt = `${bodyIndex}_${colourIndex}_${accessoryIndex}_${powerIndex}`;
                    const nameProperty = (counter++).toString().padStart(3, "0");
                    const metadata = {
                        "name" : `Jeep #${nameProperty}`,
                        "description": "",
                        "image": getAssetURI(imagesCID, `${fileNameNoExt}.png`),
                        "attributes": [
                            { // Body
                                "trait_type": minterOptions.body.name, 
                                "value": bodyVariant.name
                            },
                            { // Colour
                                "trait_type": minterOptions.colour.name, 
                                "value": colourVariant.name
                            },
                            { // Accessory
                                "trait_type": minterOptions.accessory.name, 
                                "value": accessoryVariant.name
                            },
                            { // Power
                                "trait_type": minterOptions.power.name, 
                                "value": powerVariant.name
                            }
                        ]
                    };
                    writeJSONToTmp(metadata, `${fileNameNoExt}.json`);
                });
            });
        });
    });

    // At this point, all metadata we want to push on IPFS are in tmp/
    // Generate CAR for metadata
    await generateCAR(metadataNameCAR);
}
run();

export {}
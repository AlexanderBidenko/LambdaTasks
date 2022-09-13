import * as inquirer from "inquirer";
import fs from 'fs/promises';
import {uploadFile, generateLink} from './src/actionsWithGoogleDrive';
import {createTinyLink} from './src/actionsWithTinyAPI';


selectPickture();



async function selectPickture() {
  try {
  let pickture = await inquirer.prompt([
        {
    name: 'Path',
    type : 'input',
    message : "Drag and drop your image to terminal and press Enter for upload:",
    validate(Path) {
      if (Path.length > 555) {
        return 'Too many chars in path.';
      }
      return true;
    },
  },
])
  // console.log(`File path:`, pickture.Path);
  // console.log(`File name:`, (pickture.Path.split('\\')).at(-1));
  if (typeof pickture.Path === 'string') {
    const pickturePath = await renamePickture(pickture.Path);
    // console.log(pickturePath)
    const driveFileId = await uploadFile(pickturePath);
    if (typeof driveFileId === 'string') {
      const longLink = await generateLink(driveFileId);
      if (typeof longLink === 'string') {
      sortLink(longLink)
      }
    }
  }
}
  catch(error) {
    if (error instanceof Error) {
        console.log(error)
    }
  };
}


async function renamePickture(pickturePath: string) {
  console.log(pickturePath)
  const renameQuerie = await inquirer.prompt([
    {
      name: 'answer',
      type : 'list',
      message : "Would you like to rename the image?",
      choices : [
        'Yes',
        'No'
      ]
    }
  ])
  let newPickturePath;
  if ((renameQuerie.answer) === 'Yes') {
  let newFileName = await  inquirer.prompt([
    {
      name: 'answer',
      type : 'input',
      message : "Enter new filename (WITHOUT extensions aka .jpg .img etc.)",
    },
  ])
  
    newPickturePath = ((pickturePath.split('\\')).slice(0, -1)).join('\\') + '\\' + newFileName.answer + '.' + ((pickturePath.split('.')).at(-1));
    await fs.rename(pickturePath, newPickturePath)
  return newPickturePath;
  } else {

    return pickturePath
  };
}

async function sortLink(longLink: string) {
  const shorteningQuerie = await inquirer.prompt([
    {
      name: 'answer',
      type : 'list',
      message : "Would you like to shortening link?",
      choices : [
        'Yes',
        'No'
      ]
    }
  ])
  if ((shorteningQuerie.answer) === 'Yes') {
    const sortLink = await createTinyLink(longLink);
    console.log(sortLink);
  } else {
    console.log(longLink);
  }
}
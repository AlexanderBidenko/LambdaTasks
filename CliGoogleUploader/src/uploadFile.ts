import { google } from 'googleapis';
import fs from 'fs';
import "dotenv/config";


export async function uploadFile(path:string): Promise<string | undefined> {

    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    })


    const fileName = (path.split('\\')).at(-1);

    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileName
            },
            media: {
                body: fs.createReadStream(path)
            }
        }
        );

        if (typeof response.data?.id == 'string') {
            return response.data?.id;
        }        
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}


export async function generateLink(fileId: string): Promise<string | null | undefined> {
    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    })
    try {
        await drive.permissions.create(
            {
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            }
        )
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink'
        });
        console.log(result.data?.webViewLink)
        return result.data?.webViewLink

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}


import type { NextApiRequest, NextApiResponse } from 'next'
import Client from 'ssh2-sftp-client'
import { ScreenFile } from '../../types'

const sftp = new Client()

type Error = {
  error: string
}

function imageToDataUrl(image: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    image.on('data', (chunk: any) => chunks.push(chunk));
    image.on('end', () => {
      const data = Buffer.concat(chunks).toString('base64');
      resolve(`data:image/png;base64,${data}`);
    });
    image.on('error', (err: any) => reject(err));
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScreenFile[] | Error>
) {

  // Get connection details from headers
  const host = req.headers['x-host'];
  const username = req.headers['x-username'];
  const password = req.headers['x-password'];

  // Connect to SFTP server
  const sftpConnection = await sftp.connect({
    host: host as string,
    port: 22,
    username: username as string,
    password: password as string,
    readyTimeout: 3000
  }).catch(err => {
    console.log(err)
    return false;
  });

  if (!sftpConnection) {
    res.status(500).json({
      error: 'Could not connect to SFTP server'
    })
    return
  }

  // List files in /usr/share/remarkable
  const files = await sftp.list('/usr/share/remarkable');

  let fileNames = files.map((file: any) => {
    return file.name;
  });

  // Filter only the files we want
  fileNames = fileNames.filter((file: any) => {
    const screens = [
      "starting.png",
      "poweroff.png",
      "suspended.png",
      "batteryempty.png",
      "overheating.png",
      "rebooting.png"];

    return file.includes('.png') && screens.includes(file);
  }).sort((a: any, b: any) => {
    return a - b;
  });

  // Get data url for each image
  const images = await Promise.all(fileNames.map(async (fileName: any) => {
    const image = await sftp.createReadStream(`/usr/share/remarkable/${fileName}`)

    if (!image) {
      res.status(500).json({
        error: 'Could not read image'
      })

      sftp.end();
      return
    }

    // Convert image to data url
    const dataUrl = await imageToDataUrl(image);

    return {
      name: fileName,
      dataUrl
    }
  }));

  // Return data urls
  sftp.end();
  return res.status(200).json(images as ScreenFile[]);
}

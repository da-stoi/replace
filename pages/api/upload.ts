import type { NextApiRequest, NextApiResponse } from 'next'
import Client from 'ssh2-sftp-client'

const sftp = new Client()

const screens = [
  "starting",
  "poweroff",
  "suspended",
  "batteryempty",
  "overheating",
  "rebooting"
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // Get connection details from headers
  const host = req.headers['x-host'];
  const username = req.headers['x-username'];
  const password = req.headers['x-password'];

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

  // parse name and image from form data
  const { screen, file } = req.body;

  if (!screens.includes(screen)) {
    res.status(400).json({
      error: 'Invalid screen'
    })
    sftp.end();
    return
  }

  // convert data url to buffer
  const buffer = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // Upload image replace existing file
  const uploadFile = await sftp.put(buffer, `/usr/share/remarkable/${screen}.png`);

  if (!uploadFile) {
    res.status(500).json({
      error: 'Could not upload file'
    })
    sftp.end();
    return
  }

  sftp.end();
  return res.status(200).json({});
}

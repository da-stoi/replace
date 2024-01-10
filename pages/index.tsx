import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../styles/Screens.module.css'
import NextImage from 'next/image'
import CurrentScreens from '../components/CurrentScreens'
import UploadScreen from '../components/UploadScreens'
import CreateScreen from '../components/CreateScreen'
import { Connection, ScreenFile } from '../types'
import { useTheme } from 'next-themes'

const Home: NextPage = () => {

  const [screenMode, setScreenMode] = useState<'upload' | 'create'>('upload');
  const [screenUpload, setScreenUpload] = useState<File | null>(null);
  const [screenSelect, setScreenSelect] = useState<string>('batteryempty');
  const [uploading, setUploading] = useState<boolean>(false);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [files, setFiles] = useState<ScreenFile[]>([]);
  const [subsequentDisconnectCount, updateSubsequentDisconnectCount] = useState<number>(0);
  const [initialFetch, setInitialFetch] = useState<boolean>(false);
  const { theme, systemTheme, setTheme } = useTheme();

  function newAbortSignal(timeoutMs: number) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 0);

    return abortController.signal;
  }

  const getFiles = useCallback(async () => {

    // Check if connection is set
    if (!connection) {
      updateSubsequentDisconnectCount(subsequentDisconnectCount + 1);
      setFiles([]);
      return;
    }

    const allImagesReq = await axios({
      signal: newAbortSignal(5000),
      method: 'get',
      headers: {
        'x-host': connection.host,
        'x-username': connection.username,
        'x-password': connection.password,
      },
      url: '../api/screens',
    }).catch((err) => {
      return { status: 500, data: [] };
    });

    if (allImagesReq.status !== 200) {
      updateSubsequentDisconnectCount(subsequentDisconnectCount + 1);
      setFiles([]);
      return;
    }

    updateSubsequentDisconnectCount(0);

    const allImages = allImagesReq.data;

    setFiles(allImages);
  }, [subsequentDisconnectCount, connection]);

  // Get connection from local storage
  useEffect(() => {
    const connection = localStorage.getItem('rePlaceConnection');
    if (connection) {
      setConnection(JSON.parse(connection));
    }
  }, [setConnection]);

  // Set connection in local storage
  function updateConnection(connection: Connection | null) {
    if (!connection) {
      localStorage.removeItem('rePlaceConnection');
      setConnection(null);
      return;
    }
    localStorage.setItem('rePlaceConnection', JSON.stringify(connection));
    setConnection(connection);
  }

  // Get files on initial load
  useEffect(() => {
    if (!initialFetch) {
      getFiles();
      setInitialFetch(true);
    }
  }, [getFiles, initialFetch, setInitialFetch]);

  useEffect(() => {
    let interval: any;
    if (subsequentDisconnectCount < 3) {
      interval = setInterval(() => {
        getFiles();
      }, 5000);
      return () => clearInterval(interval);
    } else {
      // Clear the interval if subsequentDisconnectCount is greater than or equal to 5
      clearInterval(interval);
    }
  }, [getFiles, subsequentDisconnectCount]);

  // Respect system theme
  useEffect(() => {
    setTheme(systemTheme as 'light' | 'dark');
  }, [systemTheme, setTheme]);

  async function getImageDimensions(file: File) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  async function revertScreen(screen: string) {

    if (!connection) {
      alert('You must be connected to a reMarkable device to revert a screen.');
      return;
    }

    const confirmation = confirm("Are you sure you want to revert this screen back to the original? This will overwrite the current screen.")

    if (!confirmation) {
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    const dataUrl = await new Promise(async (resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(new File([await (await fetch(`screens/${screen}.png`)).blob()], `${screen}.png`));
    });

    // Replace application/octet-stream with image/png
    const dataUrlString = dataUrl as string;
    const imageDataUrl = dataUrlString.replace('application/octet-stream', 'image/png');

    const revertReq = await axios({
      method: 'post',
      url: '../api/upload',
      data: {
        screen,
        file: imageDataUrl
      },
      headers: {
        'Content-Type': 'application/json',
        'x-host': connection.host,
        'x-username': connection.username,
        'x-password': connection.password,
      }
    });

    setUploading(false);

    if (revertReq.status === 200) {
      getFiles();
      alert('Revert successful!');
    } else {
      alert('Revert failed.');
    }
  }

  function clearScreenUpload() {
    setScreenUpload(null);
    setScreenSelect('batteryempty');
    const input = document.getElementById('screenUpload') as HTMLInputElement;
    input.value = '';
  }

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div>
      <Head>
        <title>rePlace</title>
        <meta name="description" content="Mod your reMarkable the safe way" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.inlineHeader}>
        <NextImage src="/logo.png" width={50} height={50} />
        <h1>rePlace</h1>
        <div>
          <button className={styles.button} onClick={toggleTheme}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 51 51" style={{ marginBottom: '-5px' }}>
              <g id="Group_6" data-name="Group 6" transform="translate(-8.5 -8.5)">
                <circle id="Ellipse_3" data-name="Ellipse 3" cx="10" cy="10" r="10" transform="translate(24 24)" fill="var(--text-color)" />
                <g id="Group_5" data-name="Group 5">
                  <line id="Line_6" data-name="Line 6" y2="8" transform="translate(34 11)" fill="none" stroke="var(--text-color)" strokeLinecap="round" strokeWidth="5" />
                  <line id="Line_7" data-name="Line 7" y2="8" transform="translate(34 49)" fill="none" stroke="var(--text-color)" strokeLinecap="round" strokeWidth="5" />
                  <line id="Line_8" data-name="Line 8" x2="8" transform="translate(49 34)" fill="none" stroke="var(--text-color)" strokeLinecap="round" strokeWidth="5" />
                  <line id="Line_9" data-name="Line 9" x2="8" transform="translate(11 34)" fill="none" stroke="var(--text-color)" strokeLinecap="round" strokeWidth="5" />
                  <line id="Line_10" data-name="Line 10" y2="8" transform="translate(51.536 16.464) rotate(45)" fill="none" stroke="var(--text-color)" strokeLinecap="round" strokeWidth="5" />
                  <line id="Line_11" data-name="Line 11" y2="8" transform="translate(51.536 51.536) rotate(135)" fill="none" stroke="var(--text-color)" strokeLinecap="round" strokeWidth="5" />
                  <line id="Line_12" data-name="Line 12" y2="8" transform="translate(16.464 51.536) rotate(-135)" fill="none" stroke="var(--text-color)" strokeLinecap="round" strokeWidth="5" />
                  <line id="Line_13" data-name="Line 13" y2="8" transform="translate(16.464 16.464) rotate(-45)" fill="none" stroke="var(--text-color)" strokeLinecap="round" strokeWidth="5" />
                </g>
              </g>
            </svg>
            <span style={{ margin: '5px' }}></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48.526 48.48" style={{ marginBottom: '-5px' }}>
              <path id="Subtraction_2" data-name="Subtraction 2" d="M33,56A23,23,0,0,1,12.52,43.479,22.993,22.993,0,0,0,46,23a22.75,22.75,0,0,0-2.521-10.48A23,23,0,0,1,33,56Z" transform="translate(-10.02 -10.02)" fill="var(--text-color)" stroke="var(--text-color)" strokeLinejoin="round" strokeWidth="5" />
            </svg>
          </button>
          <span className={`${styles.connectionStatusChip} ${files && files.length > 0 ? styles.connected : ""}`}>{files && files.length > 0 && connection ? `Connected | ${connection.username}@${connection.host}` : 'Disconnected'}</span>
        </div>
      </div>

      <CurrentScreens
        connection={connection}
        updateConnection={updateConnection}
        files={files}
        setFiles={setFiles}
        getFiles={getFiles}
        setScreenSelect={setScreenSelect}
        revertScreen={revertScreen}
      />

      <br />

      {files && files.length > 0 ? screenMode === 'upload' ? (
        <UploadScreen
          connection={connection}
          screenUpload={screenUpload}
          screenSelect={screenSelect}
          uploading={uploading}
          getImageDimensions={getImageDimensions}
          clearScreenUpload={clearScreenUpload}
          setScreenUpload={setScreenUpload}
          getFiles={getFiles}
          setScreenSelect={setScreenSelect}
          setScreenMode={setScreenMode}
        />
      ) : (
        <CreateScreen
          connection={connection}
          screenSelect={screenSelect}
          getFiles={getFiles}
          setScreenSelect={setScreenSelect}
          setScreenMode={setScreenMode}
        />) : ""}
    </div>
  )
}

export default Home
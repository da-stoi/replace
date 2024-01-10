# rePlace - reMarkable Screen Modifier UI

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Project](#running-the-project)
  - [Connecting to your reMarkable](#connecting-to-your-remarkable)
  - [Viewing Screens](#viewing-screens)
  - [Modifying Screens](#modifying-screens)
    - [Uploading Images](#uploading-images)
    - [Creating Custom rePlace Screens](#creating-custom-replace-screens)

## Introduction

The rePlace is a project that aims to provide a user-friendly interface for customizing and modifying the screens on the reMarkable tablet. This project enhances the reMarkable experience by allowing users to personalize their device's interface. While it seems like the process for modifying the screens on the reMarkable 1 follows the same process as the reMarkable 2, this project is only tested on the reMarkable 2 and I have no way of knowing or testing what happens if you use this project with the reMarkable 1. If you have a reMarkable 1 and would like to test this project, please let me know how it goes!

## Features

- Easy-to-use graphical interface for modifying reMarkable screens
- Light/dark mode
- Live preview of current screens
- Download current screens on your device
- Revert any screen back to original
- Upload an image file as any screen
- Download a blank template with the correct dimensions
- Upload/download pre-made screens from the "rePlace library"
- Customize the lost message and contact info on the pre-made sleeping and power off screen

## Getting Started

### Prerequisites

Before using the reMarkable Screen Modifier UI, ensure you have the following prerequisites:

- [Node.js](https://nodejs.org/) (>= 14.0.0, *v20.5.1 recommended*)
- [npm](https://www.npmjs.com/) (>= 6.0.0)
- [yarn](https://yarnpkg.com/) (>= 1.0.0) *(optional)*
- [reMarkable Tablet](https://remarkable.com/store/configure)

### Installation
1. Clone the repository.
2. Install dependencies with `yarn install`/`npm install`
3. Build the project with `yarn build`/`npm run build`
4. Run the project with `yarn start`/`npm run start`

You can combine steps 2-4 with the following command: `yarn install && yarn build && yarn start`/`npm install && npm run build && npm run start`

Depending on your system you may be prompted to allow your terminal to accept incoming network connections, this is required for the server to be able to communicate with your reMarkable and you should press allow.

## Usage

### Running the Project
After building the project for the first time, each subsequent time you run the project you can simply run `yarn start`/`npm run start` to start the project. Once the project is running, you can open the UI by navigating to `http://localhost:3000` in your browser. 


### Connecting to your reMarkable
Your first time connecting you will be met with a "Disconnected. No connection details" message. You must first enter your device's connection information, which consists of three main pieces of data.

1. **Hostname**
    - This is your device's IP address. If you are connecting over USB this will be `10.11.99.1` which will already be prefilled. If you wish to connect over WiFi, you will need to find your device's IP address. Information on how to get the IP address of your device can be found [here](https://remarkable.guide/guide/access/ssh.html#finding-your-device-password-and-ip-addresses).
    - *Note: Your reMarkable and computer must be connected to the same network without client isolation.*
2. **Username**
    - Unless your device was previously modified, this will be `root`. (The prefilled value)
3. **Password**
    - This is your reMarkable's password. Information on how to get the password of your device can be found [here](https://remarkable.guide/guide/access/ssh.html#finding-your-device-password-and-ip-addresses).

Once you have entered your device's connection information, click the "Save Connection" button which will save your connection information to the browser's local storage so you do not have to re-enter it each time. To change or clear your connection information simply disconnect your reMarkable and it will give you the option to do both.

### Viewing Screens
Once you have connected to your reMarkable, you will be met with a list of all the screens on your device. Each screen will have two options, "Download" and "Revert". 

1. Clicking the "Download" button will download the screen to your computer. 
2. Clicking the "Revert" button will revert the screen back to the original reMarkable screen. It will respond with a confirmation message. Doing this will clear whatever screen you have currently set.

### Modifying Screens
There are two main ways of modifying screens, uploading an image or creating a custom rePlace screen.

#### Uploading Images
To modify a screen, you can upload the image you would like to use for the screen (1404x1872 png). If the image is the correct size you will see a preview of the image with a screen dropdown and an upload button. To select which screen to save this image as you can either select the desired screen from the dropdown, or simple click on any of the current screen previews above. Once you have selected the screen you would like to save the image as, click the upload button and the screen will be saved to your device. It will respond with a confirmation message and the screen previews will update to show the new screen.

#### Creating Custom rePlace Screens
To create a custom rePlace screen, first click the "Create Custom rePlace Screen" button. This will switch the view with pre-made rePlace designs for each screen. The "suspended"(sleeping) and "poweroff" screens have additional customization options for the lost message and contact info. *Note: This may conflict with reMarkable's built in lost message feature. It is recommended you turn that setting off.*

Once you have selected the screen you would like to use, click the "Create Custom rePlace Screen" button and the screen will be saved to your device. It will respond with a confirmation message and the screen previews will update to show the new screen.

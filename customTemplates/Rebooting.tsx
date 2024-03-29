import type { NextPage } from 'next'
import { StaticScreenProps } from '../types'

const Rebooting: NextPage<StaticScreenProps> = ({ theme, download }) => {

  const backgroundColor = theme === 'dark' ? '#212121' : '#fff';
  const faceColor = theme === 'dark' ? '#fff' : '#212121';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={download ? "1404" : undefined} height={download ? "1872" : undefined} viewBox="0 0 1404 1872" id='customSuspendedScreen'>
      <defs>
        <clipPath id="clip-rebooting_v2.0">
          <rect width="1404" height="1872" />
        </clipPath>
      </defs>
      <g id="rebooting_v2.0" data-name="rebooting v2.0" clip-path="url(#clip-rebooting_v2.0)">
        <rect width="1404" height="1872" fill={backgroundColor} />
        <g id="Device" transform="translate(395 533)">
          <g id="Device_Body" data-name="Device Body" transform="translate(0 0)">
            <rect id="Device_Outline" data-name="Device Outline" width="615" height="806" rx="10" fill={backgroundColor} />
            <path id="Device_Outline_-_Outline" data-name="Device Outline - Outline" d="M10,5a5.006,5.006,0,0,0-5,5V796a5.006,5.006,0,0,0,5,5H605a5.006,5.006,0,0,0,5-5V10a5.006,5.006,0,0,0-5-5H10m0-5H605a10,10,0,0,1,10,10V796a10,10,0,0,1-10,10H10A10,10,0,0,1,0,796V10A10,10,0,0,1,10,0Z" fill={faceColor} />
            <path id="Metal_Band" data-name="Metal Band" d="M10,0H42a0,0,0,0,1,0,0V806a0,0,0,0,1,0,0H10A10,10,0,0,1,0,796V10A10,10,0,0,1,10,0Z" fill={faceColor} />
          </g>
          <path id="Screen" d="M2,2V684.122H512.591V2H2M0,0H514.591V686.122H0Z" transform="translate(66.779 34.372)" fill={faceColor} />
        </g>
        <g id="Face">
          <g id="Eyes" transform="translate(545.454 742.17)">
            <path id="Closed_Eye" data-name="Closed Eye" d="M-.007,10.5A10,10,0,0,1-9.992.9,10,10,0,0,1-.4-9.492c16.673-.673,83.108-.673,100.12,0a10,10,0,0,1-.79,19.984C82.183,9.83,16.808,9.83.4,10.492.266,10.5.129,10.5-.007,10.5Z" transform="translate(0 0)" fill={faceColor} />
            <path id="Open_Eye" data-name="Open Eye" d="M-.008,33.714A9.955,9.955,0,0,1-4.63,32.575,10,10,0,0,1-8.863,19.081C.45,1.254,22.681-9.888,49.153-10c26.789-.112,49.394,11,58.992,29.006A10,10,0,0,1,90.5,28.416C84.49,17.149,68.3,9.921,49.237,10c-18.746.078-34.594,7.278-40.374,18.341A10,10,0,0,1-.008,33.714Z" transform="translate(247.922 -23.212)" fill={faceColor} />
          </g>
          <path id="Mouth" d="M99.263,33.386c-44.1,0-86.3-4.917-106.562-26.55A10,10,0,0,1-6.836-7.3,10,10,0,0,1,7.3-6.836c22.974,24.531,96.043,20.96,149.4,18.353C172.658,10.737,187.737,10,200.4,10a10,10,0,0,1,0,20c-12.176,0-27.017.725-42.73,1.493C139.018,32.4,118.947,33.386,99.263,33.386Z" transform="translate(618.299 1039.58)" fill={faceColor} />
        </g>
        <text id="Restarting_" data-name="Restarting…" transform="translate(702 1585)" fill={faceColor} font-size="70" font-family="var(--main-font-family)" font-weight="500" textAnchor='middle'><tspan x="0" y="0">Rebooting…</tspan></text>
      </g>
    </svg>
  )
}

export default Rebooting
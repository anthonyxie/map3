import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 465 380"
      width={44}
      height={64}
      {...props}
    >
      <Path
        id="path0"
        class="s0"
        fill={props.color}
        d="m140.5 26.4c-6.1 1.4-15 3.9-20 5.6-5 1.7-13 5-18 7.4-5 2.5-11.9 6.3-15.5 8.6-3.6 2.4-10 7.2-14.3 10.9-4.4 3.6-10.5 9.5-13.6 13.1-3.2 3.6-8.2 9.7-11.1 13.5-2.9 3.8-7.5 11.5-10.1 17-2.5 5.5-5.9 13.6-7.3 18-1.5 4.4-3.4 11.6-4.4 16-1.2 5.9-1.7 12.7-1.7 26 0 15.1 0.4 19.8 2.4 29 1.3 6.1 3.8 15.3 5.6 20.5 1.7 5.2 5.8 15.8 8.9 23.5 3.2 7.7 11.3 25.3 18.1 39 6.8 13.8 17 33.1 22.7 43 5.7 9.9 15 25.4 20.7 34.5 5.7 9.1 18.7 28.9 28.9 44 10.2 15.1 20.8 30.6 23.6 34.3 3.2 4.2 6 7 7.6 7.4 1.4 0.3 3.6 0.2 5-0.3 1.8-0.7 10.2-12.5 30.2-42.4 15.2-22.8 33.8-51.6 41.2-64 7.4-12.4 16.5-27.9 20.2-34.5 3.7-6.6 10.4-19.4 14.9-28.5 4.4-9.1 10.3-21.7 12.9-28 2.7-6.3 6.6-16.7 8.6-23 2.1-6.3 5.1-17.3 6.6-24.5 2.5-11.6 2.8-15 2.9-31.5 0-14.6-0.4-20.2-1.9-26.5-1-4.4-3.2-11.8-4.8-16.5-1.7-4.7-4.4-11.2-6-14.5-1.7-3.3-5.5-9.8-8.6-14.5-3.1-4.7-10.8-13.8-17.2-20.3-6.3-6.6-14.7-14.3-18.5-17.2-3.8-3-10.6-7.5-15-10-4.4-2.5-12.1-6.1-17-8-4.9-1.9-13.5-4.7-19-6.1-8.6-2.3-12.5-2.7-28-3-16.2-0.4-19.1-0.2-29 2z"
      />
      <Path
        id="path1"
        fill-rule="evenodd"
        fill="#000000"
        class="s1"
        d="m173 0.7c3.6 0.2 10.3 0.8 15 1.4 4.7 0.5 13 2 18.5 3.4 5.5 1.4 14 4.2 19 6.1 4.9 2 13.3 6 18.5 8.9 5.2 2.9 13.2 8 17.7 11.4 4.6 3.4 12 9.6 16.4 13.8 4.5 4.3 10.9 11.2 14.4 15.3 3.4 4.1 8.5 10.9 11.3 15 2.8 4.1 7.3 12 10.1 17.5 2.7 5.5 6.3 14 8 19 1.6 4.9 3.7 13.3 4.6 18.5 0.9 5.2 2.1 11.1 2.7 13 0.5 1.9 0.7 10 0.5 18-0.2 8-1.2 18.8-2.1 24-0.9 5.2-2.8 14.2-4.1 20-1.4 5.8-3.7 14.1-5.2 18.5-1.4 4.4-4.8 13.6-7.5 20.5-2.7 6.9-8.1 19-11.9 27-3.9 8-10 19.9-13.6 26.5-3.7 6.6-10.4 18.5-15.1 26.5-4.6 8-12.7 21.5-18 30-5.2 8.5-21.9 34.2-37.1 57-15.2 22.8-31.6 46.9-36.4 53.5-4.8 6.6-9.8 13.3-11.1 15-1.3 1.6-2.8 2.7-3.2 2.4-0.5-0.4-4.8-6-9.5-12.5-4.7-6.6-13.3-18.7-19.1-26.9-5.7-8.3-18.6-27.2-28.5-42-9.9-14.9-19.9-30.2-22.3-34-2.4-3.9-7.9-12.9-12.2-20-4.4-7.2-12.5-21.1-18.1-31-5.5-9.9-14.2-26.6-19.3-37-5.1-10.5-12.1-26.2-15.7-35-3.6-8.8-7.7-19.6-9.2-24-1.5-4.4-3.6-11.8-4.7-16.5-1.1-4.7-2.7-12.6-3.6-17.5-1.1-5.9-1.6-14.5-1.6-25 0.1-10.2 0.6-19.1 1.7-24.5 0.8-4.7 2.5-12.1 3.7-16.5 1.1-4.4 4-12.7 6.3-18.5 2.3-5.8 6.6-14.5 9.5-19.5 3-4.9 8.2-12.6 11.7-17 3.4-4.4 10.9-12.5 16.6-18 6.5-6.3 14.9-13 22.4-18 6.6-4.3 16-9.8 21-12.1 4.9-2.3 12.8-5.5 17.5-7.2 4.7-1.6 13.7-4.1 20-5.6 6.3-1.4 16.9-3 23.5-3.4 6.6-0.5 14.9-0.7 18.5-0.5zm-41 28.1c-6.3 1.6-16.9 5.3-23.5 8.3-6.6 2.9-16.5 8.2-22 11.7-5.6 3.7-14.1 10.5-19.4 15.6-5.1 5-12.1 12.7-15.5 17.1-3.5 4.4-7.6 10.2-9.2 13-1.7 2.7-5.1 9.9-7.6 16-2.6 6-5.6 14.8-6.7 19.5-1.1 4.7-2.5 11.8-3 15.7-0.6 4-1.1 11.5-1.1 16.5 0 5.1 0.7 13.3 1.4 18.3 0.8 4.9 2.1 12.1 3 16 0.9 3.8 2.6 9.9 3.7 13.5 1.2 3.6 5 13.5 8.4 22 3.5 8.5 8.3 19.8 10.8 25 2.4 5.2 7.4 15.3 10.9 22.5 3.6 7.1 7.5 14.8 8.8 17 1.3 2.2 3.6 6.2 5 9 1.5 2.7 3.7 6.7 4.9 8.7 1.1 2.1 3.1 5.5 4.2 7.5 1.2 2.1 3 5 4 6.5 1.1 1.6 1.9 3 1.9 3.3 0 0.3 1.3 2.5 3 5 1.6 2.5 3 4.7 3 5 0 0.3 2.2 3.9 5 8 2.7 4.1 5 7.7 5 8 0 0.3 8.2 12.8 18.2 27.7 9.9 15 21.3 31.8 25.1 37.3 3.8 5.5 8.2 11.2 9.6 12.8 1.6 1.7 3.6 2.7 5.3 2.7 1.9 0 3.7-1.1 5.5-3.3 1.6-1.7 13.6-19.4 26.7-39.2 13.2-19.8 28.4-43.1 33.8-51.8 5.4-8.6 9.8-15.9 9.8-16.2 0-0.3 1.5-2.9 3.3-5.8 1.9-2.8 4.5-7.2 5.9-9.7 1.4-2.5 3.5-6.2 4.7-8.3 1.1-2 3.1-5.4 4.2-7.5 1.2-2 3.5-6.2 5.1-9.2 1.7-3 6.1-11.8 10-19.5 3.9-7.7 8.9-18.5 11.3-24 2.3-5.5 5.8-14.3 7.8-19.5 2-5.2 4.9-14.9 6.5-21.5 1.7-6.6 3.8-17.2 4.7-23.5 1.3-8.6 1.6-14.7 1.1-24-0.3-6.9-1.4-16.3-2.5-21-1.1-4.7-3.2-11.9-4.6-16-1.5-4.1-3.7-9.5-5-12-1.2-2.5-3.4-6.8-5-9.5-1.5-2.8-5.3-8.4-8.3-12.5-3.1-4.1-10.1-12-15.6-17.6-5.6-5.6-13.5-12.6-17.6-15.6-4.1-3.1-9.8-6.8-12.5-8.3-2.8-1.5-5.5-3-6-3.4-0.6-0.4-5.5-2.6-11-4.8-5.5-2.3-14.1-5.1-19-6.3-5-1.2-12.2-2.5-16-3-3.9-0.5-11.3-0.9-16.5-0.8-5.2 0-12.4 0.4-16 0.9-3.6 0.5-11.7 2.1-18 3.7zm88.2 49.3c1.6-0.1 4.1 0.6 5.8 1.4 1.6 0.8 3.7 2.8 4.5 4.5 1.3 2.6 1.5 13.1 1.5 148.5l-2.5 5c-1.4 2.9-4.1 6.1-6.3 7.6-2 1.4-7.3 3.8-11.7 5.3-4.4 1.4-9.6 2.6-11.5 2.6-1.9 0-5.3-0.6-7.4-1.3-2.1-0.6-5.7-2.8-7.9-4.7-2.2-1.9-5.1-5.8-6.4-8.5-1.3-3-2.3-6.9-2.3-9.8 0-2.6 0.8-6.6 1.8-9 1-2.3 3.6-5.7 5.8-7.4 2.6-2.2 8.5-4.9 17.4-8 7.4-2.7 14.2-5.7 15.2-6.8 1.7-1.8 1.8-4.6 1.8-34.8 0-30.5-0.1-32.7-1.8-32.7-0.9 0-19.3 4.8-40.7 10.5-27.3 7.4-39.4 11-40.2 12.3-0.9 1.3-1.2 13.9-1.3 100.7l-2.5 5c-1.4 2.9-4.1 6.1-6.3 7.6-2 1.4-7.3 3.8-11.7 5.3-4.4 1.4-9.8 2.6-12 2.6-2.2 0-6-1-8.5-2.1-2.5-1.1-5.8-3.2-7.4-4.7-1.6-1.5-3.9-5-5.2-7.7-1.5-3.1-2.4-6.9-2.4-9.8 0-2.6 0.7-6.4 1.6-8.5 0.8-2 2.7-5 4.2-6.6 1.5-1.6 4.9-3.9 7.7-5.1 2.7-1.2 9.5-3.7 15-5.6 5.5-1.8 10.8-4.2 11.8-5.4 1.6-1.9 1.7-5.7 1.7-53.8 0-47.2 0.2-52 1.7-55.3 1-2.1 2.9-4.4 4.3-5.4 1.4-0.9 7-2.8 12.5-4.3 5.5-1.5 18.3-4.9 28.5-7.7 10.2-2.7 25.7-7 34.5-9.4 8.8-2.4 17.2-4.4 18.7-4.5z"
      />
    </Svg>
  )
}

export default SvgComponent
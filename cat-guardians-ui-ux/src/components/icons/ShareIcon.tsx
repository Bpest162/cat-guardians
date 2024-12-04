import React from "react";

import { IIcons } from "./interfaces/interface";

const ShareIcon: React.FC<IIcons> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.1211 19.608C23.4097 19.6105 22.709 19.7817 22.0765 20.1076C21.4441 20.4335 20.898 20.9047 20.4829 21.4826L13.1371 17.8722C13.2803 17.423 13.3552 16.9549 13.3593 16.4836C13.3552 16.0122 13.2803 15.5441 13.1371 15.095L20.4829 11.4845C21.1164 12.3439 22.0357 12.9491 23.0754 13.1914C24.1152 13.4337 25.2072 13.2971 26.1553 12.8063C27.1035 12.3155 27.8454 11.5026 28.2477 10.5137C28.6501 9.52485 28.6867 8.42488 28.3506 7.41151C28.0146 6.39817 27.3282 5.53789 26.4147 4.98534C25.5012 4.43281 24.4205 4.22422 23.367 4.39709C22.3134 4.56997 21.3563 5.11297 20.6672 5.92848C19.9782 6.74399 19.6027 7.77853 19.6081 8.84612C19.6114 9.07911 19.6346 9.3114 19.6775 9.54043L12.0818 13.3591C11.666 12.9188 11.1644 12.5684 10.6079 12.3296C10.0514 12.0907 9.45186 11.9685 8.84628 11.9705C7.64935 11.9705 6.50145 12.446 5.65508 13.2924C4.80873 14.1388 4.33325 15.2866 4.33325 16.4836C4.33325 17.6805 4.80873 18.8284 5.65508 19.6748C6.50145 20.5212 7.64935 20.9966 8.84628 20.9966C9.45186 20.9986 10.0514 20.8764 10.6079 20.6375C11.1644 20.3987 11.666 20.0483 12.0818 19.608L19.6775 23.4267C19.6338 23.6603 19.6106 23.8972 19.6081 24.1349C19.6081 25.0275 19.8728 25.9 20.3687 26.6422C20.8645 27.3843 21.5694 27.9628 22.3941 28.3044C23.2187 28.646 24.1261 28.7353 25.0015 28.5612C25.8771 28.387 26.6812 27.9572 27.3123 27.3261C27.9435 26.6948 28.3732 25.8907 28.5475 25.0153C28.7216 24.1399 28.6322 23.2324 28.2906 22.4077C27.949 21.5832 27.3707 20.8783 26.6284 20.3824C25.8862 19.8866 25.0137 19.6219 24.1211 19.6219V19.608ZM24.1211 6.41602C24.6017 6.41602 25.0717 6.55855 25.4712 6.82557C25.8708 7.09259 26.1823 7.47213 26.3663 7.91617C26.5501 8.36021 26.5983 8.84882 26.5046 9.32021C26.4107 9.7916 26.1794 10.2246 25.8394 10.5645C25.4996 10.9043 25.0667 11.1357 24.5952 11.2295C24.1238 11.3233 23.6353 11.2752 23.1912 11.0912C22.7471 10.9073 22.3676 10.5958 22.1006 10.1962C21.8335 9.79659 21.691 9.32675 21.691 8.84612C21.6947 8.20274 21.9518 7.58676 22.4069 7.13182C22.8618 6.67688 23.4778 6.41968 24.1211 6.41602ZM8.84628 18.9137C8.36565 18.9137 7.89582 18.7711 7.49619 18.504C7.09657 18.237 6.78509 17.8575 6.60117 17.4136C6.41724 16.9695 6.36911 16.4808 6.46289 16.0095C6.55665 15.5381 6.78809 15.1051 7.12794 14.7652C7.46781 14.4254 7.90079 14.1939 8.37219 14.1002C8.84358 14.0064 9.3322 14.0545 9.77624 14.2385C10.2203 14.4223 10.5998 14.7338 10.8668 15.1334C11.1338 15.5331 11.2764 16.0029 11.2764 16.4836C11.2727 17.1269 11.0155 17.7429 10.5606 18.1979C10.1056 18.6528 9.48966 18.9099 8.84628 18.9137ZM24.1211 26.5511C23.6405 26.5511 23.1706 26.4085 22.7711 26.1415C22.3715 25.8744 22.06 25.4949 21.876 25.051C21.6922 24.6069 21.644 24.1182 21.7377 23.647C21.8314 23.1755 22.0629 22.7425 22.4029 22.4026C22.7427 22.0628 23.1756 21.8313 23.6471 21.7376C24.1185 21.6439 24.607 21.6919 25.0511 21.8759C25.4952 22.0598 25.8747 22.3712 26.1417 22.7709C26.4088 23.1705 26.5512 23.6403 26.5512 24.121C26.5476 24.7644 26.2904 25.3804 25.8354 25.8353C25.3805 26.2902 24.7645 26.5474 24.1211 26.5511Z"
        fill="#0C0B0E"
      />
    </svg>
  );
};
export default ShareIcon;

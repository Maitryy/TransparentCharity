import charity1 from "./charity1.jpg";
import charity2 from "./charity2.jpg";
import charity3 from "./charity3.jpg";
import charity4 from "./charity4.jpg";
import charity5 from "./charity5.jpg";
import charity6 from "./charity6.jpg";

export default function getImage(img) {
  var imgSrc;
  console.log(img)
  switch (parseInt(img)) {
    case 1:
      imgSrc = charity1;
      break;
    case 2:
      imgSrc = charity2;
      break;
    case 3:
      imgSrc = charity3;
      break;
    case 4:
      imgSrc = charity4;
      break;
    case 5:
      imgSrc = charity5;
      break;
    case 6:
      imgSrc = charity6;
      break;
  }
  console.log(imgSrc)
  return imgSrc;
}

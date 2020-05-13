/* eslint-disable no-console */
import * as XLSX from "xlsx";
import { post } from "../api/utils";
import { dateTimeUnix } from "./textProcessor";

export const getSignedUrlS3 = (fileName, type, folderPrefix) => {
  const name = `${fileName.substring(
    0,
    fileName.lastIndexOf("."),
  )}-${dateTimeUnix()}`;
  const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
  // eslint-disable-next-line no-param-reassign
  fileName = `${name}.${extension}`;
  return post("/medias/url-storage", {
    fileName,
    type,
    folderPrefix,
  });
};

export const uploadFile = (file, signedRequest, width = 1920) =>
  // eslint-disable-next-line consistent-return
  new Promise((resolve) => {
    if (file instanceof File) {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const { responseURL } = xhr;
            const index = responseURL.indexOf("?");
            const url = responseURL.substring(0, index);
            resolve({
              status: xhr.status,
              url,
            });
          } else {
            resolve(null);
          }
        }
      };
      const acceptedImageTypes = [
        "image/gif",
        "image/jpg",
        "image/jpeg",
        "image/png",
      ];
      if (acceptedImageTypes.includes(file.type)) {
        return new Promise((resolveResize) => {
          resize(file, width, (result) => {
            const { name } = file;

            return resolveResize(dataURItoFile(result, name));
          });
        }).then((newFile) => {
          xhr.send(newFile);
        });
      }
      xhr.send(file);
    } else {
      resolve(null);
    }
  }).catch((err) => {
    console.log(err);
  });

export const handleXLSX = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    const df = [];
    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: "binary" });
        Object.keys(workbook.Sheets).forEach((key) => {
          // const content = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[key]);
          const content = XLSX.utils.sheet_to_json(workbook.Sheets[key], {
            defval: "",
          });
          df.push(content);
        });
        resolve(df);
      } catch (e) {
        reject(e);
        console.log(e);
        // throw e;
      }
    };
    // fileReader.onerror = reject
    fileReader.readAsBinaryString(file);
  }).catch((e) => {
    console.log(e);
    // throw e;
  });
};

// resize function
const resize = (file, maxWidth, fn) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    const image = new Image();
    // convert file to Image type
    image.src = dataUrl;
    image.onload = () => {
      // resize image with maxWidth and quality = 0.8
      const resizedDataUrl = resizeImage(image, maxWidth, 0.8);
      fn(resizedDataUrl);
    };
  };
};

// ------------------------Helper function-----------------------
// Resize image using canvas
const resizeImage = (image, maxWidth, quality = 0.7) => {
  const canvas = document.createElement("canvas");
  let { width } = image;
  let { height } = image;
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
};

// Convert dataURI to type File for uploading
const dataURItoFile = (dataURI, fileName) => {
  const BASE64_MARKER = ";base64,";
  const isDataURI = (url) => {
    return url.split(BASE64_MARKER).length === 2;
  };
  if (!isDataURI(dataURI)) {
    return false;
  }

  // Format of a base64-encoded URL:
  // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAEOCAIAAAAPH1dAAAAK
  const mime = dataURI.split(BASE64_MARKER)[0].split(":")[1];
  const filename = `${fileName}-${new Date().getTime()}.${mime.split("/")[1]}`;
  const bytes = atob(dataURI.split(BASE64_MARKER)[1]);
  const writer = new Uint8Array(new ArrayBuffer(bytes.length));

  for (let i = 0; i < bytes.length; i += 1) {
    writer[i] = bytes.charCodeAt(i);
  }

  return new File([writer.buffer], filename, { type: mime });
};

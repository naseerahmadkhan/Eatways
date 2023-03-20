function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then((response) => response.blob())
        .then((blob) => resolve(blob))
        .catch((error) => reject(error));
    });
  }
  
  export { uriToBlob };
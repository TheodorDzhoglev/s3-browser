export const fakeObjects = Array.from({ length: 50 }, (_, i) => {
    const depth = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const folders = Array.from({ length: depth }, (_, j) => `folder${Math.ceil(Math.random() * 10)}`).join('/');
    const fileName = `file${i + 1}.txt`;
    return {
      Key: `${folders}/${fileName}`,
      LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      ChecksumType: "FULL_OBJECT"
    };
  });
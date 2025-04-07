import { BucketItemType } from "./types";

export const fakeData = Array.from({ length: 2000 }, (_, i): BucketItemType[] => {
    const depth = Math.floor(Math.random() * 2) + 1; // 1 to 5
    const folders = Array.from({ length: depth }, (_, j) => `folder${Math.ceil(Math.random() * 2)}`).join('/');
    const fileName = `file${i + 1}.txt`;
    return {
      Key: `folder${Math.ceil(Math.random() * 3)}/${folders}/${fileName}`,
      LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      ChecksumType: "FULL_OBJECT"
    };
  });
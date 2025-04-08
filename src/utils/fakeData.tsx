// import { BucketItemType } from "./types";

// export const fakeData = Array.from({ length: 30 }, (_, i): BucketItemType => {
//     const depth = Math.floor(Math.random() * 5) + 1;
//     const folders = Array.from({ length: depth }, (_, j): string => `folder${j}${Math.ceil(Math.random() * 10)}`).join('/');
//     const fileName = `file${i + 1}.txt`;
//     return {
//         Key: `folder${Math.ceil(Math.random() * 10)}/${folders}/${fileName}`,
//         LastModified: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
//         ChecksumType: "FULL_OBJECT"
//     };
// });
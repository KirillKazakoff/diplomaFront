export default async function fetchFiles() {
    const result = await fetch('./initFiles/aU86F.js');
    const blob = await result.blob();
    console.log(blob);
}

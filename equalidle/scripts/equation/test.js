async function getFile() {
  const response = await fetch('test.txt');
  const fileContent = await response.text();
  console.log(fileContent)
}
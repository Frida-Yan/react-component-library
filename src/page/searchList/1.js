var str =
  'var msg = "{"url":"MBU0016G7G004SS00081","data":{"a":1,"b":[2,3]}}";';
str = str.replace("var msg = ", "");
str = str.replace(/"/, "");
str = str.replace(/(.*)";/, "$1");
console.log(JSON.parse(str));
// console.log(JSON.parse(str));
// console.log(str.replace(/"/, ""));
// console.log(str.replace(/"$/, ""));

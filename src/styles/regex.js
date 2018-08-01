
let s = '913-909-9038, heelo jskfj rainbow kittens, 913-669-2609'
    //important notes if you use capture (\w) it will save punc. with word. 
var r = /(\d{3})[-.](\d{4})/g
  console.log(s.split(/[,\s/]/)); //splits anything within white space. 
  console.log(s.split(/[,\s]/));





let analyzeButton = document.getElementById("analyzeButton");
let responseTextArea = document.getElementById("responseTextArea");
let sourceImage = document.getElementById("sourceImage");


function processImage() {
    // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = "11aee8f055024ae8995d500c85eeabd8";

    var uriBase = "https://bryantomoregie.cognitiveservices.azure.com/face/v1.0/detect";
    let url = new URL(uriBase)

    //Get image URL
    imgURL = document.getElementById("inputImage").value;

    // Display the image.
    sourceImage.src = imgURL;

    // Request parameters.
    var params = {
      returnFaceId: "true",
      returnFaceLandmarks: "false",
      returnFaceAttributes:
        "age,gender"
    };

    
    Object.keys(params).forEach((key) => 
    url.searchParams.append(key, params[key]))
    
   var myHeader =  new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey
});

   var initObject = {
    method: 'POST',
    body: '{"url": ' + '"' + imgURL + '"}',
    headers: myHeader,
    mode: 'cors'
  };
    // var initObject = {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: new Headers({
    //         'Content-Type': 'application/json',
    //         "Ocp-Apim-Subscription-Key": subscriptionKey
    //     }),
    //     body: JSON.stringify({
    //         'url': imageUrl
    //     })
    // }
    var request = new Request(url, initObject);
    fetch(request).then((response)=>{
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      }).then((response)=>{
        for(let x in response[0].faceAttributes){
            responseTextArea.append(`${x}: ${response[0].faceAttributes[x]}`)
            responseTextArea.append(document.createElement("br"))
       
        }
        // document.getElementById("wrapper").style.display = "block";
        // if(!response[0]) {
        //   document.getElementById("noattributes").style.display = "block";
        //   document.getElementById("attributes").style.display = "none";
        // } else {
        // document.getElementById("noattributes").style.display = "none";
        //   document.getElementById("attributes").style.display = "block"
        // age.innerHTML = response[0].faceAttributes.age;
        // gender.innerHTML = response[0].faceAttributes.gender; 
        // }
    
      })
    // var request = new Request(url, initObject);
    // fetch(request).then((value) => {
    //     return value.json()
    // }).then((value) => {console.log(value)}).catch((err) => {
    //     console.log(err)
    // })
}

analyzeButton.addEventListener('click', processImage)



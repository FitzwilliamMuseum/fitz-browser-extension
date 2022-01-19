const request = new XMLHttpRequest();
const store = 'https://data.fitzmuseum.cam.ac.uk/imagestore/';
request.open('GET', 'https://data.fitzmuseum.cam.ac.uk/random');
request.setRequestHeader('accept', 'application/json');
request.send();
request.addEventListener('load', function (e) {

    const response = JSON.parse(this.responseText);
    var title = '';
    if(response.title){
      title = response.title[0].value;
    } else {
      title = response.summary_title;
    }
    document.title = title + ' The Fitz at Random';
    const image = store + response.multimedia[0].processed.large.location;
    const url = response.admin.uri;
    const maker = response.lifecycle.creation;

    document.getElementById('title').innerHTML = title;

    var makers = document.getElementById("makers");
    for(var i=0; i < maker.length; i++)
      var creator = maker[i]["maker"][0]["summary_title"];
      makers.innerHTML += creator;

    var pinterest = document.getElementById('pinterest');
    var twitter = document.getElementById('twitter');
    var facebook = document.getElementById('facebook');
    var discover = document.getElementById('discover');
    var imageElement = document.getElementById('object');

    pinterest.href = 'http://pinterest.com/pin/create/button/?url=' + url  + '&media=' + image +  '&description=' + title;
    twitter.href = 'http://www.twitter.com/intent/tweet/?text=' + encodeURIComponent(title) + '&url=' + url  + '&via=fitzmuseum_uk';
    facebook.href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    discover.href = url;
    imageElement.src = image;
    imageElement.class = "";

});

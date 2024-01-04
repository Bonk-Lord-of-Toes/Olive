const iFrame = document.getElementById("frame")
const iFrame1 = document.getElementById("HTMLTextBox")
const iFrame2 = document.getElementById("JavascriptTextBox")

//setup for I-Frame source code
iFrame1.srcdoc = "<p contenteditable=\"true\" style=\"color: rgb(156,220,254)\">&lthtml&gt <br> &ltbody&gt <br> &lth1 style=\"color: white\"&gt&lt/h1&gt <br> &lt/body&gt <br> &lt/html&gt</span><p>"
iFrame2.srcdoc = "<p contenteditable=\"true\" style=\"color: rgb(156,220,254)\">document.querySelector(\"h1\").innerText = \"Hello World!\"<p>"    

var compile = (HTML,JS) => {
    //this block parses and serializes the text, for tag completion
    var parser = new DOMParser()
    var serializer = new XMLSerializer()
    var parsedHTML = parser.parseFromString(HTML,"text/html")
    var serializedHTML = serializer.serializeToString(parsedHTML)

    //adds in script tag after serialization
    for(var i=0;i<serializedHTML.length;i++){
        if(serializedHTML[i]=="b"&&serializedHTML[i-1]=="/"&&serializedHTML[i-2]=="<"&&serializedHTML[i+1]=="o"&&serializedHTML[i+2]=="d"&&serializedHTML[i+3]=="y"&&serializedHTML[i+4]==">"){
            var scriptTag = "<script>" + JS + "</script>"

            var p1 = serializedHTML.slice(0,i-3)
            var p2 = serializedHTML.slice(i-3)

            var output = p1 + scriptTag + p2
            break
        }
    }

    return output
}

function run(){
    var HTMLinput = iFrame1.contentWindow.document.querySelector("p").innerText
    var JavascriptInput = iFrame2.contentWindow.document.querySelector("p").innerText

    iFrame.srcdoc = compile(HTMLinput,JavascriptInput)
}

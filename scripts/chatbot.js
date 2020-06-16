    // set the focus to the input box
    document.getElementById("wisdom").focus();
    document.getElementById("imgSub").addEventListener('click',pushChat);
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = 'eu-west-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:f0c0e0d5-8448-4e62-bea4-0562db74e567',
    });

    var lexruntime = new AWS.LexRuntime();
    var lexUserId = 'User' + Date.now();
    var sessionAttributes = {};
    var requestAttributes = {};

    function pushChat() {

        // if there is text to be sent...
        var wisdomText = document.getElementById('wisdom');
        // alert(wisdomText)
        if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {
            
            // disable input to show we're sending it
            var wisdom = wisdomText.value.trim();
            wisdomText.value = '...';
            wisdomText.locked = true;
            // alert(wisdom)
            // send it to the Lex runtime
            var params = {
                botAlias: '$LATEST',
                botName: 'Careers',
                inputText: wisdom,
                userId: lexUserId,
                sessionAttributes: sessionAttributes
            };
            
            showRequest(wisdom);
            lexruntime.postText(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    showError('Error:  ' + err.message + ' (see console for details)')
                }
                if (data) {
                    // capture the sessionAttributes for the next cycle
                    sessionAttributes = data.sessionAttributes;
                    // show response and/or error/dialog status
                    showResponse(data);
                }
                // re-enable input
                wisdomText.value = '';
                wisdomText.locked = false;
            });
        }
        // we always cancel form submission
        return false;
    }

    function showRequest(daText) {

        var conversationDiv = document.getElementById('conversation');
        var requestPara = document.createElement("P");
        requestPara.className = 'userRequest';
        requestPara.appendChild(document.createTextNode(daText));
        conversationDiv.appendChild(requestPara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    function showError(daText) {

        var conversationDiv = document.getElementById('conversation');
        var errorPara = document.createElement("P");
        errorPara.className = 'lexError';
        errorPara.appendChild(document.createTextNode(daText));
        conversationDiv.appendChild(errorPara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    function cardRequest(requestValue){
        //var valueId = event.target.id;
        console.log(requestValue);
    }

    function showResponse(lexResponse) {

        var conversationDiv = document.getElementById('conversation');
        var responsePara = document.createElement("P");
        responsePara.className = 'lexResponse';
        arrayId = [];
        
        if (lexResponse.message) {
            var endNewline = 0;
            var messageStr = lexResponse.message;
            if (messageStr.indexOf("newline")==-1){
                if (lexResponse.message.indexOf("href")!=-1){
                    var len = lexResponse.message.length;
                    var middle = lexResponse.message.indexOf("href");
                    var linkTag = document.createElement("a");
                    var link = lexResponse.message.substr(middle+5,len);
                    linkTag.setAttribute("target","_block");
                    linkTag.setAttribute("href",link);
                    linkTag.innerHTML = "here";
                    var response = lexResponse.message.substr(0,middle);
                    responsePara.appendChild(document.createTextNode(response));
                    responsePara.appendChild(linkTag);
                    responsePara.appendChild(document.createElement('br'));
                    responsePara.appendChild(document.createElement('br'));
                }
                else{
                    responsePara.appendChild(document.createTextNode(lexResponse.message));
                    console.log(lexResponse.message);
                }
            }
            else{
                    while(messageStr.indexOf("newline")!=-1)
                    {
                        endNewline = messageStr.indexOf("newline");
                        responsePara.appendChild(document.createTextNode(messageStr.substr(0,endNewline-1)));
                        responsePara.appendChild(document.createElement('br'));
                        responsePara.appendChild(document.createElement('br'));
                        responsePara.appendChild(document.createTextNode(" · "));
                        messageStr = messageStr.substr(endNewline+8,messageStr.length);
            }
                    responsePara.appendChild(document.createTextNode(messageStr));
        }
    }
        if (lexResponse.dialogState === 'ReadyForFulfillment') {
            responsePara.appendChild(document.createTextNode(
                'Ready for fulfillment'));
            // TODO:  show slot values
        }
        if (lexResponse.responseCard) {
            console.log("Has response card!");
            var cardParam = document.createElement("P");
            cardParam.className = 'lexResponse'
            // get the responseCard title and Value for showing
            var cardTitle = lexResponse.responseCard.genericAttachments[0].title;
            var cardValue = lexResponse.responseCard.genericAttachments[0].buttons;
            
            var titleP = document.createElement("P");
            titleP.innerHTML = cardTitle;
            cardParam.appendChild(titleP);

            lenValue = cardValue.length;
            var i=0;
            for( i=0;i<lenValue;i++){
                var valueBt = document.createElement("button");
                valueBt.className = 'responseCard';
                valueBt.innerHTML = cardValue[i].text;
                valueStr = cardValue[i].text;
                valueId = Date.now()+i;
                arrayId.push(toString(valueId));
                valueBt.setAttribute("id",""+valueId);
                valueBt.onclick = function(e){
                    requestValue = e.target.innerHTML;
                    var params = {
                        botAlias: '$LATEST',
                        botName: 'Careers',
                        inputText: requestValue,
                        userId: lexUserId,
                        sessionAttributes: sessionAttributes
                    };
                    showRequest(requestValue);
                    lexruntime.postText(params, function(err, data) {
                        if (err) {
                            console.log(err, err.stack);
                            showError('Error:  ' + err.message + ' (see console for details)')
                        }
                        if (data) {
                            // capture the sessionAttributes for the next cycle
                            sessionAttributes = data.sessionAttributes;
                            // show response and/or error/dialog status
                            showResponse(data);
                        }

                    });

                }
                cardParam.appendChild(valueBt);
            }
        // }
        // else {
        //     responsePara.appendChild(document.createTextNode(
        //         '(' + lexResponse.dialogState + ')'));
        // }
        }
        conversationDiv.appendChild(responsePara);

        if (cardParam){
            conversationDiv.appendChild(cardParam);
        }
        
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
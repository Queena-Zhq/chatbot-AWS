// set the focus to the input box
document.getElementById("wisdom").focus();
document.getElementById("imgSub").addEventListener('click', pushChat);
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'eu-west-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:f0c0e0d5-8448-4e62-bea4-0562db74e567',
});
var times = setInterval("feedback()",60000);
var lexruntime = new AWS.LexRuntime();
var lexUserId = 'User' + Date.now();
var sessionAttributes = {};
var requestAttributes = {};

function feedback(){
    var params = {
        botAlias: '$LATEST',
        botName: 'Careers',
        inputText: "feedback",
        userId: lexUserId,
        sessionAttributes: {}
    };
    lexruntime.postText(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            showError('Error:  ' + err.message + ' (see console for details)')
        }
        if (data) {
             showfeedback(data);
        }
    });
    stopFeedback();

}

function stopFeedback() {
    clearInterval(times);
  }

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
            sessionAttributes: {}
        };

        showRequest(wisdom);
        lexruntime.postText(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                showError('Error:  ' + err.message + ' (see console for details)')
            }
            if (data) {
                // capture the sessionAttributes for the next cycle
                sessionAttributes = data.sessionAttributes;
                // show response and/or error/dialog status
                if(data.intentName == "feedback"){
                    showfeedback(data);
                }else{
                    showResponse(data);
                }
                
            }
            // re-enable input
            wisdomText.value = '';
            wisdomText.locked = false;
        });
    }
    // we always cancel form submission
    return false;
}

function showfeedback(data){
    var conversationDiv = document.getElementById('conversation');
    var responsePara = document.createElement("P");
    var my_score1 = "0";
    var my_score2 = "0";
    responsePara.className = 'container lexFeedback';
    my_message = data.message;
    responsePara.appendChild(document.createTextNode(my_message));
    var my_line = document.createElement("HR");
    my_line.setAttribute("size",3);
    my_line.className = 'row'
    my_line.setAttribute("style","margin-top:0px;margin-bottom:0px;");
    my_line.setAttribute("background-color","black");
    responsePara.appendChild(my_line);

    var question1 = "1. The usability of services: ";
    var div1 = document.createElement("div");
    div1.innerHTML = question1;
    div1.setAttribute("style","font-style: initial; width:100%; margin-left:1%;");
    div1.className = 'row'
    responsePara.appendChild(div1);

    var divq1 = document.createElement("div");
    divq1.setAttribute("style","width:100%;margin-left:1%;");
    divq1.setAttribute("id","divq1");
    divq1.className = 'row'
    var div11 = document.createElement("div");
    div11.innerHTML = "1";
    div11.className = 'col-md-2 feedback';
    div11.setAttribute("id","div11");
    div11.onclick = function (e){
        if (my_score1 == "0"){
            my_score1 = "1";
            e.target.style.backgroundColor = '#e7f50e';
            // document.getElementById("div1"+my_score1).style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score1-1].style.backgroundColor = '#ded3d3';
            my_score1 = "1";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq1.appendChild(div11);
    var div12 = document.createElement("div");
    div12.innerHTML = "2";
    div12.className = 'col-md-2 feedback';
    div12.setAttribute("id","div12");
    div12.onclick = function (e){
        if (my_score1 == "0"){
            my_score1 = "2";
            e.target.style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score1-1].style.backgroundColor = '#ded3d3';
            my_score1 = "2";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq1.appendChild(div12);
    var div13 = document.createElement("div");
    div13.innerHTML = "3";
    div13.className = 'col-md-2 feedback';
    div13.setAttribute("id","div13");
    div13.onclick = function (e){
        if (my_score1 == "0"){
            my_score1 = "3";
            e.target.style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score1-1].style.backgroundColor = '#ded3d3';
            my_score1 = "3";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq1.appendChild(div13);
    var div14 = document.createElement("div");
    div14.innerHTML = "4";
    div14.className = 'col-md-2 feedback';
    div14.setAttribute("id","div14");
    div14.onclick = function (e){
        if (my_score1 == "0"){
            my_score1 = "4";
            e.target.style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score1-1].style.backgroundColor = '#ded3d3';
            my_score1 = "4";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq1.appendChild(div14);
    var div15 = document.createElement("div");
    div15.innerHTML = "5";
    div15.className = 'col-md-2 feedback';
    div15.setAttribute("id","div15");
    div15.onclick = function (e){
        if (my_score1 == "0"){
            my_score1 = "5";
            e.target.style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score1-1].style.backgroundColor = '#ded3d3';
            my_score1 = "5";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq1.appendChild(div15);
    responsePara.appendChild(divq1);
    
    var question2 = "2. The average satisfaction of all answers: ";
    var div2 = document.createElement("div");
    div2.innerHTML = question2;
    div2.setAttribute("style","font-style: initial;margin-left:1%;");
    div2.className = 'row'
    responsePara.appendChild(div2);
    var divq2 = document.createElement("div");
    divq2.setAttribute("style","width:100%;margin-left:1%;");
    divq2.className = 'row'
    var div21 = document.createElement("div");
    div21.innerHTML = "1";
    div21.className = 'col-md-2 feedback';
    div21.setAttribute("id","div21");
    div21.onclick = function (e){
        if (my_score2 == "0"){
            my_score2 = "1";
            e.target.style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score2-1].style.backgroundColor = '#ded3d3';
            my_score2 = "1";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq2.appendChild(div21);

    var div22 = document.createElement("div");
    div22.innerHTML = "2";
    div22.className = 'col-md-2 feedback';
    div22.setAttribute("id","div22");
    div22.onclick = function (e){
        if (my_score2 == "0"){
            my_score2 = "2";
            e.target.style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score2-1].style.backgroundColor = '#ded3d3';
            my_score2 = "2";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq2.appendChild(div22);

    var div23 = document.createElement("div");
    div23.innerHTML = "3";
    div23.className = 'col-md-2 feedback';
    div23.setAttribute("id","div23");
    div23.onclick = function (e){
        if (my_score2 == "0"){
            my_score2 = "3";
            e.target.style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score2-1].style.backgroundColor = '#ded3d3';
            my_score2 = "3";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq2.appendChild(div23);

    var div24 = document.createElement("div");
    div24.innerHTML = "4";
    div24.className = 'col-md-2 feedback';
    div24.setAttribute("id","div24");
    div24.onclick = function (e){
        if (my_score2 == "0"){
            my_score2 = "4";
            e.target.style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score2-1].style.backgroundColor = '#ded3d3';
            my_score2 = "4";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq2.appendChild(div24);

    var div25 = document.createElement("div");
    div25.innerHTML = "5";
    div25.className = 'col-md-2 feedback';
    div25.setAttribute("id","div25");
    div25.onclick = function (e){
        if (my_score2 == "0"){
            my_score2 = "5";
            e.target.style.backgroundColor = '#e7f50e';
        }
        else{
            e.path[1].children[my_score2-1].style.backgroundColor = '#ded3d3';
            my_score2 = "5";
            e.target.style.backgroundColor = '#e7f50e';
        }      
};
    divq2.appendChild(div25);

    responsePara.appendChild(divq2);

    // create a submit button
    var submit = document.createElement("button");
    submit.innerHTML = "Submit";
    submit.setAttribute("style","margin-top:1%;margin-left:1%");
    submit.className = 'row'
    submit.onclick = function(e){
        var params = {
            botAlias: '$LATEST',
            botName: 'Careers',
            inputText: my_score1+my_score2,
            userId: lexUserId,
            sessionAttributes: {}
        };

        lexruntime.postText(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                showError('Error:  ' + err.message + ' (see console for details)')
            }
            if (data) {
                // show response and/or error/dialog status
                showResponse(data);
            }
        });

    }

    responsePara.appendChild(submit);

    conversationDiv.appendChild(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;

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

function cardRequest(requestValue) {
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
        if (messageStr.indexOf("newline") == -1) {
            if (lexResponse.message.indexOf("href") != -1) {
                var len = lexResponse.message.length;
                var middle = lexResponse.message.indexOf("href");
                var linkTag = document.createElement("a");
                var link = lexResponse.message.substr(middle + 5, len);
                linkTag.setAttribute("target", "_block");
                linkTag.setAttribute("href", link);
                linkTag.innerHTML = "here";
                var response = lexResponse.message.substr(0, middle);
                responsePara.appendChild(document.createTextNode(response));
                responsePara.appendChild(linkTag);
                responsePara.appendChild(document.createElement('br'));
                responsePara.appendChild(document.createElement('br'));
            }
            else {
                responsePara.appendChild(document.createTextNode(lexResponse.message));
                console.log(lexResponse.message);
            }
        }
        else {
            while (messageStr.indexOf("newline") != -1) {
                endNewline = messageStr.indexOf("newline");
                responsePara.appendChild(document.createTextNode(messageStr.substr(0, endNewline - 1)));
                responsePara.appendChild(document.createElement('br'));
                responsePara.appendChild(document.createElement('br'));
                responsePara.appendChild(document.createTextNode(" · "));
                messageStr = messageStr.substr(endNewline + 8, messageStr.length);
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
        cardParam.className = 'lexResponse';
        // get the responseCard title and Value for showing
        var cardTitle = lexResponse.responseCard.genericAttachments[0].title;
        var cardValue = lexResponse.responseCard.genericAttachments[0].buttons;
        var titleP = document.createElement("P");
        titleP.innerHTML = cardTitle;
        cardParam.appendChild(titleP);

        lenValue = cardValue.length;
        var i = 0;
        for (i = 0; i < lenValue; i++) {
            var valueBt = document.createElement("button");
            valueBt.className = 'responseCard';
            valueBt.innerHTML = cardValue[i].text;
            valueStr = cardValue[i].text;
            valueId = Date.now() + i;
            arrayId.push(toString(valueId));
            valueBt.setAttribute("id", "" + valueId);
            valueBt.onclick = function (e) {
                requestValue = e.target.innerHTML;
                var params = {
                    botAlias: '$LATEST',
                    botName: 'Careers',
                    inputText: requestValue,
                    userId: lexUserId,
                    sessionAttributes: {}
                };
                showRequest(requestValue);
                lexruntime.postText(params, function (err, data) {
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
    if(JSON.stringify(lexResponse.sessionAttributes) != "{}"){
        var cvoptions = document.createElement("P");
        cvoptions.className = 'lexResponse';
        
        data = lexResponse.sessionAttributes;
        console.log("This is sessionAttribute");
        console.log(data);
        var selectCV = document.createElement("select");
        selectCV.setAttribute("id","myselect");
        selectCV.setAttribute("style","width:100%;");
        option_len = data['cv'];

        keys = Object.keys(data);
        //find the index of attribute cv
        index = keys.indexOf("cv");
        keys.splice(index,1);

        while(option_len>0){
            var option = document.createElement("option");
            option.value = keys[option_len-1];
            option.innerHTML = keys[option_len-1];
            option_len = option_len - 1;
            selectCV.appendChild(option);
        }

        var linkcv = document.createElement("a");
        linkcv.setAttribute("target", "_block");
        
        selectCV.onchange = function(e){
            linkcv.innerHTML = "  here";
        var str_select = document.getElementById("myselect");
        console.log(str_select);
        var str_option = str_select.options[str_select.selectedIndex].value;
        console.log(str_option);
        var str_link = data[str_option];
        console.log(str_link);
        var link = String("https://www.careers.manchester.ac.uk/media/services/careersandemployabilitydivision/careersservice/cvexamples/schoolcvs/"+String(str_link));
        console.log(link);
        linkcv.setAttribute("href", link);
        }
        cvoptions.appendChild(selectCV);
        cvoptions.appendChild(linkcv);
        //selectCV.className = 'selectCV';

    }
    conversationDiv.appendChild(responsePara);

    if (cardParam) {
        conversationDiv.appendChild(cardParam);
    }
    if(cvoptions){
        conversationDiv.appendChild(cvoptions);
    }

    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}
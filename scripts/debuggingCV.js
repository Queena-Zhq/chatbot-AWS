exports.handler = function(event, ctx, cb){
    var my_response = {},
        AWS = require("aws-sdk"),
        DDB = new AWS.DynamoDB({
            apiVersion: "2012-08-10",
            region: "eu-west-1"
        }),
        userId = event.userId,
        my_date = event.currentIntent.slots.date,
        my_name = event.currentIntent.slots.name,
        my_time = event.currentIntent.slots.time+" am";

        var params = {
            "TableName": "CVdebugging",
            "ReturnConsumedCapacity":"TOTAL",
            "Item":{
                "user" : {"S":userId},
                "name" : {"S" : my_name},
                "date": {"S":my_date},
                "time":{"S":my_time}
            }
        };
      
        console.log(params);
        DDB.putItem(params, function(err, data){
          if(err){
              throw err;
          }else{
               
            console.log(data);
            my_response.statusCode = 200;
            my_response.body = {
                "dialogAction":{
                    "type": "Close",
                    "fulfillmentState": "Fulfilled",
                    "message": {
                        "contentType": "PlainText",
                        "content": "Appointment booked."
                    }
                }
            };
          return cb(null, my_response.body);
          }
      });
  };
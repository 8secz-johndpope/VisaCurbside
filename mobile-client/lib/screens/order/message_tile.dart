import 'package:flutter/material.dart';
import 'package:visa_curbside/models/message.dart';
import 'package:visa_curbside/shared/constants.dart';

class MessageTile extends StatelessWidget {
  final Message message;
  MessageTile(this.message);

  @override
  Widget build(BuildContext context) {
    bool isUser = message.messenger == 'user' ? true : false;
    return Container(
       
      margin: isUser 
        ? EdgeInsets.only(top: 8, bottom: 8, left: 100, right: 0)
        : EdgeInsets.only(top: 8, bottom: 8, right: 100, left: 0),
      padding: EdgeInsets.symmetric(horizontal: 25, vertical: 15),
      decoration: BoxDecoration(
        color: isUser
        ? kLightYellow
        : message.messenger == 'store' ? Colors.grey[400] : kLightBlue ,
        borderRadius: isUser
        ? BorderRadius.only(
          topLeft: Radius.circular(20),
          bottomLeft: Radius.circular(20),
          bottomRight: Radius.circular(30))
        : BorderRadius.only(
          topRight: Radius.circular(20),
          bottomRight: Radius.circular(20),
          bottomLeft: Radius.circular(30))
      ),

      child: isUser 
      ? Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(message.message)
        ],
      )
      : message.messenger == 'veronica'
        ? Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(message.messenger,
            style: TextStyle(
              fontWeight: FontWeight.bold
            ),),
            Text(message.message)
          ],
        )
        : Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(message.messenger,
            style: TextStyle(
              fontWeight: FontWeight.bold,
            ),),
            Text(message.message)
          ],
        )
      
      
    );
  }
}
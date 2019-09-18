const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  text: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      username:{
        type:String
      },
      lastname:{
        type:String
      },
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      text: {
        type: String,
        required: true
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user"
          },
          username:{
            type:String
          },
          lastname:{
            type:String
          },
        }
      ],
      reply: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user"
          },
          replyToUser: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: "user"
              },
              replyToUserText:{
                type: String
              },
              likes: [
                {
                  user: {
                    type: Schema.Types.ObjectId,
                    ref: "user"
                  },
                  username:{
                    type: String
                  },
                  lastname:{
                    type: String
                  }
                }
              ]
            }
          ],
          username:{
            type:String
          },
          lastname:{
            type:String
          },
          text: {
            type: String,
            required: true
          },
          likes: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: "user"
              },
              username:{
                type:String
              },
              lastname:{
                type:String
              }
            }
          ],

        }
      ]
    }
  ]
});

module.exports = mongoose.model("post", PostSchema);

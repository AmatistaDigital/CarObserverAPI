const PubNub = require('pubnub');
const r = require('rethinkdb');

const pubnub = new PubNub({
  publishKey   : 'pub-c-53eaf64c-9df8-4ca7-9116-9ecb0d61feef',
  subscribeKey : 'sub-c-b507301c-216b-11e6-8b91-02ee2ddab7fe',
});
pubnub.subscribe({
  channels : ['carobserver:position'],
});

r.connect({ host : 'localhost', port : 28015, db : 'carobserver' }).then((conn) => {
  r.table('location').changes().run(conn).then((cursor) => {
    cursor.on('data', (message) => {
      pubnub.publish({
        channel : 'carobserver:current-car-position',
        message : message.new_val,
      });
    });
  }).catch((err) => {
    //eslint-disable-next-line
    console.log(err);
  });
});

pubnub.addListener({
  message : (messageData) => {
    const position = messageData.message;
    r.connect({ host : 'localhost', port : 28015, db : 'carobserver' }).then((conn) => {
      r.table('location').insert({
        latitude  : position[0],
        longitude : position[1],
        speed     : position[2],
        accuracy  : position[3],
        provider  : position[4],
        date      : new Date(),
      }).run(conn).then(() => {
        conn.close();
      }).catch((err) => {
        //eslint-disable-next-line
        console.log(err);
        conn.close();
      });
    }).catch((err) => {
      //eslint-disable-next-line
      console.log(err);
    });
  },
});
